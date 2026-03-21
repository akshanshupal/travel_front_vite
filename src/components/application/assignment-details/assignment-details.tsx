import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { useMemo, useState } from "react";
import {
    FaBarcode,
    FaBed,
    FaBuilding,
    FaCalendarAlt,
    FaCar,
    FaCheck,
    FaEnvelope,
    FaEye,
    FaHashtag,
    FaIdCard,
    FaMapMarkerAlt,
    FaMoneyBillWave,
    FaPhoneAlt,
    FaStar,
    FaUserFriends,
    FaUtensils,
    FaWhatsapp,
} from "react-icons/fa";

export const formatDateTime = (dateStr?: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return "Invalid Date";
    const dateOptions: Intl.DateTimeFormatOptions = { day: "2-digit", month: "short", year: "2-digit" };
    const formattedDate = date.toLocaleDateString("en-GB", dateOptions).replace(/ /g, "-");
    const timeOptions: Intl.DateTimeFormatOptions = { hour: "numeric", minute: "2-digit", hour12: true };
    const formattedTime = date.toLocaleTimeString("en-US", timeOptions);
    return `${formattedDate}, ${formattedTime}`;
};

export const formatDateShortSec = (dateStr?: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return "Invalid Date";
    const day = String(date.getDate()).padStart(2, "0");
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[date.getMonth()];
    const year = String(date.getFullYear()).slice(-2);
    return `${day}-${month}-${year}`;
};

export const formatDateShort = (dateStr?: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return "Invalid Date";
    const options: Intl.DateTimeFormatOptions = { day: "2-digit", month: "short", year: "2-digit", timeZone: "UTC" };
    const [month, dayWithComma, year] = date.toLocaleDateString("en-US", options).split(" ");
    const day = dayWithComma.replace(",", "");
    return `${day}-${month}-${year}`;
};

const getPhoneHref = (value: any) => {
    if (!value) return "";
    const phone = String(value).trim();
    if (!phone) return "";
    return `tel:${phone.replace(/\s+/g, "")}`;
};

const isImageFile = (value?: string) => {
    if (!value) return false;
    const cleaned = value.split("?")[0]?.split("#")[0]?.toLowerCase() || "";
    return [".png", ".jpg", ".jpeg", ".webp", ".gif", ".bmp", ".svg"].some((ext) => cleaned.endsWith(ext));
};

const InfoBox = ({ label, value, icon }: { label: string; value?: any; icon?: React.ReactNode }) => {
    return (
        <div className="rounded-lg border border-secondary bg-secondary px-3 py-2">
            <div className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide text-tertiary">
                {icon && <span className="text-brand-solid">{icon}</span>}
                <span>{label}</span>
            </div>
            <div className="text-sm font-semibold text-primary">{value || "N/A"}</div>
        </div>
    );
};

const BooleanBox = ({ label, status, icon }: { label: string; status?: any; icon?: React.ReactNode }) => {
    return (
        <div className="rounded-lg border border-secondary bg-secondary px-3 py-2">
            <div className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide text-tertiary">
                {icon && <span className="text-brand-solid">{icon}</span>}
                <span>{label}</span>
            </div>
            <Badge size="sm" color={status ? "success" : "error"}>
                {status ? "Yes" : "No"}
            </Badge>
        </div>
    );
};

const SectionHeader = ({ title, icon }: { title: string; icon?: React.ReactNode }) => {
    return (
        <div className="flex items-center gap-2 border-b border-secondary bg-secondary px-4 py-2 text-xs font-semibold uppercase tracking-wide text-tertiary">
            {icon}
            <span>{title}</span>
        </div>
    );
};

const SectionSubHeader = ({ title, icon }: { title: string; icon?: React.ReactNode }) => {
    return (
        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-tertiary">
            {icon && <span className="text-brand-solid">{icon}</span>}
            <span>{title}</span>
        </div>
    );
};

