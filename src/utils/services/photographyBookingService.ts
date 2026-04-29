import { fetchWithToken } from "@/utils/fetchApi";

export const convertPhotographyEstimateToBooking = async (estimateId: string, payload: Record<string, unknown>) => {
    return await fetchWithToken(`/api/photography-booking/convert/${estimateId}`, payload, { method: "POST" });
};

export const createPhotographyBooking = async (payload: Record<string, unknown>) => {
    return await fetchWithToken("/api/photography-booking", payload, { method: "POST" });
};

export const getPhotographyBookings = async (params: Record<string, unknown> = {}) => {
    return await fetchWithToken("/api/photography-booking", params);
};

export const getPhotographyBookingById = async (id: string) => {
    return await fetchWithToken(`/api/photography-booking/${id}`);
};

export const updatePhotographyBookingById = async (id: string, payload: Record<string, unknown>) => {
    return await fetchWithToken(`/api/photography-booking/${id}`, payload, { method: "PUT" });
};
