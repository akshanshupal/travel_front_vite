import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { getDialCampaigns } from "@/utils/services/dialService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { DialShell } from "../shared";

const stages = [
    { key: "all", title: "All Leads", description: "All leads at one place" },
    { key: "uncontacted", title: "Uncontacted", description: "Leads, Which have not been called so far" },
    { key: "in-progress", title: "In-Progress", description: "Leads that are in progress and not yet closed" },
    { key: "follow-up", title: "Follow-up", description: "Leads, Which are scheduled to be call later" },
    { key: "not-connected", title: "Not Connected", description: "Leads, Which were not connected in previous attempt" },
];

export default function DialLeadsPage() {
    const navigate = useNavigate();
    const [campaignTitle, setCampaignTitle] = useState("");
    const [query, setQuery] = useState("");

    useEffect(() => {
        getDialCampaigns()
            .then((response) => {
                const list = Array.isArray(response) ? response : response?.data || [];
                setCampaignTitle(String(list[0]?.title || ""));
            })
            .catch(() => setCampaignTitle(""));
    }, []);

    const openStage = (key: string) => navigate(`/dial/leads/queue?stage=${key}${query ? `&search=${encodeURIComponent(query)}` : ""}`);

    return <DialShell
        title={campaignTitle || "My Leads"}
        description="Leads from your assigned campaigns, grouped by stage."
        action={<Input aria-label="Search By Contact Number" placeholder="Search By Contact Number" value={query} onChange={setQuery} />}
    >
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {stages.map((stage) => <div key={stage.key} className="flex min-h-56 flex-col justify-between rounded-xl border border-[#e8e2eb] bg-white p-5 shadow-sm"><div><h2 className="font-semibold text-[#6f36c2]">{stage.title}</h2><p className="mt-4 text-xs leading-5 text-[#817987]">{stage.description}</p></div><div className="mt-6 flex gap-2 border-t border-[#eee9f0] pt-4"><Button size="sm" color="secondary" className="flex-1" onClick={() => openStage(stage.key)}>VIEW</Button><Button size="sm" color="tertiary" className="flex-1" onClick={() => openStage(stage.key)}>START CALLING</Button></div></div>)}
        </div>
    </DialShell>;
}
