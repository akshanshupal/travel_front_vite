import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { DefaultLayout } from "@/layouts/DefaultLayout";
import { TableCard } from "@/components/application/table/table";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { useStoreSnackbar } from "@/store/snackbar";
import { convertPhotographyEstimate, getPhotographyEstimateById } from "@/utils/services/photographyEstimateService";
import { buildPhotographyEstimatePdf } from "@/pages/photography/estimate/pdf";

const formatDate = (value: string) => {
    if (!value) return "-";
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return value;
    return `${d.getDate().toString().padStart(2, "0")}-${d.toLocaleString("en-US", { month: "short" })}-${d.getFullYear()}`;
};
const htmlToPlainText = (value: string) => {
    if (!value) return "";
    const parser = new DOMParser();
    const doc = parser.parseFromString(value, "text/html");
    return (doc.body.textContent || "").replace(/\s+/g, " ").trim();
};

export default function PhotographyEstimateViewPage() {
    const navigate = useNavigate();
    const params = useParams();
    const { showSnackbar } = useStoreSnackbar();
    const id = String(params.id || "");
    const [loading, setLoading] = useState(true);
    const [estimate, setEstimate] = useState<any>(null);
    const [converting, setConverting] = useState(false);
    const [gst, setGst] = useState("0");
    const [tokenAmount, setTokenAmount] = useState("0");

    const baseAmount = Number(estimate?.grandTotal || 0);
    const gstValue = Number(gst || 0);
    const totalAmount = baseAmount + (Number.isFinite(gstValue) ? gstValue : 0);

    useEffect(() => {
        const run = async () => {
            setLoading(true);
            try {
                const response: any = await getPhotographyEstimateById(id);
                setEstimate(response?.data ?? response);
            } finally {
                setLoading(false);
            }
        };
        run();
    }, [id]);

    const handleConvertToBooking = async () => {
        if (!estimate?.id) return;
        const token = Number(tokenAmount || 0);
        if (token < 0) {
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
        setConverting(true);
        try {
            const booking: any = await convertPhotographyEstimate(estimate.id, {
                gst: gstValue,
                tokenAmount: token,
                totalAmount,
            });
            const bookingId = booking?.data?.id || booking?.id;
            showSnackbar({
                title: "Success",
                description: "Estimate converted to booking successfully.",
                color: "success",
            });
            if (bookingId) {
                navigate(`/photography/booking/view/${bookingId}`);
                return;
            }
            const response: any = await getPhotographyEstimateById(id);
            setEstimate(response?.data ?? response);
        } catch (error: any) {
            showSnackbar({
                title: "Error",
                description: error?.error?.message || error?.message || "Failed to convert estimate.",
                color: "danger",
            });
        } finally {
            setConverting(false);
        }
    };

    return (
        <DefaultLayout>
            <TableCard.Root>
                <TableCard.Header title="View Photography Estimate" />
                <div className="space-y-4 bg-primary px-4 py-5 md:px-6">
                    <div className="rounded-lg border border-secondary p-4">
                        <div className="grid grid-cols-1 gap-3 md:grid-cols-[120px_1fr]">
                            <div className="flex h-16 items-center justify-center rounded border border-secondary text-xs text-tertiary">Company Logo</div>
                            <div className="text-center">
                                <div className="text-base font-semibold text-primary"># CAPTURING MOMENTS-ESTIMATE</div>
                                <div className="text-xs text-tertiary">For any Service Related Issues Mail:- sales@capturingmoments.co.in</div>
                                <div className="text-xs text-tertiary">
                                    Capturing Moments Office No-A-1106, Tower - T3, Block A, NX One, Noida Extention Noida, Uttar Pradesh 201306, India
                                </div>
                                <div className="text-xs text-tertiary">8860030886 | capturing-moment-website.vercel.app</div>
                            </div>
                        </div>

                        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <div className="text-sm font-semibold text-primary">BILL TO</div>
                                <div className="mt-1 text-sm text-primary">{loading ? "Loading..." : estimate?.client?.name || "-"}</div>
                                <div className="text-sm text-primary">{loading ? "Loading..." : estimate?.client?.address || "-"}</div>
                                <div className="text-sm text-primary">{loading ? "Loading..." : estimate?.client?.phone || "-"}</div>
                            </div>
                            <div>
                                <div className="text-sm font-semibold text-primary">Estimate Meta</div>
                                <div className="mt-1 text-sm text-primary">
                                    Estimate Number: {loading ? "Loading..." : estimate?.estimateNumber || "-"}
                                </div>
                                <div className="text-sm text-primary">Estimate Date: {loading ? "Loading..." : formatDate(estimate?.estimateDate || "")}</div>
                                <div className="text-sm text-primary">Valid Until: {loading ? "Loading..." : formatDate(estimate?.validUntil || "")}</div>
                                <div className="text-sm text-primary">Grand Total (INR): {loading ? "Loading..." : Number(estimate?.grandTotal || 0).toFixed(2)}</div>
                            </div>
                        </div>

                        <div className="mt-4 overflow-x-auto rounded border border-secondary">
                            <table className="w-full border-collapse text-left text-sm">
                                <thead>
                                    <tr className="border-b border-secondary bg-secondary/20">
                                        <th className="px-3 py-2 font-semibold text-primary">Items</th>
                                        <th className="px-3 py-2 font-semibold text-primary">Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(estimate?.items || []).map((item: any, index: number) => {
                                        const deliverables = (item.deliverables || [])
                                            .map((entry: string) => htmlToPlainText(entry))
                                            .filter(Boolean);
                                        return (
                                            <tr key={index} className="border-b border-secondary align-top">
                                                <td className="px-3 py-2 text-primary">
                                                    <div className="font-bold uppercase">{item.mainEventName || "-"}</div>
                                                    <div className="mt-1 text-sm">Event Date: {item.eventDate ? formatDate(item.eventDate) : "-"}</div>
                                                    <div className="text-sm">Event Duration: {item.timing || "8:00 PM to 2:00 AM"}</div>
                                                    <ul className="mt-1 list-disc pl-5 text-sm">
                                                        {deliverables.length > 0 ? (
                                                            deliverables.map((entry: string, row: number) => <li key={row}>{entry}</li>)
                                                        ) : (
                                                            <li>-</li>
                                                        )}
                                                    </ul>
                                                </td>
                                                <td className="px-3 py-2 text-primary">INR {Number(item.packageCost || 0).toFixed(2)}</td>
                                            </tr>
                                        );
                                    })}
                                    {!loading && (estimate?.items || []).length === 0 && (
                                        <tr>
                                            <td colSpan={2} className="px-3 py-3 text-tertiary">
                                                No items found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-4 text-xs text-tertiary">
                            Notes / Terms Hospitality Group - Kotak Account Number- 4049111673 IFSC - KKBK0000154 Branch - Sector 51 Noida UPI:-
                            hospitalitygroup@kotak
                        </div>
                        <div className="mt-2 text-xs text-tertiary">
                            This is an electronically generated report, hence does not require a signature.
                        </div>
                    </div>

                    <div>
                        <div className="flex gap-2">
                            {!estimate?.booking ? (
                                <>
                                    <Input
                                        label="GST"
                                        type="number"
                                        value={gst}
                                        onChange={(value) => setGst(String(value))}
                                        className="max-w-[140px]"
                                    />
                                    <Input
                                        label="Token Amount"
                                        type="number"
                                        value={tokenAmount}
                                        onChange={(value) => setTokenAmount(String(value))}
                                        className="max-w-[160px]"
                                    />
                                    <Button color="primary" onClick={handleConvertToBooking} isDisabled={loading || !estimate || converting}>
                                        {converting ? "Converting..." : "Convert To Booking"}
                                    </Button>
                                </>
                            ) : (
                                <Button color="primary" onClick={() => navigate(`/photography/booking/view/${estimate?.booking?.id || estimate?.booking}`)}>
                                    View Booking
                                </Button>
                            )}
                            <Button
                                color="secondary"
                                onClick={() =>
                                    buildPhotographyEstimatePdf({
                                        estimateNumber: estimate?.estimateNumber || "-",
                                        estimateDate: estimate?.estimateDate || "",
                                        validUntil: estimate?.validUntil || "",
                                        grandTotal: Number(estimate?.grandTotal || 0),
                                        client: estimate?.client || null,
                                        items: estimate?.items || [],
                                        fileName: `Estimate-${estimate?.estimateNumber || Date.now()}.pdf`,
                                    })
                                }
                                isDisabled={loading || !estimate}
                            >
                                Print / Export PDF
                            </Button>
                            <Button color="secondary" onClick={() => navigate("/photography/estimate")}>
                                Back
                            </Button>
                        </div>
                    </div>
                </div>
            </TableCard.Root>
        </DefaultLayout>
    );
}
