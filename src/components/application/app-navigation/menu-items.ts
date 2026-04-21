import type { FC } from "react";
import {
    Announcement01,
    BankNote01,
    BarChart01,
    Box,
    Building02,
    Calendar,
    ClipboardCheck,
    CreditCard01,
    File02,
    FilterLines,
    Home04,
    LayersTwo01,
    Mail01,
    Map01,
    PieChart01,
    Settings01,
    ShoppingCart02,
    Tag01,
    TrendUp01,
    User01,
    UsersMinus,
    Users01,
} from "@untitledui/icons";

export type AppMenuItem = {
    label: string;
    href: string;
    icon?: FC<{ className?: string }>;
    items?: AppMenuItem[];
};

type SidebarMenuItem = Omit<AppMenuItem, "icon" | "items"> & { icon: FC<{ className?: string }>; items?: AppMenuItem[] };

type AccessAction = "view" | "add" | "edit" | "delete";
type CanFn = (resource: string, action: AccessAction) => boolean;

type HeaderMenuItem = {
    label: string;
    href: string;
    current?: boolean;
    items?: HeaderMenuItem[];
};

const buildBaseMenu = (): SidebarMenuItem[] => [
    { href: "/dashboard", label: "Dashboard", icon: Home04 },
    {
        href: "/itinerary/list",
        label: "Itinerary",
        icon: Map01,
        items: [
            { href: "/itinerary/list", label: "Itineraries", icon: BarChart01 },
            { href: "/itinerary/area", label: "Areas", icon: Map01 },
            { href: "/itinerary/site", label: "Sites", icon: Map01 },
            {
                href: "/itinerary/hotel",
                label: "Hotel",
                icon: Building02,
                items: [
                    { href: "/itinerary/hotel", label: "Hotel List", icon: Building02 },
                    { href: "/itinerary/hotel/category", label: "Hotel Category", icon: LayersTwo01 },
                ],
            },
            { href: "/itinerary/clientitinerary", label: "Client Itinerary", icon: UsersMinus },
            { href: "/itinerary/saved-itinerary", label: "Quotation", icon: File02 },
            {
                href: "/itinerary/reports/mails",
                label: "Reports",
                icon: PieChart01,
                items: [
                    { href: "/itinerary/reports/mails", label: "Mails", icon: Mail01 },
                    { href: "/itinerary/reports/quotations", label: "Quotations", icon: File02 },
                ],
            },
        ],
    },
    {
        href: "/bookings/booking",
        label: "Bookings",
        icon: ShoppingCart02,
        items: [
            { href: "/bookings/assignment", label: "Assignments", icon: ClipboardCheck },
            { href: "/bookings/booking", label: "Booking", icon: Calendar },
            { href: "/bookings/payment", label: "Payment", icon: CreditCard01 },
            { href: "/bookings/bookingtype", label: "Booking Type", icon: Tag01 },
            { href: "/bookings/vendorlist", label: "Vendors", icon: Users01 },
            { href: "/bookings/paymentStore", label: "Payment Store", icon: BankNote01 },
            {
                href: "/bookings/reports/payment",
                label: "Reports",
                icon: PieChart01,
                items: [
                    { href: "/bookings/reports/payment", label: "Payment", icon: CreditCard01 },
                    { href: "/bookings/reports/mails", label: "Mails", icon: Mail01 },
                    { href: "/bookings/reports/profitReports", label: "Profit", icon: TrendUp01 },
                ],
            },
        ],
    },
    {
        href: "/packages/list",
        label: "Packages",
        icon: Box,
        items: [
            { href: "/packages/list", label: "Package", icon: Box },
            { href: "/packages/location", label: "Location", icon: Map01 },
            { href: "/packages/packageTags", label: "Tags", icon: Tag01 },
            { href: "/packages/packageType", label: "Type", icon: LayersTwo01 },
        ],
    },
    {
        href: "/lead-management/leads",
        label: "Lead Management",
        icon: UsersMinus,
        items: [
            { href: "/lead-management/leads", label: "Leads", icon: UsersMinus },
            { href: "/lead-management/pipeline", label: "Pipeline", icon: FilterLines },
            { href: "/lead-management/campaign", label: "Campaign", icon: Announcement01 },
            { href: "/lead-management/settings", label: "Settings", icon: Settings01 },
            { href: "/lead-management/settings/contact-properties", label: "Contact Properties", icon: User01 },
        ],
    },
    {
        href: "/photography/client",
        label: "Photography",
        icon: File02,
        items: [
            { href: "/photography/client", label: "Client", icon: Users01 },
            { href: "/photography/estimate", label: "Estimate", icon: File02 },
            { href: "/photography/template", label: "Template", icon: LayersTwo01 },
        ],
    },
    {
        href: "/settings/mailer",
        label: "Settings",
        icon: Settings01,
        items: [
            { href: "/settings/user", label: "User", icon: Users01 },
            { href: "/settings/mailer", label: "Mailer", icon: Mail01 },
            { href: "/settings/role", label: "Role", icon: LayersTwo01 },
            {
                href: "/additional-data/settings/template",
                label: "Additional Data",
                icon: File02,
                items: [
                    { href: "/additional-data/settings/template", label: "Template", icon: File02 },
                    { href: "/additional-data/settings/package-inclusions", label: "Package Inclusions", icon: Tag01 },
                    { href: "/additional-data/settings/package-exclusions", label: "Package Exclusions", icon: FilterLines },
                ],
            },
        ],
    },
];

