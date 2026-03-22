import { DefaultLayout } from "@/layouts/DefaultLayout";
import { StickyTable, Table, TableCard } from "@/components/application/table/table";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { CloseButton } from "@/components/base/buttons/close-button";
import { Input } from "@/components/base/input/input";
import { Select } from "@/components/base/select/select";
import { PaginationButtonGroup } from "@/components/application/pagination/pagination";
import { Dialog, Modal, ModalOverlay } from "@/components/application/modals/modal";
import { fetchWithToken } from "@/utils/fetchApi";
import { useAvailableTableWidth } from "@/hooks/use-available-table-width";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Plus, Trash01, Edit01, RefreshCw01, FilterLines, SearchLg } from "@untitledui/icons";
import { SlideoutMenu } from "@/components/application/slideout-menus/slideout-menu";
import { Label } from "@/components/base/input/label";
import { BadgeWithButton } from "@/components/base/badges/badges";

type SiteItem = {
    id: string;
    title?: string;
    alias?: string;
    status?: boolean | string | number | null;
    area?: {
        id: string;
        title: string;
        alias: string;
    } | null;
};

const asArray = (value: any) => (Array.isArray(value) ? value : []);

const getId = (value: any) => String(value?.id ?? value?._id ?? value ?? "").trim();

const parseSearch = (search: string) => {
    const sp = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
    const page = Math.max(1, Number(sp.get("page") || 1) || 1);
    const limit = Math.min(100, Math.max(10, Number(sp.get("limit") || 50) || 50));
    const title = sp.get("title") || "";
    const status = sp.get("status") || "";
    const area = sp.get("area") || "";
    return { page, limit, title, status, area };
};

const statusToLabel = (status: SiteItem["status"]) => {
    if (status === true || status === "true" || status === 1 || status === "1") return "Active";
    if (status === false || status === "false" || status === 0 || status === "0") return "Inactive";
    return "—";
};

