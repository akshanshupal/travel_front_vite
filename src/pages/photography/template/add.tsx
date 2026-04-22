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
const to12Hour = (value: string) => {
    if (!value) return "";
    const [h, m] = value.split(":").map((part) => Number(part));
    if (Number.isNaN(h) || Number.isNaN(m)) return value;
    const suffix = h >= 12 ? "PM" : "AM";
    const hour = h % 12 || 12;
    return `${hour}:${String(m).padStart(2, "0")} ${suffix}`;
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
                    content: String(item.content || ""),
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
        const timing = startTime && endTime ? `${to12Hour(startTime)} to ${to12Hour(endTime)}` : "";
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
                        <Button color="primary" onClick={handleSave}>
                            Save
                        </Button>
                    </div>
                </div>
            </TableCard.Root>
        </DefaultLayout>
    );
}
