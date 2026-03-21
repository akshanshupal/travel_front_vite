import { DefaultLayout } from "@/layouts/DefaultLayout";
import { TableCard } from "@/components/application/table/table";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { useStoreSnackbar } from "@/store/snackbar";
import { fetchWithToken } from "@/utils/fetchApi";
import { ArrowLeft, Home04 } from "@untitledui/icons";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router";

export default function PackageTagsAddPage() {
    const navigate = useNavigate();
    const { showSnackbar } = useStoreSnackbar();
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({ title: "" });
    const [dirty, setDirty] = useState<Record<string, boolean>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});

    const canSave = useMemo(() => Boolean(form.title.trim()) && !saving, [form.title, saving]);

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
        if (saving) return;
        setSaving(true);
        try {
            const res = await fetchWithToken("/api/packagetag", { title: form.title.trim(), status: true }, { method: "POST" });
            if ((res as any)?.error) throw new Error((res as any).error);
            showSnackbar({ title: "Success", description: "Package tag created", color: "success" });
            navigate("/packages/packageTags");
        } catch (e: any) {
            showSnackbar({ title: "Error", description: e?.message || "Failed to create package tag", color: "danger" });
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
                <button type="button" onClick={() => navigate("/packages/packageTags")} className="rounded-sm px-1 py-0.5 text-primary hover:bg-primary_hover">
                    Package Tags
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
                    title="Add Package Tag"
                    contentTrailing={
                        <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center md:justify-end">
                            <Button color="secondary" iconLeading={ArrowLeft} onClick={() => navigate("/packages/packageTags")}>
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
                            placeholder="Enter package tag title"
                            value={form.title}
                            onChange={(v) => setForm((p) => ({ ...p, title: v }))}
                            isInvalid={Boolean(dirty.title && errors.title)}
                            hint={dirty.title && errors.title ? errors.title : undefined}
                        />
                    </div>
                </div>
            </TableCard.Root>
        </DefaultLayout>
    );
}

