import { DefaultLayout } from "@/layouts/DefaultLayout";
import { PaginationButtonGroup } from "@/components/application/pagination/pagination";
import { StickyTable, Table, TableCard } from "@/components/application/table/table";
import { Badge, BadgeWithButton } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Input } from "@/components/base/input/input";
import { Select } from "@/components/base/select/select";
import { Label } from "@/components/base/input/label";
import { getbookingtype, getBookingDelete } from "@/utils/services/bookingTypeService";
import { useStoreSnackbar } from "@/store/snackbar";
import { Eye, Plus, Trash01, Edit01, FilterLines, RefreshCw01, SearchLg } from "@untitledui/icons";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { Dialog, Modal, ModalOverlay } from "@/components/application/modals/modal";
import { CloseButton } from "@/components/base/buttons/close-button";
import { useAvailableTableWidth } from "@/hooks/use-available-table-width";
import { SlideoutMenu } from "@/components/application/slideout-menus/slideout-menu";

const parseSearch = (search: string) => {
    const sp = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
    const page = Math.max(1, Number(sp.get("page") || 1) || 1);
    const limit = Math.min(100, Math.max(10, Number(sp.get("limit") || 10) || 10));
    const title = sp.get("title") || "";
    const status = sp.get("status") || "";
    return { page, limit, title, status };
};

