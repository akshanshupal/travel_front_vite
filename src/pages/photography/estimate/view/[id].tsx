import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { DefaultLayout } from "@/layouts/DefaultLayout";
import { TableCard } from "@/components/application/table/table";
import { Button } from "@/components/base/buttons/button";
import { getPhotographyEstimateById } from "@/utils/services/photographyEstimateService";

const formatDate = (value: string) => {
    if (!value) return "-";
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return value;
    return `${d.getDate().toString().padStart(2, "0")}-${d.toLocaleString("en-US", { month: "short" })}-${d.getFullYear()}`;
};
const looksLikeHtml = (value: string) => /<\/?[a-z][\s\S]*>/i.test(value);

export default function PhotographyEstimateViewPage() {
    const navigate = useNavigate();
    const params = useParams();
    const id = String(params.id || "");
    const [loading, setLoading] = useState(true);
    const [estimate, setEstimate] = useState<any>(null);

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

    return (
        <DefaultLayout>
            <TableCard.Root>
                <TableCard.Header title="View Photography Estimate" />
                <div className="space-y-4 bg-primary px-4 py-5 md:px-6">
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                        <div>
                            <div className="text-xs text-tertiary">Estimate Number</div>
                            <div className="text-sm text-primary">{loading ? "Loading..." : estimate?.estimateNumber || "-"}</div>
                        </div>
                        <div>
                            <div className="text-xs text-tertiary">Client</div>
                            <div className="text-sm text-primary">{loading ? "Loading..." : estimate?.client?.name || "-"}</div>
                        </div>
                        <div>
                            <div className="text-xs text-tertiary">Estimate Date</div>
                            <div className="text-sm text-primary">{loading ? "Loading..." : formatDate(estimate?.estimateDate)}</div>
                        </div>
                        <div>
                            <div className="text-xs text-tertiary">Valid Until</div>
                            <div className="text-sm text-primary">{loading ? "Loading..." : formatDate(estimate?.validUntil)}</div>
                        </div>
                        <div>
                            <div className="text-xs text-tertiary">Grand Total</div>
                            <div className="text-sm text-primary">{loading ? "Loading..." : estimate?.grandTotal ?? "-"}</div>
                        </div>
                    </div>

                    <div className="rounded-lg border border-secondary p-3">
                        <div className="mb-2 text-sm font-semibold text-primary">Items</div>
                        {(estimate?.items || []).map((item: any, index: number) => (
                            <div key={index} className="mb-3 rounded-md border border-secondary p-2">
                                <div className="font-medium text-primary">
                                    {item.mainEventName} {item.timing}
                                </div>
                                <ul className="list-disc pl-5 text-sm text-tertiary">
                                    {(item.deliverables || []).map((entry: string, row: number) => (
                                        <li key={row}>
                                            {looksLikeHtml(entry) ? (
                                                <div dangerouslySetInnerHTML={{ __html: entry }} />
                                            ) : (
                                                entry
                                            )}
                                        </li>
                                    ))}
                                </ul>
                                <div className="text-sm text-primary">Package Cost: {item.packageCost}</div>
                            </div>
                        ))}
                    </div>

                    <div>
                        <Button color="secondary" onClick={() => navigate("/photography/estimate")}>
                            Back
                        </Button>
                    </div>
                </div>
            </TableCard.Root>
        </DefaultLayout>
    );
}
