import { useEffect, useState } from "react";
import { DialShell, EmptyPanel } from "./shared";
import { assignWalkInLead, convertWalkInLead, createWalkInCallLog, createWalkInLead, getWalkInLeads } from "@/utils/services/dialService";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { TableCard, FloatingHeaderTable } from "@/components/application/table/table";
import { CompactPagination } from "@/components/application/pagination/pagination";
import { FiUserPlus, FiX } from "react-icons/fi";

type Lead = Record<string, any>;

const columns = ["No.", "Contact Name", "Contact Number", "Campaign Name", "Lead Stage", "Tag", "Status", "Creation Date", "Action"];

export default function DialWalkInLeadsPage() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [query, setQuery] = useState("");
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [total, setTotal] = useState<number | null>(null);
    const [countLoading, setCountLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [saving, setSaving] = useState(false);
    const [last7Days, setLast7Days] = useState(true);
    const [form, setForm] = useState({ title: "", mobile: "", email: "", walkInLocation: "", notes: "" });

    const load = async () => {
        const result = await getWalkInLeads({ search: query, page, limit });
        setLeads(result?.data || []);
    };
    useEffect(() => { void load(); }, [page, query, limit]);
    useEffect(() => setTotal(null), [query, limit]);
    const requestTotalCount = async () => {
        setCountLoading(true);
        try {
            const result = await getWalkInLeads({ search: query, page: 1, limit: 1, totalCount: true });
            setTotal(Number(result?.totalCount ?? 0));
        } finally { setCountLoading(false); }
    };

    const create = async (event: React.FormEvent) => {
        event.preventDefault();
        setSaving(true);
        try {
            await createWalkInLead({ ...form, otherOptions: form.notes });
            setForm({ title: "", mobile: "", email: "", walkInLocation: "", notes: "" });
            setShowForm(false);
            setTotal(null);
            await load();
        } finally { setSaving(false); }
    };

    const action = async (lead: Lead, type: "assign" | "convert" | "call") => {
        if (type === "assign") await assignWalkInLead(lead.id);
        if (type === "convert") await convertWalkInLead(lead.id);
        if (type === "call") await createWalkInCallLog(lead.id, { outcome: "follow-up", notes: "Walk-in lead follow-up" });
        setTotal(null);
        await load();
    };

    const formatField = (lead: Lead, key: string) => {
        if (key === "name") return lead.title || lead.name || "—";
        if (key === "contact") return lead.mobile || lead.email || "—";
        if (key === "campaign") return lead.campaign?.title || lead.campaignName || "—";
        if (key === "stage") return lead.leadStage || lead.leadStatus || "—";
        if (key === "tag") return lead.tag || "—";
        if (key === "status") return lead.status || lead.leadStatus || "—";
        if (key === "createdAt") return lead.createdAt ? new Date(lead.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "—";
        return "—";
    };

    return <DialShell title="Walk in Leads" action={<Button onClick={() => setShowForm(value => !value)}><span className="flex items-center gap-2"><FiUserPlus aria-hidden="true" /> {showForm ? "Close" : "Add Lead"}</span></Button>}>
        <div className="flex flex-wrap items-center gap-3">
            {last7Days && <button type="button" onClick={() => setLast7Days(false)} className="flex items-center gap-2 rounded-lg border border-[#e9d8f8] bg-[#fbf1ff] px-3 py-2 text-sm font-medium text-[#6f36c2]">Last 7 Days <FiX aria-hidden="true" className="size-3.5" /></button>}
            <div className="ml-auto"><Input aria-label="Search walk-in leads" placeholder="Search name, mobile or email" value={query} onChange={value => { setPage(1); setQuery(value); }} /></div>
        </div>
        {showForm && <form onSubmit={create} className="rounded-xl border border-secondary bg-primary p-5"><div className="grid gap-4 md:grid-cols-2"><label className="text-sm font-medium text-primary">Contact Name<Input aria-label="Contact name" required value={form.title} onChange={value => setForm({ ...form, title: value })} /></label><label className="text-sm font-medium text-primary">Contact Number<Input aria-label="Contact number" value={form.mobile} onChange={value => setForm({ ...form, mobile: value })} /></label><label className="text-sm font-medium text-primary">Email<Input aria-label="Email" type="email" value={form.email} onChange={value => setForm({ ...form, email: value })} /></label><label className="text-sm font-medium text-primary">Location<Input aria-label="Location" value={form.walkInLocation} onChange={value => setForm({ ...form, walkInLocation: value })} /></label><label className="text-sm font-medium text-primary md:col-span-2">Notes<textarea className="mt-1 min-h-24 w-full rounded-lg border border-secondary bg-primary p-3 text-sm" value={form.notes} onChange={event => setForm({ ...form, notes: event.target.value })} /></label></div><div className="mt-4 flex justify-end"><Button type="submit" isLoading={saving}>Save lead</Button></div></form>}
        <TableCard.Root>
            {leads.length ? <FloatingHeaderTable><table className="w-full text-left text-sm"><thead className="border-b border-secondary text-xs uppercase text-tertiary"><tr>{columns.map((column, index) => <th key={column} className={index === 0 ? "sticky left-0 z-20 bg-secondary px-6 py-3 font-medium shadow-[4px_0_8px_-6px_rgba(0,0,0,0.35)]" : index === columns.length - 1 ? "sticky right-0 z-20 border-l border-secondary bg-secondary px-6 py-3 font-medium shadow-[-4px_0_8px_-6px_rgba(0,0,0,0.35)]" : "bg-secondary px-6 py-3 font-medium"}>{column}</th>)}</tr></thead><tbody>{leads.map((lead, index) => <tr key={String(lead.id || index)} className="border-b border-secondary last:border-0"><td className="sticky left-0 z-10 bg-primary px-6 py-4 text-tertiary shadow-[4px_0_8px_-6px_rgba(0,0,0,0.35)]">{(page - 1) * limit + index + 1}</td><td className="px-6 py-4 font-medium text-primary">{formatField(lead, "name")}</td><td className="px-6 py-4 text-tertiary">{formatField(lead, "contact")}</td><td className="px-6 py-4 text-tertiary">{formatField(lead, "campaign")}</td><td className="px-6 py-4 text-tertiary">{formatField(lead, "stage")}</td><td className="px-6 py-4 text-tertiary">{formatField(lead, "tag")}</td><td className="px-6 py-4 text-tertiary">{formatField(lead, "status")}</td><td className="px-6 py-4 text-tertiary">{formatField(lead, "createdAt")}</td><td className="sticky right-0 z-10 border-l border-secondary bg-primary px-6 py-4 shadow-[-4px_0_8px_-6px_rgba(0,0,0,0.35)]"><div className="flex flex-wrap gap-2">{!lead.salesExecutive && <Button size="sm" color="secondary" onClick={() => void action(lead, "assign")}>Assign</Button>}{lead.leadStatus !== "converted" && <Button size="sm" onClick={() => void action(lead, "convert")}>Convert</Button>}<Button size="sm" color="secondary" onClick={() => void action(lead, "call")}>Log call</Button></div></td></tr>)}</tbody></table></FloatingHeaderTable> : <EmptyPanel title="No Data Found" description="Walk-in leads will appear here once added." action={<Button onClick={() => setShowForm(true)}>Add Lead</Button>} />}
            <CompactPagination page={page} limit={limit} itemCount={leads.length} totalCount={total} countLoading={countLoading} onPageChange={setPage} onLimitChange={value => { setLimit(value); setPage(1); }} onRequestTotalCount={requestTotalCount} />
        </TableCard.Root>
    </DialShell>;
}
