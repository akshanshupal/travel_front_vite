import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Button } from "@/components/base/buttons/button";
import { LoadingIndicator } from "@/components/application/loading-indicator/loading-indicator";
import { CustomBreadscrumbs } from "@/components/application/breadcrumbs/custom-breadcrumbs";
import { getPackageVoucherById } from "@/utils/services/packageVoucherService";
import { getAssignmentById } from "@/utils/services/assignmentService";
import { getpayment } from "@/utils/services/paymentService";
import { useStoreSnackbar } from "@/store/snackbar";
import { DefaultLayout } from "@/layouts/DefaultLayout";
import { FaWhatsapp, FaCopy } from "react-icons/fa6";
import { Input } from "@/components/base/input/input";
import { TextArea } from "@/components/base/textarea/textarea";
import Tmodal from "@/components/utils/Tmodal";
import { ButtonUtility } from "@/components/base/buttons/button-utility";

export default function PaymentLinkView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showSnackbar } = useStoreSnackbar();

  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [bookingCards, setBookingCards] = useState<any[]>([]);
  const [assignment, setAssignment] = useState<any>(null);
  const [payments, setPayments] = useState<any[]>([]);
  const [isWhatsappModalOpen, setIsWhatsappModalOpen] = useState(false);
  const [whatsappPhone, setWhatsappPhone] = useState("");
  const [whatsappPhoneError, setWhatsappPhoneError] = useState("");
  const [whatsappMessage, setWhatsappMessage] = useState("");

  const parseBookingCardsFromHtml = (html: string) => {
    if (!html) return [];
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    let cardsContainer: Element | null = null;
    const hintParagraphs = Array.from(doc.querySelectorAll("p"));
    const dragHint = hintParagraphs.find((p) =>
      String(p.textContent || "").toLowerCase().includes("drag and drop a booking card")
    );
    if (dragHint?.nextElementSibling && dragHint.nextElementSibling.classList.contains("space-y-4")) {
      cardsContainer = dragHint.nextElementSibling;
    }
    if (!cardsContainer) {
      cardsContainer =
        Array.from(doc.querySelectorAll("div.space-y-4")).find((node) =>
          Array.from(node.children).some((child) =>
            child.className.includes("rounded-lg") || child.className.includes("border")
          )
        ) || null;
    }
    if (!cardsContainer) return [];

    const cards = Array.from(cardsContainer.children).filter((node) => node.tagName.toLowerCase() === "div");
    return cards.map((card, index) => {
      const titleNode = card.querySelector(".bg-gray-50 .text-gray-800");
      const dateNode = card.querySelector(".bg-gray-50 .text-xs");
      const title = String(titleNode?.textContent || "").replace("⋮⋮", "").trim() || `Booking ${index + 1}`;
      const dateRange = String(dateNode?.textContent || "").trim();
      return {
        id: String(card.getAttribute("data-booking-id") || `${index}`),
        title,
        dateRange,
        html: card.outerHTML,
      };
    });
  };

  const buildVoucherWhatsappMessage = (clientName?: string, card?: any) => {
    let detailsText = "";
    if (card && card.html) {
      try {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = card.html;
        tempDiv.style.position = "absolute";
        tempDiv.style.left = "-9999px";
        document.body.appendChild(tempDiv);

        const dragHandles = tempDiv.querySelectorAll('.cursor-grab');
        dragHandles.forEach(el => el.remove());

        detailsText = tempDiv.innerText.replace(/\n\s*\n/g, '\n').trim();
        document.body.removeChild(tempDiv);
      } catch (e) {
        detailsText = `${card.title}\n${card.dateRange}`;
      }
    }

    return [
      `Hello ${clientName || "Traveler"},`,
      "",
      `🧾 *BOOKING DETAILS*`,
      "",
      detailsText,
      "",
      "☎️ *Need Help?*",
      "If you need any help, feel free to reply to this message.",
    ].join("\n");
  };

  const validateWhatsappPhone = (value: string) => {
    const raw = String(value || "").trim();
    if (!raw) return "WhatsApp number is required";
    const digits = raw.replace(/\D/g, "");
    if (digits.length < 10 || digits.length > 15) return "Enter a valid mobile number";
    return "";
  };

  const openWhatsAppModal = async (card: any) => {
    if (!data?.assignmentId) return;
    try {
      const assignmentId = typeof data.assignmentId === 'object' ? (data.assignmentId as any)._id || (data.assignmentId as any).id : data.assignmentId;
      const response: any = await getAssignmentById(assignmentId);
      if (response) {
        const resolved = response?.data ?? response;
        const clientName = resolved?.clientName;
        setWhatsappPhone(String(resolved?.mobile || ""));
        setWhatsappPhoneError("");
        setWhatsappMessage(buildVoucherWhatsappMessage(clientName, card));
        setIsWhatsappModalOpen(true);
      }
    } catch (error) {
      console.error(error);
      showSnackbar({
        description: "Failed to fetch client details for WhatsApp",
        title: "Error",
        color: "danger",
      });
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

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      setIsLoading(true);
      try {
        const response = await getPackageVoucherById(id);
        setData(response || null);
        if (response?.innerHtml) setBookingCards(parseBookingCardsFromHtml(response.innerHtml));
        const assignmentId = getAssignmentId(response?.assignmentId);
        if (assignmentId) {
          const [assignmentResponse, paymentResponse]: any[] = await Promise.all([
            getAssignmentById(assignmentId),
            getpayment({ assignment: assignmentId, paymentType: "Cr", limit: 100 }),
          ]);
          setAssignment(assignmentResponse?.data ?? assignmentResponse);
          setPayments(Array.isArray(paymentResponse) ? paymentResponse : (paymentResponse?.data || []));
        }
      } catch (error: any) {
        showSnackbar({
          description: error.message,
          title: "Invalid Input",
          color: "danger",
        });
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id, showSnackbar]);

  const toAmount = (value: any) => {
    const amount = Number(String(value ?? "").replace(/,/g, "").replace(/%/g, ""));
    return Number.isFinite(amount) ? amount : 0;
  };

  const usesSeparatedPackageCost = assignment?.landPackageAmount !== undefined && assignment?.landPackageAmount !== null;
  const packageCost = usesSeparatedPackageCost
    ? toAmount(assignment?.landPackageAmount) + toAmount(assignment?.transportPackageAmount)
    : toAmount(assignment?.packageCost);
  const packageCostWithGst = usesSeparatedPackageCost
    ? packageCost + toAmount(assignment?.landPackageGstAmount) + toAmount(assignment?.transportPackageGstAmount)
    : packageCost + (packageCost * toAmount(assignment?.taxes) / 100);
  const paymentReceived = payments.reduce((total, payment) => total + toAmount(payment?.amount), 0);
  const amountDue = Math.max(0, packageCostWithGst - paymentReceived);

  const replaceClientName = (content: string) => {
    const replacedContent = content?.replace(
      /\[\{CLIENT_NAME\}\]|\{CLIENT_NAME\}/g,
      "Guest"
    )?.replace(/\{|\}/g, "");

    if (!replacedContent || typeof DOMParser === "undefined") return replacedContent;

    const document = new DOMParser().parseFromString(replacedContent, "text/html");
    const formatAmount = (amount: number) => `₹ ${amount.toLocaleString("en-IN")}`;
    const updateSummaryValue = (label: string, amount: number) => {
      const labels = Array.from(document.querySelectorAll("th, td, div"))
        .filter((node) => node.children.length === 0 && String(node.textContent || "").trim().toLowerCase() === label.toLowerCase());
      labels.forEach((labelNode) => {
        const row = labelNode.closest("tr");
        const rowCells = row ? Array.from(row.querySelectorAll(":scope > th, :scope > td")) : [];
        const valueNode = rowCells[rowCells.length - 1] || labelNode.parentElement?.lastElementChild;
        if (valueNode && valueNode !== labelNode) valueNode.textContent = formatAmount(amount);
      });
    };
    if (assignment) {
      updateSummaryValue("Package Cost", packageCost);
      updateSummaryValue("Package Cost with GST", packageCostWithGst);
      updateSummaryValue("Payment Received", paymentReceived);
      updateSummaryValue("Amount Due", amountDue);
    }
    const headings = Array.from(document.querySelectorAll("h1, h2, h3, h4, h5, h6, th, div, p"));

    headings
      .filter((node) => String(node.textContent || "").trim().toLowerCase() === "payment history")
      .forEach((heading) => {
        const table = heading.closest("table") || heading.parentElement?.querySelector("table");
        const body = table?.querySelector("tbody");
        if (!body) return;

        const rows = Array.from(body.querySelectorAll(":scope > tr")) as HTMLTableRowElement[];
        rows.sort((first, second) => {
          const firstDate = new Date(String(first.cells[0]?.textContent || "").trim()).getTime();
          const secondDate = new Date(String(second.cells[0]?.textContent || "").trim()).getTime();
          return (Number.isNaN(firstDate) ? Number.MAX_SAFE_INTEGER : firstDate) -
            (Number.isNaN(secondDate) ? Number.MAX_SAFE_INTEGER : secondDate);
        });
        rows.forEach((row) => body.appendChild(row));
      });

    return document.body.innerHTML;
  };

  const getAssignmentId = (assignmentId: any) => {
    if (!assignmentId) return "";
    return typeof assignmentId === 'object' ? (assignmentId._id || assignmentId.id) : assignmentId;
  };

  const breadcrumbsList = [
    { label: "Bookings", link: "/bookings/booking" },
    { label: "Payment", link: "/bookings/payment" },
    { label: "Payment Link List", link: data?.assignmentId ? `/bookings/payment/payment-link/${getAssignmentId(data.assignmentId)}` : undefined },
    { label: "View" },
  ];

  return (
    <DefaultLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-4">
          <CustomBreadscrumbs list={breadcrumbsList} />
        </div>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden p-8">
          {/* <h5 className="text-lg font-semibold mb-4 text-gray-900">View Payment Link detail</h5> */}
          {isLoading && (
            <div className="text-center">
              <LoadingIndicator />
            </div>
          )}

          {!isLoading && data && (
            <div className="pt-4">
              {bookingCards.length > 0 && (
                <div className="mb-4 border border-gray-200 rounded-lg p-4">
                  <p className="text-sm font-semibold text-gray-800 mb-3">Booking Cards</p>
                  <div className="space-y-2">
                    {bookingCards.map((card) => (
                      <div
                        key={card.id}
                        className="border rounded-md px-3 py-2 bg-white flex justify-between items-center border-gray-200"
                      >
                        <span className="text-sm text-gray-800 flex items-center gap-2">
                          {card.title}
                        </span>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-gray-500">{card.dateRange || "-"}</span>
                          <ButtonUtility
                            icon={FaWhatsapp}
                            size="sm"
                            color="success"
                            tooltip="Send Details on WhatsApp"
                            onClick={(e: any) => {
                              e.stopPropagation();
                              openWhatsAppModal(card);
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div
                className="text-gray-900"
                dangerouslySetInnerHTML={{
                  __html: replaceClientName(data.innerHtml),
                }}
              ></div>

              <div className="pt-4 flex gap-4 border-t mt-8">
                <Button
                  color="secondary"
                  size="sm"
                  onClick={() => navigate(`/bookings/payment/payment-link/${getAssignmentId(data?.assignmentId)}`)}
                >
                  Back
                </Button>
                <Button
                  color="primary"
                  size="sm"
                  onClick={() => navigate(`/bookings/payment/payment-link/edit/${id}`)}
                >
                  Edit
                </Button>

              </div>
            </div>
          )}
        </div>
      </div>

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
    </DefaultLayout>
  );
}
