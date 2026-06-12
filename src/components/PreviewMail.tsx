import React, { useMemo, useRef } from "react";
import {
    FaBed,
    FaCalendarAlt,
    FaCheckCircle,
    FaEnvelope,
    FaHotel,
    FaInfoCircle,
    FaLink,
    FaPhoneAlt,
    FaRupeeSign,
    FaTimesCircle,
    FaUserTie,
    FaUsers,
} from "react-icons/fa";

// Placeholder for missing services/components
const getImageUrl = (url: any): string | undefined => {
    if (!url) return undefined;
    if (typeof url === "string") return url;
    if (url instanceof Blob) return URL.createObjectURL(url);
    return undefined;
};

const replaceClientName = (content: string, clientName: string) => {
    if (!content) return "";
    let replacedContent = content.replace(
        /\[\{CLIENT_NAME\}\]|\{CLIENT_NAME\}/g,
        clientName || "Guest"
    );
    return replacedContent.replace(/\{|\}/g, "");
};

interface PreviewMailProps {
    previewData: any;
}

export default function PreviewMail({ previewData }: PreviewMailProps) {
    const contentRef = useRef<HTMLDivElement>(null);
    console.log(11)
    

    const dateFormatter = new Intl.DateTimeFormat("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });

    const templateTitle = String(previewData?.templateId?.title || "").trim();
    const isTemplate2 = templateTitle.toLowerCase() === "template 2";

    const template2Summary = useMemo(() => {
        const tourDate =
            previewData?.tourDate && !isNaN(new Date(previewData.tourDate).getTime())
                ? dateFormatter.format(new Date(previewData.tourDate)).replace(/\s+/g, "-")
                : "";

        const adults = Number(previewData?.noOfAdults || 0);
        const kids = Number(previewData?.noOfKids || 0);
        const rooms = String(previewData?.noOfRooms || "");
        const hotelCategory = String(previewData?.hotelCategory?.title || "");
        const nights = Number(previewData?.noOfPackageNights || 0);
        const days = Number(previewData?.noOfPackageDays || 0);
        const duration =
            nights > 0 && days > 0
                ? `${nights} ${nights === 1 ? "Night" : "Nights"} • ${days} ${days === 1 ? "Day" : "Days"}`
                : nights > 0
                    ? `${nights} ${nights === 1 ? "Night" : "Nights"}`
                    : days > 0
                        ? `${days} ${days === 1 ? "Day" : "Days"}`
                        : "";

        const costRaw = previewData?.packageCost ? Number(previewData.packageCost) : NaN;
        const cost = Number.isFinite(costRaw) ? `₹${costRaw.toLocaleString("en-IN")}` : "";
        const taxes = String(previewData?.taxes || "");

        const execMobile = String(previewData?.salesExecutive?.mobile || "");
        const execName = String(previewData?.salesExecutive?.name || "");

        const hotline = String(previewData?.templateId?.hotlineNumber || "");
        const emails: string[] = Array.isArray(previewData?.templateId?.mailId)
            ? previewData.templateId.mailId.map((e: any) => String(e).trim()).filter(Boolean)
            : [];

        return {
            tourDate,
            adults,
            kids,
            rooms,
            hotelCategory,
            duration,
            cost,
            taxes,
            execMobile,
            execName,
            hotline,
            emails,
        };
    }, [dateFormatter, previewData]);

    return (
        <div className="bg-white text-black preview-mail-container">
            <div ref={contentRef}>
                {isTemplate2 ? (
                    <div className="bg-[#f7f6f1] text-black">
                        <div className="max-w-6xl mx-auto">
                            <div className="rounded-none md:rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden bg-gradient-to-br from-[#0b1720] via-[#0f2230] to-[#071018] text-white">
                                <div className="px-4 py-3 sm:px-5 sm:py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-white/10">
                                    <div className="flex items-center gap-3 min-w-0">
                                        {previewData?.templateId?.logo && (
                                            <img
                                                className="h-9 sm:h-10 w-auto bg-white/95 rounded-xl px-2 py-1.5 sm:px-2.5 sm:py-2"
                                                src={previewData.templateId.logo}
                                                alt="logo"
                                            />
                                        )}
                                        <div className="min-w-0">
                                            <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-semibold">
                                                Travel Proposal
                                            </div>
                                            <div className="text-base sm:text-xl font-extrabold leading-tight break-words sm:truncate">
                                                {previewData?.clientArea?.title || "Package"}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="w-full pt-2 border-t border-white/10 flex flex-col items-start gap-1 sm:w-auto sm:pt-0 sm:border-t-0 sm:flex-row sm:items-center sm:gap-4">
                                        {template2Summary.tourDate && (
                                            <div className="flex items-center gap-2 text-[11px] sm:text-xs font-semibold text-white/80">
                                                <FaCalendarAlt className="text-[#f27a21]" />
                                                <span>{template2Summary.tourDate}</span>
                                            </div>
                                        )}
                                        {previewData?.clientName && (
                                            <div className="flex items-center gap-2 text-[11px] sm:text-xs font-semibold text-white/80">
                                                <FaUserTie className="text-[#f27a21]" />
                                                <span className="truncate max-w-[150px] sm:max-w-[220px]">{previewData.clientName}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8">
                                <div className="rounded-2xl bg-white/5 border border-white/10 p-4 sm:p-5">
                                        <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-semibold">
                                            Snapshot
                                        </div>
                                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs">
                                            <div className="flex items-center gap-2 text-white/85">
                                                <FaUsers className="text-[#f27a21]" />
                                                <span>
                                                    {template2Summary.adults || "-"} Adults
                                                    {template2Summary.kids ? ` • ${template2Summary.kids} Kids` : ""}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 text-white/85">
                                                <FaHotel className="text-[#f27a21]" />
                                                <span className="break-words sm:truncate">{template2Summary.hotelCategory || "-"}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-white/85">
                                                <FaBed className="text-[#f27a21]" />
                                                <span>{template2Summary.rooms ? `${template2Summary.rooms} Rooms` : "-"}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-white/85">
                                                <FaInfoCircle className="text-[#f27a21]" />
                                                <span>{template2Summary.duration || "-"}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-white/85">
                                                <FaRupeeSign className="text-[#f27a21]" />
                                                <span>{template2Summary.cost || "-"}</span>
                                            </div>
                                        </div>
                                    </div>
                                       <div className="rounded-2xl bg-white/5 border border-white/10 p-4 sm:p-5">
                                        <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-semibold">
                                            Contacts
                                        </div>

                                        <div className="mt-4 space-y-3 text-xs">
                                            {template2Summary.execMobile && (
                                                <div className="flex items-center justify-between gap-4">
                                                    <div className="text-white/70">Sales Executive</div>
                                                    <div className="text-right">
                                                        <a className="font-semibold text-white" href={`tel:${template2Summary.execMobile}`}>
                                                            {template2Summary.execMobile}
                                                        </a>
                                                        {template2Summary.execName && (
                                                            <div className="text-[10px] text-white/60">{template2Summary.execName}</div>
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            {template2Summary.hotline && (
                                                <div className="flex items-center justify-between gap-4">
                                                    <div className="text-white/70">Hotline</div>
                                                    <a className="font-semibold text-white" href={`tel:${template2Summary.hotline}`}>
                                                        {template2Summary.hotline}
                                                    </a>
                                                </div>
                                            )}

                                            {template2Summary.emails.length > 0 && (
                                                <div className="pt-2 border-t border-white/10">
                                                    <div className="text-white/70 flex items-center gap-2">
                                                        <FaEnvelope className="text-[#f27a21]" />
                                                        <span>Email</span>
                                                    </div>
                                                    <div className="mt-2 space-y-1">
                                                        {template2Summary.emails.map((email) => (
                                                            <div key={email} className="truncate">
                                                                <a className="font-semibold text-white" href={`mailto:${email}`}>
                                                                    {email}
                                                                </a>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {previewData?.clientArea?.headerContent && (
                                        <div className="rounded-2xl bg-white/5 border border-white/10 p-4 sm:p-5">
                                            <div
                                                className="inner-html-box text-white"
                                                dangerouslySetInnerHTML={{
                                                    __html: replaceClientName(
                                                        previewData.clientArea.headerContent,
                                                        previewData.clientName,
                                                    ),
                                                }}
                                            />
                                        </div>
                                    )}

                                 

                                    {previewData?.templateId?.paymentType?.length > 0 && (
                                        <div className="rounded-2xl bg-white/5 border border-white/10 p-4 sm:p-5">
                                            <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-semibold">
                                                Payment Options
                                            </div>
                                            <div className="mt-4 flex flex-wrap gap-3">
                                                {previewData.templateId.paymentType.map((item: any, index: number) => (
                                                    <a
                                                        key={index}
                                                        href={item.url}
                                                        className="inline-flex items-center gap-2 rounded-xl bg-white/10 border border-white/10 px-2.5 py-1.5 sm:px-3 sm:py-2 hover:bg-white/15 transition-colors"
                                                    >
                                                        <img src={item.paymentImage} alt="bank" width={22} height={22} />
                                                        <span className="text-[11px] sm:text-xs font-semibold text-white/90">Pay</span>
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className="rounded-3xl overflow-hidden border border-white/10 bg-white/5">
                                                <div className="relative h-[180px] sm:h-[220px] md:h-[320px] w-full">
                                                    {previewData?.clientArea?.featureImg ? (
                                                        <img
                                                            alt={previewData?.clientArea?.title || "Package"}
                                                            referrerPolicy="no-referrer"
                                                            className="w-full h-full object-cover"
                                                            src={getImageUrl(previewData?.clientArea?.featureImg)}
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full bg-gradient-to-br from-[#1b2e3c] to-[#2c4456]" />
                                                    )}
                                                    <div className="absolute inset-0 bg-gradient-to-r from-[#071018]/70 via-transparent to-transparent" />
                                                    <div className="absolute left-4 bottom-4 right-4 sm:left-6 sm:bottom-6 sm:right-6">
                                                        <div className="inline-flex items-center gap-2 bg-[#f27a21] text-[#071018] rounded-xl px-3 py-2 text-xs font-extrabold">
                                                            <FaLink />
                                                            <span>Itinerary & Details</span>
                                                        </div>
                                                    </div>
                                                </div>
                                    </div>

                                    <div className="rounded-3xl border border-white/10 bg-white/5 p-4 sm:p-6">
                                        <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-semibold">
                                            Overview
                                        </div>
                                        <div
                                            className="inner-html-box text-white mt-4"
                                            dangerouslySetInnerHTML={{
                                                __html: previewData?.clientArea?.description || "",
                                            }}
                                        />
                                    </div>

                                            {previewData?.clientSites && (
                                                <div className="space-y-4">
                                                    <div className="flex items-center justify-between">
                                                        <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-semibold">
                                                            Day-wise Plan
                                                        </div>
                                                        <div className="text-xs font-semibold text-white/70">
                                                            {Array.isArray(previewData.clientSites) ? previewData.clientSites.length : 0} Days
                                                        </div>
                                                    </div>

                                                    <div className="space-y-4">
                                                        {(() => {
                                                            let currentDayCount = 1;
                                                            return previewData?.clientSites.map((day: any, index: number) => {
                                                                const dayTitle = `DAY ${currentDayCount}${!day.days || day.days == 1 ? "" : "-" + (+currentDayCount + day.days - 1)}: ${day.title}`;
                                                                const startIndex = currentDayCount;
                                                                currentDayCount += day.days;

                                                                return (
                                                                    <div
                                                                        key={day.id}
                                                                        className="rounded-3xl border border-white/10 bg-white/5 overflow-hidden"
                                                                    >
                                                                        <div className="px-4 py-3 sm:px-5 sm:py-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4 bg-white/5 border-b border-white/10">
                                                                            <div className="flex items-center gap-3 min-w-0">
                                                                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-[#f27a21] text-[#071018] flex items-center justify-center font-extrabold">
                                                                                    {startIndex}
                                                                                </div>
                                                                                <div className="min-w-0">
                                                                                    <div className="text-sm font-extrabold leading-snug break-words">{dayTitle}</div>
                                                                                    <div className="text-[11px] text-white/65 break-words sm:truncate">
                                                                                        {day.hotels && day.hotels.length > 0 ? `${day.hotels.length} Hotels` : " "}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="hidden sm:block text-[10px] font-semibold text-white/60">
                                                                                {index % 2 === 0 ? "Route" : "Experience"}
                                                                            </div>
                                                                        </div>

                                                                        {day.featureImg && (
                                                                            <img
                                                                                width="100%"
                                                                                className="w-full h-auto"
                                                                                src={day.featureImg}
                                                                                alt={`Image for ${day.title}`}
                                                                            />
                                                                        )}

                                                                        {day?.description && (
                                                                            <div
                                                                                className="inner-html-box w-full break-words p-4 sm:p-5 text-white"
                                                                                dangerouslySetInnerHTML={{
                                                                                    __html: replaceClientName(day.description, previewData.clientName),
                                                                                }}
                                                                            />
                                                                        )}

                                                                        {day.hotels && day.hotels.length > 0 && (
                                                                            <div className="px-4 pb-5 sm:px-5 sm:pb-6">
                                                                                <div className="flex items-center gap-2 text-white/70 text-xs font-semibold mb-3">
                                                                                    <FaHotel className="text-[#f27a21]" />
                                                                                    <span>Hotels</span>
                                                                                </div>
                                                                                <div className="flex flex-wrap gap-2">
                                                                                    {day.hotels.map((hotelName: any) => (
                                                                                        <a
                                                                                            key={hotelName.id}
                                                                                            href={`/hotel-images/${hotelName.id}`}
                                                                                            target="_blank"
                                                                                            className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/10 px-4 py-2 text-xs font-semibold hover:bg-white/15 transition-colors"
                                                                                        >
                                                                                            <FaLink className="text-[#f27a21]" />
                                                                                            <span className="truncate max-w-[160px] sm:max-w-[220px]">{hotelName.name}</span>
                                                                                        </a>
                                                                                    ))}
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                );
                                                            });
                                                        })()}
                                                    </div>
                                                </div>
                                            )}

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="rounded-3xl border border-white/10 bg-white/5 p-4 sm:p-6">
                                                    <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-semibold">
                                                        Package Inclusions
                                                    </div>
                                                    <ul className="mt-4 space-y-2 text-xs text-white/85">
                                                        {previewData?.hotelCategory && (
                                                            <li className="flex items-start gap-2">
                                                                <FaCheckCircle className="text-[#f27a21] mt-0.5 shrink-0" />
                                                                <span>Accommodation in {previewData.hotelCategory.title || "N/A"} Hotel/Similar.</span>
                                                            </li>
                                                        )}
                                                        {previewData?.noOfRooms && (
                                                            <li className="flex items-start gap-2">
                                                                <FaCheckCircle className="text-[#f27a21] mt-0.5 shrink-0" />
                                                                <span>{previewData.noOfRooms} Room with complimentary services.</span>
                                                            </li>
                                                        )}
                                                        {previewData?.selectedFood && previewData.selectedFood.length > 0 && (
                                                            <li className="flex items-start gap-2">
                                                                <FaCheckCircle className="text-[#f27a21] mt-0.5 shrink-0" />
                                                                <span>
                                                                    Meals: {previewData.selectedFood
                                                                        .map((meal: string) => meal.charAt(0).toUpperCase() + meal.slice(1))
                                                                        .join(", ")}{" "}
                                                                    Included as per the itinerary.
                                                                </span>
                                                            </li>
                                                        )}
                                                        {!previewData?.selectedTransport && (
                                                            <li className="flex items-start gap-2">
                                                                <FaCheckCircle className="text-[#f27a21] mt-0.5 shrink-0" />
                                                                <span>Pickup & Drop to nearest railway station/Bus stop or airport.</span>
                                                            </li>
                                                        )}
                                                        {previewData?.selectedTransport && previewData.selectedTransport.length > 0 && (
                                                            <>
                                                                {previewData?.pickUpLocation && (
                                                                    <li className="flex items-start gap-2">
                                                                        <FaCheckCircle className="text-[#f27a21] mt-0.5 shrink-0" />
                                                                        <span>Pickup from {previewData.pickUpLocation}</span>
                                                                    </li>
                                                                )}
                                                                {previewData?.dropLocation && previewData.selectedTransport[0] && (
                                                                    <li className="flex items-start gap-2">
                                                                        <FaCheckCircle className="text-[#f27a21] mt-0.5 shrink-0" />
                                                                        <span>Drop at {previewData.dropLocation}</span>
                                                                    </li>
                                                                )}
                                                            </>
                                                        )}
                                                        {previewData?.templateId?.packageInclusion &&  previewData.templateId.packageInclusion.value.length > 0 ? (
                                                            previewData.templateId.packageInclusion.value.map((item: any, index: number) => (
                                                                <li className="flex items-start gap-2" key={index}>
                                                                    <FaCheckCircle className="text-[#f27a21] mt-0.5 shrink-0"  />
                                                                    <span>{item}</span>
                                                                </li>
                                                            ))
                                                        ) : (
                                                        <>
                                                            <li className="flex items-start gap-2">
                                                                <FaCheckCircle className="text-[#f27a21] mt-0.5 shrink-0" />
                                                                <span>Transportation: All inter transfer & sightseeing as per itinerary by suitable vehicle.</span>
                                                            </li>
                                                            <li className="flex items-start gap-2">
                                                                <FaCheckCircle className="text-[#f27a21] mt-0.5 shrink-0" />
                                                                <span>Sightseeing: As outlined in the itinerary will be escorted with our representative.</span>
                                                            </li>
                                                        </>)}
                                                    </ul>
                                                </div>

                                                <div className="rounded-3xl border border-white/10 bg-white/5 p-4 sm:p-6">
                                                    <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-semibold">
                                                        Package Exclusions                                                        
                                                    </div>
                                                    <ul className="mt-4 space-y-2 text-xs text-white/85">
                                                        {previewData?.templateId?.packageExclusion &&  previewData.templateId.packageExclusion.value.length > 0 ? (
                                                            previewData.templateId.packageExclusion.value.map((item: any, index: number) => (
                                                                <li className="flex items-start gap-2" key={index}>
                                                                    <FaTimesCircle className="text-white/70 mt-0.5 shrink-0" />
                                                                    <span>{item}</span>
                                                                </li>
                                                            ))
                                                        ) : (
                                                        <>
                                                            <li className="flex items-start gap-2">
                                                                <FaTimesCircle className="text-white/70 mt-0.5 shrink-0" />
                                                                <span>Airfare, Train Fare, Insurance Premium etc.</span>
                                                            </li>
                                                            <li className="flex items-start gap-2">
                                                                <FaTimesCircle className="text-white/70 mt-0.5 shrink-0" />
                                                                <span>
                                                                    Personal expenses such as room service, internet charge, laundry, drink, fax, telephone call, optional activities, etc.
                                                                </span>
                                                            </li>
                                                            <li className="flex items-start gap-2">
                                                                <FaTimesCircle className="text-white/70 mt-0.5 shrink-0" />
                                                                <span>Gratuities, tips to guides, drivers, bellboys.</span>
                                                            </li>
                                                            <li className="flex items-start gap-2">
                                                                <FaTimesCircle className="text-white/70 mt-0.5 shrink-0" />
                                                                <span>Toll Tax, State Tax and Parking Charges.</span>
                                                            </li>
                                                            <li className="flex items-start gap-2">
                                                                <FaTimesCircle className="text-white/70 mt-0.5 shrink-0" />
                                                                <span>Goods and Services Tax.</span>
                                                            </li>
                                                            <li className="flex items-start gap-2">
                                                                <FaTimesCircle className="text-white/70 mt-0.5 shrink-0" />
                                                                <span>
                                                                    Entry Fee to Any Monument, Park, Museum, Monastery or any other visiting places.
                                                                </span>
                                                            </li>
                                                            <li className="flex items-start gap-2">
                                                                <FaTimesCircle className="text-white/70 mt-0.5 shrink-0" />
                                                                <span>Any expenses incurred due to exigencies. Package is not valid for Blackout Days.</span>
                                                            </li>
                                                            <li className="flex items-start gap-2">
                                                                <FaTimesCircle className="text-white/70 mt-0.5 shrink-0" />
                                                                <span>
                                                                    Expenses incurred due to mishap, landslide, strikes, political unrest etc. In such cases extra will be charged as per actual inclusions.
                                                                </span>
                                                            </li>
                                                        </>
                                                        )}
                                                    </ul>
                                                </div>
                                            </div>

                                            <div className="rounded-3xl border border-white/10 bg-white/5 p-4 sm:p-6">
                                                <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-semibold">
                                                    Package Details
                                                </div>

                                                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                                                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                                        <div className="text-white/60 font-semibold text-[10px] uppercase tracking-wider">Travellers</div>
                                                        <div className="mt-1 font-semibold text-white">
                                                            {previewData.noOfAdults && previewData.noOfKids && previewData.kidsAges ? (
                                                                <div>
                                                                    Package is for {previewData.noOfAdults}{" "}
                                                                    {Number(previewData.noOfAdults) === 1 ? "ADULT" : "ADULTS"}{" "}
                                                                    {previewData.noOfKids > 0 && (
                                                                        " & " +
                                                                        previewData.noOfKids +
                                                                        (Number(previewData.noOfKids) === 1 ? " KID" : " KIDS") +
                                                                        (previewData?.kidsAges?.length > 0
                                                                            ? " [" + previewData.kidsAges.map((age: any) => age + "yrs").join("/") + "]"
                                                                            : "")
                                                                    )}
                                                                </div>
                                                            ) : (
                                                                "-"
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                                        <div className="text-white/60 font-semibold text-[10px] uppercase tracking-wider">Travel Date</div>
                                                        <div className="mt-1 font-semibold text-white">
                                                            {template2Summary.tourDate ? `Travel Date: ${template2Summary.tourDate}` : "-"}
                                                        </div>
                                                    </div>

                                                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                                        <div className="text-white/60 font-semibold text-[10px] uppercase tracking-wider">Duration</div>
                                                        <div className="mt-1 font-semibold text-white">
                                                            {previewData.noOfPackageNights && previewData.noOfPackageDays ? (
                                                                <div>
                                                                    Package Duration: {previewData.noOfPackageNights > 0 && (
                                                                        `${previewData.noOfPackageNights} ${Number(previewData.noOfPackageNights) == 1 ? "NIGHT" : "NIGHTS"}`
                                                                    )}{" "}
                                                                    &{" "}
                                                                    {previewData.noOfPackageDays > 0 && (
                                                                        `${previewData.noOfPackageDays} ${Number(previewData.noOfPackageDays) == 1 ? "DAY" : "DAYS"}`
                                                                    )}
                                                                </div>
                                                            ) : (
                                                                "-"
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                                        <div className="text-white/60 font-semibold text-[10px] uppercase tracking-wider">Cost</div>
                                                        <div className="mt-1 font-semibold text-white">
                                                            {previewData.packageCost ? (
                                                                <div>Package COST: INR {previewData.packageCost} /- (This cost is valid for today)</div>
                                                            ) : (
                                                                "-"
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="mt-4 pt-4 border-t border-white/10 text-xs text-white/85 space-y-2">
                                                    <div>Selected Payment Mode: Online</div>
                                                    <div className="flex flex-wrap items-center gap-2">
                                                        <span>For Term & Conditions please visit</span>
                                                        <a
                                                            href={previewData?.templateId?.website}
                                                            className="text-[#f27a21] font-semibold break-all"
                                                        >
                                                            {previewData?.templateId?.website}
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>

                                            {previewData?.templateId?.disclaimer && (
                                                <div className="rounded-3xl border border-white/10 bg-white/5 p-4 sm:p-6">
                                                    <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-semibold">
                                                        Disclaimer
                                                    </div>
                                                    <div
                                                        className="mt-4 text-xs text-white/85"
                                                        dangerouslySetInnerHTML={{ __html: previewData?.templateId?.disclaimer }}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                ) : (
                <div className="container mx-auto bg-pink-100">
                    <div className="pt-5 pl-5 pb-5">
                        {previewData?.templateId?.logo && (
                            <img 
                                className="h-24 w-auto" 
                                src={previewData.templateId.logo} 
                                alt="logo" 
                                width={70} 
                                height={70} 
                            />
                        )}
                    </div>
                    <hr className="border border-gray-300" />
                    <h2 className="text-center font-extrabold text-xl text-blue-800 mt-5">
                        {previewData?.clientArea?.title}
                    </h2>
                    {previewData?.clientArea?.headerContent && (
                        <div className="pt-5 px-5">
                            <div 
                                className="inner-html-box"
                                dangerouslySetInnerHTML={{
                                    __html: replaceClientName(previewData.clientArea.headerContent, previewData.clientName),
                                }}
                            ></div>
                        </div>
                    )}
                    <div className="mt-5">
                        <img width="100%" src={getImageUrl(previewData?.clientArea?.featureImg)} alt="img1" />
                    </div>
                    <hr className="border border-gray-300 my-4" />
                    <div className="p-4">
                        <div
                            className="inner-html-box"
                            dangerouslySetInnerHTML={{
                                __html: previewData?.clientArea?.description || "",
                            }}
                        ></div>
                    </div>

                    <hr className="border border-gray-300 my-4" />

                    <div className="mt-4 ">
                        <img
                            width="100%"
                            src={getImageUrl(previewData?.clientArea?.featureImg)}
                            alt="img2"
                        />
                    </div>
                    
                    {previewData?.clientSites && (() => {
                        let currentDayCount = 1;
                        return previewData?.clientSites.map((day: any) => {
                            const dayTitle = `DAY ${currentDayCount}${!day.days || day.days == 1 ? "" : "-" + (+currentDayCount + day.days - 1)}: ${day.title}`;
                            currentDayCount += day.days;

                            return (
                                <div key={day.id} className="mt-5">
                                    <h2 className="bg-blue-900 mt-5 p-3 font-semibold text-xl text-white text-center">
                                        {dayTitle}
                                    </h2>
                                    {day.featureImg && (
                                        <img
                                            width="100%"
                                            src={day.featureImg}
                                            alt={`Image for ${day.title}`}
                                        />
                                    )}
                                    {day?.description && (
                                        <div 
                                            className="inner-html-box w-full break-words p-2 px-4"
                                            dangerouslySetInnerHTML={{
                                                __html: replaceClientName(day.description, previewData.clientName),
                                            }}
                                        ></div>
                                    )}

                                    {day.hotels && day.hotels.length > 0 && (
                                        <div>
                                            <div className="flex flex-wrap gap-1 justify-center">
                                                {day.hotels.map((hotelName: any) => (
                                                    <div
                                                        key={hotelName.id}
                                                        className="bg-blue-500 cursor-pointer hover:bg-blue-800 text-white font-semibold text-center p-2 m-2 rounded-md flex items-center justify-center"
                                                    >
                                                        <button className="w-36">
                                                            <a href={`/hotel-images/${hotelName.id}`} target="_blank">
                                                                {hotelName.name}
                                                            </a>
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        });
                    })()}

                    <hr className="border border-gray-300 my-4" />
           
                    <div className="grid sm:grid-cols-2 gap-3">
                        <div>
                            <h1 className="bg-blue-900 p-2 font-semibold text-xl text-white text-center">
                                PACKAGE INCLUSIONS
                            </h1>
                            <ul className="list-disc d-block p-6 space-y-2 text-black list-outside">
                                {previewData?.hotelCategory && (
                                    <li>
                                        Accommodation in {previewData.hotelCategory.title || "N/A"} Hotel/Similar.
                                    </li>
                                )}

                                {previewData?.noOfRooms && (
                                    <li>
                                        {previewData.noOfRooms} Room with complimentary services.
                                    </li>
                                )}
                                {previewData?.selectedFood && previewData.selectedFood.length > 0 && (
                                    <li>
                                        Meals: {previewData.selectedFood
                                            .map((meal: string) => meal.charAt(0).toUpperCase() + meal.slice(1))
                                            .join(", ")}{" "}
                                        Included as per the itinerary.
                                    </li>
                                )}

                                {!previewData?.selectedTransport && (
                                    <li>
                                        Pickup & Drop to nearest railway station/Bus stop or airport.
                                    </li>
                                )}

                                {previewData?.selectedTransport && previewData.selectedTransport.length > 0 && (
                                    <>
                                        {previewData?.pickUpLocation && (
                                            <li>
                                                <span>Pickup from {previewData.pickUpLocation}</span>
                                            </li>
                                        )}
                                        {previewData?.dropLocation && previewData.selectedTransport[0] && (
                                            <li>
                                                <span>Drop at {previewData.dropLocation}</span>
                                            </li>
                                        )}
                                    </>
                                )}

                                <li>
                                    Transportation: All inter transfer & sightseeing as per Itinerary As outlined in the itinerary by Suitable Vehicle.
                                </li>
                                <li>
                                    Sightseeing: As outlined in the itinerary will be escorted with our representative.
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h1 className="bg-blue-900 p-2 font-semibold text-xl text-white text-center">
                                PACKAGE EXCLUSIONS
                            </h1>
                            <ul className="list-disc d-block p-6 space-y-2 text-black list-outside">
                                <li>Airfare, Train Fare, Insurance Premium etc.</li>
                                <li>
                                    Personal expenses such as room service, internet charge,
                                    laundry, drink, fax, telephone
                                    call, optional activities, etc.
                                </li>
                                <li>Gratuities, tips to guides, drivers, bellboys.</li>
                                <li>Toll Tax, State Tax and Parking Charges.</li>
                                <li>Goods and Services Tax.</li>
                                <li>
                                    Entry Fee to Any Monument, Park, Museum, Monastery or
                                    any other visiting places.
                                </li>
                                <li>
                                    Any expenses incurred due to exigencies. Package is not 
                                     valid for Blackout Days.
                                </li>
                                <li>
                                    Expenses incurred due to mishap, landslide, strikes, political
                                    unrest etc. In such cases extra will be charged as per actual
                                    Inclusions.
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div>
                        <h1 className="bg-blue-900 mt-5 p-3 font-semibold text-xl text-white text-center">
                            PACKAGE DETAILS
                        </h1>
                        <ul className="list-disc d-block p-6 space-y-2 text-black list-outside">
                            {previewData.packageCost && previewData.noOfAdults && (
                                <div>
                                    <li>
                                   {previewData.noOfAdults &&
                                        previewData.noOfKids &&
                                        previewData.kidsAges && (
                                            <div className="mt-2">
                                            Package is for {previewData.noOfAdults} {Number(previewData.noOfAdults) === 1 ? "ADULT" : "ADULTS"}{" "}
                                                {previewData.noOfKids > 0 && (
                                                    " & " +
                                                    previewData.noOfKids +
                                                    (Number(previewData.noOfKids) === 1 ? " KID" : " KIDS") +
                                                    (previewData?.kidsAges?.length > 0
                                                        ? " [" +
                                                        previewData.kidsAges
                                                            .map((age: any) => age + "yrs")
                                                            .join("/") +
                                                        "]"
                                                        : "")
                                                )}
                                            </div>
                                        )}
                                    </li>
                                    <li className="mt-2">
                                        {previewData?.tourDate && !isNaN(new Date(previewData.tourDate).getTime()) && (
                                            <h2>
                                                Travel Date: {dateFormatter.format(new Date(previewData.tourDate)).replace(/\s+/g, '-')}
                                            </h2>
                                        )}
                                    </li>
                                    <li className="mt-2">
                                        {previewData.noOfPackageNights && previewData.noOfPackageDays && (
                                            <div>
                                                Package Duration: {previewData.noOfPackageNights > 0 && (
                                                    `${previewData.noOfPackageNights} ${Number(previewData.noOfPackageNights) == 1 ? "NIGHT" : "NIGHTS"}`
                                                )} & {previewData.noOfPackageDays > 0 && (
                                                    `${previewData.noOfPackageDays} ${Number(previewData.noOfPackageDays) == 1 ? "DAY" : "DAYS"}`
                                                )}
                                            </div>
                                        )}
                                    </li>
                                    <li className="mt-2">
                                        Package COST: INR {previewData.packageCost} /- (This cost is valid for today)
                                    </li>
                                </div>
                            )}
                            <li>Selected Payment Mode: Online</li>
                            <li>
                                For Term & Conditions please visit <a href={previewData?.templateId?.website} className="text-blue-700">{previewData?.templateId?.website}</a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h1 className="bg-blue-900 mt-5 p-3 font-semibold text-xl text-white text-center">
                            PAYMENT OPTIONS
                        </h1>
                        <div className="flex justify-around align-center mt-5">
                            {previewData.templateId?.paymentType?.map((item: any, index: number) => (
                                <div key={index}>
                                    <a href={item.url}>
                                        <img src={item.paymentImage} alt="bank image" width={30} height={30} />
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h1 className="bg-blue-900 mt-5 p-3 font-semibold text-xl text-white text-center">
                            CONTACT US
                        </h1>
                        <p className="m-5 text-black">
                            You can reach us 24*7 in case of any inquiries, suggestions, and
                            concerns.
                        </p>
                        <div className="text-black flex flex-wrap justify-around gap-6 sm:justify-center sm:gap-8 lg:justify-around pb-8">
                            <div className="flex flex-col text-center items-center sm:m-auto" style={{ width: "229px" }}>
                                <div className="bg-amber-900 w-16 h-16 flex items-center justify-center rounded-full text-white">
                                    {previewData?.templateId?.userIcon && (
                                        <img src={previewData.templateId.userIcon} alt="profile pic" width={30} height={30} />
                                    )}
                                </div>
                                <div className="text-blue-500 mt-2">
                                    {previewData?.salesExecutive && (
                                        <div>
                                            <h1>
                                                <a href={`tel:${previewData?.salesExecutive?.mobile}`}>
                                                    {previewData?.salesExecutive?.mobile}
                                                </a>
                                            </h1>
                                            <h1>{previewData?.salesExecutive?.name}</h1>
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            <div className="flex flex-col text-center items-center sm:m-auto" style={{ width: "190px" }}>
                                <div className="bg-amber-900 w-16 h-16 flex items-center justify-center rounded-full text-white text-2xl">
                                    <FaPhoneAlt />
                                </div>
                                <div className="text-blue-500 mt-2">
                                    {previewData?.templateId && (
                                        <div>
                                            <h1>
                                                <a href={`tel:${previewData?.templateId?.hotlineNumber}`}>
                                                    {previewData?.templateId?.hotlineNumber}
                                                </a>
                                            </h1>
                                            <h1>Hotline Number</h1>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap justify-around gap-6 sm:justify-center sm:gap-8 lg:justify-around">
                            {previewData?.templateId &&
                                previewData?.templateId?.mailId &&
                                previewData?.templateId?.mailId.map((item: any, index: number) => (
                                    <div key={index} className="flex flex-col items-center sm:m-auto">
                                        <div className="bg-amber-900 w-16 h-16 flex items-center justify-center rounded-full text-white">
                                            <img
                                                src={previewData?.templateId?.emailIcon}
                                                alt="mail icon"
                                                width={30}
                                                height={30}
                                            />
                                        </div>
                                        <div className="text-blue-500 mt-2">
                                            {item && (
                                                <div>
                                                    <h1>
                                                        <a href={`mailto:${item}`}>{item}</a>
                                                    </h1>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                    {previewData?.templateId && (
                        <div>
                            <h6 className="m-5 py-5 text-black">
                                <p dangerouslySetInnerHTML={{ __html: previewData?.templateId?.disclaimer }}></p>
                            </h6>
                        </div>
                    )}
                </div>
                )}
            </div>
      
        </div>
    );
}
