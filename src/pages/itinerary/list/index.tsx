import { DefaultLayout } from "@/layouts/DefaultLayout";
import { PaginationButtonGroup } from "@/components/application/pagination/pagination";
import { StickyTable, Table, TableCard } from "@/components/application/table/table";
import { Badge, BadgeWithButton } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { CloseButton } from "@/components/base/buttons/close-button";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { Input } from "@/components/base/input/input";
import { Select } from "@/components/base/select/select";
import { Dialog, Modal, ModalOverlay } from "@/components/application/modals/modal";
import { Copy01, Edit01, Eye, Plus, Trash01, User01, RefreshCw01, FilterLines, SearchLg } from "@untitledui/icons";
import { useEffect, useMemo, useRef, useState } from "react";
import { itineraryService } from "@/utils/services/itineraryService";
import { fetchWithToken } from "@/utils/fetchApi";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";
import { useStoreLogin } from "@/store/login";
import { useAvailableTableWidth } from "@/hooks/use-available-table-width";
import { SlideoutMenu } from "@/components/application/slideout-menus/slideout-menu";
import { Label } from "@/components/base/input/label";
type ItineraryListItem = {
    id: string;
    title?: string;
    name?: string;
    alias?: string;
    area?: { title?: string; alias?: string; name?: string; featureImg?: string } | string | null;
    status?: string | number | boolean | null;
    package?: unknown;
};

type ListFilters = {
    title: string;
    status: string;
    createPackage: string;
    area: string;
};

const parseListSearch = (search: string): { page: number; limit: number; filters: ListFilters } => {
    const sp = new URLSearchParams(search);
    const rawPage = Number(sp.get("page") || 1);
    const rawLimit = Number(sp.get("limit") || 10);
    return {
        page: Number.isFinite(rawPage) && rawPage > 0 ? rawPage : 1,
        limit: Number.isFinite(rawLimit) && rawLimit > 0 ? rawLimit : 10,
        filters: {
            title: sp.get("title") || "",
            status: sp.get("status") || "",
            createPackage: sp.get("createPackage") || "",
            area: sp.get("area") || "",
        },
    };
};

const listRequestCache = new Map<string, { at: number; items: ItineraryListItem[]; totalRecords: number }>();
const listRequestInFlight = new Map<string, Promise<{ items: ItineraryListItem[]; totalRecords: number }>>();

const areFiltersEqual = (a: ListFilters, b: ListFilters) =>
    a.title === b.title && a.status === b.status && a.createPackage === b.createPackage && a.area === b.area;

