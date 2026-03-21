import { fetchWithToken } from "@/utils/fetchApi";

export const addBookingType = async (formAddData: Record<string, any>) => {
    const response = await fetchWithToken('/api/bookingstype', formAddData, { method: 'POST' });
    
    if (response.error) {
        console.error('Error fetching booking type:', response.error);
        return { error: response.error, details: response?.details };
    }
    return response;
};

export const getBookingtypeById = async (id: string) => {
    const response = await fetchWithToken(`/api/bookingstype/${id}`);
    if (response.error) {
        console.error('Error fetching booking type by ID:', response.error);
        return { error: response.error, details: response?.details };
    }

    return response;
};

export const getbookingtype = async (params: Record<string, any> = {}) => {
    const response = await fetchWithToken('/api/bookingstype', params);
    if (response.error) {
        console.error('Error fetching booking type:', response.error);
        return { error: response.error, details: response?.details };
    }

    return response;
};

export const getBookingDelete = async (id: string, formUpdatedData: Record<string, any>) => {
    const response = await fetchWithToken(`/api/bookingstype/${id}`, formUpdatedData, { method: 'DELETE' });
    
    if (response.error) {
        console.error('Error fetching booking type by ID:', response.error);
        return { error: response.error, details: response?.details };
    }
    return response;
};

export const updateBookingById = async (id: string, formUpdatedData: Record<string, any>) => {
    const response = await fetchWithToken(`/api/bookingstype/${id}`, formUpdatedData, { method: 'PUT' });
    
    if (response.error) {
        console.error('Error updating booking type by ID:', response.error);
        return { error: response.error, details: response?.details };
    }
    return response;
};
