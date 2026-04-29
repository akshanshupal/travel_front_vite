import { useEffect, useMemo, useState } from "react";
import { DefaultLayout } from "@/layouts/DefaultLayout";
import { TableCard } from "@/components/application/table/table";
import { Input } from "@/components/base/input/input";
import { Select } from "@/components/base/select/select";
import { Button } from "@/components/base/buttons/button";
import { CloseButton } from "@/components/base/buttons/close-button";
import { Dialog, Modal, ModalOverlay } from "@/components/application/modals/modal";
import { useStoreSnackbar } from "@/store/snackbar";
import { useStoreLogin } from "@/store/login";
import { useNavigate } from "react-router";
import { getPhotographyClients } from "@/utils/services/photographyClientService";
import { createPhotographyEstimate } from "@/utils/services/photographyEstimateService";
import { getUser } from "@/utils/services/userService";
import { loadPhotographyTemplates } from "@/pages/photography/shared/templates";
import { DeliverablesDnd, type DeliverableCollectionItem } from "@/pages/photography/shared/deliverables-dnd";
import { getPhotographyDeliverables } from "@/utils/services/photographyDeliverableService";
import { buildPhotographyEstimatePdf } from "@/pages/photography/estimate/pdf";

type Client = {
    id: string;
    name: string;
    phone: string;
    address: string;
};

type EstimateItem = {
    mainEventName: string;
    timing: string;
    eventDate: string;
    duration: number;
    address: string;
    location: string;
    deliverables: string[];
    packageCost: number;
};
type AgentUser = {
    id: string;
    name: string;
    email?: string;
};

const toDateInputValue = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
};
const getDatePlusHoursInputValue = (hours: number) => {
    const next = new Date(Date.now() + hours * 60 * 60 * 1000);
    return toDateInputValue(next);
};

