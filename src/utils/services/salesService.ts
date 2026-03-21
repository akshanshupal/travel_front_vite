import { fetchWithToken } from "@/utils/fetchApi";

export const getSalesEx = async (params: any = {}) => {
  const response = await fetchWithToken('/api/user', params);
  if (response.error) {
    console.error('Error fetching sales Ex by ID:', response.error);
    return { error: response.error, details: response?.details };
  }
  return response;
};
