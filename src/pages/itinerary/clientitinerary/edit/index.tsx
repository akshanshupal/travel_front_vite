import { DefaultLayout } from "@/layouts/DefaultLayout";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { useStoreLogin } from "@/store/login";
import { useStoreSnackbar } from "@/store/snackbar";
import { clientItineraryService } from "@/utils/services/clientItineraryService";
import { getSalesEx } from "@/utils/services/salesService";
import { getHotelCategory } from "@/utils/services/hotelService";
import { getMailTemplate } from "@/utils/services/mailtemplateService";
import { useEffect, useState, useMemo, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import { SelectItem } from "@/components/base/select/select-item";
import { ComboBox } from "@/components/base/select/combobox";
import { DatePicker } from "@/components/application/date-picker/date-picker";
import { parseDate } from "@internationalized/date";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { Label } from "@/components/base/input/label";
import { RichTextEditor } from "@/components/application/rich-text-editor/rich-text-editor";
import PreviewMail from "@/components/PreviewMail";
import { FileUploadDropZone } from "@/components/application/file-upload/file-upload-base";
import { fetchWithToken } from "@/utils/fetchApi";
import { Modal, ModalOverlay, Dialog } from "@/components/application/modals/modal";
import { Plus, Trash01, ArrowUp, ArrowDown, Edit01, X, ArrowLeft, SearchLg } from "@untitledui/icons";
import { Badge } from "@/components/base/badges/badges";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { FileTrigger } from "@/components/base/file-upload-trigger/file-upload-trigger";
import { CloseButton } from "@/components/base/buttons/close-button";
import { Select } from "@/components/base/select/select";
import { LoadingIndicator } from "@/components/application/loading-indicator/loading-indicator";
import { RadioButton, RadioGroup } from "@/components/base/radio-buttons/radio-buttons";
import { MultiSelect } from "@/components/base/select/multi-select";
import { useListData } from "react-stately";
import { cx } from "@/utils/cx";

const FOOD_OPTIONS = [
    { id: "Breakfast", label: "Breakfast" },
    { id: "Lunch", label: "Lunch" },
    { id: "Dinner", label: "Dinner" },
    { id: "Breakfast(Non-Veg)", label: "Breakfast(Non-Veg)" },
    { id: "Lunch(Non-Veg)", label: "Lunch(Non-Veg)" },
    { id: "Dinner(Non-Veg)", label: "Dinner(Non-Veg)" },
];

const TRANSPORT_OPTIONS = [
    { id: "pickup", label: "Pickup" },
    { id: "drop", label: "Drop" },
    { id: "sightseeing", label: "Site Seeing" },
];

const TAX_OPTIONS = [
    { id: "5%", label: "5%" },
    { id: "9%", label: "9%" },
    { id: "12%", label: "12%" },
    { id: "18%", label: "18%" },
    { id: "No Gst", label: "No Gst" },
];

const asArray = (value: any) => {
    if (Array.isArray(value)) return value;
    return [];
};

const getId = (value: any) => String(value?.id ?? value?._id ?? value ?? "");

const getUploadUrl = (response: any) => {
    const resolved = response?.data ?? response;
    if (typeof resolved === "string") return resolved;
    if (typeof resolved?.url === "string") return resolved.url;
    if (typeof resolved?.data === "string") return resolved.data;
    if (typeof resolved?.location === "string") return resolved.location;
    return "";
};

const toAsiaKolkataDateString = (value: unknown) => {
    if (!value) return "";
    if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) return value;

    const date = new Date(value as any);
    if (Number.isNaN(date.getTime())) {
        if (typeof value === "string") {
            const maybeDate = value.split("T")[0];
            if (/^\d{4}-\d{2}-\d{2}$/.test(maybeDate)) return maybeDate;
        }
        return "";
    }

    const parts = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).formatToParts(date);

    const y = parts.find((p) => p.type === "year")?.value;
    const m = parts.find((p) => p.type === "month")?.value;
    const d = parts.find((p) => p.type === "day")?.value;
    if (!y || !m || !d) return "";
    return `${y}-${m}-${d}`;
};

