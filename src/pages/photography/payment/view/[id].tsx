import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { DefaultLayout } from "@/layouts/DefaultLayout";
import { TableCard } from "@/components/application/table/table";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Select } from "@/components/base/select/select";
import { Dialog, Modal, ModalOverlay } from "@/components/application/modals/modal";
import { useStoreSnackbar } from "@/store/snackbar";
import { fetchWithToken } from "@/utils/fetchApi";
import { getPhotographyPaymentStore } from "@/utils/services/photographyPaymentStoreService";
import { getPhotographyBookingById } from "@/utils/services/photographyBookingService";
import { createPhotographyPayment, getPhotographyPayments } from "@/utils/services/photographyPaymentService";

const formatDate = (value: string) => {
    if (!value) return "-";
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return value;
    return `${d.getDate().toString().padStart(2, "0")}-${d.toLocaleString("en-US", { month: "short" })}-${d.getFullYear()}`;
};

const formatDateTime = (value: string) => {
    if (!value) return "-";
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return value;
    return `${formatDate(value)} ${d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true })}`;
};

const getUploadUrl = (response: any) => {
    const resolved = response?.data ?? response;
    if (typeof resolved === "string") return resolved;
    if (typeof resolved?.url === "string") return resolved.url;
    if (typeof resolved?.data === "string") return resolved.data;
    if (typeof resolved?.location === "string") return resolved.location;
    return "";
};

const asArray = (value: any) => (Array.isArray(value) ? value : []);

