import { FloatingHeaderTable, TableCard } from "@/components/application/table/table";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Select } from "@/components/base/select/select";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";

const navItems = [
    { label: "Dashboard", path: "/dial/home", icon: "⌂" },
    { label: "Contacts", path: "/dial/leads", icon: "♧" },
    { label: "Pipeline", path: "/dial/campaigns", icon: "⌁" },
    { label: "New WhatsApp", path: "/dial/walk-in-leads", icon: "◌" },
    { label: "Workflow", path: "/dial/tasks", icon: "◇" },
    { label: "Templates", path: "/dial/reports", icon: "▤" },
    { label: "Reports", path: "/dial/reports", icon: "▥" },
    { label: "Trends", path: "/dial/reports", icon: "⌁" },
];

const serviceItems = [
    { label: "AI Calling Agent", path: "/dial/home", icon: "✦" },
    { label: "WhatsApp API", path: "/dial/call-logs", icon: "◈" },
    { label: "Bulk SMS", path: "/dial/call-logs", icon: "▱" },
    { label: "Cloud Telephony", path: "/dial/call-logs", icon: "☎" },
];

export const DialShell = ({ title, description, children, action }: { title: string; description?: string; children: React.ReactNode; action?: React.ReactNode }) => {
    const location = useLocation();
    const [callingOpen, setCallingOpen] = useState(true);
    const [callingMinimized, setCallingMinimized] = useState(false);
    return <div className="min-h-screen bg-[#f8f5fa] text-[#25222b]">
        <div className="h-7 bg-[#242b20]" />
        <div className="flex min-h-[calc(100vh-1.75rem)]">
            <aside className="hidden w-56 shrink-0 border-r border-[#e8e2eb] bg-white lg:block">
                <div className="flex h-16 items-center gap-2 border-b border-[#eee9f0] px-5"><div className="flex size-8 items-center justify-center rounded-lg bg-[#6f36c2] text-sm font-bold text-white">N</div><span className="font-semibold">Hospitality Group</span></div>
                <nav className="space-y-1 p-3">{navItems.map((item) => <Link key={item.label} to={item.path} className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${location.pathname === item.path ? "bg-[#6f36c2] font-semibold text-white" : "text-[#5d5863] hover:bg-[#f2edf7]"}`}><span className="w-4 text-center">{item.icon}</span>{item.label}</Link>)}<p className="px-3 pb-1 pt-5 text-[10px] font-semibold uppercase tracking-wider text-[#96909c]">Other services</p>{serviceItems.map((item) => <Link key={item.label} to={item.path} className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-[#5d5863] hover:bg-[#f2edf7]"><span className="w-4 text-center">{item.icon}</span>{item.label}</Link>)}</nav>
                <div className="absolute bottom-4 space-y-2 px-4 text-xs text-[#69626f]"><p>↗ Refer & Earn</p><p>⚙ Settings</p></div>
            </aside>
            <div className="min-w-0 flex-1">
                <header className="flex h-16 items-center justify-between border-b border-[#e8e2eb] bg-white px-5"><div className="flex items-center gap-3"><span className="text-lg font-semibold text-[#6f36c2]">AI Calling Agents</span><span className="hidden text-xs text-[#817987] md:inline">in NeoDove</span></div><div className="flex items-center gap-4 text-sm text-[#77707c]"><span>◌</span><span>▣</span><span>♧</span><span>♢</span><Button color="secondary" size="sm">Switch to Dialer</Button></div></header>
                <div className="border-b border-[#e9d8f8] bg-[#fbf1ff] px-6 py-2 text-center text-xs text-[#6f36c2]">AI calling agents that qualify leads while your team focuses on outcomes. <span className="ml-4 font-semibold">Request your first AI lead qualification agent →</span></div>
                <main className="mx-auto max-w-[1500px] space-y-4 p-5 lg:p-7"><div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between"><div><p className="text-xs font-semibold uppercase tracking-wider text-[#7a3ac6]">Dial workspace</p><h1 className="mt-1 text-2xl font-semibold text-[#29252d]">{title}</h1>{description && <p className="mt-1 text-sm text-[#817987]">{description}</p>}</div>{action}</div>{children}</main>
                {callingOpen && !callingMinimized && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 p-4"><div className="max-h-[calc(100vh-2rem)] w-full max-w-[1100px] overflow-auto rounded-2xl bg-white shadow-2xl"><div className="sticky top-0 z-10 flex items-center justify-center border-b border-[#ebe5ef] bg-white px-5 py-3"><div className="flex gap-10 text-sm font-semibold text-[#6f36c2]"><button className="border-b-2 border-[#6f36c2] pb-3">LEAD INFORMATION</button><button className="pb-3 text-[#77707c]">DISPOSE LEAD</button><button className="pb-3 text-[#77707c]">OTHER</button></div><div className="absolute right-4 flex items-center gap-2"><button aria-label="Minimize calling" onClick={() => setCallingMinimized(true)} className="flex size-9 items-center justify-center rounded-full bg-[#f0edfa] text-lg text-[#6f36c2]">−</button><button className="rounded-full border border-[#e4d8ee] px-4 py-2 text-xs font-semibold text-[#6f36c2]">▰ BREAK</button><button aria-label="Close calling" onClick={() => setCallingOpen(false)} className="rounded-full px-2 text-lg text-[#77707c]">⋮</button></div></div><div className="grid gap-4 p-6 md:grid-cols-3"><div className="rounded-xl border border-[#e8e2eb] p-6 text-center shadow-sm"><p className="text-xs font-semibold text-[#6f36c2]">Contact Name:</p><p className="mt-1 text-xl font-semibold text-[#6f36c2]">punit kumar</p></div><div className="rounded-xl bg-[#6124bd] p-6 text-center text-white shadow-sm"><p className="text-xs font-semibold">Call on this number</p><p className="mt-2 text-2xl font-semibold">☎ 9599636543</p></div><div className="rounded-xl border border-[#e8e2eb] p-6 text-center shadow-sm"><p className="text-xs font-semibold text-[#6f36c2]">Send Message:</p><div className="mt-3 flex justify-center gap-3"><button className="size-12 rounded-lg border">◉</button><button className="size-12 rounded-lg border">✉</button><button className="size-12 rounded-lg border">▤</button></div></div></div><div className="mx-6 mb-6 rounded-xl border border-[#e8e2eb] p-5"><p className="text-lg font-semibold text-[#6f36c2]">Deal Amount</p></div><div className="mx-6 mb-8 rounded-xl border border-[#e8e2eb] p-6"><h2 className="mb-5 border-b border-[#6f36c2] pb-3 text-lg font-semibold">Lead Details</h2><div className="grid gap-6 lg:grid-cols-2"><div className="rounded-xl border border-[#e8e2eb] p-5"><h3 className="mb-4 border-b pb-3 font-semibold">About</h3><dl className="space-y-4 text-sm"><div className="flex justify-between"><dt className="text-[#77707c]">Lead Name:</dt><dd className="font-semibold">punit kumar</dd></div><div className="flex justify-between"><dt className="text-[#77707c]">Email Address:</dt><dd className="font-semibold">punitkumar25887@gmail.com</dd></div><div className="flex justify-between"><dt className="text-[#77707c]">Mobile Number:</dt><dd className="font-semibold">9599636543</dd></div><div className="flex justify-between"><dt className="text-[#77707c]">Status:</dt><dd className="rounded bg-[#fff0dd] px-2 py-1 text-[#ed761e]">In-Progress</dd></div><div className="flex justify-between"><dt className="text-[#77707c]">Assigned To:</dt><dd className="font-semibold">Z-Akshanshu</dd></div></dl></div><div className="rounded-xl border border-[#e8e2eb] p-5"><h3 className="mb-4 border-b pb-3 font-semibold">Timeline</h3><div className="space-y-6 text-sm"><p><span className="mr-3 rounded bg-[#f3f0f5] px-2 py-1 text-xs">18 Sep 2026</span> Lead Disposed | Not Connected | 4:36 PM</p><p><span className="mr-3 rounded bg-[#f3f0f5] px-2 py-1 text-xs">19 Nov 2024</span> Lead Created | Source: Copy Lead | 5:02 PM</p></div></div></div></div></div></div>}
                {callingOpen && callingMinimized && <button onClick={() => setCallingMinimized(false)} className="fixed bottom-0 left-1/2 z-50 flex -translate-x-1/2 items-center gap-6 rounded-t-lg bg-[#6f2aa2] px-5 py-3 text-sm font-semibold text-white shadow-xl">Maximize to go back to calling <span className="flex size-8 items-center justify-center rounded-full bg-white text-lg text-[#6f2aa2]">⌃</span></button>}
            </div>
        </div>
    </div>;
};

export const EmptyPanel = ({ title, description, action }: { title: string; description: string; action?: React.ReactNode }) => <TableCard.Root><div className="flex min-h-64 flex-col items-center justify-center gap-3 px-6 py-12 text-center"><div className="flex size-12 items-center justify-center rounded-full bg-[#f0e4ff] text-lg font-semibold text-[#6f36c2]">—</div><h2 className="text-md font-semibold text-primary">{title}</h2><p className="max-w-md text-sm text-tertiary">{description}</p>{action}</div></TableCard.Root>;

export const Metric = ({ label, value, tone = "brand" }: { label: string; value: string | number; tone?: "brand" | "success" | "warning" }) => <div className="rounded-xl border border-[#e8e2eb] bg-white p-4 shadow-[0_1px_2px_rgba(38,20,54,0.03)]"><Badge color={tone === "brand" ? "blue" : tone}>{label}</Badge><p className="mt-3 text-2xl font-semibold text-primary">{value}</p></div>;

export function DialListPage({ title, description, columns, rows = [], emptyTitle = "Nothing here yet", emptyDescription = "Data will appear here when the dial workspace has activity.", search = true }: { title: string; description: string; columns: string[]; rows?: (string | React.ReactNode)[][]; emptyTitle?: string; emptyDescription?: string; search?: boolean }) {
    const [query, setQuery] = useState("");
    const filtered = rows.filter(row => !query || row.some(cell => String(cell).toLowerCase().includes(query.toLowerCase())));
    return <DialShell title={title} description={description}>{search && <div className="flex flex-col gap-3 md:flex-row"><Input aria-label="Search" placeholder="Search..." value={query} onChange={setQuery} /><Select aria-label="View" placeholder="All records" items={[{ id: "all", label: "All records" }]}>{item => <Select.Item id={item.id}>{item.label}</Select.Item>}</Select></div>}<TableCard.Root><TableCard.Header title={title} badge={rows.length} />{filtered.length ? <FloatingHeaderTable><table className="w-full text-left text-sm"><thead className="border-b border-secondary text-xs uppercase text-tertiary"><tr>{columns.map((column, columnIndex) => <th key={column} className={columnIndex === 0 ? "sticky left-0 z-20 bg-secondary px-6 py-3 font-medium shadow-[4px_0_8px_-6px_rgba(0,0,0,0.35)]" : columnIndex === columns.length - 1 && column.toLowerCase().includes("action") ? "sticky right-0 z-20 border-l border-secondary bg-secondary px-6 py-3 font-medium shadow-[-4px_0_8px_-6px_rgba(0,0,0,0.35)]" : "bg-secondary px-6 py-3 font-medium"}>{column}</th>)}</tr></thead><tbody>{filtered.map((row, index) => <tr key={index} className="border-b border-secondary last:border-0"><td className="px-6 py-4" colSpan={columns.length}>{row.join(" · ")}</td></tr>)}</tbody></table></FloatingHeaderTable> : <EmptyPanel title={emptyTitle} description={emptyDescription} />}</TableCard.Root></DialShell>;
}

export const DialBackButton = () => { const navigate = useNavigate(); return <Button color="secondary" onClick={() => navigate("/dial/home")}>Back to dial</Button>; };
