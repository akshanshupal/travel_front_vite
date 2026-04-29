import { useEffect, useMemo, useState } from "react";
import { DefaultLayout } from "@/layouts/DefaultLayout";
import { PaginationButtonGroup } from "@/components/application/pagination/pagination";
import { StickyTable, Table, TableCard } from "@/components/application/table/table";
import { BadgeWithButton } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Input } from "@/components/base/input/input";
import { Label } from "@/components/base/input/label";
import { Select } from "@/components/base/select/select";
import { SlideoutMenu } from "@/components/application/slideout-menus/slideout-menu";
import { useAvailableTableWidth } from "@/hooks/use-available-table-width";
import { useNavigate } from "react-router";
import { getPhotographyEstimates } from "@/utils/services/photographyEstimateService";
import { getPhotographyClients } from "@/utils/services/photographyClientService";
import { Edit01, Eye, FilterLines, Plus, RefreshCw01, SearchLg } from "@untitledui/icons";

const formatDate = (value: string) => {
    if (!value) return "-";
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return value;
    return `${d.getDate().toString().padStart(2, "0")}-${d.toLocaleString("en-US", { month: "short" })}-${d.getFullYear()}`;
};

export default function PhotographyEstimatePage() {
    const navigate = useNavigate();
    const availableWidth = useAvailableTableWidth();
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState<string | null>(null);
    const [allEstimates, setAllEstimates] = useState<any[]>([]);
    const [clients, setClients] = useState<{ id: string; name: string }[]>([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [refreshTick, setRefreshTick] = useState(0);
    const [filters, setFilters] = useState({ estimateNumber: "", clientId: "" });
    const [tempFilters, setTempFilters] = useState({ estimateNumber: "", clientId: "" });
    const [debouncedFilters, setDebouncedFilters] = useState({ estimateNumber: "", clientId: "" });

    const fetchEstimates = async () => {
        setLoading(true);
        setLoadError(null);
        try {
            const response: any = await getPhotographyEstimates({ limit: "all", totalCount: "true" });
            const resolved = response?.data ?? response;
            const list = Array.isArray(resolved?.data) ? resolved.data : Array.isArray(resolved) ? resolved : [];
            setAllEstimates(list);
        } catch (error: any) {
            setAllEstimates([]);
            setLoadError(error?.error?.message || error?.message || "Failed to load estimates");
        } finally {
            setLoading(false);
        }
    };

    const fetchClients = async () => {
        try {
            const response: any = await getPhotographyClients({ limit: "all" });
            const resolved = response?.data ?? response;
            const list = Array.isArray(resolved?.data) ? resolved.data : Array.isArray(resolved) ? resolved : [];
            setClients(list.map((item: any) => ({ id: String(item.id), name: String(item.name || "") })));
        } catch {
            setClients([]);
        }
    };

    useEffect(() => {
        fetchEstimates();
        fetchClients();
    }, [refreshTick]);

    useEffect(() => {
        const handler = window.setTimeout(() => {
            setDebouncedFilters(filters);
            setPage(1);
        }, 500);
        return () => window.clearTimeout(handler);
    }, [filters]);

    const filteredEstimates = useMemo(() => {
        return allEstimates.filter((estimate) => {
            const estimateNumber = String(estimate?.estimateNumber || "").toLowerCase();
            const clientId = String(estimate?.client?.id || estimate?.client || "");
            const numberMatch = debouncedFilters.estimateNumber
                ? estimateNumber.includes(String(debouncedFilters.estimateNumber).toLowerCase())
                : true;
            const clientMatch = debouncedFilters.clientId ? clientId === debouncedFilters.clientId : true;
            return numberMatch && clientMatch;
        });
    }, [allEstimates, debouncedFilters.clientId, debouncedFilters.estimateNumber]);

    const totalRecords = filteredEstimates.length;
    const totalPages = Math.max(1, Math.ceil((totalRecords || 0) / limit));
    const pagedEstimates = useMemo(() => {
        const start = (page - 1) * limit;
        return filteredEstimates.slice(start, start + limit);
    }, [filteredEstimates, limit, page]);
    const isFilterActive = Boolean(filters.estimateNumber || filters.clientId);
    const indexById = useMemo(
        () => new Map(pagedEstimates.map((item, index) => [item.id, (page - 1) * limit + index + 1])),
        [limit, page, pagedEstimates],
    );

    const columns = [
        { id: "index", name: "#", isRowHeader: true, widthRatio: 6, minWidth: 64 },
        { id: "estimateNumber", name: "Estimate Number", widthRatio: 16, minWidth: 180 },
        { id: "client", name: "Client", widthRatio: 18, minWidth: 200 },
        { id: "estimateDate", name: "Estimate Date", widthRatio: 14, minWidth: 150 },
        { id: "validUntil", name: "Valid Until", widthRatio: 14, minWidth: 150 },
        { id: "grandTotal", name: "Grand Total", widthRatio: 14, minWidth: 150 },
        { id: "actions", name: "Actions", widthRatio: 18, minWidth: 150, className: "pr-4 pl-4 whitespace-nowrap" },
    ] as { id: string; name: string; className?: string; widthRatio?: number; minWidth?: number }[];

    const handleOpenFilters = () => {
        setTempFilters(filters);
    };

    const handleApplyFilters = (close: () => void) => {
        setFilters(tempFilters);
        setPage(1);
        close();
    };

    const handleRemoveFilter = (key: "estimateNumber" | "clientId") => {
        const next = { ...filters, [key]: "" };
        setFilters(next);
        setTempFilters(next);
        setDebouncedFilters(next);
        setPage(1);
    };

    const handleResetFilters = (close?: () => void) => {
        const reset = { estimateNumber: "", clientId: "" };
        setFilters(reset);
        setTempFilters(reset);
        setDebouncedFilters(reset);
        setPage(1);
        if (close) close();
    };

    return (
        <DefaultLayout>
            <div style={{ width: availableWidth }}>
                <TableCard.Root className="w-full">
                    <TableCard.Header
                        title="Photography - Estimates"
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
                                <Button size="sm" color="primary" iconLeading={Plus} onClick={() => navigate("/photography/estimate/add")}>
                                    Add Estimate
                                </Button>
                                <Button size="sm" color="secondary" onClick={() => navigate("/photography/booking")}>
                                    View Bookings
                                </Button>
                            </div>
                        }
                    />

                    <div className="border-b border-secondary bg-primary px-4 py-4 md:px-6">
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-3 justify-between md:flex-row md:items-center">
                                <Input
                                    placeholder="Search by estimate number"
                                    value={tempFilters.estimateNumber}
                                    onChange={(value) => {
                                        setFilters((prev) => ({ ...prev, estimateNumber: String(value) }));
                                        setTempFilters((prev) => ({ ...prev, estimateNumber: String(value) }));
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
                                                    <SlideoutMenu.Header onClose={close}>Filters</SlideoutMenu.Header>
                                                    <div className="flex-1 overflow-y-auto p-6">
                                                        <div className="flex flex-col gap-4">
                                                            <div className="flex flex-col gap-1.5">
                                                                <Label>Client</Label>
                                                                <Select
                                                                    aria-label="Client"
                                                                    value={tempFilters.clientId || "__all__"}
                                                                    onChange={undefined}
                                                                    onSelectionChange={(key) =>
                                                                        setTempFilters((prev) => ({ ...prev, clientId: key === "__all__" ? "" : String(key) }))
                                                                    }
                                                                    items={[{ id: "__all__", label: "All Clients" }, ...clients.map((c) => ({ id: c.id, label: c.name }))]}
                                                                >
                                                                    {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                                                </Select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <SlideoutMenu.Footer>
                                                        <div className="flex gap-3 w-full">
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
                                        onClick={() => {
                                            handleResetFilters();
                                            setRefreshTick((prev) => prev + 1);
                                        }}
                                        color="secondary"
                                        className="px-3"
                                        tooltip="Reset Filters"
                                        isDisabled={!isFilterActive}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {filters.estimateNumber ? (
                                    <BadgeWithButton onButtonClick={() => handleRemoveFilter("estimateNumber")}>
                                        <span className="font-medium text-gray-500 mr-1">Estimate Number:</span>
                                        <span className="font-semibold text-brand-700">{filters.estimateNumber}</span>
                                    </BadgeWithButton>
                                ) : null}
                                {filters.clientId ? (
                                    <BadgeWithButton onButtonClick={() => handleRemoveFilter("clientId")}>
                                        <span className="font-medium text-gray-500 mr-1">Client:</span>
                                        <span className="font-semibold text-brand-700">
                                            {clients.find((item) => item.id === filters.clientId)?.name || filters.clientId}
                                        </span>
                                    </BadgeWithButton>
                                ) : null}
                            </div>
                        </div>
                    </div>

                    {loading ? (
                        <StickyTable
                            ariaLabel="Photography estimates"
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
                        <StickyTable ariaLabel="Photography estimates" columns={columns} items={pagedEstimates} availableWidth={availableWidth} loading={loading}>
                            {(item) => (
                                <Table.Row id={item.id} columns={columns}>
                                    {(column) => (
                                        <Table.Cell className={`${column?.className || ""} ${column.id === "actions" ? "whitespace-nowrap" : ""}`.trim()}>
                                            {column.id === "index" ? (
                                                <span className="text-sm text-tertiary">{indexById.get(item.id) ?? "-"}</span>
                                            ) : column.id === "estimateNumber" ? (
                                                <button
                                                    type="button"
                                                    onClick={() => navigate(`/photography/estimate/view/${item.id}`)}
                                                    className="text-left text-sm font-semibold text-primary hover:underline"
                                                >
                                                    {item.estimateNumber || "-"}
                                                </button>
                                            ) : column.id === "client" ? (
                                                <span className="text-sm text-tertiary">{item?.client?.name || "-"}</span>
                                            ) : column.id === "estimateDate" ? (
                                                <span className="text-sm text-tertiary">{formatDate(item.estimateDate)}</span>
                                            ) : column.id === "validUntil" ? (
                                                <span className="text-sm text-tertiary">{formatDate(item.validUntil)}</span>
                                            ) : column.id === "grandTotal" ? (
                                                <span className="text-sm text-tertiary">{Number(item?.grandTotal || 0).toFixed(2)}</span>
                                            ) : (
                                                <div className="flex w-full items-center justify-end gap-1.5">
                                                    {item?.booking ? (
                                                        <ButtonUtility
                                                            tooltip="View Booking"
                                                            tooltipPlacement="bottom"
                                                            icon={Eye}
                                                            onClick={() => navigate(`/photography/booking/view/${item?.booking?.id || item?.booking}`)}
                                                            color="brand"
                                                        />
                                                    ) : (
                                                        <ButtonUtility
                                                            tooltip="Convert To Booking"
                                                            tooltipPlacement="bottom"
                                                            icon={Plus}
                                                            onClick={() => navigate(`/photography/bookings/add?estimate=${encodeURIComponent(String(item.id || ""))}`)}
                                                            color="success"
                                                        />
                                                    )}
                                                    <ButtonUtility
                                                        tooltip="View"
                                                        tooltipPlacement="bottom"
                                                        icon={Eye}
                                                        onClick={() => navigate(`/photography/estimate/view/${item.id}`)}
                                                        color="brand"
                                                    />
                                                    <ButtonUtility
                                                        tooltip="Edit"
                                                        tooltipPlacement="bottom"
                                                        icon={Edit01}
                                                        onClick={() => navigate(`/photography/estimate/edit/${item.id}`)}
                                                        color="warning"
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
