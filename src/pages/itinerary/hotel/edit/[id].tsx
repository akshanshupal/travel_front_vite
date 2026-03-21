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

type CategoryItem = {
    id: string;
    label: string;
};

export default function ItineraryHotelEditPage() {
    const navigate = useNavigate();
    const params = useParams();
    const id = getId(params.id);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [loadError, setLoadError] = useState<string | null>(null);
    const [form, setForm] = useState({
        name: "",
        location: "",
        address: "",
        category: "",
        status: "true",
    });
    const [categories, setCategories] = useState<CategoryItem[]>([]);
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


    const canSave = useMemo(() => {
        if (!id) return false;
        if (!form.name.trim()) return false;
        if (!form.location.trim()) return false;
        if (!form.category) return false;
        return true;
    }, [ form.name, form.address, form.location, form.category, id]);

    useEffect(() => {
        const run = async () => {
            if (!id) {
                setLoadError("Invalid hotel id");
                setLoading(false);
                return;
            }
            setLoading(true);
            setLoadError(null);
            try {
                const res = await fetchWithToken(`/api/hotel/${id}`, { populate: "category" });
                const resolved = (res as any)?.data ?? res;
                setForm({
                    name: String(resolved?.name ?? ""),
                    location: String(resolved?.location ?? ""),
                    address: String(resolved?.address ?? ""),
                    category: getId(resolved?.category),
                    status: String((resolved?.status ?? true) ? "true" : "false"),
                });
            } catch (e: any) {
                setLoadError(e?.error?.message || e?.message || "Failed to load hotel");
            } finally {
                setLoading(false);
            }
        };
        run();
    }, [id]);

    const validate = () => {
        const next: Record<string, string> = {};
        if (!form.name.trim()) next.name = "Name is required";
        if (!form.location.trim()) next.location = "Location is required";
        if (!form.address.trim()) next.address = "Address is required";
        if (!form.category) next.category = "Category is required";
        setErrors(next);
        return Object.keys(next).length === 0;
    };

    const handleSave = async () => {
        setDirty({ name: true, alias: true, location: true, address: true, category: true, description: true, featureImg: true });
        if (!validate()) return;
        if (saving) return;
        setSaving(true);
        try {
          

            await fetchWithToken(
                `/api/hotel/${id}`,
                {
                    ...(form.name.trim() ? { name: form.name.trim() } : {}),
                    ...(form.location.trim() ? { location: form.location.trim() } : {}),
                    ...(form.address.trim() ? { address: form.address.trim() } : {}),
                    ...(form.category ? { category: form.category } : {}),
                    ...(["true", "false"].includes(form.status) ? { status: form.status === "true" } : {}),
            
                },
                { method: "PUT" },
            );
            useStoreSnackbar.getState().showSnackbar({ title: "Success", description: "Hotel updated", color: "success" });
            navigate("/itinerary/hotel");
        } catch (e: any) {
            useStoreSnackbar.getState().showSnackbar({ title: "Error", description: e?.message || "Failed to update hotel", color: "danger" });
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
                <span className="px-1 py-0.5 text-primary">Edit</span>
            </div>
        </div>
    );

    return (
        <DefaultLayout>
            {breadcrumbs}
            <TableCard.Root>
                <TableCard.Header
                    title="Edit Hotel"
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
                                <div className="space-y-2">
                                    <div className="h-4 w-24 rounded bg-secondary" />
                                    <div className="h-10 w-full rounded bg-secondary" />
                                </div>
                                <div className="space-y-2">
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
                                placeholder="Enter hotel name"
                                value={form.name}
                                onChange={(v) => setForm((p) => ({ ...p, name: v }))}
                                isInvalid={Boolean(dirty.name && errors.name)}
                                hint={dirty.name && errors.name ? errors.name : undefined}
                            />
                            <Input
                                label="Location *"
                                placeholder="Enter hotel location"
                                value={form.location}
                                onChange={(v) => setForm((p) => ({ ...p, location: v }))}
                                isInvalid={Boolean(dirty.location && errors.location)}
                                hint={dirty.location && errors.location ? errors.location : undefined}
                            />
                            <div className="col-span-1 md:col-span-2">
                                <Input
                                    label="Address"
                                    placeholder="Enter hotel address"
                                    value={form.address}
                                    onChange={(v) => setForm((p) => ({ ...p, address: v }))}
                                    isInvalid={Boolean(dirty.address && errors.address)}
                                    hint={dirty.address && errors.address ? errors.address : undefined}
                                />
                            </div>
                            <Select
                                aria-label="Category *"
                                label="Select an category *"
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

                        

                        {/* <div className="flex flex-col gap-2 border-t border-secondary pt-4 md:flex-row md:items-center md:justify-end">
                            <Button color="secondary" iconLeading={ArrowLeft} onClick={() => navigate("/itinerary/hotel")}>
                                Back
                            </Button>
                            <Button color="primary" isDisabled={!canSave} isLoading={saving} onClick={handleSave}>
                                Save
                            </Button>
                        </div> */}
                    </div>
                )}
            </TableCard.Root>
        </DefaultLayout>
    );
}
