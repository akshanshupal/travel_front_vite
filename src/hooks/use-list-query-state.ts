import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";

/**
 * Shared list-page query/state machinery.
 *
 * ~16 list pages (bookings, packages, photography, leads, itinerary, settings…)
 * duplicate the same block: a local `parseSearch` that reads `page` / `limit`
 * and named filter params from the URL, `page` / `limit` / `filters` /
 * `debouncedFilters` / `tempFilters` state, a 500ms filter→debounce effect
 * that resets to page 1, and an effect that mirrors
 * `{...non-empty filters, page, limit}` back into the query string with
 * `navigate(..., { replace: true })`.
 *
 * This module extracts that machinery with identical semantics so pages can
 * adopt it incrementally. It does NOT touch API calls, payload shapes, or
 * deletion/modal logic — it only owns URL parsing and list query state.
 *
 * URL contract preserved from the existing pages:
 * - `page` starts at 1 (values < 1 or non-numeric fall back to 1)
 * - `limit` is clamped to [limitMin, limitMax] (defaults 10..100)
 * - filter params are plain strings; missing params become their default (`""`)
 * - the URL is rewritten (replace) whenever page/limit/debounced filters change
 * - empty filter values are omitted from the URL; `page` and `limit` are always present
 */

export type ListFilterValues = Record<string, string>;

export interface ParseListSearchOptions {
    /** Filter keys to read from the URL, mapped to their default value (usually ""). */
    filters?: ListFilterValues;
    /** Lower clamp for the `limit` param. @default 10 */
    limitMin?: number;
    /** Upper clamp for the `limit` param. @default 100 */
    limitMax?: number;
}

export interface ParsedListSearch {
    page: number;
    limit: number;
    filters: ListFilterValues;
}

const toSearchParams = (search: string): URLSearchParams =>
    new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);

/**
 * Parse `page`, `limit` and named filter params from a react-router `search`
 * string. Drop-in replacement for the per-page `parseSearch` helpers:
 *
 *   const initial = parseListSearch(search, { filters: { title: "", status: "" } });
 */
export const parseListSearch = (search: string, { filters = {}, limitMin = 10, limitMax = 100 }: ParseListSearchOptions = {}): ParsedListSearch => {
    const sp = toSearchParams(search);
    const page = Math.max(1, Number(sp.get("page") || 1) || 1);
    const limit = Math.min(limitMax, Math.max(limitMin, Number(sp.get("limit") || limitMin) || limitMin));
    const parsedFilters: ListFilterValues = {};
    for (const key of Object.keys(filters)) {
        parsedFilters[key] = sp.get(key) || filters[key] || "";
    }
    return { page, limit, filters: parsedFilters };
};

export interface UseListQueryStateOptions<F extends ListFilterValues> extends ParseListSearchOptions {
    /**
     * Filter keys and their default values. The shape of this object decides
     * which URL params are parsed and synced. Usually a literal so `filters`
     * stays typed, e.g. `{ title: "", status: "" }`.
     */
    defaults: F;
    /**
     * Debounce delay (ms) between `filters` and `debouncedFilters`.
     * Matches the 500ms used by the existing list pages. @default 500
     */
    debounceMs?: number;
    /**
     * Mirror `{page, limit, ...non-empty filters}` into the URL on change
     * (replace navigation), like the existing pages do. @default true
     */
    syncUrl?: boolean;
}

export interface UseListQueryStateResult<F extends ListFilterValues> {
    /** Current page (1-based). */
    page: number;
    /** Current page size. */
    limit: number;
    /** Live filter values (bound to inputs). */
    filters: F;
    /** Debounced filter values (bound to API calls). */
    debouncedFilters: F;
    /** Draft filter values (bound to filter slideouts/modals before Apply). */
    tempFilters: F;
    setPage: (page: number) => void;
    setLimit: (limit: number) => void;
    setFilters: (update: F | ((prev: F) => F)) => void;
    setTempFilters: (update: F | ((prev: F) => F)) => void;
    /** Debounced setters, exposed for pages that manage their own debounce cadence. */
    setDebouncedFilters: (update: F | ((prev: F) => F)) => void;
    /** Reset to page 1 (e.g. after a filter change or delete). */
    resetPage: () => void;
    /** True when any filter differs from its default. */
    isFilterActive: boolean;
    /** Reset every filter to its default and go back to page 1. */
    resetFilters: () => void;
    /** Reset a single filter key to its default (keeps page as-is, like existing pages). */
    removeFilter: (key: keyof F & string) => void;
}

