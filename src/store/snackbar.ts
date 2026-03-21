import { create } from "zustand";

type SnackbarColor = "default" | "danger" | "success" | "warning";
type SnackbarPosition =
    | "top-right"
    | "top-left"
    | "top-center"
    | "bottom-right"
    | "bottom-left"
    | "bottom-center";

type SnackbarState = {
    isOpen: boolean;
    title: string;
    description?: string;
    color: SnackbarColor;
    position: SnackbarPosition;
    time: number;
    showSnackbar: (value: {
        title: string;
        description?: string;
        color?: SnackbarColor;
        position?: SnackbarPosition;
        time?: number;
    }) => void;
    hideSnackbar: () => void;
};

export const useStoreSnackbar = create<SnackbarState>((set) => ({
    isOpen: false,
    title: "",
    description: "",
    color: "default",
    position: "bottom-center",
    time: 3000,
    showSnackbar: (value) =>
        set({
            isOpen: true,
            title: value.title,
            description: value?.description,
            color: value?.color || "default",
            position: value?.position || "top-right",
            time: value?.time || 3000,
        }),
    hideSnackbar: () =>
        set({
            isOpen: false,
            title: "",
            description: "",
            color: "default",
            position: "top-right",
            time: 3000,
        }),
}));
