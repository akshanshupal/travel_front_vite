import { DefaultLayout } from "@/layouts/DefaultLayout";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Input } from "@/components/base/input/input";
import { TextArea } from "@/components/base/textarea/textarea";
import { Select } from "@/components/base/select/select";
import { ComboBox } from "@/components/base/select/combobox";
import { SelectItem } from "@/components/base/select/select-item";
import { Tabs } from "@/components/application/tabs/tabs";
import { Modal, ModalOverlay, Dialog } from "@/components/application/modals/modal";
import { CloseButton } from "@/components/base/buttons/close-button";
import { RichTextEditor } from "@/components/application/rich-text-editor/rich-text-editor";
import Tmodal from "@/components/utils/Tmodal";
import { AssignmentDetails } from "@/components/application/assignment-details/assignment-details";
import { useStoreSnackbar } from "@/store/snackbar";
import { fetchWithToken } from "@/utils/fetchApi";
import { getAssignmentById } from "@/utils/services/assignmentService";
import { getbookingtype } from "@/utils/services/bookingTypeService";
import { getVendor } from "@/utils/services/vendorService";
import { getPaymentStore } from "@/utils/services/paymentStoreService";
import { addPayment, getpayment, getPaymentDelete, updatePaymentById } from "@/utils/services/paymentService";
import { formatDateInput, formatDateTimeInput, formatShortDate, formatTime } from "@/utils/formatters";
import { DatePicker } from "@/components/application/date-picker/date-picker";
import { DateInputWithTime } from "@/components/application/date-picker/date-input-with-time";
import { parseDate } from "@internationalized/date";
import { ArrowLeft, Edit01, Eye, Plus, Trash01 } from "@untitledui/icons";
import { FaBed, FaCalendarAlt, FaCopy, FaEye, FaMapMarkerAlt, FaStar, FaUserFriends, FaUtensils, FaWhatsapp } from "react-icons/fa";
import { FaBuilding, FaCalendarDays, FaCar, FaGlobe, FaMoneyBillWave } from "react-icons/fa6";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";

const getId = (value: any) => String(value?.id ?? value?._id ?? value ?? "").trim();

const asArray = (value: any) => (Array.isArray(value) ? value : []);

const getUploadUrl = (response: any) => {
    const resolved = response?.data ?? response;
    if (typeof resolved === "string") return resolved;
    if (typeof resolved?.url === "string") return resolved.url;
    if (typeof resolved?.data === "string") return resolved.data;
    if (typeof resolved?.location === "string") return resolved.location;
    return "";
};

const formatShortDateTime = (value?: string) => {
    if (!value) return "-";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "-";
    return `${formatShortDate(date)}, ${formatTime(date)}`;
};

const hasTimeComponent = (dateStr?: string) => {
    if (!dateStr) return false;
    const date = new Date(dateStr);
    if (Number.isNaN(date.getTime())) return false;
    return date.getUTCHours() !== 0 || date.getUTCMinutes() !== 0;
};

const SectionHeader = ({ title }: { title: string }) => {
    return (
        <div className="flex items-center gap-2 border-b border-secondary bg-secondary px-4 py-2 text-xs font-semibold uppercase tracking-wide text-tertiary">
            <span>{title}</span>
        </div>
    );
};

const SectionSubHeader = ({ title, icon }: { title: string; icon?: React.ReactNode }) => {
    return (
        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-tertiary">
            {icon && <span className="text-primary">{icon}</span>}
            <span>{title}</span>
        </div>
    );
};

const InfoBox = ({ label, value, icon }: { label: string; value?: any; icon?: React.ReactNode }) => {
    return (
        <div className="relative rounded-lg border border-secondary bg-secondary px-3 py-2">
            <div className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide text-tertiary">
                {icon && <span className="text-primary">{icon}</span>}
                {label}
            </div>
            <div className="text-sm font-semibold text-primary">{value || "N/A"}</div>
        </div>
    );
};

const TextPanel = ({ title, icon, value }: { title: string; icon?: React.ReactNode; value?: any }) => {
    return (
        <div className="rounded-lg border border-secondary bg-secondary p-3">
            <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-tertiary">
                {icon && <span className="text-primary">{icon}</span>}
                <span>{title}</span>
            </div>
            <div className="text-xs text-tertiary">{value || "N/A"}</div>
        </div>
    );
};

