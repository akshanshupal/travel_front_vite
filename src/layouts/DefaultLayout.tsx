import { PropsWithChildren, useCallback, useEffect, useMemo, useState } from "react";
import { SidebarNavigationSlim } from "@/components/application/app-navigation/sidebar-navigation/sidebar-slim";
import { HeaderNavigationBase } from "@/components/application/app-navigation/header-navigation";
import { getMenuItems } from "@/components/application/app-navigation/menu-items";
import { useStoreSidebar } from "@/store/sidebar";
import { useStoreLogin } from "@/store/login";
import { useAccess } from "@/hooks/use-access";
import { getPipeline } from "@/utils/services/pipelineService";
import { useLocation, useNavigate } from "react-router";

// Module-level cache: the pipeline dropdown is part of the navigation, but the
// layout remounts on every page — fetch the pipeline list only once per app session.
let pipelinesCache: { id: string; title: string }[] | null = null;
let pipelinesPromise: Promise<{ id: string; title: string }[]> | null = null;

const loadPipelines = (): Promise<{ id: string; title: string }[]> => {
    if (pipelinesCache) return Promise.resolve(pipelinesCache);
    if (!pipelinesPromise) {
        pipelinesPromise = getPipeline({ limit: "all", select: "title" })
            .then((res: any): { id: string; title: string }[] => {
                const value = res?.data ?? res;
                const list = Array.isArray(value?.data) ? value.data : Array.isArray(value) ? value : [];
                const mapped = list
                    .map((item: any) => ({ id: String(item?.id ?? item?._id ?? ""), title: String(item?.title || "") }))
                    .filter((item: any) => item.id);
                pipelinesCache = mapped;
                return mapped;
            })
            .catch((): { id: string; title: string }[] => {
                pipelinesPromise = null;
                return [];
            });
    }
    return pipelinesPromise;
};

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
    const [pipelines, setPipelines] = useState<{ id: string; title: string }[]>([]);

    useEffect(() => {
        let cancelled = false;
        loadPipelines().then((list) => {
            if (!cancelled) setPipelines(list);
        });
        return () => { cancelled = true; };
    }, []);

    const injectPipelines = useCallback(
        (items: any[]): any[] =>
            items.map((item: any) => {
                if (item.href === "/lead-management/pipeline") {
                    return { ...item, items: pipelines.map((pipeline) => ({ href: `/lead-management/pipeline/view/${pipeline.id}`, label: pipeline.title || "Untitled Pipeline", icon: item.icon })) };
                }
                return item.items?.length ? { ...item, items: injectPipelines(item.items) } : item;
            }),
        [pipelines],
    );
    const headerItemsWithPipelines = useMemo(() => injectPipelines(headerItems), [injectPipelines, headerItems]);
    const sidebarItemsWithPipelines = useMemo(() => injectPipelines(sidebarItems), [injectPipelines, sidebarItems]);

    return (
        <div className="min-h-dvh bg-white dark:bg-[#0B0D12] text-gray-900 dark:text-white">
            <HeaderNavigationBase activeUrl={pathname} items={headerItemsWithPipelines as any} />
            <div className="flex">
                {sidebar && (
                    <SidebarNavigationSlim
                        activeUrl={pathname}
                        showMobileNavigation={false}
                        items={sidebarItemsWithPipelines as any}
                        footerItems={footerItems}
                    />
                )}
                <main className="min-w-0 flex-1 p-4">{children}</main>
            </div>
        </div>
    );
};
