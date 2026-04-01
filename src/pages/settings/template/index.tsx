import { DefaultLayout } from "@/layouts/DefaultLayout";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { CloseButton } from "@/components/base/buttons/close-button";
import { Input } from "@/components/base/input/input";
import { Select } from "@/components/base/select/select";
import { Badge } from "@/components/base/badges/badges";
import { useStoreSnackbar } from "@/store/snackbar";
import { getMailTemplate, deleteMailTemplate } from "@/utils/services/mailtemplateService";
import { Plus, Edit01, Trash01, Eye, SearchLg, RefreshCw01 } from "@untitledui/icons";
import { useEffect, useMemo, useState, useCallback } from "react";
import { useNavigate } from "react-router";
import { StickyTable, Table, TableCard } from "@/components/application/table/table";
import { PaginationCardDefault } from "@/components/application/pagination/pagination";
import { Dialog, Modal, ModalOverlay } from "@/components/application/modals/modal";
import { useAvailableTableWidth } from "@/hooks/use-available-table-width";
import { useAccess } from "@/hooks/use-access";

export default function TemplateListPage() {
    const availableWidth = useAvailableTableWidth();
    const navigate = useNavigate();
    const { showSnackbar } = useStoreSnackbar();
    const { can } = useAccess();
    const canView = can("template", "view");
    const canAdd = can("template", "add");
    const canEdit = can("template", "edit");
    const canDelete = can("template", "delete");
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<any[]>([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [filters, setFilters] = useState({ title: "", status: "" });
    const [debouncedFilters, setDebouncedFilters] = useState(filters);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState<any>(null);

    const totalPages = Math.max(1, Math.ceil((totalRecords || 0) / limit));
    const getItemId = (item: any) => String(item?.id || item?._id || "");
    const indexById = useMemo(
        () => new Map(data.map((item, index) => [getItemId(item), (page - 1) * limit + index + 1])),
        [data, limit, page],
    );

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedFilters(filters);
            setPage(1);
        }, 500);
        return () => clearTimeout(timer);
    }, [filters]);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            const params = {
                page,
                limit,
                totalCount: true,
                ...(debouncedFilters.title ? { title: debouncedFilters.title } : {}),
                ...(debouncedFilters.status ? { status: debouncedFilters.status } : {}),
            };
            const response = await getMailTemplate(params);
            if (response && !response.error) {
                setData(response.data || []);
                setTotalRecords(response.totalCount || 0);
            } else {
                showSnackbar({ title: "Error", description: response.error || "Failed to fetch templates", color: "danger" });
            }
        } catch (error) {
            console.error("Error fetching templates:", error);
            showSnackbar({ title: "Error", description: "An error occurred while fetching data", color: "danger" });
        } finally {
            setIsLoading(false);
        }
    }, [page, limit, debouncedFilters, showSnackbar]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleDelete = async () => {
        if (!selectedTemplate) return;
        try {
            const response = await deleteMailTemplate(selectedTemplate.id);
            if (response && !response.error) {
                showSnackbar({ title: "Success", description: "Template deleted successfully", color: "success" });
                fetchData();
                setDeleteModalOpen(false);
            } else {
                showSnackbar({ title: "Error", description: response.error || "Failed to delete template", color: "danger" });
            }
        } catch (error) {
            console.error("Error deleting template:", error);
            showSnackbar({ title: "Error", description: "An error occurred while deleting template", color: "danger" });
        }
    };

    const columns = [
        { id: "index", name: "S. No.", isRowHeader: true, widthRatio: 8, minWidth: 64 },
        { id: "title", name: "Title", widthRatio: 46, minWidth: 260 },
        { id: "status", name: "Status", widthRatio: 14, minWidth: 140 },
        { id: "actions", name: "Actions", widthRatio: 14, minWidth: 180 },
    ];

    return (
        <DefaultLayout>
            <div className="space-y-4" style={{ width: availableWidth }}>
                <TableCard.Root className="w-full">
                    <TableCard.Header
                        title="Mail Templates"
                        badge={isLoading ? "..." : totalRecords}
                        description="Manage your email templates here."
                        contentTrailing={
                            <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center">
                                <Select
                                    aria-label="Rows per page"
                                    className="w-full md:w-40"
                                    selectedKey={String(limit)}
                                    onSelectionChange={(key) => {
                                        setLimit(Number(key));
                                        setPage(1);
                                    }}
                                    items={[
                                        { id: "10", label: "10 / page" },
                                        { id: "50", label: "50 / page" },
                                        { id: "100", label: "100 / page" },
                                    ]}
                                >
                                    {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                </Select>
                                <ButtonUtility
                                    icon={RefreshCw01}
                                    color="secondary"
                                    tooltip="Reset"
                                    onClick={() => {
                                        setFilters({ title: "", status: "" });
                                        setDebouncedFilters({ title: "", status: "" });
                                        setPage(1);
                                    }}
                                />
                                <Button color="primary" size="sm" iconLeading={Plus} isDisabled={!canAdd} onClick={() => navigate("/additional-data/settings/template/add")}>
                                    Add Template
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
                            ariaLabel="Templates table"
                            columns={columns}
                            items={data}
                            availableWidth={availableWidth}
                            loading={isLoading}
                            skeletonRows={5}
                            className="min-w-[760px]"
                        >
                            {(item) => (
                                <Table.Row id={getItemId(item)} columns={columns}>
                                    {(column) => (
                                        <Table.Cell className={column.id === "actions" ? "whitespace-nowrap px-2 py-3" : "whitespace-normal break-words px-4 py-3"}>
                                            {column.id === "index" ? (
                                                <span className="text-sm text-tertiary">{indexById.get(getItemId(item)) ?? "—"}</span>
                                            ) : column.id === "title" ? (
                                                <button
                                                    type="button"
                                                    className="text-left text-sm font-semibold text-primary hover:underline"
                                                    disabled={!canView}
                                                    onClick={() => navigate(`/additional-data/settings/template/view/${getItemId(item)}`)}
                                                >
                                                    {item.title || "—"}
                                                </button>
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
                                                        onClick={() => navigate(`/additional-data/settings/template/view/${getItemId(item)}`)}
                                                        color="secondary"
                                                        size="sm"
                                                        isDisabled={!canView}
                                                    />
                                                    <ButtonUtility
                                                        tooltip="Edit"
                                                        tooltipPlacement="bottom"
                                                        icon={Edit01}
                                                        onClick={() => navigate(`/additional-data/settings/template/edit/${getItemId(item)}`)}
                                                        color="secondary"
                                                        size="sm"
                                                        isDisabled={!canEdit}
                                                    />
                                                    <ButtonUtility
                                                        tooltip="Delete"
                                                        tooltipPlacement="bottom"
                                                        icon={Trash01}
                                                        onClick={() => {
                                                            setSelectedTemplate(item);
                                                            setDeleteModalOpen(true);
                                                        }}
                                                        color="secondary"
                                                        size="sm"
                                                        isDisabled={!canDelete}
                                                    />
                                                </div>
                                            )}
                                        </Table.Cell>
                                    )}
                                </Table.Row>
                            )}
                        </StickyTable>
                    </div>
                    <PaginationCardDefault
                        page={page}
                        total={totalPages}
                        onPageChange={(nextPage) => setPage(Math.min(totalPages, Math.max(1, nextPage)))}
                    />
                </TableCard.Root>
            </div>

            <ModalOverlay isOpen={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
                <Modal>
                    <Dialog>
                        {({ close }) => (
                            <div className="relative w-full rounded-xl bg-primary p-5 ring-1 ring-secondary">
                                <CloseButton onPress={close} className="absolute right-4 top-4" size="sm" />
                                <div className="space-y-4">
                                    <div className="space-y-1">
                                        <h2 className="text-lg font-semibold text-primary">Delete Template</h2>
                                        <p className="text-sm text-tertiary">
                                            Are you sure you want to delete "{selectedTemplate?.title}"? This action cannot be undone.
                                        </p>
                                    </div>
                                    <div className="flex justify-end gap-3">
                                        <Button color="secondary" onClick={close}>
                                            Cancel
                                        </Button>
                                        <Button color="primary-destructive" onClick={handleDelete} isDisabled={!canDelete}>
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </Dialog>
                </Modal>
            </ModalOverlay>
        </DefaultLayout>
    );
}
