import { DefaultLayout } from "@/layouts/DefaultLayout";
import { StickyTable, Table, TableCard } from "@/components/application/table/table";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Input } from "@/components/base/input/input";
import { useStoreSnackbar } from "@/store/snackbar";
import { SlideoutMenu } from "@/components/application/slideout-menus/slideout-menu";
import { BadgeWithButton } from "@/components/base/badges/badges";
import { FilterLines, Plus, Eye, Trash01, RefreshCw01, SearchLg } from "@untitledui/icons";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { Dialog, Modal, ModalOverlay } from "@/components/application/modals/modal";
import { CloseButton } from "@/components/base/buttons/close-button";
import { useAvailableTableWidth } from "@/hooks/use-available-table-width";

const initialPackages = [
    {
        customerId: "001",
        customerName: "Ram",
        contactInfo: "989899999 \n 989076890 \n mailto:ram@gmail.com",
        travelDate: "01/02/2024",
        bookingDate: "09/06/2024",
        homelocation: "Goa",
        travellocation: "delhi",
        amount: "100000",
    },
    {
        customerId: "002",
        customerName: "Vansh",
        contactInfo: "989899999 989076890 mailto:vansh@gmail.com",
        travelDate: "01/02/2024",
        bookingDate: "09/06/2024",
        homelocation: "Noida",
        travellocation: "shimla",
        amount: "12000",
    },
];

