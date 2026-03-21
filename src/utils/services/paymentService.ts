import { fetchWithToken, fetchWithOutToken } from "@/utils/fetchApi";

export const getpayment = async (params: Record<string, any> = {}) => {
  const response = await fetchWithToken('/api/payments', params);
  
  if (response.error) {
    console.error('Error fetching payment:', response.error);
    return { error: response.error, details: response?.details };
  }

  return response;
};

export const getPaymentById = async (id: string) => {
  const response = await fetchWithToken(`/api/payments/${id}`);
  
  if (response.error) {
    console.error('Error fetching payments by ID:', response.error);
    return { error: response.error, details: response?.details };
  }

  return response;
};

export const updatePaymentById = async (id: string, formUpdatedData: Record<string, any>) => {
  const response = await fetchWithToken(`/api/payments/${id}`, formUpdatedData, { method: 'PUT' });
  
  if (response.error) {
    console.error('Error updating area by ID:', response.error);
    return { error: response.error, details: response?.details };
  }

  return response;
};

export const getPaymentDelete = async (id: string, formUpdatedData: Record<string, any>) => {
  const response = await fetchWithToken(`/api/payments/${id}`, formUpdatedData, { method: 'DELETE' });
  
  if (response.error) {
    console.error('Error fetching area by ID:', response.error);
    return { error: response.error, details: response?.details };
  }

  return response;
};

export const addPayment = async (formAddData: Record<string, any>) => {
  const response = await fetchWithToken('/api/payments', formAddData, { method: 'POST' });
  
  if (response.error) {
    console.error('Error fetching payment:', response.error);
    return { error: response.error, details: response?.details };
  }

  return response;
};

export const getReceipt = async (id: string) => {
  const response = await fetchWithOutToken(`/api/payments/receipt/${id}`);
  
  if (response.error) {
    console.error('Error fetching payments by ID:', response.error);
    return { error: response.error, details: response?.details };
  }

  return response;
};

export const multiPaymentsDelete = async (ids: string[]) => {
  const response = await fetchWithToken('/api/payments-delete-multi', { ids : ids}, { method: 'POST' });
  
  if (response.error) {
    console.error('Error fetching payment:', response.error);
    return { error: response.error, details: response?.details };
  }

  return response;
};

export const getSummary = async (params: Record<string, any> = {}) => {
  const response = await fetchWithToken('/api/payments/summary', params);
  
  if (response.error) {
    console.error('Error fetching payment:', response.error);
    return { error: response.error, details: response?.details };
  }

  return response;
};

export const getAgentwisePaymentSummary = async (params: Record<string, any> = {}) => {
  const response = await fetchWithToken('/api/payments/agent-wise-payments', params);
  
  if (response.error) {
    console.error('Error fetching payment:', response.error);
    return { error: response.error, details: response?.details };
  }

  return response;
};
