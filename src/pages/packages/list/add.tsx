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
import { useEffect, useMemo, useState } from "react";
import { useListData } from "react-stately";
import { useNavigate } from "react-router";

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

export default function PackageAddPage() {
    const navigate = useNavigate();
    const { showSnackbar } = useStoreSnackbar();

    const [saving, setSaving] = useState(false);
    const [loadingLookups, setLoadingLookups] = useState(true);

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

    const [featureImgFile, setFeatureImgFile] = useState<File | null>(null);
    const [featureImgPreview, setFeatureImgPreview] = useState<string>("");
    const [dirty, setDirty] = useState<Record<string, boolean>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        const run = async () => {
            setLoadingLookups(true);
            try {
                const [locRes, tagRes, typeRes] = await Promise.all([
                    fetchWithToken("/api/location", {}),
                    fetchWithToken("/api/packagetag", {}),
                    fetchWithToken("/api/packagetype", {}),
                ]);
                const locResolved = (locRes as any)?.data ?? locRes;
                const tagResolved = (tagRes as any)?.data ?? tagRes;
                const typeResolved = (typeRes as any)?.data ?? typeRes;
                const locList = Array.isArray(locResolved?.data) ? locResolved.data : Array.isArray(locResolved) ? locResolved : asArray(locResolved?.items);
                const tagList = Array.isArray(tagResolved?.data) ? tagResolved.data : Array.isArray(tagResolved) ? tagResolved : asArray(tagResolved?.items);
                const typeList = Array.isArray(typeResolved?.data) ? typeResolved.data : Array.isArray(typeResolved) ? typeResolved : asArray(typeResolved?.items);
                setLocations(uniqueById(asArray(locList).map((it: any) => ({ id: getId(it), title: String(it?.title ?? "") }))));
                setPackageTags(uniqueById(asArray(tagList).map((it: any) => ({ id: getId(it), title: String(it?.title ?? "") }))));
                setPackageTypes(uniqueById(asArray(typeList).map((it: any) => ({ id: getId(it), title: String(it?.title ?? "") }))));
            } catch (e: any) {
                showSnackbar({ title: "Error", description: e?.message || "Failed to load lookups", color: "danger" });
                setLocations([]);
                setPackageTags([]);
                setPackageTypes([]);
            } finally {
                setLoadingLookups(false);
            }
        };
        run();
    }, [showSnackbar]);

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
        if (saving) return false;
        if (!form.title.trim()) return false;
        if (!form.location) return false;
        if (!form.cost.trim()) return false;
        if (!form.mrp.trim()) return false;
        if (selectedPackageTags.items.length === 0) return false;
        if (selectedPackageTypes.items.length === 0) return false;
        if (!featureImgFile) return false;
        return true;
    }, [featureImgFile, form.cost, form.location, form.mrp, form.title, saving, selectedPackageTags.items.length, selectedPackageTypes.items.length]);

    const validate = () => {
        const next: Record<string, string> = {};
        if (!form.title.trim()) next.title = "Title is required";
        if (!form.location) next.location = "Location is required";
        if (selectedPackageTags.items.length === 0) next.packageTags = "Package tags are required";
        if (selectedPackageTypes.items.length === 0) next.packageTypes = "Package types are required";
        if (!form.cost.trim()) next.cost = "Cost is required";
        if (!form.mrp.trim()) next.mrp = "Mrp is required";
        if (!featureImgFile) next.featureImg = "Feature image is required";
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
        if (saving) return;
        setSaving(true);
        try {
            const fd = new FormData();
            fd.append("fmFile", featureImgFile as File, (featureImgFile as File).name);
            showSnackbar({ title: "Uploading", description: "Uploading feature image", color: "warning" });
            const uploaded = await fetchWithToken("/api/file/upload", fd as any, { method: "POST" });
            const featureImgUrl = getUploadUrl(uploaded);
            if (!featureImgUrl) throw new Error("Failed to upload feature image");

            const payload = {
                title: form.title.trim(),
                location: form.location,
                packageTags: selectedPackageTags.items.map((it) => String(it.id)),
                packageTypes: selectedPackageTypes.items.map((it) => String(it.id)),
                cost: form.cost,
                mrp: form.mrp,
                startDate: form.startDate || "",
                endDate: form.endDate || "",
                featureImg: featureImgUrl,
                status: form.status === "true",
            };
            const res = await fetchWithToken("/api/package", payload, { method: "POST" });
            if ((res as any)?.error) throw new Error((res as any).error);
            showSnackbar({ title: "Success", description: "Package created", color: "success" });
            navigate("/packages/list");
        } catch (e: any) {
            showSnackbar({ title: "Error", description: e?.message || "Failed to create package", color: "danger" });
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
                <span className="px-1 py-0.5 text-primary">Add</span>
            </div>
        </div>
    );

    return (
        <DefaultLayout>
            {breadcrumbs}
            <TableCard.Root>
                <TableCard.Header
                    title="Add Package"
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
                            isDisabled={loadingLookups}
                        >
                            {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                        </ComboBox>
                        <MultiSelect
                            label="Package Tags *"
                            placeholder="Select package tags"
                            items={toSelectItems(packageTags)}
                            selectedItems={selectedPackageTags}
                            isDisabled={loadingLookups}
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
                            isDisabled={loadingLookups}
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
                </div>
            </TableCard.Root>
        </DefaultLayout>
    );
}
