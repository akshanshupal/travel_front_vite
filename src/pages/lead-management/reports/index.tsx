import { DefaultLayout } from "@/layouts/DefaultLayout";
import { TableCard } from "@/components/application/table/table";
import { getLeadAgentReport, getLeadFunnelReport } from "@/utils/services/leadReportService";
import { Bar } from "react-chartjs-2";
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Tooltip } from "chart.js";
import { useEffect, useMemo, useState } from "react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);
type StageRow = { stageName?: string; name?: string; count?: number; total?: number };
type AgentRow = { agent?: { name?: string; email?: string }; name?: string; totalLeads?: number; openLeads?: number; convertedLeads?: number; lostLeads?: number; conversionRate?: number; pendingFollowUps?: number };
const resolveData = (response: any) => response?.data?.data ?? response?.data ?? response;

export default function LeadReportsPage() {
    const [stages, setStages] = useState<StageRow[]>([]);
    const [agents, setAgents] = useState<AgentRow[]>([]);
    const [totals, setTotals] = useState<Record<string, number>>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    useEffect(() => {
        const run = async () => {
            setLoading(true); setError("");
            try {
                const [funnelResponse, agentResponse] = await Promise.all([getLeadFunnelReport(), getLeadAgentReport()]);
                const funnel = resolveData(funnelResponse) || {};
                const agentData = resolveData(agentResponse);
                setStages(Array.isArray(funnel.stages) ? funnel.stages : Array.isArray(funnel) ? funnel : []);
                setTotals(funnel.totals || {});
                setAgents(Array.isArray(agentData?.agents) ? agentData.agents : Array.isArray(agentData) ? agentData : []);
            } catch (e: any) { setError(e?.message || "Failed to load reports"); }
            finally { setLoading(false); }
        };
        run();
    }, []);
    const chartData = useMemo(() => ({
        labels: stages.map(row => row.stageName || row.name || "Unspecified"),
        datasets: [{ label: "Leads", data: stages.map(row => Number(row.count ?? row.total ?? 0)), backgroundColor: "rgba(47, 128, 237, 0.65)", borderColor: "rgb(47, 128, 237)", borderWidth: 1 }],
    }), [stages]);

    return <DefaultLayout><div className="space-y-5">
        <TableCard.Root><TableCard.Header title="Lead Reports" description="Pipeline funnel and sales agent performance" />
            <div className="bg-primary px-4 py-5 md:px-6">{loading ? <div className="h-72 animate-pulse rounded-lg bg-secondary" /> : error ? <p className="text-sm text-error-primary">{error}</p> : <>
                <div className="mb-5 grid grid-cols-2 gap-3 md:grid-cols-4">{[["Total", totals.total], ["Open", totals.open], ["Converted", totals.converted], ["Lost", totals.lost]].map(([label, value]) => <div key={String(label)} className="rounded-lg border border-secondary p-4"><p className="text-xs uppercase text-tertiary">{label}</p><p className="mt-1 text-2xl font-semibold text-primary">{Number(value || 0)}</p></div>)}</div>
                <div className="h-80"><Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, ticks: { precision: 0 } } } }} /></div>
            </>}</div>
        </TableCard.Root>
        <TableCard.Root><TableCard.Header title="Agent Performance" />
            <div className="overflow-x-auto"><table className="w-full min-w-[50rem] text-left text-sm"><thead className="border-b border-secondary bg-secondary"><tr>{["Agent", "Total", "Open", "Converted", "Lost", "Conversion", "Pending Follow-ups"].map(label => <th key={label} className="px-4 py-3 font-semibold text-primary">{label}</th>)}</tr></thead><tbody>{agents.length ? agents.map((row, index) => <tr key={`${row.agent?.email || row.name}-${index}`} className="border-b border-secondary"><td className="px-4 py-3"><div className="font-medium text-primary">{row.agent?.name || row.name || "Unassigned"}</div><div className="text-xs text-tertiary">{row.agent?.email || ""}</div></td><td className="px-4 py-3 text-secondary">{row.totalLeads || 0}</td><td className="px-4 py-3 text-secondary">{row.openLeads || 0}</td><td className="px-4 py-3 text-secondary">{row.convertedLeads || 0}</td><td className="px-4 py-3 text-secondary">{row.lostLeads || 0}</td><td className="px-4 py-3 text-secondary">{Number(row.conversionRate || 0).toFixed(1)}%</td><td className="px-4 py-3 text-secondary">{row.pendingFollowUps || 0}</td></tr>) : <tr><td colSpan={7} className="px-4 py-10 text-center text-tertiary">No agent data found</td></tr>}</tbody></table></div>
        </TableCard.Root>
    </div></DefaultLayout>;
}
