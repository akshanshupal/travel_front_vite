import { PublicLayout } from "@/layouts/PublicLayout";
import Timagelist from "@/components/utils/Timagelist";
import { useStoreSnackbar } from "@/store/snackbar";
import { getHotelById } from "@/utils/services/hotelService";
import { getHotelimageById } from "@/utils/services/hotelimageService";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function HotelImagesPage() {
    const { id } = useParams<{ id: string }>();
    const { showSnackbar } = useStoreSnackbar();
    const [isLoading, setIsLoading] = useState(false);
    const [hotel, setHotel] = useState<any>(null);
    const [hotelImages, setHotelImages] = useState<any[]>([]);

    useEffect(() => {
        if (!id) return;
        let isActive = true;

        const fetchData = async () => {
            setIsLoading(true);
            try {
                const [hotelRes, imagesRes] = await Promise.all([
                    getHotelById(id, { select: "name,location" }),
                    getHotelimageById({ hotel: id, limit: 20 }),
                ]);

                if (!isActive) return;

                if (hotelRes?.error) throw new Error(hotelRes.error);
                if (imagesRes?.error) throw new Error(imagesRes.error);

                const resolvedHotel = (hotelRes as any)?.data ?? hotelRes;
                const resolvedImages = (imagesRes as any)?.data ?? imagesRes;
                const list = Array.isArray(resolvedImages) ? resolvedImages : (resolvedImages?.docs || resolvedImages?.items || []);

                setHotel(resolvedHotel);
                setHotelImages(Array.isArray(list) ? list : []);
            } catch (error: any) {
                if (!isActive) return;
                showSnackbar({
                    title: "Error",
                    description: error?.message || "Failed to fetch hotel images",
                    color: "danger",
                });
            } finally {
                if (isActive) setIsLoading(false);
            }
        };

        fetchData();

        return () => {
            isActive = false;
        };
    }, [id, showSnackbar]);

    return (
        <PublicLayout>
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 md:px-8">
                <div className="rounded-3xl border border-secondary bg-primary/80 p-6 shadow-sm backdrop-blur">
                    <div className="flex flex-col items-center gap-3 text-center">
                        <div className="text-xs font-semibold uppercase tracking-[0.3em] text-tertiary">Hotel Gallery</div>
                        <div className="text-2xl font-semibold text-primary md:text-3xl">
                            {isLoading ? (
                                <div className="mx-auto h-8 w-48 animate-pulse rounded bg-secondary" />
                            ) : (
                                hotel?.name || "Hotel Images"
                            )}
                        </div>
                        <div className="text-sm text-tertiary">
                            {isLoading ? (
                                <div className="mx-auto h-4 w-32 animate-pulse rounded bg-secondary" />
                            ) : (
                                hotel?.location ? `Location: ${hotel.location}` : "Browse hotel photos in high resolution"
                            )}
                        </div>
                        <div className="flex items-center justify-center gap-2 text-xs text-tertiary">
                            <div className="rounded-full border border-secondary px-3 py-1">
                                {isLoading ? (
                                    <div className="h-3 w-12 animate-pulse rounded bg-secondary" />
                                ) : (
                                    `${hotelImages.length} Photos`
                                )}
                            </div>
                            <div className="rounded-full border border-secondary px-3 py-1">
                                {isLoading ? (
                                    <div className="h-3 w-20 animate-pulse rounded bg-secondary" />
                                ) : (
                                    "High Resolution"
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rounded-3xl border border-secondary bg-primary p-6 shadow-sm">
                    {isLoading ? (
                        <div className="space-y-6">
                            <div className="mx-auto h-6 w-48 animate-pulse rounded bg-secondary" />
                            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                                {[...Array(8)].map((_, index) => (
                                    <div key={index} className="aspect-[4/3] animate-pulse rounded-2xl bg-secondary" />
                                ))}
                            </div>
                        </div>
                    ) : hotelImages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
                            <div className="text-lg font-semibold text-primary">No images available</div>
                            <div className="text-sm text-tertiary">Try again later or check another hotel.</div>
                        </div>
                    ) : (
                        <Timagelist hotelImages={hotelImages} deleteImg={false} />
                    )}
                </div>
            </div>
        </PublicLayout>
    );
}
