import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate, useSearchParams } from "react-router";
import {
  FaSearchengin,
  FaRotateRight,
  FaEye,
  FaPen,
  FaTrashCan,
  FaWhatsapp,
  FaCopy
} from "react-icons/fa6";
import { BiMailSend } from "react-icons/bi";

import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { TextArea } from "@/components/base/textarea/textarea";
import { Select } from "@/components/base/select/select";
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
    { id: "createdAt", name: "Created Date", widthRatio: 30, minWidth: 220 },
    { id: "isDefault", name: "Is Default", widthRatio: 15, minWidth: 120 },
    { id: "status", name: "Status", widthRatio: 10, minWidth: 100 },
    { id: "actions", name: "Actions", widthRatio: 20, minWidth: 140 },
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
  const [isWhatsappModalOpen, setIsWhatsappModalOpen] = useState(false);
  const [whatsappPhone, setWhatsappPhone] = useState("");
  const [whatsappPhoneError, setWhatsappPhoneError] = useState("");
  const [whatsappMessage, setWhatsappMessage] = useState("");

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

  const formatCreatedAt = (value?: string) => {
    if (!value) return "-";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "-";
    const datePart = new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "2-digit",
    }).format(date);
    const timePart = new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
      .format(date)
      .toLowerCase();
    return `${datePart}, ${timePart}`;
  };

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

  const buildVoucherWhatsappMessage = (clientName?: string, voucherLink?: string) => {
    return [
      `Hello ${clientName || "Traveler"},`,
      "",
      "🧾 *YOUR PACKAGE VOUCHER*",
      "",
      "Thank you for booking with *Tripzipper*.",
      "",
      "We are excited to share your package booking voucher with you.",
      "Click below to view your complete booking details and get ready for your trip.",
      "",
      "🔗 *Click here to View Package Voucher*",
      `${voucherLink || "N/A"}`,
      "",
      "☎️ *Need Help?*",
      "If you need any help, feel free to reply to this message.",
      "",
      "✨ Have a wonderful trip!",
    ].join("\n");
  };

  const getPublicVoucherLink = (assignmentId: string) => {
    const path = `/package-voucher/${assignmentId}`;
    if (typeof window === "undefined") return `https://admin.tripzipper.co.in${path}`;
    const host = window.location.hostname;
    if (host === "localhost" || host === "127.0.0.1") {
      return `https://admin.tripzipper.co.in${path}`;
    }
    return `${window.location.origin}${path}`;
  };

  const validateWhatsappPhone = (value: string) => {
    const raw = String(value || "").trim();
    if (!raw) return "WhatsApp number is required";
    const digits = raw.replace(/\D/g, "");
    if (digits.length < 10 || digits.length > 15) return "Enter a valid mobile number";
    return "";
  };

  const openWhatsAppModal = async (item: any) => {
    if (!item || !item.assignmentId) return;
    try {
      const assignmentId = typeof item.assignmentId === 'object' ? (item.assignmentId._id || item.assignmentId.id) : item.assignmentId;
      const response: any = await getAssignmentById(assignmentId);
      if (response) {
        const resolved = response?.data ?? response;
        const clientName = resolved?.clientName;
        const voucherLink = getPublicVoucherLink(assignmentId);
        setWhatsappPhone(String(resolved?.mobile || ""));
        setWhatsappPhoneError("");
        setWhatsappMessage(buildVoucherWhatsappMessage(clientName, voucherLink));
        setIsWhatsappModalOpen(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const sendWhatsAppMessage = () => {
    const validationMessage = validateWhatsappPhone(whatsappPhone);
    if (validationMessage) {
      setWhatsappPhoneError(validationMessage);
      showSnackbar({
        description: validationMessage,
        title: "Cannot Send WhatsApp",
        color: "danger",
      });
      return;
    }
    const phoneNumber = String(whatsappPhone || "").replace(/\D/g, "");
    setWhatsappPhoneError("");
    if (!whatsappMessage.trim()) {
      showSnackbar({
        description: "WhatsApp message is empty",
        title: "Cannot Send WhatsApp",
        color: "danger",
      });
      return;
    }
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, "_blank");
    setIsWhatsappModalOpen(false);
  };

  const copyWhatsAppMessage = async () => {
    try {
      const message = String(whatsappMessage || "").trim();
      if (!String(message || "").trim()) {
        showSnackbar({
          description: "WhatsApp message is empty",
          title: "Cannot Copy Message",
          color: "danger",
        });
        return;
      }
      await navigator.clipboard.writeText(message);
      showSnackbar({
        description: "WhatsApp message copied",
        title: "Copied",
        color: "success",
      });
    } catch (error: any) {
      showSnackbar({
        description: error?.message || "Failed to copy WhatsApp message",
        title: "Copy Failed",
        color: "danger",
      });
    }
  };

  const handleOpenMailModal = async (item: any) => {
    await getAssignmentData(item);
    setIsMailModalOpen(true);
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

            <div className="w-full max-w-full">
                <StickyTable ariaLabel="Package Voucher List" columns={columns} items={data} availableWidth={availableWidth}>
                    {(item) => (
                        <Table.Row key={item.id}>
                            <Table.Cell data-column="index" className="whitespace-nowrap px-4 py-3">
                                {(page - 1) * limit + data.indexOf(item) + 1}
                            </Table.Cell>
                            <Table.Cell data-column="packageId" className="whitespace-nowrap px-4 py-3">
                                {item.assignmentId?.packageId || "-"}
                            </Table.Cell>
                            <Table.Cell data-column="createdAt" className="px-4 py-3">
                                <div className="text-sm text-tertiary">
                                {formatCreatedAt(item.createdAt)}
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
                                    {Boolean(item.isDefault && item.status) && (
                                        <>
                                            <ButtonUtility
                                                icon={BiMailSend}
                                                size="sm"
                                                color="brand"
                                                tooltip="Send Voucher Mail"
                                                onClick={() => handleOpenMailModal(item)}
                                            />
                                            <ButtonUtility
                                                icon={FaWhatsapp}
                                                size="sm"
                                                color="success"
                                                tooltip="Send Voucher on WhatsApp"
                                                onClick={() => openWhatsAppModal(item)}
                                            />
                                        </>
                                    )}
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
            </div>

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

          <Tmodal
            isOpen={isWhatsappModalOpen}
            size="lg"
            onClose={() => setIsWhatsappModalOpen(false)}
            header="Send WhatsApp"
            footerActions={
              <div className="flex items-center gap-2">
                <Button color="secondary" iconLeading={FaCopy} onClick={copyWhatsAppMessage}>
                  Copy Message
                </Button>
                <Button color="primary" onClick={sendWhatsAppMessage}>
                  Send
                </Button>
              </div>
            }
            content={
              <div className="space-y-4">
                <Input
                  label="WhatsApp Number"
                  value={whatsappPhone}
                  onChange={(value) => {
                    setWhatsappPhone(value);
                    if (whatsappPhoneError) {
                      setWhatsappPhoneError(validateWhatsappPhone(value));
                    }
                  }}
                  placeholder="Enter mobile number"
                  isInvalid={!!whatsappPhoneError}
                  hint={whatsappPhoneError}
                />
                <div className="text-xs text-tertiary">
                  Default number is prefilled from customer mobile. You can edit before sending.
                </div>
                <TextArea
                  label="Message Preview"
                  value={whatsappMessage}
                  onChange={(value) => setWhatsappMessage(String(value))}
                  rows={8}
                />
              </div>
            }
          />
        </div>
    </DefaultLayout>
  );
}
