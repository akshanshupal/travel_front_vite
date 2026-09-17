import { DefaultLayout } from "@/layouts/DefaultLayout";
import { Button } from "@/components/base/buttons/button";
import { CloseButton } from "@/components/base/buttons/close-button";
import { Dialog, Modal, ModalOverlay } from "@/components/application/modals/modal";
import { Input } from "@/components/base/input/input";
import { useStoreSnackbar } from "@/store/snackbar";
import { getPipeline, getPipelineDelete } from "@/utils/services/pipelineService";
import { getCampaign } from "@/utils/services/campaignService";
import { CampaignFormModal } from "@/pages/lead-management/campaign/campaign-form-modal";
import { ArrowUp, ChevronRight, DotsVertical, Plus, SearchMd } from "@untitledui/icons";
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
    pipeline?: { id: string; title?: string } | string;
    additionalSetting?: { priority?: string };
    pause?: boolean;
};

const ACCENT_COLORS = [
    "#EC4899",
    "#F59E0B",
    "#8B5CF6",
    "#D946EF",
    "#EF4444",
    "#10B981",
    "#3B82F6",
    "#F97316",
];

const asArray = (value: any) => (Array.isArray(value) ? value : []);
const getId = (value: any) => String(value?.id ?? value?._id ?? value ?? "").trim();

