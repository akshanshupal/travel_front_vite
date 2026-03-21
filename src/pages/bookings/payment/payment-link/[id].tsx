import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate, useSearchParams } from "react-router";
import {
  FaSearchengin,
  FaRotateRight,
  FaEye,
  FaPen,
  FaTrashCan,
  FaWhatsapp
} from "react-icons/fa6";
import { CiMenuKebab } from "react-icons/ci";
import { BiMailSend } from "react-icons/bi";

import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Select } from "@/components/base/select/select";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { PaginationButtonGroup } from "@/components/application/pagination/pagination";
import Tmodal from "@/components/utils/Tmodal";
import MailConfirmation from "@/components/application/mail-confirmation/mail-confirmation";
import { useStoreSnackbar } from "@/store/snackbar";
import { StickyTable, Table, TableCard } from "@/components/application/table/table";
import { useAvailableTableWidth } from "@/hooks/use-available-table-width";
import { Badge } from "@/components/base/badges/badges";
import { CustomBreadscrumbs } from "@/components/application/breadcrumbs/custom-breadcrumbs";

import {
  getPackageVoucher,
  getPackageVoucherDelete,
  updatePackageVoucherById
} from "@/utils/services/packageVoucherService";
import { getAssignmentById } from "@/utils/services/assignmentService";
import { DefaultLayout } from "@/layouts/DefaultLayout";

const columns = [
    { id: "index", name: "S. No.", isRowHeader: true, widthRatio: 5, minWidth: 50 },
    { id: "packageId", name: "Package ID", widthRatio: 20, minWidth: 120 },
    { id: "createdAt", name: "Created Date", widthRatio: 25, minWidth: 140 },
    { id: "isDefault", name: "Is Default", widthRatio: 20, minWidth: 100 },
    { id: "status", name: "Status", widthRatio: 15, minWidth: 80 },
    { id: "actions", name: "Actions", widthRatio: 15, minWidth: 100 },
] as { id: string; name: string; isRowHeader?: boolean; className?: string; widthRatio?: number; minWidth?: number }[];

