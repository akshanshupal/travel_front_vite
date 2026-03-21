import { fetchWithToken } from "@/utils/fetchApi";

export const getMailer = async (params: Record<string, any> = {}) => {
    const response = await fetchWithToken("/api/mailer", params);
    if ((response as any).error) {
        console.error("Error fetching mailer:", (response as any).error);
        return { error: (response as any).error, details: (response as any)?.details };
    }
    return response;
};

export const addMailer = async (formAddData: Record<string, any>) => {
    const response = await fetchWithToken("/api/mailer", formAddData, { method: "POST" });
    if ((response as any).error) {
        console.error("Error adding mailer:", (response as any).error);
        return { error: (response as any).error, details: (response as any)?.details };
    }
    return response;
};

export const getMailerById = async (id: string, params: Record<string, any> = {}) => {
    const response = await fetchWithToken(`/api/mailer/${id}`, params);
    if ((response as any).error) {
        console.error("Error fetching mailer by ID:", (response as any).error);
        return { error: (response as any).error, details: (response as any)?.details };
    }
    return response;
};

export const updateMailerById = async (id: string, formUpdatedData: Record<string, any>) => {
    const response = await fetchWithToken(`/api/mailer/${id}`, formUpdatedData, { method: "PUT" });
    if ((response as any).error) {
        console.error("Error updating mailer by ID:", (response as any).error);
        return { error: (response as any).error, details: (response as any)?.details };
    }
    return response;
};

export const deleteMailerById = async (id: string, formUpdatedData: Record<string, any> = {}) => {
    const response = await fetchWithToken(`/api/mailer/${id}`, formUpdatedData, { method: "DELETE" });
    if ((response as any).error) {
        console.error("Error deleting mailer by ID:", (response as any).error);
        return { error: (response as any).error, details: (response as any)?.details };
    }
    return response;
};

