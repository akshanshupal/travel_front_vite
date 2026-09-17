import { DefaultLayout } from "@/layouts/DefaultLayout";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Label } from "@/components/base/input/label";
import { Select } from "@/components/base/select/select";
import { TextArea } from "@/components/base/textarea/textarea";
import { CompactPagination } from "@/components/application/pagination/pagination";
import { FloatingHeaderTable } from "@/components/application/table/table";
import { useStoreSnackbar } from "@/store/snackbar";
import { getLeads, getLeadsDelete, getLeadsById, updateLeadsById, updateLeadStage } from "@/utils/services/leadsService";
import { getDialCallLogs } from "@/utils/services/dialService";
import { getUser } from "@/utils/services/userService";
import { getContactProperties } from "@/utils/services/contactPropertiesService";
import { normalizeContactProperties, type ContactPropertyDefinition } from "@/pages/lead-management/leads/custom-properties-fields";
import { ArrowLeft, Check, ChevronDown, Columns03, Download01, DotsVertical, Lightbulb01, LinkExternal01, Plus, Trash01 } from "@untitledui/icons";
import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLocation, useNavigate } from "react-router";

const asArray = (value: any) => (Array.isArray(value) ? value : []);

const SOURCE_CATEGORIES: { label: string; sources: string[] }[] = [
    { label: "Integration", sources: ["API", "INCOMING_IVR", "WHATSAPP", "CHATBOT", "WEBHOOK"] },
    { label: "FileUpload", sources: ["FILE_UPLOAD"] },
    { label: "Workflows", sources: ["WORKFLOW"] },
    { label: "Others", sources: ["WALK_IN_LEAD", "GOOGLE_SHEET", "MANUAL"] },
];

type Filters = { name?: string; number?: string; email?: string; campaigns?: string[]; sources?: string[]; properties?: Record<string, string> };
type ManagedReportColumn = { key: string; label: string; propertyKey?: string };
type ReportColumn = { key: string; label: string; value: (row: any) => any; dateTime?: boolean };
type ReportConfig = { pipeline: string; title: string; params: Record<string, any>; managedColumns: ManagedReportColumn[]; toolbar: React.ReactNode; actions: (ids: string[], refresh: () => void) => React.ReactNode };

const formatDate = (value: any) => {
    if (!value) return "—";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "—";
    return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "2-digit" }).replace(/ /g, "-");
};

const formatClockTime = (date: Date) => date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true });

const formatDateTime = (value: any) => {
    if (!value) return "—";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "—";
    return `${formatDate(value)} ${formatClockTime(date)}`;
};

const DateTimeValue = ({ value }: { value: any }) => {
    if (!value) return <>—</>;
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return <>—</>;
    return <span className="inline-flex whitespace-nowrap flex-col"><span>{formatDate(value)}</span><span className="text-xs text-tertiary">{formatClockTime(date)}</span></span>;
};

const getId = (value: any) => String(value?.id ?? value?._id ?? value ?? "").trim();

const optionalKey = (key: unknown): string => {
    const value = key == null ? "" : String(key);
    return value === "__none__" ? "" : value;
};

const parseOther = (value: any): Record<string, any> => {
    if (!value) return {};
    if (typeof value === "string") {
        try {
            const parsed = JSON.parse(value);
            return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? { ...parsed } : { description: value };
        } catch {
            return { description: value };
        }
    }
    return typeof value === "object" && !Array.isArray(value) ? { ...value } : {};
};

const RESERVED_OTHER_KEYS = new Set(["name", "alternateMobile", "tag", "dealAmount", "confidentialRemark"]);

const TAG_OPTIONS = ["Interested", "Not Interested", "Booked", "Legal", "Callback", "Busy", "Wrong Number", "Duplicate"];

