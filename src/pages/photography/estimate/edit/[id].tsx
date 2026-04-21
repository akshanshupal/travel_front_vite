import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { DefaultLayout } from "@/layouts/DefaultLayout";
import { TableCard } from "@/components/application/table/table";
import { Input } from "@/components/base/input/input";
import { Select } from "@/components/base/select/select";
import { TextArea } from "@/components/base/textarea/textarea";
import { Button } from "@/components/base/buttons/button";
import { useStoreSnackbar } from "@/store/snackbar";
import { getPhotographyClients } from "@/utils/services/photographyClientService";
import { getPhotographyEstimateById, updatePhotographyEstimateById } from "@/utils/services/photographyEstimateService";
import { loadPhotographyTemplates } from "@/pages/photography/shared/templates";

type EstimateItem = {
    mainEventName: string;
    timing: string;
    deliverables: string[];
    packageCost: number;
};

export default function PhotographyEstimateEditPage() {
    const navigate = useNavigate();
    const params = useParams();
    const id = String(params.id || "");
    const { showSnackbar } = useStoreSnackbar();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [clients, setClients] = useState<any[]>([]);
    const [templates, setTemplates] = useState(loadPhotographyTemplates());
    const [selectedClient, setSelectedClient] = useState("");
    const [selectedTemplate, setSelectedTemplate] = useState("");
    const [estimateNumber, setEstimateNumber] = useState("");
    const [estimateDate, setEstimateDate] = useState("");
    const [validUntil, setValidUntil] = useState("");
    const [items, setItems] = useState<EstimateItem[]>([]);

    const grandTotal = useMemo(() => items.reduce((sum, item) => sum + Number(item.packageCost || 0), 0), [items]);

    useEffect(() => {
        const run = async () => {
            setLoading(true);
            try {
                const [clientsRes, estimateRes]: any = await Promise.all([getPhotographyClients({ limit: "all" }), getPhotographyEstimateById(id)]);
                const clientsResolved = clientsRes?.data ?? clientsRes;
                const clientsList = Array.isArray(clientsResolved?.data) ? clientsResolved.data : Array.isArray(clientsResolved) ? clientsResolved : [];
                setClients(clientsList);

                const estimate = estimateRes?.data ?? estimateRes;
                setSelectedClient(String(estimate?.client?.id || estimate?.client || ""));
                setEstimateNumber(String(estimate?.estimateNumber || ""));
                setEstimateDate(String(estimate?.estimateDate || ""));
                setValidUntil(String(estimate?.validUntil || ""));
                setItems(
                    (estimate?.items || []).map((item: any) => ({
                        mainEventName: String(item?.mainEventName || ""),
                        timing: String(item?.timing || ""),
                        deliverables: Array.isArray(item?.deliverables) ? item.deliverables : [],
                        packageCost: Number(item?.packageCost || 0),
                    })),
                );
            } catch {
                showSnackbar({ title: "Error", description: "Failed to load estimate", color: "danger" });
            } finally {
                setLoading(false);
            }
        };
        run();
        setTemplates(loadPhotographyTemplates());
    }, [id, showSnackbar]);

    const applyTemplate = (templateId: string) => {
        setSelectedTemplate(templateId);
        const template = templates.find((item) => item.id === templateId);
        if (!template) return;
        setItems((prev) => [
            ...prev,
            {
                mainEventName: template.mainEventName,
                timing: template.timing,
                deliverables: template.deliverables,
                packageCost: template.packageCost,
            },
        ]);
    };

    const updateItem = (index: number, patch: Partial<EstimateItem>) => {
        setItems((prev) => prev.map((item, i) => (i === index ? { ...item, ...patch } : item)));
    };

    const removeItem = (index: number) => setItems((prev) => prev.filter((_, i) => i !== index));
    const addItem = () => setItems((prev) => [...prev, { mainEventName: "", timing: "", deliverables: [], packageCost: 0 }]);

    const handleSave = async () => {
        if (!selectedClient) {
            showSnackbar({ title: "Validation Error", description: "Please select client", color: "danger" });
            return;
        }
        setSaving(true);
        try {
            await updatePhotographyEstimateById(id, {
                client: selectedClient,
                estimateNumber,
                estimateDate,
                validUntil,
                grandTotal,
                items,
            });
            showSnackbar({ title: "Success", description: "Estimate updated", color: "success" });
            navigate("/photography/estimate");
        } catch (error: any) {
            showSnackbar({
                title: "Error",
                description: error?.error?.message || error?.message || "Failed to update estimate",
                color: "danger",
            });
        } finally {
            setSaving(false);
        }
    };

    return (
        <DefaultLayout>
            <TableCard.Root>
                <TableCard.Header title="Edit Photography Estimate" />
                <div className="space-y-4 bg-primary px-4 py-5 md:px-6">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <Select
                            label="Client *"
                            selectedKey={selectedClient}
                            onSelectionChange={(key) => setSelectedClient(String(key))}
                            items={clients.map((item) => ({ id: item.id, label: `${item.name} (${item.phone})` }))}
                        >
                            {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                        </Select>
                        <Select
                            label="Add Template"
                            selectedKey={selectedTemplate}
                            onSelectionChange={(key) => applyTemplate(String(key))}
                            items={templates.map((item) => ({ id: item.id, label: item.name }))}
                        >
                            {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                        </Select>
                        <Input label="Estimate Number" value={estimateNumber} onChange={(value) => setEstimateNumber(value)} />
                        <Input label="Estimate Date" type="date" value={estimateDate} onChange={(value) => setEstimateDate(value)} />
                        <Input label="Valid Until" type="date" value={validUntil} onChange={(value) => setValidUntil(value)} />
                        <Input label="Grand Total (INR)" value={String(grandTotal)} onChange={() => undefined} isDisabled />
                    </div>

                    {items.map((item, index) => (
                        <div key={index} className="grid grid-cols-1 gap-3 rounded-lg border border-secondary p-3 md:grid-cols-2">
                            <Input
                                label="Items (Main Event Name)"
                                value={item.mainEventName}
                                onChange={(value) => updateItem(index, { mainEventName: value })}
                            />
                            <Input label="Timing" value={item.timing} onChange={(value) => updateItem(index, { timing: value })} />
                            <TextArea
                                label="Deliverables (one per line)"
                                rows={5}
                                value={item.deliverables.join("\n")}
                                onChange={(value) =>
                                    updateItem(index, {
                                        deliverables: String(value).split("\n").map((entry) => entry.trim()).filter(Boolean),
                                    })
                                }
                                className="md:col-span-2"
                            />
                            <Input
                                label="Package Cost (INR)"
                                type="number"
                                value={String(item.packageCost || 0)}
                                onChange={(value) => updateItem(index, { packageCost: Number(value || 0) })}
                            />
                            <div className="flex items-end justify-end">
                                <Button color="secondary-destructive" onClick={() => removeItem(index)}>
                                    Remove
                                </Button>
                            </div>
                        </div>
                    ))}

                    <div className="flex justify-between gap-2">
                        <Button color="secondary" onClick={addItem}>
                            Add Item
                        </Button>
                        <div className="flex gap-2">
                            <Button color="secondary" onClick={() => navigate("/photography/estimate")}>
                                Back
                            </Button>
                            <Button color="primary" onClick={handleSave} isDisabled={saving || loading}>
                                {saving ? "Saving..." : "Update"}
                            </Button>
                        </div>
                    </div>
                </div>
            </TableCard.Root>
        </DefaultLayout>
    );
}
