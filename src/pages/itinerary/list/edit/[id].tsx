import { DefaultLayout } from "@/layouts/DefaultLayout";
import { Button } from "@/components/base/buttons/button";
import { CloseButton } from "@/components/base/buttons/close-button";
import { Badge } from "@/components/base/badges/badges";
import { Input } from "@/components/base/input/input";
import { Select } from "@/components/base/select/select";
import { LoadingIndicator } from "@/components/application/loading-indicator/loading-indicator";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { Dialog, Modal, ModalOverlay } from "@/components/application/modals/modal";
import { fetchWithToken } from "@/utils/fetchApi";
import { itineraryService } from "@/utils/services/itineraryService";
import { useStoreLogin } from "@/store/login";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Home04, Plus, SearchLg, Trash01 } from "@untitledui/icons";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";

type Area = { id: string; title?: string; headerContent?: string; description?: string; featureImg?: string };
type HotelCategory = { id: string; title?: string };
type Hotel = { id: string; name?: string; location?: string; category?: { id: string; title?: string } | string | null };
type Site = { id: string; title?: string; featureImg?: string; description?: string };

type SelectedHotel = { id: string; name?: string };

type SelectedSite = {
    site: string;
    title?: string;
    days: number;
    hotels: SelectedHotel[];
};

const replaceClientName = (content?: string | null) => {
    if (!content) return "";
    const replacedContent = content.replace(/\[\{CLIENT_NAME\}\]|\{CLIENT_NAME\}/g, "Guest");
    return replacedContent.replace(/\{|\}/g, "");
};

const asArray = (value: any) => {
    if (Array.isArray(value)) return value;
    return [];
};

const getId = (value: any) => String(value?.id ?? value?._id ?? value ?? "");

