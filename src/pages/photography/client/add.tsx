import { useState } from "react";
import { useNavigate } from "react-router";
import { DefaultLayout } from "@/layouts/DefaultLayout";
import { TableCard } from "@/components/application/table/table";
import { Input } from "@/components/base/input/input";
import { Button } from "@/components/base/buttons/button";
import { useStoreSnackbar } from "@/store/snackbar";
import { createPhotographyClient } from "@/utils/services/photographyClientService";

export default function PhotographyClientAddPage() {
    const navigate = useNavigate();
    const { showSnackbar } = useStoreSnackbar();
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({ name: "", phone: "", whatsappNumber: "", email: "", address: "" });

    const handleSave = async () => {
        if (!form.name.trim() || !form.phone.trim() || !form.email.trim() || !form.address.trim()) {
            showSnackbar({ title: "Validation Error", description: "All fields are required", color: "danger" });
            return;
        }
        setSaving(true);
        try {
            await createPhotographyClient({
                name: form.name.trim(),
                phone: form.phone.trim(),
                whatsappNumber: form.whatsappNumber.trim(),
                email: form.email.trim(),
                address: form.address.trim(),
            });
            showSnackbar({ title: "Success", description: "Client created", color: "success" });
            navigate("/photography/client");
        } catch (error: any) {
            showSnackbar({
                title: "Error",
                description: error?.error?.message || error?.message || "Failed to create client",
                color: "danger",
            });
        } finally {
            setSaving(false);
        }
    };

    return (
        <DefaultLayout>
            <TableCard.Root>
                <TableCard.Header title="Add Photography Client" />
                <div className="grid grid-cols-1 gap-4 bg-primary px-4 py-5 md:grid-cols-2 md:px-6">
                    <Input label="Client Name *" value={form.name} onChange={(value) => setForm((prev) => ({ ...prev, name: value }))} />
                    <Input label="Phone Number *" value={form.phone} onChange={(value) => setForm((prev) => ({ ...prev, phone: value }))} />
                    <Input label="WhatsApp Number" value={form.whatsappNumber} onChange={(value) => setForm((prev) => ({ ...prev, whatsappNumber: value }))} />
                    <Input label="Email *" value={form.email} onChange={(value) => setForm((prev) => ({ ...prev, email: value }))} />
                    <Input
                        label="Address (Venue/Location) *"
                        value={form.address}
                        onChange={(value) => setForm((prev) => ({ ...prev, address: value }))}
                        className="md:col-span-2"
                    />
                    <div className="md:col-span-2 flex justify-end gap-2">
                        <Button color="secondary" onClick={() => navigate("/photography/client")}>
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
