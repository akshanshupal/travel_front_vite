import { useEffect, useState } from "react";
import { Button } from "@/components/base/buttons/button";
import { getDialReports } from "@/utils/services/dialService";
import { DialShell } from "./shared";
import { FiDownload, FiShare2, FiInfo, FiX } from "react-icons/fi";

const num = (report: Record<string, any>, ...keys: string[]) => {
    for (const key of keys) {
        const value = Number(report?.[key]);
        if (Number.isFinite(value)) return value;
    }
    return 0;
};

const time = (report: Record<string, any>, ...keys: string[]) => {
    for (const key of keys) {
        const value = report?.[key];
        if (value !== undefined && value !== null && String(value).trim() !== "") return String(value);
    }
    return "00:00:00";
};

const Stat = ({ label, value, hint }: { label: string; value: string | number; hint?: boolean }) => <div className="rounded-lg border border-[#eee9f0] bg-white p-4"><p className="text-lg font-semibold text-[#29252d]">{value}{hint && <FiInfo aria-hidden="true" className="ml-1 inline size-3.5 text-[#9a939e]" />}</p><p className="mt-1 text-xs text-[#77707c]">{label}</p></div>;

const ReportCard = ({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) => <section className={`rounded-xl border border-[#e8e2eb] bg-[#fbfafc] p-5 shadow-sm ${className}`}><h2 className="mb-4 text-sm font-semibold">{title}</h2>{children}</section>;

export default function DialReportsPage() {
    const [report, setReport] = useState<Record<string, any>>({});
    const [filters, setFilters] = useState<string[]>(["Today", "Z-Akshanshu"]);
    useEffect(() => { getDialReports().then(setReport).catch(() => setReport({})); }, []);

    return <DialShell title="Reports" action={<div className="flex items-center gap-2"><Button color="secondary" size="sm" aria-label="Share report"><FiShare2 aria-hidden="true" /></Button><Button color="secondary" size="sm" aria-label="Download report"><FiDownload aria-hidden="true" /></Button></div>}>
        <div className="flex flex-wrap items-center gap-2">
            {filters.map((filter) => <button key={filter} type="button" onClick={() => setFilters((current) => current.filter((item) => item !== filter))} className="flex items-center gap-2 rounded-lg border border-[#e9d8f8] bg-[#fbf1ff] px-3 py-1.5 text-sm font-medium text-[#6f36c2]">{filter} <FiX aria-hidden="true" className="size-3.5" /></button>)}
        </div>
        <div className="grid gap-4 xl:grid-cols-[1.4fr_1fr]">
            <ReportCard title="Call Overview">
                <div className="grid gap-3 sm:grid-cols-3">
                    <Stat label="Total Calls" value={num(report, "totalCalls")} />
                    <Stat label="Total Calls Connected" value={num(report, "connectedCalls", "totalCallsConnected")} />
                    <Stat label="Total Unconnected Calls" value={num(report, "unconnectedCalls", "totalUnconnectedCalls")} />
                    <Stat label="Total Call Time" value={time(report, "totalCallTime")} />
                    <Stat label="Avg. Call Duration" value={time(report, "averageDuration", "avgCallDuration")} />
                    <Stat label="Avg. Start Call Time" value={time(report, "avgStartCallTime")} />
                </div>
            </ReportCard>
            <ReportCard title="Outgoing Calls">
                <div className="grid gap-3 sm:grid-cols-2">
                    <Stat label="Total Outgoing Calls" value={num(report, "totalOutgoingCalls")} />
                    <Stat label="Outgoing Connected Calls" value={num(report, "outgoingConnectedCalls")} />
                    <Stat label="Outgoing Unanswered Calls" value={num(report, "outgoingUnansweredCalls")} />
                    <Stat label="Avg. Outgoing Call Duration" value={time(report, "avgOutgoingCallDuration")} />
                </div>
            </ReportCard>
        </div>
        <div className="grid gap-4 xl:grid-cols-2">
            <ReportCard title="Incoming Calls">
                <div className="grid gap-3 sm:grid-cols-2">
                    <Stat label="Total Incoming Calls" value={num(report, "totalIncomingCalls")} />
                    <Stat label="Incoming Connected Calls" value={num(report, "incomingConnectedCalls")} />
                    <Stat label="Incoming Missed Calls" value={num(report, "incomingMissedCalls")} />
                    <Stat label="Avg. Incoming Call Duration" value={time(report, "avgIncomingCallDuration")} />
                </div>
            </ReportCard>
            <ReportCard title="Follow Up Report">
                <div className="grid gap-3 sm:grid-cols-3">
                    <Stat label="Follow Ups Due Today" value={num(report, "followUpsDueToday")} />
                    <Stat label="Follow Ups Missed Yesterday" value={num(report, "followUpsMissedYesterday")} />
                    <Stat label="Avg. Turn Around Time" value={time(report, "avgTurnAroundTime")} hint />
                    <Stat label="Compliance %" value={num(report, "compliancePercent")} hint />
                </div>
            </ReportCard>
        </div>
        <div className="grid gap-4 xl:grid-cols-[1.4fr_1fr]">
            <ReportCard title="Dispositions">
                <div className="grid gap-3 sm:grid-cols-3">
                    <Stat label="Total Disposed Count" value={num(report, "totalDisposedCount")} />
                    <Stat label="Disposed Connected Count" value={num(report, "disposedConnectedCount")} />
                    <Stat label="Disposed Not Connected Count" value={num(report, "disposedNotConnectedCount")} />
                    <Stat label="Converted" value={num(report, "convertedLeads", "converted")} />
                </div>
            </ReportCard>
            <ReportCard title="Activity Report">
                <div className="grid gap-3 sm:grid-cols-2">
                    <Stat label="Total Number Of Breaks" value={num(report, "totalBreaks")} />
                    <Stat label="Total Break Duration" value={time(report, "totalBreakDuration")} />
                    <Stat label="Avg. Break Duration" value={time(report, "avgBreakDuration")} />
                    <Stat label="Avg. Form Filling Time" value={time(report, "avgFormFillingTime")} />
                </div>
            </ReportCard>
        </div>
        <div className="grid gap-4 xl:grid-cols-[1.4fr_1fr]">
            <ReportCard title="Login Report">
                <table className="w-full text-left text-sm"><thead className="border-b border-[#eee9f0] text-xs uppercase text-[#817987]"><tr><th className="py-3 font-medium">Time</th><th className="py-3 font-medium">Activity</th><th className="py-3 font-medium">Description</th></tr></thead><tbody><tr><td colSpan={3} className="py-10 text-center text-sm text-[#9a939e]">No history found.</td></tr></tbody></table>
            </ReportCard>
            <ReportCard title="Message Activity Report">
                <div className="flex items-center justify-center gap-8 py-4">
                    <div className="relative size-40"><div className="size-40 rounded-full" style={{ background: "conic-gradient(#22a06b 0 50%, #e5484d 50% 100%)" }} /><div className="absolute inset-5 flex flex-col items-center justify-center rounded-full bg-white"><p className="text-lg font-semibold">—</p><p className="text-xs text-[#77707c]">Messages</p></div></div>
                    <ul className="space-y-3 text-sm">
                        <li className="flex items-center gap-2"><span className="size-2.5 rounded-full bg-[#22a06b]" /> Total WhatsApp Sent <b className="ml-4">{num(report, "whatsappSent")}</b></li>
                        <li className="flex items-center gap-2"><span className="size-2.5 rounded-full bg-[#e5484d]" /> Total Emails Sent <b className="ml-4">{num(report, "emailsSent")}</b></li>
                        <li className="flex items-center gap-2"><span className="size-2.5 rounded-full bg-[#8153d6]" /> Total SMS Sent <b className="ml-4">{num(report, "smsSent")}</b></li>
                    </ul>
                </div>
            </ReportCard>
        </div>
    </DialShell>;
}
