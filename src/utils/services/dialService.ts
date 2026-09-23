import { fetchWithToken } from "@/utils/fetchApi";

const request = (url: string, data: Record<string, unknown> = {}, options?: RequestInit) => fetchWithToken(url, data, options);

export const getDialQueueSummary = (params: Record<string, unknown> = {}) => request("/api/dial/queue/summary", params);
export const getDialQueue = (params: Record<string, unknown> = {}) => request("/api/dial/queue", params);
export const reserveNextDialLead = (params: Record<string, unknown> = {}) => request("/api/dial/queue/reserve", params, { method: "POST" });
export const releaseDialReservation = (data: Record<string, unknown>) => request("/api/dial/queue/release", data, { method: "POST" });
export const updateDialCallState = (data: Record<string, unknown>) => request("/api/dial/call-logs/state", data, { method: "POST" });
export const finalizeDialCall = (data: Record<string, unknown>) => request("/api/dial/call-logs/finalize", data, { method: "POST" });
export const createDialCallLog = (data: Record<string, unknown>) => request("/api/dial/call-logs", data, { method: "POST" });
export const getDialCallLogs = (params: Record<string, unknown> = {}) => request("/api/dial/call-logs", params);
export const getDialTasks = (params: Record<string, unknown> = {}) => request("/api/dial/tasks", params);
export const assignDialTaskToMe = (id: string) => request(`/api/dial/tasks/${id}/assign-to-me`, {}, { method: "POST" });
export const completeDialTask = (id: string, notes?: string) => request(`/api/dial/tasks/${id}/complete`, notes ? { notes } : {}, { method: "PUT" });
export const getDialReports = (params: Record<string, unknown> = {}) => request("/api/dial/reports", params);
export const getDialCampaigns = () => request("/api/dial/campaigns");
export const getWalkInLeads = (params: Record<string, unknown> = {}) => request("/api/dial/walk-in-leads", params);
export const createWalkInLead = (data: Record<string, unknown>) => request("/api/dial/walk-in-leads", data, { method: "POST" });
export const updateWalkInLead = (id: string, data: Record<string, unknown>) => request(`/api/dial/walk-in-leads/${id}`, data, { method: "PUT" });
export const deleteWalkInLead = (id: string) => request(`/api/dial/walk-in-leads/${id}`, {}, { method: "DELETE" });
export const assignWalkInLead = (id: string, salesExecutive?: string) => request(`/api/dial/walk-in-leads/${id}/assign`, salesExecutive ? { salesExecutive } : {}, { method: "POST" });
export const convertWalkInLead = (id: string, data: Record<string, unknown> = {}) => request(`/api/dial/walk-in-leads/${id}/convert`, data, { method: "POST" });
export const createWalkInCallLog = (id: string, data: Record<string, unknown>) => request(`/api/dial/walk-in-leads/${id}/call-logs`, data, { method: "POST" });

export type DialQueueItem = { lead: Record<string, any>; campaign?: Record<string, any>; stage?: { name?: string }; pendingFollowUp?: Record<string, any>; callAttemptCount?: number };
export type DialTask = Record<string, any>;
