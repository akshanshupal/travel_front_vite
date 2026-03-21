import { fetchWithToken } from "@/utils/fetchApi";

export const addPackage = async (formAddData: Record<string, any>) => {
    const response = await fetchWithToken('/api/package', formAddData, { method: 'POST' });
    
    if (response.error) {
      console.error('Error fetching package:', response.error);
      return { error: response.error, details: response?.details };
    }
    return response;
};

export const getPackageById = async (id: string) => {
    const response = await fetchWithToken(`/api/package/${id}`);
    if (response.error) {
      console.error('Error fetching package by ID:', response.error);
      return { error: response.error, details: response?.details };
    }

    return response;
};

export const getPackage = async (params: Record<string, any> = {}) => {
    const response = await fetchWithToken('/api/package', params);
    if (response.error) {
      console.error('Error fetching package:', response.error);
      return { error: response.error, details: response?.details };
    }

    return response;
};

export const getPackageDelete = async (id: string, formUpdatedData: Record<string, any>) => {
  const response = await fetchWithToken(`/api/package/${id}`, formUpdatedData, { method: 'DELETE' });
  
  if (response.error) {
    console.error('Error fetching Package by ID:', response.error);
    return { error: response.error, details: response?.details };
  }
  return response;
};

export const updatePackageById = async (id: string, formUpdatedData: Record<string, any>) => {
  const response = await fetchWithToken(`/api/package/${id}`, formUpdatedData, { method: 'PUT' });
  
  if (response.error) {
    console.error('Error updating package by ID:', response.error);
    return { error: response.error, details: response?.details };
  }
  return response;
};
