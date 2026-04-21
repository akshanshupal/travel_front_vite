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
import { getLeads, getLeadsDelete } from "@/utils/services/leadsService";
import { getCampaign } from "@/utils/services/campaignService";
import { getSalesEx } from "@/utils/services/salesService";
import { Edit01, FilterLines, Plus, RefreshCw01, Trash01, Eye } from "@untitledui/icons";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";

type LeadItem = {
    id: string;
    title?: string;
    mobile?: string;
    email?: string;
    campaign?: { id: string; title?: string } | string;
    pipeline?: { id: string; title?: string; initialStage?: { name?: string; tags?: string[] } };
    salesExecutive?: { id: string; name?: string } | string;
    status?: boolean | string;
    createdAt?: string;
    updatedAt?: string;
};

type SelectItem = { id: string; title?: string; name?: string };

const parseSearch = (search: string) => {
    const sp = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
    const page = Math.max(1, Number(sp.get("page") || 1) || 1);
    const limit = Math.min(100, Math.max(10, Number(sp.get("limit") || 10) || 10));
    return {
        page,
        limit,
        title: sp.get("title") || "",
        mobile: sp.get("mobile") || "",
        email: sp.get("email") || "",
        campaign: sp.get("campaign") || "",
        salesExecutive: sp.get("salesExecutive") || "",
        status: sp.get("status") || "",
        createdAt: sp.get("createdAt") || "",
        updatedAt: sp.get("updatedAt") || "",
    };
};

const statusToLabel = (status: boolean | string | undefined) => {
    if (status === true || status === "true") return "Active";
    if (status === false || status === "false") return "Inactive";
    return "—";
};

const formatDate = (dateStr: string | undefined) => {
    if (!dateStr) return "—";
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "Invalid Date";
    return d.toLocaleString("en-IN", { day: "2-digit", month: "short", year: "2-digit", hour: "numeric", minute: "numeric", hour12: true });
};

const asArray = (value: any) => (Array.isArray(value) ? value : []);
const getId = (value: any) => String(value?.id ?? value?._id ?? value ?? "").trim();

