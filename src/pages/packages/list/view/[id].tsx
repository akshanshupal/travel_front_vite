import { DefaultLayout } from "@/layouts/DefaultLayout";
import { TableCard } from "@/components/application/table/table";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import { useStoreSnackbar } from "@/store/snackbar";
import { fetchWithToken } from "@/utils/fetchApi";
import { ArrowLeft, Edit01, Home04 } from "@untitledui/icons";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";

type LookupItem = { id: string; title?: string };

type PackageItem = {
    id: string;
    title?: string;
    location?: any;
    packageTags?: any;
    packageTypes?: any;
    cost?: string | number | null;
    mrp?: string | number | null;
    startDate?: string | null;
    endDate?: string | null;
    featureImg?: string | null;
    status?: boolean | string | number | null;
};

const asArray = (value: any) => (Array.isArray(value) ? value : []);
const getId = (value: any) => String(value?.id ?? value?._id ?? value ?? "").trim();
const normalizeIdArray = (value: any) =>
    asArray(value)
        .map((it) => getId(it))
        .filter(Boolean);

const statusToLabel = (status: PackageItem["status"]) => {
    if (status === true || status === "true" || status === 1 || status === "1") return "Active";
    if (status === false || status === "false" || status === 0 || status === "0") return "Inactive";
    return "—";
};

