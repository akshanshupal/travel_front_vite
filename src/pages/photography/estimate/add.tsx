import { useEffect, useMemo, useState } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { DefaultLayout } from "@/layouts/DefaultLayout";
import { TableCard } from "@/components/application/table/table";
import { Input } from "@/components/base/input/input";
import { Select } from "@/components/base/select/select";
import { Button } from "@/components/base/buttons/button";
import { useStoreSnackbar } from "@/store/snackbar";
import { useNavigate } from "react-router";
import { getPhotographyClients } from "@/utils/services/photographyClientService";
import { createPhotographyEstimate } from "@/utils/services/photographyEstimateService";
import { loadPhotographyTemplates } from "@/pages/photography/shared/templates";
import { DeliverablesDnd, type DeliverableCollectionItem } from "@/pages/photography/shared/deliverables-dnd";
import { createPhotographyDeliverable, getPhotographyDeliverables } from "@/utils/services/photographyDeliverableService";

type Client = {
    id: string;
    name: string;
    phone: string;
    address: string;
};

type EstimateItem = {
    mainEventName: string;
    timing: string;
    deliverables: string[];
    packageCost: number;
};

const toSlug = (value: string) => String(value || "").replace(/\s+/g, "").replace(/[^a-zA-Z0-9]/g, "");
const formatDate = (value: string) => {
    if (!value) return "";
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return value;
    return `${d.getDate().toString().padStart(2, "0")}-${d.toLocaleString("en-US", { month: "short" })}-${d.getFullYear()}`;
};
const htmlToPlainText = (value: string) => {
    if (!value) return "";
    const parser = new DOMParser();
    const doc = parser.parseFromString(value, "text/html");
    return (doc.body.textContent || "").replace(/\s+/g, " ").trim();
};

