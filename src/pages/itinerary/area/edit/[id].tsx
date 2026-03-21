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
import { useNavigate, useParams } from "react-router";

const getId = (value: any) => String(value?.id ?? value?._id ?? value ?? "").trim();

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

export default function ItineraryAreaEditPage() {
    const navigate = useNavigate();
    const params = useParams();
    const id = getId(params.id);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [loadError, setLoadError] = useState<string | null>(null);
    const [form, setForm] = useState({
        title: "",
        alias: "",
        status: "true",
        featureImg: "",
        headerContent: "",
        description: "",
        footerContent: "",
    });

    const [featureImgFile, setFeatureImgFile] = useState<File | null>(null);
    const [featureImgPreview, setFeatureImgPreview] = useState<string>("");
    const [dirty, setDirty] = useState<Record<string, boolean>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});

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
        if (!id) return false;
        if (!form.title.trim()) return false;
        if (!form.alias.trim()) return false;
        if (!stripHtml(form.description)) return false;
        if (!featureImgFile && !form.featureImg.trim()) return false;
        return true;
    }, [featureImgFile, form.alias, form.description, form.featureImg, form.title, id]);

    useEffect(() => {
        const run = async () => {
            if (!id) {
                setLoadError("Invalid area id");
                setLoading(false);
                return;
            }
            setLoading(true);
            setLoadError(null);
            try {
                const res = await fetchWithToken(`/api/area/${id}`, {});
                const resolved = (res as any)?.data ?? res;
                setForm({
                    title: String(resolved?.title ?? ""),
                    alias: String(resolved?.alias ?? ""),
                    status: String((resolved?.status ?? true) ? "true" : "false"),
                    featureImg: String(resolved?.featureImg ?? ""),
                    headerContent: String(resolved?.headerContent ?? ""),
                    description: String(resolved?.description ?? ""),
                    footerContent: String(resolved?.footerContent ?? ""),
                });
            } catch (e: any) {
                setLoadError(e?.error?.message || e?.message || "Failed to load area");
            } finally {
                setLoading(false);
            }
        };
        run();
    }, [id]);

    const validate = () => {
        const next: Record<string, string> = {};
        if (!form.title.trim()) next.title = "Title is required";
        if (!form.alias.trim()) next.alias = "Alias is required";
        if (!stripHtml(form.description)) next.description = "Description is required";
        if (!featureImgFile && !form.featureImg.trim()) next.featureImg = "Feature image is required";
        setErrors(next);
        return Object.keys(next).length === 0;
    };

    const handleSave = async () => {
        setDirty({ title: true, alias: true, description: true, featureImg: true });
        if (!validate()) return;
        if (saving) return;
        setSaving(true);
        try {
            let featureImgUrl = form.featureImg.trim();
            if (featureImgFile) {
                const fd = new FormData();
                fd.append("fmFile", featureImgFile, featureImgFile.name);
                useStoreSnackbar.getState().showSnackbar({ title: "Uploading", description: "Uploading feature image", color: "warning" });
                const uploaded = await fetchWithToken("/api/file/upload", fd as any, { method: "POST" });
                featureImgUrl = getUploadUrl(uploaded);
                if (!featureImgUrl) {
                    throw new Error("Failed to upload feature image");
                }
            }

            await fetchWithToken(
                `/api/area/${id}`,
                {
                    title: form.title.trim(),
                    alias: form.alias.trim(),
                    status: form.status === "true",
                    featureImg: featureImgUrl,
                    headerContent: form.headerContent,
                    description: form.description,
                    footerContent: form.footerContent,
                },
                { method: "PUT" },
            );
            useStoreSnackbar.getState().showSnackbar({ title: "Success", description: "Area updated", color: "success" });
            navigate("/itinerary/area");
        } catch (e: any) {
            useStoreSnackbar.getState().showSnackbar({ title: "Error", description: e?.message || "Failed to update area", color: "danger" });
        } finally {
            setSaving(false);
        }
    };

    const previewUrl = featureImgPreview || form.featureImg.trim();

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
                <button type="button" onClick={() => navigate("/itinerary/area")} className="rounded-sm px-1 py-0.5 text-primary hover:bg-primary_hover">
                    Area
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
                    title="Edit Area"
                    contentTrailing={
                        <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center md:justify-end">
                            <Button color="secondary" iconLeading={ArrowLeft} onClick={() => navigate("/itinerary/area")}>
                                Back
                            </Button>
                            <Button color="primary" isDisabled={!canSave} isLoading={saving} onClick={handleSave}>
                                Save
                            </Button>
                        </div>
                    }
                />

                {loading ? (
                    <div className="space-y-4 bg-primary px-4 py-5 md:px-6">
                        <div className="animate-pulse space-y-4">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <div className="h-4 w-24 rounded bg-secondary" />
                                    <div className="h-10 w-full rounded bg-secondary" />
                                </div>
                                <div className="space-y-2">
                                    <div className="h-4 w-24 rounded bg-secondary" />
                                    <div className="h-10 w-full rounded bg-secondary" />
                                </div>
                                <div className="space-y-2 md:col-span-1">
                                    <div className="h-4 w-24 rounded bg-secondary" />
                                    <div className="h-10 w-full rounded bg-secondary" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="h-4 w-32 rounded bg-secondary" />
                                <div className="h-44 w-full rounded bg-secondary" />
                            </div>

                            <div className="space-y-2">
                                <div className="h-4 w-32 rounded bg-secondary" />
                                <div className="h-32 w-full rounded bg-secondary" />
                            </div>

                            <div className="space-y-2">
                                <div className="h-4 w-32 rounded bg-secondary" />
                                <div className="h-32 w-full rounded bg-secondary" />
                            </div>

                            <div className="space-y-2">
                                <div className="h-4 w-32 rounded bg-secondary" />
                                <div className="h-48 w-full rounded bg-secondary" />
                            </div>

                            <div className="flex flex-col gap-2 border-t border-secondary pt-4 md:flex-row md:items-center md:justify-end">
                                <div className="h-10 w-full rounded bg-secondary md:w-28" />
                                <div className="h-10 w-full rounded bg-secondary md:w-28" />
                            </div>
                        </div>
                    </div>
                ) : loadError ? (
                    <div className="px-4 py-10 text-sm text-error md:px-6">{loadError}</div>
                ) : (
                    <div className="space-y-4 bg-primary px-4 py-5 md:px-6">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <Input
                                label="Title *"
                                placeholder="Enter area title"
                                value={form.title}
                                onChange={(v) => setForm((p) => ({ ...p, title: v }))}
                                isInvalid={Boolean(dirty.title && errors.title)}
                                hint={dirty.title && errors.title ? errors.title : undefined}
                            />
                            <Input
                                label="Alias *"
                                placeholder="Enter area alias"
                                value={form.alias}
                                onChange={(v) => setForm((p) => ({ ...p, alias: v }))}
                                isInvalid={Boolean(dirty.alias && errors.alias)}
                                hint={dirty.alias && errors.alias ? errors.alias : undefined}
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

                        <div className="space-y-1.5">
                            <div className="text-sm font-medium text-primary">Description *</div>
                            <RichTextEditor value={form.description} onChange={(v) => setForm((p) => ({ ...p, description: v }))} />
                            {dirty.description && errors.description ? <p className="text-xs text-error">{errors.description}</p> : null}
                        </div>

                        <div className="space-y-1.5">
                            <div className="text-sm font-medium text-primary">Header Content</div>
                            <RichTextEditor value={form.headerContent} onChange={(v) => setForm((p) => ({ ...p, headerContent: v }))} />
                        </div>

                        <div className="space-y-1.5">
                            <div className="text-sm font-medium text-primary">Footer Content</div>
                            <RichTextEditor value={form.footerContent} onChange={(v) => setForm((p) => ({ ...p, footerContent: v }))} />
                        </div>

                        <div className="space-y-2">
                            <div className="text-sm font-medium text-primary">Feature Image *</div>
                            {previewUrl ? (
                                <div className="relative overflow-hidden rounded-xl ring-1 ring-secondary">
                                    <img src={previewUrl} alt="Feature preview" className="max-h-80 max-w-100 object-cover" />
                                    <div className="absolute right-2 top-2">
                                        <Button
                                            color="secondary-destructive"
                                            size="sm"
                                            iconLeading={Trash01}
                                            onClick={() => {
                                                setFeatureImgFile(null);
                                                setForm((p) => ({ ...p, featureImg: "" }));
                                                setDirty((p) => ({ ...p, featureImg: true }));
                                            }}
                                        >
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
                            <Button color="secondary" iconLeading={ArrowLeft} onClick={() => navigate("/itinerary/area")}>
                                Back
                            </Button>
                            <Button color="primary" isDisabled={!canSave} isLoading={saving} onClick={handleSave}>
                                Save
                            </Button>
                        </div>
                    </div>
                )}
            </TableCard.Root>
        </DefaultLayout>
    );
}