export default function BookingTypePage() {
    const availableWidth = useAvailableTableWidth();
    const navigate = useNavigate();
    const { pathname, search } = useLocation();
    const { showSnackbar } = useStoreSnackbar();

    const initial = parseSearch(search);

    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState<any[]>([]);
    const [totalRecords, setTotalRecords] = useState(0);

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState<any>(null);

    const [page, setPage] = useState(initial.page);
    const [limit, setLimit] = useState(initial.limit);
    const [filters, setFilters] = useState({
        title: initial.title,
        status: initial.status,
    });

    const [debouncedFilters, setDebouncedFilters] = useState(filters);
    const [tempFilters, setTempFilters] = useState(filters);

    const isFilterActive = Boolean(filters.title || filters.status);
    const totalPages = Math.max(1, Math.ceil((totalRecords || 0) / limit));
    const getItemId = (item: any) => String(item?.id || item?._id || "");
    const indexById = useMemo(
        () => new Map(items.map((item, index) => [getItemId(item), (page - 1) * limit + index + 1])),
        [items, limit, page]
    );
    const columns = [
        { id: "index", name: "S. No.", isRowHeader: true, widthRatio: 6, minWidth: 64 },
        { id: "title", name: "Booking Type", widthRatio: 14, minWidth: 160 },
        { id: "additionalDetails", name: "Additional Details", widthRatio: 30, minWidth: 220 },
        { id: "additionalBookingDetails", name: "Additional Booking Details", widthRatio: 30, minWidth: 240 },
        { id: "status", name: "Status", widthRatio: 10, minWidth: 120 },
        { id: "actions", name: "Actions", widthRatio: 10, minWidth: 140, className: "pr-4 pl-4" },
    ] as { id: string; name: string; className?: string; widthRatio?: number; minWidth?: number }[];

    const handleApplyFilters = (close: () => void) => {
        setFilters(tempFilters);
        close();
    };

    const handleResetTempFilters = (close?: () => void) => {
        const resetState = {
            title: "",
            status: "",
        };
        setTempFilters(resetState);
        setFilters(resetState);
        setDebouncedFilters(resetState);
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

    const handleOpenFilters = () => {
        setTempFilters(filters);
    };

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedFilters(filters);
            setPage(1);
        }, 500);
        return () => clearTimeout(handler);
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

    const fetchData = async () => {
        setLoading(true);
        try {
            const params: Record<string, any> = {
                totalCount: true,
                page,
                limit,
                select: "title,status,customParams",
                ...debouncedFilters,
            };
            Object.keys(params).forEach(key => {
                if (params[key] === "" || params[key] === undefined || params[key] === null) delete params[key];
            });
            const response = await getbookingtype(params);
            if (response.error) {
                throw new Error(response.error);
            }
            setItems(response.data || []);
            setTotalRecords(response.totalCount || 0);
        } catch (error: any) {
            showSnackbar({
                title: "Error",
                description: error.message || "Failed to fetch booking types",
                color: "danger",
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [page, limit, debouncedFilters]);

    const handleDelete = async () => {
        if (!deleteTarget) return;
        try {
            const response = await getBookingDelete(deleteTarget.id, {});
            if (response.error) {
                throw new Error(response.error);
            }
            showSnackbar({
                title: "Success",
                description: "Booking type deleted successfully",
                color: "success",
            });
            setDeleteModalOpen(false);
            fetchData();
        } catch (error: any) {
            showSnackbar({
                title: "Error",
                description: error.message || "Failed to delete booking type",
                color: "danger",
            });
        }
    };

    return (
        <DefaultLayout>
            <div className="space-y-4" style={{ width: availableWidth }}>
                <TableCard.Root className="w-full">
                    <TableCard.Header
                        title="Booking Type List"
                        badge={loading ? "..." : totalRecords}
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
                                <Button
                                    size="sm"
                                    color="primary"
                                    iconLeading={Plus}
                                    onClick={() => navigate("/bookings/bookingtype/add")}
                                >
                                    Add Booking Type
                                </Button>
                            </div>
                        }
                    />

                    <div className="flex flex-col gap-4 border-b border-secondary bg-primary px-4 py-4 md:px-6">
                        <div className="flex flex-col gap-3 md:flex-row md:items-center justify-between">
                            <Input
                                placeholder="Search by booking type"
                                value={tempFilters.title}
                                onChange={(value) => {
                                    setFilters((prev) => ({ ...prev, title: value }));
                                    setTempFilters((prev) => ({ ...prev, title: value }));
                                }}
                                icon={SearchLg}
                                className="w-full md:w-80"
                            />
                            <div className="flex items-center gap-2">
                                <SlideoutMenu.Trigger>
                                    <Button color="primary" iconLeading={FilterLines} onClick={handleOpenFilters}>
                                        More filters
                                    </Button>
                                    <SlideoutMenu isDismissable>
                                        {({ close }) => (
                                            <SlideoutMenu.Content>
                                                <SlideoutMenu.Header onClose={close}>
                                                    <div className="flex items-center gap-1">
                                                        <span className="text-lg font-bold text-primary">More Filters</span>
                                                    </div>
                                                </SlideoutMenu.Header>
                                                <div className="flex-1 overflow-y-auto p-6">
                                                    <div className="flex flex-col gap-4">
                                                        <div className="flex flex-col gap-1.5">
                                                            <Label>Status</Label>
                                                            <Select
                                                                aria-label="Status"
                                                                value={tempFilters.status || "__all__"}
                                                                onChange={undefined}
                                                                onSelectionChange={(key) => setTempFilters((prev) => ({ ...prev, status: key === "__all__" ? "" : String(key) }))}
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
                                if (!value) return null;
                                let label = key;
                                if (key === "title") label = "Booking Type";
                                if (key === "status") label = "Status";
                                let displayValue = value;
                                if (value === "true" && key === "status") displayValue = "Active";
                                if (value === "false" && key === "status") displayValue = "Inactive";
                                return (
                                    <BadgeWithButton key={key} onButtonClick={() => handleRemoveFilter(key)}>
                                        <span className="font-medium text-gray-500 mr-1">{label}:</span>
                                        <span className="font-semibold text-brand-700">{displayValue}</span>
                                    </BadgeWithButton>
                                );
                            })}
                        </div>
                    </div>

                    <StickyTable
                        ariaLabel="Booking Type list"
                        columns={columns}
                        items={items}
                        className="min-w-[820px]"
                        availableWidth={availableWidth}
                        loading={loading}
                        skeletonRows={5}
                    >
                        {(item) => (
                            <Table.Row id={getItemId(item)} columns={columns}>
                                {(column) => (
                                    <Table.Cell className={column.id === "actions" ? "whitespace-nowrap" : "whitespace-normal break-words"}>
                                        {column.id === "index" ? (
                                            <span className="text-sm text-tertiary">{indexById.get(getItemId(item)) ?? "—"}</span>
                                        ) : column.id === "title" ? (
                                            <span className="text-sm text-tertiary">{item.title || "—"}</span>
                                        ) : column.id === "additionalDetails" ? (
                                            <div className="flex flex-wrap gap-1.5">
                                                {item.customParams?.additionalDetails?.map((detail: any, idx: number) => (
                                                    <Badge key={idx} size="sm" color="gray">
                                                        {detail.value}
                                                    </Badge>
                                                ))}
                                            </div>
                                        ) : column.id === "additionalBookingDetails" ? (
                                            <div className="flex flex-wrap gap-1.5">
                                                {item.customParams?.additionalBookingDetails?.map((detail: any, idx: number) => (
                                                    <Badge key={idx} size="sm" color="gray">
                                                        {detail.value}
                                                    </Badge>
                                                ))}
                                            </div>
                                        ) : column.id === "status" ? (
                                            <Badge size="sm" color={item.status ? "success" : "error"}>
                                                {item.status ? "Active" : "Inactive"}
                                            </Badge>
                                        ) : (
                                            <div className="flex w-full items-center justify-end gap-1.5">
                                                <ButtonUtility
                                                    tooltip="View"
                                                    tooltipPlacement="bottom"
                                                    icon={Eye}
                                                    onClick={() => navigate(`/bookings/bookingtype/view/${getItemId(item)}`)}
                                                    color="secondary"
                                                    size="sm"
                                                />
                                                <ButtonUtility
                                                    tooltip="Edit"
                                                    tooltipPlacement="bottom"
                                                    icon={Edit01}
                                                    onClick={() => navigate(`/bookings/bookingtype/edit/${getItemId(item)}`)}
                                                    color="secondary"
                                                    size="sm"
                                                />
                                                <ButtonUtility
                                                    tooltip="Delete"
                                                    tooltipPlacement="bottom"
                                                    icon={Trash01}
                                                    onClick={() => {
                                                        setDeleteTarget(item);
                                                        setDeleteModalOpen(true);
                                                    }}
                                                    color="secondary"
                                                    size="sm"
                                                />
                                            </div>
                                        )}
                                    </Table.Cell>
                                )}
                            </Table.Row>
                        )}
                    </StickyTable>

                    <PaginationButtonGroup
                        page={page}
                        total={totalPages}
                        align="center"
                        onPageChange={(nextPage) => setPage(Math.min(totalPages, Math.max(1, nextPage)))}
                        className="py-4"
                    />
                </TableCard.Root>
            </div>

            <ModalOverlay isOpen={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
                <Modal>
                    <Dialog>
                        {({ close }) => (
                            <div className="relative w-full rounded-xl bg-primary p-5 ring-1 ring-secondary">
                                <CloseButton onPress={close} className="absolute right-4 top-4" size="sm" />
                                <div className="space-y-4">
                                    <div className="space-y-1">
                                        <h2 className="text-lg font-semibold text-primary">Delete Booking Type</h2>
                                        <p className="text-sm text-tertiary">
                                            Are you sure you want to delete "{deleteTarget?.title}"? This action cannot be undone.
                                        </p>
                                    </div>
                                    <div className="flex justify-end gap-3">
                                        <Button color="secondary" onClick={close}>
                                            Cancel
                                        </Button>
                                        <Button color="primary-destructive" onClick={handleDelete}>
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </Dialog>
                </Modal>
            </ModalOverlay>
        </DefaultLayout>
    );
}
