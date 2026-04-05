import { fetchWithToken, fetchWithOutToken } from "@/utils/fetchApi";

export const getPackageVoucher = async (params: Record<string, any> = {}) => {
  const response = await fetchWithToken('/api/packagevoucher', params);
  
  if (response.error) {
    console.error('Error fetching Packagevoucher:', response.error);
    return { error: response.error, details: response?.details };
  }

  return response;
};

export const getPackageVoucherPublic = async (params: Record<string, any> = {}) => {
  const response = await fetchWithOutToken('/api/packagevoucher', params);
  
  if (response.error) {
    console.error('Error fetching Packagevoucher public:', response.error);
    return { error: response.error, details: response?.details };
  }

  return response;
};

export const getPackageVoucherPublicById = async (id: string) => {
  const response = await fetchWithOutToken(`/api/packagevoucher/${id}`);

  if (response.error) {
    console.error("Error fetching Packagevoucher public by ID:", response.error);
    return { error: response.error, details: response?.details };
  }

  return response;
};

export const getPackageVoucherById = async (id: string) => {
  const response = await fetchWithToken(`/api/packagevoucher/${id}`);
  
  if (response.error) {
    console.error('Error fetching Packagevoucher by ID:', response.error);
    return { error: response.error, details: response?.details };
  }

  return response;
};

export const updatePackageVoucherById = async (id: string, formUpdatedData: Record<string, any>) => {
  const response = await fetchWithToken(`/api/packagevoucher/${id}`, formUpdatedData, { method: 'PUT' });
  
  if (response.error) {
    console.error('Error updating Packagevoucher by ID:', response.error);
    return { error: response.error, details: response?.details };
  }

  return response;
};

export const getPackageVoucherDelete = async (id: string, formUpdatedData?: Record<string, any>) => {
  const response = await fetchWithToken(`/api/packagevoucher/${id}`, formUpdatedData, { method: 'DELETE' });
  
  if (response.error) {
    console.error('Error fetching Packagevoucher by ID:', response.error);
    return { error: response.error, details: response?.details };
  }

  return response;
};

export const addPackageVoucher = async (formAddData: Record<string, any>) => {
  const response = await fetchWithToken('/api/packagevoucher', formAddData, { method: 'POST' });
  
  if (response.error) {
    console.error('Error fetching Packagevoucher:', response.error);
    return { error: response.error, details: response?.details };
  }

  return response;
};
