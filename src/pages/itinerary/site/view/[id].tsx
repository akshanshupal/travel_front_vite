import { DefaultLayout } from "@/layouts/DefaultLayout";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import { fetchWithToken } from "@/utils/fetchApi";
import { ArrowLeft, Home04, Edit01, Image01 } from "@untitledui/icons";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

const getId = (value: any) => String(value?.id ?? value?._id ?? value ?? "").trim();

export default function ItinerarySiteViewPage() {
    const navigate = useNavigate();
    const params = useParams();
    const id = getId(params.id);

    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState<string | null>(null);
    const [data, setData] = useState({
        title: "",
        alias: "",
        status: "true",
        area: { title: "", id: "" ,alias:""},
        featureImg: "",
        headerContent: "",
        description: "",
        footerContent: "",
    });

    useEffect(() => {
        const run = async () => {
            if (!id) {
                setLoadError("Invalid site id");
                setLoading(false);
                return;
            }
            setLoading(true);
            setLoadError(null);
            try {
                const res = await fetchWithToken(`/api/site/${id}`, { populate: "area" });
                const resolved = (res as any)?.data ?? res;
                setData({
                    title: String(resolved?.title ?? ""),
                    alias: String(resolved?.alias ?? ""),
                    status: String((resolved?.status ?? true) ? "true" : "false"),
                    area: {
                        title: String(resolved?.area?.title ?? resolved?.area?.name ?? ""),
                        alias: String(resolved?.area?.alias ?? ""),
                        id: String(resolved?.area?.id ?? resolved?.area?._id ?? resolved?.area ?? ""),
                    },
                    featureImg: String(resolved?.featureImg ?? ""),
                    headerContent: String(resolved?.headerContent ?? ""),
                    description: String(resolved?.description ?? ""),
                    footerContent: String(resolved?.footerContent ?? ""),
                });
            } catch (e: any) {
                setLoadError(e?.error?.message || e?.message || "Failed to load site");
            } finally {
                setLoading(false);
            }
        };
        run();
    }, [id]);

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
                <button type="button" onClick={() => navigate("/itinerary/site")} className="rounded-sm px-1 py-0.5 text-primary hover:bg-primary_hover">
                    Site
                </button>
                <span>/</span>
                <span className="px-1 py-0.5 text-primary">View</span>
            </div>
        </div>
    );

    if (loading) {
        return (
            <DefaultLayout>
                {breadcrumbs}
                <div className="space-y-6">
                    {/* Header Skeleton */}
                    <div className="flex flex-col gap-4 border-b border-secondary bg-primary px-6 py-5 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-2">
                            <div className="h-8 w-64 animate-pulse rounded bg-secondary" />
                            <div className="flex gap-2">
                                <div className="h-6 w-20 animate-pulse rounded bg-secondary" />
                                <div className="h-6 w-32 animate-pulse rounded bg-secondary" />
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <div className="h-10 w-24 animate-pulse rounded bg-secondary" />
                            <div className="h-10 w-24 animate-pulse rounded bg-secondary" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 px-6 lg:grid-cols-3">
                        {/* Main Content Skeleton */}
                        <div className="space-y-6 lg:col-span-2">
                            <div className="rounded-xl border border-secondary bg-primary p-6">
                                <div className="mb-4 h-6 w-32 animate-pulse rounded bg-secondary" />
                                <div className="space-y-2">
                                    <div className="h-4 w-full animate-pulse rounded bg-secondary" />
                                    <div className="h-4 w-full animate-pulse rounded bg-secondary" />
                                    <div className="h-4 w-2/3 animate-pulse rounded bg-secondary" />
                                </div>
                            </div>
                            <div className="rounded-xl border border-secondary bg-primary p-6">
                                <div className="mb-4 h-6 w-40 animate-pulse rounded bg-secondary" />
                                <div className="space-y-2">
                                    <div className="h-4 w-full animate-pulse rounded bg-secondary" />
                                    <div className="h-4 w-1/2 animate-pulse rounded bg-secondary" />
                                </div>
                            </div>
                        </div>

                        {/* Sidebar Skeleton */}
                        <div className="space-y-6 lg:col-span-1">
                            <div className="aspect-video w-full animate-pulse rounded-xl bg-secondary" />
                            <div className="rounded-xl border border-secondary bg-primary p-6">
                                <div className="mb-4 h-5 w-24 animate-pulse rounded bg-secondary" />
                                <div className="space-y-4">
                                    <div className="h-10 w-full animate-pulse rounded bg-secondary" />
                                    <div className="h-10 w-full animate-pulse rounded bg-secondary" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DefaultLayout>
        );
    }

    if (loadError) {
        return (
            <DefaultLayout>
                {breadcrumbs}
                <div className="rounded-xl border border-error-solid bg-error-bg p-6 text-error-text">
                    <p className="font-semibold">Error loading site</p>
                    <p className="text-sm">{loadError}</p>
                    <Button className="mt-4" size="sm" color="secondary" onClick={() => navigate("/itinerary/site")}>
                        Go Back
                    </Button>
                </div>
            </DefaultLayout>
        );
    }

    return (
        <DefaultLayout>
            {breadcrumbs}
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col gap-4 border-b border-secondary bg-primary px-6 py-5 md:flex-row md:items-start md:justify-between">
                    <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-3">
                            <h1 className="text-2xl font-bold text-primary">{data.title}</h1>
                            <Badge color={data.status === "true" ? "success" : "gray"}>
                                {data.status === "true" ? "Active" : "Inactive"}
                            </Badge>
                        </div>
                        {data.alias && (
                            <p className="text-sm text-tertiary">
                                Alias: <span className="font-medium text-secondary">{data.alias}</span>
                            </p>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <Button color="secondary" iconLeading={ArrowLeft} onClick={() => navigate("/itinerary/site")}>
                            Back
                        </Button>
                        <Button color="primary" iconLeading={Edit01} onClick={() => navigate(`/itinerary/site/edit/${id}`)}>
                            Edit Site
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 px-6 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* Description */}
                        <div className="rounded-xl border border-secondary bg-primary p-6 shadow-sm">
                            <h2 className="mb-4 text-lg font-semibold text-primary">Area</h2>
                            {data.area.id ? (
                                <>
                                        <button 
                                            onClick={() => navigate(`/itinerary/area/view/${data.area.id}`)}
                                            className="font-medium text-brand hover:underline"
                                        >
                                            {data.area.title}
                                           
                                        </button>
                                         <p className="text-sm text-secondary"> {data.area?.alias || "—"}</p>
                                </>
                            ) : (
                                <p className="text-sm italic text-tertiary">No area available.</p>
                            )}
                        </div>
                        <div className="rounded-xl border border-secondary bg-primary p-6 shadow-sm">
                            <h2 className="mb-4 text-lg font-semibold text-primary">Description</h2>
                            {data.description ? (
                                <div 
                                    className="prose prose-sm max-w-none text-secondary"
                                    dangerouslySetInnerHTML={{ __html: data.description }} 
                                />
                            ) : (
                                <p className="text-sm italic text-tertiary">No description available.</p>
                            )}
                        </div>

                        {/* Header Content */}
                        <div className="rounded-xl border border-secondary bg-primary p-6 shadow-sm">
                            <h2 className="mb-4 text-lg font-semibold text-primary">Header Content</h2>
                            {data.headerContent ? (
                                <div 
                                    className="prose prose-sm max-w-none text-secondary"
                                    dangerouslySetInnerHTML={{ __html: data.headerContent }} 
                                />
                            ) : (
                                <p className="text-sm italic text-tertiary">No header content available.</p>
                            )}
                        </div>

                        {/* Footer Content */}
                        <div className="rounded-xl border border-secondary bg-primary p-6 shadow-sm">
                            <h2 className="mb-4 text-lg font-semibold text-primary">Footer Content</h2>
                            {data.footerContent ? (
                                <div 
                                    className="prose prose-sm max-w-none text-secondary"
                                    dangerouslySetInnerHTML={{ __html: data.footerContent }} 
                                />
                            ) : (
                                <p className="text-sm italic text-tertiary">No footer content available.</p>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6 lg:col-span-1">
                        {/* Feature Image */}
                        <div className="overflow-hidden rounded-xl border border-secondary bg-primary shadow-sm">
                            {data.featureImg ? (
                                <img 
                                    src={data.featureImg} 
                                    alt={data.title} 
                                    className="h-auto w-full object-cover"
                                />
                            ) : (
                                <div className="flex aspect-video w-full flex-col items-center justify-center bg-secondary text-tertiary">
                                    <Image01 className="mb-2 size-8 opacity-50" />
                                    <span className="text-sm">No feature image</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
}