export default function PhotographyEstimateAddPage() {
    const navigate = useNavigate();
    const { user } = useStoreLogin();
    const { showSnackbar } = useStoreSnackbar();
    const [clients, setClients] = useState<Client[]>([]);
    const [agents, setAgents] = useState<AgentUser[]>([]);
    const [templates, setTemplates] = useState(loadPhotographyTemplates());
    const [saving, setSaving] = useState(false);
    const [selectedClient, setSelectedClient] = useState("");
    const [selectedAgent, setSelectedAgent] = useState((user as any)?.type === "AGENT" ? String((user as any)?.id || "") : "");
    const [estimateDate, setEstimateDate] = useState(new Date().toISOString().slice(0, 10));
    const [validUntil, setValidUntil] = useState(getDatePlusHoursInputValue(4));
    const [items, setItems] = useState<EstimateItem[]>([]);
    const [collection, setCollection] = useState<DeliverableCollectionItem[]>([]);
    const [isAddTemplateModalOpen, setIsAddTemplateModalOpen] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState("");
    const [templateEventDate, setTemplateEventDate] = useState("");

    const client = useMemo(() => clients.find((item) => item.id === selectedClient), [clients, selectedClient]);
    const grandTotal = useMemo(() => items.reduce((sum, item) => sum + Number(item.packageCost || 0), 0), [items]);

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
                })),
            );
        } catch {
            setCollection([]);
        }
    };
    const fetchAgents = async () => {
        try {
            const response: any = await getUser({ limit: "all", type: "AGENT", select: "name,email,type" });
            const resolved = response?.data ?? response;
            const list = Array.isArray(resolved?.data)
                ? resolved.data
                : Array.isArray(resolved)
                  ? resolved
                  : [];
            setAgents(
                list
                    .map((item: any) => ({
                        id: String(item?.id || item?._id || ""),
                        name: String(item?.name || ""),
                        email: String(item?.email || ""),
                    }))
                    .filter((item: AgentUser) => item.id),
            );
        } catch {
            setAgents([]);
        }
    };

    useEffect(() => {
        fetchClients();
        fetchCollection();
        fetchAgents();
        setTemplates(loadPhotographyTemplates());
    }, []);

    useEffect(() => {
        if ((user as any)?.type === "AGENT") {
            setSelectedAgent(String((user as any)?.id || ""));
        }
    }, [user]);

    const applyTemplate = (templateId: string, eventDate: string) => {
        const selectedId = String(templateId || "");
        const selectedDate = String(eventDate || "");
        if (!selectedId) {
            showSnackbar({ title: "Validation Error", description: "Please select template", color: "danger" });
            return;
        }
        if (!selectedDate) {
            showSnackbar({ title: "Validation Error", description: "Please select event date", color: "danger" });
            return;
        }
        const template = templates.find((item) => item.id === selectedId);
        if (!template) return;
        setItems((prev) => [
            ...prev,
            {
                mainEventName: template.mainEventName,
                timing: template.timing,
                eventDate: selectedDate,
                duration: 0,
                address: "",
                location: "",
                deliverables: Array.isArray(template.deliverables) ? template.deliverables : [],
                packageCost: template.packageCost,
            },
        ]);
        setSelectedTemplate("");
        setTemplateEventDate("");
        setIsAddTemplateModalOpen(false);
    };

    const updateItem = (index: number, patch: Partial<EstimateItem>) => {
        setItems((prev) => prev.map((item, i) => (i === index ? { ...item, ...patch } : item)));
    };

    const addItem = () => {
        setItems((prev) => [...prev, { mainEventName: "", timing: "", eventDate: "", duration: 0, address: "", location: "", deliverables: [], packageCost: 0 }]);
    };

    const removeItem = (index: number) => {
        setItems((prev) => prev.filter((_, i) => i !== index));
    };

    const buildPdf = () => {
        buildPhotographyEstimatePdf({
            estimateNumber: "Auto-generated on save",
            estimateDate,
            validUntil,
            grandTotal,
            client: client || null,
            items,
            fileName: `Estimate-${Date.now()}.pdf`,
        });
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
        if (!selectedAgent) {
            showSnackbar({ title: "Validation Error", description: "Please select agent", color: "danger" });
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
                agent: selectedAgent,
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
                                label="Select Agent *"
                                selectedKey={selectedAgent}
                                onSelectionChange={(key) => setSelectedAgent(String(key))}
                                isDisabled={(user as any)?.type === "AGENT"}
                                items={agents.map((item) => ({ id: item.id, label: item.email ? `${item.name} (${item.email})` : item.name }))}
                            >
                                {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                            </Select>
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
                                    <Input
                                        label="Event Date"
                                        type="date"
                                        value={item.eventDate || ""}
                                        onChange={(value) => updateItem(index, { eventDate: value })}
                                    />
                                    <Input
                                        label="Duration"
                                        type="number"
                                        value={String(item.duration || 0)}
                                        onChange={(value) => updateItem(index, { duration: Number(value || 0) })}
                                    />
                                    <Input label="Timing" value={item.timing} onChange={(value) => updateItem(index, { timing: value })} />
                                    <Input label="Address" value={item.address || ""} onChange={(value) => updateItem(index, { address: value })} />
                                    <Input label="Location" value={item.location || ""} onChange={(value) => updateItem(index, { location: value })} />
                                    <div className="md:col-span-2">
                                        <DeliverablesDnd
                                            collection={collection}
                                            deliverables={item.deliverables || []}
                                            onChange={(deliverables) => updateItem(index, { deliverables })}
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
                                <div className="flex gap-2">
                                    <Button color="secondary" onClick={addItem}>
                                        Add New Item
                                    </Button>
                                    <Button color="secondary" onClick={() => setIsAddTemplateModalOpen(true)}>
                                        Choose from Pre-existing Template
                                    </Button>
                                </div>
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

            <ModalOverlay isOpen={isAddTemplateModalOpen} onOpenChange={setIsAddTemplateModalOpen}>
                <Modal>
                    <Dialog>
                        {({ close }) => (
                            <div className="relative w-full rounded-xl bg-primary p-5 ring-1 ring-secondary">
                                <CloseButton onPress={close} className="absolute right-4 top-4" size="sm" />
                                <div className="space-y-4">
                                    <div className="space-y-1">
                                        <h2 className="text-lg font-semibold text-primary">Choose from Pre-existing Template</h2>
                                        <p className="text-sm text-tertiary">
                                            Select template and event date. Item will be added to quotation after both are filled.
                                        </p>
                                    </div>
                                    <Select
                                        label="Template *"
                                        selectedKey={selectedTemplate}
                                        onSelectionChange={(key) => setSelectedTemplate(String(key))}
                                        items={templates.map((item) => ({ id: item.id, label: item.name }))}
                                    >
                                        {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                    </Select>
                                    <Input
                                        label="Event Date *"
                                        type="date"
                                        value={templateEventDate}
                                        onChange={(value) => setTemplateEventDate(value)}
                                    />
                                    <div className="flex justify-end gap-3">
                                        <Button color="secondary" onClick={close}>
                                            Cancel
                                        </Button>
                                        <Button color="primary" onClick={() => applyTemplate(selectedTemplate, templateEventDate)}>
                                            Add to Quotation
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </Dialog>
                </Modal>
            </ModalOverlay>
        </DefaultLayout>
    );
}
