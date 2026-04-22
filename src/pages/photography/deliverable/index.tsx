import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { DefaultLayout } from "@/layouts/DefaultLayout";
import { Button } from "@/components/base/buttons/button";
import { TableCard } from "@/components/application/table/table";
import { getPhotographyDeliverables } from "@/utils/services/photographyDeliverableService";

type Deliverable = {
    id: string;
    title: string;
    content: string;
};

const toPlainText = (value: string) => {
    if (!value) return "";
    if (typeof window === "undefined") return value;
    const parser = new DOMParser();
    const doc = parser.parseFromString(value, "text/html");
    return (doc.body.textContent || "").replace(/\s+/g, " ").trim();
};

export default function PhotographyDeliverablePage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [deliverables, setDeliverables] = useState<Deliverable[]>([]);

    const fetchDeliverables = async () => {
        setLoading(true);
        try {
            const response: any = await getPhotographyDeliverables({ limit: "100", totalCount: "true" });
            const resolved = response?.data ?? response;
            const list = Array.isArray(resolved?.data) ? resolved.data : Array.isArray(resolved) ? resolved : [];
            setDeliverables(list);
        } catch {
            setDeliverables([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDeliverables();
    }, []);

    return (
        <DefaultLayout>
            <TableCard.Root>
                <TableCard.Header
                    title="Photography - Deliverables"
                    badge={loading ? "..." : deliverables.length}
                    contentTrailing={
                        <Button color="primary" onClick={() => navigate("/photography/deliverable/add")}>
                            Add Deliverable
                        </Button>
                    }
                />
                <div className="overflow-x-auto bg-primary px-4 py-5 md:px-6">
                    <table className="w-full border-collapse text-left text-sm">
                        <thead>
                            <tr className="border-b border-secondary text-tertiary">
                                <th className="px-2 py-2">Title</th>
                                <th className="px-2 py-2">Preview</th>
                                <th className="px-2 py-2 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {deliverables.map((deliverable) => (
                                <tr key={deliverable.id} className="border-b border-secondary">
                                    <td className="px-2 py-2">{deliverable.title}</td>
                                    <td className="max-w-[520px] px-2 py-2 text-tertiary">
                                        <div className="line-clamp-2">{toPlainText(deliverable.content) || "-"}</div>
                                    </td>
                                    <td className="px-2 py-2">
                                        <div className="flex justify-end gap-2">
                                            <Button size="sm" color="secondary" onClick={() => navigate(`/photography/deliverable/edit/${deliverable.id}`)}>
                                                Edit
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {!loading && deliverables.length === 0 && (
                                <tr>
                                    <td colSpan={3} className="px-2 py-4 text-tertiary">
                                        No deliverables found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </TableCard.Root>
        </DefaultLayout>
    );
}
