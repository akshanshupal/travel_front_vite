import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { LoadingIndicator } from "@/components/application/loading-indicator/loading-indicator";
import { getPhotographyPaymentReceipt } from "@/utils/services/photographyPaymentService";

export default function PhotographyPaymentReceiptPage() {
    const { id } = useParams();
    const [data, setData] = useState<any>({});
    const [isLoading, setIsLoading] = useState(false);
    const [hideHeader, setHideHeader] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;
            setIsLoading(true);
            try {
                const response: any = await getPhotographyPaymentReceipt(id);
                setData(response);
            } catch {
                setData({});
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handlePrint = () => {
        setHideHeader(true);
        setTimeout(() => {
            window.print();
            setHideHeader(false);
        }, 300);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
            {isLoading ? (
                <div className="pt-20">
                    <LoadingIndicator />
                </div>
            ) : (
                <div className="w-full max-w-2xl rounded-2xl border border-gray-200 bg-white p-6 shadow">
                    <div className="flex justify-center">
                        {data?.companyConfig?.logo ? <img src={data?.companyConfig?.logo} alt="Logo" className="h-16 w-auto" /> : null}
                    </div>
                    <div className="space-y-2 text-center mt-4">
                        <div className="text-2xl font-bold text-gray-900">Photography Payment Receipt</div>
                        <div className="text-lg font-semibold text-gray-800">Booking #{data?.payment?.photographyBooking?.bookingNumber || "-"}</div>
                        <div className="text-lg font-semibold text-gray-800">Receipt #{data?.payment?.receiptNo || "-"}</div>
                        <div className="text-gray-600">for {data?.payment?.client?.name || "-"}</div>
                        <div className="text-gray-600">
                            Paid on{" "}
                            {data?.payment?.paymentDate
                                ? new Date(data?.payment?.paymentDate)
                                      .toLocaleDateString("en-GB", {
                                          month: "short",
                                          day: "2-digit",
                                          year: "numeric",
                                      })
                                      .replace(",", "")
                                : "-"}
                        </div>
                    </div>
                    <div className="my-6 flex items-center justify-center gap-3">
                        <div className="h-px w-1/3 bg-gray-300" />
                        <div className="text-gray-400">●</div>
                        <div className="h-px w-1/3 bg-gray-300" />
                    </div>
                    <div className="text-center">
                        <div className="text-xl font-bold text-gray-900">Payment Amount: ₹{data?.payment?.amount || 0} INR</div>
                    </div>
                    <div className="text-center mt-2">
                        <div className="text-lg font-semibold text-gray-800">PAYMENT METHOD: {data?.payment?.paymentStore?.title || "-"}</div>
                        <div className="text-gray-600">Powered by Hospitality Group</div>
                    </div>
                    <div className="mt-6 text-center text-gray-600">
                        <div>Contact: {data?.companyConfig?.email || "-"}</div>
                        <div>© 2010-2026 Hospitality Group.</div>
                    </div>
                    {!hideHeader && (
                        <div className="mt-6 flex justify-center">
                            <button
                                className="rounded-full border border-blue-600 text-blue-600 px-4 py-2 hover:bg-blue-50 transition-colors"
                                onClick={handlePrint}
                            >
                                Print
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
