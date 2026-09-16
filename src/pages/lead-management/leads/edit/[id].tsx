import { DefaultLayout } from "@/layouts/DefaultLayout";
import { TableCard } from "@/components/application/table/table";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Label } from "@/components/base/input/label";
import { Select } from "@/components/base/select/select";
import { useStoreSnackbar } from "@/store/snackbar";
import { getLeadsById, updateLeadStage, updateLeadsById } from "@/utils/services/leadsService";
import { getCampaign } from "@/utils/services/campaignService";
import { getContactProperties } from "@/utils/services/contactPropertiesService";
import { CustomPropertiesFields, normalizeContactProperties, normalizeCustomPropertyPayload, type ContactPropertyDefinition } from "../custom-properties-fields";
import { ArrowLeft } from "@untitledui/icons";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";

type CampaignItem = { id: string; title?: string; salesExecutive?: Array<{ id: string; name?: string }> };
type Stage = { id?: string; _id?: string; name?: string; additional?: { transitions?: string[] } };
type LeadPipeline = { title?: string; initialStage?: Stage; otherStages?: Stage[]; convertedStage?: Stage; rejectedStage?: Stage };

const asArray = (value: any) => (Array.isArray(value) ? value : []);
const getId = (value: any) => String(value?.id ?? value?._id ?? value ?? "").trim();
const optionalKey = (key: unknown): string => {
    const value = key == null ? "" : String(key);
    return value === "__none__" ? "" : value;
};

