import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { DefaultLayout } from "@/layouts/DefaultLayout";
import { PaginationButtonGroup } from "@/components/application/pagination/pagination";
import { StickyTable, Table, TableCard } from "@/components/application/table/table";
import { Input } from "@/components/base/input/input";
import { Select } from "@/components/base/select/select";
import { SlideoutMenu } from "@/components/application/slideout-menus/slideout-menu";
import { Label } from "@/components/base/input/label";
import { BadgeWithButton } from "@/components/base/badges/badges";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Button } from "@/components/base/buttons/button";
import { useAvailableTableWidth } from "@/hooks/use-available-table-width";
import {
    loadPhotographyTemplates,
} from "@/pages/photography/shared/templates";
import { Edit01, Eye, FilterLines, Plus, RefreshCw01, SearchLg } from "@untitledui/icons";

export default function PhotographyTemplatePage() {
    const navigate = useNavigate();
    const availableWidth = useAvailableTableWidth();
    const templates = useMemo(() => loadPhotographyTemplates(), []);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [filters, setFilters] = useState({ name: "", mainEventName: "" });
    const [tempFilters, setTempFilters] = useState({ name: "", mainEventName: "" });
    const [debouncedFilters, setDebouncedFilters] = useState({ name: "", mainEventName: "" });

    useEffect(() => {
        const handler = window.setTimeout(() => {
            setDebouncedFilters(filters);
            setPage(1);
        }, 500);
        return () => window.clearTimeout(handler);
    }, [filters]);

    const filteredTemplates = useMemo(
        () =>
            templates.filter((template) => {
                const nameMatch = debouncedFilters.name
                    ? String(template?.name || "")
                          .toLowerCase()
                          .includes(debouncedFilters.name.toLowerCase())
                    : true;
                const eventMatch = debouncedFilters.mainEventName
                    ? String(template?.mainEventName || "")
                          .toLowerCase()
                          .includes(debouncedFilters.mainEventName.toLowerCase())
                    : true;
                return nameMatch && eventMatch;
            }),
        [debouncedFilters.mainEventName, debouncedFilters.name, templates],
    );

    const totalRecords = filteredTemplates.length;
    const totalPages = Math.max(1, Math.ceil((totalRecords || 0) / limit));
    const pagedTemplates = useMemo(() => {
        const start = (page - 1) * limit;
        return filteredTemplates.slice(start, start + limit);
    }, [filteredTemplates, limit, page]);
    const isFilterActive = Boolean(filters.name || filters.mainEventName);
    const indexById = useMemo(
        () => new Map(pagedTemplates.map((item, index) => [item.id, (page - 1) * limit + index + 1])),
        [limit, page, pagedTemplates],
    );

    const columns = [
        { id: "index", name: "#", isRowHeader: true, widthRatio: 8, minWidth: 64 },
        { id: "name", name: "Template", widthRatio: 24, minWidth: 180 },
        { id: "mainEventName", name: "Main Event", widthRatio: 30, minWidth: 220 },
        { id: "deliverables", name: "Deliverables", widthRatio: 20, minWidth: 140 },
        { id: "actions", name: "Actions", widthRatio: 18, minWidth: 150, className: "pr-4 pl-4 whitespace-nowrap" },
    ] as { id: string; name: string; className?: string; widthRatio?: number; minWidth?: number }[];

    const handleOpenFilters = () => setTempFilters(filters);
    const handleApplyFilters = (close: () => void) => {
        setFilters(tempFilters);
        setDebouncedFilters(tempFilters);
        setPage(1);
        close();
    };
    const handleResetFilters = (close?: () => void) => {
        const reset = { name: "", mainEventName: "" };
        setFilters(reset);
        setTempFilters(reset);
        setDebouncedFilters(reset);
        setPage(1);
        if (close) close();
    };
    const handleRemoveFilter = (key: "name" | "mainEventName") => {
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
                        title="Photography - Templates"
                        badge={totalRecords}
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
                                <Button size="sm" color="primary" iconLeading={Plus} onClick={() => navigate("/photography/template/add")}>
                                    Add Template
                                </Button>
                            </div>
                        }
                    />

                    <div className="border-b border-secondary bg-primary px-4 py-4 md:px-6">
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-3 justify-between md:flex-row md:items-center">
                                <Input
                                    placeholder="Search by template name"
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
                                                                <Label>Main Event</Label>
                                                                <Input
                                                                    value={tempFilters.mainEventName}
                                                                    onChange={(value) =>
                                                                        setTempFilters((prev) => ({ ...prev, mainEventName: String(value) }))
                                                                    }
                                                                    placeholder="Search by main event"
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
                                        onClick={() => handleResetFilters()}
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
                                        <span className="font-medium text-gray-500 mr-1">Template:</span>
                                        <span className="font-semibold text-brand-700">{filters.name}</span>
                                    </BadgeWithButton>
                                ) : null}
                                {filters.mainEventName ? (
                                    <BadgeWithButton onButtonClick={() => handleRemoveFilter("mainEventName")}>
                                        <span className="font-medium text-gray-500 mr-1">Main Event:</span>
                                        <span className="font-semibold text-brand-700">{filters.mainEventName}</span>
                                    </BadgeWithButton>
                                ) : null}
                            </div>
                        </div>
                    </div>

                    <StickyTable ariaLabel="Photography templates" columns={columns} items={pagedTemplates} availableWidth={availableWidth} loading={false}>
                        {(item) => (
                            <Table.Row id={item.id} columns={columns}>
                                {(column) => (
                                    <Table.Cell className={`${column?.className || ""} ${column.id === "actions" ? "whitespace-nowrap" : ""}`.trim()}>
                                        {column.id === "index" ? (
                                            <span className="text-sm text-tertiary">{indexById.get(item.id) ?? "-"}</span>
                                        ) : column.id === "name" ? (
                                            <button
                                                type="button"
                                                onClick={() => navigate(`/photography/template/view/${item.id}`)}
                                                className="text-left text-sm font-semibold text-primary hover:underline"
                                            >
                                                {item.name || "-"}
                                            </button>
                                        ) : column.id === "mainEventName" ? (
                                            <span className="text-sm text-tertiary">{item.mainEventName || "-"}</span>
                                        ) : column.id === "deliverables" ? (
                                            <span className="text-sm text-tertiary">{Array.isArray(item.deliverables) ? item.deliverables.length : 0}</span>
                                        ) : (
                                            <div className="flex w-full items-center justify-end gap-1.5">
                                                <ButtonUtility
                                                    tooltip="View"
                                                    tooltipPlacement="bottom"
                                                    icon={Eye}
                                                    onClick={() => navigate(`/photography/template/view/${item.id}`)}
                                                    color="brand"
                                                />
                                                <ButtonUtility
                                                    tooltip="Edit"
                                                    tooltipPlacement="bottom"
                                                    icon={Edit01}
                                                    onClick={() => navigate(`/photography/template/edit/${item.id}`)}
                                                    color="warning"
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
                    />
                </TableCard.Root>
            </div>
        </DefaultLayout>
    );
}