export default function PhotographyPaymentViewPage() {
    const navigate = useNavigate();
    const params = useParams();
    const { showSnackbar } = useStoreSnackbar();
    const id = String(params.id || "");
    const [loading, setLoading] = useState(true);
    const [booking, setBooking] = useState<any>(null);
    const [payments, setPayments] = useState<any[]>([]);
    const [paymentStores, setPaymentStores] = useState<any[]>([]);
    const [paymentModalOpen, setPaymentModalOpen] = useState(false);
    const [savingPayment, setSavingPayment] = useState(false);
    const [paymentForm, setPaymentForm] = useState<any>({
        paymentDate: new Date().toISOString().slice(0, 16),
        amount: "",
        paymentStore: "",
        remarks: "",
        paymentImg: "",
    });
    const [paymentError, setPaymentError] = useState("");

    const loadBooking = async () => {
        if (!id) return;
        try {
            const response: any = await getPhotographyBookingById(id);
            setBooking(response?.data ?? response);
        } catch (error: any) {
            showSnackbar({
                title: "Error",
                description: error?.error?.message || error?.message || "Failed to load booking",
                color: "danger",
            });
        }
    };

    const loadPayments = async () => {
        if (!id) return;
        try {
            const response: any = await getPhotographyPayments({ photographyBooking: id, limit: "all" });
            const resolved = response?.data ?? response;
            const list = Array.isArray(resolved?.data) ? resolved.data : Array.isArray(resolved) ? resolved : [];
            setPayments(list);
        } catch {
            setPayments([]);
        }
    };

    useEffect(() => {
        const run = async () => {
            setLoading(true);
            try {
                await Promise.all([loadBooking(), loadPayments()]);
                const paymentStoreResponse: any = await getPhotographyPaymentStore();
                const paymentStoreResolved = paymentStoreResponse?.data ?? paymentStoreResponse;
                setPaymentStores(Array.isArray(paymentStoreResolved?.data) ? paymentStoreResolved.data : Array.isArray(paymentStoreResolved) ? paymentStoreResolved : []);
            } finally {
                setLoading(false);
            }
        };
        run();
    }, [id]);

    const openPaymentModal = () => {
        setPaymentError("");
        setPaymentForm({
            paymentDate: new Date().toISOString().slice(0, 16),
            amount: "",
            paymentStore: "",
            remarks: "",
            paymentImg: "",
        });
        setPaymentModalOpen(true);
    };

    const savePayment = async () => {
        if (!booking) return;
        const amount = Number(paymentForm.amount || 0);
        const pendingAmount = Number(booking?.pendingAmount || 0);
        if (!paymentForm.paymentDate) {
            setPaymentError("Payment date is required");
            return;
        }
        if (!amount || amount <= 0) {
            setPaymentError("Payment amount should be greater than 0");
            return;
        }
        if (amount > pendingAmount) {
            setPaymentError(`Payment amount cannot be greater than pending amount (₹${pendingAmount.toFixed(2)})`);
            return;
        }
        setSavingPayment(true);
        setPaymentError("");
        try {
            let paymentImg = paymentForm.paymentImg;
            if (paymentImg && paymentImg instanceof File) {
                const fd = new FormData();
                fd.append("fmFile", paymentImg, paymentImg.name);
                const uploaded = await fetchWithToken("/api/file/upload", fd as any, { method: "POST" });
                paymentImg = getUploadUrl(uploaded);
            }
            await createPhotographyPayment({
                photographyBooking: booking.id,
                amount,
                paymentDate: paymentForm.paymentDate,
                paymentStore: paymentForm.paymentStore || undefined,
                remarks: paymentForm.remarks || "",
                paymentImg,
            });
            setPaymentModalOpen(false);
            await Promise.all([loadBooking(), loadPayments()]);
            showSnackbar({
                title: "Success",
                description: "Payment added successfully",
                color: "success",
            });
        } catch (error: any) {
            setPaymentError(error?.error?.message || error?.message || "Failed to add payment");
        } finally {
            setSavingPayment(false);
        }
    };

    return (
        <DefaultLayout>
            <TableCard.Root>
                <TableCard.Header
                    title="Photography Payment Details"
                    contentTrailing={
                        <div className="flex gap-2">
                            <Button color="secondary" onClick={() => navigate("/photography/payments")}>
                                Back
                            </Button>
                            <Button color="secondary" onClick={() => navigate(`/photography/booking/view/${id}`)}>
                                Booking View
                            </Button>
                            <Button color="primary" onClick={openPaymentModal} isDisabled={loading || !booking || Number(booking?.pendingAmount || 0) <= 0}>
                                Add Payment
                            </Button>
                        </div>
                    }
                />
                <div className="space-y-4 bg-primary px-4 py-5 md:px-6">
                    {loading ? (
                        <div className="text-sm text-tertiary">Loading payment details...</div>
                    ) : !booking ? (
                        <div className="text-sm text-tertiary">Booking not found.</div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
                                <div className="rounded border border-secondary p-3">
                                    <div className="text-xs text-tertiary">Booking Number</div>
                                    <div className="text-sm font-semibold text-primary">{booking?.bookingNumber || "-"}</div>
                                </div>
                                <div className="rounded border border-secondary p-3">
                                    <div className="text-xs text-tertiary">Estimate Number</div>
                                    <div className="text-sm font-semibold text-primary">{booking?.estimate?.estimateNumber || "-"}</div>
                                </div>
                                <div className="rounded border border-secondary p-3">
                                    <div className="text-xs text-tertiary">Client</div>
                                    <div className="text-sm font-semibold text-primary">{booking?.client?.name || "-"}</div>
                                </div>
                                <div className="rounded border border-secondary p-3">
                                    <div className="text-xs text-tertiary">Agent</div>
                                    <div className="text-sm font-semibold text-primary">{booking?.agent?.name || "-"}</div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
                                <div className="rounded border border-secondary p-3">
                                    <div className="text-xs text-tertiary">Total Amount</div>
                                    <div className="text-sm font-semibold text-primary">₹{Number(booking?.totalAmount || 0).toFixed(2)}</div>
                                </div>
                                <div className="rounded border border-secondary p-3">
                                    <div className="text-xs text-tertiary">Token Amount</div>
                                    <div className="text-sm font-semibold text-primary">₹{Number(booking?.tokenAmount || 0).toFixed(2)}</div>
                                </div>
                                <div className="rounded border border-secondary p-3">
                                    <div className="text-xs text-tertiary">Pending Amount</div>
                                    <div className="text-sm font-semibold text-primary">₹{Number(booking?.pendingAmount || 0).toFixed(2)}</div>
                                </div>
                                <div className="rounded border border-secondary p-3">
                                    <div className="text-xs text-tertiary">Status</div>
                                    <div className="text-sm font-semibold text-primary">{booking?.paymentStatus || "-"}</div>
                                </div>
                            </div>
                            <div className="overflow-x-auto rounded border border-secondary">
                                <table className="w-full border-collapse text-left text-sm">
                                    <thead>
                                        <tr className="border-b border-secondary bg-secondary/20">
                                            <th className="px-3 py-2 font-semibold text-primary">Receipt</th>
                                            <th className="px-3 py-2 font-semibold text-primary">Payment Date</th>
                                            <th className="px-3 py-2 font-semibold text-primary">Amount</th>
                                            <th className="px-3 py-2 font-semibold text-primary">Payment Mode</th>
                                            <th className="px-3 py-2 font-semibold text-primary">Remarks</th>
                                            <th className="px-3 py-2 font-semibold text-primary">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {asArray(payments).map((payment: any) => (
                                            <tr key={payment.id} className="border-b border-secondary">
                                                <td className="px-3 py-2 text-primary">{payment?.receiptNo || "-"}</td>
                                                <td className="px-3 py-2 text-primary">{formatDateTime(payment?.paymentDate)}</td>
                                                <td className="px-3 py-2 text-primary">₹{Number(payment?.amount || 0).toFixed(2)}</td>
                                                <td className="px-3 py-2 text-primary">{payment?.paymentStore?.title || "-"}</td>
                                                <td className="px-3 py-2 text-primary">{payment?.remarks || "-"}</td>
                                                <td className="px-3 py-2 text-primary">
                                                    <Button
                                                        color="secondary"
                                                        onClick={() => window.open(`/photography/payments-receipt/${payment?.id}`, "_blank")}
                                                    >
                                                        Receipt
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                        {asArray(payments).length === 0 ? (
                                            <tr>
                                                <td colSpan={6} className="px-3 py-3 text-tertiary">
                                                    No payments found.
                                                </td>
                                            </tr>
                                        ) : null}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}
                </div>
            </TableCard.Root>

            <ModalOverlay isOpen={paymentModalOpen} onOpenChange={setPaymentModalOpen} isDismissable>
                <Modal className="w-full max-w-xl">
                    <Dialog>
                        {({ close }) => (
                            <div className="space-y-4 p-4">
                                <h3 className="text-base font-semibold">Add Client Payment</h3>
                                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                    <Input
                                        label="Payment Date *"
                                        type="datetime-local"
                                        value={paymentForm.paymentDate}
                                        onChange={(value) => setPaymentForm((prev: any) => ({ ...prev, paymentDate: value }))}
                                    />
                                    <Input
                                        label={`Amount * (Pending ₹${Number(booking?.pendingAmount || 0).toFixed(2)})`}
                                        type="number"
                                        value={String(paymentForm.amount || "")}
                                        onChange={(value) => setPaymentForm((prev: any) => ({ ...prev, amount: value }))}
                                    />
                                    <Select
                                        label="Payment Mode"
                                        selectedKey={paymentForm.paymentStore}
                                        onSelectionChange={(key) => setPaymentForm((prev: any) => ({ ...prev, paymentStore: String(key) }))}
                                        items={paymentStores.map((item: any) => ({ id: String(item.id || item._id), label: String(item.title || "") }))}
                                    >
                                        {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                    </Select>
                                    <Input
                                        label="Payment Image"
                                        type="file"
                                        onChange={(value) => setPaymentForm((prev: any) => ({ ...prev, paymentImg: value as any }))}
                                    />
                                </div>
                                <Input
                                    label="Remarks"
                                    value={paymentForm.remarks}
                                    onChange={(value) => setPaymentForm((prev: any) => ({ ...prev, remarks: value }))}
                                />
                                {paymentError ? <div className="text-sm text-error">{paymentError}</div> : null}
                                <div className="flex justify-end gap-2">
                                    <Button color="secondary" onClick={close}>
                                        Cancel
                                    </Button>
                                    <Button color="primary" onClick={savePayment} isDisabled={savingPayment}>
                                        {savingPayment ? "Saving..." : "Save Payment"}
                                    </Button>
                                </div>
                            </div>
                        )}
                    </Dialog>
                </Modal>
            </ModalOverlay>
        </DefaultLayout>
    );
}
