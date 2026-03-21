import { DefaultLayout } from "@/layouts/DefaultLayout";
import { PaginationButtonGroup } from "@/components/application/pagination/pagination";
import { StickyTable, Table, TableCard } from "@/components/application/table/table";
import { Badge, BadgeWithButton } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Input } from "@/components/base/input/input";
import { Label } from "@/components/base/input/label";
import { Select } from "@/components/base/select/select";
import { SlideoutMenu } from "@/components/application/slideout-menus/slideout-menu";
import { useAvailableTableWidth } from "@/hooks/use-available-table-width";
import { useAccess } from "@/hooks/use-access";
import Tmodal from "@/components/utils/Tmodal";
import { useStoreSnackbar } from "@/store/snackbar";
import { deleteMailerById, getMailer } from "@/utils/services/mailerService";
import { Edit01, Eye, FilterLines, Plus, RefreshCw01, SearchLg, Trash01 } from "@untitledui/icons";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

const columns = [
    { id: "index", name: "S. No.", isRowHeader: true, widthRatio: 6, minWidth: 64 },
    { id: "title", name: "Title", widthRatio: 20, minWidth: 180 },
    { id: "host", name: "Host", widthRatio: 22, minWidth: 200 },
    { id: "email", name: "Email", widthRatio: 22, minWidth: 220 },
    { id: "status", name: "Status", widthRatio: 10, minWidth: 120 },
    { id: "actions", name: "Actions", widthRatio: 12, minWidth: 140 },
];

const emailFunctionOptions = [
    { id: "sendItineraryMail", label: "Quotation Mail" },
    { id: "sendWelcomeMail", label: "Welcome Mail" },
    { id: "sendPaymentMail", label: "Payment Confirmation Mail" },
    { id: "sendVoucherMail", label: "Booking Voucher Mail" },
    { id: "sendPaymentReminderMail", label: "Payment Reminder Mail" },
];

const emailFunctionTitleMap: Record<string, string> = emailFunctionOptions.reduce(
    (acc, item) => {
        acc[item.id] = item.label;
        return acc;
    },
    {} as Record<string, string>,
);

