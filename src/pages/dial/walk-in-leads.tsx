import { useEffect, useState } from "react";
import { DialShell, EmptyPanel } from "./shared";
import { assignWalkInLead, convertWalkInLead, createWalkInCallLog, createWalkInLead, getWalkInLeads } from "@/utils/services/dialService";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { TableCard } from "@/components/application/table/table";

type Lead = Record<string, any>;

export default function DialWalkInLeadsPage() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [query, setQuery] = useState("");
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [showForm, setShowForm] = useState(false);
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({ title: "", mobile: "", email: "", walkInLocation: "", notes: "" });

    const load = async () => {
        const result = await getWalkInLeads({ search: query, page, limit: 10 });
        setLeads(result?.data || []);
        setTotal(result?.totalCount || 0);
    };
    useEffect(() => { void load(); }, [page, query]);

    const create = async (event: React.FormEvent) => {
        event.preventDefault();
        setSaving(true);
        try {
            await createWalkInLead({ ...form, otherOptions: form.notes });
            setForm({ title: "", mobile: "", email: "", walkInLocation: "", notes: "" });
            setShowForm(false);
            await load();
        } finally { setSaving(false); }
    };

    const action = async (lead: Lead, type: "assign" | "convert" | "call") => {
        if (type === "assign") await assignWalkInLead(lead.id);
        if (type === "convert") await convertWalkInLead(lead.id);
        if (type === "call") await createWalkInCallLog(lead.id, { outcome: "follow-up", notes: "Walk-in lead follow-up" });
        await load();
    };

    return <DialShell title="Walk-in leads" description="Capture and follow up on leads received in person." action={<Button onClick={() => setShowForm(value => !value)}>{showForm ? "Close" : "Add walk-in lead"}</Button>}>
        {showForm && <form onSubmit={create} className="mb-4 rounded-xl border border-secondary bg-primary p-5"><div className="grid gap-4 md:grid-cols-2"><label className="text-sm font-medium text-primary">Name or title<Input aria-label="Name or title" required value={form.title} onChange={value => setForm({ ...form, title: value })} /></label><label className="text-sm font-medium text-primary">Mobile<Input aria-label="Mobile" value={form.mobile} onChange={value => setForm({ ...form, mobile: value })} /></label><label className="text-sm font-medium text-primary">Email<Input aria-label="Email" type="email" value={form.email} onChange={value => setForm({ ...form, email: value })} /></label><label className="text-sm font-medium text-primary">Location<Input aria-label="Location" value={form.walkInLocation} onChange={value => setForm({ ...form, walkInLocation: value })} /></label><label className="text-sm font-medium text-primary md:col-span-2">Notes<textarea className="mt-1 min-h-24 w-full rounded-lg border border-secondary bg-primary p-3 text-sm" value={form.notes} onChange={event => setForm({ ...form, notes: event.target.value })} /></label></div><div className="mt-4 flex justify-end"><Button type="submit" isLoading={saving}>Save lead</Button></div></form>}
        <div className="mb-4 flex gap-3"><Input aria-label="Search walk-in leads" placeholder="Search name, mobile or email" value={query} onChange={value => { setPage(1); setQuery(value); }} /></div>
        <TableCard.Root><TableCard.Header title="Walk-in leads" badge={total} />{leads.length ? <div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead className="border-b border-secondary text-xs uppercase text-tertiary"><tr><th className="px-6 py-3">Lead</th><th className="px-6 py-3">Contact</th><th className="px-6 py-3">Status</th><th className="px-6 py-3">Actions</th></tr></thead><tbody>{leads.map(lead => <tr key={lead.id} className="border-b border-secondary last:border-0"><td className="px-6 py-4 font-medium text-primary">{lead.title}<div className="text-xs text-tertiary">{lead.walkInLocation || "Walk-in"}</div></td><td className="px-6 py-4 text-tertiary">{lead.mobile || lead.email || "—"}</td><td className="px-6 py-4 text-tertiary">{lead.leadStatus || "open"}</td><td className="px-6 py-4"><div className="flex flex-wrap gap-2">{!lead.salesExecutive && <Button size="sm" color="secondary" onClick={() => void action(lead, "assign")}>Assign to me</Button>}{lead.leadStatus !== "converted" && <Button size="sm" onClick={() => void action(lead, "convert")}>Convert</Button>}<Button size="sm" color="secondary" onClick={() => void action(lead, "call")}>Log call</Button></div></td></tr>)}</tbody></table></div> : <EmptyPanel title="No walk-in leads yet" description="Add a walk-in lead to start capturing visitors and follow-ups." action={<Button onClick={() => setShowForm(true)}>Add walk-in lead</Button>} />}{total > 10 && <div className="flex items-center justify-between border-t border-secondary px-6 py-4 text-sm text-tertiary"><span>Page {page} of {Math.ceil(total / 10)}</span><div className="flex gap-2"><Button size="sm" color="secondary" isDisabled={page === 1} onClick={() => setPage(value => value - 1)}>Previous</Button><Button size="sm" color="secondary" isDisabled={page >= Math.ceil(total / 10)} onClick={() => setPage(value => value + 1)}>Next</Button></div></div>}</TableCard.Root>
    </DialShell>;
}
