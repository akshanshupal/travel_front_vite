import { fetchWithToken, fetchWithOutToken } from "@/utils/fetchApi";

export const getHotels = async (params = {}) => {
  const response = await fetchWithToken('/api/hotel', params);
  if (response.error) {
    console.error('Error fetching hotels:', response.error);
    return { error: response.error, details: response?.details };
  }
  return response;
};

export const getHotelCategory = async (params = {}) => {
  const response = await fetchWithToken('/api/hotelcategory', params);
  if (response.error) {
    console.error('Error fetching hotel categories:', response.error);
    return { error: response.error, details: response?.details };
  }
  return response;
};

export const getHotelById = async (id: string, params = {}) => {
  const response = await fetchWithToken(`/api/hotel/${id}`, params);
  if (response.error) {
    console.error('Error fetching hotel by ID:', response.error);
    return { error: response.error, details: response?.details };
  }
  return response;
};

export const getHotelByIdPublic = async (id: string, params = {}) => {
  const response = await fetchWithOutToken(`/api/hotel/${id}`, params);
  if (response.error) {
    console.error('Error fetching hotel by ID public:', response.error);
    return { error: response.error, details: response?.details };
  }
  return response;
};

export const getHotelCategoryById = async (id: string) => {
  const response = await fetchWithToken(`/api/hotelcategory/${id}`);
  if (response.error) {
    console.error('Error fetching hotel category by ID:', response.error);
    return { error: response.error, details: response?.details };
  }
  return response;
};
