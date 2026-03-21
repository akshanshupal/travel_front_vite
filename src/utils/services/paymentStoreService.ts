import { fetchWithToken } from "@/utils/fetchApi";

export const addPaymentStore = async (formAddData: Record<string, any>) => {
    const response = await fetchWithToken('/api/paymentstore', formAddData, { method: 'POST' });
    
    if (response.error) {
      console.error('Error fetching Payment store:', response.error);
      return { error: response.error, details: response?.details };
    }
    return response;
};

export const getPaymentStoreById = async (id: string) => {
    const response = await fetchWithToken(`/api/paymentstore/${id}`);
    if (response.error) {
      console.error('Error fetching Payment store by ID:', response.error);
      return { error: response.error, details: response?.details };
    }

    return response;
};

export const getPaymentStore = async (params: Record<string, any> = {}) => {
    const response = await fetchWithToken('/api/paymentstore', params);
    if (response.error) {
      console.error('Error fetching Payment store:', response.error);
      return { error: response.error, details: response?.details };
    }

    return response;
};

export const getPaymentStoreDelete = async (id: string, formUpdatedData: Record<string, any>) => {
  const response = await fetchWithToken(`/api/paymentstore/${id}`, formUpdatedData, { method: 'DELETE' });
  
  if (response.error) {
    console.error('Error fetching Payment store by ID:', response.error);
    return { error: response.error, details: response?.details };
  }
  return response;
};

export const updatePaymentStoreById = async (id: string, formUpdatedData: Record<string, any>) => {
  const response = await fetchWithToken(`/api/paymentstore/${id}`, formUpdatedData, { method: 'PUT' });
  
  if (response.error) {
    console.error('Error updating Payment store by ID:', response.error);
    return { error: response.error, details: response?.details };
  }
  return response;
};