export default function PipelineIndexPage() {
    const navigate = useNavigate();

    const [items, setItems] = useState<PipelineItem[]>([]);
    const [campaignData, setCampaignData] = useState<CampaignItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [campaignLoading, setCampaignLoading] = useState(true);
    const [loadError, setLoadError] = useState<string | null>(null);
    const [search, setSearch] = useState("");

    const [deleteTarget, setDeleteTarget] = useState<{ id: string; title?: string } | null>(null);
    const [campaignEditTarget, setCampaignEditTarget] = useState<{ id: string } | null>(null);
    const [reloadKey, setReloadKey] = useState(0);
    const deletingRef = useRef(false);

    useEffect(() => {
        const run = async () => {
            setLoading(true);
            setLoadError(null);
            try {
                const res = await getPipeline({ totalCount: "true", limit: "all" });
                const resolved = (res as any)?.data ?? res;
                const list = Array.isArray(resolved?.data) ? resolved.data : Array.isArray(resolved) ? resolved : asArray(resolved?.items);
                const normalized = asArray(list)
                    .map((it: any) => {
                        const id = getId(it);
                        if (!id) return null;
                        return { ...it, id } as PipelineItem;
                    })
                    .filter(Boolean) as PipelineItem[];
                setItems(normalized);
            } catch (e: any) {
                setLoadError(e?.message || "Failed to load pipelines");
                setItems([]);
            } finally {
                setLoading(false);
            }
        };
        run();
    }, []);

    useEffect(() => {
        const run = async () => {
            setCampaignLoading(true);
            try {
                const res = await getCampaign({ populate: "pipeline", select: "title,additionalSetting,managingCampaign,pipeline", select_pipeline: "title", limit: "all" });
                const resolved = (res as any)?.data ?? res;
                const list = Array.isArray(resolved?.data) ? resolved.data : Array.isArray(resolved) ? resolved : asArray(resolved?.items);
                setCampaignData(
                    asArray(list)
                        .map((it: any) => ({ id: getId(it), title: it?.title || "", pipeline: it?.pipeline, additionalSetting: it?.additionalSetting, pause: it?.pause }))
                        .filter((x: any) => x.id)
                );
            } catch {
                setCampaignData([]);
            } finally {
                setCampaignLoading(false);
            }
        };
        run();
    }, [reloadKey]);

    const getCampaignsForPipeline = (pipelineId: string) =>
        campaignData.filter((c) => {
            if (!c.pipeline) return false;
            if (typeof c.pipeline === "string") return c.pipeline === pipelineId;
            return (c.pipeline as any).id === pipelineId || (c.pipeline as any)._id === pipelineId;
        });

    const query = search.trim().toLowerCase();
    const visiblePipelines = useMemo(() => {
        if (!query) return items;
        return items.filter((p) => {
            if (String(p.title || "").toLowerCase().includes(query)) return true;
            return getCampaignsForPipeline(p.id).some((c) => String(c.title || "").toLowerCase().includes(query));
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items, campaignData, query]);

    const handleDelete = async () => {
        if (!deleteTarget?.id || deletingRef.current) return;
        deletingRef.current = true;
        try {
            await getPipelineDelete(deleteTarget.id);
            useStoreSnackbar.getState().showSnackbar({ title: "Deleted", description: "Pipeline deleted successfully", color: "success" });
            setItems((prev) => prev.filter((it) => it.id !== deleteTarget.id));
            setDeleteTarget(null);
        } catch (e: any) {
            useStoreSnackbar.getState().showSnackbar({ title: "Error", description: e?.message || "Failed to delete pipeline", color: "danger" });
        } finally {
            deletingRef.current = false;
        }
    };

    return (
        <DefaultLayout>
            <div className="flex w-full flex-col gap-6">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-xl font-semibold text-primary">All Campaigns</h1>
                        <p className="mt-0.5 text-sm text-tertiary">Campaigns grouped by pipeline</p>
                    </div>
                    <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center">
                        <Input
                            aria-label="Search"
                            placeholder="Search Campaign"
                            icon={SearchMd}
                            className="md:w-72"
                            value={search}
                            onChange={setSearch}
                        />
                        <Button size="sm" color="primary" iconLeading={Plus} onClick={() => navigate("/lead-management/settings?tab=pipelines")}>
                            Create Pipeline
                        </Button>
                    </div>
                </div>

                {loading || campaignLoading ? (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={`skeleton-${i}`} className="h-72 animate-pulse rounded-xl bg-secondary" />
                        ))}
                    </div>
                ) : loadError ? (
                    <div className="rounded-xl bg-primary p-8 text-sm text-error ring-1 ring-secondary">{loadError}</div>
                ) : visiblePipelines.length === 0 ? (
                    <div className="rounded-xl bg-primary p-10 text-center text-sm text-tertiary ring-1 ring-secondary">
                        {query ? "No pipelines or campaigns match your search" : "No pipelines yet. Create your first pipeline."}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                        {visiblePipelines.map((pipeline, index) => {
                            const pipeCampaigns = getCampaignsForPipeline(pipeline.id);
                            const accent = ACCENT_COLORS[index % ACCENT_COLORS.length];
                            return (
                                <div
                                    key={pipeline.id}
                                    className="flex max-h-[560px] flex-col overflow-hidden rounded-xl bg-primary ring-1 ring-secondary"
                                    style={{ borderLeft: `4px solid ${accent}` }}
                                >
                                    <div className="flex items-center justify-between gap-2 border-b border-secondary px-4 py-3">
                                        <button
                                            type="button"
                                            title="View pipeline"
                                            onClick={() => navigate(`/lead-management/pipeline/view/${pipeline.id}`)}
                                            className="truncate text-left text-sm font-semibold uppercase tracking-wide text-primary hover:underline"
                                        >
                                            {pipeline.title || "Untitled Pipeline"}
                                        </button>
                                        <button
                                            type="button"
                                            aria-label="Open pipeline"
                                            onClick={() => navigate(`/lead-management/pipeline/view/${pipeline.id}`)}
                                            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full ring-1 ring-secondary text-secondary hover:bg-secondary hover:text-primary"
                                        >
                                            <ChevronRight className="h-4 w-4" />
                                        </button>
                                    </div>
                                    <div className="flex-1 space-y-2 overflow-y-auto p-3">
                                        {pipeCampaigns.length === 0 ? (
                                            <div className="flex h-full min-h-24 items-center justify-center px-2 py-6 text-center text-xs text-tertiary">
                                                No campaigns in this pipeline
                                            </div>
                                        ) : (
                                            pipeCampaigns.map((c) => (
                                                <div
                                                    key={c.id}
                                                    className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-2.5"
                                                >
                                                    <ArrowUp className="h-4 w-4 shrink-0 text-red-500" />
                                                    <button
                                                        type="button"
                                                        title="View campaign"
                                                        onClick={() => navigate(`/lead-management/campaign/view/${c.id}`)}
                                                        className="flex-1 truncate text-left text-sm text-primary hover:underline"
                                                    >
                                                        {c.title || "Untitled Campaign"}
                                                        {c.pause && <span className="ml-1.5 text-[10px] text-tertiary">(paused)</span>}
                                                    </button>
                                                    <button
                                                        type="button"
                                                        aria-label="Edit campaign"
                                                        title="Edit campaign"
                                                        onClick={() => setCampaignEditTarget({ id: c.id })}
                                                        className="flex h-6 w-6 shrink-0 items-center justify-center rounded text-tertiary hover:bg-primary hover:text-primary"
                                                    >
                                                        <DotsVertical className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
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

            <CampaignFormModal
                isOpen={Boolean(campaignEditTarget)}
                onClose={() => setCampaignEditTarget(null)}
                campaign={campaignEditTarget}
                onSaved={() => setReloadKey((k) => k + 1)}
            />
        </DefaultLayout>
    );
}
