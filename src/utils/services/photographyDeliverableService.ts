import { fetchWithToken } from "@/utils/fetchApi";

export const createPhotographyDeliverable = async (payload: Record<string, unknown>) => {
    return await fetchWithToken("/api/photography-deliverable", payload, { method: "POST" });
};

export const getPhotographyDeliverables = async (params: Record<string, unknown> = {}) => {
    return await fetchWithToken("/api/photography-deliverable", params);
};

export const getPhotographyDeliverableById = async (id: string) => {
    return await fetchWithToken(`/api/photography-deliverable/${id}`);
};

export const updatePhotographyDeliverableById = async (id: string, payload: Record<string, unknown>) => {
    return await fetchWithToken(`/api/photography-deliverable/${id}`, payload, { method: "PUT" });
};

export const deletePhotographyDeliverableById = async (id: string) => {
    return await fetchWithToken(`/api/photography-deliverable/${id}`, {}, { method: "DELETE" });
};
