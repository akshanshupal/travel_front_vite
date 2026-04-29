import { useEffect, useMemo, useState } from "react";
import { DefaultLayout } from "@/layouts/DefaultLayout";
import { PaginationButtonGroup } from "@/components/application/pagination/pagination";
import { StickyTable, Table, TableCard } from "@/components/application/table/table";
import { BadgeWithButton } from "@/components/base/badges/badges";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Input } from "@/components/base/input/input";
import { Button } from "@/components/base/buttons/button";
import { useAvailableTableWidth } from "@/hooks/use-available-table-width";
import { useNavigate } from "react-router";
import { getPhotographyBookings } from "@/utils/services/photographyBookingService";
import { Eye, RefreshCw01, SearchLg } from "@untitledui/icons";

const formatDate = (value: string) => {
    if (!value) return "-";
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return value;
    return `${d.getDate().toString().padStart(2, "0")}-${d.toLocaleString("en-US", { month: "short" })}-${d.getFullYear()}`;
};

export default function PhotographyBookingPage() {
    const navigate = useNavigate();
    const availableWidth = useAvailableTableWidth();
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState<string | null>(null);
    const [allBookings, setAllBookings] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [refreshTick, setRefreshTick] = useState(0);
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    useEffect(() => {
        const timer = window.setTimeout(() => {
            setDebouncedSearch(search);
            setPage(1);
        }, 400);
        return () => window.clearTimeout(timer);
    }, [search]);

    const fetchBookings = async () => {
        setLoading(true);
        setLoadError(null);
        try {
            const response: any = await getPhotographyBookings({ limit: "all", totalCount: "true" });
            const resolved = response?.data ?? response;
            const list = Array.isArray(resolved?.data) ? resolved.data : Array.isArray(resolved) ? resolved : [];
            setAllBookings(list);
        } catch (error: any) {
            setAllBookings([]);
            setLoadError(error?.error?.message || error?.message || "Failed to load bookings");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, [refreshTick]);

    const filteredBookings = useMemo(() => {
        const q = String(debouncedSearch || "").toLowerCase().trim();
        if (!q) return allBookings;
        return allBookings.filter((item) => {
            const bookingNumber = String(item?.bookingNumber || "").toLowerCase();
            const estimateNumber = String(item?.estimate?.estimateNumber || "").toLowerCase();
            const clientName = String(item?.client?.name || "").toLowerCase();
            return bookingNumber.includes(q) || estimateNumber.includes(q) || clientName.includes(q);
        });
    }, [allBookings, debouncedSearch]);

    const totalRecords = filteredBookings.length;
    const totalPages = Math.max(1, Math.ceil(totalRecords / limit));
    const pagedBookings = useMemo(() => {
        const start = (page - 1) * limit;
        return filteredBookings.slice(start, start + limit);
    }, [filteredBookings, limit, page]);

    const columns = [
        { id: "bookingNumber", name: "Booking Number", widthRatio: 18, minWidth: 170 },
        { id: "estimate", name: "Estimate", widthRatio: 16, minWidth: 160 },
        { id: "client", name: "Client", widthRatio: 18, minWidth: 180 },
        { id: "createdAt", name: "Created At", widthRatio: 14, minWidth: 140 },
        { id: "totalAmount", name: "Total", widthRatio: 12, minWidth: 120 },
        { id: "pendingAmount", name: "Pending", widthRatio: 12, minWidth: 120 },
        { id: "actions", name: "Actions", widthRatio: 10, minWidth: 90, className: "pr-4 pl-4 whitespace-nowrap" },
    ] as { id: string; name: string; className?: string; widthRatio?: number; minWidth?: number }[];

    return (
        <DefaultLayout>
            <div style={{ width: availableWidth }}>
                <TableCard.Root className="w-full">
                    <TableCard.Header
                        title="Photography - Bookings"
                        badge={loading ? "..." : totalRecords}
                        contentTrailing={
                            <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center">
                                <Button color="secondary" onClick={() => navigate("/photography/estimate")}>
                                    Go To Estimates
                                </Button>
                            </div>
                        }
                    />
                    <div className="border-b border-secondary bg-primary px-4 py-4 md:px-6">
                        <div className="flex flex-col gap-3 justify-between md:flex-row md:items-center">
                            <Input
                                placeholder="Search booking, estimate, client"
                                value={search}
                                onChange={(value) => setSearch(String(value))}
                                icon={SearchLg}
                                className="w-full md:w-80"
                            />
                            <ButtonUtility
                                icon={RefreshCw01}
                                onClick={() => {
                                    setSearch("");
                                    setDebouncedSearch("");
                                    setRefreshTick((prev) => prev + 1);
                                }}
                                color="secondary"
                                className="px-3"
                                tooltip="Refresh"
                            />
                        </div>
                        {debouncedSearch ? (
                            <div className="mt-3">
                                <BadgeWithButton onButtonClick={() => setSearch("")}>
                                    <span className="font-medium text-gray-500 mr-1">Search:</span>
                                    <span className="font-semibold text-brand-700">{debouncedSearch}</span>
                                </BadgeWithButton>
                            </div>
                        ) : null}
                    </div>
                    {loading ? (
                        <StickyTable
                            ariaLabel="Photography bookings"
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
                        <StickyTable ariaLabel="Photography bookings" columns={columns} items={pagedBookings} availableWidth={availableWidth} loading={loading}>
                            {(item) => (
                                <Table.Row id={item.id} columns={columns}>
                                    {(column) => (
                                        <Table.Cell className={`${column?.className || ""} ${column.id === "actions" ? "whitespace-nowrap" : ""}`.trim()}>
                                            {column.id === "bookingNumber" ? (
                                                <span className="text-sm font-semibold text-primary">{item?.bookingNumber || "-"}</span>
                                            ) : column.id === "estimate" ? (
                                                <span className="text-sm text-tertiary">{item?.estimate?.estimateNumber || "-"}</span>
                                            ) : column.id === "client" ? (
                                                <span className="text-sm text-tertiary">{item?.client?.name || "-"}</span>
                                            ) : column.id === "createdAt" ? (
                                                <span className="text-sm text-tertiary">{formatDate(item?.createdAt)}</span>
                                            ) : column.id === "totalAmount" ? (
                                                <span className="text-sm text-tertiary">{Number(item?.totalAmount || 0).toFixed(2)}</span>
                                            ) : column.id === "pendingAmount" ? (
                                                <span className="text-sm text-tertiary">{Number(item?.pendingAmount || 0).toFixed(2)}</span>
                                            ) : (
                                                <div className="flex w-full items-center justify-end gap-1.5">
                                                    <ButtonUtility
                                                        tooltip="View"
                                                        tooltipPlacement="bottom"
                                                        icon={Eye}
                                                        onClick={() => navigate(`/photography/booking/view/${item.id}`)}
                                                        color="brand"
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
                        align="center"
                        onPageChange={(nextPage) => setPage(Math.min(totalPages, Math.max(1, nextPage)))}
                    />
                </TableCard.Root>
            </div>
        </DefaultLayout>
    );
}
