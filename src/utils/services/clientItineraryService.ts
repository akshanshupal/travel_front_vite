import { fetchWithToken } from "@/utils/fetchApi";

export const clientItineraryService = {
    list: async (params: Record<string, unknown> = {}) => await fetchWithToken("/api/clientitinerary", params),
    getById: async (id: string, params: Record<string, unknown> = {}) => await fetchWithToken(`/api/clientitinerary/${id}`, params),
    updateById: async (id: string, payload: Record<string, unknown>) =>
        await fetchWithToken(`/api/clientitinerary/${id}`, payload, { method: "PUT" }),
    deleteById: async (id: string, payload: Record<string, unknown> = {}) =>
        await fetchWithToken(`/api/clientitinerary/${id}`, payload, { method: "DELETE" }),
    add: async (payload: Record<string, unknown>) => await fetchWithToken("/api/clientitinerary", payload, { method: "POST" }),
    agentWiseSummary: async (params: Record<string, unknown> = {}) => await fetchWithToken("/api/client-itinerary/agent-wise-summary", params),
    agentDurationWiseSummary: async (params: Record<string, unknown> = {}) => await fetchWithToken("/api/client-itinerary/agent-duration-wise-summary", params),
};
