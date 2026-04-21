import { fetchWithToken } from "@/utils/fetchApi";

export const addContactProperty = async (formData: Record<string, any>) => {
    const response = await fetchWithToken('/api/lead-contact-properties', formData, { method: 'POST' });
    if ((response as any).error) throw new Error((response as any).error?.message || 'Failed to add contact property');
    return response;
};

export const getContactProperties = async (params: Record<string, any> = {}) => {
    const response = await fetchWithToken('/api/lead-contact-properties', params);
    if ((response as any).error) throw new Error((response as any).error?.message || 'Failed to fetch contact properties');
    return response;
};

export const getContactPropertyById = async (id: string, params: Record<string, any> = {}) => {
    const response = await fetchWithToken(`/api/lead-contact-properties/${id}`, params);
    if ((response as any).error) throw new Error((response as any).error?.message || 'Failed to fetch contact property');
    return response;
};

export const updateContactPropertyById = async (id: string, formData: Record<string, any>) => {
    const response = await fetchWithToken(`/api/lead-contact-properties/${id}`, formData, { method: 'PUT' });
    if ((response as any).error) throw new Error((response as any).error?.message || 'Failed to update contact property');
    return response;
};

export const deleteContactProperty = async (id: string) => {
    const response = await fetchWithToken(`/api/lead-contact-properties/${id}`, {}, { method: 'DELETE' });
    if ((response as any).error) throw new Error((response as any).error?.message || 'Failed to delete contact property');
    return response;
};