const TextPanel = ({ title, icon, value }: { title: string; icon?: React.ReactNode; value?: any }) => {
    return (
        <div className="rounded-lg border border-secondary bg-secondary p-3">
            <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-tertiary">
                {icon && <span className="text-brand-solid">{icon}</span>}
                <span>{title}</span>
            </div>
            <div className="text-xs text-tertiary">{value || "N/A"}</div>
        </div>
    );
};

const PhoneValue = ({ value }: { value?: any }) => {
    const href = getPhoneHref(value);
    return (
        <div className="flex items-center justify-between gap-2">
            <span>{value || "N/A"}</span>
            {href && (
                <Button size="sm" color="secondary" className="data-icon-only:p-1.5" href={href} iconLeading={FaPhoneAlt} aria-label={`Call ${value}`} />
            )}
        </div>
    );
};

const ViewFileButton = ({ href }: { href: string }) => {
    const showPreview = isImageFile(href);
    const [preview, setPreview] = useState<{ top: number; left: number; url: string } | null>(null);

    const handleEnter = (event: React.MouseEvent<HTMLDivElement>) => {
        if (!showPreview) return;
        const rect = event.currentTarget.getBoundingClientRect();
        const width = 300;
        const height = 300;
        const margin = 8;
        const left = Math.min(rect.right + margin, window.innerWidth - width - margin);
        const top = Math.min(Math.max(rect.top + rect.height / 2 - height / 2, margin), window.innerHeight - height - margin);
        setPreview({ top, left, url: href });
    };

    const handleLeave = () => {
        if (!showPreview) return;
        setPreview(null);
    };

    return (
        <div className="inline-flex" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
            <Button size="sm" color="secondary" href={href} target="_blank" rel="noreferrer">
                View File
            </Button>
            {preview && (
                <div className="pointer-events-none fixed z-50 h-[300px] w-[300px] rounded-md border border-secondary bg-primary p-2 shadow-lg" style={{ top: preview.top, left: preview.left }}>
                    <img src={preview.url} alt="Preview" className="h-full w-full rounded object-contain" />
                </div>
            )}
        </div>
    );
};

type AssignmentDetailsProps = {
    data: any;
    paymentStores?: any[];
};

