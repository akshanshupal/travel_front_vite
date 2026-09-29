import { PropsWithChildren } from "react";

export const PublicLayout = ({ children }: PropsWithChildren) => {
    return (
        <div className="min-h-dvh bg-background text-foreground">
            <main className="mx-auto max-w-5xl p-6">{children}</main>
        </div>
    );
};
