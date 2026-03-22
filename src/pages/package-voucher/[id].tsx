import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getPackageVoucherPublic } from "@/utils/services/packageVoucherService";
import { useStoreSnackbar } from '@/store/snackbar';
import { LoadingIndicator } from '@/components/application/loading-indicator/loading-indicator';

export default function ClientUrl() {
  const { id } = useParams();
  const [data, setData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const { showSnackbar } = useStoreSnackbar();

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      setIsLoading(true);
      const params = {
        assignmentId: id,
        isDefault: true,
        status: true,
        populate: "assignmentId",
        select_assignmentId: "packageId"
      };
      try {
        const response: any = await getPackageVoucherPublic(params);
        // Next.js code used destructuring: const [response] = await ...
        // which implies the API returns an array for this query.
        const result = response.data || response;
        if (Array.isArray(result) && result.length > 0) {
          setData(result[0]);
        } else if (!Array.isArray(result)) {
          setData(result);
        }
      }
      catch (error: any) {
        showSnackbar({ description: error.message, title: 'Invalid Input', color: 'danger' });
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (id) {
      fetchData();
    }
  }, [id, showSnackbar]);

  const replaceClientName = (content: string) => {
    let replacedContent = content?.replace(
      /\[\{CLIENT_NAME\}\]|\{CLIENT_NAME\}/g,
      "Guest"
    );
    return replacedContent?.replace(/\{|\}/g, "");
  };

  return (
    <div>
      <div>
        <div className='bg-primary min-h-screen p-4'>
          {isLoading ? (
            <div className="flex justify-center items-center h-full pt-20">
              <LoadingIndicator />
            </div>
          ) : data && data.innerHtml ? (
            <div style={{ maxWidth: '1000px', margin: 'auto' }} className="py-4">
              <div className="mt-4 bg-white shadow rounded-lg overflow-hidden">
                <div className="p-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_ul_ul]:list-[circle] [&_ul_ul]:pl-5 [&_ol_ol]:list-[lower-alpha] [&_ol_ol]:pl-5 [&_li]:mb-1" dangerouslySetInnerHTML={{ __html: replaceClientName(data.innerHtml) }}></div>
              </div>
            </div>
          ) : (
            <div className="flex min-h-[60vh] items-center justify-center">
              <div className="flex w-full max-w-md flex-col items-center gap-4 rounded-2xl border border-secondary bg-primary p-8 text-center shadow-md">
                <div className="flex size-16 items-center justify-center text-primary">
                  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="">
                    <path d="M12 8V12M12 16H12.01M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </div>
                <div className="space-y-1">
                  <div className="text-lg font-semibold text-primary">No voucher generated yet</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
