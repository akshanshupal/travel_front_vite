import { DefaultLayout } from "@/layouts/DefaultLayout";
import { PaginationButtonGroup } from "@/components/application/pagination/pagination";
import { StickyTable, Table, TableCard } from "@/components/application/table/table";
import { Badge, BadgeWithIcon } from "@/components/base/badges/badges";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Label } from "@/components/base/input/label";
import { Select } from "@/components/base/select/select";
import { getSentMailById } from "@/utils/services/mailService";
import { getSalesEx } from "@/utils/services/salesService";
import { useStoreSnackbar } from "@/store/snackbar";
import { RefreshCw01, FilterLines, X } from "@untitledui/icons";
import { SlideoutMenu } from "@/components/application/slideout-menus/slideout-menu";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { DatePicker } from "@/components/application/date-picker/date-picker";
import { parseDate } from "@internationalized/date";
import { useAvailableTableWidth } from "@/hooks/use-available-table-width";

const columns = [
    { id: "index", name: "S. No.", isRowHeader: true, widthRatio: 6, minWidth: 64 },
    { id: "packageId", name: "Package ID", widthRatio: 14, minWidth: 140 },
    { id: "emailFunction", name: "Email Function", widthRatio: 18, minWidth: 180 },
    { id: "email", name: "Email", widthRatio: 20, minWidth: 200 },
    { id: "sendBy", name: "Send By", widthRatio: 12, minWidth: 140 },
    { id: "createdAt", name: "Date", widthRatio: 15, minWidth: 160 },
    { id: "status", name: "Status", widthRatio: 10, minWidth: 120 },
];

const emailFunctionList = [
    { key: "sendVoucherMail", value: "Booking Voucher Mail" },
    { key: "sendPaymentMail", value: "Payment Confirmation Mail" },
    { key: "sendPaymentReminderMail", value: "Payment Reminder Mail" },
    { key: "sendWelcomeMail", value: "Welcome Mail" }
];

const emailFunctionTitleMap: Record<string, string> = {
    sendVoucherMail: "Booking Voucher Mail",
    sendPaymentMail: "Payment Confirmation Mail",
    sendPaymentReminderMail: "Payment Reminder Mail",
    sendWelcomeMail: "Welcome Mail",
};

