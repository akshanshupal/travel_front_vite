import { DefaultLayout } from "@/layouts/DefaultLayout";
import { TableCard } from "@/components/application/table/table";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Label } from "@/components/base/input/label";
import { Select } from "@/components/base/select/select";
import { useStoreSnackbar } from "@/store/snackbar";
import { getContactPropertyById, updateContactPropertyById } from "@/utils/services/contactPropertiesService";
import { ArrowLeft } from "@untitledui/icons";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

const dataTypeOptions = [
    { id: "text", label: "Text" },
    { id: "number", label: "Number" },
    { id: "date", label: "Date" },
    { id: "boolean", label: "Yes / No" },
    { id: "email", label: "Email" },
    { id: "phone", label: "Phone" },
    { id: "url", label: "URL" },
];

export default function ContactPropertiesEditPage() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { showSnackbar } = useStoreSnackbar();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({ title: "", dataType: "text", status: "true" });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [dirty, setDirty] = useState<Record<string, boolean>>({});

    useEffect(() => {
        if (!id) return;
        const run = async () => {
            setLoading(true);
            try {
                const res = await getContactPropertyById(id);
                const data = (res as any)?.data ?? res;
                if (data) {
                    setForm({
                        title: data.title || "",
                        dataType: data.dataType?.type || "text",
                        status: data.status !== undefined ? String(data.status) : "true",
                    });
                }
            } catch (e: any) {
                showSnackbar({ title: "Error", description: e?.message || "Failed to load property", color: "danger" });
            } finally {
                setLoading(false);
            }
        };
        run();
    }, [id, showSnackbar]);

    const validate = () => {
        const next: Record<string, string> = {};
        if (!form.title.trim()) next.title = "Property name is required";
        setErrors(next);
        if (Object.keys(next).length > 0) {
            showSnackbar({ title: "Validation Error", description: Object.values(next)[0], color: "danger" });
        }
        return Object.keys(next).length === 0;
    };

    const handleSave = async () => {
        setDirty({ title: true });
        if (!validate() || saving || !id) return;
        setSaving(true);
        try {
            await updateContactPropertyById(id, {
                title: form.title.trim(),
                dataType: { type: form.dataType },
                status: form.status === "true",
            });
            showSnackbar({ title: "Success", description: "Contact property updated", color: "success" });
            navigate("/lead-management/settings/contact-properties");
        } catch (e: any) {
            showSnackbar({ title: "Error", description: e?.message || "Failed to update property", color: "danger" });
        } finally {
            setSaving(false);
        }
    };

    const breadcrumbs = (
        <div className="mb-4 rounded-sm border border-secondary bg-primary p-2">
            <div className="flex flex-wrap items-center gap-1 text-sm text-tertiary">
                <button type="button" onClick={() => navigate("/dashboard")} className="rounded-sm px-1 py-0.5 text-primary hover:bg-primary_hover">Home</button>
                <span>/</span>
                <button type="button" onClick={() => navigate("/lead-management/settings")} className="rounded-sm px-1 py-0.5 text-primary hover:bg-primary_hover">Settings</button>
                <span>/</span>
                <button type="button" onClick={() => navigate("/lead-management/settings/contact-properties")} className="rounded-sm px-1 py-0.5 text-primary hover:bg-primary_hover">Contact Properties</button>
                <span>/</span>
                <span className="px-1 py-0.5 text-primary">Edit</span>
            </div>
        </div>
    );

    return (
        <DefaultLayout>
            {breadcrumbs}
            <TableCard.Root>
                <TableCard.Header
                    title="Edit Contact Property"
                    contentTrailing={
                        <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center md:justify-end">
                            <Button color="secondary" iconLeading={ArrowLeft} onClick={() => navigate("/lead-management/settings/contact-properties")}>Back</Button>
                            <Button color="primary" isLoading={saving} isDisabled={loading} onClick={handleSave}>Save</Button>
                        </div>
                    }
                />
                <div className="bg-primary px-4 py-5 md:px-6">
                    {loading ? (
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 animate-pulse">
                            {Array.from({ length: 3 }).map((_, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="h-4 w-1/4 rounded bg-secondary" />
                                    <div className="h-10 w-full rounded bg-secondary" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <Input
                                label="Property Name *"
                                placeholder="e.g. Budget, Travel Date, Preferred Destination"
                                value={form.title}
                                onChange={(v) => setForm(p => ({ ...p, title: v }))}
                                isInvalid={Boolean(dirty.title && errors.title)}
                                hint={dirty.title && errors.title ? errors.title : undefined}
                            />
                            <div className="flex flex-col gap-1.5">
                                <Label>Data Type *</Label>
                                <Select
                                    aria-label="Data Type"
                                    selectedKey={form.dataType}
                                    onChange={undefined}
                                    onSelectionChange={(key) => setForm(p => ({ ...p, dataType: String(key) }))}
                                    items={dataTypeOptions}
                                >
                                    {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                </Select>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <Label>Status</Label>
                                <Select
                                    aria-label="Status"
                                    selectedKey={form.status}
                                    onChange={undefined}
                                    onSelectionChange={(key) => setForm(p => ({ ...p, status: String(key) }))}
                                    items={[{ id: "true", label: "Active" }, { id: "false", label: "Inactive" }]}
                                >
                                    {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                </Select>
                            </div>
                        </div>
                    )}
                </div>
            </TableCard.Root>
        </DefaultLayout>
    );
}
