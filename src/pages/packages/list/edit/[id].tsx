import { DefaultLayout } from "@/layouts/DefaultLayout";
import { TableCard } from "@/components/application/table/table";
import { FileUploadDropZone } from "@/components/application/file-upload/file-upload-base";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { ComboBox } from "@/components/base/select/combobox";
import { MultiSelect } from "@/components/base/select/multi-select";
import type { SelectItemType } from "@/components/base/select/select";
import { Select } from "@/components/base/select/select";
import { useStoreSnackbar } from "@/store/snackbar";
import { fetchWithToken } from "@/utils/fetchApi";
import { ArrowLeft, Home04, Trash01 } from "@untitledui/icons";
import { useEffect, useMemo, useRef, useState } from "react";
import { useListData } from "react-stately";
import { useNavigate, useParams } from "react-router";

type LookupItem = { id: string; title?: string };

const asArray = (value: any) => (Array.isArray(value) ? value : []);
const getId = (value: any) => String(value?.id ?? value?._id ?? value ?? "").trim();
const uniqueById = <T extends { id: string }>(items: T[]) => {
    const seen = new Set<string>();
    return items.filter((it) => {
        if (!it.id) return false;
        if (seen.has(it.id)) return false;
        seen.add(it.id);
        return true;
    });
};

const getUploadUrl = (response: any) => {
    const resolved = response?.data ?? response;
    if (typeof resolved === "string") return resolved;
    if (typeof resolved?.url === "string") return resolved.url;
    if (typeof resolved?.data === "string") return resolved.data;
    if (typeof resolved?.location === "string") return resolved.location;
    return "";
};

const toSelectItems = (items: LookupItem[]): SelectItemType[] =>
    items
        .map((it) => ({ id: it.id, label: it.title || it.id }))
        .filter((it) => Boolean(it.id));

const normalizeIdArray = (value: any) =>
    asArray(value)
        .map((it) => getId(it))
        .filter(Boolean);

