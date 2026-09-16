import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { PaginationPageMinimalCenter } from "@/components/application/pagination/pagination";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getDialQueue, type DialQueueItem } from "@/utils/services/dialService";
import { DialShell, EmptyPanel } from "../shared";

export default function DialLeadsPage() {
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const [page, setPage] = useState(1); const [totalCount, setTotalCount] = useState(0);
    const [items, setItems] = useState<DialQueueItem[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => { setLoading(true); getDialQueue({ page, limit: 25, search: query }).then((response) => { setItems(response?.data || []); setTotalCount(response?.totalCount || 0); }).catch(() => { setItems([]); setTotalCount(0); }).finally(() => setLoading(false)); }, [query, page]);
    const search = (value: string) => { setQuery(value); setPage(1); };
    return <DialShell title="Dial leads" description="Review the calling queue and open a lead to record the next disposition."><div className="flex gap-3"><Input aria-label="Search leads" placeholder="Search name, phone, or email" value={query} onChange={search}/></div><div className="overflow-x-auto rounded-xl border border-secondary bg-primary"><table className="w-full text-left text-sm"><thead className="border-b border-secondary text-xs uppercase text-tertiary"><tr><th className="px-6 py-3">Lead</th><th className="px-6 py-3">Campaign</th><th className="px-6 py-3">Stage</th><th className="px-6 py-3">Attempts</th><th className="px-6 py-3" /></tr></thead><tbody>{items.map((item) => <tr key={String(item.lead?.id)} className="border-b border-secondary last:border-0"><td className="px-6 py-4"><p className="font-medium text-primary">{item.lead?.title || item.lead?.name || "Untitled lead"}</p><p className="text-tertiary">{item.lead?.mobile || item.lead?.email || "No contact"}</p></td><td className="px-6 py-4 text-tertiary">{item.campaign?.title || "—"}</td><td className="px-6 py-4 text-tertiary">{item.stage?.name || item.lead?.leadStatus || "—"}</td><td className="px-6 py-4 text-tertiary">{item.callAttemptCount ?? 0}</td><td className="px-6 py-4 text-right"><Button color="secondary" size="sm" onClick={() => navigate(`/dial/leads/view/${item.lead?.id}`)}>Open</Button></td></tr>)}</tbody></table>{!loading && !items.length && <EmptyPanel title="No dial leads available" description="The dial queue is empty for the current search."/>}{loading && <p className="p-8 text-center text-sm text-tertiary">Loading queue…</p>}{totalCount > 25 && <PaginationPageMinimalCenter page={page} total={Math.ceil(totalCount / 25)} onPageChange={setPage}/>}</div></DialShell>;
}
