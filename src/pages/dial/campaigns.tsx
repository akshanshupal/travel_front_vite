import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { CompactPagination } from "@/components/application/pagination/pagination";
import { FloatingHeaderTable } from "@/components/application/table/table";
import { getDialCampaigns } from "@/utils/services/dialService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { DialShell, EmptyPanel } from "./shared";
import { FiSearch } from "react-icons/fi";

const num = (value: any) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
};

export default function DialCampaignsPage() {
    const navigate = useNavigate();
    const [campaigns, setCampaigns] = useState<Record<string, any>[]>([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState("");
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(50);

    useEffect(() => {
        getDialCampaigns()
            .then((response) => setCampaigns(Array.isArray(response) ? response : response?.data || []))
            .catch(() => setCampaigns([]))
            .finally(() => setLoading(false));
    }, []);

    const filtered = campaigns.filter((campaign) => !query || String(campaign.title || "").toLowerCase().includes(query.toLowerCase()));
    const rows = filtered.slice((page - 1) * limit, page * limit);

    const columns = ["No.", "Campaign Name", "Assigned Leads", "Unassigned Leads", "Uncontacted Leads", "In-Progress", "Closed Leads", "Action"];

    return <DialShell
        title="Assigned Campaigns"
        action={<div className="relative"><Input aria-label="Search Campaign" placeholder="Search Campaign" value={query} onChange={(value) => { setQuery(value); setPage(1); }} /><FiSearch aria-hidden="true" className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#817987]" /></div>}
    >
        <FloatingHeaderTable className="rounded-xl border border-secondary bg-primary">
            <table className="w-full text-left text-sm">
                <thead className="border-b border-secondary text-xs uppercase text-tertiary">
                    <tr>
                        {columns.map((column, index) => <th key={column} className={index === 0 ? "sticky left-0 z-20 bg-secondary px-6 py-3 font-medium shadow-[4px_0_8px_-6px_rgba(0,0,0,0.35)]" : index === columns.length - 1 ? "sticky right-0 z-20 border-l border-secondary bg-secondary px-6 py-3 font-medium shadow-[-4px_0_8px_-6px_rgba(0,0,0,0.35)]" : "bg-secondary px-6 py-3 font-medium"}>{column}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((campaign, index) => <tr key={String(campaign.id || index)} className="border-b border-secondary last:border-0">
                        <td className="sticky left-0 z-10 bg-primary px-6 py-4 text-tertiary shadow-[4px_0_8px_-6px_rgba(0,0,0,0.35)]">{(page - 1) * limit + index + 1}</td>
                        <td className="px-6 py-4 font-medium text-primary">{campaign.title || "Untitled campaign"}</td>
                        <td className="px-6 py-4 text-tertiary">{num(campaign.assignedLeads ?? campaign.leadCount)}</td>
                        <td className="px-6 py-4 text-tertiary">{num(campaign.unassignedLeads)}</td>
                        <td className="px-6 py-4 text-tertiary">{num(campaign.uncontactedLeads)}</td>
                        <td className="px-6 py-4 text-tertiary">{num(campaign.inProgress ?? campaign.queueCount)}</td>
                        <td className="px-6 py-4 text-tertiary">{num(campaign.closedLeads)}</td>
                        <td className="sticky right-0 z-10 border-l border-secondary bg-primary px-6 py-4 shadow-[-4px_0_8px_-6px_rgba(0,0,0,0.35)]"><Button size="sm" color="tertiary" onClick={() => navigate(`/dial/leads/queue?campaign=${campaign.id || ""}`)}>START CALLING</Button></td>
                    </tr>)}
                </tbody>
            </table>
            {!loading && !rows.length && <EmptyPanel title="No campaigns assigned" description="Assigned campaigns will appear here once leads are distributed." />}
            <CompactPagination
                page={page}
                limit={limit}
                itemCount={rows.length}
                totalCount={filtered.length}
                onPageChange={setPage}
                onLimitChange={(value) => { setLimit(value); setPage(1); }}
            />
        </FloatingHeaderTable>
    </DialShell>;
}
