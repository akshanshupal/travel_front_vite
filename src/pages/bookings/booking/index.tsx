import { DefaultLayout } from "@/layouts/DefaultLayout";
import { PaginationButtonGroup } from "@/components/application/pagination/pagination";
import { StickyTable, Table, TableCard } from "@/components/application/table/table";
import { Badge, BadgeWithIcon } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { Input } from "@/components/base/input/input";
import { Select } from "@/components/base/select/select";
import Tmodal from "@/components/utils/Tmodal";
import { useStoreLogin } from "@/store/login";
import {
    bookingStatusAssignment,
    finishedAssignment,
    getAssignment,
    getAssignmentDelete,
    paymentStatusAssignment,
} from "@/utils/services/assignmentService";
import { useStoreSnackbar } from "@/store/snackbar";
import { CheckCircle, ClipboardCheck, CreditCard01, Edit01, Eye, FilterLines, RefreshCw01, SearchLg, Trash01, X } from "@untitledui/icons";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useAvailableTableWidth } from "@/hooks/use-available-table-width";
import { Dialog, Modal, ModalOverlay } from "@/components/application/modals/modal";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { CloseButton } from "@/components/base/buttons/close-button";
import { SlideoutMenu } from "@/components/application/slideout-menus/slideout-menu";
import { Label } from "@/components/base/input/label";
import { formatCurrencyInr, formatShortDate, formatTime, calculatePendingAmount } from "@/utils/formatters";

const columns = [
    { id: "index", name: "#", isRowHeader: true, widthRatio: 4, minWidth: 50 },
    { id: "packageId", name: "Package ID", widthRatio: 8, minWidth: 130 },
    { id: "clientDetails", name: "Customer Details", widthRatio: 28, minWidth: 170 },
    { id: "tourDate", name: "Travel/Booking Date", widthRatio: 14, minWidth: 120 },
    { id: "travelLocation", name: "Travel/Home Location", widthRatio: 29, minWidth: 180 },
    { id: "packageCost", name: "Package/ Final/ Received %", widthRatio: 10, minWidth: 120 },
    { id: "paymentReceived", name: "Received/ Pending", widthRatio: 16, minWidth: 100 },
    { id: "serviceAmount", name: "Booking/ Spend/ Balance", widthRatio: 12, minWidth: 120 },
    { id: "noOfRooms", name: "Rooms / Duration", widthRatio: 12, minWidth: 70 },
    { id: "adultsKids", name: "Adults/ Kids", widthRatio: 6, minWidth: 70 },
    { id: "verifyTime", name: "Verify Date", widthRatio: 7, minWidth: 100 },
    { id: "status", name: "Status", widthRatio: 4, minWidth: 80 },
    { id: "bookingStatus", name: "Booking Payment Finished", widthRatio: 4, minWidth: 110 },
    { id: "actions", name: "Actions", widthRatio: 7, minWidth: 130, className: "px-2" },
] as { id: string; name: string; isRowHeader?: boolean; className?: string; widthRatio?: number; minWidth?: number }[];

