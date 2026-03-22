export const formatShortDate = (value?: string | number | Date) => {
    if (!value) return "-";
    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) return "-";
    const parts = date
        .toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "2-digit",
            timeZone: "Asia/Kolkata",
        })
        .split(" ");
    if (parts.length < 3) return date.toLocaleDateString("en-GB");
    return `${parts[0]} ${parts[1]}, ${parts[2]}`;
};

export const formatTime = (value?: string | number | Date) => {
    if (!value) return "-";
    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) return "-";
    return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "Asia/Kolkata",
    });
};

export const formatCurrencyInr = (value?: number | null) => {
    const numeric = typeof value === "number" ? value : Number(value);
    if (!Number.isFinite(numeric)) return "₹ 0";
    return `₹ ${numeric.toLocaleString("en-IN")}`;
};

export const calculatePendingAmount = (finalPackageCost?: number, paymentReceived?: number) => {
    if (!finalPackageCost) return "₹ 0";
    const received = paymentReceived || 0;
    const pending = finalPackageCost > received ? finalPackageCost - received : 0;
    return `₹ ${pending.toLocaleString("en-IN")}`;
};
