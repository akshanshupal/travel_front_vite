import { fetchWithToken } from "@/utils/fetchApi";

const PHOTOGRAPHY_MODULE = "photography";

export const addPhotographyPaymentStore = async (payload: Record<string, any>) => {
    return await fetchWithToken("/api/paymentstore", { ...payload, module: PHOTOGRAPHY_MODULE }, { method: "POST" });
};

export const getPhotographyPaymentStore = async (params: Record<string, any> = {}) => {
    return await fetchWithToken("/api/paymentstore", { ...params, module: PHOTOGRAPHY_MODULE });
};

export const getPhotographyPaymentStoreById = async (id: string) => {
    return await fetchWithToken(`/api/paymentstore/${id}`, { module: PHOTOGRAPHY_MODULE });
};

export const updatePhotographyPaymentStoreById = async (id: string, payload: Record<string, any>) => {
    return await fetchWithToken(`/api/paymentstore/${id}?module=${PHOTOGRAPHY_MODULE}`, { ...payload, module: PHOTOGRAPHY_MODULE }, { method: "PUT" });
};

export const deletePhotographyPaymentStoreById = async (id: string) => {
    return await fetchWithToken(`/api/paymentstore/${id}?module=${PHOTOGRAPHY_MODULE}`, {}, { method: "DELETE" });
};