export default function BookingPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const { showSnackbar } = useStoreSnackbar();
    const user = useStoreLogin((state) => state.user);

    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState<any[]>([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const availableWidth = useAvailableTableWidth();

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState<any>(null);
    const [finishModalOpen, setFinishModalOpen] = useState(false);
    const [finishTarget, setFinishTarget] = useState<any>(null);

    const getId = (value: any) => String(value?.id ?? value?._id ?? value ?? "").trim();

    const allColumnIds = columns.map((col) => col.id);
    const defaultRequiredIds = [
        "clientDetails",
        "bookingStatus",
        "paymentStatus",
        "finished",
        "ratioOfPaymentReceived",
        "pendingAmount",
        "packageNights",
        "adultsKids",
    ];
    const fixedStartId = "index";
    const fixedEndId = "actions";
    const normalizeSelectedColumnIds = (ids: string[]) => {
        const unique = Array.from(new Set(ids)).filter((id) => allColumnIds.includes(id));
        const middle = unique.filter((id) => id !== fixedStartId && id !== fixedEndId);
        return [fixedStartId, ...middle, fixedEndId].filter((id) => allColumnIds.includes(id));
    };
    const getSavedColumnIds = () => {
        if (typeof window === "undefined") return null;
        try {
            const raw = localStorage.getItem("selectedColumns");
            if (!raw) return null;
            const parsed = JSON.parse(raw);
            if (!Array.isArray(parsed)) return null;
            if (parsed.length === 0) return null;
            if (typeof parsed[0] === "string") return parsed as string[];
            if (typeof parsed[0] === "object") {
                return (parsed as Array<{ id?: string; uid?: string }>)
                    .map((item) => item.id || item.uid)
                    .filter((id): id is string => Boolean(id));
            }
            return null;
        } catch {
            return null;
        }
    };

    const [visibleColumnIds, setVisibleColumnIds] = useState(() => {
        const saved = getSavedColumnIds();
        if (!saved) return normalizeSelectedColumnIds(allColumnIds);
        const merged = Array.from(new Set([...saved, ...defaultRequiredIds]));
        return normalizeSelectedColumnIds(merged);
    });
    const [pendingColumnIds, setPendingColumnIds] = useState<string[]>(visibleColumnIds);
    const [columnModalOpen, setColumnModalOpen] = useState(false);
    const [columnModalPage, setColumnModalPage] = useState(1);
    const [draggingId, setDraggingId] = useState<string | null>(null);
    const normalizeBoolean = (value: unknown) => {
        if (value === true || value === "true" || value === 1 || value === "1") return true;
        if (value === false || value === "false" || value === 0 || value === "0") return false;
        return null;
    };
    const normalizeSearchParams = (params: Record<string, string>) => {
        const next: Record<string, string> = {};
        Object.entries(params).forEach(([key, value]) => {
            const trimmed = value.trim();
            if (trimmed) {
                next[key] = trimmed;
            }
        });
        return next;
    };

    const togglePendingColumn = (columnId: string) => {
        if (columnId === fixedStartId || columnId === fixedEndId) return;
        setPendingColumnIds((prev) => {
            const withoutFixed = prev.filter((id) => id !== fixedStartId && id !== fixedEndId);
            if (withoutFixed.includes(columnId)) {
                return normalizeSelectedColumnIds(withoutFixed.filter((id) => id !== columnId));
            }
            return normalizeSelectedColumnIds([...withoutFixed, columnId]);
        });
    };

    const openColumnModal = () => {
        setPendingColumnIds(visibleColumnIds);
        setColumnModalPage(1);
        setColumnModalOpen(true);
    };

    const applyColumnSelection = () => {
        const next = normalizeSelectedColumnIds(pendingColumnIds);
        setVisibleColumnIds(next);
        if (typeof window !== "undefined") {
            localStorage.setItem("selectedColumns", JSON.stringify(next));
        }
        setColumnModalOpen(false);
    };

    const goToReorderPage = () => {
        const selected = pendingColumnIds.filter((id) => id !== fixedStartId && id !== fixedEndId);
        if (selected.length === 0) return;
        setColumnModalPage(2);
    };

    const goBackToSelectPage = () => {
        setColumnModalPage(1);
    };

    const reorderPendingColumns = (fromId: string, toId: string) => {
        const draggableIds = pendingColumnIds.filter((id) => id !== fixedStartId && id !== fixedEndId);
        const fromIndex = draggableIds.indexOf(fromId);
        const toIndex = draggableIds.indexOf(toId);
        if (fromIndex === -1 || toIndex === -1) return;
        const updated = [...draggableIds];
        const [moved] = updated.splice(fromIndex, 1);
        updated.splice(toIndex, 0, moved);
        setPendingColumnIds(normalizeSelectedColumnIds(updated));
    };

    const visibleColumns = useMemo(
        () => visibleColumnIds.map((id) => columns.find((col) => col.id === id)).filter((col): col is (typeof columns)[number] => Boolean(col)),
        [visibleColumnIds],
    );
    const tableKey = useMemo(() => visibleColumnIds.join("|"), [visibleColumnIds]);

    const renderCell = (item: any, columnId: string) => {
        switch (columnId) {
            case "index":
                return (page - 1) * limit + items.indexOf(item) + 1;
            case "packageId":
                return item.packageId;
            case "clientDetails":
                return (
                    <>
                        {item?.clientName || "-"} <br />
                        <span className="text-xs text-gray-500">{item.mobile || ""}</span>
                        <span className="text-xs text-gray-500">{item.email || ""}</span>
                    </>
                );
            case "tourDate":
                return (
                    <span className="text-sm">
                        {formatShortDate(item.tourDate)} <br />
                        <span className="text-xs text-gray-500">{formatShortDate(item.bookingDate)}</span>
                    </span>

                )
            case "travelLocation":
                return (
                    <span className="text-sm">
                        {item.travelLocation} <br />
                        <span className="text-xs text-gray-500">{item.homeLocation}</span>
                    </span>

                )

            case "packageCost":
                return (
                    <>
                        <span className="text-sm">{formatCurrencyInr(item.packageCost)}</span> <br />
                        <span className="text-xs text-gray-500">{formatCurrencyInr(item.finalPackageCost)}</span> <br />
                        <span className="text-xs text-gray-500">{`${(item.paymentReceived / item.finalPackageCost * 100).toFixed(2)}%`}</span>
                    </>
                );
            case "paymentReceived":
                return (
                    <>
                        <span className="text-sm">{formatCurrencyInr(item.paymentReceived)}</span> <br />
                        <span className="text-xs text-gray-500">{calculatePendingAmount(item.finalPackageCost, item.paymentReceived)}</span>
                    </>
                );
            case "serviceAmount":
                return (
                    <span className="text-sm">
                        {formatCurrencyInr(item.bookingsAmount)} <br />
                        <span className="text-xs text-gray-500"> {formatCurrencyInr(item.serviceAmount)}</span> <br />
                       <span className="text-xs text-gray-500">{formatCurrencyInr((Number(item.bookingsAmount) || 0) - (Number(item.serviceAmount) || 0))}</span>
                    </span>
                );
            case "ratioOfPaymentReceived":
                return (() => {
                    const ratioFromApi = Number(item?.ratioOfPaymentReceived);
                    const computed = item?.finalPackageCost
                        ? (Number(item?.paymentReceived || 0) / Number(item.finalPackageCost)) * 100
                        : NaN;
                    const ratio = Number.isFinite(ratioFromApi) ? ratioFromApi : computed;
                    if (!Number.isFinite(ratio)) return "-";
                    return <span className="text-sm">{`${ratio.toFixed(2)}%`}</span>;
                })();
            case "noOfRooms":
                return (
                    <>
                        <span className="text-sm">{item.noOfRooms} <br /></span>
                        <span className="text-xs text-gray-500">{item.noOfPackageNights}/{item.noOfPackageDays}</span>
                    </>
                )
            case "adultsKids":
                return (<>
                  <span className="text-xs text-gray-500">   {item.noOfAdult}</span>
                  <span className="text-xs text-gray-500">{item.noOfKids > 0 ? `, ${item.noOfKids}` : ''}</span> <br /> {
                        item.kidsAges && item.kidsAges.map((age: any, index: any) => (
                            <span key={index} className="text-xs text-gray-500">[{age}]</span>
                        ))
                    }
                </>)
            case "verifyTime":
                if (item.verifyTime == null || item.verifyTime === "") return "-";
                return (
                    <>
                         <span className="text-xs text-gray-500"> {formatShortDate(item.verifyTime)} </span> <br />
                        <span className="text-xs text-gray-500">{formatTime(item.verifyTime)}</span>
                    </>
                );
            case "status":
                return (
                    <Badge size="sm" color={item.status ? "success" : "error"}>
                        {item.status ? "Active" : "Inactive"}
                    </Badge>
                );
            case "bookingStatus":
                return (() => {
                    return (
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
                    );
                })();
            case "actions":
                const userType = String((user as any)?.type || "").toUpperCase();
                const canEdit = userType !== "AGENT";
                const canDelete = userType !== "AGENT" && userType !== "MANAGER";
                return (
                    <div className="flex items-center gap-2">
                        <ButtonUtility
                            icon={Eye}
                            onClick={() => navigate(`/bookings/booking/view/${item.id || item._id}`)}
                            color="secondary"
                            size="sm"
                            tooltip="View"
                        />
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
                                        icon={ClipboardCheck}
                                        onAction={async () => {
                                            try {
                                                const itemId = getId(item);
                                                const updatedStatus = !normalizeBoolean(item.bookingStatus);
                                                const response = await bookingStatusAssignment(itemId, { ...item, bookingStatus: updatedStatus });
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
                                                    const response = await paymentStatusAssignment(itemId, { ...item, paymentStatus: updatedStatus });
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

                                    {normalizeBoolean(item.bookingStatus) && (
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
                                </Dropdown.Menu>
                            </Dropdown.Popover>
                        </Dropdown.Root>
                    </div>
                );
            default:
                return null;
        }
    };

    const page = Number(searchParams.get("page") || "1");
    const limit = Number(searchParams.get("limit") || "10");
    const [filters, setFilters] = useState({
        status: searchParams.get("status") || "",
        packageId: searchParams.get("packageId") || "",
        clientDetails: searchParams.get("clientDetails") || "",
        sortField: searchParams.get("sortField") || "tourDate",
        sortOrder: (searchParams.get("sortOrder") || "ASC").toUpperCase(),
        bookingDateMode: searchParams.get("bookingDateMode") || "",
        bookingDateFrom: searchParams.get("bookingDateFrom") || searchParams.get("bookingDate") || "",
        bookingDateTo: searchParams.get("bookingDateTo") || "",
        tourDateMode: searchParams.get("tourDateMode") || "",
        tourDateFrom: searchParams.get("tourDateFrom") || searchParams.get("tourDate") || "",
        tourDateTo: searchParams.get("tourDateTo") || "",
        travelLocation: searchParams.get("travelLocation") || "",
        homeLocation: searchParams.get("homeLocation") || "",
        packageCost: searchParams.get("packageCost") || "",
        finalPackageCost: searchParams.get("finalPackageCost") || "",
        paymentReceived: searchParams.get("paymentReceived") || "",
        serviceAmount: searchParams.get("serviceAmount") || "",
        ratioOfPaymentReceived: searchParams.get("ratioOfPaymentReceived") || "",
        pendingAmount: searchParams.get("pendingAmount") || "",
        noOfRooms: searchParams.get("noOfRooms") || "",
        packageNights: searchParams.get("packageNights") || "",
        adultsKids: searchParams.get("adultsKids") || "",
        verifyTime: searchParams.get("verifyTime") || "",
        bookingStatus: searchParams.get("bookingStatus") || "",
        paymentStatus: searchParams.get("paymentStatus") || "",
        finished: searchParams.get("finished") || "false",
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

    const handleOpenFilters = () => {
        setTempFilters(filters);
    };

    const handleApplyFilters = (close: () => void) => {
        setFilters(tempFilters);
        close();
    };

    const handleResetTempFilters = (close?: () => void) => {
        const resetState = {
            status: "",
            packageId: "",
            clientDetails: "",
            sortField: "tourDate",
            sortOrder: "ASC",
            bookingDateMode: "",
            bookingDateFrom: "",
            bookingDateTo: "",
            tourDateMode: "",
            tourDateFrom: "",
            tourDateTo: "",
            travelLocation: "",
            homeLocation: "",
            packageCost: "",
            finalPackageCost: "",
            paymentReceived: "",
            serviceAmount: "",
            ratioOfPaymentReceived: "",
            pendingAmount: "",
            noOfRooms: "",
            packageNights: "",
            adultsKids: "",
            verifyTime: "",
            bookingStatus: "",
            paymentStatus: "",
            finished: "",
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
        setSearchParams(normalizeSearchParams(params));
    }, [page, limit, debouncedFilters, setSearchParams]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const addParam = (key: string, value: unknown) => {
                    if (value === undefined || value === null) return;
                    if (typeof value === "string") {
                        const trimmed = value.trim();
                        if (!trimmed) return;
                        params[key] = trimmed;
                        return;
                    }
                    params[key] = value;
                };
                const params: Record<string, any> = {
                    totalCount: true,
                    page,
                    limit,
                    populate: "agentName",
                    verify: "true",
                    sortField: debouncedFilters.sortField || "tourDate",
                    sortOrder: debouncedFilters.sortOrder || "ASC",
                };
                addParam("status", debouncedFilters.status);
                addParam("packageId", debouncedFilters.packageId);
                addParam("clientDetails", debouncedFilters.clientDetails);
                addParam("bookingDateMode", debouncedFilters.bookingDateMode);
                addParam("bookingDateFrom", debouncedFilters.bookingDateFrom);
                addParam("bookingDateTo", debouncedFilters.bookingDateTo);
                addParam("tourDateMode", debouncedFilters.tourDateMode);
                addParam("tourDateFrom", debouncedFilters.tourDateFrom);
                addParam("tourDateTo", debouncedFilters.tourDateTo);
                addParam("travelLocation", debouncedFilters.travelLocation);
                addParam("homeLocation", debouncedFilters.homeLocation);
                addParam("packageCost", debouncedFilters.packageCost);
                addParam("finalPackageCost", debouncedFilters.finalPackageCost);
                addParam("paymentReceived", debouncedFilters.paymentReceived);
                addParam("serviceAmount", debouncedFilters.serviceAmount);
                addParam("ratioOfPaymentReceived", debouncedFilters.ratioOfPaymentReceived);
                addParam("pendingAmount", debouncedFilters.pendingAmount);
                addParam("noOfRooms", debouncedFilters.noOfRooms);
                addParam("packageNights", debouncedFilters.packageNights);
                addParam("adultsKids", debouncedFilters.adultsKids);
                addParam("verifyTime", debouncedFilters.verifyTime);
                addParam("bookingStatus", debouncedFilters.bookingStatus);
                addParam("paymentStatus", debouncedFilters.paymentStatus);
                addParam("finished", debouncedFilters.finished);
                const response = await getAssignment(params);
                if (response.error) {
                    throw new Error(response.error);
                }
                setItems(response.data || []);
                setTotalRecords(response.totalCount || 0);
            } catch (error: any) {
                showSnackbar({
                    title: "Error",
                    description: error.message || "Failed to fetch bookings",
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

    const handleDelete = async () => {
        if (!deleteTarget) return;
        try {
            const itemId = getId(deleteTarget);
            const response = await getAssignmentDelete(itemId);
            if ((response as any)?.error) throw new Error((response as any).error);
            showSnackbar({
                title: "Success",
                description: "Booking deleted successfully",
                color: "success",
            });
            setItems((prev) => prev.filter((row) => getId(row) !== itemId));
            setTotalRecords((prev) => Math.max(0, prev - 1));
            setDeleteModalOpen(false);
            setDeleteTarget(null);
        } catch (error: any) {
            showSnackbar({
                title: "Error",
                description: error?.message || "Failed to delete booking",
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

    return (
        <DefaultLayout>
            <div className="space-y-4" style={{ width: availableWidth }}>
                <TableCard.Root>
                    <TableCard.Header
                        title="Booking List"
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
                                    color="secondary"
                                    onClick={openColumnModal}
                                >
                                    Columns
                                </Button>
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
                                                        <div className="flex flex-col gap-1.5">
                                                            <Label>Booking Status</Label>
                                                            <Select
                                                                aria-label="Booking Status"
                                                                selectedKey={tempFilters.bookingStatus || "__all__"}
                                                                onSelectionChange={(key) =>
                                                                    setTempFilters((prev) => ({ ...prev, bookingStatus: key === "__all__" ? "" : String(key) }))
                                                                }
                                                                items={[
                                                                    { id: "__all__", label: "All Booking Status" },
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
                                                                selectedKey={tempFilters.paymentStatus || "__all__"}
                                                                onSelectionChange={(key) =>
                                                                    setTempFilters((prev) => ({ ...prev, paymentStatus: key === "__all__" ? "" : String(key) }))
                                                                }
                                                                items={[
                                                                    { id: "__all__", label: "All Payment Status" },
                                                                    { id: "true", label: "Done" },
                                                                    { id: "false", label: "Pending" },
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
                                                                onSelectionChange={(key) =>
                                                                    setTempFilters((prev) => ({ ...prev, finished: key === "" ? "" : String(key) }))
                                                                }
                                                                items={[
                                                                    { id: "", label: "All Finished Status" },
                                                                    { id: "true", label: "Finished" },
                                                                    { id: "false", label: "Pending" },
                                                                ]}
                                                            >
                                                                {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                                            </Select>
                                                        </div>
                                                        <div className="flex flex-col gap-3">
                                                            <div className="flex flex-col gap-1.5">
                                                                <Label>Booking Date</Label>
                                                                <Select
                                                                    aria-label="Booking Date Mode"
                                                                    selectedKey={tempFilters.bookingDateMode || ""}
                                                                    onSelectionChange={(key) =>
                                                                        setTempFilters((prev) => ({
                                                                            ...prev,
                                                                            bookingDateMode: String(key),
                                                                            bookingDateFrom: "",
                                                                            bookingDateTo: "",
                                                                        }))
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
                                                            </div>
                                                            {String(tempFilters.bookingDateMode || "") === "range" ? (
                                                                <div className="flex gap-2">
                                                                    <Input
                                                                        aria-label="Booking Date From"
                                                                        type="date"
                                                                        value={tempFilters.bookingDateFrom}
                                                                        onChange={(value) => setTempFilters((prev) => ({ ...prev, bookingDateFrom: value }))}
                                                                    />
                                                                    <Input
                                                                        aria-label="Booking Date To"
                                                                        type="date"
                                                                        value={tempFilters.bookingDateTo}
                                                                        onChange={(value) => setTempFilters((prev) => ({ ...prev, bookingDateTo: value }))}
                                                                    />
                                                                </div>
                                                            ) : (
                                                                <Input
                                                                    aria-label="Booking Date"
                                                                    type="date"
                                                                    value={tempFilters.bookingDateFrom}
                                                                    onChange={(value) => setTempFilters((prev) => ({ ...prev, bookingDateFrom: value }))}
                                                                />
                                                            )}
                                                        </div>
                                                        <Input
                                                            label="Travel Location"
                                                            placeholder="Travel Location"
                                                            value={tempFilters.travelLocation}
                                                            onChange={(value) => setTempFilters((prev) => ({ ...prev, travelLocation: value }))}
                                                        />
                                                        <Input
                                                            label="Home Location"
                                                            placeholder="Home Location"
                                                            value={tempFilters.homeLocation}
                                                            onChange={(value) => setTempFilters((prev) => ({ ...prev, homeLocation: value }))}
                                                        />
                                                        <Input
                                                            label="Package Cost"
                                                            placeholder="Package Cost"
                                                            value={tempFilters.packageCost}
                                                            onChange={(value) => setTempFilters((prev) => ({ ...prev, packageCost: value }))}
                                                        />
                                                        <Input
                                                            label="Final Package Cost"
                                                            placeholder="Final Package Cost"
                                                            value={tempFilters.finalPackageCost}
                                                            onChange={(value) => setTempFilters((prev) => ({ ...prev, finalPackageCost: value }))}
                                                        />
                                                        <Input
                                                            label="Payment Received"
                                                            placeholder="Payment Received"
                                                            value={tempFilters.paymentReceived}
                                                            onChange={(value) => setTempFilters((prev) => ({ ...prev, paymentReceived: value }))}
                                                        />
                                                        <Input
                                                            label="Spend Amount"
                                                            placeholder="Spend Amount"
                                                            value={tempFilters.serviceAmount}
                                                            onChange={(value) => setTempFilters((prev) => ({ ...prev, serviceAmount: value }))}
                                                        />
                                                        <Input
                                                            label="Received Ratio"
                                                            placeholder="Received Ratio"
                                                            value={tempFilters.ratioOfPaymentReceived}
                                                            onChange={(value) => setTempFilters((prev) => ({ ...prev, ratioOfPaymentReceived: value }))}
                                                        />
                                                        <Input
                                                            label="Pending Amount"
                                                            placeholder="Pending Amount"
                                                            value={tempFilters.pendingAmount}
                                                            onChange={(value) => setTempFilters((prev) => ({ ...prev, pendingAmount: value }))}
                                                        />
                                                        <Input
                                                            label="No Of Rooms"
                                                            placeholder="No Of Rooms"
                                                            value={tempFilters.noOfRooms}
                                                            onChange={(value) => setTempFilters((prev) => ({ ...prev, noOfRooms: value }))}
                                                        />
                                                        <Input
                                                            label="Nights/Days"
                                                            placeholder="Nights/Days"
                                                            value={tempFilters.packageNights}
                                                            onChange={(value) => setTempFilters((prev) => ({ ...prev, packageNights: value }))}
                                                        />
                                                        <Input
                                                            label="Adults/Kids"
                                                            placeholder="Adults/Kids"
                                                            value={tempFilters.adultsKids}
                                                            onChange={(value) => setTempFilters((prev) => ({ ...prev, adultsKids: value }))}
                                                        />
                                                        <Input
                                                            label="Verify Date"
                                                            placeholder="Verify Date"
                                                            value={tempFilters.verifyTime}
                                                            onChange={(value) => setTempFilters((prev) => ({ ...prev, verifyTime: value }))}
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
                            {(() => {
                                const bookingMode = String(filters.bookingDateMode || "");
                                const bookingFrom = String(filters.bookingDateFrom || "");
                                const bookingTo = String(filters.bookingDateTo || "");
                                if (!bookingFrom && !bookingTo) return null;
                                let displayValue = "";
                                if (bookingMode === "range") {
                                    displayValue = `${formatShortDate(bookingFrom)} → ${formatShortDate(bookingTo)}`;
                                } else if (bookingMode === "before") {
                                    displayValue = `Before ${formatShortDate(bookingFrom)}`;
                                } else if (bookingMode === "after") {
                                    displayValue = `After ${formatShortDate(bookingFrom)}`;
                                } else {
                                    displayValue = formatShortDate(bookingFrom);
                                }
                                return (
                                    <div onClick={() => handleRemoveFilter("bookingDate")} className="cursor-pointer">
                                        <BadgeWithIcon iconTrailing={X} color="brand">
                                            <span className="font-medium text-gray-500 mr-1">Booking Date:</span>
                                            <span className="font-semibold text-brand-700">{displayValue}</span>
                                        </BadgeWithIcon>
                                    </div>
                                );
                            })()}
                            {(() => {
                                const tourMode = String(filters.tourDateMode || "");
                                const tourFrom = String(filters.tourDateFrom || "");
                                const tourTo = String(filters.tourDateTo || "");
                                if (!tourFrom && !tourTo) return null;
                                let displayValue = "";
                                if (tourMode === "range") {
                                    displayValue = `${formatShortDate(tourFrom)} → ${formatShortDate(tourTo)}`;
                                } else if (tourMode === "before") {
                                    displayValue = `Before ${formatShortDate(tourFrom)}`;
                                } else if (tourMode === "after") {
                                    displayValue = `After ${formatShortDate(tourFrom)}`;
                                } else {
                                    displayValue = formatShortDate(tourFrom);
                                }
                                return (
                                    <div onClick={() => handleRemoveFilter("tourDate")} className="cursor-pointer">
                                        <BadgeWithIcon iconTrailing={X} color="brand">
                                            <span className="font-medium text-gray-500 mr-1">Travel Date:</span>
                                            <span className="font-semibold text-brand-700">{displayValue}</span>
                                        </BadgeWithIcon>
                                    </div>
                                );
                            })()}
                            {Object.entries(filters).map(([key, value]) => {
                                if (!value) return null;
                                if (
                                    key === "sortField" ||
                                    key === "sortOrder" ||
                                    key === "bookingDateMode" ||
                                    key === "bookingDateFrom" ||
                                    key === "bookingDateTo" ||
                                    key === "tourDateMode" ||
                                    key === "tourDateFrom" ||
                                    key === "tourDateTo"
                                ) {
                                    return null;
                                }
                                let label = key;
                                if (key === "packageId") label = "Package ID";
                                if (key === "clientDetails") label = "Customer Details";
                                if (key === "bookingStatus") label = "Booking Status";
                                if (key === "paymentStatus") label = "Payment Status";
                                if (key === "finished") label = "Finished";
                                if (key === "travelLocation") label = "Travel Location";
                                if (key === "homeLocation") label = "Home Location";
                                if (key === "packageCost") label = "Package Cost";
                                if (key === "finalPackageCost") label = "Final Cost";
                                if (key === "paymentReceived") label = "Received";
                                if (key === "serviceAmount") label = "Spend";
                                if (key === "ratioOfPaymentReceived") label = "Ratio";
                                if (key === "pendingAmount") label = "Pending";
                                if (key === "noOfRooms") label = "Rooms";
                                if (key === "packageNights") label = "Nights/Days";
                                if (key === "adultsKids") label = "Adults/Kids";
                                if (key === "verifyTime") label = "Verify Date";
                                if (key === "status") label = "Status";

                                let displayValue = value;
                                if (value === "true") {
                                    if (key === "status") displayValue = "Active";
                                    else if (key === "bookingStatus") displayValue = "Booked";
                                    else if (key === "paymentStatus") displayValue = "Done";
                                    else if (key === "finished") displayValue = "Finished";
                                    else displayValue = "Yes";
                                } else if (value === "false") {
                                    if (key === "status") displayValue = "Inactive";
                                    else if (key === "bookingStatus") displayValue = "Not Booked";
                                    else if (key === "paymentStatus") displayValue = "Pending";
                                    else if (key === "finished") displayValue = "Pending";
                                    else displayValue = "No";
                                }

                                return (
                                    <div key={key} onClick={() => handleRemoveFilter(key)} className="cursor-pointer">
                                        <BadgeWithIcon iconTrailing={X} color="brand">
                                            <span className="font-medium text-gray-500 mr-1">{label}:</span>
                                            <span className="font-semibold text-brand-700">{displayValue}</span>
                                        </BadgeWithIcon>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="w-full max-w-full">
                        <StickyTable
                            key={tableKey}
                            ariaLabel="Booking list"
                            columns={visibleColumns}
                            items={items}
                            availableWidth={availableWidth}
                            loading={loading}
                        >
                            {(item) => (
                                <Table.Row id={item.id || item._id} columns={visibleColumns}>
                                    {(column) => (
                                        <Table.Cell
                                            className={
                                                column.id === "actions"
                                                    ? "whitespace-nowrap px-2 py-3"
                                                    : "whitespace-normal break-words px-4 py-3"
                                            }
                                        >
                                            {renderCell(item, column.id)}
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

            <ModalOverlay isOpen={columnModalOpen} onOpenChange={setColumnModalOpen}>
                <Modal className="w-full max-w-lg bg-primary p-6 rounded-xl shadow-xl border border-secondary">
                    <Dialog>
                        <div className="flex flex-col gap-6 w-full">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-primary">Display Columns Selections</h2>
                                <CloseButton onClick={() => setColumnModalOpen(false)} />
                            </div>
                            {columnModalPage === 1 ? (
                                <>
                                    <div className="flex flex-col gap-2 text-center">
                                        <h2 className="text-lg font-semibold text-primary">Select Required Fields</h2>
                                        <p className="text-sm text-secondary">Choose columns to display</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        {columns
                                            .filter((col) => col.id !== fixedStartId && col.id !== fixedEndId)
                                            .map((col) => (
                                                <Checkbox
                                                    key={col.id}
                                                    label={col.name}
                                                    isSelected={pendingColumnIds.includes(col.id)}
                                                    onChange={() => togglePendingColumn(col.id)}
                                                />
                                            ))}
                                    </div>
                                    <div className="flex justify-center gap-3">
                                        <Button
                                            color="primary"
                                            isDisabled={pendingColumnIds.filter((id) => id !== fixedStartId && id !== fixedEndId).length === 0}
                                            onClick={goToReorderPage}
                                        >
                                            Next
                                        </Button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="flex flex-col gap-2 text-center">
                                        <h2 className="text-lg font-semibold text-primary">Rearrange Selected Fields</h2>
                                        <p className="text-sm text-secondary">Drag and drop to reorder the fields</p>
                                    </div>
                                    <div className="min-h-[200px] max-h-[60vh] overflow-y-auto rounded-lg border border-secondary bg-secondary/40 p-2">
                                        {pendingColumnIds
                                            .filter((id) => id !== fixedStartId && id !== fixedEndId)
                                            .map((id) => {
                                                const column = columns.find((col) => col.id === id);
                                                if (!column) return null;
                                                const isDragging = draggingId === id;
                                                return (
                                                    <div
                                                        key={id}
                                                        draggable
                                                        onDragStart={() => setDraggingId(id)}
                                                        onDragEnd={() => setDraggingId(null)}
                                                        onDragOver={(event) => event.preventDefault()}
                                                        onDrop={() => {
                                                            if (draggingId) {
                                                                reorderPendingColumns(draggingId, id);
                                                            }
                                                            setDraggingId(null);
                                                        }}
                                                        className={`flex items-center gap-3 rounded-md border border-secondary px-3 py-2 text-primary ${isDragging ? "bg-secondary" : "bg-primary"
                                                            }`}
                                                    >
                                                        <span className="text-secondary">⋮⋮</span>
                                                        <span className="flex-1 text-sm font-medium">{column.name}</span>
                                                    </div>
                                                );
                                            })}
                                    </div>
                                    <div className="flex justify-center gap-3">
                                        <Button color="secondary" onClick={goBackToSelectPage}>
                                            Go Back
                                        </Button>
                                        <Button color="primary" onClick={applyColumnSelection}>
                                            Apply
                                        </Button>
                                    </div>
                                </>
                            )}
                        </div>
                    </Dialog>
                </Modal>
            </ModalOverlay>

            <Tmodal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                header="Confirm Deletion"
                content={
                    <p className="text-sm text-tertiary">
                        Are you sure you want to delete this booking:{" "}
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
                        Are you sure you want to mark this booking as finished for:{" "}
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