export default function PackageEditPage() {
    const navigate = useNavigate();
    const params = useParams();
    const id = getId(params.id);
    const { showSnackbar } = useStoreSnackbar();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const loadSeqRef = useRef(0);

    const [locations, setLocations] = useState<LookupItem[]>([]);
    const [packageTags, setPackageTags] = useState<LookupItem[]>([]);
    const [packageTypes, setPackageTypes] = useState<LookupItem[]>([]);

    const [form, setForm] = useState({
        title: "",
        location: "",
        cost: "",
        mrp: "",
        startDate: "",
        endDate: "",
        status: "true",
    });

    const selectedPackageTags = useListData<SelectItemType>({ initialItems: [] });
    const selectedPackageTypes = useListData<SelectItemType>({ initialItems: [] });

    const [featureImgUrl, setFeatureImgUrl] = useState<string>("");
    const [featureImgFile, setFeatureImgFile] = useState<File | null>(null);
    const [featureImgPreview, setFeatureImgPreview] = useState<string>("");

    const [dirty, setDirty] = useState<Record<string, boolean>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (featureImgFile) {
            const url = URL.createObjectURL(featureImgFile);
            setFeatureImgPreview(url);
            return () => URL.revokeObjectURL(url);
        }
        setFeatureImgPreview(featureImgUrl || "");
    }, [featureImgFile, featureImgUrl]);

    useEffect(() => {
        const run = async () => {
            const seq = ++loadSeqRef.current;
            if (!id) {
                if (seq === loadSeqRef.current) setLoading(false);
                showSnackbar({ title: "Error", description: "Invalid package id", color: "danger" });
                return;
            }
            if (seq === loadSeqRef.current) setLoading(true);
            try {
                const [pkgRes, locRes, tagRes, typeRes] = await Promise.all([
                    fetchWithToken(`/api/package/${id}`, {}),
                    fetchWithToken("/api/location", {}),
                    fetchWithToken("/api/packagetag", {}),
                    fetchWithToken("/api/packagetype", {}),
                ]);
                if (seq !== loadSeqRef.current) return;

                const pkgResolved = (pkgRes as any)?.data ?? pkgRes;
                const locResolved = (locRes as any)?.data ?? locRes;
                const tagResolved = (tagRes as any)?.data ?? tagRes;
                const typeResolved = (typeRes as any)?.data ?? typeRes;

                const locList = Array.isArray(locResolved?.data) ? locResolved.data : Array.isArray(locResolved) ? locResolved : asArray(locResolved?.items);
                const tagList = Array.isArray(tagResolved?.data) ? tagResolved.data : Array.isArray(tagResolved) ? tagResolved : asArray(tagResolved?.items);
                const typeList = Array.isArray(typeResolved?.data) ? typeResolved.data : Array.isArray(typeResolved) ? typeResolved : asArray(typeResolved?.items);

                const nextLocations = uniqueById(asArray(locList).map((it: any) => ({ id: getId(it), title: String(it?.title ?? "") })));
                const nextTags = uniqueById(asArray(tagList).map((it: any) => ({ id: getId(it), title: String(it?.title ?? "") })));
                const nextTypes = uniqueById(asArray(typeList).map((it: any) => ({ id: getId(it), title: String(it?.title ?? "") })));

                setLocations(nextLocations);
                setPackageTags(nextTags);
                setPackageTypes(nextTypes);

                const pkgLocationId = getId(pkgResolved?.location);
                const pkgTags = [...new Set(normalizeIdArray(pkgResolved?.packageTags))];
                const pkgTypes = [...new Set(normalizeIdArray(pkgResolved?.packageTypes))];

                setForm({
                    title: String(pkgResolved?.title ?? ""),
                    location: pkgLocationId || String(pkgResolved?.location ?? ""),
                    cost: String(pkgResolved?.cost ?? ""),
                    mrp: String(pkgResolved?.mrp ?? ""),
                    startDate: pkgResolved?.startDate ? String(pkgResolved.startDate).slice(0, 10) : "",
                    endDate: pkgResolved?.endDate ? String(pkgResolved.endDate).slice(0, 10) : "",
                    status: String((pkgResolved?.status ?? true) ? "true" : "false"),
                });
                setFeatureImgUrl(String(pkgResolved?.featureImg ?? ""));
                setFeatureImgFile(null);

                const prevTagIds = selectedPackageTags.items.map((it) => it.id);
                prevTagIds.forEach((tagId) => selectedPackageTags.remove(tagId));
                const prevTypeIds = selectedPackageTypes.items.map((it) => it.id);
                prevTypeIds.forEach((typeId) => selectedPackageTypes.remove(typeId));

                const tagLookup = new Map(nextTags.map((t) => [t.id, t.title || t.id]));
                const typeLookup = new Map(nextTypes.map((t) => [t.id, t.title || t.id]));
                pkgTags.forEach((tagId) => {
                    if (selectedPackageTags.getItem(tagId)) return;
                    selectedPackageTags.append({ id: tagId, label: tagLookup.get(tagId) || tagId });
                });
                pkgTypes.forEach((typeId) => {
                    if (selectedPackageTypes.getItem(typeId)) return;
                    selectedPackageTypes.append({ id: typeId, label: typeLookup.get(typeId) || typeId });
                });
            } catch (e: any) {
                if (seq !== loadSeqRef.current) return;
                showSnackbar({ title: "Error", description: e?.message || "Failed to load package", color: "danger" });
            } finally {
                if (seq === loadSeqRef.current) setLoading(false);
            }
        };
        run();
    }, [id, showSnackbar]);

    const canSave = useMemo(() => {
        if (saving || loading) return false;
        if (!form.title.trim()) return false;
        if (!form.location) return false;
        if (!form.cost.trim()) return false;
        if (!form.mrp.trim()) return false;
        if (selectedPackageTags.items.length === 0) return false;
        if (selectedPackageTypes.items.length === 0) return false;
        if (!featureImgFile && !featureImgUrl) return false;
        return true;
    }, [
        featureImgFile,
        featureImgUrl,
        form.cost,
        form.location,
        form.mrp,
        form.title,
        loading,
        saving,
        selectedPackageTags.items.length,
        selectedPackageTypes.items.length,
    ]);

    const validate = () => {
        const next: Record<string, string> = {};
        if (!form.title.trim()) next.title = "Title is required";
        if (!form.location) next.location = "Location is required";
        if (selectedPackageTags.items.length === 0) next.packageTags = "Package tags are required";
        if (selectedPackageTypes.items.length === 0) next.packageTypes = "Package types are required";
        if (!form.cost.trim()) next.cost = "Cost is required";
        if (!form.mrp.trim()) next.mrp = "Mrp is required";
        if (!featureImgFile && !featureImgUrl) next.featureImg = "Feature image is required";
        setErrors(next);
        if (Object.keys(next).length > 0) {
            showSnackbar({ title: "Validation Error", description: Object.values(next)[0], color: "danger" });
        }
        return Object.keys(next).length === 0;
    };

    const handleSave = async () => {
        setDirty({
            title: true,
            location: true,
            packageTags: true,
            packageTypes: true,
            cost: true,
            mrp: true,
            featureImg: true,
        });
        if (!validate()) return;
        if (saving || loading) return;
        setSaving(true);
        try {
            let nextFeatureImgUrl = featureImgUrl;
            if (featureImgFile) {
                const fd = new FormData();
                fd.append("fmFile", featureImgFile, featureImgFile.name);
                showSnackbar({ title: "Uploading", description: "Uploading feature image", color: "warning" });
                const uploaded = await fetchWithToken("/api/file/upload", fd as any, { method: "POST" });
                const uploadedUrl = getUploadUrl(uploaded);
                if (!uploadedUrl) throw new Error("Failed to upload feature image");
                nextFeatureImgUrl = uploadedUrl;
            }

            const payload = {
                title: form.title.trim(),
                location: form.location,
                packageTags: selectedPackageTags.items.map((it) => String(it.id)),
                packageTypes: selectedPackageTypes.items.map((it) => String(it.id)),
                cost: form.cost,
                mrp: form.mrp,
                startDate: form.startDate || "",
                endDate: form.endDate || "",
                featureImg: nextFeatureImgUrl,
                status: form.status === "true",
            };
            const res = await fetchWithToken(`/api/package/${id}`, payload, { method: "PUT" });
            if ((res as any)?.error) throw new Error((res as any).error);
            showSnackbar({ title: "Success", description: "Package updated", color: "success" });
            navigate("/packages/list");
        } catch (e: any) {
            showSnackbar({ title: "Error", description: e?.message || "Failed to update package", color: "danger" });
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
                <button type="button" onClick={() => navigate("/packages/list")} className="rounded-sm px-1 py-0.5 text-primary hover:bg-primary_hover">
                    Packages
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
                    title="Edit Package"
                    contentTrailing={
                        <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center md:justify-end">
                            <Button color="secondary" iconLeading={ArrowLeft} onClick={() => navigate("/packages/list")}>
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
                            <div className="h-10 w-full animate-pulse rounded bg-secondary" />
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <Input
                                    label="Title *"
                                    placeholder="Enter package title"
                                    value={form.title}
                                    onChange={(v) => setForm((p) => ({ ...p, title: v }))}
                                    isInvalid={Boolean(dirty.title && errors.title)}
                                    hint={dirty.title && errors.title ? errors.title : undefined}
                                />
                                <ComboBox
                                    label="Location *"
                                    placeholder="Select location"
                                    selectedKey={form.location || null}
                                    onSelectionChange={(key) => setForm((p) => ({ ...p, location: key ? String(key) : "" }))}
                                    items={toSelectItems(locations)}
                                >
                                    {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                </ComboBox>
                                <MultiSelect
                                    label="Package Tags *"
                                    placeholder="Select package tags"
                                    items={toSelectItems(packageTags)}
                                    selectedItems={selectedPackageTags}
                                    hint={dirty.packageTags && errors.packageTags ? errors.packageTags : undefined}
                                    isInvalid={Boolean(dirty.packageTags && errors.packageTags)}
                                >
                                    {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                </MultiSelect>
                                <MultiSelect
                                    label="Package Types *"
                                    placeholder="Select package types"
                                    items={toSelectItems(packageTypes)}
                                    selectedItems={selectedPackageTypes}
                                    hint={dirty.packageTypes && errors.packageTypes ? errors.packageTypes : undefined}
                                    isInvalid={Boolean(dirty.packageTypes && errors.packageTypes)}
                                >
                                    {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                </MultiSelect>
                                <Input
                                    label="Cost *"
                                    placeholder="Enter cost"
                                    value={form.cost}
                                    onChange={(v) => setForm((p) => ({ ...p, cost: v }))}
                                    isInvalid={Boolean(dirty.cost && errors.cost)}
                                    hint={dirty.cost && errors.cost ? errors.cost : undefined}
                                />
                                <Input
                                    label="Mrp *"
                                    placeholder="Enter mrp"
                                    value={form.mrp}
                                    onChange={(v) => setForm((p) => ({ ...p, mrp: v }))}
                                    isInvalid={Boolean(dirty.mrp && errors.mrp)}
                                    hint={dirty.mrp && errors.mrp ? errors.mrp : undefined}
                                />
                                <Input label="Start Date" type="date" value={form.startDate} onChange={(v) => setForm((p) => ({ ...p, startDate: v }))} />
                                <Input label="End Date" type="date" value={form.endDate} onChange={(v) => setForm((p) => ({ ...p, endDate: v }))} />
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

                            <div className="space-y-2">
                                <div className="text-sm font-medium text-primary">Feature Image *</div>
                                {featureImgPreview ? (
                                    <div className="relative overflow-hidden rounded-xl ring-1 ring-secondary">
                                        <img src={featureImgPreview} alt="Feature preview" className="max-h-80 max-w-100 object-cover" />
                                        <div className="absolute right-2 top-2 flex gap-2">
                                            <Button
                                                color="secondary-destructive"
                                                size="sm"
                                                iconLeading={Trash01}
                                                onClick={() => {
                                                    setFeatureImgFile(null);
                                                    setFeatureImgUrl("");
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
                        </>
                    )}
                </div>
            </TableCard.Root>
        </DefaultLayout>
    );
}
