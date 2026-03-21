import { fetchWithToken } from "@/utils/fetchApi";

export const addVendor = async (formAddData: Record<string, any>) => {
    const response = await fetchWithToken('/api/vendor', formAddData, { method: 'POST' });
    
    if (response.error) {
      console.error('Error fetching vendor:', response.error);
      return { error: response.error, details: response?.details };
    }
    return response;
};

export const getVendorById = async (id: string, params: Record<string, any> = {}) => {
    const response = await fetchWithToken(`/api/vendor/${id}` , params);
    if (response.error) {
      console.error('Error fetching vendor by ID:', response.error);
      return { error: response.error, details: response?.details };
    }

    return response;
};

export const getVendor = async (params: Record<string, any> = {}) => {
    const response = await fetchWithToken('/api/vendor', params);
    if (response.error) {
      console.error('Error fetching vendor:', response.error);
      return { error: response.error, details: response?.details };
    }

    return response;
};

export const getVendorDelete = async (id: string, formUpdatedData: Record<string, any>) => {
  const response = await fetchWithToken(`/api/vendor/${id}`, formUpdatedData, { method: 'DELETE' });
  
  if (response.error) {
    console.error('Error fetching vendor by ID:', response.error);
    return { error: response.error, details: response?.details };
  }
  return response;
};

export const updateVendorById = async (id: string, formUpdatedData: Record<string, any>) => {
  const response = await fetchWithToken(`/api/vendor/${id}`, formUpdatedData, { method: 'PUT' });
  
  if (response.error) {
    console.error('Error updating vendor by ID:', response.error);
    return { error: response.error, details: response?.details };
  }
  return response;
};
