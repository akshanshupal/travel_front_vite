import { DefaultLayout } from "@/layouts/DefaultLayout";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { useStoreSnackbar } from "@/store/snackbar";
import { getContactProperties } from "@/utils/services/contactPropertiesService";
import { getCampaign } from "@/utils/services/campaignService";
import { ChevronDown, UploadCloud01, UserPlus01 } from "@untitledui/icons";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

const asArray = (value: any) => (Array.isArray(value) ? value : []);
const getId = (value: any) => String(value?.id ?? value?._id ?? value ?? "").trim();
const normalizeList = (result: any) => {
    const value = result?.data ?? result;
    return Array.isArray(value?.data) ? value.data : Array.isArray(value) ? value : asArray(value?.items);
};
const CONTACT_SOURCES = ["FILE_UPLOAD", "WALK_IN_LEAD", "INCOMING_IVR", "WORKFLOW", "GOOGLE_SHEET", "WHATSAPP", "WEB_FORM", "MANUAL_ENTRY", "API"];
const VISIBLE_SOURCES = 5;

type ContactProperty = { id: string; title: string; key: string; fieldType: string };

export default function ContactsPage() {
    const navigate = useNavigate();
    const { showSnackbar } = useStoreSnackbar();
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [email, setEmail] = useState("");
    const [properties, setProperties] = useState<ContactProperty[]>([]);
    const [propertyValues, setPropertyValues] = useState<Record<string, string>>({});
    const [campaigns, setCampaigns] = useState<{ id: string; title: string }[]>([]);
    const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([]);
    const [sources, setSources] = useState<string[]>([]);
    const [showAllSources, setShowAllSources] = useState(false);
    const [campaignDropdownOpen, setCampaignDropdownOpen] = useState(false);
    const campaignDropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let cancelled = false;
        Promise.all([getContactProperties({ limit: "all" }), getCampaign({ limit: "all", select: "title" })])
            .then(([propertyRes, campaignRes]) => {
                if (cancelled) return;
                setProperties(
                    normalizeList(propertyRes)
                        .filter((item: any) => !(item?.status === false || String(item?.status) === "false"))
                        .map((item: any) => ({ id: getId(item), title: String(item?.label || item?.title || item?.name || ""), key: String(item?.key || item?.id || getId(item)), fieldType: String(item?.fieldType || item?.dataType?.type || item?.dataType?.key || "text") }))
                        .filter((item: ContactProperty) => item.id && item.title),
                );
                setCampaigns(normalizeList(campaignRes).map((item: any) => ({ id: getId(item), title: item?.title || getId(item) })).filter((item: any) => item.id));
            })
            .catch(() => {});
        return () => { cancelled = true; };
    }, []);

    useEffect(() => {
        if (!campaignDropdownOpen) return;
        const handleOutsideClick = (event: MouseEvent) => {
            if (!campaignDropdownRef.current?.contains(event.target as Node)) setCampaignDropdownOpen(false);
        };
        document.addEventListener("mousedown", handleOutsideClick);
        return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, [campaignDropdownOpen]);

    const toggleCampaign = (id: string) => setSelectedCampaigns((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
    const toggleSource = (source: string) => setSources((current) => (current.includes(source) ? current.filter((item) => item !== source) : [...current, source]));

    const handleSearch = () => {
        const hasFilters = Boolean(name.trim() || number.trim() || email.trim() || selectedCampaigns.length || sources.length || Object.values(propertyValues).some((value) => value.trim()));
        if (!hasFilters) {
            showSnackbar({ title: "Nothing to search", description: "Fill at least one field before searching.", color: "warning" });
            return;
        }
        const propertyFilters = Object.fromEntries(
            properties
                .filter((property) => (propertyValues[property.title] || "").trim())
                .map((property) => [property.key, propertyValues[property.title].trim()]),
        );
        navigate("/lead-management/contacts/view", {
            state: {
                filters: {
                    name: name.trim(),
                    number: number.trim(),
                    email: email.trim(),
                    campaigns: selectedCampaigns,
                    sources,
                    properties: propertyFilters,
                },
            },
        });
    };

    const selectedCampaignLabels = campaigns.filter((campaign) => selectedCampaigns.includes(campaign.id)).map((campaign) => campaign.title);

    return (
        <DefaultLayout>
            <div className="flex w-full flex-col gap-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <h1 className="text-xl font-semibold text-primary">Contacts</h1>
                    <div className="flex flex-wrap items-center gap-2">
                        <Button color="secondary" size="md" iconLeading={<svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M4 20h4l10-10-4-4L4 16v4Z" /><path d="M13 7l4 4" /></svg>} onClick={() => navigate("/lead-management/settings?tab=contactProperties")}>Custom Contact Properties</Button>
                        <Button color="secondary" size="md" iconLeading={UploadCloud01} onClick={() => navigate("/lead-management/leads?upload=1")}>Upload Excel Sheet</Button>
                        <Button color="primary" size="md" iconLeading={UserPlus01} onClick={() => navigate("/lead-management/leads/add")}>Add Lead</Button>
                    </div>
                </div>

                <div className="mt-4 grid gap-4 xl:grid-cols-[1.7fr_1fr] xl:items-start">
                    <section className="rounded-2xl border border-secondary bg-primary p-5 shadow-xs">
                        <h2 className="text-sm font-bold uppercase tracking-wide text-primary">Lead Details</h2>
                        <p className="mt-4 text-sm font-semibold text-primary">Basic Details</p>
                        <div className="mt-3 grid gap-4 sm:grid-cols-2">
                            <Input aria-label="Contact Name" placeholder="Contact Name" value={name} onChange={setName} />
                            <Input aria-label="Contact Number" placeholder="Contact Number" value={number} onChange={setNumber} />
                            <Input aria-label="Email" placeholder="Email" value={email} onChange={setEmail} />
                        </div>
                        {properties.length > 0 && (
                            <>
                                <p className="mt-6 text-sm font-semibold text-primary">Custom Contact Property</p>
                                <div className="mt-3 grid gap-4 sm:grid-cols-2">
                                    {properties.map((property) => {
                                        const value = propertyValues[property.title] || "";
                                        const setValue = (next: string) => setPropertyValues((current) => ({ ...current, [property.title]: next }));
                                        if (property.fieldType === "boolean") {
                                            return (
                                                <select key={property.id} aria-label={property.title} value={value} onChange={(event) => setValue(event.target.value)} className="min-h-11 w-full rounded-lg border border-secondary bg-primary px-3 py-2 text-sm text-primary outline-none transition focus:border-brand">
                                                    <option value="">{property.title}</option>
                                                    <option value="true">Yes</option>
                                                    <option value="false">No</option>
                                                </select>
                                            );
                                        }
                                        const inputType = property.fieldType === "number" ? "number" : property.fieldType === "date" ? "date" : property.fieldType === "email" ? "email" : property.fieldType === "phone" ? "tel" : property.fieldType === "url" ? "url" : "text";
                                        return <Input key={property.id} aria-label={property.title} type={inputType} placeholder={property.title} value={value} onChange={setValue} />;
                                    })}
                                </div>
                            </>
                        )}
                        <div className="mt-8 flex justify-center">
                            <Button color="primary" size="md" className="min-w-44" onClick={handleSearch}>Search</Button>
                        </div>
                    </section>

                    <div className="space-y-4">
                        <section className="rounded-2xl border border-secondary bg-primary p-5 shadow-xs">
                            <h2 className="text-sm font-bold uppercase tracking-wide text-primary">Campaigns</h2>
                            <div ref={campaignDropdownRef} className="relative mt-4">
                                <button
                                    type="button"
                                    aria-haspopup="listbox"
                                    aria-expanded={campaignDropdownOpen}
                                    onClick={() => setCampaignDropdownOpen((open) => !open)}
                                    className="flex min-h-11 w-full items-center justify-between gap-2 rounded-lg border border-secondary bg-primary px-3 py-2 text-left transition hover:border-brand"
                                >
                                    <span className="min-w-0 flex-1 truncate text-sm text-secondary">{selectedCampaignLabels.length ? selectedCampaignLabels.join(", ") : "Select Campaigns"}</span>
                                    <ChevronDown className={`size-4 shrink-0 text-tertiary transition ${campaignDropdownOpen ? "rotate-180" : ""}`} />
                                </button>
                                {campaignDropdownOpen && (
                                    <div role="listbox" aria-label="Select Campaigns" className="absolute z-20 mt-2 max-h-64 w-full overflow-y-auto rounded-lg border border-secondary bg-primary p-2 shadow-lg">
                                        {campaigns.length ? campaigns.map((campaign) => {
                                            const checked = selectedCampaigns.includes(campaign.id);
                                            return (
                                                <label key={campaign.id} className={`flex min-h-10 cursor-pointer items-center gap-3 rounded-lg px-2 py-2 text-sm transition ${checked ? "bg-brand-secondary" : "hover:bg-primary_hover"}`}>
                                                    <input type="checkbox" checked={checked} onChange={() => toggleCampaign(campaign.id)} className="size-4 accent-[#7754d6]" />
                                                    <span className="min-w-0 flex-1 truncate text-primary">{campaign.title}</span>
                                                </label>
                                            );
                                        }) : <p className="px-2 py-3 text-sm text-tertiary">No campaigns found</p>}
                                    </div>
                                )}
                            </div>
                        </section>

                        <section className="rounded-2xl border border-secondary bg-primary p-5 shadow-xs">
                            <h2 className="text-sm font-bold uppercase tracking-wide text-primary">Contact Source</h2>
                            <div className="mt-4 space-y-3">
                                {(showAllSources ? CONTACT_SOURCES : CONTACT_SOURCES.slice(0, VISIBLE_SOURCES)).map((source) => (
                                    <label key={source} className="flex cursor-pointer items-center gap-3 text-sm text-primary">
                                        <input type="checkbox" checked={sources.includes(source)} onChange={() => toggleSource(source)} className="size-4 accent-[#7754d6]" />
                                        {source}
                                    </label>
                                ))}
                            </div>
                            {CONTACT_SOURCES.length > VISIBLE_SOURCES && (
                                <button type="button" onClick={() => setShowAllSources((current) => !current)} className="mt-4 text-sm font-medium text-brand-secondary hover:underline">
                                    {showAllSources ? "View Less" : "View More...."}
                                </button>
                            )}
                        </section>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
}
