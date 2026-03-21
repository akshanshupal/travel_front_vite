import { DefaultLayout } from "@/layouts/DefaultLayout";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { useStoreLogin } from "@/store/login";
import { useStoreSnackbar } from "@/store/snackbar";
import { clientItineraryService } from "@/utils/services/clientItineraryService";
import { getSalesEx } from "@/utils/services/salesService";
import { getHotelCategory } from "@/utils/services/hotelService";
import { getMailTemplate } from "@/utils/services/mailtemplateService";
import { itineraryService } from "@/utils/services/itineraryService";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { ComboBox } from "@/components/base/select/combobox";
import { SelectItem } from "@/components/base/select/select-item";
import { DatePicker } from "@/components/application/date-picker/date-picker";
import { parseDate } from "@internationalized/date";
import { Label } from "@/components/base/input/label";
import PreviewMail from "@/components/PreviewMail";
import { ArrowLeft } from "@untitledui/icons";
import { RadioButton, RadioGroup } from "@/components/base/radio-buttons/radio-buttons";
import { MultiSelect } from "@/components/base/select/multi-select";
import { useListData } from "react-stately";

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

export default function ClientItineraryAddPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { user } = useStoreLogin();
    const { showSnackbar } = useStoreSnackbar();

    const [isLoading, setIsLoading] = useState(false);
    const itineraryId = searchParams.get("itinerary");
    const steps = useMemo(() => ["Client Details", "Preview"], []);

    const selectedFoodList = useListData<any>({
        initialItems: [],
        getKey: (item) => item.id,
    });

    const selectedTransportList = useListData<any>({
        initialItems: [],
        getKey: (item) => item.id,
    });

    const isStepDisabled = (stepIndex: number) => {
        const stepNumber = stepIndex + 1;
        if (stepNumber <= currentStep) return false;
        if (stepNumber === 2) return !validateStep1(false);
        return false;
    };

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
        salesExecutive: (user as any)?.type === "AGENT" ? { id: user?.id, name: (user as any)?.name, email: (user as any)?.email, mobile: (user as any)?.mobile } : "",
        noOfRooms: "",
        hotelCategory: "",
        templateId: "",
        clientArea: {},
        clientSites: [],
    });

    const [errors, setErrors] = useState<any>({});
    const [hotelCategories, setHotelCategories] = useState<any[]>([]);
    const [salesExecutives, setSalesExecutives] = useState<any[]>([]);
    const [mailTemplates, setMailTemplates] = useState<any[]>([]);
    const [currentStep, setCurrentStep] = useState(1);
    const [previewData, setPreviewData] = useState<any>(null);

    // Fetch initial data
    useEffect(() => {
        const fetchDependencies = async () => {
            try {
                const [hotelRes, salesRes, mailRes] = await Promise.all([
                    getHotelCategory({ limit: "all" }),
                    getSalesEx({ limit: "all" }),
                    getMailTemplate({ limit: "all" }),
                ]);

                if (hotelRes?.data) setHotelCategories(hotelRes.data);
                else if (Array.isArray(hotelRes)) setHotelCategories(hotelRes);

                if (salesRes?.data) setSalesExecutives(salesRes.data);
                else if (Array.isArray(salesRes)) setSalesExecutives(salesRes);

                if (mailRes?.data) setMailTemplates(mailRes.data);
                else if (Array.isArray(mailRes)) setMailTemplates(mailRes);

            } catch (error) {
                console.error("Error fetching dependencies", error);
            }
        };
        fetchDependencies();
    }, []);

    // Fetch Itinerary if ID is present
    useEffect(() => {
        const fetchItinerary = async () => {
            if (!itineraryId) return;

            setIsLoading(true);
            try {
                const res = await itineraryService.getById(itineraryId, { populate: "area,site,hotel" });
                if (res) {
                    setFormData((prev: any) => ({
                        ...prev,
                        title: res.title,
                        itinerary: { id: res.id || res._id, title: res.title }
                    }));
                    setPreviewData({
                        clientArea: res.area,
                        clientSites: res.sites
                    });
                }
            } catch (error: any) {
                showSnackbar({
                    title: "Error",
                    description: error.message || "Failed to fetch itinerary details",
                    color: "danger"
                });
            } finally {
                setIsLoading(false);
            }
        };
        fetchItinerary();
    }, [itineraryId, showSnackbar]);

    const handleChange = (name: string, value: any) => {
        setFormData((prev: any) => {
            const newData = { ...prev, [name]: value };

            if (name === "food" && value === "no") {
                newData.selectedFood = [];
                [...selectedFoodList.items].forEach((i) => selectedFoodList.remove(i.id));
            }
            if (name === "transport" && value === "no") {
                newData.selectedTransport = [];
                [...selectedTransportList.items].forEach((i) => selectedTransportList.remove(i.id));
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

        if (errors[name]) {
            setErrors((prev: any) => ({ ...prev, [name]: "" }));
        }
    };

    useEffect(() => {
        if (currentStep === 2) {
            const { clientArea, clientSites, ...rest } = formData;
            setPreviewData((data: any) => ({
                ...data,
                ...rest,
                selectedFood: selectedFoodList.items.map((item) => item.id),
                selectedTransport: selectedTransportList.items.map((item) => item.id),
            }));
        }
    }, [currentStep, formData, selectedFoodList.items, selectedTransportList.items]);

    const handleAgeChange = (index: number, value: string) => {
        const newAges = [...formData.kidsAges];
        newAges[index] = value;
        setFormData((prev: any) => ({ ...prev, kidsAges: newAges }));
    };



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

    const handleNext = () => {
        if (currentStep === 1) {
            if (!validateStep1(true)) {
                showSnackbar({ title: "Validation Error", description: "Please fill all required fields", color: "danger" });
                return;
            }
        }
        if (currentStep < 2) setCurrentStep(prev => prev + 1);
    };

    const handleBack = () => {
        if (currentStep > 1) setCurrentStep(prev => prev - 1);
    };

    const handleSubmit = async () => {
        // Step 1 validation is already done before moving to next steps, but good to check if submitting from step 4
        // However, if we allow submitting from step 4, we assume previous steps are valid.

        setIsLoading(true);
        try {
            const payload = {
                ...formData,
                selectedFood: selectedFoodList.items.map((i) => i.id),
                selectedTransport: selectedTransportList.items.map((i) => i.id),
                itinerary: formData.itinerary?.id || formData.itinerary,
                hotelCategory: formData.hotelCategory?.id || formData.hotelCategory,
                salesExecutive: formData.salesExecutive?.id || formData.salesExecutive,
                templateId: formData.templateId?.id || formData.templateId,
            };

            const res = await clientItineraryService.add(payload);
            if (res?.error) throw new Error(res.error);

            showSnackbar({
                title: "Success",
                description: "Client Itinerary created successfully",
                color: "success"
            });
            navigate("/itinerary/clientitinerary");
        } catch (error: any) {
            showSnackbar({
                title: "Error",
                description: error.message || "Failed to create client itinerary",
                color: "danger"
            });
        } finally {
            setIsLoading(false);
        }
    };

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
                                    className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm ring-1 ring-secondary ${active ? "bg-secondary text-primary" : "text-tertiary hover:bg-primary_hover"
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
                    {currentStep === 1 && <>

                        <div className="mb-6 text-lg font-bold">
                            {formData.itinerary?.title}
                        </div>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                            <Input
                                label="Title"
                                isRequired
                                value={formData.title}
                                onChange={(val) => handleChange("title", val)}
                                isInvalid={!!errors.title}
                                hint={errors.title}
                                placeholder="Enter Title"
                            />
                            <Input
                                label="Client Name"
                                isRequired
                                value={formData.clientName}
                                onChange={(val) => handleChange("clientName", val)}
                                isInvalid={!!errors.clientName}
                                hint={errors.clientName}
                                placeholder="Enter Client Name"
                            />
                            <Input
                                label="Email"
                                value={formData.email}
                                onChange={(val) => handleChange("email", val)}
                                placeholder="Enter Email"
                            />
                            <Input
                                label="Mobile"
                                isRequired
                                value={formData.mobile}
                                onChange={(val) => handleChange("mobile", val)}
                                isInvalid={!!errors.mobile}
                                hint={errors.mobile}
                                placeholder="Enter Mobile"
                            />
                            <div className="flex flex-col gap-1.5">
                                <Label isRequired>Tour Date</Label>
                                <DatePicker
                                    placeholder="Select Tour Date"
                                    value={formData.tourDate ? parseDate(formData.tourDate) : null}
                                    onChange={(date) => handleChange("tourDate", date ? date.toString() : "")}
                                />
                                {errors.tourDate && <p className="text-sm text-error-primary">{errors.tourDate}</p>}
                            </div>

                            <Input
                                label="No of Adults"
                                isRequired
                                type="number"
                                value={formData.noOfAdults}
                                onChange={(val) => handleChange("noOfAdults", val)}
                                isInvalid={!!errors.noOfAdults}
                                hint={errors.noOfAdults}
                            />
                            <Input
                                label="No of Kids"
                                type="number"
                                value={formData.noOfKids}
                                onChange={(val) => handleChange("noOfKids", val)}
                            />

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

                            <Input
                                label="No of Rooms"
                                isRequired
                                type="number"
                                value={formData.noOfRooms}
                                onChange={(val) => handleChange("noOfRooms", val)}
                                isInvalid={!!errors.noOfRooms}
                                hint={errors.noOfRooms}
                            />

                            <ComboBox
                                label="Hotel Category"
                                isRequired
                                placeholder="Select Hotel Category"
                                items={hotelCategories.map(cat => ({ id: cat.id || cat._id, label: cat.title }))}
                                selectedKey={formData.hotelCategory?.id || formData.hotelCategory}
                                onSelectionChange={(key) => {
                                    const cat = hotelCategories.find(c => (c.id || c._id) === key);
                                    handleChange("hotelCategory", cat ? { id: key, title: cat.title } : key);
                                }}
                                isInvalid={!!errors.hotelCategory}
                                hint={errors.hotelCategory}
                            >
                                {(item) => <SelectItem id={item.id}>{item.label}</SelectItem>}
                            </ComboBox>








                            <Input
                                label="Package Days"
                                isRequired
                                type="number"
                                value={formData.noOfPackageDays}
                                onChange={(val) => handleChange("noOfPackageDays", val)}
                                isInvalid={!!errors.noOfPackageDays}
                                hint={errors.noOfPackageDays}
                            />
                            <Input
                                label="Package Nights"
                                isRequired
                                type="number"
                                value={formData.noOfPackageNights}
                                onChange={(val) => handleChange("noOfPackageNights", val)}
                                isInvalid={!!errors.noOfPackageNights}
                                hint={errors.noOfPackageNights}
                            />
                            <Input
                                label="Package Cost"
                                isRequired
                                type="number"
                                value={formData.packageCost}
                                onChange={(val) => handleChange("packageCost", val)}
                                isInvalid={!!errors.packageCost}
                                hint={errors.packageCost}
                            />
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

                            {((user as any)?.type !== "AGENT") && (
                                <ComboBox
                                    label="Sales Executive"
                                    isRequired
                                    placeholder="Select Sales Executive"
                                    items={salesExecutives.map(ex => ({ id: ex.id || ex._id, label: ex.name || ex.username }))}
                                    selectedKey={formData.salesExecutive?.id || formData.salesExecutive}
                                    onSelectionChange={(key) => {
                                        const ex = salesExecutives.find(e => (e.id || e._id) === key);
                                        handleChange("salesExecutive", ex ? { id: key, name: ex.name } : key);
                                    }}
                                    isInvalid={!!errors.salesExecutive}
                                    hint={errors.salesExecutive}
                                >
                                    {(item) => <SelectItem id={item.id}>{item.label}</SelectItem>}
                                </ComboBox>
                            )}
                            <ComboBox
                                label="Mail Template"
                                isRequired
                                placeholder="Select Mail Template"
                                items={mailTemplates.map(t => ({ id: t.id || t._id, label: t.title }))}
                                selectedKey={formData.templateId?.id || formData.templateId}
                                onSelectionChange={(key) => {
                                    const temp = mailTemplates.find(t => (t.id || t._id) === key);
                                    handleChange("templateId", temp ? temp : key);
                                }}
                                isInvalid={!!errors.templateId}
                                hint={errors.templateId}
                            >
                                {(item) => <SelectItem id={item.id}>{item.label}</SelectItem>}
                            </ComboBox>
                            <div className="col-span-1 md:col-span-2">
                                <Label isRequired>Food</Label>
                                <RadioGroup value={formData.food} onChange={(val) => handleChange("food", val)} className="flex-row mt-1.5">
                                    <RadioButton value="yes" label="Yes" />
                                    <RadioButton value="no" label="No" />
                                </RadioGroup>
                                {errors.food && <p className="text-sm text-error-primary mt-1">{errors.food}</p>}
                                {formData.food === "yes" && (
                                    <div className="mt-2">
                                        <MultiSelect
                                            label="Select Food"
                                            isRequired
                                            items={FOOD_OPTIONS}
                                            selectedItems={selectedFoodList}
                                            placeholder="Select food options"
                                        >
                                            {(item) => <SelectItem id={item.id}>{item.label}</SelectItem>}
                                        </MultiSelect>
                                        {errors.food && selectedFoodList.items.length === 0 && (
                                            <p className="text-sm text-error-primary mt-1">Please select at least one food option</p>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="col-span-1 md:col-span-2">
                                <Label isRequired>Transport</Label>
                                <RadioGroup value={formData.transport} onChange={(val) => handleChange("transport", val)} className="flex-row mt-1.5">
                                    <RadioButton value="yes" label="Yes" />
                                    <RadioButton value="no" label="No" />
                                </RadioGroup>
                                {errors.transport && <p className="text-sm text-error-primary mt-1">{errors.transport}</p>}
                                {formData.transport === "yes" && <>
                                    <div className="mt-2">
                                        <MultiSelect
                                            label="Select Transport"
                                            isRequired
                                            items={TRANSPORT_OPTIONS}
                                            selectedItems={selectedTransportList}
                                            placeholder="Select transport options"
                                            onItemInserted={(key) => {
                                                setFormData((prev: any) => ({
                                                    ...prev,
                                                    selectedTransport: Array.from(new Set([...(prev.selectedTransport || []), String(key)])),
                                                }));
                                            }}
                                            onItemCleared={(key) => {
                                                setFormData((prev: any) => ({
                                                    ...prev,
                                                    selectedTransport: (prev.selectedTransport || []).filter((item: string) => item !== String(key)),
                                                }));
                                            }}
                                        >
                                            {(item) => <SelectItem id={item.id}>{item.label}</SelectItem>}
                                        </MultiSelect>
                                        {errors.transport && selectedTransportList.items.length === 0 && (
                                            <p className="text-sm text-error-primary mt-1">Please select at least one transport option</p>
                                        )}
                                    </div>
                                    <div className="mt-2 grid grid-cols-1 gap-3 md:grid-cols-2">
                                        {formData.selectedTransport?.includes("pickup") && (
                                            <Input
                                                label="Pickup Location"
                                                value={formData.pickUpLocation}
                                                onChange={(val) => handleChange("pickUpLocation", val)}
                                            />
                                        )}
                                        {formData.selectedTransport?.includes("drop") && (
                                            <Input
                                                label="Drop Location"
                                                value={formData.dropLocation}
                                                onChange={(val) => handleChange("dropLocation", val)}
                                            />
                                        )}
                                    </div>
                                </>}
                            </div>

                        </div>

                    </>
                    }



                    {currentStep === 2 && (
                        <div className="flex flex-col gap-6">
                            {previewData && <PreviewMail previewData={previewData} />}
                        </div>
                    )}

                    <div className="mt-8 flex justify-center gap-4">
                        <Button color="secondary" onClick={handleBack} disabled={currentStep === 1}>
                            Back
                        </Button>
                        {currentStep < 2 ? (
                            <Button onClick={handleNext}>
                                Next
                            </Button>
                        ) : (
                            <Button onClick={handleSubmit} isLoading={isLoading}>
                                Create
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
}
