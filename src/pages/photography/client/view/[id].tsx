import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { DefaultLayout } from "@/layouts/DefaultLayout";
import { TableCard } from "@/components/application/table/table";
import { Button } from "@/components/base/buttons/button";
import { getPhotographyClientById } from "@/utils/services/photographyClientService";

export default function PhotographyClientViewPage() {
    const navigate = useNavigate();
    const params = useParams();
    const id = String(params.id || "");
    const [loading, setLoading] = useState(true);
    const [client, setClient] = useState<any>(null);

    useEffect(() => {
        const run = async () => {
            if (!id) return;
            setLoading(true);
            try {
                const response: any = await getPhotographyClientById(id);
                setClient(response?.data ?? response);
            } finally {
                setLoading(false);
            }
        };
        run();
    }, [id]);

    return (
        <DefaultLayout>
            <TableCard.Root>
                <TableCard.Header title="View Photography Client" />
                <div className="space-y-3 bg-primary px-4 py-5 md:px-6">
                    <div>
                        <div className="text-xs text-tertiary">Client Name</div>
                        <div className="text-sm text-primary">{loading ? "Loading..." : client?.name || "-"}</div>
                    </div>
                    <div>
                        <div className="text-xs text-tertiary">Phone Number</div>
                        <div className="text-sm text-primary">{loading ? "Loading..." : client?.phone || "-"}</div>
                    </div>
                    <div>
                        <div className="text-xs text-tertiary">WhatsApp Number</div>
                        <div className="text-sm text-primary">{loading ? "Loading..." : client?.whatsappNumber || "-"}</div>
                    </div>
                    <div>
                        <div className="text-xs text-tertiary">Email</div>
                        <div className="text-sm text-primary">{loading ? "Loading..." : client?.email || "-"}</div>
                    </div>
                    <div>
                        <div className="text-xs text-tertiary">Address</div>
                        <div className="text-sm text-primary">{loading ? "Loading..." : client?.address || "-"}</div>
                    </div>
                    <div className="pt-2">
                        <Button color="secondary" onClick={() => navigate("/photography/client")}>
                            Back
                        </Button>
                    </div>
                </div>
            </TableCard.Root>
        </DefaultLayout>
    );
}
