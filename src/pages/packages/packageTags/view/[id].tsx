import { DefaultLayout } from "@/layouts/DefaultLayout";
import { TableCard } from "@/components/application/table/table";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { useStoreSnackbar } from "@/store/snackbar";
import { fetchWithToken } from "@/utils/fetchApi";
import { ArrowLeft, Edit01, Home04 } from "@untitledui/icons";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

const getId = (value: any) => String(value?.id ?? value?._id ?? value ?? "").trim();

export default function PackageTagsViewPage() {
    const navigate = useNavigate();
    const params = useParams();
    const id = getId(params.id);
    const { showSnackbar } = useStoreSnackbar();

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        const run = async () => {
            if (!id) {
                setLoading(false);
                showSnackbar({ title: "Error", description: "Invalid package tag id", color: "danger" });
                return;
            }
            setLoading(true);
            try {
                const response = await fetchWithToken(`/api/packagetag/${id}`, {});
                if ((response as any)?.error) throw new Error((response as any).error);
                setData((response as any)?.data ?? response);
            } catch (error: any) {
                showSnackbar({ title: "Error", description: error?.message || "Failed to load package tag", color: "danger" });
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
                <button type="button" onClick={() => navigate("/packages/packageTags")} className="rounded-sm px-1 py-0.5 text-primary hover:bg-primary_hover">
                    Package Tags
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
                    title="Package Tag Details"
                    contentTrailing={
                        <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center md:justify-end">
                            <Button color="secondary" iconLeading={ArrowLeft} onClick={() => navigate("/packages/packageTags")}>
                                Back
                            </Button>
                            <Button color="primary" iconLeading={Edit01} onClick={() => navigate(`/packages/packageTags/edit/${id}`)}>
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
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="rounded-lg border border-secondary bg-secondary p-3">
                                <div className="text-xs font-semibold uppercase text-tertiary">Title</div>
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
                        </div>
                    )}
                </div>
            </TableCard.Root>
        </DefaultLayout>
    );
}

