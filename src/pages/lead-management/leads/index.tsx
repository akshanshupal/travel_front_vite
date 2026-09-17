import { DefaultLayout } from "@/layouts/DefaultLayout";
import { StickyTable, Table, TableCard } from "@/components/application/table/table";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { CloseButton } from "@/components/base/buttons/close-button";
import { Input } from "@/components/base/input/input";
import { Label } from "@/components/base/input/label";
import { Select } from "@/components/base/select/select";
import { CompactPagination } from "@/components/application/pagination/pagination";
import { Dialog, Modal, ModalOverlay } from "@/components/application/modals/modal";
import { SlideoutMenu } from "@/components/application/slideout-menus/slideout-menu";
import { Badge } from "@/components/base/badges/badges";
import { useAvailableTableWidth } from "@/hooks/use-available-table-width";
import { useStoreSnackbar } from "@/store/snackbar";
import { addLeads, getLeads, getLeadsDelete } from "@/utils/services/leadsService";
import { getLeadPreferences } from "@/pages/lead-management/settings";
import { addCampaign, getCampaign } from "@/utils/services/campaignService";
import { getPipeline } from "@/utils/services/pipelineService";
import { getSalesEx } from "@/utils/services/salesService";
import { getUser } from "@/utils/services/userService";
import { addLeadFollowUp } from "@/utils/services/leadFollowUpService";
import { Tooltip, TooltipTrigger } from "@/components/base/tooltip/tooltip";
import { Edit01, FilterLines, Plus, RefreshCw01, Trash01, Eye, UploadCloud01, ArrowLeft, ArrowRight, ChevronDown, InfoCircle } from "@untitledui/icons";
import * as XLSX from "xlsx";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";

type LeadItem = {
    id: string;
    title?: string;
    mobile?: string;
    email?: string;
    campaign?: { id: string; title?: string } | string;
    pipeline?: { id: string; title?: string; initialStage?: { name?: string; tags?: string[] } };
    salesExecutive?: { id: string; name?: string } | string;
    status?: boolean | string;
    currentStageName?: string;
    createdAt?: string;
    updatedAt?: string;
};

type SelectItem = { id: string; title?: string; name?: string };

const parseSearch = (search: string) => {
    const sp = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
    const page = Math.max(1, Number(sp.get("page") || 1) || 1);
    const defaultLimit = Number(getLeadPreferences().defaultLeadsLimit) || 10;
    const limit = Math.min(100, Math.max(10, Number(sp.get("limit") || defaultLimit) || defaultLimit));
    return {
        page,
        limit,
        title: sp.get("title") || "",
        mobile: sp.get("mobile") || "",
        email: sp.get("email") || "",
        campaign: sp.get("campaign") || "",
        salesExecutive: sp.get("salesExecutive") || "",
        status: sp.get("status") || "",
        createdAt: sp.get("createdAt") || "",
        updatedAt: sp.get("updatedAt") || "",
    };
};

const statusToLabel = (status: boolean | string | undefined) => {
    if (status === true || status === "true") return "Active";
    if (status === false || status === "false") return "Inactive";
    return "—";
};

const formatDate = (dateStr: string | undefined) => {
    if (!dateStr) return "—";
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "Invalid Date";
    return d.toLocaleString("en-IN", { day: "2-digit", month: "short", year: "2-digit", hour: "numeric", minute: "numeric", hour12: true });
};

const asArray = (value: any) => (Array.isArray(value) ? value : []);
const getId = (value: any) => String(value?.id ?? value?._id ?? value ?? "").trim();

type ImportStep = "upload" | "campaign" | "mapping";
type ImportCampaign = { id: string; title: string };
const importFields = [
    { key: "title", label: "Contact name", required: false },
    { key: "mobile", label: "Primary contact number", required: true },
    { key: "alternateMobile", label: "Alternate contact number 1", required: false },
    { key: "email", label: "Email address", required: false },
];

const downloadSampleCsv = () => {
    const link = document.createElement("a");
    link.href = "/sample-lead-import.csv";
    link.download = "sample-lead-import.csv";
    link.click();
};

