import { DefaultLayout } from "@/layouts/DefaultLayout";
import { TableCard } from "@/components/application/table/table";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { CloseButton } from "@/components/base/buttons/close-button";
import { Dialog, Modal, ModalOverlay } from "@/components/application/modals/modal";
import { Badge } from "@/components/base/badges/badges";
import { useStoreSnackbar } from "@/store/snackbar";
import { addPipeline } from "@/utils/services/pipelineService";
import { ArrowLeft, Plus, Trash01 } from "@untitledui/icons";
import { useState } from "react";
import { useNavigate } from "react-router";

// ─── Types ───────────────────────────────────────────────────────────────────

type Stage = {
    name: string;
    tags: string[];
    additional?: { transitions: string[] };
};

type PipelineForm = {
    title: string;
    initialStage: Stage;
    otherStages: Stage[];
    convertedStage: Stage;
    rejectedStage: Stage;
    status: string;
};

type SelectedStageKey = "initialStage" | "convertedStage" | "rejectedStage" | `otherStages.${number}`;

// ─── Helpers ──────────────────────────────────────────────────────────────────

const DEFAULT_FORM: PipelineForm = {
    title: "",
    initialStage: {
        name: "Open",
        tags: ["openTag", "openTag2"],
        additional: { transitions: ["Qualified", "Converted", "Rejected"] },
    },
    otherStages: [
        {
            name: "Qualified",
            tags: ["High Mail Send", "Medium Mail Send", "Low Mail Send"],
            additional: { transitions: ["Open", "Converted", "Rejected"] },
        },
    ],
    convertedStage: { name: "Converted", tags: ["Booked"] },
    rejectedStage: { name: "Rejected", tags: ["Not Done Any Query", "Not Interested"] },
    status: "true",
};

const getAllStageNames = (form: PipelineForm, excludeName?: string) => {
    const names: string[] = [];
    if (form.initialStage.name && form.initialStage.name !== excludeName) names.push(form.initialStage.name);
    form.otherStages.forEach(s => { if (s.name && s.name !== excludeName) names.push(s.name); });
    if (form.convertedStage.name && form.convertedStage.name !== excludeName) names.push(form.convertedStage.name);
    if (form.rejectedStage.name && form.rejectedStage.name !== excludeName) names.push(form.rejectedStage.name);
    return [...new Set(names)];
};

const getStageByKey = (form: PipelineForm, key: SelectedStageKey): Stage => {
    if (key === "initialStage") return form.initialStage;
    if (key === "convertedStage") return form.convertedStage;
    if (key === "rejectedStage") return form.rejectedStage;
    const idx = Number(key.split(".")[1]);
    return form.otherStages[idx];
};

// ─── Stage Edit Modal ────────────────────────────────────────────────────────

type StageModalProps = {
    isOpen: boolean;
    stage: Stage | null;
    stageKey: SelectedStageKey | null;
    allStageNames: string[];
    insertAfter?: number; // for adding new stage in otherStages
    onClose: () => void;
    onSave: (updated: Stage, key: SelectedStageKey, insertAfter?: number) => void;
};

