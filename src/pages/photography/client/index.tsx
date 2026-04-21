import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { DefaultLayout } from "@/layouts/DefaultLayout";
import { Button } from "@/components/base/buttons/button";
import { TableCard } from "@/components/application/table/table";
import { getPhotographyClients } from "@/utils/services/photographyClientService";

type PhotographyClient = {
    id: string;
    name: string;
    phone: string;
    address: string;
};

export default function PhotographyClientPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [clients, setClients] = useState<PhotographyClient[]>([]);

    const fetchClients = async () => {
        setLoading(true);
        try {
            const response: any = await getPhotographyClients({ limit: "100", totalCount: "true" });
            const resolved = response?.data ?? response;
            const list = Array.isArray(resolved?.data) ? resolved.data : Array.isArray(resolved) ? resolved : [];
            setClients(list);
        } catch {
            setClients([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClients();
    }, []);

    return (
        <DefaultLayout>
            <TableCard.Root>
                <TableCard.Header
                    title="Photography - Clients"
                    badge={loading ? "..." : clients.length}
                    contentTrailing={
                        <Button color="primary" onClick={() => navigate("/photography/client/add")}>
                            Add Client
                        </Button>
                    }
                />
                <div className="overflow-x-auto bg-primary px-4 py-5 md:px-6">
                    <table className="w-full border-collapse text-left text-sm">
                        <thead>
                            <tr className="border-b border-secondary text-tertiary">
                                <th className="px-2 py-2">Name</th>
                                <th className="px-2 py-2">Phone</th>
                                <th className="px-2 py-2">Address</th>
                                <th className="px-2 py-2 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clients.map((client) => (
                                <tr key={client.id} className="border-b border-secondary">
                                    <td className="px-2 py-2">{client.name}</td>
                                    <td className="px-2 py-2">{client.phone}</td>
                                    <td className="px-2 py-2">{client.address}</td>
                                    <td className="px-2 py-2">
                                        <div className="flex justify-end gap-2">
                                            <Button size="sm" color="secondary" onClick={() => navigate(`/photography/client/view/${client.id}`)}>
                                                View
                                            </Button>
                                            <Button size="sm" color="secondary" onClick={() => navigate(`/photography/client/edit/${client.id}`)}>
                                                Edit
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {!loading && clients.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-2 py-4 text-tertiary">
                                        No clients found.
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