export default function LeadsIndexPage() {
    const navigate = useNavigate();
    const { pathname, search } = useLocation();
    const initial = parseSearch(search);
    const availableWidth = useAvailableTableWidth();

    const [page, setPage] = useState(initial.page);
    const [limit, setLimit] = useState(initial.limit);
    const [filters, setFilters] = useState({
        title: initial.title,
        mobile: initial.mobile,
        email: initial.email,
        campaign: initial.campaign,
        salesExecutive: initial.salesExecutive,
        status: initial.status,
        createdAt: initial.createdAt,
        updatedAt: initial.updatedAt,
    });
    const [debouncedFilters, setDebouncedFilters] = useState(filters);
    const [tempFilters, setTempFilters] = useState(filters);

    const [items, setItems] = useState<LeadItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState<string | null>(null);
    const [totalRecords, setTotalRecords] = useState(0);

    const [campaignList, setCampaignList] = useState<SelectItem[]>([]);
    const [salesExecutiveList, setSalesExecutiveList] = useState<SelectItem[]>([]);

    const [deleteTarget, setDeleteTarget] = useState<{ id: string; title?: string } | null>(null);
    const deletingRef = useRef(false);

    const totalPages = Math.max(1, Math.ceil((totalRecords || 0) / limit));
    const indexById = useMemo(() => new Map(items.map((item, index) => [item.id, (page - 1) * limit + index + 1])), [items, limit, page]);
    const isFilterActive = Boolean(
        filters.title || filters.mobile || filters.email || filters.campaign || filters.salesExecutive || filters.status || filters.createdAt || filters.updatedAt,
    );

    // Debounce filters
    useEffect(() => {
        const handler = window.setTimeout(() => {
            setDebouncedFilters(filters);
            setPage(1);
        }, 500);
        return () => window.clearTimeout(handler);
    }, [filters]);

    // Sync URL
    useEffect(() => {
        const sp = new URLSearchParams();
        Object.entries(debouncedFilters).forEach(([key, value]) => {
            if (!value) return;
            sp.set(key, String(value));
        });
        sp.set("page", String(page));
        sp.set("limit", String(limit));
        const next = sp.toString();
        const current = search.startsWith("?") ? search.slice(1) : search;
        if (next === current) return;
        navigate(next ? `${pathname}?${next}` : pathname, { replace: true });
    }, [debouncedFilters, limit, navigate, page, pathname, search]);

    // Fetch dropdown data
    useEffect(() => {
        const run = async () => {
            try {
                const [campaignRes, salesRes] = await Promise.all([
                    getCampaign({ limit: "all", select: "title" }),
                    getSalesEx({ limit: "all", select: "name" }),
                ]);
                const campaignResolved = (campaignRes as any)?.data ?? campaignRes;
                const salesResolved = (salesRes as any)?.data ?? salesRes;
                const campaignList = Array.isArray(campaignResolved?.data) ? campaignResolved.data : Array.isArray(campaignResolved) ? campaignResolved : asArray(campaignResolved?.items);
                const salesList = Array.isArray(salesResolved?.data) ? salesResolved.data : Array.isArray(salesResolved) ? salesResolved : asArray(salesResolved?.items);
                setCampaignList(asArray(campaignList).map((it: any) => ({ id: getId(it), title: it?.title || it?.name || "" })).filter((x: any) => x.id));
                setSalesExecutiveList(asArray(salesList).map((it: any) => ({ id: getId(it), name: it?.name || it?.username || "" })).filter((x: any) => x.id));
            } catch {
                setCampaignList([]);
                setSalesExecutiveList([]);
            }
        };
        run();
    }, []);

    // Fetch leads data
    useEffect(() => {
        const run = async () => {
            setLoading(true);
            setLoadError(null);
            try {
                const res = await getLeads({
                    totalCount: "true",
                    page: String(page),
                    limit: String(limit),
                    populate: "campaign,pipeline,salesExecutive",
                    select_campaign: "title",
                    select_pipeline: "title,initialStage",
                    select_salesExecutive: "name",
                    ...(debouncedFilters.title ? { title: debouncedFilters.title } : {}),
                    ...(debouncedFilters.mobile ? { mobile: debouncedFilters.mobile } : {}),
                    ...(debouncedFilters.email ? { email: debouncedFilters.email } : {}),
                    ...(debouncedFilters.campaign ? { campaign: debouncedFilters.campaign } : {}),
                    ...(debouncedFilters.salesExecutive ? { salesExecutive: debouncedFilters.salesExecutive } : {}),
                    ...(debouncedFilters.status ? { status: debouncedFilters.status } : {}),
                    ...(debouncedFilters.createdAt ? { createdAt: debouncedFilters.createdAt } : {}),
                    ...(debouncedFilters.updatedAt ? { updatedAt: debouncedFilters.updatedAt } : {}),
                });
                const resolved = (res as any)?.data ?? res;
                const list = Array.isArray(resolved?.data) ? resolved.data : Array.isArray(resolved) ? resolved : asArray(resolved?.items);
                const normalized = asArray(list).map((it: any) => {
                    const id = getId(it);
                    if (!id) return null;
                    return { ...it, id } as LeadItem;
                }).filter(Boolean) as LeadItem[];
                const countRaw = (res as any)?.totalCount ?? (res as any)?.total ?? resolved?.totalCount ?? resolved?.total ?? resolved?.pagination?.totalCount;
                const count = Number(countRaw ?? normalized.length) || normalized.length;
                setItems(normalized);
                setTotalRecords(count);
            } catch (e: any) {
                setLoadError(e?.message || "Failed to load leads");
                setItems([]);
                setTotalRecords(0);
            } finally {
                setLoading(false);
            }
        };
        run();
    }, [
        debouncedFilters.title,
        debouncedFilters.mobile,
        debouncedFilters.email,
        debouncedFilters.campaign,
        debouncedFilters.salesExecutive,
        debouncedFilters.status,
        debouncedFilters.createdAt,
        debouncedFilters.updatedAt,
        limit,
        page,
    ]);

    const handleOpenFilters = () => setTempFilters(filters);

    const handleApplyFilters = (close?: () => void) => {
        setFilters(tempFilters);
        setPage(1);
        close?.();
    };

    const handleResetFilters = (close?: () => void) => {
        const next = { title: "", mobile: "", email: "", campaign: "", salesExecutive: "", status: "", createdAt: "", updatedAt: "" };
        setTempFilters(next);
        setFilters(next);
        setPage(1);
        close?.();
    };

    const handleRemoveFilter = (key: keyof typeof filters) => {
        setFilters(prev => ({ ...prev, [key]: "" }));
    };

    const handleDelete = async () => {
        if (!deleteTarget?.id || deletingRef.current) return;
        deletingRef.current = true;
        try {
            await getLeadsDelete(deleteTarget.id);
            useStoreSnackbar.getState().showSnackbar({ title: "Deleted", description: "Lead deleted successfully", color: "success" });
            setItems(prev => prev.filter(it => it.id !== deleteTarget.id));
            setTotalRecords(prev => Math.max(0, prev - 1));
            setDeleteTarget(null);
        } catch (e: any) {
            useStoreSnackbar.getState().showSnackbar({ title: "Error", description: e?.message || "Failed to delete lead", color: "danger" });
        } finally {
            deletingRef.current = false;
        }
    };

    const campaignById = useMemo(() => new Map(campaignList.map(c => [c.id, c.title || ""])), [campaignList]);
    const salesExecById = useMemo(() => new Map(salesExecutiveList.map(s => [s.id, s.name || ""])), [salesExecutiveList]);

    const filterLabel = (key: string, value: string) => {
        if (!value) return "";
        if (key === "campaign") return campaignById.get(value) || value;
        if (key === "salesExecutive") return salesExecById.get(value) || value;
        if (key === "status") return value === "true" ? "Active" : value === "false" ? "Inactive" : value;
        return value;
    };

    const columns = [
        { id: "index", name: "#", isRowHeader: true, widthRatio: 5, minWidth: 56 },
        { id: "title", name: "Name", widthRatio: 14, minWidth: 160 },
        { id: "mobile", name: "Number", widthRatio: 12, minWidth: 140 },
        { id: "email", name: "Email", widthRatio: 16, minWidth: 200 },
        { id: "campaign", name: "Campaign Name", widthRatio: 14, minWidth: 160 },
        { id: "createdAt", name: "Created Date", widthRatio: 12, minWidth: 160 },
        { id: "updatedAt", name: "Updated At", widthRatio: 12, minWidth: 160 },
        { id: "leadstage", name: "Lead Stage", widthRatio: 10, minWidth: 120 },
        { id: "tags", name: "Tags", widthRatio: 10, minWidth: 120 },
        { id: "salesExecutive", name: "User Assigned", widthRatio: 10, minWidth: 140 },
        { id: "status", name: "Lead Status", widthRatio: 8, minWidth: 100 },
        { id: "actions", name: "Actions", widthRatio: 8, minWidth: 120, className: "pr-4 pl-4 whitespace-nowrap" },
    ] as { id: string; name: string; className?: string; widthRatio?: number; minWidth?: number }[];

    const getCampaignTitle = (item: LeadItem) => {
        const c = item.campaign;
        if (!c) return "—";
        if (typeof c === "object") return c.title || "—";
        return campaignById.get(c) || "—";
    };

    const getSalesExecName = (item: LeadItem) => {
        const se = item.salesExecutive;
        if (!se) return "—";
        if (typeof se === "object") return (se as any).name || "—";
        return salesExecById.get(se) || "—";
    };

    return (
        <DefaultLayout>
            <div style={{ width: availableWidth }}>
                <TableCard.Root className="w-full">
                    <TableCard.Header
                        title="Leads Management"
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
                                        { id: "100", label: "100 / page" },
                                    ]}
                                >
                                    {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                </Select>
                                <Button size="sm" color="primary" iconLeading={Plus} onClick={() => navigate("/lead-management/leads/add")}>
                                    Add Leads
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
                                                            label="Name"
                                                            placeholder="Search by name"
                                                            value={tempFilters.title}
                                                            onChange={(value) => setTempFilters(prev => ({ ...prev, title: value }))}
                                                        />
                                                        <Input
                                                            label="Mobile"
                                                            placeholder="Search by mobile"
                                                            value={tempFilters.mobile}
                                                            onChange={(value) => setTempFilters(prev => ({ ...prev, mobile: value }))}
                                                        />
                                                        <Input
                                                            label="Email"
                                                            placeholder="Search by email"
                                                            value={tempFilters.email}
                                                            onChange={(value) => setTempFilters(prev => ({ ...prev, email: value }))}
                                                        />
                                                        <div className="flex flex-col gap-1.5">
                                                            <Label>Campaign</Label>
                                                            <Select
                                                                aria-label="Campaign"
                                                                value={tempFilters.campaign || "__all__"}
                                                                onChange={undefined}
                                                                onSelectionChange={(key) =>
                                                                    setTempFilters(prev => ({ ...prev, campaign: key === "__all__" ? "" : String(key) }))
                                                                }
                                                                items={[
                                                                    { id: "__all__", label: "All Campaigns" },
                                                                    ...campaignList.map(c => ({ id: c.id, label: c.title || c.id })),
                                                                ]}
                                                            >
                                                                {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                                            </Select>
                                                        </div>
                                                        <div className="flex flex-col gap-1.5">
                                                            <Label>Sales Executive</Label>
                                                            <Select
                                                                aria-label="Sales Executive"
                                                                value={tempFilters.salesExecutive || "__all__"}
                                                                onChange={undefined}
                                                                onSelectionChange={(key) =>
                                                                    setTempFilters(prev => ({ ...prev, salesExecutive: key === "__all__" ? "" : String(key) }))
                                                                }
                                                                items={[
                                                                    { id: "__all__", label: "All Sales Executives" },
                                                                    ...salesExecutiveList.map(s => ({ id: s.id, label: s.name || s.id })),
                                                                ]}
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
                                                                onSelectionChange={(key) =>
                                                                    setTempFilters(prev => ({ ...prev, status: key === "__all__" ? "" : String(key) }))
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
                                                        <Input
                                                            label="Created At"
                                                            placeholder="Search by created date"
                                                            value={tempFilters.createdAt}
                                                            onChange={(value) => setTempFilters(prev => ({ ...prev, createdAt: value }))}
                                                        />
                                                        <Input
                                                            label="Updated At"
                                                            placeholder="Search by updated date"
                                                            value={tempFilters.updatedAt}
                                                            onChange={(value) => setTempFilters(prev => ({ ...prev, updatedAt: value }))}
                                                        />
                                                    </div>
                                                </div>
                                                <SlideoutMenu.Footer>
                                                    <div className="flex w-full gap-3">
                                                        <Button color="secondary" className="flex-1 justify-center" onClick={() => handleResetFilters(close)}>
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
                                    onClick={() => handleResetFilters()}
                                    color="secondary"
                                    className="px-3"
                                    tooltip="Reset Filters"
                                    isDisabled={!isFilterActive}
                                />
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {Object.entries(filters).map(([key, value]) => {
                                    if (!value || value === "__all__") return null;
                                    const labelKey = key === "salesExecutive" ? "Sales Executive" : key === "createdAt" ? "Created At" : key === "updatedAt" ? "Updated At" : key.charAt(0).toUpperCase() + key.slice(1);
                                    return (
                                        <button
                                            key={key}
                                            onClick={() => handleRemoveFilter(key as any)}
                                            className="inline-flex items-center gap-1 rounded-full border border-secondary bg-primary px-2.5 py-1 text-xs font-medium text-primary hover:bg-secondary"
                                        >
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
                        <StickyTable
                            ariaLabel="Leads list"
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
                        <StickyTable ariaLabel="Leads list" columns={columns} items={items} availableWidth={availableWidth} loading={loading}>
                            {(item) => (
                                <Table.Row id={item.id} columns={columns}>
                                    {(column) => (
                                        <Table.Cell
                                            className={`${column?.className || ""} ${column.id === "actions" ? "whitespace-nowrap" : "whitespace-normal break-words"}`.trim()}
                                        >
                                            {column.id === "index" ? (
                                                <span className="text-sm text-tertiary">{indexById.get(item.id) ?? "—"}</span>
                                            ) : column.id === "title" ? (
                                                <button
                                                    type="button"
                                                    onClick={() => navigate(`/lead-management/leads/view/${item.id}`)}
                                                    className="text-left text-sm font-semibold text-primary hover:underline"
                                                >
                                                    {item.title || "—"}
                                                </button>
                                            ) : column.id === "mobile" ? (
                                                <span className="text-sm text-tertiary">{item.mobile || "—"}</span>
                                            ) : column.id === "email" ? (
                                                <span className="text-sm text-tertiary">{item.email || "—"}</span>
                                            ) : column.id === "campaign" ? (
                                                <span className="text-sm text-tertiary">{getCampaignTitle(item)}</span>
                                            ) : column.id === "createdAt" ? (
                                                <div className="flex flex-col gap-0.5">
                                                    <Badge size="sm" color="warning">{formatDate(item.createdAt)}</Badge>
                                                </div>
                                            ) : column.id === "updatedAt" ? (
                                                <div className="flex flex-col gap-0.5">
                                                    <Badge size="sm" color="warning">{formatDate(item.updatedAt)}</Badge>
                                                </div>
                                            ) : column.id === "leadstage" ? (
                                                <span className="text-sm text-tertiary">{item.pipeline?.initialStage?.name || "—"}</span>
                                            ) : column.id === "tags" ? (
                                                <div className="flex flex-wrap gap-1">
                                                    {(item.pipeline?.initialStage?.tags || []).map((tag, i) => (
                                                        <Badge key={i} size="sm" color="blue">{tag}</Badge>
                                                    ))}
                                                    {(!item.pipeline?.initialStage?.tags?.length) && <span className="text-sm text-tertiary">—</span>}
                                                </div>
                                            ) : column.id === "salesExecutive" ? (
                                                <span className="text-sm text-tertiary">{getSalesExecName(item)}</span>
                                            ) : column.id === "status" ? (
                                                <Badge
                                                    size="sm"
                                                    color={item.status === true || item.status === "true" ? "success" : "error"}
                                                >
                                                    {statusToLabel(item.status)}
                                                </Badge>
                                            ) : (
                                                <div className="flex w-full items-center justify-end gap-1.5">
                                                    <ButtonUtility
                                                        tooltip="View"
                                                        tooltipPlacement="bottom"
                                                        icon={Eye}
                                                        onClick={() => navigate(`/lead-management/leads/view/${item.id}`)}
                                                        color="secondary"
                                                    />
                                                    <ButtonUtility
                                                        tooltip="Edit"
                                                        tooltipPlacement="bottom"
                                                        icon={Edit01}
                                                        onClick={() => navigate(`/lead-management/leads/edit/${item.id}`)}
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
                            )}
                        </StickyTable>
                    )}

                    <PaginationButtonGroup page={page} total={totalPages} align="center" onPageChange={(next) => setPage(Math.min(totalPages, Math.max(1, next)))} />
                </TableCard.Root>
            </div>

            <ModalOverlay
                isOpen={Boolean(deleteTarget)}
                isDismissable
                onOpenChange={(open) => { if (!open) setDeleteTarget(null); }}
            >
                {({ state }) => (
                    <Modal className="max-w-lg">
                        <Dialog>
                            <div className="relative w-full rounded-xl bg-primary p-5 ring-1 ring-secondary">
                                <CloseButton onPress={() => state.close()} className="absolute right-4 top-4" size="sm" />
                                <div className="space-y-1">
                                    <h2 className="text-lg font-semibold text-primary">Delete Lead</h2>
                                    <p className="text-sm text-tertiary">
                                        {deleteTarget?.title ? `Delete "${deleteTarget.title}"?` : "Delete this lead?"}
                                    </p>
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
