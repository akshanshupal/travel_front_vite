import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Button } from "@/components/base/buttons/button";
import { Select } from "@/components/base/select/select";
import { Label } from "@/components/base/input/label";
import { LoadingIndicator } from "@/components/application/loading-indicator/loading-indicator";
import { CustomBreadscrumbs } from "@/components/application/breadcrumbs/custom-breadcrumbs";
import CustomEditor from "@/components/utils/CustomEditor";
import { getPackageVoucherById, updatePackageVoucherById } from "@/utils/services/packageVoucherService";
import { useStoreSnackbar } from "@/store/snackbar";
import { DefaultLayout } from "@/layouts/DefaultLayout";

type BookingCard = {
  id: string;
  title: string;
  dateRange: string;
  html: string;
};

export default function PaymentLinkEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showSnackbar } = useStoreSnackbar();

  const [formData, setFormData] = useState({
    innerHtml: "",
    assignmentId: "",
    isDefault: "",
    status: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [dirtyFields, setDirtyFields] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [bookingCards, setBookingCards] = useState<BookingCard[]>([]);
  const [draggingBookingId, setDraggingBookingId] = useState<string>("");
  const [dragOverBookingId, setDragOverBookingId] = useState<string>("");

  const parseBookingCardsFromHtml = (html: string): BookingCard[] => {
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

  const reorderCardsInHtml = (html: string, cards: BookingCard[]) => {
    if (!html || !cards.length) return html;
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
    if (!cardsContainer) return html;

    cardsContainer.innerHTML = "";
    cards.forEach((card, index) => {
      const cardDoc = parser.parseFromString(card.html, "text/html");
      const cardElement = cardDoc.body.firstElementChild;
      if (cardElement) {
        cardElement.setAttribute("data-booking-id", String(card.id || index));
        cardsContainer?.appendChild(cardElement);
      }
    });
    return doc.body.innerHTML;
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.isDefault) newErrors.isDefault = "Default selection is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        if (!id) return;
        let response = await getPackageVoucherById(id);
        if (response) {
          let htmlContent = response.innerHtml || "";
          // Ensure table has text color class for visibility
          if (htmlContent.includes('className="w-full text-sm text-left"')) {
             htmlContent = htmlContent.replace(
               'className="w-full text-sm text-left"', 
               'className="w-full text-sm text-left text-gray-800"'
             );
          }

          setFormData({
            innerHtml: htmlContent,
            assignmentId: response.assignmentId || "",
            isDefault: String(response.isDefault),
            status: String(response.status),
          });
        }
      } catch (error: any) {
        console.error("Error fetching payment link:", error);
        showSnackbar({
          description: error?.response?.data?.message || error.message || "Failed to load payment link",
          title: "Invalid Input",
          color: "danger",
        });
      } finally {
        setIsLoading(false);
      }
    };
    if (id) {
      fetchData();
    }
  }, [id, showSnackbar]);

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
    
    setDirtyFields((prev) => ({
      ...prev,
      [key]: true,
    }));

    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (dirtyFields[key]) {
        if (!value) {
          newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
        } else {
          delete newErrors[key];
        }
      }
      return newErrors;
    });
  };

  useEffect(() => {
    const cards = parseBookingCardsFromHtml(formData.innerHtml);
    setBookingCards(cards);
  }, [formData.innerHtml]);

  const handleBookingDrop = (targetBookingId: string) => {
    const sourceId = String(draggingBookingId || "");
    const targetId = String(targetBookingId || "");
    if (!sourceId || !targetId || sourceId === targetId) {
      setDraggingBookingId("");
      setDragOverBookingId("");
      return;
    }

    const list = [...bookingCards];
    const sourceIndex = list.findIndex((card) => card.id === sourceId);
    const targetIndex = list.findIndex((card) => card.id === targetId);
    if (sourceIndex < 0 || targetIndex < 0) {
      setDraggingBookingId("");
      setDragOverBookingId("");
      return;
    }
    const [moved] = list.splice(sourceIndex, 1);
    list.splice(targetIndex, 0, moved);
    setBookingCards(list);
    const updatedHtml = reorderCardsInHtml(formData.innerHtml, list);
    handleChange("innerHtml", updatedHtml);
    setDraggingBookingId("");
    setDragOverBookingId("");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setDirtyFields({
      innerHtml: true,
    });
    const isFormValid = validateForm();
    if (!isFormValid || !id) {
      return;
    }
    try {
      const updatedFormData = {
        ...formData,
        isDefault: formData.isDefault === "true",
        status: formData.status === "true",
      };
      
      const response = await updatePackageVoucherById(id, updatedFormData);
      if (response) {
        showSnackbar({
            description: "Payment link Edited successfully", 
            title: 'Success', 
            color: 'success'
        });
        const assignmentId = typeof response.assignmentId === 'object' ? (response.assignmentId._id || response.assignmentId.id) : response.assignmentId;
        navigate(`/bookings/payment/payment-link/${assignmentId}`);
      }
    } catch (error) {
      showSnackbar({
          description: "Payment link already exist", 
          title: 'Error', 
          color: 'danger'
        });
      console.log(error);
    }
  };
  
  const getAssignmentId = (assignmentId: any) => {
      if (!assignmentId) return "";
      return typeof assignmentId === 'object' ? (assignmentId._id || assignmentId.id) : assignmentId;
  };

  const breadcrumbsList = [
    { label: "Bookings", link: "/bookings/booking" },
    { label: "Payment", link: "/bookings/payment" },
    { label: "Payment Link List", link: formData.assignmentId ? `/bookings/payment/payment-link/${getAssignmentId(formData.assignmentId)}` : undefined },
    { label: "Edit" },
  ];

  if (isLoading) {
    return (
        <DefaultLayout>
             <div className="flex justify-center items-center h-full">
                <LoadingIndicator />
            </div>
        </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-4">
            <CustomBreadscrumbs list={breadcrumbsList} />
        </div>
        
        <div className="bg-white shadow-lg rounded-lg overflow-hidden p-8">
            <h5 className="text-lg font-semibold mb-4 text-gray-900">Edit Payment Link Detail</h5>
            <form onSubmit={handleSubmit}>
            <div className="pt-4 flex flex-col gap-4">
                
                <div className="">
                    {bookingCards.length > 1 && (
                      <div className="mb-4 border border-gray-200 rounded-lg p-4">
                        <p className="text-sm font-semibold text-gray-800">Reorder Booking Cards</p>
                        <p className="text-xs text-gray-500 mb-3">Drag and drop cards to change voucher order.</p>
                        <div className="space-y-2">
                          {bookingCards.map((card) => (
                            <div
                              key={card.id}
                              className={`border rounded-md px-3 py-2 bg-white flex justify-between items-center ${dragOverBookingId === card.id ? "border-blue-400 ring-1 ring-blue-200" : "border-gray-200"}`}
                              draggable
                              onDragStart={() => setDraggingBookingId(card.id)}
                              onDragOver={(event) => {
                                event.preventDefault();
                                setDragOverBookingId(card.id);
                              }}
                              onDrop={() => handleBookingDrop(card.id)}
                              onDragEnd={() => {
                                setDraggingBookingId("");
                                setDragOverBookingId("");
                              }}
                            >
                              <span className="text-sm text-gray-800 flex items-center gap-2">
                                <span className="cursor-grab text-gray-400 select-none">⋮⋮</span>
                                {card.title}
                              </span>
                              <span className="text-xs text-gray-500">{card.dateRange || "-"}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    <CustomEditor 
                        value={formData.innerHtml} 
                        onContentChange={(value) => handleChange('innerHtml', value)} 
                    />
                    {dirtyFields.innerHtml && errors.innerHtml && (
                        <p className="text-xs text-error mt-1">{errors.innerHtml}</p>
                    )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="pt-4">
                        <Label className="mb-1.5 text-gray-900">Default*</Label>
                        <Select
                            className="w-full"
                            selectedKey={formData.isDefault}
                            onSelectionChange={(key) => handleChange("isDefault", String(key))}
                            items={[
                                { id: "true", label: "Active" },
                                { id: "false", label: "Inactive" },
                            ]}
                        >
                            {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                        </Select>
                    </div>
                    <div className="pt-4">
                         <Label className="mb-1.5 text-gray-900">Status*</Label>
                         <Select
                            className="w-full"
                            selectedKey={formData.status}
                            onSelectionChange={(key) => handleChange("status", String(key))}
                            items={[
                                { id: "true", label: "Active" },
                                { id: "false", label: "Inactive" },
                            ]}
                        >
                            {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                        </Select>
                    </div>
                </div> 
            
                <div className="pt-4 border-t mt-4">
                    <Button color="primary" size="sm" type="submit">
                        Submit
                    </Button>
                </div>
            </div>
            </form>
        </div>
      </div>
    </DefaultLayout>
  );
}
