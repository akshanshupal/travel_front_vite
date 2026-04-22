import { useMemo, useState } from "react";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Label } from "@/components/base/input/label";
import { RichTextEditor } from "@/components/application/rich-text-editor/rich-text-editor";

export type DeliverableCollectionItem = {
    id: string;
    title: string;
    content: string;
};

type Props = {
    collection: DeliverableCollectionItem[];
    deliverables: string[];
    onChange: (next: string[]) => void;
    onCreateCollectionItem?: (title: string, content: string) => Promise<void>;
    title?: string;
};

const toPlainText = (value: string) => {
    if (!value) return "";
    if (typeof window === "undefined") return value;
    const parser = new DOMParser();
    const doc = parser.parseFromString(value, "text/html");
    return (doc.body.textContent || "").replace(/\s+/g, " ").trim();
};

export const DeliverablesDnd = ({ collection, deliverables, onChange, onCreateCollectionItem, title = "Deliverables" }: Props) => {
    const [newTitle, setNewTitle] = useState("");
    const [newContent, setNewContent] = useState("");
    const [saving, setSaving] = useState(false);
    const [dragIndex, setDragIndex] = useState<number | null>(null);

    const collectionItems = useMemo(() => collection || [], [collection]);

    const addDeliverable = (content: string) => {
        onChange([...(deliverables || []), String(content || "")]);
    };

    const updateDeliverable = (index: number, value: string) => {
        onChange((deliverables || []).map((item, i) => (i === index ? value : item)));
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

    const handleCreate = async () => {
        if (!onCreateCollectionItem) return;
        const titleValue = newTitle.trim();
        const contentValue = newContent.trim();
        if (!titleValue || !contentValue) return;
        setSaving(true);
        try {
            await onCreateCollectionItem(titleValue, contentValue);
            setNewTitle("");
            setNewContent("");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-3 rounded-lg border border-secondary p-3">
                <div className="text-sm font-semibold text-primary">Deliverables Collection</div>
                {!!onCreateCollectionItem && (
                    <div className="space-y-2 rounded-md border border-secondary p-2">
                        <Input label="Deliverable Title" value={newTitle} onChange={setNewTitle} />
                        <div className="space-y-2">
                            <Label>Deliverable Content</Label>
                            <RichTextEditor value={newContent} onChange={setNewContent} />
                        </div>
                        <div className="flex justify-end">
                            <Button color="secondary" onClick={handleCreate} isDisabled={saving}>
                                {saving ? "Saving..." : "Save To Collection"}
                            </Button>
                        </div>
                    </div>
                )}
                <div className="max-h-[380px] space-y-2 overflow-y-auto pr-1">
                    {collectionItems.map((item) => (
                        <div
                            key={item.id}
                            draggable
                            onDragStart={(event) => {
                                event.dataTransfer.setData("application/x-deliverable-content", item.content || "");
                                event.dataTransfer.effectAllowed = "copy";
                            }}
                            className="cursor-grab rounded-md border border-secondary bg-primary p-2 active:cursor-grabbing"
                        >
                            <div className="text-sm font-medium text-primary">{item.title}</div>
                            <div className="line-clamp-2 text-xs text-tertiary">{toPlainText(item.content) || "-"}</div>
                        </div>
                    ))}
                    {!collectionItems.length && <div className="text-xs text-tertiary">No deliverables in collection yet.</div>}
                </div>
                <div className="text-xs text-tertiary">Drag any item and drop it into the selected area on the right.</div>
            </div>

            <div
                className="space-y-3 rounded-lg border border-secondary p-3"
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => {
                    event.preventDefault();
                    const content = event.dataTransfer.getData("application/x-deliverable-content");
                    if (content) addDeliverable(content);
                }}
            >
                <div className="text-sm font-semibold text-primary">{title}</div>
                <div className="space-y-3">
                    {(deliverables || []).map((item, index) => (
                        <div
                            key={index}
                            draggable
                            onDragStart={() => setDragIndex(index)}
                            onDragOver={(event) => event.preventDefault()}
                            onDrop={(event) => {
                                event.preventDefault();
                                if (dragIndex === null) return;
                                moveDeliverable(dragIndex, index);
                                setDragIndex(null);
                            }}
                            className="space-y-2 rounded-md border border-secondary p-2"
                        >
                            <div className="flex items-center justify-between">
                                <div className="text-xs text-tertiary">Deliverable {index + 1}</div>
                                <div className="flex gap-2">
                                    <Button size="sm" color="secondary" onClick={() => moveDeliverable(index, index - 1)} isDisabled={index === 0}>
                                        Up
                                    </Button>
                                    <Button
                                        size="sm"
                                        color="secondary"
                                        onClick={() => moveDeliverable(index, index + 1)}
                                        isDisabled={index === (deliverables || []).length - 1}
                                    >
                                        Down
                                    </Button>
                                    <Button size="sm" color="secondary-destructive" onClick={() => removeDeliverable(index)}>
                                        Remove
                                    </Button>
                                </div>
                            </div>
                            <RichTextEditor value={item} onChange={(value) => updateDeliverable(index, value)} />
                        </div>
                    ))}
                    {!deliverables?.length && (
                        <div className="rounded-md border border-dashed border-secondary p-3 text-xs text-tertiary">
                            Drop deliverables here from collection.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
