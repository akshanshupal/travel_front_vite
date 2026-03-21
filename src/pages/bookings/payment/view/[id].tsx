import { DefaultLayout } from "@/layouts/DefaultLayout";
import { TableCard } from "@/components/application/table/table";
import { Tabs } from "@/components/application/tabs/tabs";
import { AssignmentDetails } from "@/components/application/assignment-details/assignment-details";
import MailConfirmation from "@/components/application/mail-confirmation/mail-confirmation";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { Input } from "@/components/base/input/input";
import { Select } from "@/components/base/select/select";
import { TextArea } from "@/components/base/textarea/textarea";
import { Toggle } from "@/components/base/toggle/toggle";
import Tmodal from "@/components/utils/Tmodal";
import { useAvailableTableWidth } from "@/hooks/use-available-table-width";
import { useStoreSnackbar } from "@/store/snackbar";
import { getAssignmentById } from "@/utils/services/assignmentService";
import { getPackageBooking } from "@/utils/services/packagebookingService";
import { getPaymentStore } from "@/utils/services/paymentStoreService";
import {
    addPayment,
    getpayment,
    getPaymentById,
    getPaymentDelete,
    multiPaymentsDelete,
    updatePaymentById,
} from "@/utils/services/paymentService";
import { calculatePendingAmount, formatCurrencyInr, formatShortDate, formatTime } from "@/utils/formatters";
import { Eye, EyeOff, Home04, Plus } from "@untitledui/icons";
import { BiMailSend } from "react-icons/bi";
import { FaEdit, FaEye, FaTrash, FaWhatsapp } from "react-icons/fa";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";

const getId = (value: any) => String(value?.id ?? value?._id ?? value ?? "").trim();

const formatPaymentDate = (dateStr?: string) => {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    if (Number.isNaN(date.getTime())) return "-";
    return `${formatShortDate(dateStr)} ${formatTime(dateStr)}`;
};

const formatDatetimeLocal = (dateStr?: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    if (Number.isNaN(date.getTime())) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
};

const getLocalDateTime = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
};

const buildPaymentReceiptWhatsappMessage = (payment: any, assignment: any) => {
    if (!payment) return "";
    const amount = formatCurrencyInr(payment?.amount);
    const receiptNo = payment?.receiptNo || "-";
    const packageId = assignment?.packageId || "-";
    const customerName = assignment?.clientName || "-";
    const paymentDate = formatPaymentDate(payment?.paymentDate);
    const paymentMethod = payment?.paymentStore?.title || "-";
    const receiptLink = `${window.location.origin}/payments-receipt/${getId(payment)}`;
    const companyName = assignment?.company?.name || "";

    return [
        "🧾 Payment Receipt",
        companyName ? `🏢 ${companyName}` : "",
        `📦 Package ID: ${packageId}`,
        `👤 Customer: ${customerName}`,
        `🧾 Receipt No: ${receiptNo}`,
        `💰 Amount: ${amount}`,
        `📅 Paid on: ${paymentDate}`,
        `🏦 Payment Method: ${paymentMethod}`,
        `🔗 Receipt Link: ${receiptLink}`,
    ]
        .filter(Boolean)
        .join("\n");
};

