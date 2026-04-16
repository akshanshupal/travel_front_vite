import { DefaultLayout } from "@/layouts/DefaultLayout";
import { TableCard } from "@/components/application/table/table";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Input } from "@/components/base/input/input";
import { Select } from "@/components/base/select/select";
import { useStoreSnackbar } from "@/store/snackbar";
import { addBookingType } from "@/utils/services/bookingTypeService";
import { ArrowLeft, Home04, Plus, Trash01 } from "@untitledui/icons";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router";

type CustomField = {
    key: string;
    value: string;
    type: string;
};

type FieldGroup = "additionalDetails" | "additionalBookingDetails";
type BookingTypeForm = {
    title: string;
    status: string;
    additionalDetails: CustomField[];
    additionalBookingDetails: CustomField[];
};

const FIELD_TYPES = [
    { id: "text", label: "Text" },
    { id: "textarea", label: "Textarea" },
    { id: "textEditor", label: "Text Editor" },
    { id: "date", label: "Date" },
    { id: "time", label: "Time" },
    { id: "email", label: "Email" },
    { id: "number", label: "Number" },
    { id: "file", label: "File" },
];

const createField = (): CustomField => ({
    key: "",
    value: "",
    type: "text",
});

const slugify = (value: string) =>
    value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "_")
        .replace(/^_+|_+$/g, "");

const normalizeFields = (fields: CustomField[]) => {
    const used = new Map<string, number>();
    return fields.reduce<CustomField[]>((acc, field, index) => {
        const value = field.value.trim();
        if (!value) return acc;
        const baseKey = field.key.trim() || slugify(value) || `field_${index + 1}`;
        const count = used.get(baseKey) ?? 0;
        const nextKey = count > 0 ? `${baseKey}_${count + 1}` : baseKey;
        used.set(baseKey, count + 1);
        acc.push({
            key: nextKey,
            value,
            type: field.type || "text",
        });
        return acc;
    }, []);
};

