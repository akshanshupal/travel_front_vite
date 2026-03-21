import { PropsWithChildren, useEffect, useMemo } from "react";
import { SidebarNavigationSlim } from "@/components/application/app-navigation/sidebar-navigation/sidebar-slim";
import { HeaderNavigationBase } from "@/components/application/app-navigation/header-navigation";
import { getMenuItems } from "@/components/application/app-navigation/menu-items";
import { useStoreSidebar } from "@/store/sidebar";
import { useStoreLogin } from "@/store/login";
import { useAccess } from "@/hooks/use-access";
import { useLocation, useNavigate } from "react-router";

export const DefaultLayout = ({ children }: PropsWithChildren) => {
    const { sidebar, closeSidebar, openSidebar } = useStoreSidebar();
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const authToken = useStoreLogin((s) => s.authToken);
    const { can } = useAccess();

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 720) {
                closeSidebar();
            } else {
                openSidebar();
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [closeSidebar, openSidebar]);

    useEffect(() => {
        if (typeof window === "undefined") return;
        if (pathname === "/login") return;

        const stored = window.localStorage.getItem("tz-auth-storage");
        const storedToken = (() => {
            if (!stored) return null;
            try {
                const parsed = JSON.parse(stored) as any;
                return parsed?.state?.authToken ?? null;
            } catch {
                return null;
            }
        })();

        if (!authToken && !storedToken) {
            navigate("/login", { replace: true });
        }
    }, [authToken, navigate, pathname]);

    const { headerItems, sidebarItems, footerItems } = useMemo(() => getMenuItems(pathname, can), [can, pathname]);

    return (
        <div className="min-h-dvh bg-white dark:bg-[#0B0D12] text-gray-900 dark:text-white">
            <HeaderNavigationBase activeUrl={pathname} items={headerItems} />
            <div className="flex">
                {sidebar && (
                    <SidebarNavigationSlim
                        activeUrl={pathname}
                        showMobileNavigation={false}
                        items={sidebarItems}
                        footerItems={footerItems}
                    />
                )}
                <main className="flex-1 p-4">{children}</main>
            </div>
        </div>
    );
};
