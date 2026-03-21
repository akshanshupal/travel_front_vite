import React, { useEffect, useState } from "react";
import { useStoreSnackbar } from "@/store/snackbar";
import { getHotelimageDelete } from "@/utils/services/hotelimageService";
import LightGallery from "lightgallery/react";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-zoom.css";

export default function Timagelist({ hotelImages, deleteImg }: any) {
    const [cHotelImages, setCHotelImages] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { showSnackbar } = useStoreSnackbar();

    useEffect(() => {
        setCHotelImages(Array.isArray(hotelImages) ? hotelImages : []);
    }, [hotelImages]);

    const handleDelete = async (image: any) => {
        if (!confirm("Are you sure you want to delete this image?")) return;
        
        setIsLoading(true);
        try {
            await getHotelimageDelete(image.id, {});
            setCHotelImages((prevImages) =>
                prevImages.filter((img) => img.id !== image.id)
            );
            showSnackbar({
                description: "Image deleted successfully",
                title: "Success",
                color: "success",
            });
        } catch (error) {
            console.error("Error deleting image: ", error);
            showSnackbar({
                description: "Error deleting image",
                title: "Error",
                color: "danger",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="pt-2">
            {cHotelImages?.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-secondary py-10 text-center text-tertiary">
                    No image found
                </div>
            ) : (
                <LightGallery
                    plugins={[lgZoom, lgThumbnail]}
                    mode="lg-fade"
                    elementClassNames="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"
                    download={false}
                >
                    {cHotelImages.map((image, index) => (
                        <a
                            key={image.id || index}
                            href={image.url}
                            className="group relative overflow-hidden rounded-2xl border border-secondary bg-primary/80 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                        >
                            <img
                                src={image.url}
                                alt={`Hotel image ${index}`}
                                className="aspect-[4/3] w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                            />
                            {deleteImg && (
                                <button
                                    onClick={(event) => {
                                        event.preventDefault();
                                        event.stopPropagation();
                                        handleDelete(image);
                                    }}
                                    className="absolute right-3 top-3 rounded-full bg-red-500 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100"
                                    disabled={isLoading}
                                >
                                    Delete
                                </button>
                            )}
                        </a>
                    ))}
                </LightGallery>
            )}
        </div>
    );
}
