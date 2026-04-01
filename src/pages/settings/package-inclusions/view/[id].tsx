import { DefaultLayout } from "@/layouts/DefaultLayout";
import { TableCard } from "@/components/application/table/table";
import { CustomBreadscrumbs } from "@/components/application/breadcrumbs/custom-breadcrumbs";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import { Input } from "@/components/base/input/input";
import { Select } from "@/components/base/select/select";
import { useStoreSnackbar } from "@/store/snackbar";
import { useAccess } from "@/hooks/use-access";
import { getGeneralDataById } from "@/utils/services/generalDataService";
import { ArrowLeft, Edit01 } from "@untitledui/icons";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";

const asBool = (value: unknown) => {
    if (typeof value === "boolean") return value;
    if (typeof value === "number") return value !== 0;
    if (typeof value === "string") return value.toLowerCase() === "true" || value === "1";
    return false;
};

export default function SettingsPackageInclusionsViewPage() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { showSnackbar } = useStoreSnackbar();
    const { can } = useAccess();
    const canEdit = can("packageinclusion", "edit");
    const [loading, setLoading] = useState(true);
    const [item, setItem] = useState<any>(null);
    const breadcrumbsList = useMemo(
        () => [
            { label: "Settings", link: "/additional-data/settings/package-inclusions" },
            { label: "Package Inclusions", link: "/additional-data/settings/package-inclusions" },
            { label: "View" },
        ],
        [],
    );

    useEffect(() => {
        const run = async () => {
            if (!id) return;
            setLoading(true);
            try {
                const response = await getGeneralDataById(id);
                if ((response as any)?.error) throw new Error((response as any).error);
                const raw = (response as any)?.data ?? response;
                setItem(raw || null);
            } catch (e: any) {
                showSnackbar({ title: "Error", description: e?.message || "Failed to load package inclusion", color: "danger" });
            } finally {
                setLoading(false);
            }
        };
        run();
    }, [id, showSnackbar]);

    if (loading) {
        return (
            <DefaultLayout>
                <div className="flex min-h-[320px] items-center justify-center">
                    <div className="h-10 w-10 animate-spin rounded-full border-2 border-tertiary border-t-transparent" />
                </div>
            </DefaultLayout>
        );
    }

    if (!item) {
        return (
            <DefaultLayout>
                <div className="flex min-h-[320px] flex-col items-center justify-center gap-3">
                    <p className="text-base font-medium text-primary">Package inclusion not found.</p>
                    <Button color="secondary" onClick={() => navigate("/additional-data/settings/package-inclusions")}>
                        Back to List
                    </Button>
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
                        title="View Package Inclusion"
                        contentTrailing={
                            <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center md:justify-end">
                                <Button color="secondary" iconLeading={ArrowLeft} onClick={() => navigate("/additional-data/settings/package-inclusions")}>
                                    Back
                                </Button>
                                <Button color="primary" iconLeading={Edit01} isDisabled={!canEdit} onClick={() => navigate(`/additional-data/settings/package-inclusions/edit/${id}`)}>
                                    Edit
                                </Button>
                            </div>
                        }
                    />

                    <div className="space-y-4 bg-primary px-4 py-5 md:px-6">
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex flex-col gap-1">
                                <div className="text-lg font-semibold text-primary">{item?.title || "—"}</div>
                                <div className="text-sm text-tertiary">{item?.alias || "—"}</div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Badge size="sm" color={asBool(item?.status) ? "success" : "error"}>
                                    {asBool(item?.status) ? "Active" : "Inactive"}
                                </Badge>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <Input label="Title" value={String(item?.title || "")} onChange={(_: string) => {}} isDisabled />
                            <Input label="Alias" value={String(item?.alias || "")} onChange={(_: string) => {}} isDisabled />
                            <Select
                                aria-label="Status"
                                label="Status"
                                selectedKey={String(asBool(item?.status))}
                                onSelectionChange={(_: unknown) => {}}
                                items={[
                                    { id: "true", label: "Active" },
                                    { id: "false", label: "Inactive" },
                                ]}
                                isDisabled
                            >
                                {(option) => <Select.Item id={option.id}>{option.label}</Select.Item>}
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <div className="text-sm font-medium text-primary">Items</div>
                            <div className="space-y-2">
                                {(Array.isArray(item?.value) ? item.value : []).map((entry: any, index: number) => (
                                    <Input
                                        key={`item-${index}`}
                                        label={`Item ${index + 1}`}
                                        value={String(entry?.Items || "")}
                                        onChange={(_: string) => {}}
                                        isDisabled
                                    />
                                ))}
                                {(Array.isArray(item?.value) ? item.value : []).length === 0 ? <div className="text-sm text-tertiary">—</div> : null}
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 border-t border-secondary pt-4 md:flex-row md:items-center md:justify-end">
                            <Button color="secondary" iconLeading={ArrowLeft} onClick={() => navigate("/additional-data/settings/package-inclusions")}>
                                Back
                            </Button>
                            <Button color="primary" iconLeading={Edit01} isDisabled={!canEdit} onClick={() => navigate(`/additional-data/settings/package-inclusions/edit/${id}`)}>
                                Edit
                            </Button>
                        </div>
                    </div>
                </TableCard.Root>
            </div>
        </DefaultLayout>
    );
}
