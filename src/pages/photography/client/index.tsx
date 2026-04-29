import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { DefaultLayout } from "@/layouts/DefaultLayout";
import { Button } from "@/components/base/buttons/button";
import { PaginationButtonGroup } from "@/components/application/pagination/pagination";
import { StickyTable, Table, TableCard } from "@/components/application/table/table";
import { Input } from "@/components/base/input/input";
import { Select } from "@/components/base/select/select";
import { SlideoutMenu } from "@/components/application/slideout-menus/slideout-menu";
import { Label } from "@/components/base/input/label";
import { BadgeWithButton } from "@/components/base/badges/badges";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { useAvailableTableWidth } from "@/hooks/use-available-table-width";
import { getPhotographyClients } from "@/utils/services/photographyClientService";
import { Edit01, Eye, FilterLines, Plus, RefreshCw01, SearchLg } from "@untitledui/icons";

type PhotographyClient = {
    id: string;
    name: string;
    phone: string;
    whatsappNumber: string;
    email: string;
    address: string;
};

export default function PhotographyClientPage() {
    const navigate = useNavigate();
    const availableWidth = useAvailableTableWidth();
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState<string | null>(null);
    const [clients, setClients] = useState<PhotographyClient[]>([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [refreshTick, setRefreshTick] = useState(0);
    const [filters, setFilters] = useState({ name: "", phone: "", whatsappNumber: "", email: "" });
    const [tempFilters, setTempFilters] = useState({ name: "", phone: "", whatsappNumber: "", email: "" });
    const [debouncedFilters, setDebouncedFilters] = useState({ name: "", phone: "", whatsappNumber: "", email: "" });

    const fetchClients = async () => {
        setLoading(true);
        setLoadError(null);
        try {
            const response: any = await getPhotographyClients({ limit: "all", totalCount: "true" });
            const resolved = response?.data ?? response;
            const list = Array.isArray(resolved?.data) ? resolved.data : Array.isArray(resolved) ? resolved : [];
            setClients(list);
        } catch (error: any) {
            setClients([]);
            setLoadError(error?.error?.message || error?.message || "Failed to load clients");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClients();
    }, [refreshTick]);

    useEffect(() => {
        const handler = window.setTimeout(() => {
            setDebouncedFilters(filters);
            setPage(1);
        }, 500);
        return () => window.clearTimeout(handler);
    }, [filters]);

    const filteredClients = useMemo(
        () =>
            clients.filter((client) => {
                const nameMatch = debouncedFilters.name
                    ? String(client?.name || "")
                          .toLowerCase()
                          .includes(debouncedFilters.name.toLowerCase())
                    : true;
                const phoneMatch = debouncedFilters.phone ? String(client?.phone || "").includes(debouncedFilters.phone) : true;
                const whatsappMatch = debouncedFilters.whatsappNumber
                    ? String(client?.whatsappNumber || "").includes(debouncedFilters.whatsappNumber)
                    : true;
                const emailMatch = debouncedFilters.email
                    ? String(client?.email || "").toLowerCase().includes(debouncedFilters.email.toLowerCase())
                    : true;
                return nameMatch && phoneMatch && whatsappMatch && emailMatch;
            }),
        [clients, debouncedFilters.name, debouncedFilters.phone, debouncedFilters.whatsappNumber, debouncedFilters.email],
    );

    const totalRecords = filteredClients.length;
    const totalPages = Math.max(1, Math.ceil((totalRecords || 0) / limit));
    const pagedClients = useMemo(() => {
        const start = (page - 1) * limit;
        return filteredClients.slice(start, start + limit);
    }, [filteredClients, limit, page]);
    const indexById = useMemo(
        () => new Map(pagedClients.map((item, index) => [item.id, (page - 1) * limit + index + 1])),
        [limit, page, pagedClients],
    );
    const isFilterActive = Boolean(filters.name || filters.phone || filters.whatsappNumber || filters.email);

    const columns = [
        { id: "index", name: "#", isRowHeader: true, widthRatio: 8, minWidth: 64 },
        { id: "name", name: "Name", widthRatio: 24, minWidth: 180 },
        { id: "phone", name: "Phone", widthRatio: 16, minWidth: 150 },
        { id: "whatsappNumber", name: "WhatsApp", widthRatio: 16, minWidth: 150 },
        { id: "email", name: "Email", widthRatio: 20, minWidth: 200 },
        { id: "address", name: "Address", widthRatio: 24, minWidth: 240 },
        { id: "actions", name: "Actions", widthRatio: 12, minWidth: 150, className: "pr-4 pl-4 whitespace-nowrap" },
    ] as { id: string; name: string; className?: string; widthRatio?: number; minWidth?: number }[];

    const handleOpenFilters = () => setTempFilters(filters);
    const handleApplyFilters = (close: () => void) => {
        setFilters(tempFilters);
        setPage(1);
        close();
    };
    const handleResetFilters = (close?: () => void) => {
        const reset = { name: "", phone: "", whatsappNumber: "", email: "" };
        setFilters(reset);
        setTempFilters(reset);
        setDebouncedFilters(reset);
        setPage(1);
        if (close) close();
    };
    const handleRemoveFilter = (key: "name" | "phone" | "whatsappNumber" | "email") => {
        const next = { ...filters, [key]: "" };
        setFilters(next);
        setTempFilters(next);
        setDebouncedFilters(next);
        setPage(1);
    };

    return (
        <DefaultLayout>
            <div style={{ width: availableWidth }}>
                <TableCard.Root className="w-full">
                    <TableCard.Header
                        title="Photography - Clients"
                        badge={loading ? "..." : totalRecords}
                        contentTrailing={
                            <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center">
                                <Select
                                    aria-label="Rows per page"
                                    className="w-full md:w-40"
                                    value={String(limit)}
                                    onChange={(value) => {
                                        const next = Number(value);
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
                                <Button size="sm" color="primary" iconLeading={Plus} onClick={() => navigate("/photography/client/add")}>
                                    Add Client
                                </Button>
                            </div>
                        }
                    />

                    <div className="border-b border-secondary bg-primary px-4 py-4 md:px-6">
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-3 justify-between md:flex-row md:items-center">
                                <Input
                                    placeholder="Search by name"
                                    value={tempFilters.name}
                                    onChange={(value) => {
                                        setFilters((prev) => ({ ...prev, name: String(value) }));
                                        setTempFilters((prev) => ({ ...prev, name: String(value) }));
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
                                                                <Label>Phone</Label>
                                                                <Input
                                                                    value={tempFilters.phone}
                                                                    onChange={(value) => setTempFilters((prev) => ({ ...prev, phone: String(value) }))}
                                                                    placeholder="Search by phone"
                                                                />
                                                            </div>
                                                            <div className="flex flex-col gap-1.5">
                                                                <Label>WhatsApp Number</Label>
                                                                <Input
                                                                    value={tempFilters.whatsappNumber}
                                                                    onChange={(value) => setTempFilters((prev) => ({ ...prev, whatsappNumber: String(value) }))}
                                                                    placeholder="Search by WhatsApp number"
                                                                />
                                                            </div>
                                                            <div className="flex flex-col gap-1.5">
                                                                <Label>Email</Label>
                                                                <Input
                                                                    value={tempFilters.email}
                                                                    onChange={(value) => setTempFilters((prev) => ({ ...prev, email: String(value) }))}
                                                                    placeholder="Search by email"
                                                                />
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
                                {filters.name ? (
                                    <BadgeWithButton onButtonClick={() => handleRemoveFilter("name")}>
                                        <span className="font-medium text-gray-500 mr-1">Name:</span>
                                        <span className="font-semibold text-brand-700">{filters.name}</span>
                                    </BadgeWithButton>
                                ) : null}
                                {filters.phone ? (
                                    <BadgeWithButton onButtonClick={() => handleRemoveFilter("phone")}>
                                        <span className="font-medium text-gray-500 mr-1">Phone:</span>
                                        <span className="font-semibold text-brand-700">{filters.phone}</span>
                                    </BadgeWithButton>
                                ) : null}
                                {filters.whatsappNumber ? (
                                    <BadgeWithButton onButtonClick={() => handleRemoveFilter("whatsappNumber")}>
                                        <span className="font-medium text-gray-500 mr-1">WhatsApp:</span>
                                        <span className="font-semibold text-brand-700">{filters.whatsappNumber}</span>
                                    </BadgeWithButton>
                                ) : null}
                                {filters.email ? (
                                    <BadgeWithButton onButtonClick={() => handleRemoveFilter("email")}>
                                        <span className="font-medium text-gray-500 mr-1">Email:</span>
                                        <span className="font-semibold text-brand-700">{filters.email}</span>
                                    </BadgeWithButton>
                                ) : null}
                            </div>
                        </div>
                    </div>

                    {loading ? (
                        <StickyTable
                            ariaLabel="Photography clients"
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
                        <StickyTable ariaLabel="Photography clients" columns={columns} items={pagedClients} availableWidth={availableWidth} loading={loading}>
                            {(item) => (
                                <Table.Row id={item.id} columns={columns}>
                                    {(column) => (
                                        <Table.Cell className={`${column?.className || ""} ${column.id === "actions" ? "whitespace-nowrap" : ""}`.trim()}>
                                            {column.id === "index" ? (
                                                <span className="text-sm text-tertiary">{indexById.get(item.id) ?? "-"}</span>
                                            ) : column.id === "name" ? (
                                                <button
                                                    type="button"
                                                    onClick={() => navigate(`/photography/client/view/${item.id}`)}
                                                    className="text-left text-sm font-semibold text-primary hover:underline"
                                                >
                                                    {item.name || "-"}
                                                </button>
                                            ) : column.id === "phone" ? (
                                                <span className="text-sm text-tertiary">{item.phone || "-"}</span>
                                            ) : column.id === "whatsappNumber" ? (
                                                <span className="text-sm text-tertiary">{item.whatsappNumber || "-"}</span>
                                            ) : column.id === "email" ? (
                                                <span className="text-sm text-tertiary">{item.email || "-"}</span>
                                            ) : column.id === "address" ? (
                                                <span className="text-sm text-tertiary">{item.address || "-"}</span>
                                            ) : (
                                                <div className="flex w-full items-center justify-end gap-1.5">
                                                    <ButtonUtility
                                                        tooltip="View"
                                                        tooltipPlacement="bottom"
                                                        icon={Eye}
                                                        onClick={() => navigate(`/photography/client/view/${item.id}`)}
                                                        color="brand"
                                                    />
                                                    <ButtonUtility
                                                        tooltip="Edit"
                                                        tooltipPlacement="bottom"
                                                        icon={Edit01}
                                                        onClick={() => navigate(`/photography/client/edit/${item.id}`)}
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
