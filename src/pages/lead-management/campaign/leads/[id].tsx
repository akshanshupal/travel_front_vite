import { DefaultLayout } from "@/layouts/DefaultLayout";
import { FloatingHeaderTable, TableCard } from "@/components/application/table/table";
import { CompactPagination } from "@/components/application/pagination/pagination";
import { Button } from "@/components/base/buttons/button";
import { CloseButton } from "@/components/base/buttons/close-button";
import { Input } from "@/components/base/input/input";
import { Label } from "@/components/base/input/label";
import { Select } from "@/components/base/select/select";
import { TextArea } from "@/components/base/textarea/textarea";
import { Badge } from "@/components/base/badges/badges";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { Dialog, Modal, ModalOverlay } from "@/components/application/modals/modal";
import { useStoreSnackbar } from "@/store/snackbar";
import {
    getLeads,
    getLeadsById,
    getLeadsDelete,
    getLeadLogs,
    updateLeadStage,
    updateLeadsById,
    bulkLeads,
} from "@/utils/services/leadsService";
import { getCampaign } from "@/utils/services/campaignService";
import { getDialCallLogs } from "@/utils/services/dialService";
import { getContactProperties } from "@/utils/services/contactPropertiesService";
import { CustomPropertiesFields, normalizeContactProperties, normalizeCustomPropertyPayload, type ContactPropertyDefinition } from "../../leads/custom-properties-fields";
import { ArrowLeft, Edit01, FileSearch01, SearchMd, Trash01 } from "@untitledui/icons";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";

type Stage = { id?: string; _id?: string; name?: string; additional?: { transitions?: string[] } };
type LeadItem = {
    id: string;
    title?: string;
    mobile?: string;
    email?: string;
    otherOptions?: string;
    priority?: string;
    status?: boolean | string;
    currentStageName?: string;
    leadStatus?: string;
    createdAt?: string;
    updatedAt?: string;
    nextFollowUpAt?: string;
    dueAt?: string;
    campaign?: { id?: string; name?: string; title?: string } | string;
    salesExecutive?: { id?: string; name?: string } | string;
    customProperties?: Record<string, any>;
};

type LeadLogItem = {
    id: string;
    action?: string;
    description?: string;
    changes?: Array<{ field?: string; oldValue?: string; newValue?: string }>;
    performedBy?: { id?: string; name?: string; email?: string } | string;
    createdAt?: string;
};

const LOG_ACTION_COLORS: Record<string, "success" | "warning" | "gray" | "error" | "blue"> = {
    created: "success",
    updated: "gray",
    "stage-changed": "blue",
    deleted: "error",
};


const asArray = (value: any) => (Array.isArray(value) ? value : []);
const getId = (value: any) => String(value?.id ?? value?._id ?? value ?? "").trim();
const dateLabel = (value?: string) => value ? new Date(value).toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "—";

