import fetchWithToken from "@/utils/fetchApi";

export const dashboardService = {
    getSummary: async (params: Record<string, unknown> = {}) => {
        const response = await fetchWithToken("/api/dashboard/getSummary", params);
        if ((response as any)?.error) return response as any;
        return response as any;
    },
};

