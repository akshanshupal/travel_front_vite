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
import { getPipeline, getPipelineDelete } from "@/utils/services/pipelineService";
import { getCampaign } from "@/utils/services/campaignService";
import { Plus, Trash01, Eye, Edit01 } from "@untitledui/icons";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router";


type PipelineItem = {
    id: string;
    title?: string;
    stages?: string[];
    status?: boolean | string;
};

type CampaignItem = {
    id: string;
    title?: string;
    pipeline?: { id: string; title?: string };
    additionalSetting?: { priority?: string };
    pause?: boolean;
};

const getPriorityColor = (priority: string | undefined) => {
    switch (priority?.toLowerCase()) {
        case "highest": return "error";
        case "high": return "warning";
        case "medium": return "gray";
        case "low": return "success";
        case "lowest": return "blue";
        default: return "gray";
    }
};

const asArray = (value: any) => (Array.isArray(value) ? value : []);
const getId = (value: any) => String(value?.id ?? value?._id ?? value ?? "").trim();

export default function PipelineIndexPage() {
    const navigate = useNavigate();
    const availableWidth = useAvailableTableWidth();

    const [items, setItems] = useState<PipelineItem[]>([]);
    const [campaignData, setCampaignData] = useState<CampaignItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [campaignLoading, setCampaignLoading] = useState(true);
    const [loadError, setLoadError] = useState<string | null>(null);
    const [totalRecords, setTotalRecords] = useState(0);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    const [deleteTarget, setDeleteTarget] = useState<{ id: string; title?: string } | null>(null);
    const deletingRef = useRef(false);

    const totalPages = Math.max(1, Math.ceil((totalRecords || 0) / limit));
    const indexById = useMemo(() => new Map(items.map((item, index) => [item.id, (page - 1) * limit + index + 1])), [items, limit, page]);

    useEffect(() => {
        const run = async () => {
            setLoading(true);
            setLoadError(null);
            try {
                const res = await getPipeline({ totalCount: "true", page: String(page), limit: String(limit) });
                const resolved = (res as any)?.data ?? res;
                const list = Array.isArray(resolved?.data) ? resolved.data : Array.isArray(resolved) ? resolved : asArray(resolved?.items);
                const normalized = asArray(list).map((it: any) => { const id = getId(it); if (!id) return null; return { ...it, id } as PipelineItem; }).filter(Boolean) as PipelineItem[];
                const count = Number((res as any)?.totalCount ?? (res as any)?.total ?? resolved?.totalCount ?? normalized.length) || normalized.length;
                setItems(normalized);
                setTotalRecords(count);
            } catch (e: any) {
                setLoadError(e?.message || "Failed to load pipelines");
                setItems([]);
            } finally {
                setLoading(false);
            }
        };
        run();
    }, [page, limit]);

    useEffect(() => {
        const run = async () => {
            setCampaignLoading(true);
            try {
                const res = await getCampaign({ populate: "pipeline", select: "title,additionalSetting,managingCampaign,pipeline", select_pipeline: "title" });
                const resolved = (res as any)?.data ?? res;
                const list = Array.isArray(resolved?.data) ? resolved.data : Array.isArray(resolved) ? resolved : asArray(resolved?.items);
                setCampaignData(asArray(list).map((it: any) => ({ id: getId(it), title: it?.title || "", pipeline: it?.pipeline, additionalSetting: it?.additionalSetting, pause: it?.pause })).filter((x: any) => x.id));
            } catch {
                setCampaignData([]);
            } finally {
                setCampaignLoading(false);
            }
        };
        run();
    }, []);

    const handleDelete = async () => {
        if (!deleteTarget?.id || deletingRef.current) return;
        deletingRef.current = true;
        try {
            await getPipelineDelete(deleteTarget.id);
            useStoreSnackbar.getState().showSnackbar({ title: "Deleted", description: "Pipeline deleted successfully", color: "success" });
            setItems(prev => prev.filter(it => it.id !== deleteTarget.id));
            setTotalRecords(prev => Math.max(0, prev - 1));
            setDeleteTarget(null);
        } catch (e: any) {
            useStoreSnackbar.getState().showSnackbar({ title: "Error", description: e?.message || "Failed to delete pipeline", color: "danger" });
        } finally {
            deletingRef.current = false;
        }
    };

    const columns = [
        { id: "index", name: "#", isRowHeader: true, widthRatio: 6, minWidth: 64 },
        { id: "title", name: "Pipeline Name", widthRatio: 30, minWidth: 220 },
        { id: "campaigns", name: "Campaigns", widthRatio: 50, minWidth: 300 },
        { id: "actions", name: "Actions", widthRatio: 14, minWidth: 120, className: "pr-4 pl-4 whitespace-nowrap" },
    ] as { id: string; name: string; className?: string; widthRatio?: number; minWidth?: number }[];

    const getCampaignsForPipeline = (pipelineId: string) =>
        campaignData.filter(c => {
            if (!c.pipeline) return false;
            if (typeof c.pipeline === "string") return c.pipeline === pipelineId;
            return (c.pipeline as any).id === pipelineId || (c.pipeline as any)._id === pipelineId;
        });

    return (
        <DefaultLayout>
            <div style={{ width: availableWidth }}>
                <TableCard.Root className="w-full">
                    <TableCard.Header
                        title="Pipeline Management"
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
                                <Button size="sm" color="primary" iconLeading={Plus} onClick={() => navigate("/lead-management/pipeline/add")}>
                                    Create Pipeline
                                </Button>
                            </div>
                        }
                    />

                    {loading ? (
                        <StickyTable ariaLabel="Pipeline list" columns={columns} items={Array.from({ length: 5 }).map((_, i) => ({ id: `skeleton-${i}` }))} availableWidth={availableWidth} loading={loading}>
                            {(item) => (
                                <Table.Row id={item.id} columns={columns}>
                                    {(column) => (
                                        <Table.Cell className={`${column?.className || ""} ${column.id === "actions" ? "whitespace-nowrap" : ""}`.trim()}>
                                            <div className="animate-pulse"><div className="h-4 w-full rounded bg-secondary" /></div>
                                        </Table.Cell>
                                    )}
                                </Table.Row>
                            )}
                        </StickyTable>
                    ) : loadError ? (
                        <div className="px-4 py-10 text-sm text-error md:px-6">{loadError}</div>
                    ) : (
                        <StickyTable ariaLabel="Pipeline list" columns={columns} items={items} availableWidth={availableWidth} loading={loading}>
                            {(item) => {
                                const pipeCampaigns = getCampaignsForPipeline(item.id);
                                return (
                                    <Table.Row id={item.id} columns={columns}>
                                        {(column) => (
                                            <Table.Cell className={`${column?.className || ""} ${column.id === "actions" ? "whitespace-nowrap" : "whitespace-normal break-words"}`.trim()}>
                                                {column.id === "index" ? (
                                                    <span className="text-sm text-tertiary">{indexById.get(item.id) ?? "—"}</span>
                                                ) : column.id === "title" ? (
                                                    <button type="button" onClick={() => navigate(`/lead-management/pipeline/view/${item.id}`)} className="text-left text-sm font-semibold text-primary hover:underline">
                                                        {item.title || "—"}
                                                    </button>
                                                ) : column.id === "campaigns" ? (
                                                    <div className="flex flex-wrap gap-1.5 py-1">
                                                        {(campaignLoading) ? (
                                                            <div className="h-4 w-20 rounded bg-secondary animate-pulse" />
                                                        ) : pipeCampaigns.length > 0 ? (
                                                            pipeCampaigns.slice(0, 5).map(c => (
                                                                <Badge key={c.id} size="sm" color={getPriorityColor(c.additionalSetting?.priority)}>
                                                                    {c.title}
                                                                    {c.pause && <span className="ml-1 text-[10px] opacity-75">⏸</span>}
                                                                </Badge>
                                                            ))
                                                        ) : (
                                                            <span className="text-sm text-tertiary">No campaigns</span>
                                                        )}
                                                        {pipeCampaigns.length > 5 && (
                                                            <Badge size="sm" color="gray">+{pipeCampaigns.length - 5} more</Badge>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <div className="flex w-full items-center justify-end gap-1.5">
                                                        <ButtonUtility tooltip="View" tooltipPlacement="bottom" icon={Eye} onClick={() => navigate(`/lead-management/pipeline/view/${item.id}`)} color="secondary" />
                                                        <ButtonUtility tooltip="Edit" tooltipPlacement="bottom" icon={Edit01} onClick={() => navigate(`/lead-management/pipeline/edit/${item.id}`)} color="warning" />
                                                        <ButtonUtility tooltip="Delete" tooltipPlacement="bottom" icon={Trash01} onClick={() => setDeleteTarget({ id: item.id, title: item.title })} color="error" />
                                                    </div>
                                                )}
                                            </Table.Cell>
                                        )}
                                    </Table.Row>
                                );
                            }}
                        </StickyTable>
                    )}

                    <PaginationButtonGroup page={page} total={totalPages} align="center" onPageChange={(next) => setPage(Math.min(totalPages, Math.max(1, next)))} />
                </TableCard.Root>
            </div>

            {/* Delete Confirmation Modal */}
            <ModalOverlay isOpen={Boolean(deleteTarget)} isDismissable onOpenChange={(open) => { if (!open) setDeleteTarget(null); }}>
                {({ state }) => (
                    <Modal className="max-w-lg">
                        <Dialog>
                            <div className="relative w-full rounded-xl bg-primary p-5 ring-1 ring-secondary">
                                <CloseButton onPress={() => state.close()} className="absolute right-4 top-4" size="sm" />
                                <div className="space-y-1">
                                    <h2 className="text-lg font-semibold text-primary">Delete Pipeline</h2>
                                    <p className="text-sm text-tertiary">{deleteTarget?.title ? `Delete "${deleteTarget.title}"?` : "Delete this pipeline?"}</p>
                                </div>
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
