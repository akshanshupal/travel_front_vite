import { useEffect, useState } from "react";
import { DefaultLayout } from "@/layouts/DefaultLayout";
import { TableCard } from "@/components/application/table/table";
import { Button } from "@/components/base/buttons/button";
import { useNavigate } from "react-router";
import { getPhotographyEstimates } from "@/utils/services/photographyEstimateService";

const formatDate = (value: string) => {
    if (!value) return "-";
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return value;
    return `${d.getDate().toString().padStart(2, "0")}-${d.toLocaleString("en-US", { month: "short" })}-${d.getFullYear()}`;
};

export default function PhotographyEstimatePage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [estimates, setEstimates] = useState<any[]>([]);

    const fetchEstimates = async () => {
        setLoading(true);
        try {
            const response: any = await getPhotographyEstimates({ limit: "100", totalCount: "true" });
            const resolved = response?.data ?? response;
            const list = Array.isArray(resolved?.data) ? resolved.data : Array.isArray(resolved) ? resolved : [];
            setEstimates(list);
        } catch {
            setEstimates([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEstimates();
    }, []);

    return (
        <DefaultLayout>
            <TableCard.Root>
                <TableCard.Header
                    title="Photography - Estimates"
                    badge={loading ? "..." : estimates.length}
                    contentTrailing={
                        <Button color="primary" onClick={() => navigate("/photography/estimate/add")}>
                            Add Estimate
                        </Button>
                    }
                />
                <div className="overflow-x-auto bg-primary px-4 py-5 md:px-6">
                    <table className="w-full border-collapse text-left text-sm">
                        <thead>
                            <tr className="border-b border-secondary text-tertiary">
                                <th className="px-2 py-2">Estimate Number</th>
                                <th className="px-2 py-2">Client</th>
                                <th className="px-2 py-2">Estimate Date</th>
                                <th className="px-2 py-2">Valid Until</th>
                                <th className="px-2 py-2">Grand Total</th>
                                <th className="px-2 py-2 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {estimates.map((estimate) => (
                                <tr key={estimate.id} className="border-b border-secondary">
                                    <td className="px-2 py-2">{estimate.estimateNumber || "-"}</td>
                                    <td className="px-2 py-2">{estimate?.client?.name || "-"}</td>
                                    <td className="px-2 py-2">{formatDate(estimate.estimateDate)}</td>
                                    <td className="px-2 py-2">{formatDate(estimate.validUntil)}</td>
                                    <td className="px-2 py-2">{estimate?.grandTotal ?? "-"}</td>
                                    <td className="px-2 py-2">
                                        <div className="flex justify-end gap-2">
                                            <Button size="sm" color="secondary" onClick={() => navigate(`/photography/estimate/view/${estimate.id}`)}>
                                                View
                                            </Button>
                                            <Button size="sm" color="secondary" onClick={() => navigate(`/photography/estimate/edit/${estimate.id}`)}>
                                                Edit
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {!loading && estimates.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-2 py-4 text-tertiary">
                                        No estimates found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </TableCard.Root>
        </DefaultLayout>
    );
}
