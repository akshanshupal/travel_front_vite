import { DefaultLayout } from "@/layouts/DefaultLayout";
import { TableCard } from "@/components/application/table/table";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Label } from "@/components/base/input/label";
import { Select } from "@/components/base/select/select";
import { useStoreSnackbar } from "@/store/snackbar";
import { addCampaign } from "@/utils/services/campaignService";
import { getSalesEx } from "@/utils/services/salesService";
import { getPipeline } from "@/utils/services/pipelineService";
import { ArrowLeft } from "@untitledui/icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

type LookupItem = { id: string; title?: string; name?: string };

const asArray = (value: any) => (Array.isArray(value) ? value : []);
const getId = (value: any) => String(value?.id ?? value?._id ?? value ?? "").trim();

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
    { id: "onDemand", label: "On Demand", desc: "Leads stay unassigned until a user assigns it or starts calling." },
    { id: "equal", label: "Equal", desc: "Distributes leads equally among all agents in the campaign." },
];

export default function CampaignAddPage() {
    const navigate = useNavigate();
    const { showSnackbar } = useStoreSnackbar();

    const [saving, setSaving] = useState(false);
    const [loadingLookups, setLoadingLookups] = useState(true);
    const [salesExecutives, setSalesExecutives] = useState<LookupItem[]>([]);
    const [pipelineList, setPipelineList] = useState<LookupItem[]>([]);

    const [form, setForm] = useState({
        title: "",
        pipeline: "",
        managingCampaign: [] as string[],
        salesExecutive: [] as string[],
        distributionType: "",
        additionalSetting: {
            priority: "",
            checkForDuplicates: "",
            duplicatesFound: "",
        },
        status: true,
    });

    const [dirty, setDirty] = useState<Record<string, boolean>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        const run = async () => {
            setLoadingLookups(true);
            try {
                const [salesRes, pipelineRes] = await Promise.all([
                    getSalesEx({ limit: "all" }),
                    getPipeline({ limit: "all" }),
                ]);
                const salesResolved = (salesRes as any)?.data ?? salesRes;
                const pipelineResolved = (pipelineRes as any)?.data ?? pipelineRes;
                const salesList = Array.isArray(salesResolved?.data) ? salesResolved.data : Array.isArray(salesResolved) ? salesResolved : asArray(salesResolved?.items);
                const pipelineItems = Array.isArray(pipelineResolved?.data) ? pipelineResolved.data : Array.isArray(pipelineResolved) ? pipelineResolved : asArray(pipelineResolved?.items);
                setSalesExecutives(asArray(salesList).map((it: any) => ({ id: getId(it), name: it?.name || it?.username || "" })).filter((x: any) => x.id));
                setPipelineList(asArray(pipelineItems).map((it: any) => ({ id: getId(it), title: it?.title || "" })).filter((x: any) => x.id));
            } catch (e: any) {
                showSnackbar({ title: "Error", description: e?.message || "Failed to load data", color: "danger" });
            } finally {
                setLoadingLookups(false);
            }
        };
        run();
    }, [showSnackbar]);

    const validate = () => {
        const next: Record<string, string> = {};
        if (!form.title.trim()) next.title = "Title is required";
        setErrors(next);
        if (Object.keys(next).length > 0) {
            showSnackbar({ title: "Validation Error", description: Object.values(next)[0], color: "danger" });
        }
        return Object.keys(next).length === 0;
    };

    const handleMultiSelect = (field: "managingCampaign" | "salesExecutive", key: string) => {
        setForm(prev => {
            const current = prev[field];
            const next = current.includes(key) ? current.filter(k => k !== key) : [...current, key];
            return { ...prev, [field]: next };
        });
    };

    const handleSave = async () => {
        setDirty({ title: true });
        if (!validate()) return;
        if (saving) return;
        setSaving(true);
        try {
            const res = await addCampaign(form);
            if ((res as any)?.error) throw new Error((res as any).error);
            showSnackbar({ title: "Success", description: "Campaign added successfully", color: "success" });
            navigate("/lead-management/campaign");
        } catch (e: any) {
            showSnackbar({ title: "Error", description: e?.message || "Failed to add campaign", color: "danger" });
        } finally {
            setSaving(false);
        }
    };

    const breadcrumbs = (
        <div className="mb-4 rounded-sm border border-secondary bg-primary p-2">
            <div className="flex flex-wrap items-center gap-1 text-sm text-tertiary">
                <button type="button" onClick={() => navigate("/dashboard")} className="rounded-sm px-1 py-0.5 text-primary hover:bg-primary_hover">Home</button>
                <span>/</span>
                <button type="button" onClick={() => navigate("/lead-management/campaign")} className="rounded-sm px-1 py-0.5 text-primary hover:bg-primary_hover">Campaign</button>
                <span>/</span>
                <span className="px-1 py-0.5 text-primary">Add</span>
            </div>
        </div>
    );

    return (
        <DefaultLayout>
            {breadcrumbs}
            <TableCard.Root>
                <TableCard.Header
                    title="Add Campaign"
                    contentTrailing={
                        <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center md:justify-end">
                            <Button color="secondary" iconLeading={ArrowLeft} onClick={() => navigate("/lead-management/campaign")}>Back</Button>
                            <Button color="primary" isLoading={saving} onClick={handleSave}>Save</Button>
                        </div>
                    }
                />

                <div className="space-y-6 bg-primary px-4 py-5 md:px-6">
                    {/* Basic Info */}
                    <div>
                        <h3 className="mb-3 text-sm font-semibold text-primary">Basic Information</h3>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <Input
                                label="Name *"
                                placeholder="Enter campaign name"
                                value={form.title}
                                onChange={(v) => setForm(p => ({ ...p, title: v }))}
                                isInvalid={Boolean(dirty.title && errors.title)}
                                hint={dirty.title && errors.title ? errors.title : undefined}
                            />
                            <div className="flex flex-col gap-1.5">
                                <Label>Pipeline *</Label>
                                <Select
                                    aria-label="Pipeline"
                                    selectedKey={form.pipeline || null}
                                    onChange={undefined}
                                    onSelectionChange={(key) => setForm(p => ({ ...p, pipeline: key ? String(key) : "" }))}
                                    items={[{ id: "__none__", label: "Select Pipeline" }, ...pipelineList.map(p => ({ id: p.id, label: p.title || p.id }))]}
                                    isDisabled={loadingLookups}
                                >
                                    {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                </Select>
                            </div>
                        </div>
                    </div>

                    {/* People */}
                    <div>
                        <h3 className="mb-3 text-sm font-semibold text-primary">Team Assignment</h3>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {/* Managing Campaign (multi-select) */}
                            <div className="flex flex-col gap-1.5">
                                <Label>Who will manage this campaign?</Label>
                                <div className="rounded-lg border border-secondary bg-primary p-3 max-h-48 overflow-y-auto space-y-2">
                                    {loadingLookups ? (
                                        <div className="text-sm text-tertiary">Loading...</div>
                                    ) : salesExecutives.length === 0 ? (
                                        <div className="text-sm text-tertiary">No sales executives found</div>
                                    ) : salesExecutives.map(exec => (
                                        <label key={exec.id} className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={form.managingCampaign.includes(exec.id)}
                                                onChange={() => handleMultiSelect("managingCampaign", exec.id)}
                                                className="rounded border-secondary"
                                            />
                                            <span className="text-sm text-primary">{exec.name || exec.id}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            {/* Sales Executives (multi-select) */}
                            <div className="flex flex-col gap-1.5">
                                <Label>Sales Executives</Label>
                                <div className="rounded-lg border border-secondary bg-primary p-3 max-h-48 overflow-y-auto space-y-2">
                                    {loadingLookups ? (
                                        <div className="text-sm text-tertiary">Loading...</div>
                                    ) : salesExecutives.length === 0 ? (
                                        <div className="text-sm text-tertiary">No sales executives found</div>
                                    ) : salesExecutives.map(exec => (
                                        <label key={exec.id} className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={form.salesExecutive.includes(exec.id)}
                                                onChange={() => handleMultiSelect("salesExecutive", exec.id)}
                                                className="rounded border-secondary"
                                            />
                                            <span className="text-sm text-primary">{exec.name || exec.id}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Lead Distribution */}
                    <div>
                        <h3 className="mb-3 text-sm font-semibold text-primary">Lead Distribution</h3>
                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                            {distributionTypeList.map(type => (
                                <label
                                    key={type.id}
                                    className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors ${
                                        form.distributionType === type.id
                                            ? "border-brand-500 bg-brand-50 dark:bg-brand-900/20"
                                            : "border-secondary bg-primary hover:bg-secondary"
                                    }`}
                                >
                                    <input
                                        type="radio"
                                        name="distributionType"
                                        value={type.id}
                                        checked={form.distributionType === type.id}
                                        onChange={() => setForm(p => ({ ...p, distributionType: type.id }))}
                                        className="mt-0.5"
                                    />
                                    <div>
                                        <div className="text-sm font-medium text-primary">{type.label}</div>
                                        <div className="text-xs text-tertiary">{type.desc}</div>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Additional Settings */}
                    <div>
                        <h3 className="mb-3 text-sm font-semibold text-primary">Additional Settings</h3>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            <div className="flex flex-col gap-1.5">
                                <Label>Priority</Label>
                                <Select
                                    aria-label="Priority"
                                    selectedKey={form.additionalSetting.priority || null}
                                    onChange={undefined}
                                    onSelectionChange={(key) => setForm(p => ({ ...p, additionalSetting: { ...p.additionalSetting, priority: key ? String(key) : "" } }))}
                                    items={[{ id: "__none__", label: "Select Priority" }, ...priorityList.map(p => ({ id: p.id, label: p.label }))]}
                                >
                                    {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                </Select>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <Label>Check for Duplicates</Label>
                                <Select
                                    aria-label="Check for Duplicates"
                                    selectedKey={form.additionalSetting.checkForDuplicates || null}
                                    onChange={undefined}
                                    onSelectionChange={(key) => setForm(p => ({ ...p, additionalSetting: { ...p.additionalSetting, checkForDuplicates: key ? String(key) : "" } }))}
                                    items={[{ id: "__none__", label: "Select Option" }, ...checkForDuplicatesList.map(o => ({ id: o.id, label: o.label }))]}
                                >
                                    {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                </Select>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <Label>Duplicates Found</Label>
                                <Select
                                    aria-label="Duplicates Found"
                                    selectedKey={form.additionalSetting.duplicatesFound || null}
                                    onChange={undefined}
                                    onSelectionChange={(key) => setForm(p => ({ ...p, additionalSetting: { ...p.additionalSetting, duplicatesFound: key ? String(key) : "" } }))}
                                    items={[{ id: "__none__", label: "Select Option" }, ...duplicatesFoundList.map(o => ({ id: o.id, label: o.label }))]}
                                >
                                    {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                </Select>
                            </div>
                        </div>
                    </div>
                </div>
            </TableCard.Root>
        </DefaultLayout>
    );
}
