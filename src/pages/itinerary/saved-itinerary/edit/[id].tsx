import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Button } from "@/components/base/buttons/button";
import { RichTextEditor } from "@/components/application/rich-text-editor/rich-text-editor";
import { ModalOverlay, Modal, Dialog } from "@/components/application/modals/modal";
import { getSavedItineraryById, updateSavedItineraryById } from "@/utils/services/savedItineraryService";
import { useStoreSnackbar } from "@/store/snackbar";
import { DefaultLayout } from "@/layouts/DefaultLayout";
import HotelChangeSavedItinerary from "@/components/application/saved-itinerary/hotel-change-saved-itinerary";
import { parseDate } from "@internationalized/date";

export default function EditSavedItineraryPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { showSnackbar } = useStoreSnackbar();

    const [isLoading, setIsLoading] = useState(true);
    const [isChangeHotelOpen, setIsChangeHotelOpen] = useState(false);

    const [formData, setFormData] = useState({
        clientName: "",
        email: "",
        mailData: "",
        mobile: "",
        packageCost: "",
        salesExecutive: "",
        tourDate: null as any,
        status: "",
    });

    const [errors, setErrors] = useState<any>({});

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;
            setIsLoading(true);
            try {
                const params = { populate: "salesExecutive" };
                const response: any = await getSavedItineraryById(id, params);

                if (response) {
                    setFormData({
                        clientName: response.clientName || "",
                        email: response.email || "",
                        mailData: response.mailData || "",
                        mobile: response.mobile || "",
                        packageCost: response.packageCost || "",
                        tourDate: response.tourDate ? parseDate(response.tourDate.split('T')[0]) : null,
                        salesExecutive: response.salesExecutive?.id || response.salesExecutive || "",
                        status: response.status?.toString() || "false",
                    });
                }
            } catch (error: any) {
                showSnackbar({ description: error.message, title: 'Error', color: 'danger' });
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [id, showSnackbar]);

    const handleChange = (key: string, value: any) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
        // Clear error for the field
        if (errors[key]) {
            setErrors((prev: any) => ({ ...prev, [key]: "" }));
        }
    };

    const validateForm = () => {
        const newErrors: any = {};
        if (!formData.clientName) newErrors.clientName = "Client Name is required";
        if (!formData.mailData || formData.mailData.trim() === "") newErrors.mailData = "Mail Data is required";
        if (!formData.mobile) newErrors.mobile = "Mobile is required";
        if (!formData.packageCost) newErrors.packageCost = "Package Cost is required";
        if (!formData.salesExecutive) newErrors.salesExecutive = "Sales Executive is required";
        if (!formData.tourDate) newErrors.tourDate = "Tour Date is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const updatedFormData = {
                ...formData,
                tourDate: formData.tourDate ? formData.tourDate.toString() : null,
                salesExecutive: formData.salesExecutive, // Assuming ID is stored
            };

            const response = await updateSavedItineraryById(id!, updatedFormData);
            if (response) {
                showSnackbar({ description: "Itinerary updated successfully", title: 'Success', color: 'success' });
                navigate('/itinerary/saved-itinerary');
            }
        } catch (error: any) {
            showSnackbar({ description: error.message, title: 'Error', color: 'danger' });
        }
    };

    const handleMailUpdate = async (newMailData: string) => {
        try {
            const updatedFormData = {
                mailData: newMailData,
            };
            const response = await updateSavedItineraryById(id!, updatedFormData);
            if (response) {
                setFormData((prev) => ({ ...prev, mailData: response.mailData }));
                showSnackbar({ description: "Mail updated successfully", title: 'Success', color: 'success' });
            }
        } catch (error: any) {
            showSnackbar({ description: error.message, title: 'Error', color: 'danger' });
        }
    };

    if (isLoading) {
        return (
            <DefaultLayout>
                <div className="flex h-[50vh] items-center justify-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-primary" />
                </div>
            </DefaultLayout>
        );
    }

    return (
        <DefaultLayout>
            <div className="p-6 max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold">Edit Quotation</h1>
                    <Button onClick={() => setIsChangeHotelOpen(true)} color="primary">
                        Change Hotels
                    </Button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        {/* <label className="block text-sm font-medium mb-2">Mail Data</label> */}
                        <RichTextEditor
                            value={formData.mailData}
                            onChange={(val) => handleChange("mailData", val)}
                        />
                        {errors.mailData && <p className="text-red-500 text-sm mt-1">{errors.mailData}</p>}
                    </div>

                    <div className="flex justify-end gap-4">
                        <Button color="secondary" onClick={() => navigate('/itinerary/saved-itinerary')}>
                            Cancel
                        </Button>
                        <Button type="submit" color="primary">
                            Submit
                        </Button>
                    </div>
                </form>

                <ModalOverlay isOpen={isChangeHotelOpen} onOpenChange={setIsChangeHotelOpen}>
                    <Modal className="bg-white dark:bg-gray-900 rounded-lg p-6 max-w-5xl w-full h-[80vh] overflow-y-auto">
                        <Dialog>
                            <HotelChangeSavedItinerary
                                data={formData.mailData}
                                onSuccess={(newData) => {
                                    handleMailUpdate(newData);
                                    setIsChangeHotelOpen(false);
                                }}
                                onFailure={() => setIsChangeHotelOpen(false)}
                            />
                        </Dialog>
                    </Modal>
                </ModalOverlay>
            </div>
        </DefaultLayout>
    );
}
