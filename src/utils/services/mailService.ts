import { fetchWithToken } from "@/utils/fetchApi";

export const getSentMailById = async (params: Record<string, unknown> = {}) => {
    const response = await fetchWithToken(`/api/sendmail`, params);
    if (response.error) {
        console.error('Error fetching send mail by ID:', response.error);
        return { error: response.error, details: response?.details };
    }
    return response;
};

export const sendItineraryMail = async (id: string, formAddData: Record<string, unknown>) => {
    const response = await fetchWithToken(`/api/saved-itinerary/send-itinerary/${id}`, formAddData, { method: 'POST' });
    if (response.error) {
        console.error('Error sending itinerary mail:', response.error);
        return { error: response.error, details: response?.details };
    }
    return response;
};

export const sendVoucherMail = async (packageVoucherId: string, formAddData: Record<string, unknown>) => {
    const response = await fetchWithToken(`/api/packagevoucher/send-paymentVoucher/${packageVoucherId}`, formAddData, { method: 'POST' });
    if (response.error) {
        console.error('Error sending voucher mail:', response.error);
        return { error: response.error, details: response?.details };
    }
    return response;
};

export const sendPaymentMail = async (paymentId: string, formAddData: Record<string, unknown>) => {
    const response = await fetchWithToken(`/api/payments/receipt-mail/${paymentId}`, formAddData, { method: 'POST' });
    if (response.error) {
        console.error('Error sending payment mail:', response.error);
        return { error: response.error, details: response?.details };
    }
    return response;
};

export const sendAssignmentMail = async (paymentId: string, formAddData: Record<string, unknown>) => {
    const response = await fetchWithToken(`/api/assignment/send-assignmentMail/${paymentId}`, formAddData, { method: 'POST' });
    if (response.error) {
        console.error('Error sending assignment mail:', response.error);
        return { error: response.error, details: response?.details };
    }
    return response;
};

export const sendPaymentReminderMail = async (paymentReminderId: string, formAddData: Record<string, unknown>) => {
    const response = await fetchWithToken(`/api/payments-reminder/${paymentReminderId}`, formAddData, { method: 'POST' });
    if (response.error) {
        console.error('Error sending payment reminder mail:', response.error);
        return { error: response.error, details: response?.details };
    }
    return response;
};

export const sendWelcomeMail = async (assignmentId: string, formAddData: Record<string, unknown>) => {
    const response = await fetchWithToken(`/api/mail/send-welcome-mail/${assignmentId}`, formAddData, { method: 'POST' });
    if (response.error) {
        console.error('Error sending welcome mail:', response.error);
        return { error: response.error, details: response?.details };
    }
    return response;
};

export const agentDurationWiseSendMails = async (params: Record<string, unknown> = {}) => {
    const response = await fetchWithToken(`/api/sendmail/agent-duration-wise-send-mails`, params);
    if (response.error) {
        console.error('Error fetching duration-wise send mails:', response.error);
        return { error: response.error, details: response?.details };
    }
    return response;
};

export const agentWiseSendMails = async (params: Record<string, unknown> = {}) => {
    const response = await fetchWithToken(`/api/sendmail/agent-wise-send-mails`, params);
    if (response.error) {
        console.error('Error fetching agent-wise send mails:', response.error);
        return { error: response.error, details: response?.details };
    }
    return response;
};
