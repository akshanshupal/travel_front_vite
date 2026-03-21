import { DefaultLayout } from "@/layouts/DefaultLayout";
import { TableCard } from "@/components/application/table/table";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Select } from "@/components/base/select/select";
import { MultiSelect } from "@/components/base/select/multi-select";
import { SelectItem } from "@/components/base/select/select-item";
import { useStoreSnackbar } from "@/store/snackbar";
import { getVendorById, updateVendorById } from "@/utils/services/vendorService";
import { getbookingtype } from "@/utils/services/bookingTypeService";
import { ArrowLeft, Home04 } from "@untitledui/icons";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useListData } from "react-stately";

const splitServices = (value: string) =>
    value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

const joinServices = (value: any) => {
    if (Array.isArray(value)) return value.join(", ");
    if (typeof value === "string") return value;
    return "";
};

export default function VendorEditPage() {
    const navigate = useNavigate();
    const params = useParams();
    const id = String(params.id || "");
    const { showSnackbar } = useStoreSnackbar();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [dirty, setDirty] = useState<Record<string, boolean>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [form, setForm] = useState({
        title: "",
        mobile: "",
        vendorLocation: "",
        vendorService: "",
        status: "true",
    });
    const [bookingTypeItems, setBookingTypeItems] = useState<any[]>([]);
    const [bookingTypeIds, setBookingTypeIds] = useState<string[]>([]);
    const selectedBookingTypes = useListData<any>({
        initialItems: [],
        getKey: (item) => item.id,
    });

    useEffect(() => {
        const run = async () => {
            if (!id) {
                setLoading(false);
                showSnackbar({ title: "Error", description: "Invalid vendor id", color: "danger" });
                return;
            }
            setLoading(true);
            try {
                const response = await getVendorById(id, { populate: "bookingstype" });
                if (response?.error) throw new Error(response.error);
                const resolved = response?.data ?? response;
                setForm({
                    title: String(resolved?.title ?? ""),
                    mobile: String(resolved?.mobile ?? ""),
                    vendorLocation: String(resolved?.vendorLocation ?? ""),
                    vendorService: joinServices(resolved?.vendorService),
                    status: String((resolved?.status ?? true) ? "true" : "false"),
                });
                const bookingTypeCandidates = [
                    resolved?.bookingsType,
                    resolved?.bookingType,
                    resolved?.bookingTypes,
                    resolved?.bookingstype,
                    resolved?.bookingsTypes,
                ].filter((value) => value !== undefined && value !== null);
                const rawBookingTypes =
                    bookingTypeCandidates.find((value) => (Array.isArray(value) ? value.length > 0 : true)) ?? [];
                const normalized = Array.isArray(rawBookingTypes) ? rawBookingTypes : [rawBookingTypes];
                const ids = normalized
                    .map((item: any) => String(item?.id ?? item?._id ?? item?.bookingType?.id ?? item?.bookingType?._id ?? item))
                    .filter((value: string) => value.trim() !== "");
                setBookingTypeIds(ids);
            } catch (error: any) {
                showSnackbar({
                    title: "Error",
                    description: error?.message || "Failed to load vendor",
                    color: "danger",
                });
            } finally {
                setLoading(false);
            }
        };
        run();
    }, [id, showSnackbar]);

    useEffect(() => {
        const run = async () => {
            try {
                const res = await getbookingtype({ limit: "all" });
                const data = res?.data ?? res ?? [];
                const items = (Array.isArray(data) ? data : []).map((item: any) => ({
                    id: String(item?.id ?? item?._id ?? item?.key ?? item?.title),
                    label: String(item?.title ?? item?.name ?? "Type"),
                }));
                setBookingTypeItems(items);
            } catch (error) {
                // silent
            }
        };
        run();
    }, []);

    useEffect(() => {
        if (bookingTypeItems.length === 0) return;
        if (bookingTypeIds.length === 0) return;
        const selected = bookingTypeItems.filter((item) => bookingTypeIds.includes(String(item.id)));
        [...selectedBookingTypes.items].forEach((i) => selectedBookingTypes.remove(i.id));
        selected.forEach((i) => selectedBookingTypes.append(i));
    }, [bookingTypeIds, bookingTypeItems]);

    const canSave = useMemo(
        () => Boolean(form.title.trim()) && Boolean(form.mobile.trim()) && Boolean(form.vendorLocation.trim()) && selectedBookingTypes.items.length > 0 && !saving,
        [form, saving, selectedBookingTypes.items.length],
    );

    const validate = () => {
        const next: Record<string, string> = {};
        const splitPhones = (value: string) =>
            value
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean);
        const isValidPhone = (value: string) => {
            const normalized = value.replace(/[\s\-()]/g, "");
            return /^\+?[0-9]{7,15}$/.test(normalized);
        };
        if (!form.title.trim()) next.title = "Title is required";
        const phones = splitPhones(form.mobile);
        if (phones.length === 0) {
            next.mobile = "Vendor number is required";
        } else {
            const invalid = phones.filter((p) => !isValidPhone(p));
            if (invalid.length > 0) {
                next.mobile = `Invalid phone numbers: ${invalid.join(", ")}`;
            }
        }
        if (!form.vendorLocation.trim()) next.vendorLocation = "Location is required";
        if (selectedBookingTypes.items.length === 0) next.bookingType = "Booking Type is required";
        setErrors(next);
        return Object.keys(next).length === 0;
    };

    const handleSave = async () => {
        setDirty({ title: true, mobile: true, vendorLocation: true, bookingType: true });
        if (!validate()) return;
        if (saving) return;
        setSaving(true);
        try {
            const phones = form.mobile
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean);
            const payload = {
                title: form.title.trim(),
                mobile: phones.join(", "),
                vendorLocation: form.vendorLocation.trim(),
                vendorService: splitServices(form.vendorService),
                bookingType: selectedBookingTypes.items.map((item) => item.id),
                status: form.status === "true",
            };
            const response = await updateVendorById(id, payload);
            if (response?.error) throw new Error(response.error);
            showSnackbar({
                title: "Success",
                description: "Vendor updated",
                color: "success",
            });
            navigate("/bookings/vendorlist");
        } catch (error: any) {
            showSnackbar({
                title: "Error",
                description: error?.message || "Failed to update vendor",
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
                <button type="button" onClick={() => navigate("/bookings/vendorlist")} className="rounded-sm px-1 py-0.5 text-primary hover:bg-primary_hover">
                    Vendor List
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
                    title="Edit Vendor"
                    contentTrailing={
                        <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center md:justify-end">
                            <Button color="secondary" iconLeading={ArrowLeft} onClick={() => navigate("/bookings/vendorlist")}>
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
                                    label="Vendor Name *"
                                    placeholder="Enter vendor name"
                                    value={form.title}
                                    onChange={(value) => setForm((prev) => ({ ...prev, title: value }))}
                                    isInvalid={Boolean(dirty.title && errors.title)}
                                    hint={dirty.title && errors.title ? errors.title : undefined}
                                />
                                <Input
                                    label="Vendor Numbers *"
                                    placeholder="Enter numbers separated by comma"
                                    value={form.mobile}
                                    onChange={(value) => setForm((prev) => ({ ...prev, mobile: value }))}
                                    isInvalid={Boolean(dirty.mobile && errors.mobile)}
                                    hint={dirty.mobile && errors.mobile ? errors.mobile : undefined}
                                />
                                <Input
                                    label="Vendor Location *"
                                    placeholder="Enter vendor location"
                                    value={form.vendorLocation}
                                    onChange={(value) => setForm((prev) => ({ ...prev, vendorLocation: value }))}
                                    isInvalid={Boolean(dirty.vendorLocation && errors.vendorLocation)}
                                    hint={dirty.vendorLocation && errors.vendorLocation ? errors.vendorLocation : undefined}
                                />
                                <div className="md:col-span-2">
                                    <MultiSelect
                                        label="Booking Type *"
                                        isRequired
                                        items={bookingTypeItems}
                                        selectedItems={selectedBookingTypes}
                                        placeholder="Select booking types"
                                        onItemInserted={() => {
                                            if (errors.bookingType) setErrors((prev) => ({ ...prev, bookingType: "" }));
                                        }}
                                        onItemCleared={() => {
                                            // no-op
                                        }}
                                    >
                                        {(item) => <SelectItem id={item.id}>{item.label}</SelectItem>}
                                    </MultiSelect>
                                    {dirty.bookingType && errors.bookingType ? <p className="text-sm font-medium text-error-primary">{errors.bookingType}</p> : null}
                                </div>
                                <Input
                                    label="Vendor Service"
                                    placeholder="Comma separated services"
                                    value={form.vendorService}
                                    onChange={(value) => setForm((prev) => ({ ...prev, vendorService: value }))}
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
                            <div className="flex flex-col gap-2 border-t border-secondary pt-4 md:flex-row md:items-center md:justify-end">
                                <Button color="secondary" iconLeading={ArrowLeft} onClick={() => navigate("/bookings/vendorlist")}>
                                    Back
                                </Button>
                                <Button color="primary" isDisabled={!canSave} isLoading={saving} onClick={handleSave}>
                                    Save
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </TableCard.Root>
        </DefaultLayout>
    );
}
