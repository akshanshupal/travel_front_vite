import { DefaultLayout } from "@/layouts/DefaultLayout";
import { Button } from "@/components/base/buttons/button";
import { useStoreSnackbar } from "@/store/snackbar";
import { clientItineraryService } from "@/utils/services/clientItineraryService";
import { fetchWithToken } from "@/utils/fetchApi";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";
import PreviewMail from "@/components/PreviewMail";
import { ArrowLeft, Download01 } from "@untitledui/icons";

export default function ClientItineraryViewPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const { showSnackbar } = useStoreSnackbar();

    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const previewRef = useRef<HTMLDivElement | null>(null);
    const autoSaveTriggeredRef = useRef(false);

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;
            try {
                const res = await clientItineraryService.getById(id, {
                    populate: "salesExecutive,templateId,hotelCategory,itinerary"
                });
                setData(res);
            } catch (error: any) {
                showSnackbar({
                    title: "Error",
                    description: error.message || "Failed to fetch client itinerary",
                    color: "danger"
                });
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [id, showSnackbar]);

    const handleBack = () => {
        if (window.history.length > 1) {
            navigate(-1);
            return;
        }
        navigate("/itinerary/clientitinerary");
    };

    const handleSaveItinerary = async () => {
        const html = previewRef.current?.innerHTML || "";
        if (!html) {
            showSnackbar({
                title: "Error",
                description: "Nothing to save yet",
                color: "danger",
            });
            return;
        }

        if (!id) return;

        const salesExecutiveId =
            (data as any)?.salesExecutive?.id ||
            (data as any)?.salesExecutive?._id ||
            (data as any)?.salesExecutive;

        try {
            await fetchWithToken(
                "/api/saved-itinerary",
                {
                    clientName: (data as any)?.clientName,
                    mobile: (data as any)?.mobile,
                    email: (data as any)?.email,
                    packageCost: (data as any)?.packageCost,
                    tourDate: (data as any)?.tourDate,
                    salesExecutive: salesExecutiveId,
                    clientItinerary: id,
                    mailData: html,
                },
                { method: "POST" },
            );

            showSnackbar({
                title: "Success",
                description: "Client Itinerary Saved Successfully",
                color: "success",
            });

            navigate("/itinerary/saved-itinerary");
        } catch {
        }
    };

    const formatDateTime = (value: any) => {
        if (!value) return "-";
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) return "-";
        const datePart = date.toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
        const timePart = date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
        });
        return `${datePart} ${timePart}`;
    };



    useEffect(() => {
        if (!data) return;
        const shouldAutoSave = searchParams.get("save") === "1";
        if (!shouldAutoSave) return;
        if (autoSaveTriggeredRef.current) return;
        autoSaveTriggeredRef.current = true;
        void handleSaveItinerary();
    }, [data, searchParams]);

    if (isLoading) {
        return (
            <DefaultLayout>
                <div className="flex flex-col gap-6 px-4 py-8 md:px-8">
                    <div className="flex items-center justify-between">
                        <div className="space-y-2">
                            <div className="h-6 w-56 animate-pulse rounded bg-secondary" />
                            <div className="h-4 w-64 animate-pulse rounded bg-secondary" />
                        </div>
                        <div className="flex gap-3">
                            <div className="h-10 w-24 animate-pulse rounded bg-secondary" />
                            <div className="h-10 w-36 animate-pulse rounded bg-secondary" />
                        </div>
                    </div>
                    <div className="rounded-lg border border-secondary bg-primary p-6">
                        <div className="space-y-4">
                            <div className="h-5 w-48 animate-pulse rounded bg-secondary" />
                            <div className="h-4 w-full animate-pulse rounded bg-secondary" />
                            <div className="h-4 w-11/12 animate-pulse rounded bg-secondary" />
                            <div className="h-4 w-10/12 animate-pulse rounded bg-secondary" />
                            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                                {[...Array(6)].map((_, index) => (
                                    <div key={index} className="aspect-[4/3] animate-pulse rounded-lg bg-secondary" />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </DefaultLayout>
        );
    }

    if (!data) {
        return (
            <DefaultLayout>
                <div className="flex flex-col items-center justify-center gap-4 py-12">
                    <p>Client Itinerary not found</p>
                    <Button onClick={() => navigate("/itinerary/clientitinerary")}>Back to List</Button>
                </div>
            </DefaultLayout>
        );
    }

    return (
        <DefaultLayout>
            <div className="flex flex-col gap-6 px-4 py-8 md:px-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-fg-primary">Client Itinerary Preview</h1>
                        <p className="text-sm text-fg-secondary">Preview of the client itinerary mail</p>
                    </div>
                    <div className="flex gap-3">
                        <Button color="secondary" iconLeading={ArrowLeft} onClick={handleBack}>
                            Back
                        </Button>
                        <Button iconLeading={Download01} onClick={handleSaveItinerary}>
                            Create Quotation
                        </Button>
                    </div>
                </div>

                <div className="rounded-lg border border-secondary bg-primary p-6">
                    <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="rounded-lg border border-secondary bg-primary p-4">
                            <div className="text-sm font-medium text-fg-secondary">Created At</div>
                            <div className="mt-1 text-sm text-fg-primary">{formatDateTime((data as any)?.createdAt)}</div>
                        </div>
                        <div className="rounded-lg border border-secondary bg-primary p-4">
                            <div className="text-sm font-medium text-fg-secondary">Updated At</div>
                            <div className="mt-1 text-sm text-fg-primary">{formatDateTime((data as any)?.updatedAt)}</div>
                        </div>
                    </div>
                    <div ref={previewRef}>
                        <PreviewMail previewData={data} />
                    </div>
                    <div className="flex gap-3 justify-end">
                        <Button color="secondary" iconLeading={ArrowLeft} onClick={handleBack}>
                            Back
                        </Button>
                        <Button iconLeading={Download01} onClick={handleSaveItinerary}>
                            Create Quotation
                        </Button>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
}
