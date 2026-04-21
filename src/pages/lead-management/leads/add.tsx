import { DefaultLayout } from "@/layouts/DefaultLayout";
import { TableCard } from "@/components/application/table/table";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Label } from "@/components/base/input/label";
import { Select } from "@/components/base/select/select";
import { useStoreSnackbar } from "@/store/snackbar";
import { addLeads } from "@/utils/services/leadsService";
import { getCampaign } from "@/utils/services/campaignService";
import { ArrowLeft } from "@untitledui/icons";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";

type CampaignItem = {
    id: string;
    title?: string;
    salesExecutive?: Array<{ id: string; name?: string }>;
};

const asArray = (value: any) => (Array.isArray(value) ? value : []);
const getId = (value: any) => String(value?.id ?? value?._id ?? value ?? "").trim();

export default function LeadsAddPage() {
    const navigate = useNavigate();
    const { showSnackbar } = useStoreSnackbar();

    const [saving, setSaving] = useState(false);
    const [campaignList, setCampaignList] = useState<CampaignItem[]>([]);
    const [loadingLookups, setLoadingLookups] = useState(true);

    const [form, setForm] = useState({
        title: "",
        mobile: "",
        email: "",
        campaign: "",
        salesExecutive: "",
        otherOptions: "",
        status: "true",
    });

    const [dirty, setDirty] = useState<Record<string, boolean>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        const run = async () => {
            setLoadingLookups(true);
            try {
                const campaignRes = await getCampaign({ populate: "pipeline", select_pipeline: "title", populateUser: true });
                const campaignResolved = (campaignRes as any)?.data ?? campaignRes;
                const list = Array.isArray(campaignResolved?.data) ? campaignResolved.data : Array.isArray(campaignResolved) ? campaignResolved : asArray(campaignResolved?.items);
                setCampaignList(asArray(list).map((it: any) => ({ id: getId(it), title: it?.title || "", salesExecutive: asArray(it?.salesExecutive) })).filter((x: any) => x.id));
            } catch (e: any) {
                showSnackbar({ title: "Error", description: e?.message || "Failed to load campaigns", color: "danger" });
                setCampaignList([]);
            } finally {
                setLoadingLookups(false);
            }
        };
        run();
    }, [showSnackbar]);

    // Derive available sales executives from selected campaign
    const selectedSalesExecutives = useMemo<Array<{ id: string; name: string }>>(() => {
        const selectedCampaign = campaignList.find(c => c.id === form.campaign);
        if (!selectedCampaign || !selectedCampaign.salesExecutive) return [];
        return selectedCampaign.salesExecutive.map((exec: any) => {
            if (typeof exec === "string") return { id: exec, name: exec };
            return { id: exec.id || exec._id || exec, name: exec.name || exec.username || exec.id };
        });
    }, [campaignList, form.campaign]);

    const validate = () => {
        const next: Record<string, string> = {};
        if (!form.title.trim()) next.title = "Name is required";
        if (!form.mobile.trim()) next.mobile = "Mobile number is required";
        if (!form.email.trim()) next.email = "Email is required";
        setErrors(next);
        if (Object.keys(next).length > 0) {
            showSnackbar({ title: "Validation Error", description: Object.values(next)[0], color: "danger" });
        }
        return Object.keys(next).length === 0;
    };

    const handleSave = async () => {
        setDirty({ title: true, mobile: true, email: true, campaign: true, salesExecutive: true });
        if (!validate()) return;
        if (saving) return;
        setSaving(true);
        try {
            const payload = {
                title: form.title.trim(),
                mobile: form.mobile.trim(),
                email: form.email.trim(),
                ...(form.campaign ? { campaign: form.campaign } : {}),
                ...(form.salesExecutive ? { salesExecutive: form.salesExecutive } : {}),
                ...(form.otherOptions ? { otherOptions: form.otherOptions } : {}),
                status: form.status,
            };
            const res = await addLeads(payload);
            if ((res as any)?.error) throw new Error((res as any).error);
            showSnackbar({ title: "Success", description: "Lead added successfully", color: "success" });
            navigate("/lead-management/leads");
        } catch (e: any) {
            showSnackbar({ title: "Error", description: e?.message || "Failed to add lead", color: "danger" });
        } finally {
            setSaving(false);
        }
    };

    const breadcrumbs = (
        <div className="mb-4 rounded-sm border border-secondary bg-primary p-2">
            <div className="flex flex-wrap items-center gap-1 text-sm text-tertiary">
                <button type="button" onClick={() => navigate("/dashboard")} className="rounded-sm px-1 py-0.5 text-primary hover:bg-primary_hover">
                    Home
                </button>
                <span>/</span>
                <button type="button" onClick={() => navigate("/lead-management/leads")} className="rounded-sm px-1 py-0.5 text-primary hover:bg-primary_hover">
                    Leads
                </button>
                <span>/</span>
                <span className="px-1 py-0.5 text-primary">Add</span>
            </div>
        </div>
    );

    return (
        <DefaultLayout>
            {breadcrumbs}
            <TableCard.Root>
                <TableCard.Header
                    title="Add Lead"
                    contentTrailing={
                        <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center md:justify-end">
                            <Button color="secondary" iconLeading={ArrowLeft} onClick={() => navigate("/lead-management/leads")}>
                                Back
                            </Button>
                            <Button color="primary" isLoading={saving} onClick={handleSave}>
                                Save
                            </Button>
                        </div>
                    }
                />

                <div className="space-y-4 bg-primary px-4 py-5 md:px-6">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <Input
                            label="Name *"
                            placeholder="Enter lead name"
                            value={form.title}
                            onChange={(v) => setForm(p => ({ ...p, title: v }))}
                            isInvalid={Boolean(dirty.title && errors.title)}
                            hint={dirty.title && errors.title ? errors.title : undefined}
                        />
                        <Input
                            label="Mobile Number *"
                            placeholder="Enter mobile number"
                            type="number"
                            value={form.mobile}
                            onChange={(v) => setForm(p => ({ ...p, mobile: v }))}
                            isInvalid={Boolean(dirty.mobile && errors.mobile)}
                            hint={dirty.mobile && errors.mobile ? errors.mobile : undefined}
                        />
                        <Input
                            label="Email *"
                            placeholder="Enter email"
                            type="email"
                            value={form.email}
                            onChange={(v) => setForm(p => ({ ...p, email: v }))}
                            isInvalid={Boolean(dirty.email && errors.email)}
                            hint={dirty.email && errors.email ? errors.email : undefined}
                        />
                        <div className="flex flex-col gap-1.5">
                            <Label>Campaign</Label>
                            <Select
                                aria-label="Campaign"
                                selectedKey={form.campaign || null}
                                onChange={undefined}
                                onSelectionChange={(key) => setForm(p => ({ ...p, campaign: key ? String(key) : "", salesExecutive: "" }))}
                                items={[{ id: "__none__", label: "Select Campaign" }, ...campaignList.map(c => ({ id: c.id, label: c.title || c.id }))]}
                                isDisabled={loadingLookups}
                            >
                                {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                            </Select>
                        </div>
                        {form.campaign && selectedSalesExecutives.length > 0 && (
                            <div className="flex flex-col gap-1.5">
                                <Label>Sales Executive</Label>
                                <Select
                                    aria-label="Sales Executive"
                                    selectedKey={form.salesExecutive || null}
                                    onChange={undefined}
                                    onSelectionChange={(key) => setForm(p => ({ ...p, salesExecutive: key ? String(key) : "" }))}
                                    items={[{ id: "__none__", label: "Select Sales Executive" }, ...selectedSalesExecutives.map(s => ({ id: s.id, label: s.name || s.id }))]}
                                >
                                    {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                </Select>
                            </div>
                        )}
                        <Input
                            label="Description"
                            placeholder="Enter description"
                            value={form.otherOptions}
                            onChange={(v) => setForm(p => ({ ...p, otherOptions: v }))}
                        />
                        <div className="flex flex-col gap-1.5">
                            <Label>Status</Label>
                            <Select
                                aria-label="Status"
                                selectedKey={form.status}
                                onChange={undefined}
                                onSelectionChange={(key) => setForm(p => ({ ...p, status: String(key) }))}
                                items={[
                                    { id: "true", label: "Active" },
                                    { id: "false", label: "Inactive" },
                                ]}
                            >
                                {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                            </Select>
                        </div>
                    </div>
                </div>
            </TableCard.Root>
        </DefaultLayout>
    );
}
