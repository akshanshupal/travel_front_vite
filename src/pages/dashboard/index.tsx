import { DefaultLayout } from "@/layouts/DefaultLayout";
import { useEffect, useState } from "react";
import { dashboardService } from "@/utils/services/dashboardService";
import { Link } from "react-router";
import { useStoreSnackbar } from "@/store/snackbar";

export default function DashboardPage() {
    const [summary, setSummary] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const run = async () => {
            try {
                const res = await dashboardService.getSummary({ status: "true" });
                setSummary(res);
            } catch (error: any) {
                useStoreSnackbar.getState().showSnackbar({
                    title: "Dashboard Error",
                    description: error?.message || "Failed to load dashboard summary.",
                    color: "danger",
                });
            } finally {
                setLoading(false);
            }
        };
        run();
    }, []);

    const cards = [
        {
            title: "Total Itineraries",
            value: summary?.itineraries,
            href: "/itinerary/list",
            bg: "bg-red-50",
            text: "text-red-600",
        },
        {
            title: "Total Area",
            value: summary?.areas,
            href: "/itinerary/area",
            bg: "bg-orange-50",
            text: "text-orange-600",
        },
        {
            title: "Total Sites",
            value: summary?.sites,
            href: "/itinerary/site",
            bg: "bg-lime-50",
            text: "text-lime-700",
        },
        {
            title: "Total Hotel",
            value: summary?.hotels,
            href: "/itinerary/hotel",
            bg: "bg-sky-50",
            text: "text-sky-700",
        },
        {
            title: "Total Hotel Types",
            value: summary?.hotelCategories,
            href: "/itinerary/hotel/category",
            bg: "bg-emerald-50",
            text: "text-emerald-700",
        },
        {
            title: "Total Users",
            value: summary?.users,
            href: "/settings/user",
            bg: "bg-pink-50",
            text: "text-pink-700",
        },
    ] as const;

    return (
        <DefaultLayout>
            <div className="space-y-4">
                <div>
                    <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
                    <p className="text-sm text-gray-600">Summary overview</p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {cards.map((card) => (
                        <div key={card.title} className={`rounded-xl border border-gray-200 p-4 ${card.bg}`}>
                            <h2 className={`text-center text-xl font-medium ${card.text}`}>{card.title}</h2>
                            <div className="mt-2 flex justify-center">
                                {loading ? (
                                    <div className="h-10 w-20 animate-pulse rounded-lg bg-white/70" />
                                ) : (
                                    <p className={`text-center text-4xl font-semibold tabular-nums ${card.text}`}>
                                        {card.value ?? 0}
                                    </p>
                                )}
                            </div>
                            <div className="mt-3 flex justify-center">
                                <Link to={card.href} className={`text-xs font-medium ${card.text} hover:underline`}>
                                    View detail ›
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </DefaultLayout>
    );
}
