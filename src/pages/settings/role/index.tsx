import { DefaultLayout } from "@/layouts/DefaultLayout";
import { PaginationButtonGroup } from "@/components/application/pagination/pagination";
import { StickyTable, Table, TableCard } from "@/components/application/table/table";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Input } from "@/components/base/input/input";
import { Select } from "@/components/base/select/select";
import { useAvailableTableWidth } from "@/hooks/use-available-table-width";
import { useAccess } from "@/hooks/use-access";
import { useStoreSnackbar } from "@/store/snackbar";
import { fetchWithToken } from "@/utils/fetchApi";
import { Edit01, Eye, Plus, RefreshCw01, SearchLg } from "@untitledui/icons";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

const columns = [
    { id: "index", name: "S. No.", isRowHeader: true, widthRatio: 8, minWidth: 64 },
    { id: "title", name: "Title", widthRatio: 44, minWidth: 240 },
    { id: "status", name: "Status", widthRatio: 14, minWidth: 140 },
    { id: "actions", name: "Actions", widthRatio: 14, minWidth: 160 },
];

const statusToLabel = (status: any) => {
    if (status === true || status === "true" || status === 1 || status === "1") return "Active";
    if (status === false || status === "false" || status === 0 || status === "0") return "Inactive";
    return "—";
};

