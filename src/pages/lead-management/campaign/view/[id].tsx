import { DefaultLayout } from "@/layouts/DefaultLayout";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { FloatingHeaderTable } from "@/components/application/table/table";
import { useStoreSnackbar } from "@/store/snackbar";
import {
    copyCampaign,
    getCampaignById,
    getCampaignDashboard,
    getCampaignDelete,
    updateCampaignPauseFunction,
} from "@/utils/services/campaignService";
import { getLeadLogs } from "@/utils/services/leadsService";
import { CampaignFormModal } from "@/pages/lead-management/campaign/campaign-form-modal";
import { ArrowLeft, ArrowUp, ChevronDown, RefreshCw01, UploadCloud02 } from "@untitledui/icons";
import { Bar } from "react-chartjs-2";
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Tooltip } from "chart.js";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

type CampaignData = { title?: string; pipeline?: { title?: string }; additionalSetting?: { priority?: string }; status?: boolean; pause?: boolean };
type DashboardData = {
    statistics?: Record<string, number>;
    distribution?: Array<{ agentName?: string; uncontacted?: number; noFollowUp?: number; followUp?: number; closed?: number; total?: number }>;
    calls?: { total?: number; connected?: number; durationSeconds?: number };
    lastUpdatedAt?: string;
    uploadedFiles?: Array<{ id?: string; fileName?: string; createdAt?: string; status?: string; merged?: boolean; mergedAndReopened?: boolean }>;
};
type CampaignLog = { id: string; action?: string; description?: string; lead?: { title?: string } | string; performedBy?: { name?: string; email?: string } | string; createdAt?: string; changes?: Array<{ field?: string; oldValue?: string; newValue?: string }> };

const asArray = (value: any) => Array.isArray(value) ? value : [];
const dateLabel = (value?: string) => value ? new Date(value).toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "—";
const number = (value: any) => Number(value || 0).toLocaleString();

const StatCard = ({ title, values, children }: { title: string; values: Array<[string, number]>; children?: React.ReactNode }) => (
    <section className="rounded-xl bg-primary ring-1 ring-secondary">
        <div className="border-b border-secondary px-4 py-4"><h2 className="text-sm font-semibold uppercase text-primary">{title}</h2></div>
        <div className="grid grid-cols-2 gap-4 p-5 md:grid-cols-4">
            {values.map(([label, value]) => <div key={label} className="text-center"><p className="text-xs uppercase text-tertiary">{label}</p><p className="mt-2 text-2xl font-medium text-primary">{number(value)}</p></div>)}
        </div>
        {children}
    </section>
);

