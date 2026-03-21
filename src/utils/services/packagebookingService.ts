import { fetchWithToken } from "@/utils/fetchApi";

export const addPackageBooking = async (formAddData: Record<string, any>) => {
    
    const response = await fetchWithToken('/api/packagebooking', formAddData, { method: 'POST' });
    
    if (response.error) {
      console.error('Error fetching package:', response.error);
      return { error: response.error, details: response?.details };
    }
    return response;
  };

export const sendPackageBooking = async (formAddData: Record<string, any>) => {
    
    const response = await fetchWithToken('/api/packagebooking/send-sms', formAddData, { method: 'POST' });
    
    if (response.error) {
      console.error('Error fetching package:', response.error);
      return { error: response.error, details: response?.details };
    }
    return response;
  };
  
  export const getPackageById = async (id: string) => {
    const response = await fetchWithToken(`/api/packagebooking/${id}`);
    if (response.error) {
      console.error('Error fetching package by ID:', response.error);
      return { error: response.error, details: response?.details };
    }
  
    return response;
  };
  // ..............GET..............

  export const getPackageBooking = async (params: Record<string, any> = {}) => {
    const response = await fetchWithToken('/api/packagebooking', params);
    if (response.error) {
      console.error('Error fetching packagebooking:', response.error);
      return { error: response.error, details: response?.details };
    }
  
    return response;
  };

//  DELETE
 
export const getPackageBookingDelete = async (id: string, formUpdatedData?: Record<string, any>) => {
  const response = await fetchWithToken(`/api/packagebooking/${id}`, formUpdatedData, { method: 'DELETE' });
  
  if (response.error) {
    console.error('Error fetching Package by ID:', response.error);
    return { error: response.error, details: response?.details };
  }
  return response;
};


export const updatePackageBookingById = async (id: string, formUpdatedData: Record<string, any>) => {
  
  const response = await fetchWithToken(`/api/packagebooking/${id}`, formUpdatedData, { method: 'PUT' });
  
  if (response.error) {
    console.error('Error updating package by ID:', response.error);
    return { error: response.error, details: response?.details };
  }
  return response;
};
