import { fetchWithToken, fetchWithOutToken } from "@/utils/fetchApi";

export const addHotelimage = async (formAddData: any) => {
    const response = await fetchWithToken('/api/hotelimage', formAddData, { method: 'POST' });
   
    if ((response as any).error) {
      console.error('Error fetching image:', (response as any).error);
      return { error: (response as any).error, details: (response as any)?.details };
    }
    return response;
};

export const getHotelimageById = async (params = {}) => {
    const response = await fetchWithOutToken('/api/hotelimage', params);
    if ((response as any).error) {
      console.error('Error fetching image:', (response as any).error);
      return { error: (response as any).error, details: (response as any)?.details };
    }
  
    return response;
};

export const getHotelimageDelete = async (hotel: string, formUpdatedData: any) => {
  const response = await fetchWithToken(`/api/hotelimage/${hotel}`, formUpdatedData, { method: 'DELETE' });
  
  if ((response as any).error) {
    console.error('Error fetching image by ID:', (response as any).error);
    return { error: (response as any).error, details: (response as any)?.details };
  }
  return response;
};

export const updateHotelimageById = async (id: string, formUpdatedData: any) => {
  const response = await fetchWithToken(`/api/hotelimage/${id}`, formUpdatedData, { method: 'PUT' });
  
  if ((response as any).error) {
    console.error('Error updating image by ID:', (response as any).error);
    return { error: (response as any).error, details: (response as any)?.details };
  }
  return response;
};
