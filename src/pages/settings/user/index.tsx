import { DefaultLayout } from "@/layouts/DefaultLayout";
import { PaginationButtonGroup } from "@/components/application/pagination/pagination";
import { StickyTable, Table, TableCard } from "@/components/application/table/table";
import { Badge, BadgeWithButton } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { CloseButton } from "@/components/base/buttons/close-button";
import { Input } from "@/components/base/input/input";
import { Label } from "@/components/base/input/label";
import { Select } from "@/components/base/select/select";
import { SlideoutMenu } from "@/components/application/slideout-menus/slideout-menu";
import { Dialog, Modal, ModalOverlay } from "@/components/application/modals/modal";
import { CustomBreadscrumbs } from "@/components/application/breadcrumbs/custom-breadcrumbs";
import { useAvailableTableWidth } from "@/hooks/use-available-table-width";
import { useAccess } from "@/hooks/use-access";
import Tmodal from "@/components/utils/Tmodal";
import { useStoreSnackbar } from "@/store/snackbar";
import { getUser, getUserDelete, updateUserById } from "@/utils/services/userService";
import { Edit01, Eye, FilterLines, Lock01, Plus, RefreshCw01, SearchLg, Trash01 } from "@untitledui/icons";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

const columns = [
    { id: "index", name: "S. No.", isRowHeader: true, widthRatio: 6, minWidth: 64 },
    { id: "userDetails", name: "Title/Email/Mobile", widthRatio: 30, minWidth: 260 },
    { id: "username", name: "Username", widthRatio: 16, minWidth: 180 },
    { id: "type", name: "Type", widthRatio: 12, minWidth: 140 },
    { id: "status", name: "Status", widthRatio: 10, minWidth: 120 },
    { id: "actions", name: "Actions", widthRatio: 12, minWidth: 170 },
];

const typeOptions = [
    { id: "__all__", label: "All" },
    { id: "ADMIN", label: "ADMIN" },
    { id: "MANAGER", label: "MANAGER" },
    { id: "AGENT", label: "AGENT" },
];

type PasswordModalState = {
    open: boolean;
    userId: string;
    username: string;
    password: string;
    error: string;
    saving: boolean;
};

const createPasswordModalState = (): PasswordModalState => ({
    open: false,
    userId: "",
    username: "",
    password: "",
    error: "",
    saving: false,
});

