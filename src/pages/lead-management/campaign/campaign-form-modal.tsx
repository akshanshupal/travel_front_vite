import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Label } from "@/components/base/input/label";
import { Select } from "@/components/base/select/select";
import { CloseButton } from "@/components/base/buttons/close-button";
import { Dialog, Modal, ModalOverlay } from "@/components/application/modals/modal";
import { Tooltip, TooltipTrigger } from "@/components/base/tooltip/tooltip";
import { useStoreSnackbar } from "@/store/snackbar";
import { useStoreLogin } from "@/store/login";
import { addCampaign, getCampaignById, updateCampaignById } from "@/utils/services/campaignService";
import { getSalesEx } from "@/utils/services/salesService";
import { getPipeline } from "@/utils/services/pipelineService";
import { InfoCircle, PlayCircle, ChevronDown } from "@untitledui/icons";
import { useEffect, useState } from "react";

type LookupItem = { id: string; name?: string; title?: string };

const asArray = (value: any) => (Array.isArray(value) ? value : []);
const getId = (value: any) => String(value?.id ?? value?._id ?? value ?? "").trim();
const optionalKey = (key: unknown): string => {
    const value = key == null ? "" : String(key);
    return value === "__none__" ? "" : value;
};

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
    {
        id: "onDemand",
        label: "On Demand",
        desc: "Leads stay unassigned until a user assigns it to themselves or clicks Start Calling, then the system assigns ten leads at a time.",
    },
    { id: "equal", label: "Equal", desc: "Distributes leads equally among all agents in the campaign, ensuring fair allocation." },
    { id: "conditional", label: "Conditional", desc: "Assigns leads based on set conditions, ensuring the right leads go to the right agents." },
];

