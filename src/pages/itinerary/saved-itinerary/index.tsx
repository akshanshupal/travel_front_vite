import { Badge, BadgeWithButton } from "@/components/base/badges/badges";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { CloseButton } from "@/components/base/buttons/close-button";
import { Input } from "@/components/base/input/input";
import { Select } from "@/components/base/select/select";
import { StickyTable, Table, TableCard } from "@/components/application/table/table";
import { PaginationButtonGroup } from "@/components/application/pagination/pagination";
import { DatePicker } from "@/components/application/date-picker/date-picker";
import { getSavedItinerary, deleteSavedItinerary } from "@/utils/services/savedItineraryService";
import { getSalesEx } from "@/utils/services/salesService";
import { useStoreSnackbar } from "@/store/snackbar";
import { Eye, SearchLg, Edit01, Trash01, Mail01, File02, FilterLines, RefreshCw01 } from "@untitledui/icons";
import { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router";
import { DefaultLayout } from "@/layouts/DefaultLayout";
import type { DateValue } from "react-aria-components";
import { parseDate } from "@internationalized/date";
import { ModalOverlay, Modal, Dialog } from "@/components/application/modals/modal";
import MailConfirmation from "@/components/application/mail-confirmation/mail-confirmation";
import { useAvailableTableWidth } from "@/hooks/use-available-table-width";
import { SlideoutMenu } from "@/components/application/slideout-menus/slideout-menu";
import { Label } from "@/components/base/input/label";
import { Button } from "@/components/base/buttons/button";
import { useStoreLogin } from "@/store/login";

const statusColorMap: Record<string, "success" | "error"> = {
    true: "success",
    false: "error",
};

type ListFilters = {
    clientDetails: string;
    status: string;
    salesExecutive: string;
    createdAt: DateValue | null;
    tourDate: DateValue | null;
};

const parseSearch = (search: string): { page: number; limit: number; filters: ListFilters } => {
    const sp = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
    const page = Math.max(1, Number(sp.get("page") || 1) || 1);
    const limit = Math.min(100, Math.max(10, Number(sp.get("limit") || 10) || 10));
    
    const filters: ListFilters = {
        clientDetails: sp.get("clientDetails") || "",
        status: sp.get("status") || "",
        salesExecutive: sp.get("salesExecutive") || "",
        createdAt: sp.get("createdAt") ? parseDate(sp.get("createdAt")!) : null,
        tourDate: sp.get("tourDate") ? parseDate(sp.get("tourDate")!) : null,
    };

    return { page, limit, filters };
};

export default function SavedItineraryListPage() {
    const { showSnackbar } = useStoreSnackbar();
    const navigate = useNavigate();
    const { pathname, search } = useLocation();
    const initial = parseSearch(search);
    const user = useStoreLogin((state) => state.user);
    const isAgent = String(user?.type || "").toUpperCase() === "AGENT";
    const agentId = (user as any)?.id || (user as any)?._id || "";

    const [data, setData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalRecords, setTotalRecords] = useState(0);

    const initialFilters: ListFilters = {
        clientDetails: "",
        status: "",
        salesExecutive: "",
        createdAt: null,
        tourDate: null,
    };

    // Filters
    const [page, setPage] = useState(initial.page);
    const [limit, setLimit] = useState(initial.limit);
    const [filters, setFilters] = useState<ListFilters>(initial.filters);
    const [tempFilters, setTempFilters] = useState<ListFilters>(initial.filters);
    const [debouncedFilters, setDebouncedFilters] = useState<ListFilters>(initial.filters);

    const [salesExecutives, setSalesExecutives] = useState<any[]>([]);
    const availableWidth = useAvailableTableWidth();
    
    // Mail Modal State
    const [isOpen, setIsOpen] = useState(false);
    const [selectedId, setSelectedId] = useState("");
    const [selectedEmail, setSelectedEmail] = useState("");

    useEffect(() => {
        if (!isAgent || !agentId) return;
        setFilters((prev) => (prev.salesExecutive ? prev : { ...prev, salesExecutive: agentId }));
        setTempFilters((prev) => (prev.salesExecutive ? prev : { ...prev, salesExecutive: agentId }));
        setDebouncedFilters((prev) => (prev.salesExecutive ? prev : { ...prev, salesExecutive: agentId }));
        setPage(1);
    }, [isAgent, agentId]);

    // Fetch Sales Executives
    useEffect(() => {
        const fetchSalesExecutives = async () => {
            try {
                const response: any = await getSalesEx({ limit: "all" });
                if (response && Array.isArray(response)) {
                    setSalesExecutives(response);
                }
            } catch (error) {
                console.error("Failed to fetch sales executives", error);
            }
        };
        fetchSalesExecutives();
    }, []);

    // Sync URL with state
    useEffect(() => {
        const sp = new URLSearchParams();
        if (debouncedFilters.clientDetails) sp.set("clientDetails", debouncedFilters.clientDetails);
        if (debouncedFilters.status) sp.set("status", debouncedFilters.status);
        if (debouncedFilters.salesExecutive) sp.set("salesExecutive", debouncedFilters.salesExecutive);
        if (debouncedFilters.createdAt) sp.set("createdAt", debouncedFilters.createdAt.toString());
        if (debouncedFilters.tourDate) sp.set("tourDate", debouncedFilters.tourDate.toString());
        
        sp.set("page", String(page));
        sp.set("limit", String(limit));
        
        const next = sp.toString();
        const current = search.startsWith("?") ? search.slice(1) : search;
        if (next === current) return;
        navigate(next ? `${pathname}?${next}` : pathname, { replace: true });
    }, [debouncedFilters, limit, page, navigate, pathname, search]);

    // Debounce filters sync
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedFilters(filters);
            setPage(1);
        }, 500);
        return () => clearTimeout(handler);
    }, [filters]);

    // Fetch data
    const fetchData = async () => {
        setIsLoading(true);
        try {
            const params: any = {
                page,
                limit,
                populate: "clientItinerary,salesExecutive",
                totalCount: true,
            };

            if (debouncedFilters.clientDetails) params.clientDetails = debouncedFilters.clientDetails;
            if (debouncedFilters.status) params.status = debouncedFilters.status;
            if (isAgent && agentId) params.salesExecutive = agentId;
            else if (debouncedFilters.salesExecutive) params.salesExecutive = debouncedFilters.salesExecutive;
            if (debouncedFilters.createdAt) params.createdAt = debouncedFilters.createdAt.toString();
            if (debouncedFilters.tourDate) params.tourDate = debouncedFilters.tourDate.toString();

            const response: any = await getSavedItinerary(params);
            if (response && response.data) {
                setData(response.data);
                setTotalRecords(response.totalCount || 0);
            }
        } catch (error: any) {
            showSnackbar({
                title: "Error",
                description: error.message || "Failed to fetch data",
                color: "danger",
            });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [page, limit, debouncedFilters]);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this itinerary?")) return;
        try {
            await deleteSavedItinerary(id, {});
            showSnackbar({
                title: "Success",
                description: "Itinerary deleted successfully",
                color: "success",
            });
            fetchData();
        } catch (error: any) {
            showSnackbar({
                title: "Error",
                description: error.message || "Failed to delete",
                color: "danger",
            });
        }
    };

    const handleOpenFilters = () => {
        setTempFilters(filters);
    };

    const handleApplyFilters = (close: () => void) => {
        const nextFilters = isAgent && agentId ? { ...tempFilters, salesExecutive: agentId } : tempFilters;
        setFilters(nextFilters);
        setPage(1);
        close();
    };

    const handleResetTempFilters = (close?: () => void) => {
        const nextFilters = isAgent && agentId ? { ...initialFilters, salesExecutive: agentId } : initialFilters;
        setFilters(nextFilters);
        setTempFilters(nextFilters);
        setDebouncedFilters(nextFilters);
        setPage(1);
        if (close) close();
    };

    const handleRemoveFilter = (key: keyof ListFilters) => {
        const newFilters = { ...filters, [key]: key === "createdAt" || key === "tourDate" ? null : "" };
        if (isAgent && agentId) {
            newFilters.salesExecutive = agentId;
        }
        setFilters(newFilters);
        setTempFilters(newFilters);
        setDebouncedFilters(newFilters);
        setPage(1);
    };

    const formatDate = (dateStr: string) => {
        if (!dateStr) return "-";
        return new Date(dateStr).toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    const totalPages = Math.ceil(totalRecords / limit);
    const columns = [
        { id: "index", name: "#", isRowHeader: true,widthRatio: 6, minWidth: 64 },
        { id: "client", name: "Client Details", widthRatio: 24, minWidth: 240 },
        { id: "salesExecutive", name: "Sales Executive", widthRatio: 16, minWidth: 180 },
        { id: "createdDate", name: "Created Date", widthRatio: 14, minWidth: 160 },
        { id: "tourDate", name: "Travel Date", widthRatio: 12, minWidth: 140 },
        { id: "cost", name: "Cost", widthRatio: 10, minWidth: 120 },
        { id: "status", name: "Status", widthRatio: 8, minWidth: 120 },
        { id: "actions", name: "Actions", widthRatio: 10, minWidth: 200, className: "pr-4 pl-4" },
    ] as { id: string; name: string; className?: string; widthRatio?: number; minWidth?: number }[];
    const itemsWithIndex = data.map((item, index) => ({ ...item, __rowIndex: index }));

    return (
        <DefaultLayout>
            <div style={{ width: availableWidth }}>
                <TableCard.Root>
                    <TableCard.Header
                        title="Quotations"
                        badge={isLoading ? "…" : totalRecords}
                        contentTrailing={
                            <Select
                                aria-label="Rows per page"
                                className="w-40"
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
                        }
                    />

                    <div className="flex flex-col gap-4 border-b border-secondary bg-primary px-4 py-4 md:px-6">
                        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                            <Input
                                placeholder="Search client, email, mobile..."
                                value={filters.clientDetails}
                                onChange={(value) => {
                                    setFilters((prev) => ({ ...prev, clientDetails: value }));
                                    setTempFilters((prev) => ({ ...prev, clientDetails: value }));
                                }}
                                icon={SearchLg}
                                className="w-full md:w-80"
                            />
                            <div className="flex items-center gap-2">
                                <SlideoutMenu.Trigger>
                                    <Button color="secondary" iconLeading={FilterLines} onClick={handleOpenFilters}>
                                        More filters
                                    </Button>
                                    <SlideoutMenu isDismissable>
                                        {({ close }) => (
                                            <SlideoutMenu.Content>
                                                <SlideoutMenu.Header onClose={close}>Filters</SlideoutMenu.Header>
                                                <div className="flex-1 space-y-6 py-4">
                                                    <div className="space-y-2">
                                                        <Label>Status</Label>
                                                        <Select
                                                            aria-label="Status"
                                                            value={tempFilters.status || ""}
                                                            onChange={undefined}
                                                            onSelectionChange={(key) =>
                                                                setTempFilters((prev) => ({ ...prev, status: String(key) }))
                                                            }
                                                            items={[
                                                                { id: "", label: "All Status" },
                                                                { id: "true", label: "Active" },
                                                                { id: "false", label: "Inactive" },
                                                            ]}
                                                        >
                                                            {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                                        </Select>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label>Sales Executive</Label>
                                                        <Select
                                                            aria-label="Sales Executive"
                                                            value={tempFilters.salesExecutive || ""}
                                                            isDisabled={isAgent}
                                                            onChange={undefined}
                                                            onSelectionChange={(key) => {
                                                                if (isAgent) return;
                                                                setTempFilters((prev) => ({ ...prev, salesExecutive: String(key) }));
                                                            }}
                                                            items={[
                                                                ...(isAgent && agentId
                                                                    ? [{ id: String(agentId), label: (user as any)?.name || "You" }]
                                                                    : [{ id: "", label: "All Executives" }]),
                                                                ...(!isAgent
                                                                    ? salesExecutives.map((exec: any) => ({
                                                                        id: String(exec.id || exec._id),
                                                                        label: exec.name,
                                                                    }))
                                                                    : []),
                                                            ]}
                                                        >
                                                            {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                                        </Select>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label>Created Date</Label>
                                                        <DatePicker
                                                            value={tempFilters.createdAt}
                                                            onChange={(date) => setTempFilters((prev) => ({ ...prev, createdAt: date }))}
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label>Travel Date</Label>
                                                        <DatePicker
                                                            value={tempFilters.tourDate}
                                                            onChange={(date) => setTempFilters((prev) => ({ ...prev, tourDate: date }))}
                                                        />
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
                                    isDisabled={
                                        !filters.clientDetails &&
                                        !filters.status &&
                                        !filters.salesExecutive &&
                                        !filters.createdAt &&
                                        !filters.tourDate
                                    }
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {filters.status && (
                                <BadgeWithButton onButtonClick={() => handleRemoveFilter("status")}>
                                    Status: {filters.status === "true" ? "Active" : "Inactive"}
                                </BadgeWithButton>
                            )}
                            {filters.salesExecutive && (
                                <BadgeWithButton onButtonClick={() => handleRemoveFilter("salesExecutive")}>
                                    Executive: {salesExecutives.find(e => (e.id || e._id) === filters.salesExecutive)?.name || filters.salesExecutive}
                                </BadgeWithButton>
                            )}
                            {filters.createdAt && (
                                <BadgeWithButton onButtonClick={() => handleRemoveFilter("createdAt")}>
                                    Created: {filters.createdAt.toString()}
                                </BadgeWithButton>
                            )}
                            {filters.tourDate && (
                                <BadgeWithButton onButtonClick={() => handleRemoveFilter("tourDate")}>
                                    Travel: {filters.tourDate.toString()}
                                </BadgeWithButton>
                            )}
                        </div>
                    </div>

                    <div className="w-full">
                        {isLoading ? (
                            <StickyTable
                                ariaLabel="Saved itinerary list"
                                columns={columns}
                                items={Array.from({ length: 10 }).map((_, i) => ({ id: `skeleton-${i}` }))}
                                availableWidth={availableWidth}
                                loading={isLoading}
                            >
                                {(item) => (
                                    <Table.Row id={item.id} columns={columns}>
                                        {(_column) => (
                                            <Table.Cell className="whitespace-normal break-words">
                                                <div className="animate-pulse">
                                                    <div className="h-4 w-full rounded bg-secondary" />
                                                </div>
                                            </Table.Cell>
                                        )}
                                    </Table.Row>
                                )}
                            </StickyTable>
                        ) : data.length === 0 ? (
                            <StickyTable
                                ariaLabel="Saved itinerary list"
                                columns={columns}
                                items={[{ id: "empty" }]}
                                availableWidth={availableWidth}
                                loading={isLoading}
                            >
                                {() => (
                                    <Table.Row id="empty" columns={columns}>
                                        <Table.Cell colSpan={columns.length} className="text-center py-8 text-gray-500">
                                            No records found
                                        </Table.Cell>
                                    </Table.Row>
                                )}
                            </StickyTable>
                        ) : (
                            <StickyTable
                                ariaLabel="Saved itinerary list"
                                columns={columns}
                                items={itemsWithIndex}
                                availableWidth={availableWidth}
                                loading={isLoading}
                            >
                                {(item) => (
                                    <Table.Row id={item.id || item._id} columns={columns}>
                                        {(column) => (
                                            <Table.Cell className={`${column?.className || ""} ${column.id === "actions" ? "whitespace-nowrap" : "whitespace-normal break-words"}`.trim()}>
                                                {column.id === "index" ? (
                                                    (page - 1) * limit + ((item as any).__rowIndex ?? 0) + 1
                                                ) : column.id === "client" ? (
                                                    <div>
                                                        <Link
                                                            to={`/package-mail/${item.id || item._id}`}
                                                            target="_blank"
                                                            className="font-medium text-brand-600 hover:underline"
                                                        >
                                                            {item.clientName}
                                                        </Link>
                                                        <div className="text-sm text-gray-500">{item.mobile}</div>
                                                        <div className="text-sm text-gray-500">{item.email}</div>
                                                    </div>
                                                ) : column.id === "salesExecutive" ? (
                                                    item.salesExecutive?.name || "-"
                                                ) : column.id === "createdDate" ? (
                                                    <>
                                                        {formatDate(item.createdAt)}
                                                        <div className="text-xs text-gray-400">
                                                            {new Date(item.createdAt).toLocaleTimeString()}
                                                        </div>
                                                    </>
                                                ) : column.id === "tourDate" ? (
                                                    formatDate(item.tourDate)
                                                ) : column.id === "cost" ? (
                                                    `₹ ${item.packageCost}`
                                                ) : column.id === "status" ? (
                                                    <Badge
                                                        color={statusColorMap[String(item.status)] || "gray"}
                                                        size="sm"
                                                    >
                                                        {item.status ? "Active" : "Inactive"}
                                                    </Badge>
                                                ) : (
                                                    <div className="flex items-center gap-2">
                                                        <ButtonUtility
                                                            icon={Eye}
                                                            tooltip="View"
                                                            color="brand"
                                                            href={`/package-mail/${item.id || item._id}`}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                        />
                                                        <ButtonUtility
                                                            icon={Edit01}
                                                            tooltip="Edit"
                                                            color="warning"
                                                            onClick={() => navigate(`/itinerary/saved-itinerary/edit/${item.id || item._id}`)}
                                                        />
                                                        <ButtonUtility
                                                            icon={Trash01}
                                                            tooltip="Delete"
                                                            color="error"
                                                            onClick={() => handleDelete(item.id || item._id)}
                                                        />
                                                        <ButtonUtility
                                                            icon={Mail01}
                                                            tooltip="Send Mail"
                                                            color="brand"
                                                            onClick={() => {
                                                                setSelectedId(item.id || item._id);
                                                                setSelectedEmail(item.email);
                                                                setIsOpen(true);
                                                            }}
                                                        />
                                                        <ButtonUtility
                                                            icon={File02}
                                                            tooltip="Create Assignment"
                                                            color="success"
                                                            onClick={() => navigate(`/bookings/assignment/add?saveditinerary=${item.id || item._id}`)}
                                                        />
                                                    </div>
                                                )}
                                            </Table.Cell>
                                        )}
                                    </Table.Row>
                                )}
                            </StickyTable>
                        )}
                        <PaginationButtonGroup
                            page={page}
                            total={totalPages}
                            onPageChange={setPage}
                            align="center"
                        />
                    </div>
                </TableCard.Root>
            </div>

            <ModalOverlay isOpen={isOpen} onOpenChange={setIsOpen}>
                {() => (
                    <Modal className="max-w-4xl">
                        <Dialog>
                            <div className="relative w-full rounded-xl border border-secondary bg-primary p-6 shadow-lg">
                                <CloseButton
                                    onPress={() => setIsOpen(false)}
                                    className="absolute right-4 top-4"
                                    size="sm"
                                />

                                <MailConfirmation
                                    selectedId={selectedId}
                                    email={selectedEmail}
                                    header="Send Itinerary Mail"
                                    modalClose={() => setIsOpen(false)}
                                    sendMailFnName="sendItineraryMail"
                                    showPreview={true}
                                />
                            </div>
                        </Dialog>
                    </Modal>
                )}
            </ModalOverlay>
        </DefaultLayout>
    );
}
