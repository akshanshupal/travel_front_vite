import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { DefaultLayout } from "@/layouts/DefaultLayout";
import { TableCard } from "@/components/application/table/table";
import { Input } from "@/components/base/input/input";
import { Button } from "@/components/base/buttons/button";
import { useStoreSnackbar } from "@/store/snackbar";
import { getPhotographyTemplateById, updatePhotographyTemplateById } from "@/pages/photography/shared/templates";
import { DeliverablesDnd, type DeliverableCollectionItem } from "@/pages/photography/shared/deliverables-dnd";
import { getPhotographyDeliverables } from "@/utils/services/photographyDeliverableService";

const to12Hour = (value: string) => {
    if (!value) return "";
    const [h, m] = value.split(":").map((part) => Number(part));
    if (Number.isNaN(h) || Number.isNaN(m)) return value;
    const suffix = h >= 12 ? "PM" : "AM";
    const hour = h % 12 || 12;
    return `${hour}:${String(m).padStart(2, "0")} ${suffix}`;
};

const to24Hour = (value: string) => {
    const text = String(value || "").trim().toUpperCase();
    const match = text.match(/^(\d{1,2})(?::(\d{2}))?\s*(AM|PM)$/);
    if (!match) return "";
    const rawHour = Number(match[1]);
    const minute = Number(match[2] || 0);
    if (Number.isNaN(rawHour) || Number.isNaN(minute) || rawHour < 1 || rawHour > 12 || minute < 0 || minute > 59) return "";
    const suffix = match[3];
    let hour = rawHour % 12;
    if (suffix === "PM") hour += 12;
    return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
};

const parseTimingRange = (value: string) => {
    const parts = String(value || "")
        .split(/\s+to\s+/i)
        .map((item) => item.trim())
        .filter(Boolean);
    if (parts.length !== 2) return { start: "", end: "" };
    const start = parts[0].includes("AM") || parts[0].includes("PM") || parts[0].includes("am") || parts[0].includes("pm") ? to24Hour(parts[0]) : parts[0];
    const end = parts[1].includes("AM") || parts[1].includes("PM") || parts[1].includes("am") || parts[1].includes("pm") ? to24Hour(parts[1]) : parts[1];
    return { start, end };
};

export default function PhotographyTemplateEditPage() {
    const navigate = useNavigate();
    const params = useParams();
    const id = String(params.id || "");
    const { showSnackbar } = useStoreSnackbar();
    const [loading, setLoading] = useState(true);
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
                    content: String(item.content || ""),
                })),
            );
        } catch {
            setCollection([]);
        }
    };

    useEffect(() => {
        const template = getPhotographyTemplateById(id);
        if (!template) {
            setLoading(false);
            return;
        }
        setForm({
            name: template.name,
            mainEventName: template.mainEventName,
            deliverables: template.deliverables || [],
            packageCost: String(template.packageCost || 0),
        });
        const parsedTiming = parseTimingRange(template.timing);
        setStartTime(parsedTiming.start);
        setEndTime(parsedTiming.end);
        setLoading(false);
    }, [id]);

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
        const timing = startTime && endTime ? `${to12Hour(startTime)} to ${to12Hour(endTime)}` : "";
        updatePhotographyTemplateById(id, {
            name: form.name.trim(),
            mainEventName: form.mainEventName.trim(),
            timing,
            deliverables: (form.deliverables || []).filter(Boolean),
            packageCost: Number(form.packageCost || 0),
        });
        showSnackbar({ title: "Success", description: "Template updated", color: "success" });
        navigate("/photography/template");
    };

    return (
        <DefaultLayout>
            <TableCard.Root>
                <TableCard.Header title="Edit Photography Template" />
                <div className="space-y-3 bg-primary px-4 py-5 md:px-6">
                    <Input label="Template Title *" value={form.name} onChange={(value) => setForm((prev) => ({ ...prev, name: value }))} />
                    <Input
                        label="Main Event Name *"
                        value={form.mainEventName}
                        onChange={(value) => setForm((prev) => ({ ...prev, mainEventName: value }))}
                    />
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                        <Input label="Timing From" type="time" value={startTime} onChange={(value) => setStartTime(value)} />
                        <Input label="Timing To" type="time" value={endTime} onChange={(value) => setEndTime(value)} />
                    </div>
                    <Input label="Timing Range" value={startTime && endTime ? `${to12Hour(startTime)} to ${to12Hour(endTime)}` : ""} onChange={() => undefined} isDisabled />
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
                        <Button color="primary" onClick={handleSave} isDisabled={loading}>
                            Update
                        </Button>
                    </div>
                </div>
            </TableCard.Root>
        </DefaultLayout>
    );
}
