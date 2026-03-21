import { DefaultLayout } from "@/layouts/DefaultLayout";
import { TableCard } from "@/components/application/table/table";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Select } from "@/components/base/select/select";
import { MultiSelect } from "@/components/base/select/multi-select";
import { SelectItem } from "@/components/base/select/select-item";
import { useListData } from "react-stately";
import { getbookingtype } from "@/utils/services/bookingTypeService";
import { useStoreSnackbar } from "@/store/snackbar";
import { addVendor } from "@/utils/services/vendorService";
import { ArrowLeft, Home04 } from "@untitledui/icons";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";

const splitServices = (value: string) =>
    value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

export default function VendorAddPage() {
    const navigate = useNavigate();
    const { showSnackbar } = useStoreSnackbar();
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
    const selectedBookingTypes = useListData<any>({
        initialItems: [],
        getKey: (item) => item.id,
    });

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
                bookingsType: selectedBookingTypes.items.map((item) => item.id),
                status: form.status === "true",
            };
            const response = await addVendor(payload);
            if (response?.error) throw new Error(response.error);
            showSnackbar({
                title: "Success",
                description: "Vendor created",
                color: "success",
            });
            navigate("/bookings/vendorlist");
        } catch (error: any) {
            showSnackbar({
                title: "Error",
                description: error?.message || "Failed to create vendor",
                color: "danger",
            });
        } finally {
            setSaving(false);
        }
    };

    // Fetch booking types
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
                <span className="px-1 py-0.5 text-primary">Add</span>
            </div>
        </div>
    );

    return (
        <DefaultLayout>
            {breadcrumbs}
            <TableCard.Root>
                <TableCard.Header
                    title="Add Vendor"
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
                        <div>
                            <MultiSelect
                                label="Booking Type "
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
                </div>
            </TableCard.Root>
        </DefaultLayout>
    );
}
