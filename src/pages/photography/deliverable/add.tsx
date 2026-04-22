import { useState } from "react";
import { useNavigate } from "react-router";
import { DefaultLayout } from "@/layouts/DefaultLayout";
import { TableCard } from "@/components/application/table/table";
import { Input } from "@/components/base/input/input";
import { Label } from "@/components/base/input/label";
import { Button } from "@/components/base/buttons/button";
import { RichTextEditor } from "@/components/application/rich-text-editor/rich-text-editor";
import { useStoreSnackbar } from "@/store/snackbar";
import { createPhotographyDeliverable } from "@/utils/services/photographyDeliverableService";

export default function PhotographyDeliverableAddPage() {
    const navigate = useNavigate();
    const { showSnackbar } = useStoreSnackbar();
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({ title: "", content: "" });

    const handleSave = async () => {
        if (!form.title.trim() || !form.content.trim()) {
            showSnackbar({ title: "Validation Error", description: "Title and content are required", color: "danger" });
            return;
        }
        setSaving(true);
        try {
            await createPhotographyDeliverable({
                title: form.title.trim(),
                content: form.content.trim(),
            });
            showSnackbar({ title: "Success", description: "Deliverable created", color: "success" });
            navigate("/photography/deliverable");
        } catch (error: any) {
            showSnackbar({
                title: "Error",
                description: error?.error?.message || error?.message || "Failed to create deliverable",
                color: "danger",
            });
        } finally {
            setSaving(false);
        }
    };

    return (
        <DefaultLayout>
            <TableCard.Root>
                <TableCard.Header title="Add Photography Deliverable" />
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
                        <Button color="primary" onClick={handleSave} isDisabled={saving}>
                            {saving ? "Saving..." : "Save"}
                        </Button>
                    </div>
                </div>
            </TableCard.Root>
        </DefaultLayout>
    );
}