export default function PhotographyEstimateAddPage() {
    const navigate = useNavigate();
    const { showSnackbar } = useStoreSnackbar();
    const [clients, setClients] = useState<Client[]>([]);
    const [templates, setTemplates] = useState(loadPhotographyTemplates());
    const [saving, setSaving] = useState(false);
    const [selectedClient, setSelectedClient] = useState("");
    const [selectedTemplate, setSelectedTemplate] = useState("");
    const [estimateDate, setEstimateDate] = useState(new Date().toISOString().slice(0, 10));
    const [validUntil, setValidUntil] = useState("");
    const [items, setItems] = useState<EstimateItem[]>([]);
    const [collection, setCollection] = useState<DeliverableCollectionItem[]>([]);

    const client = useMemo(() => clients.find((item) => item.id === selectedClient), [clients, selectedClient]);
    const grandTotal = useMemo(() => items.reduce((sum, item) => sum + Number(item.packageCost || 0), 0), [items]);
    const estimateNumber = useMemo(() => {
        if (!client) return "";
        return `${toSlug(client.phone)}-${toSlug(client.name)}-${estimateDate || ""}`;
    }, [client, estimateDate]);

    const fetchClients = async () => {
        try {
            const response: any = await getPhotographyClients({ limit: "all", totalCount: "true" });
            const resolved = response?.data ?? response;
            const list = Array.isArray(resolved?.data) ? resolved.data : Array.isArray(resolved) ? resolved : [];
            setClients(list);
        } catch {
            setClients([]);
        }
    };

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
        fetchClients();
        fetchCollection();
        setTemplates(loadPhotographyTemplates());
    }, []);

    const handleCreateCollectionItem = async (title: string, content: string) => {
        try {
            await createPhotographyDeliverable({ title, content });
            await fetchCollection();
            showSnackbar({ title: "Success", description: "Deliverable added to collection", color: "success" });
        } catch (error: any) {
            showSnackbar({
                title: "Error",
                description: error?.error?.message || error?.message || "Failed to add deliverable to collection",
                color: "danger",
            });
        }
    };

    const applyTemplate = (templateId: string) => {
        setSelectedTemplate(templateId);
        const template = templates.find((item) => item.id === templateId);
        if (!template) return;
        setItems([
            {
                mainEventName: template.mainEventName,
                timing: template.timing,
                deliverables: Array.isArray(template.deliverables) ? template.deliverables : [],
                packageCost: template.packageCost,
            },
        ]);
    };

    const updateItem = (index: number, patch: Partial<EstimateItem>) => {
        setItems((prev) => prev.map((item, i) => (i === index ? { ...item, ...patch } : item)));
    };

    const addItem = () => {
        setItems((prev) => [...prev, { mainEventName: "", timing: "", deliverables: [], packageCost: 0 }]);
    };

    const removeItem = (index: number) => {
        setItems((prev) => prev.filter((_, i) => i !== index));
    };

    const buildPdf = () => {
        const doc = new jsPDF("p", "mm", "a4");
        const pageWidth = doc.internal.pageSize.getWidth();
        let y = 14;

        doc.setDrawColor(160);
        doc.rect(12, y, 30, 20);
        doc.setFontSize(10);
        doc.text("Company Logo", 16, y + 11);

        doc.setFont("helvetica", "bold");
        doc.setFontSize(15);
        doc.text("# CAPTURING MOMENTS-ESTIMATE", pageWidth / 2, y + 6, { align: "center" });
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.text("For any Service Related Issues Mail:- sales@capturingmoments.co.in", pageWidth / 2, y + 12, { align: "center" });
        doc.text(
            "Capturing Moments Office No-A-1106, Tower - T3 , Block A, NX One, Noida Extention Noida, Uttar Pradesh 201306, India",
            pageWidth / 2,
            y + 17,
            { align: "center", maxWidth: 110 },
        );
        doc.text("8860030886  |  capturing-moment-website.vercel.app", pageWidth / 2, y + 23, { align: "center" });
        y += 30;

        doc.setFont("helvetica", "bold");
        doc.text("BILL TO", 14, y);
        doc.text("Estimate Meta", pageWidth - 60, y);
        doc.setFont("helvetica", "normal");
        y += 5;

        const billLines = [client?.name || "-", client?.address || "-", client?.phone || "-"];
        billLines.forEach((line) => {
            doc.text(String(line), 14, y);
            y += 5;
        });

        const metaStartY = y - 15;
        let rightY = metaStartY;
        doc.text(`Estimate Number: ${estimateNumber || "-"}`, pageWidth - 60, rightY);
        rightY += 5;
        doc.text(`Estimate Date: ${formatDate(estimateDate) || "-"}`, pageWidth - 60, rightY);
        rightY += 5;
        doc.text(`Valid Until: ${formatDate(validUntil) || "-"}`, pageWidth - 60, rightY);
        rightY += 5;
        doc.text(`Grand Total (INR): ${grandTotal.toFixed(2)}`, pageWidth - 60, rightY);

        y += 4;
        const rows = items.map((item) => {
            const deliverablesText = (item.deliverables || []).map((entry) => htmlToPlainText(entry)).filter(Boolean).join(" | ");
            const details = [
                `${item.mainEventName}${item.timing ? ` ${item.timing}` : ""}`,
                `- ${deliverablesText || "-"}`,
                "Package Cost 1",
            ].join("\n");
            return [details, `INR ${Number(item.packageCost || 0).toFixed(2)}`];
        });

        autoTable(doc, {
            startY: y,
            head: [["Items", "Quantity"]],
            body: rows,
            theme: "grid",
            headStyles: { fillColor: [230, 230, 230], textColor: [40, 40, 40] },
            styles: { fontSize: 9, cellPadding: 2 },
            columnStyles: { 0: { cellWidth: 135 }, 1: { cellWidth: 45 } },
        });
        y = (doc as any).lastAutoTable.finalY + 8;

        doc.setFontSize(9);
        doc.text(
            "Notes / Terms Hospitality Group - Kotak Account Number- 4049111673 IFSC - KKBK0000154 Branch - Sector 51 Noida UPI:- hospitalitygroup@kotak",
            14,
            y,
            { maxWidth: pageWidth - 28 },
        );
        y += 14;
        doc.text("This is an electronically generated report, hence does not require a signature.", 14, y);

        doc.save(`Estimate-${estimateNumber || Date.now()}.pdf`);
    };

    const saveEstimate = async () => {
        if (!client) {
            showSnackbar({ title: "Validation Error", description: "Please select client", color: "danger" });
            return;
        }
        if (!estimateDate) {
            showSnackbar({ title: "Validation Error", description: "Estimate date is required", color: "danger" });
            return;
        }
        if (!items.length) {
            showSnackbar({ title: "Validation Error", description: "Please add at least one item", color: "danger" });
            return;
        }
        setSaving(true);
        try {
            await createPhotographyEstimate({
                client: client.id,
                estimateNumber,
                estimateDate,
                validUntil,
                grandTotal,
                items,
            });
            showSnackbar({ title: "Success", description: "Estimate created successfully", color: "success" });
            navigate("/photography/estimate");
        } catch (error: any) {
            showSnackbar({
                title: "Error",
                description: error?.error?.message || error?.message || "Failed to create estimate",
                color: "danger",
            });
        } finally {
            setSaving(false);
        }
    };

    return (
        <DefaultLayout>
            <div className="space-y-4">
                <TableCard.Root>
                    <TableCard.Header title="Add Photography Estimate" />
                    <div className="space-y-4 bg-primary px-4 py-5 md:px-6">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <Select
                                label="Step 1: Select Client *"
                                selectedKey={selectedClient}
                                onSelectionChange={(key) => setSelectedClient(String(key))}
                                items={clients.map((item) => ({ id: item.id, label: `${item.name} (${item.phone})` }))}
                            >
                                {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                            </Select>
                            <Select
                                label="Step 3: Select Template"
                                selectedKey={selectedTemplate}
                                onSelectionChange={(key) => applyTemplate(String(key))}
                                items={templates.map((item) => ({ id: item.id, label: item.name }))}
                            >
                                {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                            </Select>
                            <Input label="Estimate Number" value={estimateNumber} onChange={() => undefined} isDisabled />
                            <Input label="Estimate Date *" type="date" value={estimateDate} onChange={(value) => setEstimateDate(value)} />
                            <Input label="Valid Until" type="date" value={validUntil} onChange={(value) => setValidUntil(value)} />
                            <Input label="Grand Total (INR)" value={grandTotal.toFixed(2)} onChange={() => undefined} isDisabled />
                        </div>

                        <div className="space-y-3 rounded-lg border border-secondary p-3">
                            <div className="text-sm font-semibold text-primary">Step 2: Estimate Items</div>
                            {items.map((item, index) => (
                                <div key={index} className="grid grid-cols-1 gap-3 rounded-lg border border-secondary p-3 md:grid-cols-2">
                                    <Input
                                        label="Items (Main Event Name)"
                                        value={item.mainEventName}
                                        onChange={(value) => updateItem(index, { mainEventName: value })}
                                    />
                                    <Input label="Timing" value={item.timing} onChange={(value) => updateItem(index, { timing: value })} />
                                    <div className="md:col-span-2">
                                        <DeliverablesDnd
                                            collection={collection}
                                            deliverables={item.deliverables || []}
                                            onChange={(deliverables) => updateItem(index, { deliverables })}
                                            onCreateCollectionItem={index === 0 ? handleCreateCollectionItem : undefined}
                                            title="Quotation Deliverables"
                                        />
                                    </div>
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
                                    <Button color="secondary" onClick={buildPdf}>
                                        Export PDF
                                    </Button>
                                    <Button color="primary" onClick={saveEstimate} isDisabled={saving}>
                                        {saving ? "Saving..." : "Create Estimate"}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </TableCard.Root>
            </div>
        </DefaultLayout>
    );
}
