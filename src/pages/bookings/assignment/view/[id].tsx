import { DefaultLayout } from "@/layouts/DefaultLayout";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import { AssignmentDetails, formatDateShort, formatDateShortSec, formatDateTime } from "@/components/application/assignment-details/assignment-details";
import { useStoreSnackbar } from "@/store/snackbar";
import { getAssignmentById } from "@/utils/services/assignmentService";
import { getPaymentStore } from "@/utils/services/paymentStoreService";
import { ArrowLeft, Edit01, Home04 } from "@untitledui/icons";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import * as XLSX from "xlsx";
import { FaEye, FaFileExcel } from "react-icons/fa";

const getId = (value: any) => String(value?.id ?? value?._id ?? value ?? "").trim();


export default function AssignmentViewPage() {
    const navigate = useNavigate();
    const params = useParams();
    const id = getId(params.id);
    const { showSnackbar } = useStoreSnackbar();

    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState<string | null>(null);
    const [paymentStores, setPaymentStores] = useState<any[]>([]);

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
                    populate: "agentName,hotelCategory,paymentStore,tokenPayment,company",
                });
                if (response?.error) {
                    throw new Error(response.error);
                }
                const resolved = response?.data ?? response;
                setData(resolved || null);
            } catch (error: any) {
                setLoadError(error?.message || "Failed to fetch assignment");
                showSnackbar({
                    title: "Error",
                    description: error?.message || "Failed to fetch assignment",
                    color: "danger",
                });
            } finally {
                setLoading(false);
            }
        };
        run();
    }, [id, showSnackbar]);

    useEffect(() => {
        const run = async () => {
            try {
                const response = await getPaymentStore();
                if (response?.error) {
                    throw new Error(response.error);
                }
                const resolved = response?.data ?? response;
                setPaymentStores(Array.isArray(resolved) ? resolved : []);
            } catch (error) {
                setPaymentStores([]);
            }
        };
        run();
    }, []);

    const exportToExcel = () => {
        if (!data) return;
        const paymentMode =
            paymentStores.find((item) => String(item.id ?? item._id) === String(data?.tokenPayment?.paymentStore))?.title || "";
        const stayDateLocation =
            data?.stayInformation
                ?.map((item: any) => `${item?.date ? formatDateShortSec(item.date) : ""}: ${item?.location || ""}`)
                .join(", ") || "";
        const sightseeing =
            data?.stayInformation?.map((item: any) => item?.sightSeeing).filter(Boolean).join(", ") || data?.siteSeeing || "";
        const idProofs = data?.idProof?.map((item: any) => `${item?.name} (${item?.number})`).join(", ") || "";
        const exportData = [
            {
                "Package ID": data?.packageId,
                "Agent Name": data?.agentName?.username || data?.agentName?.name || data?.agentName,
                "Lead Code": data?.leadCode,
                "Customer Name": data?.clientName,
                "Date of Booking": data?.bookingDate ? formatDateTime(data?.bookingDate) : "",
                "Travel Date / Event Date / Delivery Date": data?.tourDate ? formatDateShort(data?.tourDate) : "",
                "Home Location": data?.homeLocation,
                "Travel Location / Event Location": data?.travelLocation,
                "Package Amount": data?.packageCost,
                "Final Package Cost": data?.finalPackageCost,
                "Token Amount": data?.tokenPayment?.amount,
                "Payment Mode": paymentMode,
                "Contact Number": data?.mobile,
                "Alt Contact Number": data?.altContactNumber,
                Email: data?.email,
                Days: `${data?.noOfPackageNights || 0}N/${data?.noOfPackageDays || 0}D`,
                Adults: data?.noOfAdult,
                Kids: data?.noOfKids,
                Rooms: data?.noOfRooms,
                "Star Category / Event Category": data?.hotelCategory?.title,
                Meals: data?.selectedFood?.join(", "),
                "Car Seater": data?.carSeater,
                "Special Inclusion": data?.specialInclusion,
                "Stay Date & Location": stayDateLocation,
                "Wave Preposal": data?.wavePreposal,
                "Sightseeing / Event Discription / Material Discription": sightseeing,
                "Text for Camera Man Team": data?.textForCameraMan,
                "Text for Booking Team": data?.textForBookingTeam,
                "Text for Editing Team": data?.textForEditingTeam,
                "Pickup Location": data?.pickUpAddress,
                "Pickup Date": data?.pickUpDate ? formatDateShortSec(data?.pickUpDate) : "",
                "Pickup Time": data?.pickUpTime,
                "Drop Location": data?.dropAddress,
                "Drop Date": data?.dropDate ? formatDateShortSec(data?.dropDate) : "",
                "Drop Time": data?.dropTime,
                "ID Proof": idProofs,
            },
        ];
        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Booking Details");
        XLSX.writeFile(workbook, `Booking_${data?.packageId || "Details"}.xlsx`);
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
                <span className="px-1 py-0.5 text-primary">View</span>
            </div>
        </div>
    );

    if (loading) {
        return (
            <DefaultLayout>
                {breadcrumbs}
                <div className="space-y-4">
                    <div className="rounded-xl border border-secondary bg-primary p-4">
                        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                            <div className="space-y-2">
                                <div className="h-6 w-40 animate-pulse rounded bg-secondary" />
                                <div className="flex flex-wrap gap-2">
                                    {[1, 2, 3].map((item) => (
                                        <div key={item} className="h-5 w-20 animate-pulse rounded-full bg-secondary" />
                                    ))}
                                </div>
                            </div>
                            <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row">
                                {[1, 2].map((item) => (
                                    <div key={item} className="h-9 w-24 animate-pulse rounded bg-secondary" />
                                ))}
                            </div>
                        </div>
                    </div>
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="rounded-xl border border-secondary bg-primary p-6">
                            <div className="mb-4 h-4 w-40 animate-pulse rounded bg-secondary" />
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5">
                                {[1, 2, 3, 4, 5].map((j) => (
                                    <div key={j} className="h-12 animate-pulse rounded bg-secondary" />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </DefaultLayout>
        );
    }

    if (loadError || !data) {
        return (
            <DefaultLayout>
                {breadcrumbs}
                <div className="rounded-xl border border-error-solid bg-error-bg p-6 text-error-text">
                    <p className="text-sm font-semibold">Error loading assignment</p>
                    <p className="text-sm">{loadError || "Assignment not found"}</p>
                    <Button className="mt-4" size="sm" color="secondary" onClick={() => navigate("/bookings/assignment")}>
                        Back
                    </Button>
                </div>
            </DefaultLayout>
        );
    }

    return (
        <DefaultLayout>
            {breadcrumbs}
            <div className="space-y-4">
                <div className="rounded-xl border border-secondary bg-primary p-4">
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                        <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                                <h2 className="text-lg font-semibold text-primary">Assignment</h2>
                                <Badge size="sm" color={data?.verify ? "success" : "warning"}>
                                    {data?.verify ? "Verified" : "Pending"}
                                </Badge>
                            </div>
                            <div className="flex flex-wrap items-center gap-2 text-xs text-tertiary">
                                <span className="rounded-full border border-secondary bg-secondary px-2 py-0.5 text-xs font-medium text-primary">
                                    {data?.packageId || "Package"}
                                </span>
                                {data?.leadCode && (
                                    <span className="rounded-full border border-secondary bg-secondary px-2 py-0.5 text-xs font-medium text-primary">
                                        Lead {data.leadCode}
                                    </span>
                                )}
                                 {data.clientName && (
                                    <span className="rounded-full border border-secondary bg-secondary px-2 py-0.5 text-xs font-medium text-primary">
                                        {data.clientName}
                                    </span>
                                )}
                                
                                {data?.agentName && (
                                    <span className="rounded-full border border-secondary bg-secondary px-2 py-0.5 text-xs font-medium text-primary">
                                        Agent: {data?.agentName?.username
                                            ? data.agentName.username.charAt(0).toUpperCase() + data.agentName.username.slice(1)
                                            : data?.agentName?.name || data?.agentName}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                             <Button color="secondary" size="sm" iconLeading={ArrowLeft} onClick={() => navigate("/bookings/assignment")}>
                                Back
                            </Button>
                      
                            <Button color="secondary" size="sm" iconLeading={FaFileExcel} onClick={exportToExcel}>
                                Export Excel
                            </Button>
                            <Button color="primary" size="sm" iconLeading={Edit01} onClick={() => navigate(`/bookings/assignment/edit/${id}`)}>
                                Edit
                            </Button>
                            {data?.verify && (
                                <Button
                                    color="primary"
                                    size="sm"
                                    iconLeading={FaEye}
                                    href={`/package-voucher/${id}`}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Package Vouchers
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

                <AssignmentDetails data={data} paymentStores={paymentStores} />

                <div className="flex flex-wrap justify-end gap-2">
                    <Button color="secondary" size="sm" iconLeading={ArrowLeft} onClick={() => navigate("/bookings/assignment")}>
                        Back
                    </Button>
                    <Button color="primary" size="sm" iconLeading={Edit01} onClick={() => navigate(`/bookings/assignment/edit/${id}`)}>
                        Edit
                    </Button>
                </div>
            </div>
        </DefaultLayout>
    );
}
