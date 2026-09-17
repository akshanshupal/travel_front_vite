import { DefaultLayout } from "@/layouts/DefaultLayout";
import { FloatingHeaderTable, TableCard } from "@/components/application/table/table";
import { Tabs } from "@/components/application/tabs/tabs";
import { Dialog, Modal, ModalOverlay } from "@/components/application/modals/modal";
import { CloseButton } from "@/components/base/buttons/close-button";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Input } from "@/components/base/input/input";
import { Label } from "@/components/base/input/label";
import { Select } from "@/components/base/select/select";
import { Toggle } from "@/components/base/toggle/toggle";
import Tmodal from "@/components/utils/Tmodal";
import { useAvailableTableWidth } from "@/hooks/use-available-table-width";
import { useStoreSnackbar } from "@/store/snackbar";
import { addPipeline, getPipeline, getPipelineDelete, updatePipelineById } from "@/utils/services/pipelineService";
import { addContactProperty, getContactProperties, updateContactPropertyById, deleteContactProperty } from "@/utils/services/contactPropertiesService";
import { getCustomColumns, saveCustomColumns } from "@/utils/services/customColumnsService";
import { Check, ChevronDown, ChevronUp, Edit01, Lightbulb01, Plus, Trash01 } from "@untitledui/icons";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

const TABS = [
    { id: "preferences", label: "Preferences" },
    { id: "pipelines", label: "Pipelines" },
    { id: "manageColumns", label: "Manage Columns" },
    { id: "contactProperties", label: "Custom Contact Properties" },
];

const asArray = (value: any) => (Array.isArray(value) ? value : []);
const getItemId = (item: any) => String(item?.id || item?._id || "").trim();
const statusToLabel = (status: any) => {
    if (status === true || status === "true" || status === 1 || status === "1") return "Active";
    if (status === false || status === "false" || status === 0 || status === "0") return "Inactive";
    return "—";
};
const isActive = (status: any) => statusToLabel(status) === "Active";

const LIMIT_OPTIONS = [
    { id: "10", label: "10 / page" },
    { id: "25", label: "25 / page" },
    { id: "50", label: "50 / page" },
];

/* --------------------------- Contact Properties Tab --------------------------- */

const CONTACT_PROPERTY_LIMIT = 20;
const PROPERTY_NAME_MAX = 60;

const propertyDataTypeOptions = [
    { id: "text", label: "Text" },
    { id: "number", label: "Number" },
    { id: "date", label: "Date" },
    { id: "boolean", label: "Yes / No" },
    { id: "email", label: "Email" },
    { id: "phone", label: "Phone" },
    { id: "url", label: "URL" },
];

