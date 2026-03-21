import { useMemo } from "react";
import { useStoreLogin } from "@/store/login";

export type AccessAction = "view" | "add" | "edit" | "delete";

const normalizePathname = (pathname: string) => {
    const raw = String(pathname || "");
    const base = raw.split("?")[0].split("#")[0];
    return base.startsWith("/") ? base : `/${base}`;
};

const routeToResourceKey = (parts: string[]) => {
    const section = parts[0] || "";
    const page = parts[1] || "";

    if (section === "dashboard") return "dashboard";

    if (section === "packages") {
        if (page === "list") return "package";
        if (page === "location") return "location";
        if (page === "packageTags") return "packagetag";
        if (page === "packageType") return "packagetype";
        return "";
    }

    if (section === "settings") {
        if (page === "user") return "user";
        if (page === "mailer") return "mailer";
        if (page === "role") return "role";
        return "";
    }

    if (section === "itinerary") {
        const sub = parts[2] || "";
        if (page === "list") return "itinerary";
        if (page === "hotel" && sub === "category") return "hotelcategory";
        if (page === "hotel") return "hotel";
        if (page === "area") return "area";
        if (page === "site") return "site";
        if (page === "saved-itinerary") return "saveditinerary";
        if (page === "clientitinerary") return "clientitinerary";
        if (page === "reports") return "itineraryreports";
        return "";
    }

    if (section === "bookings") {
        if (page === "assignment") return "assignment";
        if (page === "booking") return "booking";
        if (page === "bookingtype") return "bookingstype";
        if (page === "vendorlist") return "vendor";
        if (page === "payment") return "payments";
        if (page === "paymentStore") return "paymentstore";
        if (page === "packagedetail") return "packagedetails";
        if (page === "reports") return "bookingreports";
        return "";
    }

    if (section === "lead-management") {
        const sub = parts[2] || "";
        if (page === "leads") return "leads";
        if (page === "pipeline") return "pipeline";
        if (page === "campaign") return "campaign";
        if (page === "settings" && sub === "contact-properties") return "leadcontactproperties";
        if (page === "settings") return "leadsettings";
        return "";
    }

    if (section === "hotel-images") return "hotelimage";
    if (section === "package-voucher") return "packagevoucher";

    return "";
};

export const getPermissionForPath = (pathname: string): { resource: string; action: AccessAction } | null => {
    const clean = normalizePathname(pathname);
    if (clean === "/" || clean === "/login") return null;

    const parts = clean.split("/").filter(Boolean);
    if (!parts.length) return null;

    const actionSegment = parts.find((p) => p === "add" || p === "edit" || p === "view");
    const action: AccessAction = actionSegment === "add" ? "add" : actionSegment === "edit" ? "edit" : "view";

    const resource = routeToResourceKey(parts);
    if (!resource) return null;

    return { resource, action };
};

export const useAccess = () => {
    const user = useStoreLogin((s) => s.user);

    return useMemo(() => {
        const isAdmin = String(user?.type || "").toUpperCase() === "ADMIN";
        const permissions = user?.role?.permissions || {};

        const resolveResourceAliases = (resource: string) => {
            if (resource === "saveditinerary") return ["saveditinerary", "saved-itinerary"];
            if (resource === "saved-itinerary") return ["saved-itinerary", "saveditinerary"];
            return [resource];
        };

        const can = (resource: string, action: AccessAction) => {
            if (isAdmin) return true;
            const keys = resolveResourceAliases(resource);
            return keys.some((key) => Boolean(permissions?.[key]?.[action]));
        };

        return { can, isAdmin, user };
    }, [user]);
};
