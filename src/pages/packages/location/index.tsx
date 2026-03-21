import { DefaultLayout } from "@/layouts/DefaultLayout";
import { StickyTable, Table, TableCard } from "@/components/application/table/table";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { CloseButton } from "@/components/base/buttons/close-button";
import { Input } from "@/components/base/input/input";
import { Label } from "@/components/base/input/label";
import { Select } from "@/components/base/select/select";
import { PaginationButtonGroup } from "@/components/application/pagination/pagination";
import { Dialog, Modal, ModalOverlay } from "@/components/application/modals/modal";
import { SlideoutMenu } from "@/components/application/slideout-menus/slideout-menu";
import { BadgeWithButton } from "@/components/base/badges/badges";
import { useAvailableTableWidth } from "@/hooks/use-available-table-width";
import { useAccess } from "@/hooks/use-access";
import { useStoreSnackbar } from "@/store/snackbar";
import { fetchWithToken } from "@/utils/fetchApi";
import { Edit01, FilterLines, Plus, RefreshCw01, Trash01 } from "@untitledui/icons";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";

type LocationItem = {
    id: string;
    title?: string;
    status?: boolean | string | number | null;
};

const asArray = (value: any) => (Array.isArray(value) ? value : []);

const getId = (value: any) => String(value?.id ?? value?._id ?? value ?? "").trim();

const parseSearch = (search: string) => {
    const sp = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
    const page = Math.max(1, Number(sp.get("page") || 1) || 1);
    const limit = Math.min(100, Math.max(10, Number(sp.get("limit") || 50) || 50));
    const title = sp.get("title") || "";
    const status = sp.get("status") || "";
    return { page, limit, title, status };
};

const statusToLabel = (status: LocationItem["status"]) => {
    if (status === true || status === "true" || status === 1 || status === "1") return "Active";
    if (status === false || status === "false" || status === 0 || status === "0") return "Inactive";
    return "—";
};

