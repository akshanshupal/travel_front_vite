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
import { Checkbox } from "@/components/base/checkbox/checkbox";
import Tmodal from "@/components/utils/Tmodal";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import {
    addAdjustment,
    bookingStatusAssignment,
    finishedAssignment,
    getAssignment,
    getAssignmentDelete,
    paymentStatusAssignment,
    verifyAssignment,
} from "@/utils/services/assignmentService";
import { useStoreSnackbar } from "@/store/snackbar";
import { useStoreLogin } from "@/store/login";
import { CheckCircle, ClipboardCheck, CreditCard01, Edit01, Eye, FilterLines, Mail01, RefreshCw01, Trash01, SearchLg } from "@untitledui/icons";
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
    { id: "actions", name: "Actions", widthRatio: 6, minWidth: 140, className: "pr-4 pl-4" },
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
        bookingDateMode: sp.get("bookingDateMode") || "",
        bookingDateFrom: sp.get("bookingDateFrom") || sp.get("bookingDate") || "",
        bookingDateTo: sp.get("bookingDateTo") || "",
        tourDate: sp.get("tourDate") || "",
        tourDateMode: sp.get("tourDateMode") || "",
        tourDateFrom: sp.get("tourDateFrom") || sp.get("tourDate") || "",
        tourDateTo: sp.get("tourDateTo") || "",
        travelLocation: sp.get("travelLocation") || "",
        packageCost: sp.get("packageCost") || "",
        finalPackageCost: sp.get("finalPackageCost") || "",
        bookingStatus: sp.get("bookingStatus") || "",
        verify: sp.get("verify") || "",
        paymentStatus: sp.get("paymentStatus") || "",
        finished: sp.get("finished") || "false",
        dateNotDecided: sp.get("dateNotDecided") || "false",
        status: sp.get("status") || "",
        sortField: sp.get("sortField") || "tourDate",
        sortOrder: (sp.get("sortOrder") || "ASC").toUpperCase(),
    };
};