function StageEditModal({ isOpen, stage, stageKey, allStageNames, insertAfter, onClose, onSave }: StageModalProps) {
    const [name, setName] = useState(stage?.name || "");
    const [tagInput, setTagInput] = useState("");
    const [tags, setTags] = useState<string[]>(stage?.tags || []);
    const [transitions, setTransitions] = useState<string[]>(stage?.additional?.transitions || []);
    const [nameError, setNameError] = useState("");

    const isFixedStage = stageKey === "convertedStage" || stageKey === "rejectedStage";
    const isNewStage = stage === null;

    // Sync when modal opens for a different stage
    const handleOpen = () => {
        setName(stage?.name || "");
        setTags(stage?.tags || []);
        setTransitions(stage?.additional?.transitions || []);
        setTagInput("");
        setNameError("");
    };

    const handleAddTag = () => {
        const t = tagInput.trim();
        if (!t || tags.includes(t)) return;
        setTags(prev => [...prev, t]);
        setTagInput("");
    };

    const toggleTransition = (n: string) =>
        setTransitions(prev => prev.includes(n) ? prev.filter(x => x !== n) : [...prev, n]);

    const handleSave = () => {
        if (!name.trim()) { setNameError("Stage name is required"); return; }
        const updated: Stage = {
            name: name.trim(),
            tags,
            ...(!isFixedStage ? { additional: { transitions } } : {}),
        };
        onSave(updated, stageKey!, isNewStage ? insertAfter : undefined);
    };

    return (
        <ModalOverlay isOpen={isOpen} isDismissable onOpenChange={(open) => { if (!open) onClose(); }}>
            {({ state }) => (
                <Modal className="max-w-lg w-full">
                    <Dialog>
                        <div className="relative w-full rounded-xl bg-primary p-5 ring-1 ring-secondary" onMouseEnter={handleOpen}>
                            <CloseButton onPress={() => state.close()} className="absolute right-4 top-4" size="sm" />
                            <h2 className="mb-4 text-base font-semibold text-primary">
                                {isNewStage ? "Add Stage" : `Edit Stage: ${stage?.name}`}
                            </h2>
                            <div className="space-y-4">
                                <Input
                                    label="Stage Name *"
                                    placeholder="Enter stage name"
                                    value={name}
                                    onChange={setName}
                                    isInvalid={Boolean(nameError)}
                                    hint={nameError || undefined}
                                    isDisabled={stageKey === "initialStage" || isFixedStage}
                                />

                                {/* Tags */}
                                <div>
                                    <div className="flex gap-2">
                                        <Input
                                            label="Tags"
                                            placeholder="Enter tag and Add"
                                            value={tagInput}
                                            onChange={setTagInput}
                                            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleAddTag(); } }}
                                        />
                                        <div className="flex items-end">
                                            <Button size="sm" color="secondary" onClick={handleAddTag}>Add</Button>
                                        </div>
                                    </div>
                                    {tags.length > 0 && (
                                        <div className="mt-2 flex flex-wrap gap-1.5">
                                            {tags.map((tag, i) => (
                                                <span key={i} className="flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                                                    {tag}
                                                    <button type="button" onClick={() => setTags(prev => prev.filter((_, j) => j !== i))} className="ml-0.5 text-blue-500 hover:text-blue-700">×</button>
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Transitions (only for non-terminal stages) */}
                                {!isFixedStage && allStageNames.length > 0 && (
                                    <div>
                                        <p className="mb-2 text-sm font-medium text-secondary">Transitions (can move to):</p>
                                        <div className="flex flex-wrap gap-2">
                                            {allStageNames.map(n => (
                                                <button
                                                    key={n}
                                                    type="button"
                                                    onClick={() => toggleTransition(n)}
                                                    className={`rounded-md px-3 py-1 text-xs font-medium ring-1 transition-colors ${transitions.includes(n)
                                                        ? "bg-brand-50 text-brand-700 ring-brand-400 dark:bg-brand-900/30 dark:text-brand-300"
                                                        : "bg-secondary text-tertiary ring-secondary hover:bg-primary"
                                                        }`}
                                                >
                                                    {n}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="mt-5 flex justify-end gap-2">
                                <Button color="secondary" onClick={() => state.close()}>Cancel</Button>
                                <Button color="primary" onClick={handleSave}>Save</Button>
                            </div>
                        </div>
                    </Dialog>
                </Modal>
            )}
        </ModalOverlay>
    );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function PipelineAddPage() {
    const navigate = useNavigate();
    const { showSnackbar } = useStoreSnackbar();

    const [form, setForm] = useState<PipelineForm>(DEFAULT_FORM);
    const [saving, setSaving] = useState(false);
    const [titleError, setTitleError] = useState("");

    // Modal state
    const [modalOpen, setModalOpen] = useState(false);
    const [editingKey, setEditingKey] = useState<SelectedStageKey | null>(null);
    const [insertAfterIdx, setInsertAfterIdx] = useState<number | undefined>(undefined);

    const openEdit = (key: SelectedStageKey) => {
        setEditingKey(key);
        setInsertAfterIdx(undefined);
        setModalOpen(true);
    };

    const openAddAfter = (afterIdx: number) => {
        setEditingKey("otherStages.999" as SelectedStageKey); // sentinel for "new"
        setInsertAfterIdx(afterIdx);
        setModalOpen(true);
    };

    const handleSaveStage = (updated: Stage, key: SelectedStageKey, insertAfter?: number) => {
        setForm(prev => {
            const next = { ...prev };
            if (key === "initialStage") { next.initialStage = updated; return next; }
            if (key === "convertedStage") { next.convertedStage = updated; return next; }
            if (key === "rejectedStage") { next.rejectedStage = updated; return next; }

            // otherStages — insert or update
            const stages = [...prev.otherStages];
            const idx = Number(key.split(".")[1]);
            if (idx === 999 && insertAfter !== undefined) {
                // Insert after
                stages.splice(insertAfter + 1, 0, updated);
            } else {
                stages[idx] = updated;
            }
            next.otherStages = stages;
            return next;
        });
        setModalOpen(false);
    };

    const handleDeleteStage = (idx: number) => {
        setForm(prev => ({ ...prev, otherStages: prev.otherStages.filter((_, i) => i !== idx) }));
    };

    const handleSave = async () => {
        if (!form.title.trim()) { setTitleError("Pipeline name is required"); return; }
        setTitleError("");
        setSaving(true);
        try {
            await addPipeline({ ...form, title: form.title.trim() });
            showSnackbar({ title: "Success", description: "Pipeline created successfully", color: "success" });
            navigate("/lead-management/pipeline");
        } catch (e: any) {
            showSnackbar({ title: "Error", description: e?.message || "Failed to create pipeline", color: "danger" });
        } finally {
            setSaving(false);
        }
    };

    const editingStage = editingKey && editingKey !== ("otherStages.999" as SelectedStageKey)
        ? getStageByKey(form, editingKey)
        : null;

    const stageNamesExcluding = editingKey
        ? getAllStageNames(form, editingKey !== ("otherStages.999" as SelectedStageKey) ? getStageByKey(form, editingKey)?.name : undefined)
        : getAllStageNames(form);

    const nodeBase = "cursor-pointer rounded-lg px-5 py-2 text-sm font-semibold text-center ring-1 transition-all hover:shadow-md";

    return (
        <DefaultLayout>
            {/* Breadcrumb */}
            <div className="mb-4 rounded-sm border border-secondary bg-primary p-2">
                <div className="flex flex-wrap items-center gap-1 text-sm text-tertiary">
                    <button type="button" onClick={() => navigate("/dashboard")} className="rounded-sm px-1 py-0.5 text-primary hover:bg-primary_hover">Home</button>
                    <span>/</span>
                    <button type="button" onClick={() => navigate("/lead-management/pipeline")} className="rounded-sm px-1 py-0.5 text-primary hover:bg-primary_hover">Pipeline</button>
                    <span>/</span>
                    <span className="px-1 py-0.5 text-primary">Add</span>
                </div>
            </div>

            <TableCard.Root>
                <TableCard.Header
                    title="Create Pipeline"
                    contentTrailing={
                        <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center md:justify-end">
                            <Button color="secondary" iconLeading={ArrowLeft} onClick={() => navigate("/lead-management/pipeline")}>Back</Button>
                            <Button color="primary" isLoading={saving} onClick={handleSave}>Create Pipeline</Button>
                        </div>
                    }
                />

                <div className="bg-primary px-4 py-5 md:px-6 space-y-6">
                    {/* Title */}
                    <div className="max-w-md">
                        <Input
                            label="Pipeline Name *"
                            placeholder="Enter pipeline name"
                            value={form.title}
                            onChange={(v) => { setForm(p => ({ ...p, title: v })); if (v.trim()) setTitleError(""); }}
                            isInvalid={Boolean(titleError)}
                            hint={titleError || undefined}
                        />
                    </div>

                    {/* Stage Editor */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {/* Left: Stage Flow */}
                        <div className="rounded-xl border border-secondary bg-secondary/20 p-4">
                            <p className="mb-4 text-sm font-semibold text-secondary border-b border-secondary pb-2">Pipeline Stages</p>
                            <div className="flex flex-col items-center gap-0">

                                {/* Initial Stage */}
                                <div
                                    onClick={() => openEdit("initialStage")}
                                    className={`${nodeBase} w-44 bg-purple-50 text-purple-700 ring-purple-400 dark:bg-purple-900/20 dark:text-purple-300`}
                                >
                                    {form.initialStage.name}
                                </div>

                                {/* Add button after initial */}
                                <AddConnector onClick={() => openAddAfter(-1)} />

                                {/* Other stages */}
                                {form.otherStages.map((stage, idx) => (
                                    <div key={idx} className="flex flex-col items-center w-full">
                                        <div className="flex items-center gap-2">
                                            <div
                                                onClick={() => openEdit(`otherStages.${idx}` as SelectedStageKey)}
                                                className={`${nodeBase} w-44 bg-primary ring-secondary hover:ring-brand-400`}
                                            >
                                                {stage.name}
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => handleDeleteStage(idx)}
                                                className="rounded-md p-1 text-error hover:bg-red-50 dark:hover:bg-red-900/20"
                                                title="Delete stage"
                                            >
                                                <Trash01 className="size-3.5" />
                                            </button>
                                        </div>
                                        <AddConnector onClick={() => openAddAfter(idx)} />
                                    </div>
                                ))}

                                {/* Converted + Rejected */}
                                <div className="relative flex w-full items-center justify-center gap-6 pt-1">
                                    <div className="absolute top-0 left-1/2 h-4 w-px -translate-x-1/2 bg-border" />
                                    <div className="absolute top-4 left-[calc(50%-56px)] right-[calc(50%-56px)] h-px bg-border" />
                                    <div
                                        onClick={() => openEdit("convertedStage")}
                                        className={`${nodeBase} w-32 bg-green-50 text-green-700 ring-green-400 dark:bg-green-900/20 dark:text-green-300 mt-4`}
                                    >
                                        {form.convertedStage.name}
                                    </div>
                                    <div
                                        onClick={() => openEdit("rejectedStage")}
                                        className={`${nodeBase} w-32 bg-red-50 text-red-700 ring-red-400 dark:bg-red-900/20 dark:text-red-300 mt-4`}
                                    >
                                        {form.rejectedStage.name}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Selected Stage Info */}
                        <div className="rounded-xl border border-secondary bg-secondary/20 p-4">
                            <p className="mb-4 text-sm font-semibold text-secondary border-b border-secondary pb-2">Stage Details</p>
                            <p className="text-xs text-tertiary">Click a stage on the left to view its details. Use the <span className="font-semibold text-primary">+</span> buttons between stages to add new intermediate stages.</p>

                            <div className="mt-4 space-y-3">
                                {/* Preview all stages */}
                                {[
                                    { label: "Initial", stage: form.initialStage, color: "purple" },
                                    ...form.otherStages.map((s, i) => ({ label: `Stage ${i + 1}`, stage: s, color: "blue" })),
                                    { label: "Converted", stage: form.convertedStage, color: "green" },
                                    { label: "Rejected", stage: form.rejectedStage, color: "red" },
                                ].map(({ label, stage, color }) => (
                                    <div key={label} className="rounded-lg border border-secondary bg-primary p-3">
                                        <div className="flex items-center gap-2 mb-1.5">
                                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full bg-${color}-50 text-${color}-700 dark:bg-${color}-900/20 dark:text-${color}-300`}>{label}</span>
                                            <span className="text-sm font-semibold text-primary">{stage.name}</span>
                                        </div>
                                        <div className="flex flex-wrap gap-1">
                                            {stage.tags.map(t => (
                                                <Badge key={t} size="sm" color="gray">{t}</Badge>
                                            ))}
                                        </div>
                                        {stage.additional?.transitions && stage.additional.transitions.length > 0 && (
                                            <p className="mt-1.5 text-xs text-tertiary">
                                                → {stage.additional.transitions.join(", ")}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </TableCard.Root>

            {/* Stage Edit Modal */}
            <StageEditModal
                isOpen={modalOpen}
                stage={editingStage}
                stageKey={editingKey}
                allStageNames={stageNamesExcluding}
                insertAfter={insertAfterIdx}
                onClose={() => setModalOpen(false)}
                onSave={handleSaveStage}
            />
        </DefaultLayout>
    );
}

function AddConnector({ onClick }: { onClick: () => void }) {
    return (
        <div className="flex flex-col items-center">
            <div className="h-4 w-px bg-border" />
            <button
                type="button"
                onClick={onClick}
                className="flex size-5 items-center justify-center rounded-full border border-brand-400 bg-brand-50 text-brand-600 hover:bg-brand-100 dark:bg-brand-900/20 dark:hover:bg-brand-800/40"
                title="Add stage"
            >
                <Plus className="size-3" />
            </button>
            <div className="h-4 w-px bg-border" />
        </div>
    );
}
