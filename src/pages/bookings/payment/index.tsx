import { DefaultLayout } from "@/layouts/DefaultLayout";
import { PaginationButtonGroup } from "@/components/application/pagination/pagination";
import { StickyTable, Table, TableCard } from "@/components/application/table/table";
import { Badge, BadgeWithButton } from "@/components/base/badges/badges";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Button } from "@/components/base/buttons/button";
import { CloseButton } from "@/components/base/buttons/close-button";
import { ModalOverlay, Modal, Dialog } from "@/components/application/modals/modal";
import MailConfirmation from "@/components/application/mail-confirmation/mail-confirmation";
import { Input } from "@/components/base/input/input";
import { Select } from "@/components/base/select/select";
import { Label } from "@/components/base/input/label";
import { getAssignment } from "@/utils/services/assignmentService";
import { useStoreSnackbar } from "@/store/snackbar";
import { Eye, FilterLines, RefreshCw01, SearchLg, Mail01 } from "@untitledui/icons";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { SlideoutMenu } from "@/components/application/slideout-menus/slideout-menu";
import { useAvailableTableWidth } from "@/hooks/use-available-table-width";
import { formatCurrencyInr, formatShortDate, calculatePendingAmount } from "@/utils/formatters";


const columns = [

    { id: "index", name: "#", isRowHeader: true, widthRatio: 4, minWidth: 70 },
    { id: "packageId", name: "Package ID", widthRatio: 7, minWidth: 160 }, //11
    { id: "clientDetails", name: "Customer Details", widthRatio: 21, minWidth: 200 }, //29
    { id: "agentName", name: "Agent", widthRatio: 6, minWidth: 150 }, //37
    { id: "bookingDate", name: "Travel/Booking Date", widthRatio: 11, minWidth: 120 }, //43
    { id: "travelLocation", name: "Travel Location", widthRatio: 14, minWidth: 200 }, //57
    { id: "packageCost", name: "Package/Final Cost", widthRatio: 12, minWidth: 120 }, //69
    { id: "paymentReceived", name: "Received", widthRatio: 6, minWidth: 120 }, //81
    { id: "pendingAmount", name: "Pending Amount", widthRatio: 6, minWidth: 120 }, //87
    { id: "status", name: "Status", widthRatio: 6, minWidth: 100 }, //93
    { id: "actions", name: "Actions", widthRatio: 7, minWidth: 100, className: "pr-4 pl-4" }, //100 
] as { id: string; name: string; className?: string; widthRatio?: number; minWidth?: number; isRowHeader?: boolean }[];

