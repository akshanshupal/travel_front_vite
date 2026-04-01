import { DefaultLayout } from "@/layouts/DefaultLayout";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { TextArea } from "@/components/base/textarea/textarea";
import { Select } from "@/components/base/select/select";
import { SelectItem } from "@/components/base/select/select-item";
import { MultiSelect } from "@/components/base/select/multi-select";
import { DatePicker } from "@/components/application/date-picker/date-picker";
import { FileUploadDropZone } from "@/components/application/file-upload/file-upload-base";
import { Toggle } from "@/components/base/toggle/toggle";
import { RadioButton, RadioGroup } from "@/components/base/radio-buttons/radio-buttons";
import { Label } from "@/components/base/input/label";
import { useStoreSnackbar } from "@/store/snackbar";
import { getAssignmentById, updateAssignmentById } from "@/utils/services/assignmentService";
import { getHotelCategory } from "@/utils/services/hotelService";
import { getPaymentStore } from "@/utils/services/paymentStoreService";
import { getSalesEx } from "@/utils/services/salesService";
import { updatePaymentById } from "@/utils/services/paymentService";
import { fetchWithToken } from "@/utils/fetchApi";
import { ArrowLeft, Home04, Plus, Trash01 } from "@untitledui/icons";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useListData } from "react-stately";
import { parseDate } from "@internationalized/date";
import { formatDateInput } from "@/utils/formatters";
const formatTimeInput = (timeValue?: string) => {
    if (!timeValue || typeof timeValue !== "string") return "";
    const match = timeValue.match(/^(\d{2}):(\d{2})/);
    return match ? `${match[1]}:${match[2]}` : "";
};

const FOOD_OPTIONS = [
    { id: "Breakfast", label: "Breakfast" },
    { id: "Lunch", label: "Lunch" },
    { id: "Dinner", label: "Dinner" },
    { id: "Breakfast(Non-Veg)", label: "Breakfast(Non-Veg)" },
    { id: "Lunch(Non-Veg)", label: "Lunch(Non-Veg)" },
    { id: "Dinner(Non-Veg)", label: "Dinner(Non-Veg)" },
];

const getId = (value: any) => String(value?.id ?? value?._id ?? value ?? "").trim();

const asArray = (value: any) => {
    if (Array.isArray(value)) return value;
    return [];
};

const getUploadUrl = (response: any) => {
    const resolved = response?.data ?? response;
    if (typeof resolved === "string") return resolved;
    if (typeof resolved?.url === "string") return resolved.url;
    if (typeof resolved?.data === "string") return resolved.data;
    if (typeof resolved?.location === "string") return resolved.location;
    return "";
};

const normalizeBool = (value: any) => value === true || value === "Yes" || value === "true";

const SectionHeader = ({ title }: { title: string }) => {
    return (
        <div className="flex items-center gap-2 border-b border-secondary bg-secondary px-4 py-2 text-xs font-semibold uppercase tracking-wide text-tertiary">
            <span>{title}</span>
        </div>
    );
};

