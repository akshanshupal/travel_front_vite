import { useStoreLogin } from "@/store/login";
import { useStoreSnackbar } from "@/store/snackbar";
import { getPermissionForPath } from "@/hooks/use-access";

const baseUrlCollection = (() => {
    const raw = import.meta.env.VITE_API_HOST as string | undefined;
    try {
        return raw ? (JSON.parse(raw) as Record<string, string>) : {};
    } catch {
        return {};
    }
})();

const getClientBaseURL = () => {
    if (typeof window !== "undefined") return window.location.origin;
    return "";
};

const resolveApihostHeader = (apihost: string) => {
    const override = import.meta.env.VITE_APIHOST_HEADER_OVERRIDE as string | undefined;
    if (override) return override;

    if (import.meta.env.DEV) {
        try {
            const u = new URL(apihost);
            if (u.port === "5173" || u.port === "5174") {
                return `${u.protocol}//localhost:3000`;
            }
        } catch {
            return apihost;
        }
    }

    return apihost;
};

const resolveBaseUrl = () => {
    const apihost = getClientBaseURL();
    let mapped = baseUrlCollection[apihost];

    if (!mapped && apihost) {
        try {
            const current = new URL(apihost);
            const port = current.port ? `:${current.port}` : "";
            const candidates = [
                `${current.protocol}//localhost${port}`,
                `${current.protocol}//127.0.0.1${port}`,
            ];
            for (const key of candidates) {
                if (baseUrlCollection[key]) {
                    mapped = baseUrlCollection[key];
                    break;
                }
            }
            if (!mapped && current.port) {
                const suffix = `:${current.port}`;
                const matchKey = Object.keys(baseUrlCollection).find((key) => {
                    try {
                        const u = new URL(key);
                        return u.protocol === current.protocol && u.port === current.port;
                    } catch {
                        return key.endsWith(suffix);
                    }
                });
                if (matchKey) mapped = baseUrlCollection[matchKey];
            }
        } catch {
        }
    }
    return { apihost, baseUrl: mapped || apihost || "" };
};

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
    if (typeof window === "undefined") return data;

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
        
        const { apihost, baseUrl } = resolveBaseUrl();
        
        const apihostHeader = resolveApihostHeader(apihost);
        const authToken = useStoreLogin.getState().authToken;
        if (!authToken && typeof window !== "undefined") {
            window.location.href = "/login";
            return { error: "No auth token, redirecting to login." } as any;
        }

        const headers = new Headers(options.headers || {});
        headers.set("token", authToken || "");
        headers.set("apihost", apihostHeader);

        const method = (options.method || "GET").toUpperCase();
        const fetchOptions: RequestInit = { ...options, headers, method };
        const requestData = withAccessLookupContext(data, method);
        const isFormDataRequest = typeof FormData !== "undefined" && requestData instanceof FormData;

        const useProxy =
            Boolean(import.meta.env.DEV) &&
            (import.meta.env.VITE_USE_API_PROXY as string | undefined) !== "false" &&
            url.startsWith("/api/");
        const baseForRelative = useProxy ? apihost : baseUrl;

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
            newUrl = url.startsWith("http") ? url : `${baseForRelative}${url}`;
        } else {
            newUrl = url.startsWith("http") ? url : `${baseForRelative}${url}`;
            const queryString = buildQueryString(requestData);
            newUrl = queryString ? `${newUrl}?${queryString}` : newUrl;
        }

        const response = await fetch(newUrl, fetchOptions);
        if (!response.ok) {
            if (response.status === 403 && retryAttempt < 1 && !isFormDataRequest) {
                try {
                    await useStoreLogin.getState().getNewAuthToken();
                } catch {
                    if (typeof window !== "undefined") window.location.href = "/login";
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
    const { apihost, baseUrl } = resolveBaseUrl();
    const apihostHeader = resolveApihostHeader(apihost);
    const headers = {
        ...(options.headers || {}),
        apihost: apihostHeader,
    } as HeadersInit;
    const method = (options.method || "GET").toUpperCase();
    const fetchOptions: RequestInit = { ...options, headers, method };

    const useProxy =
        Boolean(import.meta.env.DEV) &&
        (import.meta.env.VITE_USE_API_PROXY as string | undefined) !== "false" &&
        url.startsWith("/api/");
    const baseForRelative = useProxy ? apihost : baseUrl;

    if (method === "POST" || method === "PUT" || method === "DELETE") {
        fetchOptions.body = JSON.stringify(data);
        url = url.startsWith("http") ? url : `${baseForRelative}${url}`;
    } else {
        url = url.startsWith("http") ? url : `${baseForRelative}${url}`;
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