export const AssignmentDetails = ({ data, paymentStores = [] }: AssignmentDetailsProps) => {
    const computedTaxAmount = useMemo(() => {
        if (!data?.packageCost || data?.taxes === undefined || data?.taxes === null) return null;
        const cost = Number(data.packageCost);
        const taxes = Number(data.taxes);
        if (Number.isNaN(cost) || Number.isNaN(taxes)) return null;
        return ((cost * taxes) / 100).toFixed(2);
    }, [data]);

    if (!data) {
        return <div className="rounded-xl border border-secondary bg-primary p-4 text-sm text-tertiary">No assignment data found.</div>;
    }

    return (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="space-y-4 lg:col-span-2">
                <div className="rounded-xl border border-secondary bg-primary">
                    <SectionHeader title="Booking Details" icon={<FaBuilding />} />
                    <div className="grid grid-cols-1 gap-3 px-4 py-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        <InfoBox label="Company Name" value={data?.company?.name} icon={<FaBuilding />} />
                        <InfoBox label="Package ID" value={data?.packageId} icon={<FaBarcode />} />
                        <InfoBox
                            label="Agent Name"
                            value={
                                data?.agentName?.username
                                    ? data.agentName.username.charAt(0).toUpperCase() + data.agentName.username.slice(1)
                                    : data?.agentName?.name || data?.agentName
                            }
                            icon={<FaUserFriends />}
                        />
                        <InfoBox label="Lead Code" value={data?.leadCode} icon={<FaHashtag />} />
                        <InfoBox label="Lead Date" value={formatDateShortSec(data?.leadDate)} icon={<FaCalendarAlt />} />
                        <InfoBox label="Booking Date and Time" value={formatDateTime(data?.bookingDate)} icon={<FaCalendarAlt />} />
                        <InfoBox label="Travel Date" value={formatDateShort(data?.tourDate)} icon={<FaCalendarAlt />} />
                        <InfoBox label="Package Amount" value={data?.packageCost} icon={<FaMoneyBillWave />} />
                        <InfoBox label="Taxes" value={computedTaxAmount !== null ? `${computedTaxAmount} (${data?.taxes}%)` : "N/A"} icon={<FaMoneyBillWave />} />
                        <InfoBox label="Final Package Cost" value={data?.finalPackageCost} icon={<FaMoneyBillWave />} />
                        <InfoBox
                            label="Payment Mode"
                            value={paymentStores.find((item) => String(item.id ?? item._id) === String(data?.tokenPayment?.paymentStore))?.title || ""}
                            icon={<FaMoneyBillWave />}
                        />
                    </div>

                    {data?.tokenPayment && (
                        <div className="px-4 pb-4">
                            <div className="mb-2">
                                <SectionSubHeader title="Payment Info" icon={<FaIdCard />} />
                            </div>
                            <div className="overflow-x-auto rounded-lg border border-secondary">
                                <table className="min-w-full divide-y divide-secondary text-sm text-primary">
                                    <thead className="bg-secondary">
                                        <tr>
                                            <th className="px-3 py-2 text-left text-xs font-semibold">Date</th>
                                            <th className="px-3 py-2 text-left text-xs font-semibold">Token Amount</th>
                                            <th className="px-3 py-2 text-left text-xs font-semibold">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-secondary">
                                        <tr className="hover:bg-primary_hover">
                                            <td className="px-3 py-2">{formatDateTime(data?.tokenPayment?.paymentDate) || "N/A"}</td>
                                            <td className="px-3 py-2">{data?.tokenPayment?.amount || "N/A"}</td>
                                            <td className="px-3 py-2">
                                                {data?.tokenPayment?.paymentImg ? <ViewFileButton href={data?.tokenPayment?.paymentImg} /> : <span className="text-tertiary">No File</span>}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>

                <div className="rounded-xl border border-secondary bg-primary">
                    <SectionHeader title="Customer Details" icon={<FaUserFriends />} />
                    <div className="grid grid-cols-1 gap-3 px-4 py-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        <InfoBox label="Customer Name" value={data?.clientName} icon={<FaUserFriends />} />
                        <InfoBox label="Mobile" value={<PhoneValue value={data?.mobile} />} icon={<FaPhoneAlt />} />
                        <InfoBox label="Alt Contact Number" value={<PhoneValue value={data?.altContactNumber} />} icon={<FaPhoneAlt />} />
                        <InfoBox label="Email" value={data?.email} icon={<FaEnvelope />} />
                        <InfoBox label="Home Location" value={data?.homeLocation} icon={<FaMapMarkerAlt />} />
                        <InfoBox
                            label="Adults & Kids"
                            value={`${data?.noOfAdult || 0} ${data?.noOfAdult == 1 ? "Adult" : "Adults"}${
                                data?.noOfKids > 0 ? ` & ${data.noOfKids} ${data.noOfKids == 1 ? "Kid" : "Kids"} [${data.kidsAges?.join(", ")}]` : ""
                            }`}
                            icon={<FaUserFriends />}
                        />
                    </div>

                    {Array.isArray(data?.idProof) && data?.idProof.length > 0 && (
                        <div className="px-4 pb-4">
                            <div className="mb-2">
                                <SectionSubHeader title="ID Proofs" icon={<FaIdCard />} />
                            </div>
                            <div className="overflow-x-auto rounded-lg border border-secondary">
                                <table className="min-w-full divide-y divide-secondary text-sm text-primary">
                                    <thead className="bg-secondary">
                                        <tr>
                                            <th className="px-3 py-2 text-left text-xs font-semibold">ID Type</th>
                                            <th className="px-3 py-2 text-left text-xs font-semibold">ID Number</th>
                                            <th className="px-3 py-2 text-left text-xs font-semibold">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-secondary">
                                        {data.idProof.map((item: any, index: number) => (
                                            <tr key={index} className="hover:bg-primary_hover">
                                                <td className="px-3 py-2 capitalize">{item?.name || "N/A"}</td>
                                                <td className="px-3 py-2">{item?.number || "N/A"}</td>
                                                <td className="px-3 py-2">{item?.file ? <ViewFileButton href={item?.file} /> : <span className="text-tertiary">No File</span>}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>

                <div className="rounded-xl border border-secondary bg-primary">
                    <SectionHeader title="Travel Details" icon={<FaCar />} />
                    <div className="grid grid-cols-1 gap-3 px-4 py-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        <InfoBox label="Travel Location" value={data?.travelLocation} icon={<FaMapMarkerAlt />} />
                        <InfoBox label="Package Duration" value={`${data?.noOfPackageDays || 0} Days & ${data?.noOfPackageNights || 0} Nights`} icon={<FaCalendarAlt />} />
                        <InfoBox label="Package Category" value={data?.hotelCategory?.title} />
                        <InfoBox label="Food" value={Array.isArray(data?.selectedFood) ? data.selectedFood.join(", ") : data?.selectedFood} icon={<FaUtensils />} />
                        <InfoBox label="Car Seater" value={data?.carSeater} icon={<FaCar />} />
                        <InfoBox label="No of Rooms" value={data?.noOfRooms} icon={<FaBed />} />
                    </div>

                    {Array.isArray(data?.stayInformation) && data?.stayInformation.length > 0 && (
                        <div className="px-4 pb-4">
                            <div className="mb-2">
                                <SectionSubHeader title="Stay Information" icon={<FaBed />} />
                            </div>
                            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                                {data.stayInformation
                                    .filter((item: any) => item?.location)
                                    .map((item: any, index: number) => (
                                        <div key={index} className="rounded-lg border border-secondary bg-secondary p-3">
                                            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-tertiary">
                                                <span className="rounded-full border border-secondary bg-primary px-2 py-0.5 text-xs font-medium text-primary">
                                                    {formatDateShortSec(item?.date) || "N/A"}
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

                    {data?.stayInformation?.some((item: any) => item?.sightSeeing) ? (
                        <div className="px-4 pb-4">
                            <div className="mb-2">
                                <SectionSubHeader title="Sight Seeing" icon={<FaEye />} />
                            </div>
                            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                {data?.stayInformation?.map((item: any, index: number) => (
                                    <div key={index} className="rounded-lg border border-secondary bg-secondary p-3">
                                        <div className="text-xs font-semibold text-primary">
                                            Day {index + 1} : {formatDateShortSec(item?.date) || "N/A"}
                                        </div>
                                        <div className="mt-1 text-xs text-tertiary">{item?.sightSeeing || "N/A"}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        data?.siteSeeing && (
                            <div className="px-4 pb-4">
                                <div className="mb-2">
                                    <SectionSubHeader title="Sight Seeing" icon={<FaEye />} />
                                </div>
                                <div className="rounded-lg border border-secondary bg-secondary p-3 text-xs text-tertiary">{data?.siteSeeing || "N/A"}</div>
                            </div>
                        )
                    )}

                    <div className="grid grid-cols-1 gap-3 px-4 pb-4 md:grid-cols-2">
                        <TextPanel title="Text for Booking Team" icon={<FaUserFriends />} value={data?.textForBookingTeam} />
                        <TextPanel title="Special Inclusion" icon={<FaStar />} value={data?.specialInclusion} />
                    </div>

                    <div className="grid grid-cols-1 gap-3 px-4 pb-4 md:grid-cols-2">
                        <div className="rounded-lg border border-secondary bg-secondary p-3">
                            <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-tertiary">
                                <FaCar /> Pickup Details
                            </div>
                            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                                <InfoBox label="Address" value={data?.pickUpAddress} icon={<FaMapMarkerAlt />} />
                                <InfoBox label="Date" value={`${formatDateShortSec(data?.pickUpDate)} ${data?.pickUpTime || ""}`} icon={<FaCalendarAlt />} />
                            </div>
                        </div>
                        <div className="rounded-lg border border-secondary bg-secondary p-3">
                            <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-tertiary">
                                <FaCar /> Drop Details
                            </div>
                            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                                <InfoBox label="Address" value={data?.dropAddress} icon={<FaMapMarkerAlt />} />
                                <InfoBox label="Date" value={`${formatDateShortSec(data?.dropDate)} ${data?.dropTime || ""}`} icon={<FaCalendarAlt />} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-4 lg:col-span-1 lg:col-start-3">
                <div className="rounded-xl border border-secondary bg-primary">
                    <SectionHeader title="Quick Summary" icon={<FaHashtag />} />
                    <div className="grid grid-cols-1 gap-3 px-4 py-4 sm:grid-cols-2 xl:grid-cols-1">
                        <InfoBox label="Customer" value={data?.clientName} icon={<FaUserFriends />} />
                        <InfoBox label="Mobile" value={<PhoneValue value={data?.mobile} />} icon={<FaPhoneAlt />} />
                        <InfoBox label="Travel Location" value={data?.travelLocation} icon={<FaMapMarkerAlt />} />
                        <InfoBox label="Travel Date" value={formatDateShort(data?.tourDate)} icon={<FaCalendarAlt />} />
                        <InfoBox label="Package Amount" value={data?.packageCost} icon={<FaMoneyBillWave />} />
                        <InfoBox label="Final Cost" value={data?.finalPackageCost} icon={<FaMoneyBillWave />} />
                    </div>
                </div>

                <div className="rounded-xl border border-secondary bg-primary">
                    <SectionHeader title="Contact & Links" icon={<FaEnvelope />} />
                    <div className="grid grid-cols-1 gap-3 px-4 py-4">
                        <InfoBox label="Email" value={data?.email} icon={<FaEnvelope />} />
                        <InfoBox label="Alt Contact" value={data?.altContactNumber} icon={<FaPhoneAlt />} />
                        <InfoBox
                            label="Itinerary"
                            value={
                                data?.savedItinerary ? (
                                    <Button size="sm" color="secondary" href={`/package-mail/${data.savedItinerary}`}>
                                        View Itinerary
                                    </Button>
                                ) : (
                                    "N/A"
                                )
                            }
                        />
                    </div>
                </div>
                <div className="rounded-xl border border-secondary bg-primary">
                    <SectionHeader title="Verification Details" icon={<FaCheck />} />
                    <div className="grid grid-cols-2 gap-3 px-4 py-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
                        <BooleanBox label="Call Done" status={data?.callDone} icon={<FaPhoneAlt />} />
                        <BooleanBox label="WhatsApp Sent" status={data?.whatsappSent} icon={<FaWhatsapp />} />
                        <BooleanBox label="Email Sent" status={data?.emailSent} icon={<FaEnvelope />} />
                        <BooleanBox label="Call Recording Checked" status={data?.agentCallRecordingChecked} icon={<FaCheck />} />
                        <InfoBox label="Verification Date" value={data?.verifyTime ? formatDateTime(data?.verifyTime) : "N/A"} icon={<FaCalendarAlt />} />
                        <InfoBox
                            label="Itinerary Link"
                            value={
                                data?.savedItinerary ? (
                                    <Button size="sm" color="secondary" href={`/package-mail/${data.savedItinerary}`}>
                                        View Itinerary
                                    </Button>
                                ) : (
                                    "N/A"
                                )
                            }
                        />
                        <div className="col-span-2">
                            <InfoBox label="Remark" value={data?.remark || "N/A"} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