export default function SettingsUserListPage() {
    const availableWidth = useAvailableTableWidth();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const { showSnackbar } = useStoreSnackbar();
    const { can } = useAccess();
    const canView = can("user", "view");
    const canAdd = can("user", "add");
    const canEdit = can("user", "edit");
    const canDelete = can("user", "delete");

    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState<any[]>([]);
    const [totalRecords, setTotalRecords] = useState(0);

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState<any>(null);

    const [passwordModal, setPasswordModal] = useState<PasswordModalState>(createPasswordModalState);

    const page = Number(searchParams.get("page") || "1");
    const limit = Number(searchParams.get("limit") || "10");
    const [filters, setFilters] = useState({
        userDetails: searchParams.get("userDetails") || "",
        username: searchParams.get("username") || "",
        type: searchParams.get("type") || "",
        status: searchParams.get("status") || "",
    });

    const [debouncedFilters, setDebouncedFilters] = useState(filters);
    const [tempFilters, setTempFilters] = useState(filters);

    const isFilterActive = Boolean(filters.userDetails || filters.username || filters.type || filters.status);
    const totalPages = Math.max(1, Math.ceil((totalRecords || 0) / limit));

    const getItemId = (item: any) => String(item?.id || item?._id || "");

    const indexById = useMemo(
        () => new Map(items.map((item, index) => [getItemId(item), (page - 1) * limit + index + 1])),
        [items, limit, page],
    );

    const breadcrumbsList = useMemo(
        () => [
            { label: "Settings", link: "/settings/user" },
            { label: "User", link: "/settings/user" },
            { label: "List" },
        ],
        [],
    );

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedFilters(filters);
        }, 500);
        return () => clearTimeout(handler);
    }, [filters]);

    useEffect(() => {
        const nextParams = new URLSearchParams();
        nextParams.set("page", String(page));
        nextParams.set("limit", String(limit));
        if (debouncedFilters.userDetails) nextParams.set("userDetails", debouncedFilters.userDetails);
        if (debouncedFilters.username) nextParams.set("username", debouncedFilters.username);
        if (debouncedFilters.type) nextParams.set("type", debouncedFilters.type);
        if (debouncedFilters.status) nextParams.set("status", debouncedFilters.status);
        setSearchParams(nextParams, { replace: true });
    }, [debouncedFilters, page, limit, setSearchParams]);

    useEffect(() => {
        const run = async () => {
            setLoading(true);
            try {
                const params: any = {
                    totalCount: true,
                    page,
                    limit,
                    select: "name,email,mobile,username,type,status,profileImg",
                };
                if (debouncedFilters.status) params.status = debouncedFilters.status;
                if (debouncedFilters.type) params.type = debouncedFilters.type;
                if (debouncedFilters.userDetails) params.userDetails = debouncedFilters.userDetails;
                if (debouncedFilters.username) params.username = debouncedFilters.username;

                const response: any = await getUser(params);
                if (response?.error) throw new Error(response.error);
                const data = response?.data ?? response;
                setItems(Array.isArray(data) ? data : []);
                setTotalRecords(Number(response?.totalCount || 0));
            } catch (e: any) {
                showSnackbar({ title: "Error", description: e?.message || "Failed to load users", color: "danger" });
            } finally {
                setLoading(false);
            }
        };
        run();
    }, [debouncedFilters, limit, page, showSnackbar]);

    const handleOpenFilters = () => {
        setTempFilters(filters);
    };

    const handleApplyFilters = (close: () => void) => {
        setFilters(tempFilters);
        setSearchParams((prev) => {
            const next = new URLSearchParams(prev);
            next.set("page", "1");
            return next;
        });
        close();
    };

    const handleResetTempFilters = (close?: () => void) => {
        const resetState = {
            userDetails: "",
            username: "",
            type: "",
            status: "",
        };
        setTempFilters(resetState);
        setFilters(resetState);
        setDebouncedFilters(resetState);
        setSearchParams((prev) => {
            const next = new URLSearchParams(prev);
            next.set("page", "1");
            next.delete("userDetails");
            next.delete("username");
            next.delete("type");
            next.delete("status");
            return next;
        });
        if (close) close();
    };

    const handleRemoveFilter = (key: keyof typeof filters) => {
        const resetState = { ...filters, [key]: "" } as typeof filters;
        setFilters(resetState);
        setTempFilters(resetState);
        setDebouncedFilters(resetState);
    };

    const openPasswordModal = (item: any) => {
        setPasswordModal({
            open: true,
            userId: getItemId(item),
            username: String(item?.username || ""),
            password: "",
            error: "",
            saving: false,
        });
    };

    const closePasswordModal = () => setPasswordModal(createPasswordModalState());

    const validatePassword = (value: string) => {
        if (!value) return "Password is required";
        if (value.length < 6) return "Password must be at least 6 characters long";
        return "";
    };

    const submitPasswordUpdate = async () => {
        const error = validatePassword(passwordModal.password);
        if (error) {
            setPasswordModal((prev) => ({ ...prev, error }));
            return;
        }
        if (passwordModal.saving) return;
        setPasswordModal((prev) => ({ ...prev, saving: true }));
        try {
            const response: any = await updateUserById(passwordModal.userId, { password: passwordModal.password });
            if (response?.error) throw new Error(response.error);
            showSnackbar({ title: "Success", description: "Password updated successfully", color: "success" });
            closePasswordModal();
        } catch (e: any) {
            showSnackbar({ title: "Error", description: e?.message || "Failed to update password", color: "danger" });
            setPasswordModal((prev) => ({ ...prev, saving: false }));
        }
    };

    const handleDelete = async () => {
        const id = deleteTarget ? getItemId(deleteTarget) : "";
        if (!id) return;
        try {
            const response: any = await getUserDelete(id, {});
            if (response?.error) throw new Error(response.error);
            showSnackbar({ title: "Success", description: "User deleted successfully", color: "success" });
            setItems((prev) => prev.filter((item) => getItemId(item) !== id));
            setTotalRecords((prev) => Math.max(0, prev - 1));
        } catch (e: any) {
            showSnackbar({ title: "Error", description: e?.message || "Failed to delete user", color: "danger" });
        } finally {
            setDeleteModalOpen(false);
            setDeleteTarget(null);
        }
    };

    return (
        <DefaultLayout>
            <div className="space-y-4" style={{ width: availableWidth }}>
                <CustomBreadscrumbs list={breadcrumbsList} />

                <TableCard.Root className="w-full">
                    <TableCard.Header
                        title="User"
                        badge={loading ? "…" : totalRecords}
                        contentTrailing={
                            <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center md:justify-end">
                                <Select
                                    aria-label="Rows per page"
                                    selectedKey={String(limit)}
                                    onSelectionChange={(key) => {
                                        const value = Number(key);
                                        setSearchParams((prev) => {
                                            const next = new URLSearchParams(prev);
                                            next.set("limit", String(value));
                                            next.set("page", "1");
                                            return next;
                                        });
                                    }}
                                    items={[
                                        { id: "10", label: "10 / page" },
                                        { id: "25", label: "25 / page" },
                                        { id: "50", label: "50 / page" },
                                    ]}
                                >
                                    {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                </Select>
                                <Button size="sm" color="primary" iconLeading={Plus} isDisabled={!canAdd} onClick={() => navigate("/settings/user/add")}>
                                    Add User
                                </Button>
                            </div>
                        }
                    />

                    <div className="flex flex-col gap-4 border-b border-secondary bg-primary px-4 py-4 md:px-6">
                        <div className="flex flex-col gap-3 justify-between md:flex-row md:items-center">
                            <Input
                                placeholder="Search name, email, mobile"
                                value={tempFilters.userDetails}
                                onChange={(value) => {
                                    setFilters((prev) => ({ ...prev, userDetails: value }));
                                    setTempFilters((prev) => ({ ...prev, userDetails: value }));
                                }}
                                icon={SearchLg}
                                className="w-full md:w-96"
                            />

                            <div className="flex items-center justify-end gap-2">
                                <SlideoutMenu.Trigger>
                                    <Button color="primary" iconLeading={FilterLines} onClick={handleOpenFilters}>
                                        More filters
                                    </Button>
                                    <SlideoutMenu isDismissable>
                                        {({ close }) => (
                                            <SlideoutMenu.Content>
                                                <SlideoutMenu.Header onClose={close}>
                                                    <div className="flex items-center gap-1">
                                                        <span className="text-lg font-bold text-primary">More Filters</span>
                                                    </div>
                                                </SlideoutMenu.Header>
                                                <div className="flex-1 overflow-y-auto p-6">
                                                    <div className="flex flex-col gap-4">
                                                        <Input
                                                            label="Username"
                                                            placeholder="Search by Username"
                                                            value={tempFilters.username}
                                                            onChange={(value) => setTempFilters((prev) => ({ ...prev, username: value }))}
                                                        />
                                                        <div className="flex flex-col gap-1.5">
                                                            <Label>Type</Label>
                                                            <Select
                                                                aria-label="Type"
                                                                selectedKey={tempFilters.type || "__all__"}
                                                                onSelectionChange={(key) =>
                                                                    setTempFilters((prev) => ({ ...prev, type: key === "__all__" ? "" : String(key) }))
                                                                }
                                                                items={typeOptions}
                                                            >
                                                                {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                                            </Select>
                                                        </div>
                                                        <div className="flex flex-col gap-1.5">
                                                            <Label>Status</Label>
                                                            <Select
                                                                aria-label="Status"
                                                                selectedKey={tempFilters.status || "__all__"}
                                                                onSelectionChange={(key) =>
                                                                    setTempFilters((prev) => ({ ...prev, status: key === "__all__" ? "" : String(key) }))
                                                                }
                                                                items={[
                                                                    { id: "__all__", label: "All Status" },
                                                                    { id: "true", label: "Active" },
                                                                    { id: "false", label: "Inactive" },
                                                                ]}
                                                            >
                                                                {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                                            </Select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <SlideoutMenu.Footer>
                                                    <div className="flex gap-3 w-full">
                                                        <Button
                                                            color="secondary"
                                                            className="flex-1 justify-center"
                                                            onClick={() => handleResetTempFilters(close)}
                                                        >
                                                            Reset
                                                        </Button>
                                                        <Button color="primary" className="flex-1 justify-center" onClick={() => handleApplyFilters(close)}>
                                                            Apply Filters
                                                        </Button>
                                                    </div>
                                                </SlideoutMenu.Footer>
                                            </SlideoutMenu.Content>
                                        )}
                                    </SlideoutMenu>
                                </SlideoutMenu.Trigger>
                                <ButtonUtility
                                    icon={RefreshCw01}
                                    onClick={() => handleResetTempFilters()}
                                    color="secondary"
                                    className="px-3"
                                    tooltip="Reset Filters"
                                    isDisabled={!isFilterActive}
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {Object.entries(filters).map(([key, value]) => {
                                if (!value || value === "__all__") return null;
                                let label = key;
                                let displayValue = value;
                                if (key === "userDetails") label = "User";
                                if (key === "username") label = "Username";
                                if (key === "type") label = "Type";
                                if (key === "status") {
                                    label = "Status";
                                    displayValue = value === "true" ? "Active" : "Inactive";
                                }
                                return (
                                    <BadgeWithButton key={key} onButtonClick={() => handleRemoveFilter(key as keyof typeof filters)}>
                                        <span className="font-medium text-gray-500 mr-1">{label}:</span>
                                        <span className="font-semibold text-brand-700">{displayValue}</span>
                                    </BadgeWithButton>
                                );
                            })}
                        </div>
                    </div>

                    <div className="w-full max-w-full">
                        <StickyTable
                            ariaLabel="User list"
                            columns={columns}
                            items={items}
                            availableWidth={availableWidth}
                            loading={loading}
                            skeletonRows={5}
                            className="min-w-[980px]"
                        >
                            {(item) => (
                                <Table.Row id={getItemId(item)} columns={columns}>
                                    {(column) => (
                                        <Table.Cell className={column.id === "actions" ? "whitespace-nowrap" : "whitespace-nowrap px-4 py-3"}>
                                            {column.id === "index" ? (
                                                <span className="text-sm text-tertiary">{indexById.get(getItemId(item)) ?? "—"}</span>
                                            ) : column.id === "userDetails" ? (
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-semibold text-primary">{item?.name || "—"}</span>
                                                    <span className="text-sm text-tertiary">{item?.email || "—"}</span>
                                                    <span className="text-sm text-tertiary">{item?.mobile || "—"}</span>
                                                </div>
                                            ) : column.id === "username" ? (
                                                <span className="text-sm text-tertiary">{item?.username || "—"}</span>
                                            ) : column.id === "type" ? (
                                                <span className="text-sm text-tertiary">{item?.type || "—"}</span>
                                            ) : column.id === "status" ? (
                                                <Badge size="sm" color={item?.status ? "success" : "error"}>
                                                    {item?.status ? "Active" : "Inactive"}
                                                </Badge>
                                            ) : (
                                                <div className="flex w-full items-center justify-end gap-1.5">
                                                    <ButtonUtility
                                                        tooltip="View"
                                                        tooltipPlacement="bottom"
                                                        icon={Eye}
                                                        onClick={() => navigate(`/settings/user/view/${getItemId(item)}`)}
                                                        color="secondary"
                                                        size="sm"
                                                        isDisabled={!canView}
                                                    />
                                                    <ButtonUtility
                                                        tooltip="Edit"
                                                        tooltipPlacement="bottom"
                                                        icon={Edit01}
                                                        onClick={() => navigate(`/settings/user/edit/${getItemId(item)}`)}
                                                        color="secondary"
                                                        size="sm"
                                                        isDisabled={!canEdit}
                                                    />
                                                    <ButtonUtility
                                                        tooltip="Password Update"
                                                        tooltipPlacement="bottom"
                                                        icon={Lock01}
                                                        onClick={() => openPasswordModal(item)}
                                                        color="secondary"
                                                        size="sm"
                                                        isDisabled={!canEdit}
                                                    />
                                                    <ButtonUtility
                                                        tooltip="Delete"
                                                        tooltipPlacement="bottom"
                                                        icon={Trash01}
                                                        onClick={() => {
                                                            setDeleteTarget(item);
                                                            setDeleteModalOpen(true);
                                                        }}
                                                        color="secondary"
                                                        size="sm"
                                                        isDisabled={!canDelete}
                                                    />
                                                </div>
                                            )}
                                        </Table.Cell>
                                    )}
                                </Table.Row>
                            )}
                        </StickyTable>
                    </div>

                    <PaginationButtonGroup
                        page={page}
                        total={totalPages}
                        onPageChange={(nextPage: number) =>
                            setSearchParams((prev) => {
                                const next = new URLSearchParams(prev);
                                next.set("page", String(nextPage));
                                return next;
                            })
                        }
                        align="center"
                        className="py-4"
                    />
                </TableCard.Root>
            </div>

            <Tmodal
                isOpen={deleteModalOpen}
                onClose={() => {
                    setDeleteModalOpen(false);
                    setDeleteTarget(null);
                }}
                onConfirm={handleDelete}
                header="Confirm Deletion"
                content={`<p>Are you sure you want to delete this item: <b>${String(deleteTarget?.username || deleteTarget?.name || "")}</b> ?</p>`}
            />

            <ModalOverlay isOpen={passwordModal.open} onOpenChange={(open) => (open ? null : closePasswordModal())}>
                <Modal className="relative w-full max-w-lg rounded-xl bg-primary p-5 ring-1 ring-secondary">
                    <Dialog className="flex flex-col gap-4">
                        {({ close }) => (
                            <>
                                <CloseButton onPress={close} size="sm" className="absolute right-4 top-4" />
                                <div className="pr-10 text-lg font-semibold text-primary">Confirm Password</div>
                                <div className="text-sm text-tertiary">
                                    Are you sure you want to change the password of{" "}
                                    <span className="font-semibold text-primary">{passwordModal.username || passwordModal.userId}</span>?
                                </div>
                                <Input
                                    label="Password"
                                    placeholder="Enter password"
                                    type="password"
                                    value={passwordModal.password}
                                    onChange={(value) =>
                                        setPasswordModal((prev) => ({ ...prev, password: value, error: prev.error ? validatePassword(value) : "" }))
                                    }
                                    isInvalid={Boolean(passwordModal.error)}
                                    hint={passwordModal.error || undefined}
                                />
                                <div className="flex justify-end gap-2 pt-2">
                                    <Button color="secondary-destructive" onClick={close}>
                                        Cancel
                                    </Button>
                                    <Button color="primary" isLoading={passwordModal.saving} onClick={submitPasswordUpdate}>
                                        Confirm
                                    </Button>
                                </div>
                            </>
                        )}
                    </Dialog>
                </Modal>
            </ModalOverlay>
        </DefaultLayout>
    );
}
