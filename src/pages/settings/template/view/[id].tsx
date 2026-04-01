import { DefaultLayout } from "@/layouts/DefaultLayout";
import { TableCard } from "@/components/application/table/table";
import { CustomBreadscrumbs } from "@/components/application/breadcrumbs/custom-breadcrumbs";
import { Button } from "@/components/base/buttons/button";
import { Label } from "@/components/base/input/label";
import { Badge } from "@/components/base/badges/badges";
import { useStoreSnackbar } from "@/store/snackbar";
import { useAccess } from "@/hooks/use-access";
import { getMailtemplateById } from "@/utils/services/mailtemplateService";
import { ArrowLeft, Edit01 } from "@untitledui/icons";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function TemplateViewPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { showSnackbar } = useStoreSnackbar();
    const { can } = useAccess();
    const canEdit = can("template", "edit");
    const [isFetching, setIsFetching] = useState(true);
    const [template, setTemplate] = useState<any>(null);
    const breadcrumbsList = useMemo(
        () => [
            { label: "Settings", link: "/additional-data/settings/template" },
            { label: "Template", link: "/additional-data/settings/template" },
            { label: "View" },
        ],
        [],
    );

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;
            try {
                const response = await getMailtemplateById(id);
                if (response && !response.error) {
                    setTemplate(response);
                } else {
                    showSnackbar({ title: "Error", description: response.error || "Failed to fetch template", color: "danger" });
                }
            } catch (error) {
                console.error("Error fetching template:", error);
                showSnackbar({ title: "Error", description: "An error occurred while fetching data", color: "danger" });
            } finally {
                setIsFetching(false);
            }
        };
        fetchData();
    }, [id]);

    if (isFetching) {
        return (
            <DefaultLayout>
                <div className="flex items-center justify-center h-full min-h-[400px]">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            </DefaultLayout>
        );
    }

    if (!template) {
        return (
            <DefaultLayout>
                <div className="flex flex-col items-center justify-center h-full min-h-[400px] gap-4">
                    <h1 className="text-xl font-semibold">Template not found</h1>
                    <Button color="tertiary" onClick={() => navigate("/additional-data/settings/template")}>Back to List</Button>
                </div>
            </DefaultLayout>
        );
    }

    return (
        <DefaultLayout>
            <div className="space-y-4">
                <CustomBreadscrumbs list={breadcrumbsList} />
                <TableCard.Root>
                    <TableCard.Header
                        title="View Template"
                        contentTrailing={
                            <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center md:justify-end">
                                <Button color="secondary" iconLeading={ArrowLeft} onClick={() => navigate("/additional-data/settings/template")}>
                                    Back
                                </Button>
                                <Button color="primary" iconLeading={Edit01} isDisabled={!canEdit} onClick={() => navigate(`/additional-data/settings/template/edit/${id}`)}>
                                    Edit
                                </Button>
                            </div>
                        }
                    />

                    <div className="space-y-6 bg-primary px-4 py-5 md:px-6">
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                            <div className="flex flex-col gap-6">
                                <section className="flex flex-col gap-4 rounded-xl border border-secondary bg-primary p-6">
                                    <h2 className="border-b border-secondary pb-2 text-lg font-semibold text-primary">General Information</h2>
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <div className="flex flex-col gap-1">
                                            <Label className="text-tertiary">Website</Label>
                                            <p className="font-medium text-primary">{template.website}</p>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <Label className="text-tertiary">Hotline Number</Label>
                                            <p className="font-medium text-primary">{template.hotlineNumber}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Label className="text-tertiary">Mail IDs</Label>
                                        <div className="flex flex-wrap gap-2">
                                            {template.mailId?.map((email: string) => (
                                                <Badge key={email} color="brand">{email}</Badge>
                                            ))}
                                        </div>
                                    </div>
                                </section>

                                <section className="flex flex-col gap-4 rounded-xl border border-secondary bg-primary p-6">
                                    <h2 className="border-b border-secondary pb-2 text-lg font-semibold text-primary">Icons & Logo</h2>
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                        <div className="flex flex-col items-center gap-2">
                                            <Label className="text-tertiary">Logo</Label>
                                            <div className="flex size-32 items-center justify-center rounded-lg border border-secondary p-2">
                                                <img src={template.logo} alt="Logo" className="max-h-full max-w-full object-contain" />
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-center gap-2">
                                            <Label className="text-tertiary">Email Icon</Label>
                                            <div className="flex size-32 items-center justify-center rounded-lg border border-secondary p-2">
                                                <img src={template.emailIcon} alt="Email Icon" className="max-h-full max-w-full object-contain" />
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-center gap-2">
                                            <Label className="text-tertiary">User Icon</Label>
                                            <div className="flex size-32 items-center justify-center rounded-lg border border-secondary p-2">
                                                <img src={template.userIcon} alt="User Icon" className="max-h-full max-w-full object-contain" />
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>

                            <div className="flex flex-col gap-6">
                                <section className="flex flex-col gap-4 rounded-xl border border-secondary bg-primary p-6">
                                    <h2 className="border-b border-secondary pb-2 text-lg font-semibold text-primary">Disclaimer</h2>
                                    <div
                                        className="prose prose-sm max-w-none prose-a:text-primary prose-headings:text-primary prose-li:text-primary prose-p:text-primary prose-strong:text-primary"
                                        dangerouslySetInnerHTML={{ __html: template.disclaimer }}
                                    />
                                </section>

                                <section className="flex flex-col gap-4 rounded-xl border border-secondary bg-primary p-6">
                                    <h2 className="border-b border-secondary pb-2 text-lg font-semibold text-primary">Payment Options</h2>
                                    <div className="grid grid-cols-1 gap-4">
                                        {template.paymentType?.map((item: any, index: number) => (
                                            <div key={index} className="flex items-center gap-4 rounded-lg border border-secondary p-3">
                                                <img src={item.paymentImage} alt={item.paymentTitle} className="size-12 rounded border border-secondary p-1 object-contain" />
                                                <div className="flex flex-col">
                                                    <span className="font-semibold text-primary">{item.paymentTitle}</span>
                                                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="max-w-[200px] truncate text-xs text-primary hover:underline">
                                                        {item.url}
                                                    </a>
                                                </div>
                                            </div>
                                        ))}
                                        {(!template.paymentType || template.paymentType.length === 0) && (
                                            <p className="text-tertiary italic">No payment options added</p>
                                        )}
                                    </div>
                                </section>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 border-t border-secondary pt-4 md:flex-row md:items-center md:justify-end">
                            <Button color="secondary" iconLeading={ArrowLeft} onClick={() => navigate("/additional-data/settings/template")}>
                                Back
                            </Button>
                            <Button color="primary" iconLeading={Edit01} isDisabled={!canEdit} onClick={() => navigate(`/additional-data/settings/template/edit/${id}`)}>
                                Edit
                            </Button>
                        </div>
                    </div>
                </TableCard.Root>
            </div>
        </DefaultLayout>
    );
}
