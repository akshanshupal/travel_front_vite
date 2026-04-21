import { DefaultLayout } from "@/layouts/DefaultLayout";
import { TableCard } from "@/components/application/table/table";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import { useStoreSnackbar } from "@/store/snackbar";
import { getCampaignById } from "@/utils/services/campaignService";
import { getSalesEx } from "@/utils/services/salesService";
import { ArrowLeft, Edit01 } from "@untitledui/icons";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";

type SalesItem = { id: string; username?: string; name?: string };

type CampaignData = {
    title?: string;
    pipeline?: { title?: string };
    managingCampaign?: string[];
    salesExecutive?: string[];
    distributionType?: string;
    additionalSetting?: { priority?: string; checkForDuplicates?: string; duplicatesFound?: string };
    status?: boolean;
};

const asArray = (value: any) => (Array.isArray(value) ? value : []);
const getId = (value: any) => String(value?.id ?? value?._id ?? value ?? "").trim();

const InfoRow = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div className="flex flex-col gap-1">
        <div className="text-xs font-medium uppercase tracking-wide text-tertiary">{label}</div>
        <div className="text-sm font-medium text-primary">{children}</div>
    </div>
);

export default function CampaignViewPage() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { showSnackbar } = useStoreSnackbar();

    const [data, setData] = useState<CampaignData | null>(null);
    const [salesList, setSalesList] = useState<SalesItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const run = async () => {
            try {
                const res = await getSalesEx();
                const resolved = (res as any)?.data ?? res;
                const list = Array.isArray(resolved?.data) ? resolved.data : Array.isArray(resolved) ? resolved : asArray(resolved?.items);
                setSalesList(asArray(list).map((it: any) => ({ id: getId(it), username: it?.username || "", name: it?.name || "" })).filter((x: any) => x.id));
            } catch { setSalesList([]); }
        };
        if (id) run();
    }, [id]);

    useEffect(() => {
        if (!id) return;
        const run = async () => {
            setLoading(true);
            try {
                const res = await getCampaignById(id, { populate: "pipeline" });
                setData((res as any)?.data ?? res);
            } catch (e: any) {
                showSnackbar({ title: "Error", description: e?.message || "Failed to load campaign", color: "danger" });
            } finally {
                setLoading(false);
            }
        };
        run();
    }, [id, showSnackbar]);

    const salesListById = useMemo(() => new Map(salesList.map(s => [s.id, s.username || s.name || ""])), [salesList]);

    const renderSalesNames = (ids: string[] | undefined) => (
        <div className="flex flex-wrap gap-1">
            {asArray(ids).length > 0 ? asArray(ids).map(execId => (
                <Badge key={execId} size="sm" color="blue">{salesListById.get(execId) || execId}</Badge>
            )) : <span className="text-sm text-tertiary">N/A</span>}
        </div>
    );

    const breadcrumbs = (
        <div className="mb-4 rounded-sm border border-secondary bg-primary p-2">
            <div className="flex flex-wrap items-center gap-1 text-sm text-tertiary">
                <button type="button" onClick={() => navigate("/dashboard")} className="rounded-sm px-1 py-0.5 text-primary hover:bg-primary_hover">Home</button>
                <span>/</span>
                <button type="button" onClick={() => navigate("/lead-management/campaign")} className="rounded-sm px-1 py-0.5 text-primary hover:bg-primary_hover">Campaign</button>
                <span>/</span>
                <span className="px-1 py-0.5 text-primary">View</span>
            </div>
        </div>
    );

    return (
        <DefaultLayout>
            {breadcrumbs}
            <TableCard.Root>
                <TableCard.Header
                    title="Campaign Details"
                    contentTrailing={
                        <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center md:justify-end">
                            <Button color="secondary" iconLeading={ArrowLeft} onClick={() => navigate("/lead-management/campaign")}>Back</Button>
                            <Button color="primary" iconLeading={Edit01} onClick={() => navigate(`/lead-management/campaign/edit/${id}`)}>Edit</Button>
                        </div>
                    }
                />

                <div className="bg-primary px-4 py-5 md:px-6">
                    {loading ? (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 animate-pulse">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="h-3 w-1/4 rounded bg-secondary" />
                                    <div className="h-5 w-3/4 rounded bg-secondary" />
                                </div>
                            ))}
                        </div>
                    ) : data ? (
                        <>
                            {/* Basic Information */}
                            <div className="mb-6">
                                <h2 className="mb-4 flex items-center gap-2 border-b border-secondary pb-2 text-sm font-semibold text-primary">
                                    <span className="inline-block h-2 w-2 rounded-full bg-brand-500" />
                                    Campaign Information
                                </h2>
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <InfoRow label="Campaign Name">{data.title || "N/A"}</InfoRow>
                                    <InfoRow label="Pipeline Name">{data.pipeline?.title || "N/A"}</InfoRow>
                                    <InfoRow label="Distribution Type">{data.distributionType || "N/A"}</InfoRow>
                                    <InfoRow label="Status">
                                        <Badge size="sm" color={data.status ? "success" : "error"}>
                                            {data.status ? "Active" : "Inactive"}
                                        </Badge>
                                    </InfoRow>
                                </div>
                            </div>

                            {/* Team */}
                            <div className="mb-6">
                                <h2 className="mb-4 flex items-center gap-2 border-b border-secondary pb-2 text-sm font-semibold text-primary">
                                    <span className="inline-block h-2 w-2 rounded-full bg-brand-500" />
                                    Team Assignment
                                </h2>
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <InfoRow label="Managing Campaign">{renderSalesNames(data.managingCampaign)}</InfoRow>
                                    <InfoRow label="Sales Executive">{renderSalesNames(data.salesExecutive)}</InfoRow>
                                </div>
                            </div>

                            {/* Additional Settings */}
                            <div>
                                <h2 className="mb-4 flex items-center gap-2 border-b border-secondary pb-2 text-sm font-semibold text-primary">
                                    <span className="inline-block h-2 w-2 rounded-full bg-brand-500" />
                                    Additional Settings
                                </h2>
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                    <InfoRow label="Priority">{data.additionalSetting?.priority || "N/A"}</InfoRow>
                                    <InfoRow label="Check for Duplicates">{data.additionalSetting?.checkForDuplicates || "N/A"}</InfoRow>
                                    <InfoRow label="Duplicates Found">{data.additionalSetting?.duplicatesFound || "N/A"}</InfoRow>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="py-10 text-center text-sm text-tertiary">No data found</div>
                    )}
                </div>
            </TableCard.Root>
        </DefaultLayout>
    );
}
