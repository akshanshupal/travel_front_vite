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
import { useMemo, useState } from "react";
import { useNavigate } from "react-router";

type AccessAction = "view" | "add" | "edit" | "delete";
type PermissionMap = Record<string, Partial<Record<AccessAction, boolean>>>;

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

export default function SettingsRoleAddPage() {
    const navigate = useNavigate();
    const showSnackbar = useStoreSnackbar((s) => s.showSnackbar);
    const { can } = useAccess();
    const canAdd = can("role", "add");

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
            { label: "Add" },
        ],
        [],
    );

    const validate = () => {
        const next: Record<string, string> = {};
        if (!form.title.trim()) next.title = "Title is required";
        setErrors(next);
        return Object.keys(next).length === 0;
    };

    const canSave = Boolean(form.title.trim() && !saving && canAdd);

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
            const response: any = await fetchWithToken(`/api/role`, payload, { method: "POST" });
            if (response?.error) throw new Error(response.error);
            const created = response?.data ?? response;
            const createdId = String(created?.id || created?._id || "");
            showSnackbar({ title: "Success", description: "Role created successfully", color: "success" });
            if (createdId) navigate(`/settings/role/view/${createdId}`);
            else navigate("/settings/role");
        } catch (e: any) {
            showSnackbar({ title: "Error", description: e?.message || "Failed to create role", color: "danger" });
        } finally {
            setSaving(false);
        }
    };

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
                                isDisabled={!canAdd}
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
                {node.children?.length
                    ? node.children.map((child) => renderNode(child, Math.min(depth + 1, 3)))
                    : null}
            </div>
        );
    };

    return (
        <DefaultLayout>
            <div className="space-y-4">
                <CustomBreadscrumbs list={breadcrumbsList} />
                <TableCard.Root>
                    <TableCard.Header
                        title="Add Role"
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
                                isDisabled={!canAdd}
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
                                isDisabled={!canAdd}
                            >
                                {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                            </Select>
                        </div>

                        <div className="space-y-3">
                            <div className="text-sm font-medium text-primary">Permissions</div>

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
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </TableCard.Root>
            </div>
        </DefaultLayout>
    );
}
