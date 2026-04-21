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
import { Badge } from "@/components/base/badges/badges";
import { useAvailableTableWidth } from "@/hooks/use-available-table-width";
import { useStoreSnackbar } from "@/store/snackbar";
import { getCampaign, getCampaignDelete } from "@/utils/services/campaignService";
import { getSalesEx } from "@/utils/services/salesService";
import { Edit01, FilterLines, Plus, RefreshCw01, Trash01, Eye } from "@untitledui/icons";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";

type CampaignItem = {
    id: string;
    title?: string;
    pipeline?: { id: string; title?: string };
    managingCampaign?: string[];
    additionalSetting?: { priority?: string };
    status?: boolean | string;
};

type SelectItem = { id: string; username?: string; name?: string };

const parseSearch = (search: string) => {
    const sp = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
    return {
        page: Math.max(1, Number(sp.get("page") || 1) || 1),
        limit: Math.min(100, Math.max(10, Number(sp.get("limit") || 10) || 10)),
        title: sp.get("title") || "",
        status: sp.get("status") || "",
        managingCampaign: sp.get("managingCampaign") || "",
    };
};

const statusToLabel = (status: boolean | string | undefined) => {
    if (status === true || status === "true") return "Active";
    if (status === false || status === "false") return "Inactive";
    return "—";
};

const asArray = (value: any) => (Array.isArray(value) ? value : []);
const getId = (value: any) => String(value?.id ?? value?._id ?? value ?? "").trim();

