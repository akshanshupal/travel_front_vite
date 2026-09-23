import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { TextArea } from "@/components/base/textarea/textarea";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";
import { getLeadsById } from "@/utils/services/leadsService";
import { finalizeDialCall, updateDialCallState, releaseDialReservation } from "@/utils/services/dialService";
import { DialShell } from "../../shared";

const noAnswerReasons = ["Did not pick", "Busy in another call", "User disconnected the call", "Switch off", "Network issue", "Call could not be completed", "Other reason", "Incorrect / Invalid number", "Incoming calls not available", "Number not in use / out of service"];

export default function DialLeadViewPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token") || "";
    const [lead, setLead] = useState<Record<string, any>>();
    const [callState, setCallState] = useState("READY");
    const [connected, setConnected] = useState(false);
    const [reason, setReason] = useState(noAnswerReasons[0]);
    const [notes, setNotes] = useState("");
    const [nextFollowUpAt, setNextFollowUpAt] = useState("");
    const [saving, setSaving] = useState(false);
    const [startedAt, setStartedAt] = useState<string>();
    const [elapsed, setElapsed] = useState(0);

    useEffect(() => { if (!id) return; getLeadsById(id, { populate: "campaign,pipeline" }).then((response) => setLead(response?.data ?? response)).catch(() => undefined); }, [id]);
    useEffect(() => { if (!startedAt) return; const timer = window.setInterval(() => setElapsed(Math.floor((Date.now() - new Date(startedAt).getTime()) / 1000)), 1000); return () => window.clearInterval(timer); }, [startedAt]);
    const setState = async (next: string) => { if (!id || !token) return; setCallState(next); if (!startedAt) setStartedAt(new Date().toISOString()); try { await updateDialCallState({ lead: id, token, state: next }); } catch { setCallState("FAILED"); } };
    const submit = async () => { if (!id || !token || saving) return; setSaving(true); const endedAt = new Date().toISOString(); try { await finalizeDialCall({ lead: id, token, callState, outcome: connected ? "Connected" : "Not Connected", disposition: connected ? "Connected" : "Not Connected", dispositionReason: connected ? undefined : reason, connected, notes, startedAt: startedAt || endedAt, endedAt, durationSeconds: elapsed, ...(nextFollowUpAt ? { nextFollowUpAt: new Date(nextFollowUpAt).toISOString() } : {}), idempotencyKey: token }); navigate("/dial/leads"); } finally { setSaving(false); } };
    const cancel = async () => { if (id && token) await releaseDialReservation({ lead: id, token }).catch(() => undefined); navigate("/dial/leads"); };
    return <DialShell title={lead?.title || lead?.name || "Dial lead"} description={`${lead?.mobile || lead?.email || "Lead details"} · ${callState}`} action={<Button color="secondary" onClick={cancel}>Back to leads</Button>}><div className="grid gap-4 lg:grid-cols-2"><div className="rounded-xl border border-secondary bg-primary p-6"><h2 className="text-md font-semibold text-primary">Lead information</h2><dl className="mt-5 space-y-3 text-sm"><div><dt className="text-tertiary">Phone</dt><dd className="font-medium text-primary">{lead?.mobile || "—"}</dd></div><div><dt className="text-tertiary">Email</dt><dd className="font-medium text-primary">{lead?.email || "—"}</dd></div><div><dt className="text-tertiary">Campaign</dt><dd className="font-medium text-primary">{lead?.campaign?.title || "—"}</dd></div><div><dt className="text-tertiary">Call state</dt><dd className="font-medium text-primary">{callState} {startedAt ? `· ${String(Math.floor(elapsed / 60)).padStart(2, "0")}:${String(elapsed % 60).padStart(2, "0")}` : ""}</dd></div></dl><div className="mt-6 flex flex-wrap gap-2"><Button color="primary" isDisabled={saving || callState === "DIALING" || callState === "CONNECTED"} onClick={() => setState("DIALING")}>Start call</Button><Button color="secondary" isDisabled={saving} onClick={() => { setConnected(true); setState("CONNECTED"); }}>Mark connected</Button><Button color="secondary" isDisabled={saving} onClick={() => { setConnected(false); setState("NO_ANSWER"); }}>No answer</Button><Button color="secondary" isDisabled={saving} onClick={() => setState("BUSY")}>Busy</Button></div></div><div className="rounded-xl border border-secondary bg-primary p-6"><h2 className="text-md font-semibold text-primary">Dispose lead</h2><div className="mt-5 space-y-4"><div className="flex gap-2"><Button color={connected ? "primary" : "secondary"} onClick={() => { setConnected(true); setState("CONNECTED"); }}>Yes Connected</Button><Button color={!connected ? "primary" : "secondary"} onClick={() => { setConnected(false); setState("NO_ANSWER"); }}>Not Connected</Button></div>{!connected && <label className="block text-sm text-primary">Reason<select className="mt-1 w-full rounded-lg border border-secondary bg-primary p-2" value={reason} onChange={(event) => setReason(event.target.value)}>{noAnswerReasons.map((item) => <option key={item}>{item}</option>)}</select></label>}<TextArea label="Dispose Remark" placeholder="Enter remarks here" value={notes} onChange={setNotes}/><Input label="Next follow-up (optional)" type="datetime-local" value={nextFollowUpAt} onChange={setNextFollowUpAt}/><Button color="primary" isDisabled={saving} onClick={submit}>{saving ? "Submitting…" : "Submit disposition"}</Button></div></div></div></DialShell>;
}
