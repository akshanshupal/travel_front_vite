import { AlertCircle, CheckCircle, InfoCircle, XCircle } from "@untitledui/icons";
import { useEffect, useMemo, useRef } from "react";
import { CloseButton } from "@/components/base/buttons/close-button";
import { useStoreSnackbar } from "@/store/snackbar";
import { cx } from "@/utils/cx";

const getPositionClasses = (position: string) => {
    switch (position) {
        case "top-left":
            return "top-4 left-4 items-start";
        case "top-center":
            return "top-4 left-1/2 -translate-x-1/2 items-center";
        case "bottom-right":
            return "bottom-4 right-4 items-end";
        case "bottom-left":
            return "bottom-4 left-4 items-start";
        case "bottom-center":
            return "bottom-4 left-1/2 -translate-x-1/2 items-center";
        case "top-right":
        default:
            return "top-4 right-4 items-end";
    }
};

export const Snackbar = () => {
    const { isOpen, title, description, color, position, time, hideSnackbar } = useStoreSnackbar();
    const timeoutIdRef = useRef<number | null>(null);

    useEffect(() => {
        if (!isOpen) return;
        if (timeoutIdRef.current) window.clearTimeout(timeoutIdRef.current);
        timeoutIdRef.current = window.setTimeout(() => hideSnackbar(), Math.max(0, time));
        return () => {
            if (timeoutIdRef.current) window.clearTimeout(timeoutIdRef.current);
            timeoutIdRef.current = null;
        };
    }, [description, hideSnackbar, isOpen, time, title]);

    const { Icon, iconClassName, accentColor } = useMemo(() => {
        if (color === "success") return { Icon: CheckCircle, iconClassName: "text-success-600", accentColor: "var(--color-success-600)" };
        if (color === "warning") return { Icon: AlertCircle, iconClassName: "text-warning-600", accentColor: "var(--color-warning-600)" };
        if (color === "danger") return { Icon: XCircle, iconClassName: "text-error-600", accentColor: "var(--color-error-600)" };
        return { Icon: InfoCircle, iconClassName: "text-brand-600", accentColor: "var(--color-brand-600)" };
    }, [color]);

    if (!isOpen) return null;

    return (
        <div className={cx("pointer-events-none fixed z-[9999] flex w-full max-w-sm -translate-y-0 flex-col gap-2 px-4", getPositionClasses(position))}>
            <div
                role="status"
                aria-live="polite"
                className={cx(
                    "pointer-events-auto w-full rounded-lg border border-secondary bg-primary shadow-lg",
                    "duration-200 ease-out animate-in fade-in slide-in-from-top-1",
                )}
                style={{ borderLeftWidth: 4, borderLeftStyle: "solid", borderLeftColor: accentColor }}
            >
                <div className="flex items-start gap-3 px-4 py-3">
                    <Icon aria-hidden="true" className={cx("mt-0.5 size-5 shrink-0", iconClassName)} />
                    <div className="min-w-0 flex-1">
                        <div className="text-sm font-semibold text-primary">{title}</div>
                        {description ? <div className="mt-0.5 text-sm text-tertiary">{description}</div> : null}
                    </div>
                    <CloseButton onPress={hideSnackbar} size="xs" />
                </div>
            </div>
        </div>
    );
};

