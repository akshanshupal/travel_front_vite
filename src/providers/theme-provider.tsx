import type { ReactNode } from "react";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);

    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }

    return context;
};

interface ThemeProviderProps {
    children: ReactNode;
    /**
     * The class to add to the root element when the theme is dark
     * @default "dark-mode"
     */
    darkModeClass?: string;
    /**
     * The default theme to use if no theme is stored in localStorage
     * @default "system"
     */
    defaultTheme?: Theme;
    /**
     * The key to use to store the theme in localStorage
     * @default "ui-theme"
     */
    storageKey?: string;
}

export const ThemeProvider = ({ children, defaultTheme = "system", storageKey = "ui-theme", darkModeClass = "dark-mode" }: ThemeProviderProps) => {
    const [theme, setThemeState] = useState<Theme>(defaultTheme);

    const getSystemTheme = useCallback((): Exclude<Theme, "system"> => {
        if (typeof window === "undefined") return "light";
        return window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ? "dark" : "light";
    }, []);

    const resolvedTheme = useMemo(() => (theme === "system" ? getSystemTheme() : theme), [getSystemTheme, theme]);

    const applyTheme = useCallback(
        (resolved: Exclude<Theme, "system">) => {
            if (typeof window === "undefined") return;
            const root = window.document.documentElement;
            if (resolved === "dark") root.classList.add(darkModeClass);
            else root.classList.remove(darkModeClass);
        },
        [darkModeClass],
    );

    const setTheme = useCallback(
        (nextTheme: Theme) => {
            setThemeState(nextTheme);
            if (typeof window !== "undefined") localStorage.setItem(storageKey, nextTheme);
        },
        [storageKey],
    );

    useEffect(() => {
        if (typeof window === "undefined") return;
        const stored = localStorage.getItem(storageKey) as Theme | null;
        if (stored === "light" || stored === "dark" || stored === "system") {
            setThemeState(stored);
            return;
        }
        setThemeState(defaultTheme);
    }, [defaultTheme, storageKey]);

    useEffect(() => {
        applyTheme(resolvedTheme);
    }, [applyTheme, resolvedTheme]);

    useEffect(() => {
        if (typeof window === "undefined") return;
        if (theme !== "system") return;
        const media = window.matchMedia?.("(prefers-color-scheme: dark)");
        if (!media) return;

        const onChange = () => applyTheme(getSystemTheme());
        media.addEventListener?.("change", onChange);
        return () => media.removeEventListener?.("change", onChange);
    }, [applyTheme, getSystemTheme, theme]);

    return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};
