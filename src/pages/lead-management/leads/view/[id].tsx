import { DefaultLayout } from "@/layouts/DefaultLayout";
import { TableCard } from "@/components/application/table/table";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import { useStoreSnackbar } from "@/store/snackbar";
import { getLeadsById } from "@/utils/services/leadsService";
import { ArrowLeft, Edit01 } from "@untitledui/icons";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

type LeadData = {
    title?: string;
    mobile?: string;
    email?: string;
    otherOptions?: string;
    status?: boolean;
    createdAt?: string;
    updatedAt?: string;
    pipeline?: { title?: string; initialStage?: { name?: string } };
    campaign?: { title?: string; managingCampaign?: string; additionalSetting?: { priority?: string }; distributionType?: string };
    salesExecutive?: { name?: string };
};

const formatDate = (dateStr: string | undefined) => {
    if (!dateStr) return "N/A";
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "Invalid Date";
    return d.toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "numeric", minute: "numeric", hour12: true });
};

const InfoRow = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div className="flex flex-col gap-1">
        <div className="text-xs font-medium uppercase tracking-wide text-tertiary">{label}</div>
        <div className="text-sm font-medium text-primary">{children}</div>
    </div>
);

export default function LeadsViewPage() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { showSnackbar } = useStoreSnackbar();

    const [data, setData] = useState<LeadData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        const run = async () => {
            setLoading(true);
            try {
                const res = await getLeadsById(id, {
                    populate: "pipeline,campaign,salesExecutive",
                    select_pipeline: "title",
                });
                setData((res as any)?.data ?? res);
            } catch (e: any) {
                showSnackbar({ title: "Error", description: e?.message || "Failed to load lead", color: "danger" });
            } finally {
                setLoading(false);
            }
        };
        run();
    }, [id, showSnackbar]);

    const breadcrumbs = (
        <div className="mb-4 rounded-sm border border-secondary bg-primary p-2">
            <div className="flex flex-wrap items-center gap-1 text-sm text-tertiary">
                <button type="button" onClick={() => navigate("/dashboard")} className="rounded-sm px-1 py-0.5 text-primary hover:bg-primary_hover">
                    Home
                </button>
                <span>/</span>
                <button type="button" onClick={() => navigate("/lead-management/leads")} className="rounded-sm px-1 py-0.5 text-primary hover:bg-primary_hover">
                    Leads
                </button>
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
                    title="Lead Details"
                    contentTrailing={
                        <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center md:justify-end">
                            <Button color="secondary" iconLeading={ArrowLeft} onClick={() => navigate("/lead-management/leads")}>
                                Back
                            </Button>
                            <Button color="primary" iconLeading={Edit01} onClick={() => navigate(`/lead-management/leads/edit/${id}`)}>
                                Edit
                            </Button>
                        </div>
                    }
                />

                <div className="bg-primary px-4 py-5 md:px-6">
                    {loading ? (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 animate-pulse">
                            {Array.from({ length: 8 }).map((_, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="h-3 w-1/4 rounded bg-secondary" />
                                    <div className="h-5 w-3/4 rounded bg-secondary" />
                                </div>
                            ))}
                        </div>
                    ) : data ? (
                        <>
                            {/* Section: Lead Information */}
                            <div className="mb-6">
                                <h2 className="mb-4 flex items-center gap-2 border-b border-secondary pb-2 text-sm font-semibold text-primary">
                                    <span className="inline-block h-2 w-2 rounded-full bg-brand-500" />
                                    Lead Information
                                </h2>
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <InfoRow label="Lead Name">{data.title || "N/A"}</InfoRow>
                                    <InfoRow label="Lead Number">{data.mobile || "N/A"}</InfoRow>
                                    <InfoRow label="Email">{data.email || "N/A"}</InfoRow>
                                    <InfoRow label="Description">{data.otherOptions || "N/A"}</InfoRow>
                                    <InfoRow label="Created At">{formatDate(data.createdAt)}</InfoRow>
                                    <InfoRow label="Updated At">{formatDate(data.updatedAt)}</InfoRow>
                                    <InfoRow label="Status">
                                        <Badge size="sm" color={data.status ? "success" : "error"}>
                                            {data.status ? "Active" : "Inactive"}
                                        </Badge>
                                    </InfoRow>
                                </div>
                            </div>

                            {/* Section: Pipeline & Campaign */}
                            <div className="mb-6">
                                <h2 className="mb-4 flex items-center gap-2 border-b border-secondary pb-2 text-sm font-semibold text-primary">
                                    <span className="inline-block h-2 w-2 rounded-full bg-brand-500" />
                                    Pipeline & Campaign
                                </h2>
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <InfoRow label="Pipeline Name">{data.pipeline?.title || "N/A"}</InfoRow>
                                    <InfoRow label="Lead Stage">{data.pipeline?.initialStage?.name || "N/A"}</InfoRow>
                                    <InfoRow label="Campaign Name">{data.campaign?.title || "N/A"}</InfoRow>
                                    <InfoRow label="Campaign Managing Name">{data.campaign?.managingCampaign || "N/A"}</InfoRow>
                                    <InfoRow label="Campaign Priority">{data.campaign?.additionalSetting?.priority || "N/A"}</InfoRow>
                                    <InfoRow label="Distribution Type">{data.campaign?.distributionType || "N/A"}</InfoRow>
                                </div>
                            </div>

                            {/* Section: Assignment */}
                            <div>
                                <h2 className="mb-4 flex items-center gap-2 border-b border-secondary pb-2 text-sm font-semibold text-primary">
                                    <span className="inline-block h-2 w-2 rounded-full bg-brand-500" />
                                    Assignment
                                </h2>
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <InfoRow label="Assigned User">{data.salesExecutive?.name || "N/A"}</InfoRow>
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
