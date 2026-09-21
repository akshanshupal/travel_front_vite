import { Button } from "@/components/base/buttons/button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getDialQueueSummary } from "@/utils/services/dialService";
import { DialShell } from "./shared";

const stageRows = [
    { label: "Open", count: 2379, percent: "3.61%", color: "#62c990" },
    { label: "Qualified", count: 55, percent: "0.08%", color: "#e89c57" },
    { label: "Sales Converted", count: 557, percent: "0.84%", color: "#53b9a8" },
    { label: "Rejected", count: 62966, percent: "95.47%", color: "#ef6a73" },
];

export default function DialHomePage() {
    const navigate = useNavigate();
    const [summary, setSummary] = useState<Record<string, any>>({});
    useEffect(() => { getDialQueueSummary().then(setSummary).catch(() => setSummary({})); }, []);
    const connected = Number(summary.connected ?? 3015);
    const total = Number(summary.total ?? 9260);
    const percent = total ? Math.round((connected / total) * 10000) / 100 : 0;

    return <DialShell title="Dashboard" description="Live overview of agent availability, calls, and lead movement.">
        <div className="grid gap-4 xl:grid-cols-[1.2fr_.8fr]">
            <div className="space-y-4">
                <section className="rounded-xl border border-[#e8e2eb] bg-white p-5 shadow-sm">
                    <div className="mb-4 flex items-center justify-between"><h2 className="text-sm font-semibold">Call overview</h2><select className="rounded-md border border-[#ded6e3] px-2 py-1 text-xs"><option>Last 7 days</option><option>Today</option><option>Last 30 days</option></select></div>
                    <div className="grid gap-5 md:grid-cols-[1.1fr_.9fr]">
                        <div className="flex items-center gap-6"><div className="relative h-24 w-44 overflow-hidden"><div className="absolute left-0 top-0 h-44 w-44 rounded-full" style={{ background: `conic-gradient(from 270deg, #6f36c2 0 ${percent / 2}%, #d7b9f3 ${percent / 2}% 50%, transparent 50%)` }} /><div className="absolute left-6 top-6 h-32 w-32 rounded-full bg-white" /><div className="absolute inset-x-0 top-12 text-center"><p className="text-lg font-bold">{percent}%</p><p className="text-[10px] text-[#77707c]">Connected</p></div></div><div className="space-y-3 text-xs"><p className="border-l-2 border-[#7540bd] pl-3 text-[#77707c]">Connected <b className="ml-8 text-lg text-[#2e2931]">{connected}</b></p><p className="border-l-2 border-[#d8c2ed] pl-3 text-[#77707c]">Total <b className="ml-14 text-lg text-[#2e2931]">{total}</b></p></div></div>
                        <div className="grid grid-cols-2 gap-3"><div className="rounded-lg bg-[#f4fbf6] p-4"><div className="mb-8 flex size-8 items-center justify-center rounded-md bg-[#e0f4e5]">♟</div><p className="text-xs text-[#77707c]">Active agents</p><p className="mt-1 text-lg font-semibold">{summary.activeAgents ?? 1}<span className="text-sm text-[#77707c]">/15</span></p></div><div className="rounded-lg bg-[#fffaf0] p-4"><div className="mb-8 flex size-8 items-center justify-center rounded-md bg-[#fff1c7]">☕</div><p className="text-xs text-[#77707c]">On-break agents</p><p className="mt-1 text-lg font-semibold">{summary.breakAgents ?? 0}<span className="text-sm text-[#77707c]">/15</span></p></div></div>
                    </div>
                </section>
                <section><h2 className="mb-2 text-sm font-semibold">Tools to improve efficiency & outcomes</h2><div className="grid gap-3 md:grid-cols-3">{[["User trends","Discover how calls, conversations, and breaks evolved over time."],["Business trend","Track business insights on conversion, calls and lead sources."],["Workflow","Create actions like sending WhatsApp messages and more."]].map(([title,text], index)=><button key={title} className="rounded-lg border border-[#e8e2eb] bg-white p-4 text-left hover:border-[#b993df]"><span className="mb-3 flex size-8 items-center justify-center rounded-md bg-[#f2e9fa] text-[#6f36c2]">{index === 0 ? "♟" : index === 1 ? "▥" : "✦"}</span><b className="block text-sm">{title}</b><span className="mt-1 block text-xs leading-5 text-[#817987]">{text}</span></button>)}</div></section>
                <section><h2 className="mb-2 text-sm font-semibold">Quick access</h2><div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{[["User call report","/dial/call-logs"],["User login report","/dial/reports"],["Upload Excel sheet","/dial/walk-in-leads"],["Create campaign","/dial/campaigns"]].map(([label,path])=><button key={label} onClick={()=>navigate(path)} className="rounded-lg border border-[#e8e2eb] bg-white px-4 py-3 text-left text-xs font-medium hover:border-[#b993df]">{label} <span className="float-right text-[#6f36c2]">›</span></button>)}</div></section>
                <section className="min-h-52 rounded-xl border border-[#e8e2eb] bg-white p-5"><div className="flex items-center justify-between"><h2 className="text-sm font-semibold">Pinned campaigns</h2><Button color="tertiary" size="sm" onClick={()=>navigate("/dial/campaigns")}>Campaigns report</Button></div><div className="mt-4 flex items-center justify-between border-b border-[#eee9f0] pb-4"><div className="flex items-center gap-3"><span className="flex size-9 items-center justify-center rounded-full bg-[#b991db] font-semibold text-white">C</span><div><p className="text-sm font-medium">Campaign follow-up</p><p className="text-xs text-[#817987]">Ready for calling</p></div></div><Button color="secondary" size="sm" onClick={()=>navigate("/dial/leads")}>Open queue</Button></div></section>
            </div>
            <aside className="h-fit rounded-xl border border-[#e8e2eb] bg-white p-5 shadow-sm xl:sticky xl:top-4"><div className="mb-4 flex items-center justify-between"><h2 className="text-sm font-semibold">Leads by stage</h2><select className="rounded-md border border-[#ded6e3] px-2 py-1 text-xs"><option>All campaigns</option></select></div><div className="space-y-2">{stageRows.map(stage=><div key={stage.label} className="relative overflow-hidden rounded-lg border border-[#eee9f0] p-4"><span className="absolute inset-y-0 left-0 w-1" style={{background:stage.color}}/><div className="flex items-start justify-between"><div><p className="text-xl font-semibold">{stage.count}</p><p className="mt-1 text-xs uppercase text-[#817987]">{stage.label}</p></div><span className="text-xs text-[#9a939e]">{stage.percent}</span></div></div>)}</div></aside>
        </div>
    </DialShell>;
}
