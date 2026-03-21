import { useEffect, useState } from "react";
import { Input } from "@/components/base/input/input";
import { Button } from "@/components/base/buttons/button";
import { Select } from "@/components/base/select/select";
import { SelectItem } from "@/components/base/select/select-item";
import { SearchMd } from "@untitledui/icons";
import { getHotels, getHotelCategory } from "@/utils/services/hotelService";

interface HotelChangeFormProps {
    data: any;
    updatedHotelDt: (data: any) => void;
    onCancel: () => void;
}

export default function HotelChangeForm({ data, updatedHotelDt, onCancel }: HotelChangeFormProps) {
    const [htData, setHtData] = useState<any>({});
    const [selectedHotelCategory, setSelectedHotelCategory] = useState<string | null>(null);
    const [hotelcategory, sethotelcategory] = useState<any[]>([]);
    const [isLoadingHotel, setIsLoadingHotel] = useState(false);
    const [availableHotels, setAvailableHotels] = useState<any[]>([]);
    const [selectedHotels, setSelectedHotels] = useState<string | null>(null);

    const [filters, setFilters] = useState({
        location: "",
        name: "",
        hotelCategory: "",
    });
    const [debouncedFilters, setDebouncedFilters] = useState(filters);

    useEffect(() => {
        const fetchData = async () => {
            const params = {
                limit: "all",
            };
            const response: any = await getHotelCategory(params);
            if (response) {
                sethotelcategory(response);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedFilters(filters);
        }, 1000);
        return () => {
            clearTimeout(handler);
        };
    }, [filters]);

    useEffect(() => {
        const fetchData = async () => {
            let params: any = {
                limit: "100",
                populate: "category",
                select_category: "title",
            };

            if (debouncedFilters.location) {
                params.location = debouncedFilters.location;
            }
            if (debouncedFilters.name) {
                params.name = debouncedFilters.name;
            }

            if (debouncedFilters.hotelCategory) {
                params.category = debouncedFilters.hotelCategory;
            }

            setIsLoadingHotel(true);

            try {
                // Only fetch if at least one filter is active
                if (debouncedFilters.location || debouncedFilters.name || debouncedFilters.hotelCategory) {
                    const response: any = await getHotels(params);
                    if (response) {
                        setAvailableHotels(Array.isArray(response) ? response : response.data || []);
                    }
                } else {
                    setAvailableHotels([]);
                }
            } catch (error) {
                console.error("Error fetching hotels", error);
            } finally {
                setIsLoadingHotel(false);
            }
        };
        fetchData();
    }, [debouncedFilters]);

    useEffect(() => {
        if (data) {
            setHtData(data);
            // Removed location pre-filling as per requirement
        }
    }, [data]);

    const handleInputChange = (key: string, value: string) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [key]: value,
        }));
    };

    const handleChangeHotel = (key: any) => {
        const selectedHotel = availableHotels.find(h => h.id === key);
        if (selectedHotel) {
            setHtData({ ...htData, id: selectedHotel.id, name: selectedHotel.name });
            setSelectedHotels(key);
        }
    };

    return (
        <div className="flex flex-col h-[60vh]">
            {/* Filters Header */}
            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                        placeholder="Search by location"
                        label="Location"
                        icon={SearchMd}
                        name="location"
                        value={filters.location}
                        onChange={(value) => handleInputChange("location", value)}
                    />

                    <Select
                        label="Category"
                        placeholder="Select Category"
                        selectedKey={selectedHotelCategory}
                        onSelectionChange={(key) => {
                            const val = key as string;
                            setSelectedHotelCategory(val);
                            handleInputChange("hotelCategory", val);
                        }}
                    >
                        <SelectItem id="null">All Categories</SelectItem>
                        {hotelcategory.map((item) => (
                            <SelectItem key={item.id} id={item.id}>
                                {item.title}
                            </SelectItem>
                        ))}
                    </Select>

                    <Input
                        placeholder="Search by hotel name"
                        label="Hotel Name"
                        icon={SearchMd}
                        name="name"
                        value={filters.name}
                        onChange={(value) => handleInputChange("name", value)}
                    />
                </div>
            </div>

            {/* Results Area */}
            <div className="flex-1 overflow-y-auto min-h-0 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 p-4 mb-4">
                {filters.location === "" && filters.name === "" ? (
                    <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 dark:text-gray-400">
                        <SearchMd className="w-8 h-8 mb-2 opacity-50" />
                        <p className="text-sm">Please enter a location to search for hotels</p>
                    </div>
                ) : isLoadingHotel ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-2"></div>
                        <p className="text-sm">Finding hotels...</p>
                    </div>
                ) : availableHotels.length > 0 ? (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 pb-2 border-b dark:border-gray-700">
                            <span>Found {availableHotels.length} hotels in {filters.location}</span>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-2">
                            {availableHotels.map((hotel) => (
                                <div 
                                    key={hotel.id}
                                    className={`
                                        p-3 rounded-lg border cursor-pointer transition-all
                                        flex items-center justify-between
                                        ${selectedHotels === hotel.id 
                                            ? 'border-primary bg-primary-50 dark:bg-primary-900/20 dark:border-primary' 
                                            : 'border-gray-200 dark:border-gray-700 hover:border-primary/50 dark:hover:border-primary/50'
                                        }
                                    `}
                                    onClick={() => handleChangeHotel(hotel.id)}
                                >
                                    <div>
                                        <div className="font-medium text-gray-900 dark:text-gray-100">{hotel.name}</div>
                                        {hotel.category?.title && (
                                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{hotel.category.title}</div>
                                        )}
                                    </div>
                                    {selectedHotels === hotel.id && (
                                        <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                                            <div className="w-1.5 h-1.5 bg-white rounded-full" />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 dark:text-gray-400">
                        <p className="text-sm">No hotels found matching your criteria</p>
                        <Button 
                            color="link-color" 
                            size="sm" 
                            onClick={() => setFilters({ location: "", name: "", hotelCategory: "" })}
                            className="mt-2"
                        >
                            Clear filters
                        </Button>
                    </div>
                )}
            </div>

            {/* Footer Action */}
            <div className="flex justify-end pt-2 border-t dark:border-gray-700 gap-3">
                <Button
                    onClick={onCancel}
                    color="secondary"
                    size="lg"
                    className="w-full md:w-auto min-w-[100px]"
                >
                    Cancel
                </Button>
                <Button
                    onClick={() => updatedHotelDt(htData)}
                    color="primary"
                    size="lg"
                    isDisabled={!selectedHotels}
                    className="w-full md:w-auto min-w-[120px]"
                >
                    Update Hotel
                </Button>
            </div>
        </div>
    );
}
