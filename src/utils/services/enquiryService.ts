import { fetchWithToken } from "@/utils/fetchApi";

export const getEnquiries = async (params: Record<string, any> = {}) => {
    const response = await fetchWithToken("/api/enquiry", params);
    if ((response as any).error) {
        console.error("Error fetching enquiries:", (response as any).error);
        throw new Error((response as any).error?.message || "Failed to fetch enquiries");
    }
    return response;
};

export const getEnquiryById = async (id: string) => {
    const response = await fetchWithToken(`/api/enquiry/${id}`);
    if ((response as any).error) {
        console.error("Error fetching enquiry by ID:", (response as any).error);
        throw new Error((response as any).error?.message || "Failed to fetch enquiry");
    }
    return response;
};

export const updateEnquiryById = async (id: string, formUpdatedData: Record<string, any>) => {
    const response = await fetchWithToken(`/api/enquiry/${id}`, formUpdatedData, { method: "PUT" });
    if ((response as any).error) {
        console.error("Error updating enquiry by ID:", (response as any).error);
        throw new Error((response as any).error?.message || "Failed to update enquiry");
    }
    return response;
};
