import { fetchWithToken } from "@/utils/fetchApi";

export const addLeads = async (formAddData: Record<string, any>) => {
    const response = await fetchWithToken('/api/leads', formAddData, { method: 'POST' });
    if ((response as any).error) {
        console.error('Error adding lead:', (response as any).error);
        throw new Error((response as any).error?.message || 'Failed to add lead');
    }
    return response;
};

export const getLeads = async (params: Record<string, any> = {}) => {
    const response = await fetchWithToken('/api/leads', params);
    if ((response as any).error) {
        console.error('Error fetching leads:', (response as any).error);
        throw new Error((response as any).error?.message || 'Failed to fetch leads');
    }
    return response;
};

export const getLeadsById = async (id: string, params: Record<string, any> = {}) => {
    const response = await fetchWithToken(`/api/leads/${id}`, params);
    if ((response as any).error) {
        console.error('Error fetching lead by ID:', (response as any).error);
        throw new Error((response as any).error?.message || 'Failed to fetch lead');
    }
    return response;
};

export const updateLeadsById = async (id: string, formUpdatedData: Record<string, any>) => {
    const response = await fetchWithToken(`/api/leads/${id}`, formUpdatedData, { method: 'PUT' });
    if ((response as any).error) {
        console.error('Error updating lead by ID:', (response as any).error);
        throw new Error((response as any).error?.message || 'Failed to update lead');
    }
    return response;
};

export const getLeadsDelete = async (id: string) => {
    const response = await fetchWithToken(`/api/leads/${id}`, {}, { method: 'DELETE' });
    if ((response as any).error) {
        console.error('Error deleting lead:', (response as any).error);
        throw new Error((response as any).error?.message || 'Failed to delete lead');
    }
    return response;
};
