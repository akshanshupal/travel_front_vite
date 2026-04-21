import { fetchWithToken } from "@/utils/fetchApi";

export const addCampaign = async (formAddData: Record<string, any>) => {
    const response = await fetchWithToken('/api/campaign', formAddData, { method: 'POST' });
    if ((response as any).error) {
        console.error('Error adding campaign:', (response as any).error);
        throw new Error((response as any).error?.message || 'Failed to add campaign');
    }
    return response;
};

export const getCampaign = async (params: Record<string, any> = {}) => {
    const response = await fetchWithToken('/api/campaign', params);
    if ((response as any).error) {
        console.error('Error fetching campaigns:', (response as any).error);
        throw new Error((response as any).error?.message || 'Failed to fetch campaigns');
    }
    return response;
};

export const getCampaignById = async (id: string, params: Record<string, any> = {}) => {
    const response = await fetchWithToken(`/api/campaign/${id}`, params);
    if ((response as any).error) {
        console.error('Error fetching campaign by ID:', (response as any).error);
        throw new Error((response as any).error?.message || 'Failed to fetch campaign');
    }
    return response;
};

export const updateCampaignById = async (id: string, formUpdatedData: Record<string, any>) => {
    const response = await fetchWithToken(`/api/campaign/${id}`, formUpdatedData, { method: 'PUT' });
    if ((response as any).error) {
        console.error('Error updating campaign by ID:', (response as any).error);
        throw new Error((response as any).error?.message || 'Failed to update campaign');
    }
    return response;
};

export const getCampaignDelete = async (id: string) => {
    const response = await fetchWithToken(`/api/campaign/${id}`, {}, { method: 'DELETE' });
    if ((response as any).error) {
        console.error('Error deleting campaign:', (response as any).error);
        throw new Error((response as any).error?.message || 'Failed to delete campaign');
    }
    return response;
};

export const updateCampaignPauseFunction = async (data: { status: boolean; campaignIds: string[] }) => {
    const response = await fetchWithToken('/api/campaign/pause', data, { method: 'PUT' });
    if ((response as any).error) {
        console.error('Error pausing campaign:', (response as any).error);
        throw new Error((response as any).error?.message || 'Failed to pause campaign');
    }
    return response;
};