export default function ItinerarySiteListPage() {
    const navigate = useNavigate();
    const { pathname, search } = useLocation();
    const initial = parseSearch(search);

    const [page, setPage] = useState(initial.page);
    const [limit, setLimit] = useState(initial.limit);
    const [filters, setFilters] = useState({ title: initial.title, status: initial.status, area: initial.area });
    const [debouncedFilters, setDebouncedFilters] = useState({ title: initial.title, status: initial.status, area: initial.area });
    const [tempFilters, setTempFilters] = useState({ title: initial.title, status: initial.status, area: initial.area });

    const [items, setItems] = useState<SiteItem[]>([]);
    const [areas, setAreas] = useState<{ id: string; label: string }[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState<string | null>(null);
    const [totalRecords, setTotalRecords] = useState(0);
    const availableWidth = useAvailableTableWidth();

    const [deleteTarget, setDeleteTarget] = useState<{ id: string; title?: string } | null>(null);
    const deletingRef = useRef(false);

    const totalPages = Math.max(1, Math.ceil((totalRecords || 0) / limit));
    const indexById = useMemo(() => new Map(items.map((item, index) => [item.id, (page - 1) * limit + index + 1])), [items, limit, page]);
    const isFilterActive = Boolean(filters.title || filters.status || filters.area);

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
        const handler = window.setTimeout(() => {
            setDebouncedFilters(filters);
            setPage(1);
        }, 500);
        return () => window.clearTimeout(handler);
    }, [filters]);

    useEffect(() => {
        const sp = new URLSearchParams();
        if (debouncedFilters.title) sp.set("title", debouncedFilters.title);
        if (debouncedFilters.status) sp.set("status", debouncedFilters.status);
        if (debouncedFilters.area) sp.set("area", debouncedFilters.area);
        sp.set("page", String(page));
        sp.set("limit", String(limit));
        const next = sp.toString();
        const current = search.startsWith("?") ? search.slice(1) : search;
        if (next === current) return;
        navigate(next ? `${pathname}?${next}` : pathname, { replace: true });
    }, [debouncedFilters, limit, navigate, page, pathname, search]);

    useEffect(() => {
        const run = async () => {
            setLoading(true);
            setLoadError(null);
            try {
                const res = await fetchWithToken("/api/site", {
                    totalCount: "true",
                    page: String(page),
                    limit: String(limit),
                    ...(debouncedFilters.title ? { title: debouncedFilters.title } : {}),
                    ...(debouncedFilters.status ? { status: debouncedFilters.status } : {}),
                    ...(debouncedFilters.area ? { area: debouncedFilters.area } : {}),
                    populate: "area",
                });
                const resolved = (res as any)?.data ?? res;
                const list = Array.isArray(resolved?.data)
                    ? resolved.data
                    : Array.isArray(resolved?.docs)
                      ? resolved.docs
                      : Array.isArray(resolved)
                        ? resolved
                        : asArray(resolved?.items);
                const normalized = asArray(list)
                    .map((it: any) => {
                        const id = getId(it);
                        if (!id) return null;
                        return { ...it, id } as SiteItem;
                    })
                    .filter(Boolean) as SiteItem[];
                const countRaw =
                    (res as any)?.totalCount ??
                    (res as any)?.total ??
                    (res as any)?.count ??
                    resolved?.totalCount ??
                    resolved?.total ??
                    resolved?.count ??
                    normalized.length;
                setItems(normalized);
                setTotalRecords(Number(countRaw) || 0);
            } catch (e: any) {
                setItems([]);
                setTotalRecords(0);
                setLoadError(e?.error?.message || e?.message || "Failed to load sites");
            } finally {
                setLoading(false);
            }
        };
        run();
    }, [debouncedFilters.status, debouncedFilters.title, debouncedFilters.area, limit, page]);

    const handleOpenFilters = () => {
        setTempFilters(filters);
    };

    const handleApplyFilters = (close: () => void) => {
        setFilters(tempFilters);
        close();
    };

    const handleResetTempFilters = (close?: () => void) => {
        const reset = { title: "", status: "", area: "" };
        setFilters(reset);
        setDebouncedFilters(reset);
        setTempFilters(reset);
        setPage(1);
        navigate(pathname, { replace: true });
        if (close) close();
    };

    const handleRemoveFilter = (key: string) => {
        const resetState = { ...filters, [key]: "" };
        setFilters(resetState);
        setTempFilters(resetState);
        setDebouncedFilters(resetState);
    };

    const handleDelete = async () => {
        if (!deleteTarget?.id) return;
        if (deletingRef.current) return;
        deletingRef.current = true;
        try {
            await fetchWithToken(`/api/site/${deleteTarget.id}`, {}, { method: "DELETE" });
            setItems((prev) => prev.filter((it) => it.id !== deleteTarget.id));
            setTotalRecords((prev) => Math.max(0, prev - 1));
            setDeleteTarget(null);
        } finally {
            deletingRef.current = false;
        }
    };

    const columns = [
        { id: "index", name: "#", widthRatio: 6, minWidth: 64 },
        { id: "title", name: "Title/Alias", widthRatio: 38, minWidth: 300 },
        { id: "area", name: "Area", widthRatio: 28, minWidth: 200 },
        { id: "status", name: "Status", widthRatio: 12, minWidth: 120 },
        { id: "actions", name: "Actions", widthRatio: 16, minWidth: 140, className: "pr-4 pl-4" },
    ];

    const skeletonRows = useMemo<SiteItem[]>(
        () => Array.from({ length: 10 }).map((_, i) => ({ id: `skeleton-${i}` })),
        [],
    );

    const displayItems = loading ? skeletonRows : items;

    return (
        <DefaultLayout>
            <div style={{ width: availableWidth }}>
                
                <TableCard.Root className="w-full">
                    <TableCard.Header
                        title="Sites"
                        badge={loading ? "…" : totalRecords}
                        contentTrailing={
                            <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center">
                                <Select
                                    aria-label="Rows per page"
                                    className="w-full md:w-40"
                                    value={String(limit)}
                                    onChange={(key) => {
                                        const next = Number(key);
                                        if (!Number.isFinite(next) || next <= 0) return;
                                        setLimit(next);
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
                                <Button size="sm" color="primary" iconLeading={Plus} onClick={() => navigate("/itinerary/site/add")}>
                                    Add Site
                                </Button>
                            </div>
                        }
                    />

                    <div className="border-b border-secondary bg-primary px-4 py-4 md:px-6">
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-3 justify-between md:flex-row md:items-center">
                                <Input
                                    placeholder="Search by title"
                                    value={tempFilters.title}
                                    onChange={(value) => {
                                        setFilters((prev) => ({ ...prev, title: String(value) }));
                                        setTempFilters((prev) => ({ ...prev, title: String(value) }));
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
                                                    <div className="flex-1 overflow-y-auto p-6">
                                                        <div className="flex flex-col gap-4">
                                                        <div className="flex flex-col gap-1.5">
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
                                                        <div className="flex flex-col gap-1.5">
                                                            <Label>Status</Label>
                                                            <Select
                                                                aria-label="Status"
                                                                value={tempFilters.status || "__all__"}
                                                                onChange={undefined}
                                                                onSelectionChange={(key) => setTempFilters((prev) => ({ ...prev, status: key === "__all__" ? "" : String(key) }))}
                                                                items={[
                                                                    { id: "__all__", label: "All status" },
                                                                    { id: "true", label: "Active" },
                                                                    { id: "false", label: "Inactive" },
                                                                ]}
                                                            >
                                                                {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                                            </Select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <SlideoutMenu.Footer>
                                                    <div className="flex gap-3 w-full">
                                                        <Button color="secondary" className="flex-1 justify-center" onClick={() => handleResetTempFilters(close)}>
                                                            Reset
                                                        </Button>
                                                        <Button color="primary" className="flex-1 justify-center" onClick={() => handleApplyFilters(close)}>
                                                            Apply Filters
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
                                    if (key === "area") {
                                        label = "Area";
                                        const area = areas.find(a => a.id === value);
                                        displayValue = area ? area.label : value;
                                    }
                                    if (key === "status") {
                                        label = "Status";
                                        displayValue = value === "true" ? "Active" : "Inactive";
                                    }

                                    return (
                                        <BadgeWithButton key={key} onButtonClick={() => handleRemoveFilter(key)}>
                                            <span className="font-medium text-gray-500 mr-1">{label}:</span>
                                            <span className="font-semibold text-brand-700">{displayValue}</span>
                                        </BadgeWithButton>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {loadError ? (
                        <div className="px-4 py-10 text-sm text-error md:px-6">{loadError}</div>
                    ) : (
                        <StickyTable
                            ariaLabel="Site list"
                            columns={columns}
                            items={displayItems}
                            availableWidth={availableWidth}
                            loading={loading}
                        >
                            {(item) =>
                                loading ? (
                                    <Table.Row id={item.id} columns={columns}>
                                        {(column) => (
                                            <Table.Cell className={column.id === "actions" ? "whitespace-nowrap" : "whitespace-normal break-words"}>
                                                <div className="animate-pulse">
                                                    <div className="h-4 w-full rounded bg-secondary" />
                                                </div>
                                            </Table.Cell>
                                        )}
                                    </Table.Row>
                                ) : (
                                    <Table.Row id={item.id} columns={columns}>
                                        {(column) => (
                                            <Table.Cell className={column.id === "actions" ? "whitespace-nowrap" : "whitespace-normal break-words"}>
                                                {column.id === "index" ? (
                                                    <span className="text-sm text-tertiary">{indexById.get(item.id) ?? "—"}</span>
                                                ) : column.id === "title" ? (
                                                    <div className="flex flex-col">
                                                        <button
                                                            type="button"
                                                            onClick={() => navigate(`/itinerary/site/view/${item.id}`)}
                                                            className="text-left text-sm font-semibold text-primary hover:underline"
                                                        >
                                                            {item.title || "—"}
                                                        </button>
                                                        <span className="text-sm text-tertiary">{item.alias || "—"}</span>
                                                    </div>
                                                ) : column.id === "area" ? (
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-medium text-primary">{item.area?.title || "—"}</span>
                                                        <span className="text-sm text-tertiary">{item.area?.alias || "—"}</span>
                                                    </div>
                                                ) : column.id === "status" ? (
                                                    <span className="text-sm text-tertiary">{statusToLabel(item.status)}</span>
                                                ) : (
                                                    <div className="flex w-full items-center justify-end gap-1.5">
                                                        <ButtonUtility
                                                            tooltip="Edit"
                                                            tooltipPlacement="bottom"
                                                            icon={Edit01}
                                                            onClick={() => navigate(`/itinerary/site/edit/${item.id}`)}
                                                            color="warning"
                                                        />
                                                        <ButtonUtility
                                                            tooltip="Delete"
                                                            tooltipPlacement="bottom"
                                                            icon={Trash01}
                                                            onClick={() => setDeleteTarget({ id: item.id, title: item.title })}
                                                            color="error"
                                                        />
                                                    </div>
                                                )}
                                            </Table.Cell>
                                        )}
                                    </Table.Row>
                                )
                            }
                        </StickyTable>
                    )}

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
                                    <h2 className="text-lg font-semibold text-primary">Delete site</h2>
                                    <p className="text-sm text-tertiary">
                                        {deleteTarget?.title ? `Delete "${deleteTarget.title}"?` : "Delete this site?"}
                                    </p>
                                </div>
                                <div className="mt-5 flex justify-end gap-2">
                                    <Button color="secondary" onClick={() => state.close()}>
                                        Cancel
                                    </Button>
                                    <Button color="primary-destructive" onClick={handleDelete}>
                                        Delete
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
