import { DefaultLayout } from "@/layouts/DefaultLayout";
import { StickyTable, Table, TableCard } from "@/components/application/table/table";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { CloseButton } from "@/components/base/buttons/close-button";
import { Select } from "@/components/base/select/select";
import { PaginationButtonGroup } from "@/components/application/pagination/pagination";
import { Dialog, Modal, ModalOverlay } from "@/components/application/modals/modal";
import { Badge } from "@/components/base/badges/badges";
import { useAvailableTableWidth } from "@/hooks/use-available-table-width";
import { useStoreSnackbar } from "@/store/snackbar";
import { getContactProperties, deleteContactProperty } from "@/utils/services/contactPropertiesService";
import { Edit01, Plus, Trash01 } from "@untitledui/icons";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router";

type ContactProperty = {
    id: string;
    title?: string;
    dataType?: { type?: string; key?: string; value?: string };
    status?: boolean | string;
};

const asArray = (v: any) => (Array.isArray(v) ? v : []);
const getId = (v: any) => String(v?.id ?? v?._id ?? v ?? "").trim();

const dataTypeLabel = (dt: ContactProperty["dataType"]) => {
    if (!dt) return "—";
    return dt.type || dt.key || "—";
};

export default function ContactPropertiesPage() {
    const navigate = useNavigate();
    const availableWidth = useAvailableTableWidth();

    const [items, setItems] = useState<ContactProperty[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState<string | null>(null);
    const [totalRecords, setTotalRecords] = useState(0);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    const [deleteTarget, setDeleteTarget] = useState<{ id: string; title?: string } | null>(null);
    const deletingRef = useRef(false);

    const totalPages = Math.max(1, Math.ceil(totalRecords / limit));
    const indexById = useMemo(() => new Map(items.map((item, i) => [item.id, (page - 1) * limit + i + 1])), [items, limit, page]);

    useEffect(() => {
        const run = async () => {
            setLoading(true);
            setLoadError(null);
            try {
                const res = await getContactProperties({ totalCount: "true", page: String(page), limit: String(limit) });
                const resolved = (res as any)?.data ?? res;
                const list = Array.isArray(resolved?.data) ? resolved.data : Array.isArray(resolved) ? resolved : asArray(resolved?.items);
                const normalized = asArray(list).map((it: any) => { const id = getId(it); if (!id) return null; return { ...it, id } as ContactProperty; }).filter(Boolean) as ContactProperty[];
                const countRaw = (res as any)?.totalCount ?? (res as any)?.total ?? resolved?.totalCount ?? resolved?.total ?? normalized.length;
                setItems(normalized);
                setTotalRecords(Number(countRaw) || normalized.length);
            } catch (e: any) {
                setLoadError(e?.message || "Failed to load contact properties");
                setItems([]);
            } finally {
                setLoading(false);
            }
        };
        run();
    }, [page, limit]);

    const handleDelete = async () => {
        if (!deleteTarget?.id || deletingRef.current) return;
        deletingRef.current = true;
        try {
            await deleteContactProperty(deleteTarget.id);
            useStoreSnackbar.getState().showSnackbar({ title: "Deleted", description: "Property deleted successfully", color: "success" });
            setItems(prev => prev.filter(it => it.id !== deleteTarget.id));
            setTotalRecords(prev => Math.max(0, prev - 1));
            setDeleteTarget(null);
        } catch (e: any) {
            useStoreSnackbar.getState().showSnackbar({ title: "Error", description: e?.message || "Failed to delete", color: "danger" });
        } finally {
            deletingRef.current = false;
        }
    };

    const columns = [
        { id: "index", name: "#", isRowHeader: true, widthRatio: 7, minWidth: 64 },
        { id: "title", name: "Property Name", widthRatio: 40, minWidth: 260 },
        { id: "type", name: "Data Type", widthRatio: 30, minWidth: 180 },
        { id: "status", name: "Status", widthRatio: 12, minWidth: 100 },
        { id: "actions", name: "Actions", widthRatio: 11, minWidth: 120, className: "pr-4 pl-4 whitespace-nowrap" },
    ] as { id: string; name: string; className?: string; widthRatio?: number; minWidth?: number }[];

    const breadcrumbs = (
        <div className="mb-4 rounded-sm border border-secondary bg-primary p-2">
            <div className="flex flex-wrap items-center gap-1 text-sm text-tertiary">
                <button type="button" onClick={() => navigate("/dashboard")} className="rounded-sm px-1 py-0.5 text-primary hover:bg-primary_hover">Home</button>
                <span>/</span>
                <button type="button" onClick={() => navigate("/lead-management/settings")} className="rounded-sm px-1 py-0.5 text-primary hover:bg-primary_hover">Settings</button>
                <span>/</span>
                <span className="px-1 py-0.5 text-primary">Contact Properties</span>
            </div>
        </div>
    );

    return (
        <DefaultLayout>
            {breadcrumbs}
            <div style={{ width: availableWidth }}>
                <TableCard.Root className="w-full">
                    <TableCard.Header
                        title="Custom Contact Properties"
                        badge={loading ? "…" : totalRecords}
                        contentTrailing={
                            <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center">
                                <Select
                                    aria-label="Rows per page"
                                    className="w-full md:w-40"
                                    value={String(limit)}
                                    onChange={undefined}
                                    onSelectionChange={(key) => { const n = Number(key); if (!Number.isFinite(n) || n <= 0) return; setLimit(n); setPage(1); }}
                                    items={[{ id: "10", label: "10 / page" }, { id: "25", label: "25 / page" }, { id: "50", label: "50 / page" }]}
                                >
                                    {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                </Select>
                                <Button size="sm" color="primary" iconLeading={Plus} onClick={() => navigate("/lead-management/settings/contact-properties/add")}>
                                    Add Property
                                </Button>
                            </div>
                        }
                    />

                    {loading ? (
                        <StickyTable ariaLabel="Contact properties" columns={columns} items={Array.from({ length: 5 }).map((_, i) => ({ id: `sk-${i}` }))} availableWidth={availableWidth} loading>
                            {(item) => (
                                <Table.Row id={item.id} columns={columns}>
                                    {() => (
                                        <Table.Cell>
                                            <div className="animate-pulse h-4 w-full rounded bg-secondary" />
                                        </Table.Cell>
                                    )}
                                </Table.Row>
                            )}
                        </StickyTable>
                    ) : loadError ? (
                        <div className="px-4 py-10 text-sm text-error md:px-6">{loadError}</div>
                    ) : (
                        <StickyTable ariaLabel="Contact properties" columns={columns} items={items} availableWidth={availableWidth} loading={false}>
                            {(item) => (
                                <Table.Row id={item.id} columns={columns}>
                                    {(col) => (
                                        <Table.Cell className={`${col?.className || ""} ${col.id === "actions" ? "whitespace-nowrap" : "whitespace-normal break-words"}`.trim()}>
                                            {col.id === "index" ? (
                                                <span className="text-sm text-tertiary">{indexById.get(item.id) ?? "—"}</span>
                                            ) : col.id === "title" ? (
                                                <span className="text-sm font-semibold text-primary">{item.title || "—"}</span>
                                            ) : col.id === "type" ? (
                                                <Badge size="sm" color="blue">{dataTypeLabel(item.dataType)}</Badge>
                                            ) : col.id === "status" ? (
                                                <Badge size="sm" color={item.status === true || item.status === "true" ? "success" : "error"}>
                                                    {item.status === true || item.status === "true" ? "Active" : "Inactive"}
                                                </Badge>
                                            ) : (
                                                <div className="flex w-full items-center justify-end gap-1.5">
                                                    <ButtonUtility tooltip="Edit" tooltipPlacement="bottom" icon={Edit01} onClick={() => navigate(`/lead-management/settings/contact-properties/edit/${item.id}`)} color="warning" />
                                                    <ButtonUtility tooltip="Delete" tooltipPlacement="bottom" icon={Trash01} onClick={() => setDeleteTarget({ id: item.id, title: item.title })} color="error" />
                                                </div>
                                            )}
                                        </Table.Cell>
                                    )}
                                </Table.Row>
                            )}
                        </StickyTable>
                    )}

                    {items.length === 0 && !loading && !loadError && (
                        <div className="px-4 py-12 text-center text-sm text-tertiary md:px-6">
                            No custom contact properties yet. Click "Add Property" to create one.
                        </div>
                    )}

                    <PaginationButtonGroup page={page} total={totalPages} align="center" onPageChange={(next) => setPage(Math.min(totalPages, Math.max(1, next)))} />
                </TableCard.Root>
            </div>

            <ModalOverlay isOpen={Boolean(deleteTarget)} isDismissable onOpenChange={(open) => { if (!open) setDeleteTarget(null); }}>
                {({ state }) => (
                    <Modal className="max-w-lg">
                        <Dialog>
                            <div className="relative w-full rounded-xl bg-primary p-5 ring-1 ring-secondary">
                                <CloseButton onPress={() => state.close()} className="absolute right-4 top-4" size="sm" />
                                <h2 className="mb-1 text-lg font-semibold text-primary">Delete Property</h2>
                                <p className="text-sm text-tertiary">{deleteTarget?.title ? `Delete "${deleteTarget.title}"?` : "Delete this contact property?"}</p>
                                <div className="mt-5 flex justify-end gap-2">
                                    <Button color="secondary" onClick={() => state.close()}>Cancel</Button>
                                    <Button color="primary-destructive" onClick={handleDelete}>Delete</Button>
                                </div>
                            </div>
                        </Dialog>
                    </Modal>
                )}
            </ModalOverlay>
        </DefaultLayout>
    );
}
