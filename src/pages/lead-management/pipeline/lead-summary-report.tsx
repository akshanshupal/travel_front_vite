import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useParams } from "react-router";
import { Button } from "@/components/base/buttons/button";
import ContactViewPage from "@/pages/lead-management/contacts/view";
import { getPipelineById } from "@/utils/services/pipelineService";
import { getCampaign } from "@/utils/services/campaignService";
import { getUser } from "@/utils/services/userService";
import { getContactProperties } from "@/utils/services/contactPropertiesService";
import { getCustomColumns } from "@/utils/services/customColumnsService";
import { bulkLeads } from "@/utils/services/leadsService";
import { getDialCallLogs } from "@/utils/services/dialService";
import { useStoreSnackbar } from "@/store/snackbar";
import { ChevronDown, Edit01, FilterLines, Trash01 } from "@untitledui/icons";

const list = (response: any): any[] => { const data = response?.data ?? response; return Array.isArray(data) ? data : data?.data || data?.items || []; };
const idOf = (value: any) => String(value?.id ?? value?._id ?? value ?? "");
const tabs = ["Saved Filters", "Lead Details", "Campaign", "Users", "Status", "Stages", "Tags", "Latest Disposition", "Creation Date", "Assignment Date", "Contact Source"];
const presets = ["Today", "Yesterday", "Last 7 days", "Last 30 days", "This Month", "Custom Range"];
const control = "min-h-9 rounded-lg border border-secondary bg-primary px-3 py-1.5 text-sm text-primary";
type Filter = Record<string, any>;
type ReportColumn = { key: string; label: string; propertyKey?: string };

const FIXED_REPORT_COLUMNS: Record<string, ReportColumn> = {
    Status: { key: "Status", label: "Status" },
    "Deal Amount": { key: "Deal Amount", label: "Deal Amount" },
    "Last Call Date": { key: "Last Call Date", label: "Last Call Date" },
    "Total Disposition Count": { key: "Total Disposition Count", label: "Total Disposition Count" },
    "Call Attempt Count": { key: "Call Attempt Count", label: "Call Attempt Count" },
};

