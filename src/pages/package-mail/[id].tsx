import { getSavedItineraryById } from "@/utils/services/savedItineraryService";
import { useStoreSnackbar } from "@/store/snackbar";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function PackageItineraryMailPage() {
    const { id } = useParams<{ id: string }>();
    const { showSnackbar } = useStoreSnackbar();
    const [data, setData] = useState<any>({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;
            setIsLoading(true);
            const params = {
                populate: "clientItinerary,hotelcategory,salesExecutive",
            };
            try {
                const response: any = await getSavedItineraryById(id, params);
                if (response) {
                    setData(response);
                }
            } catch (error: any) {
                showSnackbar({
                    title: "Error",
                    description: error.message || "Failed to fetch data",
                    color: "danger",
                });
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [id, showSnackbar]);

    const replaceClientName = (content: string) => {
        if (!content) return "";
        let replacedContent = content.replace(
            /\[\{CLIENT_NAME\}\]|\{CLIENT_NAME\}/g,
            "Guest"
        );

        function normalizeNextImages(html: string) {
            return html.replace(
                /<img[^>]*src="\/_next\/image\?url=([^"&]+)[^"]*"[^>]*>/gi,
                (...args) => {
                    const encodedUrl = String(args[1] || "");
                    const url = decodeURIComponent(encodedUrl);
                    return `<img src="${url}" alt="image" />`;
                }
            );
        }
        return normalizeNextImages(replacedContent.replace(/\{|\}/g, ""));


    };

    return (
        <div className="bg-white min-h-screen">
            <div className="mx-auto max-w-[1000px] p-4">
                {isLoading && (
                    <div className="flex h-40 items-center justify-center">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-primary" />
                    </div>
                )}
                {!isLoading && data.mailData && (
                    <>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: replaceClientName(data.mailData),
                        }}
                    />
                    </>
                )}
            </div>
        </div>
    );
}
