import { DefaultLayout } from "@/layouts/DefaultLayout";
import { TableCard } from "@/components/application/table/table";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { useStoreSnackbar } from "@/store/snackbar";
import { getbookingtype } from "@/utils/services/bookingTypeService";
import { getVendorById } from "@/utils/services/vendorService";
import { ArrowLeft, Edit01, Home04 } from "@untitledui/icons";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function VendorViewPage() {
    const navigate = useNavigate();
    const params = useParams();
    const id = String(params.id || "");
    const { showSnackbar } = useStoreSnackbar();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any>(null);
    const [bookingTypes, setBookingTypes] = useState<any[]>([]);

    useEffect(() => {
        const run = async () => {
            if (!id) {
                setLoading(false);
                showSnackbar({ title: "Error", description: "Invalid vendor id", color: "danger" });
                return;
            }
            setLoading(true);
            try {
                const response = await getVendorById(id, { populate: "bookingtype" });
                if (response?.error) throw new Error(response.error);
                setData(response?.data ?? response);
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
                const response = await getbookingtype({ limit: "all" });
                setBookingTypes(response?.data ?? response ?? []);
            } catch {
                setBookingTypes([]);
            }
        };
        run();
    }, []);

    const bookingTypeTitleMap = useMemo(() => {
        const map = new Map<string, string>();
        (Array.isArray(bookingTypes) ? bookingTypes : []).forEach((item: any) => {
            const id = String(item?.id ?? item?._id ?? "").trim();
            const title = String(item?.title ?? item?.name ?? "").trim();
            if (id && title) map.set(id, title);
        });
        return map;
    }, [bookingTypes]);

    const bookingTypeLabels = useMemo(() => {
        const map = bookingTypeTitleMap;
        const resolveEntry = (entry: any) => {
            if (!entry) return "";
            if (typeof entry === "string") {
                const trimmed = entry.trim();
                if (!trimmed) return "";
                return map.get(trimmed) || trimmed;
            }
            const nestedTitle = String(entry?.bookingType?.title ?? entry?.bookingType?.name ?? "").trim();
            if (nestedTitle) return nestedTitle;
            const directTitle = String(entry?.title ?? entry?.name ?? "").trim();
            if (directTitle) return directTitle;
            const id = String(entry?.id ?? entry?._id ?? "").trim();
            return id ? map.get(id) || id : "";
        };
        const resolveFromValue = (value: any) => {
            if (!value) return [];
            if (Array.isArray(value)) return value.map(resolveEntry).filter(Boolean);
            if (typeof value === "string") {
                return value
                    .split(",")
                    .map((part) => resolveEntry(part))
                    .filter(Boolean);
            }
            return [resolveEntry(value)].filter(Boolean);
        };
        const candidates = [
            data?.bookingsType,
            data?.bookingtype,
            data?.bookingType,
            data?.bookingTypes,
            data?.vendorService,
            data?.vendorServices,
            data?.service,
            data?.services,
        ];
        const collected = candidates.flatMap(resolveFromValue).filter(Boolean);
        return Array.from(new Set(collected));
    }, [bookingTypeTitleMap, data]);

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
                <span className="px-1 py-0.5 text-primary">View</span>
            </div>
        </div>
    );

    return (
        <DefaultLayout>
            {breadcrumbs}
            <TableCard.Root>
                <TableCard.Header
                    title="Vendor Details"
                    contentTrailing={
                        <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center md:justify-end">
                            <Button color="secondary" iconLeading={ArrowLeft} onClick={() => navigate("/bookings/vendorlist")}>
                                Back
                            </Button>
                            <Button color="primary" iconLeading={Edit01} onClick={() => navigate(`/bookings/vendorlist/edit/${id}`)}>
                                Edit
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
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="rounded-lg border border-secondary bg-secondary p-3">
                                <div className="text-xs font-semibold uppercase text-tertiary">Vendor Name</div>
                                <div className="text-sm font-semibold text-primary">{data?.title || "-"}</div>
                            </div>
                            <div className="rounded-lg border border-secondary bg-secondary p-3">
                                <div className="text-xs font-semibold uppercase text-tertiary">Vendor Number</div>
                                <div className="text-sm font-semibold text-primary">{data?.mobile || "-"}</div>
                            </div>
                            <div className="rounded-lg border border-secondary bg-secondary p-3">
                                <div className="text-xs font-semibold uppercase text-tertiary">Vendor Location</div>
                                <div className="text-sm font-semibold text-primary">{data?.vendorLocation || "-"}</div>
                            </div>
                            <div className="rounded-lg border border-secondary bg-secondary p-3">
                                <div className="text-xs font-semibold uppercase text-tertiary">Status</div>
                                <div className="text-sm font-semibold text-primary">
                                    <Badge size="sm" color={data?.status ? "success" : "error"}>
                                        {data?.status ? "Active" : "Inactive"}
                                    </Badge>
                                </div>
                            </div>
                            <div className="rounded-lg border border-secondary bg-secondary p-3 md:col-span-2">
                                <div className="text-xs font-semibold uppercase text-tertiary">Vendor Service</div>
                                <div className="mt-2 flex flex-wrap gap-1.5">
                                    {bookingTypeLabels.length > 0 ? (
                                        bookingTypeLabels.map((service: string, index: number) => (
                                            <Badge key={`${service}-${index}`} size="sm" color="gray">
                                                {service}
                                            </Badge>
                                        ))
                                    ) : (
                                        <span className="text-sm text-tertiary">-</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </TableCard.Root>
        </DefaultLayout>
    );
}
