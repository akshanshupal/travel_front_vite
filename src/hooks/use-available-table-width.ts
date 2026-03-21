import { useCallback, useEffect, useState } from "react";
import { useStoreSidebar } from "@/store/sidebar";
import { useBreakpoint } from "@/hooks/use-breakpoint";

const SIDEBAR_WIDTH = 68;
const PAGE_PADDING = 32;

export const useAvailableTableWidth = () => {
    const sidebarOpen = useStoreSidebar((s) => s.sidebar);
    const isLgUp = useBreakpoint("lg");

    const getWidth = useCallback(() => {
        if (typeof window === "undefined") return 0;
        const viewportWidth = document.documentElement.clientWidth;
        const sidebarWidth = sidebarOpen && isLgUp ? SIDEBAR_WIDTH : 0;
        return Math.max(0, viewportWidth - sidebarWidth - PAGE_PADDING);
    }, [sidebarOpen, isLgUp]);

    const [availableWidth, setAvailableWidth] = useState(getWidth);

    useEffect(() => {
        const updateWidth = () => setAvailableWidth(getWidth());
        updateWidth();
        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
    }, [getWidth]);

    return availableWidth;
};