export default function CampaignLeadsPage() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { showSnackbar } = useStoreSnackbar();

    const [items, setItems] = useState<LeadItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    // Edit popup state
    const [editTarget, setEditTarget] = useState<LeadItem | null>(null);
    const [definitions, setDefinitions] = useState<ContactPropertyDefinition[]>([]);
    const [editForm, setEditForm] = useState({ title: "", mobile: "", email: "", otherOptions: "", status: "true" });
    const [customProperties, setCustomProperties] = useState<Record<string, any>>({});
    const [editStages, setEditStages] = useState<Stage[]>([]);
    const [editCurrentStage, setEditCurrentStage] = useState("");
    const [selectedStage, setSelectedStage] = useState("");
    const [rejectedStageName, setRejectedStageName] = useState("");
    const [lostReason, setLostReason] = useState("");
    const [saving, setSaving] = useState(false);

    // Dispose history popup state
    const [disposeTarget, setDisposeTarget] = useState<LeadItem | null>(null);
    const [disposeLogs, setDisposeLogs] = useState<LeadLogItem[]>([]);
    const [disposeLoading, setDisposeLoading] = useState(false);

    // Delete popup state
    const [deleteTarget, setDeleteTarget] = useState<LeadItem | null>(null);
    const [deleting, setDeleting] = useState(false);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [bulkAction, setBulkAction] = useState<"update" | "delete" | "move" | "copy" | "close" | null>(null);
    const [bulkStatus, setBulkStatus] = useState("active");
    const [bulkStage, setBulkStage] = useState("");
    const [bulkOutcome, setBulkOutcome] = useState("converted");
    const [bulkReason, setBulkReason] = useState("");
    const [destinationCampaign, setDestinationCampaign] = useState("");
    const [campaigns, setCampaigns] = useState<any[]>([]);
    const [bulkSaving, setBulkSaving] = useState(false);
    const [expandedId, setExpandedId] = useState("");
    const [timeline, setTimeline] = useState<Record<string, LeadLogItem[]>>({});
    const [callLogsOpen, setCallLogsOpen] = useState(false);
    const [callLogs, setCallLogs] = useState<any[]>([]);
    const [callLogsLoading, setCallLogsLoading] = useState(false);

    const load = async () => {
        if (!id) return;
        setLoading(true);
        try {
            const response: any = await getLeads({
                campaign: id,
                populate: "salesExecutive",
                select_salesExecutive: "name",
                limit: "all",
            });
            const resolved = response?.data ?? response;
            const list = Array.isArray(resolved?.data) ? resolved.data : Array.isArray(resolved) ? resolved : asArray(resolved?.items);
            setItems(asArray(list).map((item: any) => ({ ...item, id: getId(item) })).filter((item: LeadItem) => item.id));
        } catch (e: any) {
            showSnackbar({ title: "Error", description: e?.message || "Failed to load leads", color: "danger" });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { load(); }, [id]);

    useEffect(() => {
        getCampaign({ limit: "all", status: true }).then((response: any) => {
            const resolved = response?.data ?? response;
            setCampaigns(asArray(Array.isArray(resolved?.data) ? resolved.data : resolved));
        }).catch(() => setCampaigns([]));
    }, []);

    const toggleExpanded = async (lead: LeadItem) => {
        if (expandedId === lead.id) { setExpandedId(""); return; }
        setExpandedId(lead.id);
        if (!timeline[lead.id]) {
            const response: any = await getLeadLogs({ lead: lead.id, limit: "all" });
            const resolved = response?.data ?? response;
            const list = Array.isArray(resolved?.data) ? resolved.data : Array.isArray(resolved) ? resolved : asArray(resolved?.items);
            setTimeline(prev => ({ ...prev, [lead.id]: list }));
        }
    };

    const openCallLogs = async () => {
        setCallLogsOpen(true); setCallLogsLoading(true);
        try {
            const response: any = await getDialCallLogs({ campaign: id, limit: "all" });
            const resolved = response?.data ?? response;
            setCallLogs(asArray(Array.isArray(resolved?.data) ? resolved.data : resolved));
        } catch (e: any) { showSnackbar({ title: "Error", description: e?.message || "Failed to load call logs", color: "danger" }); }
        finally { setCallLogsLoading(false); }
    };

    const submitBulk = async () => {
        if (!bulkAction || !selectedIds.length || bulkSaving) return;
        if (bulkAction === "delete" && !window.confirm(`Delete ${selectedIds.length} selected leads?`)) return;
        setBulkSaving(true);
        try {
            await bulkLeads({ leadIds: selectedIds, action: bulkAction, ...(bulkAction === "update" ? { status: bulkStatus, ...(bulkStage ? { currentStageName: bulkStage } : {}) } : {}), ...(bulkAction === "move" || bulkAction === "copy" ? { destinationCampaign } : {}), ...(bulkAction === "close" ? { status: bulkOutcome, ...(bulkOutcome === "lost" ? { lostReason: bulkReason } : {}) } : {}) });
            showSnackbar({ title: "Success", description: "Bulk action completed", color: "success" });
            setBulkAction(null); setSelectedIds([]); await load();
        } catch (e: any) { showSnackbar({ title: "Error", description: e?.message || "Bulk action failed", color: "danger" }); }
        finally { setBulkSaving(false); }
    };

    useEffect(() => {
        getContactProperties({ limit: "all" })
            .then(res => setDefinitions(normalizeContactProperties(res)))
            .catch(() => setDefinitions([]));
    }, []);

    const filtered = useMemo(() => {
        const query = search.trim().toLowerCase();
        if (!query) return items;
        return items.filter(item =>
            [item.title, item.mobile, item.email, item.currentStageName].some(value => String(value || "").toLowerCase().includes(query)),
        );
    }, [items, search]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / limit));
    const currentPage = Math.min(page, totalPages);
    const pageItems = filtered.slice((currentPage - 1) * limit, currentPage * limit);

    const openEdit = async (lead: LeadItem) => {
        setEditTarget(lead);
        setSelectedStage("");
        setLostReason("");
        setEditForm({ title: "", mobile: "", email: "", otherOptions: "", status: "true" });
        setCustomProperties({});
        setEditStages([]);
        setEditCurrentStage("");
        setRejectedStageName("");
        try {
            const response: any = await getLeadsById(lead.id, {
                populate: "pipeline,campaign,salesExecutive",
                select_pipeline: "title,initialStage,otherStages,convertedStage,rejectedStage",
            });
            const data = response?.data ?? response;
            setEditForm({
                title: data?.title || "",
                mobile: data?.mobile || "",
                email: data?.email || "",
                otherOptions: data?.otherOptions || "",
                status: data?.status === false || data?.status === "false" ? "false" : "true",
            });
            setCustomProperties(data?.customProperties && typeof data.customProperties === "object" ? data.customProperties : {});
            const pipeline = data?.pipeline && typeof data.pipeline === "object" ? data.pipeline : null;
            const stages = pipeline
                ? [pipeline.initialStage, ...asArray(pipeline.otherStages), pipeline.convertedStage, pipeline.rejectedStage].filter(stage => stage?.name) as Stage[]
                : [];
            setEditStages(stages);
            setEditCurrentStage(data?.currentStageName || pipeline?.initialStage?.name || "");
            setRejectedStageName(pipeline?.rejectedStage?.name || "");
        } catch (e: any) {
            showSnackbar({ title: "Error", description: e?.message || "Failed to load lead", color: "danger" });
        }
    };

    const handleSave = async () => {
        if (!editTarget?.id || saving) return;
        if (!editForm.title.trim()) {
            showSnackbar({ title: "Validation Error", description: "Name is required", color: "danger" });
            return;
        }
        if (selectedStage === rejectedStageName && !lostReason.trim()) {
            showSnackbar({ title: "Validation Error", description: "Lost reason is required", color: "danger" });
            return;
        }
        setSaving(true);
        try {
            await updateLeadsById(editTarget.id, {
                title: editForm.title.trim(),
                mobile: editForm.mobile.trim(),
                email: editForm.email.trim(),
                otherOptions: editForm.otherOptions,
                status: editForm.status === "true",
                customProperties: normalizeCustomPropertyPayload(definitions, customProperties),
            });
            if (selectedStage && selectedStage !== editCurrentStage) {
                await updateLeadStage(editTarget.id, {
                    currentStageName: selectedStage,
                    ...(selectedStage === rejectedStageName ? { lostReason: lostReason.trim() } : {}),
                });
            }
            showSnackbar({ title: "Success", description: "Lead updated successfully", color: "success" });
            setEditTarget(null);
            await load();
        } catch (e: any) {
            showSnackbar({ title: "Error", description: e?.message || "Failed to update lead", color: "danger" });
        } finally {
            setSaving(false);
        }
    };

    const openDisposeHistory = async (lead: LeadItem) => {
        setDisposeTarget(lead);
        setDisposeLogs([]);
        setDisposeLoading(true);
        try {
            const response: any = await getLeadLogs({ lead: lead.id, limit: "all" });
            const resolved = response?.data ?? response;
            const list = Array.isArray(resolved?.data) ? resolved.data : Array.isArray(resolved) ? resolved : asArray(resolved?.items);
            setDisposeLogs(asArray(list).map((item: any) => ({ ...item, id: getId(item) })).filter((item: LeadLogItem) => item.id));
        } catch (e: any) {
            showSnackbar({ title: "Error", description: e?.message || "Failed to load dispose history", color: "danger" });
        } finally {
            setDisposeLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!deleteTarget?.id || deleting) return;
        setDeleting(true);
        try {
            await getLeadsDelete(deleteTarget.id);
            showSnackbar({ title: "Deleted", description: "Lead deleted successfully", color: "success" });
            setDeleteTarget(null);
            await load();
        } catch (e: any) {
            showSnackbar({ title: "Error", description: e?.message || "Failed to delete lead", color: "danger" });
        } finally {
            setDeleting(false);
        }
    };

    const stageOptions = editStages.filter(stage => stage.name !== editCurrentStage);

    return (
        <DefaultLayout>
            <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-3">
                    <Button color="tertiary" iconLeading={ArrowLeft} onClick={() => navigate(`/lead-management/campaign/view/${id}`)} />
                    <h1 className="text-xl font-semibold text-primary">Lead Summary</h1>
                </div>
                <div className="flex flex-wrap items-center justify-end gap-2">
                    <Input aria-label="Search leads" placeholder="Search lead" icon={SearchMd} className="md:w-64" value={search} onChange={value => { setSearch(value); setPage(1); }} />
                    <Dropdown.Root>
                        <Button color="secondary" isDisabled={!selectedIds.length}>Bulk Actions</Button>
                        <Dropdown.Popover><Dropdown.Menu>
                            <Dropdown.Item onAction={() => setBulkAction("update")}>Update</Dropdown.Item>
                            <Dropdown.Item onAction={() => setBulkAction("delete")}>Delete</Dropdown.Item>
                            <Dropdown.Item onAction={() => setBulkAction("move")}>Move to Other Campaign</Dropdown.Item>
                            <Dropdown.Item onAction={() => setBulkAction("copy")}>Copy to Other Campaign</Dropdown.Item>
                            <Dropdown.Item onAction={() => setBulkAction("close")}>Close Leads</Dropdown.Item>
                        </Dropdown.Menu></Dropdown.Popover>
                    </Dropdown.Root>
                    <Button color="secondary" onClick={openCallLogs}>Call Logs</Button>
                </div>
            </div>

            <TableCard.Root>
                <TableCard.Header title={`Campaign Leads (${filtered.length})`} />
                <FloatingHeaderTable>
                    <table className="w-full min-w-[1000px] text-left text-sm">
                        <thead className="bg-secondary text-xs uppercase text-tertiary">
                            <tr>
                                <th className="sticky left-0 z-20 w-10 min-w-10 max-w-10 whitespace-nowrap bg-secondary px-2 py-3"><input aria-label="Select all leads" type="checkbox" checked={pageItems.length > 0 && pageItems.every(item => selectedIds.includes(item.id))} onChange={event => setSelectedIds(event.target.checked ? Array.from(new Set([...selectedIds, ...pageItems.map(item => item.id)])) : selectedIds.filter(value => !pageItems.some(item => item.id === value)))} /></th>
                                <th className="sticky left-10 z-20 w-14 min-w-14 max-w-14 whitespace-nowrap border-r border-secondary bg-secondary px-2 py-3 shadow-[4px_0_8px_-6px_rgba(0,0,0,0.35)]">No.</th><th className="bg-secondary px-4 py-3">Name</th><th className="bg-secondary px-4 py-3">Number</th><th className="bg-secondary px-4 py-3">Email</th><th className="bg-secondary px-4 py-3">Creation Date</th><th className="bg-secondary px-4 py-3">Updated at</th><th className="bg-secondary px-4 py-3">Lead Stage</th><th className="bg-secondary px-4 py-3">Tag</th><th className="bg-secondary px-4 py-3">User Assigned</th><th className="bg-secondary px-4 py-3">Follow-Up Time</th><th className="bg-secondary px-4 py-3">Lead Status</th><th className="sticky right-0 z-20 whitespace-nowrap border-l border-secondary bg-secondary px-4 py-3 text-right shadow-[-4px_0_8px_-6px_rgba(0,0,0,0.35)]">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-secondary">
                            {loading ? (
                                Array.from({ length: 6 }).map((_, i) => (
                                    <tr key={i}><td colSpan={9} className="px-4 py-4"><div className="h-4 animate-pulse rounded bg-secondary" /></td></tr>
                                ))
                            ) : pageItems.length ? pageItems.map((lead, index) => (
                                <>
                                    <tr key={lead.id} className="cursor-pointer hover:bg-secondary/40" onClick={() => toggleExpanded(lead)}>
                                        <td className="sticky left-0 z-10 w-10 min-w-10 max-w-10 whitespace-nowrap bg-primary px-2 py-3" onClick={event => event.stopPropagation()}><input aria-label={`Select ${lead.title || "lead"}`} type="checkbox" checked={selectedIds.includes(lead.id)} onChange={event => setSelectedIds(prev => event.target.checked ? [...prev, lead.id] : prev.filter(value => value !== lead.id))} /></td>
                                        <td className="sticky left-10 z-10 w-14 min-w-14 max-w-14 whitespace-nowrap border-r border-secondary bg-primary px-2 py-3 text-tertiary shadow-[4px_0_8px_-6px_rgba(0,0,0,0.35)]">{(currentPage - 1) * limit + index + 1}</td>
                                        <td className="px-4 py-3 font-medium text-primary">{lead.title || "—"}</td>
                                        <td className="px-4 py-3 text-tertiary">{lead.mobile || "—"}</td><td className="px-4 py-3 text-tertiary">{lead.email || "—"}</td>
                                        <td className="whitespace-nowrap px-4 py-3 text-tertiary">{dateLabel(lead.createdAt)}</td><td className="whitespace-nowrap px-4 py-3 text-tertiary">{dateLabel(lead.updatedAt)}</td>
                                        <td className="px-4 py-3"><Badge size="sm" color="blue">{lead.currentStageName || "—"}</Badge></td><td className="px-4 py-3 text-tertiary">{lead.priority || "—"}</td>
                                        <td className="px-4 py-3 text-tertiary">{typeof lead.salesExecutive === "object" && lead.salesExecutive !== null ? lead.salesExecutive.name || "—" : "—"}</td>
                                        <td className="whitespace-nowrap px-4 py-3 text-tertiary">{dateLabel(lead.nextFollowUpAt || lead.dueAt)}</td>
                                        <td className="px-4 py-3"><Badge size="sm" color={lead.status === false || lead.status === "false" ? "error" : "success"}>{lead.status === false || lead.status === "false" ? "Inactive" : "Active"}</Badge></td>
                                        <td className="sticky right-0 z-10 border-l border-secondary bg-primary px-4 py-3 shadow-[-4px_0_8px_-6px_rgba(0,0,0,0.35)]" onClick={event => event.stopPropagation()}><div className="flex items-center justify-end gap-1"><Button size="sm" color="secondary" iconLeading={Edit01} onClick={() => openEdit(lead)}>Edit</Button><Dropdown.Root><Dropdown.DotsButton className="size-8" /><Dropdown.Popover><Dropdown.Menu><Dropdown.Item icon={FileSearch01} onAction={() => openDisposeHistory(lead)}>Dispose History</Dropdown.Item><Dropdown.Item icon={Trash01} onAction={() => setDeleteTarget(lead)}>Delete</Dropdown.Item></Dropdown.Menu></Dropdown.Popover></Dropdown.Root></div></td>
                                    </tr>
                                    {expandedId === lead.id ? <tr key={`${lead.id}-details`}><td colSpan={13} className="bg-secondary/30 p-5"><div className="grid gap-6 md:grid-cols-2"><section><h3 className="mb-3 font-semibold text-primary">About Lead</h3><dl className="grid grid-cols-2 gap-3 text-sm"><div><dt className="text-tertiary">Remark</dt><dd>{lead.otherOptions || "—"}</dd></div><div><dt className="text-tertiary">Mobile</dt><dd>{lead.mobile || "—"}</dd></div><div><dt className="text-tertiary">Email</dt><dd>{lead.email || "—"}</dd></div><div><dt className="text-tertiary">Stage</dt><dd>{lead.currentStageName || "—"}</dd></div><div><dt className="text-tertiary">Status</dt><dd>{lead.leadStatus || (lead.status === false ? "Inactive" : "Active")}</dd></div><div><dt className="text-tertiary">Assigned user</dt><dd>{typeof lead.salesExecutive === "object" ? lead.salesExecutive?.name || "—" : "—"}</dd></div></dl>{lead.customProperties && Object.keys(lead.customProperties).length ? <div className="mt-3 text-sm text-tertiary">{Object.entries(lead.customProperties).map(([key, value]) => <p key={key}><span className="font-medium">{key}:</span> {String(value ?? "—")}</p>)}</div> : null}</section><section><h3 className="mb-3 font-semibold text-primary">Timeline</h3><div className="max-h-56 space-y-3 overflow-y-auto">{timeline[lead.id]?.length ? [...timeline[lead.id]].sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()).map(log => <div key={log.id} className="border-l-2 border-brand pl-3"><p className="text-sm text-primary">{log.description || log.action || "Update"}</p><p className="text-xs text-tertiary">{dateLabel(log.createdAt)}</p></div>) : <p className="text-sm text-tertiary">No timeline events</p>}</div></section></div></td></tr> : null}
                                </>
                            )) : (
                                <tr><td colSpan={9} className="px-4 py-10 text-center text-sm text-tertiary">No leads found in this campaign</td></tr>
                            )}
                        </tbody>
                    </table>
                </FloatingHeaderTable>
                <CompactPagination page={currentPage} limit={limit} itemCount={pageItems.length} totalCount={filtered.length} onPageChange={setPage} onLimitChange={value => { setLimit(value); setPage(1); }} />
            </TableCard.Root>

            {/* Edit lead popup */}
            <ModalOverlay isOpen={Boolean(editTarget)} isDismissable onOpenChange={open => { if (!open) setEditTarget(null); }}>
                {({ state }) => (
                    <Modal className="max-w-3xl">
                        <Dialog>
                            <div className="relative max-h-[85vh] w-full overflow-y-auto rounded-xl bg-primary p-5 ring-1 ring-secondary">
                                <CloseButton onPress={() => state.close()} className="absolute right-4 top-4" size="sm" />
                                <h2 className="mb-4 text-lg font-semibold text-primary">Edit Lead</h2>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <Input label="Name *" value={editForm.title} onChange={value => setEditForm(prev => ({ ...prev, title: value }))} />
                                    <Input label="Mobile Number" value={editForm.mobile} onChange={value => setEditForm(prev => ({ ...prev, mobile: value }))} />
                                    <Input label="Email" type="email" value={editForm.email} onChange={value => setEditForm(prev => ({ ...prev, email: value }))} />
                                    <div className="flex flex-col gap-1.5">
                                        <Label>Status</Label>
                                        <Select
                                            aria-label="Status"
                                            selectedKey={editForm.status}
                                            onChange={undefined}
                                            onSelectionChange={key => setEditForm(prev => ({ ...prev, status: String(key) }))}
                                            items={[{ id: "true", label: "Active" }, { id: "false", label: "Inactive" }]}
                                        >
                                            {item => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                        </Select>
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <Label>Current Stage</Label>
                                        <p className="rounded-lg bg-secondary px-3.5 py-2.5 text-sm text-primary">{editCurrentStage || "N/A"}</p>
                                    </div>
                                    {stageOptions.length ? (
                                        <div className="flex flex-col gap-1.5">
                                            <Label>Move to Stage</Label>
                                            <Select
                                                aria-label="Move to stage"
                                                selectedKey={selectedStage || null}
                                                onChange={undefined}
                                                onSelectionChange={key => setSelectedStage(String(key))}
                                                items={stageOptions.map(stage => ({ id: stage.name!, label: stage.name! }))}
                                            >
                                                {item => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                            </Select>
                                        </div>
                                    ) : null}
                                    {selectedStage === rejectedStageName ? (
                                        <Input label="Lost Reason *" value={lostReason} onChange={setLostReason} />
                                    ) : null}
                                    <div className="md:col-span-2">
                                        <TextArea label="Description" rows={3} value={editForm.otherOptions} onChange={value => setEditForm(prev => ({ ...prev, otherOptions: value }))} />
                                    </div>
                                    <div className="md:col-span-2">
                                        <CustomPropertiesFields
                                            definitions={definitions}
                                            values={customProperties}
                                            onChange={(key, value) => setCustomProperties(prev => ({ ...prev, [key]: value }))}
                                        />
                                    </div>
                                </div>
                                <div className="mt-5 flex justify-end gap-2">
                                    <Button color="secondary" onClick={() => state.close()}>Cancel</Button>
                                    <Button color="primary" isLoading={saving} onClick={handleSave}>Save</Button>
                                </div>
                            </div>
                        </Dialog>
                    </Modal>
                )}
            </ModalOverlay>

            {/* Dispose history popup */}
            <ModalOverlay isOpen={Boolean(disposeTarget)} isDismissable onOpenChange={open => { if (!open) setDisposeTarget(null); }}>
                {({ state }) => (
                    <Modal className="max-w-4xl">
                        <Dialog>
                            <div className="relative max-h-[80vh] w-full overflow-hidden rounded-xl bg-primary ring-1 ring-secondary">
                                <CloseButton onPress={() => state.close()} className="absolute right-4 top-4" size="sm" />
                                <div className="border-b border-secondary px-5 py-4">
                                    <h2 className="text-lg font-semibold text-primary">Dispose History</h2>
                                    <p className="mt-0.5 text-sm text-tertiary">{disposeTarget?.title || "Lead"} — lead change history</p>
                                </div>
                                <div className="max-h-[60vh] overflow-y-auto">
                                    {disposeLoading ? (
                                        <div className="space-y-2 p-5">
                                            {Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-10 animate-pulse rounded-lg bg-secondary" />)}
                                        </div>
                                    ) : disposeLogs.length ? (
                                        <table className="w-full text-left text-sm">
                                            <thead className="sticky top-0 bg-secondary text-xs uppercase text-tertiary">
                                                <tr>
                                                    <th className="px-4 py-3">Date &amp; Time</th>
                                                    <th className="px-4 py-3">Action</th>
                                                    <th className="px-4 py-3">Details</th>
                                                    <th className="px-4 py-3">Changed by</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-secondary">
                                                {disposeLogs.map(log => {
                                                    const action = String(log.action || "").toLowerCase();
                                                    const performedBy = typeof log.performedBy === "object" && log.performedBy !== null
                                                        ? log.performedBy.name || log.performedBy.email || "—"
                                                        : String(log.performedBy || "—");
                                                    return (
                                                        <tr key={log.id} className="align-top">
                                                            <td className="whitespace-nowrap px-4 py-3 text-tertiary">{dateLabel(log.createdAt)}</td>
                                                            <td className="whitespace-nowrap px-4 py-3">
                                                                <Badge size="sm" color={LOG_ACTION_COLORS[action] || "gray"}>{action || "—"}</Badge>
                                                            </td>
                                                            <td className="px-4 py-3">
                                                                <p className="text-primary">{log.description || "—"}</p>
                                                                {(log.changes?.length || 0) > 0 && (
                                                                    <div className="mt-1.5 space-y-1">
                                                                        {log.changes!.map((change, index) => (
                                                                            <div key={`${log.id}-${index}`} className="flex flex-wrap items-center gap-1.5 text-xs text-tertiary">
                                                                                <span className="font-semibold text-secondary">{change?.field || "field"}</span>
                                                                                <span>:</span>
                                                                                <span className="max-w-48 truncate" title={String(change?.oldValue ?? "")}>{String(change?.oldValue ?? "—")}</span>
                                                                                <span>→</span>
                                                                                <span className="max-w-48 truncate" title={String(change?.newValue ?? "")}>{String(change?.newValue ?? "—")}</span>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                )}
                                                            </td>
                                                            <td className="whitespace-nowrap px-4 py-3 text-tertiary">{performedBy}</td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    ) : (
                                        <div className="p-10 text-center text-sm text-tertiary">No change history recorded for this lead</div>
                                    )}
                                </div>
                            </div>
                        </Dialog>
                    </Modal>
                )}
            </ModalOverlay>

            <ModalOverlay isOpen={Boolean(bulkAction)} isDismissable onOpenChange={open => { if (!open) setBulkAction(null); }}>
                {({ state }) => <Modal className="max-w-lg"><Dialog><div className="w-full rounded-xl bg-primary p-5 ring-1 ring-secondary"><CloseButton onPress={() => state.close()} className="absolute right-4 top-4" size="sm" /><h2 className="text-lg font-semibold text-primary">Bulk {bulkAction}</h2><p className="mt-1 text-sm text-tertiary">{selectedIds.length} leads selected</p>{bulkAction === "update" ? <div className="mt-4 grid gap-4"><div><Label>Status</Label><Select aria-label="Bulk status" selectedKey={bulkStatus} onChange={undefined} onSelectionChange={key => setBulkStatus(String(key))} items={[{ id: "active", label: "Active" }, { id: "inactive", label: "Inactive" }]}>{item => <Select.Item id={item.id}>{item.label}</Select.Item>}</Select></div><Input label="Move to Stage (optional)" value={bulkStage} onChange={setBulkStage} /></div> : null}{bulkAction === "move" || bulkAction === "copy" ? <div className="mt-4"><Label>Destination Campaign</Label><Select aria-label="Destination campaign" selectedKey={destinationCampaign || null} onChange={undefined} onSelectionChange={key => setDestinationCampaign(String(key))} items={campaigns.filter(c => getId(c) !== id).map(c => ({ id: getId(c), label: c.title || c.name || getId(c) }))}>{item => <Select.Item id={item.id}>{item.label}</Select.Item>}</Select></div> : null}{bulkAction === "close" ? <div className="mt-4 grid gap-4"><div><Label>Outcome</Label><Select aria-label="Close outcome" selectedKey={bulkOutcome} onChange={undefined} onSelectionChange={key => setBulkOutcome(String(key))} items={[{ id: "converted", label: "Converted" }, { id: "lost", label: "Lost" }]}>{item => <Select.Item id={item.id}>{item.label}</Select.Item>}</Select></div>{bulkOutcome === "lost" ? <Input label="Lost Reason *" value={bulkReason} onChange={setBulkReason} /> : null}</div> : null}<div className="mt-5 flex justify-end gap-2"><Button color="secondary" onClick={() => state.close()}>Cancel</Button><Button color="primary" isLoading={bulkSaving} isDisabled={((bulkAction === "move" || bulkAction === "copy") && !destinationCampaign) || (bulkAction === "close" && bulkOutcome === "lost" && !bulkReason.trim())} onClick={submitBulk}>Apply</Button></div></div></Dialog></Modal>}
            </ModalOverlay>

            <ModalOverlay isOpen={callLogsOpen} isDismissable onOpenChange={open => { if (!open) setCallLogsOpen(false); }}>
                {({ state }) => <Modal className="max-w-5xl"><Dialog><div className="relative max-h-[80vh] w-full overflow-auto rounded-xl bg-primary p-5 ring-1 ring-secondary"><CloseButton onPress={() => state.close()} className="absolute right-4 top-4" size="sm" /><h2 className="mb-4 text-lg font-semibold text-primary">Campaign Call Logs</h2>{callLogsLoading ? <p className="text-sm text-tertiary">Loading…</p> : <table className="w-full min-w-[800px] text-left text-sm"><thead className="bg-secondary text-xs uppercase text-tertiary"><tr>{["Lead", "Date", "Outcome", "Disposition", "Connected", "Duration", "Notes"].map((label, labelIndex) => <th key={label} className={labelIndex === 0 ? "sticky left-0 top-0 z-20 bg-secondary px-3 py-2 shadow-[4px_0_8px_-6px_rgba(0,0,0,0.35)]" : "sticky top-0 z-20 bg-secondary px-3 py-2"}>{label}</th>)}</tr></thead><tbody className="divide-y divide-secondary">{callLogs.map((log, index) => { const lead = items.find(item => item.id === getId(log.lead)); return <tr key={getId(log) || index}><td className="sticky left-0 z-10 bg-primary px-3 py-2 shadow-[4px_0_8px_-6px_rgba(0,0,0,0.35)]">{lead?.title || log.lead?.title || getId(log.lead) || "—"}</td><td className="px-3 py-2">{dateLabel(log.createdAt || log.date)}</td><td className="px-3 py-2">{log.outcome || "—"}</td><td className="px-3 py-2">{log.disposition || "—"}</td><td className="px-3 py-2">{String(log.connected ?? "—")}</td><td className="px-3 py-2">{log.duration || "—"}</td><td className="px-3 py-2">{log.notes || "—"}</td></tr>; })}</tbody></table>}</div></Dialog></Modal>}
            </ModalOverlay>

            {/* Delete lead confirm popup */}
            <ModalOverlay isOpen={Boolean(deleteTarget)} isDismissable onOpenChange={open => { if (!open) setDeleteTarget(null); }}>
                {({ state }) => (
                    <Modal className="max-w-lg">
                        <Dialog>
                            <div className="relative w-full rounded-xl bg-primary p-5 ring-1 ring-secondary">
                                <CloseButton onPress={() => state.close()} className="absolute right-4 top-4" size="sm" />
                                <div className="space-y-1">
                                    <h2 className="text-lg font-semibold text-primary">Delete Lead</h2>
                                    <p className="text-sm text-tertiary">
                                        {deleteTarget?.title ? `Delete "${deleteTarget.title}"?` : "Delete this lead?"}
                                        {" "}This action cannot be undone.
                                    </p>
                                </div>
                                <div className="mt-5 flex justify-end gap-2">
                                    <Button color="secondary" onClick={() => state.close()}>Cancel</Button>
                                    <Button color="primary-destructive" isLoading={deleting} onClick={handleDelete}>Delete</Button>
                                </div>
                            </div>
                        </Dialog>
                    </Modal>
                )}
            </ModalOverlay>
        </DefaultLayout>
    );
}
