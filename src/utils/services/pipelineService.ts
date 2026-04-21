import { fetchWithToken } from "@/utils/fetchApi";

export const addPipeline = async (formAddData: Record<string, any>) => {
    const response = await fetchWithToken('/api/pipeline', formAddData, { method: 'POST' });
    if ((response as any).error) {
        console.error('Error adding pipeline:', (response as any).error);
        throw new Error((response as any).error?.message || 'Failed to add pipeline');
    }
    return response;
};

export const getPipeline = async (params: Record<string, any> = {}) => {
    const response = await fetchWithToken('/api/pipeline', params);
    if ((response as any).error) {
        console.error('Error fetching pipelines:', (response as any).error);
        throw new Error((response as any).error?.message || 'Failed to fetch pipelines');
    }
    return response;
};

export const getPipelineById = async (id: string, params: Record<string, any> = {}) => {
    const response = await fetchWithToken(`/api/pipeline/${id}`, params);
    if ((response as any).error) {
        console.error('Error fetching pipeline by ID:', (response as any).error);
        throw new Error((response as any).error?.message || 'Failed to fetch pipeline');
    }
    return response;
};

export const updatePipelineById = async (id: string, formUpdatedData: Record<string, any>) => {
    const response = await fetchWithToken(`/api/pipeline/${id}`, formUpdatedData, { method: 'PUT' });
    if ((response as any).error) {
        console.error('Error updating pipeline by ID:', (response as any).error);
        throw new Error((response as any).error?.message || 'Failed to update pipeline');
    }
    return response;
};

export const getPipelineDelete = async (id: string) => {
    const response = await fetchWithToken(`/api/pipeline/${id}`, {}, { method: 'DELETE' });
    if ((response as any).error) {
        console.error('Error deleting pipeline:', (response as any).error);
        throw new Error((response as any).error?.message || 'Failed to delete pipeline');
    }
    return response;
};
