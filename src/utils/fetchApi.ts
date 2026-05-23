import { useStoreLogin } from "@/store/login";
import { useStoreSnackbar } from "@/store/snackbar";
import { getPermissionForPath } from "@/hooks/use-access";

type BaseUrlCollection = Record<string, string>;

const baseUrlCollection: BaseUrlCollection = (() => {
    const raw = import.meta.env.VITE_API_HOST as string | undefined;
    try {
        return raw ? (JSON.parse(raw) as BaseUrlCollection) : {};
    } catch {
        return {};
    }
})();

const normalizeOrigin = (origin: string) => origin.trim().replace(/\/+$/, "");

const resolvedBase = (() => {
    const apihost = normalizeOrigin(window.location.origin);
    const direct = baseUrlCollection[apihost];
    if (direct) return { apihost, baseUrl: direct };

    try {
        const current = new URL(apihost);
        const port = current.port ? `:${current.port}` : "";
        const localhostKey = `${current.protocol}//localhost${port}`;
        const loopbackKey = `${current.protocol}//127.0.0.1${port}`;

        const byLocalhost = baseUrlCollection[normalizeOrigin(localhostKey)];
        if (byLocalhost) return { apihost, baseUrl: byLocalhost };
        const byLoopback = baseUrlCollection[normalizeOrigin(loopbackKey)];
        if (byLoopback) return { apihost, baseUrl: byLoopback };

        if (current.port) {
            const suffix = `:${current.port}`;
            for (const key of Object.keys(baseUrlCollection)) {
                try {
                    const u = new URL(key);
                    if (u.protocol === current.protocol && u.port === current.port) {
                        return { apihost, baseUrl: baseUrlCollection[key] };
                    }
                } catch {
                    if (key.endsWith(suffix)) return { apihost, baseUrl: baseUrlCollection[key] };
                }
            }
        }
    } catch {
    }

    return { apihost, baseUrl: apihost };
})();

const API_HOST = resolvedBase.apihost;
const API_BASE_URL = resolvedBase.baseUrl;

const buildQueryString = (data: Record<string, unknown>) => {
    const params = new URLSearchParams();
    Object.entries(data).forEach(([key, value]) => {
        if (value === "" || value === undefined || value === null) return;
        if (Array.isArray(value)) {
            value.forEach((item) => {
                if (item === "" || item === undefined || item === null) return;
                params.append(key, String(item));
            });
            return;
        }
        params.append(key, String(value));
    });
    return params.toString();
};

const withAccessLookupContext = (data: Record<string, unknown>, method: string) => {
    if (method !== "GET") return data;

    const pathname = String(window.location.pathname || "");
    const permission = pathname ? getPermissionForPath(pathname) : null;
    if (!permission) return data;
    if (permission.action !== "add" && permission.action !== "edit" && permission.action !== "view") return data;

    const context: Record<string, unknown> = {
        accessMode: "lookup",
        accessPath: pathname,
        accessResource: permission.resource,
        accessAction: permission.action,
    };

    return { ...context, ...data };
};

export const fetchWithToken = async (
    url: string,
    data: Record<string, unknown> = {},
    options: RequestInit = {},
    retryAttempt = 0,
): Promise<any> => {
    try {
        const authToken = useStoreLogin.getState().authToken;
        if (!authToken) {
            window.location.href = "/login";
            return { error: "No auth token, redirecting to login." } as any;
        }

        const headers = new Headers(options.headers || {});
        headers.set("token", authToken || "");
        headers.set("apihost", API_HOST);

        const method = (options.method || "GET").toUpperCase();
        const fetchOptions: RequestInit = { ...options, headers, method };
        const requestData = withAccessLookupContext(data, method);
        const isFormDataRequest = typeof FormData !== "undefined" && requestData instanceof FormData;
        let newUrl: string;
        if (method === "POST" || method === "PUT" || method === "DELETE") {
            if (fetchOptions.body == null) {
                if (isFormDataRequest) {
                    fetchOptions.body = requestData as any;
                } else {
                    if (!headers.has("content-type")) headers.set("content-type", "application/json");
                    fetchOptions.body = JSON.stringify(requestData);
                }
            }
            newUrl = url.startsWith("http") ? url : `${API_BASE_URL}${url}`;
        } else {
            newUrl = url.startsWith("http") ? url : `${API_BASE_URL}${url}`;
            const queryString = buildQueryString(requestData);
            newUrl = queryString ? `${newUrl}?${queryString}` : newUrl;
        }

        const response = await fetch(newUrl, fetchOptions);
        if (!response.ok) {
            if (response.status === 401) {
                window.location.href = "/login";
                return { error: "Unauthorized, redirecting to login." } as any;
            }
            if (response.status === 403 && retryAttempt < 1 && !isFormDataRequest) {
                try {
                    await useStoreLogin.getState().getNewAuthToken();
                } catch {
                    window.location.href = "/login";
                    return { error: "Error fetching new auth token." } as any;
                }
                return await fetchWithToken(url, data, options, retryAttempt + 1);
            }
            let errorData: any;
            try {
                errorData = await response.json();
            } catch {
                try {
                    const text = await response.text();
                    errorData = text ? { message: text } : { message: "Request failed." };
                } catch {
                    errorData = { message: "Request failed." };
                }
            }
            throw errorData;
        }

        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("text/html")) {
            throw new Error("API endpoint not found (HTML response). Check proxy configuration.");
        }
        if (contentType && (contentType.includes("application/json") || contentType.includes("+json"))) {
            return await response.json();
        }
        const text = await response.text();
        if (!text) return "";
        try {
            return JSON.parse(text);
        } catch {
            return text;
        }
    } catch (error: any) {
        useStoreSnackbar
            .getState()
            .showSnackbar({
                description:
                    error?.error?.error?.message ||
                    error?.error?.message ||
                    error?.message ||
                    "Something went wrong",
                title: "Error",
                color: "danger",
            });
        throw error;
    }
};

export const fetchWithOutToken = async (
    url: string,
    data: Record<string, unknown> = {},
    options: RequestInit = {},
): Promise<any> => {
    const headers = new Headers(options.headers || {});
    headers.set("apihost", API_HOST);
    const method = (options.method || "GET").toUpperCase();
    const fetchOptions: RequestInit = { ...options, headers, method };

    if (method === "POST" || method === "PUT" || method === "DELETE") {
        if (!headers.has("content-type")) headers.set("content-type", "application/json");
        fetchOptions.body = fetchOptions.body ?? JSON.stringify(data);
        url = url.startsWith("http") ? url : `${API_BASE_URL}${url}`;
    } else {
        url = url.startsWith("http") ? url : `${API_BASE_URL}${url}`;
        const queryString = buildQueryString(data);
        url = queryString ? `${url}?${queryString}` : url;
    }
    const response = await fetch(url, fetchOptions);
    if (!response.ok) {
        let errorData: any;
        try {
            errorData = await response.json();
        } catch {
            errorData = { message: "Request failed." };
        }
        throw errorData;
    }
    return await response.json();
};

export default fetchWithToken;
