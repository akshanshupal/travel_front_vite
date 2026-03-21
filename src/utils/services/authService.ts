import { fetchWithOutToken } from "@/utils/fetchApi";
import { useStoreLogin } from "@/store/login";

export const authService = {
    login: async (payload: Record<string, unknown>) => {
        return await fetchWithOutToken("/api/auth/signin", payload, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        });
    },
    getAuthToken: async () => {
        const refreshToken = useStoreLogin.getState().refreshToken;
        return await fetchWithOutToken(
            "/api/auth/getAuthToken",
            { refreshToken },
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            },
        );
    },
};