type CampaignFormState = {
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

const EMPTY_FORM: CampaignFormState = {
    title: "",
    pipeline: "",
    managingCampaign: [],
    salesExecutive: [],
    distributionType: "onDemand",
    additionalSetting: { priority: "", checkForDuplicates: "", duplicatesFound: "" },
    status: true,
};

type Props = {
    isOpen: boolean;
    onClose: () => void;
    /** Campaign record to edit; null/undefined for create mode */
    campaign?: { id?: string } | null;
    /** Pipeline preselected in create mode (e.g. from pipeline view page) */
    defaultPipelineId?: string;
    onSaved?: (campaign: any, mode: "create" | "edit") => void;
};

export function CampaignFormModal({ isOpen, onClose, campaign, defaultPipelineId, onSaved }: Props) {
    const editId = getId(campaign);
    const isEdit = Boolean(editId);
    const { showSnackbar } = useStoreSnackbar();
    const userName = useStoreLogin((s) => s.user?.name || "");

    const [form, setForm] = useState<CampaignFormState>(EMPTY_FORM);
    const [titleError, setTitleError] = useState("");
    const [saving, setSaving] = useState(false);
    const [loadingLookups, setLoadingLookups] = useState(true);
    const [loadingCampaign, setLoadingCampaign] = useState(false);
    const [salesExecutives, setSalesExecutives] = useState<LookupItem[]>([]);
    const [pipelineList, setPipelineList] = useState<LookupItem[]>([]);
    const [showAdditional, setShowAdditional] = useState(false);

    const execName = (id: string) => {
        const found = salesExecutives.find((x) => x.id === id);
        return found?.name || found?.title || id;
    };

    useEffect(() => {
        if (!isOpen) return;
        let active = true;
        const run = async () => {
            setLoadingLookups(true);
            try {
                const [salesRes, pipelineRes] = await Promise.all([getSalesEx({ limit: "all" }), getPipeline({ limit: "all" })]);
                if (!active) return;
                const salesResolved = (salesRes as any)?.data ?? salesRes;
                const pipelineResolved = (pipelineRes as any)?.data ?? pipelineRes;
                const salesList = Array.isArray(salesResolved?.data) ? salesResolved.data : Array.isArray(salesResolved) ? salesResolved : asArray(salesResolved?.items);
                const pipelineItems = Array.isArray(pipelineResolved?.data) ? pipelineResolved.data : Array.isArray(pipelineResolved) ? pipelineResolved : asArray(pipelineResolved?.items);
                setSalesExecutives(asArray(salesList).map((it: any) => ({ id: getId(it), name: it?.name || it?.username || "" })).filter((x: any) => x.id));
                setPipelineList(asArray(pipelineItems).map((it: any) => ({ id: getId(it), title: it?.title || "" })).filter((x: any) => x.id));
            } catch (e: any) {
                if (active) showSnackbar({ title: "Error", description: e?.message || "Failed to load data", color: "danger" });
            } finally {
                if (active) setLoadingLookups(false);
            }
        };
        run();
        return () => {
            active = false;
        };
    }, [isOpen, showSnackbar]);

    // Reset the form each time the modal opens
    useEffect(() => {
        if (!isOpen) return;
        setTitleError("");
        setShowAdditional(false);
        if (isEdit) {
            setLoadingCampaign(true);
            let active = true;
            getCampaignById(editId, { populate: "pipeline" })
                .then((res: any) => {
                    if (!active) return;
                    const data = (res as any)?.data ?? res;
                    setForm({
                        title: data?.title || "",
                        pipeline: getId(data?.pipeline),
                        managingCampaign: asArray(data?.managingCampaign).map(getId).filter(Boolean),
                        salesExecutive: asArray(data?.salesExecutive).map(getId).filter(Boolean),
                        distributionType: data?.distributionType || "",
                        additionalSetting: {
                            priority: data?.additionalSetting?.priority || "",
                            checkForDuplicates: data?.additionalSetting?.checkForDuplicates || "",
                            duplicatesFound: data?.additionalSetting?.duplicatesFound || "",
                        },
                        status: data?.status === false || data?.status === "false" ? false : true,
                    });
                })
                .catch((e: any) => {
                    if (active) showSnackbar({ title: "Error", description: e?.message || "Failed to load campaign", color: "danger" });
                })
                .finally(() => {
                    if (active) setLoadingCampaign(false);
                });
            return () => {
                active = false;
            };
        }
        const now = new Date();
        const stamp = now.toLocaleString("en-IN", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit", hour12: false });
        setForm({ ...EMPTY_FORM, pipeline: defaultPipelineId || "", title: `Campaign ${userName} ${stamp}`.replace(/\s+/g, " ").trim() });
    }, [isOpen, isEdit, editId, defaultPipelineId, userName, showSnackbar]);

    const handleSave = async () => {
        if (!form.title.trim()) {
            setTitleError("Title is required");
            return;
        }
        setTitleError("");
        if (saving) return;
        setSaving(true);
        try {
            if (isEdit) {
                await updateCampaignById(editId, {
                    ...form,
                    pipeline: optionalKey(form.pipeline),
                    additionalSetting: {
                        priority: optionalKey(form.additionalSetting.priority),
                        checkForDuplicates: optionalKey(form.additionalSetting.checkForDuplicates),
                        duplicatesFound: optionalKey(form.additionalSetting.duplicatesFound),
                    },
                });
                showSnackbar({ title: "Success", description: "Campaign updated successfully", color: "success" });
            } else {
                await addCampaign(form);
                showSnackbar({ title: "Success", description: "Campaign added successfully", color: "success" });
            }
            onSaved?.({ ...form, id: editId }, isEdit ? "edit" : "create");
            onClose();
        } catch (e: any) {
            showSnackbar({ title: "Error", description: e?.message || (isEdit ? "Failed to update campaign" : "Failed to add campaign"), color: "danger" });
        } finally {
            setSaving(false);
        }
    };

    const toggleMember = (field: "managingCampaign" | "salesExecutive", id: string) => {
        setForm((prev) => {
            const current = prev[field];
            return { ...prev, [field]: current.includes(id) ? current.filter((k) => k !== id) : [...current, id] };
        });
    };

    const renderChipPicker = (field: "managingCampaign" | "salesExecutive", label: string, placeholder: string) => (
        <div className="flex flex-col gap-1.5">
            <Label>{label}</Label>
            <div className="flex min-h-11 flex-wrap items-center gap-1.5 rounded-lg border border-secondary bg-primary px-2.5 py-2">
                {loadingCampaign ? (
                    <span className="text-sm text-tertiary">Loading…</span>
                ) : (
                    form[field].map((id) => (
                        <span key={id} className="flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-primary">
                            <span className="max-w-40 truncate">{execName(id)}</span>
                            <button type="button" onClick={() => toggleMember(field, id)} aria-label={`Remove ${execName(id)}`} className="text-tertiary hover:text-primary">
                                ×
                            </button>
                        </span>
                    ))
                )}
            </div>
            <Select
                aria-label={label}
                selectedKey={null}
                onSelectionChange={(key) => {
                    const id = optionalKey(key);
                    if (id && !form[field].includes(id)) toggleMember(field, id);
                }}
                items={salesExecutives.filter((exec) => !form[field].includes(exec.id)).map((exec) => ({ id: exec.id, label: exec.name || exec.id }))}
                placeholder={placeholder}
                isDisabled={loadingLookups || salesExecutives.length === 0}
                popoverClassName="z-[60]"
            >
                {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
            </Select>
        </div>
    );

    return (
        <ModalOverlay isOpen={isOpen} isDismissable onOpenChange={(open) => { if (!open) onClose(); }}>
            {({ state }) => (
                <Modal className="max-w-2xl">
                    <Dialog>
                        <div className="relative max-h-[90vh] w-full overflow-hidden rounded-xl bg-primary ring-1 ring-secondary">
                            <CloseButton onPress={() => state.close()} className="absolute right-4 top-4" size="sm" />
                            <div className="border-b border-secondary px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <h2 className="text-xl font-semibold text-brand-600">{isEdit ? "Edit Campaign" : "Create Campaign"}</h2>
                                    <span className="flex items-center gap-1.5 rounded-full bg-brand-primary_alt px-3 py-1 text-sm font-medium text-brand-700">
                                        <PlayCircle className="size-4" />
                                        Learn More
                                    </span>
                                </div>
                            </div>

                            <div className="max-h-[calc(90vh-160px)] space-y-5 overflow-y-auto px-6 py-5">
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <Input
                                        label="Name"
                                        placeholder="Enter campaign name"
                                        value={form.title}
                                        onChange={(v) => {
                                            setForm((p) => ({ ...p, title: v }));
                                            if (v.trim()) setTitleError("");
                                        }}
                                        isInvalid={Boolean(titleError)}
                                        hint={titleError || undefined}
                                    />
                                    <Select
                                        label="Pipeline"
                                        aria-label="Pipeline"
                                        placeholder="Select Pipeline"
                                        selectedKey={form.pipeline || null}
                                        onSelectionChange={(key) => setForm((p) => ({ ...p, pipeline: optionalKey(key) }))}
                                        items={pipelineList.map((p) => ({ id: p.id, label: p.title || p.id }))}
                                        isDisabled={loadingLookups}
                                        popoverClassName="z-[60]"
                                    >
                                        {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                    </Select>
                                </div>

                                {renderChipPicker("managingCampaign", "Who will be managing this campaign?", "Select a user to add")}

                                {renderChipPicker("salesExecutive", "Select Agents", "Select an agent to add")}

                                <div className="space-y-3">
                                    <Label>Lead Distribution</Label>
                                    {distributionTypeList.map((type) => (
                                        <label
                                            key={type.id}
                                            className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors ${
                                                form.distributionType === type.id ? "border-brand-500 bg-brand-50 dark:bg-brand-900/20" : "border-secondary bg-primary hover:bg-secondary"
                                            }`}
                                        >
                                            <input
                                                type="radio"
                                                name="campaignDistributionType"
                                                checked={form.distributionType === type.id}
                                                onChange={() => setForm((p) => ({ ...p, distributionType: type.id }))}
                                                className="mt-1"
                                            />
                                            <div>
                                                <div className="text-sm font-semibold text-brand-700">{type.label}</div>
                                                <div className="mt-0.5 text-sm text-tertiary">{type.desc}</div>
                                            </div>
                                        </label>
                                    ))}
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between rounded-xl bg-secondary/40 px-4 py-3">
                                        <span className="flex items-center gap-2 text-base font-semibold text-primary">
                                            Additional Settings
                                            <Tooltip title="Additional Settings" description="Configure priority and duplicate handling for leads in this campaign" placement="top">
                                                <TooltipTrigger>
                                                    <InfoCircle className="size-4 text-fg-quaternary transition duration-200 hover:text-fg-quaternary_hover" />
                                                </TooltipTrigger>
                                            </Tooltip>
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => setShowAdditional((v) => !v)}
                                            aria-expanded={showAdditional}
                                            className="flex items-center gap-1.5 rounded-md px-2 py-1 text-sm font-medium text-secondary transition-colors hover:bg-secondary_alt hover:text-primary"
                                        >
                                            {showAdditional ? "Hide" : "Show"}
                                            <ChevronDown className={`size-4 text-tertiary transition-transform ${showAdditional ? "rotate-180" : ""}`} aria-hidden="true" />
                                        </button>
                                    </div>
                                    {showAdditional && (
                                        <div className="space-y-4">
                                            {([
                                                ["priority", "Priority", "Select Priority", priorityList],
                                                ["checkForDuplicates", "Check for Duplicates", "Select Option", checkForDuplicatesList],
                                                ["duplicatesFound", "Duplicates Found", "Select Option", duplicatesFoundList],
                                            ] as const).map(([field, label, placeholder, items]) => (
                                                <Select
                                                    key={field}
                                                    label={label}
                                                    aria-label={label}
                                                    placeholder={placeholder}
                                                    selectedKey={form.additionalSetting[field] || null}
                                                    onSelectionChange={(key) => setForm((p) => ({ ...p, additionalSetting: { ...p.additionalSetting, [field]: optionalKey(key) } }))}
                                                    items={[{ id: "__none__", label: placeholder }, ...items]}
                                                    popoverClassName="z-[60]"
                                                >
                                                    {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                                </Select>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-end border-t border-secondary px-6 py-4">
                                <Button color="primary" isLoading={saving} isDisabled={loadingCampaign || loadingLookups} onClick={handleSave}>
                                    {isEdit ? "Update" : "Create"}
                                </Button>
                            </div>
                        </div>
                    </Dialog>
                </Modal>
            )}
        </ModalOverlay>
    );
}