function ImportLeadsModal({ isOpen, onClose, onImported }: { isOpen: boolean; onClose: () => void; onImported: () => void }) {
    const showSnackbar = useStoreSnackbar((state) => state.showSnackbar);
    const inputRef = useRef<HTMLInputElement>(null);
    const [step, setStep] = useState<ImportStep>("upload");
    const [file, setFile] = useState<File | null>(null);
    const [headers, setHeaders] = useState<string[]>([]);
    const [rows, setRows] = useState<Record<string, any>[]>([]);
    const [campaignMode, setCampaignMode] = useState<"existing" | "new">("existing");
    const [campaignId, setCampaignId] = useState("");
    const [newCampaignName, setNewCampaignName] = useState("");
    const [campaigns, setCampaigns] = useState<ImportCampaign[]>([]);
    const [pipelines, setPipelines] = useState<{ id: string; title: string }[]>([]);
    const [pipelineId, setPipelineId] = useState("");
    const [mapping, setMapping] = useState<Record<string, string>>({});
    const [followUpColumn, setFollowUpColumn] = useState("");
    const [assignUserColumn, setAssignUserColumn] = useState("");
    const [users, setUsers] = useState<{ id: string; mobile: string }[]>([]);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!isOpen) return;
        setStep("upload"); setFile(null); setHeaders([]); setRows([]); setCampaignMode("existing"); setCampaignId(""); setNewCampaignName(""); setMapping({}); setFollowUpColumn(""); setAssignUserColumn("");
        Promise.all([getCampaign({ limit: "all", select: "title" }), getPipeline({ limit: "all", select: "title" }), getUser({ limit: "all" })]).then(([campaignRes, pipelineRes, userRes]) => {
            const normalize = (result: any) => { const value = result?.data ?? result; return Array.isArray(value?.data) ? value.data : Array.isArray(value) ? value : asArray(value?.items); };
            setCampaigns(normalize(campaignRes).map((item: any) => ({ id: getId(item), title: item?.title || item?.name || getId(item) })).filter((item: ImportCampaign) => item.id));
            setPipelines(normalize(pipelineRes).map((item: any) => ({ id: getId(item), title: item?.title || item?.name || getId(item) })).filter((item: any) => item.id));
            setUsers(normalize(userRes).map((item: any) => ({ id: getId(item), mobile: String(item?.mobile ?? "") })).filter((item: any) => item.id && item.mobile));
        }).catch(() => { setCampaigns([]); setPipelines([]); setUsers([]); });
    }, [isOpen]);

    const parseFile = async (nextFile: File) => {
        if (!/\.(csv|xls|xlsx)$/i.test(nextFile.name)) { showSnackbar({ title: "Invalid file", description: "Upload a CSV, XLS, or XLSX file.", color: "danger" }); return; }
        if (nextFile.size > 3 * 1024 * 1024) { showSnackbar({ title: "File too large", description: "The maximum file size is 3MB.", color: "danger" }); return; }
        const data = await nextFile.arrayBuffer();
        const workbook = XLSX.read(data, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const parsed = XLSX.utils.sheet_to_json<Record<string, any>>(sheet, { defval: "" });
        const rawHeaders = parsed.length ? Object.keys(parsed[0]) : XLSX.utils.sheet_to_json<string[]>(sheet, { header: 1 })[0] || [];
        const nextHeaders = rawHeaders.map(String).map((header) => header.trim()).filter((header) => header && !header.startsWith("__EMPTY"));
        setFile(nextFile); setRows(parsed); setHeaders(nextHeaders); setMapping({}); setStep("campaign");
    };

    const handleNext = async () => {
        if (step === "upload") { if (!file) return; setStep("campaign"); return; }
        if (step === "campaign") {
            if (campaignMode === "existing" && !campaignId) { showSnackbar({ title: "Select campaign", description: "Choose a campaign before continuing.", color: "danger" }); return; }
            if (campaignMode === "new" && (!newCampaignName.trim() || !pipelineId)) { showSnackbar({ title: "Campaign details required", description: "Enter a campaign name and select a pipeline.", color: "danger" }); return; }
            setStep("mapping"); return;
        }
        if (!mapping.mobile) { showSnackbar({ title: "Map primary number", description: "Select the column containing the primary contact number.", color: "danger" }); return; }
        setSaving(true);
        try {
            let selectedCampaign = campaignId;
            if (campaignMode === "new") {
                const created: any = await addCampaign({ title: newCampaignName.trim(), pipeline: pipelineId, managingCampaign: [], salesExecutive: [], distributionType: "onDemand", status: true });
                selectedCampaign = getId(created?.data?.data?.[0] || created?.data?.[0] || created?.data || created);
            }
            const phoneKey = (value: any) => { const digits = String(value ?? "").replace(/\D/g, ""); return digits.length > 10 ? digits.slice(-10) : digits; };
            const usersByPhone = new Map(users.map((user) => [phoneKey(user.mobile), user.id]));
            let imported = 0;
            let followUps = 0;
            const failures: string[] = [];
            for (const row of rows) {
                const lead: Record<string, any> = {};
                for (const [field, column] of Object.entries(mapping)) {
                    const value = String(row[column] ?? "").trim();
                    if (!value) continue;
                    if (field === "alternateMobile") {
                        lead.otherOptions = [lead.otherOptions, `Alternate contact number 1: ${value}`].filter(Boolean).join(" | ");
                    } else {
                        lead[field] = value;
                    }
                }
                if (!lead.mobile) continue;
                try {
                    const assigneeId = assignUserColumn ? usersByPhone.get(phoneKey(row[assignUserColumn])) : undefined;
                    const created: any = await addLeads({ ...lead, ...(assigneeId ? { salesExecutive: assigneeId } : {}), campaign: selectedCampaign, status: true });
                    imported += 1;
                    if (followUpColumn) {
                        const dueAt = new Date(String(row[followUpColumn] ?? "").trim());
                        if (!assigneeId) failures.push(`Follow-up skipped for ${lead.mobile}: no matching agent phone`);
                        else if (Number.isNaN(dueAt.getTime())) failures.push(`Follow-up skipped for ${lead.mobile}: invalid date`);
                        else {
                            await addLeadFollowUp({ lead: getId(created?.data || created), assignedTo: assigneeId, type: "follow-up", dueAt: dueAt.toISOString(), notes: "Created during lead import", status: "pending" });
                            followUps += 1;
                        }
                    }
                } catch (rowError: any) { failures.push(rowError?.message || "Unknown error"); }
            }
            if (!imported) throw new Error(failures[0] || "No valid leads found in the file.");
            const summary = [`${imported} leads added`, followUps ? `${followUps} follow-ups scheduled` : "", failures.length ? `${failures.length} skipped/failed` : ""].filter(Boolean).join(", ");
            showSnackbar({ title: "Import complete", description: `${summary}.`, color: failures.length ? "warning" : "success" });
            onImported(); onClose();
        } catch (error: any) { showSnackbar({ title: "Import failed", description: error?.message || "Failed to import leads.", color: "danger" }); }
        finally { setSaving(false); }
    };

    return <ModalOverlay isOpen={isOpen} isDismissable={!saving} onOpenChange={(open) => { if (!open && !saving) onClose(); }}>
        <Modal className="w-full max-w-4xl overflow-hidden rounded-2xl">
            <Dialog aria-label="Upload leads" className="max-h-[calc(100dvh-2rem)]">
                <div className="flex max-h-[calc(100dvh-2rem)] min-h-[36rem] flex-col rounded-2xl bg-primary shadow-xl">
                    <header className="flex shrink-0 items-start justify-between border-b border-secondary px-5 py-4 sm:px-8 sm:py-6"><div><h2 className="text-2xl font-semibold text-brand-primary sm:text-3xl">Upload Excel Sheet</h2><p className="mt-1 text-sm text-tertiary sm:text-base">{step === "upload" ? "Upload your lead file to get started" : step === "campaign" ? "Choose where these leads should be added" : "Map your file columns to lead details"}</p></div><CloseButton onPress={onClose} isDisabled={saving} /></header>
                    <div className="min-h-0 flex-1 overflow-y-auto px-5 py-6 sm:px-8">{step === "upload" && <div className="space-y-6"><button type="button" onClick={() => inputRef.current?.click()} onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); const dropped = event.dataTransfer.files[0]; if (dropped) void parseFile(dropped); }} className="group flex min-h-64 w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-brand bg-brand-secondary/30 p-8 text-center transition hover:bg-brand-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:min-h-80"><UploadCloud01 className="size-12 text-brand-primary transition-transform group-hover:-translate-y-1" /><p className="mt-4 text-lg font-semibold text-brand-primary">Drag and drop file</p><span className="mt-4 rounded-lg bg-brand-solid px-7 py-3 font-semibold text-white shadow-sm">Browse</span><p className="mt-4 text-sm text-tertiary">Supported formats are .csv, .xls, .xlsx</p><input ref={inputRef} hidden type="file" accept=".csv,.xls,.xlsx" onChange={(event) => { const selected = event.target.files?.[0]; if (selected) void parseFile(selected); }} /></button><div className="flex flex-wrap items-center justify-between gap-3"><p className="text-sm text-secondary">Max leads: 25,000 at a time, file size limit: 3MB.</p><button type="button" onClick={downloadSampleCsv} className="rounded-md px-1 py-1 font-semibold text-brand-secondary hover:underline focus-visible:outline-2 focus-visible:outline-brand">Download Sample file</button></div><div className="rounded-xl bg-secondary/40 px-4 py-3 text-sm text-tertiary">Include a name and primary contact number in your file. Column order does not matter.</div></div>}
                    {step === "campaign" && <div className="space-y-6"><div className="grid gap-4 md:grid-cols-2"><button type="button" onClick={() => setCampaignMode("existing")} className={`min-h-32 rounded-2xl border p-6 text-left transition focus-visible:outline-2 focus-visible:outline-brand ${campaignMode === "existing" ? "border-brand bg-brand-secondary" : "border-secondary hover:bg-primary_hover"}`}><span className="rounded-full bg-brand-solid px-3 py-1 text-xs font-semibold text-white">Suggested</span><h3 className="mt-4 text-lg font-semibold text-primary">Add leads in existing campaign</h3></button><button type="button" onClick={() => setCampaignMode("new")} className={`min-h-32 rounded-2xl border p-6 text-left transition focus-visible:outline-2 focus-visible:outline-brand ${campaignMode === "new" ? "border-brand bg-brand-secondary" : "border-secondary hover:bg-primary_hover"}`}><h3 className="text-lg font-semibold text-primary">Create a new campaign</h3></button></div>{campaignMode === "existing" ? <Select label="Select Campaign" isRequired aria-label="Select Campaign" placeholder="Choose a campaign" selectedKey={campaignId || null} onSelectionChange={(key) => setCampaignId(String(key))} items={campaigns.map((item) => ({ id: item.id, label: item.title }))}>{(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}</Select> : <div className="grid gap-4 md:grid-cols-2"><Input label="Campaign name" isRequired value={newCampaignName} onChange={setNewCampaignName} placeholder="Enter campaign name" /><Select label="Pipeline" isRequired aria-label="Pipeline" placeholder="Choose a pipeline" selectedKey={pipelineId || null} onSelectionChange={(key) => setPipelineId(String(key))} items={pipelines.map((item) => ({ id: item.id, label: item.title }))}>{(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}</Select></div>}</div>}
                    {step === "mapping" && <div className="space-y-5"><p className="text-base text-secondary">Simply select the columns in your file for these details.</p>{importFields.map((field) => <div key={field.key} className="grid items-center gap-3 rounded-xl border border-secondary p-3 md:grid-cols-[1fr_1.4fr] md:border-0 md:p-0"><Label>{field.label}{field.required ? <span className="text-error-primary">*</span> : ""}</Label><Select aria-label={field.label} placeholder="Select column" selectedKey={mapping[field.key] || null} onSelectionChange={(key) => setMapping((current) => ({ ...current, [field.key]: String(key) }))} items={headers.map((header) => ({ id: header, label: header }))}>{(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}</Select></div>)}<details className="group rounded-xl bg-secondary/40 px-4 py-3"><summary className="flex cursor-pointer list-none items-center justify-between rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"><span className="text-base font-semibold text-primary">Additional Settings</span><ChevronDown className="size-5 text-tertiary transition group-open:rotate-180" aria-hidden="true" /></summary><div className="mt-4 space-y-4"><div className="grid items-center gap-3 md:grid-cols-[1fr_1.4fr]"><span className="flex items-center gap-1.5 text-sm font-medium text-primary">Set Follow-up<Tooltip title="Set Follow-up" description="With the Set Follow-up feature, you can strategically plan lead follow-up dates during upload by mapping the relevant date column. This ensures your agents receive timely notifications, streamlining the follow-up process based on your set dates." placement="top"><TooltipTrigger><InfoCircle className="size-4 text-fg-quaternary transition duration-200 hover:text-fg-quaternary_hover" /></TooltipTrigger></Tooltip></span><Select aria-label="Set Follow-up" placeholder="Select column" selectedKey={followUpColumn || null} onSelectionChange={(key) => setFollowUpColumn(String(key))} items={headers.map((header) => ({ id: header, label: header }))}>{(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}</Select></div><div className="grid items-center gap-3 md:grid-cols-[1fr_1.4fr]"><span className="flex items-center gap-1.5 text-sm font-medium text-primary">Assign to User<Tooltip title="Assign to User" description="Simply map the column containing agents' phone numbers against leads to automatically assign the leads to them." placement="top"><TooltipTrigger><InfoCircle className="size-4 text-fg-quaternary transition duration-200 hover:text-fg-quaternary_hover" /></TooltipTrigger></Tooltip></span><Select aria-label="Assign to User" placeholder="Select column" selectedKey={assignUserColumn || null} onSelectionChange={(key) => setAssignUserColumn(String(key))} items={headers.map((header) => ({ id: header, label: header }))}>{(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}</Select></div></div></details></div>}</div>
                    <footer className="flex shrink-0 justify-end gap-3 border-t border-secondary bg-primary px-5 py-4 sm:px-8"><Button color="secondary" onClick={() => step === "upload" ? onClose() : setStep(step === "mapping" ? "campaign" : "upload")} iconLeading={ArrowLeft}>Back</Button><Button color="primary" isLoading={saving} onClick={handleNext} iconTrailing={ArrowRight}>{step === "mapping" ? "Import Leads" : "Next"}</Button></footer>
                </div>
            </Dialog>
        </Modal>
    </ModalOverlay>;
}

export default function LeadsIndexPage() {
    const navigate = useNavigate();
    const { pathname, search } = useLocation();
    const initial = parseSearch(search);
    const availableWidth = useAvailableTableWidth();

    const [page, setPage] = useState(initial.page);
    const [limit, setLimit] = useState(initial.limit);
    const [filters, setFilters] = useState({
        title: initial.title,
        mobile: initial.mobile,
        email: initial.email,
        campaign: initial.campaign,
        salesExecutive: initial.salesExecutive,
        status: initial.status,
        createdAt: initial.createdAt,
        updatedAt: initial.updatedAt,
    });
    const [debouncedFilters, setDebouncedFilters] = useState(filters);
    const [tempFilters, setTempFilters] = useState(filters);

    const [items, setItems] = useState<LeadItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState<string | null>(null);
    const [totalRecords, setTotalRecords] = useState<number | null>(null);
    const [countLoading, setCountLoading] = useState(false);

    const [campaignList, setCampaignList] = useState<SelectItem[]>([]);
    const [salesExecutiveList, setSalesExecutiveList] = useState<SelectItem[]>([]);

    const [deleteTarget, setDeleteTarget] = useState<{ id: string; title?: string } | null>(null);
    const [isImportOpen, setIsImportOpen] = useState(false);
    const deletingRef = useRef(false);

    useEffect(() => {
        const params = new URLSearchParams(search);
        if (params.get("upload") !== "1") return;
        setIsImportOpen(true);
        params.delete("upload");
        navigate(params.toString() ? `${pathname}?${params.toString()}` : pathname, { replace: true });
    }, [navigate, pathname, search]);

    const indexById = useMemo(() => new Map(items.map((item, index) => [item.id, (page - 1) * limit + index + 1])), [items, limit, page]);
    const isFilterActive = Boolean(
        filters.title || filters.mobile || filters.email || filters.campaign || filters.salesExecutive || filters.status || filters.createdAt || filters.updatedAt,
    );

    // Debounce filters
    useEffect(() => {
        const handler = window.setTimeout(() => {
            setDebouncedFilters(filters);
            setPage(1);
        }, 500);
        return () => window.clearTimeout(handler);
    }, [filters]);

    // Sync URL
    useEffect(() => {
        const sp = new URLSearchParams();
        Object.entries(debouncedFilters).forEach(([key, value]) => {
            if (!value) return;
            sp.set(key, String(value));
        });
        sp.set("page", String(page));
        sp.set("limit", String(limit));
        const next = sp.toString();
        const current = search.startsWith("?") ? search.slice(1) : search;
        if (next === current) return;
        navigate(next ? `${pathname}?${next}` : pathname, { replace: true });
    }, [debouncedFilters, limit, navigate, page, pathname, search]);

    // Fetch dropdown data
    useEffect(() => {
        const run = async () => {
            try {
                const [campaignRes, salesRes] = await Promise.all([
                    getCampaign({ limit: "all", select: "title" }),
                    getSalesEx({ limit: "all", select: "name" }),
                ]);
                const campaignResolved = (campaignRes as any)?.data ?? campaignRes;
                const salesResolved = (salesRes as any)?.data ?? salesRes;
                const campaignList = Array.isArray(campaignResolved?.data) ? campaignResolved.data : Array.isArray(campaignResolved) ? campaignResolved : asArray(campaignResolved?.items);
                const salesList = Array.isArray(salesResolved?.data) ? salesResolved.data : Array.isArray(salesResolved) ? salesResolved : asArray(salesResolved?.items);
                setCampaignList(asArray(campaignList).map((it: any) => ({ id: getId(it), title: it?.title || it?.name || "" })).filter((x: any) => x.id));
                setSalesExecutiveList(asArray(salesList).map((it: any) => ({ id: getId(it), name: it?.name || it?.username || "" })).filter((x: any) => x.id));
            } catch {
                setCampaignList([]);
                setSalesExecutiveList([]);
            }
        };
        run();
    }, []);

    // Fetch leads data
    useEffect(() => {
        const run = async () => {
            setLoading(true);
            setLoadError(null);
            try {
                const res = await getLeads({
                    page: String(page),
                    limit: String(limit),
                    populate: "campaign,pipeline,salesExecutive",
                    select_campaign: "title",
                    select_pipeline: "title,initialStage",
                    select_salesExecutive: "name",
                    ...(debouncedFilters.title ? { title: debouncedFilters.title } : {}),
                    ...(debouncedFilters.mobile ? { mobile: debouncedFilters.mobile } : {}),
                    ...(debouncedFilters.email ? { email: debouncedFilters.email } : {}),
                    ...(debouncedFilters.campaign ? { campaign: debouncedFilters.campaign } : {}),
                    ...(debouncedFilters.salesExecutive ? { salesExecutive: debouncedFilters.salesExecutive } : {}),
                    ...(debouncedFilters.status ? { status: debouncedFilters.status } : {}),
                    ...(debouncedFilters.createdAt ? { createdAt: debouncedFilters.createdAt } : {}),
                    ...(debouncedFilters.updatedAt ? { updatedAt: debouncedFilters.updatedAt } : {}),
                });
                const resolved = (res as any)?.data ?? res;
                const list = Array.isArray(resolved?.data) ? resolved.data : Array.isArray(resolved) ? resolved : asArray(resolved?.items);
                const normalized = asArray(list).map((it: any) => {
                    const id = getId(it);
                    if (!id) return null;
                    return { ...it, id } as LeadItem;
                }).filter(Boolean) as LeadItem[];
                setItems(normalized);
            } catch (e: any) {
                setLoadError(e?.message || "Failed to load leads");
                setItems([]);
            } finally {
                setLoading(false);
            }
        };
        run();
    }, [
        debouncedFilters.title,
        debouncedFilters.mobile,
        debouncedFilters.email,
        debouncedFilters.campaign,
        debouncedFilters.salesExecutive,
        debouncedFilters.status,
        debouncedFilters.createdAt,
        debouncedFilters.updatedAt,
        limit,
        page,
    ]);

    useEffect(() => setTotalRecords(null), [debouncedFilters, limit]);

    const requestTotalCount = async () => {
        setCountLoading(true);
        try {
            const response: any = await getLeads({
                ...(debouncedFilters.title ? { title: debouncedFilters.title } : {}),
                ...(debouncedFilters.mobile ? { mobile: debouncedFilters.mobile } : {}),
                ...(debouncedFilters.email ? { email: debouncedFilters.email } : {}),
                ...(debouncedFilters.campaign ? { campaign: debouncedFilters.campaign } : {}),
                ...(debouncedFilters.salesExecutive ? { salesExecutive: debouncedFilters.salesExecutive } : {}),
                ...(debouncedFilters.status ? { status: debouncedFilters.status } : {}),
                ...(debouncedFilters.createdAt ? { createdAt: debouncedFilters.createdAt } : {}),
                ...(debouncedFilters.updatedAt ? { updatedAt: debouncedFilters.updatedAt } : {}),
                page: "1", limit: "1", totalCount: "true",
            });
            const resolved = response?.data ?? response;
            setTotalRecords(Number(response?.totalCount ?? response?.total ?? resolved?.totalCount ?? resolved?.total ?? resolved?.pagination?.totalCount ?? 0));
        } finally { setCountLoading(false); }
    };

    const handleOpenFilters = () => setTempFilters(filters);

    const handleApplyFilters = (close?: () => void) => {
        setFilters(tempFilters);
        setPage(1);
        close?.();
    };

    const handleResetFilters = (close?: () => void) => {
        const next = { title: "", mobile: "", email: "", campaign: "", salesExecutive: "", status: "", createdAt: "", updatedAt: "" };
        setTempFilters(next);
        setFilters(next);
        setPage(1);
        close?.();
    };

    const handleRemoveFilter = (key: keyof typeof filters) => {
        setFilters(prev => ({ ...prev, [key]: "" }));
    };

    const handleDelete = async () => {
        if (!deleteTarget?.id || deletingRef.current) return;
        deletingRef.current = true;
        try {
            await getLeadsDelete(deleteTarget.id);
            useStoreSnackbar.getState().showSnackbar({ title: "Deleted", description: "Lead deleted successfully", color: "success" });
            setItems(prev => prev.filter(it => it.id !== deleteTarget.id));
            setTotalRecords(null);
            setDeleteTarget(null);
        } catch (e: any) {
            useStoreSnackbar.getState().showSnackbar({ title: "Error", description: e?.message || "Failed to delete lead", color: "danger" });
        } finally {
            deletingRef.current = false;
        }
    };

    const campaignById = useMemo(() => new Map(campaignList.map(c => [c.id, c.title || ""])), [campaignList]);
    const salesExecById = useMemo(() => new Map(salesExecutiveList.map(s => [s.id, s.name || ""])), [salesExecutiveList]);

    const filterLabel = (key: string, value: string) => {
        if (!value) return "";
        if (key === "campaign") return campaignById.get(value) || value;
        if (key === "salesExecutive") return salesExecById.get(value) || value;
        if (key === "status") return value === "true" ? "Active" : value === "false" ? "Inactive" : value;
        return value;
    };

    const columns = [
        { id: "index", name: "#", isRowHeader: true, widthRatio: 5, minWidth: 56 },
        { id: "title", name: "Name", widthRatio: 14, minWidth: 160 },
        { id: "mobile", name: "Number", widthRatio: 12, minWidth: 140 },
        { id: "email", name: "Email", widthRatio: 16, minWidth: 200 },
        { id: "campaign", name: "Campaign Name", widthRatio: 14, minWidth: 160 },
        { id: "createdAt", name: "Created Date", widthRatio: 12, minWidth: 160 },
        { id: "updatedAt", name: "Updated At", widthRatio: 12, minWidth: 160 },
        { id: "leadstage", name: "Lead Stage", widthRatio: 10, minWidth: 120 },
        { id: "tags", name: "Tags", widthRatio: 10, minWidth: 120 },
        { id: "salesExecutive", name: "User Assigned", widthRatio: 10, minWidth: 140 },
        { id: "status", name: "Lead Status", widthRatio: 8, minWidth: 100 },
        { id: "actions", name: "Actions", widthRatio: 8, minWidth: 120, className: "pr-4 pl-4 whitespace-nowrap" },
    ] as { id: string; name: string; className?: string; widthRatio?: number; minWidth?: number }[];

    const getCampaignTitle = (item: LeadItem) => {
        const c = item.campaign;
        if (!c) return "—";
        if (typeof c === "object") return c.title || "—";
        return campaignById.get(c) || "—";
    };

    const getSalesExecName = (item: LeadItem) => {
        const se = item.salesExecutive;
        if (!se) return "—";
        if (typeof se === "object") return (se as any).name || "—";
        return salesExecById.get(se) || "—";
    };

    return (
        <DefaultLayout>
            <div style={{ width: availableWidth }}>
                <TableCard.Root className="w-full">
                    <TableCard.Header
                        title="Leads Management"
                        badge={loading ? "…" : totalRecords ?? "—"}
                        contentTrailing={
                            <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center">
                                <Select
                                    aria-label="Rows per page"
                                    className="w-full md:w-40"
                                    value={String(limit)}
                                    onChange={undefined}
                                    onSelectionChange={(key) => {
                                        const next = Number(key);
                                        if (!Number.isFinite(next) || next <= 0) return;
                                        setLimit(next);
                                        setPage(1);
                                    }}
                                    items={[
                                        { id: "10", label: "10 / page" },
                                        { id: "25", label: "25 / page" },
                                        { id: "50", label: "50 / page" },
                                        { id: "100", label: "100 / page" },
                                    ]}
                                >
                                    {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                </Select>
                                <Button size="sm" color="secondary" iconLeading={UploadCloud01} onClick={() => setIsImportOpen(true)}>
                                    Upload Excel Sheet
                                </Button>
                                <Button size="sm" color="primary" iconLeading={Plus} onClick={() => navigate("/lead-management/leads/add")}>
                                    Add Leads
                                </Button>
                            </div>
                        }
                    />

                    <div className="border-b border-secondary bg-primary px-4 py-4 md:px-6">
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <SlideoutMenu.Trigger>
                                    <Button color="secondary" iconLeading={FilterLines} onClick={handleOpenFilters}>
                                        More filters
                                    </Button>
                                    <SlideoutMenu isDismissable>
                                        {({ close }) => (
                                            <SlideoutMenu.Content>
                                                <SlideoutMenu.Header onClose={close}>Filters</SlideoutMenu.Header>
                                                <div className="flex-1 overflow-y-auto p-6">
                                                    <div className="flex flex-col gap-4">
                                                        <Input
                                                            label="Name"
                                                            placeholder="Search by name"
                                                            value={tempFilters.title}
                                                            onChange={(value) => setTempFilters(prev => ({ ...prev, title: value }))}
                                                        />
                                                        <Input
                                                            label="Mobile"
                                                            placeholder="Search by mobile"
                                                            value={tempFilters.mobile}
                                                            onChange={(value) => setTempFilters(prev => ({ ...prev, mobile: value }))}
                                                        />
                                                        <Input
                                                            label="Email"
                                                            placeholder="Search by email"
                                                            value={tempFilters.email}
                                                            onChange={(value) => setTempFilters(prev => ({ ...prev, email: value }))}
                                                        />
                                                        <div className="flex flex-col gap-1.5">
                                                            <Label>Campaign</Label>
                                                            <Select
                                                                aria-label="Campaign"
                                                                value={tempFilters.campaign || "__all__"}
                                                                onChange={undefined}
                                                                onSelectionChange={(key) =>
                                                                    setTempFilters(prev => ({ ...prev, campaign: key === "__all__" ? "" : String(key) }))
                                                                }
                                                                items={[
                                                                    { id: "__all__", label: "All Campaigns" },
                                                                    ...campaignList.map(c => ({ id: c.id, label: c.title || c.id })),
                                                                ]}
                                                            >
                                                                {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                                            </Select>
                                                        </div>
                                                        <div className="flex flex-col gap-1.5">
                                                            <Label>Sales Executive</Label>
                                                            <Select
                                                                aria-label="Sales Executive"
                                                                value={tempFilters.salesExecutive || "__all__"}
                                                                onChange={undefined}
                                                                onSelectionChange={(key) =>
                                                                    setTempFilters(prev => ({ ...prev, salesExecutive: key === "__all__" ? "" : String(key) }))
                                                                }
                                                                items={[
                                                                    { id: "__all__", label: "All Sales Executives" },
                                                                    ...salesExecutiveList.map(s => ({ id: s.id, label: s.name || s.id })),
                                                                ]}
                                                            >
                                                                {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                                            </Select>
                                                        </div>
                                                        <div className="flex flex-col gap-1.5">
                                                            <Label>Status</Label>
                                                            <Select
                                                                aria-label="Status"
                                                                value={tempFilters.status || "__all__"}
                                                                onChange={undefined}
                                                                onSelectionChange={(key) =>
                                                                    setTempFilters(prev => ({ ...prev, status: key === "__all__" ? "" : String(key) }))
                                                                }
                                                                items={[
                                                                    { id: "__all__", label: "All Status" },
                                                                    { id: "true", label: "Active" },
                                                                    { id: "false", label: "Inactive" },
                                                                ]}
                                                            >
                                                                {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                                            </Select>
                                                        </div>
                                                        <Input
                                                            label="Created At"
                                                            placeholder="Search by created date"
                                                            value={tempFilters.createdAt}
                                                            onChange={(value) => setTempFilters(prev => ({ ...prev, createdAt: value }))}
                                                        />
                                                        <Input
                                                            label="Updated At"
                                                            placeholder="Search by updated date"
                                                            value={tempFilters.updatedAt}
                                                            onChange={(value) => setTempFilters(prev => ({ ...prev, updatedAt: value }))}
                                                        />
                                                    </div>
                                                </div>
                                                <SlideoutMenu.Footer>
                                                    <div className="flex w-full gap-3">
                                                        <Button color="secondary" className="flex-1 justify-center" onClick={() => handleResetFilters(close)}>
                                                            Reset
                                                        </Button>
                                                        <Button color="primary" className="flex-1 justify-center" onClick={() => handleApplyFilters(close)}>
                                                            Apply Filters
                                                        </Button>
                                                    </div>
                                                </SlideoutMenu.Footer>
                                            </SlideoutMenu.Content>
                                        )}
                                    </SlideoutMenu>
                                </SlideoutMenu.Trigger>
                                <ButtonUtility
                                    icon={RefreshCw01}
                                    onClick={() => handleResetFilters()}
                                    color="secondary"
                                    className="px-3"
                                    tooltip="Reset Filters"
                                    isDisabled={!isFilterActive}
                                />
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {Object.entries(filters).map(([key, value]) => {
                                    if (!value || value === "__all__") return null;
                                    const labelKey = key === "salesExecutive" ? "Sales Executive" : key === "createdAt" ? "Created At" : key === "updatedAt" ? "Updated At" : key.charAt(0).toUpperCase() + key.slice(1);
                                    return (
                                        <button
                                            key={key}
                                            onClick={() => handleRemoveFilter(key as any)}
                                            className="inline-flex items-center gap-1 rounded-full border border-secondary bg-primary px-2.5 py-1 text-xs font-medium text-primary hover:bg-secondary"
                                        >
                                            <span className="text-tertiary">{labelKey}:</span>
                                            <span className="text-brand-700">{filterLabel(key, value)}</span>
                                            <span className="ml-1 text-tertiary">×</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {loading ? (
                        <StickyTable
                            ariaLabel="Leads list"
                            columns={columns}
                            items={Array.from({ length: 5 }).map((_, i) => ({ id: `skeleton-${i}` }))}
                            availableWidth={availableWidth}
                            loading={loading}
                        >
                            {(item) => (
                                <Table.Row id={item.id} columns={columns}>
                                    {(column) => (
                                        <Table.Cell className={`${column?.className || ""} ${column.id === "actions" ? "whitespace-nowrap" : ""}`.trim()}>
                                            <div className="animate-pulse">
                                                <div className="h-4 w-full rounded bg-secondary" />
                                            </div>
                                        </Table.Cell>
                                    )}
                                </Table.Row>
                            )}
                        </StickyTable>
                    ) : loadError ? (
                        <div className="px-4 py-10 text-sm text-error md:px-6">{loadError}</div>
                    ) : (
                        <StickyTable ariaLabel="Leads list" columns={columns} items={items} availableWidth={availableWidth} loading={loading}>
                            {(item) => (
                                <Table.Row id={item.id} columns={columns}>
                                    {(column) => (
                                        <Table.Cell
                                            className={`${column?.className || ""} ${column.id === "actions" ? "whitespace-nowrap" : "whitespace-normal break-words"}`.trim()}
                                        >
                                            {column.id === "index" ? (
                                                <span className="text-sm text-tertiary">{indexById.get(item.id) ?? "—"}</span>
                                            ) : column.id === "title" ? (
                                                <button
                                                    type="button"
                                                    onClick={() => navigate(`/lead-management/leads/view/${item.id}`)}
                                                    className="text-left text-sm font-semibold text-primary hover:underline"
                                                >
                                                    {item.title || "—"}
                                                </button>
                                            ) : column.id === "mobile" ? (
                                                <span className="text-sm text-tertiary">{item.mobile || "—"}</span>
                                            ) : column.id === "email" ? (
                                                <span className="text-sm text-tertiary">{item.email || "—"}</span>
                                            ) : column.id === "campaign" ? (
                                                <span className="text-sm text-tertiary">{getCampaignTitle(item)}</span>
                                            ) : column.id === "createdAt" ? (
                                                <div className="flex flex-col gap-0.5">
                                                    <Badge size="sm" color="warning">{formatDate(item.createdAt)}</Badge>
                                                </div>
                                            ) : column.id === "updatedAt" ? (
                                                <div className="flex flex-col gap-0.5">
                                                    <Badge size="sm" color="warning">{formatDate(item.updatedAt)}</Badge>
                                                </div>
                                            ) : column.id === "leadstage" ? (
                                                <span className="text-sm text-tertiary">{item.currentStageName || item.pipeline?.initialStage?.name || "—"}</span>
                                            ) : column.id === "tags" ? (
                                                <div className="flex flex-wrap gap-1">
                                                    {(item.pipeline?.initialStage?.tags || []).map((tag, i) => (
                                                        <Badge key={i} size="sm" color="blue">{tag}</Badge>
                                                    ))}
                                                    {(!item.pipeline?.initialStage?.tags?.length) && <span className="text-sm text-tertiary">—</span>}
                                                </div>
                                            ) : column.id === "salesExecutive" ? (
                                                <span className="text-sm text-tertiary">{getSalesExecName(item)}</span>
                                            ) : column.id === "status" ? (
                                                <Badge
                                                    size="sm"
                                                    color={item.status === true || item.status === "true" ? "success" : "error"}
                                                >
                                                    {statusToLabel(item.status)}
                                                </Badge>
                                            ) : (
                                                <div className="flex w-full items-center justify-end gap-1.5">
                                                    <ButtonUtility
                                                        tooltip="View"
                                                        tooltipPlacement="bottom"
                                                        icon={Eye}
                                                        onClick={() => navigate(`/lead-management/leads/view/${item.id}`)}
                                                        color="secondary"
                                                    />
                                                    <ButtonUtility
                                                        tooltip="Edit"
                                                        tooltipPlacement="bottom"
                                                        icon={Edit01}
                                                        onClick={() => navigate(`/lead-management/leads/edit/${item.id}`)}
                                                        color="warning"
                                                    />
                                                    <ButtonUtility
                                                        tooltip="Delete"
                                                        tooltipPlacement="bottom"
                                                        icon={Trash01}
                                                        onClick={() => setDeleteTarget({ id: item.id, title: item.title })}
                                                        color="error"
                                                    />
                                                </div>
                                            )}
                                        </Table.Cell>
                                    )}
                                </Table.Row>
                            )}
                        </StickyTable>
                    )}

                    <CompactPagination
                        page={page}
                        limit={limit}
                        itemCount={items.length}
                        totalCount={totalRecords}
                        countLoading={countLoading}
                        onPageChange={setPage}
                        onLimitChange={(value) => {
                            setLimit(value);
                            setPage(1);
                        }}
                        onRequestTotalCount={requestTotalCount}
                    />
                </TableCard.Root>
            </div>

            <ImportLeadsModal isOpen={isImportOpen} onClose={() => setIsImportOpen(false)} onImported={() => { setTotalRecords(null); setPage(1); setDebouncedFilters((current) => ({ ...current })); }} />

            <ModalOverlay
                isOpen={Boolean(deleteTarget)}
                isDismissable
                onOpenChange={(open) => { if (!open) setDeleteTarget(null); }}
            >
                {({ state }) => (
                    <Modal className="max-w-lg">
                        <Dialog>
                            <div className="relative w-full rounded-xl bg-primary p-5 ring-1 ring-secondary">
                                <CloseButton onPress={() => state.close()} className="absolute right-4 top-4" size="sm" />
                                <div className="space-y-1">
                                    <h2 className="text-lg font-semibold text-primary">Delete Lead</h2>
                                    <p className="text-sm text-tertiary">
                                        {deleteTarget?.title ? `Delete "${deleteTarget.title}"?` : "Delete this lead?"}
                                    </p>
                                </div>
                                <div className="mt-5 flex justify-end gap-2">
                                    <Button color="secondary" onClick={() => state.close()}>Cancel</Button>
                                    <Button color="primary-destructive" onClick={handleDelete}>Delete</Button>
                                </div>
                            </div>
                        </Dialog>
                    </Modal>
                )}
            </ModalOverlay>
        </DefaultLayout>
    );
}