export default function PaymentPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const { showSnackbar } = useStoreSnackbar();
    const availableWidth = useAvailableTableWidth();

    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState<any[]>([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedId, setSelectedId] = useState("");
    const [selectedEmail, setSelectedEmail] = useState("");

    const page = Number(searchParams.get("page") || "1");
    const limit = Number(searchParams.get("limit") || "10");
    const [filters, setFilters] = useState({
        status: searchParams.get("status") || "",
        packageId: searchParams.get("packageId") || "",
        clientDetails: searchParams.get("clientDetails") || "",
        bookingDate: searchParams.get("bookingDate") || "",
        bookingDateMode: searchParams.get("bookingDateMode") || "",
        bookingDateFrom: searchParams.get("bookingDateFrom") || searchParams.get("bookingDate") || "",
        bookingDateTo: searchParams.get("bookingDateTo") || "",
        tourDate: searchParams.get("tourDate") || "",
        tourDateMode: searchParams.get("tourDateMode") || "",
        tourDateFrom: searchParams.get("tourDateFrom") || searchParams.get("tourDate") || "",
        tourDateTo: searchParams.get("tourDateTo") || "",
        travelLocation: searchParams.get("travelLocation") || "",
        agentName: searchParams.get("agentName") || "",
        packageCost: searchParams.get("packageCost") || "",
        finalPackageCost: searchParams.get("finalPackageCost") || "",
        finished: searchParams.get("finished") || "false",
        dateNotDecided: searchParams.get("dateNotDecided") || "false",
        sortField: searchParams.get("sortField") || "tourDate",
        sortOrder: (searchParams.get("sortOrder") || "ASC").toUpperCase(),
    });

    const [debouncedFilters, setDebouncedFilters] = useState(filters);
    const [tempFilters, setTempFilters] = useState(filters);
    const isFilterActive = Object.entries(filters).some(([key, value]) => {
        if (key === "sortField" || key === "sortOrder") return false;
        return Boolean(value);
    });
    
    const setQuickFilters = (patch: Record<string, any>) => {
        setFilters((prev) => ({ ...prev, ...patch }));
        setTempFilters((prev) => ({ ...prev, ...patch }));
    };

    const indexById = useMemo(
        () => new Map(items.map((item, index) => [item.id || item._id, index + 1])),
        [items]
    );

    const handleApplyFilters = (close: () => void) => {
        setFilters(tempFilters);
        close();
    };

    const handleResetTempFilters = (close?: () => void) => {
        const resetState = {
            status: "",
            packageId: "",
            clientDetails: "",
            bookingDate: "",
            bookingDateMode: "",
            bookingDateFrom: "",
            bookingDateTo: "",
            tourDate: "",
            tourDateMode: "",
            tourDateFrom: "",
            tourDateTo: "",
            travelLocation: "",
            agentName: "",
            packageCost: "",
            finalPackageCost: "",
            finished: "false",
            dateNotDecided: "false",
            sortField: "tourDate",
            sortOrder: "ASC",
        };
        setTempFilters(resetState);
        setFilters(resetState);
        setDebouncedFilters(resetState);
        if (close) close();
    };

    const handleRemoveFilter = (key: string) => {
        if (key === "bookingDate") {
            const resetState = { ...filters, bookingDateMode: "", bookingDateFrom: "", bookingDateTo: "" };
            setFilters(resetState);
            setTempFilters(resetState);
            setDebouncedFilters(resetState);
            return;
        }
        if (key === "tourDate") {
            const resetState = { ...filters, tourDateMode: "", tourDateFrom: "", tourDateTo: "" };
            setFilters(resetState);
            setTempFilters(resetState);
            setDebouncedFilters(resetState);
            return;
        }
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

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const params: Record<string, any> = {
                    totalCount: true,
                    page,
                    limit,
                    populate: "agentName",
                    verify: "true",
                    ...debouncedFilters,
                    sortField: debouncedFilters.sortField || "tourDate",
                    sortOrder: debouncedFilters.sortOrder || "ASC",
                    tzOffsetMinutes: new Date().getTimezoneOffset(),
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
                    description: error.message || "Failed to fetch payments",
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
    return (
        <DefaultLayout>
            <div className="w-full" style={{ width: availableWidth }}>
                <TableCard.Root className="w-full">
                    <TableCard.Header
                        title="Payment List"
                        badge={loading ? "..." : totalRecords}
                        contentTrailing={
                            <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center">
                                <Select
                                    aria-label="Sort by"
                                    className="w-full md:w-40"
                                    selectedKey={filters.sortField}
                                    onSelectionChange={(key) => setQuickFilters({ sortField: String(key) })}
                                    items={[
                                        { id: "tourDate", label: "Tour Date" },
                                        { id: "bookingDate", label: "Booking Date" },
                                        { id: "createdAt", label: "Created At" },
                                    ]}
                                >
                                    {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                </Select>
                                <Select
                                    aria-label="Sort order"
                                    className="w-full md:w-32"
                                    selectedKey={filters.sortOrder}
                                    onSelectionChange={(key) => setQuickFilters({ sortOrder: String(key).toUpperCase() })}
                                    items={[
                                        { id: "ASC", label: "Ascending" },
                                        { id: "DESC", label: "Descending" },
                                    ]}
                                >
                                    {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                </Select>
                                <Select
                                    aria-label="Rows per page"
                                    className="w-full md:w-32"
                                    selectedKey={String(limit)}
                                    onSelectionChange={(key) => handleLimitChange(String(key))}
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
                            <div className="flex flex-col gap-3 md:flex-row md:items-end w-full">
                                <Input
                                    placeholder="Search by customer details"
                                    value={tempFilters.clientDetails}
                                    onChange={(value) => {
                                        setQuickFilters({ clientDetails: value });
                                    }}
                                    icon={SearchLg}
                                    className="w-full md:w-80"
                                />
                                <div className="flex flex-col gap-1.5 w-full md:w-auto">
                                    <Label>Travel Date</Label>
                                    <div className="flex flex-col gap-2 md:flex-row md:items-center">
                                        <Select
                                            aria-label="Travel Date Mode"
                                            className="w-full md:w-40"
                                            selectedKey={tempFilters.tourDateMode || ""}
                                            onSelectionChange={(key) =>
                                                setQuickFilters({
                                                    tourDateMode: String(key),
                                                    tourDateFrom: "",
                                                    tourDateTo: "",
                                                })
                                            }
                                            items={[
                                                { id: "", label: "Fixed date" },
                                                { id: "range", label: "Date range" },
                                                { id: "before", label: "Before" },
                                                { id: "after", label: "After" },
                                            ]}
                                        >
                                            {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                        </Select>
                                        {String(tempFilters.tourDateMode || "") === "range" ? (
                                            <div className="flex gap-2 w-full md:w-auto">
                                                <Input
                                                    aria-label="Travel Date From"
                                                    type="date"
                                                    value={tempFilters.tourDateFrom}
                                                    onChange={(value) => setQuickFilters({ tourDateFrom: value })}
                                                    className="w-full md:w-44"
                                                />
                                                <Input
                                                    aria-label="Travel Date To"
                                                    type="date"
                                                    value={tempFilters.tourDateTo}
                                                    onChange={(value) => setQuickFilters({ tourDateTo: value })}
                                                    className="w-full md:w-44"
                                                />
                                            </div>
                                        ) : (
                                            <Input
                                                aria-label="Travel Date"
                                                type="date"
                                                value={tempFilters.tourDateFrom}
                                                onChange={(value) => setQuickFilters({ tourDateFrom: value })}
                                                className="w-full md:w-44"
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <SlideoutMenu.Trigger>
                                    <Button color="primary" iconLeading={FilterLines} onClick={handleOpenFilters}>
                                        More filters
                                    </Button>
                                    <SlideoutMenu isDismissable>
                                        {({ close }) => (
                                            <>
                                                <SlideoutMenu.Header onClose={close}>Filters</SlideoutMenu.Header>
                                                <SlideoutMenu.Content>
                                                    <div className="flex flex-col gap-4">
                                                        <Input
                                                            label="Package ID"
                                                            placeholder="Package ID"
                                                            value={tempFilters.packageId}
                                                            onChange={(value) => setTempFilters((prev) => ({ ...prev, packageId: value }))}
                                                        />
                                                        <Input
                                                            label="Agent Name"
                                                            placeholder="Agent Name"
                                                            value={tempFilters.agentName}
                                                            onChange={(value) => setTempFilters((prev) => ({ ...prev, agentName: value }))}
                                                        />
                                                        <div className="flex flex-col gap-1.5">
                                                            <Label>Status</Label>
                                                            <Select
                                                                aria-label="Status"
                                                                selectedKey={tempFilters.status || "__all__"}
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
                                                        <div className="flex flex-col gap-1.5">
                                                            <Label>Not Decided</Label>
                                                            <Select
                                                                aria-label="Not Decided"
                                                                selectedKey={tempFilters.dateNotDecided || ""}
                                                                onChange={undefined}
                                                                onSelectionChange={(key) => setTempFilters((prev) => ({ ...prev, dateNotDecided: key === "" ? "" : String(key) }))}
                                                                items={[
                                                                    { id: "", label: "All" },
                                                                    { id: "true", label: "Yes" },
                                                                    { id: "false", label: "No" },
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
                                if (
                                    !value ||
                                    value === "__all__" ||
                                    key === "sortField" ||
                                    key === "sortOrder" ||
                                    key === "bookingDateMode" ||
                                    key === "bookingDateFrom" ||
                                    key === "bookingDateTo" ||
                                    key === "tourDateMode" ||
                                    key === "tourDateFrom" ||
                                    key === "tourDateTo"
                                )
                                    return null;
                                let label = key;
                                let displayValue = value;

                                // Format label and value for better display
                                if (key === "packageId") label = "Package ID";
                                if (key === "clientDetails") label = "Client Details";
                                if (key === "agentName") label = "Agent Name";
                                if (key === "bookingDate") label = "Booking Date";
                                if (key === "tourDate") label = "Travel Date";
                                if (key === "travelLocation") label = "Travel Location";
                                if (key === "packageCost") label = "Package Cost";
                                if (key === "finalPackageCost") label = "Final Package Cost";
                                if (key === "status") {
                                    label = "Status";
                                    displayValue = value === "true" ? "Active" : "Inactive";
                                }
                                if (key === "finished") {
                                    label = "Finished";
                                    displayValue = value === "true" ? "Yes" : "No";
                                }
                                if (key === "dateNotDecided") {
                                    label = "Date Not Decided";
                                    displayValue = value === "true" ? "Yes" : "No";
                                }

                                return (
                                    <BadgeWithButton key={key} onButtonClick={() => handleRemoveFilter(key)}>
                                        <span className="font-medium text-gray-500 mr-1">{label}:</span>
                                        <span className="font-semibold text-brand-700">{displayValue}</span>
                                    </BadgeWithButton>
                                );
                            })}
                            {filters.bookingDateMode || filters.bookingDateFrom || filters.bookingDateTo ? (
                                <BadgeWithButton onButtonClick={() => handleRemoveFilter("bookingDate")}>
                                    <span className="font-medium text-gray-500 mr-1">Booking Date:</span>
                                    <span className="font-semibold text-brand-700">
                                        {filters.bookingDateMode === "range"
                                            ? `${filters.bookingDateFrom} to ${filters.bookingDateTo}`
                                            : filters.bookingDateMode === "before"
                                              ? `Before ${filters.bookingDateFrom}`
                                              : filters.bookingDateMode === "after"
                                                ? `After ${filters.bookingDateFrom}`
                                                : filters.bookingDateFrom}
                                    </span>
                                </BadgeWithButton>
                            ) : null}
                            {filters.tourDateMode || filters.tourDateFrom || filters.tourDateTo ? (
                                <BadgeWithButton onButtonClick={() => handleRemoveFilter("tourDate")}>
                                    <span className="font-medium text-gray-500 mr-1">Travel Date:</span>
                                    <span className="font-semibold text-brand-700">
                                        {filters.tourDateMode === "range"
                                            ? `${filters.tourDateFrom} to ${filters.tourDateTo}`
                                            : filters.tourDateMode === "before"
                                              ? `Before ${filters.tourDateFrom}`
                                              : filters.tourDateMode === "after"
                                                ? `After ${filters.tourDateFrom}`
                                                : filters.tourDateFrom}
                                    </span>
                                </BadgeWithButton>
                            ) : null}
                        </div>
                    </div>

                    <div className="w-full max-w-full">
                        <StickyTable
                            ariaLabel="Payment list"
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
                                            ) : column.id === "clientDetails" ? (
                                                <span className="text-sm whitespace-pre-line text-tertiary">
                                                    {[item?.clientName || "-", item?.mobile || "", item?.email || ""].filter(Boolean).join("\n")}
                                                </span>
                                            ) : column.id === "agentName" ? (
                                                <span className="text-sm text-tertiary uppercase">{item.agentName?.username || item.agentName?.name || item.agentName || "-"}</span>
                                            ) : column.id === "bookingDate" ? (
                                                <span className="text-sm text-tertiary">
                                                    {item.tourDate ? (
                                                        <div className="flex items-center gap-1.5">
                                                            {formatShortDate(item.tourDate)}
                                                            {normalizeBoolean(item.dateNotDecided) && (
                                                                <span className="inline-flex items-center rounded-md bg-red-600 px-1.5 py-0.5 text-[10px] font-semibold text-white shadow-sm ring-1 ring-inset ring-red-600/20">
                                                                    TBD
                                                                </span>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        "-"
                                                    )}
                                                    <br />
                                                    {item.bookingDate ? formatShortDate(item.bookingDate) : "-"}
                                                </span>
                                            ) : column.id === "travelLocation" ? (
                                                <span className="text-sm text-tertiary">{item.travelLocation || "-"}</span>
                                            ) : column.id === "packageCost" ? (
                                                <span className="text-sm text-tertiary">
                                                    <>
                                                        <span className="text-sm">{formatCurrencyInr(item.packageCost)}</span> <br />
                                                        <span className="text-xs text-gray-500">{formatCurrencyInr(item.finalPackageCost)}</span> <br />
                                                    </>
                                                </span>

                                            ) : column.id === "paymentReceived" ? (
                                                <span className="text-sm text-tertiary">{formatCurrencyInr(item.paymentReceived) ?? "-"}</span>
                                            ) : column.id === "pendingAmount" ? (
                                                <span className="text-sm text-tertiary">{calculatePendingAmount(item.finalPackageCost, item.paymentReceived) ?? "-"}</span>
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
                                                        onClick={() => navigate(`/bookings/payment/view/${item.id || item._id}`)}
                                                        color="secondary"
                                                        size="sm"
                                                    />
                                                    <ButtonUtility
                                                        icon={Mail01}
                                                        tooltip="Send Payment Reminder Mail"
                                                        color="brand"
                                                        onClick={() => {
                                                            setSelectedId(item.id || item._id);
                                                            setSelectedEmail(item.email || "");
                                                            setIsOpen(true);
                                                        }}
                                                    />
                                                </div>
                                            )}
                                        </Table.Cell>
                                    )}
                                </Table.Row>
                            )}
                        </StickyTable>
                    </div>

                    <PaginationButtonGroup
                        page={page}
                        total={Math.ceil(totalRecords / limit)}
                        onPageChange={handlePageChange}
                        align="center"
                        className="py-4"
                    />
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
                                    header="Send Payment Reminder Mail"
                                    modalClose={() => setIsOpen(false)}
                                    sendMailFnName="sendPaymentReminderMail"
                                    showPreview={true}
                                    mailAddData={[
                                        { dueDate: "", type: "datetime-local", required: true },
                                        { amount: "", type: "number", required: true },
                                    ]}
                                />
                            </div>
                        </Dialog>
                    </Modal>
                )}
            </ModalOverlay>
        </DefaultLayout>
    );
}
