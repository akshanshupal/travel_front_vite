import { DefaultLayout } from "@/layouts/DefaultLayout";
import { TableCard } from "@/components/application/table/table";
import { FileUploadDropZone } from "@/components/application/file-upload/file-upload-base";
import { CustomBreadscrumbs } from "@/components/application/breadcrumbs/custom-breadcrumbs";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Select } from "@/components/base/select/select";
import { useAccess } from "@/hooks/use-access";
import { useStoreSnackbar } from "@/store/snackbar";
import { fetchWithToken } from "@/utils/fetchApi";
import { getUserById, updateUserById } from "@/utils/services/userService";
import { ArrowLeft, Trash01 } from "@untitledui/icons";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";

const getUploadUrl = (response: any) => {
    const resolved = response?.data ?? response;
    if (typeof resolved === "string") return resolved;
    if (typeof resolved?.url === "string") return resolved.url;
    if (typeof resolved?.data === "string") return resolved.data;
    if (typeof resolved?.location === "string") return resolved.location;
    return "";
};

const typeOptions = [
    { id: "ADMIN", label: "ADMIN" },
    { id: "MANAGER", label: "MANAGER" },
    { id: "AGENT", label: "AGENT" },
];

export default function SettingsUserEditPage() {
    const navigate = useNavigate();
    const params = useParams();
    const id = String(params.id || "");
    const { showSnackbar } = useStoreSnackbar();
    const { can } = useAccess();
    const canEdit = can("user", "edit");

    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [roles, setRoles] = useState<Array<{ id: string; title: string }>>([]);

    const [form, setForm] = useState({
        name: "",
        username: "",
        email: "",
        mobile: "",
        type: "ADMIN",
        roleId: "",
        status: "true",
        profileImg: "",
    });

    const [profileImgFile, setProfileImgFile] = useState<File | null>(null);
    const [profileImgPreview, setProfileImgPreview] = useState<string>("");

    const [dirty, setDirty] = useState<Record<string, boolean>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});

    const breadcrumbsList = useMemo(
        () => [
            { label: "Settings", link: "/settings/user" },
            { label: "User", link: "/settings/user" },
            { label: "Edit" },
        ],
        [],
    );

    useEffect(() => {
        if (!profileImgFile) {
            setProfileImgPreview("");
            return;
        }
        const url = URL.createObjectURL(profileImgFile);
        setProfileImgPreview(url);
        return () => URL.revokeObjectURL(url);
    }, [profileImgFile]);

    useEffect(() => {
        const run = async () => {
            try {
                const response: any = await fetchWithToken("/api/role", undefined, { method: "GET" });
                if (response?.error) throw new Error(response.error);
                const rows = Array.isArray(response?.data) ? response.data : Array.isArray(response) ? response : [];
                setRoles(
                    rows
                        .map((r: any) => ({ id: String(r?.id || r?._id || ""), title: String(r?.title || "") }))
                        .filter((r: any) => r.id && r.title),
                );
            } catch (e: any) {
                setRoles([]);
            }
        };
        run();
    }, []);

    useEffect(() => {
        const run = async () => {
            if (!id) return;
            setLoading(true);
            try {
                const response: any = await getUserById(id, { populate: "role" });
                if (response?.error) throw new Error(response.error);
                const data = response?.data ?? response;
                const resolvedRoleId = typeof data?.role === "string" ? data.role : String(data?.role?.id || data?.role?._id || "");
                const resolvedType = String(data?.type || "ADMIN");
                setForm({
                    name: String(data?.name || ""),
                    username: String(data?.username || ""),
                    email: String(data?.email || ""),
                    mobile: String(data?.mobile || ""),
                    type: resolvedType,
                    roleId: resolvedType.toUpperCase() === "ADMIN" ? "" : resolvedRoleId,
                    status: String(Boolean(data?.status)),
                    profileImg: String(data?.profileImg || ""),
                });
            } catch (e: any) {
                showSnackbar({ title: "Error", description: e?.message || "Failed to load user", color: "danger" });
            } finally {
                setLoading(false);
            }
        };
        run();
    }, [id, showSnackbar]);

    const validate = () => {
        const next: Record<string, string> = {};
        if (!form.name.trim()) next.name = "Name is required";
        if (!form.username.trim()) next.username = "Username is required";
        if (!form.email.trim()) next.email = "Email is required";
        if (!form.mobile.trim()) next.mobile = "Mobile is required";
        if (!form.type) next.type = "Type is required";
        if (form.type !== "ADMIN" && !form.roleId) next.roleId = "Role is required";
        setErrors(next);
        return Object.keys(next).length === 0;
    };

    const canSave = Boolean(
        form.name.trim() &&
            form.username.trim() &&
            form.email.trim() &&
            form.mobile.trim() &&
            form.type &&
            (form.type === "ADMIN" || form.roleId) &&
            canEdit &&
            !saving &&
            !loading,
    );

    const handleSave = async () => {
        setDirty({
            name: true,
            username: true,
            email: true,
            mobile: true,
            type: true,
            roleId: true,
            status: true,
        });
        if (!validate()) return;
        if (saving) return;
        setSaving(true);
        try {
            let profileImgUrl = form.profileImg;
            if (profileImgFile) {
                const fd = new FormData();
                fd.append("fmFile", profileImgFile, profileImgFile.name);
                showSnackbar({ title: "Uploading", description: "Uploading profile image", color: "warning" });
                const uploaded = await fetchWithToken("/api/file/upload", fd as any, { method: "POST" });
                profileImgUrl = getUploadUrl(uploaded);
                if (!profileImgUrl) throw new Error("Failed to upload profile image");
            }

            const payload: any = {
                name: form.name.trim(),
                username: form.username.trim(),
                email: form.email.trim(),
                mobile: form.mobile.trim(),
                type: form.type,
                role: form.type === "ADMIN" ? null : form.roleId,
                status: form.status === "true",
            };
            if (profileImgUrl) payload.profileImg = profileImgUrl;
            else payload.profileImg = "";

            const response: any = await updateUserById(id, payload);
            if (response?.error) throw new Error(response.error);
            showSnackbar({ title: "Success", description: "User updated successfully", color: "success" });
            navigate("/settings/user");
        } catch (e: any) {
            showSnackbar({ title: "Error", description: e?.message || "Failed to update user", color: "danger" });
        } finally {
            setSaving(false);
        }
    };

    const displayedPreview = profileImgPreview || form.profileImg;

    return (
        <DefaultLayout>
            <div className="space-y-4">
                <CustomBreadscrumbs list={breadcrumbsList} />
                <TableCard.Root>
                    <TableCard.Header
                        title="Edit User"
                        contentTrailing={
                            <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center md:justify-end">
                                <Button color="secondary" iconLeading={ArrowLeft} onClick={() => navigate("/settings/user")}>
                                    Back
                                </Button>
                                <Button color="primary" isDisabled={!canSave} isLoading={saving} onClick={handleSave}>
                                    Save
                                </Button>
                            </div>
                        }
                    />

                    <div className="space-y-4 bg-primary px-4 py-5 md:px-6">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <Input
                                label="Name *"
                                placeholder="Enter name"
                                value={form.name}
                                onChange={(v) => setForm((p) => ({ ...p, name: v }))}
                                isInvalid={Boolean(dirty.name && errors.name)}
                                hint={dirty.name && errors.name ? errors.name : undefined}
                                isDisabled={loading}
                            />
                            <Input
                                label="Username *"
                                placeholder="Enter username"
                                value={form.username}
                                onChange={(v) => setForm((p) => ({ ...p, username: v }))}
                                isInvalid={Boolean(dirty.username && errors.username)}
                                hint={dirty.username && errors.username ? errors.username : undefined}
                                isDisabled={loading}
                            />
                            <Input
                                label="Email *"
                                placeholder="Enter email"
                                value={form.email}
                                onChange={(v) => setForm((p) => ({ ...p, email: v }))}
                                isInvalid={Boolean(dirty.email && errors.email)}
                                hint={dirty.email && errors.email ? errors.email : undefined}
                                isDisabled={loading}
                            />
                            <Input
                                label="Mobile *"
                                placeholder="Enter mobile"
                                value={form.mobile}
                                onChange={(v) => setForm((p) => ({ ...p, mobile: v }))}
                                isInvalid={Boolean(dirty.mobile && errors.mobile)}
                                hint={dirty.mobile && errors.mobile ? errors.mobile : undefined}
                                isDisabled={loading}
                            />

                            <Select
                                aria-label="Type *"
                                label="Type *"
                                selectedKey={form.type}
                                onSelectionChange={(key) => {
                                    const nextType = String(key);
                                    setForm((p) => ({ ...p, type: nextType, roleId: nextType === "ADMIN" ? "" : p.roleId }));
                                }}
                                items={typeOptions}
                                isDisabled={loading}
                            >
                                {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                            </Select>

                            {form.type !== "ADMIN" ? (
                                <Select
                                    aria-label="Role *"
                                    label="Role *"
                                    selectedKey={form.roleId || "__none__"}
                                    onSelectionChange={(key) => setForm((p) => ({ ...p, roleId: key === "__none__" ? "" : String(key) }))}
                                    items={[{ id: "__none__", label: "Select role" }, ...roles.map((r) => ({ id: r.id, label: r.title }))]}
                                    isDisabled={loading}
                                    isInvalid={Boolean(dirty.roleId && errors.roleId)}
                                    hint={dirty.roleId && errors.roleId ? errors.roleId : undefined}
                                >
                                    {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                </Select>
                            ) : null}

                            <Select
                                aria-label="Status *"
                                label="Status *"
                                selectedKey={form.status}
                                onSelectionChange={(key) => setForm((p) => ({ ...p, status: String(key) }))}
                                items={[
                                    { id: "true", label: "Active" },
                                    { id: "false", label: "Inactive" },
                                ]}
                                isDisabled={loading}
                            >
                                {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <div className="text-sm font-medium text-primary">Profile Image</div>
                            {displayedPreview ? (
                                <div className="relative overflow-hidden rounded-xl ring-1 ring-secondary">
                                    <img src={displayedPreview} alt="Profile preview" className="max-h-80 max-w-100 object-cover" />
                                    <div className="absolute right-2 top-2 flex gap-2">
                                        <Button
                                            color="secondary-destructive"
                                            size="sm"
                                            iconLeading={Trash01}
                                            onClick={() => {
                                                setProfileImgFile(null);
                                                setForm((p) => ({ ...p, profileImg: "" }));
                                            }}
                                            isDisabled={loading}
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <FileUploadDropZone
                                    accept="image/*"
                                    allowsMultiple={false}
                                    onDropFiles={(files) => {
                                        const f = files.item(0);
                                        if (!f) return;
                                        setProfileImgFile(f);
                                    }}
                                />
                            )}
                        </div>

                        <div className="flex flex-col gap-2 border-t border-secondary pt-4 md:flex-row md:items-center md:justify-end">
                            <Button color="secondary" iconLeading={ArrowLeft} onClick={() => navigate("/settings/user")}>
                                Back
                            </Button>
                            <Button color="primary" isDisabled={!canSave} isLoading={saving} onClick={handleSave}>
                                Save
                            </Button>
                        </div>
                    </div>
                </TableCard.Root>
            </div>
        </DefaultLayout>
    );
}
