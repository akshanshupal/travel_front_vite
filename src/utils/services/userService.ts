import { fetchWithToken } from "@/utils/fetchApi";

export const getUser = async (params = {}) => {
  const response = await fetchWithToken('/api/user', params);
  
  if ((response as any).error) {
    console.error('Error fetching user:', (response as any).error);
    return { error: (response as any).error, details: (response as any)?.details };
  }

  return response;
};

export const getUserById = async (id: string, params = {}) => {
    const response = await fetchWithToken(`/api/user/${id}`, params);
    if ((response as any).error) {
      console.error('Error fetching user by ID:', (response as any).error);
      return { error: (response as any).error, details: (response as any)?.details };
    }
    return response;
  };

export const getUserDelete = async (id: string, formUpdatedData: any) => {
    const response = await fetchWithToken(`/api/user/${id}`, formUpdatedData, { method: 'DELETE' });
    
    if ((response as any).error) {
      console.error('Error fetching user by ID:', (response as any).error);
      return { error: (response as any).error, details: (response as any)?.details };
    }
  
    return response;
  };

export const updateUserById = async (id: string, formUpdatedData: any) => {
    const response = await fetchWithToken(`/api/user/${id}`, formUpdatedData, { method: 'PUT' });
    if ((response as any).error) {
      
      console.error('Error fetching area by ID:', (response as any).error);
      return { error: (response as any).error, details: (response as any)?.details };
    }
    return response;
  };

export const addUser = async (formAddData: any) => {
    const response = await fetchWithToken('/api/user', formAddData, { method: 'POST' });
    
    if ((response as any).error) {
      console.error('Error fetching area:', (response as any).error);
      return { error: (response as any).error, details: (response as any)?.details };
    }
  
    return response;
  };

export const addCompanyConfig = async (formUpdatedData: any) => {
    const response = await fetchWithToken(`/api/companyconfig/update-company-config`, formUpdatedData, { method: 'PUT' });
    if ((response as any).error) {
      
      console.error('Error fetching Company by ID:', (response as any).error);
      return { error: (response as any).error, details: (response as any)?.details };
    }
    return response;
  };

export const getCompanyConfig = async (params = {}) => {
    const response = await fetchWithToken('/api/companyconfig', params);
    
    if ((response as any).error) {
      console.error('Error fetching user:', (response as any).error);
      return { error: (response as any).error, details: (response as any)?.details };
    }
  
    return response;
  };
