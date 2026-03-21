import { DefaultLayout } from "@/layouts/DefaultLayout";
import { PaginationButtonGroup } from "@/components/application/pagination/pagination";
import { StickyTable, Table, TableCard } from "@/components/application/table/table";
import { Badge, BadgeWithButton } from "@/components/base/badges/badges";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Select } from "@/components/base/select/select";
import { Label } from "@/components/base/input/label";
import { getAssignment } from "@/utils/services/assignmentService";
import { useStoreSnackbar } from "@/store/snackbar";
import { Eye, RefreshCw01, FilterLines, SearchLg } from "@untitledui/icons";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { useAvailableTableWidth } from "@/hooks/use-available-table-width";
import { SlideoutMenu } from "@/components/application/slideout-menus/slideout-menu";
import { formatCurrencyInr, formatShortDate } from "@/utils/formatters";


const columns = [
    { id: "index", name: "#", isRowHeader: true, widthRatio: 3, minWidth: 70 },
    { id: "packageId", name: "Package ID", widthRatio: 5, minWidth: 150 },
    { id: "agentName", name: "Agent Name", widthRatio: 6, minWidth: 120 },
    { id: "clientDetails", name: "Client Details", widthRatio: 20, minWidth: 200 },
    { id: "bookingDate", name: "Travel/Booking Date", widthRatio: 9, minWidth: 140 },
    { id: "travelLocation", name: "Travel Location", widthRatio: 13, minWidth: 180 },
    { id: "packageCost", name: "Package / Final Cost", widthRatio: 10, minWidth: 130 },
    { id: "verify", name: "Verify", widthRatio: 5, minWidth: 100 },
    { id: "status", name: "Status", widthRatio: 5, minWidth: 100 },
    { id: "bookingStatus", name: "Booking Payment Finished", widthRatio: 8, minWidth: 140 },
    { id: "actions", name: "Actions", widthRatio: 6, minWidth: 100, className: "pr-4 pl-4" },
];
const parseSearch = (search: string) => {
    const sp = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
    const page = Math.max(1, Number(sp.get("page") || 1) || 1);
    const limit = Math.min(100, Math.max(10, Number(sp.get("limit") || 10) || 10));
    return {
        page,
        limit,
        packageId: sp.get("packageId") || "",
        agentName: sp.get("agentName") || "",
        clientDetails: sp.get("clientDetails") || "",
        bookingDate: sp.get("bookingDate") || "",
        tourDate: sp.get("tourDate") || "",
        travelLocation: sp.get("travelLocation") || "",
        packageCost: sp.get("packageCost") || "",
        finalPackageCost: sp.get("finalPackageCost") || "",
        bookingStatus: sp.get("bookingStatus") || "",
        verify: sp.get("verify") || "",
        paymentStatus: sp.get("paymentStatus") || "",
        finished: sp.get("finished") || "",
        status: sp.get("status") || "",
    };
};

