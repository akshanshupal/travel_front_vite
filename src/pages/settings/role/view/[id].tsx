import { DefaultLayout } from "@/layouts/DefaultLayout";
import { TableCard } from "@/components/application/table/table";
import { CustomBreadscrumbs } from "@/components/application/breadcrumbs/custom-breadcrumbs";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { useAccess } from "@/hooks/use-access";
import { useStoreSnackbar } from "@/store/snackbar";
import { fetchWithToken } from "@/utils/fetchApi";
import { ArrowLeft, Edit01 } from "@untitledui/icons";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";

type AccessAction = "view" | "add" | "edit" | "delete";

const statusToLabel = (status: any) => {
    if (status === true || status === "true" || status === 1 || status === "1") return "Active";
    if (status === false || status === "false" || status === 0 || status === "0") return "Inactive";
    return "—";
};

const actionLabels: Record<AccessAction, string> = {
    view: "View",
    add: "Add",
    edit: "Edit",
    delete: "Delete",
};

const supportedActionsByResource: Partial<Record<string, AccessAction[]>> = {
    dashboard: ["view"],
    itineraryreports: ["view"],
    bookingreports: ["view"],
};

const getAllowedActions = (permissions: any, resource: string): AccessAction[] => {
    const row = permissions?.[resource] || {};
    const supported = supportedActionsByResource[resource] || (Object.keys(actionLabels) as AccessAction[]);
    return supported.filter((a) => Boolean(row?.[a]));
};

export default function SettingsRoleViewPage() {
    const navigate = useNavigate();
    const params = useParams();
    const id = String(params.id || "");
    const showSnackbar = useStoreSnackbar((s) => s.showSnackbar);
    const { can } = useAccess();
    const canEdit = can("role", "edit");

    const [loading, setLoading] = useState(false);
    const [role, setRole] = useState<any>(null);

    const breadcrumbsList = useMemo(
        () => [
            { label: "Settings", link: "/settings/role" },
            { label: "Role", link: "/settings/role" },
            { label: "View" },
        ],
        [],
    );

    useEffect(() => {
        const run = async () => {
            if (!id) return;
            setLoading(true);
            try {
                const response: any = await fetchWithToken(`/api/role/${id}`, undefined, { method: "GET" });
                if (response?.error) throw new Error(response.error);
                setRole(response?.data ?? response);
            } catch (e: any) {
                showSnackbar({ title: "Error", description: e?.message || "Failed to load role", color: "danger" });
            } finally {
                setLoading(false);
            }
        };
        run();
    }, [id, showSnackbar]);

    const permissions = role?.permissions || {};
    const resources = Object.keys(permissions || {}).sort((a, b) => a.localeCompare(b));

    return (
        <DefaultLayout>
            <div className="space-y-4">
                <CustomBreadscrumbs list={breadcrumbsList} />
                <TableCard.Root>
                    <TableCard.Header
                        title="View Role"
                        contentTrailing={
                            <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center md:justify-end">
                                <Button color="secondary" iconLeading={ArrowLeft} onClick={() => navigate("/settings/role")}>
                                    Back
                                </Button>
                                <Button
                                    color="primary"
                                    iconLeading={Edit01}
                                    onClick={() => navigate(`/settings/role/edit/${id}`)}
                                    isDisabled={!id || loading || !canEdit}
                                >
                                    Edit
                                </Button>
                            </div>
                        }
                    />

                    <div className="space-y-4 bg-primary px-4 py-5 md:px-6">
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex flex-col gap-1">
                                <div className="text-lg font-semibold text-primary">{role?.title || "—"}</div>
                                <div className="text-sm text-tertiary">Role permissions</div>
                            </div>
                            <Badge size="sm" color={role?.status ? "success" : "error"}>
                                {statusToLabel(role?.status)}
                            </Badge>
                        </div>

                        <div className="space-y-2">
                            <div className="text-sm font-medium text-primary">Permissions</div>
                            {resources.length === 0 ? (
                                <div className="text-sm text-tertiary">—</div>
                            ) : (
                                <div className="space-y-2">
                                    {resources.map((resource) => {
                                        const allowed = getAllowedActions(permissions, resource);
                                        return (
                                            <div key={resource} className="flex flex-col gap-2 rounded-xl bg-secondary/30 px-4 py-3 ring-1 ring-secondary">
                                                <div className="text-sm font-semibold text-primary">{resource}</div>
                                                <div className="flex flex-wrap gap-2">
                                                    {allowed.length ? (
                                                        allowed.map((a) => (
                                                            <Badge key={a} size="sm" color="gray">
                                                                {actionLabels[a]}
                                                            </Badge>
                                                        ))
                                                    ) : (
                                                        <span className="text-sm text-tertiary">No access</span>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </TableCard.Root>
            </div>
        </DefaultLayout>
    );
}
