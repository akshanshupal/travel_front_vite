import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { DefaultLayout } from "@/layouts/DefaultLayout";
import { TableCard } from "@/components/application/table/table";
import { Input } from "@/components/base/input/input";
import { Label } from "@/components/base/input/label";
import { Button } from "@/components/base/buttons/button";
import { RichTextEditor } from "@/components/application/rich-text-editor/rich-text-editor";
import { useStoreSnackbar } from "@/store/snackbar";
import { getPhotographyDeliverableById, updatePhotographyDeliverableById } from "@/utils/services/photographyDeliverableService";

export default function PhotographyDeliverableEditPage() {
    const navigate = useNavigate();
    const params = useParams();
    const id = String(params.id || "");
    const { showSnackbar } = useStoreSnackbar();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({ title: "", content: "" });

    useEffect(() => {
        const run = async () => {
            if (!id) return;
            setLoading(true);
            try {
                const response: any = await getPhotographyDeliverableById(id);
                const resolved = response?.data ?? response;
                setForm({
                    title: String(resolved?.title || ""),
                    content: String(resolved?.content || ""),
                });
            } catch {
                showSnackbar({ title: "Error", description: "Failed to load deliverable", color: "danger" });
            } finally {
                setLoading(false);
            }
        };
        run();
    }, [id, showSnackbar]);

    const handleSave = async () => {
        if (!form.title.trim() || !form.content.trim()) {
            showSnackbar({ title: "Validation Error", description: "Title and content are required", color: "danger" });
            return;
        }
        setSaving(true);
        try {
            await updatePhotographyDeliverableById(id, {
                title: form.title.trim(),
                content: form.content.trim(),
            });
            showSnackbar({ title: "Success", description: "Deliverable updated", color: "success" });
            navigate("/photography/deliverable");
        } catch (error: any) {
            showSnackbar({
                title: "Error",
                description: error?.error?.message || error?.message || "Failed to update deliverable",
                color: "danger",
            });
        } finally {
            setSaving(false);
        }
    };

    return (
        <DefaultLayout>
            <TableCard.Root>
                <TableCard.Header title="Edit Photography Deliverable" />
                <div className="grid grid-cols-1 gap-4 bg-primary px-4 py-5 md:px-6">
                    <Input
                        label="Title *"
                        value={form.title}
                        onChange={(value) => setForm((prev) => ({ ...prev, title: value }))}
                    />
                    <div className="space-y-2">
                        <Label>Content *</Label>
                        <RichTextEditor value={form.content} onChange={(value) => setForm((prev) => ({ ...prev, content: value }))} />
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button color="secondary" onClick={() => navigate("/photography/deliverable")}>
                            Back
                        </Button>
                        <Button color="primary" onClick={handleSave} isDisabled={saving || loading}>
                            {saving ? "Saving..." : "Update"}
                        </Button>
                    </div>
                </div>
            </TableCard.Root>
        </DefaultLayout>
    );
}
