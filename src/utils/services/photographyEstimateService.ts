import { fetchWithToken } from "@/utils/fetchApi";

export const createPhotographyEstimate = async (payload: Record<string, unknown>) => {
    return await fetchWithToken("/api/photography-estimate", payload, { method: "POST" });
};

export const getPhotographyEstimates = async (params: Record<string, unknown> = {}) => {
    return await fetchWithToken("/api/photography-estimate", params);
};

export const getPhotographyEstimateById = async (id: string) => {
    return await fetchWithToken(`/api/photography-estimate/${id}`);
};

export const updatePhotographyEstimateById = async (id: string, payload: Record<string, unknown>) => {
    return await fetchWithToken(`/api/photography-estimate/${id}`, payload, { method: "PUT" });
};

export const convertPhotographyEstimate = async (id: string, payload: Record<string, unknown>) => {
    return await fetchWithToken(`/api/photography-booking/convert/${id}`, payload, { method: "POST" });
};
