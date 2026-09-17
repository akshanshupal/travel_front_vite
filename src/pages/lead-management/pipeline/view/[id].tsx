import { DefaultLayout } from "@/layouts/DefaultLayout";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Badge } from "@/components/base/badges/badges";
import { CloseButton } from "@/components/base/buttons/close-button";
import { Dialog, Modal, ModalOverlay } from "@/components/application/modals/modal";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { useStoreSnackbar } from "@/store/snackbar";
import { getPipelineById } from "@/utils/services/pipelineService";
import { copyCampaign, getCampaign, getCampaignDelete, getCampaignLogs, updateCampaignPauseFunction } from "@/utils/services/campaignService";
import { getLeadFunnelReport } from "@/utils/services/leadReportService";
import { CampaignFormModal } from "@/pages/lead-management/campaign/campaign-form-modal";
import { ArrowLeft, ArrowUp, ChevronDown, Copy01, FileSearch01, Plus, SearchLg, Trash01 } from "@untitledui/icons";
import { Doughnut } from "react-chartjs-2";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";

ChartJS.register(ArcElement, Tooltip, Legend);

type PipelineData = {
    title?: string;
    stages?: Array<{ name?: string; tags?: string[] }>;
};

type StageRow = {
    stageName: string;
    leadStatus: string;
    count: number;
};

type CampaignItem = {
    id: string;
    title?: string;
    pause?: boolean;
    additionalSetting?: { priority?: string };
};

type CampaignLogItem = {
    id: string;
    campaign?: { id?: string; title?: string } | string;
    action?: string;
    description?: string;
    changes?: Array<{ field?: string; oldValue?: string; newValue?: string }>;
    performedBy?: { id?: string; name?: string; email?: string } | string;
    createdAt?: string;
};

const ACTION_BADGE_COLORS: Record<string, "success" | "warning" | "gray" | "error" | "blue"> = {
    created: "success",
    updated: "gray",
    paused: "warning",
    unpaused: "blue",
    copied: "gray",
    deleted: "error",
};

const ACTION_LABELS: Record<string, string> = {
    created: "Created",
    updated: "Updated",
    paused: "Paused",
    unpaused: "Un-paused",
    copied: "Copied",
    deleted: "Deleted",
};

const formatLogDate = (value?: string) => {
    if (!value) return "—";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return String(value);
    return date.toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
};

const STATUS_GROUPS = [
    { key: "open", label: "OPEN" },
    { key: "in-progress", label: "IN-PROGRESS" },
    { key: "lost", label: "Rejected" },
    { key: "converted", label: "Sales Converted" },
] as const;

const GROUP_LABELS: Record<string, string> = {
    open: "OPEN",
    "in-progress": "In-Progress",
    lost: "Rejected",
    converted: "Sales Converted",
};

const FUNNEL_STEPS = [
    { key: "open", label: "OPEN", color: "#3B82F6" },
    { key: "in-progress", label: "IN-PROGRESS", color: "#6366F1" },
    { key: "converted", label: "Sales Converted", color: "#22C55E" },
    { key: "lost", label: "Rejected", color: "#EF4444" },
];

const CHART_COLORS = [
    "#EF4444", "#22D3EE", "#EAB308", "#7C3AED", "#0F172A",
    "#F97316", "#84CC16", "#EC4899", "#14B8A6", "#8B5CF6",
    "#F43F5E", "#0EA5E9", "#A16207", "#4D7C0F", "#9333EA",
];

const asArray = (value: any) => (Array.isArray(value) ? value : []);
const getId = (value: any) => String(value?.id ?? value?._id ?? value ?? "").trim();

const statusOf = (leadStatus: string | undefined) => {
    const value = String(leadStatus || "open").toLowerCase();
    if (value === "open" || value === "in-progress") return value;
    if (value === "converted") return "converted";
    if (value === "lost") return "lost";
    return "open";
};