export default function ReportsMailsPage() {
    const availableWidth = useAvailableTableWidth();
    const [searchParams, setSearchParams] = useSearchParams();
    const { showSnackbar } = useStoreSnackbar();

    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState<any[]>([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [salesExecutives, setSalesExecutives] = useState<any[]>([]);

    const page = Number(searchParams.get("page") || "1");
    const limit = Number(searchParams.get("limit") || "10");
    const [filters, setFilters] = useState({
        packageId: searchParams.get("packageId") || "",
        emailFunction: searchParams.get("emailFunction") || "",
        email: searchParams.get("email") || "",
        name: searchParams.get("name") || "",
        sendBy: searchParams.get("sendBy") || "",
        from: searchParams.get("from") || "",
        to: searchParams.get("to") || "",
        status: searchParams.get("status") || "",
    });

    const [debouncedFilters, setDebouncedFilters] = useState(filters);
    const [tempFilters, setTempFilters] = useState(filters);

    useEffect(() => {
        const run = async () => {
            try {
                const response: any = await getSalesEx({ limit: "all" });
                const resolved = response?.data ?? response;
                setSalesExecutives(Array.isArray(resolved) ? resolved : []);
            } catch {
                setSalesExecutives([]);
            }
        };
        run();
    }, []);

    const sendByNameMap = useMemo(() => {
        const map = new Map<string, string>();
        (Array.isArray(salesExecutives) ? salesExecutives : []).forEach((item: any) => {
            const id = String(item?.id ?? item?._id ?? "").trim();
            const name = String(item?.name ?? "").trim();
            if (id && name) map.set(id, name);
        });
        return map;
    }, [salesExecutives]);

    const handleOpenFilters = () => {
        setTempFilters(filters);
    };

    const handleApplyFilters = (close: () => void) => {
        setFilters(tempFilters);
        close();
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
        Object.keys(params).forEach(key => {
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
                    populate: "sendBy",
                    select_sendBy: "name",
                    ...debouncedFilters,
                };
                if (!params.emailFunction) {
                    params.emailFunction = "sendWelcomeMail,sendPaymentMail,sendVoucherMail,sendPaymentReminderMail";
                }
                Object.keys(params).forEach(key => {
                    if (params[key] === "" || params[key] === undefined || params[key] === null) delete params[key];
                });
                const response = await getSentMailById(params);
                if (response.error) {
                    throw new Error(response.error);
                }
                setItems(response.data || []);
                setTotalRecords(response.totalCount || 0);
            } catch (error: any) {
                showSnackbar({
                    title: "Error",
                    description: error.message || "Failed to fetch mail reports",
                    color: "danger",
                });
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [page, limit, debouncedFilters]);

    const handleResetTempFilters = (close?: () => void) => {
        const resetState = {
            packageId: "",
            emailFunction: "",
            email: "",
            name: "",
            sendBy: "",
            from: "",
            to: "",
            status: "",
        };
        setTempFilters(resetState);
        setFilters(resetState);
        setDebouncedFilters(resetState);
        if (close) close();
    };

    const handleRemoveFilter = (key: string) => {
        setFilters((prev) => ({ ...prev, [key]: "" }));
        setTempFilters((prev) => ({ ...prev, [key]: "" }));
    };

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", String(newPage));
        setSearchParams(params);
    };

    const handleLimitChange = (newLimit: string) => {
        const params = new URLSearchParams(searchParams);
        params.set("limit", newLimit);
        params.set("page", "1");
        setSearchParams(params);
    };

    return (
        <DefaultLayout>
            <div className="space-y-4" style={{ width: availableWidth }}>
                <TableCard.Root>
                    <TableCard.Header
                        title="Mail Reports"
                        badge={loading ? "..." : totalRecords}
                        contentTrailing={
                            <div className="flex flex-col gap-2 md:flex-row md:items-center">
                                <Select
                                    aria-label="Rows per page"
                                    className="w-full md:w-32"
                                    selectedKey={String(limit)}
                                    onSelectionChange={(key) => handleLimitChange(String(key))}
                                    items={[
                                        { id: "10", label: "10 / page" },
                                        { id: "25", label: "25 / page" },
                                        { id: "50", label: "50 / page" },
                                    ]}
                                >
                                    {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                </Select>
                            </div>
                        }
                    />

                    <div className="border-b border-secondary bg-primary px-4 py-4 md:px-6">
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <SlideoutMenu.Trigger>
                                    <Button color="secondary" iconLeading={FilterLines} onClick={handleOpenFilters}>
                                        More filters
                                    </Button>
                                    <SlideoutMenu isDismissable>
                                        {({ close }) => (
                                            <>
                                                <SlideoutMenu.Header onClose={close}>Filters</SlideoutMenu.Header>
                                                <SlideoutMenu.Content>
                                                    <div className="flex flex-col gap-4">
                                                        <Input
                                                            label="Package ID"
                                                            placeholder="Search by Package ID"
                                                            value={tempFilters.packageId}
                                                            onChange={(value) => setTempFilters((prev) => ({ ...prev, packageId: value }))}
                                                        />
                                                        <div className="flex flex-col gap-1.5">
                                                            <Label>Email Function</Label>
                                                            <Select
                                                                aria-label="Email Function"
                                                                selectedKey={tempFilters.emailFunction || "__all__"}
                                                                onSelectionChange={(key) => setTempFilters((prev) => ({ ...prev, emailFunction: key === "__all__" ? "" : String(key) }))}
                                                                items={[{ key: "__all__", value: "All Functions" }, ...emailFunctionList].map(item => ({ id: item.key, label: item.value }))}
                                                            >
                                                                {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                                            </Select>
                                                        </div>
                                                        <Input
                                                            label="Email"
                                                            placeholder="Search by Email"
                                                            value={tempFilters.email}
                                                            onChange={(value) => setTempFilters((prev) => ({ ...prev, email: value }))}
                                                        />
                                                        <Input
                                                            label="Name"
                                                            placeholder="Search by Name"
                                                            value={tempFilters.name}
                                                            onChange={(value) => setTempFilters((prev) => ({ ...prev, name: value }))}
                                                        />
                                                        <div className="flex flex-col gap-1.5">
                                                            <Label>Send By</Label>
                                                            <Select
                                                                aria-label="Send By"
                                                                selectedKey={tempFilters.sendBy || "__all__"}
                                                                onSelectionChange={(key) =>
                                                                    setTempFilters((prev) => ({ ...prev, sendBy: key === "__all__" ? "" : String(key) }))
                                                                }
                                                                items={[
                                                                    { id: "__all__", label: "All Senders" },
                                                                    ...(Array.isArray(salesExecutives) ? salesExecutives : []).map((item: any) => ({
                                                                        id: String(item?.id ?? item?._id ?? ""),
                                                                        label: String(item?.name ?? "").trim() || String(item?.id ?? item?._id ?? ""),
                                                                    })),
                                                                ].filter((item) => Boolean(item.id))}
                                                            >
                                                                {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                                            </Select>
                                                        </div>
                                                        <div className="flex flex-col gap-1.5">
                                                            <Label>Date Range</Label>
                                                            <div className="flex gap-2">
                                                                <div className="flex-1">
                                                                    <DatePicker
                                                                        aria-label="From"
                                                                        value={tempFilters.from ? parseDate(tempFilters.from) : null}
                                                                        onChange={(date) => setTempFilters((prev) => ({ ...prev, from: date ? date.toString() : "" }))}
                                                                    />
                                                                </div>
                                                                <div className="flex-1">
                                                                    <DatePicker
                                                                        aria-label="To"
                                                                        value={tempFilters.to ? parseDate(tempFilters.to) : null}
                                                                        onChange={(date) => setTempFilters((prev) => ({ ...prev, to: date ? date.toString() : "" }))}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </SlideoutMenu.Content>
                                                <SlideoutMenu.Footer>
                                                    <div className="flex gap-3 w-full">
                                                        <Button color="secondary" className="flex-1 justify-center" onClick={() => handleResetTempFilters(close)}>
                                                            Reset
                                                        </Button>
                                                        <Button color="primary" className="flex-1 justify-center" onClick={() => handleApplyFilters(close)}>
                                                            Apply Filters
                                                        </Button>
                                                    </div>
                                                </SlideoutMenu.Footer>
                                            </>
                                        )}
                                    </SlideoutMenu>
                                </SlideoutMenu.Trigger>
                                <ButtonUtility
                                    icon={RefreshCw01}
                                    onClick={() => handleResetTempFilters()}
                                    color="secondary"
                                    size="sm"
                                    tooltip="Reset Filters"
                                />
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {Object.entries(filters).map(([key, value]) => {
                                    if (!value) return null;
                                    let label = key;
                                    let displayValue = value;
                                    
                                    if (key === "packageId") label = "Package ID";
                                    if (key === "emailFunction") {
                                        label = "Function";
                                        displayValue = emailFunctionTitleMap[value] || value;
                                    }
                                    if (key === "email") label = "Email";
                                    if (key === "name") label = "Name";
                                    if (key === "sendBy") {
                                        label = "Sender";
                                        displayValue = sendByNameMap.get(value) || value;
                                    }
                                    if (key === "from") label = "From";
                                    if (key === "to") label = "To";
                                    if (key === "status") label = "Status";

                                    return (
                                        <div key={key} onClick={() => handleRemoveFilter(key)} className="cursor-pointer">
                                            <BadgeWithIcon iconTrailing={X} color="brand">
                                                <span className="font-medium text-gray-500 mr-1">{label}:</span>
                                                <span className="font-semibold text-brand-700">{displayValue}</span>
                                            </BadgeWithIcon>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <StickyTable
                        ariaLabel="Mail Reports list"
                        columns={columns}
                        items={items}
                        availableWidth={availableWidth}
                        loading={loading}
                    >
                        {(item) => (
                            <Table.Row id={item.id || item._id}>
                                <Table.Cell className="whitespace-nowrap px-4 py-3">
                                    {(page - 1) * limit + items.indexOf(item) + 1}
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap px-4 py-3">{item.packageId}</Table.Cell>
                                <Table.Cell className="whitespace-nowrap px-4 py-3">{emailFunctionTitleMap[item.emailFunction] || item.emailFunction}</Table.Cell>
                                <Table.Cell className="whitespace-nowrap px-4 py-3">{item.email}</Table.Cell>
                                <Table.Cell className="whitespace-nowrap px-4 py-3">
                                    {item?.sendBy?.name || sendByNameMap.get(String(item?.sendBy ?? "")) || item?.sendBy || "-"}
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap px-4 py-3">
                                    {item.createdAt ? new Date(item.createdAt).toLocaleString() : "-"}
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap px-4 py-3">
                                    <Badge
                                        size="sm"
                                        color={item.status ? "success" : "error"}
                                    >
                                        {item.status ? "Success" : "Failed"}
                                    </Badge>
                                </Table.Cell>
                            </Table.Row>
                        )}
                    </StickyTable>

                    <PaginationButtonGroup
                        page={page}
                        total={Math.ceil(totalRecords / limit)}
                        onPageChange={handlePageChange}
                        align="center"
                        className="py-4"
                    />
                </TableCard.Root>
            </div>
        </DefaultLayout>
    );
}
