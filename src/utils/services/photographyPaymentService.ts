import { fetchWithOutToken, fetchWithToken } from "@/utils/fetchApi";

export const getPhotographyPayments = async (params: Record<string, unknown> = {}) => {
    return await fetchWithToken("/api/photography-payment", params);
};

export const getPhotographyPaymentById = async (id: string) => {
    return await fetchWithToken(`/api/photography-payment/${id}`);
};

export const createPhotographyPayment = async (payload: Record<string, unknown>) => {
    return await fetchWithToken("/api/photography-payment", payload, { method: "POST" });
};

export const updatePhotographyPaymentById = async (id: string, payload: Record<string, unknown>) => {
    return await fetchWithToken(`/api/photography-payment/${id}`, payload, { method: "PUT" });
};

export const deletePhotographyPaymentById = async (id: string) => {
    return await fetchWithToken(`/api/photography-payment/${id}`, {}, { method: "DELETE" });
};

export const getPhotographyPaymentReceipt = async (id: string) => {
    return await fetchWithOutToken(`/api/photography-payment/receipt/${id}`);
};
