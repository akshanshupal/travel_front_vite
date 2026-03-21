import { PropsWithChildren } from "react";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";

export const AuthLayout = ({ children }: PropsWithChildren) => {
    return (
        <div className="min-h-dvh grid place-items-center bg-gray-50 dark:bg-[#0B0D12]">
            <div className="w-full max-w-md rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#111318] p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-2">
                    <FeaturedIcon color="brand" />
                    <h1 className="text-lg font-semibold">TripZipper Admin</h1>
                </div>
                {children}
            </div>
        </div>
    );
};