export default function AssignmentPage() {
    const availableWidth = useAvailableTableWidth();
    const navigate = useNavigate();
    const { pathname, search } = useLocation();
    const { showSnackbar } = useStoreSnackbar();

    const initial = parseSearch(search);

    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState<any[]>([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const indexById = useMemo(
        () => new Map(items.map((item, index) => [item.id || item._id, index + 1])),
        [items]
    );

    const [page, setPage] = useState(initial.page);
    const [limit, setLimit] = useState(initial.limit);
    const [filters, setFilters] = useState({
        packageId: initial.packageId,
        agentName: initial.agentName,
        clientDetails: initial.clientDetails,
        bookingDate: initial.bookingDate,
        tourDate: initial.tourDate,
        travelLocation: initial.travelLocation,
        packageCost: initial.packageCost,
        finalPackageCost: initial.finalPackageCost,
        bookingStatus: initial.bookingStatus,
        verify: initial.verify,
        paymentStatus: initial.paymentStatus,
        finished: initial.finished,
        status: initial.status,
    });

    const [debouncedFilters, setDebouncedFilters] = useState(filters);
    const [tempFilters, setTempFilters] = useState(filters);

    const isFilterActive = Object.values(filters).some(Boolean);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedFilters(filters);
            setPage(1);
        }, 500);
        return () => clearTimeout(handler);
    }, [filters]);

    const handleApplyFilters = (close: () => void) => {
        setFilters(tempFilters);
        close();
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
        const sp = new URLSearchParams();
        Object.entries(debouncedFilters).forEach(([key, value]) => {
            if (value) sp.set(key, value);
        });
        sp.set("page", String(page));
        sp.set("limit", String(limit));
        const next = sp.toString();
        const current = search.startsWith("?") ? search.slice(1) : search;
        if (next === current) return;
        navigate(next ? `${pathname}?${next}` : pathname, { replace: true });
    }, [debouncedFilters, limit, navigate, page, pathname, search]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const params: Record<string, any> = {
                    totalCount: true,
                    page,
                    limit,
                    populate: "agentName",
                    sortField: 'bookingDate',
                    sortOrder: 'DESC',
                    select: "createdAt,id,clientName,mobile,email,title,status,bookingDate,packageId,agentName,tourDate,travelLocation,packageCost,finalPackageCost,paymentReceived,verify,bookingStatus,paymentStatus,finished",
                    ...debouncedFilters,
                };
                Object.keys(params).forEach(key => {
                    if (params[key] === "" || params[key] === undefined || params[key] === null) delete params[key];
                });
                const response = await getAssignment(params);
                if (response.error) {
                    throw new Error(response.error);
                }
                setItems(response.data || []);
                setTotalRecords(response.totalCount || 0);
            } catch (error: any) {
                showSnackbar({
                    title: "Error",
                    description: error.message || "Failed to fetch assignments",
                    color: "danger",
                });
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [page, limit, debouncedFilters]);
    const normalizeBoolean = (value: unknown) => {
        if (value === true || value === "true" || value === 1 || value === "1") return true;
        if (value === false || value === "false" || value === 0 || value === "0") return false;
        return null;
    };


    const handleResetTempFilters = (close?: () => void) => {
        const resetState = {
            packageId: "",
            agentName: "",
            clientDetails: "",
            bookingDate: "",
            tourDate: "",
            travelLocation: "",
            packageCost: "",
            finalPackageCost: "",
            bookingStatus: "",
            verify: "",
            paymentStatus: "",
            finished: "",
            status: "",
        };
        setTempFilters(resetState);
        setFilters(resetState);
        setDebouncedFilters(resetState);
        setPage(1);
        navigate(pathname, { replace: true });
        if (close) close();
    };

    return (
        <DefaultLayout>
            <div className="w-full" style={{ width: availableWidth }}>
                <TableCard.Root className="w-full">
                    <TableCard.Header
                        title="Assignment List"
                        badge={loading ? "..." : totalRecords}
                        contentTrailing={
                            <div className="flex flex-col gap-2 md:flex-row md:items-center">
                                <Select
                                    aria-label="Rows per page"
                                    className="w-full md:w-32"
                                    selectedKey={String(limit)}
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
                            </div>
                        }
                    />

                    <div className="flex flex-col gap-4 border-b border-secondary bg-primary px-4 py-4 md:px-6">
                        <div className="flex flex-col gap-3 md:flex-row md:items-center justify-between">
                            <Input
                                placeholder="Search by customer details"
                                value={tempFilters.clientDetails}
                                onChange={(value) => {
                                    setFilters((prev) => ({ ...prev, clientDetails: value }));
                                    setTempFilters((prev) => ({ ...prev, clientDetails: value }));
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
                                            <>
                                                <SlideoutMenu.Header onClose={close}>
                                                    <div className="text-lg text-primary font-bold">Filters</div>
                                                </SlideoutMenu.Header>
                                                <SlideoutMenu.Content>
                                                    <div className="flex flex-col gap-4">
                                                        <Input
                                                            label="Package ID"
                                                            placeholder="Search by Package ID"
                                                            value={tempFilters.packageId}
                                                            onChange={(value) => setTempFilters((prev) => ({ ...prev, packageId: value }))}
                                                        />
                                                        <Input
                                                            label="Agent Name"
                                                            placeholder="Search by Agent Name"
                                                            value={tempFilters.agentName}
                                                            onChange={(value) => setTempFilters((prev) => ({ ...prev, agentName: value }))}
                                                        />
                                                        <Input
                                                            label="Travel Location"
                                                            placeholder="Search by Location"
                                                            value={tempFilters.travelLocation}
                                                            onChange={(value) => setTempFilters((prev) => ({ ...prev, travelLocation: value }))}
                                                        />

                                                        <div className="flex flex-col gap-1.5">
                                                            <Label>Status</Label>
                                                            <Select
                                                                aria-label="Status"
                                                                selectedKey={tempFilters.status || "__all__"}
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

                                                        <div className="flex flex-col gap-1.5">
                                                            <Label>Booking Status</Label>
                                                            <Select
                                                                aria-label="Booking Status"
                                                                selectedKey={tempFilters.bookingStatus || ""}
                                                                onChange={undefined}
                                                                onSelectionChange={(key) => setTempFilters((prev) => ({ ...prev, bookingStatus: key === "" ? "" : String(key) }))}
                                                                items={[
                                                                    { id: "", label: "All Booking Status" },
                                                                    { id: "true", label: "Booked" },
                                                                    { id: "false", label: "Not Booked" },
                                                                ]}
                                                            >
                                                                {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                                            </Select>
                                                        </div>

                                                        <div className="flex flex-col gap-1.5">
                                                            <Label>Payment Status</Label>
                                                            <Select
                                                                aria-label="Payment Status"
                                                                selectedKey={tempFilters.paymentStatus || ""}
                                                                onChange={undefined}
                                                                onSelectionChange={(key) => setTempFilters((prev) => ({ ...prev, paymentStatus: key === "" ? "" : String(key) }))}
                                                                items={[
                                                                    { id: "", label: "All Payment Status" },
                                                                    { id: "true", label: "Paid" },
                                                                    { id: "false", label: "Not Paid" },
                                                                ]}
                                                            >
                                                                {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                                            </Select>
                                                        </div>

                                                        <div className="flex flex-col gap-1.5">
                                                            <Label>Verification Status</Label>
                                                            <Select
                                                                aria-label="Verification Status"
                                                                selectedKey={tempFilters.verify || ""}
                                                                onChange={undefined}
                                                                onSelectionChange={(key) => setTempFilters((prev) => ({ ...prev, verify: key === "" ? "" : String(key) }))}
                                                                items={[
                                                                    { id: "", label: "All Verification Status" },
                                                                    { id: "true", label: "Verified" },
                                                                    { id: "false", label: "Unverified" },
                                                                ]}
                                                            >
                                                                {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                                            </Select>
                                                        </div>

                                                        <div className="flex flex-col gap-1.5">
                                                            <Label>Finished Status</Label>
                                                            <Select
                                                                aria-label="Finished Status"
                                                                selectedKey={tempFilters.finished || ""}
                                                                onChange={undefined}
                                                                onSelectionChange={(key) => setTempFilters((prev) => ({ ...prev, finished: key === "" ? "" : String(key) }))}
                                                                items={[
                                                                    { id: "", label: "All Finished Status" },
                                                                    { id: "true", label: "Finished" },
                                                                    { id: "false", label: "Not Finished" },
                                                                ]}
                                                            >
                                                                {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                                            </Select>
                                                        </div>
                                                    </div>
                                                </SlideoutMenu.Content>
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
                                            </>
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

                                // Format label and value for better display
                                if (key === "packageId") label = "Package ID";
                                if (key === "clientDetails") label = "Client";
                                if (key === "agentName") label = "Agent";
                                if (key === "bookingDate") label = "Booking Date";
                                if (key === "tourDate") label = "Travel Date";
                                if (key === "travelLocation") label = "Location";
                                if (key === "packageCost") label = "Package Cost";
                                if (key === "finalPackageCost") label = "Final Package Cost";
                                if (key === "status") {
                                    label = "Status";
                                    displayValue = value === "true" ? "Active" : "Inactive";
                                }
                                if (key === "bookingStatus") {
                                    label = "Booking";
                                    displayValue = value === "true" ? "Booked" : "Not Booked";
                                }
                                if (key === "paymentStatus") {
                                    label = "Payment";
                                    displayValue = value === "true" ? "Paid" : "Not Paid";
                                }
                                if (key === "verify") {
                                    label = "Verified";
                                    displayValue = value === "true" ? "Yes" : "No";
                                }
                                if (key === "finished") {
                                    label = "Finished";
                                    displayValue = value === "true" ? "Yes" : "No";
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

                    <StickyTable
                        ariaLabel="Assignment list"
                        columns={columns}
                        items={items}
                        availableWidth={availableWidth}
                        loading={loading}
                    >
                        {(item) => (
                            <Table.Row id={item.id || item._id} columns={columns}>
                                {(column) => (
                                    <Table.Cell className={column.id === "actions" ? "whitespace-nowrap" : "whitespace-normal break-words"}>
                                        {column.id === "index" ? (
                                            <span className="text-sm text-tertiary">
                                                {(page - 1) * limit + (indexById.get(item.id || item._id) ?? 1)}
                                            </span>
                                        ) : column.id === "packageId" ? (
                                            <span className="text-sm text-tertiary">{item.packageId || "-"}</span>
                                        ) : column.id === "agentName" ? (
                                            <span className="text-sm text-tertiary">{item.agentName?.name || item.agentName || "-"}</span>
                                        ) : column.id === "clientDetails" ? (
                                            <span className="text-sm whitespace-pre-line text-tertiary">
                                                {[item?.clientName || "-", item?.mobile || "", item?.email || ""].filter(Boolean).join("\n")}
                                            </span>
                                        ) : column.id === "bookingDate" ? (
                                            <span className="text-sm text-tertiary">
                                                {item.tourDate ? formatShortDate(item.tourDate) : "-"}<br />
                                                {item.bookingDate ? formatShortDate(item.bookingDate) : "-"}
                                            </span>
                                        ) : column.id === "travelLocation" ? (
                                            <span className="text-sm text-tertiary">{item.travelLocation || "-"}</span>
                                        ) : column.id === "packageCost" ? (
                                            <>
                                                <span className="text-sm">{formatCurrencyInr(item.packageCost)}</span> <br />
                                                <span className="text-xs text-gray-500">{formatCurrencyInr(item.finalPackageCost)}</span> <br />
                                            </>
                                        ) : column.id === "verify" ? (
                                            <Badge size="sm" color={item.verify ? "success" : "error"}>
                                                {item.verify ? "Verified" : "Unverified"}
                                            </Badge>
                                        ) : column.id === "status" ? (
                                            <Badge size="sm" color={item.status ? "success" : "error"}>
                                                {item.status ? "Active" : "Inactive"}
                                            </Badge>
                                        ) : column.id === "bookingStatus" ? (
                                            <>
                                                <Badge size="sm" color={normalizeBoolean(item.bookingStatus) ? "success" : "error"}>
                                                    {normalizeBoolean(item.bookingStatus) ? "Booked" : "Not Booked"}
                                                </Badge>
                                                <Badge size="sm" color={normalizeBoolean(item.paymentStatus) ? "success" : "error"}>
                                                    {normalizeBoolean(item.paymentStatus) ? "Done" : "Pending"}
                                                </Badge>
                                                <Badge size="sm" color={normalizeBoolean(item.finished) ? "success" : "error"}>
                                                    {normalizeBoolean(item.finished) ? "Finished" : "Pending"}
                                                </Badge>
                                            </>
                                        ) : (
                                            <div className="flex w-full items-center justify-end gap-1.5">
                                                <ButtonUtility
                                                    icon={Eye}
                                                    onClick={() => navigate(`/bookings/assignment/view/${item.id || item._id}`)}
                                                    color="secondary"
                                                    size="sm"
                                                    tooltip="View"
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
                        total={Math.ceil(totalRecords / limit)}
                        onPageChange={setPage}
                        align="center"
                        className="py-4"
                    />
                </TableCard.Root>
            </div>
        </DefaultLayout>
    );
}
