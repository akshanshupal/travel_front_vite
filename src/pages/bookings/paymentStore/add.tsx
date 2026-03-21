import { DefaultLayout } from "@/layouts/DefaultLayout";
import { TableCard } from "@/components/application/table/table";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Select } from "@/components/base/select/select";
import { RichTextEditor } from "@/components/application/rich-text-editor/rich-text-editor";
import { useStoreSnackbar } from "@/store/snackbar";
import { addPaymentStore } from "@/utils/services/paymentStoreService";
import { ArrowLeft, Home04 } from "@untitledui/icons";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router";

export default function PaymentStoreAddPage() {
    const navigate = useNavigate();
    const { showSnackbar } = useStoreSnackbar();
    const [saving, setSaving] = useState(false);
    const [dirty, setDirty] = useState<Record<string, boolean>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [form, setForm] = useState({
        title: "",
        description: "",
        isDefault: "false",
        status: "true",
    });

    const canSave = useMemo(() => Boolean(form.title.trim()) && !saving, [form.title, saving]);

    const validate = () => {
        const next: Record<string, string> = {};
        if (!form.title.trim()) next.title = "Title is required";
        setErrors(next);
        return Object.keys(next).length === 0;
    };

    const handleSave = async () => {
        setDirty({ title: true });
        if (!validate()) return;
        if (saving) return;
        setSaving(true);
        try {
            const payload = {
                title: form.title.trim(),
                description: form.description.trim(),
                isDefault: form.isDefault === "true",
                status: form.status === "true",
            };
            const response = await addPaymentStore(payload);
            if (response?.error) throw new Error(response.error);
            showSnackbar({
                title: "Success",
                description: "Payment store created",
                color: "success",
            });
            navigate("/bookings/paymentStore");
        } catch (error: any) {
            showSnackbar({
                title: "Error",
                description: error?.message || "Failed to create payment store",
                color: "danger",
            });
        } finally {
            setSaving(false);
        }
    };

    const breadcrumbs = (
        <div className="mb-4 rounded-sm border border-secondary bg-primary p-2">
            <div className="flex flex-wrap items-center gap-1 text-sm text-tertiary">
                <button
                    type="button"
                    onClick={() => navigate("/dashboard")}
                    className="inline-flex items-center gap-1 rounded-sm px-1 py-0.5 text-primary hover:bg-primary_hover"
                >
                    <Home04 className="size-4" />
                </button>
                <span>/</span>
                <button type="button" onClick={() => navigate("/bookings/paymentStore")} className="rounded-sm px-1 py-0.5 text-primary hover:bg-primary_hover">
                    Payment Store
                </button>
                <span>/</span>
                <span className="px-1 py-0.5 text-primary">Add</span>
            </div>
        </div>
    );

    return (
        <DefaultLayout>
            {breadcrumbs}
            <TableCard.Root>
                <TableCard.Header
                    title="Add Payment Store"
                    contentTrailing={
                        <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center md:justify-end">
                            <Button color="secondary" iconLeading={ArrowLeft} onClick={() => navigate("/bookings/paymentStore")}>
                                Back
                            </Button>
                            <Button color="primary" isDisabled={!canSave} isLoading={saving} onClick={handleSave}>
                                Save
                            </Button>
                        </div>
                    }
                />
                <div className="space-y-4 bg-primary px-4 py-5 md:px-6">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <Input
                            label="Title *"
                            placeholder="Enter payment store"
                            value={form.title}
                            onChange={(value) => setForm((prev) => ({ ...prev, title: value }))}
                            isInvalid={Boolean(dirty.title && errors.title)}
                            hint={dirty.title && errors.title ? errors.title : undefined}
                        />
                        <Select
                            label="Default"
                            selectedKey={form.isDefault}
                            onSelectionChange={(key) => setForm((prev) => ({ ...prev, isDefault: String(key) }))}
                            items={[
                                { id: "true", label: "Yes" },
                                { id: "false", label: "No" },
                            ]}
                        >
                            {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                        </Select>
                        <Select
                            label="Status *"
                            selectedKey={form.status}
                            onSelectionChange={(key) => setForm((prev) => ({ ...prev, status: String(key) }))}
                            items={[
                                { id: "true", label: "Active" },
                                { id: "false", label: "Inactive" },
                            ]}
                        >
                            {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <div className="text-sm font-medium text-primary">Description</div>
                        <RichTextEditor value={form.description} onChange={(value) => setForm((prev) => ({ ...prev, description: value }))} />
                    </div>
                    <div className="flex flex-col gap-2 border-t border-secondary pt-4 md:flex-row md:items-center md:justify-end">
                        <Button color="secondary" iconLeading={ArrowLeft} onClick={() => navigate("/bookings/paymentStore")}>
                            Back
                        </Button>
                        <Button color="primary" isDisabled={!canSave} isLoading={saving} onClick={handleSave}>
                            Save
                        </Button>
                    </div>
                </div>
            </TableCard.Root>
        </DefaultLayout>
    );
}
