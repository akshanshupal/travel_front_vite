import type { TimeFieldProps as AriaTimeFieldProps, TimeValue } from "react-aria-components";
import { TimeField as AriaTimeField } from "react-aria-components";
import { DateInput } from "./date-input";
import { cx } from "@/utils/cx";

interface TimePickerProps extends Omit<AriaTimeFieldProps<TimeValue>, "children"> {
    className?: string;
}

export const TimePicker = ({ className, ...props }: TimePickerProps) => {
    return (
        <AriaTimeField {...props} className={cx("flex flex-col gap-1", className)}>
            <DateInput />
        </AriaTimeField>
    );
};
