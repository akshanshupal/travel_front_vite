import { fetchWithToken } from "@/utils/fetchApi";

export const getAssignment = async (params: Record<string, any> = {}) => {
    const response = await fetchWithToken('/api/assignment', params);
    
    if (response.error) {
        console.error('Error fetching assignment:', response.error);
        return { error: response.error, details: response?.details };
    }

    return response;
};

export const getAssignmentById = async (id: string, params: Record<string, any> = {}) => {
    const response = await fetchWithToken(`/api/assignment/${id}`, params);
    
    if (response.error) {
        console.error('Error fetching assignment by ID:', response.error);
        return { error: response.error, details: response?.details };
    }

    return response;
};

export const updateAssignmentById = async (id: string, formUpdatedData: Record<string, any>) => {
    const response = await fetchWithToken(`/api/assignment/${id}`, formUpdatedData, { method: 'PUT' });
    
    if (response.error) {
        console.error('Error updating assignment by ID:', response.error);
        return { error: response.error, details: response?.details };
    }

    return response;
};

export const verifyAssignment = async (id: string, formUpdatedData: Record<string, any>) => {
    const response = await fetchWithToken(`/api/assignment/verify/${id}`, formUpdatedData, { method: 'PUT' });
    
    if (response.error) {
        console.error('Error updating assignment by ID:', response.error);
        return { error: response.error, details: response?.details };
    }

    return response;
};

export const finishedAssignment = async (id: string, formUpdatedData: Record<string, any>) => {
    const response = await fetchWithToken(`/api/assignment/finished/${id}`, formUpdatedData, { method: 'PUT' });
    
    if (response.error) {
        console.error('Error updating assignment by ID:', response.error);
        return { error: response.error, details: response?.details };
    }

    return response;
};

export const bookingStatusAssignment = async (id: string, formUpdatedData: Record<string, any>) => {
    const response = await fetchWithToken(`/api/assignment/bookingStatus/${id}`, formUpdatedData, { method: 'PUT' });
    
    if (response.error) {
        console.error('Error updating assignment by ID:', response.error);
        return { error: response.error, details: response?.details };
    }

    return response;
};

export const paymentStatusAssignment = async (id: string, formUpdatedData: Record<string, any>) => {
    const response = await fetchWithToken(`/api/assignment/paymentStatus/${id}`, formUpdatedData, { method: 'PUT' });
    
    if (response.error) {
        console.error('Error updating assignment by ID:', response.error);
        return { error: response.error, details: response?.details };
    }

    return response;
};

export const addAdjustment = async (id: string, formUpdatedData: Record<string, any>) => {
    const response = await fetchWithToken(`/api/assignment/adjustment/${id}`, formUpdatedData, { method: 'PUT' });
    
    if (response.error) {
        console.error('Error adding adjustment:', response.error);
        return { error: response.error, details: response?.details };
    }

    return response;
};

export const deleteAdjustment = async (id: string, formUpdatedData: Record<string, any>) => {
    const response = await fetchWithToken(`/api/assignment/adjustment/${id}`, formUpdatedData, { method: 'DELETE' });
    
    if (response.error) {
        console.error('Error deleting adjustment:', response.error);
        return { error: response.error, details: response?.details };
    }

    return response;
};

export const getAssignmentDelete = async (id: string, formUpdatedData: Record<string, any> = {}) => {
    const response = await fetchWithToken(`/api/assignment/${id}`, formUpdatedData, { method: 'DELETE' });
    
    if (response.error) {
        console.error('Error fetching assignment by ID:', response.error);
        return { error: response.error, details: response?.details };
    }

    return response;
};

export const addAssignment = async (formAddData: Record<string, any>) => {
    const response = await fetchWithToken('/api/assignment', formAddData, { method: 'POST' });
    
    if (response.error) {
        console.error('Error fetching assignment :', response.error);
        return { error: response.error, details: response?.details };
    }

    return response;
};

export const AssignmentWiseGraph = async (params: Record<string, any> = {}) => {
    const response = await fetchWithToken('/api/assignment/graph', params);
    
    if (response.error) {
        console.error('Error fetching assignment graph:', response.error);
        return { error: response.error, details: response?.details };
    }

    return response;
};

export const finishedPackageWiseSummary = async (params: Record<string, any> = {}) => {
    const response = await fetchWithToken("/api/assignment/finished-package-wise-summary", params);

    if (response.error) {
        console.error("Error fetching finished package wise summary:", response.error);
        return { error: response.error, details: response?.details };
    }

    return response;
};

export const profitReports = async (params: Record<string, any> = {}) => {
    const response = await fetchWithToken("/api/assignment/profit-reports", params);

    if (response.error) {
        console.error("Error fetching profit reports:", response.error);
        return { error: response.error, details: response?.details };
    }

    return response;
};
