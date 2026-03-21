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
        tourDate: searchParams.get("tourDate") || "",
        travelLocation: searchParams.get("travelLocation") || "",
        agentName: searchParams.get("agentName") || "",
        packageCost: searchParams.get("packageCost") || "",
        finalPackageCost: searchParams.get("finalPackageCost") || "",
    });

    const [debouncedFilters, setDebouncedFilters] = useState(filters);
    const [tempFilters, setTempFilters] = useState(filters);
    const isFilterActive = Boolean(
        filters.status ||
        filters.packageId ||
        filters.clientDetails ||
        filters.bookingDate ||
        filters.tourDate ||
        filters.travelLocation ||
        filters.agentName ||
        filters.packageCost ||
        filters.finalPackageCost
    );
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
            tourDate: "",
            travelLocation: "",
            agentName: "",
            packageCost: "",
            finalPackageCost: "",
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
                    sortField: 'bookingDate',
                    sortOrder: 'DESC',
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
                    description: error.message || "Failed to fetch payments",
                    color: "danger",
                });
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [page, limit, debouncedFilters]);

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
                                if (!value) return null;
                                let label = key;
                                if (key === "packageId") label = "Package ID";
                                if (key === "clientDetails") label = "Client Details";
                                if (key === "agentName") label = "Agent Name";
                                if (key === "bookingDate") label = "Booking Date";
                                if (key === "tourDate") label = "Travel Date";
                                if (key === "travelLocation") label = "Travel Location";
                                if (key === "packageCost") label = "Package Cost";
                                if (key === "finalPackageCost") label = "Final Package Cost";
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
                                                    {item.tourDate ? formatShortDate(item.tourDate) : "-"}<br />
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