const ContactViewPage = ({ report }: { report?: ReportConfig } = {}) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { showSnackbar } = useStoreSnackbar();
    const filters: Filters = useMemo(() => ((location.state as any)?.filters as Filters) || {}, [location.state]);
    const baseFilters = useRef<Filters>(filters);

    const [rows, setRows] = useState<any[]>([]);
    const [selected, setSelected] = useState<string[]>([]);
    const [revision, setRevision] = useState(0);
    const refresh = () => { setRevision(value => value + 1); setTotal(null); setSelected([]); };
    useEffect(() => { setPage(1); setTotal(null); setSelected([]); }, [report?.params]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(50);
    const [total, setTotal] = useState<number | null>(null);
    const [countLoading, setCountLoading] = useState(false);
    const [sources, setSources] = useState<string[]>(asArray(filters.sources));
    const [openCategory, setOpenCategory] = useState<string | null>(null);
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);
    const [menuPos, setMenuPos] = useState<{ top: number; left: number } | null>(null);
    const [historyFor, setHistoryFor] = useState<any | null>(null);
    const [historyRows, setHistoryRows] = useState<any[]>([]);
    const [historyLoading, setHistoryLoading] = useState(false);
    const [expandedLeadId, setExpandedLeadId] = useState<string | null>(null);
    const [expandedTimeline, setExpandedTimeline] = useState<any[]>([]);
    const [expandedTimelineLoading, setExpandedTimelineLoading] = useState(false);
    const [userMap, setUserMap] = useState<Record<string, string>>({});
    const [deleteTarget, setDeleteTarget] = useState<any | null>(null);
    const [deleting, setDeleting] = useState(false);
    const [editFor, setEditFor] = useState<any | null>(null);
    const [editLoading, setEditLoading] = useState(false);
    const [editSaving, setEditSaving] = useState(false);
    const [editForm, setEditForm] = useState({ title: "", mobile: "", email: "", alternateMobile: "", assignee: "", stage: "", tag: "", dealAmount: "", remark: "" });
    const [editOther, setEditOther] = useState<Record<string, any>>({});
    const [editCustomProps, setEditCustomProps] = useState<Record<string, any>>({});
    const [removedProps, setRemovedProps] = useState<string[]>([]);
    const [propertyDefs, setPropertyDefs] = useState<ContactPropertyDefinition[]>([]);
    const [pipelineStages, setPipelineStages] = useState<string[]>([]);
    const [currentStageName, setCurrentStageName] = useState("");
    const [showAlternate, setShowAlternate] = useState(false);
    const [addingProperty, setAddingProperty] = useState(false);
    const [newPropertyKey, setNewPropertyKey] = useState("");
    const [newPropertyValue, setNewPropertyValue] = useState("");
    const [addingOther, setAddingOther] = useState(false);
    const [newOtherKey, setNewOtherKey] = useState("");
    const [newOtherValue, setNewOtherValue] = useState("");

    const categoryOf = (source: string) => SOURCE_CATEGORIES.find((category) => category.sources.includes(source))?.label || "Others";

    const buildFilterParams = useCallback(() => {
        if (report) return { ...report.params, pipeline: report.pipeline, report: "true" };
        const params: Record<string, any> = {};
        if (baseFilters.current.name?.trim()) params.titleLike = baseFilters.current.name.trim();
        if (baseFilters.current.number?.trim()) params.mobileLike = baseFilters.current.number.trim();
        if (baseFilters.current.email?.trim()) params.emailLike = baseFilters.current.email.trim();
        if (asArray(baseFilters.current.campaigns).length) params.campaignIn = asArray(baseFilters.current.campaigns).join(",");
        if (sources.length) params.sourceIn = sources.join(",");
        const properties = Object.entries(baseFilters.current.properties || ({} as Record<string, string>)).filter(([, value]) => value.trim());
        if (properties.length) params.customProps = JSON.stringify(Object.fromEntries(properties));
        return params;
    }, [sources, report?.params, report?.pipeline]);

    useEffect(() => {
        let cancelled = false;
        const run = async () => {
            setLoading(true);
            try {
                const response = await getLeads({ ...buildFilterParams(), page: String(page), limit: String(pageSize), populate: "campaign,pipeline,salesExecutive", select_campaign: "title", select_pipeline: "title" });
                if (cancelled) return;
                setRows(asArray(response?.data ?? response));
            } catch {
                if (!cancelled) showSnackbar({ title: "Error", description: "Failed to load contacts.", color: "danger" });
            } finally {
                if (!cancelled) setLoading(false);
            }
        };
        run();
        return () => {
            cancelled = true;
        };
    }, [page, pageSize, sources, buildFilterParams, showSnackbar, revision]);

    const viewTotalCount = async () => {
        if (countLoading || total !== null) return;
        setCountLoading(true);
        try {
            const response: any = await getLeads({ ...buildFilterParams(), totalCount: "true", page: "1", limit: "1" });
            setTotal(Number(response?.totalCount ?? 0));
        } catch {
            showSnackbar({ title: "Error", description: "Failed to load total count.", color: "danger" });
        } finally {
            setCountLoading(false);
        }
    };

    const toggleSource = (source: string) => {
        setPage(1);
        setSources((current) => (current.includes(source) ? current.filter((item) => item !== source) : [...current, source]));
    };

    const reportColumns = useMemo<ReportColumn[]>(() => {
        if (!report) return [];
        const base: ReportColumn[] = [
            { key: "Email", label: "Email", value: row => row.email },
            { key: "Campaign Name", label: "Campaign Name", value: row => row.campaign?.title },
            { key: "Creation Date", label: "Creation Date", value: row => row.createdAt, dateTime: true },
            { key: "Updated at", label: "Updated at", value: row => row.updatedAt, dateTime: true },
            { key: "Lead Stage", label: "Lead Stage", value: row => row.currentStageName },
            { key: "Tag", label: "Tag", value: row => parseOther(row.otherOptions).tag },
            { key: "User Assigned", label: "User Assigned", value: row => row.salesExecutive?.name },
            { key: "Follow-Up Time", label: "Follow-Up Time", value: row => row.followUpTime ? new Date(row.followUpTime).toLocaleString() : "—" },
        ];
        const managed = report.managedColumns.map<ReportColumn>(column => ({
            key: column.key,
            label: column.label,
            value: row => {
                const other = parseOther(row.otherOptions);
                if (column.propertyKey) return row.customProperties?.[column.propertyKey] ?? row[column.propertyKey] ?? other[column.propertyKey];
                if (column.key === "Status") return row.leadStatus ?? row.status;
                if (column.key === "Deal Amount") return other.dealAmount ?? row.dealAmount;
                if (column.key === "Last Call Date") return row.lastCallDate ? new Date(row.lastCallDate).toLocaleString() : "—";
                if (column.key === "Total Disposition Count") return row.totalDispositionCount;
                if (column.key === "Call Attempt Count") return row.callAttemptCount;
                return row[column.key] ?? other[column.key];
            },
        }));
        return [...base, ...managed];
    }, [report]);
    const visibleReportColumns = reportColumns;
    const displayValue = (value: any) => {
        if (value === undefined || value === null || value === "") return "—";
        if (typeof value === "boolean") return value ? "Yes" : "No";
        if (Array.isArray(value)) return value.join(", ") || "—";
        if (typeof value === "object") return JSON.stringify(value);
        return String(value);
    };

    const downloadCsv = () => {
        if (report) {
            const header = ["Name", "Number", ...visibleReportColumns.map(column => column.label)];
            const escape = (value: any) => `"${String(value ?? "").replace(/"/g, '""')}"`;
            const csv = [header, ...rows.map(row => [row.title, row.mobile, ...visibleReportColumns.map(column => column.dateTime ? formatDateTime(column.value(row)) : displayValue(column.value(row)))])].map(line => line.map(escape).join(",")).join("\n");
            const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
            const link = document.createElement("a"); link.href = url; link.download = "lead-summary-current-page.csv"; link.click(); URL.revokeObjectURL(url);
            return;
        }
        const header = ["Name", "Number", "Campaign", "Pipeline", "Creation Date", "Updated at", "Stage", "User Assigned"];
        const escape = (value: any) => `"${String(value ?? "").replace(/"/g, '""')}"`;
        const csv = ([header, ...rows.map((row) => [row?.otherOptions?.name || row?.title, row?.mobile, row?.campaign?.title, row?.pipeline?.title, formatDateTime(row?.createdAt), formatDateTime(row?.updatedAt), row?.status || row?.stage?.title, [row?.salesExecutive?.name, row?.salesExecutive?.mobile].filter(Boolean).join("-")].map(escape))] as string[][]).map((line) => line.join(",")).join("\n");
        const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
        const link = document.createElement("a");
        link.href = url;
        link.download = "contacts.csv";
        link.click();
        URL.revokeObjectURL(url);
    };

    const formatTime = (value: any) => {
        if (!value) return "—";
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) return "—";
        return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
    };

    const callStatusLabel = (log: any) => `${log?.connected ? "Call connected" : "Call not connected"} (${log?.outcome ?? "null"})`;

    const toggleExpandedLead = async (row: any) => {
        if (!report || !row?.id) return;
        if (expandedLeadId === String(row.id)) {
            setExpandedLeadId(null);
            setExpandedTimeline([]);
            return;
        }
        setExpandedLeadId(String(row.id));
        setExpandedTimeline([]);
        setExpandedTimelineLoading(true);
        try {
            const response: any = await getDialCallLogs({ lead: row.id, limit: "all" });
            setExpandedTimeline(asArray(response?.data ?? response));
        } catch {
            showSnackbar({ title: "Error", description: "Failed to load lead timeline.", color: "danger" });
        } finally {
            setExpandedTimelineLoading(false);
        }
    };

    const openHistory = async (row: any) => {
        setOpenMenuId(null);
        setHistoryFor(row);
        setHistoryRows([]);
        setHistoryLoading(true);
        try {
            const response: any = await getDialCallLogs({ lead: row?.id, limit: "all" });
            setHistoryRows(asArray(response?.data ?? response));
        } catch {
            showSnackbar({ title: "Error", description: "Failed to load lead history.", color: "danger" });
        } finally {
            setHistoryLoading(false);
        }
    };

    const confirmDelete = async () => {
        if (!deleteTarget) return;
        setDeleting(true);
        try {
            await getLeadsDelete(deleteTarget.id);
            showSnackbar({ title: "Lead deleted", description: "The lead was deleted successfully.", color: "success" });
            setDeleteTarget(null);
            const response = await getLeads({ ...buildFilterParams(), page: String(page), limit: String(pageSize), populate: "campaign,pipeline,salesExecutive", select_campaign: "title", select_pipeline: "title" });
            setRows(asArray(response?.data ?? response));
        } catch {
            showSnackbar({ title: "Error", description: "Failed to delete lead.", color: "danger" });
        } finally {
            setDeleting(false);
        }
    };

    const openEdit = async (row: any) => {
        if (!row?.id) return;
        setEditFor(row);
        setEditLoading(true);
        setAddingProperty(false);
        setNewPropertyKey("");
        setNewPropertyValue("");
        setAddingOther(false);
        setNewOtherKey("");
        setNewOtherValue("");
        setRemovedProps([]);
        try {
            const [leadRes, propRes] = await Promise.all([
                getLeadsById(row.id, { populate: "pipeline", select_pipeline: "title,initialStage,otherStages,convertedStage,rejectedStage" }),
                getContactProperties({ limit: "all" }),
            ]);
            const lead: any = leadRes?.data ?? leadRes;
            const other = parseOther(lead?.otherOptions);
            const pipeline = lead?.pipeline && typeof lead.pipeline === "object" ? lead.pipeline : null;
            const stages = pipeline
                ? [pipeline.initialStage, ...asArray(pipeline.otherStages), pipeline.convertedStage, pipeline.rejectedStage].filter((stage: any) => stage?.name).map((stage: any) => String(stage.name))
                : [];
            setPipelineStages(Array.from(new Set(stages)));
            setCurrentStageName(lead?.currentStageName || pipeline?.initialStage?.name || "");
            const definitions = normalizeContactProperties(propRes);
            setPropertyDefs(definitions);
            const knownPropertyKeys = new Set(definitions.map((item) => item.key));
            const rawProps = lead?.customProperties && typeof lead.customProperties === "object" && !Array.isArray(lead.customProperties) ? lead.customProperties : {};
            setEditForm({
                title: lead?.title || other.name || "",
                mobile: lead?.mobile || "",
                email: lead?.email || "",
                alternateMobile: other.alternateMobile ? String(other.alternateMobile) : "",
                assignee: getId(lead?.salesExecutive),
                stage: lead?.currentStageName || pipeline?.initialStage?.name || "",
                tag: other.tag ? String(other.tag) : "",
                dealAmount: other.dealAmount != null && other.dealAmount !== "" ? String(other.dealAmount) : "",
                remark: other.confidentialRemark ? String(other.confidentialRemark) : "",
            });
            setEditOther(Object.fromEntries(Object.entries(other).filter(([key]) => !RESERVED_OTHER_KEYS.has(key))));
            setEditCustomProps(Object.fromEntries(Object.entries(rawProps).filter(([key]) => knownPropertyKeys.has(key))));
            setShowAlternate(Boolean(other.alternateMobile));
        } catch (error: any) {
            showSnackbar({ title: "Error", description: error?.message || "Failed to load lead.", color: "danger" });
            setEditFor(null);
        } finally {
            setEditLoading(false);
        }
    };

    const saveEdit = async () => {
        if (!editFor || editSaving) return;
        setEditSaving(true);
        try {
            const other: Record<string, any> = { ...editOther };
            if (editForm.title.trim()) other.name = editForm.title.trim();
            if (editForm.alternateMobile.trim()) other.alternateMobile = editForm.alternateMobile.trim();
            else delete other.alternateMobile;
            if (editForm.tag) other.tag = editForm.tag;
            else delete other.tag;
            if (editForm.dealAmount.trim()) other.dealAmount = editForm.dealAmount.trim();
            else delete other.dealAmount;
            if (editForm.remark.trim()) other.confidentialRemark = editForm.remark.trim();
            else delete other.confidentialRemark;
            const knownPropertyKeys = new Set(propertyDefs.map((definition) => definition.key));
            const sentCustomProps = Object.fromEntries(Object.entries(editCustomProps).filter(([key]) => knownPropertyKeys.has(key))) as Record<string, any>;
            removedProps.forEach((key) => { sentCustomProps[key] = null; });
            await updateLeadsById(editFor.id, {
                title: editForm.title.trim(),
                mobile: editForm.mobile.trim(),
                email: editForm.email.trim(),
                salesExecutive: editForm.assignee || null,
                otherOptions: JSON.stringify(other),
                customProperties: sentCustomProps,
            });
            if (editForm.stage && editForm.stage !== currentStageName) {
                await updateLeadStage(editFor.id, { currentStageName: editForm.stage });
            }
            showSnackbar({ title: "Success", description: "Lead updated successfully.", color: "success" });
            setEditFor(null);
            const response = await getLeads({ ...buildFilterParams(), page: String(page), limit: String(pageSize), populate: "campaign,pipeline,salesExecutive", select_campaign: "title", select_pipeline: "title" });
            setRows(asArray(response?.data ?? response));
        } catch (error: any) {
            showSnackbar({ title: "Error", description: error?.message || "Failed to update lead.", color: "danger" });
        } finally {
            setEditSaving(false);
        }
    };

    useEffect(() => {
        let cancelled = false;
        const run = async () => {
            try {
                const response: any = await getUser({ limit: "all", select: "name,mobile" });
                const resolved = response?.data ?? response;
                const list: any[] = Array.isArray(resolved?.data) ? resolved.data : Array.isArray(resolved) ? resolved : [];
                if (cancelled) return;
                const map: Record<string, string> = {};
                list.forEach((item) => {
                    const id = String(item?.id || item?._id || "");
                    if (id) map[id] = [item?.name, item?.mobile].filter(Boolean).join("-");
                });
                setUserMap(map);
            } catch {
                /* user names are best-effort */
            }
        };
        run();
        return () => {
            cancelled = true;
        };
    }, []);

    const MENU_WIDTH = 224;
    const MENU_HEIGHT = 190;

    const toggleMenu = (rowId: string, button: HTMLElement) => {
        if (openMenuId === rowId) {
            setOpenMenuId(null);
            setMenuPos(null);
            return;
        }
        const rect = button.getBoundingClientRect();
        const left = Math.max(8, rect.right - MENU_WIDTH);
        const openUp = rect.bottom + MENU_HEIGHT + 8 > window.innerHeight;
        setMenuPos({ top: openUp ? Math.max(8, rect.top - MENU_HEIGHT - 4) : rect.bottom + 4, left });
        setOpenMenuId(rowId);
    };

    useEffect(() => {
        const onPointerDown = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest("[data-action-menu]")) {
                setOpenMenuId(null);
                setMenuPos(null);
            }
        };
        const onScroll = () => {
            setOpenMenuId(null);
            setMenuPos(null);
        };
        document.addEventListener("mousedown", onPointerDown);
        window.addEventListener("scroll", onScroll, true);
        return () => {
            document.removeEventListener("mousedown", onPointerDown);
            window.removeEventListener("scroll", onScroll, true);
        };
    }, []);

    const start = rows.length ? (page - 1) * pageSize + 1 : 0;
    const menuRow = openMenuId ? rows.find((row) => String(row?.id) === openMenuId) : null;

    const closeMenu = () => {
        setOpenMenuId(null);
        setMenuPos(null);
    };

    return (
        <DefaultLayout>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-2">
                        <button type="button" onClick={() => navigate(-1)} className="rounded-full border border-secondary p-1.5 text-secondary hover:bg-secondary" aria-label="Back to contact search">
                            <ArrowLeft className="h-4 w-4" />
                        </button>
                        <h1 className="text-xl font-bold text-primary">{report ? `Lead Summary Report - ${report.title}` : "Contact Search"}</h1>
                    </div>
                    <div className="flex items-center gap-3">
                        {report ? report.actions(selected, refresh) : <><Button color="secondary" size="sm" iconLeading={false} onClick={() => navigate("/lead-management/settings?tab=contactProperties")}>
                            Custom Contact Properties
                        </Button>
                        <Button color="secondary" size="sm" onClick={() => navigate("/lead-management/leads?upload=1")}>
                            Upload Contacts
                        </Button></>}
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    {report?.toolbar}
                    {report && (
                        <button
                            type="button"
                            onClick={() => navigate("/lead-management/settings?tab=manageColumns")}
                            className="flex size-10 items-center justify-center rounded-lg border border-secondary bg-primary text-secondary transition-colors hover:border-brand hover:text-brand-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                            aria-label="Manage lead summary columns"
                            title="Manage columns"
                        >
                            <Columns03 className="size-5" />
                        </button>
                    )}
                    {!report && SOURCE_CATEGORIES.map((category) => {
                        const selected = sources.filter((source) => categoryOf(source) === category.label);
                        const isOpen = openCategory === category.label;
                        return (
                            <div key={category.label} className="relative">
                                <button type="button" onClick={() => setOpenCategory(isOpen ? null : category.label)} className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm ${selected.length ? "border-brand bg-brand-50 text-brand-solid" : "border-secondary bg-primary text-primary"}`}>
                                    {category.label}
                                    <ChevronDown className={`h-4 w-4 transition ${isOpen ? "rotate-180" : ""}`} />
                                </button>
                                {isOpen && (
                                    <div className="absolute z-20 mt-1 w-56 rounded-lg border border-secondary bg-primary p-2 shadow-lg">
                                        {category.sources.map((source) => (
                                            <label key={source} className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm text-primary hover:bg-secondary">
                                                <input type="checkbox" checked={selected.includes(source)} onChange={() => toggleSource(source)} />
                                                {source.replace(/_/g, " ")}
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                    <button type="button" onClick={downloadCsv} className="rounded-lg border border-secondary bg-primary p-2 text-secondary hover:bg-secondary" aria-label="Download CSV">
                        <Download01 className="h-4 w-4" />
                    </button>
                </div>

                <FloatingHeaderTable className="min-w-0 rounded-lg border border-secondary bg-primary">
                    <table className={`${report ? "w-max min-w-full" : "w-full min-w-[1000px]"} border-collapse text-xs`}>
                        <thead>
                            <tr className="border-b border-secondary text-left text-[11px] font-medium text-tertiary">
                                {report && <><th className="sticky left-0 z-20 w-10 min-w-10 max-w-10 whitespace-nowrap bg-primary px-2 py-2"><input aria-label="Select page" type="checkbox" checked={rows.length > 0 && rows.every(row => selected.includes(row.id))} onChange={event => setSelected(event.target.checked ? rows.map(row => row.id) : [])}/></th><th className="sticky left-10 z-20 w-14 min-w-14 max-w-14 whitespace-nowrap border-r border-secondary bg-primary px-2 py-2 shadow-[4px_0_8px_-6px_rgba(0,0,0,0.35)]">No.</th></>}
                                <th className={report ? "whitespace-nowrap bg-primary px-2 py-2" : "bg-primary px-4 py-3"}>Name</th>
                                {report && <th className="whitespace-nowrap bg-primary px-2 py-2">Number</th>}
                                {report && visibleReportColumns.map(column => <th key={column.key} className="whitespace-nowrap bg-primary px-2 py-2">{column.label}</th>)}
                                {!report && <th className="bg-primary px-4 py-3">Number</th>}
                                {!report && <><th className="bg-primary px-4 py-3">Campaign</th>
                                <th className="bg-primary px-4 py-3">Pipeline</th>
                                <th className="bg-primary px-4 py-3">Creation Date</th>
                                <th className="bg-primary px-4 py-3">Updated at</th>
                                <th className="bg-primary px-4 py-3">Stage</th>
                                <th className="bg-primary px-4 py-3">User Assigned</th></>}
                                <th className={report ? "sticky right-0 z-20 whitespace-nowrap border-l border-secondary bg-primary px-2 py-2 shadow-[-4px_0_8px_-6px_rgba(0,0,0,0.35)]" : "bg-primary px-4 py-3"}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={9} className="px-4 py-10 text-center text-tertiary">
                                        Loading contacts...
                                    </td>
                                </tr>
                            ) : rows.length === 0 ? (
                                <tr>
                                    <td colSpan={9} className="px-4 py-10 text-center text-tertiary">
                                        No contacts found
                                    </td>
                                </tr>
                            ) : (
                                rows.map((row, index) => {
                                    const rowId = String(row?.id || row?.mobile);
                                    const isExpanded = report && expandedLeadId === rowId;
                                    const other = parseOther(row?.otherOptions);
                                    return <Fragment key={rowId}>
                                        <tr
                                            className={`border-b border-secondary hover:bg-secondary/50 ${report ? "cursor-pointer" : ""} ${isExpanded ? "bg-secondary/30" : ""}`}
                                            onClick={(event) => {
                                                if (!(event.target as HTMLElement).closest("button, input, a, select")) toggleExpandedLead(row);
                                            }}
                                        >
                                            {report && <><td className="sticky left-0 z-10 w-10 min-w-10 max-w-10 whitespace-nowrap bg-primary px-2 py-1.5"><input type="checkbox" aria-label={`Select ${row.title}`} checked={selected.includes(row.id)} onChange={() => setSelected(current => current.includes(row.id) ? current.filter(id => id !== row.id) : [...current, row.id])}/></td><td className="sticky left-10 z-10 w-14 min-w-14 max-w-14 whitespace-nowrap border-r border-secondary bg-primary px-2 py-1.5 shadow-[4px_0_8px_-6px_rgba(0,0,0,0.35)]">{start + index}</td></>}
                                            <td className={`${report ? "whitespace-nowrap px-2 py-1.5" : "px-4 py-3"} font-medium text-primary`}>{other.name || row?.title || "—"}</td>
                                            {report && <td className="whitespace-nowrap px-2 py-1.5 text-primary">{row?.mobile || "—"}</td>}
                                            {report && visibleReportColumns.map(column => <td key={column.key} className="whitespace-nowrap px-2 py-1.5 text-primary">{column.dateTime ? <DateTimeValue value={column.value(row)} /> : displayValue(column.value(row))}</td>)}
                                            {!report && <td className="px-4 py-3 text-primary">{row?.mobile || "—"}</td>}
                                            {!report && <><td className="px-4 py-3 text-primary">{row?.campaign?.title || "—"}</td>
                                            <td className="px-4 py-3 text-primary">{row?.pipeline?.title || "—"}</td>
                                            <td className="px-4 py-3 text-primary">{formatDateTime(row?.createdAt)}</td>
                                            <td className="px-4 py-3 text-primary">{formatDateTime(row?.updatedAt)}</td>
                                            <td className="px-4 py-3 text-primary">{row?.status || row?.stage?.title || "—"}</td>
                                            <td className="px-4 py-3 text-primary">{[row?.salesExecutive?.name, row?.salesExecutive?.mobile].filter(Boolean).join("-") || "—"}</td></>}
                                            <td className={report ? "sticky right-0 z-10 whitespace-nowrap border-l border-secondary bg-primary px-2 py-1.5 shadow-[-4px_0_8px_-6px_rgba(0,0,0,0.35)]" : "whitespace-nowrap px-4 py-3"} data-action-menu>
                                                {report && <button className="mr-3 text-brand underline" onClick={() => openEdit(row)}>Edit</button>}
                                                <button type="button" onClick={(event) => toggleMenu(String(row?.id), event.currentTarget)} className="rounded-md p-1 text-tertiary hover:bg-secondary" aria-label="Row actions">
                                                    <DotsVertical className="h-4 w-4" />
                                                </button>
                                            </td>
                                        </tr>
                                        {isExpanded && (
                                            <tr className="border-b border-secondary bg-secondary/20">
                                                <td colSpan={visibleReportColumns.length + 5} className="p-3">
                                                    <div className="grid gap-3 lg:grid-cols-2">
                                                        <section className="overflow-hidden rounded-xl border border-secondary bg-primary">
                                                            <h3 className="border-b border-secondary px-4 py-3 font-semibold text-primary">About Lead</h3>
                                                            <div className="space-y-4 p-4 text-sm">
                                                                <div>
                                                                    <h4 className="mb-2 font-semibold text-primary">Latest Remark</h4>
                                                                    <dl className="grid grid-cols-[7rem_1fr] gap-x-3 gap-y-2">
                                                                        <dt className="font-medium text-secondary">Remark</dt><dd className="text-tertiary">{other.confidentialRemark || "—"}</dd>
                                                                        <dt className="font-medium text-secondary">Date</dt><dd className="text-tertiary"><DateTimeValue value={row?.updatedAt} /></dd>
                                                                    </dl>
                                                                </div>
                                                                <div className="border-t border-secondary pt-4">
                                                                    <h4 className="mb-2 font-semibold text-primary">Other Details</h4>
                                                                    <dl className="grid grid-cols-[7rem_1fr] gap-x-3 gap-y-2">
                                                                        <dt className="font-medium text-secondary">Contact List</dt><dd className="text-tertiary">{row?.source || "—"}</dd>
                                                                        <dt className="font-medium text-secondary">Alternate No.</dt><dd className="text-tertiary">{other.alternateMobile || "—"}</dd>
                                                                    </dl>
                                                                </div>
                                                            </div>
                                                        </section>
                                                        <section className="overflow-hidden rounded-xl border border-secondary bg-primary">
                                                            <h3 className="border-b border-secondary px-4 py-3 font-semibold text-primary">Timeline</h3>
                                                            <div className="max-h-72 overflow-auto p-4">
                                                                {expandedTimelineLoading ? <p className="text-sm text-tertiary">Loading timeline...</p> : <div className="space-y-4">
                                                                    {expandedTimeline.map(log => <div key={getId(log)} className="flex gap-3 text-sm"><span className={`mt-1 size-2 shrink-0 rounded-full ${log?.connected ? "bg-success-solid" : "bg-error-solid"}`} /><div><p className="font-medium text-primary">{callStatusLabel(log)} · {formatTime(log?.createdAt)}</p><p className="text-tertiary">{formatDateTime(log?.createdAt)}{log?.remark ? ` · ${log.remark}` : ""}</p></div></div>)}
                                                                    <div className="flex gap-3 text-sm"><span className="mt-1 size-2 shrink-0 rounded-full bg-brand-solid" /><div><p className="font-medium text-primary">Lead Created · {formatTime(row?.createdAt)}</p><p className="text-tertiary">{formatDateTime(row?.createdAt)} · Source: {row?.source || "—"}</p></div></div>
                                                                </div>}
                                                            </div>
                                                        </section>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </Fragment>;
                                })
                            )}
                        </tbody>
                    </table>
                </FloatingHeaderTable>

                <CompactPagination
                    page={page}
                    limit={pageSize}
                    itemCount={rows.length}
                    totalCount={total}
                    countLoading={countLoading}
                    onPageChange={setPage}
                    onLimitChange={(limit) => { setPage(1); setPageSize(limit); setTotal(null); }}
                    onRequestTotalCount={viewTotalCount}
                />

                {menuRow && menuPos && createPortal(
                    <div data-action-menu className="fixed z-50 w-56 rounded-xl border border-secondary bg-primary py-2 shadow-xl" style={{ top: menuPos.top, left: menuPos.left }}>
                        <button type="button" onClick={() => { closeMenu(); navigate(`/lead-management/leads/view/${menuRow?.id}`); }} className="flex w-full items-center justify-center gap-2 px-3 py-2 text-sm font-medium uppercase text-primary hover:bg-secondary">
                            Open
                            <LinkExternal01 className="h-4 w-4" />
                        </button>
                        <button type="button" onClick={() => { closeMenu(); openHistory(menuRow); }} className="w-full px-3 py-2 text-center text-sm font-medium uppercase text-primary hover:bg-secondary">
                            View Dispose History
                        </button>
                        <button type="button" onClick={() => { closeMenu(); openEdit(menuRow); }} className="w-full px-3 py-2 text-center text-sm font-medium uppercase text-primary hover:bg-secondary">
                            Edit
                        </button>
                        <button type="button" onClick={() => { closeMenu(); setDeleteTarget(menuRow); }} className="w-full px-3 py-2 text-center text-sm font-medium uppercase text-primary hover:bg-secondary">
                            Delete
                        </button>
                    </div>,
                    document.body,
                )}

                {historyFor && createPortal(
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setHistoryFor(null)}>
                        <div className="flex max-h-[85vh] w-full max-w-6xl flex-col rounded-xl border border-secondary bg-primary shadow-2xl" onClick={(event) => event.stopPropagation()}>
                            <div className="border-b border-secondary px-6 py-4">
                                <h2 className="text-xl font-bold text-brand-solid">Lead History</h2>
                                <p className="mt-0.5 text-sm text-secondary">{historyFor?.otherOptions?.name || historyFor?.title || "Lead"}{historyFor?.mobile ? ` · ${historyFor.mobile}` : ""}</p>
                            </div>
                            <div className="flex-1 overflow-auto p-4">
                                <table className="w-full min-w-[1150px] border-collapse text-sm">
                                    <thead>
                                        <tr className="border border-secondary text-left text-xs font-medium text-tertiary">
                                            <th className="px-3 py-2.5 font-medium">User Assigned</th>
                                            <th className="px-3 py-2.5 font-medium">Call Date</th>
                                            <th className="px-3 py-2.5 font-medium">Call Time</th>
                                            <th className="px-3 py-2.5 font-medium">Call Status</th>
                                            <th className="px-3 py-2.5 font-medium">Lead Stage</th>
                                            <th className="px-3 py-2.5 font-medium">Tag</th>
                                            <th className="px-3 py-2.5 font-medium">Remarks</th>
                                            <th className="px-3 py-2.5 font-medium">Reassign To Other Campaign</th>
                                            <th className="px-3 py-2.5 font-medium">Reassign To Other User</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {historyLoading ? (
                                            <tr>
                                                <td colSpan={9} className="px-3 py-8 text-center text-tertiary">Loading history...</td>
                                            </tr>
                                        ) : historyRows.length === 0 ? (
                                            <tr>
                                                <td colSpan={9} className="px-3 py-8 text-center text-tertiary">No history found for this lead</td>
                                            </tr>
                                        ) : (
                                            historyRows.map((log) => (
                                                <tr key={log?.id || log?._id} className="border border-secondary">
                                                    <td className="px-3 py-2.5 text-primary">{userMap[String(log?.agent || log?.initiatedBy || "")] || "—"}</td>
                                                    <td className="px-3 py-2.5 text-primary">{formatDateTime(log?.startedAt)}</td>
                                                    <td className="px-3 py-2.5 text-primary">{formatTime(log?.startedAt)}</td>
                                                    <td className="px-3 py-2.5 text-primary">{callStatusLabel(log)}</td>
                                                    <td className="px-3 py-2.5 text-primary">{log?.disposition || historyFor?.currentStageName || historyFor?.status || "—"}</td>
                                                    <td className="px-3 py-2.5 text-primary">{log?.metadata?.tag || log?.metadata?.tag_name || "—"}</td>
                                                    <td className="px-3 py-2.5 text-primary">{log?.notes || "—"}</td>
                                                    <td className="px-3 py-2.5 text-primary">No</td>
                                                    <td className="px-3 py-2.5 text-primary">No</td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <div className="flex flex-col gap-3 border-t border-secondary px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                                <p className="flex items-center gap-2 text-sm text-secondary">
                                    <Lightbulb01 className="h-4 w-4 shrink-0 text-orange-500" />
                                    This feature will soon be deprecated.
                                </p>
                                <Button color="secondary" size="md" onClick={() => setHistoryFor(null)}>
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </div>
                , document.body)}

                {editFor && createPortal(
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => !editSaving && !editLoading && setEditFor(null)}>
                        <div className="flex max-h-[90vh] w-full max-w-7xl flex-col rounded-xl border border-secondary bg-primary shadow-2xl" onClick={(event) => event.stopPropagation()}>
                            <div className="border-b border-secondary px-6 py-4">
                                <h2 className="text-xl font-bold text-brand-solid">Edit Lead</h2>
                            </div>
                            <div className="flex-1 overflow-auto p-6">
                                {editLoading ? (
                                    <div className="py-16 text-center text-tertiary">Loading lead...</div>
                                ) : (
                                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                                        <div className="flex flex-col gap-6">
                                            <section className="rounded-xl border border-secondary p-5">
                                                <h3 className="mb-4 text-sm font-semibold text-primary">Lead Information</h3>
                                                <div className="flex flex-col gap-4">
                                                    <Input label="Name" value={editForm.title} onChange={(value) => setEditForm((prev) => ({ ...prev, title: value }))} />
                                                    <div>
                                                        <Input label="Primary Number" value={editForm.mobile} onChange={(value) => setEditForm((prev) => ({ ...prev, mobile: value }))} />
                                                        {showAlternate ? (
                                                            <div className="mt-4">
                                                                <Input label="Alternate Number" value={editForm.alternateMobile} onChange={(value) => setEditForm((prev) => ({ ...prev, alternateMobile: value }))} />
                                                            </div>
                                                        ) : (
                                                            <button type="button" onClick={() => setShowAlternate(true)} className="ml-auto mt-2 block text-sm font-medium text-brand-solid">
                                                                + Add Alternate Number
                                                            </button>
                                                        )}
                                                    </div>
                                                    <Input label="Email" type="email" placeholder="Enter Email ID" value={editForm.email} onChange={(value) => setEditForm((prev) => ({ ...prev, email: value }))} />
                                                </div>
                                            </section>

                                            <section className="rounded-xl border border-secondary p-5">
                                                <h3 className="mb-4 text-sm font-semibold text-primary">Custom Contact Properties</h3>
                                                <div className="flex flex-col gap-4">
                                                    {Object.entries(editCustomProps).map(([key, value]) => {
                                                        const definition = propertyDefs.find((item) => item.key === key);
                                                        const label = definition?.label || key;
                                                        return (
                                                            <div key={key} className="flex flex-col gap-1.5">
                                                                <Label>{label}</Label>
                                                                <div className="flex items-center gap-2">
                                                                    <div className="flex-1">
                                                                        {definition?.fieldType === "boolean" ? (
                                                                            <Select aria-label={label} selectedKey={value === true || value === "true" ? "true" : "false"} onChange={undefined} onSelectionChange={(selected) => setEditCustomProps((prev) => ({ ...prev, [key]: String(selected) === "true" }))} items={[{ id: "true", label: "Yes" }, { id: "false", label: "No" }]}>
                                                                                {item => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                                                            </Select>
                                                                        ) : (
                                                                            <Input
                                                                                aria-label={label}
                                                                                type={definition && ["number", "date", "email", "url"].includes(definition.fieldType) ? definition.fieldType : "text"}
                                                                                value={typeof value === "object" ? JSON.stringify(value) : String(value ?? "")}
                                                                                onChange={(next) => setEditCustomProps((prev) => ({ ...prev, [key]: next }))}
                                                                            />
                                                                        )}
                                                                    </div>
                                                                    <button type="button" onClick={() => { setEditCustomProps((prev) => Object.fromEntries(Object.entries(prev).filter(([entryKey]) => entryKey !== key))); setRemovedProps((prev) => (prev.includes(key) ? prev : [...prev, key])); }} className="rounded-md p-2 text-tertiary hover:bg-secondary" aria-label={`Remove ${label}`}>
                                                                        <Trash01 className="h-4 w-4" />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                    {addingProperty ? (
                                                        <div className="flex items-end gap-2">
                                                            <div className="flex-1">
                                                                <Select aria-label="Property" selectedKey={newPropertyKey || null} onChange={undefined} onSelectionChange={(selected) => setNewPropertyKey(String(selected))} items={propertyDefs.filter((definition) => !(definition.key in editCustomProps)).map((definition) => ({ id: definition.key, label: definition.label }))}>
                                                                                    {item => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                                                </Select>
                                                            </div>
                                                            <div className="flex-1">
                                                                <Input aria-label="Value" placeholder="Enter value" value={newPropertyValue} onChange={setNewPropertyValue} />
                                                            </div>
                                                            <button type="button" disabled={!newPropertyKey} onClick={() => { setEditCustomProps((prev) => ({ ...prev, [newPropertyKey]: newPropertyValue })); setNewPropertyKey(""); setNewPropertyValue(""); setAddingProperty(false); }} className="rounded-md p-2 text-primary hover:bg-secondary disabled:opacity-40" aria-label="Confirm property">
                                                                <Check className="h-4 w-4" />
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <button type="button" onClick={() => setAddingProperty(true)} className="flex w-fit items-center gap-1.5 rounded-full border border-brand bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-solid hover:bg-brand-100">
                                                            <Plus className="h-4 w-4" />
                                                            Add
                                                        </button>
                                                    )}
                                                </div>
                                            </section>

                                            <section className="rounded-xl border border-secondary p-5">
                                                <h3 className="mb-4 text-sm font-semibold text-primary">Contact List Name : {editFor?.source || "—"}</h3>
                                                <div className="flex flex-col gap-4">
                                                    {Object.entries(editOther).map(([key, value]) => (
                                                        <div key={key} className="flex flex-col gap-1.5">
                                                            <Label>{key}:</Label>
                                                            <div className="flex items-center gap-2">
                                                                <div className="flex-1">
                                                                    <Input aria-label={key} value={typeof value === "object" ? JSON.stringify(value) : String(value ?? "")} onChange={(next) => setEditOther((prev) => ({ ...prev, [key]: next }))} />
                                                                </div>
                                                                <button type="button" onClick={() => setEditOther((prev) => Object.fromEntries(Object.entries(prev).filter(([entryKey]) => entryKey !== key)))} className="rounded-md p-2 text-tertiary hover:bg-secondary" aria-label={`Remove ${key}`}>
                                                                    <Trash01 className="h-4 w-4" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                    {addingOther ? (
                                                        <div className="flex items-end gap-2">
                                                            <div className="flex-1">
                                                                <Input aria-label="Name" placeholder="name" value={newOtherKey} onChange={setNewOtherKey} />
                                                            </div>
                                                            <div className="flex-1">
                                                                <Input aria-label="Value" placeholder="value" value={newOtherValue} onChange={setNewOtherValue} />
                                                            </div>
                                                            <button type="button" disabled={!newOtherKey.trim()} onClick={() => { setEditOther((prev) => ({ ...prev, [newOtherKey.trim()]: newOtherValue })); setNewOtherKey(""); setNewOtherValue(""); setAddingOther(false); }} className="rounded-md p-2 text-primary hover:bg-secondary disabled:opacity-40" aria-label="Confirm field">
                                                                <Check className="h-4 w-4" />
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <button type="button" onClick={() => setAddingOther(true)} className="flex w-fit items-center gap-1.5 rounded-full border border-brand bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-solid hover:bg-brand-100">
                                                            <Plus className="h-4 w-4" />
                                                            Add
                                                        </button>
                                                    )}
                                                </div>
                                            </section>
                                        </div>

                                        <section className="h-fit rounded-xl border border-secondary p-5">
                                            <div className="flex flex-col gap-4">
                                                <div>
                                                    <p className="text-sm font-semibold text-primary">Creation Date</p>
                                                    <p className="mt-1 text-sm text-secondary">{formatDateTime(editFor?.createdAt)}</p>
                                                </div>
                                                <div className="flex flex-col gap-1.5">
                                                    <Label>Assignee</Label>
                                                    <Select aria-label="Assignee" selectedKey={editForm.assignee || null} onChange={undefined} onSelectionChange={(selected) => setEditForm((prev) => ({ ...prev, assignee: optionalKey(selected) }))} items={[{ id: "__none__", label: "Select Assignee" }, ...Object.entries(userMap).map(([id, label]) => ({ id, label }))]}>
                                                        {item => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                                    </Select>
                                                </div>
                                                <div className="flex flex-col gap-1.5">
                                                    <Label>Lead Stage</Label>
                                                    <Select aria-label="Lead Stage" selectedKey={editForm.stage || null} onChange={undefined} onSelectionChange={(selected) => setEditForm((prev) => ({ ...prev, stage: String(selected) }))} items={(pipelineStages.length ? pipelineStages : [editForm.stage].filter(Boolean)).map((stage) => ({ id: stage, label: stage }))}>
                                                        {item => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                                    </Select>
                                                </div>
                                                <div className="flex flex-col gap-1.5">
                                                    <Label>Tag</Label>
                                                    <Select aria-label="Tag" selectedKey={editForm.tag || null} onChange={undefined} onSelectionChange={(selected) => setEditForm((prev) => ({ ...prev, tag: optionalKey(selected) }))} items={[{ id: "__none__", label: "Select Tag" }, ...TAG_OPTIONS.map((tag) => ({ id: tag, label: tag }))]}>
                                                        {item => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                                    </Select>
                                                </div>
                                                <div className="flex flex-col gap-1.5">
                                                    <Label>Deal Amount</Label>
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-28 shrink-0">
                                                            <Select aria-label="Currency" selectedKey="INR" onChange={undefined} onSelectionChange={() => undefined} items={[{ id: "INR", label: "INR ₹" }]}>
                                                                {item => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                                            </Select>
                                                        </div>
                                                        <div className="flex-1">
                                                            <Input aria-label="Deal Amount" type="number" placeholder="Enter Deal Amount" value={editForm.dealAmount} onChange={(value) => setEditForm((prev) => ({ ...prev, dealAmount: value }))} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <TextArea label="Confidential Remark" placeholder="Enter confidential remark" value={editForm.remark} onChange={(value) => setEditForm((prev) => ({ ...prev, remark: value }))} />
                                            </div>
                                        </section>
                                    </div>
                                )}
                            </div>
                            <div className="flex items-center justify-end gap-3 border-t border-secondary px-6 py-4">
                                <Button color="secondary" size="md" isDisabled={editSaving} onClick={() => setEditFor(null)}>
                                    Cancel
                                </Button>
                                <Button color="primary" size="md" isLoading={editSaving} isDisabled={editLoading} onClick={saveEdit}>
                                    Update
                                </Button>
                            </div>
                        </div>
                    </div>
                , document.body)}

                {deleteTarget && createPortal(
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => !deleting && setDeleteTarget(null)}>
                        <div className="w-full max-w-md rounded-xl border border-secondary bg-primary p-6 shadow-2xl" onClick={(event) => event.stopPropagation()}>
                            <h2 className="text-lg font-bold text-primary">Delete lead</h2>
                            <p className="mt-2 text-sm text-secondary">
                                Are you sure you want to delete &quot;{deleteTarget?.otherOptions?.name || deleteTarget?.title || deleteTarget?.mobile}&quot;? This action cannot be undone.
                            </p>
                            <div className="mt-6 flex justify-end gap-3">
                                <Button color="secondary" size="sm" isDisabled={deleting} onClick={() => setDeleteTarget(null)}>
                                    Cancel
                                </Button>
                                <Button color="primary" size="sm" isDisabled={deleting} onClick={confirmDelete}>
                                    {deleting ? "Deleting..." : "Delete"}
                                </Button>
                            </div>
                        </div>
                    </div>
                , document.body)}
            </div>
        </DefaultLayout>
    );
};

export default ContactViewPage;
