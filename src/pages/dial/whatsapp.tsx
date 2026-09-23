import { Button } from "@/components/base/buttons/button";
import { DialShell, EmptyPanel, Metric } from "./shared";

const templates = [
    { title: "Booking confirmation", body: "Hi {{name}}, your booking {{bookingId}} is confirmed. Reply here for any changes." },
    { title: "Follow-up reminder", body: "Hello {{name}}, following up on your travel plan. When can we connect?" },
    { title: "Payment reminder", body: "Hi {{name}}, a payment of {{amount}} is pending for your trip. Pay securely here." },
];

export default function DialWhatsappPage() {
    return <DialShell title="Neo WhatsApp" description="Manage WhatsApp templates, broadcasts, and conversations.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Metric label="Messages sent" value={0} />
            <Metric label="Delivered" value={0} tone="success" />
            <Metric label="Read" value={0} tone="brand" />
            <Metric label="Replies" value={0} tone="warning" />
        </div>
        <div className="rounded-xl border border-[#e8e2eb] bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-semibold">Message templates</h2>
                <Button size="sm" color="secondary">New broadcast</Button>
            </div>
            {templates.length ? <div className="grid gap-3 md:grid-cols-3">{templates.map((template) => <div key={template.title} className="rounded-lg border border-[#eee9f0] p-4"><p className="text-sm font-semibold">{template.title}</p><p className="mt-2 text-xs leading-5 text-[#817987]">{template.body}</p><div className="mt-3 flex gap-2"><Button size="sm" color="secondary">Send</Button><Button size="sm" color="tertiary">Edit</Button></div></div>)}</div> : <EmptyPanel title="No templates" description="WhatsApp templates will appear here once created." />}
        </div>
    </DialShell>;
}
