import { useEffect, useState } from "react";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { DatePicker } from "./date-picker";
import { Input } from "@/components/base/input/input";
import { parseDate, DateValue } from "@internationalized/date";

interface DateInputWithTimeProps {
    fieldName: string;
    label: string;
    formData: any;
    handleChange: (key: string, value: any) => void;
    errors?: any;
    hasTimeField: string;
}

export const DateInputWithTime = ({ fieldName, label, formData, handleChange, errors, hasTimeField }: DateInputWithTimeProps) => {
    const fieldValue = formData[fieldName] || "";
    const isTimeSelected = formData[hasTimeField] || false;
    const [time, setTime] = useState("00:00");

    // Initialize time from field value if present
    useEffect(() => {
        if (fieldValue && fieldValue.includes("T")) {
            const timePart = fieldValue.split("T")[1];
            if (timePart) {
                // Handle time format potentially being HH:mm:ss.SSSZ or just HH:mm
                // We just need HH:mm for the input
                const cleanTimePart = timePart.substring(0, 5);
                setTime(cleanTimePart);
            }
        }
    }, [fieldValue]);

    const handleCheckboxChange = (isSelected: boolean) => {
        handleChange(hasTimeField, isSelected);
        const datePart = fieldValue ? fieldValue.split("T")[0] : "";
        
        if (isSelected) {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const currentTime = `${hours}:${minutes}`;
            
            setTime(currentTime);
            handleChange(fieldName, datePart ? `${datePart}T${currentTime}` : "");
        } else {
             handleChange(fieldName, datePart ? `${datePart}T00:00` : "");
        }
    };

    const handleDateChange = (date: DateValue | null) => {
        if (!date) {
            handleChange(fieldName, "");
            return;
        }
        const dateStr = date.toString();
        const timePart = isTimeSelected ? time : "00:00";
        handleChange(fieldName, `${dateStr}T${timePart}`);
    };

    const handleTimeChange = (newTime: string) => {
        setTime(newTime);
        const datePart = fieldValue ? fieldValue.split("T")[0] : "";
        if (datePart) {
             handleChange(fieldName, `${datePart}T${newTime}`);
        }
    };

    // Helper to safely parse date
    const getSafeDate = (val: string) => {
        try {
            return val ? parseDate(val.split("T")[0]) : null;
        } catch {
            return null;
        }
    };

    return (
        <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between gap-2">
                <div className="text-sm font-medium text-primary">{label}*</div>
                <Checkbox 
                    isSelected={isTimeSelected} 
                    onChange={handleCheckboxChange} 
                    label="Add Time" 
                    size="sm"
                />
            </div>
            <div className="flex gap-2">
                <div className={isTimeSelected ? "w-1.5/2.5" : "w-full"}>
                    <DatePicker
                        value={getSafeDate(fieldValue)}
                        onChange={handleDateChange}
                    />
                </div>
                {isTimeSelected && (
                    <div className="w-1/2.5">
                        <Input
                            type="time"
                            value={time}
                            onChange={handleTimeChange}
                            aria-label="Time"
                        />
                    </div>
                )}
            </div>
             {errors && errors[fieldName] && <p className="text-xs text-error-primary">{errors[fieldName]}</p>}
        </div>
    );
};
