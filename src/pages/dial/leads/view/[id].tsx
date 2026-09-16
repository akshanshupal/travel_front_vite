import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { TextArea } from "@/components/base/textarea/textarea";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getLeadsById } from "@/utils/services/leadsService";
import { createDialCallLog } from "@/utils/services/dialService";
import { DialShell } from "../../shared";

export default function DialLeadViewPage() {
    const { id } = useParams(); const navigate = useNavigate();
    const [lead, setLead] = useState<Record<string, any>>(); const [outcome, setOutcome] = useState(""); const [connected, setConnected] = useState(false); const [notes, setNotes] = useState(""); const [nextFollowUpAt, setNextFollowUpAt] = useState(""); const [saving, setSaving] = useState(false);
    useEffect(() => { if (!id) return; getLeadsById(id, { populate: "campaign,pipeline" }).then((response) => setLead(response?.data ?? response)).catch(() => undefined); }, [id]);
    const submit = async () => { if (!id || !outcome) return; setSaving(true); try { await createDialCallLog({ lead: id, campaign: lead?.campaign?.id || lead?.campaign, outcome, connected, notes, ...(nextFollowUpAt ? { nextFollowUpAt: new Date(nextFollowUpAt).toISOString() } : {}) }); navigate("/dial/leads"); } finally { setSaving(false); } };
    return <DialShell title={lead?.title || lead?.name || "Dial lead"} description={`${lead?.mobile || lead?.email || "Lead details"} · ${lead?.currentStageName || lead?.leadStatus || "Open"}`} action={<Button color="secondary" onClick={() => navigate("/dial/leads")}>Back to leads</Button>}><div className="grid gap-4 lg:grid-cols-2"><div className="rounded-xl border border-secondary bg-primary p-6"><h2 className="text-md font-semibold text-primary">Contact details</h2><dl className="mt-5 space-y-3 text-sm"><div><dt className="text-tertiary">Phone</dt><dd className="font-medium text-primary">{lead?.mobile || "—"}</dd></div><div><dt className="text-tertiary">Email</dt><dd className="font-medium text-primary">{lead?.email || "—"}</dd></div><div><dt className="text-tertiary">Campaign</dt><dd className="font-medium text-primary">{lead?.campaign?.title || "—"}</dd></div></dl></div><div className="rounded-xl border border-secondary bg-primary p-6"><h2 className="text-md font-semibold text-primary">Record call disposition</h2><div className="mt-5 space-y-4"><Input label="Outcome" placeholder="e.g. Interested, no answer" value={outcome} onChange={setOutcome}/><label className="flex items-center gap-2 text-sm text-primary"><input type="checkbox" checked={connected} onChange={(event) => setConnected(event.target.checked)}/> Connected</label><TextArea label="Notes" placeholder="Add call notes" value={notes} onChange={setNotes}/><Input label="Next follow-up (optional)" type="datetime-local" value={nextFollowUpAt} onChange={setNextFollowUpAt}/><Button color="primary" isDisabled={!outcome || saving} onClick={submit}>{saving ? "Saving…" : "Save call log"}</Button></div></div></div></DialShell>;
}
