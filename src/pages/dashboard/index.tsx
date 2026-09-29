import { DefaultLayout } from "@/layouts/DefaultLayout";
import { useCallback, useEffect, useMemo, useState, type FC } from "react";
import { dashboardService, type DashboardAgentCount, type DashboardMetricKey, type DashboardPerformance, type DashboardSummary } from "@/utils/services/dashboardService";
import { Link } from "react-router";
import { useStoreSnackbar } from "@/store/snackbar";
import { Button } from "@/components/base/buttons/button";
import {
    AlertCircle,
    ArrowDownRight,
    ArrowUpRight,
    Building02,
    Calendar,
    Compass03,
    Globe02,
    Minus,
    RefreshCw01,
    Route,
    Tag01,
    Users01,
} from "@untitledui/icons";
import { cx } from "@/utils/cx";

type SummaryCounts = Partial<Record<DashboardMetricKey, number>>;

type MetricCard = {
    key: DashboardMetricKey;
    title: string;
    description: string;
    href: string;
    icon: FC<{ className?: string }>;
    iconColor: string;
};

const METRIC_CARDS: MetricCard[] = [
    { key: "itineraries", title: "Itineraries", description: "Travel itineraries in the library", href: "/itinerary/list", icon: Route, iconColor: "text-brand-primary" },
    { key: "areas", title: "Areas", description: "Destinations grouped for itineraries", href: "/itinerary/area", icon: Compass03, iconColor: "text-warning-primary" },
    { key: "sites", title: "Sites", description: "Points of interest across areas", href: "/itinerary/site", icon: Globe02, iconColor: "text-success-primary" },
    { key: "hotels", title: "Hotels", description: "Accommodation catalog", href: "/itinerary/hotel", icon: Building02, iconColor: "text-brand-primary" },
    { key: "hotelCategories", title: "Hotel types", description: "Hotel categories used for pricing", href: "/itinerary/hotel/category", icon: Tag01, iconColor: "text-error-primary" },
    { key: "users", title: "Users", description: "Admin workspace accounts", href: "/settings/user", icon: Users01, iconColor: "text-success-primary" },
];

/* ------------------------------------------------------------------ */
/* Date range presets                                                  */
/* ------------------------------------------------------------------ */

type PresetKey = "today" | "yesterday" | "last7" | "last14" | "last30" | "last90" | "thisMonth" | "prevMonth" | "custom";

const PRESETS: { key: PresetKey; label: string }[] = [
    { key: "today", label: "Today" },
    { key: "yesterday", label: "Yesterday" },
    { key: "last7", label: "Last 7 days" },
    { key: "last14", label: "Last 14 days" },
    { key: "last30", label: "Last 30 days" },
    { key: "last90", label: "Last 90 days" },
    { key: "thisMonth", label: "This month" },
    { key: "prevMonth", label: "Previous month" },
    { key: "custom", label: "Custom" },
];