export default function SettingsRoleListPage() {
    const availableWidth = useAvailableTableWidth();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const showSnackbar = useStoreSnackbar((s) => s.showSnackbar);
    const { can } = useAccess();

    const canView = can("role", "view");
    const canAdd = can("role", "add");
    const canEdit = can("role", "edit");

    const page = Number(searchParams.get("page") || "1");
    const limit = Number(searchParams.get("limit") || "10");

    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState<any[]>([]);
    const [totalRecords, setTotalRecords] = useState(0);

    const [filters, setFilters] = useState({
        title: searchParams.get("title") || "",
        status: searchParams.get("status") || "",
    });
    const [debouncedFilters, setDebouncedFilters] = useState(filters);

    const totalPages = Math.max(1, Math.ceil((totalRecords || 0) / limit));
    const getItemId = (item: any) => String(item?.id || item?._id || "");
    const indexById = useMemo(
        () => new Map(items.map((item, index) => [getItemId(item), (page - 1) * limit + index + 1])),
        [items, limit, page],
    );

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedFilters(filters), 500);
        return () => clearTimeout(handler);
    }, [filters]);

    useEffect(() => {
        const params: Record<string, string> = {
            page: String(page),
            limit: String(limit),
            ...debouncedFilters,
        };
        Object.keys(params).forEach((key) => {
            if (params[key] === "") delete params[key];
        });
        setSearchParams(params);
    }, [page, limit, debouncedFilters, setSearchParams]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const qs = new URLSearchParams();
                qs.set("totalCount", "true");
                qs.set("page", String(page));
                qs.set("limit", String(limit));
                qs.set("select", "title,status,permissions");
                if (debouncedFilters.title) qs.set("title", debouncedFilters.title);
                if (debouncedFilters.status) qs.set("status", debouncedFilters.status);
                const response: any = await fetchWithToken(`/api/role?${qs.toString()}`, undefined, { method: "GET" });
                if (response?.error) throw new Error(response.error);
                setItems(response?.data || []);
                setTotalRecords(response?.totalCount || 0);
            } catch (e: any) {
                showSnackbar({ title: "Error", description: e?.message || "Failed to fetch roles", color: "danger" });
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [debouncedFilters, limit, page, showSnackbar]);

    return (
        <DefaultLayout>
            <div className="space-y-4" style={{ width: availableWidth }}>
                <TableCard.Root className="w-full">
                    <TableCard.Header
                        title="Role List"
                        badge={loading ? "..." : totalRecords}
                        contentTrailing={
                            <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center">
                                <Select
                                    aria-label="Rows per page"
                                    className="w-full md:w-40"
                                    selectedKey={String(limit)}
                                    onSelectionChange={(key) => {
                                        const value = Number(key);
                                        setSearchParams((prev) => {
                                            const next = new URLSearchParams(prev);
                                            next.set("limit", String(value));
                                            next.set("page", "1");
                                            return next;
                                        });
                                    }}
                                    items={[
                                        { id: "10", label: "10 / page" },
                                        { id: "25", label: "25 / page" },
                                        { id: "50", label: "50 / page" },
                                    ]}
                                >
                                    {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                </Select>
                                <ButtonUtility
                                    icon={RefreshCw01}
                                    onClick={() => {
                                        setFilters({ title: "", status: "" });
                                        setDebouncedFilters({ title: "", status: "" });
                                        setSearchParams((prev) => {
                                            const next = new URLSearchParams(prev);
                                            next.set("page", "1");
                                            next.delete("title");
                                            next.delete("status");
                                            return next;
                                        });
                                    }}
                                    color="secondary"
                                    className="px-3"
                                    tooltip="Reset"
                                />
                                <Button
                                    size="sm"
                                    color="primary"
                                    iconLeading={Plus}
                                    isDisabled={!canAdd}
                                    onClick={() => navigate("/settings/role/add")}
                                >
                                    Add Role
                                </Button>
                            </div>
                        }
                    />

                    <div className="flex flex-col gap-4 border-b border-secondary bg-primary px-4 py-4 md:px-6">
                        <div className="flex flex-col gap-3 justify-between md:flex-row md:items-center">
                            <Input
                                placeholder="Search by title"
                                value={filters.title}
                                onChange={(value) => setFilters((prev) => ({ ...prev, title: value }))}
                                icon={SearchLg}
                                className="w-full md:w-96"
                            />
                            <Select
                                aria-label="Status"
                                className="w-full md:w-48"
                                selectedKey={filters.status || "__all__"}
                                onSelectionChange={(key) => setFilters((prev) => ({ ...prev, status: key === "__all__" ? "" : String(key) }))}
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

                    <div className="w-full max-w-full">
                        <StickyTable
                            ariaLabel="Role list"
                            columns={columns}
                            items={items}
                            availableWidth={availableWidth}
                            loading={loading}
                            skeletonRows={5}
                            className="min-w-[760px]"
                        >
                            {(item) => (
                                <Table.Row id={getItemId(item)} columns={columns}>
                                    {(column) => (
                                        <Table.Cell className={column.id === "actions" ? "whitespace-nowrap" : "whitespace-nowrap px-4 py-3"}>
                                            {column.id === "index" ? (
                                                <span className="text-sm text-tertiary">{indexById.get(getItemId(item)) ?? "—"}</span>
                                            ) : column.id === "title" ? (
                                                canView ? (
                                                    <button
                                                        type="button"
                                                        onClick={() => navigate(`/settings/role/view/${getItemId(item)}`)}
                                                        className="text-left text-sm font-semibold text-primary hover:underline"
                                                    >
                                                        {item?.title || "—"}
                                                    </button>
                                                ) : (
                                                    <span className="text-sm font-semibold text-primary">{item?.title || "—"}</span>
                                                )
                                            ) : column.id === "status" ? (
                                                <Badge size="sm" color={item?.status ? "success" : "error"}>
                                                    {statusToLabel(item?.status)}
                                                </Badge>
                                            ) : (
                                                <div className="flex w-full items-center justify-end gap-1.5">
                                                    <ButtonUtility
                                                        tooltip="View"
                                                        tooltipPlacement="bottom"
                                                        icon={Eye}
                                                        onClick={() => navigate(`/settings/role/view/${getItemId(item)}`)}
                                                        color="secondary"
                                                        size="sm"
                                                        isDisabled={!canView}
                                                    />
                                                    <ButtonUtility
                                                        tooltip="Edit"
                                                        tooltipPlacement="bottom"
                                                        icon={Edit01}
                                                        onClick={() => navigate(`/settings/role/edit/${getItemId(item)}`)}
                                                        color="secondary"
                                                        size="sm"
                                                        isDisabled={!canEdit}
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
                        total={totalPages}
                        onPageChange={(nextPage: number) =>
                            setSearchParams((prev) => {
                                const next = new URLSearchParams(prev);
                                next.set("page", String(nextPage));
                                return next;
                            })
                        }
                        align="center"
                        className="py-4"
                    />
                </TableCard.Root>
            </div>
        </DefaultLayout>
    );
}
