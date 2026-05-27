import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useStoreSnackbar } from "./snackbar";
import { useStoreCompany } from "./company";
import { authService } from "@/utils/services/authService";

type User = {
    id: string;
    name: string;
    email: string;
    type?: string;
    role?: {
        id: string;
        title: string;
        permissions: Record<string, Partial<Record<"view" | "add" | "edit" | "delete", boolean>>>;
    } | null;
    avatar?: string;
    avatarUrl?: string;
    image?: string;
    profileImg?: string;
};

type LoginState = {
    user: User | null;
    authToken: string | null;
    refreshToken: string | null;
    login: (payload: Record<string, unknown>) => Promise<void>;
    getNewAuthToken: () => Promise<void>;
    logout: () => void;
};

export const useStoreLogin = create<LoginState>()(
    persist(
        (set) => ({
            user: null,
            authToken: null,
            refreshToken: null,
            login: async (userData) => {
                try {
                    const response = await authService.login(userData);
                    const user = (response as any)?.user;
                    const userType = String(user?.type || "").toUpperCase();
                    const hasRole = Boolean(user?.role && (user.role.id || user.role._id || user.role.title));
                    if (userType !== "ADMIN" && !hasRole) {
                        const error = new Error("Role is not assigned to this user.");
                        useStoreSnackbar.getState().showSnackbar({
                            title: "Access denied",
                            description: "Role is not assigned to this user.",
                            color: "danger",
                        });
                        throw error;
                    }
                    set({
                        user,
                        authToken: (response as any)?.token,
                        refreshToken: (response as any)?.refreshToken,
                    });
                } catch (error: any) {
                    useStoreSnackbar
                        .getState()
                        .showSnackbar({
                            title: "Login failed",
                            description:
                                error?.error?.message ||
                                error?.message ||
                                "Something went wrong",
                            color: "danger",
                        });
                    throw error;
                }
            },
            getNewAuthToken: async () => {
                try {
                    const response = await authService.getAuthToken();
                    if ((response as any)?.error) throw new Error((response as any).error);
                    set({ authToken: response.token });
                } catch (error) {
                    throw error as Error;
                }
            },
            logout: () => {
                set({ user: null, authToken: null, refreshToken: null });
                useStoreCompany.getState().clearCompany();
                if (typeof window === "undefined") return;
                try {
                    window.localStorage.removeItem("tz-auth-storage");
                    window.localStorage.removeItem("tz-company-storage");
                    window.localStorage.setItem("tz-logout", String(Date.now()));
                } catch {
                }
            },
        }),
        { name: "tz-auth-storage" },
    ),
);