export default function AssignmentPage() {
    const availableWidth = useAvailableTableWidth();
    const navigate = useNavigate();
    const { pathname, search } = useLocation();
    const { showSnackbar } = useStoreSnackbar();
    const user = useStoreLogin((state) => state.user);

    const initial = parseSearch(search);

    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState<any[]>([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState<any>(null);
    const [finishModalOpen, setFinishModalOpen] = useState(false);
    const [finishTarget, setFinishTarget] = useState<any>(null);
    const [mailModalOpen, setMailModalOpen] = useState(false);
    const [selectedId, setSelectedId] = useState("");
    const [selectedEmail, setSelectedEmail] = useState("");
    const [adjustmentModalOpen, setAdjustmentModalOpen] = useState(false);
    const [adjustmentTarget, setAdjustmentTarget] = useState<any>(null);
    const [adjustmentAmount, setAdjustmentAmount] = useState("");
    const [adjustmentRemark, setAdjustmentRemark] = useState("");
    const [adjustmentGstInclusive, setAdjustmentGstInclusive] = useState(false);

    const getId = (value: any) => String(value?.id ?? value?._id ?? value ?? "").trim();
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
        bookingDateMode: initial.bookingDateMode,
        bookingDateFrom: initial.bookingDateFrom,
        bookingDateTo: initial.bookingDateTo,
        tourDate: initial.tourDate,
        tourDateMode: initial.tourDateMode,
        tourDateFrom: initial.tourDateFrom,
        tourDateTo: initial.tourDateTo,
        travelLocation: initial.travelLocation,
        packageCost: initial.packageCost,
        finalPackageCost: initial.finalPackageCost,
        bookingStatus: initial.bookingStatus,
        verify: initial.verify,
        paymentStatus: initial.paymentStatus,
        finished: initial.finished,
        dateNotDecided: initial.dateNotDecided,
        status: initial.status,
        sortField: initial.sortField,
        sortOrder: initial.sortOrder,
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
                    select: "createdAt,id,clientName,mobile,email,title,status,bookingDate,packageId,agentName,tourDate,dateNotDecided,travelLocation,packageCost,finalPackageCost,paymentReceived,verify,bookingStatus,paymentStatus,finished,callDone,emailSent,whatsappSent,agentCallRecordingChecked",
                    ...debouncedFilters,
                    sortField: debouncedFilters.sortField || 'tourDate',
                    sortOrder: debouncedFilters.sortOrder || 'ASC',
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

    const handleDelete = async () => {
        if (!deleteTarget) return;
        try {
            const itemId = getId(deleteTarget);
            const response = await getAssignmentDelete(itemId);
            if ((response as any)?.error) throw new Error((response as any).error);
            setItems((prev) => prev.filter((row) => getId(row) !== itemId));
            setTotalRecords((prev) => Math.max(0, prev - 1));
            setDeleteModalOpen(false);
            setDeleteTarget(null);
        } catch (error: any) {
            showSnackbar({
                title: "Error",
                description: error?.message || "Failed to delete assignment",
                color: "danger",
            });
        }
    };

    const handleFinishedStatus = async () => {
        if (!finishTarget) return;
        try {
            const itemId = getId(finishTarget);
            if (normalizeBoolean(finishTarget.finished)) {
                setFinishModalOpen(false);
                setFinishTarget(null);
                return;
            }
            const response = await finishedAssignment(itemId, { ...finishTarget, finished: true });
            if ((response as any)?.error) throw new Error((response as any).error);
            setItems((prev) => prev.map((row) => (getId(row) === itemId ? { ...row, finished: true } : row)));
            setFinishModalOpen(false);
            setFinishTarget(null);
        } catch (error: any) {
            showSnackbar({
                title: "Error",
                description: error?.message || "Failed to update finish status",
                color: "danger",
            });
        }
    };

    const handleSaveAdjustment = async () => {
        if (!adjustmentTarget) return;
        try {
            const itemId = getId(adjustmentTarget);
            const amount = Number(adjustmentAmount);
            if (!Number.isFinite(amount) || amount <= 0) {
                showSnackbar({
                    title: "Invalid Input",
                    description: "Amount must be greater than 0",
                    color: "danger",
                });
                return;
            }
            const response = await addAdjustment(itemId, {
                amount,
                remark: adjustmentRemark,
                gstInclusive: adjustmentGstInclusive,
            });
            if ((response as any)?.error) throw new Error((response as any).error);
            setItems((prev) =>
                prev.map((row) => (getId(row) === itemId ? { ...row, ...(response as any)?.data } : row)),
            );
            setAdjustmentModalOpen(false);
            setAdjustmentTarget(null);
            setAdjustmentAmount("");
            setAdjustmentRemark("");
            setAdjustmentGstInclusive(false);
        } catch (error: any) {
            showSnackbar({
                title: "Error",
                description: error?.message || "Failed to add adjustment",
                color: "danger",
            });
        }
    };


    const handleResetTempFilters = (close?: () => void) => {
        const resetState = {
            packageId: "",
            agentName: "",
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
            packageCost: "",
            finalPackageCost: "",
            bookingStatus: "",
            verify: "",
            paymentStatus: "",
            finished: "false",
            dateNotDecided: "false",
            status: "",
            sortField: "tourDate",
            sortOrder: "ASC",
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
                                        ) : column.id === "actions" ? (
                                            <div className="flex w-full items-center justify-end gap-1.5">
                                                <ButtonUtility
                                                    icon={Eye}
                                                    onClick={() => navigate(`/bookings/assignment/view/${item.id || item._id}`)}
                                                    color="secondary"
                                                    size="sm"
                                                    tooltip="View"
                                                />
                                                {(() => {
                                                    const userType = String((user as any)?.type || "").toUpperCase();
                                                    const canEdit =
                                                        userType === "ADMIN" ||
                                                        userType === "MANAGER" ||
                                                        (userType === "AGENT" && normalizeBoolean(item.verify) !== true);
                                                    const canDelete = userType !== "AGENT" && userType !== "MANAGER";

                                                    return (
                                                        <>
                                                            {canEdit && (
                                                                <ButtonUtility
                                                                    icon={Edit01}
                                                                    onClick={() => navigate(`/bookings/assignment/edit/${item.id || item._id}`)}
                                                                    color="secondary"
                                                                    size="sm"
                                                                    tooltip="Edit"
                                                                />
                                                            )}
                                                            {canDelete && (
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
                                                            )}

                                                            <Dropdown.Root>
                                                                <Dropdown.DotsButton />
                                                                <Dropdown.Popover>
                                                                    <Dropdown.Menu>
                                                                        <Dropdown.Item
                                                                            icon={Mail01}
                                                                            onAction={() => {
                                                                                setSelectedId(getId(item));
                                                                                setSelectedEmail(String(item?.email || ""));
                                                                                setMailModalOpen(true);
                                                                            }}
                                                                        >
                                                                            Send Mail
                                                                        </Dropdown.Item>

                                                                        <Dropdown.Item
                                                                            icon={CheckCircle}
                                                                            isDisabled={normalizeBoolean(item.verify) === true}
                                                                            onAction={async () => {
                                                                                try {
                                                                                    const itemId = getId(item);
                                                                                    const response = await verifyAssignment(itemId, { verify: true });
                                                                                    if ((response as any)?.error) throw new Error((response as any).error);
                                                                                    setItems((prev) =>
                                                                                        prev.map((row) =>
                                                                                            getId(row) === itemId ? { ...row, verify: true } : row,
                                                                                        ),
                                                                                    );
                                                                                } catch (error: any) {
                                                                                    showSnackbar({
                                                                                        title: "Error",
                                                                                        description: error?.message || "Failed to verify assignment",
                                                                                        color: "danger",
                                                                                    });
                                                                                }
                                                                            }}
                                                                        >
                                                                            {normalizeBoolean(item.verify) ? "Verified" : "Verify"}
                                                                        </Dropdown.Item>

                                                                        <Dropdown.Item
                                                                            icon={ClipboardCheck}
                                                                            onAction={async () => {
                                                                                try {
                                                                                    const itemId = getId(item);
                                                                                    const updatedStatus = !normalizeBoolean(item.bookingStatus);
                                                                                    const response = await bookingStatusAssignment(itemId, { bookingStatus: updatedStatus });
                                                                                    if ((response as any)?.error) throw new Error((response as any).error);
                                                                                    setItems((prev) =>
                                                                                        prev.map((row) =>
                                                                                            getId(row) === itemId ? { ...row, bookingStatus: updatedStatus } : row,
                                                                                        ),
                                                                                    );
                                                                                } catch (error: any) {
                                                                                    showSnackbar({
                                                                                        title: "Error",
                                                                                        description: error?.message || "Failed to update booking status",
                                                                                        color: "danger",
                                                                                    });
                                                                                }
                                                                            }}
                                                                        >
                                                                            {normalizeBoolean(item.bookingStatus) ? "Booked" : "Booking Status Change"}
                                                                        </Dropdown.Item>

                                                                        {normalizeBoolean(item.verify) && normalizeBoolean(item.bookingStatus) && (
                                                                            <Dropdown.Item
                                                                                icon={CreditCard01}
                                                                                onAction={async () => {
                                                                                    try {
                                                                                        const itemId = getId(item);
                                                                                        const updatedStatus = !normalizeBoolean(item.paymentStatus);
                                                                                        const response = await paymentStatusAssignment(itemId, { paymentStatus: updatedStatus });
                                                                                        if ((response as any)?.error) throw new Error((response as any).error);
                                                                                        setItems((prev) =>
                                                                                            prev.map((row) =>
                                                                                                getId(row) === itemId ? { ...row, paymentStatus: updatedStatus } : row,
                                                                                            ),
                                                                                        );
                                                                                    } catch (error: any) {
                                                                                        showSnackbar({
                                                                                            title: "Error",
                                                                                            description: error?.message || "Failed to update payment status",
                                                                                            color: "danger",
                                                                                        });
                                                                                    }
                                                                                }}
                                                                            >
                                                                                {normalizeBoolean(item.paymentStatus) ? "Done" : "Change Payment Status"}
                                                                            </Dropdown.Item>
                                                                        )}

                                                                        {normalizeBoolean(item.verify) && normalizeBoolean(item.bookingStatus) && (
                                                                            <Dropdown.Item
                                                                                icon={CheckCircle}
                                                                                isDisabled={normalizeBoolean(item.finished) === true}
                                                                                onAction={() => {
                                                                                    setFinishTarget(item);
                                                                                    setFinishModalOpen(true);
                                                                                }}
                                                                            >
                                                                                {normalizeBoolean(item.finished) ? "finished" : "Change Finish Status"}
                                                                            </Dropdown.Item>
                                                                        )}

                                                                        {canDelete && (
                                                                            <Dropdown.Item
                                                                                icon={CreditCard01}
                                                                                onAction={() => {
                                                                                    setAdjustmentTarget(item);
                                                                                    setAdjustmentAmount("");
                                                                                    setAdjustmentRemark("");
                                                                                    setAdjustmentGstInclusive(false);
                                                                                    setAdjustmentModalOpen(true);
                                                                                }}
                                                                            >
                                                                                Payment Adjustment
                                                                            </Dropdown.Item>
                                                                        )}
                                                                    </Dropdown.Menu>
                                                                </Dropdown.Popover>
                                                            </Dropdown.Root>
                                                        </>
                                                    );
                                                })()}
                                            </div>
                                        ) : (
                                            <span className="text-sm text-tertiary">-</span>
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

            <ModalOverlay isOpen={mailModalOpen} onOpenChange={setMailModalOpen}>
                {() => (
                    <Modal className="max-w-4xl">
                        <Dialog>
                            <div className="relative w-full rounded-xl border border-secondary bg-primary p-6 shadow-lg">
                                <CloseButton onPress={() => setMailModalOpen(false)} className="absolute right-4 top-4" size="sm" />
                                <MailConfirmation
                                    selectedId={selectedId}
                                    email={selectedEmail}
                                    header="Send Assignment Mail"
                                    modalClose={() => setMailModalOpen(false)}
                                    sendMailFnName="sendAssignmentMail"
                                    showPreview={true}
                                />
                            </div>
                        </Dialog>
                    </Modal>
                )}
            </ModalOverlay>

            <ModalOverlay isOpen={adjustmentModalOpen} onOpenChange={setAdjustmentModalOpen}>
                {() => (
                    <Modal className="max-w-xl">
                        <Dialog>
                            <div className="relative w-full rounded-xl border border-secondary bg-primary p-6 shadow-lg">
                                <CloseButton onPress={() => setAdjustmentModalOpen(false)} className="absolute right-4 top-4" size="sm" />
                                <div className="flex flex-col gap-4">
                                    <div className="text-lg text-primary font-bold">Payment Adjustment</div>
                                    <Input
                                        label="Amount"
                                        type="number"
                                        placeholder="Enter amount"
                                        value={adjustmentAmount}
                                        onChange={(value) => setAdjustmentAmount(value)}
                                    />
                                    <Input
                                        label="Remark"
                                        placeholder="Optional remark"
                                        value={adjustmentRemark}
                                        onChange={(value) => setAdjustmentRemark(value)}
                                    />
                                    <Checkbox isSelected={adjustmentGstInclusive} onChange={setAdjustmentGstInclusive} label="GST Inclusive" />
                                    <div className="flex gap-3 justify-end">
                                        <Button color="secondary" onClick={() => setAdjustmentModalOpen(false)}>
                                            Cancel
                                        </Button>
                                        <Button color="primary" onClick={handleSaveAdjustment}>
                                            Save
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Dialog>
                    </Modal>
                )}
            </ModalOverlay>

            <Tmodal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                header="Confirm Deletion"
                content={
                    <p className="text-sm text-tertiary">
                        Are you sure you want to delete this assignment:{" "}
                        <span className="font-semibold text-primary">{deleteTarget?.packageId || deleteTarget?.clientName || "-"}</span> ?
                    </p>
                }
                footerActions={
                    <Button color="primary-destructive" onClick={handleDelete}>
                        Delete
                    </Button>
                }
            />

            <Tmodal
                isOpen={finishModalOpen}
                onClose={() => setFinishModalOpen(false)}
                header="Finished Assignment"
                content={
                    <p className="text-sm text-tertiary">
                        Are you sure you want to mark this assignment as finished for:{" "}
                        <span className="font-semibold text-primary">{finishTarget?.packageId || finishTarget?.clientName || "-"}</span> ?
                    </p>
                }
                footerActions={
                    <Button color="primary" onClick={handleFinishedStatus}>
                        Confirm
                    </Button>
                }
            />
        </DefaultLayout>
    );
}