export default function ItineraryEditPage() {
    const navigate = useNavigate();
    const params = useParams<{ id?: string }>();
    const authToken = useStoreLogin((s) => s.authToken);
    const currentUser = useStoreLogin((s) => s.user) as any;

    const isCreate = !params.id;

    const [currentStep, setCurrentStep] = useState(1);
    const steps = useMemo(() => ["Area", "Site", "Hotel", "Preview"], []);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [loadError, setLoadError] = useState<string | null>(null);

    const [areas, setAreas] = useState<Area[]>([]);
    const [siteOptions, setSiteOptions] = useState<Site[]>([]);
    const [initialSiteOptions, setInitialSiteOptions] = useState<Site[]>([]);
    const [siteDetailsById, setSiteDetailsById] = useState<Record<string, Site>>({});
    const [hotelCategories, setHotelCategories] = useState<HotelCategory[]>([]);
    const lastSitesForAreaKeyRef = useRef<string | null>(null);
    const lastPreviewSiteFetchKeyRef = useRef<string | null>(null);

    const [formTitle, setFormTitle] = useState("");
    const [formStatus, setFormStatus] = useState<any>("");
    const [formArea, setFormArea] = useState<{ id: string; title?: string } | null>(null);
    const [selectedSites, setSelectedSites] = useState<SelectedSite[]>([]);
    const totalSiteDays = useMemo(() => selectedSites.reduce((sum, s) => sum + (Number(s.days) || 0), 0), [selectedSites]);
    const [siteSearch, setSiteSearch] = useState("");
    const [siteMobileTab, setSiteMobileTab] = useState<"available" | "selected">("available");
    const filteredSiteOptions = useMemo(() => {
        const q = siteSearch.trim().toLowerCase();
        if (!q) return siteOptions;
        return siteOptions.filter((s) => String(s?.title ?? "").toLowerCase().includes(q));
    }, [siteOptions, siteSearch]);

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [dirtyFields, setDirtyFields] = useState<Record<string, boolean>>({});

    const [hotelModalOpen, setHotelModalOpen] = useState(false);
    const [hotelModalSiteIndex, setHotelModalSiteIndex] = useState<number | null>(null);
    const [hotelFilters, setHotelFilters] = useState({ location: "", name: "", hotelCategory: "" });
    const [debouncedHotelFilters, setDebouncedHotelFilters] = useState(hotelFilters);
    const [hotelsLoading, setHotelsLoading] = useState(false);
    const [hotelOptions, setHotelOptions] = useState<Hotel[]>([]);
    const [hotelSelection, setHotelSelection] = useState<Record<string, boolean>>({});
    const lastHotelsKeyRef = useRef<string | null>(null);
    const [hotelNameById, setHotelNameById] = useState<Record<string, string>>({});
    const lastHotelNamesKeyRef = useRef<string | null>(null);

    const [previewArea, setPreviewArea] = useState<Area | null>(null);
    const [previewSites, setPreviewSites] = useState<Array<Site & { days?: number; hotels?: Array<{ id: string; name?: string }> }>>([]);
    const selectedSiteIdsKey = useMemo(() => selectedSites.map((s) => s.site).join(","), [selectedSites]);

    const canEdit = useMemo(() => Boolean(currentUser?.type && currentUser?.type !== "AGENT"), [currentUser?.type]);

    useEffect(() => {
        const run = async () => {
            if (!params.id) {
                setLoading(false);
                return;
            }
            if (!authToken) return;
            setLoading(true);
            setLoadError(null);
            try {
                const query = { populate: "area,site,hotel" };
                const res = await itineraryService.getById(params.id, query);
                if ((res as any)?.error) throw new Error((res as any).error);
                const resolved = (res as any)?.data ?? res;
                if ((resolved as any)?.error) throw new Error((resolved as any).error);

                setFormTitle(String(resolved?.title ?? resolved?.name ?? ""));
                setFormStatus(resolved?.status ?? "");

                const areaObj = resolved?.area;
                const areaId = getId(areaObj);
                setFormArea(areaId ? { id: areaId, title: areaObj?.title } : null);

                const normalizedSites: SelectedSite[] = asArray(resolved?.sites).map((el: any) => {
                    const siteId = getId(el?.site ?? el?.siteId ?? el?.id);
                    const title = String(el?.title ?? el?.site?.title ?? "");
                    const days = Number(el?.days ?? el?.site?.days ?? 1) || 1;
                    const hotels = asArray(el?.hotels ?? el?.site?.hotels ?? []).map((h: any) => {
                        const hid = getId(h?.id ?? h?._id ?? h);
                        if (!hid) return null;
                        if (typeof h === "object") {
                            const name = String(h?.name ?? h?.title ?? "").trim();
                            return name ? { id: hid, name } : { id: hid };
                        }
                        return { id: hid };
                    }).filter(Boolean) as SelectedHotel[];

                    return { site: siteId, title, days, hotels };
                });
                setSelectedSites(normalizedSites);
            } catch (e: any) {
                setLoadError(e?.error?.message || e?.message || "Failed to load itinerary");
            } finally {
                setLoading(false);
            }
        };
        run();
    }, [authToken, params.id]);

    useEffect(() => {
        const run = async () => {
            if (!authToken) return;
            try {
                const res = await fetchWithToken("/api/area", { limit: "all", status: "true", select: "title,alias" });
                const resolved = (res as any)?.data ?? res;
                setAreas(asArray(resolved));
            } catch {
                setAreas([]);
            }
        };
        run();
    }, [authToken]);

    useEffect(() => {
        const run = async () => {
            if (!authToken) return;
            try {
                const res = await fetchWithToken("/api/hotelcategory", { limit: "all" });
                const resolved = (res as any)?.data ?? res;
                setHotelCategories(asArray(resolved));
            } catch {
                setHotelCategories([]);
            }
        };
        run();
    }, [authToken]);

    useEffect(() => {
        const run = async () => {
            if (!authToken) return;
            if (currentStep !== 2) return;
            if (!formArea?.id) return;

            const key = formArea.id;
            if (lastSitesForAreaKeyRef.current === key) return;
            lastSitesForAreaKeyRef.current = key;

            setLoading(true);
            try {
                const res = await fetchWithToken("/api/site", {
                    limit: "all",
                    area: formArea.id,
                    status: "true",
                    populate: "area",
                    select_area: "title,alias",
                });
                const resolved = (res as any)?.data ?? res;
                const allSites = asArray(resolved);
                setInitialSiteOptions(allSites);
                setSiteDetailsById((prev) => {
                    const next = { ...prev };
                    for (const s of allSites) {
                        const id = getId((s as any)?.id);
                        if (id) next[id] = s;
                    }
                    return next;
                });

                const selected = new Set(selectedSites.map((s) => s.site));
                setSiteOptions(allSites.filter((s: any) => !selected.has(getId(s?.id))));
            } catch {
                lastSitesForAreaKeyRef.current = null;
                setInitialSiteOptions([]);
                setSiteOptions([]);
            } finally {
                setLoading(false);
            }
        };
        run();
    }, [authToken, currentStep, formArea?.id]);

    useEffect(() => {
        const selected = new Set(selectedSites.map((s) => s.site));
        setSiteOptions(initialSiteOptions.filter((s: any) => !selected.has(getId(s?.id))));
    }, [initialSiteOptions, selectedSites]);

    useEffect(() => {
        setSiteSearch("");
        setSiteMobileTab("available");
    }, [formArea?.id]);

    useEffect(() => {
        const handler = window.setTimeout(() => setDebouncedHotelFilters(hotelFilters), 1000);
        return () => window.clearTimeout(handler);
    }, [hotelFilters]);

    useEffect(() => {
        const run = async () => {
            if (!authToken) return;
            if (!hotelModalOpen) return;
            if (hotelModalSiteIndex == null) return;

            const locationQuery = debouncedHotelFilters.location?.trim() || "";
            const nameQuery = debouncedHotelFilters.name?.trim() || "";
            if (!locationQuery && !nameQuery) {
                lastHotelsKeyRef.current = null;
                setHotelsLoading(false);
                setHotelOptions([]);
                return;
            }

            const paramsObj: any = {
                limit: "100",
                populate: "category",
                select_category: "title",
            };
            if (locationQuery) paramsObj.location = locationQuery;
            if (nameQuery) paramsObj.name = nameQuery;
            if (debouncedHotelFilters.hotelCategory) paramsObj.category = debouncedHotelFilters.hotelCategory;

            const key = JSON.stringify(paramsObj);
            if (lastHotelsKeyRef.current === key) return;
            lastHotelsKeyRef.current = key;

            setHotelsLoading(true);
            try {
                const res = await fetchWithToken("/api/hotel", paramsObj);
                const resolved = (res as any)?.data ?? res;
                setHotelOptions(asArray(resolved));
            } catch {
                setHotelOptions([]);
            } finally {
                setHotelsLoading(false);
            }
        };
        run();
    }, [authToken, debouncedHotelFilters.hotelCategory, debouncedHotelFilters.location, debouncedHotelFilters.name, hotelModalOpen, hotelModalSiteIndex]);

    useEffect(() => {
        const run = async () => {
            if (!authToken) return;
            if (selectedSites.length === 0) return;

            const missingIdsSet = new Set<string>();
            for (const site of selectedSites) {
                for (const h of asArray(site?.hotels)) {
                    const id = getId(h);
                    if (!id) continue;
                    const existingName = typeof h === "object" ? String((h as any)?.name || "").trim() : "";
                    const knownName = existingName || hotelNameById[id];
                    if (!knownName) missingIdsSet.add(id);
                }
            }

            const missingIds = Array.from(missingIdsSet).sort();
            if (missingIds.length === 0) return;

            const key = JSON.stringify(missingIds);
            if (lastHotelNamesKeyRef.current === key) return;
            lastHotelNamesKeyRef.current = key;

            try {
                const fetched: Record<string, string> = {};
                try {
                    const res = await fetchWithToken("/api/hotel", {
                        ids: missingIds.join(","),
                        limit: "all",
                    } as any);
                    const resolved = (res as any)?.data ?? res;
                    const hotels = asArray(
                        Array.isArray(resolved)
                            ? resolved
                            : Array.isArray((resolved as any)?.data)
                              ? (resolved as any).data
                              : Array.isArray((resolved as any)?.docs)
                                ? (resolved as any).docs
                                : Array.isArray((resolved as any)?.data?.docs)
                                  ? (resolved as any).data.docs
                                  : Array.isArray((resolved as any)?.items)
                                    ? (resolved as any).items
                                    : Array.isArray((resolved as any)?.data?.data)
                                      ? (resolved as any).data.data
                                      : [],
                    );

                    for (const h of hotels) {
                        const id = getId((h as any)?.id);
                        const name = String((h as any)?.name ?? (h as any)?.title ?? "").trim();
                        if (id && name) fetched[id] = name;
                    }
                } catch {
                }

                if (Object.keys(fetched).length === 0) {
                    let nextIndex = 0;
                    const concurrency = Math.min(6, missingIds.length);
                    await Promise.all(
                        Array.from({ length: concurrency }).map(async () => {
                            while (nextIndex < missingIds.length) {
                                const idx = nextIndex;
                                nextIndex += 1;
                                const id = missingIds[idx];
                                try {
                                    const res = await fetchWithToken(`/api/hotel/${id}`, {} as any);
                                    const resolved = (res as any)?.data ?? res;
                                    const name = String((resolved as any)?.name ?? (resolved as any)?.title ?? "").trim();
                                    if (name) fetched[id] = name;
                                } catch {
                                }
                            }
                        }),
                    );
                }

                if (Object.keys(fetched).length === 0) {
                    lastHotelNamesKeyRef.current = null;
                    return;
                }

                const merged = { ...hotelNameById, ...fetched };
                setHotelNameById(merged);
                setSelectedSites((prev) =>
                    prev.map((s) => ({
                        ...s,
                        hotels: asArray(s.hotels).map((h: any) => {
                            const id = getId(h);
                            if (!id) return h;
                            const currentName = typeof h === "object" ? String(h?.name || "").trim() : "";
                            const nextName = currentName || merged[id];
                            return nextName ? { id, name: nextName } : { id };
                        }),
                    })),
                );
            } catch {
                lastHotelNamesKeyRef.current = null;
            }
        };
        run();
    }, [authToken, hotelNameById, selectedSites]);

    useEffect(() => {
        const run = async () => {
            if (!authToken) return;
            if (currentStep !== 4) return;
            if (!formArea?.id) return;
            if (selectedSites.length === 0) return;

            try {
                const areaRes = await fetchWithToken(`/api/area/${formArea.id}`, { status: "true" });
                const resolvedArea = (areaRes as any)?.data ?? areaRes;
                setPreviewArea(resolvedArea || null);
            } catch {
                setPreviewArea(null);
            }
        };
        run();
    }, [authToken, currentStep, formArea?.id]);

    useEffect(() => {
        const run = async () => {
            if (!authToken) return;
            if (currentStep !== 4) return;
            if (!selectedSiteIdsKey) return;

            const ids = selectedSiteIdsKey.split(",").filter(Boolean);
            const missing = ids.filter((id) => !siteDetailsById[id]);
            if (missing.length === 0) return;

            const key = missing.join(",");
            if (lastPreviewSiteFetchKeyRef.current === key) return;
            lastPreviewSiteFetchKeyRef.current = key;

            try {
                const res = await fetchWithToken("/api/site", { ids: missing.join(",") } as any);
                const resolved = (res as any)?.data ?? res;
                const list = asArray(resolved);
                setSiteDetailsById((prev) => {
                    const next = { ...prev };
                    for (const s of list) {
                        const id = getId((s as any)?.id);
                        if (id) next[id] = s;
                    }
                    return next;
                });
            } catch {
                lastPreviewSiteFetchKeyRef.current = null;
            }
        };
        run();
    }, [authToken, currentStep, selectedSiteIdsKey, siteDetailsById]);

    useEffect(() => {
        if (currentStep !== 4) return;
        if (!selectedSiteIdsKey) {
            setPreviewSites([]);
            return;
        }

        const ids = selectedSiteIdsKey.split(",").filter(Boolean);
        const index = new Map(selectedSites.map((s) => [s.site, s]));
        const mergedSites = ids
            .map((id) => {
                const pick = index.get(id);
                if (!pick) return null;
                const site = siteDetailsById[id] as any;
                const hotels = asArray(pick.hotels)
                    .map((h: any) => {
                        const hid = getId(h);
                        if (!hid) return null;
                        const name = String(h?.name || "").trim();
                        return name ? { id: hid, name } : { id: hid };
                    })
                    .filter(Boolean) as Array<{ id: string; name?: string }>;

                return {
                    ...(site || { id, title: pick.title }),
                    days: pick.days,
                    hotels,
                };
            })
            .filter(Boolean) as any[];

        setPreviewSites(mergedSites);
    }, [currentStep, selectedSiteIdsKey, selectedSites, siteDetailsById]);

    const validateStep1 = () => {
        const next: Record<string, string> = {};
        if (!formTitle.trim()) next.title = "Title is required";
        if (!formArea?.id) next.area = "Area is required";
        setErrors(next);
        return Object.keys(next).length === 0;
    };

    const validateStep2 = () => {
        const next: Record<string, string> = {};
        if (!selectedSites || selectedSites.length === 0) next.sites = "Sites is required";
        setErrors(next);
        return Object.keys(next).length === 0;
    };

    const handleNext = () => {
        setDirtyFields((prev) => ({ ...prev, title: true, area: true, sites: true, hotel: true }));
        if (currentStep === 1 && !validateStep1()) return;
        if (currentStep === 2 && !validateStep2()) return;
        setCurrentStep((s) => Math.min(4, s + 1));
    };

    const handleBack = () => setCurrentStep((s) => Math.max(1, s - 1));

    const handleAddSite = (site: Site) => {
        const siteId = getId(site?.id);
        if (!siteId) return;
        setSelectedSites((prev) => [...prev, { site: siteId, title: site.title, days: 1, hotels: [] }]);
        setSiteOptions((prev) => prev.filter((s) => getId(s?.id) !== siteId));
        setDirtyFields((prev) => ({ ...prev, sites: true }));
        setErrors((prev) => ({ ...prev, sites: "" }));
    };

    const handleRemoveSite = (siteId: string) => {
        setSelectedSites((prev) => {
            const next = prev.filter((s) => s.site !== siteId);
            const selected = new Set(next.map((s) => s.site));
            setSiteOptions(initialSiteOptions.filter((s) => !selected.has(getId(s?.id))));
            return next;
        });
        setDirtyFields((prev) => ({ ...prev, sites: true }));
    };

    const moveSite = (index: number, direction: -1 | 1) => {
        setSelectedSites((prev) => {
            const next = [...prev];
            const target = index + direction;
            if (target < 0 || target >= next.length) return prev;
            const tmp = next[index];
            next[index] = next[target];
            next[target] = tmp;
            return next;
        });
        setDirtyFields((prev) => ({ ...prev, sites: true }));
    };

    const updateSiteDays = (index: number, days: number) => {
        setSelectedSites((prev) => prev.map((s, i) => (i === index ? { ...s, days: Math.max(1, Math.floor(days || 1)) } : s)));
        setDirtyFields((prev) => ({ ...prev, sites: true }));
    };

    const openHotelModalForSite = (index: number) => {
        setHotelModalSiteIndex(index);
        setHotelModalOpen(true);
        setHotelFilters({ location: "", name: "", hotelCategory: "" });
        setDebouncedHotelFilters({ location: "", name: "", hotelCategory: "" });
        setHotelOptions([]);
        setHotelsLoading(false);
        lastHotelsKeyRef.current = null;

        const picked = selectedSites[index];
        const initial: Record<string, boolean> = {};
        picked?.hotels?.forEach((h: any) => {
            const hid = getId(h);
            if (hid) initial[hid] = true;
        });
        setHotelSelection(initial);
    };

    const toggleHotelSelection = (id: string, next: boolean) => setHotelSelection((prev) => ({ ...prev, [id]: next }));

    const applyHotelSelection = () => {
        if (hotelModalSiteIndex == null) return;
        const selectedIds = Object.keys(hotelSelection).filter((id) => hotelSelection[id]);
        const byId = new Map(hotelOptions.map((h) => [getId(h?.id), h]));
        const prevSite = selectedSites[hotelModalSiteIndex];
        const prevNameById = new Map<string, string>();
        asArray(prevSite?.hotels).forEach((h: any) => {
            const id = getId(h);
            if (!id) return;
            const name = typeof h === "object" ? String(h?.name || "").trim() : "";
            if (name) prevNameById.set(id, name);
        });

        const nextNames: Record<string, string> = {};
        const selected = selectedIds.map((id) => {
            const h = byId.get(id);
            const name =
                String((h as any)?.name || "").trim() ||
                prevNameById.get(id) ||
                String(hotelNameById[id] || "").trim();
            if (name) nextNames[id] = name;
            return name ? { id, name } : { id };
        });

        if (Object.keys(nextNames).length > 0) {
            setHotelNameById((prev) => ({ ...prev, ...nextNames }));
        }

        setSelectedSites((prev) => prev.map((s, i) => (i === hotelModalSiteIndex ? { ...s, hotels: selected } : s)));
        setHotelModalOpen(false);
        setHotelModalSiteIndex(null);
    };

    const removeHotelFromSite = (siteIndex: number, hotelId: string) => {
        setSelectedSites((prev) =>
            prev.map((s, i) =>
                i === siteIndex ? { ...s, hotels: s.hotels.filter((h: any) => getId(h) !== hotelId) } : s,
            ),
        );
    };

    const handleSubmit = async () => {
        if (!authToken) return;
        if (!validateStep1()) {
            setCurrentStep(1);
            return;
        }
        if (!validateStep2()) {
            setCurrentStep(2);
            return;
        }

        setSaving(true);
        try {
            const newSites = selectedSites.map((s) => ({
                days: s.days,
                siteId: s.site,
                hotels: asArray(s.hotels)
                    .map((h: any) => getId(h?.id ?? h))
                    .filter(Boolean),
            }));

            const payload: any = {
                title: formTitle,
                status: formStatus,
                area: formArea?.id || null,
                sites: newSites.length > 0 ? newSites : null,
            };

            const res = params.id ? await itineraryService.updateById(params.id, payload) : await itineraryService.add(payload);
            if ((res as any)?.error) throw new Error((res as any).error);
            navigate("/itinerary/list");
        } catch (e: any) {
            setLoadError(e?.error?.message || e?.message || (params.id ? "Failed to update itinerary" : "Failed to add itinerary"));
        } finally {
            setSaving(false);
        }
    };

    const breadcrumbs = (
        <div className="mb-4 rounded-sm border border-secondary bg-primary p-2">
            <div className="flex flex-wrap items-center gap-1 text-sm text-tertiary">
                <button
                    type="button"
                    onClick={() => navigate("/dashboard")}
                    className="inline-flex items-center gap-1 rounded-sm px-1 py-0.5 text-primary hover:bg-primary_hover"
                >
                    <Home04 className="size-4" />
                </button>
                <span>/</span>
                <button type="button" onClick={() => navigate("/itinerary/list")} className="rounded-sm px-1 py-0.5 text-primary hover:bg-primary_hover">
                    Itinerary
                </button>
                <span>/</span>
                <button type="button" onClick={() => navigate("/itinerary/list")} className="rounded-sm px-1 py-0.5 text-primary hover:bg-primary_hover">
                    list
                </button>
                <span>/</span>
                <span className="px-1 py-0.5 text-primary">{isCreate ? "Add" : "Edit"}</span>
            </div>
        </div>
    );

    if (!canEdit) {
        return (
            <DefaultLayout>
                {breadcrumbs}
                <div className="rounded-xl border border-secondary bg-primary p-4 text-sm text-tertiary">You don’t have access to edit itineraries.</div>
            </DefaultLayout>
        );
    }

    return (
        <DefaultLayout>
            {breadcrumbs}

            <div className="flex flex-wrap justify-between gap-3 rounded-xl border border-secondary bg-primary p-4">
                <div className="flex flex-wrap gap-2">
                    {steps.map((step, index) => {
                        const active = index + 1 === currentStep;
                        return (
                            <button
                                key={step}
                                type="button"
                                onClick={() => setCurrentStep(index + 1)}
                                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm ring-1 ring-secondary ${
                                    active ? "bg-secondary text-primary" : "text-tertiary hover:bg-primary_hover"
                                }`}
                            >
                                <span className="grid size-6 place-items-center rounded-full bg-primary ring-1 ring-secondary">{index + 1}</span>
                                <span className={active ? "font-semibold" : ""}>{step}</span>
                            </button>
                        );
                    })}
                </div>
                <div className="flex items-center gap-2">
                    <Button size="sm" color="secondary" iconLeading={ArrowLeft} onClick={() => navigate("/itinerary/list")}>
                        Back to list
                    </Button>
                </div>
            </div>

            <div className="mt-4">
                {loading ? (
                    <div className="flex justify-center py-10">
                        <LoadingIndicator type="line-spinner" label="Loading..." />
                    </div>
                ) : loadError ? (
                    <div className="rounded-xl border border-secondary bg-primary p-4 text-sm text-tertiary">{loadError}</div>
                ) : (
                    <div className="rounded-xl border border-secondary bg-primary p-4">
                        {currentStep === 1 ? (
                            <div className="space-y-4">
                                <h2 className="text-lg font-semibold text-primary">{isCreate ? "Add Area" : "Edit Area"}</h2>

                                <Input
                                    label="Title*"
                                    value={formTitle}
                                    onChange={(value) => {
                                        setFormTitle(value);
                                        setDirtyFields((prev) => ({ ...prev, title: true }));
                                        setErrors((prev) => ({ ...prev, title: value.trim() ? "" : "Title is required" }));
                                    }}
                                    placeholder="Enter Title"
                                />
                                {dirtyFields.title && errors.title ? <p className="text-xs text-error">{errors.title}</p> : null}

                                <Select
                                    label="Area*"
                                    isDisabled={!isCreate}
                                    selectedKey={formArea?.id || "__none__"}
                                    onSelectionChange={(key) => {
                                        if (!isCreate) return;
                                        const value = key === "__none__" ? "" : String(key ?? "");
                                        const picked = areas.find((a) => getId(a?.id) === value);
                                        setFormArea(value ? { id: value, title: picked?.title } : null);
                                        setSelectedSites([]);
                                        setDirtyFields((prev) => ({ ...prev, area: true }));
                                        setErrors((prev) => ({ ...prev, area: value ? "" : "Area is required" }));
                                    }}
                                    items={[
                                        { id: "__none__", label: "Select Area" },
                                        ...areas.map((a) => ({ id: getId(a?.id), label: a?.title || getId(a?.id) })),
                                    ]}
                                >
                                    {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                </Select>
                                {dirtyFields.area && errors.area ? <p className="text-xs text-error">{errors.area}</p> : null}

                                <Select
                                    label="Status"
                                    selectedKey={formStatus ? String(formStatus) : "__none__"}
                                    onSelectionChange={(key) => setFormStatus(key === "__none__" ? "" : String(key ?? ""))}
                                    items={[
                                        { id: "__none__", label: "Select Status" },
                                        { id: "true", label: "Active" },
                                        { id: "false", label: "Inactive" },
                                    ]}
                                >
                                    {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                </Select>
                            </div>
                        ) : null}

                        {currentStep === 2 ? (
                            <div className="space-y-4">
                                <h2 className="text-lg font-semibold text-primary">{isCreate ? "Add Sites" : "Edit Sites"}</h2>
                                {dirtyFields.sites && errors.sites ? <p className="text-xs text-error">{errors.sites}</p> : null}

                                <div className="md:hidden">
                                    <div className="flex items-center gap-2 rounded-lg bg-primary p-1 ring-1 ring-secondary">
                                        <button
                                            type="button"
                                            onClick={() => setSiteMobileTab("available")}
                                            className={`flex flex-1 items-center justify-center gap-2 rounded-md px-3 py-2 text-sm ${
                                                siteMobileTab === "available" ? "bg-secondary text-primary" : "text-tertiary hover:bg-primary_hover"
                                            }`}
                                        >
                                            <span>Available</span>
                                            <Badge size="sm" color="success">
                                                {filteredSiteOptions.length}
                                            </Badge>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setSiteMobileTab("selected")}
                                            className={`flex flex-1 items-center justify-center gap-2 rounded-md px-3 py-2 text-sm ${
                                                siteMobileTab === "selected" ? "bg-secondary text-primary" : "text-tertiary hover:bg-primary_hover"
                                            }`}
                                        >
                                            <span>Selected</span>
                                            <Badge size="sm" color="success">
                                                {selectedSites.length}
                                            </Badge>
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-4 md:items-stretch md:min-h-[calc(100dvh-260px)]">
                                    <div className={`mb-4 md:mb-0 ${siteMobileTab === "available" ? "" : "hidden md:block"}`}>
                                        <div className="flex h-[calc(100dvh-360px)] flex-col rounded-xl border border-secondary bg-primary md:h-[calc(100dvh-260px)]">
                                            <div className="flex items-center justify-between gap-3 border-b border-secondary p-3">
                                                <h3 className="text-xs font-bold uppercase text-tertiary">Available Sites</h3>
                                                <div className="flex items-center gap-2">
                                                    <Badge size="sm" color="success">
                                                        {filteredSiteOptions.length}
                                                    </Badge>
                                                    {siteSearch.trim() ? <span className="text-xs text-tertiary">of {siteOptions.length}</span> : null}
                                                </div>
                                            </div>

                                            <div className="border-b border-secondary p-3">
                                                <Input placeholder="Search sites..." value={siteSearch} onChange={setSiteSearch} />
                                            </div>

                                            <div className="flex-1 overflow-auto p-2">
                                                {filteredSiteOptions.length > 0 ? (
                                                    filteredSiteOptions.map((item) => {
                                                        const id = getId(item?.id);
                                                        return (
                                                            <div
                                                                key={id}
                                                                className="group relative cursor-pointer rounded-sm px-2 py-2 text-sm text-primary hover:bg-secondary hover:rounded-sm"
                                                                onDoubleClick={() => handleAddSite(item)}
                                                            >
                                                                <div className="flex items-center justify-between gap-2">
                                                                    <span className="max-w-full truncate">{item.title || id}</span>
                                                                    <button
                                                                        type="button"
                                                                        className="absolute right-2 top-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            handleAddSite(item);
                                                                        }}
                                                                    >
                                                                        <span className="flex size-5 items-center justify-center rounded-full bg-success-solid text-white">
                                                                            <Plus className="size-3 stroke-[3px]" />
                                                                        </span>
                                                                    </button>
                                                                </div>
                                                                <hr className="mt-2 border-secondary" />
                                                            </div>
                                                        );
                                                    })
                                                ) : (
                                                    <p className="p-2 text-sm text-tertiary">{siteSearch.trim() ? "No matching sites." : "No available sites."}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className={`md:col-span-2 ${siteMobileTab === "selected" ? "" : "hidden md:block"}`}>
                                        <div className="flex h-[calc(100dvh-360px)] flex-col rounded-xl border border-secondary bg-primary md:h-[calc(100dvh-260px)]">
                                            <div className="flex items-center justify-between gap-3 border-b border-secondary p-3">
                                                <h3 className="text-xs font-bold uppercase text-tertiary">Selected Sites</h3>
                                                <div className="flex items-center gap-3">
                                                    <Badge size="sm" color="success">
                                                        {selectedSites.length}
                                                    </Badge>
                                                    <Badge size="sm" color="warning">
                                                        No. of days : {totalSiteDays}
                                                    </Badge>
                                                </div>
                                            </div>

                                            <div className="flex-1 overflow-auto p-2">
                                                {selectedSites.length > 0 ? (
                                                    selectedSites.map((item, index) => (
                                                        <div
                                                            key={`${item.site}-${index}`}
                                                            className="flex items-center gap-3 rounded-sm px-2 py-2 text-sm text-primary hover:bg-primary_hover"
                                                        >
                                                            <div className="flex flex-col overflow-hidden rounded-md bg-primary ring-1 ring-secondary">
                                                                <button
                                                                    type="button"
                                                                    aria-label="Move up"
                                                                    className="grid size-7 place-items-center text-tertiary hover:bg-primary_hover hover:text-primary disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-tertiary"
                                                                    disabled={index === 0}
                                                                    onClick={() => moveSite(index, -1)}
                                                                >
                                                                    <ArrowUp className="size-4 stroke-[2.5px]" />
                                                                </button>
                                                                <div className="h-px w-full bg-secondary" />
                                                                <button
                                                                    type="button"
                                                                    aria-label="Move down"
                                                                    className="grid size-7 place-items-center text-tertiary hover:bg-primary_hover hover:text-primary disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-tertiary"
                                                                    disabled={index === selectedSites.length - 1}
                                                                    onClick={() => moveSite(index, 1)}
                                                                >
                                                                    <ArrowDown className="size-4 stroke-[2.5px]" />
                                                                </button>
                                                            </div>

                                                            <span className="min-w-0 flex-1 truncate">{item.title || item.site}</span>

                                                            <div className="flex items-center gap-3">
                                                                <div className="flex items-center rounded-md bg-primary ring-1 ring-secondary">
                                                                    <button
                                                                        type="button"
                                                                        aria-label="Decrease days"
                                                                        className="grid size-7 place-items-center text-tertiary hover:bg-primary_hover hover:text-primary"
                                                                        onClick={() => updateSiteDays(index, (item.days || 1) - 1)}
                                                                    >
                                                                        <span className="text-base leading-none">-</span>
                                                                    </button>
                                                                    <p className="min-w-8 px-2 text-center text-sm font-semibold text-primary">{item.days}</p>
                                                                    <button
                                                                        type="button"
                                                                        aria-label="Increase days"
                                                                        className="grid size-7 place-items-center text-tertiary hover:bg-primary_hover hover:text-primary"
                                                                        onClick={() => updateSiteDays(index, (item.days || 1) + 1)}
                                                                    >
                                                                        <span className="text-base leading-none">+</span>
                                                                    </button>
                                                                </div>

                                                                <button
                                                                    type="button"
                                                                    aria-label="Remove site"
                                                                    className="grid size-8 place-items-center rounded-full bg-primary text-danger ring-1 ring-secondary hover:bg-primary_hover"
                                                                    onClick={() => handleRemoveSite(item.site)}
                                                                >
                                                                    <Trash01 className="size-4" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p className="p-3 text-sm text-tertiary">No selected sites.</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : null}

                        {currentStep === 3 ? (
                            <div className="space-y-4">
                                <h2 className="text-lg font-semibold text-primary">{isCreate ? "Add Hotels" : "Edit Hotels"}</h2>

                                <div className="space-y-3">
                                    {selectedSites.map((s, index) => (
                                        <div key={`${s.site}-${index}`} className="rounded-xl border border-secondary bg-primary p-4">
                                            <div className="flex flex-wrap items-start justify-between gap-3">
                                                <div className="space-y-1">
                                                    <p className="text-sm font-semibold text-primary">{s.title || s.site}</p>
                                                    <p className="text-xs text-tertiary">{s.days} day(s)</p>
                                                </div>
                                                <Button size="sm" color="primary" iconLeading={Plus} onClick={() => openHotelModalForSite(index)}>
                                                    Add hotels
                                                </Button>
                                            </div>

                                            {asArray(s.hotels).length > 0 ? (
                                                <div className="mt-4 flex flex-wrap gap-2">
                                                    {asArray(s.hotels).map((h: any) => {
                                                        const id = getId(h);
                                                        const name = String((h as any)?.name || "").trim() || String(hotelNameById[id] || "").trim();
                                                        return (
                                                            <div
                                                                key={id}
                                                                className="inline-flex items-center gap-2 rounded-md bg-secondary px-3 py-2 text-sm text-primary ring-1 ring-secondary"
                                                            >
                                                                <span className="max-w-56 truncate">{name || id}</span>
                                                                <button
                                                                    type="button"
                                                                    className="text-tertiary hover:text-primary"
                                                                    onClick={() => removeHotelFromSite(index, id)}
                                                                >
                                                                    <Trash01 className="size-4" />
                                                                </button>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            ) : (
                                                <p className="mt-3 text-sm text-tertiary">No hotels selected.</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : null}

                        {currentStep === 4 ? (
                            <div className="space-y-4">
                                <h2 className="text-lg font-semibold text-primary">Preview</h2>

                                <div className="container mx-auto bg-pink-100 m-4 overflow-hidden">
                                    <div className="pt-5 px-5">
                                        {previewArea?.headerContent ? <div dangerouslySetInnerHTML={{ __html: previewArea.headerContent }} /> : null}
                                    </div>

                                    <div className="mt-5">
                                        {previewArea?.featureImg ? <img width="100%" src={previewArea.featureImg} alt="img1" /> : null}
                                        <h2 className="text-center font-extrabold text-xl text-blue-800 mt-5">{previewArea?.title}</h2>
                                    </div>

                                    <hr className="border border-gray-300 my-4" />

                                    <div className="p-4">{previewArea?.description ? <div dangerouslySetInnerHTML={{ __html: previewArea.description }} /> : null}</div>

                                    <hr className="border border-gray-300 my-4" />

                                    <div className="mt-4">{previewArea?.featureImg ? <img width="100%" src={previewArea.featureImg} alt="img2" /> : null}</div>

                                    {previewSites.length > 0
                                        ? (() => {
                                              let currentDayCount = 1;
                                              return previewSites.map((day: any) => {
                                                  const span = Number(day?.days || 1);
                                                  const dayTitle = `DAY ${currentDayCount}${span <= 1 ? "" : `-${currentDayCount + span - 1}`}: ${day?.title}`;
                                                  currentDayCount += Number.isFinite(span) && span > 0 ? span : 1;

                                                  return (
                                                      <div key={day?.id || dayTitle} className="mt-5">
                                                          <h2 className="bg-blue-900 mt-5 p-3 font-semibold text-xl text-white text-center">{dayTitle}</h2>
                                                          {day?.featureImg ? <img width="100%" src={day.featureImg} alt={`Image for ${day?.title}`} /> : null}
                                                          {day?.description ? (
                                                              <div
                                                                  className="inner-html-box w-full break-words p-2 px-4"
                                                                  dangerouslySetInnerHTML={{ __html: replaceClientName(day.description) }}
                                                              />
                                                          ) : null}
                                                          {Array.isArray(day?.hotels) && day.hotels.length > 0 ? (
                                                              <div className="flex flex-wrap gap-1 justify-center">
                                                                  {day.hotels.map((hotelName: any) => (
                                                                      <div
                                                                          key={hotelName?.id || hotelName?.name}
                                                                          className="bg-blue-500 text-white font-semibold w-36 text-center p-2 m-2 rounded-md flex items-center justify-center"
                                                                      >
                                                                          <button type="button">{hotelName?.name || hotelName?.id}</button>
                                                                      </div>
                                                                  ))}
                                                              </div>
                                                          ) : null}
                                                      </div>
                                                  );
                                              });
                                          })()
                                        : null}

                                    <hr className="border border-gray-300 my-4" />
                                </div>
                            </div>
                        ) : null}

                        <div className="mt-6 flex flex-wrap justify-center gap-3">
                            {currentStep > 1 ? (
                                <Button size="sm" color="secondary" iconLeading={ArrowLeft} onClick={handleBack}>
                                    Back
                                </Button>
                            ) : null}
                            {currentStep < 4 ? (
                                <Button size="sm" color="primary" iconTrailing={ArrowRight} onClick={handleNext}>
                                    Next
                                </Button>
                            ) : (
                                <Button size="sm" color="primary" isLoading={saving} onClick={handleSubmit}>
                                    Submit
                                </Button>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <ModalOverlay
                isOpen={hotelModalOpen}
                isDismissable
                className="overflow-hidden items-center"
                onOpenChange={(open) => {
                    if (!open) {
                        setHotelModalOpen(false);
                        setHotelModalSiteIndex(null);
                        setHotelFilters({ location: "", name: "", hotelCategory: "" });
                        setDebouncedHotelFilters({ location: "", name: "", hotelCategory: "" });
                        setHotelSelection({});
                        setHotelOptions([]);
                        setHotelsLoading(false);
                        lastHotelsKeyRef.current = null;
                    }
                }}
            >
                {({ state }) => (
                    <Modal className="max-w-4xl h-[85dvh] max-h-[85dvh] overflow-y-hidden">
                        <Dialog className="h-full items-stretch">
                            <div className="flex h-full w-full flex-col overflow-hidden rounded-xl bg-primary ring-1 ring-secondary">
                                <div className="relative shrink-0 px-5 pt-5">
                                    <div className="space-y-0.5">
                                        <h2 className="text-lg font-semibold text-primary">
                                            Add Hotels to {hotelModalSiteIndex != null ? selectedSites[hotelModalSiteIndex]?.title || "" : ""}
                                        </h2>
                                    </div>
                                    <CloseButton size="md" className="absolute top-3 right-3" onClick={() => state.close()} />
                                </div>

                                <div className="flex min-h-0 flex-1 flex-col overflow-hidden px-5 pb-5">
                                    <div className="mt-4 grid shrink-0 grid-cols-1 gap-4 md:grid-cols-3">
                                        <Input
                                            label="Select a location*"
                                            icon={SearchLg}
                                            value={hotelFilters.location}
                                            onChange={(value) => setHotelFilters((prev) => ({ ...prev, location: value }))}
                                            placeholder="Search by location"
                                        />

                                        <Select
                                            label="Hotel Category"
                                            selectedKey={hotelFilters.hotelCategory ? hotelFilters.hotelCategory : "__none__"}
                                            onSelectionChange={(key) =>
                                                setHotelFilters((prev) => ({ ...prev, hotelCategory: key === "__none__" ? "" : String(key ?? "") }))
                                            }
                                            items={[
                                                { id: "__none__", label: "Select Hotel Category" },
                                                ...hotelCategories.map((c) => ({ id: getId(c?.id), label: c?.title || getId(c?.id) })),
                                            ]}
                                        >
                                            {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                        </Select>

                                        <Input
                                            label="Enter Hotel Name"
                                            icon={SearchLg}
                                            value={hotelFilters.name}
                                            onChange={(value) => setHotelFilters((prev) => ({ ...prev, name: value }))}
                                            placeholder="Search by hotel"
                                        />
                                    </div>

                                    <div className="mt-4 min-h-0 flex-1 overflow-hidden">
                                        {hotelFilters.name === "" && hotelFilters.location === "" ? (
                                            <p className="p-10 text-center text-sm text-tertiary">Please enter a location or hotel name to see hotels</p>
                                        ) : hotelsLoading ? (
                                            <div className="flex justify-center py-8">
                                                <LoadingIndicator type="dot-circle" label="Loading hotels..." />
                                            </div>
                                        ) : hotelOptions.length > 0 ? (
                                            <div className="flex h-full min-h-0 flex-col space-y-3">
                                                <div className="text-sm text-tertiary">
                                                    {hotelFilters.location
                                                        ? `Showing result of ${hotelFilters.location} Location`
                                                        : `Showing result of ${hotelFilters.name || "selected"} Hotel`}
                                                </div>

                                                <div className="min-h-0 flex-1 overflow-auto rounded-lg ring-1 ring-secondary">
                                                    <div className="divide-y divide-secondary">
                                                        {hotelOptions.map((h) => {
                                                            const id = getId(h?.id);
                                                            const label = `${h?.name || id}${h?.location ? ` - (${h.location})` : ""}`;
                                                            return (
                                                                <div key={id} className="flex items-center justify-between gap-3 px-4 py-3">
                                                                    <div className="min-w-0">
                                                                        <p className="truncate text-sm font-medium text-primary">{label}</p>
                                                                        {typeof h?.category === "object" && (h.category as any)?.title ? (
                                                                            <p className="text-xs text-tertiary">{(h.category as any).title}</p>
                                                                        ) : null}
                                                                    </div>
                                                                    <Checkbox
                                                                        aria-label={label}
                                                                        isSelected={Boolean(hotelSelection[id])}
                                                                        onChange={(next) => toggleHotelSelection(id, Boolean(next))}
                                                                    />
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <p className="p-10 text-center text-sm text-tertiary">No hotels found</p>
                                        )}
                                    </div>

                                    <div className="mt-5 shrink-0 flex justify-end gap-2">
                                        <Button color="secondary" onClick={() => state.close()}>
                                            Close
                                        </Button>
                                        <Button color="primary" onClick={applyHotelSelection}>
                                            ok
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Dialog>
                    </Modal>
                )}
            </ModalOverlay>
        </DefaultLayout>
    );
}
