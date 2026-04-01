import { DefaultLayout } from "@/layouts/DefaultLayout";
import { CustomBreadscrumbs } from "@/components/application/breadcrumbs/custom-breadcrumbs";
import { TableCard } from "@/components/application/table/table";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Select } from "@/components/base/select/select";
import { useStoreSnackbar } from "@/store/snackbar";
import { useAccess } from "@/hooks/use-access";
import { getGeneralDataById, updateGeneralDataById } from "@/utils/services/generalDataService";
import { ArrowLeft, Plus, Trash01 } from "@untitledui/icons";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";

const code = "PACKAGE_EXCLUSIONS";

const asBool = (value: unknown) => {
    if (typeof value === "boolean") return value;
    if (typeof value === "number") return value !== 0;
    if (typeof value === "string") return value.toLowerCase() === "true" || value === "1";
    return false;
};

export default function SettingsPackageExclusionsEditPage() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { showSnackbar } = useStoreSnackbar();
    const { can } = useAccess();
    const canEdit = can("packageexclusion", "edit");

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [title, setTitle] = useState("");
    const [alias, setAlias] = useState("");
    const [status, setStatus] = useState("true");
    const [items, setItems] = useState<string[]>([""]);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const canSave = useMemo(() => !saving && Boolean(id), [saving, id]);
    const breadcrumbsList = useMemo(
        () => [
            { label: "Settings", link: "/additional-data/settings/package-exclusions" },
            { label: "Package Exclusions", link: "/additional-data/settings/package-exclusions" },
            { label: "Edit" },
        ],
        [],
    );

    useEffect(() => {
        const run = async () => {
            if (!id) return;
            setLoading(true);
            try {
                const response = await getGeneralDataById(id);
                if ((response as any)?.error) throw new Error((response as any).error);
                const raw = (response as any)?.data ?? response;
                setTitle(raw?.title || "");
                setAlias(raw?.alias || "");
                setStatus(asBool(raw?.status) ? "true" : "false");
                const nextItems = Array.isArray(raw?.value) ? raw.value.map((entry: any) => String(entry?.Items || "")) : [];
                setItems(nextItems.length ? nextItems : [""]);
            } catch (e: any) {
                showSnackbar({ title: "Error", description: e?.message || "Failed to load package exclusion", color: "danger" });
            } finally {
                setLoading(false);
            }
        };
        run();
    }, [id, showSnackbar]);

    const validate = () => {
        const next: Record<string, string> = {};
        if (!title.trim()) next.title = "Title is required";
        if (!alias.trim()) next.alias = "Alias is required";
        if (items.length === 0 || items.some((item) => !item.trim())) next.items = "All items are required";
        setErrors(next);
        return Object.keys(next).length === 0;
    };

    const handleItemChange = (index: number, value: string) => {
        setItems((prev) => prev.map((item, i) => (i === index ? value : item)));
    };

    const handleSave = async () => {
        if (!id) return;
        if (!canEdit) return;
        if (!validate()) {
            showSnackbar({ title: "Validation Error", description: "Please fill all required fields", color: "danger" });
            return;
        }
        setSaving(true);
        try {
            const payload = {
                title: title.trim(),
                alias: alias.trim(),
                status: status === "true",
                code,
                value: items.map((item) => ({ Items: item.trim() })),
            };
            const res = await updateGeneralDataById(id, payload);
            if ((res as any)?.error) throw new Error((res as any).error);
            showSnackbar({ title: "Success", description: "Package exclusion updated", color: "success" });
            navigate("/additional-data/settings/package-exclusions");
        } catch (e: any) {
            showSnackbar({ title: "Error", description: e?.message || "Failed to update package exclusion", color: "danger" });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <DefaultLayout>
                <div className="flex min-h-[320px] items-center justify-center">
                    <div className="h-10 w-10 animate-spin rounded-full border-2 border-tertiary border-t-transparent" />
                </div>
            </DefaultLayout>
        );
    }

    return (
        <DefaultLayout>
            <div className="space-y-4">
                <CustomBreadscrumbs list={breadcrumbsList} />
                <TableCard.Root>
                    <TableCard.Header
                        title="Edit Package Exclusion"
                        contentTrailing={
                            <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center md:justify-end">
                                <Button color="secondary" iconLeading={ArrowLeft} onClick={() => navigate("/additional-data/settings/package-exclusions")}>
                                    Back
                                </Button>
                                <Button color="primary" isLoading={saving} isDisabled={!canSave || !canEdit} onClick={handleSave}>
                                    Update
                                </Button>
                            </div>
                        }
                    />

                    <div className="space-y-6 bg-primary px-4 py-5 md:px-6">
                        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                            <Input label="Title *" placeholder="Enter exclusion title" value={title} onChange={setTitle} isInvalid={Boolean(errors.title)} hint={errors.title} />
                            <Input label="Alias *" placeholder="Enter exclusion alias" value={alias} onChange={setAlias} isInvalid={Boolean(errors.alias)} hint={errors.alias} />
                            <Select
                                label="Status *"
                                selectedKey={status}
                                onSelectionChange={(key) => setStatus(String(key))}
                                items={[
                                    { id: "true", label: "Active" },
                                    { id: "false", label: "Inactive" },
                                ]}
                            >
                                {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                            </Select>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <h2 className="text-base font-semibold text-primary">Items</h2>
                                <Button
                                    color="secondary"
                                    size="sm"
                                    iconLeading={Plus}
                                    onClick={() => setItems((prev) => [...prev, ""])}
                                >
                                    Add Item
                                </Button>
                            </div>
                            {errors.items ? <p className="text-sm text-error-primary">{errors.items}</p> : null}
                            <div className="space-y-3">
                                {items.map((item, index) => (
                                    <div key={`item-${index}`} className="flex items-end gap-2">
                                        <Input label={`Item ${index + 1} *`} placeholder="Enter item" value={item} onChange={(value) => handleItemChange(index, value)} />
                                        <Button
                                            color="secondary"
                                            size="sm"
                                            iconLeading={Trash01}
                                            onClick={() => setItems((prev) => (prev.length > 1 ? prev.filter((_, i) => i !== index) : prev))}
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </TableCard.Root>
            </div>
        </DefaultLayout>
    );
}
