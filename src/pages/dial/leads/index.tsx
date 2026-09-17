import { CompactPagination } from "@/components/application/pagination/pagination";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { FloatingHeaderTable } from "@/components/application/table/table";
import { getDialQueue, type DialQueueItem } from "@/utils/services/dialService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { DialShell, EmptyPanel } from "../shared";

export default function DialLeadsPage() {
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(25);
    const [totalCount, setTotalCount] = useState<number | null>(null);
    const [countLoading, setCountLoading] = useState(false);
    const [items, setItems] = useState<DialQueueItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        getDialQueue({ page, limit, search: query })
            .then((response) => setItems(response?.data || []))
            .catch(() => setItems([]))
            .finally(() => setLoading(false));
    }, [query, page, limit]);

    useEffect(() => setTotalCount(null), [query, limit]);

    const requestTotalCount = async () => {
        setCountLoading(true);
        try {
            const response = await getDialQueue({ search: query, page: 1, limit: 1, totalCount: true });
            setTotalCount(Number(response?.totalCount ?? 0));
        } finally {
            setCountLoading(false);
        }
    };

    const search = (value: string) => {
        setQuery(value);
        setPage(1);
    };

    return (
        <DialShell title="Dial leads" description="Review the calling queue and open a lead to record the next disposition.">
            <div className="flex gap-3">
                <Input aria-label="Search leads" placeholder="Search name, phone, or email" value={query} onChange={search} />
            </div>
            <FloatingHeaderTable className="rounded-xl border border-secondary bg-primary">
                <table className="w-full text-left text-sm">
                    <thead className="border-b border-secondary text-xs uppercase text-tertiary">
                        <tr>
                            <th className="sticky left-0 z-20 bg-secondary px-6 py-3 shadow-[4px_0_8px_-6px_rgba(0,0,0,0.35)]">Lead</th>
                            <th className="bg-secondary px-6 py-3">Campaign</th>
                            <th className="bg-secondary px-6 py-3">Stage</th>
                            <th className="bg-secondary px-6 py-3">Attempts</th>
                            <th className="sticky right-0 z-20 border-l border-secondary bg-secondary px-6 py-3 shadow-[-4px_0_8px_-6px_rgba(0,0,0,0.35)]" />
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={String(item.lead?.id)} className="border-b border-secondary last:border-0">
                                <td className="sticky left-0 z-10 bg-primary px-6 py-4 shadow-[4px_0_8px_-6px_rgba(0,0,0,0.35)]">
                                    <p className="font-medium text-primary">{item.lead?.title || item.lead?.name || "Untitled lead"}</p>
                                    <p className="text-tertiary">{item.lead?.mobile || item.lead?.email || "No contact"}</p>
                                </td>
                                <td className="px-6 py-4 text-tertiary">{item.campaign?.title || "—"}</td>
                                <td className="px-6 py-4 text-tertiary">{item.stage?.name || item.lead?.leadStatus || "—"}</td>
                                <td className="px-6 py-4 text-tertiary">{item.callAttemptCount ?? 0}</td>
                                <td className="sticky right-0 z-10 border-l border-secondary bg-primary px-6 py-4 text-right shadow-[-4px_0_8px_-6px_rgba(0,0,0,0.35)]">
                                    <Button color="secondary" size="sm" onClick={() => navigate(`/dial/leads/view/${item.lead?.id}`)}>
                                        Open
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {!loading && !items.length && <EmptyPanel title="No dial leads available" description="The dial queue is empty for the current search." />}
                {loading && <p className="p-8 text-center text-sm text-tertiary">Loading queue…</p>}
                <CompactPagination
                    page={page}
                    limit={limit}
                    itemCount={items.length}
                    totalCount={totalCount}
                    countLoading={countLoading}
                    onPageChange={setPage}
                    onLimitChange={(nextLimit) => {
                        setLimit(nextLimit);
                        setPage(1);
                    }}
                    onRequestTotalCount={requestTotalCount}
                />
            </FloatingHeaderTable>
        </DialShell>
    );
}
