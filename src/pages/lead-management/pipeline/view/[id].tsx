import { DefaultLayout } from "@/layouts/DefaultLayout";
import { TableCard } from "@/components/application/table/table";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import { CloseButton } from "@/components/base/buttons/close-button";
import { Dialog, Modal, ModalOverlay } from "@/components/application/modals/modal";
import { useStoreSnackbar } from "@/store/snackbar";
import { getPipelineById } from "@/utils/services/pipelineService";
import { getCampaign, updateCampaignPauseFunction } from "@/utils/services/campaignService";
import { ArrowLeft, Edit01, Plus } from "@untitledui/icons";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

type PipelineData = {
    title?: string;
    stages?: Array<{ name?: string; tags?: string[] }>;
};

type CampaignItem = {
    id: string;
    title?: string;
    pause?: boolean;
    additionalSetting?: { priority?: string };
};

const getPriorityIcon = (priority: string | undefined) => {
    switch (priority?.toLowerCase()) {
        case "highest": return <span title="Highest" className="text-red-500">↑↑</span>;
        case "high": return <span title="High" className="text-orange-500">↑</span>;
        case "medium": return <span title="Medium" className="text-yellow-500">—</span>;
        case "low": return <span title="Low" className="text-green-500">↓</span>;
        case "lowest": return <span title="Lowest" className="text-blue-500">↓↓</span>;
        default: return null;
    }
};

const asArray = (value: any) => (Array.isArray(value) ? value : []);
const getId = (value: any) => String(value?.id ?? value?._id ?? value ?? "").trim();

