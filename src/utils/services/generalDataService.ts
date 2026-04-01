import { fetchWithToken } from "@/utils/fetchApi";

export const getGeneralData = async (params: Record<string, any> = {}) => {
    const response = await fetchWithToken("/api/generaldata", params);
    if ((response as any).error) {
        console.error("Error fetching general data:", (response as any).error);
        return { error: (response as any).error, details: (response as any)?.details };
    }
    return response;
};

export const addGeneralData = async (formAddData: Record<string, any>) => {
    const response = await fetchWithToken("/api/generaldata", formAddData, { method: "POST" });
    if ((response as any).error) {
        console.error("Error adding general data:", (response as any).error);
        return { error: (response as any).error, details: (response as any)?.details };
    }
    return response;
};

export const getGeneralDataById = async (id: string, params: Record<string, any> = {}) => {
    const response = await fetchWithToken(`/api/generaldata/${id}`, params);
    if ((response as any).error) {
        console.error("Error fetching general data by ID:", (response as any).error);
        return { error: (response as any).error, details: (response as any)?.details };
    }
    return response;
};

export const updateGeneralDataById = async (id: string, formUpdatedData: Record<string, any>) => {
    const response = await fetchWithToken(`/api/generaldata/${id}`, formUpdatedData, { method: "PUT" });
    if ((response as any).error) {
        console.error("Error updating general data by ID:", (response as any).error);
        return { error: (response as any).error, details: (response as any)?.details };
    }
    return response;
};

export const deleteGeneralDataById = async (id: string, formUpdatedData: Record<string, any> = {}) => {
    const response = await fetchWithToken(`/api/generaldata/${id}`, formUpdatedData, { method: "DELETE" });
    if ((response as any).error) {
        console.error("Error deleting general data by ID:", (response as any).error);
        return { error: (response as any).error, details: (response as any)?.details };
    }
    return response;
};