export default function ClientItineraryEditPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { user, authToken } = useStoreLogin();
    const { showSnackbar } = useStoreSnackbar();
    
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const [currentStep, setCurrentStep] = useState(1);
    const steps = useMemo(() => ["Client Details", "Area", "Site", "Preview"], []);

    const selectedFoodList = useListData<any>({
        initialItems: [],
        getKey: (item) => item.id
    });

    const selectedTransportList = useListData<any>({
        initialItems: [],
        getKey: (item) => item.id
    });

    const isStepDisabled = (stepIndex: number) => {
        const stepNumber = stepIndex + 1;
        
        // Always allow navigating to current or previous steps
        if (stepNumber <= currentStep) return false;

        // To go to Step 2 (Area), Step 1 must be valid
        if (stepNumber === 2) {
            return !validateStep1(false);
        }

        // To go to Step 3 (Site), Step 1 and Step 2 must be valid
        if (stepNumber === 3) {
            return !validateStep1(false) || !validateStep2(false);
        }

        // To go to Step 4 (Preview), Step 1, Step 2, and Step 3 must be valid
        if (stepNumber === 4) {
            return !validateStep1(false) || !validateStep2(false) || !validateStep3();
        }
        
        return false;
    };

    // Hotel Modal State (New)
    const [hotelAddModalOpen, setHotelAddModalOpen] = useState(false);
    const [hotelFilters, setHotelFilters] = useState({ location: "", name: "", hotelCategory: "" });
    const [debouncedHotelFilters, setDebouncedHotelFilters] = useState(hotelFilters);
    const [hotelsLoading, setHotelsLoading] = useState(false);
    const [hotelOptions, setHotelOptions] = useState<any[]>([]);
    const [hotelSelection, setHotelSelection] = useState<Record<string, boolean>>({});
    const lastHotelsKeyRef = useRef<string | null>(null);

    // Site Modal State
    const [siteModalOpen, setSiteModalOpen] = useState(false);
    const [editingSiteIndex, setEditingSiteIndex] = useState<number | null>(null);
    const [tempSiteData, setTempSiteData] = useState<any>({
        title: "",
        description: "",
        days: 1,
        featureImg: "",
        hotels: []
    });

    const [formData, setFormData] = useState<any>({
        itinerary: "",
        title: "",
        clientName: "",
        email: "",
        mobile: "",
        tourDate: "",
        noOfAdults: "",
        noOfKids: "",
        kidsAges: [],
        food: "",
        selectedFood: [],
        transport: "",
        selectedTransport: [],
        pickUpLocation: "",
        dropLocation: "",
        noOfPackageDays: "",
        noOfPackageNights: "",
        packageCost: "",
        taxes: "",
        salesExecutive: "",
        noOfRooms: "",
        hotelCategory: "",
        templateId: "",
        clientArea: {
            title: "",
            headerContent: "",
            description: "",
            featureImg: "",
            hotelImg: ""
        },
        clientSites: []
    });

    const [errors, setErrors] = useState<any>({});
    const [hotelCategories, setHotelCategories] = useState<any[]>([]);
    const [salesExecutives, setSalesExecutives] = useState<any[]>([]);
    const [mailTemplates, setMailTemplates] = useState<any[]>([]);
    const [areas, setAreas] = useState<any[]>([]);
    const [siteOptions, setSiteOptions] = useState<any[]>([]);
    const [selectedAreaId, setSelectedAreaId] = useState<string>("");
    const [selectedSiteId, setSelectedSiteId] = useState<string>("");
    
    // Fetch initial data
    useEffect(() => {
        const fetchAll = async () => {
            try {
                const [hotelRes, salesRes, mailRes, areaRes] = await Promise.all([
                    getHotelCategory({ limit: "all" }),
                    getSalesEx({ limit: "all" }),
                    getMailTemplate({ limit: "all" }),
                    fetchWithToken("/api/area", { limit: "all", select: "title" })
                ]);

                if (hotelRes?.data) setHotelCategories(hotelRes.data);
                else if (Array.isArray(hotelRes)) setHotelCategories(hotelRes);

                if (salesRes?.data) setSalesExecutives(salesRes.data);
                else if (Array.isArray(salesRes)) setSalesExecutives(salesRes);

                if (mailRes?.data) setMailTemplates(mailRes.data);
                else if (Array.isArray(mailRes)) setMailTemplates(mailRes);

                const areaList = (areaRes as any)?.data ?? areaRes;
                if (Array.isArray(areaList)) setAreas(areaList);
                else if (Array.isArray((areaList as any)?.docs)) setAreas((areaList as any).docs);

                if (id) {
                    const res = await clientItineraryService.getById(id, { populate: "itinerary,hotelCategory,salesExecutive,templateId" });
                    if (res) {
                        const hasFood = Array.isArray(res.selectedFood) && res.selectedFood.length > 0;
                        const hasTransport = Array.isArray(res.selectedTransport) && res.selectedTransport.length > 0;

                        setFormData({
                            ...res,
                            food: hasFood ? "yes" : "no",
                            transport: hasTransport ? "yes" : "no",
                            itinerary: res.itinerary ? { id: res.itinerary.id || res.itinerary._id, title: res.itinerary.title } : "",
                            hotelCategory: res.hotelCategory ? { id: res.hotelCategory.id || res.hotelCategory._id, title: res.hotelCategory.title } : "",
                            salesExecutive: res.salesExecutive ? { id: res.salesExecutive.id || res.salesExecutive._id, name: res.salesExecutive.name } : "",
                            templateId: res.templateId ? { id: res.templateId.id || res.templateId._id, name: res.templateId.name } : "",
                            tourDate: toAsiaKolkataDateString(res.tourDate),
                            kidsAges: res.kidsAges || [],
                            clientArea: res.clientArea || { title: "", headerContent: "", description: "", featureImg: "", hotelImg: "" },
                            clientSites: res.clientSites || []
                        });

                        const fItems = (res.selectedFood || []).map((f: string) => {
                             const opt = FOOD_OPTIONS.find(o => o.id === f);
                             return opt || { id: f, label: f };
                        });
                        [...selectedFoodList.items].forEach(i => selectedFoodList.remove(i.id));
                        fItems.forEach((i: any) => selectedFoodList.append(i));

                        const tItems = (res.selectedTransport || []).map((t: string) => {
                             const opt = TRANSPORT_OPTIONS.find(o => o.id === t);
                             return opt || { id: t, label: t };
                        });
                        [...selectedTransportList.items].forEach(i => selectedTransportList.remove(i.id));
                        tItems.forEach((i: any) => selectedTransportList.append(i));
                    }
                }

            } catch (error: any) {
                console.error("Error fetching data", error);
                showSnackbar({
                    title: "Error",
                    description: error.message || "Failed to fetch data",
                    color: "danger"
                });
            } finally {
                setIsFetching(false);
            }
        };
        fetchAll();
    }, [id, showSnackbar]);

    const handleChange = (name: string, value: any) => {
        setFormData((prev: any) => {
            const newData = { ...prev, [name]: value };
            
            if (name === "food" && value === "no") {
                newData.selectedFood = [];
                [...selectedFoodList.items].forEach(i => selectedFoodList.remove(i.id));
            }
            if (name === "transport" && value === "no") {
                newData.selectedTransport = [];
                [...selectedTransportList.items].forEach(i => selectedTransportList.remove(i.id));
            }
            if (name === "noOfKids") {
                const num = Number(value) || 0;
                const currentAges = prev.kidsAges || [];
                if (num > currentAges.length) {
                    newData.kidsAges = [...currentAges, ...Array(num - currentAges.length).fill("")];
                } else {
                    newData.kidsAges = currentAges.slice(0, num);
                }
            }
            return newData;
        });
        if (errors[name]) setErrors((prev: any) => ({ ...prev, [name]: "" }));
    };

    const handleClientAreaChange = (name: string, value: any) => {
        setFormData((prev: any) => ({
            ...prev,
            clientArea: { ...prev.clientArea, [name]: value }
        }));
    };

    const handleAgeChange = (index: number, value: string) => {
        const newAges = [...formData.kidsAges];
        newAges[index] = value;
        setFormData((prev: any) => ({ ...prev, kidsAges: newAges }));
    };

    const handleFileUpload = async (files: FileList | null) => {
        if (!files || files.length === 0) return null;
        const file = files[0];
        
        try {
            showSnackbar({ title: "Uploading", description: "Uploading image...", color: "warning" });
            const fd = new FormData();
            fd.append("fmFile", file, file.name);
            const res = await fetchWithToken("/api/file/upload", fd as any, { method: "POST" });
            const url = getUploadUrl(res);
            
            if (!url) throw new Error("Failed to get upload URL");
            
            showSnackbar({ title: "Success", description: "Image uploaded successfully", color: "success" });
            return url;
        } catch (error: any) {
            console.error("Upload error:", error);
            showSnackbar({ title: "Error", description: error.message || "Failed to upload image", color: "danger" });
            return null;
        }
    };

    const handleClientAreaImageChange = async (field: "featureImg" | "hotelImg", files: FileList | null) => {
        const url = await handleFileUpload(files);
        if (url) {
            handleClientAreaChange(field, url);
        }
    };

    // Site Management Functions
    const moveSite = (index: number, direction: number) => {
        setFormData((prev: any) => {
            const newSites = [...prev.clientSites];
            if (index + direction < 0 || index + direction >= newSites.length) return prev;
            
            const temp = newSites[index];
            newSites[index] = newSites[index + direction];
            newSites[index + direction] = temp;
            
            return { ...prev, clientSites: newSites };
        });
    };

    const deleteSite = (index: number) => {
        setFormData((prev: any) => {
            const newSites = prev.clientSites.filter((_: any, i: number) => i !== index);
            return { ...prev, clientSites: newSites };
        });
    };

    const updateSiteDays = (index: number, days: number) => {
        if (days < 1) return;
        setFormData((prev: any) => {
            const newSites = [...prev.clientSites];
            newSites[index] = { ...newSites[index], days };
            return { ...prev, clientSites: newSites };
        });
    };

    // Hotel Logic
    useEffect(() => {
        const handler = window.setTimeout(() => setDebouncedHotelFilters(hotelFilters), 1000);
        return () => window.clearTimeout(handler);
    }, [hotelFilters]);

    useEffect(() => {
        const run = async () => {
            if (!authToken) return;
            if (!hotelAddModalOpen) return;

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
    }, [authToken, debouncedHotelFilters.hotelCategory, debouncedHotelFilters.location, debouncedHotelFilters.name, hotelAddModalOpen]);

    const toggleHotelSelection = (id: string, next: boolean) => setHotelSelection((prev) => ({ ...prev, [id]: next }));

    const openAddHotelModal = () => {
        setHotelFilters({ location: "", name: "", hotelCategory: "" });
        setDebouncedHotelFilters({ location: "", name: "", hotelCategory: "" });
        setHotelOptions([]);
        setHotelsLoading(false);
        lastHotelsKeyRef.current = null;
        
        // Initialize selection with already selected hotels
        const initial: Record<string, boolean> = {};
        tempSiteData.hotels?.forEach((h: any) => {
            const hid = getId(h);
            if (hid) initial[hid] = true;
        });
        setHotelSelection(initial);
        
        setHotelAddModalOpen(true);
    };

    const applyHotelSelection = () => {
        const selectedIds = Object.keys(hotelSelection).filter((id) => hotelSelection[id]);
        
        // Create a map of existing hotels to preserve their data
        const existingHotelsMap = new Map();
        tempSiteData.hotels?.forEach((h: any) => {
            const id = getId(h);
            if (id) existingHotelsMap.set(id, h);
        });
        
        // Create a map of newly fetched options
        const newOptionsMap = new Map();
        hotelOptions.forEach((h: any) => {
            const id = getId(h);
            if (id) newOptionsMap.set(id, h);
        });

        const newHotels = selectedIds.map(id => {
            // Prefer the new option if available (might have fresher data), otherwise fall back to existing
            const h = newOptionsMap.get(id) || existingHotelsMap.get(id);
            if (h) return h;
            // Fallback if we have an ID but no object (shouldn't happen if logic is correct)
            return { id, name: "Unknown Hotel" }; 
        });

        setTempSiteData({
            ...tempSiteData,
            hotels: newHotels
        });
        setHotelAddModalOpen(false);
    };

    const handleAreaChange = async (areaId: string) => {
        setSelectedAreaId(areaId);
        setSiteOptions([]);
        setSelectedSiteId("");
        
        if (!areaId) return;

        try {
            const res = await fetchWithToken("/api/site", { area: areaId, limit: "1000", status: true });
            const list = (res as any)?.data ?? res;
            const sites = Array.isArray(list) ? list : (list?.docs || list?.items || []);
            setSiteOptions(sites);
        } catch (error) {
            console.error("Error fetching sites", error);
            showSnackbar({ title: "Error", description: "Failed to fetch sites", color: "danger" });
        }
    };

    const handleSiteChange = (siteId: string) => {
        setSelectedSiteId(siteId);
        const site = siteOptions.find(s => getId(s) === siteId);
        if (site) {
             setTempSiteData({
                 ...tempSiteData,
                 title: site.title || "",
                 description: site.description || "",
                 featureImg: site.featureImg || "",
                 // If the site from API has hotels, we might want to map them?
                 // For now, let's keep existing behavior or assume sites don't bring hotels automatically
                 // unless requested.
             });
        }
    };

    const openAddSiteModal = () => {
        setEditingSiteIndex(null);
        setSelectedAreaId("");
        setSelectedSiteId("");
        setSiteOptions([]);
        setTempSiteData({
            title: "",
            description: "",
            days: 1,
            featureImg: "",
            hotels: []
        });
        setSiteModalOpen(true);
    };

    const openEditSiteModal = (index: number) => {
        setEditingSiteIndex(index);
        setTempSiteData({ 
            ...formData.clientSites[index],
            hotels: formData.clientSites[index].hotels || [] 
        });
        setSiteModalOpen(true);
    };

    const saveSiteModal = () => {
        if (!tempSiteData.title) {
            showSnackbar({ title: "Validation Error", description: "Title is required", color: "danger" });
            return;
        }

        setFormData((prev: any) => {
            const newSites = [...prev.clientSites];
            if (editingSiteIndex !== null) {
                newSites[editingSiteIndex] = tempSiteData;
            } else {
                newSites.push(tempSiteData);
            }
            return { ...prev, clientSites: newSites };
        });
        setSiteModalOpen(false);
    };

    const totalSiteDays = formData.clientSites?.reduce((acc: number, site: any) => acc + (Number(site.days) || 0), 0) || 0;

    const validateStep1 = (updateState = true) => {
        const newErrors: any = {};
        if (!formData.itinerary) newErrors.itinerary = "Itinerary is required";
        if (!formData.title) newErrors.title = "Title is required";
        if (!formData.clientName) newErrors.clientName = "Client Name is required";
        if (!formData.mobile) newErrors.mobile = "Mobile is required";
        if (!formData.tourDate) newErrors.tourDate = "Tour Date is required";
        if (!formData.noOfAdults) newErrors.noOfAdults = "No of Adults is required";
        if (!formData.noOfRooms) newErrors.noOfRooms = "No of Rooms is required";
        if (!formData.noOfPackageDays) newErrors.noOfPackageDays = "Days is required";
        if (!formData.noOfPackageNights) newErrors.noOfPackageNights = "Nights is required";
        if (!formData.hotelCategory) newErrors.hotelCategory = "Hotel Category is required";
        if (!formData.templateId) newErrors.templateId = "Mail Template is required";
        if (!formData.packageCost) newErrors.packageCost = "Package Cost is required";
        if (!formData.taxes) newErrors.taxes = "Taxes is required";
        if (!formData.food) newErrors.food = "Food option is required";
        if (formData.food === "yes" && selectedFoodList.items.length === 0) {
            newErrors.food = "Please select at least one food option";
        }
        if (!formData.transport) newErrors.transport = "Transport option is required";
        if (formData.transport === "yes" && selectedTransportList.items.length === 0) {
            newErrors.transport = "Please select at least one transport option";
        }
        if ((user as any)?.type !== "AGENT" && !formData.salesExecutive) {
            newErrors.salesExecutive = "Sales Executive is required";
        }
        
        const numKids = Number(formData.noOfKids) || 0;
        if (numKids > 0) {
            for (let i = 0; i < numKids; i++) {
                if (!formData.kidsAges[i]) {
                    newErrors[`kidAge_${i}`] = "Age is required";
                }
            }
        }

        if (updateState) setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep2 = (updateState = true) => {
        const newErrors: any = {};
        if (!formData.clientArea?.title) newErrors.areaTitle = "Title is required";
        
        if (updateState) setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep3 = () => {
        return formData.clientSites && formData.clientSites.length > 0;
    };

    const handleNext = () => {
        if (currentStep === 1) {
            if (!validateStep1(true)) {
                showSnackbar({ title: "Validation Error", description: "Please fill all required fields", color: "danger" });
                return;
            }
        }
        if (currentStep === 2) {
            if (!validateStep2(true)) {
                showSnackbar({ title: "Validation Error", description: "Please fill all required fields", color: "danger" });
                return;
            }
        }
        if (currentStep === 3) {
            if (!validateStep3()) {
                showSnackbar({ title: "Validation Error", description: "Please add at least one site", color: "danger" });
                return;
            }
        }
        if (currentStep < 4) setCurrentStep(prev => prev + 1);
    };

    const handleBack = () => {
        if (currentStep > 1) setCurrentStep(prev => prev - 1);
    };

    const handleSubmit = async () => {
        if (!id) return;
        setIsLoading(true);
        try {
            const payload = {
                ...formData,
                selectedFood: selectedFoodList.items.map(i => i.id),
                selectedTransport: selectedTransportList.items.map(i => i.id),
                itinerary: formData.itinerary?.id || formData.itinerary,
                hotelCategory: formData.hotelCategory?.id || formData.hotelCategory,
                salesExecutive: formData.salesExecutive?.id || formData.salesExecutive,
                templateId: formData.templateId?.id || formData.templateId,
            };

            const res = await clientItineraryService.updateById(id, payload);
            if (res?.error) throw new Error(res.error);

            showSnackbar({ title: "Success", description: "Client Itinerary updated successfully", color: "success" });
            navigate("/itinerary/clientitinerary");
        } catch (error: any) {
            showSnackbar({ title: "Error", description: error.message || "Failed to update client itinerary", color: "danger" });
        } finally {
            setIsLoading(false);
        }
    };

    if (isFetching) {
        return <DefaultLayout><div className="flex h-full items-center justify-center">Loading...</div></DefaultLayout>;
    }

    return (
        <DefaultLayout>
            <div className="flex flex-col gap-6 px-4 py-8 md:px-8">
                <div className="flex flex-wrap justify-between gap-3 rounded-xl border border-secondary bg-primary p-4">
                    <div className="flex flex-wrap gap-2">
                        {steps.map((step: string, index: number) => {
                            const active = index + 1 === currentStep;
                            const disabled = isStepDisabled(index);
                            return (
                                <button
                                    key={step}
                                    type="button"
                                    disabled={disabled}
                                    onClick={() => setCurrentStep(index + 1)}
                                    className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm ring-1 ring-secondary ${
                                        active ? "bg-secondary text-primary" : "text-tertiary hover:bg-primary_hover"
                                    } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                                >
                                    <span className="grid size-6 place-items-center rounded-full bg-primary ring-1 ring-secondary">{index + 1}</span>
                                    <span className={active ? "font-semibold" : ""}>{step}</span>
                                </button>
                            );
                        })}
                    </div>
                    <div className="flex items-center gap-2">
                        <Button size="sm" color="secondary" iconLeading={ArrowLeft} onClick={() => navigate("/itinerary/clientitinerary")}>
                            Back to list
                        </Button>
                    </div>
                </div>

                <div className="rounded-lg border border-secondary bg-primary p-6">
                    {currentStep === 1 && (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                             <Input label="Itinerary *" value={formData.itinerary?.title || ""} isDisabled />
                             <Input label="Title" isRequired value={formData.title} onChange={(val) => handleChange("title", val)} isInvalid={!!errors.title} hint={errors.title} />
                             <Input label="Client Name" isRequired value={formData.clientName} onChange={(val) => handleChange("clientName", val)} isInvalid={!!errors.clientName} hint={errors.clientName} />
                             <Input label="Email" value={formData.email} onChange={(val) => handleChange("email", val)} />
                             <Input label="Mobile" isRequired value={formData.mobile} onChange={(val) => handleChange("mobile", val)} isInvalid={!!errors.mobile} hint={errors.mobile} />
                             <div className="flex flex-col gap-1.5">
                                <Label isRequired>Tour Date</Label>
                                <DatePicker value={formData.tourDate ? parseDate(formData.tourDate) : null} onChange={(date) => handleChange("tourDate", date ? date.toString() : "")} />
                                {errors.tourDate && <p className="text-sm text-error-primary">{errors.tourDate}</p>}
                             </div>
                             <Input label="No of Adults" isRequired type="number" value={formData.noOfAdults} onChange={(val) => handleChange("noOfAdults", val)} isInvalid={!!errors.noOfAdults} hint={errors.noOfAdults} />
                             <Input label="No of Kids" type="number" value={formData.noOfKids} onChange={(val) => handleChange("noOfKids", val)} />
                             {Number(formData.noOfKids) > 0 && (
                                <div className="col-span-1 md:col-span-2 grid grid-cols-2 gap-4 md:grid-cols-4">
                                    {Array.from({ length: Number(formData.noOfKids) }).map((_, idx) => (
                                        <Input 
                                            key={idx} 
                                            label={`Kid ${idx + 1} Age`} 
                                            isRequired
                                            value={formData.kidsAges[idx] || ""} 
                                            onChange={(val) => handleAgeChange(idx, String(val))} 
                                            isInvalid={!!errors[`kidAge_${idx}`]}
                                            hint={errors[`kidAge_${idx}`]}
                                        />
                                    ))}
                                </div>
                             )}
                             <Input label="No of Rooms" isRequired type="number" value={formData.noOfRooms} onChange={(val) => handleChange("noOfRooms", val)} isInvalid={!!errors.noOfRooms} hint={errors.noOfRooms} />
                             
                             <ComboBox 
                                label="Hotel Category" 
                                isRequired
                                items={hotelCategories.map(cat => ({ id: cat.id || cat._id, label: cat.title }))} 
                                selectedKey={formData.hotelCategory?.id || formData.hotelCategory} 
                                onSelectionChange={(key) => { const cat = hotelCategories.find(c => (c.id || c._id) === key); handleChange("hotelCategory", cat ? { id: key, title: cat.title } : key); }}
                                isInvalid={!!errors.hotelCategory}
                                hint={errors.hotelCategory}
                             >
                                {(item) => <SelectItem id={item.id}>{item.label}</SelectItem>}
                             </ComboBox>

                             

                             {[...selectedTransportList.items].some(i => i.id === "pickup") && <Input label="Pickup Location" value={formData.pickUpLocation} onChange={(val) => handleChange("pickUpLocation", val)} />}
                             {[...selectedTransportList.items].some(i => i.id === "drop") && <Input label="Drop Location" value={formData.dropLocation} onChange={(val) => handleChange("dropLocation", val)} />}
                             
                             <Input label="Package Days" isRequired type="number" value={formData.noOfPackageDays} onChange={(val) => handleChange("noOfPackageDays", val)} isInvalid={!!errors.noOfPackageDays} hint={errors.noOfPackageDays} />
                             <Input label="Package Nights" isRequired type="number" value={formData.noOfPackageNights} onChange={(val) => handleChange("noOfPackageNights", val)} isInvalid={!!errors.noOfPackageNights} hint={errors.noOfPackageNights} />
                             <Input label="Package Cost" isRequired type="number" value={formData.packageCost} onChange={(val) => handleChange("packageCost", val)} isInvalid={!!errors.packageCost} hint={errors.packageCost} />
                             
                             <ComboBox 
                                label="Taxes" 
                                isRequired
                                items={TAX_OPTIONS}
                                selectedKey={formData.taxes} 
                                onSelectionChange={(key) => handleChange("taxes", key)}
                                isInvalid={!!errors.taxes}
                                hint={errors.taxes}
                             >
                                {(item) => <SelectItem id={item.id}>{item.label}</SelectItem>}
                             </ComboBox>
                             
                             {(user as any)?.type !== "AGENT" && (
                                <ComboBox 
                                    label="Sales Executive" 
                                    isRequired
                                    items={salesExecutives.map(s => ({ id: s.id || s._id, label: s.name }))} 
                                    selectedKey={formData.salesExecutive?.id || formData.salesExecutive} 
                                    onSelectionChange={(key) => { const s = salesExecutives.find(x => (x.id || x._id) === key); handleChange("salesExecutive", s ? { id: key, name: s.name } : key); }}
                                    isInvalid={!!errors.salesExecutive}
                                    hint={errors.salesExecutive}
                                >
                                    {(item) => <SelectItem id={item.id}>{item.label}</SelectItem>}
                                </ComboBox>
                             )}
                             <ComboBox 
                                label="Mail Template" 
                                isRequired
                                items={mailTemplates.map(t => ({ id: t.id || t._id, label: t.title }))} 
                                selectedKey={formData.templateId?.id || formData.templateId} 
                                onSelectionChange={(key) => { const temp = mailTemplates.find(t => (t.id || t._id) === key); handleChange("templateId", temp ? { id: key, name: temp.name } : key); }}
                                isInvalid={!!errors.templateId}
                                hint={errors.templateId}
                             >
                                {(item) => <SelectItem id={item.id}>{item.label}</SelectItem>}
                             </ComboBox>

                             <div className="col-span-1 md:col-span-2">
                                <Label isRequired>Food</Label>
                                <RadioGroup 
                                    value={formData.food} 
                                    onChange={(val) => handleChange("food", val)} 
                                    className="flex-row mt-2"
                                >
                                    <RadioButton value="yes" label="Yes" />
                                    <RadioButton value="no" label="No" />
                                </RadioGroup>
                                {errors.food && <p className="text-sm text-error-primary mt-1">{errors.food}</p>}
                                {formData.food === "yes" && (
                                    <div className="mt-3">
                                        <MultiSelect
                                            label="Select Food"
                                            isRequired
                                            items={FOOD_OPTIONS}
                                            selectedItems={selectedFoodList}
                                            placeholder="Select food options"
                                        >
                                            {(item) => <SelectItem id={item.id}>{item.label}</SelectItem>}
                                        </MultiSelect>
                                        {errors.food && selectedFoodList.items.length === 0 && <p className="text-sm text-error-primary mt-1">Please select at least one food option</p>}
                                    </div>
                                )}
                             </div>

                             <div className="col-span-1 md:col-span-2">
                                <Label isRequired>Transport</Label>
                                <RadioGroup 
                                    value={formData.transport} 
                                    onChange={(val) => handleChange("transport", val)} 
                                    className="flex-row mt-2"
                                >
                                    <RadioButton value="yes" label="Yes" />
                                    <RadioButton value="no" label="No" />
                                </RadioGroup>
                                {errors.transport && <p className="text-sm text-error-primary mt-1">{errors.transport}</p>}
                                {formData.transport === "yes" && (
                                    <div className="mt-3">
                                        <MultiSelect
                                            label="Select Transport"
                                            isRequired
                                            items={TRANSPORT_OPTIONS}
                                            selectedItems={selectedTransportList}
                                            placeholder="Select transport options"
                                        >
                                            {(item) => <SelectItem id={item.id}>{item.label}</SelectItem>}
                                        </MultiSelect>
                                        {errors.transport && selectedTransportList.items.length === 0 && <p className="text-sm text-error-primary mt-1">Please select at least one transport option</p>}
                                    </div>
                                )}
                             </div>
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div className="flex flex-col gap-6">
                            <h2 className="text-lg font-semibold">Client Area Details</h2>
                            <Input 
                                label="Title" 
                                isRequired
                                value={formData.clientArea?.title || ""} 
                                onChange={(val) => handleClientAreaChange("title", val)} 
                                placeholder="Enter Client Area Title" 
                                isInvalid={!!errors.areaTitle}
                                hint={errors.areaTitle}
                            />
                            <div className="space-y-1.5">
                                <Label>Header Content</Label>
                                <RichTextEditor value={formData.clientArea?.headerContent || ""} onChange={(val) => handleClientAreaChange("headerContent", val)} />
                            </div>
                            <div className="space-y-1.5">
                                <Label>Description</Label>
                                <RichTextEditor value={formData.clientArea?.description || ""} onChange={(val) => handleClientAreaChange("description", val)} />
                            </div>
                            
                            <div className="space-y-1.5">
                                <Label>Feature Image</Label>
                                {formData.clientArea?.featureImg ? (
                                    <div className="relative rounded-lg overflow-hidden border border-secondary bg-secondary">
                                        <img src={formData.clientArea.featureImg} alt="Feature" className="max-h-100 max-w-100 object-cover" />
                                        <div className="absolute top-2 right-2">
                                            <FileTrigger 
                                                acceptedFileTypes={['image/*']} 
                                                onSelect={(files) => handleClientAreaImageChange("featureImg", files)}
                                            >
                                                <Button size="sm" color="primary">Change</Button>
                                            </FileTrigger>
                                        </div>
                                    </div>
                                ) : (
                                    <FileUploadDropZone 
                                        accept="image/*" 
                                        allowsMultiple={false} 
                                        onDropFiles={(files) => handleClientAreaImageChange("featureImg", files)}
                                        hint="PNG, JPG, GIF up to 10MB"
                                    />
                                )}
                            </div>

                            <div className="space-y-1.5">
                                <Label>Hotel Image</Label>
                                {formData.clientArea?.hotelImg ? (
                                    <div className="relative rounded-lg overflow-hidden border border-secondary bg-secondary">
                                        <img src={formData.clientArea.hotelImg} alt="Hotel" className="max-h-100 max-w-100 object-cover" />
                                        <div className="absolute top-2 right-2">
                                            <FileTrigger 
                                                acceptedFileTypes={['image/*']} 
                                                onSelect={(files) => handleClientAreaImageChange("hotelImg", files)}
                                            >
                                                <Button size="sm" color="primary">Change</Button>
                                            </FileTrigger>
                                        </div>
                                    </div>
                                ) : (
                                    <FileUploadDropZone 
                                        accept="image/*" 
                                        allowsMultiple={false} 
                                        onDropFiles={(files) => handleClientAreaImageChange("hotelImg", files)}
                                        hint="PNG, JPG, GIF up to 10MB"
                                    />
                                )}
                            </div>
                        </div>
                    )}

                    {currentStep === 3 && (
                        <div className="flex flex-col gap-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold">Client Sites</h2>
                                <Button iconLeading={Plus} onClick={openAddSiteModal}>Add Site</Button>
                            </div>

                            <div className="flex flex-col rounded-xl border border-secondary bg-primary">
                                <div className="flex items-center justify-between gap-3 border-b border-secondary p-3">
                                    <h3 className="text-xs font-bold uppercase text-tertiary">Sites</h3>
                                    <div className="flex items-center gap-3">
                                        <Badge size="sm" color="success">{formData.clientSites.length}</Badge>
                                        <Badge size="sm" color="warning">No. of days : {totalSiteDays}</Badge>
                                    </div>
                                </div>

                                <div className="flex-1 overflow-auto p-2">
                                    {formData.clientSites.length > 0 ? (
                                        formData.clientSites.map((site: any, index: number) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-3 rounded-sm px-2 py-2 text-sm text-primary hover:bg-primary_hover"
                                            >
                                                <div className="flex flex-col overflow-hidden rounded-md bg-primary ring-1 ring-secondary">
                                                    <button
                                                        type="button"
                                                        className="grid size-7 place-items-center text-tertiary hover:bg-primary_hover hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
                                                        disabled={index === 0}
                                                        onClick={() => moveSite(index, -1)}
                                                    >
                                                        <ArrowUp className="size-4" />
                                                    </button>
                                                    <hr className="w-full border-secondary" />
                                                    <button
                                                        type="button"
                                                        className="grid size-7 place-items-center text-tertiary hover:bg-primary_hover hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
                                                        disabled={index === formData.clientSites.length - 1}
                                                        onClick={() => moveSite(index, 1)}
                                                    >
                                                        <ArrowDown className="size-4" />
                                                    </button>
                                                </div>

                                                <span className="flex-1 truncate font-medium">{site.title}</span>

                                                <div className="flex items-center rounded-md bg-primary ring-1 ring-secondary">
                                                    <button
                                                        type="button"
                                                        className="grid size-7 place-items-center text-tertiary hover:bg-primary_hover hover:text-primary"
                                                        onClick={() => updateSiteDays(index, (Number(site.days) || 1) - 1)}
                                                    >
                                                        <span className="text-base leading-none">-</span>
                                                    </button>
                                                    <p className="min-w-8 px-2 text-center text-sm font-semibold text-primary">{site.days || 1}</p>
                                                    <button
                                                        type="button"
                                                        className="grid size-7 place-items-center text-tertiary hover:bg-primary_hover hover:text-primary"
                                                        onClick={() => updateSiteDays(index, (Number(site.days) || 1) + 1)}
                                                    >
                                                        <span className="text-base leading-none">+</span>
                                                    </button>
                                                </div>

                                                <ButtonUtility icon={Edit01} color="secondary" onClick={() => openEditSiteModal(index)} />
                                                <ButtonUtility icon={Trash01} color="tertiary" onClick={() => deleteSite(index)} />
                                            </div>
                                        ))
                                    ) : (
                                        <p className="p-4 text-center text-tertiary">No sites added yet.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {currentStep === 4 && (
                        <div className="flex flex-col gap-6">
                            <h2 className="text-lg font-semibold">Preview</h2>
                            <PreviewMail previewData={formData} />
                        </div>
                    )}

                    <div className="flex justify-center gap-4 mt-8">
                        <Button color="secondary" onClick={handleBack} disabled={currentStep === 1}>Back</Button>
                        {currentStep < 4 ? (
                            <Button onClick={handleNext}>Next</Button>
                        ) : (
                            <Button onClick={handleSubmit} isLoading={isLoading}>Update</Button>
                        )}
                    </div>
                </div>
            </div>
            <ModalOverlay isOpen={siteModalOpen} onOpenChange={setSiteModalOpen} className={cx("p-0 sm:p-0 items-center justify-center", editingSiteIndex === null ? "bg-black/50 backdrop-blur-sm" : "")}>
                <Modal className={cx(
                    "w-full bg-primary",
                    editingSiteIndex !== null 
                        ? "h-full max-w-full max-h-full m-0 rounded-none" 
                        : "max-w-2xl rounded-xl shadow-xl m-4"
                )}>
                    <Dialog className="flex flex-col w-full h-full outline-hidden p-0">
                        <div className={cx(
                            "flex flex-col gap-6 bg-primary text-primary w-full",
                            editingSiteIndex !== null ? "h-full p-6" : "p-6 rounded-xl"
                        )}>
                            <div className="flex justify-between items-center border-b border-secondary pb-4 shrink-0">
                                <h3 className="text-xl font-semibold">{editingSiteIndex !== null ? "Edit Site" : "Add Sites to Client Itinerary"}</h3>
                                <CloseButton onPress={() => setSiteModalOpen(false)} />
                            </div>
                            
                            <div className="flex-1 overflow-y-auto">
                                {editingSiteIndex === null ? (
                                    <div className="flex flex-col gap-6 pb-6">
                                        <ComboBox
                                            label="Selected Area"
                                            isRequired
                                            items={areas.map(a => ({ id: getId(a), label: a.title }))}
                                            selectedKey={selectedAreaId}
                                            onSelectionChange={(key) => handleAreaChange(String(key))}
                                            placeholder="Select Area"
                                        >
                                            {(item) => <SelectItem id={item.id}>{item.label}</SelectItem>}
                                        </ComboBox>

                                        <ComboBox
                                            label="Selected Site"
                                            items={siteOptions.map(s => ({ id: getId(s), label: s.title }))}
                                            selectedKey={selectedSiteId}
                                            onSelectionChange={(key) => handleSiteChange(String(key))}
                                            placeholder="Select Site"
                                            isDisabled={!selectedAreaId}
                                        >
                                            {(item) => <SelectItem id={item.id}>{item.label}</SelectItem>}
                                        </ComboBox>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6">
                                        <div className="space-y-6">
                                            <Input label="Title" value={tempSiteData.title} onChange={(val) => setTempSiteData({...tempSiteData, title: val})} />
                                            
                                            <div className="grid grid-cols-2 gap-4">
                                                <Input label="Days" type="number" value={tempSiteData.days} onChange={(val) => setTempSiteData({...tempSiteData, days: Number(val)})} />
                                            </div>

                                            <div className="space-y-1.5">
                                                <Label>Description</Label>
                                                <RichTextEditor value={tempSiteData.description || ""} onChange={(val) => setTempSiteData({...tempSiteData, description: val})} />
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            <div className="space-y-1.5">
                                                <Label>Feature Image</Label>
                                                {tempSiteData.featureImg ? (
                                                    <div className="relative rounded-lg overflow-hidden border border-secondary aspect-video bg-secondary">
                                                        <img src={tempSiteData.featureImg} alt="Feature" className="w-full h-full object-cover" />
                                                        <div className="absolute top-2 right-2">
                                                            <FileTrigger 
                                                                acceptedFileTypes={['image/*']} 
                                                                onSelect={async (files) => {
                                                                    const url = await handleFileUpload(files);
                                                                    if (url) setTempSiteData({...tempSiteData, featureImg: url});
                                                                }}
                                                            >
                                                                <Button size="sm" color="primary">Change</Button>
                                                            </FileTrigger>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <FileUploadDropZone 
                                                        accept="image/*" 
                                                        allowsMultiple={false} 
                                                        onDropFiles={async (files) => {
                                                            const url = await handleFileUpload(files);
                                                            if (url) setTempSiteData({...tempSiteData, featureImg: url});
                                                        }}
                                                        hint="PNG, JPG, GIF up to 10MB"
                                                    />
                                                )}
                                            </div>

                                            <div className="space-y-3 pt-4 border-t border-secondary">
                                                <div className="flex items-center justify-between">
                                                    <Label>Hotels</Label>
                                                </div>
                                                
                                                <div className="flex flex-wrap gap-2 min-h-[40px] p-3 rounded-lg border border-secondary bg-secondary/10">
                                                    {tempSiteData.hotels?.map((hotel: any, idx: number) => (
                                                        <Badge key={idx} color="brand" className="flex items-center gap-1 pr-1">
                                                            {hotel.name}
                                                            <button 
                                                                type="button"
                                                                className="rounded-full p-0.5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                                                                onClick={() => {
                                                                    const newHotels = [...(tempSiteData.hotels || [])];
                                                                    newHotels.splice(idx, 1);
                                                                    setTempSiteData({...tempSiteData, hotels: newHotels});
                                                                }}
                                                            >
                                                                <X className="size-3" />
                                                            </button>
                                                        </Badge>
                                                    ))}
                                                    {(!tempSiteData.hotels || tempSiteData.hotels.length === 0) && (
                                                        <p className="text-sm text-tertiary self-center">No hotels selected.</p>
                                                    )}
                                                </div>

                                                <div className="pt-2">
                                                    <Button 
                                                        color="primary" 
                                                        size="sm" 
                                                        iconLeading={Plus} 
                                                        onClick={openAddHotelModal}
                                                        className="w-full sm:w-auto"
                                                    >
                                                        Add Hotels
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                        <div className="flex justify-end gap-3 pt-4 border-t border-secondary shrink-0">
                            <Button color="secondary" onClick={() => setSiteModalOpen(false)}>Cancel</Button>
                            <Button color="primary" onClick={saveSiteModal}>{editingSiteIndex !== null ? "Save Changes" : "Add Sites"}</Button>
                        </div>
                        </div>
                    </Dialog>
                </Modal>
            </ModalOverlay>

            <ModalOverlay
                isOpen={hotelAddModalOpen}
                isDismissable
                className="overflow-hidden items-center"
                onOpenChange={(open) => {
                    if (!open) {
                        setHotelAddModalOpen(false);
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
                                            Add Hotel to {tempSiteData.title || "Site"}
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
                                                ...hotelCategories.map((c) => ({ id: getId(c?.id || c?._id), label: c?.title || getId(c?.id || c?._id) })),
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
                                                        ? `Showing results of ${hotelFilters.location} Location`
                                                        : `Showing result of ${hotelFilters.name || "selected"} hotel`}
                                                </div>

                                                <div className="min-h-0 flex-1 overflow-auto rounded-lg ring-1 ring-secondary">
                                                    <div className="divide-y divide-secondary">
                                                        {hotelOptions.map((h) => {
                                                            const id = getId(h);
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
                                    
                                    <div className="mt-5 shrink-0">
                                        <Button className="w-full" onClick={applyHotelSelection}>
                                            Add Selected Hotels
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