export default function PipelineViewPage() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { showSnackbar } = useStoreSnackbar();

    const [data, setData] = useState<PipelineData | null>(null);
    const [campaignData, setCampaignData] = useState<CampaignItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [campaignLoading, setCampaignLoading] = useState(true);
    const [funnelStages, setFunnelStages] = useState<StageRow[]>([]);
    const [funnelTotals, setFunnelTotals] = useState<Record<string, number>>({});
    const [hidePaused, setHidePaused] = useState(false);

    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [showPauseModal, setShowPauseModal] = useState(false);
    const [pausingCampaigns, setPausingCampaigns] = useState(false);
    const [pauseStatus, setPauseStatus] = useState(true);

    const [logsTarget, setLogsTarget] = useState<CampaignItem | null>(null);
    const [logsData, setLogsData] = useState<CampaignLogItem[]>([]);
    const [logsLoading, setLogsLoading] = useState(false);

    const [deleteCampaignTarget, setDeleteCampaignTarget] = useState<CampaignItem | null>(null);
    const [deletingCampaign, setDeletingCampaign] = useState(false);
    const [copyingCampaignId, setCopyingCampaignId] = useState<string | null>(null);
    const [campaignSearch, setCampaignSearch] = useState("");
    const [campaignModalOpen, setCampaignModalOpen] = useState(false);
    const deletingCampaignRef = useRef(false);
    const summaryRef = useRef<HTMLDivElement | null>(null);

    const scrollToSummary = () => {
        navigate(`/lead-management/pipeline/view/${id}/lead-summary`);
    };

    const loadCampaigns = async (pipelineId: string) => {
        setCampaignLoading(true);
        try {
            const res = await getCampaign({
                populate: "pipeline",
                pipeline: pipelineId,
                select: "title,additionalSetting,pause",
                limit: "all",
            });
            const resolved = (res as any)?.data ?? res;
            const list = Array.isArray(resolved?.data) ? resolved.data : Array.isArray(resolved) ? resolved : asArray(resolved?.items);
            setCampaignData(asArray(list).map((it: any) => ({ id: getId(it), title: it?.title, pause: it?.pause, additionalSetting: it?.additionalSetting })).filter((x: any) => x.id));
        } catch {
            setCampaignData([]);
        } finally {
            setCampaignLoading(false);
        }
    };

    useEffect(() => {
        if (!id) return;
        const run = async () => {
            setLoading(true);
            try {
                const res = await getPipelineById(id, { populate: "pipeline" });
                setData((res as any)?.data ?? res);
            } catch (e: any) {
                showSnackbar({ title: "Error", description: e?.message || "Failed to load pipeline", color: "danger" });
            } finally {
                setLoading(false);
            }
        };
        run();
    }, [id, showSnackbar]);

    useEffect(() => {
        if (!id) return;
        getLeadFunnelReport({ pipeline: id })
            .then((res) => {
                const resolved = (res as any)?.data?.data ?? (res as any)?.data ?? res;
                setFunnelStages(asArray(resolved?.stages).map((row: any) => ({
                    stageName: String(row?.stageName || "Unspecified"),
                    leadStatus: statusOf(row?.leadStatus),
                    count: Number(row?.count) || 0,
                })));
                setFunnelTotals(resolved?.totals || {});
            })
            .catch(() => {
                setFunnelStages([]);
                setFunnelTotals({});
            });
    }, [id]);

    useEffect(() => {
        if (!id) return;
        loadCampaigns(id);
    }, [id]);

    const openLogs = async (campaign: CampaignItem) => {
        setLogsTarget(campaign);
        setLogsLoading(true);
        setLogsData([]);
        try {
            const res = await getCampaignLogs({ campaign: campaign.id, limit: "all" });
            const resolved = (res as any)?.data ?? res;
            const list = Array.isArray(resolved?.data) ? resolved.data : Array.isArray(resolved) ? resolved : asArray(resolved?.items);
            setLogsData(asArray(list).map((it: any) => ({ ...it, id: getId(it) })).filter((x: any) => x.id));
        } catch (e: any) {
            showSnackbar({ title: "Error", description: e?.message || "Failed to load campaign logs", color: "danger" });
            setLogsData([]);
        } finally {
            setLogsLoading(false);
        }
    };

    const handleCopy = async (campaign: CampaignItem) => {
        if (copyingCampaignId) return;
        setCopyingCampaignId(campaign.id);
        try {
            await copyCampaign(campaign.id);
            showSnackbar({ title: "Success", description: `Campaign copied as "${campaign.title || "Campaign"} (Copy)"`, color: "success" });
            if (id) await loadCampaigns(id);
        } catch (e: any) {
            showSnackbar({ title: "Error", description: e?.message || "Failed to copy campaign", color: "danger" });
        } finally {
            setCopyingCampaignId(null);
        }
    };

    const handleDeleteCampaign = async () => {
        if (!deleteCampaignTarget?.id || deletingCampaignRef.current) return;
        deletingCampaignRef.current = true;
        setDeletingCampaign(true);
        try {
            await getCampaignDelete(deleteCampaignTarget.id);
            showSnackbar({ title: "Deleted", description: "Campaign deleted successfully", color: "success" });
            setCampaignData(prev => prev.filter(c => c.id !== deleteCampaignTarget.id));
            setSelectedItems(prev => prev.filter(selId => selId !== deleteCampaignTarget.id));
            setDeleteCampaignTarget(null);
        } catch (e: any) {
            showSnackbar({ title: "Error", description: e?.message || "Failed to delete campaign", color: "danger" });
        } finally {
            deletingCampaignRef.current = false;
            setDeletingCampaign(false);
        }
    };

    const totals = {
        total: Number(funnelTotals.total ?? 0),
        open: Number(funnelTotals.open ?? 0),
        converted: Number(funnelTotals.converted ?? 0),
        lost: Number(funnelTotals.lost ?? 0),
    };

    const groupCounts = useMemo(() => {
        const counts: Record<string, number> = { open: 0, "in-progress": 0, lost: 0, converted: 0 };
        funnelStages.forEach((row) => {
            counts[row.leadStatus] = (counts[row.leadStatus] || 0) + row.count;
        });
        if (!counts["in-progress"] && !funnelStages.length) return counts;
        return counts;
    }, [funnelStages]);

    const funnelSteps = FUNNEL_STEPS
        .map((step) => ({ ...step, count: groupCounts[step.key] || 0 }))
        .filter((step) => step.count > 0);
    const funnelMax = funnelSteps.length ? funnelSteps[0].count || totals.total : 0;

    const tagCharts = useMemo(() => {
        return STATUS_GROUPS
            .map((group) => {
                const rows = funnelStages.filter((row) => row.leadStatus === group.key && row.count > 0);
                return {
                    key: group.key,
                    label: GROUP_LABELS[group.key] || group.label,
                    rows: rows.sort((a, b) => b.count - a.count),
                };
            })
            .filter((group) => group.rows.length > 0);
    }, [funnelStages]);

    const visibleCampaigns = campaignSearch.trim()
        ? (hidePaused ? campaignData.filter(c => !c.pause) : campaignData).filter(c => (c.title || "").toLowerCase().includes(campaignSearch.trim().toLowerCase()))
        : (hidePaused ? campaignData.filter(c => !c.pause) : campaignData);

    const isAnyPausedSelected = selectedItems.some(selId => campaignData.find(c => c.id === selId)?.pause === true);
    const isAnyUnpausedSelected = selectedItems.some(selId => campaignData.find(c => c.id === selId)?.pause === false);

    const handleCheckbox = (campaignId: string) => {
        setSelectedItems(prev => prev.includes(campaignId) ? prev.filter(x => x !== campaignId) : [...prev, campaignId]);
    };

    const handlePauseClick = () => {
        const isPaused = selectedItems.every(selId => campaignData.find(c => c.id === selId)?.pause === true);
        setPauseStatus(!isPaused);
        setShowPauseModal(true);
    };

    const handlePauseConfirm = async () => {
        setPausingCampaigns(true);
        try {
            await updateCampaignPauseFunction({ status: pauseStatus, campaignIds: selectedItems });
            setCampaignData(prev => prev.map(c => selectedItems.includes(c.id) ? { ...c, pause: pauseStatus } : c));
            showSnackbar({ title: "Success", description: `Campaigns ${pauseStatus ? "paused" : "unpaused"} successfully`, color: "success" });
            setSelectedItems([]);
            setShowPauseModal(false);
        } catch (e: any) {
            showSnackbar({ title: "Error", description: e?.message || "Failed to update campaigns", color: "danger" });
        } finally {
            setPausingCampaigns(false);
        }
    };

    const breadcrumbs = (
        <div className="mb-4 rounded-sm border border-secondary bg-primary p-2">
            <div className="flex flex-wrap items-center gap-1 text-sm text-tertiary">
                <button type="button" onClick={() => navigate("/dashboard")} className="rounded-sm px-1 py-0.5 text-primary hover:bg-primary_hover">Home</button>
                <span>/</span>
                <button type="button" onClick={() => navigate("/lead-management/pipeline")} className="rounded-sm px-1 py-0.5 text-primary hover:bg-primary_hover">Pipeline</button>
                <span>/</span>
                <span className="px-1 py-0.5 text-primary">View</span>
            </div>
        </div>
    );

    return (
        <DefaultLayout>
            {breadcrumbs}
            <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-2">
                    <button type="button" onClick={() => navigate("/lead-management/pipeline")} aria-label="Back" className="rounded-md p-1.5 text-primary transition-colors hover:bg-secondary">
                        <ArrowLeft className="h-5 w-5" />
                    </button>
                    <h1 className="text-xl font-semibold text-primary">{loading ? "Pipeline" : (data?.title ? `${data.title} Pipeline` : "Pipeline")}</h1>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <Button color="secondary" onClick={scrollToSummary}>Lead Summary</Button>
                    <Button color="secondary" onClick={() => navigate("/dial/call-logs")}>Call Logs</Button>
                    <Dropdown.Root>
                        <Button color="secondary" iconTrailing={ChevronDown}>Action</Button>
                        <Dropdown.Popover>
                            <Dropdown.Menu>
                                <Dropdown.Item
                                    onAction={() => showSnackbar({ title: "Info", description: "Dispositions management will be available soon.", color: "default" })}
                                >
                                    Dispositions
                                </Dropdown.Item>
                                <Dropdown.Item onAction={() => navigate("/lead-management/leads?upload=1")}>Upload Excel Sheet</Dropdown.Item>
                                <Dropdown.Item onAction={() => navigate("/lead-management/leads/add")}>Add Lead</Dropdown.Item>
                                <Dropdown.Item onAction={() => navigate("/lead-management/settings?tab=pipelines")}>Manage Pipelines</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown.Popover>
                    </Dropdown.Root>
                    <Button color="primary" iconLeading={Plus} onClick={() => setCampaignModalOpen(true)}>Create Campaign</Button>
                    <Input
                        aria-label="Search Campaign"
                        placeholder="Search Campaign"
                        icon={SearchLg}
                        value={campaignSearch}
                        onChange={setCampaignSearch}
                        className="w-full sm:w-56"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
                {/* Left column: funnel + tags charts */}
                <div className="flex flex-col gap-5 xl:col-span-2">
                    {/* Lead funnel by stages */}
                    <div ref={summaryRef} className="rounded-xl bg-primary ring-1 ring-secondary scroll-mt-4">
                        <div className="border-b border-secondary px-5 py-4">
                            <h2 className="text-sm font-semibold uppercase tracking-wide text-primary">Lead Funnel by Stages</h2>
                        </div>
                        <div className="flex flex-col gap-6 p-5 lg:flex-row lg:items-center">
                            <div className="flex flex-col gap-3 lg:w-56">
                                {[
                                    { label: "TOTAL LEADS", value: totals.total },
                                    { label: "TOTAL IN-PROGRESS", value: totals.open },
                                    { label: "TOTAL CLOSED", value: totals.converted + totals.lost },
                                ].map(stat => (
                                    <div key={stat.label} className="rounded-lg border border-secondary p-4 text-center">
                                        <p className="text-xs font-semibold uppercase tracking-wide text-tertiary">{stat.label}</p>
                                        <p className="mt-1 text-lg font-bold text-primary">{stat.value.toLocaleString()}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-1 flex-col items-center justify-center gap-1 py-4">
                                {funnelSteps.length === 0 ? (
                                    <p className="py-10 text-sm text-tertiary">No lead data for this pipeline yet</p>
                                ) : (
                                    funnelSteps.map((step, index) => {
                                        const width = funnelMax ? Math.max(22, (step.count / funnelMax) * 100) : 22;
                                        const percentage = totals.total ? ((step.count / totals.total) * 100).toFixed(2) : "0";
                                        const isTop = index === 0;
                                        return (
                                            <div key={step.key} className="flex w-full flex-col items-center">
                                                <div
                                                    title={`${step.label}: ${step.count}`}
                                                    className={`flex items-center justify-center ${isTop ? "" : "-mt-px"}`}
                                                    style={{
                                                        width: `${width}%`,
                                                        minWidth: 120,
                                                        height: 52,
                                                        background: step.color,
                                                        clipPath: isTop ? "polygon(0 0, 100% 0, 82% 100%, 18% 100%)" : "polygon(18% 0, 82% 0, 78% 100%, 22% 100%)",
                                                    }}
                                                >
                                                    <span className="px-4 text-center text-xs font-semibold text-white">
                                                        {step.label} ({step.count.toLocaleString()})
                                                    </span>
                                                </div>
                                                <span className="mt-1 text-xs font-medium text-tertiary">{percentage}%</span>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Leads by tags */}
                    <div className="rounded-xl bg-primary ring-1 ring-secondary">
                        <div className="border-b border-secondary px-5 py-4">
                            <h2 className="text-sm font-semibold uppercase tracking-wide text-primary">Leads by Tags</h2>
                        </div>
                        <div className="p-5">
                            {tagCharts.length === 0 ? (
                                <p className="py-10 text-center text-sm text-tertiary">No tag data for this pipeline yet</p>
                            ) : (
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 2xl:grid-cols-4">
                                    {tagCharts.map((group, groupIndex) => {
                                        const labels = group.rows.map(row => row.stageName);
                                        const chartData = {
                                            labels,
                                            datasets: [{
                                                data: group.rows.map(row => row.count),
                                                backgroundColor: group.rows.map((_, i) => CHART_COLORS[(i + groupIndex * 4) % CHART_COLORS.length]),
                                                borderWidth: 0,
                                            }],
                                        };
                                        return (
                                            <div key={group.key} className="flex flex-col items-center gap-3">
                                                <div className="h-40 w-40">
                                                    <Doughnut
                                                        data={chartData}
                                                        options={{
                                                            cutout: group.rows.length > 1 ? "55%" : 0,
                                                            plugins: { legend: { display: false } },
                                                            maintainAspectRatio: false,
                                                        }}
                                                    />
                                                </div>
                                                <p className="text-sm font-bold text-primary">{group.label}</p>
                                                <div className="w-full space-y-1.5 rounded-lg bg-secondary p-3">
                                                    {group.rows.map((row, rowIndex) => (
                                                        <div key={row.stageName} className="flex items-center gap-2 text-xs text-primary">
                                                            <span
                                                                className="h-3 w-3 shrink-0 rounded-sm"
                                                                style={{ background: CHART_COLORS[(rowIndex + groupIndex * 4) % CHART_COLORS.length] }}
                                                            />
                                                            <span className="truncate" title={row.stageName}>{row.stageName}</span>
                                                            <span className="ml-auto shrink-0 text-tertiary">({row.count.toLocaleString()})</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right column: campaigns */}
                <div className="rounded-xl bg-primary ring-1 ring-secondary">
                    <div className="flex items-center justify-between border-b border-secondary px-5 py-4">
                        <div className="flex items-center gap-3">
                            {selectedItems.length > 0 && (
                                <input
                                    type="checkbox"
                                    checked={visibleCampaigns.length > 0 && visibleCampaigns.every(c => selectedItems.includes(c.id))}
                                    onChange={(e) => setSelectedItems(e.target.checked ? visibleCampaigns.map(c => c.id) : [])}
                                    className="rounded border-secondary"
                                />
                            )}
                            <h2 className="text-sm font-semibold uppercase tracking-wide text-primary">Campaigns</h2>
                        </div>
                        <div className="flex items-center gap-2">
                            {selectedItems.length > 0 && (
                                <Button size="sm" color="primary" onClick={handlePauseClick}>
                                    {isAnyPausedSelected && !isAnyUnpausedSelected ? "Un-pause" : "Pause"} ({selectedItems.length})
                                </Button>
                            )}
                            <label className="flex cursor-pointer items-center gap-2">
                                <span className="text-xs text-tertiary">HIDE PAUSED</span>
                                <input type="checkbox" checked={hidePaused} onChange={(e) => setHidePaused(e.target.checked)} className="rounded border-secondary" />
                            </label>
                        </div>
                    </div>

                    <div className="max-h-[720px] divide-y divide-secondary overflow-y-auto">
                        {campaignLoading ? (
                            Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} className="flex items-center gap-3 px-4 py-3.5 animate-pulse">
                                    <div className="h-4 w-4 rounded bg-secondary" />
                                    <div className="h-4 w-40 rounded bg-secondary" />
                                </div>
                            ))
                        ) : visibleCampaigns.length > 0 ? (
                            visibleCampaigns.map(campaign => (
                                <div key={campaign.id} className="flex items-center gap-3 px-4 py-3.5 transition-colors hover:bg-secondary/50">
                                    <input
                                        type="checkbox"
                                        checked={selectedItems.includes(campaign.id)}
                                        onChange={() => handleCheckbox(campaign.id)}
                                        className="rounded border-secondary"
                                    />
                                    <ArrowUp className="h-4 w-4 shrink-0 text-red-500" />
                                    <button
                                        type="button"
                                        aria-label="Campaign options"
                                        onClick={() => navigate(`/lead-management/campaign/view/${campaign.id}`)}
                                        className="flex-1 truncate text-left text-sm text-primary hover:underline"
                                        title={campaign.title}
                                    >
                                        {campaign.title}
                                    </button>
                                    {campaign.pause && (
                                        <Badge size="sm" color="error">Paused</Badge>
                                    )}
                                    <Dropdown.Root>
                                        <Dropdown.DotsButton className="size-6 shrink-0" />
                                        <Dropdown.Popover>
                                            <Dropdown.Menu>
                                                <Dropdown.Item
                                                    icon={Copy01}
                                                    isDisabled={copyingCampaignId === campaign.id}
                                                    onAction={() => handleCopy(campaign)}
                                                >
                                                    {copyingCampaignId === campaign.id ? "Copying…" : "Copy"}
                                                </Dropdown.Item>
                                                <Dropdown.Item
                                                    icon={FileSearch01}
                                                    onAction={() => openLogs(campaign)}
                                                >
                                                    View Logs
                                                </Dropdown.Item>
                                                <Dropdown.Item
                                                    icon={Trash01}
                                                    onAction={() => setDeleteCampaignTarget(campaign)}
                                                >
                                                    Delete
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown.Popover>
                                    </Dropdown.Root>
                                </div>
                            ))
                        ) : (
                            <div className="px-4 py-10 text-center text-sm text-tertiary">No campaigns found</div>
                        )}
                    </div>
                </div>
            </div>

            {/* View Logs modal */}
            <ModalOverlay isOpen={Boolean(logsTarget)} isDismissable onOpenChange={(open) => { if (!open) setLogsTarget(null); }}>
                {({ state }) => (
                    <Modal className="max-w-4xl">
                        <Dialog>
                            <div className="relative max-h-[80vh] w-full overflow-hidden rounded-xl bg-primary ring-1 ring-secondary">
                                <CloseButton onPress={() => state.close()} className="absolute right-4 top-4" size="sm" />
                                <div className="border-b border-secondary px-5 py-4">
                                    <h2 className="text-lg font-semibold text-primary">Campaign Logs</h2>
                                    <p className="mt-0.5 text-sm text-tertiary">{logsTarget?.title || "Campaign"} — change history</p>
                                </div>
                                <div className="max-h-[60vh] overflow-y-auto">
                                    {logsLoading ? (
                                        <div className="space-y-2 p-5">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <div key={i} className="h-12 animate-pulse rounded-lg bg-secondary" />
                                            ))}
                                        </div>
                                    ) : logsData.length === 0 ? (
                                        <div className="p-10 text-center text-sm text-tertiary">No logs recorded for this campaign yet</div>
                                    ) : (
                                        <table className="w-full text-left text-sm">
                                            <thead className="sticky top-0 bg-secondary">
                                                <tr className="text-xs uppercase tracking-wide text-tertiary">
                                                    <th className="px-4 py-3 font-semibold">Date &amp; Time</th>
                                                    <th className="px-4 py-3 font-semibold">Action</th>
                                                    <th className="px-4 py-3 font-semibold">Details</th>
                                                    <th className="px-4 py-3 font-semibold">User</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-secondary">
                                                {logsData.map(log => (
                                                    <tr key={log.id} className="align-top">
                                                        <td className="whitespace-nowrap px-4 py-3 text-tertiary">
                                                            {formatLogDate(log.createdAt)}
                                                        </td>
                                                        <td className="whitespace-nowrap px-4 py-3">
                                                            <Badge size="sm" color={ACTION_BADGE_COLORS[String(log.action || "").toLowerCase()] || "gray"}>
                                                                {ACTION_LABELS[String(log.action || "").toLowerCase()] || String(log.action || "—")}
                                                            </Badge>
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            <p className="text-primary">{log.description || "—"}</p>
                                                            {(log.changes?.length || 0) > 0 && (
                                                                <div className="mt-1.5 space-y-1">
                                                                    {log.changes!.map((change, index) => (
                                                                        <div key={`${log.id}-${index}`} className="flex flex-wrap items-center gap-1.5 text-xs text-tertiary">
                                                                            <span className="font-semibold text-secondary">{change?.field || "field"}</span>
                                                                            <span>:</span>
                                                                            <span className="max-w-56 truncate" title={String(change?.oldValue ?? "")}>{String(change?.oldValue ?? "—")}</span>
                                                                            <span>→</span>
                                                                            <span className="max-w-56 truncate" title={String(change?.newValue ?? "")}>{String(change?.newValue ?? "—")}</span>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </td>
                                                        <td className="whitespace-nowrap px-4 py-3 text-tertiary">
                                                            {typeof log.performedBy === "object" && log.performedBy !== null
                                                                ? (log.performedBy.name || log.performedBy.email || "—")
                                                                : String(log.performedBy || "—")}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    )}
                                </div>
                            </div>
                        </Dialog>
                    </Modal>
                )}
            </ModalOverlay>

            {/* Delete campaign confirm modal */}
            <ModalOverlay isOpen={Boolean(deleteCampaignTarget)} isDismissable onOpenChange={(open) => { if (!open) setDeleteCampaignTarget(null); }}>
                {({ state }) => (
                    <Modal className="max-w-lg">
                        <Dialog>
                            <div className="relative w-full rounded-xl bg-primary p-5 ring-1 ring-secondary">
                                <CloseButton onPress={() => state.close()} className="absolute right-4 top-4" size="sm" />
                                <div className="space-y-1">
                                    <h2 className="text-lg font-semibold text-primary">Delete Campaign</h2>
                                    <p className="text-sm text-tertiary">
                                        {deleteCampaignTarget?.title ? `Delete "${deleteCampaignTarget.title}"?` : "Delete this campaign?"}
                                        {" "}This action cannot be undone.
                                    </p>
                                </div>
                                <div className="mt-5 flex justify-end gap-2">
                                    <Button color="secondary" onClick={() => state.close()}>Cancel</Button>
                                    <Button color="primary-destructive" isLoading={deletingCampaign} onClick={handleDeleteCampaign}>Delete</Button>
                                </div>
                            </div>
                        </Dialog>
                    </Modal>
                )}
            </ModalOverlay>

            {/* Pause confirm modal */}
            <ModalOverlay isOpen={showPauseModal} isDismissable onOpenChange={(open) => { if (!open) setShowPauseModal(false); }}>
                {({ state }) => (
                    <Modal className="max-w-lg">
                        <Dialog>
                            <div className="relative w-full rounded-xl bg-primary p-5 ring-1 ring-secondary">
                                <CloseButton onPress={() => state.close()} className="absolute right-4 top-4" size="sm" />
                                <h2 className="mb-2 text-lg font-semibold text-primary">
                                    {pauseStatus ? "Pause" : "Un-pause"} Campaigns
                                </h2>
                                <p className="mb-3 text-sm text-tertiary">Are you sure you want to {pauseStatus ? "pause" : "un-pause"} the following campaigns?</p>
                                <ul className="mb-4 space-y-1">
                                    {selectedItems.map(selId => {
                                        const c = campaignData.find(c => c.id === selId);
                                        return <li key={selId} className="text-sm text-primary">• {c?.title || selId}</li>;
                                    })}
                                </ul>
                                <div className="flex justify-end gap-2">
                                    <Button color="secondary" onClick={() => state.close()}>Cancel</Button>
                                    <Button color="primary" isLoading={pausingCampaigns} onClick={handlePauseConfirm}>Confirm</Button>
                                </div>
                            </div>
                        </Dialog>
                    </Modal>
                )}
            </ModalOverlay>

            <CampaignFormModal
                isOpen={campaignModalOpen}
                onClose={() => setCampaignModalOpen(false)}
                defaultPipelineId={id}
                onSaved={() => {
                    if (id) loadCampaigns(id);
                }}
            />
        </DefaultLayout>
    );
}
