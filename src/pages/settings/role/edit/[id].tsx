import { DefaultLayout } from "@/layouts/DefaultLayout";
import { TableCard } from "@/components/application/table/table";
import { CustomBreadscrumbs } from "@/components/application/breadcrumbs/custom-breadcrumbs";
import { Button } from "@/components/base/buttons/button";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { Input } from "@/components/base/input/input";
import { Select } from "@/components/base/select/select";
import { useAccess } from "@/hooks/use-access";
import { useStoreSnackbar } from "@/store/snackbar";
import { fetchWithToken } from "@/utils/fetchApi";
import { ArrowLeft } from "@untitledui/icons";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";

type AccessAction = "view" | "add" | "edit" | "delete";

type PermissionMap = Record<string, Partial<Record<AccessAction, boolean>>>;

const statusToLabel = (status: any) => {
    if (status === true || status === "true" || status === 1 || status === "1") return "Active";
    if (status === false || status === "false" || status === 0 || status === "0") return "Inactive";
    return "—";
};

const actionOrder: AccessAction[] = ["view", "add", "edit", "delete"];
const actionLabels: Record<AccessAction, string> = { view: "View", add: "Add", edit: "Edit", delete: "Delete" };

const supportedActionsByResource: Partial<Record<string, AccessAction[]>> = {
    dashboard: ["view"],
    itineraryreports: ["view"],
    bookingreports: ["view"],
};

type PermissionNode = {
    label: string;
    resource?: string;
    children?: PermissionNode[];
};

type PermissionSection = {
    label: string;
    nodes: PermissionNode[];
};

const permissionSections: PermissionSection[] = [
    {
        label: "Dashboard",
        nodes: [{ label: "Dashboard", resource: "dashboard" }],
    },
    {
        label: "Itinerary",
        nodes: [
            { label: "Itineraries", resource: "itinerary" },
            { label: "Areas", resource: "area" },
            { label: "Sites", resource: "site" },
            {
                label: "Hotel",
                children: [
                    { label: "Hotel List", resource: "hotel" },
                    { label: "Hotel Category", resource: "hotelcategory" },
                ],
            },
            { label: "Client Itinerary", resource: "clientitinerary" },
            { label: "Quotation", resource: "saveditinerary" },
            {
                label: "Reports",
                resource: "itineraryreports",
                children: [{ label: "Mails" }, { label: "Quotations" }],
            },
        ],
    },
    {
        label: "Bookings",
        nodes: [
            { label: "Assignments", resource: "assignment" },
            { label: "Booking", resource: "booking" },
            { label: "Payment", resource: "payments" },
            { label: "Booking Type", resource: "bookingstype" },
            { label: "Vendors", resource: "vendor" },
            { label: "Payment Store", resource: "paymentstore" },
            {
                label: "Reports",
                resource: "bookingreports",
                children: [{ label: "Payment" }, { label: "Mails" }, { label: "Profit" }],
            },
        ],
    },
    {
        label: "Packages",
        nodes: [
            { label: "Package", resource: "package" },
            { label: "Location", resource: "location" },
            { label: "Tags", resource: "packagetag" },
            { label: "Type", resource: "packagetype" },
        ],
    },
    {
        label: "Lead Management",
        nodes: [
            { label: "Leads", resource: "leads" },
            { label: "Pipeline", resource: "pipeline" },
            { label: "Campaign", resource: "campaign" },
            { label: "Settings", resource: "leadsettings" },
            { label: "Custom Contact Properties", resource: "leadcontactproperties" },
        ],
    },
    {
        label: "Settings",
        nodes: [
            { label: "User", resource: "user" },
            { label: "Mailer", resource: "mailer" },
            { label: "Role", resource: "role" },
            { label: "Template", resource: "template" },
            { label: "Package Inclusions", resource: "packageinclusion" },
            { label: "Package Exclusions", resource: "packageexclusion" },
        ],
    },
    {
        label: "Other",
        nodes: [
            { label: "Package Detail", resource: "packagedetails" },
            { label: "Hotel Images", resource: "hotelimage" },
            { label: "Package Voucher", resource: "packagevoucher" },
        ],
    },
];

const normalizePermissions = (raw: any): PermissionMap => {
    if (!raw || typeof raw !== "object") return {};
    const out: PermissionMap = {};
    Object.keys(raw).forEach((resource) => {
        const v = raw[resource];
        if (!v || typeof v !== "object") return;
        out[resource] = {};
        actionOrder.forEach((a) => {
            out[resource][a] = Boolean(v[a]);
        });
    });
    return out;
};