export default function LeadsEditPage() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { showSnackbar } = useStoreSnackbar();
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(true);
    const [campaignList, setCampaignList] = useState<CampaignItem[]>([]);
    const [propertyDefinitions, setPropertyDefinitions] = useState<ContactPropertyDefinition[]>([]);
    const [customProperties, setCustomProperties] = useState<Record<string, any>>({});
    const [loadingLookups, setLoadingLookups] = useState(true);
    const [pipeline, setPipeline] = useState<LeadPipeline | null>(null);
    const [currentStageName, setCurrentStageName] = useState("");
    const [selectedStage, setSelectedStage] = useState("");
    const [lostReason, setLostReason] = useState("");
    const [form, setForm] = useState({ title: "", mobile: "", email: "", campaign: "", salesExecutive: "", otherOptions: "", status: "true" });
    const [dirty, setDirty] = useState<Record<string, boolean>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        const run = async () => {
            setLoadingLookups(true);
            try {
                const [campaignRes, propertyRes] = await Promise.all([
                    getCampaign({ populate: "pipeline", select_pipeline: "title", populateUser: true, limit: "all" }),
                    getContactProperties({ limit: "all" }),
                ]);
                const resolved = (campaignRes as any)?.data ?? campaignRes;
                const list = Array.isArray(resolved?.data) ? resolved.data : Array.isArray(resolved) ? resolved : asArray(resolved?.items);
                setCampaignList(asArray(list).map((item: any) => ({ id: getId(item), title: item?.title || "", salesExecutive: asArray(item?.salesExecutive) })).filter((item: CampaignItem) => item.id));
                setPropertyDefinitions(normalizeContactProperties(propertyRes));
            } catch (error: any) {
                showSnackbar({ title: "Error", description: error?.message || "Failed to load lead options", color: "danger" });
            } finally {
                setLoadingLookups(false);
            }
        };
        run();
    }, [showSnackbar]);

    useEffect(() => {
        if (!id) return;
        const run = async () => {
            setLoading(true);
            try {
                const response = await getLeadsById(id, {
                    populate: "pipeline,campaign,salesExecutive",
                    select_pipeline: "title,initialStage,otherStages,convertedStage,rejectedStage",
                    select_campaign: "title",
                    select_salesExecutive: "name",
                });
                const data = (response as any)?.data ?? response;
                setForm({
                    title: data?.title || "",
                    mobile: data?.mobile || "",
                    email: data?.email || "",
                    campaign: getId(data?.campaign),
                    salesExecutive: getId(data?.salesExecutive),
                    otherOptions: data?.otherOptions || "",
                    status: data?.status === false || data?.status === "false" ? "false" : "true",
                });
                setCustomProperties(data?.customProperties && typeof data.customProperties === "object" ? data.customProperties : {});
                setPipeline(data?.pipeline && typeof data.pipeline === "object" ? data.pipeline : null);
                setCurrentStageName(data?.currentStageName || data?.pipeline?.initialStage?.name || "");
            } catch (error: any) {
                showSnackbar({ title: "Error", description: error?.message || "Failed to load lead", color: "danger" });
            } finally {
                setLoading(false);
            }
        };
        run();
    }, [id, showSnackbar]);

    const selectedSalesExecutives = useMemo(() => {
        const selectedCampaign = campaignList.find(item => item.id === form.campaign);
        return asArray(selectedCampaign?.salesExecutive).map((executive: any) => typeof executive === "string" ? { id: executive, name: executive } : { id: getId(executive), name: executive?.name || executive?.username || getId(executive) });
    }, [campaignList, form.campaign]);
    const stages = useMemo(() => pipeline ? [pipeline.initialStage, ...asArray(pipeline.otherStages), pipeline.convertedStage, pipeline.rejectedStage].filter(stage => stage?.name) as Stage[] : [], [pipeline]);
    const currentStage = stages.find(stage => stage.name === currentStageName);
    const allowedTransitions = currentStage?.additional?.transitions;
    const stageOptions = stages.filter(stage => stage.name !== currentStageName && (!allowedTransitions?.length || allowedTransitions.includes(stage.name || "")));
    const rejectedStageName = pipeline?.rejectedStage?.name;

    const validate = () => {
        const next: Record<string, string> = {};
        if (!form.title.trim()) next.title = "Name is required";
        if (selectedStage === rejectedStageName && !lostReason.trim()) next.lostReason = "Lost reason is required";
        setErrors(next);
        return Object.keys(next).length === 0;
    };

    const handleSave = async () => {
        setDirty({ title: true, lostReason: true });
        if (!validate() || saving || !id) return;
        setSaving(true);
        try {
            await updateLeadsById(id, {
                title: form.title.trim(), mobile: form.mobile.trim(), email: form.email.trim(),
                campaign: form.campaign || null, salesExecutive: form.salesExecutive || null,
                otherOptions: form.otherOptions, status: form.status === "true",
                customProperties: normalizeCustomPropertyPayload(propertyDefinitions, customProperties),
            });
            if (selectedStage && selectedStage !== currentStageName) {
                await updateLeadStage(id, { currentStageName: selectedStage, ...(selectedStage === rejectedStageName ? { lostReason: lostReason.trim() } : {}) });
            }
            showSnackbar({ title: "Success", description: "Lead updated successfully", color: "success" });
            navigate("/lead-management/leads");
        } catch (error: any) {
            showSnackbar({ title: "Error", description: error?.message || "Failed to update lead", color: "danger" });
        } finally {
            setSaving(false);
        }
    };

    return <DefaultLayout>
        <div className="mb-4 rounded-sm border border-secondary bg-primary p-2"><div className="flex flex-wrap items-center gap-1 text-sm text-tertiary"><button type="button" onClick={() => navigate("/dashboard")} className="rounded-sm px-1 py-0.5 text-primary hover:bg-primary_hover">Home</button><span>/</span><button type="button" onClick={() => navigate("/lead-management/leads")} className="rounded-sm px-1 py-0.5 text-primary hover:bg-primary_hover">Leads</button><span>/</span><span className="px-1 py-0.5 text-primary">Edit</span></div></div>
        <TableCard.Root>
            <TableCard.Header title="Edit Lead" contentTrailing={<div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center md:justify-end"><Button color="secondary" iconLeading={ArrowLeft} onClick={() => navigate("/lead-management/leads")}>Back</Button><Button color="primary" isLoading={saving} isDisabled={loading} onClick={handleSave}>Save</Button></div>} />
            <div className="space-y-4 bg-primary px-4 py-5 md:px-6">{loading ? <div className="grid animate-pulse grid-cols-1 gap-4 md:grid-cols-2">{Array.from({ length: 6 }).map((_, index) => <div key={index} className="h-10 rounded bg-secondary" />)}</div> : <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Input label="Name *" value={form.title} onChange={value => setForm(prev => ({ ...prev, title: value }))} isInvalid={Boolean(dirty.title && errors.title)} hint={dirty.title ? errors.title : undefined} />
                <Input label="Mobile Number" value={form.mobile} onChange={value => setForm(prev => ({ ...prev, mobile: value }))} />
                <Input label="Email" type="email" value={form.email} onChange={value => setForm(prev => ({ ...prev, email: value }))} />
                <div className="flex flex-col gap-1.5"><Label>Campaign</Label><Select aria-label="Campaign" selectedKey={form.campaign || null} onChange={undefined} onSelectionChange={key => setForm(prev => ({ ...prev, campaign: optionalKey(key), salesExecutive: "" }))} items={[{ id: "__none__", label: "Select Campaign" }, ...campaignList.map(item => ({ id: item.id, label: item.title || item.id }))]} isDisabled={loadingLookups}>{item => <Select.Item id={item.id}>{item.label}</Select.Item>}</Select></div>
                {form.campaign && selectedSalesExecutives.length ? <div className="flex flex-col gap-1.5"><Label>Sales Executive</Label><Select aria-label="Sales Executive" selectedKey={form.salesExecutive || null} onChange={undefined} onSelectionChange={key => setForm(prev => ({ ...prev, salesExecutive: optionalKey(key) }))} items={[{ id: "__none__", label: "Select Sales Executive" }, ...selectedSalesExecutives.map(item => ({ id: item.id, label: item.name }))]}>{item => <Select.Item id={item.id}>{item.label}</Select.Item>}</Select></div> : null}
                <Input label="Description" value={form.otherOptions} onChange={value => setForm(prev => ({ ...prev, otherOptions: value }))} />
                <div className="flex flex-col gap-1.5"><Label>Status</Label><Select aria-label="Status" selectedKey={form.status} onChange={undefined} onSelectionChange={key => setForm(prev => ({ ...prev, status: String(key) }))} items={[{ id: "true", label: "Active" }, { id: "false", label: "Inactive" }]}>{item => <Select.Item id={item.id}>{item.label}</Select.Item>}</Select></div>
                <div className="flex flex-col gap-1.5"><Label>Current Stage</Label><p className="rounded-lg bg-secondary px-3.5 py-2.5 text-sm text-primary">{currentStageName || "N/A"}</p></div>
                {stageOptions.length ? <div className="flex flex-col gap-1.5"><Label>Move to Stage</Label><Select aria-label="Move to stage" selectedKey={selectedStage || null} onChange={undefined} onSelectionChange={key => setSelectedStage(String(key))} items={stageOptions.map(stage => ({ id: stage.name!, label: stage.name! }))}>{item => <Select.Item id={item.id}>{item.label}</Select.Item>}</Select></div> : null}
                {selectedStage === rejectedStageName ? <Input label="Lost Reason *" value={lostReason} onChange={setLostReason} isInvalid={Boolean(dirty.lostReason && errors.lostReason)} hint={dirty.lostReason ? errors.lostReason : undefined} /> : null}
                <CustomPropertiesFields definitions={propertyDefinitions} values={customProperties} onChange={(key, value) => setCustomProperties(prev => ({ ...prev, [key]: value }))} />
            </div>}</div>
        </TableCard.Root>
    </DefaultLayout>;
}