export default function PackageLocationListPage() {
    const navigate = useNavigate();
    const { pathname, search } = useLocation();
    const initial = parseSearch(search);
    const availableWidth = useAvailableTableWidth();
    const { can } = useAccess();
    const canView = can("location", "view");
    const canAdd = can("location", "add");
    const canEdit = can("location", "edit");
    const canDelete = can("location", "delete");

    const [page, setPage] = useState(initial.page);
    const [limit, setLimit] = useState(initial.limit);
    const [filters, setFilters] = useState({ title: initial.title, status: initial.status });
    const [debouncedFilters, setDebouncedFilters] = useState({ title: initial.title, status: initial.status });
    const [tempFilters, setTempFilters] = useState(filters);

    const [items, setItems] = useState<LocationItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState<string | null>(null);
    const [totalRecords, setTotalRecords] = useState(0);

    const [deleteTarget, setDeleteTarget] = useState<{ id: string; title?: string } | null>(null);
    const deletingRef = useRef(false);

    const totalPages = Math.max(1, Math.ceil((totalRecords || 0) / limit));
    const indexById = useMemo(() => new Map(items.map((item, index) => [item.id, (page - 1) * limit + index + 1])), [items, limit, page]);
    const isFilterActive = Boolean(filters.title || filters.status);

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
                const res = await fetchWithToken("/api/location", {
                    totalCount: "true",
                    page: String(page),
                    limit: String(limit),
                    ...(debouncedFilters.title ? { title: debouncedFilters.title } : {}),
                    ...(debouncedFilters.status ? { status: debouncedFilters.status } : {}),
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
                        return { ...it, id } as LocationItem;
                    })
                    .filter(Boolean) as LocationItem[];
                const countRaw =
                    (res as any)?.totalCount ??
                    (res as any)?.total ??
                    (res as any)?.count ??
                    resolved?.totalCount ??
                    resolved?.total ??
                    resolved?.count ??
                    resolved?.pagination?.total ??
                    resolved?.pagination?.totalCount ??
                    resolved?.meta?.total;
                const count = Number(countRaw ?? normalized.length) || normalized.length;
                setItems(normalized);
                setTotalRecords(count);
            } catch (e: any) {
                setLoadError(e?.error?.message || e?.message || "Failed to load locations");
                setItems([]);
                setTotalRecords(0);
            } finally {
                setLoading(false);
            }
        };
        run();
    }, [debouncedFilters.status, debouncedFilters.title, limit, page]);

    const handleOpenFilters = () => setTempFilters(filters);

    const handleApplyFilters = (close?: () => void) => {
        setFilters(tempFilters);
        setPage(1);
        close?.();
    };

    const handleResetTempFilters = (close?: () => void) => {
        setTempFilters({ title: "", status: "" });
        setFilters({ title: "", status: "" });
        setPage(1);
        close?.();
    };

    const handleRemoveFilter = (key: "title" | "status") => {
        setFilters((prev) => ({ ...prev, [key]: "" }));
    };

    const handleDelete = async () => {
        if (!deleteTarget?.id || deletingRef.current) return;
        deletingRef.current = true;
        try {
            const res = await fetchWithToken(`/api/location/${deleteTarget.id}`, {}, { method: "DELETE" });
            if ((res as any)?.error) {
                throw new Error((res as any)?.error || "Delete failed");
            }
            useStoreSnackbar.getState().showSnackbar({ title: "Deleted", description: "Location deleted", color: "success" });
            setItems((prev) => prev.filter((it) => it.id !== deleteTarget.id));
            setTotalRecords((prev) => Math.max(0, prev - 1));
            setDeleteTarget(null);
        } catch (e: any) {
            useStoreSnackbar.getState().showSnackbar({ title: "Error", description: e?.message || "Failed to delete location", color: "danger" });
        } finally {
            deletingRef.current = false;
        }
    };

    const columns = [
        { id: "index", name: "#", isRowHeader: true, widthRatio: 10, minWidth: 64 },
        { id: "title", name: "Title", widthRatio: 50, minWidth: 220 },
        { id: "status", name: "Status", widthRatio: 20, minWidth: 140 },
        { id: "actions", name: "Actions", widthRatio: 20, minWidth: 140, className: "pr-4 pl-4 whitespace-nowrap" },
    ] as { id: string; name: string; className?: string; widthRatio?: number; minWidth?: number }[];

    return (
        <DefaultLayout>
            <div style={{ width: availableWidth }}>
                <TableCard.Root className="w-full">
                    <TableCard.Header
                        title="Locations"
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
                                <Button size="sm" color="primary" iconLeading={Plus} isDisabled={!canAdd} onClick={() => navigate("/packages/location/add")}>
                                    Add Location
                                </Button>
                            </div>
                        }
                    />

                    <div className="border-b border-secondary bg-primary px-4 py-4 md:px-6">
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <SlideoutMenu.Trigger>
                                    <Button color="secondary" iconLeading={FilterLines} onClick={handleOpenFilters}>
                                        More filters
                                    </Button>
                                    <SlideoutMenu isDismissable>
                                        {({ close }) => (
                                            <SlideoutMenu.Content>
                                                <SlideoutMenu.Header onClose={close}>Filters</SlideoutMenu.Header>
                                                <div className="flex-1 overflow-y-auto p-6">
                                                    <div className="flex flex-col gap-4">
                                                        <Input
                                                            label="Title"
                                                            placeholder="Search by Title"
                                                            value={tempFilters.title}
                                                            onChange={(value) => setTempFilters((prev) => ({ ...prev, title: value }))}
                                                        />
                                                        <div className="flex flex-col gap-1.5">
                                                            <Label>Status</Label>
                                                            <Select
                                                                aria-label="Status"
                                                                value={tempFilters.status || "__all__"}
                                                                onChange={undefined}
                                                                onSelectionChange={(key) =>
                                                                    setTempFilters((prev) => ({ ...prev, status: key === "__all__" ? "" : String(key) }))
                                                                }
                                                                items={[
                                                                    { id: "__all__", label: "All Status" },
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
                                                    <div className="flex w-full gap-3">
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
                            <div className="flex flex-wrap gap-2">
                                {Object.entries(filters).map(([key, value]) => {
                                    if (!value || value === "__all__") return null;
                                    const label = key === "title" ? "Title" : key === "status" ? "Status" : key;
                                    const displayValue = key === "status" ? (value === "true" ? "Active" : "Inactive") : value;
                                    return (
                                        <BadgeWithButton key={key} onButtonClick={() => handleRemoveFilter(key as any)}>
                                            <span className="mr-1 font-medium text-gray-500">{label}:</span>
                                            <span className="font-semibold text-brand-700">{displayValue}</span>
                                        </BadgeWithButton>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {loading ? (
                        <StickyTable
                            ariaLabel="Location list"
                            columns={columns}
                            items={Array.from({ length: 5 }).map((_, i) => ({ id: `skeleton-${i}` }))}
                            availableWidth={availableWidth}
                            loading={loading}
                        >
                            {(item) => (
                                <Table.Row id={item.id} columns={columns}>
                                    {(column) => (
                                        <Table.Cell className={`${column?.className || ""} ${column.id === "actions" ? "whitespace-nowrap" : ""}`.trim()}>
                                            <div className="animate-pulse">
                                                <div className="h-4 w-full rounded bg-secondary" />
                                            </div>
                                        </Table.Cell>
                                    )}
                                </Table.Row>
                            )}
                        </StickyTable>
                    ) : loadError ? (
                        <div className="px-4 py-10 text-sm text-error md:px-6">{loadError}</div>
                    ) : (
                        <StickyTable ariaLabel="Location list" columns={columns} items={items} availableWidth={availableWidth} loading={loading}>
                            {(item) => (
                                <Table.Row id={item.id} columns={columns}>
                                    {(column) => (
                                        <Table.Cell className={`${column?.className || ""} ${column.id === "actions" ? "whitespace-nowrap" : ""}`.trim()}>
                                            {column.id === "index" ? (
                                                <span className="text-sm text-tertiary">{indexById.get(item.id) ?? "—"}</span>
                                            ) : column.id === "title" ? (
                                                canView ? (
                                                    <button
                                                        type="button"
                                                        onClick={() => navigate(`/packages/location/view/${item.id}`)}
                                                        className="text-left text-sm font-semibold text-primary hover:underline"
                                                    >
                                                        {item.title || "—"}
                                                    </button>
                                                ) : (
                                                    <span className="text-sm font-semibold text-primary">{item.title || "—"}</span>
                                                )
                                            ) : column.id === "status" ? (
                                                <span className="text-sm text-tertiary">{statusToLabel(item.status)}</span>
                                            ) : (
                                                <div className="flex w-full items-center justify-end gap-1.5">
                                                    <ButtonUtility
                                                        tooltip="Edit"
                                                        tooltipPlacement="bottom"
                                                        icon={Edit01}
                                                        onClick={() => navigate(`/packages/location/edit/${item.id}`)}
                                                        color="warning"
                                                        isDisabled={!canEdit}
                                                    />
                                                    <ButtonUtility
                                                        tooltip="Delete"
                                                        tooltipPlacement="bottom"
                                                        icon={Trash01}
                                                        onClick={() => setDeleteTarget({ id: item.id, title: item.title })}
                                                        color="error"
                                                        isDisabled={!canDelete}
                                                    />
                                                </div>
                                            )}
                                        </Table.Cell>
                                    )}
                                </Table.Row>
                            )}
                        </StickyTable>
                    )}

                    <PaginationButtonGroup page={page} total={totalPages} align="center" onPageChange={(next) => setPage(Math.min(totalPages, Math.max(1, next)))} />
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
                                    <h2 className="text-lg font-semibold text-primary">Delete location</h2>
                                    <p className="text-sm text-tertiary">{deleteTarget?.title ? `Delete "${deleteTarget.title}"?` : "Delete this location?"}</p>
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
