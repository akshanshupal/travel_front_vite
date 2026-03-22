import { type PropsWithChildren, useEffect } from "react";
import { RouterProvider } from "react-aria-components";
import { useLocation, useNavigate } from "react-router";
import type { NavigateOptions } from "react-router";
import { getPermissionForPath, useAccess } from "@/hooks/use-access";
import { useStoreSnackbar } from "@/store/snackbar";
import { useStoreLogin } from "@/store/login";

declare module "react-aria-components" {
    interface RouterConfig {
        routerOptions: NavigateOptions;
    }
}

export const RouteProvider = ({ children }: PropsWithChildren) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { can, user } = useAccess();
    const showSnackbar = useStoreSnackbar((s) => s.showSnackbar);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const onStorage = (e: StorageEvent) => {
            if (e.key !== "tz-logout") return;
            useStoreLogin.getState().logout();
            navigate("/login", { replace: true });
        };
        window.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage);
    }, [navigate]);

    useEffect(() => {
        // Public routes that don't require login
        const publicRoutes = ["/package-mail", "/package-voucher", "/payments-receipt", "/hotel-images"];
        if (publicRoutes.some(route => pathname.startsWith(route))) return;

        if (pathname === "/login" || pathname === "/") {
            if (user) {
                navigate("/dashboard", { replace: true });
            } else if (pathname === "/") {
                navigate("/login", { replace: true });
            }
            return;
        }

        if (!user) {
            navigate("/login", { replace: true });
            return;
        }

        const permission = getPermissionForPath(pathname);
        if (!permission) return;
        const getFallbackPath = () => {
            const candidates = [
                "/dashboard",
                "/itinerary/list",
                "/bookings/booking",
                "/packages/list",
                "/settings/user",
                "/settings/role",
            ];
            for (const path of candidates) {
                const p = getPermissionForPath(path);
                if (!p) continue;
                if (can(p.resource, "view")) return path;
            }
            return "/login";
        };

        if (!can(permission.resource, permission.action)) {
            showSnackbar({
                title: "Not authorised",
                description: "You don't have access to this screen.",
                color: "danger",
            });
            navigate(getFallbackPath(), { replace: true });
        }
    }, [can, navigate, pathname, showSnackbar, user]);

    return <RouterProvider navigate={navigate}>{children}</RouterProvider>;
};
