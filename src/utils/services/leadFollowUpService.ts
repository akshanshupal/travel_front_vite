import { fetchWithToken } from "@/utils/fetchApi";

const ensureSuccess = (response: any, fallback: string) => {
    if (response?.error) throw new Error(response.error?.message || fallback);
    return response;
};

export const getLeadFollowUps = async (params: Record<string, any> = {}) =>
    ensureSuccess(await fetchWithToken("/api/lead-follow-ups", params), "Failed to fetch follow-ups");

export const addLeadFollowUp = async (data: Record<string, any>) =>
    ensureSuccess(await fetchWithToken("/api/lead-follow-ups", data, { method: "POST" }), "Failed to create follow-up");

export const updateLeadFollowUp = async (id: string, data: Record<string, any>) =>
    ensureSuccess(await fetchWithToken(`/api/lead-follow-ups/${id}`, data, { method: "PUT" }), "Failed to update follow-up");
