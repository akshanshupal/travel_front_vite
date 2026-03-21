import { create } from "zustand";

type SidebarState = {
    sidebar: boolean;
    dialSidebar: boolean;
    openSidebar: () => void;
    closeSidebar: () => void;
    toggleSidebar: () => void;
    openDialSidebar: () => void;
    closeDialSidebar: () => void;
    resetSidebars: () => void;
};

export const useStoreSidebar = create<SidebarState>((set, get) => ({
    sidebar: true,
    dialSidebar: false,
    openSidebar: () => set({ sidebar: true, dialSidebar: false }),
    closeSidebar: () => set({ sidebar: false }),
    toggleSidebar: () => set({ sidebar: !get().sidebar, dialSidebar: false }),
    openDialSidebar: () => set({ dialSidebar: true, sidebar: false }),
    closeDialSidebar: () => set({ dialSidebar: false }),
    resetSidebars: () => set({ sidebar: false, dialSidebar: false }),
}));
