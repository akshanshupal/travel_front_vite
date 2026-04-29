import { useEffect, useState } from "react";
import { DefaultLayout } from "@/layouts/DefaultLayout";
import { Button } from "@/components/base/buttons/button";
import { TableCard } from "@/components/application/table/table";
import { Input } from "@/components/base/input/input";
import { useStoreSnackbar } from "@/store/snackbar";
import {
    createPhotographyDeliverable,
    deletePhotographyDeliverableById,
    getPhotographyDeliverables,
    updatePhotographyDeliverableById,
} from "@/utils/services/photographyDeliverableService";

type Deliverable = {
    id: string;
    title: string;
};

export default function PhotographyDeliverablePage() {
    const { showSnackbar } = useStoreSnackbar();
    const [loading, setLoading] = useState(true);
    const [deliverables, setDeliverables] = useState<Deliverable[]>([]);
    const [newTitle, setNewTitle] = useState("");
    const [creating, setCreating] = useState(false);
    const [editingId, setEditingId] = useState("");
    const [editingTitle, setEditingTitle] = useState("");
    const [updating, setUpdating] = useState(false);
    const [deletingId, setDeletingId] = useState("");

    const fetchDeliverables = async () => {
        setLoading(true);
        try {
            const response: any = await getPhotographyDeliverables({ limit: "100", totalCount: "true" });
            const resolved = response?.data ?? response;
            const list = Array.isArray(resolved?.data) ? resolved.data : Array.isArray(resolved) ? resolved : [];
            setDeliverables(list);
        } catch {
            setDeliverables([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDeliverables();
    }, []);

    const handleCreate = async () => {
        const title = newTitle.trim();
        if (!title) {
            showSnackbar({ title: "Validation Error", description: "Title is required", color: "danger" });
            return;
        }
        setCreating(true);
        try {
            await createPhotographyDeliverable({ title });
            setNewTitle("");
            await fetchDeliverables();
            showSnackbar({ title: "Success", description: "Deliverable created", color: "success" });
        } catch (error: any) {
            showSnackbar({
                title: "Error",
                description: error?.error?.message || error?.message || "Failed to create deliverable",
                color: "danger",
            });
        } finally {
            setCreating(false);
        }
    };

    const startEdit = (deliverable: Deliverable) => {
        setEditingId(deliverable.id);
        setEditingTitle(deliverable.title);
    };

    const handleUpdate = async () => {
        const title = editingTitle.trim();
        if (!editingId) return;
        if (!title) {
            showSnackbar({ title: "Validation Error", description: "Title is required", color: "danger" });
            return;
        }
        setUpdating(true);
        try {
            await updatePhotographyDeliverableById(editingId, { title });
            setEditingId("");
            setEditingTitle("");
            await fetchDeliverables();
            showSnackbar({ title: "Success", description: "Deliverable updated", color: "success" });
        } catch (error: any) {
            showSnackbar({
                title: "Error",
                description: error?.error?.message || error?.message || "Failed to update deliverable",
                color: "danger",
            });
        } finally {
            setUpdating(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!id) return;
        const confirmed = window.confirm("Delete this deliverable?");
        if (!confirmed) return;
        setDeletingId(id);
        try {
            await deletePhotographyDeliverableById(id);
            if (editingId === id) {
                setEditingId("");
                setEditingTitle("");
            }
            await fetchDeliverables();
            showSnackbar({ title: "Success", description: "Deliverable deleted", color: "success" });
        } catch (error: any) {
            showSnackbar({
                title: "Error",
                description: error?.error?.message || error?.message || "Failed to delete deliverable",
                color: "danger",
            });
        } finally {
            setDeletingId("");
        }
    };

    return (
        <DefaultLayout>
            <TableCard.Root>
                <TableCard.Header
                    title="Photography - Deliverables"
                    badge={loading ? "..." : deliverables.length}
                />
                <div className="overflow-x-auto bg-primary px-4 py-5 md:px-6">
                    <div className="mb-4 grid grid-cols-1 gap-2 rounded-lg border border-secondary p-3 md:grid-cols-[1fr_auto]">
                        <Input label="Add Deliverable Title" value={newTitle} onChange={setNewTitle} />
                        <div className="flex items-end">
                            <Button color="primary" onClick={handleCreate} isDisabled={creating}>
                                {creating ? "Adding..." : "Add"}
                            </Button>
                        </div>
                    </div>
                    <table className="w-full border-collapse text-left text-sm">
                        <thead>
                            <tr className="border-b border-secondary text-tertiary">
                                <th className="px-2 py-2">Title</th>
                                <th className="px-2 py-2 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {deliverables.map((deliverable) => (
                                <tr key={deliverable.id} className="border-b border-secondary">
                                    <td className="px-2 py-2">
                                        {editingId === deliverable.id ? (
                                            <Input label="" value={editingTitle} onChange={setEditingTitle} />
                                        ) : (
                                            deliverable.title
                                        )}
                                    </td>
                                    <td className="px-2 py-2">
                                        <div className="flex justify-end gap-2">
                                            {editingId === deliverable.id ? (
                                                <>
                                                    <Button
                                                        size="sm"
                                                        color="secondary"
                                                        onClick={() => {
                                                            setEditingId("");
                                                            setEditingTitle("");
                                                        }}
                                                    >
                                                        Cancel
                                                    </Button>
                                                    <Button size="sm" color="primary" onClick={handleUpdate} isDisabled={updating}>
                                                        {updating ? "Saving..." : "Save"}
                                                    </Button>
                                                </>
                                            ) : (
                                                <>
                                                    <Button size="sm" color="secondary" onClick={() => startEdit(deliverable)}>
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        color="secondary-destructive"
                                                        onClick={() => handleDelete(deliverable.id)}
                                                        isDisabled={deletingId === deliverable.id}
                                                    >
                                                        {deletingId === deliverable.id ? "Deleting..." : "Delete"}
                                                    </Button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {!loading && deliverables.length === 0 && (
                                <tr>
                                    <td colSpan={2} className="px-2 py-4 text-tertiary">
                                        No deliverables found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </TableCard.Root>
        </DefaultLayout>
    );
}
