import { DefaultLayout } from "@/layouts/DefaultLayout";
import { PaginationButtonGroup } from "@/components/application/pagination/pagination";
import { StickyTable, Table, TableCard } from "@/components/application/table/table";
import { Badge, BadgeWithButton } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Input } from "@/components/base/input/input";
import { Select } from "@/components/base/select/select";
import { getVendor, getVendorDelete } from "@/utils/services/vendorService";
import { getbookingtype } from "@/utils/services/bookingTypeService";
import { useStoreSnackbar } from "@/store/snackbar";
import { SlideoutMenu } from "@/components/application/slideout-menus/slideout-menu";
import { Label } from "@/components/base/input/label";
import { FilterLines, Plus, Eye, Edit01, Trash01, RefreshCw01, SearchLg } from "@untitledui/icons";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import Tmodal from "@/components/utils/Tmodal";
import { useAvailableTableWidth } from "@/hooks/use-available-table-width";

const columns = [
    { id: "index", name: "S. No.", isRowHeader: true, widthRatio: 6, minWidth: 64 },
    { id: "title", name: "Vendor List", widthRatio: 18, minWidth: 180 },
    { id: "mobile", name: "Vendor Number", widthRatio: 14, minWidth: 140 },
    { id: "vendorLocation", name: "Vendor Location", widthRatio: 16, minWidth: 160 },
    { id: "vendorService", name: "Vendor Service", widthRatio: 22, minWidth: 200 },
    { id: "status", name: "Status", widthRatio: 12, minWidth: 120 },
    { id: "actions", name: "Actions", widthRatio: 12, minWidth: 140 },
];

