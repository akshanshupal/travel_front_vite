import { DefaultLayout } from "@/layouts/DefaultLayout";
import { CustomBreadscrumbs } from "@/components/application/breadcrumbs/custom-breadcrumbs";
import { TableCard } from "@/components/application/table/table";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { useStoreSnackbar } from "@/store/snackbar";
import { addGeneralData } from "@/utils/services/generalDataService";
import { ArrowLeft, Plus, Trash01 } from "@untitledui/icons";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router";

const code = "PACKAGE_EXCLUSIONS";

export default function SettingsPackageExclusionsAddPage() {
    const navigate = useNavigate();
    const { showSnackbar } = useStoreSnackbar();
    const [saving, setSaving] = useState(false);
    const [title, setTitle] = useState("");
    const [alias, setAlias] = useState("");
    const [items, setItems] = useState<string[]>([""]);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const canSave = useMemo(() => !saving, [saving]);
    const breadcrumbsList = useMemo(
        () => [
            { label: "Settings", link: "/additional-data/settings/package-exclusions" },
            { label: "Package Exclusions", link: "/additional-data/settings/package-exclusions" },
            { label: "Add" },
        ],
        [],
    );

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
        if (!validate()) {
            showSnackbar({ title: "Validation Error", description: "Please fill all required fields", color: "danger" });
            return;
        }
        setSaving(true);
        try {
            const payload = {
                title: title.trim(),
                alias: alias.trim(),
                status: true,
                code,
                value: items.map((item) => ({ Items: item.trim() })),
            };
            const res = await addGeneralData(payload);
            if ((res as any)?.error) throw new Error((res as any).error);
            showSnackbar({ title: "Success", description: "Package exclusion created", color: "success" });
            navigate("/additional-data/settings/package-exclusions");
        } catch (e: any) {
            showSnackbar({ title: "Error", description: e?.message || "Failed to create package exclusion", color: "danger" });
        } finally {
            setSaving(false);
        }
    };

    return (
        <DefaultLayout>
            <div className="space-y-4">
                <CustomBreadscrumbs list={breadcrumbsList} />
                <TableCard.Root>
                    <TableCard.Header
                        title="Add Package Exclusion"
                        contentTrailing={
                            <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center md:justify-end">
                                <Button color="secondary" iconLeading={ArrowLeft} onClick={() => navigate("/additional-data/settings/package-exclusions")}>
                                    Back
                                </Button>
                                <Button color="primary" isLoading={saving} isDisabled={!canSave} onClick={handleSave}>
                                    Save
                                </Button>
                            </div>
                        }
                    />

                    <div className="space-y-6 bg-primary px-4 py-5 md:px-6">
                        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                            <Input
                                label="Title *"
                                placeholder="Enter exclusion title"
                                value={title}
                                onChange={setTitle}
                                isInvalid={Boolean(errors.title)}
                                hint={errors.title}
                            />
                            <Input
                                label="Alias *"
                                placeholder="Enter exclusion alias"
                                value={alias}
                                onChange={setAlias}
                                isInvalid={Boolean(errors.alias)}
                                hint={errors.alias}
                            />
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <h2 className="text-base font-semibold text-primary">Items</h2>
                                <Button color="secondary" size="sm" iconLeading={Plus} onClick={() => setItems((prev) => [...prev, ""])}>
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
