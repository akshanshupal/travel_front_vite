import { DefaultLayout } from "@/layouts/DefaultLayout";
import { TableCard } from "@/components/application/table/table";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Label } from "@/components/base/input/label";
import { Select } from "@/components/base/select/select";
import { TextArea } from "@/components/base/textarea/textarea";
import { Badge } from "@/components/base/badges/badges";
import { useStoreSnackbar } from "@/store/snackbar";
import { getLeadsById, updateLeadStage } from "@/utils/services/leadsService";
import { getContactProperties } from "@/utils/services/contactPropertiesService";
import { addLeadFollowUp, getLeadFollowUps, updateLeadFollowUp } from "@/utils/services/leadFollowUpService";
import { normalizeContactProperties, type ContactPropertyDefinition } from "../custom-properties-fields";
import { ArrowLeft, Edit01 } from "@untitledui/icons";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";

type Stage = { id?: string; _id?: string; key?: string; name?: string; additional?: { transitions?: string[] } };
type LeadData = {
    title?: string; mobile?: string; email?: string; otherOptions?: string; status?: boolean | string; createdAt?: string; updatedAt?: string;
    currentStageId?: string; currentStageName?: string; leadStatus?: string; customProperties?: Record<string, any>;
    pipeline?: { title?: string; initialStage?: Stage; otherStages?: Stage[]; convertedStage?: Stage; rejectedStage?: Stage };
    campaign?: { title?: string; managingCampaign?: string; additionalSetting?: { priority?: string }; distributionType?: string };
    salesExecutive?: { id?: string; _id?: string; name?: string } | string;
};
type FollowUp = { id: string; type?: string; notes?: string; dueAt?: string; status?: string };
const asArray = (value: any) => Array.isArray(value) ? value : [];
const getId = (value: any) => String(value?.id ?? value?._id ?? value ?? "").trim();
const formatDate = (value?: string) => {
    if (!value) return "N/A";
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? "Invalid Date" : date.toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "numeric", minute: "numeric", hour12: true });
};
const InfoRow = ({ label, children }: { label: string; children: React.ReactNode }) => <div className="flex flex-col gap-1"><div className="text-xs font-medium uppercase tracking-wide text-tertiary">{label}</div><div className="text-sm font-medium text-primary">{children}</div></div>;

