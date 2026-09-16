import { fetchWithToken } from "@/utils/fetchApi";

const request = async (url: string, params: Record<string, any>, fallback: string) => {
    const response = await fetchWithToken(url, params);
    if ((response as any).error) throw new Error((response as any).error?.message || fallback);
    return response;
};

export const getLeadFunnelReport = (params: Record<string, any> = {}) =>
    request("/api/lead-reports/funnel", params, "Failed to load lead funnel report");

export const getLeadAgentReport = (params: Record<string, any> = {}) =>
    request("/api/lead-reports/agents", params, "Failed to load agent report");