export default function PaymentViewPage() {
    const navigate = useNavigate();
    const params = useParams();
    const id = getId(params.id);
    const availableWidth = useAvailableTableWidth();
    const { showSnackbar } = useStoreSnackbar();

    const [loading, setLoading] = useState(true);
    const [assignment, setAssignment] = useState<any>(null);
    const [payments, setPayments] = useState<any[]>([]);
    const [loadError, setLoadError] = useState<string | null>(null);
    const [paymentStores, setPaymentStores] = useState<any[]>([]);
    const [activeTab, setActiveTab] = useState("paymentDetails");
    const [isTableVisible, setIsTableVisible] = useState<Record<string, boolean>>({});

    const [paymentModalOpen, setPaymentModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [linkedDeleteModalOpen, setLinkedDeleteModalOpen] = useState(false);
    const [mailModalOpen, setMailModalOpen] = useState(false);
    const [mailReminderOpen, setMailReminderOpen] = useState(false);

    const [selectedPayment, setSelectedPayment] = useState<any>(null);
    const [selectedPaymentReminder, setSelectedPaymentReminder] = useState<any>(null);
    const [deleteTarget, setDeleteTarget] = useState<{ id: string; amount?: number } | null>(null);
    const [linkedPaymentData, setLinkedPaymentData] = useState<{ paymentData: any[]; message?: string } | null>(null);

    const [isDateAuto, setIsDateAuto] = useState(true);
    const [packageServices, setPackageServices] = useState<any[]>([]);
    const [editPaymentId, setEditPaymentId] = useState<string | null>(null);
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const [formData, setFormData] = useState<any>({
        paymentDate: "",
        amount: "",
        paymentStore: "",
        paymentTo: "",
        remarks: "",
        packageServices: [],
    });

    useEffect(() => {
        const run = async () => {
            if (!id) {
                setLoadError("Invalid payment id");
                setLoading(false);
                return;
            }
            setLoading(true);
            setLoadError(null);
            try {
                const response = await getAssignmentById(id, {
                    populate: "agentName,paymentStore,tokenPayment,company",
                });
                if (response?.error) throw new Error(response.error);
                const resolved = response?.data ?? response;
                setAssignment(resolved || null);
            } catch (error: any) {
                setLoadError(error?.message || "Failed to load payment");
                showSnackbar({
                    title: "Error",
                    description: error?.message || "Failed to load payment",
                    color: "danger",
                });
            } finally {
                setLoading(false);
            }
        };
        run();
    }, [id, showSnackbar]);

    useEffect(() => {
        const run = async () => {
            if (!id) return;
            try {
                const response = await getpayment({
                    assignment: id,
                    paymentType: "Cr",
                    populate: "paymentStore,packageBooking",
                });
                if (response?.error) throw new Error(response.error);
                const resolved = response?.data ?? response;
                setPayments(Array.isArray(resolved) ? resolved : []);
            } catch (error: any) {
                showSnackbar({
                    title: "Error",
                    description: error?.message || "Failed to load payments",
                    color: "danger",
                });
                setPayments([]);
            }
        };
        run();
    }, [id, showSnackbar]);

    useEffect(() => {
        const run = async () => {
            try {
                const response = await getPaymentStore();
                if (response?.error) throw new Error(response.error);
                setPaymentStores(response?.data ?? response ?? []);
            } catch (error: any) {
                showSnackbar({
                    title: "Error",
                    description: error?.message || "Failed to load payment modes",
                    color: "danger",
                });
            }
        };
        run();
    }, [showSnackbar]);

    const totalReceived = useMemo(() => {
        if (typeof assignment?.paymentReceived === "number") {
            return assignment.paymentReceived;
        }
        return payments.reduce((sum, item) => sum + Number(item?.amount || 0), 0);
    }, [assignment?.paymentReceived, payments]);

    const groupedPayments = useMemo(() => {
        return payments.reduce<Record<string, any[]>>((acc, payment) => {
            const key = payment?.paymentTo || "unknown";
            if (!acc[key]) acc[key] = [];
            acc[key].push(payment);
            return acc;
        }, {});
    }, [payments]);

    const paymentToOptions = [
        { id: "paymentToCompany", label: "Payment To Company" },
        { id: "paymentForService", label: "Payment For Service" },
    ];

    const handleViewReceipt = (paymentId?: string) => {
        if (!paymentId) return;
        window.open(`/payments-receipt/${paymentId}`, "_blank");
    };

    const handleSendWhatsapp = (payment?: any) => {
        const numberRaw = String(payment?.mobile || assignment?.mobile || "").trim();
        const number = numberRaw.replace(/\D/g, "");
        if (!number) {
            showSnackbar({
                title: "Error",
                description: "Mobile number not available",
                color: "danger",
            });
            return;
        }
        const message = buildPaymentReceiptWhatsappMessage(payment, assignment);
        if (!message) {
            showSnackbar({
                title: "Error",
                description: "WhatsApp message is empty",
                color: "danger",
            });
            return;
        }
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://web.whatsapp.com/send?phone=${number}&text=${encodedMessage}`, "_blank");
    };

    const validateForm = () => {
        const errors: Record<string, string> = {};
        if (!formData.amount) errors.amount = "Amount is required";
        if (!formData.paymentStore) errors.paymentStore = "Payment mode is required";
        if (!formData.paymentTo) errors.paymentTo = "Payment recipient is required";
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleFormChange = (key: string, value: any) => {
        setFormData((prev: any) => ({ ...prev, [key]: value }));
        if (formErrors[key]) {
            setFormErrors((prev) => ({ ...prev, [key]: "" }));
        }
    };

    const handlePaymentStoreChange = (key: string) => {
        handleFormChange("paymentStore", key);
    };

    const handlePaymentToChange = async (key: string) => {
        handleFormChange("paymentTo", key);
        if (key === "paymentForService") {
            if (packageServices.length > 0) {
                setFormData((prev: any) => ({
                    ...prev,
                    packageServices: packageServices.map((item: any) => ({
                        packageBookingId: item.id,
                        amount: prev.packageServices?.find((service: any) => service.packageBookingId === item.id)?.amount || "",
                        id: item.id,
                    })),
                }));
                return;
            }
            try {
                const response = await getPackageBooking({
                    assignment: id,
                    bookingStatus: "booked",
                    select: "pendingAmount,amount,title,id",
                });
                if (response?.error) throw new Error(response.error);
                const resolved = response?.data ?? response ?? [];
                if (resolved.length === 0) {
                    showSnackbar({ title: "Error", description: "No services found", color: "danger" });
                    return;
                }
                setPackageServices(resolved);
                setFormData((prev: any) => ({
                    ...prev,
                    packageServices: resolved.map((item: any) => ({ packageBookingId: item.id, amount: "" })),
                }));
            } catch (error: any) {
                showSnackbar({
                    title: "Error",
                    description: error?.message || "Failed to load services",
                    color: "danger",
                });
            }
        }
    };

    const handlePackageAmountChange = (index: number, value: string) => {
        if (value !== "" && (Number.isNaN(Number(value)) || Number(value) < 0)) {
            showSnackbar({
                title: "Error",
                description: "Amount must be a number and greater than or equal to 0",
                color: "danger",
            });
            return;
        }
        setFormData((prev: any) => ({
            ...prev,
            packageServices: prev.packageServices.map((item: any, i: number) => (i === index ? { ...item, amount: value } : item)),
        }));
    };

    const resetPaymentForm = () => {
        setFormData({
            paymentDate: "",
            amount: "",
            paymentStore: "",
            paymentTo: "",
            remarks: "",
            packageServices: [],
        });
        setFormErrors({});
        setIsDateAuto(true);
        setEditPaymentId(null);
    };

    const openPaymentModal = () => {
        resetPaymentForm();
        setPaymentModalOpen(true);
    };

    const closePaymentModal = () => {
        setPaymentModalOpen(false);
        resetPaymentForm();
    };

    const handleAddPayment = async () => {
        if (formData.paymentTo === "paymentForService") {
            const totalAmount = formData.packageServices.reduce((sum: number, item: any) => sum + Number(item.amount || 0), 0);
            if (Number(formData.amount || 0) !== totalAmount) {
                showSnackbar({
                    title: "Error",
                    description: "Service amount is not equal to total amount",
                    color: "danger",
                });
                return;
            }
        }
        if (!validateForm()) return;
        setLoading(true);
        try {
            const payload = {
                ...formData,
                assignment: id,
                packageId: assignment?.packageId,
                paymentDate: formData.paymentDate || getLocalDateTime(),
                paymentType: "Cr",
            };
            const response = await addPayment(payload);
            if (response?.error) throw new Error(response.error);
            const resolved = response?.data ?? response;
            setPayments((prev) => [...prev, resolved]);
            setAssignment((prev: any) => ({
                ...prev,
                paymentReceived: (prev?.paymentReceived || 0) + Number(resolved?.amount || 0),
            }));
            showSnackbar({ title: "Success", description: "Payment added successfully", color: "success" });
            closePaymentModal();
        } catch (error: any) {
            showSnackbar({ title: "Error", description: error?.message || "Failed to add payment", color: "danger" });
        } finally {
            setLoading(false);
        }
    };

    const handleEditPayment = async (paymentId: string) => {
        setEditPaymentId(paymentId);
        setPaymentModalOpen(true);
        setLoading(true);
        try {
            const response = await getPaymentById(paymentId);
            if (response?.error) throw new Error(response.error);
            const resolved = response?.data ?? response;
            const linkedPayment = await getpayment({ linkedPayment: paymentId });
            const linkedPayments = linkedPayment?.data ?? linkedPayment ?? [];

            let services = packageServices;
            if (services.length === 0) {
                const serviceResponse = await getPackageBooking({
                    assignment: id,
                    select: "pendingAmount,amount,title,id",
                });
                services = serviceResponse?.data ?? serviceResponse ?? [];
                setPackageServices(services);
            }

            const serviceData = (services.length ? services : []).map((item: any) => {
                const linked = linkedPayments.find((payment: any) => payment.packageBooking === item.id);
                return {
                    packageBookingId: item.id,
                    amount: linked?.amount || "",
                    id: linked?.id,
                };
            });

            setFormData({
                ...resolved,
                paymentDate: formatDatetimeLocal(resolved.paymentDate),
                packageServices: serviceData,
            });
        } catch (error: any) {
            showSnackbar({ title: "Error", description: error?.message || "Failed to load payment", color: "danger" });
        } finally {
            setLoading(false);
        }
    };

    const handleUpdatePayment = async () => {
        if (!editPaymentId) return;
        if (formData.paymentTo === "paymentForService") {
            const totalAmount = formData.packageServices.reduce((sum: number, item: any) => sum + Number(item.amount || 0), 0);
            if (Number(formData.amount || 0) !== totalAmount) {
                showSnackbar({
                    title: "Error",
                    description: "Service amount is not equal to total amount",
                    color: "danger",
                });
                return;
            }
        }
        if (!validateForm()) return;
        setLoading(true);
        try {
            const response = await updatePaymentById(editPaymentId, formData);
            if (response?.error) throw new Error(response.error);
            const resolved = response?.data ?? response;
            setPayments((prev) =>
                prev.map((item) => {
                    if (getId(item) === getId(resolved)) {
                        return { ...item, ...resolved };
                    }
                    return item;
                }),
            );
            setAssignment((prev: any) => {
                const existing = payments.find((item) => getId(item) === getId(editPaymentId));
                const previousAmount = Number(existing?.amount || 0);
                const nextAmount = Number(resolved?.amount || 0);
                return {
                    ...prev,
                    paymentReceived: (prev?.paymentReceived || 0) + (nextAmount - previousAmount),
                };
            });
            showSnackbar({ title: "Success", description: "Payment updated successfully", color: "success" });
            closePaymentModal();
        } catch (error: any) {
            showSnackbar({ title: "Error", description: error?.message || "Failed to update payment", color: "danger" });
        } finally {
            setLoading(false);
        }
    };

    const confirmDelete = (payment: any) => {
        setDeleteTarget({ id: getId(payment), amount: payment?.amount });
        setDeleteModalOpen(true);
    };

    const handleDeletePayment = async () => {
        if (!deleteTarget?.id) return;
        setLoading(true);
        try {
            const response = await getPaymentDelete(deleteTarget.id, {});
            if (response?.error) throw response.error;
            setPayments((prev) => prev.filter((item) => getId(item) !== deleteTarget.id));
            showSnackbar({ title: "Success", description: "Payment deleted successfully", color: "success" });
            setDeleteTarget(null);
        } catch (error: any) {
            const message = error?.message || error?.error?.message;
            if (message === "Payment is linked to another payment" || error?.message === "Payment is linked to another payment") {
                const paymentData = error?.error?.data || [];
                const linked = [{ id: deleteTarget?.id, amount: deleteTarget?.amount, receiptNo: deleteTarget?.id }, ...paymentData];
                setLinkedPaymentData({ paymentData: linked, message: error?.message || error?.error?.message });
                setLinkedDeleteModalOpen(true);
            } else {
                showSnackbar({ title: "Delete Failed", description: message || "Failed to delete payment", color: "danger" });
            }
        } finally {
            setLoading(false);
            setDeleteModalOpen(false);
        }
    };

    const handleDeleteLinkedPayments = async () => {
        if (!linkedPaymentData?.paymentData?.length) return;
        const ids = linkedPaymentData.paymentData.map((item) => item.id).filter(Boolean);
        if (ids.length === 0) return;
        setLoading(true);
        try {
            const response = await multiPaymentsDelete(ids);
            if (response?.error) throw new Error(response.error);
            setPayments((prev) => prev.filter((item) => !ids.includes(getId(item))));
            showSnackbar({ title: "Success", description: "Payments deleted successfully", color: "success" });
        } catch (error: any) {
            showSnackbar({ title: "Delete Failed", description: error?.message || "Failed to delete linked payments", color: "danger" });
        } finally {
            setLinkedDeleteModalOpen(false);
            setLoading(false);
        }
    };

    const breadcrumbs = (
        <div className="mb-4 rounded-sm border border-secondary bg-primary p-2">
            <div className="flex flex-wrap items-center gap-1 text-sm text-tertiary">
                <button
                    type="button"
                    onClick={() => navigate("/dashboard")}
                    className="inline-flex items-center gap-1 rounded-sm px-1 py-0.5 text-primary hover:bg-primary_hover"
                >
                    <Home04 className="size-4" />
                </button>
                <span>/</span>
                <button type="button" onClick={() => navigate("/bookings/payment")} className="rounded-sm px-1 py-0.5 text-primary hover:bg-primary_hover">
                    Payment
                </button>
                <span>/</span>
                <span className="px-1 py-0.5 text-primary">View</span>
            </div>
        </div>
    );

    if (loading) {
        return (
            <DefaultLayout>
                {breadcrumbs}
                <div className="space-y-4">
                    <div className="rounded-xl border border-secondary bg-primary p-4">
                        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                            <div className="space-y-2">
                                <div className="h-6 w-40 animate-pulse rounded bg-secondary" />
                                <div className="flex flex-wrap gap-2">
                                    {[1, 2, 3].map((item) => (
                                        <div key={item} className="h-5 w-20 animate-pulse rounded-full bg-secondary" />
                                    ))}
                                </div>
                            </div>
                            <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row">
                                {[1, 2].map((item) => (
                                    <div key={item} className="h-9 w-28 animate-pulse rounded bg-secondary" />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                        <div className="rounded-xl border border-secondary bg-primary p-6 lg:col-span-1">
                            <div className="h-5 w-40 animate-pulse rounded bg-secondary" />
                            <div className="mt-4 space-y-3">
                                {[1, 2, 3, 4, 5, 6, 7].map((item) => (
                                    <div key={item} className="h-12 animate-pulse rounded bg-secondary" />
                                ))}
                            </div>
                        </div>
                        <div className="rounded-xl border border-secondary bg-primary p-6 lg:col-span-2">
                            <div className="flex items-center justify-between gap-4">
                                <div className="h-5 w-24 animate-pulse rounded bg-secondary" />
                                <div className="h-5 w-16 animate-pulse rounded bg-secondary" />
                            </div>
                            <div className="mt-4 space-y-3">
                                {[1, 2, 3, 4].map((item) => (
                                    <div key={item} className="h-10 animate-pulse rounded bg-secondary" />
                                ))}
                            </div>
                            <div className="mt-6 flex justify-center">
                                <div className="h-9 w-28 animate-pulse rounded bg-secondary" />
                            </div>
                        </div>
                    </div>
                </div>
            </DefaultLayout>
        );
    }

    if (loadError || !assignment) {
        return (
            <DefaultLayout>
                {breadcrumbs}
                <div className="rounded-xl border border-error-solid bg-error-bg p-6 text-error-text">
                    <p className="text-sm font-semibold">Error loading payment</p>
                    <p className="text-sm">{loadError || "Payment not found"}</p>
                    <Button className="mt-4" size="sm" color="secondary" onClick={() => navigate("/bookings/payment")}>
                        Back
                    </Button>
                </div>
            </DefaultLayout>
        );
    }

    return (
        <DefaultLayout>
            {breadcrumbs}
            <div className="space-y-4" style={{ width: availableWidth }}>
                <div className="flex items-center justify-between">
                    <div className="text-lg font-semibold text-primary">Payment Details</div>
                    <Button
                        color="primary"
                        size="sm"
                        onClick={() => {
                            setSelectedPaymentReminder(assignment);
                            setMailReminderOpen(true);
                        }}
                    >
                        Payment Reminder
                    </Button>
                </div>

                <Tabs selectedKey={activeTab} onSelectionChange={(key) => setActiveTab(String(key))}>
                    <Tabs.List
                        type="underline"
                        orientation="horizontal"
                        items={[
                            { id: "paymentDetails", label: "Payment Details" },
                            { id: "assignmentDetails", label: "Assignment Details" },
                        ]}
                    >
                        {(item) => (
                            <Tabs.Item id={item.id} label={item.label}>
                                {item.label}
                            </Tabs.Item>
                        )}
                    </Tabs.List>

                    <Tabs.Panel id="paymentDetails">
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                            <div className="lg:col-span-1">
                                <TableCard.Root>
                                    <TableCard.Header title="Package Details" />
                                    <div className="space-y-4 bg-primary px-4 py-5 md:px-6">
                                        <div className="flex flex-wrap gap-2 text-xs text-tertiary">
                                            <span className="rounded-full border border-secondary bg-secondary px-2 py-0.5 text-xs font-medium text-primary">
                                                {assignment?.packageId || "Package"}
                                            </span>
                                            {assignment?.clientName && (
                                                <span className="rounded-full border border-secondary bg-secondary px-2 py-0.5 text-xs font-medium text-primary">
                                                    {assignment.clientName}
                                                </span>
                                            )}
                                            {assignment?.agentName && (
                                                <span className="rounded-full border border-secondary bg-secondary px-2 py-0.5 text-xs font-medium text-primary">
                                                    Agent: {assignment?.agentName?.username || assignment?.agentName?.name || assignment?.agentName}
                                                </span>
                                            )}
                                        </div>
                                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-1">
                                            <div className="rounded-lg border border-secondary bg-secondary p-3">
                                                <div className="text-xs font-semibold uppercase text-tertiary">Customer</div>
                                                <div className="text-sm font-semibold text-primary">
                                                    {[assignment?.clientName, assignment?.mobile, assignment?.email].filter(Boolean).join(" • ") || "-"}
                                                </div>
                                            </div>
                                            <div className="rounded-lg border border-secondary bg-secondary p-3">
                                                <div className="text-xs font-semibold uppercase text-tertiary">Booking Date</div>
                                                <div className="text-sm font-semibold text-primary">{formatShortDate(assignment?.bookingDate)}</div>
                                            </div>
                                            <div className="rounded-lg border border-secondary bg-secondary p-3">
                                                <div className="text-xs font-semibold uppercase text-tertiary">Travel Date</div>
                                                <div className="text-sm font-semibold text-primary">{formatShortDate(assignment?.tourDate)}</div>
                                            </div>
                                            <div className="rounded-lg border border-secondary bg-secondary p-3">
                                                <div className="text-xs font-semibold uppercase text-tertiary">Package Cost</div>
                                                <div className="text-sm font-semibold text-primary">{formatCurrencyInr(assignment?.packageCost)}</div>
                                            </div>
                                            <div className="rounded-lg border border-secondary bg-secondary p-3">
                                                <div className="text-xs font-semibold uppercase text-tertiary">Final Cost</div>
                                                <div className="text-sm font-semibold text-primary">{formatCurrencyInr(assignment?.finalPackageCost)}</div>
                                            </div>
                                            <div className="rounded-lg border border-secondary bg-secondary p-3">
                                                <div className="text-xs font-semibold uppercase text-tertiary">Received</div>
                                                <div className="text-sm font-semibold text-primary">{formatCurrencyInr(totalReceived)}</div>
                                            </div>
                                            <div className="rounded-lg border border-secondary bg-secondary p-3">
                                                <div className="text-xs font-semibold uppercase text-tertiary">Pending</div>
                                                <div className="text-sm font-semibold text-primary">
                                                    {calculatePendingAmount(assignment?.finalPackageCost, totalReceived)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </TableCard.Root>
                            </div>

                            <div className="lg:col-span-2">
                                <TableCard.Root>
                                    <TableCard.Header
                                        title="Payments"
                                        badge={payments.length}
                                        contentTrailing={
                                            <Button className="m-0 px-2 py-1 text-sm" color="secondary" size="sm" iconLeading={Plus} onClick={openPaymentModal}>
                                                Add Payment
                                            </Button>
                                        }
                                    />
                                    <div className="space-y-6 p-4">
                                        {Object.keys(groupedPayments).length === 0 && (
                                            <div className="text-sm text-tertiary">No payments found.</div>
                                        )}
                                        {Object.entries(groupedPayments).map(([paymentTo, items]) => {
                                            const totalAmount = items.reduce((sum, payment) => sum + Number(payment.amount || 0), 0);
                                            const showTable = isTableVisible[paymentTo] ?? true;
                                            return (
                                                <div key={paymentTo} className="space-y-3">
                                                    <div className="flex flex-wrap items-center justify-between gap-2">
                                                        <div className="text-sm font-semibold text-primary">
                                                            {paymentTo === "paymentToCompany"
                                                                ? "Payment to Company"
                                                                : paymentTo === "paymentForService"
                                                                  ? "Company payment for services"
                                                                  : `Payments for ${paymentTo}`}
                                                        </div>
                                                        <button
                                                            type="button"
                                                            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-solid"
                                                            onClick={() =>
                                                                setIsTableVisible((prev) => ({
                                                                    ...prev,
                                                                    [paymentTo]: !showTable,
                                                                }))
                                                            }
                                                        >
                                                            Total Amount: {formatCurrencyInr(totalAmount)}
                                                            {showTable ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
                                                        </button>
                                                    </div>

                                                    {showTable && (
                                                        <div className="overflow-x-auto rounded-lg border border-secondary">
                                                            <table className="w-full border-collapse text-sm">
                                                                <thead className="bg-secondary text-tertiary">
                                                                    <tr>
                                                                        <th className="px-3 py-2 text-left font-semibold">#</th>
                                                                        <th className="px-3 py-2 text-left font-semibold">Date</th>
                                                                        <th className="px-3 py-2 text-left font-semibold">Amount</th>
                                                                        <th className="px-3 py-2 text-left font-semibold">Payment Mode</th>
                                                                        <th className="px-3 py-2 text-left font-semibold">Payment To</th>
                                                                        <th className="px-3 py-2 text-left font-semibold">Remarks</th>
                                                                        <th className="px-3 py-2 text-left font-semibold">Receipt No</th>
                                                                        <th className="px-3 py-2 text-left font-semibold">Actions</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {items.map((payment, index) => (
                                                                        <tr key={getId(payment) || index} className="border-t border-secondary">
                                                                            <td className="px-3 py-2 text-tertiary">{index + 1}</td>
                                                                            <td className="px-3 py-2 text-tertiary">
                                                                                {formatPaymentDate(payment.paymentDate)}
                                                                            </td>
                                                                            <td className="px-3 py-2">
                                                                                <Badge size="sm" color="success">
                                                                                    {formatCurrencyInr(payment.amount)}
                                                                                </Badge>
                                                                            </td>
                                                                            <td className="px-3 py-2 text-tertiary">
                                                                                {paymentStores.find((store) => getId(store) === getId(payment.paymentStore))?.title || "-"}
                                                                            </td>
                                                                            <td className="px-3 py-2 text-tertiary">
                                                                                {payment.paymentTo === "paymentToCompany"
                                                                                    ? "Company"
                                                                                    : payment.paymentTo === "paymentForService"
                                                                                      ? "Services"
                                                                                      : payment.paymentTo}
                                                                            </td>
                                                                            <td className="px-3 py-2 text-tertiary">{payment.remarks || "-"}</td>
                                                                            <td className="px-3 py-2 text-tertiary">{payment.receiptNo || "-"}</td>
                                                                            <td className="px-3 py-2">
                                                                                <Dropdown.Root>
                                                                                    <Dropdown.DotsButton />
                                                                                    <Dropdown.Popover>
                                                                                        <Dropdown.Menu>
                                                                                            <Dropdown.Item icon={FaEye} onAction={() => handleViewReceipt(getId(payment))}>
                                                                                                View Receipt
                                                                                            </Dropdown.Item>
                                                                                            <Dropdown.Item
                                                                                                icon={BiMailSend}
                                                                                                onAction={() => {
                                                                                                    setSelectedPayment(payment);
                                                                                                    setMailModalOpen(true);
                                                                                                }}
                                                                                            >
                                                                                                Send Mail
                                                                                            </Dropdown.Item>
                                                                                            <Dropdown.Item
                                                                                                icon={FaWhatsapp}
                                                                                                onAction={() => handleSendWhatsapp(payment)}
                                                                                            >
                                                                                                Send WhatsApp
                                                                                            </Dropdown.Item>
                                                                                            <Dropdown.Item
                                                                                                icon={FaEdit}
                                                                                                onAction={() => handleEditPayment(getId(payment))}
                                                                                            >
                                                                                                Edit
                                                                                            </Dropdown.Item>
                                                                                            <Dropdown.Item
                                                                                                icon={FaTrash}
                                                                                                onAction={() => confirmDelete(payment)}
                                                                                            >
                                                                                                Delete
                                                                                            </Dropdown.Item>
                                                                                        </Dropdown.Menu>
                                                                                    </Dropdown.Popover>
                                                                                </Dropdown.Root>
                                                                            </td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </TableCard.Root>
                            </div>
                        </div>
                    </Tabs.Panel>

                    <Tabs.Panel id="assignmentDetails">
                        <div className="flex justify-end mb-3 py-2">
                            <a href={`/package-voucher/${getId(assignment)}`} target="_blank" rel="noreferrer">
                                <Button color="secondary" size="sm">
                                    View Package Voucher
                                </Button>
                            </a>
                        </div>
                        <AssignmentDetails data={assignment} paymentStores={paymentStores} />
                    </Tabs.Panel>
                </Tabs>
            </div>

            <Tmodal
                isOpen={paymentModalOpen}
                onClose={closePaymentModal}
                header="Payment form"
                hideCloseButton={true}
                hideCancelButton={true}
                content={
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <div className="text-sm font-semibold text-secondary">Payment Date and Time</div>
                            <Toggle
                                size="sm"
                                isSelected={isDateAuto}
                                onChange={(value) => {
                                    const next = Boolean(value);
                                    setIsDateAuto(next);
                                    if (next) {
                                        handleFormChange("paymentDate", getLocalDateTime());
                                    }
                                }}
                                label={isDateAuto ? "Auto" : "Manual"}
                            />
                        </div>
                        <Input
                            type="datetime-local"
                            label="Payment Date"
                            value={formatDatetimeLocal(formData.paymentDate) || (isDateAuto ? getLocalDateTime() : "")}
                            isDisabled={isDateAuto}
                            onChange={(value) => handleFormChange("paymentDate", value)}
                            isInvalid={Boolean(formErrors.paymentDate)}
                            hint={formErrors.paymentDate}
                        />
                        <Input
                            type="number"
                            label="Amount"
                            value={formData.amount}
                            onChange={(value) => handleFormChange("amount", value)}
                            isInvalid={Boolean(formErrors.amount)}
                            hint={formErrors.amount}
                        />
                        <Select
                            label="Payment Mode"
                            selectedKey={formData.paymentStore}
                            onSelectionChange={(key) => handlePaymentStoreChange(String(key))}
                            items={paymentStores.map((store) => ({ id: getId(store), label: store.title }))}
                            placeholder="Payment Mode"
                            isInvalid={Boolean(formErrors.paymentStore)}
                            hint={formErrors.paymentStore}
                        >
                            {(item) => <Select.Item id={item.id} label={item.label} />}
                        </Select>
                        <Select
                            label="Payment Recipient"
                            selectedKey={formData.paymentTo}
                            onSelectionChange={(key) => handlePaymentToChange(String(key))}
                            items={paymentToOptions}
                            placeholder="Payment Recipient"
                            isInvalid={Boolean(formErrors.paymentTo)}
                            hint={formErrors.paymentTo}
                        >
                            {(item) => <Select.Item id={item.id} label={item.label} />}
                        </Select>

                        {packageServices.length > 0 && formData.paymentTo === "paymentForService" && (
                            <div className="flex flex-col gap-3">
                                {packageServices.map((service: any, index: number) => (
                                    <div key={service.id} className="rounded-lg border border-secondary bg-secondary p-3">
                                        <div className="flex items-center justify-between text-sm font-semibold text-primary">
                                            <span>{service.title}</span>
                                            <Badge size="sm" color="brand">
                                                {formatCurrencyInr(service.pendingAmount)}
                                            </Badge>
                                        </div>
                                        <Input
                                            type="number"
                                            value={formData.packageServices?.[index]?.amount || ""}
                                            onChange={(value) => handlePackageAmountChange(index, value)}
                                            placeholder="Enter amount"
                                            className="mt-2"
                                        />
                                        {Number(formData.packageServices?.[index]?.amount || 0) > Number(service.pendingAmount || 0) && (
                                            <div className="mt-2 text-xs font-semibold text-warning-text">
                                                Paying Extra {formatCurrencyInr(Number(formData.packageServices[index].amount) - Number(service.pendingAmount))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                        <TextArea
                            label="Description"
                            value={formData.remarks}
                            onChange={(value) => handleFormChange("remarks", value)}
                            placeholder="Description"
                        />
                        <div className="flex justify-end gap-2">
                            <Button color="secondary" onClick={closePaymentModal}>
                                Close
                            </Button>
                            {editPaymentId ? (
                                <Button color="primary" onClick={handleUpdatePayment}>
                                    Update
                                </Button>
                            ) : (
                                <Button color="primary" onClick={handleAddPayment}>
                                    Add
                                </Button>
                            )}
                        </div>
                    </div>
                }
            />

            <Tmodal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={handleDeletePayment}
                header="Confirm Deletion"
                content={`<p className="text-sm text-center font-semibold text-primary">Are you sure you want to delete payment of INR: <b>${deleteTarget?.amount ?? ""}</b> ?</p>`}
            />

            <Tmodal
                isOpen={linkedDeleteModalOpen}
                onClose={() => setLinkedDeleteModalOpen(false)}
                header={`Error: ${linkedPaymentData?.message || "Linked payment"}`}
                content={
                    <div className="flex flex-col gap-4">
                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                            {linkedPaymentData?.paymentData?.map((item, index) => (
                                <div key={index} className="rounded-lg border border-secondary bg-secondary p-3">
                                    <div className="text-sm font-semibold text-primary">#{index + 1} {item.receiptNo || item.id}</div>
                                    <div className="text-xs text-tertiary">{formatPaymentDate(item.paymentDate)}</div>
                                    <div className="mt-2 text-xs text-tertiary">
                                        Amount: {formatCurrencyInr(item.amount)}
                                    </div>
                                    {item.remarks && <div className="text-xs text-tertiary">Remark: {item.remarks}</div>}
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-end">
                            <Button color="primary-destructive" onClick={handleDeleteLinkedPayments}>
                                Delete
                            </Button>
                        </div>
                    </div>
                }
            />


            <Tmodal
                isOpen={mailModalOpen}
                onClose={() => setMailModalOpen(false)}
                header="Send Payment Receipt Mail"
                size="xl"
                hideCancelButton={true}
                content={
                    selectedPayment ? (
                        <MailConfirmation
                            selectedId={getId(selectedPayment)}
                            email={selectedPayment?.email}
                            showPreview={true}
                            modalClose={() => setMailModalOpen(false)}
                            sendMailFnName="sendPaymentMail"
                        />
                    ) : null
                }
            />

            <Tmodal
                isOpen={mailReminderOpen}
                onClose={() => setMailReminderOpen(false)}
                header="Send Payment Reminder Mail"
                size="xl"
                hideCancelButton={true}
                content={
                    selectedPaymentReminder ? (
                        <MailConfirmation
                            selectedId={getId(selectedPaymentReminder)}
                            email={selectedPaymentReminder?.email}
                            showPreview={true}
                            modalClose={() => setMailReminderOpen(false)}
                            sendMailFnName="sendPaymentReminderMail"
                            mailAddData={[{ dueDate: "", type: "datetime-local", required: true }, { amount: "", type: "number", required: true }]}
                        />
                    ) : null
                }
            />
        </DefaultLayout>
    );
}