export default function LeadSummaryReport() {
    const { id = "" } = useParams();
    const { showSnackbar } = useStoreSnackbar();
    const [pipeline, setPipeline] = useState<any>(null);
    const [campaigns, setCampaigns] = useState<any[]>([]);
    const [users, setUsers] = useState<any[]>([]);
    const [properties, setProperties] = useState<any[]>([]);
    const [managedColumns, setManagedColumns] = useState<ReportColumn[]>([]);
    const [applied, setApplied] = useState<Filter>({});
    const [draft, setDraft] = useState<Filter>({});
    const [popup, setPopup] = useState("");
    const [tab, setTab] = useState("Lead Details");
    const [query, setQuery] = useState("");
    const [number, setNumber] = useState("");
    const [preset, setPreset] = useState("Today");
    const [saved, setSaved] = useState<{ name: string; filters: Filter }[]>([]);
    const [saveName, setSaveName] = useState("");
    const [busy, setBusy] = useState(false);
    const [callLogs, setCallLogs] = useState<any[]>([]);
    const [bulkIds, setBulkIds] = useState<string[]>([]);
    const [bulkRefresh, setBulkRefresh] = useState<(() => void) | null>(null);
    const [bulkMenuOpen, setBulkMenuOpen] = useState(false);
    const [bulkDialog, setBulkDialog] = useState<"update" | "delete" | "">("");
    const [bulkStage, setBulkStage] = useState("");
    const [bulkAssignee, setBulkAssignee] = useState("");
    const [bulkFollowUp, setBulkFollowUp] = useState("");
    const [deleteText, setDeleteText] = useState("");
    useEffect(() => {
        let cancelled = false;
        setApplied({}); setNumber("");
        Promise.all([getPipelineById(id), getCampaign({ pipeline: id, limit: "all" }), getUser({ limit: "all" }), getContactProperties({ limit: "all" }), getCustomColumns()]).then(([p, c, u, d, columnsResponse]) => {
            if (cancelled) return;
            const activeProperties = list(d).filter(item => item.status !== false && item.status !== "false" && !item.isDeleted);
            const propertyById = new Map(activeProperties.map(property => [idOf(property), property]));
            const savedColumns = columnsResponse?.value || {};
            const enabled = savedColumns?.enabled && typeof savedColumns.enabled === "object" ? savedColumns.enabled : { Status: true };
            const order: string[] = Array.isArray(savedColumns?.order) ? savedColumns.order : ["Status"];
            setPipeline(p?.data ?? p); setCampaigns(list(c)); setUsers(list(u));
            setProperties(activeProperties);
            setManagedColumns(order.filter(key => enabled[key]).flatMap(key => {
                const fixed = FIXED_REPORT_COLUMNS[key];
                if (fixed) return [fixed];
                if (!key.startsWith("cp:")) return [];
                const property = propertyById.get(key.slice(3));
                return property ? [{ key, label: String(property.label || property.title || property.key || "—"), propertyKey: String(property.key || idOf(property)) }] : [];
            }));
        }).catch(() => showSnackbar({ title: "Error", description: "Failed to load report filters.", color: "danger" }));
        return () => { cancelled = true; };
    }, [id, showSnackbar]);
    useEffect(() => {
        const timer = window.setTimeout(() => setApplied(current => ({ ...current, mobileLike: number.trim() })), 350);
        return () => window.clearTimeout(timer);
    }, [number]);
    useEffect(() => {
        if (!popup) return;
        const close = (event: KeyboardEvent) => { if (event.key === "Escape") setPopup(""); };
        window.addEventListener("keydown", close);
        return () => window.removeEventListener("keydown", close);
    }, [popup]);
    const stages = useMemo(() => [pipeline?.initialStage, ...(pipeline?.otherStages || []), pipeline?.convertedStage, pipeline?.rejectedStage].filter(stage => stage?.name), [pipeline]);
    const open = (name: string) => { setDraft({ ...applied }); setQuery(""); setPopup(name); setTab(name === "Date" ? "Creation Date" : name === "Stage" ? "Stages" : name === "Filters" ? "Lead Details" : name); };
    const set = (key: string, value: any) => setDraft(current => ({ ...current, [key]: value }));
    const options: Record<string, { key: string; values: { id: string; label: string }[] }> = {
        Campaign: { key: "campaignIn", values: campaigns.map(item => ({ id: idOf(item), label: item.title || idOf(item) })) },
        Users: { key: "userIn", values: users.map(item => ({ id: idOf(item), label: item.name || item.email || idOf(item) })) },
        Stages: { key: "stageIn", values: [{ id: "__none__", label: "NO STAGE" }, ...stages.map(item => ({ id: item.name, label: item.name }))] },
        Status: { key: "statusIn", values: ["open", "converted", "lost"].map(value => ({ id: value, label: value })) },
        Tags: { key: "tagIn", values: Array.from(new Set(stages.flatMap(stage => stage.tags || []))).map(value => ({ id: String(value), label: String(value) })) },
        "Contact Source": { key: "sourceIn", values: ["FILE_UPLOAD", "WALK_IN_LEAD", "INCOMING_IVR", "WORKFLOW", "GOOGLE_SHEET", "WHATSAPP", "WEB_FORM", "MANUAL", "API"].map(value => ({ id: value, label: value })) },
    };
    const applyDate = () => {
        if (preset === "Custom Range") return;
        const end = new Date(); const start = new Date();
        if (preset === "Yesterday") { start.setDate(start.getDate() - 1); end.setDate(end.getDate() - 1); }
        if (preset === "Last 7 days") start.setDate(start.getDate() - 6);
        if (preset === "Last 30 days") start.setDate(start.getDate() - 29);
        if (preset === "This Month") start.setDate(1);
        const day = (date: Date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
        return { createdFrom: day(start), createdTo: day(end) };
    };
    const apply = () => {
        const dates = tab === "Creation Date" ? applyDate() : undefined;
        const next: Filter = { ...draft, ...dates };
        if (next.createdFrom && next.createdTo && next.createdFrom > next.createdTo) { showSnackbar({ title: "Invalid date range", description: "End date must be after start date.", color: "warning" }); return; }
        setApplied(next); setNumber(next.mobileLike || ""); setPopup("");
    };
    const renderContent = () => {
        const option = options[tab];
        if (option) {
            const selected: string[] = String(draft[option.key] || "").split(",").filter(Boolean);
            const visible = option.values.filter(item => item.label.toLowerCase().includes(query.toLowerCase()));
            return <div className="space-y-1.5"><input aria-label={`Search ${tab}`} placeholder={`Search ${tab.toLowerCase()}`} className={`${control} mb-2 w-full`} value={query} onChange={event => setQuery(event.target.value)}/><label className="flex min-h-9 items-center gap-2 text-sm"><input type="checkbox" checked={visible.length > 0 && visible.every(item => selected.includes(item.id))} onChange={event => set(option.key, (event.target.checked ? Array.from(new Set([...selected, ...visible.map(item => item.id)])) : selected.filter(value => !visible.some(item => item.id === value))).join(","))}/>Select all</label>{visible.map(item => <label key={item.id} className="flex min-h-9 items-center gap-2 text-sm"><input type="checkbox" checked={selected.includes(item.id)} onChange={() => set(option.key, (selected.includes(item.id) ? selected.filter(value => value !== item.id) : [...selected, item.id]).join(","))}/>{item.label}</label>)}{!visible.length && <p className="text-sm text-tertiary">No options found.</p>}</div>;
        }
        if (tab === "Creation Date") return <div className="space-y-1.5">{presets.map(value => <label key={value} className="flex min-h-9 items-center gap-2 text-sm"><input type="radio" name="date-preset" checked={preset === value} onChange={() => setPreset(value)}/>{value}</label>)}{preset === "Custom Range" && <div className="grid gap-2 pt-2 sm:grid-cols-2"><label className="text-xs font-medium">From<input type="date" className={`${control} mt-1 block w-full`} value={draft.createdFrom || ""} onChange={event => set("createdFrom", event.target.value)}/></label><label className="text-xs font-medium">To<input type="date" className={`${control} mt-1 block w-full`} value={draft.createdTo || ""} onChange={event => set("createdTo", event.target.value)}/></label></div>}</div>;
        if (tab === "Saved Filters") return <div className="space-y-3"><p className="text-sm text-secondary">Saved for this report session.</p><input className={`${control} w-full`} aria-label="Filter name" placeholder="Filter name" value={saveName} onChange={event => setSaveName(event.target.value)}/><Button color="secondary" isDisabled={!saveName.trim()} onClick={() => { setSaved(current => [...current, { name: saveName.trim(), filters: { ...draft } }]); setSaveName(""); }}>Save current filters</Button>{saved.map((item, index) => <button key={index} className={`${control} block w-full text-left`} onClick={() => setDraft({ ...item.filters })}>{item.name}</button>)}</div>;
        if (tab === "Latest Disposition") return <label className="space-y-2 text-sm">Latest call disposition<input className={`${control} block w-full`} value={draft.latestDisposition || ""} onChange={event => set("latestDisposition", event.target.value)}/><p className="text-tertiary">Matches the latest stored call disposition or outcome.</p></label>;
        if (tab === "Assignment Date") return <p className="text-sm text-secondary">An assignment timestamp is not stored on leads. No assignment date filter is available.</p>;
        let values: Record<string, any> = {};
        try { values = JSON.parse(draft.customProps || "{}"); } catch { /* draft starts empty */ }
        const propertyValue = (key: string, value: any) => set("customProps", JSON.stringify({ ...values, [key]: value }));
        return <div className="space-y-6"><section><h3 className="mb-3 font-semibold">Basic Details</h3><div className="grid gap-4 sm:grid-cols-2">{[["Name", "titleLike"], ["Number", "mobileLike"], ["Email", "emailLike"]].map(([label, key]) => <label key={key} className="space-y-1 text-sm">{label}<input className={`${control} block w-full`} value={draft[key] || ""} onChange={event => set(key, event.target.value)}/></label>)}</div></section><section><h3 className="mb-3 font-semibold">Custom Contact Properties</h3><div className="grid gap-4 sm:grid-cols-2">{properties.map(property => { const type = property.fieldType || "text"; const value = values[property.key] ?? ""; return <label key={property.key} className="space-y-1 text-sm">{property.label || property.title || property.key}{["boolean", "select", "multiSelect"].includes(type) ? <select className={`${control} block w-full`} multiple={type === "multiSelect"} value={value} onChange={event => propertyValue(property.key, type === "multiSelect" ? Array.from(event.target.selectedOptions).map(item => item.value) : event.target.value)}>{type !== "multiSelect" && <option value="">Any</option>}{(type === "boolean" ? ["true", "false"] : property.options || []).map((item: any) => <option key={String(item)} value={String(item)}>{type === "boolean" ? item === "true" ? "Yes" : "No" : String(item)}</option>)}</select> : <input className={`${control} block w-full`} type={type === "phone" ? "tel" : ["number", "date", "email", "url"].includes(type) ? type : "text"} value={value} onChange={event => propertyValue(property.key, event.target.value)}/>}</label>; })}</div></section></div>;
    };
    const openBulkDialog = (mode: "update" | "delete", ids: string[], refresh: () => void) => {
        setBulkIds(ids);
        setBulkRefresh(() => refresh);
        setBulkMenuOpen(false);
        setBulkDialog(mode);
        setBulkStage("");
        setBulkAssignee("");
        setBulkFollowUp("");
        setDeleteText("");
    };
    const submitBulk = async () => {
        if (!bulkIds.length || !bulkDialog) return;
        const payload: Record<string, any> = { action: bulkDialog, leadIds: bulkIds };
        if (bulkDialog === "update") {
            if (!bulkStage && !bulkAssignee && !bulkFollowUp) return;
            if (bulkStage) payload.currentStageName = bulkStage;
            if (bulkAssignee) payload.assignedTo = bulkAssignee;
            if (bulkFollowUp) payload.followUpAt = new Date(bulkFollowUp).toISOString();
        } else if (deleteText !== "DELETE") return;
        setBusy(true);
        try {
            const response: any = await bulkLeads(payload);
            const result = response?.data ?? response;
            if (result?.failed?.length) throw new Error(`${result.failed.length} selected lead(s) could not be processed`);
            bulkRefresh?.();
            setBulkDialog("");
            showSnackbar({ title: "Bulk action completed", description: `${bulkIds.length} selected lead(s) processed.`, color: "success" });
        } catch (error) {
            showSnackbar({ title: "Bulk action failed", description: error instanceof Error ? error.message : "Please try again.", color: "danger" });
        } finally { setBusy(false); }
    };
    const openCalls = async () => {
        setPopup("Call Logs"); setBusy(true); setCallLogs([]);
        try { const response = await getDialCallLogs({ pipeline: id, limit: "50" }); setCallLogs(list(response)); }
        catch { showSnackbar({ title: "Error", description: "Could not load call logs.", color: "danger" }); }
        finally { setBusy(false); }
    };
    const dropdownNames = ["Date", "Users", "Stage", "Campaign"];

    return <>
        <ContactViewPage report={{
            pipeline: id,
            title: pipeline?.title || "Loading…",
            params: applied,
            managedColumns,
            toolbar: <>
                <div className="flex flex-wrap gap-2">
                    {dropdownNames.map(name => (
                        <div key={name} className="relative">
                            <Button
                                color="secondary"
                                size="sm"
                                className="h-9"
                                iconTrailing={<ChevronDown className={`size-4 transition-transform ${popup === name ? "rotate-180" : ""}`} />}
                                onClick={() => popup === name ? setPopup("") : open(name)}
                            >
                                {name}
                            </Button>
                            {popup === name && <>
                                <button type="button" aria-label="Close dropdown" className="fixed inset-0 z-40 cursor-default" onClick={() => setPopup("")} />
                                <section className="absolute left-0 top-full z-50 mt-1.5 flex max-h-96 w-80 max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-lg border border-secondary bg-primary text-primary shadow-lg">
                                    <header className="border-b border-secondary px-4 py-3">
                                        <h2 className="text-base font-semibold text-brand-secondary">Choose {name === "Date" ? "Creation Date" : name}</h2>
                                    </header>
                                    <div className="min-h-0 flex-1 overflow-auto p-3">{renderContent()}</div>
                                    <footer className="flex justify-end border-t border-secondary p-3">
                                        <Button size="sm" onClick={apply}>Update</Button>
                                    </footer>
                                </section>
                            </>}
                        </div>
                    ))}
                    <Button color="secondary" size="sm" className="h-9" iconLeading={FilterLines} onClick={() => open("Filters")}>Filters</Button>
                </div>
                <input aria-label="Search by number" placeholder="Search by number" className={`${control} ml-auto`} value={number} onChange={event => setNumber(event.target.value)}/>
            </>,
            actions: (ids, refresh) => <>
                <div className="relative">
                    <Button color="secondary" size="sm" isDisabled={!ids.length || busy} iconLeading={Edit01} iconTrailing={ChevronDown} onClick={() => { setBulkIds(ids); setBulkRefresh(() => refresh); setBulkMenuOpen(value => !value); }}>Bulk Actions ({ids.length})</Button>
                    {bulkMenuOpen && <>
                        <button type="button" aria-label="Close bulk actions" className="fixed inset-0 z-40 cursor-default" onClick={() => setBulkMenuOpen(false)}/>
                        <div className="absolute right-0 top-full z-50 mt-1.5 w-56 overflow-hidden rounded-lg border border-secondary bg-primary p-2 shadow-lg">
                            <p className="px-3 py-2 text-sm font-semibold text-brand-secondary">Choose Bulk Action</p>
                            <button type="button" className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm hover:bg-secondary" onClick={() => openBulkDialog("update", ids, refresh)}><Edit01 className="size-4"/>Update</button>
                            <button type="button" className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm text-error-primary hover:bg-error-secondary" onClick={() => openBulkDialog("delete", ids, refresh)}><Trash01 className="size-4"/>Delete</button>
                        </div>
                    </>}
                </div>
                <Button color="secondary" size="sm" onClick={openCalls}>Call Logs</Button>
            </>,
        }}/>
        {bulkDialog && createPortal(<div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/40 p-4" onClick={() => !busy && setBulkDialog("")}><section role="dialog" aria-modal="true" aria-label={bulkDialog === "update" ? "Update leads" : "Delete leads"} className="w-full max-w-xl rounded-xl border border-secondary bg-primary text-primary shadow-xl" onClick={event => event.stopPropagation()}><header className="border-b border-secondary px-5 py-4"><h2 className="text-lg font-semibold text-brand-secondary">{bulkDialog === "update" ? "Update Lead" : "Delete Leads"}</h2><p className="mt-1 text-sm text-tertiary">{bulkIds.length} lead(s) selected</p></header>{bulkDialog === "update" ? <div className="space-y-4 p-5"><label className="block space-y-1.5 text-sm font-medium">Lead Stage<select className={`${control} block w-full`} value={bulkStage} onChange={event => setBulkStage(event.target.value)}><option value="">No change</option>{stages.map(stage => <option key={stage.name} value={stage.name}>{stage.name}</option>)}</select></label><label className="block space-y-1.5 text-sm font-medium">Assign To<select className={`${control} block w-full`} value={bulkAssignee} onChange={event => setBulkAssignee(event.target.value)}><option value="">No change</option>{users.map(user => <option key={idOf(user)} value={idOf(user)}>{user.name || user.email || idOf(user)}</option>)}</select></label><label className="block space-y-1.5 text-sm font-medium">Next Follow Up Date<input type="datetime-local" className={`${control} block w-full`} value={bulkFollowUp} onChange={event => setBulkFollowUp(event.target.value)}/></label></div> : <div className="space-y-3 p-5"><p className="text-sm text-secondary">This permanently deletes the selected leads. Type <strong>DELETE</strong> to confirm.</p><input autoFocus className={`${control} block w-full`} aria-label="Type DELETE to confirm" placeholder="DELETE" value={deleteText} onChange={event => setDeleteText(event.target.value)}/></div>}<footer className="flex justify-end gap-3 border-t border-secondary p-4"><Button color="secondary" isDisabled={busy} onClick={() => setBulkDialog("")}>Cancel</Button><Button color={bulkDialog === "delete" ? "primary-destructive" : "primary"} isDisabled={busy || (bulkDialog === "delete" ? deleteText !== "DELETE" : !bulkStage && !bulkAssignee && !bulkFollowUp)} onClick={submitBulk}>{busy ? "Processing…" : bulkDialog === "delete" ? "Delete Leads" : "Update"}</Button></footer></section></div>, document.body)}
        {(popup === "Filters" || popup === "Call Logs") && createPortal(<div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4" onClick={() => setPopup("")}><section role="dialog" aria-modal="true" aria-label={popup === "Filters" ? "Search & Filter" : popup} className={`flex max-h-[85vh] w-full flex-col rounded-xl border border-secondary bg-primary text-primary shadow-xl ${popup === "Filters" ? "max-w-5xl" : "max-w-md"}`} onClick={event => event.stopPropagation()}><header className="flex items-center justify-between border-b border-secondary p-5"><h2 className="text-lg font-semibold">{popup === "Filters" ? "Search & Filter" : popup}</h2><button aria-label="Close" className={control} onClick={() => setPopup("")}>×</button></header>{popup === "Call Logs" ? <div className="overflow-auto p-5">{busy ? "Loading…" : callLogs.length ? callLogs.map(log => <div key={idOf(log)} className="border-b border-secondary py-3 text-sm">{log.number || log.mobile || log.lead?.title || "Call"} · {log.outcome || "No disposition"}<p className="text-tertiary">{log.createdAt ? new Date(log.createdAt).toLocaleString() : ""}</p></div>) : "No call logs found."}</div> : <><div className="flex min-h-0 flex-1 overflow-hidden"><nav aria-label="Filter sections" className="w-48 shrink-0 overflow-auto border-r border-secondary p-3">{tabs.map(name => <button key={name} onClick={() => { setTab(name); setQuery(""); }} className={`min-h-11 w-full rounded-lg px-3 py-2 text-left text-sm ${tab === name ? "bg-secondary font-semibold" : "hover:bg-secondary"}`}>{name}</button>)}</nav><div className="min-w-0 flex-1 overflow-auto p-5">{renderContent()}</div></div><footer className="flex justify-end gap-3 border-t border-secondary p-5"><Button color="secondary" onClick={() => { setDraft({}); setPreset("Custom Range"); }}>Reset</Button><Button color="secondary" onClick={() => setPopup("")}>Cancel</Button><Button onClick={apply}>Apply</Button></footer></>}</section></div>, document.body)}
    </>;
}