/**
 * Own the page/limit/filter state of a list page, with the same debounce and
 * URL-sync semantics as the existing hand-rolled implementations.
 *
 * The hook does not fetch data. Pages keep their own fetch effect keyed on
 * `[page, limit, debouncedFilters]` exactly as before.
 *
 * Adoption example (see `bookings/bookingtype` for a migrated page):
 *
 *   const { page, limit, filters, debouncedFilters, tempFilters, setPage,
 *           setFilters, setTempFilters, resetFilters, removeFilter, resetPage }
 *       = useListQueryState({ defaults: { title: "", status: "" } });
 */
export const useListQueryState = <F extends ListFilterValues>({
    defaults,
    limitMin,
    limitMax,
    debounceMs = 500,
    syncUrl = true,
}: UseListQueryStateOptions<F>): UseListQueryStateResult<F> => {
    const { pathname, search } = useLocation();
    const navigate = useNavigate();

    // Parse once per mount; subsequent URL changes are written BY this hook,
    // so re-parsing them would fight the state that produced them.
    const [initial] = useState(() => parseListSearch(search, { filters: defaults, limitMin, limitMax }));

    const [page, setPage] = useState(initial.page);
    const [limit, setLimit] = useState(initial.limit);
    const [filters, setFiltersState] = useState<F>(initial.filters as F);
    const [debouncedFilters, setDebouncedFiltersState] = useState<F>(initial.filters as F);
    const [tempFilters, setTempFiltersState] = useState<F>(initial.filters as F);

    const setFilters = useCallback((update: F | ((prev: F) => F)) => {
        setFiltersState((prev) => (typeof update === "function" ? (update as (prev: F) => F)(prev) : update));
    }, []);

    const setDebouncedFilters = useCallback((update: F | ((prev: F) => F)) => {
        setDebouncedFiltersState((prev) => (typeof update === "function" ? (update as (prev: F) => F)(prev) : update));
    }, []);

    const setTempFilters = useCallback((update: F | ((prev: F) => F)) => {
        setTempFiltersState((prev) => (typeof update === "function" ? (update as (prev: F) => F)(prev) : update));
    }, []);

    // Debounce filters → debouncedFilters and reset to page 1, matching the
    // existing list pages (unconditional setPage(1), same as hand-rolled code).
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedFiltersState(filters);
            setPage(1);
        }, debounceMs);
        return () => clearTimeout(handler);
    }, [filters, debounceMs]);

    // Mirror {page, limit, non-empty filters} into the URL (replace), skipping
    // writes when the URL already matches. Identical serialization to the
    // pages this hook replaces: page and limit are always present, empty
    // filter values are omitted.
    useEffect(() => {
        if (!syncUrl) return;
        const sp = new URLSearchParams();
        for (const [key, value] of Object.entries(debouncedFilters)) {
            if (value) sp.set(key, String(value));
        }
        sp.set("page", String(page));
        sp.set("limit", String(limit));
        const next = sp.toString();
        const current = search.startsWith("?") ? search.slice(1) : search;
        if (next === current) return;
        navigate(next ? `${pathname}?${next}` : pathname, { replace: true });
    }, [debouncedFilters, limit, navigate, page, pathname, search, syncUrl]);

    const resetPage = useCallback(() => setPage(1), []);

    const defaultFilters = useMemo(() => ({ ...defaults }) as F, [defaults]);

    const resetFilters = useCallback(() => {
        setFiltersState(defaultFilters);
        setTempFiltersState(defaultFilters);
        setDebouncedFiltersState(defaultFilters);
        setPage(1);
    }, [defaultFilters]);

    const removeFilter = useCallback(
        (key: keyof F & string) => {
            setFiltersState((prev) => ({ ...prev, [key]: defaults[key] ?? "" }));
            setTempFiltersState((prev) => ({ ...prev, [key]: defaults[key] ?? "" }));
            // Note: debouncedFilters updates via the debounce effect, which
            // also resets the page — same as the existing pages.
        },
        [defaults],
    );

    const isFilterActive = useMemo(
        () => Object.entries(filters).some(([key, value]) => Boolean(value) && value !== defaults[key]),
        [filters, defaults],
    );

    return {
        page,
        limit,
        filters,
        debouncedFilters,
        tempFilters,
        setPage,
        setLimit,
        setFilters,
        setTempFilters,
        setDebouncedFilters,
        resetPage,
        isFilterActive,
        resetFilters,
        removeFilter,
    };
};
