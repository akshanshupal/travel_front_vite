import { fetchWithToken, fetchWithOutToken } from "@/utils/fetchApi";

export const getSavedItinerary = async (params = {}) => {
    const response = await fetchWithToken('/api/saved-itinerary', params);
    
    if ((response as any).error) {
      console.error('Error fetching area:', (response as any).error);
      return { error: (response as any).error, details: (response as any)?.details };
    }
  
    return response;
};

export const addSavedItinerary = async (formAddData: any) => {
    const response = await fetchWithToken('/api/saved-itinerary', formAddData, { method: 'POST' });
    
    if ((response as any).error) {
      console.error('Error fetching send mail:', (response as any).error);
      return { error: (response as any).error, details: (response as any)?.details };
    }
  
    return response;
};

export const deleteSavedItinerary = async (id: string, formUpdatedData: any) => {
    const response = await fetchWithToken(`/api/saved-itinerary/${id}`, formUpdatedData, { method: 'DELETE' });
    
    if ((response as any).error) {
      console.error('Error fetching Mail by ID:', (response as any).error);
      return { error: (response as any).error, details: (response as any)?.details };
    }
    
    return response;
};

export const getSavedItineraryById = async (id: string, params = {}) => {
    const response = await fetchWithOutToken(`/api/saved-itinerary/${id}`, params);
    if ((response as any).error) {
      console.error('Error fetching Mail by ID:', (response as any).error);
      return { error: (response as any).error, details: (response as any)?.details };
    }
    return response;
};

export const updateSavedItineraryById = async (id: string, formUpdatedData: any) => {
    const response = await fetchWithToken(`/api/saved-itinerary/${id}`, formUpdatedData, { method: 'PUT' });
    
    if ((response as any).error) {
      console.error('Error updating Mail by ID:', (response as any).error);
      return { error: (response as any).error, details: (response as any)?.details };
    }
  
    return response;
};

export const agentWiseSavedItineraries = async (params = {}) => {
  const response = await fetchWithToken('/api/saved-itinerary/agent-wise-saved-itinerary', params);
  if ((response as any).error) {
    console.error('Error updating Mail by ID:', (response as any).error);
    return { error: (response as any).error, details: (response as any)?.details };
  }

  return response;
};

export const agentDurationWiseSavedItineraries = async (params = {}) => {
  const response = await fetchWithToken('/api/saved-itinerary/agent-duration-wise-saved-itinerary', params);
  if ((response as any).error) {
    console.error('Error updating Mail by ID:', (response as any).error);
    return { error: (response as any).error, details: (response as any)?.details };
  }

  return response;
};
