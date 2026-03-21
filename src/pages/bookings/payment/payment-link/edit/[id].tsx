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
      const updatedFormData = { ...formData };
      
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