function ContactPropertiesTab() {
    const showSnackbar = useStoreSnackbar((s) => s.showSnackbar);

    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleteTarget, setDeleteTarget] = useState<any>(null);

    // Add / edit popup
    const [modalOpen, setModalOpen] = useState(false);
    const [editingId, setEditingId] = useState("");
    const [propertyName, setPropertyName] = useState("");
    const [dataType, setDataType] = useState("text");
    const [nameError, setNameError] = useState("");
    const [saving, setSaving] = useState(false);

    const loadProperties = async () => {
        setLoading(true);
        try {
            const res: any = await getContactProperties({ limit: "all" });
            const resolved = res?.data ?? res;
            const list = Array.isArray(resolved?.data) ? resolved.data : Array.isArray(resolved) ? resolved : asArray(resolved?.items);
            setItems(asArray(list).map((it: any) => ({ ...it, id: getItemId(it) })).filter((it: any) => it.id));
        } catch (e: any) {
            showSnackbar({ title: "Error", description: e?.message || "Failed to load contact properties", color: "danger" });
            setItems([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProperties();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const openAddModal = () => {
        setEditingId("");
        setPropertyName("");
        setDataType("text");
        setNameError("");
        setModalOpen(true);
    };

    const openEditModal = (item: any) => {
        setEditingId(getItemId(item));
        setPropertyName(String(item?.label || item?.title || ""));
        setDataType(String(item?.fieldType || item?.dataType?.type || item?.dataType?.key || "text"));
        setNameError("");
        setModalOpen(true);
    };

    const handleSaveProperty = async () => {
        if (!propertyName.trim()) {
            setNameError("Property name is required");
            return;
        }
        if (propertyName.length > PROPERTY_NAME_MAX) {
            setNameError(`Property name cannot be more than ${PROPERTY_NAME_MAX} characters`);
            return;
        }
        setSaving(true);
        try {
            if (editingId) {
                await updateContactPropertyById(editingId, { label: propertyName.trim(), fieldType: dataType });
                showSnackbar({ title: "Success", description: "Property updated successfully", color: "success" });
            } else {
                await addContactProperty({ label: propertyName.trim(), fieldType: dataType, status: true });
                showSnackbar({ title: "Success", description: "Property added successfully", color: "success" });
            }
            setModalOpen(false);
            await loadProperties();
        } catch (e: any) {
            showSnackbar({ title: "Error", description: e?.message || "Failed to save property", color: "danger" });
        } finally {
            setSaving(false);
        }
    };

    const handleToggleStatus = async (item: any) => {
        const id = getItemId(item);
        const nextStatus = !isActive(item?.status);
        setItems((prev) => prev.map((it) => (getItemId(it) === id ? { ...it, status: nextStatus } : it)));
        try {
            await updateContactPropertyById(id, { status: nextStatus });
        } catch (e: any) {
            setItems((prev) => prev.map((it) => (getItemId(it) === id ? { ...it, status: !nextStatus } : it)));
            showSnackbar({ title: "Error", description: e?.message || "Failed to update status", color: "danger" });
        }
    };

    const handleDelete = async () => {
        const id = deleteTarget ? getItemId(deleteTarget) : "";
        if (!id) return;
        try {
            await deleteContactProperty(id);
            showSnackbar({ title: "Deleted", description: "Property deleted successfully", color: "success" });
            setItems((prev) => prev.filter((it) => getItemId(it) !== id));
        } catch (e: any) {
            showSnackbar({ title: "Error", description: e?.message || "Failed to delete", color: "danger" });
        } finally {
            setDeleteTarget(null);
        }
    };

    return (
        <div className="space-y-4">
            <div>
                <h2 className="text-lg font-semibold text-primary">Custom Contact Property</h2>
                <p className="mt-1 text-sm text-tertiary">
                    Create and customize lead properties that fit your business needs. Easily search, filter, and manage leads using criteria that matter to you.
                </p>
            </div>

            <TableCard.Root className="w-full">
                <FloatingHeaderTable>
                    <table className="w-full min-w-[720px] border-collapse text-left">
                        <thead>
                            <tr className="border-b border-secondary">
                                <th className="sticky left-0 z-20 bg-secondary px-5 py-3.5 text-sm font-semibold text-secondary shadow-[4px_0_8px_-6px_rgba(0,0,0,0.35)]">No.</th>
                                <th className="bg-secondary px-5 py-3.5 text-sm font-semibold text-secondary">Property Name</th>
                                <th className="bg-secondary px-5 py-3.5 text-sm font-semibold text-secondary">Data Type</th>
                                <th className="sticky right-0 z-20 border-l border-secondary bg-secondary px-5 py-3.5 text-right text-sm font-semibold text-secondary shadow-[-4px_0_8px_-6px_rgba(0,0,0,0.35)]">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                Array.from({ length: 3 }).map((_, i) => (
                                    <tr key={`skeleton-${i}`} className="border-b border-secondary">
                                        <td colSpan={4} className="px-5 py-4">
                                            <div className="h-4 w-2/3 animate-pulse rounded bg-secondary" />
                                        </td>
                                    </tr>
                                ))
                            ) : items.length ? (
                                items.map((item, index) => (
                                    <tr key={getItemId(item)} className="border-b border-secondary bg-primary hover:bg-secondary/20">
                                        <td className="sticky left-0 z-10 bg-primary px-5 py-4 text-sm text-tertiary shadow-[4px_0_8px_-6px_rgba(0,0,0,0.35)]">{index + 1}</td>
                                        <td className="px-5 py-4 text-sm font-medium text-primary">{item?.label || item?.title || "—"}</td>
                                        <td className="px-5 py-4">
                                            <span className="rounded bg-secondary px-2 py-0.5 text-xs text-secondary">
                                                {item?.fieldType || item?.dataType?.type || item?.dataType?.key || "—"}
                                            </span>
                                        </td>
                                        <td className="sticky right-0 z-10 border-l border-secondary bg-primary px-5 py-4 shadow-[-4px_0_8px_-6px_rgba(0,0,0,0.35)]">
                                            <div className="flex items-center justify-end gap-3">
                                                <Toggle
                                                    aria-label={`Toggle ${item?.label || item?.title || "property"}`}
                                                    isSelected={isActive(item?.status)}
                                                    onChange={() => handleToggleStatus(item)}
                                                />
                                                <ButtonUtility
                                                    tooltip="Edit"
                                                    tooltipPlacement="bottom"
                                                    icon={Edit01}
                                                    onClick={() => openEditModal(item)}
                                                    color="secondary"
                                                    size="sm"
                                                />
                                                <ButtonUtility
                                                    tooltip="Delete"
                                                    tooltipPlacement="bottom"
                                                    icon={Trash01}
                                                    onClick={() => setDeleteTarget(item)}
                                                    color="error"
                                                    size="sm"
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr className="bg-primary">
                                    <td colSpan={4} className="px-5 py-10 text-center text-sm text-tertiary">
                                        No custom contact properties yet. Click "Add New Property" to create one.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </FloatingHeaderTable>
                <div className="flex items-center gap-2 border-t border-secondary bg-secondary/20 px-5 py-3.5">
                    <Lightbulb01 className="size-4 text-amber-500" />
                    <span className="text-sm text-secondary">
                        You have added {items.length}/{CONTACT_PROPERTY_LIMIT} custom contact property.
                    </span>
                </div>
            </TableCard.Root>

            <Button
                color="primary"
                iconLeading={Plus}
                isDisabled={items.length >= CONTACT_PROPERTY_LIMIT}
                onClick={openAddModal}
            >
                Add New Property
            </Button>
            {items.length >= CONTACT_PROPERTY_LIMIT && (
                <p className="text-xs text-tertiary">Limit of {CONTACT_PROPERTY_LIMIT} custom contact properties reached.</p>
            )}

            {/* Add / Edit popup */}
            <ModalOverlay isOpen={modalOpen} isDismissable onOpenChange={(open) => { if (!open) setModalOpen(false); }}>
                {({ state }) => (
                    <Modal className="max-w-xl w-full">
                        <Dialog>
                            <div className="relative w-full rounded-xl bg-primary p-6 ring-1 ring-secondary">
                                <CloseButton onPress={() => state.close()} className="absolute right-5 top-5" size="sm" />
                                <h2 className="mb-5 text-xl font-bold text-brand-800 dark:text-brand-300">
                                    {editingId ? "Edit Custom Property" : "Add Custom Property"}
                                </h2>
                                <div className="space-y-5">
                                    <div className="flex flex-col gap-1.5">
                                        <Label>Property Name</Label>
                                        <Input
                                            placeholder="Enter"
                                            value={propertyName}
                                            onChange={(value) => {
                                                setPropertyName(value);
                                                if (!value.trim()) setNameError("Property name is required");
                                                else if (value.length > PROPERTY_NAME_MAX) setNameError(`Property name cannot be more than ${PROPERTY_NAME_MAX} characters`);
                                                else setNameError("");
                                            }}
                                            isInvalid={Boolean(nameError)}
                                            hint={nameError || undefined}
                                        />
                                        <span className={`self-end text-xs ${propertyName.length > PROPERTY_NAME_MAX ? "font-medium text-error" : "text-tertiary"}`}>
                                            {propertyName.length}/{PROPERTY_NAME_MAX}
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <Label>Data Type</Label>
                                        <Select
                                            aria-label="Data Type"
                                            selectedKey={dataType}
                                            onSelectionChange={(key) => setDataType(String(key))}
                                            items={propertyDataTypeOptions}
                                        >
                                            {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                        </Select>
                                    </div>
                                </div>
                                <div className="mt-6 flex justify-end">
                                    <Button
                                        color="primary"
                                        isLoading={saving}
                                        isDisabled={!propertyName.trim() || propertyName.length > PROPERTY_NAME_MAX}
                                        onClick={handleSaveProperty}
                                    >
                                        Save
                                    </Button>
                                </div>
                            </div>
                        </Dialog>
                    </Modal>
                )}
            </ModalOverlay>

            <Tmodal
                isOpen={Boolean(deleteTarget)}
                onClose={() => setDeleteTarget(null)}
                onConfirm={handleDelete}
                header="Delete Property"
                content={`<p>Are you sure you want to delete this property: <b>${String(deleteTarget?.label || deleteTarget?.title || "")}</b> ?</p>`}
            />
        </div>
    );
}

/* ------------------------------ Pipelines Tab ------------------------------ */

type StageDraft = {
    name: string;
    tags: string[];
    additional?: { transitions?: string[] };
};

type PipelineDraft = {
    initialStage: StageDraft;
    otherStages: StageDraft[];
    convertedStage: StageDraft;
    rejectedStage: StageDraft;
};

type StageKey = "initialStage" | "convertedStage" | "rejectedStage" | `otherStages.${number}`;

const PIPELINE_COLORS = [
    "#EF4444",
    "#F97316",
    "#F59E0B",
    "#10B981",
    "#14B8A6",
    "#3B82F6",
    "#8B5CF6",
    "#EC4899",
    "#6B7280",
];

const toStageDraft = (raw: any, fallbackName: string): StageDraft => ({
    name: String(raw?.name || fallbackName),
    tags: asArray(raw?.tags).map((t: any) => String(t)),
    additional: raw?.additional ? { transitions: asArray(raw.additional.transitions).map((t: any) => String(t)) } : undefined,
});

const toPipelineDraft = (p: any): PipelineDraft => ({
    initialStage: toStageDraft(p?.initialStage, "Open"),
    otherStages: asArray(p?.otherStages).map((s: any, i: number) => toStageDraft(s, `Stage ${i + 1}`)),
    convertedStage: toStageDraft(p?.convertedStage, "Sales Converted"),
    rejectedStage: toStageDraft(p?.rejectedStage, "Rejected"),
});

function PipelinesTab() {
    const showSnackbar = useStoreSnackbar((s) => s.showSnackbar);

    const [pipelines, setPipelines] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedId, setSelectedId] = useState("");
    const [draft, setDraft] = useState<PipelineDraft | null>(null);
    const [selectedKey, setSelectedKey] = useState<StageKey>("initialStage");
    const [tagInput, setTagInput] = useState("");
    const [showAdditional, setShowAdditional] = useState(true);
    const [savingStage, setSavingStage] = useState(false);

    const [updateOpen, setUpdateOpen] = useState(false);
    const [updateName, setUpdateName] = useState("");
    const [updateColor, setUpdateColor] = useState("");
    const [colorOpen, setColorOpen] = useState(false);
    const [savingPipeline, setSavingPipeline] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState<any>(null);
    const [createOpen, setCreateOpen] = useState(false);
    const [createName, setCreateName] = useState("");
    const [createColor, setCreateColor] = useState("");
    const [createColorOpen, setCreateColorOpen] = useState(false);
    const [creatingPipeline, setCreatingPipeline] = useState(false);

    const builtForRef = useRef<string>("");

    useEffect(() => {
        const run = async () => {
            setLoading(true);
            try {
                const res: any = await getPipeline({ limit: "all" });
                const resolved = res?.data ?? res;
                const list = Array.isArray(resolved?.data) ? resolved.data : Array.isArray(resolved) ? resolved : asArray(resolved?.items);
                setPipelines(asArray(list).map((it: any) => ({ ...it, id: getItemId(it) })).filter((it: any) => it.id));
            } catch (e: any) {
                showSnackbar({ title: "Error", description: e?.message || "Failed to load pipelines", color: "danger" });
                setPipelines([]);
            } finally {
                setLoading(false);
            }
        };
        run();
    }, [showSnackbar]);

    // Default to the first pipeline (index 0)
    useEffect(() => {
        if (!selectedId && pipelines.length) setSelectedId(getItemId(pipelines[0]));
    }, [pipelines, selectedId]);

    // Build an editable draft whenever the selected pipeline changes
    useEffect(() => {
        if (!selectedId || builtForRef.current === selectedId) return;
        const p = pipelines.find((x) => getItemId(x) === selectedId);
        if (!p) return;
        setDraft(toPipelineDraft(p));
        setSelectedKey("initialStage");
        setTagInput("");
        builtForRef.current = selectedId;
    }, [pipelines, selectedId]);

    const selectedPipeline = pipelines.find((p) => getItemId(p) === selectedId);

    const getStage = (key: StageKey): StageDraft | null => {
        if (!draft) return null;
        if (key === "initialStage") return draft.initialStage;
        if (key === "convertedStage") return draft.convertedStage;
        if (key === "rejectedStage") return draft.rejectedStage;
        return draft.otherStages[Number(key.split(".")[1])] || null;
    };

    const isOtherStage = selectedKey.startsWith("otherStages.");
    const selectedStage = getStage(selectedKey);
    const isFixedStage = selectedKey === "convertedStage" || selectedKey === "rejectedStage";

    const allStageNames = useMemo(() => {
        if (!draft) return [];
        const names = [draft.initialStage.name, ...draft.otherStages.map((s) => s.name), draft.convertedStage.name, draft.rejectedStage.name];
        const exclude = getStage(selectedKey)?.name;
        return [...new Set(names.filter(Boolean))].filter((n) => n !== exclude);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [draft, selectedKey]);

    const tagPool = useMemo(() => {
        if (!draft) return [];
        const all = [draft.initialStage, ...draft.otherStages, draft.convertedStage, draft.rejectedStage].flatMap((s) => s.tags);
        return [...new Set(all)].sort((a, b) => a.localeCompare(b));
    }, [draft]);

    const updateSelectedStage = (patch: Partial<StageDraft>) => {
        setDraft((prev) => {
            if (!prev) return prev;
            if (selectedKey === "initialStage") return { ...prev, initialStage: { ...prev.initialStage, ...patch } };
            if (selectedKey === "convertedStage") return { ...prev, convertedStage: { ...prev.convertedStage, ...patch } };
            if (selectedKey === "rejectedStage") return { ...prev, rejectedStage: { ...prev.rejectedStage, ...patch } };
            const idx = Number(selectedKey.split(".")[1]);
            const stages = [...prev.otherStages];
            if (!stages[idx]) return prev;
            stages[idx] = { ...stages[idx], ...patch };
            return { ...prev, otherStages: stages };
        });
    };

    const persistStages = async (next: PipelineDraft) => {
        if (!selectedId) return;
        setSavingStage(true);
        try {
            await updatePipelineById(selectedId, {
                initialStage: next.initialStage,
                otherStages: next.otherStages,
                convertedStage: next.convertedStage,
                rejectedStage: next.rejectedStage,
            });
            setPipelines((prev) => prev.map((p) => (getItemId(p) === selectedId ? { ...p, ...next } : p)));
            showSnackbar({ title: "Success", description: "Pipeline stages saved", color: "success" });
        } catch (e: any) {
            showSnackbar({ title: "Error", description: e?.message || "Failed to save stages", color: "danger" });
        } finally {
            setSavingStage(false);
        }
    };

    const handleSaveStage = async () => {
        if (!draft) return;
        await persistStages(draft);
    };

    // "+" between stages inserts a new stage into otherStages
    const handleAddStage = (afterIdx: number) => {
        if (!draft) return;
        const stages = [...draft.otherStages];
        const insertAt = afterIdx + 1;
        stages.splice(insertAt, 0, { name: "New Stage", tags: [], additional: { transitions: [] } });
        setDraft({ ...draft, otherStages: stages });
        setSelectedKey(`otherStages.${insertAt}`);
    };

    const handleDeleteStage = async () => {
        if (!draft || !isOtherStage) return;
        const idx = Number(selectedKey.split(".")[1]);
        const next: PipelineDraft = { ...draft, otherStages: draft.otherStages.filter((_, i) => i !== idx) };
        setDraft(next);
        setSelectedKey("initialStage");
        await persistStages(next);
    };

    const handleAddTag = () => {
        const t = tagInput.trim();
        if (!t || !selectedStage) return;
        if (!selectedStage.tags.includes(t)) updateSelectedStage({ tags: [...selectedStage.tags, t] });
        setTagInput("");
    };

    const handleToggleTag = (tag: string) => {
        if (!selectedStage) return;
        const tags = selectedStage.tags.includes(tag) ? selectedStage.tags.filter((t) => t !== tag) : [...selectedStage.tags, tag];
        updateSelectedStage({ tags });
    };

    const toggleTransition = (name: string) => {
        if (!selectedStage) return;
        const current = asArray(selectedStage.additional?.transitions).map(String);
        const transitions = current.includes(name) ? current.filter((t) => t !== name) : [...current, name];
        updateSelectedStage({ additional: { ...selectedStage.additional, transitions } });
    };

    const openUpdateModal = () => {
        if (!selectedPipeline) return;
        setUpdateName(String(selectedPipeline?.title || ""));
        setUpdateColor(String(selectedPipeline?.color || ""));
        setColorOpen(false);
        setUpdateOpen(true);
    };

    const openCreateModal = () => {
        setCreateName("");
        setCreateColor(PIPELINE_COLORS[0]);
        setCreateColorOpen(false);
        setCreateOpen(true);
    };

    const handleCreatePipeline = async () => {
        if (!createName.trim()) return;
        setCreatingPipeline(true);
        try {
            const res: any = await addPipeline({
                title: createName.trim(),
                color: createColor,
                initialStage: { name: "Open", tags: [], additional: { transitions: [] } },
                otherStages: [],
                convertedStage: { name: "Converted", tags: [] },
                rejectedStage: { name: "Rejected", tags: [] },
            });
            const created = res?.data ?? res;
            const newId = getItemId(created);
            const record = newId ? { ...created, id: newId } : null;
            builtForRef.current = "";
            if (record) setPipelines((prev) => [...prev, record]);
            if (newId) setSelectedId(newId);
            setCreateOpen(false);
            showSnackbar({ title: "Success", description: "Pipeline created successfully", color: "success" });
        } catch (e: any) {
            showSnackbar({ title: "Error", description: e?.message || "Failed to create pipeline", color: "danger" });
        } finally {
            setCreatingPipeline(false);
        }
    };

    const handleUpdatePipeline = async () => {
        if (!selectedId || !updateName.trim()) return;
        setSavingPipeline(true);
        try {
            await updatePipelineById(selectedId, { title: updateName.trim(), color: updateColor });
            setPipelines((prev) => prev.map((p) => (getItemId(p) === selectedId ? { ...p, title: updateName.trim(), color: updateColor } : p)));
            showSnackbar({ title: "Success", description: "Pipeline updated", color: "success" });
            setUpdateOpen(false);
        } catch (e: any) {
            showSnackbar({ title: "Error", description: e?.message || "Failed to update pipeline", color: "danger" });
        } finally {
            setSavingPipeline(false);
        }
    };

    const handleDeletePipeline = async () => {
        const id = deleteTarget ? getItemId(deleteTarget) : "";
        if (!id) return;
        try {
            await getPipelineDelete(id);
            showSnackbar({ title: "Success", description: "Pipeline deleted successfully", color: "success" });
            builtForRef.current = "";
            setSelectedId("");
            setDraft(null);
            setPipelines((prev) => prev.filter((p) => getItemId(p) !== id));
        } catch (e: any) {
            showSnackbar({ title: "Error", description: e?.message || "Failed to delete pipeline", color: "danger" });
        } finally {
            setDeleteTarget(null);
        }
    };

    const stageNodeCls = (variant: "initial" | "other" | "converted" | "rejected", isSelected: boolean) => {
        const base = "cursor-pointer rounded-lg border px-5 py-2.5 text-center text-sm font-semibold transition-all hover:shadow-sm";
        const selected = isSelected ? "border-brand-500 bg-brand-50 text-brand-700 ring-1 ring-brand-500" : "";
        const colors = {
            initial: "border-secondary bg-primary text-primary",
            other: "border-secondary bg-primary text-primary",
            converted: "border-green-300 bg-green-50 text-green-700",
            rejected: "border-red-300 bg-red-50 text-red-600",
        };
        return `${base} ${colors[variant]} ${selected}`;
    };

    return (
        <div className="space-y-4">
            <TableCard.Root className="w-full">
                <TableCard.Header
                    title="Pipeline"
                    description="All the leads uploaded go through different stages until it is finally closed. Tags further provide easy identification of leads."
                    contentTrailing={
                        <Button size="sm" color="primary" iconLeading={Plus} onClick={openCreateModal}>
                            Create Pipeline
                        </Button>
                    }
                />
                <div className="grid grid-cols-1 gap-4 bg-primary px-4 py-5 md:px-6 xl:grid-cols-2">
                    {/* Left: pipeline selector + stage flow */}
                    <div className="rounded-xl border border-secondary">
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-secondary px-4 py-3">
                            <div className="flex items-center gap-3">
                                <span className="text-sm font-semibold text-primary">Select Pipeline :</span>
                                <Select
                                    aria-label="Select pipeline"
                                    className="w-48"
                                    isDisabled={loading || !pipelines.length}
                                    selectedKey={selectedId || null}
                                    onSelectionChange={(key) => {
                                        builtForRef.current = "";
                                        setSelectedId(String(key));
                                    }}
                                    items={pipelines.map((p) => ({ id: getItemId(p), label: String(p?.title || "Untitled") }))}
                                >
                                    {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                </Select>
                            </div>
                            <Button size="sm" color="secondary" isDisabled={!selectedPipeline} onClick={openUpdateModal}>
                                Edit
                            </Button>
                        </div>

                        <div className="flex flex-col items-center px-4 py-8">
                            {/* Initial stage */}
                            <button
                                type="button"
                                onClick={() => setSelectedKey("initialStage")}
                                className={`${stageNodeCls("initial", selectedKey === "initialStage")} w-full max-w-md`}
                            >
                                {draft?.initialStage.name || "Open"}
                            </button>

                            <AddConnector onClick={() => handleAddStage(-1)} />

                            {/* Other stages */}
                            {draft?.otherStages.map((stage, idx) => (
                                <div key={idx} className="flex w-full flex-col items-center">
                                    <button
                                        type="button"
                                        onClick={() => setSelectedKey(`otherStages.${idx}`)}
                                        className={`${stageNodeCls("other", selectedKey === `otherStages.${idx}`)} w-full max-w-md`}
                                    >
                                        {stage.name}
                                    </button>
                                    <AddConnector onClick={() => handleAddStage(idx)} />
                                </div>
                            ))}

                            {/* Converted + Rejected branch */}
                            <div className="relative flex w-full items-start justify-center gap-6 pt-1">
                                <div className="absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-border-secondary" />
                                <div className="absolute left-[calc(50%-110px)] right-[calc(50%-110px)] top-4 h-px bg-border-secondary" />
                                <button
                                    type="button"
                                    onClick={() => setSelectedKey("convertedStage")}
                                    className={`${stageNodeCls("converted", selectedKey === "convertedStage")} mt-4 w-56`}
                                >
                                    {draft?.convertedStage.name || "Sales Converted"}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setSelectedKey("rejectedStage")}
                                    className={`${stageNodeCls("rejected", selectedKey === "rejectedStage")} mt-4 w-56`}
                                >
                                    {draft?.rejectedStage.name || "Rejected"}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right: Edit Stage */}
                    <div className="rounded-xl border border-secondary">
                        <div className="flex items-center justify-between border-b border-secondary px-4 py-3">
                            <span className="text-md font-semibold text-primary">Edit Stage</span>
                            <div className="flex items-center gap-2">
                                {isOtherStage && (
                                    <Button size="sm" color="secondary" className="text-error" isLoading={savingStage} onClick={handleDeleteStage}>
                                        Delete Stage
                                    </Button>
                                )}
                                <Button size="sm" color="primary" isLoading={savingStage} onClick={handleSaveStage}>
                                    Save
                                </Button>
                            </div>
                        </div>

                        {selectedStage ? (
                            <div className="space-y-5 px-4 py-5">
                                <div className="flex flex-col gap-1.5">
                                    <Label>Stage Name:</Label>
                                    <Input
                                        value={selectedStage.name}
                                        onChange={(v) => updateSelectedStage({ name: v })}
                                        isDisabled={isFixedStage}
                                    />
                                </div>

                                <div className="flex flex-col gap-1.5">
                                    <Label>Tags:</Label>
                                    <div className="flex min-h-11 flex-wrap items-center gap-1.5 rounded-lg border border-secondary bg-primary px-2.5 py-2">
                                        {selectedStage.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="flex items-center gap-1 rounded-full bg-brand-primary_alt px-2.5 py-1 text-xs font-medium text-brand-700"
                                            >
                                                {tag}
                                                <button type="button" onClick={() => handleToggleTag(tag)} className="text-brand-600 hover:text-brand-800">
                                                    ×
                                                </button>
                                            </span>
                                        ))}
                                        {tagPool
                                            .filter((t) => !selectedStage.tags.includes(t))
                                            .map((tag) => (
                                                <button
                                                    key={tag}
                                                    type="button"
                                                    onClick={() => handleToggleTag(tag)}
                                                    className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary hover:bg-primary_hover"
                                                >
                                                    {tag}
                                                </button>
                                            ))}
                                        <input
                                            value={tagInput}
                                            onChange={(e) => setTagInput(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    e.preventDefault();
                                                    handleAddTag();
                                                }
                                            }}
                                            placeholder="Add tags..."
                                            className="min-w-[120px] flex-1 bg-transparent text-sm text-primary outline-none placeholder:text-quaternary"
                                        />
                                    </div>
                                </div>

                                {!isFixedStage ? (
                                    <div className="rounded-lg bg-secondary_alt p-4">
                                        <button type="button" onClick={() => setShowAdditional((v) => !v)} className="flex w-full items-center justify-between">
                                            <span className="text-sm font-semibold text-primary">Additional Setting</span>
                                            {showAdditional ? <ChevronUp className="size-4 text-tertiary" /> : <ChevronDown className="size-4 text-tertiary" />}
                                        </button>
                                        {showAdditional && (
                                            <div className="mt-3">
                                                <p className="mb-2 text-sm text-secondary">Transitions:</p>
                                                <div className="flex flex-wrap gap-2.5">
                                                    {allStageNames.map((name) => {
                                                        const active = asArray(selectedStage.additional?.transitions).map(String).includes(name);
                                                        return (
                                                            <button
                                                                key={name}
                                                                type="button"
                                                                onClick={() => toggleTransition(name)}
                                                                className="flex items-center gap-1.5 text-sm text-secondary"
                                                            >
                                                                <span
                                                                    className={`flex size-4 items-center justify-center rounded border ${
                                                                        active ? "border-brand-600 bg-brand-600" : "border-tertiary bg-primary"
                                                                    }`}
                                                                >
                                                                    {active && <Check className="size-3 text-fg-white" />}
                                                                </span>
                                                                {name}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="rounded-lg bg-brand-primary_alt px-4 py-3 text-sm text-brand-700">
                                        <span className="font-semibold">Hint:</span> Closed stages cannot be reopened unless "Allow user to reopen closed leads" is enabled.
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="px-4 py-10 text-center text-sm text-tertiary">Select a stage on the left to edit it.</div>
                        )}
                    </div>
                </div>
            </TableCard.Root>

            {/* Update Pipeline modal: only name + color */}
            <ModalOverlay isOpen={updateOpen} isDismissable onOpenChange={(open) => { if (!open) setUpdateOpen(false); }}>
                {({ state }) => (
                    <Modal className="max-w-md">
                        <Dialog>
                            <div className="relative w-full rounded-xl bg-primary p-5 ring-1 ring-secondary">
                                <CloseButton onPress={() => state.close()} className="absolute right-4 top-4" size="sm" />
                                <h2 className="mb-4 text-lg font-semibold text-primary">Update Pipeline</h2>
                                <div className="space-y-4">
                                    <Input
                                        label="Pipeline Name *"
                                        placeholder="Enter pipeline name"
                                        value={updateName}
                                        onChange={setUpdateName}
                                    />
                                    <div className="relative">
                                        <Label>Select Color:</Label>
                                        <button
                                            type="button"
                                            onClick={() => setColorOpen((v) => !v)}
                                            className="mt-1.5 flex items-center gap-2 rounded-lg border border-secondary bg-primary px-3 py-2"
                                        >
                                            <span className="size-5 rounded-full" style={{ backgroundColor: updateColor || PIPELINE_COLORS[0] }} />
                                            <ChevronDown className="size-4 text-tertiary" />
                                        </button>
                                        {colorOpen && (
                                            <div className="absolute left-0 top-full z-10 mt-1 grid w-44 grid-cols-5 gap-2 rounded-xl border border-secondary bg-primary p-3 shadow-lg">
                                                {PIPELINE_COLORS.map((c) => (
                                                    <button
                                                        key={c}
                                                        type="button"
                                                        onClick={() => {
                                                            setUpdateColor(c);
                                                            setColorOpen(false);
                                                        }}
                                                        className={`size-6 rounded-full ring-offset-2 ${updateColor === c ? "ring-2 ring-brand-500" : ""}`}
                                                        style={{ backgroundColor: c }}
                                                        aria-label={c}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="mt-5 flex justify-end gap-2">
                                    <Button color="secondary-destructive" onClick={() => setDeleteTarget(selectedPipeline)}>
                                        Delete
                                    </Button>
                                    <Button color="primary" isLoading={savingPipeline} isDisabled={!updateName.trim()} onClick={handleUpdatePipeline}>
                                        Update
                                    </Button>
                                </div>
                            </div>
                        </Dialog>
                    </Modal>
                )}
            </ModalOverlay>

            <ModalOverlay isOpen={createOpen} isDismissable onOpenChange={(open) => { if (!open) setCreateOpen(false); }}>
                {({ state }) => (
                    <Modal className="max-w-md">
                        <Dialog>
                            <div className="relative w-full rounded-xl bg-primary p-5 ring-1 ring-secondary">
                                <CloseButton onPress={() => state.close()} className="absolute right-4 top-4" size="sm" />
                                <h2 className="mb-4 text-lg font-semibold text-primary">Create Pipeline</h2>
                                <div className="space-y-4">
                                    <Input
                                        label="Pipeline Name *"
                                        placeholder="Enter pipeline name"
                                        value={createName}
                                        onChange={setCreateName}
                                    />
                                    <div className="relative">
                                        <Label>Select Color:</Label>
                                        <button
                                            type="button"
                                            onClick={() => setCreateColorOpen((v) => !v)}
                                            className="mt-1.5 flex items-center gap-2 rounded-lg border border-secondary bg-primary px-3 py-2"
                                        >
                                            <span className="size-5 rounded-full" style={{ backgroundColor: createColor || PIPELINE_COLORS[0] }} />
                                            <ChevronDown className="size-4 text-tertiary" />
                                        </button>
                                        {createColorOpen && (
                                            <div className="absolute left-0 top-full z-10 mt-1 grid w-44 grid-cols-5 gap-2 rounded-xl border border-secondary bg-primary p-3 shadow-lg">
                                                {PIPELINE_COLORS.map((c) => (
                                                    <button
                                                        key={c}
                                                        type="button"
                                                        onClick={() => {
                                                            setCreateColor(c);
                                                            setCreateColorOpen(false);
                                                        }}
                                                        className={`size-6 rounded-full ring-offset-2 ${createColor === c ? "ring-2 ring-brand-500" : ""}`}
                                                        style={{ backgroundColor: c }}
                                                        aria-label={c}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="mt-5 flex justify-end gap-2">
                                    <Button color="secondary" onClick={() => setCreateOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button color="primary" isLoading={creatingPipeline} isDisabled={!createName.trim()} onClick={handleCreatePipeline}>
                                        Create
                                    </Button>
                                </div>
                            </div>
                        </Dialog>
                    </Modal>
                )}
            </ModalOverlay>

            <Tmodal
                isOpen={Boolean(deleteTarget)}
                onClose={() => setDeleteTarget(null)}
                onConfirm={handleDeletePipeline}
                header="Confirm Deletion"
                content={`<p>Are you sure you want to delete this pipeline: <b>${String(deleteTarget?.title || "")}</b> ?</p>`}
            />
        </div>
    );
}

function AddConnector({ onClick }: { onClick: () => void }) {
    return (
        <div className="flex flex-col items-center">
            <div className="h-5 w-px bg-border-secondary" />
            <button
                type="button"
                onClick={onClick}
                className="flex size-5 items-center justify-center rounded-full border border-brand-400 bg-brand-50 text-brand-600 hover:bg-brand-100"
                title="Add stage between"
            >
                <Plus className="size-3" />
            </button>
            <div className="h-5 w-px bg-border-secondary" />
        </div>
    );
}

/* ----------------------------- Manage Columns Tab ----------------------------- */

const FIXED_LEAD_COLUMNS = [
    { key: "Status", label: "Status" },
    { key: "Deal Amount", label: "Deal Amount" },
    { key: "Last Call Date", label: "Last Call Date" },
    { key: "Total Disposition Count", label: "Total Disposition Count" },
    { key: "Call Attempt Count", label: "Call Attempt Count" },
];

const MANAGED_COLUMNS_KEY = "leadManagedColumns";

type ManagedColumnsState = {
    enabled: Record<string, boolean>;
    order: string[];
};

const DEFAULT_MANAGED_COLUMNS: ManagedColumnsState = {
    enabled: { Status: true },
    order: ["Status"],
};

export const getManagedColumns = (): ManagedColumnsState => {
    try {
        const raw = localStorage.getItem(MANAGED_COLUMNS_KEY);
        return raw ? { ...DEFAULT_MANAGED_COLUMNS, ...JSON.parse(raw) } : DEFAULT_MANAGED_COLUMNS;
    } catch {
        return DEFAULT_MANAGED_COLUMNS;
    }
};

function GripDots() {
    return (
        <svg viewBox="0 0 10 16" className="size-3.5 text-quaternary" fill="currentColor" aria-hidden>
            <circle cx="3" cy="3" r="1.5" />
            <circle cx="7" cy="3" r="1.5" />
            <circle cx="3" cy="8" r="1.5" />
            <circle cx="7" cy="8" r="1.5" />
            <circle cx="3" cy="13" r="1.5" />
            <circle cx="7" cy="13" r="1.5" />
        </svg>
    );
}

function ManageColumnsTab() {
    const showSnackbar = useStoreSnackbar((s) => s.showSnackbar);

    const [contactProps, setContactProps] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [state, setState] = useState<ManagedColumnsState>(() => getManagedColumns());
    const [dragIndex, setDragIndex] = useState<number | null>(null);
    const [saving, setSaving] = useState(false);

    const cpKey = (id: string) => `cp:${id}`;

    useEffect(() => {
        const run = async () => {
            setLoading(true);
            try {
                const saved: any = await getCustomColumns();
                const savedValue = saved?.value || {};
                if (savedValue?.enabled && Array.isArray(savedValue?.order)) {
                    setState({ enabled: savedValue.enabled, order: savedValue.order });
                }

                const res: any = await getContactProperties({ limit: "all" });
                const resolved = res?.data ?? res;
                const list = Array.isArray(resolved?.data) ? resolved.data : Array.isArray(resolved) ? resolved : asArray(resolved?.items);
                const items = asArray(list).map((it: any) => ({ ...it, id: getItemId(it) })).filter((it: any) => it.id);
                setContactProps(items);
                // Default new custom properties to enabled so they appear in Columns Order
                setState((prev) => {
                    const enabled = { ...prev.enabled };
                    const order = [...prev.order];
                    items.forEach((it: any) => {
                        const key = cpKey(it.id);
                        if (enabled[key] === undefined) {
                            enabled[key] = true;
                            order.push(key);
                        }
                    });
                    return { enabled, order };
                });
            } catch (e: any) {
                showSnackbar({ title: "Error", description: e?.message || "Failed to load contact properties", color: "danger" });
            } finally {
                setLoading(false);
            }
        };
        run();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const persist = (next: ManagedColumnsState) => {
        try {
            localStorage.setItem(MANAGED_COLUMNS_KEY, JSON.stringify(next));
        } catch {
            // ignore storage failures
        }
    };

    const setEnabled = (key: string, on: boolean) => {
        const enabled = { ...state.enabled, [key]: on };
        let order = state.order.filter((k) => k !== key);
        if (on) order = [...order, key];
        const next = { enabled, order };
        setState(next);
        persist(next);
    };

    const reorder = (from: number, to: number) => {
        if (from === to) return;
        const order = [...state.order];
        const [moved] = order.splice(from, 1);
        order.splice(to, 0, moved);
        const next = { ...state, order };
        setState(next);
        persist(next);
    };

    const allColumns = useMemo(() => {
        const map = new Map<string, { key: string; label: string }>();
        FIXED_LEAD_COLUMNS.forEach((c) => map.set(c.key, { key: c.key, label: c.label }));
        contactProps.forEach((cp) => map.set(cpKey(cp.id), { key: cpKey(cp.id), label: String(cp?.label || cp?.title || "—") }));
        return map;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contactProps]);

    const orderedColumns = state.order
        .filter((k) => state.enabled[k] && allColumns.has(k))
        .map((k) => allColumns.get(k)!);

    const handleSave = async () => {
        setSaving(true);
        try {
            const next = { enabled: state.enabled, order: state.order };
            await saveCustomColumns(next);
            persist(next);
            showSnackbar({ title: "Success", description: "Column settings saved", color: "success" });
        } catch (e: any) {
            showSnackbar({ title: "Error", description: e?.message || "Failed to save column settings", color: "danger" });
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-4">
            <div>
                <h2 className="text-lg font-semibold text-primary">Manage Columns</h2>
                <p className="mt-1 text-sm text-tertiary">Select the details you would like all users to see as columns in the lead summary.</p>
            </div>

            <div className="flex justify-end">
                <Button color="primary" isLoading={saving} onClick={handleSave}>
                    Save Changes
                </Button>
            </div>

            <TableCard.Root className="w-full max-w-5xl">
                <div className="grid grid-cols-1 gap-6 bg-primary px-4 py-5 md:px-6 lg:grid-cols-2">
                    {/* Left: property toggles */}
                    <div className="space-y-5">
                        <div>
                            <h3 className="mb-3 text-md font-semibold text-primary">Custom Contact Properties</h3>
                            {loading ? (
                                <div className="space-y-3">
                                    {Array.from({ length: 3 }).map((_, i) => (
                                        <div key={i} className="h-5 w-48 animate-pulse rounded bg-secondary" />
                                    ))}
                                </div>
                            ) : contactProps.length ? (
                                <div className="space-y-3">
                                    {contactProps.map((cp) => {
                                        const key = cpKey(cp.id);
                                        return (
                                            <div key={cp.id} className="flex items-center gap-2.5">
                                                <Toggle
                                                    aria-label={`Toggle column ${cp?.label || cp?.title || ""}`}
                                                    isSelected={Boolean(state.enabled[key])}
                                                    onChange={(value) => setEnabled(key, value)}
                                                />
                                                <span className="text-sm text-secondary">{cp?.label || cp?.title || "—"}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <p className="text-sm text-tertiary">No custom contact properties defined yet.</p>
                            )}
                        </div>

                        <div>
                            <h3 className="mb-3 text-md font-semibold text-primary">Lead Properties</h3>
                            <div className="space-y-3">
                                {FIXED_LEAD_COLUMNS.map((col) => (
                                    <div key={col.key} className="flex items-center gap-2.5">
                                        <Toggle
                                            aria-label={`Toggle column ${col.label}`}
                                            isSelected={Boolean(state.enabled[col.key])}
                                            onChange={(value) => setEnabled(col.key, value)}
                                        />
                                        <span className="text-sm text-secondary">{col.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: columns order (drag to reorder) */}
                    <div>
                        <h3 className="mb-3 text-md font-semibold text-primary">Columns Order</h3>
                        {orderedColumns.length ? (
                            <div className="w-full max-w-sm overflow-hidden rounded-lg border border-secondary">
                                {orderedColumns.map((col, index) => (
                                    <div
                                        key={col.key}
                                        draggable
                                        onDragStart={() => setDragIndex(index)}
                                        onDragOver={(e) => {
                                            e.preventDefault();
                                            if (dragIndex === null || dragIndex === index) return;
                                            reorder(dragIndex, index);
                                            setDragIndex(index);
                                        }}
                                        onDragEnd={() => setDragIndex(null)}
                                        className={`flex cursor-grab items-center gap-2.5 border-b border-secondary bg-primary px-4 py-3.5 text-sm text-secondary last:border-b-0 ${
                                            dragIndex === index ? "opacity-50" : ""
                                        }`}
                                    >
                                        <GripDots />
                                        <span className="select-none">{col.label}</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-tertiary">Enable columns on the left to arrange their order here.</p>
                        )}
                    </div>
                </div>
            </TableCard.Root>
        </div>
    );
}

/* ----------------------------- Preferences Tab ----------------------------- */

const PREFS_KEY = "leadSettingsPreferences";

type LeadPreferences = {
    defaultLeadsLimit: string;
    leadAssignment: string;
    autoFollowUpDays: string;
    notifyOnLeadAssign: boolean;
    notifyOnStageChange: boolean;
};

const defaultPreferences: LeadPreferences = {
    defaultLeadsLimit: "10",
    leadAssignment: "manual",
    autoFollowUpDays: "2",
    notifyOnLeadAssign: true,
    notifyOnStageChange: true,
};

const loadPreferences = (): LeadPreferences => {
    try {
        const raw = localStorage.getItem(PREFS_KEY);
        return raw ? { ...defaultPreferences, ...JSON.parse(raw) } : defaultPreferences;
    } catch {
        return defaultPreferences;
    }
};

export const getLeadPreferences = loadPreferences;

function PreferencesTab() {
    const showSnackbar = useStoreSnackbar((s) => s.showSnackbar);
    const [form, setForm] = useState<LeadPreferences>(loadPreferences);

    const update = <K extends keyof LeadPreferences>(key: K, value: LeadPreferences[K]) => setForm((prev) => ({ ...prev, [key]: value }));

    const handleSave = () => {
        try {
            localStorage.setItem(PREFS_KEY, JSON.stringify(form));
            showSnackbar({ title: "Success", description: "Lead preferences saved", color: "success" });
        } catch {
            showSnackbar({ title: "Error", description: "Failed to save preferences", color: "danger" });
        }
    };

    return (
        <TableCard.Root className="w-full">
            <TableCard.Header
                title="Preferences"
                contentTrailing={
                    <Button size="sm" color="primary" onClick={handleSave}>
                        Save Preferences
                    </Button>
                }
            />
            <div className="grid grid-cols-1 gap-5 bg-primary px-4 py-6 md:grid-cols-2 md:px-6">
                <div className="flex flex-col gap-1.5">
                    <Label>Default leads page size</Label>
                    <Select
                        aria-label="Default leads page size"
                        selectedKey={form.defaultLeadsLimit}
                        onSelectionChange={(key) => update("defaultLeadsLimit", String(key))}
                        items={LIMIT_OPTIONS}
                    >
                        {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                    </Select>
                    <span className="text-xs text-tertiary">Applied to the Leads list when no page size is chosen.</span>
                </div>
                <div className="flex flex-col gap-1.5">
                    <Label>Lead assignment</Label>
                    <Select
                        aria-label="Lead assignment"
                        selectedKey={form.leadAssignment}
                        onSelectionChange={(key) => update("leadAssignment", String(key))}
                        items={[
                            { id: "manual", label: "Manual" },
                            { id: "round-robin", label: "Round Robin" },
                        ]}
                    >
                        {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                    </Select>
                    <span className="text-xs text-tertiary">How new leads are assigned to agents.</span>
                </div>
                <div className="flex flex-col gap-1.5">
                    <Label>Auto follow-up after (days)</Label>
                    <Input
                        placeholder="2"
                        value={form.autoFollowUpDays}
                        onChange={(value) => update("autoFollowUpDays", value)}
                    />
                    <span className="text-xs text-tertiary">Days before an unattended lead is flagged for follow-up.</span>
                </div>
                <div className="flex flex-col gap-4 md:pt-7">
                    <Toggle
                        label="Notify on lead assignment"
                        hint="Get notified when a lead is assigned to you."
                        isSelected={form.notifyOnLeadAssign}
                        onChange={(value) => update("notifyOnLeadAssign", value)}
                    />
                    <Toggle
                        label="Notify on stage change"
                        hint="Get notified when a lead moves to another stage."
                        isSelected={form.notifyOnStageChange}
                        onChange={(value) => update("notifyOnStageChange", value)}
                    />
                </div>
            </div>
        </TableCard.Root>
    );
}

/* -------------------------------- Main Page -------------------------------- */

export default function LeadSettingsPage() {
    const availableWidth = useAvailableTableWidth();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const tabParam = searchParams.get("tab") || "";
    const activeTab = TABS.some((t) => t.id === tabParam) ? tabParam : "preferences";

    const setTab = (id: string) => {
        setSearchParams(
            (prev) => {
                const next = new URLSearchParams(prev);
                next.set("tab", id);
                return next;
            },
            { replace: true },
        );
    };

    return (
        <DefaultLayout>
            <div className="space-y-4" style={{ width: availableWidth }}>
                <div className="rounded-sm border border-secondary bg-primary p-2">
                    <div className="flex flex-wrap items-center gap-1 text-sm text-tertiary">
                        <button type="button" onClick={() => navigate("/dashboard")} className="rounded-sm px-1 py-0.5 text-primary hover:bg-primary_hover">Home</button>
                        <span>/</span>
                        <button type="button" onClick={() => navigate("/lead-management/leads")} className="rounded-sm px-1 py-0.5 text-primary hover:bg-primary_hover">Lead Management</button>
                        <span>/</span>
                        <span className="px-1 py-0.5 text-primary">Settings</span>
                    </div>
                </div>

                <Tabs selectedKey={activeTab} onSelectionChange={(key) => setTab(String(key))}>
                    <Tabs.List type="underline" orientation="horizontal" items={TABS}>
                        {(item) => (
                            <Tabs.Item id={item.id} label={item.label}>
                                {item.label}
                            </Tabs.Item>
                        )}
                    </Tabs.List>

                    <Tabs.Panel id="preferences">
                        <PreferencesTab />
                    </Tabs.Panel>
                    <Tabs.Panel id="pipelines">
                        <PipelinesTab />
                    </Tabs.Panel>
                    <Tabs.Panel id="manageColumns">
                        <ManageColumnsTab />
                    </Tabs.Panel>
                    <Tabs.Panel id="contactProperties">
                        <ContactPropertiesTab />
                    </Tabs.Panel>
                </Tabs>
            </div>
        </DefaultLayout>
    );
}