export default function ItineraryListPage() {
    const navigate = useNavigate();
    const { pathname, search } = useLocation();
    const authToken = useStoreLogin((s) => s.authToken);
    const currentUser = useStoreLogin((s) => s.user) as any;
    const availableWidth = useAvailableTableWidth();
    const initial = parseListSearch(search);
    const [items, setItems] = useState<ItineraryListItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState<string | null>(null);
    const [page, setPage] = useState(initial.page);
    const [limit, setLimit] = useState(initial.limit);
    const [totalRecords, setTotalRecords] = useState(0);
    const [filters, setFilters] = useState<ListFilters>(initial.filters);
    const [debouncedFilters, setDebouncedFilters] = useState<ListFilters>(initial.filters);
    const [tempFilters, setTempFilters] = useState<ListFilters>(initial.filters);
    const [refreshNonce, setRefreshNonce] = useState(0);
    const lastRequestKeyRef = useRef<string | null>(null);

    const [deleteTarget, setDeleteTarget] = useState<{ id: string; title: string } | null>(null);
    const [duplicateTarget, setDuplicateTarget] = useState<{ id: string; title: string } | null>(null);
    const [duplicateTitle, setDuplicateTitle] = useState("");
    const [hotelCopy, setHotelCopy] = useState(false);
    const [areas, setAreas] = useState<{ id: string; label: string }[]>([]);

    const [createPackageTarget, setCreatePackageTarget] = useState<{ itineraryId: string; title: string; featureImg?: string } | null>(null);
    const [packageForm, setPackageForm] = useState({ title: "", cost: "", mrp: "", url: "" });
    const [packageSubmitting, setPackageSubmitting] = useState(false);

    const tableContainerRef = useRef<HTMLDivElement | null>(null);

    const columns = [
        { id: "index", name: "S. No.", isRowHeader: true, widthRatio: 6, minWidth: 64 },
        { id: "title", name: "Title", widthRatio: 34, minWidth: 300 },
        { id: "area", name: "Area", widthRatio: 22, minWidth: 200 },
        { id: "status", name: "Status", widthRatio: 12, minWidth: 140 },
        { id: "createPackage", name: "Created Package", widthRatio: 14, minWidth: 176 },
        { id: "actions", name: "Actions", widthRatio: 12, minWidth: 200 },
    ] as { id: string; name: string; className?: string; widthRatio?: number; minWidth?: number }[];

    const skeletonRows = useMemo<ItineraryListItem[]>(
        () => Array.from({ length: 10 }).map((_, i) => ({ id: `skeleton-${i}` })),
        [],
    );

    const displayItems = loading ? skeletonRows : items;


    useEffect(() => {
        const fetchAreas = async () => {
            try {
                const res = await fetchWithToken("/api/area", { limit: "1000", select: "title" });
                const resolved = (res as any)?.data ?? res;
                const list = Array.isArray(resolved?.data)
                    ? resolved.data
                    : Array.isArray(resolved?.docs)
                      ? resolved.docs
                      : Array.isArray(resolved)
                        ? resolved
                        : resolved?.items ?? [];
                setAreas(
                    list
                        .map((it: any) => ({
                            id: String(it?.id ?? it?._id ?? ""),
                            label: String(it?.title ?? ""),
                        }))
                        .filter((it: { id: string }) => it.id),
                );
            } catch (e) {
                console.error("Failed to fetch areas", e);
            }
        };
        fetchAreas();
    }, []);

    useEffect(() => {
        if (areFiltersEqual(filters, debouncedFilters)) return;
        const handler = window.setTimeout(() => {
            setDebouncedFilters(filters);
            setPage((prev) => (prev === 1 ? prev : 1));
        }, 600);

        return () => window.clearTimeout(handler);
    }, [debouncedFilters, filters]);

    useEffect(() => {
        const sp = new URLSearchParams();
        if (debouncedFilters.title) sp.set("title", debouncedFilters.title);
        if (debouncedFilters.status) sp.set("status", debouncedFilters.status);
        if (debouncedFilters.createPackage) sp.set("createPackage", debouncedFilters.createPackage);
        if (debouncedFilters.area) sp.set("area", debouncedFilters.area);
        sp.set("page", String(page));
        sp.set("limit", String(limit));

        const next = sp.toString();
        const current = search.startsWith("?") ? search.slice(1) : search;
        if (next === current) return;
        navigate(next ? `${pathname}?${next}` : pathname, { replace: true });
    }, [debouncedFilters, limit, navigate, page, pathname, search]);

    useEffect(() => {
        if (!authToken) {
            lastRequestKeyRef.current = null;
            navigate("/login", { replace: true });
            return;
        }
        const run = async () => {
            const requestKey = JSON.stringify({ page, limit, debouncedFilters, refreshNonce });
            if (lastRequestKeyRef.current === requestKey) return;
            lastRequestKeyRef.current = requestKey;

            const cached = listRequestCache.get(requestKey);
            if (cached && Date.now() - cached.at < 5_000) {
                setItems(cached.items);
                setTotalRecords(cached.totalRecords);
                setLoading(false);
                setLoadError(null);
                return;
            }

            setLoading(true);
            setLoadError(null);
            try {
                const params: Record<string, string> = {
                    totalCount: "true",
                    page: String(page),
                    limit: String(limit),
                    populate: "area",
                    select_area: "title,alias,featureImg",
                };

                if (debouncedFilters.status) params.status = debouncedFilters.status;
                if (debouncedFilters.title) params.title = debouncedFilters.title;
                if (debouncedFilters.createPackage) params.createPackage = debouncedFilters.createPackage;
                if (debouncedFilters.area) params.area = debouncedFilters.area;

                let inFlight = listRequestInFlight.get(requestKey);
                if (!inFlight) {
                    inFlight = (async () => {
                        const res = await itineraryService.list(params);
                        const list = Array.isArray(res?.data)
                            ? res.data
                            : Array.isArray(res?.data?.data)
                              ? res.data.data
                              : Array.isArray(res)
                                ? res
                                : (res?.data?.docs ?? res?.docs ?? res?.items ?? []);
                        const normalized = (list || [])
                            .map((item: any) => ({
                                ...item,
                                id: item?.id ?? item?._id ?? item?.itineraryId ?? item?.itinerary_id,
                            }))
                            .filter((item: any) => Boolean(item?.id));

                        const countRaw =
                            res?.totalCount ??
                            res?.data?.totalCount ??
                            res?.data?.data?.totalCount ??
                            res?.total ??
                            res?.count ??
                            (Array.isArray(list) ? list.length : 0);

                        return { items: normalized, totalRecords: Number(countRaw) || 0 };
                    })();
                    listRequestInFlight.set(requestKey, inFlight);
                }

                const result = await inFlight;
                listRequestCache.set(requestKey, { at: Date.now(), ...result });

                setItems(result.items);
                setTotalRecords(result.totalRecords);
            } catch (e: any) {
                setItems([]);
                setTotalRecords(0);
                setLoadError(e?.error?.message || e?.message || "Failed to load itineraries");
                lastRequestKeyRef.current = null;
            } finally {
                const requestKey = JSON.stringify({ page, limit, debouncedFilters, refreshNonce });
                listRequestInFlight.delete(requestKey);
                setLoading(false);
            }
        };
        run();
    }, [authToken, debouncedFilters, limit, navigate, page, refreshNonce]);

    const totalPages = Math.max(1, Math.ceil((totalRecords || 0) / limit));

    const indexById = useMemo(() => new Map(items.map((item, index) => [item.id, (page - 1) * limit + index + 1])), [items, limit, page]);

    const isFilterActive = Boolean(filters.title || filters.status || filters.createPackage || filters.area);
    const canEditItinerary = useMemo(() => Boolean(currentUser?.type && currentUser?.type !== "AGENT"), [currentUser?.type]);
    const canCreateClientItinerary = useMemo(() => Boolean(currentUser?.type), [currentUser?.type]);
    const canDeleteItinerary = useMemo(() => Boolean(currentUser?.type && currentUser?.type !== "AGENT" && currentUser?.type !== "MANAGER"), [currentUser?.type]);

    const handleOpenFilters = () => {
        setTempFilters(filters);
    };

    const handleApplyFilters = (close: () => void) => {
        setFilters(tempFilters);
        setPage(1);
        close();
    };

    const handleResetTempFilters = (close?: () => void) => {
        const resetState = { title: "", status: "", createPackage: "", area: "" };
        setFilters(resetState);
        setTempFilters(resetState);
        setDebouncedFilters(resetState);
        setPage(1);
        navigate(pathname, { replace: true });
        if (close) close();
    };

    const handleRemoveFilter = (key: keyof ListFilters) => {
        const newFilters = { ...filters, [key]: "" };
        setFilters(newFilters);
        setTempFilters(newFilters);
        setDebouncedFilters(newFilters);
        setPage(1);
    };

    const statusToBool = (status: ItineraryListItem["status"]) => {
        if (status === true || status === "true" || status === 1 || status === "1") return true;
        if (status === false || status === "false" || status === 0 || status === "0") return false;
        return null;
    };

    const handleDelete = async (id: string) => {
        await itineraryService.deleteById(id);
        setItems((prev) => prev.filter((it) => it.id !== id));
        setTotalRecords((prev) => Math.max(0, prev - 1));
    };

    const handleDuplicate = async (id: string, title: string, copyHotels: boolean) => {
        await itineraryService.duplicate({ id, title, hotelCopy: copyHotels });
        setPage(1);
        setRefreshNonce((n) => n + 1);
    };

    const handleCreatePackage = async (itineraryId: string) => {
        setPackageSubmitting(true);
        try {
            const payload: Record<string, unknown> = {
                title: packageForm.title,
                itinerary: itineraryId,
                cost: packageForm.cost,
                mrp: packageForm.mrp,
                url: packageForm.url,
                featureImg: createPackageTarget?.featureImg,
            };
            await fetchWithToken("/api/package", payload, { method: "POST" });
            setItems((prev) => prev.map((it) => (it.id === itineraryId ? { ...it, package: true } : it)));
        } finally {
            setPackageSubmitting(false);
        }
    };

    return (
        <DefaultLayout>
            <div className="w-full" style={{ width: availableWidth }}>

                <TableCard.Root className="w-full">
                    <TableCard.Header
                        title="Itinerary List"
                        badge={loading ? "…" : totalRecords}
                        contentTrailing={
                            <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center">
                                <Select
                                    aria-label="Rows per page"
                                    className="w-full md:w-40"
                                    value={String(limit)}
                                    onChange={undefined}
                                    onSelectionChange={(key) => {
                                        const next = Number(key);
                                        setLimit(Number.isFinite(next) && next > 0 ? next : 10);
                                        setPage(1);
                                    }}
                                    items={[
                                        { id: "10", label: "10 / page" },
                                        { id: "25", label: "25 / page" },
                                        { id: "50", label: "50 / page" },
                                    ]}
                                >
                                    {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                </Select>
                                    <Button size="sm" color="primary" iconLeading={Plus} onClick={() => navigate("/itinerary/list/add")}>
                                    Add Itinerary
                                </Button>
                            </div>
                        }
                    />

                    {loadError ? (
                        <div className="border-b border-secondary bg-primary px-4 py-3 text-sm text-tertiary md:px-6">
                            {loadError}
                        </div>
                    ) : null}

                    <div className="border-b border-secondary bg-primary px-4 py-4 md:px-6">
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-3 justify-between md:flex-row md:items-center">
                                <Input
                                    placeholder="Search by title"
                                    value={tempFilters.title}
                                    onChange={(value) => {
                                        setFilters((prev) => ({ ...prev, title: value }));
                                        setTempFilters((prev) => ({ ...prev, title: value }));
                                    }}
                                    icon={SearchLg}
                                    className="w-full md:w-80"
                                />
                                <div className="flex items-center justify-end gap-2">
                                    <SlideoutMenu.Trigger>
                                        <Button color="primary" iconLeading={FilterLines} onClick={handleOpenFilters}>
                                            More filters
                                        </Button>
                                        <SlideoutMenu isDismissable>
                                            {({ close }) => (
                                                <SlideoutMenu.Content>
                                                    <SlideoutMenu.Header onClose={close}>Filters</SlideoutMenu.Header>
                                                    <div className="flex-1 space-y-6 py-4">
                                                    <div className="space-y-2">
                                                        <Label>Area</Label>
                                                        <Select
                                                            aria-label="Area"
                                                            placeholder="All areas"
                                                            value={tempFilters.area || "__all__"}
                                                            onChange={(key) => setTempFilters((prev) => ({ ...prev, area: key === "__all__" ? "" : String(key) }))}
                                                            items={[{ id: "__all__", label: "All areas" }, ...areas]}
                                                        >
                                                            {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                                        </Select>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label>Status</Label>
                                                        <Select
                                                            aria-label="Status"
                                                            value={tempFilters.status ? tempFilters.status : "__all__"}
                                                            onChange={undefined}
                                                            onSelectionChange={(key) =>
                                                                setTempFilters((prev) => ({ ...prev, status: key === "__all__" ? "" : String(key) }))
                                                            }
                                                            items={[
                                                                { id: "__all__", label: "All status" },
                                                                { id: "true", label: "Active" },
                                                                { id: "false", label: "Inactive" },
                                                            ]}
                                                        >
                                                            {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                                        </Select>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label>Created Package</Label>
                                                        <Select
                                                            aria-label="Created package"
                                                            value={tempFilters.createPackage ? tempFilters.createPackage : "__all__"}
                                                            onChange={(key) =>
                                                                setTempFilters((prev) => ({
                                                                    ...prev,
                                                                    createPackage: key === "__all__" ? "" : String(key),
                                                                }))
                                                            }
                                                            items={[
                                                                { id: "__all__", label: "All packages" },
                                                                { id: "true", label: "Created" },
                                                                { id: "false", label: "Not created" },
                                                            ]}
                                                        >
                                                            {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                                        </Select>
                                                    </div>
                                                </div>
                                                <SlideoutMenu.Footer>
                                                    <div className="flex w-full gap-3">
                                                        <Button color="secondary" onClick={() => handleResetTempFilters(close)} className="w-full">
                                                            Reset
                                                        </Button>
                                                        <Button color="primary" onClick={() => handleApplyFilters(close)} className="w-full">
                                                            Apply
                                                        </Button>
                                                    </div>
                                                </SlideoutMenu.Footer>
                                                </SlideoutMenu.Content>
                                            )}
                                        </SlideoutMenu>
                                    </SlideoutMenu.Trigger>
                                    <ButtonUtility
                                        icon={RefreshCw01}
                                        onClick={() => handleResetTempFilters()}
                                        color="secondary"
                                        className="px-3"
                                        tooltip="Reset Filters"
                                        isDisabled={!isFilterActive}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {Object.entries(filters).map(([key, value]) => {
                                    if (!value || value === "__all__") return null;

                                    let label = key;
                                    let displayValue = value;

                                    if (key === "title") label = "Title";
                                    if (key === "status") {
                                        label = "Status";
                                        displayValue = value === "true" ? "Active" : "Inactive";
                                    } else if (key === "createPackage") {
                                        label = "Package";
                                        displayValue = value === "true" ? "Created" : "Not Created";
                                    } else if (key === "area") {
                                        label = "Area";
                                        const area = areas.find(a => a.id === value);
                                        displayValue = area ? area.label : value;
                                    }

                                    return (
                                        <BadgeWithButton key={key} onButtonClick={() => handleRemoveFilter(key as keyof ListFilters)}>
                                            <span className="font-medium text-gray-500 mr-1">{label}:</span>
                                            <span className="font-semibold text-brand-700">{displayValue}</span>
                                        </BadgeWithButton>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="w-full max-w-full">
                        <StickyTable
                            ariaLabel="Itinerary list"
                            columns={columns}
                            items={displayItems}
                            containerRef={tableContainerRef}
                            availableWidth={availableWidth}
                            loading={loading}
                        >
                            {(item) =>
                                loading ? (
                                    <Table.Row id={item.id} columns={columns}>
                                        {(column) => (
                                            <Table.Cell
                                                className={
                                                    column.id === "actions"
                                                        ? "px-2"
                                                        : column.id === "status" || column.id === "createPackage" || column.id === "index"
                                                          ? "whitespace-nowrap px-4"
                                                          : "whitespace-normal break-words"
                                                }
                                            >
                                                <div className="animate-pulse">
                                                    <div className="h-4 w-full rounded bg-secondary" />
                                                </div>
                                            </Table.Cell>
                                        )}
                                    </Table.Row>
                                ) : (
                                    <Table.Row id={item.id} columns={columns} className="h-auto">
                                        {(column) => (
                                            <Table.Cell
                                                data-column={column.id}
                                                className={
                                                    column.id === "actions"
                                                        ? "px-2"
                                                        : column.id === "status"
                                                          ? "whitespace-nowrap px-4"
                                                          : column.id === "createPackage"
                                                            ? "whitespace-nowrap px-4 overflow-hidden"
                                                            : column.id === "index"
                                                              ? "whitespace-nowrap px-4"
                                                              : "whitespace-normal break-words"
                                                }
                                            >
                                                {column.id === "index" ? (
                                                    <span className="text-sm text-tertiary">{indexById.get(item.id) ?? "—"}</span>
                                                ) : column.id === "title" ? (
                                                    <div className="min-w-0">
                                                        <p className="text-sm font-semibold text-primary">{item.title || item.name || "—"}</p>
                                                        {item.alias ? <p className="text-xs text-tertiary">{item.alias}</p> : null}
                                                    </div>
                                                ) : column.id === "area" ? (
                                                    <span className="text-sm text-tertiary">
                                                        {typeof item.area === "string" ? item.area : item.area?.title || item.area?.name || item.area?.alias || "—"}
                                                    </span>
                                                ) : column.id === "status" ? (
                                                    (() => {
                                                        const mapped = statusToBool(item.status);
                                                        if (mapped == null) return <span className="text-sm text-tertiary">{item.status == null ? "—" : String(item.status)}</span>;
                                                        return <Badge color={mapped ? "success" : "error"}>{mapped ? "Active" : "Inactive"}</Badge>;
                                                    })()
                                                ) : column.id === "createPackage" ? (
                                                    <Button
                                                        size="sm"
                                                        color="primary"
                                                        className="max-w-full min-w-0"
                                                        isDisabled={Boolean(item.package)}
                                                        onClick={() => {
                                                            const areaObj = typeof item.area === "string" ? null : item.area;
                                                            const t = item.title || item.name || "";
                                                            setCreatePackageTarget({ itineraryId: item.id, title: t, featureImg: areaObj?.featureImg });
                                                            setPackageForm({ title: t, cost: "", mrp: "", url: t });
                                                        }}
                                                    >
                                                        <span className="truncate">Create Package</span>
                                                    </Button>
                                                ) : (
                                                    <div className="flex w-full flex-wrap items-center justify-end gap-1.5">
                                                        <ButtonUtility
                                                            tooltip="View"
                                                            tooltipPlacement="bottom"
                                                            icon={Eye}
                                                            onClick={() => navigate(`/itinerary/list/view/${item.id}`)}
                                                            color="brand"
                                                        />
                                                        {canEditItinerary ? (
                                                            <ButtonUtility
                                                                tooltip="Edit"
                                                                tooltipPlacement="bottom"
                                                                icon={Edit01}
                                                                onClick={() => navigate(`/itinerary/list/edit/${item.id}`)}
                                                                color="warning"
                                                            />
                                                        ) : null}
                                                        {canCreateClientItinerary ? (
                                                            <ButtonUtility
                                                                tooltip="New Client Itinerary"
                                                                tooltipPlacement="bottom"
                                                                icon={User01}
                                                                onClick={() => navigate(`/itinerary/clientitinerary/add?itinerary=${item.id}`)}
                                                                color="success"
                                                            />
                                                        ) : null}
                                                        {currentUser?.type ? (
                                                            <ButtonUtility
                                                                tooltip="Duplicate"
                                                                tooltipPlacement="bottom"
                                                                icon={Copy01}
                                                                onClick={() => {
                                                                    const t = item.title || item.name || "";
                                                                    setDuplicateTarget({ id: item.id, title: t });
                                                                    setDuplicateTitle(t ? `${t} copy` : "");
                                                                    setHotelCopy(false);
                                                                }}
                                                                color="brand"
                                                            />
                                                        ) : null}
                                                        {canDeleteItinerary ? (
                                                            <ButtonUtility
                                                                tooltip="Delete"
                                                                tooltipPlacement="bottom"
                                                                icon={Trash01}
                                                                onClick={() => {
                                                                    const t = item.title || item.name || "";
                                                                    setDeleteTarget({ id: item.id, title: t });
                                                                }}
                                                                color="error"
                                                            />
                                                        ) : null}
                                                    </div>
                                                )}
                                            </Table.Cell>
                                        )}
                                    </Table.Row>
                                )
                            }
                        </StickyTable>
                    </div>

                    <PaginationButtonGroup
                        page={page}
                        total={totalPages}
                        align="center"
                        onPageChange={(nextPage) => setPage(Math.min(totalPages, Math.max(1, nextPage)))}
                    />
                </TableCard.Root>
            </div>

            <ModalOverlay
                isOpen={Boolean(deleteTarget)}
                isDismissable
                onOpenChange={(open) => {
                    if (!open) setDeleteTarget(null);
                }}
            >
                {({ state }) => (
                    <Modal className="max-w-lg">
                        <Dialog>
                            <div className="relative w-full rounded-xl bg-primary p-5 ring-1 ring-secondary">
                                <CloseButton onPress={() => state.close()} className="absolute right-4 top-4" size="sm" />
                                <div className="space-y-1">
                                    <h2 className="text-lg font-semibold text-primary">Delete itinerary</h2>
                                    <p className="text-sm text-tertiary">
                                        {deleteTarget?.title ? `Delete "${deleteTarget.title}"?` : "Delete this itinerary?"}
                                    </p>
                                </div>
                                <div className="mt-5 flex justify-end gap-2">
                                    <Button color="secondary" onClick={() => state.close()}>
                                        Cancel
                                    </Button>
                                    <Button
                                        color="primary-destructive"
                                        onClick={async () => {
                                            if (!deleteTarget) return;
                                            await handleDelete(deleteTarget.id);
                                            state.close();
                                        }}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        </Dialog>
                    </Modal>
                )}
            </ModalOverlay>

            <ModalOverlay
                isOpen={Boolean(duplicateTarget)}
                isDismissable
                onOpenChange={(open) => {
                    if (!open) setDuplicateTarget(null);
                }}
            >
                {({ state }) => (
                    <Modal className="max-w-lg">
                        <Dialog>
                            <div className="relative w-full rounded-xl bg-primary p-5 ring-1 ring-secondary">
                                <CloseButton onPress={() => state.close()} className="absolute right-4 top-4" size="sm" />
                                <div className="space-y-1">
                                    <h2 className="text-lg font-semibold text-primary">Duplicate itinerary</h2>
                                    <p className="text-sm text-tertiary">Create a copy with a new title.</p>
                                </div>

                                <div className="mt-4 space-y-3">
                                    <Input
                                        label="Title"
                                        value={duplicateTitle}
                                        onChange={setDuplicateTitle}
                                        placeholder="New itinerary title"
                                    />
                                    <Checkbox isSelected={hotelCopy} onChange={setHotelCopy} label="Copy hotels" />
                                </div>

                                <div className="mt-5 flex justify-end gap-2">
                                    <Button color="secondary" onClick={() => state.close()}>
                                        Cancel
                                    </Button>
                                    <Button
                                        color="primary"
                                        onClick={async () => {
                                            if (!duplicateTarget) return;
                                            await handleDuplicate(duplicateTarget.id, duplicateTitle || duplicateTarget.title, hotelCopy);
                                            state.close();
                                        }}
                                    >
                                        Duplicate
                                    </Button>
                                </div>
                            </div>
                        </Dialog>
                    </Modal>
                )}
            </ModalOverlay>

            <ModalOverlay
                isOpen={Boolean(createPackageTarget)}
                isDismissable
                onOpenChange={(open) => {
                    if (!open) setCreatePackageTarget(null);
                }}
            >
                {({ state }) => (
                    <Modal className="max-w-lg">
                        <Dialog>
                            <div className="relative w-full rounded-xl bg-primary p-5 ring-1 ring-secondary">
                                <CloseButton onPress={() => state.close()} className="absolute right-4 top-4" size="sm" />
                                <div className="space-y-1">
                                    <h2 className="text-lg font-semibold text-primary">Create package</h2>
                                    <p className="text-sm text-tertiary">{createPackageTarget?.title || "Create a package for this itinerary."}</p>
                                </div>

                                <div className="mt-4 space-y-3">
                                    <Input
                                        label="Title"
                                        value={packageForm.title}
                                        onChange={(value) => setPackageForm((prev) => ({ ...prev, title: value }))}
                                        placeholder="Package title"
                                    />
                                    <Input
                                        label="Cost"
                                        value={packageForm.cost}
                                        onChange={(value) => setPackageForm((prev) => ({ ...prev, cost: value }))}
                                        placeholder="Cost"
                                    />
                                    <Input
                                        label="MRP"
                                        value={packageForm.mrp}
                                        onChange={(value) => setPackageForm((prev) => ({ ...prev, mrp: value }))}
                                        placeholder="MRP"
                                    />
                                    <Input
                                        label="URL"
                                        value={packageForm.url}
                                        onChange={(value) => setPackageForm((prev) => ({ ...prev, url: value }))}
                                        placeholder="Slug / URL"
                                    />
                                </div>

                                <div className="mt-5 flex justify-end gap-2">
                                    <Button color="secondary" onClick={() => state.close()} isDisabled={packageSubmitting}>
                                        Cancel
                                    </Button>
                                    <Button
                                        color="primary"
                                        isLoading={packageSubmitting}
                                        onClick={async () => {
                                            if (!createPackageTarget) return;
                                            await handleCreatePackage(createPackageTarget.itineraryId);
                                            state.close();
                                        }}
                                    >
                                        Create
                                    </Button>
                                </div>
                            </div>
                        </Dialog>
                    </Modal>
                )}
            </ModalOverlay>
        </DefaultLayout>
    );
}
