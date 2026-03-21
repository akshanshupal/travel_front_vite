import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Button } from "@/components/base/buttons/button";
import { LoadingIndicator } from "@/components/application/loading-indicator/loading-indicator";
import { CustomBreadscrumbs } from "@/components/application/breadcrumbs/custom-breadcrumbs";
import { getPackageVoucherById } from "@/utils/services/packageVoucherService";
import { useStoreSnackbar } from "@/store/snackbar";
import { DefaultLayout } from "@/layouts/DefaultLayout";

export default function PaymentLinkView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showSnackbar } = useStoreSnackbar();

  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      setIsLoading(true);
      try {
        let response = await getPackageVoucherById(id);
        setData(response || []);
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

  const replaceClientName = (content: string) => {
    let replacedContent = content?.replace(
      /\[\{CLIENT_NAME\}\]|\{CLIENT_NAME\}/g,
       "Guest"
    );
    return replacedContent?.replace(/\{|\}/g, "");
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
    </DefaultLayout>
  );
}