export default function CampaignViewPage() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { showSnackbar } = useStoreSnackbar();
    const [data, setData] = useState<CampaignData | null>(null);
    const [dashboard, setDashboard] = useState<DashboardData>({});
    const [logs, setLogs] = useState<CampaignLog[]>([]);
    const [loading, setLoading] = useState(true);
    const [logsLoading, setLogsLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState(false);
    const [logsOpen, setLogsOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);

    const load = async () => {
        if (!id) return;
        setLoading(true);
        try {
            const [campaign, stats] = await Promise.all([getCampaignById(id, { populate: "pipeline" }), getCampaignDashboard(id)]);
            setData((campaign as any)?.data ?? campaign);
            setDashboard((stats as any)?.data ?? stats ?? {});
        } catch (e: any) {
            showSnackbar({ title: "Error", description: e?.message || "Failed to load campaign", color: "danger" });
        } finally { setLoading(false); }
    };

    useEffect(() => { load(); }, [id]);
    const loadLogs = async () => {
        if (!id) return;
        setLogsLoading(true);
        try {
            const response: any = await getLeadLogs({ campaign: id, limit: "all" });
            const resolved = response?.data ?? response;
            const list = Array.isArray(resolved?.data) ? resolved.data : Array.isArray(resolved) ? resolved : asArray(resolved?.items);
            setLogs(list);
        } catch (e: any) { showSnackbar({ title: "Error", description: e?.message || "Failed to load lead history", color: "danger" }); }
        finally { setLogsLoading(false); }
    };

    const stats = dashboard.statistics || {};
    const priority = data?.additionalSetting?.priority || "Medium";
    const distribution = asArray(dashboard.distribution);
    const chartData = {
        labels: distribution.map(item => item.agentName || "Unassigned"),
        datasets: [
            { label: "Uncontacted", data: distribution.map(item => item.uncontacted || 0), backgroundColor: "#16a34a" },
            { label: "No Follow-up", data: distribution.map(item => item.noFollowUp || 0), backgroundColor: "#a39316" },
            { label: "Follow-up", data: distribution.map(item => item.followUp || 0), backgroundColor: "#facc15" },
            { label: "Closed", data: distribution.map(item => item.closed || 0), backgroundColor: "#ef4444" },
        ],
    };

    const runAction = async (action: "copy" | "pause" | "delete") => {
        if (!id || actionLoading) return;
        setActionLoading(true);
        try {
            if (action === "copy") { await copyCampaign(id); showSnackbar({ title: "Success", description: "Campaign copied", color: "success" }); }
            if (action === "pause") { await updateCampaignPauseFunction({ status: !data?.pause, campaignIds: [id] }); setData(prev => prev ? { ...prev, pause: !prev.pause } : prev); }
            if (action === "delete") { await getCampaignDelete(id); navigate("/lead-management/campaign"); return; }
        } catch (e: any) { showSnackbar({ title: "Error", description: e?.message || "Action failed", color: "danger" }); }
        finally { setActionLoading(false); }
    };

    return <DefaultLayout>
        <div className="mb-4 flex flex-col gap-3 border-b border-secondary pb-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3"><Button color="tertiary" iconLeading={ArrowLeft} onClick={() => navigate("/lead-management/campaign")} /> <h1 className="text-xl font-semibold text-primary">{data?.title || "Campaign"}</h1></div>
            <div className="flex flex-wrap items-center gap-2 text-sm"><span className="text-tertiary">Priority:</span><span className="flex items-center gap-1 font-medium text-primary"><ArrowUp className="size-4 text-red-500" /> {priority}</span><Button color="secondary" onClick={() => navigate(`/lead-management/campaign/leads/${id}`)}>Lead Summary</Button><Button color="secondary" onClick={() => { setLogsOpen(true); loadLogs(); }}>Lead History</Button><Dropdown.Root><Button color="secondary" iconTrailing={ChevronDown}>Action</Button><Dropdown.Popover><Dropdown.Menu><Dropdown.Item onAction={() => runAction("copy")}>Copy Campaign</Dropdown.Item><Dropdown.Item onAction={() => setEditModalOpen(true)}>Campaign Settings</Dropdown.Item><Dropdown.Item onAction={() => runAction("pause")}>{data?.pause ? "Un-pause campaign" : "Pause campaign"}</Dropdown.Item><Dropdown.Item onAction={() => runAction("delete")}>Delete Campaign</Dropdown.Item></Dropdown.Menu></Dropdown.Popover></Dropdown.Root></div>
        </div>

        {loading ? <div className="grid animate-pulse gap-5 xl:grid-cols-3">{[1, 2, 3].map(i => <div key={i} className="h-72 rounded-xl bg-secondary" />)}</div> : <>
            <div className="grid gap-5 xl:grid-cols-3">
                <StatCard title="Leads Statistics" values={[["Total", stats.total || 0], ["Uncontacted", stats.uncontacted || 0], ["In-Progress", stats.inProgress || 0], ["Closed", stats.closed || 0]]} />
                <StatCard title="In-Progress Leads" values={[["Total", stats.inProgress || 0], ["No Follow-up", stats.noFollowUp || 0], ["Follow-up", stats.followUp || 0]]}><div className="px-5 pb-8 text-center text-sm text-tertiary">{stats.inProgress ? "Follow-up activity is available in Call Logs." : "No data available."}</div></StatCard>
                <StatCard title="Closed Leads" values={[["Total", stats.closed || 0], ["Converted", stats.converted || 0], ["Lost", stats.lost || 0], ["Closed by System", stats.closedBySystem || 0]]}><div className="px-5 pb-8 text-center text-sm text-tertiary">{stats.closed ? "Closed lead data is available." : "No data available."}</div></StatCard>
            </div>

            <section className="mt-5 rounded-xl bg-primary ring-1 ring-secondary">
                <div className="flex items-center justify-between border-b border-secondary px-4 py-4"><h2 className="text-sm font-semibold uppercase text-primary">Lead Distribution <span className="font-normal normal-case text-tertiary">(Last updated {dashboard.lastUpdatedAt ? dateLabel(dashboard.lastUpdatedAt) : "not available"})</span></h2><Button color="tertiary" size="sm" iconLeading={RefreshCw01} onClick={load} /></div>
                <div className="h-80 p-5">{distribution.length ? <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "right" } }, scales: { x: { stacked: true }, y: { stacked: true, beginAtZero: true } } }} /> : <div className="flex h-full items-center justify-center text-sm text-tertiary">No distribution data available.</div>}</div>
            </section>

            <section className="mt-5 rounded-xl bg-primary ring-1 ring-secondary"><div className="border-b border-secondary px-4 py-4"><h2 className="text-sm font-semibold uppercase text-primary">Uploaded Files</h2></div><FloatingHeaderTable><table className="w-full min-w-[800px] text-left text-sm"><thead className="bg-secondary text-xs uppercase text-tertiary"><tr>{["Sr.No.", "File Name", "Date", "Status", "Created", "Merged", "Merged & Reopened", "Action"].map((x, xIndex) => <th key={x} className={xIndex === 0 ? "sticky left-0 z-20 bg-secondary px-4 py-3 shadow-[4px_0_8px_-6px_rgba(0,0,0,0.35)]" : xIndex === 7 ? "sticky right-0 z-20 border-l border-secondary bg-secondary px-4 py-3 shadow-[-4px_0_8px_-6px_rgba(0,0,0,0.35)]" : "bg-secondary px-4 py-3"}>{x}</th>)}</tr></thead><tbody className="divide-y divide-secondary">{(dashboard.uploadedFiles || []).map((file, index) => <tr key={file.id || index}><td className="sticky left-0 z-10 bg-primary px-4 py-3 shadow-[4px_0_8px_-6px_rgba(0,0,0,0.35)]">{index + 1}</td><td className="px-4 py-3">{file.fileName || "—"}</td><td className="px-4 py-3">{dateLabel(file.createdAt)}</td><td className="px-4 py-3">{file.status || "—"}</td><td className="px-4 py-3">{file.createdAt ? "Yes" : "—"}</td><td className="px-4 py-3">{file.merged ? "Yes" : "No"}</td><td className="px-4 py-3">{file.mergedAndReopened ? "Yes" : "No"}</td><td className="sticky right-0 z-10 border-l border-secondary bg-primary px-4 py-3 shadow-[-4px_0_8px_-6px_rgba(0,0,0,0.35)]">—</td></tr>)}</tbody></table>{!(dashboard.uploadedFiles || []).length && <div className="p-10 text-center text-sm text-tertiary">No uploaded files found.</div>}</FloatingHeaderTable><div className="flex items-center gap-2 border-t border-secondary p-4 text-xs text-tertiary"><UploadCloud02 className="size-4" /> Only campaign file uploads appear here.</div></section>
        </>}

                        {logsOpen && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={() => setLogsOpen(false)}><div className="max-h-[80vh] w-full max-w-5xl overflow-hidden rounded-xl bg-primary shadow-xl" onClick={e => e.stopPropagation()}><div className="flex items-center justify-between border-b border-secondary px-5 py-4"><div><h2 className="text-lg font-semibold text-primary">Lead History</h2><p className="text-sm text-tertiary">{data?.title} — all lead changes</p></div><Button color="secondary" onClick={() => setLogsOpen(false)}>Close</Button></div><div className="max-h-[65vh] overflow-auto">{logsLoading ? <div className="p-10 text-center text-sm text-tertiary">Loading history...</div> : <table className="w-full text-left text-sm"><thead className="sticky top-0 bg-secondary"><tr><th className="px-4 py-3">Date</th><th className="px-4 py-3">Lead</th><th className="px-4 py-3">Action</th><th className="px-4 py-3">Details</th><th className="px-4 py-3">Changed by</th></tr></thead><tbody className="divide-y divide-secondary">{logs.map(log => <tr key={log.id}><td className="whitespace-nowrap px-4 py-3 text-tertiary">{dateLabel(log.createdAt)}</td><td className="px-4 py-3 text-primary">{typeof log.lead === "object" && log.lead !== null ? log.lead.title || "—" : "—"}</td><td className="px-4 py-3"><Badge size="sm" color={log.action === "deleted" ? "error" : log.action === "created" ? "success" : log.action === "stage-changed" ? "blue" : "gray"}>{log.action || "—"}</Badge></td><td className="px-4 py-3"><p className="text-primary">{log.description || "—"}</p>{(log.changes?.length || 0) > 0 && <div className="mt-1.5 space-y-1">{log.changes!.map((change, index) => <div key={`${log.id}-${index}`} className="flex flex-wrap items-center gap-1.5 text-xs text-tertiary"><span className="font-semibold text-secondary">{change?.field || "field"}</span><span>:</span><span className="max-w-48 truncate" title={String(change?.oldValue ?? "")}>{String(change?.oldValue ?? "—")}</span><span>→</span><span className="max-w-48 truncate" title={String(change?.newValue ?? "")}>{String(change?.newValue ?? "—")}</span></div>)}</div>}</td><td className="px-4 py-3 text-tertiary">{typeof log.performedBy === "object" ? log.performedBy?.name || log.performedBy?.email || "—" : log.performedBy || "—"}</td></tr>)}</tbody></table>}{!logsLoading && !logs.length && <div className="p-10 text-center text-sm text-tertiary">No lead history found.</div>}</div></div></div>}
        <CampaignFormModal
            isOpen={editModalOpen}
            onClose={() => setEditModalOpen(false)}
            campaign={{ id }}
            onSaved={() => load()}
        />
    </DefaultLayout>;
}