export default function LeadsViewPage() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { showSnackbar } = useStoreSnackbar();
    const [data, setData] = useState<LeadData | null>(null);
    const [definitions, setDefinitions] = useState<ContactPropertyDefinition[]>([]);
    const [followUps, setFollowUps] = useState<FollowUp[]>([]);
    const [loading, setLoading] = useState(true);
    const [savingStage, setSavingStage] = useState(false);
    const [selectedStage, setSelectedStage] = useState("");
    const [lostReason, setLostReason] = useState("");
    const [followUpForm, setFollowUpForm] = useState({ type: "call", dueAt: "", notes: "" });
    const [savingFollowUp, setSavingFollowUp] = useState(false);

    const load = useCallback(async () => {
        if (!id) return;
        setLoading(true);
        try {
            const [leadRes, propertyRes, followUpRes] = await Promise.all([
                getLeadsById(id, { populate: "pipeline,campaign,salesExecutive", select_pipeline: "title,initialStage,otherStages,convertedStage,rejectedStage" }),
                getContactProperties({ limit: "all" }),
                getLeadFollowUps({ lead: id, limit: "all" }),
            ]);
            const lead = (leadRes as any)?.data ?? leadRes;
            setData(lead);
            setDefinitions(normalizeContactProperties(propertyRes));
            const followResolved = (followUpRes as any)?.data ?? followUpRes;
            const list = Array.isArray(followResolved?.data) ? followResolved.data : Array.isArray(followResolved) ? followResolved : asArray(followResolved?.items);
            setFollowUps(asArray(list).map((item: any) => ({ ...item, id: getId(item) })).filter((item: FollowUp) => item.id));
        } catch (e: any) {
            showSnackbar({ title: "Error", description: e?.message || "Failed to load lead details", color: "danger" });
        } finally { setLoading(false); }
    }, [id, showSnackbar]);
    useEffect(() => { load(); }, [load]);

    const stages = useMemo(() => data?.pipeline ? [data.pipeline.initialStage, ...asArray(data.pipeline.otherStages), data.pipeline.convertedStage, data.pipeline.rejectedStage].filter(stage => stage?.name) as Stage[] : [], [data]);
    const currentStage = data?.currentStageName || data?.pipeline?.initialStage?.name || "N/A";
    const currentDefinition = stages.find(stage => stage.name === currentStage || getId(stage) === data?.currentStageId);
    const allowedNames = currentDefinition?.additional?.transitions;
    const stageOptions = stages.filter(stage => stage.name !== currentStage && (!allowedNames?.length || allowedNames.includes(stage.name || "")));
    const rejectedName = data?.pipeline?.rejectedStage?.name;

    const transitionStage = async () => {
        if (!id || !selectedStage) return;
        if (selectedStage === rejectedName && !lostReason.trim()) {
            showSnackbar({ title: "Validation Error", description: "Lost reason is required", color: "danger" }); return;
        }
        setSavingStage(true);
        try {
            await updateLeadStage(id, { currentStageName: selectedStage, ...(selectedStage === rejectedName ? { lostReason: lostReason.trim() } : {}) });
            setSelectedStage(""); setLostReason("");
            await load();
            showSnackbar({ title: "Success", description: "Lead stage updated", color: "success" });
        } catch (e: any) { showSnackbar({ title: "Error", description: e?.message || "Failed to update stage", color: "danger" }); }
        finally { setSavingStage(false); }
    };
    const createFollowUp = async () => {
        if (!id || !followUpForm.type.trim() || !followUpForm.dueAt) {
            showSnackbar({ title: "Validation Error", description: "Type and due date are required", color: "danger" }); return;
        }
        const assignedTo = getId(data?.salesExecutive);
        if (!assignedTo) { showSnackbar({ title: "Validation Error", description: "Assign a sales executive before creating a follow-up", color: "danger" }); return; }
        setSavingFollowUp(true);
        try {
            await addLeadFollowUp({ lead: id, assignedTo, type: followUpForm.type.trim(), dueAt: new Date(followUpForm.dueAt).toISOString(), notes: followUpForm.notes.trim(), status: "pending" });
            setFollowUpForm({ type: "call", dueAt: "", notes: "" }); await load();
            showSnackbar({ title: "Success", description: "Follow-up created", color: "success" });
        } catch (e: any) { showSnackbar({ title: "Error", description: e?.message || "Failed to create follow-up", color: "danger" }); }
        finally { setSavingFollowUp(false); }
    };
    const setFollowUpStatus = async (followUpId: string, status: "completed" | "cancelled") => {
        try { await updateLeadFollowUp(followUpId, { status }); await load(); showSnackbar({ title: "Success", description: `Follow-up ${status}`, color: "success" }); }
        catch (e: any) { showSnackbar({ title: "Error", description: e?.message || "Failed to update follow-up", color: "danger" }); }
    };

    return <DefaultLayout>
        <div className="mb-4 rounded-sm border border-secondary bg-primary p-2"><div className="flex flex-wrap items-center gap-1 text-sm text-tertiary"><button type="button" onClick={() => navigate("/dashboard")} className="rounded-sm px-1 py-0.5 text-primary hover:bg-primary_hover">Home</button><span>/</span><button type="button" onClick={() => navigate("/lead-management/leads")} className="rounded-sm px-1 py-0.5 text-primary hover:bg-primary_hover">Leads</button><span>/</span><span className="px-1 py-0.5 text-primary">View</span></div></div>
        <TableCard.Root>
            <TableCard.Header title="Lead Details" contentTrailing={<div className="flex w-full flex-col gap-2 md:w-auto md:flex-row"><Button color="secondary" iconLeading={ArrowLeft} onClick={() => navigate("/lead-management/leads")}>Back</Button><Button color="primary" iconLeading={Edit01} onClick={() => navigate(`/lead-management/leads/edit/${id}`)}>Edit</Button></div>} />
            <div className="space-y-7 bg-primary px-4 py-5 md:px-6">{loading ? <div className="grid animate-pulse grid-cols-1 gap-6 md:grid-cols-2">{Array.from({ length: 8 }).map((_, i) => <div key={i} className="h-12 rounded bg-secondary" />)}</div> : data ? <>
                <section><h2 className="mb-4 border-b border-secondary pb-2 text-sm font-semibold text-primary">Lead Information</h2><div className="grid grid-cols-1 gap-6 md:grid-cols-2"><InfoRow label="Lead Name">{data.title || "N/A"}</InfoRow><InfoRow label="Lead Number">{data.mobile || "N/A"}</InfoRow><InfoRow label="Email">{data.email || "N/A"}</InfoRow><InfoRow label="Description">{data.otherOptions || "N/A"}</InfoRow><InfoRow label="Created At">{formatDate(data.createdAt)}</InfoRow><InfoRow label="Updated At">{formatDate(data.updatedAt)}</InfoRow><InfoRow label="Status"><Badge size="sm" color={data.status === false || data.status === "false" ? "error" : "success"}>{data.status === false || data.status === "false" ? "Inactive" : "Active"}</Badge></InfoRow></div></section>
                <section><h2 className="mb-4 border-b border-secondary pb-2 text-sm font-semibold text-primary">Pipeline & Campaign</h2><div className="grid grid-cols-1 gap-6 md:grid-cols-2"><InfoRow label="Pipeline Name">{data.pipeline?.title || "N/A"}</InfoRow><InfoRow label="Current Stage">{currentStage}</InfoRow><InfoRow label="Campaign Name">{data.campaign?.title || "N/A"}</InfoRow><InfoRow label="Assigned User">{typeof data.salesExecutive === "object" ? data.salesExecutive?.name || "N/A" : "N/A"}</InfoRow></div>{stageOptions.length ? <div className="mt-5 grid grid-cols-1 items-end gap-3 md:grid-cols-3"><div className="flex flex-col gap-1.5"><Label>Move to stage</Label><Select aria-label="Move to stage" selectedKey={selectedStage || null} onChange={undefined} onSelectionChange={key => setSelectedStage(String(key))} items={stageOptions.map(stage => ({ id: stage.name!, label: stage.name! }))}>{item => <Select.Item id={item.id}>{item.label}</Select.Item>}</Select></div>{selectedStage === rejectedName ? <Input label="Lost reason *" value={lostReason} onChange={setLostReason} /> : <div />}<Button color="primary" isLoading={savingStage} onClick={transitionStage}>Update Stage</Button></div> : null}</section>
                <section><h2 className="mb-4 border-b border-secondary pb-2 text-sm font-semibold text-primary">Custom Contact Properties</h2><div className="grid grid-cols-1 gap-6 md:grid-cols-2">{Object.entries(data.customProperties || {}).filter(([key]) => definitions.some(item => item.key === key)).length ? Object.entries(data.customProperties || {}).filter(([key]) => definitions.some(item => item.key === key)).map(([key, value]) => <InfoRow key={key} label={definitions.find(item => item.key === key)?.label || key}>{typeof value === "boolean" ? (value ? "Yes" : "No") : String(value || "N/A")}</InfoRow>) : <p className="text-sm text-tertiary">No custom properties</p>}</div></section>
                <section><h2 className="mb-4 border-b border-secondary pb-2 text-sm font-semibold text-primary">Follow-ups</h2><div className="grid grid-cols-1 gap-3 md:grid-cols-3"><Input label="Type *" value={followUpForm.type} onChange={type => setFollowUpForm(p => ({ ...p, type }))}/><Input label="Due date *" type="datetime-local" value={followUpForm.dueAt} onChange={dueAt => setFollowUpForm(p => ({ ...p, dueAt }))}/><div className="flex items-end"><Button color="primary" isLoading={savingFollowUp} onClick={createFollowUp}>Add Follow-up</Button></div><div className="md:col-span-3"><TextArea label="Notes" rows={3} value={followUpForm.notes} onChange={notes => setFollowUpForm(p => ({ ...p, notes }))}/></div></div><div className="mt-5 space-y-3">{followUps.length ? followUps.map(item => <div key={item.id} className="flex flex-col justify-between gap-3 rounded-lg border border-secondary p-4 md:flex-row md:items-center"><div><div className="flex items-center gap-2"><span className="text-sm font-semibold text-primary">{item.type || "Follow-up"}</span><Badge size="sm" color={item.status === "completed" ? "success" : item.status === "cancelled" ? "error" : "warning"}>{item.status || "pending"}</Badge></div><p className="mt-1 text-xs text-tertiary">Due {formatDate(item.dueAt)}</p>{item.notes ? <p className="mt-1 text-sm text-secondary">{item.notes}</p> : null}</div>{item.status === "pending" ? <div className="flex gap-2"><Button size="sm" color="secondary" onClick={() => setFollowUpStatus(item.id, "cancelled")}>Cancel</Button><Button size="sm" color="primary" onClick={() => setFollowUpStatus(item.id, "completed")}>Complete</Button></div> : null}</div>) : <p className="text-sm text-tertiary">No follow-ups scheduled</p>}</div></section>
            </> : <div className="py-10 text-center text-sm text-tertiary">No data found</div>}</div>
        </TableCard.Root>
    </DefaultLayout>;
}