export default function PipelineViewPage() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { showSnackbar } = useStoreSnackbar();

    const [data, setData] = useState<PipelineData | null>(null);
    const [campaignData, setCampaignData] = useState<CampaignItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [campaignLoading, setCampaignLoading] = useState(true);
    const [hidePaused, setHidePaused] = useState(false);

    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [showPauseModal, setShowPauseModal] = useState(false);
    const [pausingCampaigns, setPausingCampaigns] = useState(false);
    const [pauseStatus, setPauseStatus] = useState(true);

    useEffect(() => {
        if (!id) return;
        const run = async () => {
            setLoading(true);
            try {
                const res = await getPipelineById(id, { populate: "pipeline" });
                setData((res as any)?.data ?? res);
            } catch (e: any) {
                showSnackbar({ title: "Error", description: e?.message || "Failed to load pipeline", color: "danger" });
            } finally {
                setLoading(false);
            }
        };
        run();
    }, [id, showSnackbar]);

    useEffect(() => {
        if (!id) return;
        const run = async () => {
            setCampaignLoading(true);
            try {
                const res = await getCampaign({
                    populate: "pipeline",
                    pipeline: id,
                    select: "title,additionalSetting,pause",
                });
                const resolved = (res as any)?.data ?? res;
                const list = Array.isArray(resolved?.data) ? resolved.data : Array.isArray(resolved) ? resolved : asArray(resolved?.items);
                setCampaignData(asArray(list).map((it: any) => ({ id: getId(it), title: it?.title, pause: it?.pause, additionalSetting: it?.additionalSetting })).filter((x: any) => x.id));
            } catch {
                setCampaignData([]);
            } finally {
                setCampaignLoading(false);
            }
        };
        run();
    }, [id]);

    const visibleCampaigns = hidePaused ? campaignData.filter(c => !c.pause) : campaignData;

    const isAnyPausedSelected = selectedItems.some(selId => campaignData.find(c => c.id === selId)?.pause === true);
    const isAnyUnpausedSelected = selectedItems.some(selId => campaignData.find(c => c.id === selId)?.pause === false);

    const handleCheckbox = (campaignId: string) => {
        setSelectedItems(prev => prev.includes(campaignId) ? prev.filter(x => x !== campaignId) : [...prev, campaignId]);
    };

    const handlePauseClick = () => {
        const isPaused = selectedItems.every(selId => campaignData.find(c => c.id === selId)?.pause === true);
        setPauseStatus(!isPaused);
        setShowPauseModal(true);
    };

    const handlePauseConfirm = async () => {
        setPausingCampaigns(true);
        try {
            await updateCampaignPauseFunction({ status: pauseStatus, campaignIds: selectedItems });
            setCampaignData(prev => prev.map(c => selectedItems.includes(c.id) ? { ...c, pause: pauseStatus } : c));
            showSnackbar({ title: "Success", description: `Campaigns ${pauseStatus ? "paused" : "unpaused"} successfully`, color: "success" });
            setSelectedItems([]);
            setShowPauseModal(false);
        } catch (e: any) {
            showSnackbar({ title: "Error", description: e?.message || "Failed to update campaigns", color: "danger" });
        } finally {
            setPausingCampaigns(false);
        }
    };

    const breadcrumbs = (
        <div className="mb-4 rounded-sm border border-secondary bg-primary p-2">
            <div className="flex flex-wrap items-center gap-1 text-sm text-tertiary">
                <button type="button" onClick={() => navigate("/dashboard")} className="rounded-sm px-1 py-0.5 text-primary hover:bg-primary_hover">Home</button>
                <span>/</span>
                <button type="button" onClick={() => navigate("/lead-management/pipeline")} className="rounded-sm px-1 py-0.5 text-primary hover:bg-primary_hover">Pipeline</button>
                <span>/</span>
                <span className="px-1 py-0.5 text-primary">View</span>
            </div>
        </div>
    );

    return (
        <DefaultLayout>
            {breadcrumbs}
            <TableCard.Root>
                <TableCard.Header
                    title={loading ? "Pipeline" : (data?.title ? `${data.title} Pipeline` : "Pipeline")}
                    contentTrailing={
                        <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center md:justify-end">
                            <Button color="secondary" iconLeading={ArrowLeft} onClick={() => navigate("/lead-management/pipeline")}>Back</Button>
                            <Button color="secondary" iconLeading={Edit01} onClick={() => navigate(`/lead-management/pipeline/edit/${id}`)}>Edit Pipeline</Button>
                            <Button color="primary" iconLeading={Plus} onClick={() => navigate("/lead-management/campaign/add")}>Create Campaign</Button>
                        </div>
                    }
                />

                <div className="bg-primary px-4 py-5 md:px-6">
                    {/* Stats row */}
                    <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                        {[
                            { label: "Total Leads", value: "—" },
                            { label: "Total In-Progress", value: "—" },
                            { label: "Total Closed", value: "—" },
                            { label: "Campaigns", value: campaignLoading ? "…" : campaignData.length },
                        ].map(stat => (
                            <div key={stat.label} className="rounded-lg border border-secondary bg-primary p-4 text-center ring-1 ring-secondary">
                                <p className="text-xs font-semibold uppercase tracking-wide text-tertiary">{stat.label}</p>
                                <p className="mt-1 text-2xl font-bold text-primary">{stat.value}</p>
                            </div>
                        ))}
                    </div>

                    {/* Campaigns panel */}
                    <div className="rounded-lg border border-secondary overflow-hidden">
                        {/* Panel header */}
                        <div className="flex items-center justify-between px-4 py-3 bg-secondary border-b border-secondary">
                            <div className="flex items-center gap-3">
                                {selectedItems.length > 0 && (
                                    <input
                                        type="checkbox"
                                        checked={visibleCampaigns.every(c => selectedItems.includes(c.id))}
                                        onChange={(e) => setSelectedItems(e.target.checked ? visibleCampaigns.map(c => c.id) : [])}
                                        className="rounded border-secondary"
                                    />
                                )}
                                <span className="text-xs font-semibold uppercase tracking-wide text-tertiary">Campaigns ({campaignData.length})</span>
                            </div>
                            <div className="flex items-center gap-2">
                                {selectedItems.length > 0 && (
                                    <Button size="sm" color="primary" onClick={handlePauseClick}>
                                        {isAnyPausedSelected && !isAnyUnpausedSelected ? "Un-pause" : "Pause"} ({selectedItems.length})
                                    </Button>
                                )}
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <span className="text-xs text-tertiary">Hide Paused</span>
                                    <input type="checkbox" checked={hidePaused} onChange={(e) => setHidePaused(e.target.checked)} className="rounded border-secondary" />
                                </label>
                            </div>
                        </div>

                        {/* Campaign list */}
                        <div className="divide-y divide-secondary">
                            {campaignLoading ? (
                                Array.from({ length: 3 }).map((_, i) => (
                                    <div key={i} className="flex items-center gap-3 px-4 py-3 animate-pulse">
                                        <div className="h-4 w-4 rounded bg-secondary" />
                                        <div className="h-4 w-48 rounded bg-secondary" />
                                    </div>
                                ))
                            ) : visibleCampaigns.length > 0 ? (
                                visibleCampaigns.map(campaign => (
                                    <div key={campaign.id} className="flex items-center justify-between px-4 py-3 hover:bg-secondary/50 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="checkbox"
                                                checked={selectedItems.includes(campaign.id)}
                                                onChange={() => handleCheckbox(campaign.id)}
                                                className="rounded border-secondary"
                                            />
                                            <span className="text-sm">{getPriorityIcon(campaign.additionalSetting?.priority)}</span>
                                            <span className="text-sm text-primary">{campaign.title}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {campaign.pause && (
                                                <Badge size="sm" color="warning">Paused</Badge>
                                            )}
                                            <button
                                                type="button"
                                                onClick={() => navigate(`/lead-management/campaign/view/${campaign.id}`)}
                                                className="text-xs text-brand-600 hover:underline"
                                            >
                                                View
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="px-4 py-8 text-center text-sm text-tertiary">No campaigns found</div>
                            )}
                        </div>
                    </div>
                </div>
            </TableCard.Root>

            {/* Pause confirm modal */}
            <ModalOverlay isOpen={showPauseModal} isDismissable onOpenChange={(open) => { if (!open) setShowPauseModal(false); }}>
                {({ state }) => (
                    <Modal className="max-w-lg">
                        <Dialog>
                            <div className="relative w-full rounded-xl bg-primary p-5 ring-1 ring-secondary">
                                <CloseButton onPress={() => state.close()} className="absolute right-4 top-4" size="sm" />
                                <h2 className="mb-2 text-lg font-semibold text-primary">
                                    {pauseStatus ? "Pause" : "Un-pause"} Campaigns
                                </h2>
                                <p className="mb-3 text-sm text-tertiary">Are you sure you want to {pauseStatus ? "pause" : "un-pause"} the following campaigns?</p>
                                <ul className="mb-4 space-y-1">
                                    {selectedItems.map(selId => {
                                        const c = campaignData.find(c => c.id === selId);
                                        return <li key={selId} className="text-sm text-primary">• {c?.title || selId}</li>;
                                    })}
                                </ul>
                                <div className="flex justify-end gap-2">
                                    <Button color="secondary" onClick={() => state.close()}>Cancel</Button>
                                    <Button color="primary" isLoading={pausingCampaigns} onClick={handlePauseConfirm}>Confirm</Button>
                                </div>
                            </div>
                        </Dialog>
                    </Modal>
                )}
            </ModalOverlay>
        </DefaultLayout>
    );
}
