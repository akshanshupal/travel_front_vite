import { fetchWithToken } from "@/utils/fetchApi";

export const createPhotographyClient = async (payload: Record<string, unknown>) => {
    return await fetchWithToken("/api/photography-client", payload, { method: "POST" });
};

export const getPhotographyClients = async (params: Record<string, unknown> = {}) => {
    return await fetchWithToken("/api/photography-client", params);
};

export const getPhotographyClientById = async (id: string) => {
    return await fetchWithToken(`/api/photography-client/${id}`);
};

export const updatePhotographyClientById = async (id: string, payload: Record<string, unknown>) => {
    return await fetchWithToken(`/api/photography-client/${id}`, payload, { method: "PUT" });
};
