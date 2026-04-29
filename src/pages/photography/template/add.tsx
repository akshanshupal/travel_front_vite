import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { DefaultLayout } from "@/layouts/DefaultLayout";
import { TableCard } from "@/components/application/table/table";
import { Input } from "@/components/base/input/input";
import { Button } from "@/components/base/buttons/button";
import { useStoreSnackbar } from "@/store/snackbar";
import { addPhotographyTemplate } from "@/pages/photography/shared/templates";
import { DeliverablesDnd, type DeliverableCollectionItem } from "@/pages/photography/shared/deliverables-dnd";
import { getPhotographyDeliverables } from "@/utils/services/photographyDeliverableService";

const randomId = () => `custom-${Date.now()}`;
const normalize12Hour = (value: string) => {
    const text = String(value || "").trim().toUpperCase();
    const match = text.match(/^(\d{1,2})(?::(\d{1,2}))?\s*(AM|PM)$/);
    if (!match) return "";
    const hour = Number(match[1]);
    const minute = Number(match[2] ?? 0);
    if (Number.isNaN(hour) || Number.isNaN(minute) || hour < 1 || hour > 12 || minute < 0 || minute > 59) return "";
    return `${hour}:${String(minute).padStart(2, "0")} ${match[3]}`;
};

export default function PhotographyTemplateAddPage() {
    const navigate = useNavigate();
    const { showSnackbar } = useStoreSnackbar();
    const [form, setForm] = useState({
        name: "",
        mainEventName: "",
        deliverables: [] as string[],
        packageCost: "0",
    });
    const [collection, setCollection] = useState<DeliverableCollectionItem[]>([]);
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    const fetchCollection = async () => {
        try {
            const response: any = await getPhotographyDeliverables({ limit: "all" });
            const resolved = response?.data ?? response;
            const list = Array.isArray(resolved?.data) ? resolved.data : Array.isArray(resolved) ? resolved : [];
            setCollection(
                list.map((item: any) => ({
                    id: String(item.id),
                    title: String(item.title || ""),
                })),
            );
        } catch {
            setCollection([]);
        }
    };

    useEffect(() => {
        fetchCollection();
    }, []);

    const handleSave = () => {
        if (!form.name.trim() || !form.mainEventName.trim()) {
            showSnackbar({ title: "Validation Error", description: "Template title and main event are required", color: "danger" });
            return;
        }
        if ((startTime && !endTime) || (!startTime && endTime)) {
            showSnackbar({ title: "Validation Error", description: "Please select both start and end time", color: "danger" });
            return;
        }
        const normalizedStart = startTime ? normalize12Hour(startTime) : "";
        const normalizedEnd = endTime ? normalize12Hour(endTime) : "";
        if ((startTime && !normalizedStart) || (endTime && !normalizedEnd)) {
            showSnackbar({ title: "Validation Error", description: "Please enter time in AM/PM format (e.g. 8:00 PM)", color: "danger" });
            return;
        }
        const timing = normalizedStart && normalizedEnd ? `${normalizedStart} to ${normalizedEnd}` : "";
        addPhotographyTemplate({
            id: randomId(),
            name: form.name.trim(),
            mainEventName: form.mainEventName.trim(),
            timing,
            deliverables: (form.deliverables || []).filter(Boolean),
            packageCost: Number(form.packageCost || 0),
        });
        showSnackbar({ title: "Success", description: "Template added", color: "success" });
        navigate("/photography/template");
    };

    return (
        <DefaultLayout>
            <TableCard.Root>
                <TableCard.Header title="Add Photography Template" />
                <div className="space-y-3 bg-primary px-4 py-5 md:px-6">
                    <Input label="Template Title *" value={form.name} onChange={(value) => setForm((prev) => ({ ...prev, name: value }))} />
                    <Input
                        label="Main Event Name *"
                        value={form.mainEventName}
                        onChange={(value) => setForm((prev) => ({ ...prev, mainEventName: value }))}
                    />
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                        <Input label="Timing From (AM/PM)" value={startTime} onChange={(value) => setStartTime(value)} placeholder="e.g. 8:00 PM" />
                        <Input label="Timing To (AM/PM)" value={endTime} onChange={(value) => setEndTime(value)} placeholder="e.g. 2:00 AM" />
                    </div>
                    <Input
                        label="Timing Range"
                        value={normalize12Hour(startTime) && normalize12Hour(endTime) ? `${normalize12Hour(startTime)} to ${normalize12Hour(endTime)}` : ""}
                        onChange={() => undefined}
                        isDisabled
                    />
                    <DeliverablesDnd
                        collection={collection}
                        deliverables={form.deliverables}
                        onChange={(deliverables) => setForm((prev) => ({ ...prev, deliverables }))}
                        title="Template Deliverables"
                    />
                    <Input
                        label="Package Cost (INR)"
                        type="number"
                        value={form.packageCost}
                        onChange={(value) => setForm((prev) => ({ ...prev, packageCost: value }))}
                    />
                    <div className="flex justify-end gap-2">
                        <Button color="secondary" onClick={() => navigate("/photography/template")}>
                            Back
                        </Button>
                        <Button color="primary" onClick={handleSave}>
                            Save
                        </Button>
                    </div>
                </div>
            </TableCard.Root>
        </DefaultLayout>
    );
}