const pad2 = (n: number) => String(n).padStart(2, "0");
const toISODate = (d: Date) => `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
const addDays = (d: Date, days: number) => {
    const next = new Date(d);
    next.setDate(next.getDate() + days);
    return next;
};

/** Inclusive `from`/`to` (YYYY-MM-DD) for each preset, in the user's local timezone. */
const buildPresetRange = (key: PresetKey): { from: string; to: string } => {
    const now = new Date();
    const y = now.getFullYear();
    const m = now.getMonth();
    switch (key) {
        case "today":
            return { from: toISODate(now), to: toISODate(now) };
        case "yesterday": {
            const prev = addDays(now, -1);
            return { from: toISODate(prev), to: toISODate(prev) };
        }
        case "last7":
            return { from: toISODate(addDays(now, -6)), to: toISODate(now) };
        case "last14":
            return { from: toISODate(addDays(now, -13)), to: toISODate(now) };
        case "last30":
            return { from: toISODate(addDays(now, -29)), to: toISODate(now) };
        case "last90":
            return { from: toISODate(addDays(now, -89)), to: toISODate(now) };
        case "thisMonth":
            return { from: toISODate(new Date(y, m, 1)), to: toISODate(now) };
        case "prevMonth": {
            const first = new Date(y, m - 1, 1);
            const last = new Date(y, m, 0);
            return { from: toISODate(first), to: toISODate(last) };
        }
        default:
            return { from: toISODate(addDays(now, -29)), to: toISODate(now) };
    }
};

const isValidISODate = (value: string) => /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(new Date(`${value}T00:00:00`).getTime());

const formatRangeLabel = (from: string, to: string) => {
    const opts: Intl.DateTimeFormatOptions = { month: "short", day: "numeric", year: "numeric" };
    const f = new Date(`${from}T00:00:00`);
    const t = new Date(`${to}T00:00:00`);
    if (from === to) return f.toLocaleDateString(undefined, opts);
    const sameYear = f.getFullYear() === t.getFullYear();
    return `${f.toLocaleDateString(undefined, { month: "short", day: "numeric" })}${sameYear ? "" : `, ${f.getFullYear()}`} – ${t.toLocaleDateString(undefined, opts)}`;
};

const formatCount = (value: number | undefined) => (value ?? 0).toLocaleString();

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

/** Ranked agent list with proportional bars. Values come straight from the API. */
const RankedAgentList = ({
    rows,
    emptyText,
    emptyHint,
    singular,
    /** When provided, rows with an `id` render as links (e.g. filtered list pages). */
    hrefForAgent,
}: {
    rows: DashboardAgentCount[];
    emptyText: string;
    emptyHint: string;
    singular: string;
    hrefForAgent?: (row: DashboardAgentCount) => string | null;
}) => {
    const max = rows.reduce((acc, row) => Math.max(acc, Number(row.total || 0)), 0);
    if (rows.length === 0) {
        return (
            <div className="mt-3 rounded-md border border-dashed border-secondary px-3 py-4 text-center">
                <p className="text-xs font-medium text-secondary">{emptyText}</p>
                <p className="mt-1 text-[11px] text-quaternary">{emptyHint}</p>
            </div>
        );
    }
    return (
        <ul className="mt-3 space-y-2.5">
            {rows.map((row, index) => {
                const total = Number(row.total || 0);
                const width = max > 0 ? Math.max((total / max) * 100, total > 0 ? 4 : 0) : 0;
                const name = row.user || "Unassigned";
                const href = hrefForAgent?.(row) ?? null;
                const nameNode = href ? (
                    <Link
                        to={href}
                        title={`View assignments for ${name}`}
                        aria-label={`View assignments for ${name}`}
                        className="truncate font-medium text-secondary transition-colors hover:text-brand-secondary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
                    >
                        {name}
                    </Link>
                ) : (
                    <span className="truncate font-medium text-secondary" title={name}>
                        {name}
                    </span>
                );
                return (
                    <li key={row.id || row.user || index}>
                        <div className="flex items-baseline justify-between gap-2 text-xs">
                            <span className="flex min-w-0 items-center gap-1.5">
                                <span
                                    aria-hidden="true"
                                    className={cx(
                                        "flex size-4 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold",
                                        index === 0 ? "bg-brand-solid text-white" : "bg-secondary text-tertiary",
                                    )}
                                >
                                    {index + 1}
                                </span>
                                {nameNode}
                            </span>
                            <span className="shrink-0 tabular-nums text-tertiary">{formatCount(total)}</span>
                        </div>
                        <div
                            role="img"
                            aria-label={`${name}: ${formatCount(total)} ${singular}${total === 1 ? "" : "s"}`}
                            className="mt-1 h-2 w-full overflow-hidden rounded-full bg-secondary"
                        >
                            <div className="h-full rounded-full bg-brand-solid transition-[width] duration-500" style={{ width: `${width}%` }} />
                        </div>
                    </li>
                );
            })}
        </ul>
    );
};

export default function DashboardPage() {
    const [preset, setPreset] = useState<PresetKey>("last30");
    const [range, setRange] = useState(() => buildPresetRange("last30"));
    const [customFrom, setCustomFrom] = useState(range.from);
    const [customTo, setCustomTo] = useState(range.to);
    const [customError, setCustomError] = useState<string | null>(null);

    const [summary, setSummary] = useState<DashboardSummary | null>(null);
    const [performance, setPerformance] = useState<DashboardPerformance | null>(null);
    const [summaryLoading, setSummaryLoading] = useState(true);
    const [performanceLoading, setPerformanceLoading] = useState(true);
    const [loadError, setLoadError] = useState<string | null>(null);
    const [perfError, setPerfError] = useState<string | null>(null);
    const [refreshedAt, setRefreshedAt] = useState<Date | null>(null);

    const counts: SummaryCounts = summary ?? {};
    const comparison = summary?.comparison ?? {};

    /**
     * KPI cards are all-time totals: the summary endpoint is fetched once per
     * mount (and on manual refresh) WITHOUT date params, so it is independent
     * of the selected range. The performance endpoint is range-dependent.
     */
    const loadSummary = useCallback(async () => {
        setSummaryLoading(true);
        setLoadError(null);
        try {
            const res: any = await dashboardService.getSummary({ status: "true" });
            if (res?.error) {
                const message = res.error?.message || "Failed to load dashboard summary.";
                setLoadError(message);
                useStoreSnackbar.getState().showSnackbar({ title: "Dashboard Error", description: message, color: "danger" });
            } else {
                setSummary(res ?? {});
                setRefreshedAt(new Date());
            }
        } catch (error: any) {
            const message = error?.message || "Failed to load dashboard summary.";
            setLoadError(message);
            useStoreSnackbar.getState().showSnackbar({ title: "Dashboard Error", description: message, color: "danger" });
        } finally {
            setSummaryLoading(false);
        }
    }, []);

    const loadPerformance = useCallback(async (from: string, to: string) => {
        setPerformanceLoading(true);
        setPerfError(null);
        try {
            const res: any = await dashboardService.getPerformance({ status: "true", from, to });
            if (res?.error) {
                setPerfError(res.error?.message || "Failed to load performance data.");
            } else {
                setPerformance(res ?? {});
            }
        } catch (error: any) {
            setPerfError(error?.message || "Failed to load performance data.");
        } finally {
            setPerformanceLoading(false);
        }
    }, []);

    // Summary: once on mount only (range-independent).
    useEffect(() => {
        void loadSummary();
    }, [loadSummary]);

    // Performance: refetch whenever the selected range changes.
    useEffect(() => {
        void loadPerformance(range.from, range.to);
    }, [loadPerformance, range.from, range.to]);

    const selectPreset = (key: PresetKey) => {
        setPreset(key);
        setCustomError(null);
        if (key !== "custom") setRange(buildPresetRange(key));
    };

    const applyCustomRange = () => {
        if (!isValidISODate(customFrom) || !isValidISODate(customTo)) {
            setCustomError("Enter valid dates in YYYY-MM-DD format.");
            return;
        }
        if (customFrom > customTo) {
            setCustomError("The start date must be on or before the end date.");
            return;
        }
        setCustomError(null);
        setRange({ from: customFrom, to: customTo });
    };

    /** Manual refresh: re-fetch both groups (summary keeps its all-time scope). */
    const refreshAll = useCallback(() => {
        void loadSummary();
        void loadPerformance(range.from, range.to);
    }, [loadSummary, loadPerformance, range.from, range.to]);

    /* ---------------- Derived data ---------------- */

    const loading = summaryLoading || performanceLoading;
    const totalEntities = Object.values(counts).reduce((sum, value) => sum + (Number(value) || 0), 0);
    const isEmptyWorkspace = !summaryLoading && !loadError && totalEntities === 0;

    const periodLabel = formatRangeLabel(range.from, range.to);

    /** Percent change chip content for a metric, strictly from the API's `comparison`. */
    const comparisonFor = (key: DashboardMetricKey): { text: string; tone: "up" | "down" | "flat" | "unknown"; detail: string } | null => {
        const entry = comparison[key];
        if (!entry) return null;
        const change = entry.change;
        const previous = entry.previous;
        const detail = typeof previous === "number" ? `Previous period: ${formatCount(previous)}` : "Compared with the previous period";
        if (change === null || change === undefined || !Number.isFinite(change)) return { text: "Not enough data", tone: "unknown", detail };
        if (change > 0) return { text: `+${Math.abs(Math.round(change * 10) / 10)}%`, tone: "up", detail };
        if (change < 0) return { text: `−${Math.abs(Math.round(change * 10) / 10)}%`, tone: "down", detail };
        return { text: "0%", tone: "flat", detail };
    };

    /* ---------------- Performance derived data ---------------- */

    const assignmentsByAgent = useMemo(
        () => [...(performance?.assignmentsByAgent ?? [])].sort((a, b) => Number(b.total || 0) - Number(a.total || 0)),
        [performance],
    );
    const quotationsByAgent = useMemo(
        () => [...(performance?.quotationsByAgent ?? [])].sort((a, b) => Number(b.total || 0) - Number(a.total || 0)),
        [performance],
    );
    const quotationAging = useMemo(() => performance?.quotationAging ?? [], [performance]);
    const agingTotal = useMemo(() => quotationAging.reduce((sum, bucket) => sum + Number(bucket.total || 0), 0), [quotationAging]);

    return (
        <DefaultLayout>
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
                {/* Page header */}
                <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                        <h1 className="text-xl font-semibold text-primary sm:text-display-xs">Dashboard</h1>
                        <p className="mt-1 text-sm text-tertiary">All-time catalog totals and team performance for the selected date range.</p>
                        {refreshedAt && (
                            <p className="mt-1 text-xs text-quaternary">Data refreshed at {refreshedAt.toLocaleTimeString()}</p>
                        )}
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                        <Button
                            color="secondary"
                            size="sm"
                            iconLeading={RefreshCw01}
                            isLoading={loading}
                            onClick={refreshAll}
                            aria-label="Refresh dashboard data"
                        >
                            Refresh
                        </Button>
                    </div>
                </header>

                {/* Date range filters — drive the performance section only */}
                <section aria-label="Date range filter" className="rounded-xl border border-secondary bg-primary p-4 shadow-xs">
                    <div className="flex flex-col gap-3">
                        <div className="flex min-w-0 items-center gap-2 text-xs font-semibold text-tertiary">
                            <Calendar aria-hidden="true" className="size-4 shrink-0" />
                            <span>Date range</span>
                            <span className="truncate font-normal text-quaternary">· {periodLabel} · applies to performance</span>
                        </div>

                        <div
                            role="group"
                            aria-label="Preset date ranges"
                            className="flex flex-wrap items-center gap-1"
                        >
                            {PRESETS.map((item) => {
                                const active = preset === item.key;
                                return (
                                    <button
                                        key={item.key}
                                        type="button"
                                        aria-pressed={active}
                                        onClick={() => selectPreset(item.key)}
                                        className={cx(
                                            "min-h-8 rounded-lg px-3 py-1.5 text-xs font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
                                            active
                                                ? "bg-brand-solid text-white shadow-xs"
                                                : "border border-secondary text-secondary hover:bg-secondary_hover",
                                        )}
                                    >
                                        {item.label}
                                    </button>
                                );
                            })}
                        </div>

                        {preset === "custom" && (
                            <div className="flex flex-col gap-2 rounded-lg border border-dashed border-secondary bg-secondary/40 p-3 sm:flex-row sm:items-end sm:gap-3">
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="dashboard-from" className="text-xs font-medium text-secondary">
                                        From
                                    </label>
                                    <input
                                        id="dashboard-from"
                                        type="date"
                                        value={customFrom}
                                        max={customTo || undefined}
                                        onChange={(event) => setCustomFrom(event.target.value)}
                                        className="min-h-10 rounded-lg border border-secondary bg-primary px-3 text-sm text-primary shadow-xs outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 dark:[color-scheme:dark]"
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="dashboard-to" className="text-xs font-medium text-secondary">
                                        To
                                    </label>
                                    <input
                                        id="dashboard-to"
                                        type="date"
                                        value={customTo}
                                        min={customFrom || undefined}
                                        onChange={(event) => setCustomTo(event.target.value)}
                                        className="min-h-10 rounded-lg border border-secondary bg-primary px-3 text-sm text-primary shadow-xs outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 dark:[color-scheme:dark]"
                                    />
                                </div>
                                <Button color="primary" size="sm" onClick={applyCustomRange}>
                                    Apply range
                                </Button>
                            </div>
                        )}
                        {customError && (
                            <p role="alert" className="text-xs font-medium text-error-primary">
                                {customError}
                            </p>
                        )}
                    </div>
                </section>

                {/* Performance — full width, driven by the selected date range */}
                {!loadError && (
                    <section aria-label="Agent performance" className="rounded-xl border border-secondary bg-primary p-5 shadow-xs">
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                            <div>
                                <h2 className="text-base font-semibold text-primary">Performance</h2>
                                <p className="mt-0.5 text-xs text-tertiary">Assignments, quotations and quotation aging for {periodLabel}.</p>
                            </div>
                            {performanceLoading && <div className="h-5 w-14 animate-pulse rounded bg-secondary" aria-hidden="true" />}
                        </div>

                        {/* Scoped error state: summary widgets stay usable */}
                        {perfError && !performanceLoading ? (
                            <div className="mt-4 flex flex-col items-center gap-2 rounded-lg border border-dashed border-error-primary/40 bg-error-primary/5 px-4 py-8 text-center">
                                <AlertCircle aria-hidden="true" className="size-6 text-error-primary" />
                                <p className="text-sm font-medium text-secondary">Couldn’t load performance data</p>
                                <p className="text-xs text-quaternary">{perfError}</p>
                                <Button color="secondary" size="sm" iconLeading={RefreshCw01} onClick={() => void loadPerformance(range.from, range.to)}>
                                    Try again
                                </Button>
                            </div>
                        ) : performanceLoading ? (
                            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3" aria-hidden="true">
                                {["Assignments", "Quotations", "Aging"].map((label) => (
                                    <div key={label} className="rounded-lg border border-secondary p-4">
                                        <div className="h-4 w-24 animate-pulse rounded bg-secondary" />
                                        <div className="mt-4 space-y-3">
                                            {[0, 1, 2].map((row) => (
                                                <div key={row}>
                                                    <div className="h-3.5 w-20 animate-pulse rounded bg-secondary" />
                                                    <div className="mt-2 h-2 w-full animate-pulse rounded-full bg-secondary" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                                {/* Top assignment creators — names link to the filtered assignment list */}
                                <div className="rounded-lg border border-secondary p-4" data-testid="assignments-by-agent">
                                    <div className="flex items-center gap-2">
                                        <Users01 aria-hidden="true" className="size-4 shrink-0 text-brand-primary" />
                                        <h3 className="text-sm font-semibold text-primary">Top assignment creators</h3>
                                    </div>
                                    <RankedAgentList
                                        rows={assignmentsByAgent}
                                        emptyText="No assignments recorded in this range."
                                        emptyHint="Assignments will appear as bookings are assigned to agents."
                                        singular="assignment"
                                        hrefForAgent={(row) => (row.id ? `/bookings/assignment?agentName=${encodeURIComponent(String(row.id))}` : null)}
                                    />
                                </div>

                                {/* Client quotations by agent */}
                                <div className="rounded-lg border border-secondary p-4" data-testid="quotations-by-agent">
                                    <div className="flex items-center gap-2">
                                        <Tag01 aria-hidden="true" className="size-4 shrink-0 text-warning-primary" />
                                        <h3 className="text-sm font-semibold text-primary">Client quotations</h3>
                                    </div>
                                    <RankedAgentList
                                        rows={quotationsByAgent}
                                        emptyText="No quotations recorded in this range."
                                        emptyHint="Quotations will appear once agents create them for clients."
                                        singular="quotation"
                                    />
                                </div>

                                {/* Quotation age */}
                                <div className="rounded-lg border border-secondary p-4" data-testid="quotation-aging">
                                    <div className="flex items-center gap-2">
                                        <Calendar aria-hidden="true" className="size-4 shrink-0 text-error-primary" />
                                        <h3 className="text-sm font-semibold text-primary">Quotation age</h3>
                                    </div>
                                    {quotationAging.length === 0 ? (
                                        <p className="mt-3 rounded-md border border-dashed border-secondary px-3 py-4 text-center text-xs text-quaternary">
                                            No quotation aging data for this range.
                                        </p>
                                    ) : agingTotal === 0 ? (
                                        <p className="mt-3 rounded-md border border-dashed border-secondary px-3 py-4 text-center text-xs text-quaternary">
                                            No open quotations in this range — aging will appear as quotations are created.
                                        </p>
                                    ) : (
                                        <ul className="mt-3 space-y-2.5">
                                            {quotationAging.map((bucket) => {
                                                const total = Number(bucket.total || 0);
                                                const width = agingTotal > 0 ? Math.max((total / agingTotal) * 100, total > 0 ? 4 : 0) : 0;
                                                const share = agingTotal > 0 ? Math.round((total / agingTotal) * 100) : 0;
                                                return (
                                                    <li key={bucket.bucket || bucket.label}>
                                                        <div className="flex items-baseline justify-between gap-2 text-xs">
                                                            <span className="truncate font-medium text-secondary">{bucket.label || bucket.bucket}</span>
                                                            <span className="shrink-0 tabular-nums text-tertiary">
                                                                {formatCount(total)} · {share}%
                                                            </span>
                                                        </div>
                                                        <div
                                                            role="img"
                                                            aria-label={`${bucket.label || bucket.bucket}: ${formatCount(total)} of ${formatCount(agingTotal)} quotations (${share}%)`}
                                                            className="mt-1 h-2 w-full overflow-hidden rounded-full bg-secondary"
                                                        >
                                                            <div className="h-full rounded-full bg-brand-solid transition-[width] duration-500" style={{ width: `${width}%` }} />
                                                        </div>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        )}
                    </section>
                )}
                {/* Error state: summary failure blocks the KPI cards, performance stays scoped */}
                {loadError && !summaryLoading && (
                    <section
                        role="alert"
                        className="flex flex-col items-center gap-3 rounded-xl border border-error-primary/30 bg-error-primary/5 px-6 py-10 text-center"
                    >
                        <AlertCircle aria-hidden="true" className="size-8 text-error-primary" />
                        <div>
                            <h2 className="text-md font-semibold text-primary">Couldn’t load the dashboard</h2>
                            <p className="mt-1 text-sm text-tertiary">{loadError}</p>
                        </div>
                        <Button color="primary" size="sm" iconLeading={RefreshCw01} onClick={() => void loadSummary()}>
                            Try again
                        </Button>
                    </section>
                )}

                {/* Empty workspace */}
                {isEmptyWorkspace && (
                    <section className="flex flex-col items-center gap-3 rounded-xl border border-secondary bg-primary px-6 py-12 text-center">
                        <div className="flex size-12 items-center justify-center rounded-full bg-secondary">
                            <Route aria-hidden="true" className="size-6 text-tertiary" />
                        </div>
                        <div>
                            <h2 className="text-md font-semibold text-primary">Your workspace is empty</h2>
                            <p className="mt-1 max-w-md text-sm text-tertiary">
                                Start by creating an itinerary, then add areas, sites and hotels to build your travel catalog.
                            </p>
                        </div>
                        <Link
                            to="/itinerary/list"
                            className="inline-flex min-h-10 items-center gap-1 rounded-lg bg-brand-solid px-3.5 py-2 text-sm font-semibold text-white shadow-xs hover:bg-brand-solid_hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
                        >
                            Create your first itinerary
                            <ArrowUpRight aria-hidden="true" className="size-4" />
                        </Link>
                    </section>
                )}

                {/* KPI cards — all-time totals, independent of the selected range */}
                {!loadError && (
                    <section aria-label="Key metrics" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                        {METRIC_CARDS.map((card) => {
                            const value = counts[card.key] ?? 0;
                            const change = comparisonFor(card.key);
                            const Icon = card.icon;
                            return (
                                <article
                                    key={card.key}
                                    className="group relative overflow-hidden rounded-xl border border-secondary bg-primary shadow-xs transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
                                >
                                    <div className="flex items-start justify-between gap-3 p-5">
                                        <div className="min-w-0">
                                            <h2 className="truncate text-sm font-medium text-tertiary">{card.title}</h2>
                                            <p className="mt-0.5 truncate text-xs text-quaternary">{card.description}</p>
                                            <div className="mt-3 flex flex-wrap items-center gap-2">
                                                {summaryLoading ? (
                                                    <div className="h-9 w-16 animate-pulse rounded-md bg-secondary" aria-hidden="true" />
                                                ) : (
                                                    <p
                                                        className={cx(
                                                            "text-4xl font-semibold tabular-nums",
                                                            value === 0 ? "text-quaternary" : "text-primary",
                                                        )}
                                                    >
                                                        {formatCount(value)}
                                                    </p>
                                                )}
                                                {!summaryLoading && change && (
                                                    <span
                                                        title={
                                                            change.tone === "unknown"
                                                                ? "Comparison unavailable for this metric (no data in the previous period)"
                                                                : change.detail
                                                        }
                                                        className={cx(
                                                            "inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold tabular-nums",
                                                            change.tone === "up" && "bg-success-secondary text-fg-success-secondary",
                                                            change.tone === "down" && "bg-error-secondary text-fg-error-secondary",
                                                            change.tone === "flat" && "bg-secondary text-tertiary",
                                                            change.tone === "unknown" && "bg-secondary text-quaternary",
                                                        )}
                                                    >
                                                        {change.tone === "up" && <ArrowUpRight aria-hidden="true" className="size-3" />}
                                                        {change.tone === "down" && <ArrowDownRight aria-hidden="true" className="size-3" />}
                                                        {change.tone === "flat" && <Minus aria-hidden="true" className="size-3" />}
                                                        {change.text}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <span className={cx("flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary", card.iconColor)}>
                                            <Icon aria-hidden="true" className="size-5" />
                                        </span>
                                    </div>
                                    <div className="border-t border-secondary px-5 py-3">
                                        <Link
                                            to={card.href}
                                            aria-label={`View all ${card.title.toLowerCase()}`}
                                            className="inline-flex items-center gap-1 text-xs font-semibold text-brand-secondary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
                                        >
                                            View all
                                            <ArrowUpRight
                                                aria-hidden="true"
                                                className="size-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                            />
                                        </Link>
                                    </div>
                                </article>
                            );
                        })}
                    </section>
                )}

            </div>
        </DefaultLayout>
    );
}
