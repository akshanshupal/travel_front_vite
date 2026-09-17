import { fetchWithToken } from "@/utils/fetchApi";

export type LeadDashboardParams = { from?: string; to?: string; pipeline?: string; campaign?: string };

export const getLeadDashboard = async (params: LeadDashboardParams = {}) => {
    const response: any = await fetchWithToken("/api/lead-dashboard", params);
    if (response?.error) throw new Error(response.error?.message || "Failed to load lead dashboard");
    const data = response?.data ?? response ?? {};
    return {
        callOverview: { connected: Number(data.callOverview?.connected || 0), total: Number(data.callOverview?.total || 0), percentage: Number(data.callOverview?.percentage || 0) },
        agentActivity: { active: Number(data.agentActivity?.active || 0), total: Number(data.agentActivity?.total || 0), onBreak: Number(data.agentActivity?.onBreak || 0) },
        stages: Array.isArray(data.stages) ? data.stages : [],
        pipelines: Array.isArray(data.pipelines) ? data.pipelines : [],
        campaigns: Array.isArray(data.campaigns) ? data.campaigns : [],
        pinnedCampaigns: Array.isArray(data.pinnedCampaigns) ? data.pinnedCampaigns : [],
    };
};

export const pinCampaign = async (campaignId: string, pinned: boolean) => {
    const response: any = await fetchWithToken("/api/lead-dashboard/pins", { campaignId, pinned }, { method: "POST" });
    if (response?.error) throw new Error(response.error?.message || "Failed to update pinned campaigns");
    const data = response?.data ?? response ?? {};
    return Array.isArray(data.pinnedCampaigns) ? data.pinnedCampaigns : [];
};