export default function BookingViewPage() {
    const navigate = useNavigate();
    const params = useParams();
    const id = getId(params.id);
    const { showSnackbar } = useStoreSnackbar();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [assignmentData, setAssignmentData] = useState<any>(null);
    const [services, setServices] = useState<any[]>([]);
    const [bookingTypes, setBookingTypes] = useState<any[]>([]);
    const [vendors, setVendors] = useState<any[]>([]);
    const [paymentStores, setPaymentStores] = useState<any[]>([]);
    const [servicePaymentsList, setServicePaymentsList] = useState<any[]>([]);
    const [activeTab, setActiveTab] = useState("bookingDetails");
    const [openServiceId, setOpenServiceId] = useState<string | null>(null);
    const [servicePaymentsMap, setServicePaymentsMap] = useState<Record<string, any[]>>({});

    const [serviceModalOpen, setServiceModalOpen] = useState(false);
    const [editingService, setEditingService] = useState<any>(null);
    const [serviceForm, setServiceForm] = useState<any>({
        bookingDate: formatDateInput(new Date().toISOString()),
        bookingsType: "",
        amount: "",
        startDate: "",
        hasStartTime: false,
        endDate: "",
        hasEndTime: false,
        vendor: "",
        customParams: { additionalBookingDetails: {} },
    });
    const [serviceErrors, setServiceErrors] = useState<Record<string, string>>({});

    const [paymentModalOpen, setPaymentModalOpen] = useState(false);
    const [paymentService, setPaymentService] = useState<any>(null);
    const [editingPayment, setEditingPayment] = useState<any>(null);
    const [paymentForm, setPaymentForm] = useState<any>({
        paymentDate: formatDateTimeInput(new Date()),
        amount: "",
        paymentStore: "",
        remarks: "",
        nextPaymentDate: "",
        paymentImg: "",
    });
    const [paymentErrors, setPaymentErrors] = useState<Record<string, string>>({});
    const [paymentMessage, setPaymentMessage] = useState("");

    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState<any>(null);

    const [confirmPaymentDeleteOpen, setConfirmPaymentDeleteOpen] = useState(false);
    const [deletePaymentTarget, setDeletePaymentTarget] = useState<any>(null);

    const [additionalDetailsModalOpen, setAdditionalDetailsModalOpen] = useState(false);
    const [additionalDetailsService, setAdditionalDetailsService] = useState<any>(null);

    const [bookingStatusModalOpen, setBookingStatusModalOpen] = useState(false);
    const [bookingStatusService, setBookingStatusService] = useState<any>(null);

    const [whatsappPreviewOpen, setWhatsappPreviewOpen] = useState(false);
    const [whatsappPhone, setWhatsappPhone] = useState("");
    const [whatsappPhoneError, setWhatsappPhoneError] = useState("");
    const [whatsappMessage, setWhatsappMessage] = useState("");

    const bookingStatusOptions = [
        { id: "pending", label: "Pending" },
        { id: "booked", label: "Booked" },
    ];

    const tabItems = [
        { id: "bookingDetails", label: "Booking Details" },
        { id: "servicePayments", label: "Service Payments" },
        { id: "assignmentDetails", label: "Assignment Details" },
    ];

    const resolvedBookingTypes = useMemo(() => asArray(bookingTypes), [bookingTypes]);
    const resolvedVendors = useMemo(() => asArray(vendors), [vendors]);
    const resolvedPaymentStores = useMemo(() => asArray(paymentStores), [paymentStores]);

    const selectedBookingType = useMemo(
        () => resolvedBookingTypes.find((item) => getId(item) === getId(serviceForm.bookingsType)),
        [resolvedBookingTypes, serviceForm.bookingsType],
    );

    const filteredVendors = useMemo(() => {
        if (!serviceForm.bookingsType) return resolvedVendors;
        return resolvedVendors.filter((vendor) => asArray(vendor?.bookingsType).includes(getId(serviceForm.bookingsType)));
    }, [resolvedVendors, serviceForm.bookingsType]);

    useEffect(() => {
        const run = async () => {
            if (!id) {
                setLoading(false);
                return;
            }
            setLoading(true);
            try {
                const response = await getAssignmentById(id, {
                    populate: "agentName,hotelCategory,paymentStore,tokenPayment,company",
                });
                const resolved = response?.data ?? response;
                setAssignmentData(resolved || null);
            } catch (error: any) {
                showSnackbar({
                    title: "Error",
                    description: error?.message || "Failed to load booking",
                    color: "danger",
                });
            } finally {
                setLoading(false);
            }
        };
        run();
    }, [id, showSnackbar]);

    const fetchServices = async () => {
        if (!id) return;
        try {
            const response = await fetchWithToken("/api/packagebooking", {
                assignment: id,
                populate: "bookingsType,vendor,assignment",
            });
            const resolved = response?.data ?? response;
            setServices(asArray(resolved));
        } catch (error) {
            setServices([]);
        }
    };

    useEffect(() => {
        fetchServices();
    }, [id]);

    useEffect(() => {
        const run = async () => {
            try {
                const [bookingTypeRes, vendorRes, paymentStoreRes] = await Promise.all([
                    getbookingtype({ limit: "all" }),
                    getVendor({ status: true, limit: "all" }),
                    getPaymentStore(),
                ]);
                setBookingTypes(bookingTypeRes?.data ?? bookingTypeRes ?? []);
                setVendors(vendorRes?.data ?? vendorRes ?? []);
                setPaymentStores(paymentStoreRes?.data ?? paymentStoreRes ?? []);
            } catch {
                setBookingTypes([]);
                setVendors([]);
                setPaymentStores([]);
            }
        };
        run();
    }, []);

    const fetchServicePayments = async () => {
        if (!id) return;
        try {
            const response = await getpayment({
                assignment: id,
                populate: "packageBooking,paymentStore",
                select_packageBooking: "title",
                select_paymentStore: "title",
            });
            const resolved = response?.data ?? response;
            const list = asArray(resolved).filter((item) => item?.paymentType === "Dr");
            setServicePaymentsList(list);
        } catch {
            setServicePaymentsList([]);
        }
    };

    const fetchServicePaymentsFor = async (serviceId: string) => {
        if (!serviceId) return;
        try {
            const response = await getpayment({
                packageBooking: serviceId,
                populate: "linkedPayment,paymentStore",
            });
            const resolved = response?.data ?? response;
            setServicePaymentsMap((prev) => ({ ...prev, [serviceId]: asArray(resolved) }));
        } catch {
            setServicePaymentsMap((prev) => ({ ...prev, [serviceId]: [] }));
        }
    };

    const handleServiceFormChange = (key: string, value: any) => {
        setServiceForm((prev: any) => ({ ...prev, [key]: value }));
    };

    const openServiceModal = (service?: any) => {
        if (service) {
            setEditingService(service);
            setServiceForm({
                bookingDate: formatDateInput(service.bookingDate),
                bookingsType: getId(service.bookingsType),
                amount: service.amount ?? "",
                startDate: formatDateTimeInput(service.startDate),
                hasStartTime: service.hasStartTime ?? hasTimeComponent(service.startDate),
                endDate: formatDateTimeInput(service.endDate),
                hasEndTime: service.hasEndTime ?? hasTimeComponent(service.endDate),
                vendor: getId(service.vendor),
                customParams: {
                    additionalBookingDetails: service?.customParams?.additionalBookingDetails || {},
                },
            });
        } else {
            setEditingService(null);
            setServiceForm({
                bookingDate: formatDateInput(new Date().toISOString()),
                bookingsType: "",
                amount: "",
                startDate: "",
                hasStartTime: false,
                endDate: "",
                hasEndTime: false,
                vendor: "",
                customParams: { additionalBookingDetails: {} },
            });
        }
        setServiceErrors({});
        setServiceModalOpen(true);
    };

    const validateServiceForm = () => {
        const next: Record<string, string> = {};
        if (!serviceForm.bookingDate) next.bookingDate = "Booking date is required";
        if (!serviceForm.bookingsType) next.bookingsType = "Service is required";
        if (!serviceForm.amount || Number(serviceForm.amount) <= 0) next.amount = "Amount is required";
        if (!serviceForm.vendor) next.vendor = "Vendor is required";
        if (!serviceForm.startDate) next.startDate = "Start date is required";
        if (!serviceForm.endDate) next.endDate = "End date is required";
        setServiceErrors(next);
        return Object.keys(next).length === 0;
    };

    const saveService = async () => {
        if (!assignmentData || !validateServiceForm()) return;
        setSaving(true);
        try {
            const bookingTypeItem = resolvedBookingTypes.find((item) => getId(item) === getId(serviceForm.bookingsType));
            const vendorItem = resolvedVendors.find((item) => getId(item) === getId(serviceForm.vendor));
            const payload: any = {
                ...serviceForm,
                title: bookingTypeItem?.title || "",
                assignment: getId(assignmentData),
                bookingsType: getId(serviceForm.bookingsType),
                vendor: getId(serviceForm.vendor),
                packageId: assignmentData?.packageId,
                customParams: {
                    additionalBookingDetails: serviceForm?.customParams?.additionalBookingDetails || {},
                },
            };
            if (!editingService) {
                payload.pendingAmount = Number(serviceForm.amount || 0);
                payload.bookingStatus = "pending";
            } else if (editingService?.pendingAmount !== undefined) {
                payload.pendingAmount = editingService.pendingAmount;
            }
            const response = editingService
                ? await fetchWithToken(`/api/packagebooking/${editingService.id || editingService._id}`, payload, { method: "PUT" })
                : await fetchWithToken("/api/packagebooking", payload, { method: "POST" });
            const resolved = response?.data ?? response;
            const mapped = {
                ...resolved,
                bookingsType: bookingTypeItem || resolved?.bookingsType,
                vendor: vendorItem || resolved?.vendor,
                assignment: assignmentData,
            };
            setServices((prev) => {
                if (editingService) {
                    return prev.map((item) => (getId(item) === getId(editingService) ? mapped : item));
                }
                return [...prev, mapped];
            });
            setServiceModalOpen(false);
            showSnackbar({
                title: "Success",
                description: "Service saved successfully",
                color: "success",
            });
        } catch (error: any) {
            showSnackbar({
                title: "Error",
                description: error?.message || "Failed to save service",
                color: "danger",
            });
        } finally {
            setSaving(false);
        }
    };

    const confirmDeleteService = (service: any) => {
        setDeleteTarget(service);
        setConfirmDeleteOpen(true);
    };

    const handleDeleteService = async () => {
        if (!deleteTarget) return;
        setSaving(true);
        try {
            await fetchWithToken(`/api/packagebooking/${deleteTarget.id || deleteTarget._id}`, {}, { method: "DELETE" });
            setServices((prev) => prev.filter((item) => getId(item) !== getId(deleteTarget)));
            setConfirmDeleteOpen(false);
            setDeleteTarget(null);
            showSnackbar({
                title: "Success",
                description: "Service deleted successfully",
                color: "success",
            });
        } catch (error: any) {
            showSnackbar({
                title: "Error",
                description: error?.message || "Failed to delete service",
                color: "danger",
            });
        } finally {
            setSaving(false);
        }
    };

    const openPaymentModal = (service: any, payment?: any) => {
        setPaymentService(service);
        setEditingPayment(payment || null);
        setPaymentForm({
            paymentDate: payment?.paymentDate ? formatDateTimeInput(payment.paymentDate) : formatDateTimeInput(new Date()),
            amount: payment?.amount ?? "",
            paymentStore: payment?.paymentStore ?? "",
            remarks: payment?.remarks ?? "",
            nextPaymentDate: service?.nextPaymentDate ? formatDateTimeInput(service.nextPaymentDate) : "",
            paymentImg: payment?.paymentImg ?? "",
        });
        setPaymentErrors({});
        setPaymentMessage("");
        setPaymentModalOpen(true);
    };

    const validatePaymentForm = () => {
        const next: Record<string, string> = {};
        if (!paymentForm.paymentDate) next.paymentDate = "Payment date is required";
        if (!paymentForm.amount) next.amount = "Amount is required";
        if (!paymentForm.paymentStore) next.paymentStore = "Payment mode is required";
        if (!paymentForm.remarks) next.remarks = "Remarks is required";
        setPaymentErrors(next);
        return Object.keys(next).length === 0;
    };

    const savePayment = async () => {
        if (!paymentService || !validatePaymentForm()) return;
        setSaving(true);
        try {
            let paymentImg = paymentForm.paymentImg;
            if (paymentImg && paymentImg instanceof File) {
                const fd = new FormData();
                fd.append("fmFile", paymentImg, paymentImg.name);
                const uploaded = await fetchWithToken("/api/file/upload", fd as any, { method: "POST" });
                paymentImg = getUploadUrl(uploaded);
            }
            const amountNumber = Number(paymentForm.amount || 0);
            const currentPending = Number(paymentService?.pendingAmount ?? paymentService?.amount ?? 0);
            const editedAmount = Number(editingPayment?.amount || 0);
            const nextPending = currentPending + editedAmount - amountNumber;
            if (amountNumber > currentPending + editedAmount) {
                setPaymentMessage(`Total amount paid exceeds remaining amount. Remaining: ₹${Math.max(currentPending + editedAmount, 0)}`);
                setSaving(false);
                return;
            }
            const payload: any = {
                ...paymentForm,
                paymentDate: paymentForm.paymentDate || formatDateTimeInput(new Date()),
                paymentStore: paymentForm.paymentStore,
                paymentTo: "paymentForService",
                paymentType: "Dr",
                assignment: getId(assignmentData),
                packageBooking: getId(paymentService),
                packageId: assignmentData?.packageId,
                paymentImg,
            };
            if (nextPending <= 0) {
                payload.nextPaymentDate = null;
            }
            const response = editingPayment
                ? await updatePaymentById(getId(editingPayment), payload)
                : await addPayment(payload);
            const resolved = response?.data ?? response;
            setServicePaymentsMap((prev) => {
                const list = asArray(prev[getId(paymentService)]);
                if (editingPayment) {
                    return {
                        ...prev,
                        [getId(paymentService)]: list.map((item) => (getId(item) === getId(editingPayment) ? resolved : item)),
                    };
                }
                return { ...prev, [getId(paymentService)]: [...list, resolved] };
            });
            setServices((prev) =>
                prev.map((item) =>
                    getId(item) === getId(paymentService)
                        ? { ...item, pendingAmount: nextPending, nextPaymentDate: payload.nextPaymentDate ?? item.nextPaymentDate }
                        : item,
                ),
            );
            fetchServicePayments();
            setPaymentModalOpen(false);
            showSnackbar({
                title: "Success",
                description: "Payment saved successfully",
                color: "success",
            });
        } catch (error: any) {
            showSnackbar({
                title: "Error",
                description: error?.message || "Failed to save payment",
                color: "danger",
            });
        } finally {
            setSaving(false);
        }
    };

    const confirmDeletePayment = (payment: any) => {
        setDeletePaymentTarget(payment);
        setConfirmPaymentDeleteOpen(true);
    };

    const handleDeletePayment = async () => {
        if (!deletePaymentTarget || !paymentService) return;
        setSaving(true);
        try {
            await getPaymentDelete(getId(deletePaymentTarget), {});
            const restoredPending =
                Number(paymentService?.pendingAmount ?? paymentService?.amount ?? 0) + Number(deletePaymentTarget.amount || 0);
            await fetchWithToken(`/api/packagebooking/${getId(paymentService)}`, { pendingAmount: restoredPending }, { method: "PUT" });
            setServices((prev) =>
                prev.map((item) => (getId(item) === getId(paymentService) ? { ...item, pendingAmount: restoredPending } : item)),
            );
            setServicePaymentsMap((prev) => {
                const list = asArray(prev[getId(paymentService)]).filter((item) => getId(item) !== getId(deletePaymentTarget));
                return { ...prev, [getId(paymentService)]: list };
            });
            fetchServicePayments();
            setConfirmPaymentDeleteOpen(false);
            setDeletePaymentTarget(null);
            showSnackbar({
                title: "Success",
                description: "Payment deleted successfully",
                color: "success",
            });
        } catch (error: any) {
            showSnackbar({
                title: "Error",
                description: error?.message || "Failed to delete payment",
                color: "danger",
            });
        } finally {
            setSaving(false);
        }
    };

    const openAdditionalDetails = (service: any) => {
        setAdditionalDetailsService(service);
        setAdditionalDetailsModalOpen(true);
    };

    const saveAdditionalDetails = async () => {
        if (!additionalDetailsService) return;
        setSaving(true);
        try {
            const payload = {
                ...additionalDetailsService,
                assignment: getId(additionalDetailsService?.assignment ?? assignmentData),
                bookingsType: getId(additionalDetailsService?.bookingsType),
                vendor: getId(additionalDetailsService?.vendor),
                customParams: {
                    additionalDetails: additionalDetailsService?.customParams?.additionalDetails || {},
                    additionalBookingDetails: additionalDetailsService?.customParams?.additionalBookingDetails || {},
                },
            };
            await fetchWithToken(`/api/packagebooking/${getId(additionalDetailsService)}`, payload, { method: "PUT" });
            setServices((prev) => prev.map((item) => (getId(item) === getId(additionalDetailsService) ? payload : item)));
            setAdditionalDetailsModalOpen(false);
            showSnackbar({
                title: "Success",
                description: "Additional details saved",
                color: "success",
            });
        } catch (error: any) {
            showSnackbar({
                title: "Error",
                description: error?.message || "Failed to save additional details",
                color: "danger",
            });
        } finally {
            setSaving(false);
        }
    };

    const openBookingStatusModal = (service: any) => {
        setBookingStatusService({
            ...service,
            bookingStatus: service?.bookingStatus || "pending",
        });
        setBookingStatusModalOpen(true);
    };

    const saveBookingStatus = async () => {
        if (!bookingStatusService) return;
        if (bookingStatusService?.amount != bookingStatusService?.pendingAmount) {
            showSnackbar({
                title: "Error",
                description: "Payment added for this booking service. 1st remove payment and then update booking status",
                color: "danger",
            });
            return;
        }
        setSaving(true);
        try {
            const payload = {
                ...bookingStatusService,
                assignment: getId(bookingStatusService?.assignment ?? assignmentData),
                bookingsType: getId(bookingStatusService?.bookingsType),
                vendor: getId(bookingStatusService?.vendor),
                customParams: {
                    additionalDetails: bookingStatusService?.customParams?.additionalDetails || {},
                    additionalBookingDetails: bookingStatusService?.customParams?.additionalBookingDetails || {},
                },
            };
            await fetchWithToken(`/api/packagebooking/${getId(bookingStatusService)}`, payload, { method: "PUT" });
            setServices((prev) => prev.map((item) => (getId(item) === getId(bookingStatusService) ? payload : item)));
            setBookingStatusModalOpen(false);
            showSnackbar({
                title: "Success",
                description: "Booking status updated",
                color: "success",
            });
        } catch (error: any) {
            showSnackbar({
                title: "Error",
                description: error?.message || "Failed to update booking status",
                color: "danger",
            });
        } finally {
            setSaving(false);
        }
    };

    useEffect(() => {
        if (activeTab === "servicePayments") {
            fetchServicePayments();
        }
    }, [activeTab]);

    const formatMaybeDate = (value?: string) => {
        if (!value) return "";
        const formatted = formatShortDate(value);
        if (!formatted || formatted === "Invalid Date") return value;
        return formatted;
    };

    const formatTime = (timeString?: string) => {
        if (!timeString) return "";
        const [hours, minutes] = timeString.split(':');
        if (!hours || !minutes) return timeString;
        const h = parseInt(hours, 10);
        const m = parseInt(minutes, 10);
        if (isNaN(h) || isNaN(m)) return timeString;
        const ampm = h >= 12 ? 'PM' : 'AM';
        const h12 = h % 12 || 12;
        return `${h12}:${minutes.padStart(2, '0')} ${ampm}`;
    };

    const buildWhatsappMessage = (assignment?: any) => {
        if (!assignment) return "";
        const joinParts = (...parts: any[]) =>
            parts
                .map((part) => String(part || "").trim())
                .filter(Boolean)
                .join(", ");
        const stayLines = asArray(assignment?.stayInformation)
            .map((item: any, index: number) => {
                const stayDate = formatMaybeDate(item?.date);
                const dateLabel = stayDate ? `🗓️ ${stayDate}` : `🗓️ Day ${index + 1}`;
                const stayText = `* Stay: ${item?.location || "N/A"}`;
                const sightText = `* Sightseeing: ${item?.sightSeeing || "N/A"}`;
                return [dateLabel, stayText, sightText].filter(Boolean).join("\n");
            })
            .filter(Boolean)
            .join("\n\n");

        const pickDate = formatMaybeDate(assignment?.pickUpDate);
        const dropDate = formatMaybeDate(assignment?.dropDate);

        const pickUpLine = `• 📍 Pick-Up: ${joinParts(assignment?.pickUpAddress, pickDate, formatTime(assignment?.pickUpTime)) || "N/A"}`;
        const dropLine = `• 📍 Drop: ${joinParts(assignment?.dropAddress, dropDate, formatTime(assignment?.dropTime)) || "N/A"}`;
        const transportLines = [pickUpLine, dropLine].filter(Boolean).join("\n");

        return [
            `🧾 *Customer ID*\n${assignment?.packageId || "N/A"}`,

            `📞 *Contact Details*\n• Name: ${assignment?.clientName || "N/A"}\n• Email: ${assignment?.email || "N/A"}`,

            `🧳 *Trip Summary*\n• Travel Date: ${formatShortDate(assignment?.tourDate) || "N/A"}\n• Location: ${assignment?.travelLocation || "N/A"}\n• Adults/Kids: ${assignment?.noOfAdult || 0}/${assignment?.noOfKids || 0}\n• Cab Seater: ${assignment?.carSeater || "N/A"}`,

            `*Travel Plan (Date-wise)*\n${stayLines || "N/A"}`,

            `🚖 *Transfers*\n${transportLines}`
        ]
            .filter(Boolean)
            .join("\n\n");
    };

    const validateWhatsappPhone = (value: string) => {
        const raw = String(value || "").trim();
        if (!raw) return "WhatsApp number is required";
        const digits = raw.replace(/\D/g, "");
        if (digits.length < 10 || digits.length > 15) return "Enter a valid mobile number";
        return "";
    };

    const openWhatsappSendModal = (assignment?: any) => {
        if (!assignment) return;
        setWhatsappPhone(String(assignment?.mobile || ""));
        setWhatsappPhoneError("");
        setWhatsappMessage(buildWhatsappMessage(assignment));
        setWhatsappPreviewOpen(true);
    };

    const sendWhatsApp = () => {
        const phoneError = validateWhatsappPhone(whatsappPhone);
        setWhatsappPhoneError(phoneError);
        if (phoneError) {
            showSnackbar({
                title: "Invalid Number",
                description: phoneError,
                color: "danger",
            });
            return;
        }
        const message = String(whatsappMessage || "").trim();
        if (!message) {
            showSnackbar({
                title: "Error",
                description: "WhatsApp message is empty",
                color: "danger",
            });
            return;
        }
        const number = whatsappPhone.replace(/\D/g, "");
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://api.whatsapp.com/send?phone=${number}&text=${encodedMessage}`, "_blank");
    };

    const copyWhatsappMessage = async () => {
        const message = String(whatsappMessage || "").trim();
        if (!message) {
            showSnackbar({
                title: "Error",
                description: "WhatsApp message is empty",
                color: "danger",
            });
            return;
        }
        try {
            await navigator.clipboard.writeText(message);
            showSnackbar({
                title: "Copied",
                description: "WhatsApp message copied",
                color: "success",
            });
        } catch (error: any) {
            showSnackbar({
                title: "Error",
                description: error?.message || "Failed to copy message",
                color: "danger",
            });
        }
    };

    if (!id) {
        return (
            <DefaultLayout>
                <div className="rounded-xl border border-error-solid bg-error-bg p-6 text-error-text">Invalid booking id</div>
            </DefaultLayout>
        );
    }

    return (
        <DefaultLayout>
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        
                        <h2 className="text-lg font-semibold text-primary">Booking View</h2>
                         {assignmentData?.verify !== undefined && (
                        <Badge size="sm" color={assignmentData?.verify ? "success" : "warning"}>
                            {assignmentData?.verify ? "Verified" : "Pending"}
                        </Badge>
                    )}
                    </div>
                   
                    <div className="flex gap-2">
                        <Button
                            color="primary"
                            size="sm"
                            onClick={() => navigate(`/bookings/payment/payment-link/${id}`)}
                        >
                            View All Generate Customer Voucher
                        </Button>
                        <Button color="secondary" size="sm" onClick={() => navigate("/bookings/booking")} iconLeading={ArrowLeft}>
                            Back
                        </Button>
                    </div>
                </div>

                {loading ? (
                    <div className="rounded-xl border border-secondary bg-primary p-6">
                        <div className="h-6 w-40 animate-pulse rounded bg-secondary" />
                    </div>
                ) : (
                    assignmentData && (
                            <div className="grid grid-cols-1 gap-3 rounded-xl border border-secondary bg-primary p-4 md:grid-cols-3">
                                <InfoBox label="Package ID" value={assignmentData?.packageId} />
                                <InfoBox label="Customer" value={assignmentData?.clientName} />
                                <InfoBox label="Travel Date" value={formatShortDate(assignmentData?.tourDate)} />
                                <InfoBox label="Travel Location" value={assignmentData?.travelLocation} />
                                <InfoBox label="Package Cost" value={assignmentData?.packageCost} />
                                <InfoBox label="Final Cost" value={assignmentData?.finalPackageCost} />
                                <div className="md:col-span-3 relative flex flex-row items-center justify-between rounded-lg border border-secondary bg-secondary px-3 py-2">
                                    <div className="text-sm font-semibold text-primary">
                                        Send Message to Vendor
                                    </div>
                                    <div className="flex gap-2">
                                        <ButtonUtility
                                            icon={FaWhatsapp}
                                            size="sm"
                                            color="success"
                                            tooltip="Send WhatsApp"
                                            onClick={() => openWhatsappSendModal(assignmentData)}
                                        />
                                    </div>
                                </div>
                            </div>
                    )
                )}

                <Tabs selectedKey={activeTab} onSelectionChange={(key) => setActiveTab(String(key))}>
                    <Tabs.List type="underline" orientation="horizontal" items={tabItems}>
                        {(item) => (
                            <Tabs.Item id={item.id} label={item.label}>
                                {item.label}
                            </Tabs.Item>
                        )}
                    </Tabs.List>

                    <Tabs.Panel id="bookingDetails">
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                            <div className="lg:col-span-1">
                                <div className="flex flex-col overflow-hidden rounded-xl border border-secondary bg-primary lg:h-[calc(100vh-9rem)]">
                                    <SectionHeader title="Travel Details" />
                                    <div className="space-y-4 overflow-y-auto bg-primary px-4 py-5 md:px-6">
                                        <div className="grid grid-cols-1 gap-3">
                                            <InfoBox label="Travel Location" value={assignmentData?.travelLocation} icon={<FaMapMarkerAlt />} />
                                            <InfoBox
                                                label="Package Duration"
                                                value={`${assignmentData?.noOfPackageDays || 0} Days & ${assignmentData?.noOfPackageNights || 0} Nights`}
                                                icon={<FaCalendarAlt />}
                                            />
                                            <InfoBox label="Package Category" value={assignmentData?.hotelCategory?.title} />
                                            <InfoBox
                                                label="Food"
                                                value={Array.isArray(assignmentData?.selectedFood) ? assignmentData.selectedFood.join(", ") : assignmentData?.selectedFood || assignmentData?.food}
                                                icon={<FaUtensils />}
                                            />
                                            <InfoBox label="Car Seater" value={assignmentData?.carSeater} icon={<FaCar />} />
                                            <InfoBox label="No of Rooms" value={assignmentData?.noOfRooms} icon={<FaBed />} />
                                        </div>

                                        {Array.isArray(assignmentData?.stayInformation) && assignmentData?.stayInformation.length > 0 && (
                                            <div>
                                                <div className="mb-2">
                                                    <SectionSubHeader title="Stay Information" icon={<FaBed />} />
                                                </div>
                                                <div className="grid grid-cols-1 gap-3">
                                                    {assignmentData.stayInformation
                                                        .filter((item: any) => item?.location)
                                                        .map((item: any, index: number) => (
                                                            <div key={index} className="rounded-lg border border-secondary bg-secondary p-3">
                                                                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-tertiary">
                                                                    <span className="rounded-full border border-secondary bg-primary px-2 py-0.5 text-xs font-medium text-primary">
                                                                        {formatShortDate(item?.date) || "N/A"}
                                                                    </span>
                                                                    <span className="rounded-full border border-secondary bg-primary px-2 py-0.5 text-xs font-medium text-primary">
                                                                        {item?.location || "N/A"}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        ))}
                                                </div>
                                            </div>
                                        )}

                                        {assignmentData?.stayInformation?.some((item: any) => item?.sightSeeing) ? (
                                            <div>
                                                <div className="mb-2">
                                                    <SectionSubHeader title="Sight Seeing" icon={<FaEye />} />
                                                </div>
                                                <div className="grid grid-cols-1 gap-3">
                                                    {assignmentData?.stayInformation?.map((item: any, index: number) => (
                                                        <div key={index} className="rounded-lg border border-secondary bg-secondary p-3">
                                                            <div className="text-xs font-semibold text-primary">
                                                                Day {index + 1} : {formatShortDate(item?.date) || "N/A"}
                                                            </div>
                                                            <div className="mt-1 text-xs text-tertiary">{item?.sightSeeing || "N/A"}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ) : (
                                            assignmentData?.siteSeeing && (
                                                <div>
                                                    <div className="mb-2">
                                                        <SectionSubHeader title="Sight Seeing" icon={<FaEye />} />
                                                    </div>
                                                    <div className="rounded-lg border border-secondary bg-secondary p-3 text-xs text-tertiary">
                                                        {assignmentData?.siteSeeing || "N/A"}
                                                    </div>
                                                </div>
                                            )
                                        )}

                                        <div className="grid grid-cols-1 gap-3">
                                            <TextPanel title="Text for Booking Team" icon={<FaUserFriends />} value={assignmentData?.textForBookingTeam} />
                                            <TextPanel title="Special Inclusion" icon={<FaStar />} value={assignmentData?.specialInclusion} />
                                        </div>

                                        <div className="grid grid-cols-1 gap-3">
                                            <div className="rounded-lg border border-secondary bg-secondary p-3">
                                                <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-tertiary">
                                                    <FaCar /> Pickup Details
                                                </div>
                                                <div className="grid grid-cols-1 gap-2">
                                                    <InfoBox label="Address" value={assignmentData?.pickUpAddress} icon={<FaMapMarkerAlt />} />
                                                    <InfoBox
                                                        label="Date"
                                                        value={`${formatShortDate(assignmentData?.pickUpDate) || "N/A"} ${assignmentData?.pickUpTime || ""}`.trim()}
                                                        icon={<FaCalendarAlt />}
                                                    />
                                                </div>
                                            </div>
                                            <div className="rounded-lg border border-secondary bg-secondary p-3">
                                                <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-tertiary">
                                                    <FaCar /> Drop Details
                                                </div>
                                                <div className="grid grid-cols-1 gap-2">
                                                    <InfoBox label="Address" value={assignmentData?.dropAddress} icon={<FaMapMarkerAlt />} />
                                                    <InfoBox
                                                        label="Date"
                                                        value={`${formatShortDate(assignmentData?.dropDate) || "N/A"} ${assignmentData?.dropTime || ""}`.trim()}
                                                        icon={<FaCalendarAlt />}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="lg:col-span-2">
                                <div className="rounded-xl border border-secondary bg-primary">
                                    <SectionHeader title="Booking Services" />
                                    <div className="space-y-4 p-4">
                                        {services.length === 0 && <div className="text-sm text-tertiary">No booking services found.</div>}
                                        {services.map((service, index) => {
                                            const serviceId = getId(service);
                                            const isOpen = openServiceId === serviceId;
                                            const payments = servicePaymentsMap[serviceId] || [];
                                            return (
                                                <div
                                                    key={serviceId}
                                                    className={`rounded-lg border p-4 transition ${
                                                        isOpen ? "border-brand-solid bg-secondary shadow-sm" : "border-secondary bg-primary hover:border-brand-solid"
                                                    }`}
                                                >
                                                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                                                        <div className="space-y-1">
                                                            <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                                                                <span>
                                                                    {index + 1}. {service?.bookingsType?.title || service?.title || "Service"}
                                                                </span>
                                                                <Badge size="sm" color={service?.bookingStatus === "booked" ? "success" : "warning"}>
                                                                    {service?.bookingStatus === "booked" ? "Booked" : "pending"}
                                                                </Badge>
                                                            </div>
                                                            <div className="text-xs text-tertiary">
                                                                Amount: ₹{service?.amount || 0} · Pending: ₹
                                                                {service?.pendingAmount ?? service?.amount ?? 0}{" "}
                                                                {service?.nextPaymentDate ? ". " + formatShortDate(service?.nextPaymentDate) : ""}
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-wrap gap-2">
                                                            <ButtonUtility
                                                                icon={Eye}
                                                                size="sm"
                                                                color={isOpen ? "brand" : "secondary"}
                                                                tooltip={isOpen ? "Hide details" : "View details"}
                                                                onClick={() => {
                                                                    const next = isOpen ? null : serviceId;
                                                                    setOpenServiceId(next);
                                                                    if (!isOpen) {
                                                                        fetchServicePaymentsFor(serviceId);
                                                                    }
                                                                }}
                                                            />
                                                            <ButtonUtility
                                                                icon={Edit01}
                                                                size="sm"
                                                                color="secondary"
                                                                tooltip="Edit service"
                                                                onClick={() => openServiceModal(service)}
                                                            />
                                                            <ButtonUtility
                                                                icon={Trash01}
                                                                size="sm"
                                                                color="secondary"
                                                                tooltip="Delete service"
                                                                onClick={() => confirmDeleteService(service)}
                                                            />
                                                        </div>
                                                    </div>
                                                    {isOpen && (
                                                        <div className="mt-4 space-y-4 border-t border-secondary pt-4">
                                                            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                                                                <InfoBox label="Booking Date" icon={<FaCalendarDays />} value={formatShortDate(service?.bookingDate)} />
                                                                <InfoBox label="Service" icon={<FaCar />} value={service.bookingsType?.title || "N/A"} />
                                                                <InfoBox label="Amount" icon={<FaMoneyBillWave />} value={`₹${service.amount}`} />
                                                                <InfoBox
                                                                    label="Start Date"
                                                                    icon={<FaCalendarDays />}
                                                                    value={service.hasStartTime ? formatShortDateTime(service?.startDate) : formatShortDate(service?.startDate)}
                                                                />
                                                                <InfoBox
                                                                    label="End Date"
                                                                    icon={<FaCalendarDays />}
                                                                    value={service.hasEndTime ? formatShortDateTime(service?.endDate) : formatShortDate(service?.endDate)}
                                                                />
                                                                {service.nextPaymentDate && (
                                                                    <InfoBox label="Next Payment Date" icon={<FaCalendarDays />} value={formatShortDate(service?.nextPaymentDate)} />
                                                                )}
                                                                {service.customParams?.additionalBookingDetails &&
                                                                    Object.entries(service.customParams.additionalBookingDetails).map(([key, value]) => (
                                                                        <InfoBox key={key} icon={<FaGlobe />} label={key.replace(/([a-z])([A-Z])/g, "$1 $2")} value={value} />
                                                                    ))}
                                                                <InfoBox label="Vendor" icon={<FaBuilding />} value={service?.vendor?.title || service?.vendor?.name} />
                                                                <InfoBox
                                                                    label="Booking Status"
                                                                    value={
                                                                        <div className="flex items-center justify-between gap-2">
                                                                            <span className="text-sm capitalize">{service?.bookingStatus || "pending"}</span>
                                                                            <ButtonUtility
                                                                                icon={Edit01}
                                                                                size="sm"
                                                                                color="success"
                                                                                tooltip="Edit booking status"
                                                                                className="absolute top-2 right-2"
                                                                                onClick={() => openBookingStatusModal(service)}
                                                                            />
                                                                        </div>
                                                                    }
                                                                />
                                                            </div>

                                                            {service?.customParams?.additionalDetails && (
                                                                <div className="rounded-lg border border-secondary bg-primary p-3">
                                                                    <div className="flex items-center justify-between">
                                                                        <div className="text-sm font-semibold text-primary">Additional Details</div>
                                                                        <Button size="sm" color="secondary" onClick={() => openAdditionalDetails(service)}>
                                                                            Edit
                                                                        </Button>
                                                                    </div>
                                                                    <div className="mt-3">
                                                                        <div
                                                                            className="text-xs text-primary"
                                                                            dangerouslySetInnerHTML={{ __html: String(service.customParams.additionalDetails || "") }}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            )}

                                                            <div className="flex flex-wrap justify-end gap-2">
                                                                {!service?.customParams?.additionalDetails && (
                                                                    <Button size="sm" color="secondary" onClick={() => openAdditionalDetails(service)}>
                                                                        Add Additional Detail
                                                                    </Button>
                                                                )}
                                                                {service?.bookingStatus && service?.bookingStatus !== "pending" && (
                                                                    <Button size="sm" color="primary" onClick={() => openPaymentModal(service)}>
                                                                        Add Payment
                                                                    </Button>
                                                                )}
                                                            </div>

                                                            {payments.length > 0 && (
                                                                <div className="rounded-xl border border-secondary bg-secondary p-4">
                                                                    <div className="mb-3 flex items-center justify-between">
                                                                        <div className="text-sm font-semibold text-primary">Payments</div>
                                                                        <Badge size="sm" color="success">
                                                                            {payments.length}
                                                                        </Badge>
                                                                    </div>
                                                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                                                                        {payments.map((payment) => (
                                                                            <div
                                                                                key={getId(payment)}
                                                                                className="group relative rounded-lg border border-secondary bg-primary p-4 shadow-xs transition hover:border-brand-solid"
                                                                            >
                                                                                <div className="space-y-1">
                                                                                    <div className="flex items-start justify-between gap-3">
                                                                                        <div className="text-xs font-semibold text-tertiary">
                                                                                            {formatShortDateTime(payment.paymentDate)}
                                                                                        </div>
                                                                                        <div className="text-sm font-semibold text-primary">₹{payment.amount}</div>
                                                                                    </div>
                                                                                    <div className="text-xs text-tertiary">Receipt: {payment.receiptNo || "-"}</div>
                                                                                    <div className="text-xs text-tertiary">{payment?.paymentStore?.title || "Payment Mode"}</div>
                                                                                    <div className="text-xs text-tertiary">{payment?.remarks || "-"}</div>
                                                                                </div>
                                                                                <div className="absolute right-3 bottom-3 flex gap-2 opacity-0 transition group-hover:opacity-100">
                                                                                    <ButtonUtility
                                                                                        icon={Edit01}
                                                                                        size="sm"
                                                                                        color="success"
                                                                                        tooltip="Edit Payments"
                                                                                        onClick={() => openPaymentModal(service, payment)}
                                                                                    />
                                                                                    <ButtonUtility
                                                                                        icon={Trash01}
                                                                                        size="sm"
                                                                                        color="error"
                                                                                        tooltip="Delete Payments"
                                                                                        onClick={() => confirmDeletePayment(payment)}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}

                                        <Button size="sm" color="primary" iconLeading={Plus} onClick={() => openServiceModal()}>
                                            Add Booking Service
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Tabs.Panel>

                    <Tabs.Panel id="servicePayments">
                        <div className="rounded-xl border border-secondary bg-primary">
                            <SectionHeader title="Service Payments" />
                            <div className="p-4">
                                {servicePaymentsList.length === 0 ? (
                                    <div className="text-sm text-tertiary">No service payments found.</div>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <table className="w-full border-collapse text-left text-sm">
                                            <thead>
                                                <tr className="border-b border-secondary text-xs uppercase text-tertiary">
                                                    <th className="px-3 py-2">#</th>
                                                    <th className="px-3 py-2">Date</th>
                                                    <th className="px-3 py-2">Receipt</th>
                                                    <th className="px-3 py-2">Amount</th>
                                                    <th className="px-3 py-2">Mode</th>
                                                    <th className="px-3 py-2">Service</th>
                                                    <th className="px-3 py-2">Remarks</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {servicePaymentsList.map((payment, idx) => (
                                                    <tr key={getId(payment)} className="border-b border-secondary">
                                                        <td className="px-3 py-2">{idx + 1}</td>
                                                        <td className="px-3 py-2">{formatShortDateTime(payment.paymentDate)}</td>
                                                        <td className="px-3 py-2">{payment.receiptNo || "-"}</td>
                                                        <td className="px-3 py-2">₹{payment.amount}</td>
                                                        <td className="px-3 py-2">{payment?.paymentStore?.title || "-"}</td>
                                                        <td className="px-3 py-2">{payment?.packageBooking?.title || "-"}</td>
                                                        <td className="px-3 py-2">{payment?.remarks || "-"}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Tabs.Panel>

                    <Tabs.Panel id="assignmentDetails">
                        <AssignmentDetails data={assignmentData} paymentStores={paymentStores} />
                    </Tabs.Panel>
                </Tabs>
            </div>

            <ModalOverlay isOpen={serviceModalOpen} onOpenChange={setServiceModalOpen}>
                <Modal>
                    <Dialog>
                        {({ close }) => (
                            <div className="relative w-xl min-w-[300px] rounded-xl bg-primary p-5 ring-1 ring-secondary">
                                <CloseButton onPress={close} className="absolute right-4 top-4" size="sm" />
                                <div className="space-y-4">
                                    <div>
                                        <h2 className="text-lg font-semibold text-primary">{editingService ? "Edit Service" : "Add Service"}</h2>
                                    </div>
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <Input
                                            label="Booking Date"
                                            type="date"
                                            value={serviceForm.bookingDate}
                                            onChange={(value) => setServiceForm((prev: any) => ({ ...prev, bookingDate: value }))}
                                            isInvalid={!!serviceErrors.bookingDate}
                                            hint={serviceErrors.bookingDate}
                                        />
                                        <ComboBox
                                            label="Service"
                                            placeholder="Search service"
                                            selectedKey={serviceForm.bookingsType || ""}
                                            onSelectionChange={(key) => setServiceForm((prev: any) => ({ ...prev, bookingsType: key ? String(key) : "" }))}
                                            items={resolvedBookingTypes.map((item) => ({ id: getId(item), label: item.title }))}
                                        >
                                            {(item) => <SelectItem id={item.id}>{item.label}</SelectItem>}
                                        </ComboBox>
                                        <Input
                                            label="Amount"
                                            type="number"
                                            value={serviceForm.amount}
                                            onChange={(value) => setServiceForm((prev: any) => ({ ...prev, amount: value }))}
                                            isInvalid={!!serviceErrors.amount}
                                            hint={serviceErrors.amount}
                                        />
                                        <DateInputWithTime
                                            label="Start Date"
                                            fieldName="startDate"
                                            hasTimeField="hasStartTime"
                                            formData={serviceForm}
                                            handleChange={handleServiceFormChange}
                                            errors={serviceErrors}
                                        />
                                        <DateInputWithTime
                                            label="End Date"
                                            fieldName="endDate"
                                            hasTimeField="hasEndTime"
                                            formData={serviceForm}
                                            handleChange={handleServiceFormChange}
                                            errors={serviceErrors}
                                        />
                                        <ComboBox
                                            label="Vendor"
                                            placeholder="Search vendor"
                                            selectedKey={serviceForm.vendor || ""}
                                            onSelectionChange={(key) => setServiceForm((prev: any) => ({ ...prev, vendor: key ? String(key) : "" }))}
                                            items={filteredVendors.map((item) => ({ id: getId(item), label: item.title || item.name }))}
                                        >
                                            {(item) => <SelectItem id={item.id}>{item.label}</SelectItem>}
                                        </ComboBox>
                                    </div>
                                    {selectedBookingType?.customParams?.additionalBookingDetails?.length > 0 && (
                                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                            {selectedBookingType.customParams.additionalBookingDetails.map((field: any) => {
                                                console.log(field);
                                                const fieldKey = field.key;
                                                const fieldLabel = field.value;
                                                const fieldType = field.type || "Text";
                                                const fieldValue = serviceForm?.customParams?.additionalBookingDetails?.[fieldKey] || "";

                                                const handleChange = (value: any) =>
                                                    setServiceForm((prev: any) => ({
                                                        ...prev,
                                                        customParams: {
                                                            ...prev.customParams,
                                                            additionalBookingDetails: {
                                                                ...(prev.customParams?.additionalBookingDetails || {}),
                                                                [fieldKey]: value,
                                                            },
                                                        },
                                                    }));

                                                if (fieldType === "textarea") {
                                                    return (
                                                        <div key={fieldKey} className="md:col-span-2">
                                                            <TextArea
                                                                label={fieldLabel}
                                                                value={fieldValue}
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                    );
                                                }

                                                if (fieldType === "textEditor") {
                                                    return (
                                                        <div key={fieldKey} className="flex flex-col gap-1.5 md:col-span-2">
                                                            <div className="text-sm font-medium text-primary">{fieldLabel}</div>
                                                            <RichTextEditor value={fieldValue} onChange={handleChange} />
                                                        </div>
                                                    );
                                                }
                                                if (fieldType === "date" || fieldType === "Date") {
                                                    return (
                                                        <div key={fieldKey} className="flex flex-col gap-1.5">
                                                            <div className="text-sm font-medium text-primary">{fieldLabel}</div>
                                                            <DatePicker
                                                                value={fieldValue ? parseDate(fieldValue) : null}
                                                                onChange={(date) => handleChange(date ? date.toString() : "")}
                                                            />
                                                        </div>
                                                    );
                                                }

                                                if (fieldType === "time" || fieldType === "Time") {
                                                    return (
                                                        <div key={fieldKey} className="flex flex-col gap-1.5">
                                                            <div className="text-sm font-medium text-primary">{fieldLabel}</div>
                                                            <Input
                                                                type="time"
                                                                value={fieldValue}
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                    );
                                                }

                                                // Validation for Email
                                                let isInvalid = false;
                                                let hint = "";
                                                if (fieldType === "email" && fieldValue) {
                                                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                                                    if (!emailRegex.test(fieldValue)) {
                                                        isInvalid = true;
                                                        hint = "Invalid email address";
                                                    }
                                                }

                                                // Handler for Number to restrict input
                                                const handleNumberChange = (value: string) => {
                                                    if (/^\d*\.?\d*$/.test(value)) {
                                                        handleChange(value);
                                                    }
                                                };

                                                return (
                                                    <Input
                                                        key={fieldKey}
                                                        label={fieldLabel}
                                                        type={fieldType.toLowerCase()}
                                                        value={fieldValue}
                                                        onChange={fieldType === "number" ? handleNumberChange : handleChange}
                                                        isInvalid={isInvalid}
                                                        hint={hint}
                                                        onKeyDown={(e) => {
                                                            if (fieldType === "number") {
                                                                const allowedKeys = [
                                                                    "Backspace", "Delete", "Tab", "Enter", "Escape", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"
                                                                ];
                                                                if (allowedKeys.includes(e.key)) return;
                                                                if (e.ctrlKey || e.metaKey) return;
                                                                if (e.key === "." && !String(fieldValue).includes(".")) return;
                                                                if (!/^[0-9]$/.test(e.key)) {
                                                                    e.preventDefault();
                                                                }
                                                            }
                                                        }}
                                                    />
                                                );
                                            })}
                                        </div>
                                    )}
                                    <div className="flex justify-end gap-3">
                                        <Button color="secondary" onClick={close}>
                                            Cancel
                                        </Button>
                                        <Button color="primary" onClick={saveService} disabled={saving}>
                                            {saving ? "Saving..." : "Save"}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </Dialog>
                </Modal>
            </ModalOverlay>

            <ModalOverlay isOpen={paymentModalOpen} onOpenChange={setPaymentModalOpen}>
                <Modal>
                    <Dialog>
                        {({ close }) => (
                            <div className="relative w-full rounded-xl bg-primary p-5 ring-1 ring-secondary">
                                <CloseButton onPress={close} className="absolute right-4 top-4" size="sm" />
                                <div className="space-y-4">
                                    <div>
                                        <h2 className="text-lg font-semibold text-primary">{editingPayment ? "Edit Payment" : "Add Payment"}</h2>
                                    </div>
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <Input
                                            label="Payment Date"
                                            type="datetime-local"
                                            value={paymentForm.paymentDate}
                                            onChange={(value) => setPaymentForm((prev: any) => ({ ...prev, paymentDate: value }))}
                                            isInvalid={!!paymentErrors.paymentDate}
                                            hint={paymentErrors.paymentDate}
                                        />
                                        <Input
                                            label="Amount"
                                            type="number"
                                            value={paymentForm.amount}
                                            onChange={(value) => {
                                                setPaymentMessage("");
                                                setPaymentForm((prev: any) => ({ ...prev, amount: value }));
                                            }}
                                            isInvalid={!!paymentErrors.amount}
                                            hint={paymentErrors.amount}
                                        />
                                        <Select
                                            label="Payment Mode"
                                            selectedKey={paymentForm.paymentStore || ""}
                                            onSelectionChange={(key) => setPaymentForm((prev: any) => ({ ...prev, paymentStore: String(key) }))}
                                            items={resolvedPaymentStores.map((item) => ({ id: getId(item), label: item.title }))}
                                        >
                                            {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                        </Select>
                                        {Number(paymentForm.amount || 0) < Number(paymentService?.pendingAmount ?? paymentService?.amount ?? 0) && (
                                            <Input
                                                label="Next Payment Date"
                                                type="datetime-local"
                                                value={paymentForm.nextPaymentDate}
                                                onChange={(value) => setPaymentForm((prev: any) => ({ ...prev, nextPaymentDate: value }))}
                                            />
                                        )}
                                    </div>
                                    <TextArea
                                        label="Remarks"
                                        value={paymentForm.remarks}
                                        onChange={(value) => setPaymentForm((prev: any) => ({ ...prev, remarks: value }))}
                                        hint={paymentErrors.remarks}
                                        isInvalid={!!paymentErrors.remarks}
                                    />
                                    {paymentMessage && <div className="text-sm text-error-text">{paymentMessage}</div>}
                                    <div className="space-y-2">
                                        {paymentForm.paymentImg && typeof paymentForm.paymentImg === "string" ? (
                                            <div className="flex items-center justify-between rounded-lg border border-secondary bg-secondary p-2 text-xs text-tertiary">
                                                <span className="truncate">{paymentForm.paymentImg}</span>
                                                <Button size="sm" color="secondary-destructive" onClick={() => setPaymentForm((prev: any) => ({ ...prev, paymentImg: "" }))}>
                                                    Remove
                                                </Button>
                                            </div>
                                        ) : (
                                            <input
                                                type="file"
                                                className="w-full rounded-lg border border-secondary bg-primary p-2 text-sm text-tertiary"
                                                onChange={(event) => {
                                                    const file = event.target.files?.[0];
                                                    if (file) setPaymentForm((prev: any) => ({ ...prev, paymentImg: file }));
                                                }}
                                            />
                                        )}
                                    </div>
                                    <div className="flex justify-end gap-3">
                                        <Button color="secondary" onClick={close}>
                                            Cancel
                                        </Button>
                                        <Button color="primary" onClick={savePayment} disabled={saving}>
                                            {saving ? "Saving..." : "Save"}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </Dialog>
                </Modal>
            </ModalOverlay>

            <Tmodal
                isOpen={confirmDeleteOpen}
                onClose={() => setConfirmDeleteOpen(false)}
                onConfirm={handleDeleteService}
                header="Confirm Deletion"
                content={<p className="text-md text-primary">Are you sure you want to delete this service?</p>}
            />

            <Tmodal
                isOpen={confirmPaymentDeleteOpen}
                onClose={() => setConfirmPaymentDeleteOpen(false)}
                onConfirm={handleDeletePayment}
                header="Confirm Deletion"
                content={<p className="text-md text-primary">Are you sure you want to delete this payment?</p>}
            />

            <Tmodal
                isOpen={whatsappPreviewOpen}
                onClose={() => setWhatsappPreviewOpen(false)}
                size="lg"
                header="Send WhatsApp"
                footerActions={
                    <div className="flex items-center gap-2">
                        <Button size="sm" color="secondary" iconLeading={FaCopy} onClick={copyWhatsappMessage}>
                            Copy Message
                        </Button>
                        <Button size="sm" color="primary" iconLeading={FaWhatsapp} onClick={sendWhatsApp}>
                            Send WhatsApp
                        </Button>
                    </div>
                }
                content={
                    <div className="space-y-4">
                        <Input
                            label="WhatsApp Number"
                            value={whatsappPhone}
                            onChange={(value) => {
                                setWhatsappPhone(value);
                                if (whatsappPhoneError) setWhatsappPhoneError(validateWhatsappPhone(value));
                            }}
                            isInvalid={!!whatsappPhoneError}
                            hint={whatsappPhoneError || "Default is customer mobile. You can edit before sending."}
                        />
                        <TextArea
                            label="Message Preview"
                            value={whatsappMessage}
                            onChange={(value) => setWhatsappMessage(String(value))}
                            rows={8}
                        />
                    </div>
                }
            />

            <ModalOverlay isOpen={additionalDetailsModalOpen} onOpenChange={setAdditionalDetailsModalOpen}>
                <Modal>
                    <Dialog>
                        {({ close }) => (
                            <div className="relative w-xl min-w-[300px] rounded-xl bg-primary p-5 ring-1 ring-secondary">
                                <CloseButton onPress={close} className="absolute right-4 top-4" size="sm" />
                                <div className="space-y-4">
                                    <div className="text-lg font-semibold text-primary">Additional Details</div>
                                    <div className="space-y-4">
                                        {additionalDetailsService?.bookingsType?.customParams?.additionalDetails?.map((field: any) => (
                                            <div key={field.key}>
                                                {field.type === "textEditor" ? (
                                                    <RichTextEditor
                                                        value={additionalDetailsService?.customParams?.additionalDetails?.[field.key] || ""}
                                                        onChange={(value) =>
                                                            setAdditionalDetailsService((prev: any) => ({
                                                                ...prev,
                                                                customParams: {
                                                                    ...prev.customParams,
                                                                    additionalDetails: {
                                                                        ...(prev.customParams?.additionalDetails || {}),
                                                                        [field.key]: value,
                                                                    },
                                                                },
                                                            }))
                                                        }
                                                    />
                                                ) : (
                                                    <Input
                                                        label={field.value}
                                                        value={additionalDetailsService?.customParams?.additionalDetails?.[field.key] || ""}
                                                        onChange={(value) =>
                                                            setAdditionalDetailsService((prev: any) => ({
                                                                ...prev,
                                                                customParams: {
                                                                    ...prev.customParams,
                                                                    additionalDetails: {
                                                                        ...(prev.customParams?.additionalDetails || {}),
                                                                        [field.key]: value,
                                                                    },
                                                                },
                                                            }))
                                                        }
                                                    />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex justify-end gap-3">
                                        <Button color="secondary" onClick={close}>
                                            Cancel
                                        </Button>
                                        <Button color="primary" onClick={saveAdditionalDetails} disabled={saving}>
                                            {saving ? "Saving..." : "Save"}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </Dialog>
                </Modal>
            </ModalOverlay>

            <ModalOverlay isOpen={bookingStatusModalOpen} onOpenChange={setBookingStatusModalOpen}>
                <Modal>
                    <Dialog>
                        {({ close }) => (
                            <div className="relative w-xl min-w-[300px] rounded-xl bg-primary p-5 ring-1 ring-secondary">
                                <CloseButton onPress={close} className="absolute right-4 top-4" size="sm" />
                                <div className="space-y-4">
                                    <div className="text-lg font-semibold text-primary">Update Booking Status</div>
                                    <Select
                                        label="Booking Status"
                                        selectedKey={bookingStatusService?.bookingStatus || "pending"}
                                        onSelectionChange={(key) =>
                                            setBookingStatusService((prev: any) => ({ ...prev, bookingStatus: String(key) }))
                                        }
                                        items={bookingStatusOptions}
                                    >
                                        {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                    </Select>
                                    <div className="flex justify-end gap-3">
                                        <Button color="secondary" onClick={close}>
                                            Cancel
                                        </Button>
                                        <Button color="primary" onClick={saveBookingStatus} disabled={saving}>
                                            {saving ? "Saving..." : "Save"}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </Dialog>
                </Modal>
            </ModalOverlay>
        </DefaultLayout>
    );
}
