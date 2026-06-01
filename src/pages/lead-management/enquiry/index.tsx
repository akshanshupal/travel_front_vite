import { DefaultLayout } from "@/layouts/DefaultLayout";
import { StickyTable, Table, TableCard } from "@/components/application/table/table";
import { PaginationButtonGroup } from "@/components/application/pagination/pagination";
import { useAvailableTableWidth } from "@/hooks/use-available-table-width";
import { getEnquiries, updateEnquiryById } from "@/utils/services/enquiryService";
import { useStoreSnackbar } from "@/store/snackbar";
import { Eye } from "@untitledui/icons";
import { useEffect, useMemo, useRef, useState } from "react";

type EnquiryItem = {
    id: string;
    fullName?: string;
    email?: string;
    mobile?: string;
    destination?: string;
    packageName?: string;
    travelDate?: string;
    days?: number;
    adults?: number;
    kids?: number;
    source?: string;
    pageUrl?: string;
    transferredToLead?: boolean | string;
    createdAt?: string;
};

const asArray = (value: any) => (Array.isArray(value) ? value : []);
const getId = (value: any) => String(value?.id ?? value?._id ?? value ?? "").trim();

const formatDate = (dateStr: string | undefined) => {
    if (!dateStr) return "—";
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "Invalid Date";
    return d.toLocaleString("en-IN", { day: "2-digit", month: "short", year: "2-digit", hour: "numeric", minute: "numeric", hour12: true });
};

const formatUrl = (url: string | undefined) => {
    if (!url) return "—";
    try {
        const u = new URL(url);
        const path = `${u.hostname}${u.pathname}`;
        return path.length > 42 ? `${path.slice(0, 39)}...` : path;
    } catch {
        return url.length > 42 ? `${url.slice(0, 39)}...` : url;
    }
};

