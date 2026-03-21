import { DefaultLayout } from "@/layouts/DefaultLayout";
import { TableCard } from "@/components/application/table/table";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { useStoreSnackbar } from "@/store/snackbar";
import { getBookingtypeById } from "@/utils/services/bookingTypeService";
import { ArrowLeft, Edit01, Home04 } from "@untitledui/icons";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";

const toArray = (value: any) => (Array.isArray(value) ? value : value ? [value] : []);

export default function BookingTypeViewPage() {
    const navigate = useNavigate();
    const params = useParams();
    const id = String(params.id || "");
    const { showSnackbar } = useStoreSnackbar();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        const run = async () => {
            if (!id) {
                setLoading(false);
                showSnackbar({ title: "Error", description: "Invalid booking type id", color: "danger" });
                return;
            }
            setLoading(true);
            try {
                const response = await getBookingtypeById(id);
                if (response?.error) throw new Error(response.error);
                setData(response?.data ?? response);
            } catch (error: any) {
                showSnackbar({
                    title: "Error",
                    description: error?.message || "Failed to load booking type",
                    color: "danger",
                });
            } finally {
                setLoading(false);
            }
        };
        run();
    }, [id, showSnackbar]);

    const additionalDetails = useMemo(() => toArray(data?.customParams?.additionalDetails), [data]);
    const additionalBookingDetails = useMemo(() => toArray(data?.customParams?.additionalBookingDetails), [data]);

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
                <button type="button" onClick={() => navigate("/bookings/bookingtype")} className="rounded-sm px-1 py-0.5 text-primary hover:bg-primary_hover">
                    Booking Type
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
                    title="Booking Type Details"
                    contentTrailing={
                        <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center md:justify-end">
                            <Button color="secondary" iconLeading={ArrowLeft} onClick={() => navigate("/bookings/bookingtype")}>
                                Back
                            </Button>
                            <Button color="primary" iconLeading={Edit01} onClick={() => navigate(`/bookings/bookingtype/edit/${id}`)}>
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
                                <div className="text-xs font-semibold uppercase text-tertiary">Booking Type</div>
                                <div className="text-sm font-semibold text-primary">{data?.title || "-"}</div>
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
                                <div className="text-xs font-semibold uppercase text-tertiary">Additional Details</div>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {additionalDetails.length > 0 ? (
                                        additionalDetails.map((field: any, index: number) => (
                                            <Badge key={`additional-${index}`} size="sm" color="gray">
                                                {[field?.value || field?.key || "Field", field?.type].filter(Boolean).join(" · ")}
                                            </Badge>
                                        ))
                                    ) : (
                                        <span className="text-sm text-tertiary">-</span>
                                    )}
                                </div>
                            </div>
                            <div className="rounded-lg border border-secondary bg-secondary p-3 md:col-span-2">
                                <div className="text-xs font-semibold uppercase text-tertiary">Additional Booking Details</div>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {additionalBookingDetails.length > 0 ? (
                                        additionalBookingDetails.map((field: any, index: number) => (
                                            <Badge key={`additional-booking-${index}`} size="sm" color="gray">
                                                {[field?.value || field?.key || "Field", field?.type].filter(Boolean).join(" · ")}
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
