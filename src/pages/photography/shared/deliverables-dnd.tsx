import { useMemo, useState } from "react";
import { Trash01 } from "@untitledui/icons";

export type DeliverableCollectionItem = {
    id: string;
    title: string;
};

type Props = {
    collection: DeliverableCollectionItem[];
    deliverables: string[];
    onChange: (next: string[]) => void;
    title?: string;
};

export const DeliverablesDnd = ({ collection, deliverables, onChange, title = "Deliverables" }: Props) => {
    const [draggingDeliverableId, setDraggingDeliverableId] = useState("");
    const [dragOverDeliverableId, setDragOverDeliverableId] = useState("");
    const [collectionSearch, setCollectionSearch] = useState("");

    const collectionItems = useMemo(() => collection || [], [collection]);
    const selectedDeliverableTitles = useMemo(
        () =>
            new Set(
                (deliverables || [])
                    .map((item) => String(item || "").trim().toLowerCase())
                    .filter(Boolean),
            ),
        [deliverables],
    );
    const availableCollectionItems = useMemo(
        () => collectionItems.filter((item) => !selectedDeliverableTitles.has(String(item.title || "").trim().toLowerCase())),
        [collectionItems, selectedDeliverableTitles],
    );
    const filteredCollectionItems = useMemo(() => {
        const query = String(collectionSearch || "").trim().toLowerCase();
        if (!query) return availableCollectionItems;
        return availableCollectionItems.filter((item) => String(item.title || "").toLowerCase().includes(query));
    }, [availableCollectionItems, collectionSearch]);

    const addDeliverable = (content: string) => {
        onChange([...(deliverables || []), String(content || "")]);
    };

    const updateDeliverable = (index: number, value: string) => {
        onChange((deliverables || []).map((item, i) => (i === index ? value.trimStart() : item)));
    };

    const removeDeliverable = (index: number) => {
        onChange((deliverables || []).filter((_, i) => i !== index));
    };

    const moveDeliverable = (from: number, to: number) => {
        if (from === to || from < 0 || to < 0) return;
        const next = [...(deliverables || [])];
        const [moved] = next.splice(from, 1);
        next.splice(to, 0, moved);
        onChange(next);
    };

    const handleDeliverableDragStart = (deliverableId: string) => {
        setDraggingDeliverableId(String(deliverableId || ""));
    };

    const handleDeliverableDrop = (targetDeliverableId: string) => {
        const sourceId = String(draggingDeliverableId || "");
        const targetId = String(targetDeliverableId || "");
        if (!sourceId || !targetId || sourceId === targetId) {
            setDraggingDeliverableId("");
            setDragOverDeliverableId("");
            return;
        }
        const sourceIndex = Number(sourceId);
        const targetIndex = Number(targetId);
        if (Number.isNaN(sourceIndex) || Number.isNaN(targetIndex)) return;
        moveDeliverable(sourceIndex, targetIndex);
        setDraggingDeliverableId("");
        setDragOverDeliverableId("");
    };

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div
                className="space-y-3 rounded-lg border border-secondary p-3"
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => {
                    event.preventDefault();
                    const titleText = event.dataTransfer.getData("application/x-deliverable-title");
                    if (titleText) addDeliverable(titleText);
                }}
            >
                <div className="text-sm font-semibold text-primary">{title}</div>
                <div className="space-y-2">
                    {(deliverables || []).map((item, index) => (
                        // Index is used as local drag id because selected deliverables are plain strings.
                        <div
                            key={index}
                            draggable
                            onDragStart={() => handleDeliverableDragStart(String(index))}
                            onDragOver={(event) => {
                                event.preventDefault();
                                setDragOverDeliverableId(String(index));
                            }}
                            onDrop={() => handleDeliverableDrop(String(index))}
                            onDragEnd={() => {
                                setDraggingDeliverableId("");
                                setDragOverDeliverableId("");
                            }}
                            className={`rounded-md border p-1 ${
                                dragOverDeliverableId === String(index) ? "border-blue-400 ring-1 ring-blue-200" : "border-secondary"
                            }`}
                        >
                            <div className="relative">
                                <span
                                    className="absolute left-1 top-1 z-10 select-none rounded p-1 text-gray-400"
                                    aria-label={`Drag deliverable ${index + 1}`}
                                    title="Drag to reorder"
                                >
                                    ⋮⋮
                                </span>
                                <button
                                    type="button"
                                    onClick={() => removeDeliverable(index)}
                                    className="absolute right-1 top-1 z-10 rounded p-1 text-red-500 transition hover:bg-red-50"
                                    aria-label={`Remove deliverable ${index + 1}`}
                                >
                                    <Trash01 className="size-4" />
                                </button>
                                <textarea
                                    rows={1}
                                    value={item}
                                    onChange={(event) => updateDeliverable(index, event.target.value)}
                                    className="w-full rounded-md border border-secondary bg-primary px-2 py-1.5 pl-8 pr-8 text-sm text-primary outline-none transition focus:border-brand"
                                    style={{ resize: "vertical" }}
                                />
                            </div>
                        </div>
                    ))}
                    {!deliverables?.length && (
                        <div className="rounded-md border border-dashed border-secondary p-3 text-xs text-tertiary">
                            Drop deliverables here from collection.
                        </div>
                    )}
                </div>
            </div>
            <div className="space-y-3 rounded-lg border border-secondary p-3">
                <div className="text-sm font-semibold text-primary">Deliverables Collection</div>
                <input
                    value={collectionSearch}
                    onChange={(event) => setCollectionSearch(event.target.value)}
                    placeholder="Search deliverables..."
                    className="w-full rounded-md border border-secondary bg-primary px-3 py-2 text-sm text-primary outline-none transition focus:border-brand"
                />
                <div className="h-[420px] space-y-2 overflow-y-auto pr-1">
                    {filteredCollectionItems.map((item) => (
                        <div
                            key={item.id}
                            draggable
                            onDragStart={(event) => {
                                event.dataTransfer.setData("application/x-deliverable-title", item.title || "");
                                event.dataTransfer.effectAllowed = "copy";
                            }}
                            className="cursor-grab rounded-md border border-secondary bg-primary p-2 active:cursor-grabbing"
                        >
                            <div className="text-sm font-medium text-primary flex items-center gap-2">
                                <span className="select-none text-gray-400">⋮⋮</span>
                                {item.title}
                            </div>
                        </div>
                    ))}
                    {!availableCollectionItems.length && (
                        <div className="text-xs text-tertiary">No available deliverables in collection.</div>
                    )}
                    {!!availableCollectionItems.length && !filteredCollectionItems.length && (
                        <div className="text-xs text-tertiary">No deliverables found for your search.</div>
                    )}
                </div>
                <div className="text-xs text-tertiary">Drag any item and drop it into the selected area on the right.</div>
            </div>


        </div>
    );
};
