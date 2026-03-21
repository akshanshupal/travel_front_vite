import { PropsWithChildren } from "react";

export const PublicLayout = ({ children }: PropsWithChildren) => {
    return (
        <div className="min-h-dvh bg-white dark:bg-[#0B0D12]">
            <main className="mx-auto max-w-5xl p-6">{children}</main>
        </div>
    );
};