export default function EnquiryIndexPage() {
    const availableWidth = useAvailableTableWidth();

    const [items, setItems] = useState<EnquiryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState<string | null>(null);
    const [totalRecords, setTotalRecords] = useState(0);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [viewing, setViewing] = useState<EnquiryItem | null>(null);
    const transferringRef = useRef(new Set<string>());

    const totalPages = Math.max(1, Math.ceil((totalRecords || 0) / limit));
    const indexById = useMemo(() => new Map(items.map((item, index) => [item.id, (page - 1) * limit + index + 1])), [items, limit, page]);

    useEffect(() => {
        const run = async () => {
            setLoading(true);
            setLoadError(null);
            try {
                const res = await getEnquiries({ totalCount: "true", page: String(page), limit: String(limit) });
                const resolved = (res as any)?.data ?? res;
                const list = Array.isArray(resolved?.data) ? resolved.data : Array.isArray(resolved) ? resolved : asArray(resolved?.items);
                const normalized = asArray(list)
                    .map((it: any) => {
                        const id = getId(it);
                        if (!id) return null;
                        return { ...it, id } as EnquiryItem;
                    })
                    .filter(Boolean) as EnquiryItem[];
                const count = Number((res as any)?.totalCount ?? resolved?.totalCount ?? normalized.length) || normalized.length;
                setItems(normalized);
                setTotalRecords(count);
            } catch (e: any) {
                setLoadError(e?.message || "Failed to load enquiries");
                setItems([]);
                setTotalRecords(0);
            } finally {
                setLoading(false);
            }
        };
        run();
    }, [page, limit]);

    const columns = [
        { id: "index", name: "#", isRowHeader: true, widthRatio: 6, minWidth: 64 },
        { id: "fullName", name: "Name", widthRatio: 14, minWidth: 180 },
        { id: "mobile", name: "Mobile", widthRatio: 10, minWidth: 140 },
        { id: "email", name: "Email", widthRatio: 14, minWidth: 220 },
        { id: "destination", name: "Destination", widthRatio: 14, minWidth: 200 },
        { id: "source", name: "Source", widthRatio: 10, minWidth: 140 },
        { id: "pageUrl", name: "Page", widthRatio: 18, minWidth: 240 },
        { id: "createdAt", name: "Received", widthRatio: 10, minWidth: 170 },
        { id: "actions", name: "Actions", widthRatio: 4, minWidth: 140, className: "pr-4 pl-4 whitespace-nowrap" },
    ] as { id: string; name: string; className?: string; widthRatio?: number; minWidth?: number; isRowHeader?: boolean }[];

    const isTransferred = (value: boolean | string | undefined) => value === true || value === "true";

    const handleTransfer = async (id: string) => {
        if (!id) return;
        if (transferringRef.current.has(id)) return;
        transferringRef.current.add(id);
        try {
            await updateEnquiryById(id, { transferredToLead: true });
            setItems((prev) => prev.map((it) => (it.id === id ? { ...it, transferredToLead: true } : it)));
            if (viewing?.id === id) setViewing({ ...viewing, transferredToLead: true });
            useStoreSnackbar.getState().showSnackbar({ title: "Transferred", description: "Enquiry marked as transferred to lead", color: "success" });
        } catch (e: any) {
            useStoreSnackbar.getState().showSnackbar({ title: "Error", description: e?.message || "Failed to transfer enquiry", color: "danger" });
        } finally {
            transferringRef.current.delete(id);
        }
    };

    return (
        <DefaultLayout>
            <div style={{ width: availableWidth }}>
                <TableCard.Root className="w-full">
                    <TableCard.Header title="Enquiries" description="Website enquiries received from public pages" />

                    {loading ? (
                        <StickyTable
                            ariaLabel="Enquiries list"
                            columns={columns}
                            items={Array.from({ length: 5 }).map((_, i) => ({ id: `skeleton-${i}` }))}
                            availableWidth={availableWidth}
                            loading={loading}
                        >
                            {(item: any) => (
                                <Table.Row id={item.id} columns={columns}>
                                    {(column) => (
                                        <Table.Cell className={`${column?.className || ""}`.trim()}>
                                            <div className="animate-pulse">
                                                <div className="h-4 w-full rounded bg-secondary" />
                                            </div>
                                        </Table.Cell>
                                    )}
                                </Table.Row>
                            )}
                        </StickyTable>
                    ) : loadError ? (
                        <div className="px-4 py-10 text-sm text-error md:px-6">{loadError}</div>
                    ) : (
                        <StickyTable ariaLabel="Enquiries list" columns={columns} items={items} availableWidth={availableWidth} loading={loading}>
                            {(item) => (
                                <Table.Row id={item.id} columns={columns}>
                                    {(column) => (
                                        <Table.Cell className={`${column?.className || ""} ${column.id === "actions" ? "whitespace-nowrap" : "whitespace-normal break-words"}`.trim()}>
                                            {column.id === "index" ? (
                                                <span className="text-sm text-tertiary">{indexById.get(item.id) ?? "—"}</span>
                                            ) : column.id === "fullName" ? (
                                                <span className="text-sm font-semibold text-primary">{item.fullName || "—"}</span>
                                            ) : column.id === "mobile" ? (
                                                <span className="text-sm text-tertiary">{item.mobile || "—"}</span>
                                            ) : column.id === "email" ? (
                                                <span className="text-sm text-tertiary">{item.email || "—"}</span>
                                            ) : column.id === "destination" ? (
                                                <span className="text-sm text-tertiary">{item.destination || item.packageName || "—"}</span>
                                            ) : column.id === "source" ? (
                                                <span className="text-sm text-tertiary">{item.source || "—"}</span>
                                            ) : column.id === "pageUrl" ? (
                                                item.pageUrl ? (
                                                    <a href={item.pageUrl} target="_blank" rel="noreferrer" className="text-sm text-brand-600 hover:underline">
                                                        {formatUrl(item.pageUrl)}
                                                    </a>
                                                ) : (
                                                    <span className="text-sm text-tertiary">—</span>
                                                )
                                            ) : column.id === "createdAt" ? (
                                                <span className="text-sm text-tertiary">{formatDate(item.createdAt)}</span>
                                            ) : (
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        type="button"
                                                        className="inline-flex items-center gap-1 text-xs font-medium text-brand-600 hover:underline"
                                                        onClick={() => setViewing(item)}
                                                    >
                                                        <Eye className="size-4" />
                                                        View
                                                    </button>
                                                    {isTransferred(item.transferredToLead) ? (
                                                        <span className="text-xs font-medium text-tertiary">Transferred</span>
                                                    ) : (
                                                        <button
                                                            type="button"
                                                            className="text-xs font-medium text-brand-600 hover:underline"
                                                            onClick={() => handleTransfer(item.id)}
                                                        >
                                                            Transfer
                                                        </button>
                                                    )}
                                                </div>
                                            )}
                                        </Table.Cell>
                                    )}
                                </Table.Row>
                            )}
                        </StickyTable>
                    )}

                    <div className="flex flex-col gap-3 border-t border-secondary px-4 py-4 md:flex-row md:items-center md:justify-between md:px-6">
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-tertiary">Rows</span>
                            <select
                                className="rounded-md border border-secondary bg-primary px-2 py-1 text-xs"
                                value={limit}
                                onChange={(e) => {
                                    setLimit(Number(e.target.value) || 10);
                                    setPage(1);
                                }}
                            >
                                {[10, 25, 50, 100].map((n) => (
                                    <option key={n} value={n}>
                                        {n}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <PaginationButtonGroup page={page} total={totalPages} align="center" onPageChange={(next) => setPage(Math.min(totalPages, Math.max(1, next)))} />
                    </div>
                </TableCard.Root>
            </div>

            {viewing ? (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" role="dialog" aria-modal="true">
                    <div className="w-full max-w-2xl rounded-xl border border-secondary bg-primary p-5 shadow-lg">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <div className="text-sm font-semibold text-primary">{viewing.fullName || "Enquiry"}</div>
                                <div className="mt-1 text-xs text-tertiary">{formatDate(viewing.createdAt)}</div>
                            </div>
                            <button type="button" className="text-xs text-tertiary hover:text-primary" onClick={() => setViewing(null)}>
                                Close
                            </button>
                        </div>

                        <div className="mt-4 grid grid-cols-1 gap-3 text-sm">
                            <div className="grid grid-cols-1 gap-1">
                                <div className="text-xs text-tertiary">Mobile</div>
                                <div className="text-primary">{viewing.mobile || "—"}</div>
                            </div>
                            <div className="grid grid-cols-1 gap-1">
                                <div className="text-xs text-tertiary">Email</div>
                                <div className="text-primary">{viewing.email || "—"}</div>
                            </div>
                            <div className="grid grid-cols-1 gap-1">
                                <div className="text-xs text-tertiary">Destination / Package</div>
                                <div className="text-primary">{viewing.destination || viewing.packageName || "—"}</div>
                            </div>
                            <div className="grid grid-cols-1 gap-1">
                                <div className="text-xs text-tertiary">Travel Details</div>
                                <div className="text-primary">
                                    {viewing.travelDate ? `Date: ${viewing.travelDate}` : "Date: —"}{" "}
                                    {Number.isFinite(viewing.days) ? `· Days: ${viewing.days}` : ""}{" "}
                                    {Number.isFinite(viewing.adults) ? `· Adults: ${viewing.adults}` : ""}{" "}
                                    {Number.isFinite(viewing.kids) ? `· Kids: ${viewing.kids}` : ""}
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-1">
                                <div className="text-xs text-tertiary">Source</div>
                                <div className="text-primary">{viewing.source || "—"}</div>
                            </div>
                            <div className="grid grid-cols-1 gap-1">
                                <div className="text-xs text-tertiary">Transferred To Lead</div>
                                <div className="text-primary">{isTransferred(viewing.transferredToLead) ? "Yes" : "No"}</div>
                            </div>
                            <div className="grid grid-cols-1 gap-1">
                                <div className="text-xs text-tertiary">Page URL</div>
                                <div className="text-primary break-all">
                                    {viewing.pageUrl ? (
                                        <a href={viewing.pageUrl} target="_blank" rel="noreferrer" className="text-brand-600 hover:underline">
                                            {viewing.pageUrl}
                                        </a>
                                    ) : (
                                        "—"
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </DefaultLayout>
    );
}
