import { useEffect, useState } from "react";
import { getDialReports } from "@/utils/services/dialService";
import { DialShell, Metric, EmptyPanel } from "./shared";

export default function DialReportsPage() {
    const [report, setReport] = useState<Record<string, any>>({});
    useEffect(() => { getDialReports().then(setReport).catch(() => setReport({})); }, []);
    const hasCalls = Boolean(report.totalCalls);
    return <DialShell title="Dial reports" description="Monitor calling, follow-up, and lead activity.">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Metric label="Calls attempted" value={report.totalCalls ?? "—"} />
            <Metric label="Calls connected" value={report.connectedCalls ?? "—"} tone="success" />
            <Metric label="Converted leads" value={report.convertedLeads ?? "—"} tone="success" />
            <Metric label="Average duration" value={report.averageDurationSeconds ? `${Math.round(report.averageDurationSeconds)}s` : "—"} tone="warning" />
        </div>
        {hasCalls ? <>
            <div className="rounded-xl border border-secondary bg-primary p-6">
                <h2 className="text-md font-semibold text-primary">Outcome breakdown</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{Object.entries(report.outcomeBreakdown || {}).map(([outcome, count]) => <div key={outcome} className="rounded-lg bg-secondary p-4"><p className="text-sm text-tertiary">{outcome}</p><p className="mt-1 text-xl font-semibold text-primary">{String(count)}</p></div>)}</div>
            </div>
            <div className="rounded-xl border border-secondary bg-primary p-6">
                <h2 className="text-md font-semibold text-primary">Daily trend</h2>
                {Object.entries(report.dailyTrend || {}).length ? <div className="mt-4 space-y-3">{Object.entries(report.dailyTrend || {}).map(([day, count]) => <div key={day} className="flex items-center justify-between text-sm"><span className="text-tertiary">{day}</span><span className="font-semibold text-primary">{String(count)} calls</span></div>)}</div> : <p className="mt-4 text-sm text-tertiary">No daily activity recorded.</p>}
            </div>
        </> : <EmptyPanel title="No report data yet" description="Report metrics will populate when dial activity is recorded." />}
    </DialShell>;
}
