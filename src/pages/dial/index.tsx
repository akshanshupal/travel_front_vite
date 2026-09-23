import { Button } from "@/components/base/buttons/button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FiActivity, FiArrowUpRight, FiBarChart2, FiBriefcase, FiCheckCircle, FiClock, FiPhoneCall, FiUsers } from "react-icons/fi";
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
    const [onBreak, setOnBreak] = useState(false);
    useEffect(() => { getDialQueueSummary().then(setSummary).catch(() => setSummary({})); }, []);
    const connected = Number(summary.connected ?? 3015);
    const total = Number(summary.total ?? 9260);
    const percent = total ? Math.round((connected / total) * 10000) / 100 : 0;

    const kpis = [
        { label: "Connected calls", value: connected.toLocaleString(), detail: "+12.4% vs last week", icon: FiPhoneCall, tone: "text-[#287f68] bg-[#e8f7f0]" },
        { label: "Leads in queue", value: total.toLocaleString(), detail: "Across 4 campaigns", icon: FiUsers, tone: "text-[#6f36c2] bg-[#f1e9fb]" },
        { label: "Active agents", value: `${summary.activeAgents ?? 1}/15`, detail: "Ready to call", icon: FiActivity, tone: "text-[#c26a1b] bg-[#fff2df]" },
        { label: "Avg. response time", value: "02:18", detail: "-08s vs last week", icon: FiClock, tone: "text-[#3d6ea8] bg-[#eaf2fc]" },
    ];

    return <DialShell title="Home" description="A calm view of your calling workspace, campaign health, and next actions.">
        <section className="relative overflow-hidden rounded-2xl bg-[#29222f] px-6 py-7 text-white shadow-[0_12px_32px_rgba(41,34,47,0.15)] md:px-8">
            <div className="relative z-10 max-w-xl"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#cbb4df]">Your calling workspace</p><h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Good morning, Akshanshu.</h2><p className="mt-3 max-w-md text-sm leading-6 text-[#d9d0df]">You have a focused queue today. Pick up where you left off or check how your campaigns are moving.</p><div className="mt-6 flex flex-wrap items-center gap-3"><button type="button" onClick={() => setOnBreak((value) => !value)} aria-pressed={onBreak} className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${onBreak ? "bg-white text-[#6f36c2]" : "bg-[#8d59bd] text-white hover:bg-[#a173ce]"}`}>{onBreak ? "Resume calling" : "Take a break"}</button><button type="button" onClick={() => navigate("/dial/leads/queue")} className="rounded-lg border border-white/25 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10">Open lead queue <FiArrowUpRight className="ml-1 inline" /></button></div></div><div className="pointer-events-none absolute -right-12 -top-24 size-72 rounded-full border-[32px] border-[#614276]/55" /><div className="pointer-events-none absolute -bottom-36 right-20 size-72 rounded-full border-[18px] border-[#a783be]/25" />
        </section>
        <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{kpis.map(({ label, value, detail, icon: Icon, tone }) => <div key={label} className="rounded-xl border border-[#e8e2eb] bg-white p-4 shadow-sm"><div className="flex items-start justify-between"><div><p className="text-xs text-[#817987]">{label}</p><p className="mt-2 text-2xl font-semibold tracking-tight text-[#29252d]">{value}</p></div><span className={`flex size-9 items-center justify-center rounded-lg ${tone}`}><Icon aria-hidden="true" className="size-4" /></span></div><p className="mt-3 text-xs text-[#817987]">{detail}</p></div>)}</section>
        <div className="grid gap-5 xl:grid-cols-[1.2fr_.8fr]">
            <div className="space-y-4">
                <section className="rounded-xl border border-[#e8e2eb] bg-white p-5 shadow-sm">
                    <div className="mb-4 flex items-center justify-between"><h2 className="text-sm font-semibold">Call overview</h2><select className="rounded-md border border-[#ded6e3] px-2 py-1 text-xs"><option>Last 7 days</option><option>Today</option><option>Last 30 days</option></select></div>
                    <div className="grid gap-5 md:grid-cols-[1.1fr_.9fr]">
                        <div className="flex items-center gap-6"><div className="relative h-24 w-44 overflow-hidden"><div className="absolute left-0 top-0 h-44 w-44 rounded-full" style={{ background: `conic-gradient(from 270deg, #6f36c2 0 ${percent / 2}%, #d7b9f3 ${percent / 2}% 50%, transparent 50%)` }} /><div className="absolute left-6 top-6 h-32 w-32 rounded-full bg-white" /><div className="absolute inset-x-0 top-12 text-center"><p className="text-lg font-bold">{percent}%</p><p className="text-[10px] text-[#77707c]">Connected</p></div></div><div className="space-y-3 text-xs"><p className="border-l-2 border-[#7540bd] pl-3 text-[#77707c]">Connected <b className="ml-8 text-lg text-[#2e2931]">{connected}</b></p><p className="border-l-2 border-[#d8c2ed] pl-3 text-[#77707c]">Total <b className="ml-14 text-lg text-[#2e2931]">{total}</b></p></div></div>
                        <div className="grid grid-cols-2 gap-3"><div className="rounded-lg bg-[#f4fbf6] p-4"><div className="mb-8 flex size-8 items-center justify-center rounded-md bg-[#e0f4e5]"><FiUsers aria-hidden="true" className="size-4 text-[#287f68]" /></div><p className="text-xs text-[#77707c]">Active agents</p><p className="mt-1 text-lg font-semibold">{summary.activeAgents ?? 1}<span className="text-sm text-[#77707c]">/15</span></p></div><div className="rounded-lg bg-[#fffaf0] p-4"><div className="mb-8 flex size-8 items-center justify-center rounded-md bg-[#fff1c7]"><FiClock aria-hidden="true" className="size-4 text-[#c26a1b]" /></div><p className="text-xs text-[#77707c]">On-break agents</p><p className="mt-1 text-lg font-semibold">{summary.breakAgents ?? 0}<span className="text-sm text-[#77707c]">/15</span></p></div></div>
                    </div>
                </section>
                <section><h2 className="mb-2 text-sm font-semibold">Tools to improve efficiency & outcomes</h2><div className="grid gap-3 md:grid-cols-3">{[["User trends","Discover how calls, conversations, and breaks evolved over time."],["Business trend","Track business insights on conversion, calls and lead sources."],["Workflow","Create actions like sending WhatsApp messages and more."]].map(([title,text], index)=><button key={title} className="rounded-lg border border-[#e8e2eb] bg-white p-4 text-left hover:border-[#b993df]"><span className="mb-3 flex size-8 items-center justify-center rounded-md bg-[#f2e9fa] text-[#6f36c2]">{index === 0 ? <FiBarChart2 aria-hidden="true" /> : index === 1 ? <FiBriefcase aria-hidden="true" /> : <FiCheckCircle aria-hidden="true" />}</span><b className="block text-sm">{title}</b><span className="mt-1 block text-xs leading-5 text-[#817987]">{text}</span></button>)}</div></section>
                <section><h2 className="mb-2 text-sm font-semibold">Quick access</h2><div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{[["User call report","/dial/call-logs"],["User login report","/dial/reports"],["Upload Excel sheet","/dial/walk-in-leads"],["Create campaign","/dial/campaigns"]].map(([label,path])=><button key={label} onClick={()=>navigate(path)} className="rounded-lg border border-[#e8e2eb] bg-white px-4 py-3 text-left text-xs font-medium hover:border-[#b993df]">{label} <span className="float-right text-[#6f36c2]">›</span></button>)}</div></section>
                <section className="min-h-52 rounded-xl border border-[#e8e2eb] bg-white p-5"><div className="flex items-center justify-between"><h2 className="text-sm font-semibold">Pinned campaigns</h2><Button color="tertiary" size="sm" onClick={()=>navigate("/dial/campaigns")}>Campaigns report</Button></div><div className="mt-4 flex items-center justify-between border-b border-[#eee9f0] pb-4"><div className="flex items-center gap-3"><span className="flex size-9 items-center justify-center rounded-full bg-[#b991db] font-semibold text-white">C</span><div><p className="text-sm font-medium">Campaign follow-up</p><p className="text-xs text-[#817987]">Ready for calling</p></div></div><Button color="secondary" size="sm" onClick={()=>navigate("/dial/leads")}>Open queue</Button></div></section>
            </div>
            <aside className="h-fit rounded-xl border border-[#e8e2eb] bg-white p-5 shadow-sm xl:sticky xl:top-4"><div className="mb-4 flex items-center justify-between"><h2 className="text-sm font-semibold">Leads by stage</h2><select className="rounded-md border border-[#ded6e3] px-2 py-1 text-xs"><option>All campaigns</option></select></div><div className="space-y-2">{stageRows.map(stage=><div key={stage.label} className="relative overflow-hidden rounded-lg border border-[#eee9f0] p-4"><span className="absolute inset-y-0 left-0 w-1" style={{background:stage.color}}/><div className="flex items-start justify-between"><div><p className="text-xl font-semibold">{stage.count}</p><p className="mt-1 text-xs uppercase text-[#817987]">{stage.label}</p></div><span className="text-xs text-[#9a939e]">{stage.percent}</span></div></div>)}</div></aside>
        </div>
        <button type="button" aria-label="Start calling" onClick={() => navigate("/dial/leads/queue")} className="fixed bottom-8 right-8 z-40 flex size-14 items-center justify-center rounded-full bg-[#6f36c2] text-2xl text-white shadow-xl transition-transform hover:scale-105">+</button>
    </DialShell>;
}
