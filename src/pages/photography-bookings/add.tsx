import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { DefaultLayout } from "@/layouts/DefaultLayout";
import { TableCard } from "@/components/application/table/table";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { useStoreSnackbar } from "@/store/snackbar";
import { convertPhotographyEstimate, getPhotographyEstimateById } from "@/utils/services/photographyEstimateService";
import { DeliverablesDnd, type DeliverableCollectionItem } from "@/pages/photography/shared/deliverables-dnd";
import { getPhotographyDeliverables } from "@/utils/services/photographyDeliverableService";

const formatDate = (value: string) => {
    if (!value) return "-";
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return value;
    return `${d.getDate().toString().padStart(2, "0")}-${d.toLocaleString("en-US", { month: "short" })}-${d.getFullYear()}`;
};

type EstimateItem = {
    mainEventName: string;
    timing: string;
    eventDate: string;
    deliverables: string[];
    packageCost: number;
};

export default function PhotographyBookingAddPage() {
    const navigate = useNavigate();
    const { showSnackbar } = useStoreSnackbar();
    const [searchParams] = useSearchParams();
    const estimateId = String(searchParams.get("estimate") || "");

    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);
    const [estimate, setEstimate] = useState<any>(null);
    const [gst, setGst] = useState("0");
    const [tokenAmount, setTokenAmount] = useState("0");
    const [items, setItems] = useState<EstimateItem[]>([]);
    const [collection, setCollection] = useState<DeliverableCollectionItem[]>([]);

    useEffect(() => {
        const run = async () => {
            if (!estimateId) {
                setLoading(false);
                return;
            }
            setLoading(true);
            try {
                const response: any = await getPhotographyEstimateById(estimateId);
                const data = response?.data ?? response;
                setEstimate(data || null);
                setItems(
                    (data?.items || []).map((item: any) => ({
                        mainEventName: String(item?.mainEventName || ""),
                        timing: String(item?.timing || ""),
                        eventDate: String(item?.eventDate || ""),
                        deliverables: Array.isArray(item?.deliverables)
                            ? item.deliverables.map((entry: any) => String(entry || "")).filter(Boolean)
                            : item?.deliverables
                              ? [String(item.deliverables)]
                              : [],
                        packageCost: Number(item?.packageCost || 0),
                    })),
                );
            } catch (error: any) {
                showSnackbar({
                    title: "Error",
                    description: error?.error?.message || error?.message || "Failed to load estimate",
                    color: "danger",
                });
            } finally {
                setLoading(false);
            }
        };
        run();
    }, [estimateId, showSnackbar]);

    useEffect(() => {
        const fetchCollection = async () => {
            try {
                const response: any = await getPhotographyDeliverables({ limit: "all" });
                const resolved = response?.data ?? response;
                const list = Array.isArray(resolved?.data) ? resolved.data : Array.isArray(resolved) ? resolved : [];
                setCollection(
                    list.map((item: any) => ({
                        id: String(item.id),
                        title: String(item.title || ""),
                    })),
                );
            } catch {
                setCollection([]);
            }
        };
        fetchCollection();
    }, []);

    const baseAmount = useMemo(() => items.reduce((sum, item) => sum + Number(item.packageCost || 0), 0), [items]);
    const gstValue = Number(gst || 0);
    const totalAmount = useMemo(() => {
        const amount = Number.isFinite(baseAmount) ? baseAmount : 0;
        const gstNum = Number.isFinite(gstValue) ? gstValue : 0;
        return amount + gstNum;
    }, [baseAmount, gstValue]);

    const updateItem = (index: number, patch: Partial<EstimateItem>) => {
        setItems((prev) => prev.map((item, i) => (i === index ? { ...item, ...patch } : item)));
    };

    const addItem = () => {
        setItems((prev) => [...prev, { mainEventName: "", timing: "", eventDate: "", deliverables: [], packageCost: 0 }]);
    };

    const removeItem = (index: number) => {
        setItems((prev) => prev.filter((_, i) => i !== index));
    };

    const onCreateBooking = async () => {
        if (!estimateId || !estimate?.id) return;
        if (estimate?.booking) {
            navigate(`/photography/booking/view/${estimate?.booking?.id || estimate?.booking}`);
            return;
        }
        const token = Number(tokenAmount || 0);
        if (!Number.isFinite(token) || token < 0) {
            showSnackbar({
                title: "Validation Error",
                description: "Token amount cannot be negative.",
                color: "danger",
            });
            return;
        }
        if (token > totalAmount) {
            showSnackbar({
                title: "Validation Error",
                description: "Token amount cannot be greater than total amount.",
                color: "danger",
            });
            return;
        }
        if (!items.length) {
            showSnackbar({
                title: "Validation Error",
                description: "Please keep at least one item.",
                color: "danger",
            });
            return;
        }
        setCreating(true);
        try {
            const response: any = await convertPhotographyEstimate(estimate.id, {
                amount: baseAmount,
                gst: Number.isFinite(gstValue) ? gstValue : 0,
                tokenAmount: token,
                totalAmount,
                items,
            });
            const booking = response?.data ?? response;
            const bookingId = booking?.id;
            showSnackbar({
                title: "Success",
                description: "Booking created successfully.",
                color: "success",
            });
            if (bookingId) navigate(`/photography/booking/view/${bookingId}`);
            else navigate("/photography/booking");
        } catch (error: any) {
            showSnackbar({
                title: "Error",
                description: error?.error?.message || error?.message || "Failed to create booking",
                color: "danger",
            });
        } finally {
            setCreating(false);
        }
    };

    return (
        <DefaultLayout>
            <TableCard.Root>
                <TableCard.Header title="Convert Estimate To Booking" />
                <div className="space-y-4 bg-primary px-4 py-5 md:px-6">
                    {!estimateId ? (
                        <div className="rounded border border-error p-3 text-sm text-error">Estimate id is missing in query. Use `?estimate=ESTIMATE_ID`.</div>
                    ) : loading ? (
                        <div className="text-sm text-tertiary">Loading estimate...</div>
                    ) : !estimate ? (
                        <div className="rounded border border-error p-3 text-sm text-error">Estimate not found.</div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                                <div className="rounded border border-secondary p-3">
                                    <div className="text-xs text-tertiary">Estimate Number</div>
                                    <div className="text-sm font-semibold text-primary">{estimate?.estimateNumber || "-"}</div>
                                </div>
                                <div className="rounded border border-secondary p-3">
                                    <div className="text-xs text-tertiary">Estimate Date</div>
                                    <div className="text-sm font-semibold text-primary">{formatDate(estimate?.estimateDate || "")}</div>
                                </div>
                                <div className="rounded border border-secondary p-3">
                                    <div className="text-xs text-tertiary">Client</div>
                                    <div className="text-sm font-semibold text-primary">{estimate?.client?.name || "-"}</div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                                <div className="rounded border border-secondary p-3">
                                    <div className="text-xs text-tertiary">Agent</div>
                                    <div className="text-sm font-semibold text-primary">{estimate?.agent?.name || "-"}</div>
                                </div>
                                <div className="rounded border border-secondary p-3">
                                    <div className="text-xs text-tertiary">Template Items</div>
                                    <div className="text-sm font-semibold text-primary">{items.length}</div>
                                </div>
                                <div className="rounded border border-secondary p-3">
                                    <div className="text-xs text-tertiary">Base Amount</div>
                                    <div className="text-sm font-semibold text-primary">₹{baseAmount.toFixed(2)}</div>
                                </div>
                            </div>
                            <div className="space-y-3 rounded-lg border border-secondary p-3">
                                <div className="text-sm font-semibold text-primary">Items & Deliverables (Editable)</div>
                                {items.map((item, index) => (
                                    <div key={index} className="grid grid-cols-1 gap-3 rounded-lg border border-secondary p-3 md:grid-cols-2">
                                        <Input
                                            label="Items (Main Event Name)"
                                            value={item.mainEventName}
                                            onChange={(value) => updateItem(index, { mainEventName: value })}
                                        />
                                        <Input label="Event Date" type="date" value={item.eventDate} onChange={(value) => updateItem(index, { eventDate: value })} />
                                        <Input label="Timing" value={item.timing} onChange={(value) => updateItem(index, { timing: value })} />
                                        <Input
                                            label="Package Cost (INR)"
                                            type="number"
                                            value={String(item.packageCost || 0)}
                                            onChange={(value) => updateItem(index, { packageCost: Number(value || 0) })}
                                        />
                                        <div className="md:col-span-2">
                                            <DeliverablesDnd
                                                collection={collection}
                                                deliverables={item.deliverables || []}
                                                onChange={(deliverables) => updateItem(index, { deliverables })}
                                                title="Deliverables"
                                            />
                                        </div>
                                        <div className="md:col-span-2 flex justify-end">
                                            <Button color="secondary-destructive" onClick={() => removeItem(index)}>
                                                Remove Item
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                                <div>
                                    <Button color="secondary" onClick={addItem}>
                                        Add Item
                                    </Button>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                                <Input label="GST" type="number" value={gst} onChange={(value) => setGst(String(value))} />
                                <Input
                                    label="Token Amount"
                                    type="number"
                                    value={tokenAmount}
                                    onChange={(value) => setTokenAmount(String(value))}
                                />
                                <Input label="Total Amount" type="number" value={String(totalAmount)} isDisabled />
                            </div>
                            {estimate?.booking ? (
                                <div className="rounded border border-warning p-3 text-sm text-warning">
                                    This estimate is already converted to booking.
                                </div>
                            ) : null}
                        </>
                    )}
                    <div className="flex gap-2">
                        <Button color="secondary" onClick={() => navigate("/photography/estimate")}>
                            Back
                        </Button>
                        <Button
                            color="primary"
                            onClick={onCreateBooking}
                            isDisabled={!estimateId || loading || !estimate || creating}
                        >
                            {creating ? "Creating..." : estimate?.booking ? "View Booking" : "Create Booking"}
                        </Button>
                    </div>
                </div>
            </TableCard.Root>
        </DefaultLayout>
    );
}
