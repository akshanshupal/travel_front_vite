import { DefaultLayout } from "@/layouts/DefaultLayout";
import { TableCard } from "@/components/application/table/table";
import { useNavigate } from "react-router";

export default function LeadSettingsPage() {
    const navigate = useNavigate();

    const cards = [
        {
            title: "Custom Contact Properties",
            description: "Define custom fields to capture additional lead information specific to your business.",
            icon: "🏷️",
            href: "/lead-management/settings/contact-properties",
        },
    ];

    return (
        <DefaultLayout>
            <TableCard.Root>
                <TableCard.Header title="Lead Management Settings" />
                <div className="bg-primary px-4 py-6 md:px-6">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {cards.map((card) => (
                            <button
                                key={card.href}
                                type="button"
                                onClick={() => navigate(card.href)}
                                className="group flex flex-col gap-3 rounded-xl border border-secondary bg-primary p-5 text-left ring-1 ring-secondary transition-all hover:border-brand-500 hover:bg-secondary hover:shadow-md"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-3xl">{card.icon}</span>
                                    <h3 className="text-sm font-semibold text-primary group-hover:text-brand-600">
                                        {card.title}
                                    </h3>
                                </div>
                                <p className="text-xs text-tertiary leading-relaxed">{card.description}</p>
                                <span className="mt-auto text-xs font-medium text-brand-600 group-hover:underline">
                                    Manage →
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </TableCard.Root>
        </DefaultLayout>
    );
}
