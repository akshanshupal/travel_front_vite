import { useMemo } from "react";
import { useNavigate } from "react-router";
import { DefaultLayout } from "@/layouts/DefaultLayout";
import { TableCard } from "@/components/application/table/table";
import { Button } from "@/components/base/buttons/button";
import {
    loadPhotographyTemplates,
} from "@/pages/photography/shared/templates";

export default function PhotographyTemplatePage() {
    const navigate = useNavigate();
    const templates = useMemo(() => loadPhotographyTemplates(), []);

    return (
        <DefaultLayout>
            <TableCard.Root>
                <TableCard.Header
                    title="Photography - Templates"
                    badge={templates.length}
                    contentTrailing={
                        <Button color="primary" onClick={() => navigate("/photography/template/add")}>
                            Add Template
                        </Button>
                    }
                />
                <div className="overflow-x-auto bg-primary px-4 py-5 md:px-6">
                    <table className="w-full border-collapse text-left text-sm">
                        <thead>
                            <tr className="border-b border-secondary text-tertiary">
                                <th className="px-2 py-2">Template</th>
                                <th className="px-2 py-2">Main Event</th>
                                <th className="px-2 py-2">Deliverables</th>
                                <th className="px-2 py-2 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {templates.map((template) => (
                                <tr key={template.id} className="border-b border-secondary">
                                    <td className="px-2 py-2">{template.name}</td>
                                    <td className="px-2 py-2">{template.mainEventName}</td>
                                    <td className="px-2 py-2">{template.deliverables.length}</td>
                                    <td className="px-2 py-2">
                                        <div className="flex justify-end gap-2">
                                            <Button size="sm" color="secondary" onClick={() => navigate(`/photography/template/view/${template.id}`)}>
                                                View
                                            </Button>
                                            <Button size="sm" color="secondary" onClick={() => navigate(`/photography/template/edit/${template.id}`)}>
                                                Edit
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </TableCard.Root>
        </DefaultLayout>
    );
}
