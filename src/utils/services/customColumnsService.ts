import { fetchWithToken } from "@/utils/fetchApi";

export const getCustomColumns = async () => {
    const response = await fetchWithToken("/api/custom-columns", undefined, { method: "GET" });
    if ((response as any)?.error) throw new Error((response as any).error?.message || "Failed to load custom columns");
    return response as any;
};

export const saveCustomColumns = async (value: Record<string, any>) => {
    const response = await fetchWithToken("/api/custom-columns", { value }, { method: "PUT" });
    if ((response as any)?.error) throw new Error((response as any).error?.message || "Failed to save custom columns");
    return response as any;
};
