import React, { useEffect, useState, useRef, useMemo } from "react";
import { useParams, useNavigate } from "react-router";
import { Button } from "@/components/base/buttons/button";
import { CustomBreadscrumbs } from "@/components/application/breadcrumbs/custom-breadcrumbs";
import { useStoreSnackbar } from "@/store/snackbar";
import { getPackageBooking } from "@/utils/services/packagebookingService";
import { getpayment } from "@/utils/services/paymentService";
import { getAssignmentById } from "@/utils/services/assignmentService";
import { addPackageVoucher } from "@/utils/services/packageVoucherService";
import { getCompanyConfig } from "@/utils/services/userService";
import { getPaymentStore } from "@/utils/services/paymentStoreService";
import { DefaultLayout } from "@/layouts/DefaultLayout";

export default function GeneratedPymId() {
  const { id } = useParams();
  const navigate = useNavigate();
  const contentRef = useRef<HTMLDivElement>(null);
  const [packageBookingData, setPackageBookingData] = useState<any[]>([]);
  const [assignmentData, setAssignmentData] = useState<any>({});
  const [paymentData, setPaymentData] = useState<any[]>([]);
  const [paymentStoreValue, setPaymentStoreValue] = useState<any[]>([]);
  const [mylogo, setMylogo] = useState<any[]>([]);
  const [bookingOrderIds, setBookingOrderIds] = useState<string[]>([]);
  const [draggingBookingId, setDraggingBookingId] = useState<string>("");
  const [dragOverBookingId, setDragOverBookingId] = useState<string>("");
  const { showSnackbar } = useStoreSnackbar();

  const formatDate = (value?: string) => {
    if (!value) return "-";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "-";
    const parts = new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "2-digit",
    }).formatToParts(date);
    const day = parts.find((part) => part.type === "day")?.value || "";
    const month = parts.find((part) => part.type === "month")?.value || "";
    const year = parts.find((part) => part.type === "year")?.value || "";
    return `${day} ${month}, ${year}`;
  };

  const formatDurationPart = (value: any, singular: string, plural: string) => {
    const count = Number(value);
    if (Number.isNaN(count)) return `0 ${plural}`;
    return `${count} ${count === 1 ? singular : plural}`;
  };

  const getCustomFieldType = (item: any, group: "additionalBookingDetails" | "additionalDetails", key: string) => {
    const definitions = Array.isArray(item?.bookingsType?.customParams?.[group]) ? item.bookingsType.customParams[group] : [];
    const match = definitions.find((field: any) => String(field?.key || "").trim() === String(key || "").trim());
    return String(match?.type || "").toLowerCase();
  };


  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      const params = {
        assignment: id,
        bookingStatus: "booked",
        populate: "bookingsType",
      };
      try {
        const response: any = await getPackageBooking(params);
        setPackageBookingData(Array.isArray(response) ? response : response.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      const params = {
        assignment: id,
        paymentType: "Cr",
        populate: "paymentStore",
        limit: 100
      };
      try {
        const response: any = await getpayment(params);
        setPaymentData(Array.isArray(response) ? response : response.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        const response: any = await getAssignmentById(id);
        setAssignmentData(response.data || response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);

  const handlePaymentLink = async () => {
    if (!contentRef.current) return;
    const logoEl = contentRef.current.querySelector("#logoImg");
    if (logoEl) {
      logoEl.classList.remove("hidden");
      logoEl.classList.add("block");
    }
    let htmlContent = contentRef.current.innerHTML;
    const updatedPackageVoucherData = {
      innerHtml: htmlContent,
      assignmentId: id,
      isDefault: false,
    };
    try {
      const packageVoucher: any = await addPackageVoucher(updatedPackageVoucherData);
      if (packageVoucher && packageVoucher.htmlContent) {
        htmlContent = htmlContent.replace(
          /<div id="packageVoucher">.*?<\/div>/,
          packageVoucher.htmlContent
        );
      }
      showSnackbar({
        description: "Generate link successfully Added",
        title: "Success",
        color: "success",
      });
      navigate(`/bookings/payment/payment-link/${id}`);
    } catch (error) {
      console.error("Error updating package voucher:", error);
    }
    if (!htmlContent) {
      console.error("Cannot send email, HTML content is missing.");
      return;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response: any = await getPaymentStore();
      if (response) {
        setPaymentStoreValue(Array.isArray(response) ? response : response.data || []);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response: any = await getCompanyConfig();
      if (response) {
        setMylogo(Array.isArray(response) ? response : response.data || []);
      }
    };
    fetchData();
  }, []);

  const replaceClientName = (content: string) => {
    let replacedContent = content?.replace(
      /\[\{CLIENT_NAME\}\]|\{CLIENT_NAME\}/g,
      ""
    );
    return replacedContent?.replace(/\{|\}/g, "");
  };

  const breadcrumbsList = [
    { label: "Bookings", link: "/bookings/booking" },
    { label: "Payment", link: "/bookings/payment" },
    { label: "Payment Link List", link: `/bookings/payment/payment-link/${id}` },
    { label: "Generate" },
  ];

  const sortedPackageBookingData = useMemo(() => {
    const getStartTime = (value: any) => {
      const time = new Date(value).getTime();
      return Number.isNaN(time) ? -Infinity : time;
    };
    const isCab = (title: any) => /\bcab\b/i.test(String(title || "").trim());
    return [...packageBookingData].sort((a: any, b: any) => {
      const aIsCab = isCab(a?.title);
      const bIsCab = isCab(b?.title);
      if (aIsCab !== bIsCab) return aIsCab ? -1 : 1;
      return getStartTime(a?.startDate) - getStartTime(b?.startDate);
    });
  }, [packageBookingData]);

  useEffect(() => {
    const nextIds = sortedPackageBookingData
      .map((item: any) => String(item?.id || ""))
      .filter(Boolean);
    setBookingOrderIds((prev) => {
      const nextSet = new Set(nextIds);
      const sameLength = prev.length === nextIds.length;
      const sameValues = sameLength && prev.every((id) => nextSet.has(id));
      if (sameValues) return prev;
      return nextIds;
    });
  }, [sortedPackageBookingData]);

  const orderedPackageBookingData = useMemo(() => {
    if (!bookingOrderIds.length) return sortedPackageBookingData;
    const map = new Map(
      sortedPackageBookingData.map((item: any) => [String(item?.id || ""), item])
    );
    const ordered = bookingOrderIds
      .map((id) => map.get(String(id)))
      .filter(Boolean) as any[];
    const remaining = sortedPackageBookingData.filter(
      (item: any) => !bookingOrderIds.includes(String(item?.id || ""))
    );
    return [...ordered, ...remaining];
  }, [sortedPackageBookingData, bookingOrderIds]);

  const handleBookingDragStart = (bookingId: string) => {
    setDraggingBookingId(String(bookingId || ""));
  };

  const handleBookingDrop = (targetBookingId: string) => {
    const sourceId = String(draggingBookingId || "");
    const targetId = String(targetBookingId || "");
    if (!sourceId || !targetId || sourceId === targetId) {
      setDraggingBookingId("");
      setDragOverBookingId("");
      return;
    }
    setBookingOrderIds((prev) => {
      const list = prev.length ? [...prev] : orderedPackageBookingData.map((item: any) => String(item?.id || ""));
      const sourceIndex = list.indexOf(sourceId);
      const targetIndex = list.indexOf(targetId);
      if (sourceIndex < 0 || targetIndex < 0) return prev;
      const [moved] = list.splice(sourceIndex, 1);
      list.splice(targetIndex, 0, moved);
      return list;
    });
    setDraggingBookingId("");
    setDragOverBookingId("");
  };

  return (
    <DefaultLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-4">
          <CustomBreadscrumbs list={breadcrumbsList} />
        </div>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden p-8">
            <h5 className="text-lg font-semibold mb-4 text-gray-900">Generate Payment Link</h5>
            <div className="pt-4">
                <div ref={contentRef}>
            {/* Header */}
            <div className="bg-white p-4 border-b-2 border-blue-600 flex justify-between items-start">
                <div className="w-1/2">
                    <img src="https://travelimg.b-cdn.net/hospitality_1743514083897.png" alt="Company Logo" className="w-28 h-auto object-contain mb-2" id="logoImg" />
                </div>
                <div className="w-1/2 text-right">
                    <div className="text-xs text-gray-600 leading-relaxed">
                    <span dangerouslySetInnerHTML={{
                        __html: mylogo[0]?.address
                        ?.replace("Hospitality Group", "<strong class='text-base text-blue-800'>Hospitality Group</strong>")
                        ?.replace(/\n/g, "<br/>"),
                    }}></span>
                    </div>
                    <div className="mt-2 text-xs text-gray-600">
                        <p>Support: <a href="mailto:support@hospitalitygroup.in" className="text-blue-600 hover:underline">support@hospitalitygroup.in</a></p>
                    </div>
                </div>
            </div>
            <h1 className="text-center text-2xl font-bold text-blue-600 uppercase tracking-wide mb-1 mt-6">Booking Voucher</h1>


            <div className="p-4">
                {/* Client & Trip Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    {/* Bill To */}
                    <div>
                        <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-3 border-gray-200">Bill To</h3>
                        <div className="text-sm text-gray-700 space-y-1">
                            <p><span className="font-semibold w-24 inline-block">Name:</span> {assignmentData?.clientName}</p>
                            <p><span className="font-semibold w-24 inline-block">Email:</span> {assignmentData?.email}</p>
                            <p><span className="font-semibold w-24 inline-block">Phone:</span> {assignmentData?.mobile}</p>
                        </div>
                    </div>

                    {/* Booking Details */}
                    <div>
                        <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-3 border-gray-200">Trip Details</h3>
                        <div className="text-sm text-gray-700 space-y-1">
                            <p><span className="font-semibold w-32 inline-block">Package ID:</span> {assignmentData?.packageId}</p>
                            <p><span className="font-semibold w-32 inline-block">Booking Date:</span> {assignmentData?.bookingDate ? formatDate(assignmentData?.bookingDate): "-"}</p>
                            <p><span className="font-semibold w-32 inline-block">Travel Date:</span> {assignmentData?.tourDate ? formatDate(assignmentData?.tourDate): "-"}</p>
                            <p><span className="font-semibold w-32 inline-block">Duration:</span>  {formatDurationPart(assignmentData?.noOfPackageNights, "Night", "Nights")} / {formatDurationPart(assignmentData?.noOfPackageDays, "Day", "Days")}</p>
                            <p><span className="font-semibold w-32 inline-block">Travelers:</span> {formatDurationPart(assignmentData?.noOfAdult, "Adult", "Adults")}, {formatDurationPart(assignmentData?.noOfKids, "Kid", "Kids")}</p>
                            <p><span className="font-semibold w-32 inline-block">Itinerary:</span> 
                                <a
                                target="_blank"
                                href={`/package-mail/${assignmentData?.savedItinerary}`}
                                className="text-blue-600 hover:underline font-medium ml-1"
                                rel="noreferrer"
                                >
                                View Itinerary
                                </a>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Package Items */}
                {orderedPackageBookingData.length > 0 && (
                    <div className="mb-8">
                        {/* <h3 className="text-lg font-bold text-gray-800 mb-3 text-primary">Booking Inclusions</h3> */}
                        <p className="mb-2 text-xs text-gray-500">Drag and drop a booking card to move it up or down.</p>
                        <div className="space-y-4">
                            {orderedPackageBookingData.map((item) => (
                                <div
                                  key={item.id}
                                  className={`border rounded-lg overflow-hidden ${dragOverBookingId === String(item?.id || "") ? "border-blue-400 ring-1 ring-blue-200" : "border-gray-200"}`}
                                  draggable
                                  onDragStart={() => handleBookingDragStart(String(item?.id || ""))}
                                  onDragOver={(event) => {
                                    event.preventDefault();
                                    setDragOverBookingId(String(item?.id || ""));
                                  }}
                                  onDrop={() => handleBookingDrop(String(item?.id || ""))}
                                  onDragEnd={() => {
                                    setDraggingBookingId("");
                                    setDragOverBookingId("");
                                  }}
                                >
                                    <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 font-semibold text-gray-700 flex justify-between items-center">
                                        <span className="text-gray-800 flex items-center gap-2">
                                          <span className="cursor-grab text-gray-400 select-none">⋮⋮</span>
                                          {item.title}
                                        </span>
                                        <span className="text-xs text-gray-500 font-normal">
                                            {formatDate(item.startDate)} - {formatDate(item?.endDate)}
                                        </span>
                                    </div>
                                    <div className="p-4 bg-white text-sm">
                                        <div className="grid grid-cols-1 gap-2">
                                            {item?.customParams?.additionalBookingDetails &&
                                            Object.entries(item?.customParams?.additionalBookingDetails).map(([key, value], index) => (
                                                <div key={index} className="flex border-b border-gray-100 last:border-0 py-1">
                                                    <span className="font-medium text-gray-600 w-1/3">
                                                        {(key as string).replace(/([A-Z])/g, " $1").trim().replace(/^./, (str) => str.toUpperCase())}
                                                    </span>
                                                    <div className="text-gray-800 w-2/3">
                                                        {getCustomFieldType(item, "additionalBookingDetails", key) === "file" ? (
                                                            typeof value === "string" && value ? (
                                                                <a href={value} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                                                                    Download
                                                                </a>
                                                            ) : (
                                                                "-"
                                                            )
                                                        ) : typeof value === 'string' && /<\/?[a-z][\s\S]*>/i.test(value) ? (
                                                            <div className="prose prose-sm max-w-none !text-sm !text-gray-800 [&_*]:!text-gray-800" dangerouslySetInnerHTML={{ __html: value }} />
                                                        ) : (
                                                            value as React.ReactNode
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                            {item.customParams.additionalDetails &&
                                            Object.entries(item.customParams.additionalDetails).map(([key, value], index) => (
                                                <div key={index} className="flex border-b border-gray-100 last:border-0 py-1">
                                                    <span className="font-medium text-gray-600 w-1/3">
                                                        {(key as string).replace(/([A-Z])/g, " $1").trim().replace(/^./, (str) => str.toUpperCase())}
                                                    </span>
                                                    <div className="text-gray-800 w-2/3">
                                                        {getCustomFieldType(item, "additionalDetails", key) === "file" ? (
                                                            typeof value === "string" && value ? (
                                                                <a href={value} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                                                                    Download
                                                                </a>
                                                            ) : (
                                                                "-"
                                                            )
                                                        ) : /<\/?[a-z][\s\S]*>/i.test(value as string) ? (
                                                            <div className="prose prose-sm max-w-none !text-sm !text-gray-800 [&_*]:!text-gray-800" dangerouslySetInnerHTML={{ __html: replaceClientName(value as string) }} />
                                                        ) : (
                                                            value as React.ReactNode
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Payment Summary */}
                <div className="mb-8">
                    <h3 className="text-lg font-bold text-gray-800 mb-3">Payment Summary</h3>
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <table className="w-full text-sm text-left text-gray-800">
                            <thead className="bg-blue-600 text-white">
                                <tr>
                                    <th className="px-4 py-3 font-semibold">Payment Date</th>
                                    <th className="px-4 py-3 font-semibold">Mode</th>
                                    <th className="px-4 py-3 font-semibold text-right">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {paymentData.length > 0 ? (
                                    paymentData.map((item) => (
                                        <tr key={item.id} className="hover:bg-gray-50">
                                            <td className="px-4 py-3">
                                                {new Intl.DateTimeFormat("en-GB", {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric",
                                                }).format(new Date(item.paymentDate))}
                                            </td>
                                            <td className="px-4 py-3">{item?.paymentStore?.title || "-"}</td>
                                            <td className="px-4 py-3 text-right">₹ {item.amount}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={3} className="px-4 py-3 text-center text-gray-500 italic">No payments recorded yet.</td>
                                    </tr>
                                )}
                            </tbody>
                            <tfoot className="bg-gray-50 font-bold text-gray-800">
                                <tr>
                                    <td colSpan={2} className="px-4 py-3 text-right">Payment Received:</td>
                                    <td className="px-4 py-3 text-right">₹ {paymentData.reduce((total, item) => total + parseFloat(item.amount || 0), 0)}</td>
                                </tr>
                                <tr>
                                    <td colSpan={2} className="px-4 py-3 text-right">Package Cost:</td>
                                    <td className="px-4 py-3 text-right">₹ {assignmentData.packageCost}</td>
                                </tr>
                                <tr>
                                    <td colSpan={2} className="px-4 py-3 text-right">GST ({assignmentData.taxes}%):</td>
                                    <td className="px-4 py-3 text-right">₹ {(assignmentData.packageCost * parseFloat(assignmentData.taxes || 0)) / 100}</td>
                                </tr>
                                <tr className="bg-blue-50 text-blue-800 text-base">
                                    <td colSpan={2} className="px-4 py-3 text-right">Total Package Cost:</td>
                                    <td className="px-4 py-3 text-right">₹ {assignmentData.packageCost + (assignmentData.packageCost * parseFloat(assignmentData.taxes || 0) / 100)}</td>
                                </tr>
                                <tr className="bg-red-50 text-red-600 text-base border-t border-red-100">
                                    <td colSpan={2} className="px-4 py-3 text-right">Amount Due:</td>
                                    <td className="px-4 py-3 text-right">
                                        ₹ {(assignmentData.packageCost + (assignmentData.packageCost * parseFloat(assignmentData.taxes || 0) / 100) - paymentData.reduce((total, item) => total + parseFloat(item.amount || 0), 0))}
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>

                {/* Terms / Footer */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                    {paymentStoreValue.length > 0 && (
                        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                            <h4 className="font-semibold text-blue-800 mb-2 text-sm uppercase">Payment Instructions</h4>
                            <div
                                className="text-sm text-gray-700 leading-relaxed"
                                dangerouslySetInnerHTML={{
                                    __html: paymentStoreValue.find((item) => item.isDefault)?.description || "No default payment method found.",
                                }}
                            />
                        </div>
                    )}
                    <p className="mt-4 text-center text-xs text-gray-500">
                        This is a digitally authenticated document and does not require a physical signature.
                    </p>
                </div>
            </div>
                </div>

                <div className="pt-4 flex justify-between border-t mt-8">
                    <Button 
                        color="secondary" 
                        size="sm"
                        onClick={() => navigate(`/bookings/payment/payment-link/${id}`)}
                    >  
                        Back
                    </Button>
                    <Button
                        onClick={handlePaymentLink}
                        color="primary"
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 shadow-md"
                    >
                        Generate & Save Voucher
                    </Button>
                </div>
            </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
