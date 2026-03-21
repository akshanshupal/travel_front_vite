import { fetchWithToken } from "@/utils/fetchApi";

export const itineraryService = {
    list: async (params: Record<string, unknown> = {}) => await fetchWithToken("/api/itinerary", params),
    getById: async (id: string, params: Record<string, unknown> = {}) => await fetchWithToken(`/api/itinerary/${id}`, params),
    updateById: async (id: string, payload: Record<string, unknown>) =>
        await fetchWithToken(`/api/itinerary/${id}`, payload, { method: "PUT" }),
    deleteById: async (id: string, payload: Record<string, unknown> = {}) =>
        await fetchWithToken(`/api/itinerary/${id}`, payload, { method: "DELETE" }),
    add: async (payload: Record<string, unknown>) => await fetchWithToken("/api/itinerary", payload, { method: "POST" }),
    duplicate: async (payload: Record<string, unknown>) =>
        await fetchWithToken("/api/itinerary/duplicate", payload, { method: "POST" }),
};
