import { DefaultLayout } from "@/layouts/DefaultLayout";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import { fetchWithToken } from "@/utils/fetchApi";
import { ArrowLeft, Home04, Edit01, Trash01, Plus } from "@untitledui/icons";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import { useStoreSnackbar } from "@/store/snackbar";

const getId = (value: any) => String(value?.id ?? value?._id ?? value ?? "").trim();

type HotelImage = {
    id: string;
    url: string;
    hotel: string;
};

export default function ItineraryHotelViewPage() {
    const navigate = useNavigate();
    const params = useParams();
    const id = getId(params.id);
    const { showSnackbar } = useStoreSnackbar();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState<string | null>(null);
    const [data, setData] = useState({
        name: "",
        location: "",
        address: "",
        category: "",
        status: "true",
    });
    const [images, setImages] = useState<HotelImage[]>([]);
    const [uploading, setUploading] = useState(false);

    const fetchImages = async () => {
        try {
            const res = await fetchWithToken(`/api/hotelimage`, { hotel: id, limit: 20 });
            setImages(Array.isArray(res) ? res : []);
        } catch (e) {
            console.error("Failed to fetch images", e);
        }
    };

    useEffect(() => {
        const run = async () => {
            if (!id) {
                setLoadError("Invalid hotel id");
                setLoading(false);
                return;
            }
            setLoading(true);
            setLoadError(null);
            try {
                const res = await fetchWithToken(`/api/hotel/${id}`, { populate: "category" });
                const resolved = (res as any)?.data ?? res;
                setData({
                    name: String(resolved?.name ?? ""),
                    location: String(resolved?.location ?? ""),
                    address: String(resolved?.address ?? ""),
                    category: String(resolved?.category?.title ?? resolved?.category ?? ""),
                    status: String((resolved?.status ?? true) ? "true" : "false"),
                });
                await fetchImages();
            } catch (e: any) {
                setLoadError(e?.error?.message || e?.message || "Failed to load hotel");
            } finally {
                setLoading(false);
            }
        };
        run();
    }, [id]);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) return;
        setUploading(true);
        try {
            const files = Array.from(e.target.files);
            const uploadedUrls: string[] = [];
            
            showSnackbar({ title: "Uploading...", color: "warning" });

            for (const file of files) {
                const fd = new FormData();
                fd.append("fmFile", file, file.name);
                const res = await fetchWithToken('/api/file/upload', fd as any, { method: 'POST' });
                if (Array.isArray(res)) uploadedUrls.push(...res);
                else if (typeof res === 'string') uploadedUrls.push(res);
            }

            if (uploadedUrls.length > 0) {
                await fetchWithToken('/api/hotelimage', {
                    url: uploadedUrls,
                    uploaded: true,
                    status: true,
                    hotel: id
                }, { method: 'POST' });
                await fetchImages();
                showSnackbar({ title: "Success", description: "Images added successfully", color: "success" });
            }
        } catch (e: any) {
            showSnackbar({ 
                title: "Error", 
                description: e?.message || "Failed to upload images", 
                color: "danger" 
            });
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    const handleDeleteImage = async (imageId: string) => {
        if (!confirm("Are you sure you want to delete this image?")) return;
        try {
            await fetchWithToken(`/api/hotelimage/${imageId}`, {}, { method: 'DELETE' });
            await fetchImages();
            showSnackbar({ title: "Success", description: "Image deleted", color: "success" });
        } catch (e: any) {
            showSnackbar({ 
                title: "Error", 
                description: e?.message || "Failed to delete image", 
                color: "danger" 
            });
        }
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
                <button type="button" onClick={() => navigate("/itinerary/list")} className="rounded-sm px-1 py-0.5 text-primary hover:bg-primary_hover">
                    Itinerary
                </button>
                <span>/</span>
                <button type="button" onClick={() => navigate("/itinerary/hotel")} className="rounded-sm px-1 py-0.5 text-primary hover:bg-primary_hover">
                    Hotel
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
                <div className="space-y-6">
                    {/* Header Skeleton */}
                    <div className="flex flex-col gap-4 border-b border-secondary bg-primary px-6 py-5 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-2">
                            <div className="h-8 w-64 animate-pulse rounded bg-secondary" />
                            <div className="flex flex-col gap-2">
                                <div className="h-4 w-40 animate-pulse rounded bg-secondary" />
                                <div className="h-4 w-48 animate-pulse rounded bg-secondary" />
                                <div className="h-4 w-32 animate-pulse rounded bg-secondary" />
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <div className="h-10 w-24 animate-pulse rounded bg-secondary" />
                            <div className="h-10 w-24 animate-pulse rounded bg-secondary" />
                        </div>
                    </div>

                    <div className="px-6 pb-12">
                        <div className="mb-4 flex items-center justify-between">
                            <div className="h-7 w-32 animate-pulse rounded bg-secondary" />
                            <div className="h-10 w-28 animate-pulse rounded bg-secondary" />
                        </div>
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="aspect-square animate-pulse rounded-lg bg-secondary" />
                            ))}
                        </div>
                    </div>
                </div>
            </DefaultLayout>
        );
    }

    if (loadError) {
        return (
            <DefaultLayout>
                {breadcrumbs}
                <div className="rounded-xl border border-error-solid bg-error-bg p-6 text-error-text">
                    <p className="font-semibold">Error loading hotel</p>
                    <p className="text-sm">{loadError}</p>
                    <Button className="mt-4" size="sm" color="secondary" onClick={() => navigate("/itinerary/hotel")}>
                        Go Back
                    </Button>
                </div>
            </DefaultLayout>
        );
    }

    return (
        <DefaultLayout>
            {breadcrumbs}
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col gap-4 border-b border-secondary bg-primary px-6 py-5 md:flex-row md:items-start md:justify-between">
                    <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-3">
                            <h1 className="text-2xl font-bold text-primary">{data.name}</h1>
                            <Badge color={data.status === "true" ? "success" : "gray"}>
                                {data.status === "true" ? "Active" : "Inactive"}
                            </Badge>
                        </div>
                        <div className="flex flex-col gap-1 text-sm text-tertiary">
                            {data.location && (
                                <p>
                                    Location: <span className="font-medium text-secondary">{data.location}</span>
                                </p>
                            )}
                            {data.address && (
                                <p>
                                    Address: <span className="font-medium text-secondary">{data.address}</span>
                                </p>
                            )}
                            {data.category && (
                                <p>
                                    Category: <span className="font-medium text-secondary">{data.category}</span>
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button color="secondary" iconLeading={ArrowLeft} onClick={() => navigate("/itinerary/hotel")}>
                            Back
                        </Button>
                        <Button color="primary" iconLeading={Edit01} onClick={() => navigate(`/itinerary/hotel/edit/${id}`)}>
                            Edit Hotel
                        </Button>
                    </div>
                </div>

                <div className="px-6 pb-12">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-primary">Hotel Images</h2>
                        <div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileUpload}
                                className="hidden"
                                multiple
                                accept="image/*"
                            />
                            <Button 
                                color="primary" 
                                iconLeading={uploading ? undefined : Plus} 
                                onClick={() => fileInputRef.current?.click()}
                                disabled={uploading}
                            >
                                {uploading ? "Uploading..." : "Add Image"}
                            </Button>
                        </div>
                    </div>

                    {images.length === 0 ? (
                        <div className="flex h-64 flex-col items-center justify-center rounded-xl border border-dashed border-secondary bg-secondary/50">
                            {/* <UploadCloud className="mb-4 size-10 text-tertiary" /> */}
                            <p className="text-tertiary">No images found. Add some images to get started.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                            {images.map((img) => (
                                <div key={img.id} className="group relative aspect-square overflow-hidden rounded-lg border border-secondary bg-secondary">
                                    <img
                                        src={img.url}
                                        alt="Hotel"
                                        className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
                                    <button
                                        onClick={() => handleDeleteImage(img.id)}
                                        className="absolute top-2 right-2 rounded-full bg-white/90 p-1.5 text-error-text opacity-0 shadow-sm transition-opacity hover:bg-white group-hover:opacity-100"
                                        title="Delete Image"
                                    >
                                        <Trash01 className="size-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </DefaultLayout>
    );
}
