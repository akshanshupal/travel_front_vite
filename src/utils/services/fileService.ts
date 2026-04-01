import { fetchWithToken } from "@/utils/fetchApi";

export const getFileUploadUrl = async (selectedFile: FormData) => {
    const response = await fetchWithToken('/api/file/upload', selectedFile as any, {
        method: 'POST',
    });
    if ((response as any).error) {
        console.error('Error uploading file:', (response as any).error);
        return { error: (response as any).error, details: (response as any)?.details };
    }
    return response;
};