export default function CabBookingPage() {
    const availableWidth = useAvailableTableWidth();
    const navigate = useNavigate();
    const { showSnackbar } = useStoreSnackbar();

    const [items, setItems] = useState<any[]>(initialPackages);
    const [filteredItems, setFilteredItems] = useState<any[]>(initialPackages);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState<any>(null);

    const [filters, setFilters] = useState({
        customerId: "",
        customerName: "",
        contactInfo: "",
        travelDate: "",
        bookingDate: "",
        homelocation: "",
        travellocation: "",
        amount: "",
    });
    const [tempFilters, setTempFilters] = useState(filters);
    const isFilterActive = Boolean(
        filters.customerId ||
            filters.customerName ||
            filters.contactInfo ||
            filters.travelDate ||
            filters.bookingDate ||
            filters.homelocation ||
            filters.travellocation ||
            filters.amount
    );
    const indexById = useMemo(
        () => new Map(filteredItems.map((item, index) => [item.customerId, index + 1])),
        [filteredItems]
    );
    const columns = [
        { id: "index", name: "S. No.", isRowHeader: true, widthRatio: 6, minWidth: 64 },
        { id: "customerId", name: "Customer ID", widthRatio: 10, minWidth: 120 },
        { id: "customerName", name: "Customer Name", widthRatio: 16, minWidth: 160 },
        { id: "contactInfo", name: "Contact Info", widthRatio: 18, minWidth: 200 },
        { id: "travelDate", name: "Travel Date", widthRatio: 10, minWidth: 120 },
        { id: "bookingDate", name: "Booking Date", widthRatio: 10, minWidth: 120 },
        { id: "homelocation", name: "Home Location", widthRatio: 10, minWidth: 140 },
        { id: "travellocation", name: "Travel Location", widthRatio: 10, minWidth: 140 },
        { id: "amount", name: "Amount", widthRatio: 8, minWidth: 100 },
        { id: "actions", name: "Actions", widthRatio: 12, minWidth: 140, className: "pr-4 pl-4" },
    ] as { id: string; name: string; className?: string; widthRatio?: number; minWidth?: number }[];

    const handleOpenFilters = () => {
        setTempFilters(filters);
    };

    const handleApplyFilters = (close: () => void) => {
        setFilters(tempFilters);
        close();
    };

    const handleResetTempFilters = (close?: () => void) => {
        const resetState = {
            customerId: "",
            customerName: "",
            contactInfo: "",
            travelDate: "",
            bookingDate: "",
            homelocation: "",
            travellocation: "",
            amount: "",
        };
        setTempFilters(resetState);
        setFilters(resetState);
        if (close) close();
    };

    const handleRemoveFilter = (key: string) => {
        const resetState = { ...filters, [key]: "" };
        setFilters(resetState);
        setTempFilters(resetState);
    };

    useEffect(() => {
        const filtered = items.filter((pkg) => {
            return (
                pkg.customerId.toLowerCase().includes(filters.customerId.toLowerCase()) &&
                pkg.customerName.toLowerCase().includes(filters.customerName.toLowerCase()) &&
                pkg.contactInfo.toLowerCase().includes(filters.contactInfo.toLowerCase()) &&
                pkg.travelDate.includes(filters.travelDate) &&
                pkg.bookingDate.includes(filters.bookingDate) &&
                pkg.homelocation.toLowerCase().includes(filters.homelocation.toLowerCase()) &&
                pkg.travellocation.toLowerCase().includes(filters.travellocation.toLowerCase()) &&
                pkg.amount.includes(filters.amount)
            );
        });
        setFilteredItems(filtered);
    }, [filters, items]);


    const handleDelete = () => {
        if (!deleteTarget) return;
        setItems((prev) => prev.filter((pkg) => pkg.customerId !== deleteTarget.customerId));
        setDeleteModalOpen(false);
        showSnackbar({
            title: "Success",
            description: "Cab booking deleted successfully",
            color: "success",
        });
    };

    return (
        <DefaultLayout>
            <div className="space-y-4" style={{ width: availableWidth }}>
                <TableCard.Root className="w-full">
                    <TableCard.Header
                        title="Cab Booking List"
                        badge={filteredItems.length}
                        contentTrailing={
                            <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center">
                                <Button
                                    size="sm"
                                    color="primary"
                                    iconLeading={Plus}
                                    onClick={() => navigate("/bookings/cabbooking/add")}
                                >
                                    Add Cab Booking
                                </Button>
                            </div>
                        }
                    />

                    <div className="flex flex-col gap-4 border-b border-secondary bg-primary px-4 py-4 md:px-6">
                        <div className="flex flex-col gap-3 md:flex-row md:items-center justify-between">
                            <Input
                                placeholder="Search by customer name"
                                value={tempFilters.customerName}
                                onChange={(value) => {
                                    setFilters((prev) => ({ ...prev, customerName: value }));
                                    setTempFilters((prev) => ({ ...prev, customerName: value }));
                                }}
                                icon={SearchLg}
                                className="w-full md:w-80"
                            />
                            <div className="flex items-center gap-2">
                                <SlideoutMenu.Trigger>
                                    <Button color="primary" iconLeading={FilterLines} onClick={handleOpenFilters}>
                                        More filters
                                    </Button>
                                    <SlideoutMenu isDismissable>
                                        {({ close }) => (
                                            <>
                                                <SlideoutMenu.Header onClose={close}>Filters</SlideoutMenu.Header>
                                                <SlideoutMenu.Content>
                                                    <div className="flex flex-col gap-4">
                                                        <Input
                                                            label="Customer Name"
                                                            placeholder="Search by Name"
                                                            value={tempFilters.customerName}
                                                            onChange={(value) => setTempFilters((prev) => ({ ...prev, customerName: value }))}
                                                        />
                                                        <Input
                                                            label="Customer ID"
                                                            placeholder="Search by ID"
                                                            value={tempFilters.customerId}
                                                            onChange={(value) => setTempFilters((prev) => ({ ...prev, customerId: value }))}
                                                        />
                                                        <Input
                                                            label="Contact Info"
                                                            placeholder="Search by Contact"
                                                            value={tempFilters.contactInfo}
                                                            onChange={(value) => setTempFilters((prev) => ({ ...prev, contactInfo: value }))}
                                                        />
                                                        <Input
                                                            label="Travel Date"
                                                            placeholder="Search by Travel Date"
                                                            value={tempFilters.travelDate}
                                                            onChange={(value) => setTempFilters((prev) => ({ ...prev, travelDate: value }))}
                                                        />
                                                        <Input
                                                            label="Booking Date"
                                                            placeholder="Search by Booking Date"
                                                            value={tempFilters.bookingDate}
                                                            onChange={(value) => setTempFilters((prev) => ({ ...prev, bookingDate: value }))}
                                                        />
                                                        <Input
                                                            label="Home Location"
                                                            placeholder="Search by Home Location"
                                                            value={tempFilters.homelocation}
                                                            onChange={(value) => setTempFilters((prev) => ({ ...prev, homelocation: value }))}
                                                        />
                                                        <Input
                                                            label="Travel Location"
                                                            placeholder="Search by Travel Location"
                                                            value={tempFilters.travellocation}
                                                            onChange={(value) => setTempFilters((prev) => ({ ...prev, travellocation: value }))}
                                                        />
                                                        <Input
                                                            label="Amount"
                                                            placeholder="Search by Amount"
                                                            value={tempFilters.amount}
                                                            onChange={(value) => setTempFilters((prev) => ({ ...prev, amount: value }))}
                                                        />
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
                                    className="px-3"
                                    tooltip="Reset Filters"
                                    isDisabled={!isFilterActive}
                                />
                            </div>
                        </div>
                            <div className="flex flex-wrap gap-2">
                                {Object.entries(filters).map(([key, value]) => {
                                    if (!value) return null;
                                    let label = key;
                                    
                                    if (key === "customerName") label = "Name";
                                    if (key === "customerId") label = "ID";
                                    if (key === "contactInfo") label = "Contact";
                                    if (key === "travelDate") label = "Travel Date";
                                    if (key === "bookingDate") label = "Booking Date";
                                    if (key === "homelocation") label = "Home Loc";
                                    if (key === "travellocation") label = "Travel Loc";
                                    if (key === "amount") label = "Amount";

                                    return (
                                        <BadgeWithButton key={key} onButtonClick={() => handleRemoveFilter(key)}>
                                            <span className="font-medium text-gray-500 mr-1">{label}:</span>
                                            <span className="font-semibold text-brand-700">{value}</span>
                                        </BadgeWithButton>
                                    );
                                })}
                            </div>
                    </div>

                    <StickyTable ariaLabel="Cab Booking list" columns={columns} items={filteredItems} availableWidth={availableWidth}>
                        {(item) => (
                            <Table.Row id={item.customerId} columns={columns}>
                                {(column) => (
                                    <Table.Cell className={column.id === "actions" ? "whitespace-nowrap" : "whitespace-normal break-words"}>
                                        {column.id === "index" ? (
                                            <span className="text-sm text-tertiary">{indexById.get(item.customerId) ?? "—"}</span>
                                        ) : column.id === "customerId" ? (
                                            <span className="text-sm text-tertiary">{item.customerId}</span>
                                        ) : column.id === "customerName" ? (
                                            <span className="text-sm text-tertiary">{item.customerName}</span>
                                        ) : column.id === "contactInfo" ? (
                                            <span className="text-sm whitespace-pre-line text-tertiary">{item.contactInfo}</span>
                                        ) : column.id === "travelDate" ? (
                                            <span className="text-sm text-tertiary">{item.travelDate}</span>
                                        ) : column.id === "bookingDate" ? (
                                            <span className="text-sm text-tertiary">{item.bookingDate}</span>
                                        ) : column.id === "homelocation" ? (
                                            <span className="text-sm text-tertiary">{item.homelocation}</span>
                                        ) : column.id === "travellocation" ? (
                                            <span className="text-sm text-tertiary">{item.travellocation}</span>
                                        ) : column.id === "amount" ? (
                                            <span className="text-sm text-tertiary">{item.amount}</span>
                                        ) : (
                                            <div className="flex w-full items-center justify-end gap-1.5">
                                                <ButtonUtility
                                                    tooltip="View"
                                                    tooltipPlacement="bottom"
                                                    icon={Eye}
                                                    onClick={() => navigate(`/bookings/cabbooking/view/${item.customerId}`)}
                                                    color="secondary"
                                                    size="sm"
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
                                                />
                                            </div>
                                        )}
                                    </Table.Cell>
                                )}
                            </Table.Row>
                        )}
                    </StickyTable>
                </TableCard.Root>
            </div>

            <ModalOverlay isOpen={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
                <Modal>
                    <Dialog>
                        {({ close }) => (
                            <div className="relative w-full rounded-xl bg-primary p-5 ring-1 ring-secondary">
                                <CloseButton onPress={close} className="absolute right-4 top-4" size="sm" />
                                <div className="space-y-4">
                                    <div className="space-y-1">
                                        <h2 className="text-lg font-semibold text-primary">Delete Cab Booking</h2>
                                        <p className="text-sm text-tertiary">
                                            Are you sure you want to delete "{deleteTarget?.customerName}"? This action cannot be undone.
                                        </p>
                                    </div>
                                    <div className="flex justify-end gap-3">
                                        <Button color="secondary" onClick={close}>
                                            Cancel
                                        </Button>
                                        <Button color="primary-destructive" onClick={handleDelete}>
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </Dialog>
                </Modal>
            </ModalOverlay>
        </DefaultLayout>
    );
}