export default function PaymentLink() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { showSnackbar } = useStoreSnackbar();
  const availableWidth = useAvailableTableWidth();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [packageVoucher, setPackageVoucher] = useState<any>({});
  
  // Modals
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isMailModalOpen, setIsMailModalOpen] = useState(false);

  const [filters, setFilters] = useState({
    createdAt: searchParams.get("createdAt") || "",
    isDefault: searchParams.get("isDefault") || "",
    status: searchParams.get("status") || "",
  });

  const [debouncedFilters, setDebouncedFilters] = useState(filters);
  const [isFilterActive, setIsFilterActive] = useState(false);

  const statusColorMap: Record<string, "success" | "error" | "warning" | "gray" | "primary" | "secondary"> = {
    true: "primary",
    false: "secondary",
  };

  const breadcrumbsList = [
    { label: "Bookings", link: "/bookings/booking" },
    { label: "Payment", link: "/bookings/payment" },
    { label: "Payment Link" },
  ];

  // Sync filters with URL and debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFilters(filters);
      setPage(1);
    }, 1000);

    return () => clearTimeout(handler);
  }, [filters]);

  useEffect(() => {
    const params: Record<string, string> = {};
    if (debouncedFilters.createdAt) params.createdAt = debouncedFilters.createdAt;
    if (debouncedFilters.isDefault) params.isDefault = debouncedFilters.isDefault;
    if (debouncedFilters.status) params.status = debouncedFilters.status;
    
    setSearchParams(params);

    if (Object.values(debouncedFilters).some(Boolean)) {
      setIsFilterActive(true);
    } else {
      setIsFilterActive(false);
    }
  }, [debouncedFilters, setSearchParams]);

  const handleInputChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleDefaultChange = async (selectedItem: any) => {
    // Optimistic update
    setData((prevData) =>
      prevData.map((item) =>
        item.id === selectedItem.id
          ? { ...item, isDefault: true }
          : { ...item, isDefault: false }
      )
    );

    try {
      const response = await updatePackageVoucherById(selectedItem.id, { isDefault: !selectedItem.isDefault });
      
      setData((prevData) =>
        prevData.map((item) =>
            item.id === selectedItem.id ? { ...item, ...response.data, isDefault: !selectedItem.isDefault } : { ...item, isDefault: false }
        )
      );
      
      showSnackbar({
        description: "Default updated successfully",
        title: "Success",
        color: "success",
      });

    } catch (error: any) {
      showSnackbar({
        description: error.message,
        title: "Update Failed",
        color: "danger",
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      setIsLoading(true);

      const params: any = {
        totalCount: true,
        page: page,
        limit: limit,
        assignmentId: id,
        populate: "assignmentId",
        select_assignmentId: "packageId"
      };

      if (debouncedFilters.status) params.status = debouncedFilters.status;
      if (debouncedFilters.createdAt) params.createdAt = debouncedFilters.createdAt;
      if (debouncedFilters.isDefault) params.isDefault = debouncedFilters.isDefault;

      try {
        const response: any = await getPackageVoucher(params);
        setData(response?.data || []);
        setTotalRecords(response?.totalCount || 0);
      } catch (error: any) {
        showSnackbar({
          description: error.message,
          title: "Invalid Input",
          color: "danger",
        });
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [page, limit, debouncedFilters, id, showSnackbar]);

  const dateTimeFormatter = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  const getAssignmentData = async (item: any) => {
    if (!item || !item.assignmentId) return;
    try {
      const assignmentId = typeof item.assignmentId === 'object' ? (item.assignmentId._id || item.assignmentId.id) : item.assignmentId;
      const response: any = await getAssignmentById(assignmentId);
      if (response) {
        item.email = response?.email;
        setPackageVoucher(item);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (!selectedId) return;
    try {
      const response = await getPackageVoucherDelete(selectedId);
      if (response) {
        showSnackbar({
          description: "Package Voucher Deleted successfully",
          title: "Success",
          color: "success",
        });

        setData((prev) => prev.filter((item) => item.id !== selectedId));
        setTotalRecords((prev) => prev - 1);
        setSelectedId(null);
      }
    } catch (error: any) {
      console.error("Failed to delete:", error);
      showSnackbar({
        description: error.message,
        title: "Delete Failed",
        color: "danger",
        type: "error" // Ensure type is supported if needed, or fallback to color
      } as any);
    }
    setIsDeleteModalOpen(false);
  };

  const sendWhatsAppMessage = async (item: any) => {
    if (!item || !item.assignmentId) return;
    try {
      const assignmentId = typeof item.assignmentId === 'object' ? (item.assignmentId._id || item.assignmentId.id) : item.assignmentId;
      const response: any = await getAssignmentById(assignmentId);
      if (response) {
        const phoneNumber = response?.mobile;
        const clientName = response?.clientName;
        const voucherLink = `${window.location.origin}/package-voucher/${id}`;
        const message = `Hello, ${clientName}, 
                         Thank you for choosing us! 🎉  
                         Here is your exclusive voucher:  ${voucherLink} 
                         If you have any questions, feel free to reach out.  
                         Enjoy your experience!`;

        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, "_blank");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DefaultLayout>
        <div className="flex flex-col gap-4" style={{ width: availableWidth }}>
          <CustomBreadscrumbs list={breadcrumbsList} />

          <div className="flex gap-4 justify-end">
            <div>
              <a href={`/package-voucher/${id}`} target="_blank" rel="noreferrer">
                <Button color="primary" size="sm">
                  View Package Voucher
                </Button>
              </a>
            </div>
            <div>
              <Button
                color="primary"
                size="sm"
                onClick={() => navigate(`/bookings/generatePayment/${id}`)}
              >
                Generate Voucher
              </Button>
            </div>
            <div>
              <Dropdown.Root>
                <Button size="sm" color="secondary" className="px-2">
                  <CiMenuKebab />
                </Button>
                <Dropdown.Popover>
                  <Dropdown.Menu>
                      <Dropdown.Item
                        icon={BiMailSend}
                        onAction={() => {
                            const defaultAssignment = Array.isArray(data)
                            ? data.find(item => item.isDefault === true)
                            : (data as any).isDefault ? data : null;
                            
                            if (defaultAssignment) {
                                getAssignmentData(defaultAssignment);
                                setIsMailModalOpen(true);
                            }
                        }}
                      >
                        Send Mail
                      </Dropdown.Item>
                      <Dropdown.Item
                        icon={FaWhatsapp}
                        onAction={() => {
                            const defaultAssignment = Array.isArray(data)
                            ? data.find(item => item.isDefault === true)
                            : (data as any).isDefault ? data : null;
                            
                            if (defaultAssignment) {
                                sendWhatsAppMessage(defaultAssignment);
                            }
                        }}
                      >
                        Send Whatsapp
                      </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown.Root>
            </div>
          </div>

          <TableCard.Root>
            <TableCard.Header
                title="Package Voucher List"
                badge={isLoading ? "..." : totalRecords}
                contentTrailing={
                    <div className="flex flex-col gap-2 md:flex-row md:items-center">
                        <Select
                            aria-label="Rows per page"
                            className="w-full md:w-32"
                            selectedKey={String(limit)}
                            onSelectionChange={(key) => {
                                setLimit(Number(key));
                                setPage(1);
                            }}
                            items={[
                                { id: "10", label: "10 / page" },
                                { id: "25", label: "25 / page" },
                                { id: "50", label: "50 / page" },
                                { id: "100", label: "100 / page" },
                            ]}
                        >
                            {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                        </Select>
                    </div>
                }
            />

            <div className="grid grid-cols-1 gap-3 border-b border-secondary bg-primary px-4 py-4 md:grid-cols-4 md:px-6">
                <Input
                    placeholder="Search by Date"
                    value={filters.createdAt}
                    onChange={(value) => handleInputChange("createdAt", value)}
                    icon={FaSearchengin}
                />
                <Select
                    aria-label="Default"
                    selectedKey={filters.isDefault}
                    onSelectionChange={(key) => handleInputChange("isDefault", String(key))}
                    placeholder="Default"
                    items={[
                        { id: "", label: "All" },
                        { id: "true", label: "Active" },
                        { id: "false", label: "Inactive" },
                    ]}
                >
                    {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                </Select>
                <Select
                    aria-label="Status"
                    selectedKey={filters.status}
                    onSelectionChange={(key) => handleInputChange("status", String(key))}
                    placeholder="Status"
                    items={[
                        { id: "", label: "All" },
                        { id: "true", label: "Active" },
                        { id: "false", label: "Inactive" },
                    ]}
                >
                    {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                </Select>
                <div className="flex items-center">
                     <Button
                        isDisabled={!isFilterActive}
                        size="sm"
                        color="primary"
                        onClick={() => handleInputChange("reset", "true")}
                     >
                        <FaRotateRight />
                     </Button>
                </div>
            </div>

            <StickyTable ariaLabel="Package Voucher List" columns={columns} items={data}>
                {(item) => (
                    <Table.Row key={item.id}>
                        <Table.Cell data-column="index" className="whitespace-nowrap px-4 py-3">
                            {(page - 1) * limit + data.indexOf(item) + 1}
                        </Table.Cell>
                        <Table.Cell data-column="packageId" className="whitespace-nowrap px-4 py-3">
                            {item.assignmentId?.packageId || "-"}
                        </Table.Cell>
                        <Table.Cell data-column="createdAt" className="whitespace-nowrap px-4 py-3">
                            <div className="cursor-pointer hover:underline line-clamp-3">
                            {item.createdAt ? dateTimeFormatter.format(new Date(item.createdAt)) : "-"}
                            </div>
                        </Table.Cell>
                        <Table.Cell data-column="isDefault" className="whitespace-nowrap px-4 py-3">
                            <Button
                                size="sm"
                                color={statusColorMap[String(item.isDefault)] as any || "secondary"}
                                disabled={item.isDefault}
                                onClick={() => handleDefaultChange(item)}
                                className="h-6 w-20 text-xs"
                            >
                                {item.isDefault ? "Active" : "Set Default"}
                            </Button>
                        </Table.Cell>
                        <Table.Cell data-column="status" className="whitespace-nowrap px-4 py-3">
                            <Badge size="sm" color={item.status ? "success" : "error"}>
                                 {item.status ? "Active" : "Inactive"}
                            </Badge>
                        </Table.Cell>
                        <Table.Cell data-column="actions" className="whitespace-nowrap px-4 py-3">
                            <div className="flex items-center gap-2">
                                <Link to={`/bookings/payment/payment-link/view/${item.id}`} className="text-gray-500 hover:text-primary">
                                    <ButtonUtility icon={FaEye} size="sm" color="secondary" tooltip="View" />
                                </Link>
                                <Link to={`/bookings/payment/payment-link/edit/${item.id}`} className="text-gray-500 hover:text-primary">
                                    <ButtonUtility icon={FaPen} size="sm" color="secondary" tooltip="Edit" />
                                </Link>
                                <ButtonUtility
                                    icon={FaTrashCan}
                                    size="sm"
                                    color="error"
                                    tooltip="Delete"
                                    onClick={() => {
                                        setSelectedId(item.id);
                                        setIsDeleteModalOpen(true);
                                    }}
                                />
                            </div>
                        </Table.Cell>
                    </Table.Row>
                )}
            </StickyTable>

            <PaginationButtonGroup
                page={page}
                total={Math.ceil(totalRecords / limit)}
                onPageChange={(p) => setPage(p)}
                align="center"
                className="py-4"
            />
          </TableCard.Root>

          <Tmodal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={handleDelete}
            header="Confirm Deletion"
            content={`<p>Are you sure you want to delete this item?</p>`}
          />

          <Tmodal
            isOpen={isMailModalOpen}
            onClose={() => setIsMailModalOpen(false)}
            header="Send Email"
            content={
                 <MailConfirmation
                    selectedId={packageVoucher?.id}
                    email={packageVoucher?.email}
                    header="Send Voucher Mail"
                    showPreview={true}
                    modalClose={() => setIsMailModalOpen(false)}
                    sendMailFnName="sendVoucherMail"
                 />
            }
          />
        </div>
    </DefaultLayout>
  );
}
