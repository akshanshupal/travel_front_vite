import { PropsWithChildren } from "react";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";

export const AuthLayout = ({ children }: PropsWithChildren) => {
    return (
        <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gray-50 dark:bg-[#0B0D12]">
            {/* Animated SVG Background */}
            <div className="absolute inset-0 z-0 flex items-center justify-center opacity-60 dark:opacity-20">
                <svg
                    className="h-[150%] w-[150%] max-w-none animate-[spin_60s_linear_infinite] opacity-50 blur-[100px]"
                    viewBox="0 0 1000 1000"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                >
                    <defs>
                        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#ec4899" stopOpacity="0.4" />
                        </linearGradient>
                    </defs>
                    <circle cx="500" cy="500" r="400" fill="url(#grad1)" />
                    <circle cx="200" cy="300" r="300" fill="#3b82f6" opacity="0.3" className="animate-[bounce_20s_infinite]" />
                    <circle cx="800" cy="700" r="300" fill="#ec4899" opacity="0.3" className="animate-[pulse_15s_infinite]" />
                </svg>
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-md px-4 sm:px-6">
                <div className="animate-in fade-in zoom-in-95 duration-500 rounded-2xl border border-gray-200/50 bg-white/80 p-8 shadow-2xl backdrop-blur-xl dark:border-gray-800/50 dark:bg-[#111318]/80 sm:p-10">
                    <div className="mb-8 flex flex-col items-center gap-4 text-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-500/10 shadow-sm">
                            <FeaturedIcon color="brand" />
                        </div>
                        <div>
                            <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Welcome Back</h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Sign in to your TripZipper admin account</p>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
};
