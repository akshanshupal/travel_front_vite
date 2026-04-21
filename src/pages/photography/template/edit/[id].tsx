import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { DefaultLayout } from "@/layouts/DefaultLayout";
import { TableCard } from "@/components/application/table/table";
import { Input } from "@/components/base/input/input";
import { TextArea } from "@/components/base/textarea/textarea";
import { Button } from "@/components/base/buttons/button";
import { useStoreSnackbar } from "@/store/snackbar";
import { getPhotographyTemplateById, updatePhotographyTemplateById } from "@/pages/photography/shared/templates";

export default function PhotographyTemplateEditPage() {
    const navigate = useNavigate();
    const params = useParams();
    const id = String(params.id || "");
    const { showSnackbar } = useStoreSnackbar();
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({
        name: "",
        mainEventName: "",
        timing: "",
        deliverablesText: "",
        packageCost: "0",
    });

    useEffect(() => {
        const template = getPhotographyTemplateById(id);
        if (!template) {
            setLoading(false);
            return;
        }
        setForm({
            name: template.name,
            mainEventName: template.mainEventName,
            timing: template.timing,
            deliverablesText: (template.deliverables || []).join("\n"),
            packageCost: String(template.packageCost || 0),
        });
        setLoading(false);
    }, [id]);

    const handleSave = () => {
        if (!form.name.trim() || !form.mainEventName.trim()) {
            showSnackbar({ title: "Validation Error", description: "Template title and main event are required", color: "danger" });
            return;
        }
        updatePhotographyTemplateById(id, {
            name: form.name.trim(),
            mainEventName: form.mainEventName.trim(),
            timing: form.timing.trim(),
            deliverables: form.deliverablesText.split("\n").map((item) => item.trim()).filter(Boolean),
            packageCost: Number(form.packageCost || 0),
        });
        showSnackbar({ title: "Success", description: "Template updated", color: "success" });
        navigate("/photography/template");
    };

    return (
        <DefaultLayout>
            <TableCard.Root>
                <TableCard.Header title="Edit Photography Template" />
                <div className="space-y-3 bg-primary px-4 py-5 md:px-6">
                    <Input label="Template Title *" value={form.name} onChange={(value) => setForm((prev) => ({ ...prev, name: value }))} />
                    <Input
                        label="Main Event Name *"
                        value={form.mainEventName}
                        onChange={(value) => setForm((prev) => ({ ...prev, mainEventName: value }))}
                    />
                    <Input label="Timing" value={form.timing} onChange={(value) => setForm((prev) => ({ ...prev, timing: value }))} />
                    <TextArea
                        label="Deliverables (one per line)"
                        rows={8}
                        value={form.deliverablesText}
                        onChange={(value) => setForm((prev) => ({ ...prev, deliverablesText: value }))}
                    />
                    <Input
                        label="Package Cost (INR)"
                        type="number"
                        value={form.packageCost}
                        onChange={(value) => setForm((prev) => ({ ...prev, packageCost: value }))}
                    />
                    <div className="flex justify-end gap-2">
                        <Button color="secondary" onClick={() => navigate("/photography/template")}>
                            Back
                        </Button>
                        <Button color="primary" onClick={handleSave} isDisabled={loading}>
                            Update
                        </Button>
                    </div>
                </div>
            </TableCard.Root>
        </DefaultLayout>
    );
}
