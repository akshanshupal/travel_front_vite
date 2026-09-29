import fetchWithToken from "@/utils/fetchApi";

/** Metrics the dashboard summary can report counts for. */
export type DashboardMetricKey = "itineraries" | "areas" | "sites" | "hotels" | "hotelCategories" | "users";

export interface DashboardSummaryParams {
    /** Keep the legacy flag used by the existing endpoint. */
    status?: string;
    /** Range start (inclusive), `YYYY-MM-DD` in server terms. */
    from?: string;
    /** Range end (inclusive), `YYYY-MM-DD`. */
    to?: string;
}

/** One daily "catalog additions" record returned by the API's `series`. */
export interface DashboardDailyPoint {
    date: string;
    itineraries?: number;
    areas?: number;
    sites?: number;
    hotels?: number;
    hotelCategories?: number;
    /** Optional pre-aggregated total for the day. */
    total?: number;
}

export interface DashboardPeriod {
    from?: string;
    to?: string;
    /** Days in the range (returned by the current API). */
    days?: number;
    label?: string;
}

/** Per-metric comparison returned by the API: percent `change` is `null` when not computable (zero denominator). */
export interface DashboardMetricComparison {
    current?: number;
    previous?: number;
    change?: number | null;
}

export interface DashboardSummary {
    itineraries?: number;
    areas?: number;
    sites?: number;
    hotels?: number;
    hotelCategories?: number;
    users?: number;
    /** The selected range, as understood by the API. */
    period?: DashboardPeriod;
    /** The equivalent preceding range (counts may or may not be included). */
    previousPeriod?: Partial<Record<DashboardMetricKey, number>> & { from?: string; to?: string };
    /** Percent change per metric vs the previous period; `change: null` = not computable (zero denominator). */
    comparison?: Partial<Record<DashboardMetricKey, DashboardMetricComparison>>;
    /** Daily catalog additions within the selected range. */
    series?: DashboardDailyPoint[];
    [key: string]: unknown;
}

export type DashboardSummaryResponse = DashboardSummary | { error: { message?: string } };

/** One ranked agent row (assignments or quotations) from the performance endpoint. */
export interface DashboardAgentCount {
    /** Display name resolved server-side; "Unassigned" when no agent is set. */
    user: string;
    /** Agent user id, or null for unassigned rows. */
    id?: string | null;
    total: number;
}

/** One quotation-age bucket from the performance endpoint. */
export interface DashboardAgeBucket {
    /** Stable bucket key, e.g. "0-7" | "8-30" | "31-90" | "90plus". */
    bucket: string;
    /** Human-facing label, e.g. "0-7 days". */
    label: string;
    total: number;
}

/** Response of GET /api/dashboard/performance for the selected range. */
export interface DashboardPerformance {
    period?: { from?: string; to?: string; days?: number };
    assignmentsByAgent?: DashboardAgentCount[];
    quotationsByAgent?: DashboardAgentCount[];
    quotationAging?: DashboardAgeBucket[];
    [key: string]: unknown;
}

export type DashboardPerformanceResponse = DashboardPerformance | { error: { message?: string } };

export const dashboardService = {
    getSummary: async (params: DashboardSummaryParams = {}): Promise<DashboardSummaryResponse> => {
        const response = await fetchWithToken("/api/dashboard/getSummary", { ...params });
        if ((response as any)?.error) return response as any;
        return response as any;
    },
    /** Assignments by agent, quotations by agent, and quotation aging for a range. */
    getPerformance: async (params: DashboardSummaryParams = {}): Promise<DashboardPerformanceResponse> => {
        const response = await fetchWithToken("/api/dashboard/performance", { ...params });
        if ((response as any)?.error) return response as any;
        return response as any;
    },
};
