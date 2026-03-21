import { DefaultLayout } from "@/layouts/DefaultLayout";
import { TableCard } from "@/components/application/table/table";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Select } from "@/components/base/select/select";
import { useStoreSnackbar } from "@/store/snackbar";
import { fetchWithToken } from "@/utils/fetchApi";
import { ArrowLeft, Home04 } from "@untitledui/icons";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";

const getId = (value: any) => String(value?.id ?? value?._id ?? value ?? "").trim();

export default function PackageTypeEditPage() {
    const navigate = useNavigate();
    const params = useParams();
    const id = getId(params.id);
    const { showSnackbar } = useStoreSnackbar();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({ title: "", status: "true" });
    const [dirty, setDirty] = useState<Record<string, boolean>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        const run = async () => {
            if (!id) {
                setLoading(false);
                showSnackbar({ title: "Error", description: "Invalid package type id", color: "danger" });
                return;
            }
            setLoading(true);
            try {
                const res = await fetchWithToken(`/api/packagetype/${id}`, {});
                const resolved = (res as any)?.data ?? res;
                setForm({
                    title: String(resolved?.title ?? ""),
                    status: String((resolved?.status ?? true) ? "true" : "false"),
                });
            } catch (e: any) {
                showSnackbar({ title: "Error", description: e?.message || "Failed to load package type", color: "danger" });
            } finally {
                setLoading(false);
            }
        };
        run();
    }, [id, showSnackbar]);

    const canSave = useMemo(() => Boolean(form.title.trim()) && !saving && !loading, [form.title, loading, saving]);

    const validate = () => {
        const next: Record<string, string> = {};
        if (!form.title.trim()) next.title = "Title is required";
        setErrors(next);
        if (Object.keys(next).length > 0) {
            showSnackbar({ title: "Validation Error", description: next.title, color: "danger" });
        }
        return Object.keys(next).length === 0;
    };

    const handleSave = async () => {
        setDirty({ title: true });
        if (!validate()) return;
        if (saving || loading) return;
        setSaving(true);
        try {
            const res = await fetchWithToken(
                `/api/packagetype/${id}`,
                { title: form.title.trim(), status: form.status === "true" },
                { method: "PUT" },
            );
            if ((res as any)?.error) throw new Error((res as any).error);
            showSnackbar({ title: "Success", description: "Package type updated", color: "success" });
            navigate("/packages/packageType");
        } catch (e: any) {
            showSnackbar({ title: "Error", description: e?.message || "Failed to update package type", color: "danger" });
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
                <button type="button" onClick={() => navigate("/packages/packageType")} className="rounded-sm px-1 py-0.5 text-primary hover:bg-primary_hover">
                    Package Type
                </button>
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
                    title="Edit Package Type"
                    contentTrailing={
                        <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center md:justify-end">
                            <Button color="secondary" iconLeading={ArrowLeft} onClick={() => navigate("/packages/packageType")}>
                                Back
                            </Button>
                            <Button color="primary" isDisabled={!canSave} isLoading={saving} onClick={handleSave}>
                                Save
                            </Button>
                        </div>
                    }
                />

                <div className="space-y-4 bg-primary px-4 py-5 md:px-6">
                    {loading ? (
                        <div className="space-y-3">
                            <div className="h-10 w-64 animate-pulse rounded bg-secondary" />
                            <div className="h-10 w-full animate-pulse rounded bg-secondary" />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <Input
                                label="Title *"
                                placeholder="Enter package type title"
                                value={form.title}
                                onChange={(v) => setForm((p) => ({ ...p, title: v }))}
                                isInvalid={Boolean(dirty.title && errors.title)}
                                hint={dirty.title && errors.title ? errors.title : undefined}
                            />
                            <Select
                                aria-label="Status *"
                                label="Status *"
                                selectedKey={form.status}
                                onSelectionChange={(key) => setForm((p) => ({ ...p, status: String(key) }))}
                                items={[
                                    { id: "true", label: "Active" },
                                    { id: "false", label: "Inactive" },
                                ]}
                            >
                                {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                            </Select>
                        </div>
                    )}
                </div>
            </TableCard.Root>
        </DefaultLayout>
    );
}