export default function BookingTypeAddPage() {
    const navigate = useNavigate();
    const { showSnackbar } = useStoreSnackbar();
    const [saving, setSaving] = useState(false);
    const [dirty, setDirty] = useState<Record<string, boolean>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [form, setForm] = useState<BookingTypeForm>({
        title: "",
        status: "true",
        additionalDetails: [],
        additionalBookingDetails: [],
    });

    const canSave = useMemo(() => Boolean(form.title.trim()) && !saving, [form.title, saving]);

    const updateField = (group: FieldGroup, index: number, patch: Partial<CustomField>) => {
        setForm((prev) => {
            const nextFields = [...prev[group]];
            const current = { ...nextFields[index], ...patch };
            nextFields[index] = current;
            return { ...prev, [group]: nextFields };
        });
    };

    const handleFieldLabelChange = (group: FieldGroup, index: number, value: string) => {
        setForm((prev) => {
            const nextFields = [...prev[group]];
            const current = { ...nextFields[index] };
            const prevSlug = slugify(current.value);
            current.value = value;
            if (!current.key || current.key === prevSlug) {
                current.key = slugify(value);
            }
            nextFields[index] = current;
            return { ...prev, [group]: nextFields };
        });
    };

    const handleAddField = (group: FieldGroup) => {
        setForm((prev) => ({ ...prev, [group]: [...prev[group], createField()] }));
    };

    const handleRemoveField = (group: FieldGroup, index: number) => {
        setForm((prev) => ({ ...prev, [group]: prev[group].filter((_, idx) => idx !== index) }));
    };

    const validate = () => {
        const next: Record<string, string> = {};
        if (!form.title.trim()) next.title = "Title is required";
        const hasAdditionalDetails = (form.additionalDetails?.length ?? 0) > 0;
        const hasAdditionalBookingDetails = (form.additionalBookingDetails?.length ?? 0) > 0;
        if (hasAdditionalDetails && form.additionalDetails.some((f) => !String(f.value || "").trim())) {
            next.additionalDetails = "Fill all Additional Details fields or remove empty ones";
        }
        if (hasAdditionalBookingDetails && form.additionalBookingDetails.some((f) => !String(f.value || "").trim())) {
            next.additionalBookingDetails = "Fill all Additional Booking Details fields or remove empty ones";
        }
        setErrors(next);
        if (Object.keys(next).length > 0) {
            showSnackbar({
                title: "Validation Error",
                description: next.title || next.additionalDetails || next.additionalBookingDetails || "Please fix the form errors",
                color: "danger",
            });
        }
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
                status: form.status === "true",
                customParams: {
                    additionalDetails: normalizeFields(form.additionalDetails),
                    additionalBookingDetails: normalizeFields(form.additionalBookingDetails),
                },
            };
            const response = await addBookingType(payload);
            if (response?.error) {
                throw new Error(response.error);
            }
            showSnackbar({
                title: "Success",
                description: "Booking type created",
                color: "success",
            });
            navigate("/bookings/bookingtype");
        } catch (error: any) {
            showSnackbar({
                title: "Error",
                description: error?.message || "Failed to create booking type",
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
                <button type="button" onClick={() => navigate("/bookings/bookingtype")} className="rounded-sm px-1 py-0.5 text-primary hover:bg-primary_hover">
                    Booking Type
                </button>
                <span>/</span>
                <span className="px-1 py-0.5 text-primary">Add</span>
            </div>
        </div>
    );

    const renderFieldGroup = (title: string, group: FieldGroup) => (
        <div className="rounded-lg border border-secondary bg-secondary p-3 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="text-sm font-semibold text-primary">{title}</div>
                <Button size="sm" color="secondary" iconLeading={Plus} onClick={() => handleAddField(group)}>
                    Add Field
                </Button>
            </div>
            <div className="space-y-3">
                {form[group].map((field, index) => (
                    <div key={`${group}-${index}`} className="grid grid-cols-1 gap-3 md:grid-cols-12 md:items-end">
                        <Input
                            label="Label"
                            placeholder="Enter label"
                            value={field.value}
                            onChange={(value) => handleFieldLabelChange(group, index, value)}
                            className="md:col-span-4"
                        />
                        <Select
                            label="Type"
                            selectedKey={field.type || "text"}
                            onSelectionChange={(key) => updateField(group, index, { type: String(key) })}
                            items={FIELD_TYPES}
                            className="md:col-span-3"
                        >
                            {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                        </Select>
                        <div className="md:col-span-1 flex items-center justify-start md:justify-end">
                            <ButtonUtility
                                icon={Trash01}
                                tooltip="Remove"
                                color="error"
                                onClick={() => handleRemoveField(group, index)}
                                isDisabled={false}
                            />
                        </div>
                    </div>
                ))}
            </div>
            {errors[group] ? <p className="text-sm font-medium text-error-primary">{errors[group]}</p> : null}
        </div>
    );

    return (
        <DefaultLayout>
            {breadcrumbs}
            <TableCard.Root>
                <TableCard.Header
                    title="Add Booking Type"
                    contentTrailing={
                        <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center md:justify-end">
                            <Button color="secondary" iconLeading={ArrowLeft} onClick={() => navigate("/bookings/bookingtype")}>
                                Back
                            </Button>
                            <Button color="primary" isDisabled={!canSave} isLoading={saving} onClick={handleSave}>
                                Save
                            </Button>
                        </div>
                    }
                />
                <div className="space-y-6 bg-primary px-4 py-5 md:px-6">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <Input
                            label="Title *"
                            placeholder="Enter booking type"
                            value={form.title}
                            onChange={(value) => setForm((prev) => ({ ...prev, title: value }))}
                            isInvalid={Boolean(dirty.title && errors.title)}
                            hint={dirty.title && errors.title ? errors.title : undefined}
                        />
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
                    {renderFieldGroup("Additional Details", "additionalDetails")}
                    {renderFieldGroup("Additional Booking Details", "additionalBookingDetails")}
                    <div className="flex flex-col gap-2 border-t border-secondary pt-4 md:flex-row md:items-center md:justify-end">
                        <Button color="secondary" iconLeading={ArrowLeft} onClick={() => navigate("/bookings/bookingtype")}>
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
