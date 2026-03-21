import { Button } from "@/components/base/buttons/button";
import { CloseButton } from "@/components/base/buttons/close-button";
import { LoadingIndicator } from "@/components/application/loading-indicator/loading-indicator";
import { DefaultLayout } from "@/layouts/DefaultLayout";
import { itineraryService } from "@/utils/services/itineraryService";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useStoreLogin } from "@/store/login";
import { fetchWithOutToken, fetchWithToken } from "@/utils/fetchApi";
import { Dialog, Modal, ModalOverlay } from "@/components/application/modals/modal";
import { Home04 } from "@untitledui/icons";

const replaceClientName = (content?: string | null) => {
    if (!content) return "";
    const replacedContent = content.replace(/\[\{CLIENT_NAME\}\]|\{CLIENT_NAME\}/g, "Guest");
    return replacedContent.replace(/\{|\}/g, "");
};

export default function ItineraryViewPage() {
    const navigate = useNavigate();
    const params = useParams<{ id: string }>();
    const authToken = useStoreLogin((s) => s.authToken);
    const user = useStoreLogin((s) => s.user);
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState<string | null>(null);
    const [companyConfig, setCompanyConfig] = useState<any[]>([]);
    const [selectedHotel, setSelectedHotel] = useState<any | null>(null);
    const [hotelModalOpen, setHotelModalOpen] = useState(false);
    const [hotelImagesLoading, setHotelImagesLoading] = useState(false);

    useEffect(() => {
        const run = async () => {
            const id = params.id;
            if (!id) return;
            setLoading(true);
            setLoadError(null);
            try {
                const query = { populate: "area,site,hotel" };
                const res = await itineraryService.getById(id, query);
                if (res?.error) throw new Error(res.error);
                const resolved = res?.data ?? res;
                if (resolved?.error) throw new Error(resolved.error);
                setData(resolved || null);
            } catch (e: any) {
                setData(null);
                setLoadError(e?.error?.message || e?.message || "Failed to load itinerary");
            } finally {
                setLoading(false);
            }
        };
        if (!authToken) return;
        run();
    }, [authToken, params.id]);

    useEffect(() => {
        const run = async () => {
            if (!authToken) return;
            try {
                const res = await fetchWithToken("/api/companyconfig", {});
                const resolved = res?.data ?? res;
                setCompanyConfig(Array.isArray(resolved) ? resolved : []);
            } catch {
                setCompanyConfig([]);
            }
        };
        run();
    }, [authToken]);

    const openHotelImages = async (hotel: any) => {
        if (!hotel?.id && !hotel?._id) return;
        const hotelId = hotel?.id || hotel?._id;
        setHotelImagesLoading(true);
        setSelectedHotel({ ...hotel, images: [] });
        try {
            const res = await fetchWithOutToken("/api/hotelimage", { hotel: hotelId });
            const resolved = res?.data ?? res;
            const images = Array.isArray(resolved) ? resolved : [];
            setSelectedHotel({ ...hotel, images });
            setHotelModalOpen(true);
        } catch {
            setSelectedHotel({ ...hotel, images: [] });
            setHotelModalOpen(true);
        } finally {
            setHotelImagesLoading(false);
        }
    };

    const headerHtml = useMemo(() => data?.area?.headerContent || "", [data?.area?.headerContent]);
    const descriptionHtml = useMemo(() => data?.area?.description || "", [data?.area?.description]);
    const logoUrl = useMemo(() => companyConfig?.[0]?.logo || "", [companyConfig]);
    const canEdit = useMemo(() => (user as any)?.type && (user as any)?.type !== "AGENT", [user]);

    return (
        <DefaultLayout>
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
                    <button
                        type="button"
                        onClick={() => navigate("/itinerary/list")}
                        className="rounded-sm px-1 py-0.5 text-primary hover:bg-primary_hover"
                    >
                        Itinerary
                    </button>
                    <span>/</span>
                    <button
                        type="button"
                        onClick={() => navigate("/itinerary/list")}
                        className="rounded-sm px-1 py-0.5 text-primary hover:bg-primary_hover"
                    >
                        list
                    </button>
                    <span>/</span>
                    <span className="px-1 py-0.5 text-primary">View</span>
                </div>
            </div>

            <div className="mt-4">
                {loading ? (
                    <div className="flex justify-center py-10">
                        <LoadingIndicator type="line-spinner" label="Loading..." />
                    </div>
                ) : loadError ? (
                    <div className="rounded-xl border border-secondary bg-primary p-4 text-sm text-tertiary">{loadError}</div>
                ) : !data ? (
                    <div className="rounded-xl border border-secondary bg-primary p-4 text-sm text-tertiary">No data</div>
                ) : (
                    <div>
                        <div className="container mx-auto bg-pink-100 m-4 overflow-hidden">
                            <div className="pt-5 pl-5 pb-5">
                                {logoUrl ? <img className="h-24 w-24 object-contain" src={logoUrl} alt="logo" /> : null}
                            </div>
                            <hr className="border border-gray-300" />

                            <div className="pt-5 px-5">
                                {headerHtml ? <div dangerouslySetInnerHTML={{ __html: headerHtml }} /> : null}
                            </div>

                            <div className="mt-5">
                                {data?.area?.featureImg ? <img width="100%" src={data.area.featureImg} alt="img1" /> : null}
                                <h2 className="text-center font-extrabold text-xl text-blue-800 mt-5">{data?.area?.title}</h2>
                                {data?.tourDate ? (
                                    <h2 className="text-center font-bold text-md text-blue-800 mt-3">TRAVEL DATE - {String(data.tourDate)}</h2>
                                ) : null}
                                {data?.noOfPackageNights && data?.noOfPackageDays ? (
                                    <h2 className="text-center font-semi-bold text-md text-blue-800 mt-2">
                                        {String(data.noOfPackageNights)} NIGHTS & {String(data.noOfPackageDays)} DAYS
                                    </h2>
                                ) : null}
                                {data?.noOfAdults != null && data?.noOfKids != null && Array.isArray(data?.kidsAges) ? (
                                    <h2 className="text-center font-semi-bold text-md text-blue-800 mt-1">
                                        {String(data.noOfAdults)} ADULTS & {String(data.noOfKids)} KIDS [
                                        {data.kidsAges.map((age: any) => `${age}yrs`).join("/")}]
                                    </h2>
                                ) : null}
                            </div>

                            <hr className="border border-gray-300 my-4" />

                            <div className="p-4">{descriptionHtml ? <div dangerouslySetInnerHTML={{ __html: descriptionHtml }} /> : null}</div>

                            <hr className="border border-gray-300 my-4" />

                            <div className="mt-4">{data?.area?.featureImg ? <img width="100%" src={data.area.featureImg} alt="img2" /> : null}</div>

                            {Array.isArray(data?.sites) && data.sites.length > 0
                                ? (() => {
                                      let currentDayCount = 1;
                                      return data.sites.map((day: any) => {
                                          const span = Number(day?.days || 1);
                                          const dayTitle = `DAY ${currentDayCount}${span <= 1 ? "" : `-${currentDayCount + span - 1}`}: ${day?.title}`;
                                          currentDayCount += Number.isFinite(span) && span > 0 ? span : 1;

                                          return (
                                              <div key={day?.id || day?._id || dayTitle} className="mt-5">
                                                  <h2 className="bg-blue-900 mt-5 p-3 font-semibold text-xl text-white text-center">{dayTitle}</h2>
                                                  {day?.featureImg ? <img width="100%" src={day.featureImg} alt={`Image for ${day?.title}`} /> : null}
                                                  {day?.description ? (
                                                      <div
                                                          className="inner-html-box w-full break-words p-2 px-4"
                                                          dangerouslySetInnerHTML={{ __html: replaceClientName(day.description) }}
                                                      />
                                                  ) : null}
                                                  {Array.isArray(day?.hotels) && day.hotels.length > 0 ? (
                                                      <div className="flex flex-wrap gap-1 justify-center">
                                                          {day.hotels.map((hotelName: any) => (
                                                              <div
                                                                  onClick={() => openHotelImages(hotelName)}
                                                                  key={hotelName?.id || hotelName?._id || hotelName?.name}
                                                                  className="bg-blue-500 cursor-pointer hover:bg-blue-800 text-white font-semibold w-36 text-center p-2 m-2 rounded-md flex items-center justify-center"
                                                              >
                                                                  <button type="button">{hotelName?.name}</button>
                                                              </div>
                                                          ))}
                                                      </div>
                                                  ) : null}
                                              </div>
                                          );
                                      });
                                  })()
                                : null}

                            <hr className="border border-gray-300 my-4" />
                        </div>

                        <div className="pt-4 flex gap-4 px-4">
                            {canEdit ? (
                                <Button size="sm" color="primary" onClick={() => navigate(`/itinerary/list/edit/${params.id}`)}>
                                    Edit
                                </Button>
                            ) : null}
                            <Button size="sm" color="primary" onClick={() => navigate("/itinerary/list")}>
                                Back
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            <ModalOverlay
                isOpen={hotelModalOpen}
                isDismissable
                onOpenChange={(open) => {
                    if (!open) {
                        setHotelModalOpen(false);
                        setSelectedHotel(null);
                    }
                }}
            >
                {({ state }) => (
                    <Modal className="max-w-3xl">
                        <Dialog>
                            <div className="w-full rounded-xl bg-primary p-5 ring-1 ring-secondary">
                                <div className="flex items-center justify-between gap-3">
                                    <div className="space-y-0.5">
                                        <h2 className="text-lg font-semibold text-primary">Hotel Images</h2>
                                        <p className="text-sm text-tertiary">{selectedHotel?.name || ""}</p>
                                    </div>
                                    <CloseButton onPress={() => state.close()} size="sm" />
                                </div>

                                <div className="mt-4">
                                    {hotelImagesLoading ? (
                                        <div className="flex justify-center py-8">
                                            <LoadingIndicator type="dot-circle" label="Loading images..." />
                                        </div>
                                    ) : Array.isArray(selectedHotel?.images) && selectedHotel.images.length > 0 ? (
                                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                                            {selectedHotel.images.map((img: any) => (
                                                <a
                                                    key={img?.id || img?._id || img?.url}
                                                    href={img?.url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="block overflow-hidden rounded-md ring-1 ring-secondary hover:opacity-90"
                                                >
                                                    <img src={img?.url} alt="" className="h-40 w-full object-cover" />
                                                </a>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="py-6 text-center text-sm text-tertiary">No image found</div>
                                    )}
                                </div>
                            </div>
                        </Dialog>
                    </Modal>
                )}
            </ModalOverlay>
        </DefaultLayout>
    );
}
