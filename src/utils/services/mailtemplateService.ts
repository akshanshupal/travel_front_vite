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

export const getMailtemplateById = async (id: string) => {
    const response = await fetchWithToken(`/api/mailtemplate/${id}`, getAccessContextParams());
    
    if (response.error) {
      console.error("Error fetching mailtemplate by ID:", response.error);
      return { error: response.error, details: response?.details };
    }
  
    return response;
};
