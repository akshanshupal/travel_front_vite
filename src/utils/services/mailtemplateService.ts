import { fetchWithToken } from "@/utils/fetchApi";
import { getPermissionForPath } from "@/hooks/use-access";

const getAccessContextParams = () => {
  const pathname = typeof window !== "undefined" ? String(window.location.pathname || "") : "";
  const permission = pathname ? getPermissionForPath(pathname) : null;
  if (permission) {
    return { accessPath: pathname, accessResource: permission.resource, accessAction: permission.action };
  }
  if (pathname) return { accessPath: pathname };
  return {};
};

export const getMailTemplate = async (params = {}) => {
  const response = await fetchWithToken("/api/mailtemplate", { ...getAccessContextParams(), ...params });
  
  if (response.error) {
    console.error("Error fetching mailtemplate:", response.error);
    return { error: response.error, details: response?.details };
  }

  return response;
};

export const addMailTemplate = async (formAddData: Record<string, any>) => {
    const response = await fetchWithToken('/api/mailtemplate', { ...getAccessContextParams(), ...formAddData }, { method: 'POST' });
    if (response.error) {
      console.error('Error adding mailtemplate:', response.error);
      return { error: response.error, details: response?.details };
    }
  
    return response;
};

export const getMailtemplateById = async (id: string) => {
    const response = await fetchWithToken(`/api/mailtemplate/${id}`, getAccessContextParams());
    
    if (response.error) {
      console.error("Error fetching mailtemplate by ID:", response.error);
      return { error: response.error, details: response?.details };
    }
  
    return response;
};

export const updateMailtemplateById = async (id: string, formUpdatedData: Record<string, any>) => {
    const response = await fetchWithToken(`/api/mailtemplate/${id}`, { ...getAccessContextParams(), ...formUpdatedData }, { method: 'PUT' });
    
    if (response.error) {
      console.error('Error updating mailtemplate by ID:', response.error);
      return { error: response.error, details: response?.details };
    }
  
    return response;
};

export const deleteMailTemplate = async (id: string, formUpdatedData: Record<string, any> = {}) => {
    const response = await fetchWithToken(`/api/mailtemplate/${id}`, { ...getAccessContextParams(), ...formUpdatedData }, { method: 'DELETE' });
    
    if (response.error) {
      console.error('Error deleting mailtemplate:', response.error);
      return { error: response.error, details: response?.details };
    }
  
    return response;
};
