import { DefaultLayout } from "@/layouts/DefaultLayout";
import { TableCard } from "@/components/application/table/table";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import { Input } from "@/components/base/input/input";
import { Select } from "@/components/base/select/select";
import { useState } from "react";
import { useNavigate } from "react-router";

export const DialShell = ({ title, description, children, action }: { title: string; description?: string; children: React.ReactNode; action?: React.ReactNode }) => (
    <DefaultLayout><div className="mx-auto max-w-7xl space-y-4"><div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between"><div><p className="text-sm font-medium text-brand-secondary">Dial workspace</p><h1 className="text-2xl font-semibold text-primary">{title}</h1>{description && <p className="mt-1 text-sm text-tertiary">{description}</p>}</div>{action}</div>{children}</div></DefaultLayout>
);

export const EmptyPanel = ({ title, description, action }: { title: string; description: string; action?: React.ReactNode }) => <TableCard.Root><div className="flex min-h-64 flex-col items-center justify-center gap-3 px-6 py-12 text-center"><div className="flex size-12 items-center justify-center rounded-full bg-brand-secondary text-lg font-semibold text-brand-solid">—</div><h2 className="text-md font-semibold text-primary">{title}</h2><p className="max-w-md text-sm text-tertiary">{description}</p>{action}</div></TableCard.Root>;

export const Metric = ({ label, value, tone = "brand" }: { label: string; value: string | number; tone?: "brand" | "success" | "warning" }) => <div className="rounded-xl border border-secondary bg-primary p-5"><Badge color={tone === "brand" ? "blue" : tone}>{label}</Badge><p className="mt-4 text-3xl font-semibold text-primary">{value}</p></div>;

export function DialListPage({ title, description, columns, rows = [], emptyTitle = "Nothing here yet", emptyDescription = "Data will appear here when the dial workspace has activity.", search = true }: { title: string; description: string; columns: string[]; rows?: (string | React.ReactNode)[][]; emptyTitle?: string; emptyDescription?: string; search?: boolean }) {
    const [query, setQuery] = useState("");
    const filtered = rows.filter(row => !query || row.some(cell => String(cell).toLowerCase().includes(query.toLowerCase())));
    return <DialShell title={title} description={description}>{search && <div className="flex flex-col gap-3 md:flex-row"><Input aria-label="Search" placeholder="Search..." value={query} onChange={setQuery} /><Select aria-label="View" placeholder="All records" items={[{ id: "all", label: "All records" }]}>{item => <Select.Item id={item.id}>{item.label}</Select.Item>}</Select></div>}<TableCard.Root><TableCard.Header title={title} badge={rows.length} />{filtered.length ? <div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead className="border-b border-secondary text-xs uppercase text-tertiary"><tr>{columns.map(column => <th key={column} className="px-6 py-3 font-medium">{column}</th>)}</tr></thead><tbody>{filtered.map((row, index) => <tr key={index} className="border-b border-secondary last:border-0"><td className="px-6 py-4" colSpan={columns.length}>{row.join(" · ")}</td></tr>)}</tbody></table></div> : <EmptyPanel title={emptyTitle} description={emptyDescription} />}</TableCard.Root></DialShell>;
}

export const DialBackButton = () => { const navigate = useNavigate(); return <Button color="secondary" onClick={() => navigate("/dial/home")}>Back to dial</Button>; };
