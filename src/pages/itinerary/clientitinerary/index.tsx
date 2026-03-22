import { DefaultLayout } from "@/layouts/DefaultLayout";
import { StickyTable, Table, TableCard } from "@/components/application/table/table";
import { Badge, BadgeWithButton } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { PaginationButtonGroup } from "@/components/application/pagination/pagination";
import { Input } from "@/components/base/input/input";
import { useStoreLogin } from "@/store/login";
import { useStoreSnackbar } from "@/store/snackbar";
import { clientItineraryService } from "@/utils/services/clientItineraryService";
import { itineraryService } from "@/utils/services/itineraryService";
import { addSavedItinerary } from "@/utils/services/savedItineraryService";
import { getSalesEx } from "@/utils/services/salesService";
import { formatTime } from "@/utils/formatters";
import { Send03, Edit01, Trash01, Plus, FilterLines, RefreshCw01, X, SearchLg } from "@untitledui/icons";
import { useEffect, useState, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { Select } from "@/components/base/select/select";
import { ComboBox } from "@/components/base/select/combobox";
import { SelectItem } from "@/components/base/select/select-item";
import { DatePicker } from "@/components/application/date-picker/date-picker";
import { parseDate } from "@internationalized/date";
import { Modal, ModalOverlay, Dialog } from "@/components/application/modals/modal";
import { renderToStaticMarkup } from "react-dom/server";
import PreviewMail from "@/components/PreviewMail";
import { useAvailableTableWidth } from "@/hooks/use-available-table-width";
import { SlideoutMenu } from "@/components/application/slideout-menus/slideout-menu";
import { Label } from "@/components/base/input/label";

const statusColorMap: Record<string, "success" | "error" | "brand"> = {
    true: "success",
    false: "error",
};

export default function ClientItineraryListPage() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const { user } = useStoreLogin();
    const { showSnackbar } = useStoreSnackbar();
    const availableWidth = useAvailableTableWidth();

    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    // Pagination state
    const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
    const [limit, setLimit] = useState(Number(searchParams.get("limit")) || 10);
    const [totalRecords, setTotalRecords] = useState(0);

    // Filter state
    const [filters, setFilters] = useState({
        title: searchParams.get("title") || "",
        clientDetails: searchParams.get("clientDetails") || "",
        status: searchParams.get("status") || "",
        salesExecutive: searchParams.get("salesExecutive") || "",
        tourDate: searchParams.get("tourDate") || "",
    });

    const [debouncedFilters, setDebouncedFilters] = useState(filters);
    const [tempFilters, setTempFilters] = useState(filters);
    const [salesExecutives, setSalesExecutives] = useState<any[]>([]);
    const [itinerarySelectOpen, setItinerarySelectOpen] = useState(false);
    const [itineraryOptions, setItineraryOptions] = useState<any[]>([]);
    const [itineraryLoading, setItineraryLoading] = useState(false);
    const [selectedItineraryId, setSelectedItineraryId] = useState<string>("");
    const [itinerarySearch, setItinerarySearch] = useState("");
    const [debouncedItinerarySearch, setDebouncedItinerarySearch] = useState("");
    const [sendingQuotationIds, setSendingQuotationIds] = useState<Record<string, boolean>>({});
    const isFilterActive = Boolean(
        filters.title || filters.clientDetails || filters.status || filters.salesExecutive || filters.tourDate,
    );

    // Fetch Sales Executives
    useEffect(() => {
        const fetchSalesExecutives = async () => {
            try {
                const res = await getSalesEx({ limit: 1000 }); // Fetch all or sufficient amount
                if (res?.data) {
                    setSalesExecutives(res.data);
                } else if (Array.isArray(res)) {
                    setSalesExecutives(res);
                }
            } catch (error) {
                console.error("Failed to fetch sales executives", error);
            }
        };
        fetchSalesExecutives();
    }, []);

    useEffect(() => {
        if (!itinerarySelectOpen) return;
        const handler = setTimeout(() => {
            setDebouncedItinerarySearch(itinerarySearch.trim());
        }, 400);
        return () => clearTimeout(handler);
    }, [itinerarySearch, itinerarySelectOpen]);

    useEffect(() => {
        const fetchItineraries = async () => {
            if (!itinerarySelectOpen) return;
            setItineraryLoading(true);
            try {
                const params: any = { limit: "100" };
                if (debouncedItinerarySearch) params.title = debouncedItinerarySearch;
                const res = await itineraryService.list(params);
                const resolved: any = (res as any)?.data ?? res;
                const list = Array.isArray(resolved) ? resolved : (resolved?.docs || resolved?.items || []);
                setItineraryOptions(Array.isArray(list) ? list : []);
            } catch (error: any) {
                showSnackbar({
                    title: "Error",
                    description: error.message || "Failed to fetch itineraries",
                    color: "danger",
                });
                setItineraryOptions([]);
            } finally {
                setItineraryLoading(false);
            }
        };
        fetchItineraries();
    }, [itinerarySelectOpen, debouncedItinerarySearch, showSnackbar]);

    // Debounce filters
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedFilters(filters);
            setPage(1); // Reset to page 1 on filter change
        }, 500);
        return () => clearTimeout(handler);
    }, [filters]);

    // Update URL when state changes
    useEffect(() => {
        const params: any = { page: String(page), limit: String(limit) };
        if (debouncedFilters.title) params.title = debouncedFilters.title;
        if (debouncedFilters.clientDetails) params.clientDetails = debouncedFilters.clientDetails;
        if (debouncedFilters.status) params.status = debouncedFilters.status;
        if (debouncedFilters.salesExecutive) params.salesExecutive = debouncedFilters.salesExecutive;
        if (debouncedFilters.tourDate) params.tourDate = debouncedFilters.tourDate;
        setSearchParams(params, { replace: true });
    }, [page, limit, debouncedFilters, setSearchParams]);

    // Fetch data
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const query: any = {
                    totalCount: true,
                    page,
                    limit,
                    populate: "salesExecutive",
                };

                // Only add filters that have values
                Object.entries(debouncedFilters).forEach(([key, value]) => {
                    if (value) {
                        query[key] = value;
                    }
                });
                
                // Add user-specific filters if needed (e.g., if user is AGENT)
                if ((user as any)?.type === "AGENT") {
                    query.salesExecutive = user?.id;
                }

                console.log("Fetching client itinerary with query:", query);
                const res = await clientItineraryService.list(query);
                console.log("Client itinerary response:", res);
                
                if (res?.error) {
                    throw new Error(res.error);
                }

                const list = Array.isArray(res?.data) ? res.data : (res?.data?.docs || res?.docs || []);
                const total = res?.totalCount || res?.data?.totalDocs || res?.totalDocs || 0;

                setItems(list);
                setTotalRecords(total);
            } catch (error: any) {
                showSnackbar({
                    title: "Error",
                    description: error.message || "Failed to fetch client itineraries",
                    color: "danger",
                });
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [page, limit, debouncedFilters, user, showSnackbar]);

    const handleDelete = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this client itinerary?")) return;
        
        try {
            const res = await clientItineraryService.deleteById(id);
            if (res?.error) throw new Error(res.error);
            
            showSnackbar({
                title: "Success",
                description: "Client itinerary deleted successfully",
                color: "success",
            });
            
            // Refresh list
            const newItems = items.filter(item => item._id !== id && item.id !== id);
            setItems(newItems);
            setTotalRecords(prev => prev - 1);
        } catch (error: any) {
            showSnackbar({
                title: "Error",
                description: error.message || "Failed to delete client itinerary",
                color: "danger",
            });
        }
    };

    const handleCreateQuotation = async (item: any) => {
        const id = String(item?._id || item?.id || "");
        if (!id || sendingQuotationIds[id]) return;

        setSendingQuotationIds((prev) => ({ ...prev, [id]: true }));
        try {
            const res = await clientItineraryService.getById(id, {
                populate: "salesExecutive,templateId,hotelCategory,itinerary",
            });
            const previewData = (res as any)?.data ?? res;
            if (!previewData) {
                throw new Error("Client itinerary not found");
            }

            const salesExecutiveId =
                previewData?.salesExecutive?.id ||
                previewData?.salesExecutive?._id ||
                previewData?.salesExecutive;

            const html = renderToStaticMarkup(<PreviewMail previewData={previewData} />);
            const response = await addSavedItinerary({
                clientName: previewData?.clientName,
                mobile: previewData?.mobile,
                email: previewData?.email,
                packageCost: previewData?.packageCost,
                tourDate: previewData?.tourDate,
                salesExecutive: salesExecutiveId,
                clientItinerary: id,
                mailData: html,
            });

            if ((response as any)?.error) {
                throw new Error((response as any)?.error || "Failed to create quotation");
            }
            navigate(`/itinerary/saved-itinerary`);

            showSnackbar({
                title: "Success",
                description: "Quotation created successfully",
                color: "success",
            });
        } catch (error: any) {
            showSnackbar({
                title: "Error",
                description: error?.message || "Failed to create quotation",
                color: "danger",
            });
        } finally {
            setSendingQuotationIds((prev) => ({ ...prev, [id]: false }));
        }
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return "-";
        return new Date(dateString).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "2-digit"
        });
    };

    const handleOpenFilters = () => {
        setTempFilters(filters);
    };

    const handleApplyFilters = (close: () => void) => {
        setFilters(tempFilters);
        close();
    };

    const handleRemoveFilter = (key: string) => {
        const resetState = { ...filters, [key]: "" };
        setFilters(resetState);
        setTempFilters(resetState);
        setDebouncedFilters(resetState);
    };

    const handleResetTempFilters = (close?: () => void) => {
        const resetState = {
            title: "",
            clientDetails: "",
            status: "",
            salesExecutive: "",
            tourDate: "",
        };
        setFilters(resetState);
        setTempFilters(resetState);
        setDebouncedFilters(resetState);
        if (close) close();
    };

    const indexById = useMemo(() => new Map(items.map((item, index) => [item._id || item.id, (page - 1) * limit + index + 1])), [items, limit, page]);

    const salesExecutiveItems = useMemo(() => {
        return salesExecutives.map(ex => ({
            id: ex.id || ex._id,
            label: ex.name || ex.username || "Unknown",
        }));
    }, [salesExecutives]);

    const columns = [
        { id: "index", name: "#",  isRowHeader: true, widthRatio: 4, minWidth: 56 },
        { id: "title", name: "Title", widthRatio: 28, minWidth: 320 },
        { id: "client", name: "Customer Details", widthRatio: 18, minWidth: 240 },
        { id: "salesExecutive", name: "Sales Executive", widthRatio: 10, minWidth: 200 },
        { id: "tourDate", name: "Travel Date", widthRatio: 9, minWidth: 140 },
        { id: "createdDate", name: "Created Date", widthRatio: 9, minWidth: 140 },
        { id: "packageCost", name: "Package Amount", widthRatio: 10, minWidth: 160 },
        { id: "status", name: "Status", widthRatio: 8, minWidth: 120 },
        { id: "actions", name: "Actions", widthRatio: 6, minWidth: 160, className: "pr-4 pl-4 text-right" },
    ] as { id: string; name: string; className?: string; widthRatio?: number; minWidth?: number }[];

    return (
        <DefaultLayout>
            <div style={{ width: availableWidth }}>
                <TableCard.Root className="w-full">
                    <TableCard.Header 
                        title="All Client Itineraries" 
                        badge={loading ? "..." : totalRecords}
                        contentTrailing={
                            <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center">
                                 <Select
                                    aria-label="Rows per page"
                                    className="w-full md:w-40"
                                    value={String(limit)}
                                    onChange={(key) => {
                                        const next = Number(key);
                                        setLimit(Number.isFinite(next) && next > 0 ? next : 10);
                                        setPage(1);
                                    }}
                                    items={[
                                        { id: "10", label: "10 / page" },
                                        { id: "25", label: "25 / page" },
                                        { id: "50", label: "50 / page" },
                                    ]}
                                >
                                    {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                </Select>
                                {(user as any)?.type && (
                                    <Button 
                                        size="sm"
                                        color="primary"
                                        iconLeading={Plus} 
                                        onClick={() => setItinerarySelectOpen(true)}
                                    >
                                        Add Client Itinerary
                                    </Button>
                                )}
                            </div>
                        }
                    />
                    
                    <div className="border-b border-secondary bg-primary px-4 py-4 md:px-6">
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-3 justify-between md:flex-row md:items-center">
                                <Input
                                    placeholder="Search by client"
                                    value={tempFilters.clientDetails}
                                    onChange={(value) => {
                                        setFilters((prev) => ({ ...prev, clientDetails: String(value) }));
                                        setTempFilters((prev) => ({ ...prev, clientDetails: String(value) }));
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
                                                    <SlideoutMenu.Header onClose={close}>Filters</SlideoutMenu.Header>
                                                    <div className="flex-1 overflow-y-auto p-6">
                                                        <div className="flex flex-col gap-4">
                                                            <Input
                                                                label="Title"
                                                                placeholder="Search by Title"
                                                                value={tempFilters.title}
                                                                onChange={(value) => setTempFilters((prev) => ({ ...prev, title: String(value) }))}
                                                            />
                                                        <div className="flex flex-col gap-1.5">
                                                            <Label>Sales Executive</Label>
                                                            <ComboBox
                                                                placeholder="Sales Executive"
                                                                items={salesExecutiveItems}
                                                                selectedKey={tempFilters.salesExecutive}
                                                                onSelectionChange={(key) => setTempFilters(prev => ({ ...prev, salesExecutive: key as string }))}
                                                            >
                                                                {(item) => <SelectItem id={item.id}>{item.label}</SelectItem>}
                                                            </ComboBox>
                                                        </div>
                                                        <div className="flex flex-col gap-1.5">
                                                            <Label>Travel Date</Label>
                                                            <DatePicker
                                                                placeholder="Enter Travel date"
                                                                className="flex-1"
                                                                value={(() => {
                                                                    try {
                                                                        return tempFilters.tourDate ? parseDate(tempFilters.tourDate) : null;
                                                                    } catch {
                                                                        return null;
                                                                    }
                                                                })()}
                                                                onChange={(date) => setTempFilters(prev => ({ ...prev, tourDate: date ? date.toString() : "" }))}
                                                            />
                                                        </div>
                                                        <div className="flex flex-col gap-1.5">
                                                            <Label>Status</Label>
                                                            <Select
                                                                placeholder="All Status"
                                                                value={tempFilters.status || "__all__"}
                                                                onChange={(key) => setTempFilters(prev => ({ ...prev, status: key === "__all__" ? "" : String(key) }))}
                                                            >
                                                                <Select.Item id="__all__">All Status</Select.Item>
                                                                <Select.Item id="true">Active</Select.Item>
                                                                <Select.Item id="false">Inactive</Select.Item>
                                                            </Select>
                                                        </div>
                                                    </div>
                                                    </div>
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
                                    if (key === "clientDetails") label = "Client";
                                    if (key === "salesExecutive") {
                                        label = "Sales Executive";
                                        const exec = salesExecutiveItems.find(i => i.id === value);
                                        displayValue = exec ? exec.label : value;
                                    }
                                    if (key === "tourDate") {
                                        label = "Travel Date";
                                        displayValue = formatDate(value);
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
                    </div>

                    {loading ? (
                        <StickyTable
                            ariaLabel="Client itinerary list"
                            columns={columns}
                            items={Array.from({ length: 10 }).map((_, i) => ({ id: `skeleton-${i}` }))}
                            availableWidth={availableWidth}
                            loading={loading}
                        >
                            {(item) => (
                                <Table.Row id={item.id} columns={columns}>
                                    {(column) => (
                                        <Table.Cell
                                            className={`${column?.className || ""} ${column.id === "actions" ? "whitespace-nowrap" : "whitespace-normal break-words"}`.trim()}
                                        >
                                            <div className="animate-pulse">
                                                <div className="h-4 w-full rounded bg-secondary" />
                                            </div>
                                        </Table.Cell>
                                    )}
                                </Table.Row>
                            )}
                        </StickyTable>
                    ) : items.length === 0 ? (
                        <StickyTable
                            ariaLabel="Client itinerary list"
                            columns={columns}
                            items={[{ id: "empty" }]}
                            availableWidth={availableWidth}
                            loading={loading}
                        >
                            {() => (
                                <Table.Row id="empty" columns={columns}>
                                    <Table.Cell colSpan={columns.length} className="text-center py-8 text-fg-secondary">
                                        No records found
                                    </Table.Cell>
                                </Table.Row>
                            )}
                        </StickyTable>
                    ) : (
                        <StickyTable
                            ariaLabel="Client itinerary list"
                            columns={columns}
                            items={items}
                            availableWidth={availableWidth}
                            loading={loading}
                        >
                            {(item) => (
                                <Table.Row id={item._id || item.id} columns={columns}>
                                    {(column) => (
                                        <Table.Cell
                                            className={`${column?.className || ""} ${
                                                column.id === "actions" ||
                                                column.id === "index" ||
                                                column.id === "tourDate" ||
                                                column.id === "createdDate" ||
                                                column.id === "packageCost" ||
                                                column.id === "status"
                                                    ? "whitespace-nowrap"
                                                    : "whitespace-normal break-words"
                                            }`.trim()}
                                        >
                                            {column.id === "index" ? (
                                                <span className="text-sm text-tertiary">{indexById.get(item._id || item.id) ?? "—"}</span>
                                            ) : column.id === "title" ? (
                                                <button
                                                    type="button"
                                                    onClick={() => navigate(`/itinerary/clientitinerary/view/${item._id || item.id}`)}
                                                    className="text-left text-sm font-semibold text-primary hover:underline"
                                                >
                                                    {item.title || item.name || "—"}
                                                </button>
                                            ) : column.id === "client" ? (
                                                <div className="text-sm text-tertiary">
                                                    <p className="text-sm font-medium text-primary">{item.clientName || "—"}</p>
                                                    {item?.mobile ? <p>{item.mobile}</p> : null}
                                                    {item?.email ? <p>{item.email}</p> : null}
                                                </div>
                                            ) : column.id === "salesExecutive" ? (
                                                <span className="text-sm text-tertiary">{item.salesExecutive?.name || item.salesExecutive?.username || "—"}</span>
                                            ) : column.id === "tourDate" ? (
                                                <span className="text-sm text-tertiary">{formatDate(item.tourDate)}</span>
                                            ) : column.id === "createdDate" ? (
                                                <span className="text-sm text-tertiary">
                                                    {formatDate(item.createdAt)}
                                                    <br />
                                                    {formatTime(item.createdAt)}
                                                </span>
                                            ) : column.id === "packageCost" ? (
                                                <span className="text-sm text-tertiary">{item.packageCost ? `₹${item.packageCost}` : "—"}</span>
                                            ) : column.id === "status" ? (
                                                <Badge color={statusColorMap[String(item.status)] || "brand"}>
                                                    {String(item.status) === "true" ? "Active" : "Inactive"}
                                                </Badge>
                                            ) : (
                                                <div className="flex justify-end gap-2">
                                                    <ButtonUtility
                                                        icon={Edit01}
                                                        onClick={() => navigate(`/itinerary/clientitinerary/edit/${item._id || item.id}`)}
                                                        tooltip="Edit"
                                                        color="warning"
                                                    />
                                                    <ButtonUtility
                                                        icon={Trash01}
                                                        onClick={() => handleDelete(item._id || item.id)}
                                                        tooltip="Delete"
                                                        color="error"
                                                    />
                                                    <ButtonUtility
                                                        icon={Send03}
                                                        onClick={() => handleCreateQuotation(item)}
                                                        isDisabled={sendingQuotationIds[String(item._id || item.id)]}
                                                        tooltip="Create Quotation"
                                                        color="success"
                                                    />
                                                </div>
                                            )}
                                        </Table.Cell>
                                    )}
                                </Table.Row>
                            )}
                        </StickyTable>
                    )}

                    <PaginationButtonGroup
                        page={page}
                        total={Math.ceil(totalRecords / limit)}
                        align="center"
                        onPageChange={setPage}
                    />
                </TableCard.Root>
            </div>
            <ModalOverlay
                isOpen={itinerarySelectOpen}
                onOpenChange={(open) => {
                    setItinerarySelectOpen(open);
                    if (!open) {
                        setSelectedItineraryId("");
                        setItinerarySearch("");
                        setDebouncedItinerarySearch("");
                    }
                }}
            >
                <Modal className="max-w-lg">
                    <Dialog>
                        <div className="w-full rounded-xl bg-primary p-5 ring-1 ring-secondary">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-primary">Confirm Itinerary</h2>
                                <ButtonUtility icon={X} onClick={() => setItinerarySelectOpen(false)} />
                            </div>

                            <div className="mt-4 space-y-3">
                                <p className="text-sm text-tertiary">Please Select Your Itinerary:</p>
                                <ComboBox
                                    label=""
                                    items={itineraryOptions.map((it) => ({
                                        id: it.id || it._id,
                                        label: it.title || it.name || "Untitled",
                                    }))}
                                    selectedKey={selectedItineraryId}
                                    onSelectionChange={(key) => {
                                        const id = String(key);
                                        setSelectedItineraryId(id);
                                        const selected = itineraryOptions.find((it) => String(it.id || it._id) === id);
                                        if (selected?.title || selected?.name) setItinerarySearch(String(selected.title || selected.name));
                                    }}
                                    inputValue={itinerarySearch}
                                    onInputChange={(value) => setItinerarySearch(value)}
                                    placeholder={itineraryLoading ? "Loading..." : "Select title"}
                                    shortcut={false}
                                >
                                    {(item) => <SelectItem id={item.id}>{item.label}</SelectItem>}
                                </ComboBox>
                            </div>

                            <div className="mt-5 flex justify-end gap-2">
                                <Button color="secondary" onClick={() => setItinerarySelectOpen(false)}>
                                    Cancel
                                </Button>
                                <Button
                                    onClick={() => {
                                        if (!selectedItineraryId) return;
                                        navigate(`/itinerary/clientitinerary/add?itinerary=${selectedItineraryId}`);
                                        setItinerarySelectOpen(false);
                                    }}
                                    isDisabled={!selectedItineraryId}
                                >
                                    Confirm
                                </Button>
                            </div>
                        </div>
                    </Dialog>
                </Modal>
            </ModalOverlay>
        </DefaultLayout>
    );
}
