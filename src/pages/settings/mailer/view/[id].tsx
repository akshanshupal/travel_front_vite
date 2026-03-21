import { DefaultLayout } from "@/layouts/DefaultLayout";
import { TableCard } from "@/components/application/table/table";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import { CustomBreadscrumbs } from "@/components/application/breadcrumbs/custom-breadcrumbs";
import { useAvailableTableWidth } from "@/hooks/use-available-table-width";
import { useStoreSnackbar } from "@/store/snackbar";
import { getMailerById } from "@/utils/services/mailerService";
import { ArrowLeft, Edit01 } from "@untitledui/icons";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function SettingsMailerViewPage() {
    const availableWidth = useAvailableTableWidth();
    const navigate = useNavigate();
    const { id } = useParams();
    const { showSnackbar } = useStoreSnackbar();

    const [loading, setLoading] = useState(true);
    const [mailer, setMailer] = useState<any>(null);

    useEffect(() => {
        const run = async () => {
            if (!id) return;
            setLoading(true);
            try {
                const response: any = await getMailerById(id);
                if (response?.error) throw new Error(response.error);
                const data = response?.data ?? response;
                setMailer(Array.isArray(data) ? data[0] : data);
            } catch (error: any) {
                showSnackbar({ title: "Error", description: error?.message || "Failed to load mailer", color: "danger" });
            } finally {
                setLoading(false);
            }
        };
        run();
    }, [id, showSnackbar]);

    const breadcrumbsList = useMemo(
        () => [
            { label: "Settings", link: "/settings/mailer" },
            { label: "Mailer", link: "/settings/mailer" },
            { label: "View" },
        ],
        [],
    );

    return (
        <DefaultLayout>
            <div className="space-y-4" style={{ width: availableWidth }}>
                <CustomBreadscrumbs list={breadcrumbsList} />
                <TableCard.Root>
                    <TableCard.Header
                        title={loading ? "View Mailer" : mailer?.title || "View Mailer"}
                        contentTrailing={
                            <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center md:justify-end">
                                <Button color="secondary" iconLeading={ArrowLeft} onClick={() => navigate("/settings/mailer")}>
                                    Back
                                </Button>
                                <Button
                                    color="primary"
                                    iconLeading={Edit01}
                                    onClick={() => navigate(`/settings/mailer/edit/${id}`)}
                                    isDisabled={!id}
                                >
                                    Edit
                                </Button>
                            </div>
                        }
                    />

                    <div className="space-y-6 bg-primary px-4 py-5 md:px-6">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="rounded-lg border border-secondary bg-secondary p-4">
                                <div className="text-sm font-semibold text-primary">Host</div>
                                <div className="text-sm text-tertiary mt-1">{mailer?.host || "—"}</div>
                            </div>
                            <div className="rounded-lg border border-secondary bg-secondary p-4">
                                <div className="text-sm font-semibold text-primary">Email</div>
                                <div className="text-sm text-tertiary mt-1">{mailer?.email || "—"}</div>
                            </div>
                            <div className="rounded-lg border border-secondary bg-secondary p-4">
                                <div className="text-sm font-semibold text-primary">Email Function</div>
                                <div className="text-sm text-tertiary mt-1">{mailer?.emailFunction || "—"}</div>
                            </div>
                            <div className="rounded-lg border border-secondary bg-secondary p-4">
                                <div className="text-sm font-semibold text-primary">Status</div>
                                <div className="mt-2">
                                    <Badge size="sm" color={mailer?.status ? "success" : "error"}>
                                        {mailer?.status ? "Active" : "Inactive"}
                                    </Badge>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-lg border border-secondary bg-secondary p-4">
                            <div className="text-sm font-semibold text-primary">Subject</div>
                            <div className="text-sm text-tertiary mt-1 whitespace-pre-wrap">{mailer?.subject || "—"}</div>
                        </div>

                        <div className="rounded-lg border border-secondary bg-secondary p-4">
                            <div className="text-sm font-semibold text-primary">HTML Preview</div>
                            <div className="mt-3 rounded-lg border border-secondary bg-primary p-4 overflow-auto">
                                {mailer?.html ? (
                                    <div className="text-primary" dangerouslySetInnerHTML={{ __html: mailer.html }} />
                                ) : (
                                    <div className="text-sm text-tertiary">—</div>
                                )}
                            </div>
                        </div>
                    </div>
                </TableCard.Root>
            </div>
        </DefaultLayout>
    );
}
