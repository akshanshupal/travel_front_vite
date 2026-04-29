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

const to12HourFrom24 = (value: string) => {
    if (!value) return "";
    const match = String(value).match(/^([01]?\d|2[0-3]):([0-5]\d)$/);
    if (!match) return "";
    const h = Number(match[1]);
    const m = Number(match[2]);
    const suffix = h >= 12 ? "PM" : "AM";
    const hour = h % 12 || 12;
    return `${hour}:${String(m).padStart(2, "0")} ${suffix}`;
};

const normalize12Hour = (value: string) => {
    const text = String(value || "").trim().toUpperCase();
    const match = text.match(/^(\d{1,2})(?::(\d{2}))?\s*(AM|PM)$/);
    if (!match) return "";
    const rawHour = Number(match[1]);
    const minute = Number(match[2] || 0);
    if (Number.isNaN(rawHour) || Number.isNaN(minute) || rawHour < 1 || rawHour > 12 || minute < 0 || minute > 59) return "";
    return `${rawHour}:${String(minute).padStart(2, "0")} ${match[3]}`;
};

const parseTimingRange = (value: string) => {
    const parts = String(value || "")
        .split(/\s+to\s+/i)
        .map((item) => item.trim())
        .filter(Boolean);
    if (parts.length !== 2) return { start: "", end: "" };
    const resolvePart = (part: string) => {
        const normalized = normalize12Hour(part);
        if (normalized) return normalized;
        const from24 = to12HourFrom24(part);
        return from24 || "";
    };
    const start = resolvePart(parts[0]);
    const end = resolvePart(parts[1]);
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
        const normalizedStart = startTime ? normalize12Hour(startTime) : "";
        const normalizedEnd = endTime ? normalize12Hour(endTime) : "";
        if ((startTime && !normalizedStart) || (endTime && !normalizedEnd)) {
            showSnackbar({ title: "Validation Error", description: "Please enter time in AM/PM format (e.g. 8:00 PM)", color: "danger" });
            return;
        }
        const timing = normalizedStart && normalizedEnd ? `${normalizedStart} to ${normalizedEnd}` : "";
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
                        <Button color="primary" onClick={handleSave} isDisabled={loading}>
                            Update
                        </Button>
                    </div>
                </div>
            </TableCard.Root>
        </DefaultLayout>
    );
}
