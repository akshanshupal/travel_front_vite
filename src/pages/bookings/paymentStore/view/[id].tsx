import { DefaultLayout } from "@/layouts/DefaultLayout";
import { TableCard } from "@/components/application/table/table";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { useStoreSnackbar } from "@/store/snackbar";
import { getPaymentStoreById } from "@/utils/services/paymentStoreService";
import { ArrowLeft, Edit01, Home04 } from "@untitledui/icons";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function PaymentStoreViewPage() {
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
                showSnackbar({ title: "Error", description: "Invalid payment store id", color: "danger" });
                return;
            }
            setLoading(true);
            try {
                const response = await getPaymentStoreById(id);
                if (response?.error) throw new Error(response.error);
                setData(response?.data ?? response);
            } catch (error: any) {
                showSnackbar({
                    title: "Error",
                    description: error?.message || "Failed to load payment store",
                    color: "danger",
                });
            } finally {
                setLoading(false);
            }
        };
        run();
    }, [id, showSnackbar]);

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
                <button type="button" onClick={() => navigate("/bookings/paymentStore")} className="rounded-sm px-1 py-0.5 text-primary hover:bg-primary_hover">
                    Payment Store
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
                    title="Payment Store Details"
                    contentTrailing={
                        <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center md:justify-end">
                            <Button color="secondary" iconLeading={ArrowLeft} onClick={() => navigate("/bookings/paymentStore")}>
                                Back
                            </Button>
                            <Button color="primary" iconLeading={Edit01} onClick={() => navigate(`/bookings/paymentStore/edit/${id}`)}>
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
                                <div className="text-xs font-semibold uppercase text-tertiary">Title</div>
                                <div className="text-sm font-semibold text-primary">{data?.title || "-"}</div>
                            </div>
                            <div className="rounded-lg border border-secondary bg-secondary p-3">
                                <div className="text-xs font-semibold uppercase text-tertiary">Default</div>
                                <div className="text-sm font-semibold text-primary">
                                    <Badge size="sm" color={data?.isDefault ? "success" : "gray"}>
                                        {data?.isDefault ? "Yes" : "No"}
                                    </Badge>
                                </div>
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
                                <div className="text-xs font-semibold uppercase text-tertiary">Description</div>
                                {data?.description ? (
                                    <div className="text-sm text-primary" dangerouslySetInnerHTML={{ __html: data.description }} />
                                ) : (
                                    <div className="text-sm text-primary">-</div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </TableCard.Root>
        </DefaultLayout>
    );
}
