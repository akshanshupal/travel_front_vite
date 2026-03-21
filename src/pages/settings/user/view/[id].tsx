import { DefaultLayout } from "@/layouts/DefaultLayout";
import { TableCard } from "@/components/application/table/table";
import { CustomBreadscrumbs } from "@/components/application/breadcrumbs/custom-breadcrumbs";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Select } from "@/components/base/select/select";
import { useAccess } from "@/hooks/use-access";
import { useStoreSnackbar } from "@/store/snackbar";
import { getUserById } from "@/utils/services/userService";
import { ArrowLeft, Edit01 } from "@untitledui/icons";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";

const typeOptions = [
    { id: "ADMIN", label: "ADMIN" },
    { id: "MANAGER", label: "MANAGER" },
    { id: "AGENT", label: "AGENT" },
];

export default function SettingsUserViewPage() {
    const navigate = useNavigate();
    const params = useParams();
    const id = String(params.id || "");
    const { showSnackbar } = useStoreSnackbar();
    const { can } = useAccess();
    const canEdit = can("user", "edit");

    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<any>(null);

    const breadcrumbsList = useMemo(
        () => [
            { label: "Settings", link: "/settings/user" },
            { label: "User", link: "/settings/user" },
            { label: "View" },
        ],
        [],
    );

    useEffect(() => {
        const run = async () => {
            if (!id) return;
            setLoading(true);
            try {
                const response: any = await getUserById(id, { populate: "role" });
                if (response?.error) throw new Error(response.error);
                const data = response?.data ?? response;
                setUser(data || null);
            } catch (e: any) {
                showSnackbar({ title: "Error", description: e?.message || "Failed to load user", color: "danger" });
            } finally {
                setLoading(false);
            }
        };
        run();
    }, [id, showSnackbar]);

    const typeValue = String(user?.type || "ADMIN");
    const statusValue = String(Boolean(user?.status));
    const roleTitle = typeof user?.role === "string" ? user.role : String(user?.role?.title || "");

    return (
        <DefaultLayout>
            <div className="space-y-4">
                <CustomBreadscrumbs list={breadcrumbsList} />
                <TableCard.Root>
                    <TableCard.Header
                        title="View User"
                        contentTrailing={
                            <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center md:justify-end">
                                <Button color="secondary" iconLeading={ArrowLeft} onClick={() => navigate("/settings/user")}>
                                    Back
                                </Button>
                                <Button
                                    color="primary"
                                    iconLeading={Edit01}
                                    onClick={() => navigate(`/settings/user/edit/${id}`)}
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
                                <div className="text-lg font-semibold text-primary">{user?.name || "—"}</div>
                                <div className="text-sm text-tertiary">{user?.email || "—"}</div>
                                <div className="text-sm text-tertiary">{user?.mobile || "—"}</div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Badge size="sm" color={user?.status ? "success" : "error"}>
                                    {user?.status ? "Active" : "Inactive"}
                                </Badge>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <Input label="Name" value={String(user?.name || "")} onChange={(_: string) => {}} isDisabled />
                            <Input label="Username" value={String(user?.username || "")} onChange={(_: string) => {}} isDisabled />
                            <Input label="Email" value={String(user?.email || "")} onChange={(_: string) => {}} isDisabled />
                            <Input label="Mobile" value={String(user?.mobile || "")} onChange={(_: string) => {}} isDisabled />

                            <Select
                                aria-label="Type"
                                label="Type"
                                selectedKey={typeValue}
                                onSelectionChange={(_: unknown) => {}}
                                items={typeOptions}
                                isDisabled
                            >
                                {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                            </Select>

                            {typeValue !== "ADMIN" ? (
                                <Input label="Role" value={roleTitle} onChange={(_: string) => {}} isDisabled />
                            ) : null}

                            <Select
                                aria-label="Status"
                                label="Status"
                                selectedKey={statusValue}
                                onSelectionChange={(_: unknown) => {}}
                                items={[
                                    { id: "true", label: "Active" },
                                    { id: "false", label: "Inactive" },
                                ]}
                                isDisabled
                            >
                                {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <div className="text-sm font-medium text-primary">Profile Image</div>
                            {user?.profileImg ? (
                                <div className="overflow-hidden rounded-xl ring-1 ring-secondary">
                                    <img src={String(user.profileImg)} alt="Profile" className="max-h-80 max-w-100 object-cover" />
                                </div>
                            ) : (
                                <div className="text-sm text-tertiary">—</div>
                            )}
                        </div>

                        <div className="flex flex-col gap-2 border-t border-secondary pt-4 md:flex-row md:items-center md:justify-end">
                            <Button color="secondary" iconLeading={ArrowLeft} onClick={() => navigate("/settings/user")}>
                                Back
                            </Button>
                            <Button
                                color="primary"
                                iconLeading={Edit01}
                                onClick={() => navigate(`/settings/user/edit/${id}`)}
                                isDisabled={!id || loading || !canEdit}
                            >
                                Edit
                            </Button>
                        </div>
                    </div>
                </TableCard.Root>
            </div>
        </DefaultLayout>
    );
}