export default function VendorListPage() {
    const availableWidth = useAvailableTableWidth();
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const { showSnackbar } = useStoreSnackbar();

    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState<any[]>([]);
    const [bookingTypes, setBookingTypes] = useState<any[]>([]);
    const [totalRecords, setTotalRecords] = useState(0);

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState<any>(null);

    const page = Number(searchParams.get("page") || "1");
    const limit = Number(searchParams.get("limit") || "10");
    const [filters, setFilters] = useState({
        title: searchParams.get("title") || "",
        mobile: searchParams.get("mobile") || "",
        vendorLocation: searchParams.get("vendorLocation") || "",
        status: searchParams.get("status") || "",
    });

    const [debouncedFilters, setDebouncedFilters] = useState(filters);
    const [tempFilters, setTempFilters] = useState(filters);

    const isFilterActive = Boolean(filters.title || filters.mobile || filters.vendorLocation || filters.status);

    const handleOpenFilters = () => {
        setTempFilters(filters);
    };

    const handleApplyFilters = (close: () => void) => {
        setFilters(tempFilters);
        close();
    };

    const handleResetTempFilters = (close?: () => void) => {
        const resetState = {
            title: "",
            mobile: "",
            vendorLocation: "",
            status: "",
        };
        setTempFilters(resetState);
        setFilters(resetState);
        setDebouncedFilters(resetState);
        if (close) close();
    };

    const handleRemoveFilter = (key: string) => {
        const resetState = { ...filters, [key]: "" };
        setFilters(resetState);
        setTempFilters(resetState);
        setDebouncedFilters(resetState);
    };

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedFilters(filters);
        }, 500);
        return () => clearTimeout(handler);
    }, [filters]);

    useEffect(() => {
        const params: Record<string, string> = {
            page: String(page),
            limit: String(limit),
            ...debouncedFilters,
        };
        Object.keys(params).forEach(key => {
            if (params[key] === "") delete params[key];
        });
        setSearchParams(params);
    }, [page, limit, debouncedFilters, setSearchParams]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const params: Record<string, any> = {
                totalCount: true,
                page,
                limit,
                select: "title,status,mobile,vendorLocation,bookingsType",
                ...debouncedFilters,
            };
            Object.keys(params).forEach(key => {
                if (params[key] === "" || params[key] === undefined || params[key] === null) delete params[key];
            });
            const response = await getVendor(params);
            if (response.error) {
                throw new Error(response.error);
            }
            setItems(response.data || []);
            setTotalRecords(response.totalCount || 0);
        } catch (error: any) {
            showSnackbar({
                title: "Error",
                description: error.message || "Failed to fetch vendors",
                color: "danger",
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [page, limit, debouncedFilters]);

    useEffect(() => {
        const run = async () => {
            try {
                const response = await getbookingtype({ limit: "all" });
                setBookingTypes(response?.data ?? response ?? []);
            } catch {
                setBookingTypes([]);
            }
        };
        run();
    }, []);

    const bookingTypeTitleMap = useMemo(() => {
        const map = new Map<string, string>();
        (Array.isArray(bookingTypes) ? bookingTypes : []).forEach((item: any) => {
            const id = String(item?.id ?? item?._id ?? "");
            const title = String(item?.title ?? item?.name ?? "").trim();
            if (id && title) map.set(id, title);
        });
        return map;
    }, [bookingTypes]);

    const normalizeServiceLabels = useMemo(() => {
        const map = bookingTypeTitleMap;
        const resolveEntry = (entry: any) => {
            if (!entry) return "";
            if (typeof entry === "string") {
                const trimmed = entry.trim();
                if (!trimmed) return "";
                return map.get(trimmed) || trimmed;
            }
            const nestedTitle = String(entry?.bookingType?.title ?? entry?.bookingType?.name ?? "").trim();
            if (nestedTitle) return nestedTitle;
            const directTitle = String(entry?.title ?? entry?.name ?? "").trim();
            if (directTitle) return directTitle;
            const id = String(entry?.id ?? entry?._id ?? "").trim();
            return id ? map.get(id) || id : "";
        };
        const resolveFromValue = (value: any) => {
            if (!value) return [];
            if (Array.isArray(value)) return value.map(resolveEntry).filter(Boolean);
            if (typeof value === "string") {
                return value
                    .split(",")
                    .map((part) => resolveEntry(part))
                    .filter(Boolean);
            }
            return [resolveEntry(value)].filter(Boolean);
        };
        return (item: any) => {
            const candidates = [
                item?.bookingsType,
                item?.bookingType,
                item?.bookingTypes,
                item?.vendorService,
                item?.vendorServices,
                item?.service,
                item?.services,
            ];
            const collected = candidates.flatMap(resolveFromValue).filter(Boolean);
            return Array.from(new Set(collected));
        };
    }, [bookingTypeTitleMap]);



    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", String(newPage));
        setSearchParams(params);
    };

    const handleLimitChange = (newLimit: string) => {
        const params = new URLSearchParams(searchParams);
        params.set("limit", newLimit);
        params.set("page", "1");
        setSearchParams(params);
    };

    const handleDelete = async () => {
        if (!deleteTarget) return;
        try {
            const response = await getVendorDelete(deleteTarget.id, {});
            if (response.error) {
                throw new Error(response.error);
            }
            showSnackbar({
                title: "Success",
                description: "Vendor deleted successfully",
                color: "success",
            });
            setDeleteModalOpen(false);
            fetchData();
        } catch (error: any) {
            showSnackbar({
                title: "Error",
                description: error.message || "Failed to delete vendor",
                color: "danger",
            });
        }
    };

    return (
        <DefaultLayout>
            <div className="space-y-4" style={{ width: availableWidth }}>
                <TableCard.Root>
                    <TableCard.Header
                        title="Vendor List"
                        badge={loading ? "..." : totalRecords}
                        contentTrailing={
                            <div className="flex flex-col gap-2 md:flex-row md:items-center">
                                <Select
                                    aria-label="Rows per page"
                                    className="w-full md:w-32"
                                    value={String(limit)}
                                    onChange={undefined}
                                    onSelectionChange={(key) => handleLimitChange(String(key))}
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
                                    onClick={() => navigate("/bookings/vendorlist/add")}
                                >
                                    Add Vendor
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
                                                    <SlideoutMenu.Header onClose={close}>
                                                        <div className="flex items-center gap-1">
                                                            <span className="text-lg font-bold text-primary">More Filters</span>
                                                        </div>
                                                    </SlideoutMenu.Header>
                                                    <div className="flex-1 overflow-y-auto p-6">
                                                        <div className="flex flex-col gap-4">
                                                        <Input
                                                            label="Mobile"
                                                            placeholder="Search by Mobile"
                                                            value={tempFilters.mobile}
                                                            onChange={(value) => setTempFilters((prev) => ({ ...prev, mobile: value }))}
                                                        />
                                                        <Input
                                                            label="Location"
                                                            placeholder="Search by Location"
                                                            value={tempFilters.vendorLocation}
                                                            onChange={(value) => setTempFilters((prev) => ({ ...prev, vendorLocation: value }))}
                                                        />
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
                                                            <Button
                                                                color="secondary"
                                                                className="flex-1 justify-center"
                                                                onClick={() => handleResetTempFilters(close)}
                                                            >
                                                                Reset
                                                            </Button>
                                                            <Button
                                                                color="primary"
                                                                className="flex-1 justify-center"
                                                                onClick={() => handleApplyFilters(close)}
                                                            >
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
                                    if (key === "mobile") label = "Mobile";
                                    if (key === "vendorLocation") label = "Location";
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

                    <StickyTable
                        ariaLabel="Vendor list"
                        columns={columns}
                        items={items}
                        availableWidth={availableWidth}
                        loading={loading}
                    >
                        {(item) => (
                            <Table.Row id={item.id || item._id}>
                                <Table.Cell className="whitespace-nowrap px-4 py-3">
                                    {(page - 1) * limit + items.indexOf(item) + 1}
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap px-4 py-3">{item.title}</Table.Cell>
                                <Table.Cell className="whitespace-nowrap px-4 py-3">{item.mobile}</Table.Cell>
                                <Table.Cell className="whitespace-nowrap px-4 py-3">{item.vendorLocation}</Table.Cell>
                                <Table.Cell className="whitespace-nowrap px-4 py-3">
                                    <div className="flex flex-wrap gap-1.5">
                                        {(() => {
                                            const labels = normalizeServiceLabels(item);
                                            if (labels.length > 0) {
                                                return labels.map((label: string, idx: number) => (
                                                    <Badge key={`${label}-${idx}`} size="sm" color="gray">
                                                        {label}
                                                    </Badge>
                                                ));
                                            }
                                            return "-";
                                        })()}
                                    </div>
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap px-4 py-3">
                                    <Badge size="sm" color={item.status ? "success" : "error"}>
                                        {item.status ? "Active" : "Inactive"}
                                    </Badge>
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap px-4 py-3">
                                    <div className="flex gap-2">
                                        <ButtonUtility
                                            icon={Eye}
                                            onClick={() => navigate(`/bookings/vendorlist/view/${item.id || item._id}`)}
                                            color="secondary"
                                            size="sm"
                                            tooltip="View"
                                        />
                                        <ButtonUtility
                                            icon={Edit01}
                                            onClick={() => navigate(`/bookings/vendorlist/edit/${item.id || item._id}`)}
                                            color="secondary"
                                            size="sm"
                                            tooltip="Edit"
                                        />
                                        <ButtonUtility
                                            icon={Trash01}
                                            onClick={() => {
                                                setDeleteTarget(item);
                                                setDeleteModalOpen(true);
                                            }}
                                            color="secondary"
                                            size="sm"
                                            tooltip="Delete"
                                        />
                                    </div>
                                </Table.Cell>
                            </Table.Row>
                        )}
                    </StickyTable>

                    <PaginationButtonGroup
                        page={page}
                        total={Math.ceil(totalRecords / limit)}
                        onPageChange={handlePageChange}
                        align="center"
                        className="py-4"
                    />
                </TableCard.Root>
            </div>

            <Tmodal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                header="Delete Vendor"
                content={
                    <p className="text-sm text-tertiary">
                        Are you sure you want to delete "{deleteTarget?.title}"? This action cannot be undone.
                    </p>
                }
                footerActions={
                    <Button color="primary-destructive" onClick={handleDelete}>
                        Delete
                    </Button>
                }
            />
        </DefaultLayout>
    );
}