export default function PackageViewPage() {
    const navigate = useNavigate();
    const params = useParams();
    const id = getId(params.id);
    const { showSnackbar } = useStoreSnackbar();

    const [loading, setLoading] = useState(true);
    const [item, setItem] = useState<PackageItem | null>(null);
    const [locations, setLocations] = useState<LookupItem[]>([]);
    const [packageTags, setPackageTags] = useState<LookupItem[]>([]);
    const [packageTypes, setPackageTypes] = useState<LookupItem[]>([]);

    const locationsById = useMemo(() => new Map(locations.map((l) => [l.id, l.title || ""])), [locations]);
    const packageTagsById = useMemo(() => new Map(packageTags.map((t) => [t.id, t.title || ""])), [packageTags]);
    const packageTypesById = useMemo(() => new Map(packageTypes.map((t) => [t.id, t.title || ""])), [packageTypes]);

    useEffect(() => {
        const run = async () => {
            if (!id) {
                setLoading(false);
                showSnackbar({ title: "Error", description: "Invalid package id", color: "danger" });
                return;
            }
            setLoading(true);
            try {
                const [pkgRes, locRes, tagRes, typeRes] = await Promise.all([
                    fetchWithToken(`/api/package/${id}`, { populate: "location" }),
                    fetchWithToken("/api/location", {}),
                    fetchWithToken("/api/packagetag", {}),
                    fetchWithToken("/api/packagetype", {}),
                ]);

                const pkgResolved = (pkgRes as any)?.data ?? pkgRes;
                const locResolved = (locRes as any)?.data ?? locRes;
                const tagResolved = (tagRes as any)?.data ?? tagRes;
                const typeResolved = (typeRes as any)?.data ?? typeRes;

                const locList = Array.isArray(locResolved?.data) ? locResolved.data : Array.isArray(locResolved) ? locResolved : asArray(locResolved?.items);
                const tagList = Array.isArray(tagResolved?.data) ? tagResolved.data : Array.isArray(tagResolved) ? tagResolved : asArray(tagResolved?.items);
                const typeList = Array.isArray(typeResolved?.data) ? typeResolved.data : Array.isArray(typeResolved) ? typeResolved : asArray(typeResolved?.items);

                setLocations(asArray(locList).map((it: any) => ({ id: getId(it), title: String(it?.title ?? "") })).filter((x) => x.id));
                setPackageTags(asArray(tagList).map((it: any) => ({ id: getId(it), title: String(it?.title ?? "") })).filter((x) => x.id));
                setPackageTypes(asArray(typeList).map((it: any) => ({ id: getId(it), title: String(it?.title ?? "") })).filter((x) => x.id));

                const normalized: PackageItem = { ...pkgResolved, id: getId(pkgResolved) };
                if (!normalized.id) throw new Error("Package not found");
                setItem(normalized);
            } catch (e: any) {
                showSnackbar({ title: "Error", description: e?.message || "Failed to load package", color: "danger" });
                setItem(null);
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
                <button type="button" onClick={() => navigate("/packages/list")} className="rounded-sm px-1 py-0.5 text-primary hover:bg-primary_hover">
                    Packages
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
                    title="View Package"
                    contentTrailing={
                        <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center md:justify-end">
                            <Button color="secondary" iconLeading={ArrowLeft} onClick={() => navigate("/packages/list")}>
                                Back
                            </Button>
                            {item?.id ? (
                                <Button color="primary" iconLeading={Edit01} onClick={() => navigate(`/packages/list/edit/${item.id}`)}>
                                    Edit
                                </Button>
                            ) : null}
                        </div>
                    }
                />

                <div className="bg-primary px-4 py-6 md:px-6">
                    {loading ? (
                        <div className="space-y-3">
                            <div className="h-10 w-64 animate-pulse rounded bg-secondary" />
                            <div className="h-40 w-full animate-pulse rounded bg-secondary" />
                        </div>
                    ) : !item ? (
                        <div className="text-sm text-tertiary">No data found.</div>
                    ) : (
                        <div className="space-y-6">
                            {item.featureImg ? (
                                <div className="overflow-hidden rounded-xl ring-1 ring-secondary">
                                    <img src={String(item.featureImg)} alt="Feature" className="max-h-96 w-full object-cover" />
                                </div>
                            ) : null}

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="rounded-lg border border-secondary bg-primary px-4 py-3">
                                    <div className="text-xs font-medium text-tertiary">Title</div>
                                    <div className="mt-1 text-sm font-semibold text-primary">{item.title || "—"}</div>
                                </div>
                                <div className="rounded-lg border border-secondary bg-primary px-4 py-3">
                                    <div className="text-xs font-medium text-tertiary">Location</div>
                                    <div className="mt-1 text-sm font-semibold text-primary">
                                        {String(item.location?.title ?? locationsById.get(getId(item.location)) ?? "—")}
                                    </div>
                                </div>
                                <div className="rounded-lg border border-secondary bg-primary px-4 py-3">
                                    <div className="text-xs font-medium text-tertiary">Cost</div>
                                    <div className="mt-1 text-sm font-semibold text-primary">{item.cost ?? "—"}</div>
                                </div>
                                <div className="rounded-lg border border-secondary bg-primary px-4 py-3">
                                    <div className="text-xs font-medium text-tertiary">Mrp</div>
                                    <div className="mt-1 text-sm font-semibold text-primary">{item.mrp ?? "—"}</div>
                                </div>
                                <div className="rounded-lg border border-secondary bg-primary px-4 py-3">
                                    <div className="text-xs font-medium text-tertiary">Start Date</div>
                                    <div className="mt-1 text-sm font-semibold text-primary">{item.startDate ? String(item.startDate).slice(0, 10) : "—"}</div>
                                </div>
                                <div className="rounded-lg border border-secondary bg-primary px-4 py-3">
                                    <div className="text-xs font-medium text-tertiary">End Date</div>
                                    <div className="mt-1 text-sm font-semibold text-primary">{item.endDate ? String(item.endDate).slice(0, 10) : "—"}</div>
                                </div>
                                <div className="rounded-lg border border-secondary bg-primary px-4 py-3">
                                    <div className="text-xs font-medium text-tertiary">Status</div>
                                    <div className="mt-1 text-sm font-semibold text-primary">{statusToLabel(item.status)}</div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="text-sm font-semibold text-primary">Package Tags</div>
                                <div className="flex flex-wrap gap-2">
                                    {normalizeIdArray(item.packageTags).length > 0 ? (
                                        normalizeIdArray(item.packageTags).map((tagId) => (
                                            <Badge key={tagId} size="md" color="gray">
                                                {packageTagsById.get(tagId) || tagId}
                                            </Badge>
                                        ))
                                    ) : (
                                        <div className="text-sm text-tertiary">—</div>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="text-sm font-semibold text-primary">Package Types</div>
                                <div className="flex flex-wrap gap-2">
                                    {normalizeIdArray(item.packageTypes).length > 0 ? (
                                        normalizeIdArray(item.packageTypes).map((typeId) => (
                                            <Badge key={typeId} size="md" color="gray">
                                                {packageTypesById.get(typeId) || typeId}
                                            </Badge>
                                        ))
                                    ) : (
                                        <div className="text-sm text-tertiary">—</div>
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