const headerSectionPrefix: Record<string, string> = {
    Dashboard: "/dashboard",
    Itinerary: "/itinerary",
    Bookings: "/bookings",
    Packages: "/packages",
    "Lead Management": "/lead-management",
    Settings: "/settings",
};

const normalizePath = (value: string) => (value !== "/" && value.endsWith("/") ? value.slice(0, -1) : value);
const isPathMatch = (pathname: string, href: string) => {
    const path = normalizePath(pathname);
    const target = normalizePath(href);
    if (target === "/") return path === "/";
    if (!path.startsWith(target)) return false;
    const nextChar = path.charAt(target.length);
    return nextChar === "" || nextChar === "/" || nextChar === "?" || nextChar === "#";
};

const mapHeaderItems = (items: AppMenuItem[], pathname: string): HeaderMenuItem[] =>
    items.map((item) => {
        const childItems = item.items ? mapHeaderItems(item.items, pathname) : undefined;
        const childCurrent = Boolean(childItems?.some((child) => child.current));
        const prefix = headerSectionPrefix[item.label];
        const isHotelList = item.href === "/itinerary/hotel";
        const isCurrent =
            childCurrent ||
            (prefix
                ? isPathMatch(pathname, prefix)
                : isHotelList
                    ? isPathMatch(pathname, item.href) && !isPathMatch(pathname, "/itinerary/hotel/category")
                    : isPathMatch(pathname, item.href));

        return {
            label: item.label,
            href: item.href,
            current: isCurrent,
            items: childItems,
        };
    });

const hrefToResourceKey = (href: string) => {
    const path = (href || "").split("?")[0].split("#")[0];
    const parts = path.split("/").filter(Boolean);
    const section = parts[0] || "";
    const page = parts[1] || "";

    if (section === "dashboard") return "dashboard";

    if (section === "itinerary") {
        const sub = parts[2] || "";
        if (page === "list") return "itinerary";
        if (page === "area") return "area";
        if (page === "site") return "site";
        if (page === "hotel" && sub === "category") return "hotelcategory";
        if (page === "hotel") return "hotel";
        if (page === "clientitinerary") return "clientitinerary";
        if (page === "saved-itinerary") return "saveditinerary";
        if (page === "reports") return "itineraryreports";
        return "";
    }

    if (section === "bookings") {
        if (page === "assignment") return "assignment";
        if (page === "booking") return "booking";
        if (page === "payment") return "payments";
        if (page === "bookingtype") return "bookingstype";
        if (page === "vendorlist") return "vendor";
        if (page === "paymentStore") return "paymentstore";
        if (page === "reports") return "bookingreports";
        return "";
    }

    if (section === "packages") {
        if (page === "list") return "package";
        if (page === "location") return "location";
        if (page === "packageTags") return "packagetag";
        if (page === "packageType") return "packagetype";
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

    if (section === "settings") {
        if (page === "user") return "user";
        if (page === "mailer") return "mailer";
        if (page === "role") return "role";
        return "";
    }

    if (section === "additional-data") {
        const subSection = parts[1] || "";
        const subPage = parts[2] || "";
        if (subSection !== "settings") return "";
        if (subPage === "template") return "template";
        if (subPage === "package-inclusions") return "packageinclusion";
        if (subPage === "package-exclusions") return "packageexclusion";
        return "";
    }

    if (section === "hotel-images") return "hotelimage";
    if (section === "package-voucher") return "packagevoucher";

    return "";
};

const filterMenuByAccess = (items: AppMenuItem[], can: CanFn): AppMenuItem[] => {
    return items
        .map((item) => {
            const children = item.items ? filterMenuByAccess(item.items, can) : undefined;
            const resource = hrefToResourceKey(item.href);
            const allowed = resource ? can(resource, "view") : true;

            const visible = children?.length ? true : allowed;
            if (!visible) return null;

            return {
                ...item,
                items: children?.length ? children : undefined,
            };
        })
        .filter(Boolean) as AppMenuItem[];
};

export const getMenuItems = (pathname: string, can?: CanFn) => {
    const baseMenu = buildBaseMenu();
    const filteredMenu: SidebarMenuItem[] = can ? (filterMenuByAccess(baseMenu, can) as SidebarMenuItem[]) : baseMenu;
    const baseFooterItems: SidebarMenuItem[] = [{ href: "/settings/user", label: "Settings", icon: Settings01 }];
    const filteredFooterItems: SidebarMenuItem[] = can
        ? (filterMenuByAccess(baseFooterItems, can) as SidebarMenuItem[])
        : baseFooterItems;
    return {
        headerItems: mapHeaderItems(filteredMenu, pathname),
        sidebarItems: filteredMenu,
        footerItems: filteredFooterItems,
    };
};
