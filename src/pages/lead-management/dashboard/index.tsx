import { DefaultLayout } from "@/layouts/DefaultLayout";
import { Dialog, Modal, ModalOverlay } from "@/components/application/modals/modal";
import { Button } from "@/components/base/buttons/button";
import { CloseButton } from "@/components/base/buttons/close-button";
import { Input } from "@/components/base/input/input";
import { Label } from "@/components/base/input/label";
import { Select } from "@/components/base/select/select";
import { useStoreSnackbar } from "@/store/snackbar";
import { addCampaign } from "@/utils/services/campaignService";
import { getLeadDashboard, pinCampaign } from "@/utils/services/leadDashboardService";
import { getPipeline } from "@/utils/services/pipelineService";
import { getSalesEx } from "@/utils/services/salesService";
import { ChevronDown, InfoCircle, Phone01, Plus, Settings01, Trash01, TrendUp01, UploadCloud01, User01, XClose } from "@untitledui/icons";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

const rangeOptions = [
    { id: "month", label: "This Month" },
    { id: "yesterday", label: "Yesterday" },
    { id: "today", label: "Today" },
    { id: "7", label: "Last 7 days" },
    { id: "30", label: "Last 30 days" },
    { id: "custom", label: "Custom Range" },
];

const formatLocalDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
};

type LookupItem = { id: string; title?: string; name?: string };

type CampaignForm = {
    title: string;
    pipeline: string;
    managingCampaign: string[];
    salesExecutive: string[];
    distributionType: string;
    additionalSetting: {
        priority: string;
        checkForDuplicates: string;
        duplicatesFound: string;
    };
    status: boolean;
};

const emptyCampaignForm = (): CampaignForm => ({
    title: "",
    pipeline: "",
    managingCampaign: [],
    salesExecutive: [],
    distributionType: "",
    additionalSetting: { priority: "", checkForDuplicates: "", duplicatesFound: "" },
    status: true,
});

const asArray = (value: any) => (Array.isArray(value) ? value : []);
const getId = (value: any) => String(value?.id ?? value?._id ?? value ?? "").trim();
const optionalKey = (key: unknown) => String(key ?? "") === "__none__" ? "" : String(key ?? "");

const priorityList = [
    { id: "highest", label: "Highest" },
    { id: "high", label: "High" },
    { id: "medium", label: "Medium" },
    { id: "low", label: "Low" },
    { id: "lowest", label: "Lowest" },
];

const checkForDuplicatesList = [
    { id: "withInthisCampaign", label: "Within this Campaign" },
    { id: "withInthisPipeline", label: "Within this Pipeline" },
    { id: "allCampaigns", label: "All Campaigns (Global)" },
];

const duplicatesFoundList = [
    { id: "ignoreDuplicate", label: "Ignore Duplicate" },
    { id: "margeDuplicate", label: "Merge Duplicate" },
    { id: "createDuplicate", label: "Create Duplicate Leads" },
    { id: "margeDuplicateReOpenClosedLeads", label: "Merge Duplicate & Reopen Closed Leads" },
];

const distributionTypeList = [
    { id: "onDemand", label: "On Demand", desc: "Leads stay unassigned until a user assigns themself or starts calling." },
    { id: "equal", label: "Equal", desc: "Distributes leads equally among all agents in the campaign." },
    { id: "conditional", label: "Conditional", desc: "Assigns leads based on conditions set for the campaign.", disabled: true },
];