export default function SettingsMailerListPage() {
    const availableWidth = useAvailableTableWidth();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const { showSnackbar } = useStoreSnackbar();
    const { can } = useAccess();
    const canView = can("mailer", "view");
    const canAdd = can("mailer", "add");
    const canEdit = can("mailer", "edit");
    const canDelete = can("mailer", "delete");

    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState<any[]>([]);
    const [totalRecords, setTotalRecords] = useState(0);

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState<any>(null);

    const page = Number(searchParams.get("page") || "1");
    const limit = Number(searchParams.get("limit") || "10");
    const [filters, setFilters] = useState({
        title: searchParams.get("title") || "",
        company: searchParams.get("company") || "",
        host: searchParams.get("host") || "",
        email: searchParams.get("email") || "",
        password: searchParams.get("password") || "",
        emailFunction: searchParams.get("emailFunction") || "",
        status: searchParams.get("status") || "",
    });

    const [debouncedFilters, setDebouncedFilters] = useState(filters);
    const [tempFilters, setTempFilters] = useState(filters);

    const isFilterActive = Boolean(
        filters.title || filters.company || filters.host || filters.email || filters.password || filters.emailFunction || filters.status,
    );
    const totalPages = Math.max(1, Math.ceil((totalRecords || 0) / limit));
    const getItemId = (item: any) => String(item?.id || item?._id || "");

    const indexById = useMemo(
        () => new Map(items.map((item, index) => [getItemId(item), (page - 1) * limit + index + 1])),
        [items, limit, page],
    );

    const handleOpenFilters = () => {
        setTempFilters(filters);
    };

    const handleApplyFilters = (close: () => void) => {
        setFilters(tempFilters);
        close();
    };

    const handleResetTempFilters = (close?: () => void) => {
        const resetState = {
            title: "",
            company: "",
            host: "",
            email: "",
            password: "",
            emailFunction: "",
            status: "",
        };
        setTempFilters(resetState);
        setFilters(resetState);
        setDebouncedFilters(resetState);
        if (close) close();
    };

    const handleRemoveFilter = (key: string) => {
        const resetState = { ...filters, [key]: "" } as any;
        setFilters(resetState);
        setTempFilters(resetState);
        setDebouncedFilters(resetState);
    };

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedFilters(filters);
        }, 500);
        return () => clearTimeout(handler);
    }, [filters]);

    useEffect(() => {
        const params: Record<string, string> = {
            page: String(page),
            limit: String(limit),
            ...debouncedFilters,
        };
        Object.keys(params).forEach((key) => {
            if (params[key] === "") delete params[key];
        });
        setSearchParams(params);
    }, [page, limit, debouncedFilters, setSearchParams]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const params: Record<string, any> = {
                    totalCount: true,
                    page,
                    limit,
                    select: "title,host,email,status,emailFunction,company",
                    ...debouncedFilters,
                };
                Object.keys(params).forEach((key) => {
                    if (params[key] === "" || params[key] === undefined || params[key] === null) delete params[key];
                });
                const response: any = await getMailer(params);
                if (response?.error) throw new Error(response.error);
                setItems(response?.data || []);
                setTotalRecords(response?.totalCount || 0);
            } catch (error: any) {
                showSnackbar({
                    title: "Error",
                    description: error?.message || "Failed to fetch mailers",
                    color: "danger",
                });
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [debouncedFilters, limit, page, showSnackbar]);

    const handleDelete = async () => {
        if (!deleteTarget) return;
        const id = getItemId(deleteTarget);
        if (!id) return;
        try {
            const response: any = await deleteMailerById(id);
            if (response?.error) throw new Error(response.error);
            showSnackbar({ title: "Success", description: "Mailer deleted successfully", color: "success" });
            setItems((prev) => prev.filter((item) => getItemId(item) !== id));
            setTotalRecords((prev) => Math.max(0, prev - 1));
        } catch (error: any) {
            showSnackbar({ title: "Delete Failed", description: error?.message || "Failed to delete mailer", color: "danger" });
            throw error;
        }
    };

    return (
        <DefaultLayout>
            <div className="space-y-4" style={{ width: availableWidth }}>
                <TableCard.Root className="w-full">
                    <TableCard.Header
                        title="Mailer List"
                        badge={loading ? "..." : totalRecords}
                        contentTrailing={
                            <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center">
                                <Select
                                    aria-label="Rows per page"
                                    className="w-full md:w-40"
                                    selectedKey={String(limit)}
                                    onSelectionChange={(key) => {
                                        const next = Number(key);
                                        if (!Number.isFinite(next) || next <= 0) return;
                                        setSearchParams((prev) => {
                                            const nextParams = new URLSearchParams(prev);
                                            nextParams.set("limit", String(next));
                                            nextParams.set("page", "1");
                                            return nextParams;
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
                                <Button size="sm" color="primary" iconLeading={Plus} isDisabled={!canAdd} onClick={() => navigate("/settings/mailer/add")}>
                                    Add Mailer
                                </Button>
                            </div>
                        }
                    />

                    <div className="flex flex-col gap-4 border-b border-secondary bg-primary px-4 py-4 md:px-6">
                        <div className="flex flex-col gap-3 justify-between md:flex-row md:items-center">
                            <Input
                                placeholder="Search by title"
                                value={tempFilters.title}
                                onChange={(value) => {
                                    setFilters((prev) => ({ ...prev, title: value }));
                                    setTempFilters((prev) => ({ ...prev, title: value }));
                                }}
                                icon={SearchLg}
                                className="w-full md:w-80"
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
                                                            label="Company"
                                                            placeholder="Search by Company"
                                                            value={tempFilters.company}
                                                            onChange={(value) => setTempFilters((prev) => ({ ...prev, company: value }))}
                                                        />
                                                        <Input
                                                            label="Host"
                                                            placeholder="Search by Host"
                                                            value={tempFilters.host}
                                                            onChange={(value) => setTempFilters((prev) => ({ ...prev, host: value }))}
                                                        />
                                                        <Input
                                                            label="Email"
                                                            placeholder="Search by Email"
                                                            value={tempFilters.email}
                                                            onChange={(value) => setTempFilters((prev) => ({ ...prev, email: value }))}
                                                        />
                                                        <Input
                                                            label="Password"
                                                            placeholder="Search by Password"
                                                            value={tempFilters.password}
                                                            onChange={(value) => setTempFilters((prev) => ({ ...prev, password: value }))}
                                                            type="password"
                                                        />
                                                        <div className="flex flex-col gap-1.5">
                                                            <Label>Email Function</Label>
                                                            <Select
                                                                aria-label="Email Function"
                                                                selectedKey={tempFilters.emailFunction || "__all__"}
                                                                onSelectionChange={(key) =>
                                                                    setTempFilters((prev) => ({ ...prev, emailFunction: key === "__all__" ? "" : String(key) }))
                                                                }
                                                                items={[
                                                                    { id: "__all__", label: "All" },
                                                                    ...emailFunctionOptions,
                                                                ]}
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
                                if (key === "title") label = "Title";
                                if (key === "company") label = "Company";
                                if (key === "host") label = "Host";
                                if (key === "email") label = "Email";
                                if (key === "password") label = "Password";
                                if (key === "emailFunction") {
                                    label = "Email Function";
                                    displayValue = emailFunctionTitleMap[value] || value;
                                }
                                if (key === "status") {
                                    label = "Status";
                                    displayValue = value === "true" ? "Active" : "Inactive";
                                }
                                return (
                                    <BadgeWithButton key={key} onButtonClick={() => handleRemoveFilter(key)}>
                                        <span className="font-medium text-gray-500 mr-1">{label}:</span>
                                        <span className="font-semibold text-brand-700">{displayValue}</span>
                                    </BadgeWithButton>
                                );
                            })}
                        </div>
                    </div>

                    <StickyTable
                        ariaLabel="Mailer list"
                        columns={columns}
                        items={items}
                        availableWidth={availableWidth}
                        loading={loading}
                        skeletonRows={5}
                        className="min-w-[820px]"
                    >
                        {(item) => (
                            <Table.Row id={getItemId(item)} columns={columns}>
                                {(column) => (
                                    <Table.Cell className={column.id === "actions" ? "whitespace-nowrap" : "whitespace-nowrap px-4 py-3"}>
                                        {column.id === "index" ? (
                                            <span className="text-sm text-tertiary">{indexById.get(getItemId(item)) ?? "—"}</span>
                                        ) : column.id === "title" ? (
                                            <span className="text-sm text-tertiary">{item.title || "—"}</span>
                                        ) : column.id === "host" ? (
                                            <span className="text-sm text-tertiary">{item.host || "—"}</span>
                                        ) : column.id === "email" ? (
                                            <span className="text-sm text-tertiary">{item.email || "—"}</span>
                                        ) : column.id === "status" ? (
                                            <Badge size="sm" color={item.status ? "success" : "error"}>
                                                {item.status ? "Active" : "Inactive"}
                                            </Badge>
                                        ) : (
                                            <div className="flex w-full items-center justify-end gap-1.5">
                                                <ButtonUtility
                                                    tooltip="View"
                                                    tooltipPlacement="bottom"
                                                    icon={Eye}
                                                    onClick={() => navigate(`/settings/mailer/view/${getItemId(item)}`)}
                                                    color="secondary"
                                                    size="sm"
                                                    isDisabled={!canView}
                                                />
                                                <ButtonUtility
                                                    tooltip="Edit"
                                                    tooltipPlacement="bottom"
                                                    icon={Edit01}
                                                    onClick={() => navigate(`/settings/mailer/edit/${getItemId(item)}`)}
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

                    <PaginationButtonGroup
                        page={page}
                        total={totalPages}
                        align="center"
                        onPageChange={(nextPage) =>
                            setSearchParams((prev) => {
                                const nextParams = new URLSearchParams(prev);
                                nextParams.set("page", String(nextPage));
                                return nextParams;
                            })
                        }
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
                content={`<p>Are you sure you want to delete this item: <b>${deleteTarget?.title || ""}</b> ?</p>`}
            />
        </DefaultLayout>
    );
}
