import React, { useRef } from "react";
import { FaPhoneAlt } from "react-icons/fa";

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
    

    const dateFormatter = new Intl.DateTimeFormat("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });

    return (
        <div className="bg-white text-black preview-mail-container">
            <div ref={contentRef}>
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
            </div>
      
        </div>
    );
}