export default function CampaignIndexPage() {
    const navigate = useNavigate();
    const { pathname, search } = useLocation();
    const initial = parseSearch(search);
    const availableWidth = useAvailableTableWidth();

    const [page, setPage] = useState(initial.page);
    const [limit, setLimit] = useState(initial.limit);
    const [filters, setFilters] = useState({ title: initial.title, status: initial.status, managingCampaign: initial.managingCampaign });
    const [debouncedFilters, setDebouncedFilters] = useState(filters);
    const [tempFilters, setTempFilters] = useState(filters);

    const [items, setItems] = useState<CampaignItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState<string | null>(null);
    const [totalRecords, setTotalRecords] = useState(0);
    const [salesList, setSalesList] = useState<SelectItem[]>([]);

    const [deleteTarget, setDeleteTarget] = useState<{ id: string; title?: string } | null>(null);
    const deletingRef = useRef(false);

    const totalPages = Math.max(1, Math.ceil((totalRecords || 0) / limit));
    const indexById = useMemo(() => new Map(items.map((item, index) => [item.id, (page - 1) * limit + index + 1])), [items, limit, page]);
    const isFilterActive = Boolean(filters.title || filters.status || filters.managingCampaign);

    const salesListById = useMemo(() => new Map(salesList.map(s => [s.id, s.username || s.name || ""])), [salesList]);

    useEffect(() => {
        const handler = window.setTimeout(() => { setDebouncedFilters(filters); setPage(1); }, 500);
        return () => window.clearTimeout(handler);
    }, [filters]);

    useEffect(() => {
        const sp = new URLSearchParams();
        Object.entries(debouncedFilters).forEach(([key, value]) => { if (!value) return; sp.set(key, String(value)); });
        sp.set("page", String(page));
        sp.set("limit", String(limit));
        const next = sp.toString();
        const current = search.startsWith("?") ? search.slice(1) : search;
        if (next === current) return;
        navigate(next ? `${pathname}?${next}` : pathname, { replace: true });
    }, [debouncedFilters, limit, navigate, page, pathname, search]);

    useEffect(() => {
        const run = async () => {
            try {
                const res = await getSalesEx();
                const resolved = (res as any)?.data ?? res;
                const list = Array.isArray(resolved?.data) ? resolved.data : Array.isArray(resolved) ? resolved : asArray(resolved?.items);
                setSalesList(asArray(list).map((it: any) => ({ id: getId(it), username: it?.username || "", name: it?.name || "" })).filter((x: any) => x.id));
            } catch { setSalesList([]); }
        };
        run();
    }, []);

    useEffect(() => {
        const run = async () => {
            setLoading(true);
            setLoadError(null);
            try {
                const res = await getCampaign({
                    totalCount: "true",
                    page: String(page),
                    limit: String(limit),
                    populate: "pipeline",
                    select_pipeline: "title",
                    ...(debouncedFilters.title ? { title: debouncedFilters.title } : {}),
                    ...(debouncedFilters.status ? { status: debouncedFilters.status } : {}),
                    ...(debouncedFilters.managingCampaign ? { managingCampaign: debouncedFilters.managingCampaign } : {}),
                });
                const resolved = (res as any)?.data ?? res;
                const list = Array.isArray(resolved?.data) ? resolved.data : Array.isArray(resolved) ? resolved : asArray(resolved?.items);
                const normalized = asArray(list).map((it: any) => { const id = getId(it); if (!id) return null; return { ...it, id } as CampaignItem; }).filter(Boolean) as CampaignItem[];
                const countRaw = (res as any)?.totalCount ?? (res as any)?.total ?? resolved?.totalCount ?? resolved?.total;
                setItems(normalized);
                setTotalRecords(Number(countRaw ?? normalized.length) || normalized.length);
            } catch (e: any) {
                setLoadError(e?.message || "Failed to load campaigns");
                setItems([]);
                setTotalRecords(0);
            } finally {
                setLoading(false);
            }
        };
        run();
    }, [debouncedFilters.title, debouncedFilters.status, debouncedFilters.managingCampaign, limit, page]);

    const handleDelete = async () => {
        if (!deleteTarget?.id || deletingRef.current) return;
        deletingRef.current = true;
        try {
            await getCampaignDelete(deleteTarget.id);
            useStoreSnackbar.getState().showSnackbar({ title: "Deleted", description: "Campaign deleted successfully", color: "success" });
            setItems(prev => prev.filter(it => it.id !== deleteTarget.id));
            setTotalRecords(prev => Math.max(0, prev - 1));
            setDeleteTarget(null);
        } catch (e: any) {
            useStoreSnackbar.getState().showSnackbar({ title: "Error", description: e?.message || "Failed to delete campaign", color: "danger" });
        } finally {
            deletingRef.current = false;
        }
    };

    const columns = [
        { id: "index", name: "#", isRowHeader: true, widthRatio: 6, minWidth: 64 },
        { id: "title", name: "Campaign Name", widthRatio: 20, minWidth: 200 },
        { id: "pipeline", name: "Pipeline", widthRatio: 16, minWidth: 160 },
        { id: "managingCampaign", name: "Managing Campaign Name", widthRatio: 20, minWidth: 220 },
        { id: "priority", name: "Priority Name", widthRatio: 14, minWidth: 140 },
        { id: "status", name: "Status", widthRatio: 10, minWidth: 100 },
        { id: "actions", name: "Actions", widthRatio: 8, minWidth: 140, className: "pr-4 pl-4 whitespace-nowrap" },
    ] as { id: string; name: string; className?: string; widthRatio?: number; minWidth?: number }[];

    const handleOpenFilters = () => setTempFilters(filters);
    const handleApplyFilters = (close?: () => void) => { setFilters(tempFilters); setPage(1); close?.(); };
    const handleResetFilters = (close?: () => void) => {
        const next = { title: "", status: "", managingCampaign: "" };
        setTempFilters(next); setFilters(next); setPage(1); close?.();
    };
    const handleRemoveFilter = (key: keyof typeof filters) => setFilters(prev => ({ ...prev, [key]: "" }));

    const filterLabel = (key: string, value: string) => {
        if (key === "status") return value === "true" ? "Active" : value === "false" ? "Inactive" : value;
        return value;
    };

    return (
        <DefaultLayout>
            <div style={{ width: availableWidth }}>
                <TableCard.Root className="w-full">
                    <TableCard.Header
                        title="Campaign Management"
                        badge={loading ? "…" : totalRecords}
                        contentTrailing={
                            <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center">
                                <Select
                                    aria-label="Rows per page"
                                    className="w-full md:w-40"
                                    value={String(limit)}
                                    onChange={undefined}
                                    onSelectionChange={(key) => { const n = Number(key); if (!Number.isFinite(n) || n <= 0) return; setLimit(n); setPage(1); }}
                                    items={[{ id: "10", label: "10 / page" }, { id: "25", label: "25 / page" }, { id: "50", label: "50 / page" }]}
                                >
                                    {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                </Select>
                                <Button size="sm" color="primary" iconLeading={Plus} onClick={() => navigate("/lead-management/campaign/add")}>
                                    Add Campaign
                                </Button>
                            </div>
                        }
                    />

                    <div className="border-b border-secondary bg-primary px-4 py-4 md:px-6">
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <SlideoutMenu.Trigger>
                                    <Button color="secondary" iconLeading={FilterLines} onClick={handleOpenFilters}>More filters</Button>
                                    <SlideoutMenu isDismissable>
                                        {({ close }) => (
                                            <SlideoutMenu.Content>
                                                <SlideoutMenu.Header onClose={close}>Filters</SlideoutMenu.Header>
                                                <div className="flex-1 overflow-y-auto p-6">
                                                    <div className="flex flex-col gap-4">
                                                        <Input label="Campaign Name" placeholder="Search by name" value={tempFilters.title} onChange={(v) => setTempFilters(p => ({ ...p, title: v }))} />
                                                        <div className="flex flex-col gap-1.5">
                                                            <Label>Status</Label>
                                                            <Select
                                                                aria-label="Status"
                                                                value={tempFilters.status || "__all__"}
                                                                onChange={undefined}
                                                                onSelectionChange={(key) => setTempFilters(p => ({ ...p, status: key === "__all__" ? "" : String(key) }))}
                                                                items={[{ id: "__all__", label: "All Status" }, { id: "true", label: "Active" }, { id: "false", label: "Inactive" }]}
                                                            >
                                                                {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                                            </Select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <SlideoutMenu.Footer>
                                                    <div className="flex w-full gap-3">
                                                        <Button color="secondary" className="flex-1 justify-center" onClick={() => handleResetFilters(close)}>Reset</Button>
                                                        <Button color="primary" className="flex-1 justify-center" onClick={() => handleApplyFilters(close)}>Apply Filters</Button>
                                                    </div>
                                                </SlideoutMenu.Footer>
                                            </SlideoutMenu.Content>
                                        )}
                                    </SlideoutMenu>
                                </SlideoutMenu.Trigger>
                                <ButtonUtility icon={RefreshCw01} onClick={() => handleResetFilters()} color="secondary" className="px-3" tooltip="Reset Filters" isDisabled={!isFilterActive} />
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {Object.entries(filters).map(([key, value]) => {
                                    if (!value) return null;
                                    const labelKey = key === "managingCampaign" ? "Managing Campaign" : key.charAt(0).toUpperCase() + key.slice(1);
                                    return (
                                        <button key={key} onClick={() => handleRemoveFilter(key as any)} className="inline-flex items-center gap-1 rounded-full border border-secondary bg-primary px-2.5 py-1 text-xs font-medium text-primary hover:bg-secondary">
                                            <span className="text-tertiary">{labelKey}:</span>
                                            <span className="text-brand-700">{filterLabel(key, value)}</span>
                                            <span className="ml-1 text-tertiary">×</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {loading ? (
                        <StickyTable ariaLabel="Campaign list" columns={columns} items={Array.from({ length: 5 }).map((_, i) => ({ id: `skeleton-${i}` }))} availableWidth={availableWidth} loading={loading}>
                            {(item) => (
                                <Table.Row id={item.id} columns={columns}>
                                    {(column) => (
                                        <Table.Cell className={`${column?.className || ""} ${column.id === "actions" ? "whitespace-nowrap" : ""}`.trim()}>
                                            <div className="animate-pulse"><div className="h-4 w-full rounded bg-secondary" /></div>
                                        </Table.Cell>
                                    )}
                                </Table.Row>
                            )}
                        </StickyTable>
                    ) : loadError ? (
                        <div className="px-4 py-10 text-sm text-error md:px-6">{loadError}</div>
                    ) : (
                        <StickyTable ariaLabel="Campaign list" columns={columns} items={items} availableWidth={availableWidth} loading={loading}>
                            {(item) => (
                                <Table.Row id={item.id} columns={columns}>
                                    {(column) => (
                                        <Table.Cell className={`${column?.className || ""} ${column.id === "actions" ? "whitespace-nowrap" : "whitespace-normal break-words"}`.trim()}>
                                            {column.id === "index" ? (
                                                <span className="text-sm text-tertiary">{indexById.get(item.id) ?? "—"}</span>
                                            ) : column.id === "title" ? (
                                                <button type="button" onClick={() => navigate(`/lead-management/campaign/view/${item.id}`)} className="text-left text-sm font-semibold text-primary hover:underline">
                                                    {item.title || "—"}
                                                </button>
                                            ) : column.id === "pipeline" ? (
                                                <span className="text-sm text-tertiary">{item.pipeline?.title || "—"}</span>
                                            ) : column.id === "managingCampaign" ? (
                                                <div className="flex flex-wrap gap-1">
                                                    {asArray(item.managingCampaign).length > 0 ? (
                                                        asArray(item.managingCampaign).map((execId: string) => {
                                                            const name = salesListById.get(execId) || execId;
                                                            return (
                                                                <Badge key={execId} size="sm" color="blue">{name}</Badge>
                                                            );
                                                        })
                                                    ) : (
                                                        <span className="text-sm text-tertiary">N/A</span>
                                                    )}
                                                </div>
                                            ) : column.id === "priority" ? (
                                                <span className="text-sm text-tertiary">{item.additionalSetting?.priority || "—"}</span>
                                            ) : column.id === "status" ? (
                                                <Badge size="sm" color={item.status === true || item.status === "true" ? "success" : "error"}>
                                                    {statusToLabel(item.status)}
                                                </Badge>
                                            ) : (
                                                <div className="flex w-full items-center justify-end gap-1.5">
                                                    <ButtonUtility tooltip="View" tooltipPlacement="bottom" icon={Eye} onClick={() => navigate(`/lead-management/campaign/view/${item.id}`)} color="secondary" />
                                                    <ButtonUtility tooltip="Edit" tooltipPlacement="bottom" icon={Edit01} onClick={() => navigate(`/lead-management/campaign/edit/${item.id}`)} color="warning" />
                                                    <ButtonUtility tooltip="Delete" tooltipPlacement="bottom" icon={Trash01} onClick={() => setDeleteTarget({ id: item.id, title: item.title })} color="error" />
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

            <ModalOverlay isOpen={Boolean(deleteTarget)} isDismissable onOpenChange={(open) => { if (!open) setDeleteTarget(null); }}>
                {({ state }) => (
                    <Modal className="max-w-lg">
                        <Dialog>
                            <div className="relative w-full rounded-xl bg-primary p-5 ring-1 ring-secondary">
                                <CloseButton onPress={() => state.close()} className="absolute right-4 top-4" size="sm" />
                                <div className="space-y-1">
                                    <h2 className="text-lg font-semibold text-primary">Delete Campaign</h2>
                                    <p className="text-sm text-tertiary">{deleteTarget?.title ? `Delete "${deleteTarget.title}"?` : "Delete this campaign?"}</p>
                                </div>
                                <div className="mt-5 flex justify-end gap-2">
                                    <Button color="secondary" onClick={() => state.close()}>Cancel</Button>
                                    <Button color="primary-destructive" onClick={handleDelete}>Delete</Button>
                                </div>
                            </div>
                        </Dialog>
                    </Modal>
                )}
            </ModalOverlay>
        </DefaultLayout>
    );
}
