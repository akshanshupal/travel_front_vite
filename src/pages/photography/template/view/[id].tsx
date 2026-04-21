import { useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import { DefaultLayout } from "@/layouts/DefaultLayout";
import { TableCard } from "@/components/application/table/table";
import { Button } from "@/components/base/buttons/button";
import { getPhotographyTemplateById } from "@/pages/photography/shared/templates";

export default function PhotographyTemplateViewPage() {
    const navigate = useNavigate();
    const params = useParams();
    const id = String(params.id || "");
    const template = useMemo(() => getPhotographyTemplateById(id), [id]);

    return (
        <DefaultLayout>
            <TableCard.Root>
                <TableCard.Header title="View Photography Template" />
                <div className="space-y-3 bg-primary px-4 py-5 md:px-6">
                    <div>
                        <div className="text-xs text-tertiary">Template Title</div>
                        <div className="text-sm text-primary">{template?.name || "-"}</div>
                    </div>
                    <div>
                        <div className="text-xs text-tertiary">Main Event Name</div>
                        <div className="text-sm text-primary">{template?.mainEventName || "-"}</div>
                    </div>
                    <div>
                        <div className="text-xs text-tertiary">Timing</div>
                        <div className="text-sm text-primary">{template?.timing || "-"}</div>
                    </div>
                    <div>
                        <div className="text-xs text-tertiary">Deliverables</div>
                        <ul className="list-disc pl-5 text-sm text-primary">
                            {(template?.deliverables || []).map((item: string, index: number) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <div className="text-xs text-tertiary">Package Cost</div>
                        <div className="text-sm text-primary">{template?.packageCost ?? "-"}</div>
                    </div>
                    <div className="pt-2">
                        <Button color="secondary" onClick={() => navigate("/photography/template")}>
                            Back
                        </Button>
                    </div>
                </div>
            </TableCard.Root>
        </DefaultLayout>
    );
}