export default function AssignmentEditPage() {
    const navigate = useNavigate();
    const params = useParams();
    const id = getId(params.id);
    const { showSnackbar } = useStoreSnackbar();
    const showSnackbarRef = useRef(showSnackbar);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [loadError, setLoadError] = useState<string | null>(null);

    const [hotelCategories, setHotelCategories] = useState<any[]>([]);
    const [paymentStores, setPaymentStores] = useState<any[]>([]);
    const [salesExecutives, setSalesExecutives] = useState<any[]>([]);
    const [initialTokenPayment, setInitialTokenPayment] = useState<any>(null);

    const selectedFoodList = useListData<any>({
        initialItems: [],
        getKey: (item) => item.id,
    });
    const selectedFoodListRef = useRef(selectedFoodList);

    const [form, setForm] = useState<any>({
        title: "",
        packageId: "",
        leadCode: "",
        leadDate: "",
        bookingDate: "",
        tourDate: "",
        agentName: "",
        clientName: "",
        mobile: "",
        altContactNumber: "",
        email: "",
        homeLocation: "",
        travelLocation: "",
        packageCost: "",
        taxes: "",
        finalPackageCost: "",
        tokenAmount: "",
        paymentStore: "",
        paymentDate: "",
        tokenImg: "",
        tokenPayment: "",
        noOfPackageDays: "",
        noOfPackageNights: "",
        noOfAdult: "",
        noOfKids: "",
        kidsAges: [],
        noOfRooms: "",
        hotelCategory: "",
        carSeater: "",
        specialInclusion: "",
        food: "No",
        selectedFood: [],
        textForBookingTeam: "",
        siteSeeing: "",
        pickUpAddress: "",
        dateNotDecided: false,
        pickUpDate: "",
        pickUpTime: "",
        dropAddress: "",
        dropDate: "",
        dropTime: "",
        idProof: [{ name: "", number: "", file: "" }],
        stayInformation: [{ location: "", date: "", sightSeeing: "" }],
        callDone: false,
        agentCallRecordingChecked: false,
        whatsappSent: false,
        emailSent: false,
        remark: "",
        itineraryLink: "",
        waveLink: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [dirty, setDirty] = useState<Record<string, boolean>>({});

    const canSave = useMemo(() => Boolean(id) && !saving, [id, saving]);

    useEffect(() => {
        showSnackbarRef.current = showSnackbar;
    }, [showSnackbar]);

    useEffect(() => {
        selectedFoodListRef.current = selectedFoodList;
    }, [selectedFoodList]);

    useEffect(() => {
        const run = async () => {
            if (!id) {
                setLoadError("Invalid assignment id");
                setLoading(false);
                return;
            }
            setLoading(true);
            setLoadError(null);
            try {
                const response = await getAssignmentById(id, {
                    populate: "tokenPayment,agentName,hotelCategory",
                });
                if (response?.error) {
                    throw new Error(response.error);
                }
                const resolved = response?.data ?? response;
                const selectedFood = asArray(resolved?.selectedFood);
                setInitialTokenPayment(resolved?.tokenPayment || null);
                setForm({
                    title: resolved?.title || "",
                    packageId: resolved?.packageId || "",
                    leadCode: resolved?.leadCode || "",
                    leadDate: formatDateInput(resolved?.leadDate),
                    bookingDate: formatDateInput(resolved?.bookingDate),
                    tourDate: formatDateInput(resolved?.tourDate),
                    agentName: getId(resolved?.agentName) || resolved?.agentName || "",
                    clientName: resolved?.clientName || "",
                    mobile: resolved?.mobile || "",
                    altContactNumber: resolved?.altContactNumber || "",
                    email: resolved?.email || "",
                    homeLocation: resolved?.homeLocation || "",
                    travelLocation: resolved?.travelLocation || "",
                    packageCost: resolved?.packageCost ?? "",
                    taxes: resolved?.taxes ?? "",
                    finalPackageCost: resolved?.finalPackageCost ?? "",
                    tokenAmount: resolved?.tokenPayment?.amount ?? "",
                    paymentStore: resolved?.tokenPayment?.paymentStore ?? "",
                    paymentDate: formatDateInput(resolved?.tokenPayment?.paymentDate),
                    tokenImg: resolved?.tokenPayment?.paymentImg ?? "",
                    tokenPayment: getId(resolved?.tokenPayment),
                    noOfPackageDays: resolved?.noOfPackageDays ?? "",
                    noOfPackageNights: resolved?.noOfPackageNights ?? "",
                    noOfAdult: resolved?.noOfAdult ?? "",
                    noOfKids: resolved?.noOfKids ?? "",
                    kidsAges: asArray(resolved?.kidsAges),
                    noOfRooms: resolved?.noOfRooms ?? "",
                    hotelCategory: getId(resolved?.hotelCategory),
                    carSeater: resolved?.carSeater ?? "",
                    specialInclusion: resolved?.specialInclusion ?? "",
                    food: selectedFood.length > 0 ? "Yes" : "No",
                    selectedFood,
                    textForBookingTeam: resolved?.textForBookingTeam ?? "",
                    siteSeeing: resolved?.siteSeeing ?? "",
                    pickUpAddress: resolved?.pickUpAddress ?? "",
                    dateNotDecided: Boolean(resolved?.dateNotDecided),
                    pickUpDate: formatDateInput(resolved?.pickUpDate),
                    pickUpTime: formatTimeInput(resolved?.pickUpTime),
                    dropAddress: resolved?.dropAddress ?? "",
                    dropDate: formatDateInput(resolved?.dropDate),
                    dropTime: formatTimeInput(resolved?.dropTime),
                    idProof: asArray(resolved?.idProof).length
                        ? asArray(resolved?.idProof)
                        : [{ name: "", number: "", file: "" }],
                    stayInformation: asArray(resolved?.stayInformation).length
                        ? asArray(resolved?.stayInformation)
                        : [{ location: "", date: "", sightSeeing: "" }],
                    callDone: normalizeBool(resolved?.callDone),
                    agentCallRecordingChecked: normalizeBool(resolved?.agentCallRecordingChecked),
                    whatsappSent: normalizeBool(resolved?.whatsappSent),
                    emailSent: normalizeBool(resolved?.emailSent),
                    remark: resolved?.remark ?? "",
                    itineraryLink: resolved?.itineraryLink ?? "",
                    waveLink: resolved?.waveLink ?? "",
                });
                const selectedFoodItems = FOOD_OPTIONS.filter((item) => selectedFood.includes(item.id));
                const list = selectedFoodListRef.current;
                list.items.forEach((item) => list.remove(item.id));
                selectedFoodItems.forEach((item) => list.append(item));
            } catch (error: any) {
                setLoadError(error?.message || "Failed to load assignment");
                showSnackbarRef.current({
                    title: "Error",
                    description: error?.message || "Failed to load assignment",
                    color: "danger",
                });
            } finally {
                setLoading(false);
            }
        };
        run();
    }, [id]);

    useEffect(() => {
        const run = async () => {
            try {
                const [hotelRes, paymentRes, salesRes] = await Promise.all([
                    getHotelCategory({ limit: "all" }),
                    getPaymentStore(),
                    getSalesEx({ limit: "all" }),
                ]);
                const resolvedHotel = hotelRes?.data ?? hotelRes;
                const resolvedPayment = paymentRes?.data ?? paymentRes;
                const resolvedSales = salesRes?.data ?? salesRes;
                setHotelCategories(asArray(resolvedHotel));
                setPaymentStores(asArray(resolvedPayment));
                setSalesExecutives(asArray(resolvedSales));
            } catch {
                setHotelCategories([]);
                setPaymentStores([]);
                setSalesExecutives([]);
            }
        };
        run();
    }, []);

    const validate = () => {
        const next: Record<string, string> = {};
        if (!form.title) next.title = "Itinerary is required";
        if (!form.packageId) next.packageId = "Package ID is required";
        if (!form.leadCode) next.leadCode = "Lead Code is required";
        if (!form.leadDate) next.leadDate = "Lead Date is required";
        if (!form.bookingDate) next.bookingDate = "Booking Date is required";
        if (!form.tourDate) next.tourDate = form.dateNotDecided ? "Tentative Date is required" : "Travel Date is required";
        if (!form.clientName) next.clientName = "Customer Name is required";
        if (!form.agentName) next.agentName = "Agent Name is required";
        if (!form.mobile) next.mobile = "Mobile is required";
        if (!form.email) next.email = "Email is required";
        if (!form.homeLocation) next.homeLocation = "Home Location is required";
        if (!form.travelLocation) next.travelLocation = "Travel Location is required";
        if (!form.packageCost) next.packageCost = "Package Amount is required";
        if (!form.finalPackageCost) next.finalPackageCost = "Final Package Cost is required";
        if (!form.tokenAmount) next.tokenAmount = "Token Amount is required";
        if (!form.paymentStore) next.paymentStore = "Payment Mode is required";
        if (!form.noOfPackageDays) next.noOfPackageDays = "Package Days is required";
        if (!form.noOfPackageNights) next.noOfPackageNights = "Package Nights is required";
        if (!form.noOfAdult) next.noOfAdult = "Number of Adults is required";
        if (!form.noOfRooms) next.noOfRooms = "Number of Rooms is required";
        if (!form.hotelCategory) next.hotelCategory = "Hotel Category is required";
        if (!form.carSeater) next.carSeater = "Car Seater is required";
        if (!form.textForBookingTeam) next.textForBookingTeam = "Text for Booking Team is required";
        if (!form.pickUpAddress) next.pickUpAddress = "Pickup Address is required";
        if (!form.dateNotDecided) {
            if (!form.pickUpDate) next.pickUpDate = "Pickup Date is required";
            if (!form.pickUpTime) next.pickUpTime = "Pickup Time is required";
        }
        if (!form.dropAddress) next.dropAddress = "Drop Address is required";
        if (!form.dateNotDecided) {
            if (!form.dropDate) next.dropDate = "Drop Date is required";
            if (!form.dropTime) next.dropTime = "Drop Time is required";
        }
        setErrors(next);
        return Object.keys(next).length === 0;
    };

    const updateField = (key: string, value: any) => {
        setForm((prev: any) => {
            const next = { ...prev, [key]: value };
            if (key === "packageCost" || key === "taxes") {
                const cost = Number(key === "packageCost" ? value : next.packageCost);
                const taxes = Number(key === "taxes" ? value : next.taxes);
                if (!Number.isNaN(cost) && !Number.isNaN(taxes)) {
                    next.finalPackageCost = (cost + (cost * taxes) / 100).toFixed(2);
                }
            }
            if (key === "noOfKids") {
                const count = Number(value) || 0;
                next.kidsAges = Array.from({ length: count }, (_, i) => next.kidsAges?.[i] ?? "");
            }
            if (key === "food") {
                next.selectedFood = [];
                selectedFoodList.items.forEach((item) => selectedFoodList.remove(item.id));
            }
            if (key === "dateNotDecided" && value) {
                next.pickUpDate = "";
                next.pickUpTime = "";
                next.dropDate = "";
                next.dropTime = "";
            }
            return next;
        });
        setDirty((prev) => ({ ...prev, [key]: true }));
        setErrors((prev) => ({ ...prev, [key]: "" }));
    };

    const updateNestedField = (key: string, value: any, index: number, group: "idProof" | "stayInformation") => {
        setForm((prev: any) => {
            const next = { ...prev };
            next[group] = prev[group].map((item: any, i: number) => (i === index ? { ...item, [key]: value } : item));
            return next;
        });
    };

    const handleKidsAgeChange = (index: number, value: string) => {
        const cleaned = value.replace(/[^0-9.]/g, "");
        setForm((prev: any) => {
            const kidsAges = [...(prev.kidsAges || [])];
            kidsAges[index] = cleaned;
            return { ...prev, kidsAges };
        });
    };

    const handleSave = async () => {
        setDirty({
            title: true,
            packageId: true,
            leadCode: true,
            leadDate: true,
            bookingDate: true,
            tourDate: true,
            clientName: true,
            agentName: true,
            mobile: true,
            email: true,
            homeLocation: true,
            travelLocation: true,
            packageCost: true,
            finalPackageCost: true,
            tokenAmount: true,
            paymentStore: true,
            noOfPackageDays: true,
            noOfPackageNights: true,
            noOfAdult: true,
            noOfRooms: true,
            hotelCategory: true,
            carSeater: true,
            textForBookingTeam: true,
            pickUpAddress: true,
            pickUpDate: true,
            pickUpTime: true,
            dropAddress: true,
            dropDate: true,
            dropTime: true,
        });
        if (!validate()) return;
        if (saving) return;
        setSaving(true);
        try {
            const idProof = await Promise.all(
                (form.idProof || []).map(async (item: any) => {
                    if (item?.file && item.file instanceof File) {
                        const fd = new FormData();
                        fd.append("fmFile", item.file, item.file.name);
                        const uploaded = await fetchWithToken("/api/file/upload", fd as any, { method: "POST" });
                        const url = getUploadUrl(uploaded);
                        return { ...item, file: url };
                    }
                    return item;
                }),
            );

            let tokenImgUrl = form.tokenImg;
            if (form.tokenImg && form.tokenImg instanceof File) {
                const fd = new FormData();
                fd.append("fmFile", form.tokenImg, form.tokenImg.name);
                const uploaded = await fetchWithToken("/api/file/upload", fd as any, { method: "POST" });
                tokenImgUrl = getUploadUrl(uploaded);
            }

            if (form.tokenPayment) {
                const paymentChanged =
                    initialTokenPayment?.amount != form.tokenAmount ||
                    initialTokenPayment?.paymentStore != form.paymentStore ||
                    formatDateInput(initialTokenPayment?.paymentDate) != form.paymentDate ||
                    (tokenImgUrl && initialTokenPayment?.paymentImg != tokenImgUrl);
                if (paymentChanged) {
                    await updatePaymentById(form.tokenPayment, {
                        amount: form.tokenAmount,
                        paymentStore: form.paymentStore,
                        paymentDate: form.paymentDate,
                        paymentTo: "paymentToCompany",
                        paymentType: "Cr",
                        paymentImg: tokenImgUrl,
                        status: true,
                    });
                }
            }

            const payload = {
                ...form,
                idProof,
                tokenImg: tokenImgUrl,
                pickUpDate: form.dateNotDecided ? "" : form.pickUpDate,
                pickUpTime: form.dateNotDecided ? "" : form.pickUpTime,
                dropDate: form.dateNotDecided ? "" : form.dropDate,
                dropTime: form.dateNotDecided ? "" : form.dropTime,
            };
            delete payload.tokenAmount;
            delete payload.paymentStore;
            delete payload.paymentDate;
            delete payload.paymentImg;

            const response = await updateAssignmentById(id, payload);
            if (response?.error) {
                throw new Error(response.error);
            }
            showSnackbar({
                title: "Success",
                description: "Assignment updated successfully",
                color: "success",
            });
            navigate("/bookings/assignment");
        } catch (error: any) {
            showSnackbar({
                title: "Error",
                description: error?.message || "Failed to update assignment",
                color: "danger",
            });
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
                <button type="button" onClick={() => navigate("/bookings/assignment")} className="rounded-sm px-1 py-0.5 text-primary hover:bg-primary_hover">
                    Assignment
                </button>
                <span>/</span>
                <span className="px-1 py-0.5 text-primary">Edit</span>
            </div>
        </div>
    );

    return (
        <DefaultLayout>
            {breadcrumbs}
            <div className="space-y-4">
                <div className="rounded-xl border border-secondary bg-primary p-4">
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                        <div className="space-y-1">
                            <h2 className="text-lg font-semibold text-primary">Edit Assignment</h2>
                            <div className="flex flex-wrap items-center gap-2 text-xs text-tertiary">
                                {form.packageId && (
                                    <span className="rounded-full border border-secondary bg-secondary px-2 py-0.5 text-xs font-medium text-primary">
                                        {form.packageId}
                                    </span>
                                )}
                                {form.leadCode && (
                                    <span className="rounded-full border border-secondary bg-secondary px-2 py-0.5 text-xs font-medium text-primary">
                                        Lead {form.leadCode}
                                    </span>
                                )}
                                {form.clientName && (
                                    <span className="rounded-full border border-secondary bg-secondary px-2 py-0.5 text-xs font-medium text-primary">
                                        {form.clientName}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:justify-end md:w-auto">
                            <Button color="secondary" iconLeading={ArrowLeft} onClick={() => navigate("/bookings/assignment")} className="w-full sm:w-auto">
                                Back
                            </Button>
                            <Button color="primary" isDisabled={!canSave} isLoading={saving} onClick={handleSave} className="w-full sm:w-auto">
                                Save
                            </Button>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
                        <div className="space-y-4 xl:col-span-2">
                            {[1, 2, 3].map((section) => (
                                <div key={section} className="rounded-xl border border-secondary bg-primary p-6">
                                    <div className="mb-4 h-4 w-40 animate-pulse rounded bg-secondary" />
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
                                        {[1, 2, 3, 4, 5, 6].map((i) => (
                                            <div key={i} className="h-12 animate-pulse rounded bg-secondary" />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="space-y-4">
                            {[1, 2].map((section) => (
                                <div key={section} className="rounded-xl border border-secondary bg-primary p-6">
                                    <div className="mb-4 h-4 w-32 animate-pulse rounded bg-secondary" />
                                    <div className="grid grid-cols-1 gap-4">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="h-12 animate-pulse rounded bg-secondary" />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : loadError ? (
                    <div className="rounded-xl border border-error-solid bg-error-bg p-6 text-error-text">
                        <p className="text-sm font-semibold">Error loading assignment</p>
                        <p className="text-sm">{loadError}</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
                        <div className="space-y-4 xl:col-span-2">
                            <div className="rounded-xl border border-secondary bg-primary">
                                <SectionHeader title="Booking Details" />
                                <div className="grid grid-cols-1 gap-3 px-4 py-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                    <Input label="Itinerary" isRequired value={form.title} onChange={(value) => updateField("title", value)} isInvalid={dirty.title && !!errors.title} hint={dirty.title ? errors.title : ""} />
                                    <Input label="Package ID" isRequired value={form.packageId} onChange={(value) => updateField("packageId", value)} isInvalid={dirty.packageId && !!errors.packageId} hint={dirty.packageId ? errors.packageId : ""} />
                                    <Input label="Lead Code" isRequired value={form.leadCode} onChange={(value) => updateField("leadCode", value)} isInvalid={dirty.leadCode && !!errors.leadCode} hint={dirty.leadCode ? errors.leadCode : ""} />
                                    <div className="flex flex-col gap-1.5">
                                        <Label isRequired>Lead Date</Label>
                                        <DatePicker value={form.leadDate ? parseDate(form.leadDate) : null} onChange={(date) => updateField("leadDate", date ? date.toString() : "")} />
                                        {dirty.leadDate && errors.leadDate && <p className="text-sm text-error-primary">{errors.leadDate}</p>}
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <Label isRequired>Booking Date</Label>
                                        <DatePicker value={form.bookingDate ? parseDate(form.bookingDate) : null} onChange={(date) => updateField("bookingDate", date ? date.toString() : "")} />
                                        {dirty.bookingDate && errors.bookingDate && <p className="text-sm text-error-primary">{errors.bookingDate}</p>}
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <div className="flex items-center justify-between gap-2">
                                            <Label isRequired>{form.dateNotDecided ? "Tentative Date" : "Travel Date"}</Label>
                                            <Toggle label="Not Decided" isSelected={form.dateNotDecided} onChange={(value) => updateField("dateNotDecided", value)} />
                                        </div>
                                        <DatePicker value={form.tourDate ? parseDate(form.tourDate) : null} onChange={(date) => updateField("tourDate", date ? date.toString() : "")} />
                                        {dirty.tourDate && errors.tourDate && <p className="text-sm text-error-primary">{errors.tourDate}</p>}
                                    </div>
                                    <Select
                                        label="Agent Name"
                                        isRequired
                                        selectedKey={form.agentName}
                                        onSelectionChange={(key) => updateField("agentName", String(key))}
                                        items={salesExecutives.map((item: any) => ({
                                            id: getId(item),
                                            label: item?.username || item?.name || item?.email || item?.mobile || "Agent",
                                        }))}
                                    >
                                        {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                    </Select>
                                </div>
                            </div>

                            <div className="rounded-xl border border-secondary bg-primary">
                                <SectionHeader title="Customer Details" />
                                <div className="grid grid-cols-1 gap-3 px-4 py-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                    <Input label="Customer Name" isRequired value={form.clientName} onChange={(value) => updateField("clientName", value)} isInvalid={dirty.clientName && !!errors.clientName} hint={dirty.clientName ? errors.clientName : ""} />
                                    <Input label="Mobile" isRequired value={form.mobile} onChange={(value) => updateField("mobile", value)} isInvalid={dirty.mobile && !!errors.mobile} hint={dirty.mobile ? errors.mobile : ""} />
                                    <Input label="Alt Contact Number" value={form.altContactNumber} onChange={(value) => updateField("altContactNumber", value)} />
                                    <Input label="Email" isRequired value={form.email} onChange={(value) => updateField("email", value)} isInvalid={dirty.email && !!errors.email} hint={dirty.email ? errors.email : ""} />
                                    <Input label="Home Location" isRequired value={form.homeLocation} onChange={(value) => updateField("homeLocation", value)} isInvalid={dirty.homeLocation && !!errors.homeLocation} hint={dirty.homeLocation ? errors.homeLocation : ""} />
                                    <Input label="Travel Location" isRequired value={form.travelLocation} onChange={(value) => updateField("travelLocation", value)} isInvalid={dirty.travelLocation && !!errors.travelLocation} hint={dirty.travelLocation ? errors.travelLocation : ""} />
                                </div>
                            </div>

                            <div className="rounded-xl border border-secondary bg-primary">
                                <SectionHeader title="Package Details" />
                                <div className="grid grid-cols-1 gap-3 px-4 py-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                    <Input label="Package Amount" isRequired type="number" value={form.packageCost} onChange={(value) => updateField("packageCost", value)} isInvalid={dirty.packageCost && !!errors.packageCost} hint={dirty.packageCost ? errors.packageCost : ""} />
                                    <Input label="Taxes (%)" type="number" value={form.taxes} onChange={(value) => updateField("taxes", value)} />
                                    <Input label="Final Package Cost" isRequired value={form.finalPackageCost} onChange={(value) => updateField("finalPackageCost", value)} isInvalid={dirty.finalPackageCost && !!errors.finalPackageCost} hint={dirty.finalPackageCost ? errors.finalPackageCost : ""} />
                                    <Input label="Package Days" isRequired type="number" value={form.noOfPackageDays} onChange={(value) => updateField("noOfPackageDays", value)} isInvalid={dirty.noOfPackageDays && !!errors.noOfPackageDays} hint={dirty.noOfPackageDays ? errors.noOfPackageDays : ""} />
                                    <Input label="Package Nights" isRequired type="number" value={form.noOfPackageNights} onChange={(value) => updateField("noOfPackageNights", value)} isInvalid={dirty.noOfPackageNights && !!errors.noOfPackageNights} hint={dirty.noOfPackageNights ? errors.noOfPackageNights : ""} />
                                    <Input label="Rooms" isRequired type="number" value={form.noOfRooms} onChange={(value) => updateField("noOfRooms", value)} isInvalid={dirty.noOfRooms && !!errors.noOfRooms} hint={dirty.noOfRooms ? errors.noOfRooms : ""} />
                                    <Select
                                        label="Hotel Category"
                                        isRequired
                                        selectedKey={form.hotelCategory}
                                        onSelectionChange={(key) => updateField("hotelCategory", String(key))}
                                        items={hotelCategories.map((item: any) => ({
                                            id: getId(item),
                                            label: item?.title || item?.name || "Category",
                                        }))}
                                    >
                                        {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                    </Select>
                                    <Input label="Car Seater" isRequired value={form.carSeater} onChange={(value) => updateField("carSeater", value)} isInvalid={dirty.carSeater && !!errors.carSeater} hint={dirty.carSeater ? errors.carSeater : ""} />
                                    <Input label="Adults" isRequired type="number" value={form.noOfAdult} onChange={(value) => updateField("noOfAdult", value)} isInvalid={dirty.noOfAdult && !!errors.noOfAdult} hint={dirty.noOfAdult ? errors.noOfAdult : ""} />

                                    <Input label="Kids" type="number" value={form.noOfKids} onChange={(value) => updateField("noOfKids", value)} />
                                </div>


                                {form.noOfKids > 0 && (
                                    <div className="px-4 pb-4">
                                        <div className="text-xs font-semibold uppercase tracking-wide text-tertiary">Kids Ages</div>
                                        <div className="mt-2 grid grid-cols-1 gap-3 md:grid-cols-3 lg:grid-cols-4">
                                            {form.kidsAges?.map((age: string, index: number) => (
                                                <Input key={index} label={`Kid ${index + 1}`} value={age} onChange={(value) => handleKidsAgeChange(index, value)} />
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="px-4 pb-4">
                                    <Label isRequired>Food</Label>
                                    <RadioGroup value={form.food} onChange={(value) => updateField("food", value)} className="mt-2 flex-row">
                                        <RadioButton value="Yes" label="Yes" />
                                        <RadioButton value="No" label="No" />
                                    </RadioGroup>
                                    {form.food === "Yes" && (
                                        <div className="mt-3">
                                            <MultiSelect
                                                label="Select Food"
                                                isRequired
                                                items={FOOD_OPTIONS}
                                                selectedItems={selectedFoodList}
                                                placeholder="Select food options"
                                                onItemInserted={(key) => {
                                                    const updated = Array.from(new Set([...(form.selectedFood || []), String(key)]));
                                                    setForm((prev: any) => ({ ...prev, selectedFood: updated }));
                                                }}
                                                onItemCleared={(key) => {
                                                    const updated = (form.selectedFood || []).filter((item: string) => item !== String(key));
                                                    setForm((prev: any) => ({ ...prev, selectedFood: updated }));
                                                }}
                                            >
                                                {(item) => <SelectItem id={item.id}>{item.label}</SelectItem>}
                                            </MultiSelect>
                                        </div>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 gap-3 px-4 pb-4 md:grid-cols-2">
                                    <TextArea label="Special Inclusion" value={form.specialInclusion} onChange={(value) => updateField("specialInclusion", value)} rows={3} />
                                    {form.siteSeeing && <TextArea label="Sight Seeing" value={form.siteSeeing} onChange={(value) => updateField("siteSeeing", value)} rows={3} />}
                                    <TextArea label="Text for Booking Team" isRequired value={form.textForBookingTeam} onChange={(value) => updateField("textForBookingTeam", value)} rows={3} isInvalid={dirty.textForBookingTeam && !!errors.textForBookingTeam} hint={dirty.textForBookingTeam ? errors.textForBookingTeam : ""} />
                                </div>
                            </div>

                            <div className="rounded-xl border border-secondary bg-primary">
                                <SectionHeader title="Payment Details" />
                                <div className="grid grid-cols-1 gap-3 px-4 py-4 md:grid-cols-2 lg:grid-cols-3">
                                    <Input label="Token Amount" isRequired type="number" value={form.tokenAmount} onChange={(value) => updateField("tokenAmount", value)} isInvalid={dirty.tokenAmount && !!errors.tokenAmount} hint={dirty.tokenAmount ? errors.tokenAmount : ""} />
                                    <Select
                                        label="Payment Mode"
                                        isRequired
                                        selectedKey={form.paymentStore}
                                        onSelectionChange={(key) => updateField("paymentStore", String(key))}
                                        items={paymentStores.map((item: any) => ({
                                            id: getId(item),
                                            label: item?.title || item?.name || "Payment Store",
                                        }))}
                                    >
                                        {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                    </Select>
                                    <div className="flex flex-col gap-1.5">
                                        <Label>Payment Date</Label>
                                        <DatePicker value={form.paymentDate ? parseDate(form.paymentDate) : null} onChange={(date) => updateField("paymentDate", date ? date.toString() : "")} />
                                    </div>
                                </div>
                                <div className="px-4 pb-4">
                                    <div className="text-xs font-semibold uppercase tracking-wide text-tertiary">Token Payment File</div>
                                    <div className="mt-2">
                                        {form.tokenImg && typeof form.tokenImg === "string" ? (
                                            <div className="flex items-center gap-3">
                                                <Button color="secondary" size="sm" href={form.tokenImg} target="_blank" rel="noreferrer">
                                                    View File
                                                </Button>
                                                <Button
                                                    color="secondary"
                                                    size="sm"
                                                    onClick={() => {
                                                        updateField("tokenImg", "");
                                                    }}
                                                >
                                                    Remove
                                                </Button>
                                            </div>
                                        ) : (
                                            <FileUploadDropZone
                                                allowsMultiple={false}
                                                onDropFiles={(files) => {
                                                    const file = files.item(0);
                                                    if (file) {
                                                        updateField("tokenImg", file);
                                                    }
                                                }}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-xl border border-secondary bg-primary">
                                <SectionHeader title="Pickup & Drop Details" />
                                <div className="grid grid-cols-1 gap-3 px-4 py-4 md:grid-cols-2 lg:grid-cols-3">
                                    <Input label="Pickup Address" isRequired value={form.pickUpAddress} onChange={(value) => updateField("pickUpAddress", value)} isInvalid={dirty.pickUpAddress && !!errors.pickUpAddress} hint={dirty.pickUpAddress ? errors.pickUpAddress : ""} />
                                    <Input label="Drop Address" isRequired value={form.dropAddress} onChange={(value) => updateField("dropAddress", value)} isInvalid={dirty.dropAddress && !!errors.dropAddress} hint={dirty.dropAddress ? errors.dropAddress : ""} />
                                    {!form.dateNotDecided ? (
                                        <>
                                            <div className="flex flex-col gap-1.5">
                                                <Label isRequired>Pickup Date</Label>
                                                <DatePicker value={form.pickUpDate ? parseDate(form.pickUpDate) : null} onChange={(date) => updateField("pickUpDate", date ? date.toString() : "")} />
                                                {dirty.pickUpDate && errors.pickUpDate && <p className="text-sm text-error-primary">{errors.pickUpDate}</p>}
                                            </div>
                                            <Input label="Pickup Time" isRequired type="time" value={form.pickUpTime} onChange={(value) => updateField("pickUpTime", value)} isInvalid={dirty.pickUpTime && !!errors.pickUpTime} hint={dirty.pickUpTime ? errors.pickUpTime : ""} />
                                            <div className="flex flex-col gap-1.5">
                                                <Label isRequired>Drop Date</Label>
                                                <DatePicker value={form.dropDate ? parseDate(form.dropDate) : null} onChange={(date) => updateField("dropDate", date ? date.toString() : "")} />
                                                {dirty.dropDate && errors.dropDate && <p className="text-sm text-error-primary">{errors.dropDate}</p>}
                                            </div>
                                            <Input label="Drop Time" isRequired type="time" value={form.dropTime} onChange={(value) => updateField("dropTime", value)} isInvalid={dirty.dropTime && !!errors.dropTime} hint={dirty.dropTime ? errors.dropTime : ""} />
                                        </>
                                    ) : null}
                                </div>
                            </div>

                            <div className="rounded-xl border border-secondary bg-primary">
                                <SectionHeader title="Stay Information" />
                                <div className="flex items-center justify-between px-4 pt-4">
                                    <div className="text-xs font-semibold uppercase tracking-wide text-tertiary">Stay Entries</div>
                                    <Button
                                        color="secondary"
                                        size="sm"
                                        iconLeading={Plus}
                                        onClick={() => setForm((prev: any) => ({ ...prev, stayInformation: [...prev.stayInformation, { location: "", date: "", sightSeeing: "" }] }))}
                                    >
                                        Add
                                    </Button>
                                </div>
                                <div className="space-y-3 px-4 pb-4 pt-3">
                                    {form.stayInformation?.map((item: any, index: number) => (
                                        <div key={index} className="rounded-lg border border-secondary bg-secondary p-3">
                                            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                                                <Input label="Location" value={item.location} onChange={(value) => updateNestedField("location", value, index, "stayInformation")} />
                                                <div className="flex flex-col gap-1.5">
                                                    <Label>Stay Date</Label>
                                                    <DatePicker value={item.date ? parseDate(item.date) : null} onChange={(date) => updateNestedField("date", date ? date.toString() : "", index, "stayInformation")} />
                                                </div>
                                                <Input label="Sight Seeing" value={item.sightSeeing} onChange={(value) => updateNestedField("sightSeeing", value, index, "stayInformation")} />
                                            </div>
                                            {form.stayInformation.length > 1 && (
                                                <div className="mt-3 flex justify-end">
                                                    <Button
                                                        color="secondary-destructive"
                                                        size="sm"
                                                        iconLeading={Trash01}
                                                        onClick={() => setForm((prev: any) => ({ ...prev, stayInformation: prev.stayInformation.filter((_: any, i: number) => i !== index) }))}
                                                    >
                                                        Remove
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="rounded-xl border border-secondary bg-primary">
                                <SectionHeader title="ID Proof" />
                                <div className="flex items-center justify-between px-4 pt-4">
                                    <div className="text-xs font-semibold uppercase tracking-wide text-tertiary">ID Entries</div>
                                    <Button
                                        color="secondary"
                                        size="sm"
                                        iconLeading={Plus}
                                        onClick={() => setForm((prev: any) => ({ ...prev, idProof: [...prev.idProof, { name: "", number: "", file: "" }] }))}
                                    >
                                        Add
                                    </Button>
                                </div>
                                <div className="space-y-3 px-4 pb-4 pt-3">
                                    {form.idProof?.map((item: any, index: number) => (
                                        <div key={index} className="rounded-lg border border-secondary bg-secondary p-3">
                                            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                                                <Input label="ID Type" value={item.name} onChange={(value) => updateNestedField("name", value, index, "idProof")} />
                                                <Input label="ID Number" value={item.number} onChange={(value) => updateNestedField("number", value, index, "idProof")} />
                                                {item.file && typeof item.file === "string" ? (
                                                    <div className="flex items-center gap-3">
                                                        <Button color="secondary" size="sm" href={item.file} target="_blank" rel="noreferrer">
                                                            View File
                                                        </Button>
                                                        <Button color="secondary" size="sm" onClick={() => updateNestedField("file", "", index, "idProof")}>
                                                            Remove
                                                        </Button>
                                                    </div>
                                                ) : (
                                                    <FileUploadDropZone
                                                        allowsMultiple={false}
                                                        onDropFiles={(files) => {
                                                            const file = files.item(0);
                                                            if (file) {
                                                                updateNestedField("file", file, index, "idProof");
                                                            }
                                                        }}
                                                    />
                                                )}
                                            </div>
                                            {form.idProof.length > 1 && (
                                                <div className="mt-3 flex justify-end">
                                                    <Button
                                                        color="secondary-destructive"
                                                        size="sm"
                                                        iconLeading={Trash01}
                                                        onClick={() => setForm((prev: any) => ({ ...prev, idProof: prev.idProof.filter((_: any, i: number) => i !== index) }))}
                                                    >
                                                        Remove
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="rounded-xl border border-secondary bg-primary">
                                <SectionHeader title="Links" />
                                <div className="grid grid-cols-1 gap-3 px-4 py-4">
                                    <Input label="Itinerary Link" value={form.itineraryLink} onChange={(value) => updateField("itineraryLink", value)} />
                                    <Input label="Wave Link" value={form.waveLink} onChange={(value) => updateField("waveLink", value)} />
                                </div>
                            </div>

                            <div className="rounded-xl border border-secondary bg-primary">
                                <SectionHeader title="Verification Details" />
                                <div className="grid grid-cols-1 gap-3 px-4 py-4 md:grid-cols-2 xl:grid-cols-1">
                                    <Toggle label="Call Done" isSelected={form.callDone} onChange={(value) => updateField("callDone", value)} />
                                    <Toggle label="WhatsApp Sent" isSelected={form.whatsappSent} onChange={(value) => updateField("whatsappSent", value)} />
                                    <Toggle label="Email Sent" isSelected={form.emailSent} onChange={(value) => updateField("emailSent", value)} />
                                    <Toggle label="Agent Recording Checked" isSelected={form.agentCallRecordingChecked} onChange={(value) => updateField("agentCallRecordingChecked", value)} />
                                </div>
                                <div className="px-4 pb-4">
                                    <TextArea label="Remark" value={form.remark} onChange={(value) => updateField("remark", value)} rows={3} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                         <div className="flex flex-col-reverse justify-end gap-2 sm:flex-row">
                            <Button color="secondary" iconLeading={ArrowLeft} onClick={() => navigate("/bookings/assignment")} className="w-full sm:w-auto">
                                Back
                            </Button>
                            <Button color="primary" isDisabled={!canSave} isLoading={saving} onClick={handleSave} className="w-full sm:w-auto">
                                Save
                            </Button>
                        </div>
            </div>
        </DefaultLayout>
    );
}
