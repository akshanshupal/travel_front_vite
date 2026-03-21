import { DefaultLayout } from "@/layouts/DefaultLayout";
import { TableCard } from "@/components/application/table/table";
import { FileUploadDropZone } from "@/components/application/file-upload/file-upload-base";
import { RichTextEditor } from "@/components/application/rich-text-editor/rich-text-editor";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Select } from "@/components/base/select/select";
import { useStoreSnackbar } from "@/store/snackbar";
import { fetchWithToken } from "@/utils/fetchApi";
import { ArrowLeft, Home04, Trash01 } from "@untitledui/icons";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";

const stripHtml = (value: string) => {
    if (!value) return "";
    const div = document.createElement("div");
    div.innerHTML = value;
    return String(div.textContent || div.innerText || "").trim();
};

const getUploadUrl = (response: any) => {
    const resolved = response?.data ?? response;
    if (typeof resolved === "string") return resolved;
    if (typeof resolved?.url === "string") return resolved.url;
    if (typeof resolved?.data === "string") return resolved.data;
    if (typeof resolved?.location === "string") return resolved.location;
    return "";
};

const getId = (value: any) => String(value?.id ?? value?._id ?? value ?? "").trim();

type CategoryItem = {
    id: string;
    label: string;
};

export default function ItineraryHotelAddPage() {
    const navigate = useNavigate();
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({
        name: "",
        alias: "",
        location: "",
        category: "",
        status: "true",
        description: "",
    });
    const [categories, setCategories] = useState<CategoryItem[]>([]);
    const [featureImgFile, setFeatureImgFile] = useState<File | null>(null);
    const [featureImgPreview, setFeatureImgPreview] = useState<string>("");
    const [dirty, setDirty] = useState<Record<string, boolean>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetchWithToken("/api/hotelcategory", { limit: "1000", select: "title" });
                const resolved = (res as any)?.data ?? res;
                const list = Array.isArray(resolved?.data) ? resolved.data : (Array.isArray(resolved) ? resolved : []);
                setCategories(list.map((c: any) => ({ id: getId(c), label: c.title })).filter((c: any) => c.id));
            } catch (e) {
                console.error("Failed to load hotel categories", e);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        if (!featureImgFile) {
            setFeatureImgPreview("");
            return;
        }
        const url = URL.createObjectURL(featureImgFile);
        setFeatureImgPreview(url);
        return () => URL.revokeObjectURL(url);
    }, [featureImgFile]);

    const canSave = useMemo(() => {
        if (!form.name.trim()) return false;
        if (!form.alias.trim()) return false;
        if (!form.location.trim()) return false;
        if (!form.category) return false;
        if (!stripHtml(form.description)) return false;
        if (!featureImgFile) return false;
        return true;
    }, [featureImgFile, form.alias, form.description, form.name, form.location, form.category]);

    const validate = () => {
        const next: Record<string, string> = {};
        if (!form.name.trim()) next.name = "Name is required";
        if (!form.alias.trim()) next.alias = "Alias is required";
        if (!form.location.trim()) next.location = "Location is required";
        if (!form.category) next.category = "Category is required";
        if (!stripHtml(form.description)) next.description = "Description is required";
        if (!featureImgFile) next.featureImg = "Feature image is required";
        setErrors(next);
        return Object.keys(next).length === 0;
    };

    const handleSave = async () => {
        setDirty({ name: true, alias: true, location: true, category: true, description: true, featureImg: true });
        if (!validate()) return;
        if (saving) return;
        setSaving(true);
        try {
            const fd = new FormData();
            fd.append("fmFile", featureImgFile as File, (featureImgFile as File).name);
            useStoreSnackbar.getState().showSnackbar({ title: "Uploading", description: "Uploading feature image", color: "warning" });
            const uploaded = await fetchWithToken("/api/file/upload", fd as any, { method: "POST" });
            const featureImgUrl = getUploadUrl(uploaded);
            if (!featureImgUrl) {
                throw new Error("Failed to upload feature image");
            }

            await fetchWithToken(
                "/api/hotel",
                {
                    name: form.name.trim(),
                    alias: form.alias.trim(),
                    location: form.location.trim(),
                    category: form.category,
                    status: form.status === "true",
                    featureImg: featureImgUrl,
                    description: form.description,
                },
                { method: "POST" },
            );
            useStoreSnackbar.getState().showSnackbar({ title: "Success", description: "Hotel created", color: "success" });
            navigate("/itinerary/hotel");
        } catch (e: any) {
            useStoreSnackbar.getState().showSnackbar({ title: "Error", description: e?.message || "Failed to create hotel", color: "danger" });
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
                <button type="button" onClick={() => navigate("/itinerary/list")} className="rounded-sm px-1 py-0.5 text-primary hover:bg-primary_hover">
                    Itinerary
                </button>
                <span>/</span>
                <button type="button" onClick={() => navigate("/itinerary/hotel")} className="rounded-sm px-1 py-0.5 text-primary hover:bg-primary_hover">
                    Hotel
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
                    title="Add Hotel"
                    contentTrailing={
                        <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center md:justify-end">
                            <Button color="secondary" iconLeading={ArrowLeft} onClick={() => navigate("/itinerary/hotel")}>
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
                            label="Name *"
                            placeholder="Enter hotel name"
                            value={form.name}
                            onChange={(v) => setForm((p) => ({ ...p, name: v }))}
                            isInvalid={Boolean(dirty.name && errors.name)}
                            hint={dirty.name && errors.name ? errors.name : undefined}
                        />
                        <Input
                            label="Alias *"
                            placeholder="Enter hotel alias"
                            value={form.alias}
                            onChange={(v) => setForm((p) => ({ ...p, alias: v }))}
                            isInvalid={Boolean(dirty.alias && errors.alias)}
                            hint={dirty.alias && errors.alias ? errors.alias : undefined}
                        />
                        <Input
                            label="Location *"
                            placeholder="Enter hotel location"
                            value={form.location}
                            onChange={(v) => setForm((p) => ({ ...p, location: v }))}
                            isInvalid={Boolean(dirty.location && errors.location)}
                            hint={dirty.location && errors.location ? errors.location : undefined}
                        />
                        <Select
                            aria-label="Category *"
                            label="Category *"
                            selectedKey={form.category}
                            onSelectionChange={(key) => setForm((p) => ({ ...p, category: String(key) }))}
                            items={categories}
                            isInvalid={Boolean(dirty.category && errors.category)}
                            hint={dirty.category && errors.category ? errors.category : undefined}
                        >
                            {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                        </Select>
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

                    <div className="space-y-1.5">
                        <div className="text-sm font-medium text-primary">Description *</div>
                        <RichTextEditor value={form.description} onChange={(v) => setForm((p) => ({ ...p, description: v }))} />
                        {dirty.description && errors.description ? <p className="text-xs text-error">{errors.description}</p> : null}
                    </div>

                    <div className="space-y-2">
                        <div className="text-sm font-medium text-primary">Feature Image *</div>
                        {featureImgPreview ? (
                            <div className="relative overflow-hidden rounded-xl ring-1 ring-secondary">
                                <img src={featureImgPreview} alt="Feature preview" className="max-h-80 max-w-100 object-cover" />
                                <div className="absolute right-2 top-2">
                                    <Button color="secondary-destructive" size="sm" iconLeading={Trash01} onClick={() => setFeatureImgFile(null)}>
                                        Remove
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <FileUploadDropZone
                                accept="image/*"
                                allowsMultiple={false}
                                onDropFiles={(files) => {
                                    const f = files.item(0);
                                    setDirty((p) => ({ ...p, featureImg: true }));
                                    setFeatureImgFile(f);
                                }}
                            />
                        )}
                        {dirty.featureImg && errors.featureImg ? <p className="text-xs text-error">{errors.featureImg}</p> : null}
                    </div>

                    <div className="flex flex-col gap-2 border-t border-secondary pt-4 md:flex-row md:items-center md:justify-end">
                        <Button color="secondary" iconLeading={ArrowLeft} onClick={() => navigate("/itinerary/hotel")}>
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
