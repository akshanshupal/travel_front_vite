import { useEffect, useState } from "react";
import { Button } from "@/components/base/buttons/button";
import { ModalOverlay, Modal, Dialog } from "@/components/application/modals/modal";
import HotelChangeForm from "./hotel-change-form";

interface HotelChangeSavedItineraryProps {
    data: string;
    onSuccess: (data: string) => void;
    onFailure: () => void;
}

interface HotelItem {
    id: string;
    name: string;
    index: number;
    dayContext: string;
    locationHint: string;
}

export default function HotelChangeSavedItinerary({ data, onSuccess, onFailure }: HotelChangeSavedItineraryProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [editHotelData, setEditHotelData] = useState<any>(null);
    const [mailDt, setMailDt] = useState<string | null>(null);
    const [hotels, setHotels] = useState<HotelItem[]>([]);

    const onOpenChange = (open: boolean) => {
        setIsOpen(open);
        if (!open) {
            setEditHotelData(null);
        }
    };

    // Function to update hotel details
    const handleUpdate = (ht: any) => {
        setMailDt((prevMailDt) => {
            if (!prevMailDt) return prevMailDt;

            // Create a temporary div to manipulate the HTML string
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = prevMailDt;

            const updatedAnchors = tempDiv.querySelectorAll('a[href*="/hotel-images/"]');

            if (updatedAnchors[ht.index]) {
                const oldHref = updatedAnchors[ht.index].getAttribute("href");
                if (oldHref) {
                    const newHref = oldHref.replace(/\/hotel-images\/[^/]+/, `/hotel-images/${ht.id}`);
                    (updatedAnchors[ht.index] as HTMLElement).innerText = ht.name;
                    updatedAnchors[ht.index].setAttribute("href", newHref);
                }
            }

            return tempDiv.innerHTML; // Convert updated HTML back to string
        });

        onOpenChange(false);
        setEditHotelData(null);
    };

    useEffect(() => {
        if (editHotelData) {
            setIsOpen(true);
        }
    }, [editHotelData]);

    useEffect(() => {
        setMailDt(data);
    }, [data]);

    const findDayContext = (element: Element | null, limit = 5): string => {
        if (!element || limit === 0) return "";

        // Check previous siblings for "Day X" pattern
        let sibling = element.previousElementSibling;
        let checks = 0;
        while (sibling && checks < 10) {
            const text = sibling.textContent || "";
            // Look for "Day" followed by a number
            if (/Day\s*\d+/i.test(text)) {
                return text.trim();
            }
            sibling = sibling.previousElementSibling;
            checks++;
        }

        // Go up one level
        return findDayContext(element.parentElement, limit - 1);
    };

    useEffect(() => {
        if (!mailDt) return;

        // Parse HTML to find hotels and their context
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = mailDt;

        const anchors = tempDiv.querySelectorAll('a[href*="/hotel-images/"]');
        const extractedHotels: HotelItem[] = [];

        anchors.forEach((anchor, index) => {
            const href = anchor.getAttribute("href") || "";
            const id = href.split("/").pop() || "";
            const name = (anchor as HTMLElement).innerText;

            const dayContext = findDayContext(anchor) || `Hotel ${index + 1}`;
            
            // Try to extract location from context (e.g. "Day 1: Arrival in Delhi" -> "Delhi")
            let locationHint = "";
            const parts = dayContext.split(/[:|-]/);
            if (parts.length > 1) {
                // Take the last part or the part after Day X
                const potentialLocation = parts[parts.length - 1].trim();
                // Filter out common words if needed, but for now just pass it
                // Maybe clean it up a bit (remove "Arrival in", "Transfer to")
                locationHint = potentialLocation.replace(/Arrival in|Transfer to|Drive to/gi, "").trim();
            }
            
            // If locationHint is empty, try to use the whole context if it's short
            if (!locationHint && dayContext.length < 30) {
                 locationHint = dayContext;
            }
            
            // If still empty, default to "Other"
            if (!locationHint) {
                locationHint = "Other";
            }

            extractedHotels.push({
                id,
                name,
                index,
                dayContext,
                locationHint
            });
        });

        setHotels(extractedHotels);

    }, [mailDt]);

    // Group hotels by locationHint (Site)
    const groupedHotels = hotels.reduce((acc, hotel) => {
        const site = hotel.dayContext.split(":")[1].trim() || "Other";
        if (!acc[site]) {
            acc[site] = [];
        }
        acc[site].push(hotel);
        return acc;
    }, {} as Record<string, HotelItem[]>);

    const handleSubmit = () => {
        if (mailDt) {
            onSuccess(mailDt);
        }
    };

    return (
        <div className="flex flex-col h-full bg-white dark:bg-gray-900">
            <div className="flex-1 overflow-y-auto min-h-0 p-1">
                <h3 className="text-lg font-semibold mb-4 sticky top-0 bg-white dark:bg-gray-900 dark:text-gray-100 pb-2 border-b dark:border-gray-700 z-20">
                    Itinerary Hotels ({hotels.length})
                </h3>
                <div className="space-y-6">
                    {Object.keys(groupedHotels).length === 0 ? (
                        <p className="text-gray-500 dark:text-gray-400 text-sm">No hotels found in this itinerary.</p>
                    ) : (
                        Object.entries(groupedHotels).map(([site, siteHotels]) => (
                            <div key={site} className="mb-6 last:mb-0">
                                <h4 className="text-sm font-bold text-gray-700 dark:text-gray-200 mb-3 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-md flex items-center justify-between">
                                    {site}
                                    <span className="text-xs font-normal text-gray-500 dark:text-gray-400">{siteHotels.length} Hotel{siteHotels.length !== 1 ? 's' : ''}</span>
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pl-2 border-l-2 border-gray-100 dark:border-gray-800">
                                    {siteHotels.map((hotel) => (
                                        <div key={hotel.index} className="p-3 border dark:border-gray-700 rounded-lg hover:border-primary dark:hover:border-primary transition-colors bg-gray-50 dark:bg-gray-800/50 flex flex-col justify-between h-full">
                                            <div>
                                                <div className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                                                    {hotel.name}
                                                </div>
                                            </div>
                                            <Button 
                                                size="sm" 
                                                color="secondary"
                                                className="w-full mt-2"
                                                onClick={() => setEditHotelData({
                                                    ...hotel,
                                                    location: hotel.locationHint === "Other" ? "" : hotel.locationHint
                                                })}
                                            >
                                                Change Hotel
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <div className="flex gap-2 pt-4 justify-end border-t dark:border-gray-700 mt-4">
                <Button onClick={onFailure} color="secondary" size="md">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary" size="md">
                    Save Changes
                </Button>
            </div>

            <ModalOverlay isOpen={isOpen} onOpenChange={onOpenChange}>
                <Modal className="bg-white dark:bg-gray-900 rounded-lg p-6 max-w-3xl w-full">
                    <Dialog>
                        {() => (
                            <div className="flex flex-col w-full">
                                {(() => {
                                    const fullText = editHotelData?.dayContext || "Selected Day";
                                    // Split by the first colon to separate "Day X" from the description
                                    const firstColonIndex = fullText.indexOf(':');
                                    let dayPart = fullText;
                                    let locationPart = "";
                                    
                                    if (firstColonIndex !== -1) {
                                        dayPart = fullText.substring(0, firstColonIndex);
                                        locationPart = fullText.substring(firstColonIndex + 1).trim();
                                    }

                                    return (
                                        <div className="mb-5 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                                                        Change Hotel for {dayPart}
                                                    </h3>
                                                    {locationPart && (
                                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">
                                                            {locationPart}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 flex items-center gap-2">
                                                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Current Hotel:</span>
                                                <span className="text-sm font-medium text-primary">{editHotelData?.name}</span>
                                            </div>
                                        </div>
                                    );
                                })()}
                                <HotelChangeForm 
                                    updatedHotelDt={handleUpdate} 
                                    data={editHotelData}
                                    onCancel={() => onOpenChange(false)}
                                />
                            </div>
                        )}
                    </Dialog>
                </Modal>
            </ModalOverlay>
        </div>
    );
}
