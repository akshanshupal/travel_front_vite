import { fetchWithToken } from "@/utils/fetchApi";

export const getMailTemplate = async (params = {}) => {
  const response = await fetchWithToken('/api/mailtemplate', params);
  
  if (response.error) {
    console.error('Error fetching mailtemplate:', response.error);
    return { error: response.error, details: response?.details };
  }

  return response;
};

export const getMailtemplateById = async (id: string) => {
    const response = await fetchWithToken(`/api/mailtemplate/${id}`);
    
    if (response.error) {
      console.error('Error fetching mailtemplate by ID:', response.error);
      return { error: response.error, details: response?.details };
    }
  
    return response;
};