function CreateCampaignModal({ isOpen, onClose, onCreated }: { isOpen: boolean; onClose: () => void; onCreated: () => void }) {
    const { showSnackbar } = useStoreSnackbar();
    const [form, setForm] = useState<CampaignForm>(emptyCampaignForm);
    const [salesExecutives, setSalesExecutives] = useState<LookupItem[]>([]);
    const [pipelineList, setPipelineList] = useState<LookupItem[]>([]);
    const [loadingLookups, setLoadingLookups] = useState(false);
    const [saving, setSaving] = useState(false);
    const [dirty, setDirty] = useState<Record<string, boolean>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [openUserDropdown, setOpenUserDropdown] = useState<"managingCampaign" | "salesExecutive" | null>(null);
    const userDropdownRefs = {
        managingCampaign: useRef<HTMLFieldSetElement>(null),
        salesExecutive: useRef<HTMLFieldSetElement>(null),
    };

    useEffect(() => {
        if (!openUserDropdown) return;
        const handleOutsideClick = (event: MouseEvent) => {
            const activeRef = userDropdownRefs[openUserDropdown];
            if (!activeRef.current?.contains(event.target as Node)) setOpenUserDropdown(null);
        };
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") setOpenUserDropdown(null);
        };
        document.addEventListener("mousedown", handleOutsideClick);
        document.addEventListener("keydown", handleEscape);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
            document.removeEventListener("keydown", handleEscape);
        };
    }, [openUserDropdown]);

    useEffect(() => {
        if (!isOpen) return;
        setForm(emptyCampaignForm());
        setOpenUserDropdown(null);
        setDirty({});
        setErrors({});
        setLoadingLookups(true);
        Promise.all([getSalesEx({ limit: "all" }), getPipeline({ limit: "all" })])
            .then(([salesRes, pipelineRes]) => {
                const salesResolved = (salesRes as any)?.data ?? salesRes;
                const pipelineResolved = (pipelineRes as any)?.data ?? pipelineRes;
                const salesList = Array.isArray(salesResolved?.data) ? salesResolved.data : Array.isArray(salesResolved) ? salesResolved : asArray(salesResolved?.items);
                const pipelineItems = Array.isArray(pipelineResolved?.data) ? pipelineResolved.data : Array.isArray(pipelineResolved) ? pipelineResolved : asArray(pipelineResolved?.items);
                const users = asArray(salesList)
                    .map((item: any) => ({ id: getId(item), name: item?.name || item?.username || item?.email || "" }))
                    .filter((item: LookupItem, index: number, list: LookupItem[]) => item.id && list.findIndex((user) => user.id === item.id) === index);
                setSalesExecutives(users);
                setPipelineList(asArray(pipelineItems).map((item: any) => ({ id: getId(item), title: item?.title || "" })).filter((item: LookupItem) => item.id));
            })
            .catch((error: any) => showSnackbar({ title: "Error", description: error?.message || "Failed to load data", color: "danger" }))
            .finally(() => setLoadingLookups(false));
    }, [isOpen, showSnackbar]);

    const toggleUser = (field: "managingCampaign" | "salesExecutive", id: string) => {
        setForm((current) => ({
            ...current,
            [field]: current[field].includes(id) ? current[field].filter((value) => value !== id) : [...current[field], id],
        }));
    };

    const handleCreate = async () => {
        const nextErrors: Record<string, string> = {};
        if (!form.title.trim()) nextErrors.title = "Name is required";
        if (!form.pipeline) nextErrors.pipeline = "Pipeline is required";
        setDirty({ title: true, pipeline: true });
        setErrors(nextErrors);
        if (Object.keys(nextErrors).length) {
            showSnackbar({ title: "Validation Error", description: Object.values(nextErrors)[0], color: "danger" });
            return;
        }
        if (saving) return;
        setSaving(true);
        try {
            const response = await addCampaign(form);
            if ((response as any)?.error) throw new Error((response as any).error);
            showSnackbar({ title: "Success", description: "Campaign added successfully", color: "success" });
            onCreated();
        } catch (error: any) {
            showSnackbar({ title: "Error", description: error?.message || "Failed to add campaign", color: "danger" });
        } finally {
            setSaving(false);
        }
    };

    const userSelector = (field: "managingCampaign" | "salesExecutive", label: string, helper: string) => {
        const selectedUsers = salesExecutives.filter((executive) => form[field].includes(executive.id));
        const isOpen = openUserDropdown === field;
        return (
            <fieldset ref={userDropdownRefs[field]} className="min-w-0">
                <legend className="text-sm font-medium text-secondary">{label}</legend>
                <p className="mt-1 text-xs text-tertiary">{helper}</p>
                <div className="relative mt-2">
                    <div
                        role="button"
                        tabIndex={0}
                        aria-expanded={isOpen}
                        aria-haspopup="listbox"
                        aria-label={`${label} selector`}
                        onClick={() => setOpenUserDropdown(isOpen ? null : field)}
                        onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setOpenUserDropdown(isOpen ? null : field); } }}
                        className="flex min-h-11 w-full cursor-pointer items-center gap-2 rounded-lg border border-secondary bg-primary px-3 py-2 text-left transition hover:border-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                    >
                        <span className="flex min-w-0 flex-1 flex-wrap items-center gap-1.5">
                            {selectedUsers.length ? selectedUsers.map((executive) => (
                                <span key={executive.id} className="inline-flex max-w-full items-center gap-1 rounded-full bg-brand-secondary px-2 py-1 text-xs font-medium text-brand-secondary">
                                    <span className="max-w-32 truncate">{executive.name || executive.id}</span>
                                    <span
                                        role="button"
                                        tabIndex={0}
                                        aria-label={`Remove ${executive.name || executive.id}`}
                                        onClick={(event) => { event.preventDefault(); event.stopPropagation(); toggleUser(field, executive.id); }}
                                        onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); event.stopPropagation(); toggleUser(field, executive.id); } }}
                                        className="rounded-full p-0.5 hover:bg-primary/40 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand"
                                    ><XClose className="size-3" aria-hidden="true" /></span>
                                </span>
                            )) : <span className="text-sm text-tertiary">{loadingLookups ? "Loading users..." : "Select users"}</span>}
                        </span>
                        <ChevronDown className={`size-5 shrink-0 text-tertiary transition ${isOpen ? "rotate-180" : ""}`} aria-hidden="true" />
                    </div>
                    {isOpen && <div role="listbox" aria-multiselectable="true" aria-label={label} className="absolute z-20 mt-2 max-h-56 w-full overflow-y-auto rounded-lg border border-secondary bg-primary p-2 shadow-lg">
                        {loadingLookups ? <p className="px-2 py-3 text-sm text-tertiary">Loading users...</p> : salesExecutives.length ? salesExecutives.map((executive) => {
                            const checked = form[field].includes(executive.id);
                            return <label key={executive.id} className={`flex min-h-10 cursor-pointer items-center gap-3 rounded-lg px-2 py-2 transition ${checked ? "bg-brand-secondary" : "hover:bg-primary_hover"}`}><input type="checkbox" checked={checked} onChange={() => toggleUser(field, executive.id)} className="size-4 rounded border-secondary accent-[#7754d6]" /><span className="min-w-0 flex-1 truncate text-sm text-primary">{executive.name || executive.id}</span></label>;
                        }) : <p className="px-2 py-3 text-sm text-tertiary">No sales executives found</p>}
                    </div>}
                </div>
            </fieldset>
        );
    };

    return (
        <ModalOverlay isOpen={isOpen} isDismissable={!saving} onOpenChange={(open) => { if (!open && !saving) onClose(); }}>
            <Modal className="w-full max-w-3xl overflow-hidden rounded-2xl bg-primary shadow-xl ring-1 ring-secondary">
                <Dialog aria-label="Create Campaign" className="max-h-[calc(100dvh-2rem)] items-stretch sm:max-h-[calc(100dvh-4rem)]">
                    <div className="flex min-h-0 w-full flex-col">
                        <header className="flex shrink-0 items-center justify-between gap-4 border-b border-secondary px-5 py-4 sm:px-6">
                            <div className="flex min-w-0 items-center gap-3"><h2 className="truncate text-lg font-semibold text-primary">Create Campaign</h2><Button color="secondary" size="sm" iconLeading={InfoCircle}>Learn More</Button></div>
                            <CloseButton onPress={onClose} isDisabled={saving} />
                        </header>
                        <div className="min-h-0 flex-1 space-y-6 overflow-y-auto px-5 py-5 sm:px-6">
                            <section className="grid gap-4 sm:grid-cols-2">
                                <Input label="Name" isRequired placeholder="Enter campaign name" value={form.title} onChange={(value) => { setForm((current) => ({ ...current, title: value })); setErrors((current) => ({ ...current, title: "" })); }} onBlur={() => setDirty((current) => ({ ...current, title: true }))} isInvalid={Boolean(dirty.title && errors.title)} hint={dirty.title ? errors.title : undefined} />
                                <Select label="Pipeline" isRequired aria-label="Pipeline" placeholder={loadingLookups ? "Loading pipelines..." : "Select Pipeline"} selectedKey={form.pipeline || null} onSelectionChange={(key) => { setForm((current) => ({ ...current, pipeline: optionalKey(key) })); setErrors((current) => ({ ...current, pipeline: "" })); }} items={pipelineList.map((item) => ({ id: item.id, label: item.title || item.id }))} isDisabled={loadingLookups} isInvalid={Boolean(dirty.pipeline && errors.pipeline)} hint={dirty.pipeline ? errors.pipeline : undefined}>{(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}</Select>
                            </section>
                            <section className="grid gap-4 sm:grid-cols-2">
                                {userSelector("managingCampaign", "Who will manage this campaign?", "Choose one or more campaign managers.")}
                                {userSelector("salesExecutive", "Select Agents", "Choose agents who will receive campaign leads.")}
                            </section>
                            <fieldset>
                                <legend className="text-sm font-semibold text-primary">Lead Distribution</legend>
                                <div className="mt-3 grid gap-3 sm:grid-cols-3">{distributionTypeList.map((type) => <label key={type.id} aria-disabled={type.disabled} className={`relative flex min-h-32 items-start gap-3 rounded-xl border p-4 transition ${type.disabled ? "cursor-not-allowed border-secondary bg-disabled_subtle opacity-60" : form.distributionType === type.id ? "cursor-pointer border-brand bg-brand-secondary" : "cursor-pointer border-secondary bg-primary hover:bg-primary_hover"}`}><input type="radio" name="campaign-distribution" value={type.id} checked={form.distributionType === type.id} disabled={type.disabled} onChange={() => setForm((current) => ({ ...current, distributionType: type.id }))} className="mt-0.5 size-4 accent-[#7754d6]" /><span><span className="block text-sm font-semibold text-primary">{type.label}</span><span className="mt-1 block text-xs leading-5 text-tertiary">{type.desc}</span>{type.disabled && <span className="mt-2 inline-block rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-tertiary">Coming soon</span>}</span></label>)}</div>
                            </fieldset>
                            <details className="group rounded-xl border border-secondary bg-primary" open>
                                <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-4 text-sm font-semibold text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"><span className="flex items-center gap-2">Additional Settings <InfoCircle className="size-4 text-brand-secondary" /></span><ChevronDown className="size-5 text-tertiary transition group-open:rotate-180" /></summary>
                                <div className="space-y-5 border-t border-secondary px-4 py-4">
                                    <div><Label>Priority</Label><div className="mt-1.5"><Select aria-label="Priority" placeholder="Select Priority" selectedKey={form.additionalSetting.priority || null} onSelectionChange={(key) => setForm((current) => ({ ...current, additionalSetting: { ...current.additionalSetting, priority: optionalKey(key) } }))} items={priorityList}>{(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}</Select></div></div>
                                    <div><h3 className="text-sm font-semibold text-primary">Lead Duplicacy</h3><div className="mt-3 grid gap-4 sm:grid-cols-2"><Select label="Check for Duplicates" placeholder="Select Option" selectedKey={form.additionalSetting.checkForDuplicates || null} onSelectionChange={(key) => setForm((current) => ({ ...current, additionalSetting: { ...current.additionalSetting, checkForDuplicates: optionalKey(key) } }))} items={checkForDuplicatesList}>{(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}</Select><Select label="If Duplicate Found" placeholder="Select Option" selectedKey={form.additionalSetting.duplicatesFound || null} onSelectionChange={(key) => setForm((current) => ({ ...current, additionalSetting: { ...current.additionalSetting, duplicatesFound: optionalKey(key) } }))} items={duplicatesFoundList}>{(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}</Select></div></div>
                                </div>
                            </details>
                        </div>
                        <footer className="flex shrink-0 justify-end border-t border-secondary bg-primary px-5 py-4 sm:px-6"><Button size="md" isLoading={saving} onClick={handleCreate}>Create</Button></footer>
                    </div>
                </Dialog>
            </Modal>
        </ModalOverlay>
    );
}

export default function LeadDashboardPage() {
    const navigate = useNavigate();
    const { showSnackbar } = useStoreSnackbar();
    const [range, setRange] = useState("7");
    const [draftRange, setDraftRange] = useState("7");
    const [customFrom, setCustomFrom] = useState("");
    const [customTo, setCustomTo] = useState("");
    const [appliedCustomRange, setAppliedCustomRange] = useState<{ from: string; to: string } | null>(null);
    const [isDateMenuOpen, setIsDateMenuOpen] = useState(false);
    const [dateError, setDateError] = useState("");
    const dateMenuRef = useRef<HTMLDivElement>(null);
    const [pipeline, setPipeline] = useState("");
    const [campaign, setCampaign] = useState("");
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [pinSaving, setPinSaving] = useState(false);
    const [unpinTarget, setUnpinTarget] = useState<{ id: string; title: string } | null>(null);
    const [isPinPickerOpen, setIsPinPickerOpen] = useState(false);
    const [isCreateCampaignOpen, setIsCreateCampaignOpen] = useState(false);
    const [dashboardRefreshKey, setDashboardRefreshKey] = useState(0);

    useEffect(() => {
        const now = new Date();
        let from = new Date(now);
        let to = now;
        if (range === "month") from.setDate(1);
        else if (range === "yesterday") {
            from.setDate(now.getDate() - 1);
            to = new Date(from);
        } else if (range === "7" || range === "30") from.setDate(now.getDate() - Number(range) + 1);
        else if (range === "custom") {
            if (!appliedCustomRange) return;
            setLoading(true);
            getLeadDashboard({ from: appliedCustomRange.from, to: appliedCustomRange.to, pipeline: pipeline || undefined, campaign: campaign || undefined })
                .then(setData).catch(() => setData(null)).finally(() => setLoading(false));
            return;
        }
        setLoading(true);
        getLeadDashboard({ from: formatLocalDate(from), to: formatLocalDate(to), pipeline: pipeline || undefined, campaign: campaign || undefined })
            .then(setData).catch(() => setData(null)).finally(() => setLoading(false));
    }, [range, appliedCustomRange, pipeline, campaign, dashboardRefreshKey]);

    useEffect(() => {
        if (!isDateMenuOpen) return;
        const handleOutsideClick = (event: MouseEvent) => {
            if (!dateMenuRef.current?.contains(event.target as Node)) setIsDateMenuOpen(false);
        };
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") setIsDateMenuOpen(false);
        };
        document.addEventListener("mousedown", handleOutsideClick);
        document.addEventListener("keydown", handleEscape);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
            document.removeEventListener("keydown", handleEscape);
        };
    }, [isDateMenuOpen]);

    const selectedRangeLabel = rangeOptions.find((option) => option.id === range)?.label || "Last 7 days";
    const selectPreset = (id: string) => {
        setDraftRange(id);
        setRange(id);
        setAppliedCustomRange(null);
        setDateError("");
        setIsDateMenuOpen(false);
    };
    const applyCustomRange = () => {
        if (!customFrom || !customTo) {
            setDateError("Select both dates.");
            return;
        }
        if (customFrom > customTo) {
            setDateError("From date must be on or before To date.");
            return;
        }
        setAppliedCustomRange({ from: customFrom, to: customTo });
        setDraftRange("custom");
        setRange("custom");
        setDateError("");
        setIsDateMenuOpen(false);
    };

    const stages = data?.stages || [];
    const pins = data?.pinnedCampaigns || [];
    const pinnedIds = new Set(pins.map((item: any) => String(item.id)));
    const handlePinToggle = async (campaignId: string, pinned: boolean) => {
        if (pinSaving) return;
        setPinSaving(true);
        try {
            const pinnedCampaigns = await pinCampaign(campaignId, pinned);
            setData((current: any) => ({ ...current, pinnedCampaigns }));
            showSnackbar({ title: pinned ? "Campaign pinned" : "Campaign unpinned", description: "Your pinned campaigns are updated and saved to your account.", color: "success" });
        } catch (error: any) {
            showSnackbar({ title: "Error", description: error?.message || "Failed to update pinned campaigns", color: "danger" });
        } finally {
            setPinSaving(false);
            setUnpinTarget(null);
            setIsPinPickerOpen(false);
        }
    };
    const cards = "rounded-2xl border border-secondary bg-primary shadow-xs";
    const quickLinks = [
        { title: "User Call Report", path: "/lead-management/reports", icon: Phone01 },
        { title: "User Login Report", path: "/lead-management/reports", icon: User01 },
        { title: "Upload Excel Sheet", path: "/lead-management/leads?upload=1", icon: UploadCloud01 },
        { title: "Create Campaign", icon: Plus, onClick: () => setIsCreateCampaignOpen(true) },
    ];
    const connectionRate = Math.min(100, Math.max(0, Number(data?.callOverview?.percentage || 0)));

    return (
        <DefaultLayout>
            <div className="flex w-full flex-col">
                <div className="grid gap-4 xl:grid-cols-3 xl:items-start">
                    <div className="space-y-4 xl:col-span-2">
                        <div className="grid gap-4 lg:grid-cols-[1.55fr_1fr]">
                            <section className={`${cards} p-5`}>
                                <div className="flex items-start justify-between gap-3"><div><h2 className="text-base font-semibold text-primary">Call Overview</h2><p className="mt-1 text-xs text-tertiary">Connected calls during selected period</p></div><div ref={dateMenuRef} className="relative"><button type="button" aria-haspopup="listbox" aria-expanded={isDateMenuOpen} onClick={() => setIsDateMenuOpen((open) => !open)} className="flex min-h-10 w-40 items-center justify-between gap-2 rounded-lg border border-primary bg-primary px-3 py-2 text-left text-xs font-medium text-primary shadow-xs"><span>{selectedRangeLabel}</span><ChevronDown className={`size-4 transition-transform ${isDateMenuOpen ? "rotate-180" : ""}`} /></button>{isDateMenuOpen && <div className="absolute right-0 z-20 mt-2 w-72 rounded-xl border border-secondary bg-primary p-4 shadow-lg"><p className="text-sm font-semibold text-primary">Choose Date</p><div className="mt-3 space-y-1" role="listbox" aria-label="Date range">{rangeOptions.map((option) => <label key={option.id} className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2 text-sm text-secondary hover:bg-primary_hover"><input type="radio" name="dashboard-date-range" value={option.id} checked={draftRange === option.id} onChange={() => option.id === "custom" ? (setDraftRange("custom"), setDateError("")) : selectPreset(option.id)} className="size-4 accent-[#7754d6]" />{option.label}</label>)}</div>{draftRange === "custom" && <div className="mt-3 space-y-3 border-t border-secondary pt-3"><label className="block text-xs font-medium text-secondary">From<input type="date" value={customFrom} onChange={(event) => setCustomFrom(event.target.value)} className="mt-1 w-full rounded-lg border border-primary bg-primary px-3 py-2 text-sm text-primary" /></label><label className="block text-xs font-medium text-secondary">To<input type="date" value={customTo} onChange={(event) => setCustomTo(event.target.value)} className="mt-1 w-full rounded-lg border border-primary bg-primary px-3 py-2 text-sm text-primary" /></label>{dateError && <p className="text-xs text-error-primary">{dateError}</p>}<button type="button" onClick={applyCustomRange} className="w-full rounded-lg bg-[#7754d6] px-3 py-2 text-sm font-semibold text-white hover:bg-[#6846c7]">Update</button></div>}</div>}</div></div>
                                <div className="mt-6 flex items-center justify-center gap-7 sm:justify-between"><div className="relative h-28 w-52 overflow-hidden"><div className="absolute inset-x-0 top-0 h-52 rounded-full" style={{ background: `conic-gradient(from 270deg, #7754d6 0deg ${connectionRate * 1.8}deg, #e7ddff ${connectionRate * 1.8}deg 180deg, transparent 180deg)` }} /><div className="absolute left-4 right-4 top-4 h-44 rounded-full bg-primary" /><div className="absolute inset-x-0 top-12 text-center"><span className="text-3xl font-semibold text-primary">{connectionRate}%</span><p className="text-xs text-tertiary">Connected</p></div></div><div className="grid grid-cols-2 gap-6 text-center"><div><p className="text-2xl font-semibold text-primary">{data?.callOverview?.connected || 0}</p><p className="text-xs text-tertiary">Connected</p></div><div><p className="text-2xl font-semibold text-primary">{data?.callOverview?.total || 0}</p><p className="text-xs text-tertiary">Total calls</p></div></div></div>
                                <button type="button" onClick={() => navigate("/lead-management/reports")} className="mt-1 text-xs font-semibold text-brand-secondary hover:underline">View Report</button>
                            </section>
                            <div className="grid grid-cols-2 gap-4 lg:grid-cols-1">
                                <section className={`${cards} p-4`}><div className="flex items-center gap-2"><span className="rounded-lg bg-success-secondary p-2"><User01 className="size-4 text-success-primary" /></span><h2 className="text-sm font-semibold text-primary">Agent Activity</h2></div><p className="mt-4 text-2xl font-semibold text-primary">{data?.agentActivity?.active || 0}<span className="text-sm font-normal text-tertiary">/{data?.agentActivity?.total || 0}</span></p><p className="text-xs text-tertiary">Active agents</p></section>
                                <section className={`${cards} p-4`}><div className="flex items-center gap-2"><span className="rounded-lg bg-warning-secondary p-2"><Settings01 className="size-4 text-warning-primary" /></span><h2 className="text-sm font-semibold text-primary">Agent Activity</h2></div><p className="mt-4 text-2xl font-semibold text-primary">{data?.agentActivity?.onBreak || 0}<span className="text-sm font-normal text-tertiary">/{data?.agentActivity?.total || 0}</span></p><p className="text-xs text-tertiary">On-break agents</p></section>
                            </div>
                        </div>
                        <section className={`${cards} p-5`}><h2 className="text-base font-semibold text-primary">Tools to Improve Efficiency & Outcomes</h2><div className="mt-4 grid gap-3 md:grid-cols-3">{[{ title: "User Trends", copy: "Track your users' activity", icon: User01, color: "bg-[#e8e0ff] text-[#7754d6]" }, { title: "Business Trend", copy: "Understand your business better", icon: TrendUp01, color: "bg-[#dff7ef] text-[#26936f]" }, { title: "Workflow", copy: "Manage your workflow", icon: Settings01, color: "bg-[#ffe5d7] text-[#d6753c]" }].map(({ title, copy, icon: Icon, color }) => <button key={title} type="button" onClick={() => navigate("/lead-management/reports")} className="flex items-center gap-3 rounded-xl border border-secondary p-3 text-left transition hover:bg-primary_hover"><span className={`rounded-lg p-2.5 ${color}`}><Icon className="size-5" /></span><span><p className="text-sm font-semibold text-primary">{title}</p><p className="mt-1 text-xs text-tertiary">{copy}</p></span></button>)}</div></section>
                        <section className={`${cards} p-5`}><h2 className="text-base font-semibold text-primary">Quick Access</h2><div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{quickLinks.map(({ title, path, icon: Icon, onClick }) => <button key={title} type="button" onClick={() => onClick ? onClick() : path && navigate(path)} className="flex items-center gap-3 rounded-xl border border-secondary p-3 text-left transition hover:bg-primary_hover"><span className="rounded-lg bg-brand-secondary p-2"><Icon className="size-5 text-brand-primary" /></span><span className="flex-1 text-xs font-semibold text-primary">{title}</span><span className="text-lg text-tertiary" aria-hidden="true">›</span></button>)}</div></section>
                        <section className={`${cards} p-5`}><div className="flex items-center justify-between gap-3"><div><h2 className="text-base font-semibold text-primary">Pinned Campaigns</h2><p className="mt-1 text-xs text-tertiary">Campaigns you need close at hand</p></div><div className="flex items-center gap-3"><button type="button" className="text-xs font-semibold text-brand-secondary hover:underline" onClick={() => navigate("/lead-management/campaign")}>Campaigns Report</button><Button aria-label="Pin campaign" size="sm" color="secondary" iconLeading={Plus} onClick={() => setIsPinPickerOpen(true)} /></div></div><div className="mt-4 divide-y divide-secondary">{pins.length ? pins.map((item: any) => <div key={item.id} className="flex items-center gap-3 py-3"><span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#eee7ff] text-sm font-semibold text-brand-primary">{String(item.title || "C").charAt(0).toUpperCase()}</span><p className="min-w-0 flex-1 truncate text-sm font-semibold text-primary">{item.title}</p><button type="button" aria-label={`Unpin ${item.title}`} className="rounded-lg p-2 text-tertiary hover:bg-primary_hover" onClick={() => setUnpinTarget({ id: String(item.id), title: item.title })}><Trash01 className="size-4" /></button></div>) : <p className="py-6 text-center text-sm text-tertiary">No pinned campaigns yet. Use + to pin one.</p>}<button type="button" onClick={() => navigate("/lead-management/campaign")} className="w-full pt-4 text-center text-xs font-semibold text-brand-secondary hover:underline">View All Campaigns</button></div></section>
                    </div>
                    <section className={`${cards} p-5 xl:min-h-[742px]`}><div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center"><div><h2 className="text-base font-semibold text-primary">Leads by Stage</h2><p className="mt-1 text-xs text-tertiary">Distribution across your sales pipeline</p></div><div className="flex gap-2"><select aria-label="Pipeline" value={pipeline} onChange={(e) => { setPipeline(e.target.value); setCampaign(""); }} className="max-w-32 rounded-lg border border-primary bg-primary px-2 py-2 text-xs text-primary"><option value="">All pipelines</option>{(data?.pipelines || []).map((p: any) => <option key={p.id} value={p.id}>{p.title}</option>)}</select><select aria-label="Campaign" value={campaign} onChange={(e) => setCampaign(e.target.value)} className="max-w-32 rounded-lg border border-primary bg-primary px-2 py-2 text-xs text-primary"><option value="">All campaigns</option>{(data?.campaigns || []).filter((c: any) => !pipeline || String(c.pipeline) === pipeline).map((c: any) => <option key={c.id} value={c.id}>{c.title}</option>)}</select></div></div><div className="mt-6 space-y-3">{loading ? Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-20 animate-pulse rounded-xl bg-secondary" />) : stages.length ? stages.map((stage: any, i: number) => <div key={`${stage.name}-${stage.status}`} className="rounded-xl border border-secondary border-l-4 p-4" style={{ borderLeftColor: ["#7754d6", "#efaa3c", "#37a878", "#e16b83", "#6e9ee8"][i % 5] }}><div className="flex items-center justify-between"><span className="text-2xl font-semibold text-primary">{stage.count}</span><span className="rounded-full bg-brand-secondary px-2 py-1 text-xs font-medium text-brand-secondary">{stage.percentage}%</span></div><p className="mt-2 truncate text-sm font-medium text-secondary">{stage.name}</p></div>) : <p className="py-6 text-center text-sm text-tertiary">No leads found for these filters.</p>}</div></section>
                </div>
                <ModalOverlay isOpen={!!unpinTarget} isDismissable={!pinSaving} onOpenChange={(open) => { if (!open && !pinSaving) setUnpinTarget(null); }}>
                    <Modal className="w-full max-w-md overflow-hidden rounded-2xl bg-primary shadow-xl ring-1 ring-secondary">
                        <Dialog aria-label="Unpin Campaign">
                            <div className="flex min-h-0 w-full flex-col">
                                <header className="flex shrink-0 items-center justify-between gap-4 border-b border-secondary px-5 py-4"><h2 className="text-lg font-semibold text-primary">Unpin Campaign</h2><CloseButton onPress={() => setUnpinTarget(null)} isDisabled={pinSaving} /></header>
                                <div className="space-y-3 px-5 py-4 text-sm"><p className="text-secondary">Are you sure you want to unpin <span className="font-semibold text-primary">({unpinTarget?.title})</span> campaign?</p><p className="text-tertiary">Once unpinned, it will be removed from your pinned list</p></div>
                                <footer className="flex shrink-0 justify-end gap-3 border-t border-secondary px-5 py-4"><Button color="secondary" size="sm" onClick={() => setUnpinTarget(null)} isDisabled={pinSaving}>Close</Button><Button color="primary" size="sm" onClick={() => unpinTarget && handlePinToggle(unpinTarget.id, false)} isDisabled={pinSaving}>{pinSaving ? "Saving..." : "Confirm"}</Button></footer>
                            </div>
                        </Dialog>
                    </Modal>
                </ModalOverlay>
                <ModalOverlay isOpen={isPinPickerOpen} isDismissable={!pinSaving} onOpenChange={(open) => { if (!open && !pinSaving) setIsPinPickerOpen(false); }}>
                    <Modal className="w-full max-w-md overflow-hidden rounded-2xl bg-primary shadow-xl ring-1 ring-secondary">
                        <Dialog aria-label="Pin Campaign">
                            <div className="flex min-h-0 w-full flex-col">
                                <header className="flex shrink-0 items-center justify-between gap-4 border-b border-secondary px-5 py-4"><h2 className="text-lg font-semibold text-primary">Pin Campaign</h2><CloseButton onPress={() => setIsPinPickerOpen(false)} isDisabled={pinSaving} /></header>
                                <div className="max-h-80 overflow-y-auto px-3 py-2">{(data?.campaigns || []).filter((item: any) => !pinnedIds.has(String(item.id))).length ? (data?.campaigns || []).filter((item: any) => !pinnedIds.has(String(item.id))).map((item: any) => <button key={item.id} type="button" disabled={pinSaving} onClick={() => handlePinToggle(String(item.id), true)} className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition hover:bg-primary_hover disabled:opacity-60"><span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#eee7ff] text-sm font-semibold text-brand-primary">{String(item.title || "C").charAt(0).toUpperCase()}</span><span className="min-w-0 flex-1 truncate text-sm font-medium text-primary">{item.title}</span><Plus className="size-4 shrink-0 text-tertiary" aria-hidden="true" /></button>) : <p className="px-2 py-6 text-center text-sm text-tertiary">All campaigns are already pinned.</p>}</div>
                            </div>
                        </Dialog>
                    </Modal>
                </ModalOverlay>
                <CreateCampaignModal
                    isOpen={isCreateCampaignOpen}
                    onClose={() => setIsCreateCampaignOpen(false)}
                    onCreated={() => {
                        setIsCreateCampaignOpen(false);
                        setDashboardRefreshKey((current) => current + 1);
                    }}
                />
            </div>
        </DefaultLayout>
    );
}