export default function SettingsRoleEditPage() {
    const navigate = useNavigate();
    const params = useParams();
    const id = String(params.id || "");
    const showSnackbar = useStoreSnackbar((s) => s.showSnackbar);
    const { can } = useAccess();
    const canEdit = can("role", "edit");

    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const [form, setForm] = useState({
        title: "",
        status: "true",
    });
    const [permissions, setPermissions] = useState<PermissionMap>({});

    const breadcrumbsList = useMemo(
        () => [
            { label: "Settings", link: "/settings/role" },
            { label: "Role", link: "/settings/role" },
            { label: "Edit" },
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
                const data = response?.data ?? response;
                setForm({
                    title: String(data?.title || ""),
                    status: String(Boolean(data?.status)),
                });
                setPermissions(normalizePermissions(data?.permissions));
            } catch (e: any) {
                showSnackbar({ title: "Error", description: e?.message || "Failed to load role", color: "danger" });
            } finally {
                setLoading(false);
            }
        };
        run();
    }, [id, showSnackbar]);

    const validate = () => {
        const next: Record<string, string> = {};
        if (!form.title.trim()) next.title = "Title is required";
        setErrors(next);
        return Object.keys(next).length === 0;
    };

    const canSave = Boolean(form.title.trim() && !loading && !saving && canEdit);

    const togglePermission = (resource: string, action: AccessAction, selected: boolean) => {
        setPermissions((prev) => ({
            ...prev,
            [resource]: {
                ...(prev[resource] || {}),
                [action]: selected,
            },
        }));
    };

    const handleSave = async () => {
        if (!validate()) return;
        if (saving) return;
        setSaving(true);
        try {
            const normalizedPermissions: PermissionMap = { ...(permissions || {}) };
            if (normalizedPermissions.saveditinerary && !normalizedPermissions["saved-itinerary"]) {
                normalizedPermissions["saved-itinerary"] = { ...normalizedPermissions.saveditinerary };
            }
            if (normalizedPermissions["saved-itinerary"] && !normalizedPermissions.saveditinerary) {
                normalizedPermissions.saveditinerary = { ...normalizedPermissions["saved-itinerary"] };
            }

            const payload: any = {
                title: form.title.trim(),
                status: form.status === "true",
                permissions: normalizedPermissions,
            };
            const response: any = await fetchWithToken(`/api/role/${id}`, payload, { method: "PUT" });
            if (response?.error) throw new Error(response.error);
            showSnackbar({ title: "Success", description: "Role updated successfully", color: "success" });
            navigate(`/settings/role/view/${id}`);
        } catch (e: any) {
            showSnackbar({ title: "Error", description: e?.message || "Failed to update role", color: "danger" });
        } finally {
            setSaving(false);
        }
    };

    const knownResources = useMemo(() => {
        const acc = new Set<string>();
        const walk = (node: PermissionNode) => {
            if (node.resource) acc.add(node.resource);
            node.children?.forEach(walk);
        };
        permissionSections.forEach((s) => s.nodes.forEach(walk));
        return acc;
    }, []);

    const unknownResources = Object.keys(permissions || {})
        .filter((r) => r && !knownResources.has(r))
        .sort((a, b) => a.localeCompare(b));

    const renderPermissionRow = (node: PermissionNode, depth: number) => {
        const row = node.resource ? permissions?.[node.resource] || {} : {};
        const supportedActions = node.resource ? supportedActionsByResource[node.resource] || actionOrder : [];
        const indentClass = depth === 0 ? "" : depth === 1 ? "pl-6" : depth === 2 ? "pl-10" : "pl-14";

        return (
            <div key={`${node.label}-${node.resource || "group"}`} className="grid grid-cols-[minmax(220px,1fr)_repeat(4,110px)] gap-2 px-4 py-3">
                <div className={`flex flex-col ${indentClass}`}>
                    <div className={`text-sm ${node.resource ? "font-semibold text-primary" : "font-semibold text-tertiary"}`}>{node.label}</div>
                    {node.resource ? <div className="text-xs text-tertiary">{node.resource}</div> : null}
                </div>

                {actionOrder.map((a) => (
                    <div key={a} className="flex items-center">
                        {node.resource && supportedActions.includes(a) ? (
                            <Checkbox
                                aria-label={`${node.resource}-${a}`}
                                isSelected={Boolean(row?.[a])}
                                onChange={(selected) => togglePermission(node.resource as string, a, selected)}
                                isDisabled={loading || !canEdit}
                            />
                        ) : null}
                    </div>
                ))}
            </div>
        );
    };

    const renderNode = (node: PermissionNode, depth: number) => {
        return (
            <div key={`${node.label}-${node.resource || "group"}-${depth}`}>
                {renderPermissionRow(node, depth)}
                {node.children?.length ? node.children.map((child) => renderNode(child, Math.min(depth + 1, 3))) : null}
            </div>
        );
    };

    return (
        <DefaultLayout>
            <div className="space-y-4">
                <CustomBreadscrumbs list={breadcrumbsList} />
                <TableCard.Root>
                    <TableCard.Header
                        title="Edit Role"
                        contentTrailing={
                            <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center md:justify-end">
                                <Button color="secondary" iconLeading={ArrowLeft} onClick={() => navigate("/settings/role")}>
                                    Back
                                </Button>
                                <Button color="primary" isDisabled={!canSave} isLoading={saving} onClick={handleSave}>
                                    Save
                                </Button>
                            </div>
                        }
                    />

                    <div className="space-y-6 bg-primary px-4 py-5 md:px-6">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <Input
                                label="Title *"
                                placeholder="Enter role title"
                                value={form.title}
                                onChange={(v) => setForm((p) => ({ ...p, title: v }))}
                                isInvalid={Boolean(errors.title)}
                                hint={errors.title || undefined}
                                isDisabled={loading || !canEdit}
                            />

                            <Select
                                aria-label="Status *"
                                label="Status *"
                                selectedKey={form.status}
                                onSelectionChange={(key) => setForm((p) => ({ ...p, status: String(key) }))}
                                items={[
                                    { id: "true", label: "Active" },
                                    { id: "false", label: "Inactive" },
                                ]}
                                isDisabled={loading || !canEdit}
                            >
                                {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                            </Select>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between gap-2">
                                <div className="text-sm font-medium text-primary">Permissions</div>
                                <div className="text-sm text-tertiary">{loading ? "Loading..." : ""}</div>
                            </div>

                            <div className="overflow-x-auto rounded-xl ring-1 ring-secondary">
                                <div className="min-w-[760px] bg-primary">
                                    <div className="grid grid-cols-[minmax(220px,1fr)_repeat(4,110px)] gap-2 border-b border-secondary px-4 py-3">
                                        <div className="text-xs font-semibold uppercase tracking-wide text-tertiary">Page</div>
                                        {actionOrder.map((a) => (
                                            <div key={a} className="text-xs font-semibold uppercase tracking-wide text-tertiary">
                                                {actionLabels[a]}
                                            </div>
                                        ))}
                                    </div>

                                    <div className="divide-y divide-secondary">
                                        {permissionSections.map((section) => (
                                            <div key={section.label}>
                                                <div className="grid grid-cols-[minmax(220px,1fr)_repeat(4,110px)] gap-2 bg-secondary/20 px-4 py-2 ring-1 ring-secondary">
                                                    <div className="text-xs font-semibold uppercase tracking-wide text-tertiary">{section.label}</div>
                                                    {actionOrder.map((a) => (
                                                        <div key={a} />
                                                    ))}
                                                </div>
                                                {section.nodes.map((node) => renderNode(node, 0))}
                                            </div>
                                        ))}

                                        {unknownResources.length ? (
                                            <div>
                                                <div className="grid grid-cols-[minmax(220px,1fr)_repeat(4,110px)] gap-2 bg-secondary/20 px-4 py-2 ring-1 ring-secondary">
                                                    <div className="text-xs font-semibold uppercase tracking-wide text-tertiary">Other Resources</div>
                                                    {actionOrder.map((a) => (
                                                        <div key={a} />
                                                    ))}
                                                </div>
                                                {unknownResources.map((resource) => renderNode({ label: resource, resource }, 0))}
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                            </div>

                            <div className="text-xs text-tertiary">
                                Status shown as: {statusToLabel(form.status)}
                            </div>
                        </div>
                    </div>
                </TableCard.Root>
            </div>
        </DefaultLayout>
    );
}
