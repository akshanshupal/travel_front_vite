import { StrictMode, Suspense, lazy, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { RouteProvider } from "@/providers/router-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { useStoreCompany } from "@/store/company";
import "@/styles/globals.css";
import { Snackbar } from "@/components/application/snackbar/snackbar";

// All page route modules are lazy-loaded so Vite code-splits them per route.
// Heavy dependencies (jspdf, xlsx, lightgallery, jodit, ...) therefore load
// only on the routes that use them. Route paths and behavior are unchanged.
const HomeScreen = lazy(() => import("@/pages/home-screen").then((m) => ({ default: m.HomeScreen })));
const NotFound = lazy(() => import("@/pages/not-found").then((m) => ({ default: m.NotFound })));
const LoginPage = lazy(() => import("@/pages/login"));
const DashboardPage = lazy(() => import("@/pages/dashboard/index"));
const ItineraryListPage = lazy(() => import("@/pages/itinerary/list/index"));
const ItineraryViewPage = lazy(() => import("@/pages/itinerary/list/view/[id]"));
const ItineraryEditPage = lazy(() => import("@/pages/itinerary/list/edit/[id]"));
const ItineraryAreaListPage = lazy(() => import("@/pages/itinerary/area"));
const ItineraryAreaAddPage = lazy(() => import("@/pages/itinerary/area/add"));
const ItineraryAreaEditPage = lazy(() => import("@/pages/itinerary/area/edit/[id]"));
const ItineraryAreaViewPage = lazy(() => import("@/pages/itinerary/area/view/[id]"));
const ItinerarySiteListPage = lazy(() => import("@/pages/itinerary/site"));
const ItinerarySiteAddPage = lazy(() => import("@/pages/itinerary/site/add"));
const ItinerarySiteEditPage = lazy(() => import("@/pages/itinerary/site/edit/[id]"));
const ItinerarySiteViewPage = lazy(() => import("@/pages/itinerary/site/view/[id]"));
const ItineraryHotelListPage = lazy(() => import("@/pages/itinerary/hotel"));
const ItineraryHotelAddPage = lazy(() => import("@/pages/itinerary/hotel/add"));
const ItineraryHotelEditPage = lazy(() => import("@/pages/itinerary/hotel/edit/[id]"));
const ItineraryHotelViewPage = lazy(() => import("@/pages/itinerary/hotel/view/[id]"));
const ItineraryHotelCategoryListPage = lazy(() => import("./pages/itinerary/hotel/category"));
const ItineraryHotelCategoryAddPage = lazy(() => import("./pages/itinerary/hotel/category/add"));
const ItineraryHotelCategoryEditPage = lazy(() => import("./pages/itinerary/hotel/category/edit/[id]"));
const ItineraryHotelCategoryViewPage = lazy(() => import("./pages/itinerary/hotel/category/view/[id]"));
const BookingPage = lazy(() => import("@/pages/bookings/booking/index"));
const AssignmentPage = lazy(() => import("@/pages/bookings/assignment/index"));
const BookingTypePage = lazy(() => import("@/pages/bookings/bookingtype/index"));
const BookingTypeAddPage = lazy(() => import("@/pages/bookings/bookingtype/add"));
const BookingTypeEditPage = lazy(() => import("@/pages/bookings/bookingtype/edit/[id]"));
const BookingTypeViewPage = lazy(() => import("@/pages/bookings/bookingtype/view/[id]"));
const PaymentPage = lazy(() => import("@/pages/bookings/payment/index"));
const PaymentViewPage = lazy(() => import("@/pages/bookings/payment/view/[id]"));
const PaymentStorePage = lazy(() => import("@/pages/bookings/paymentStore/index"));
const PaymentStoreAddPage = lazy(() => import("@/pages/bookings/paymentStore/add"));
const PaymentStoreEditPage = lazy(() => import("@/pages/bookings/paymentStore/edit/[id]"));
const PaymentStoreViewPage = lazy(() => import("@/pages/bookings/paymentStore/view/[id]"));
const VendorListPage = lazy(() => import("@/pages/bookings/vendorlist/index"));
const VendorListAddPage = lazy(() => import("@/pages/bookings/vendorlist/add"));
const VendorListEditPage = lazy(() => import("@/pages/bookings/vendorlist/edit/[id]"));
const VendorListViewPage = lazy(() => import("@/pages/bookings/vendorlist/view/[id]"));
const PackageDetailPage = lazy(() => import("@/pages/bookings/packagedetail/index"));
const CabBookingPage = lazy(() => import("@/pages/bookings/cabbooking/index"));
const ReportsPaymentPage = lazy(() => import("@/pages/bookings/reports/payment/index"));
const ReportsMailsPage = lazy(() => import("@/pages/bookings/reports/mails/index"));
const ReportsProfitPage = lazy(() => import("@/pages/bookings/reports/profitReports/index"));
const ClientItineraryListPage = lazy(() => import("@/pages/itinerary/clientitinerary/index"));
const ClientItineraryAddPage = lazy(() => import("@/pages/itinerary/clientitinerary/add/index"));
const ClientItineraryViewPage = lazy(() => import("@/pages/itinerary/clientitinerary/view/index"));
const ClientItineraryEditPage = lazy(() => import("@/pages/itinerary/clientitinerary/edit/index"));
const SavedItineraryListPage = lazy(() => import("@/pages/itinerary/saved-itinerary/index"));
const EditSavedItineraryPage = lazy(() => import("@/pages/itinerary/saved-itinerary/edit/[id]"));
const ItineraryReportMailsPage = lazy(() => import("@/pages/itinerary/reports/mails"));
const ItineraryReportQuotationsPage = lazy(() => import("@/pages/itinerary/reports/quotations"));
const PackageItineraryMailPage = lazy(() => import("@/pages/package-mail/[id]"));
const HotelImagesPage = lazy(() => import("@/pages/hotel-images/[id]"));
const PlaceholderPage = lazy(() => import("@/pages/placeholder"));
const RoutesPage = lazy(() => import("@/pages/routes"));
const AssignmentViewPage = lazy(() => import("./pages/bookings/assignment/view/[id]"));
const AssignmentEditPage = lazy(() => import("./pages/bookings/assignment/edit/[id]"));
const AssignmentAddPage = lazy(() => import("./pages/bookings/assignment/add"));
const BookingViewPage = lazy(() => import("./pages/bookings/booking/view/[id]"));
const PaymentLinkPage = lazy(() => import("@/pages/bookings/payment/payment-link/[id]"));
const GeneratePaymentPage = lazy(() => import("@/pages/bookings/generatePayment/[id]"));
const PaymentLinkViewPage = lazy(() => import("@/pages/bookings/payment/payment-link/view/[id]"));
const PaymentLinkEditPage = lazy(() => import("@/pages/bookings/payment/payment-link/edit/[id]"));
const PackageVoucherPage = lazy(() => import("@/pages/package-voucher/[id]"));
const PaymentReceiptPage = lazy(() => import("@/pages/payments-receipt/[id]"));
const SettingsMailerListPage = lazy(() => import("@/pages/settings/mailer"));
const SettingsMailerAddPage = lazy(() => import("@/pages/settings/mailer/add"));
const SettingsMailerViewPage = lazy(() => import("@/pages/settings/mailer/view/[id]"));
const SettingsMailerEditPage = lazy(() => import("@/pages/settings/mailer/edit/[id]"));
const SettingsUserListPage = lazy(() => import("@/pages/settings/user"));
const SettingsUserAddPage = lazy(() => import("@/pages/settings/user/add"));
const SettingsUserEditPage = lazy(() => import("@/pages/settings/user/edit/[id]"));
const SettingsUserViewPage = lazy(() => import("@/pages/settings/user/view/[id]"));
const SettingsRoleListPage = lazy(() => import("@/pages/settings/role"));
const SettingsRoleAddPage = lazy(() => import("@/pages/settings/role/add"));
const SettingsRoleViewPage = lazy(() => import("@/pages/settings/role/view/[id]"));
const SettingsRoleEditPage = lazy(() => import("@/pages/settings/role/edit/[id]"));
const PackageListPage = lazy(() => import("@/pages/packages/list"));
const PackageAddPage = lazy(() => import("@/pages/packages/list/add"));
const PackageEditPage = lazy(() => import("@/pages/packages/list/edit/[id]"));
const PackageViewPage = lazy(() => import("@/pages/packages/list/view/[id]"));
const PackageLocationListPage = lazy(() => import("@/pages/packages/location"));
const PackageLocationAddPage = lazy(() => import("@/pages/packages/location/add"));
const PackageLocationEditPage = lazy(() => import("@/pages/packages/location/edit/[id]"));
const PackageLocationViewPage = lazy(() => import("@/pages/packages/location/view/[id]"));
const PackageTypeListPage = lazy(() => import("@/pages/packages/packageType"));
const PackageTypeAddPage = lazy(() => import("@/pages/packages/packageType/add"));
const PackageTypeEditPage = lazy(() => import("@/pages/packages/packageType/edit/[id]"));
const PackageTypeViewPage = lazy(() => import("@/pages/packages/packageType/view/[id]"));
const PackageTagsListPage = lazy(() => import("@/pages/packages/packageTags"));
const PackageTagsAddPage = lazy(() => import("@/pages/packages/packageTags/add"));
const PackageTagsEditPage = lazy(() => import("@/pages/packages/packageTags/edit/[id]"));
const PackageTagsViewPage = lazy(() => import("@/pages/packages/packageTags/view/[id]"));
const TemplateListPage = lazy(() => import("@/pages/settings/template/index"));
const TemplateAddPage = lazy(() => import("@/pages/settings/template/add"));
const TemplateEditPage = lazy(() => import("@/pages/settings/template/edit/[id]"));
const TemplateViewPage = lazy(() => import("@/pages/settings/template/view/[id]"));
const PackageInclusionsListPage = lazy(() => import("@/pages/settings/package-inclusions"));
const PackageInclusionsAddPage = lazy(() => import("@/pages/settings/package-inclusions/add"));
const PackageInclusionsEditPage = lazy(() => import("@/pages/settings/package-inclusions/edit/[id]"));
const PackageInclusionsViewPage = lazy(() => import("@/pages/settings/package-inclusions/view/[id]"));
const PackageExclusionsListPage = lazy(() => import("@/pages/settings/package-exclusions"));
const PackageExclusionsAddPage = lazy(() => import("@/pages/settings/package-exclusions/add"));
const PackageExclusionsEditPage = lazy(() => import("@/pages/settings/package-exclusions/edit/[id]"));
const PackageExclusionsViewPage = lazy(() => import("@/pages/settings/package-exclusions/view/[id]"));
const LeadsIndexPage = lazy(() => import("@/pages/lead-management/leads/index"));
const LeadsAddPage = lazy(() => import("@/pages/lead-management/leads/add"));
const LeadsEditPage = lazy(() => import("@/pages/lead-management/leads/edit/[id]"));
const LeadsViewPage = lazy(() => import("@/pages/lead-management/leads/view/[id]"));
const EnquiryIndexPage = lazy(() => import("@/pages/lead-management/enquiry"));
const CampaignIndexPage = lazy(() => import("@/pages/lead-management/campaign/index"));
const CampaignViewPage = lazy(() => import("@/pages/lead-management/campaign/view/[id]"));
const CampaignEngagementFormPage = lazy(() => import("@/pages/lead-management/campaign/engagement-form/[id]"));
const CampaignLeadsPage = lazy(() => import("@/pages/lead-management/campaign/leads/[id]"));
const PipelineIndexPage = lazy(() => import("@/pages/lead-management/pipeline/index"));
const PipelineViewPage = lazy(() => import("@/pages/lead-management/pipeline/view/[id]"));
const LeadSummaryReport = lazy(() => import("@/pages/lead-management/pipeline/lead-summary-report"));
const LeadSettingsPage = lazy(() => import("@/pages/lead-management/settings/index"));
const ContactsPage = lazy(() => import("@/pages/lead-management/contacts/index"));
const ContactViewPage = lazy(() => import("@/pages/lead-management/contacts/view"));
const LeadDashboardPage = lazy(() => import("@/pages/lead-management/dashboard"));
const LeadReportsPage = lazy(() => import("@/pages/lead-management/reports"));
const DialHomePage = lazy(() => import("@/pages/dial"));
const DialLeadsPage = lazy(() => import("@/pages/dial/leads"));
const DialLeadViewPage = lazy(() => import("@/pages/dial/leads/view/[id]"));
const DialTasksPage = lazy(() => import("@/pages/dial/tasks"));
const AssignToMePage = lazy(() => import("@/pages/dial/tasks/assign-to-me"));
const ReportedByMePage = lazy(() => import("@/pages/dial/tasks/reported-by-me"));
const DialReportsPage = lazy(() => import("@/pages/dial/reports"));
const DialCallLogsPage = lazy(() => import("@/pages/dial/call-logs"));
const DialCampaignsPage = lazy(() => import("@/pages/dial/campaigns"));
const DialWalkInLeadsPage = lazy(() => import("@/pages/dial/walk-in-leads"));
const DialWhatsappPage = lazy(() => import("@/pages/dial/whatsapp"));
const DialLeadsQueuePage = lazy(() => import("@/pages/dial/leads/queue"));
const PhotographyClientPage = lazy(() => import("@/pages/photography/client"));
const PhotographyClientAddPage = lazy(() => import("@/pages/photography/client/add"));
const PhotographyClientEditPage = lazy(() => import("@/pages/photography/client/edit/[id]"));
const PhotographyClientViewPage = lazy(() => import("@/pages/photography/client/view/[id]"));
const PhotographyEstimatePage = lazy(() => import("@/pages/photography/estimate"));
const PhotographyEstimateAddPage = lazy(() => import("@/pages/photography/estimate/add"));
const PhotographyEstimateEditPage = lazy(() => import("@/pages/photography/estimate/edit/[id]"));
const PhotographyEstimateViewPage = lazy(() => import("@/pages/photography/estimate/view/[id]"));
const PhotographyTemplatePage = lazy(() => import("@/pages/photography/template"));
const PhotographyTemplateAddPage = lazy(() => import("@/pages/photography/template/add"));
const PhotographyTemplateEditPage = lazy(() => import("@/pages/photography/template/edit/[id]"));
const PhotographyTemplateViewPage = lazy(() => import("@/pages/photography/template/view/[id]"));
const PhotographyDeliverablePage = lazy(() => import("@/pages/photography/deliverable"));
const PhotographyBookingPage = lazy(() => import("@/pages/photography/booking"));
const PhotographyBookingViewPage = lazy(() => import("@/pages/photography/booking/view/[id]"));
const PhotographyPaymentPage = lazy(() => import("@/pages/photography/payment"));
const PhotographyPaymentViewPage = lazy(() => import("@/pages/photography/payment/view/[id]"));
const PhotographyPaymentReceiptPage = lazy(() => import("@/pages/photography/payments-receipt/[id]"));
const PhotographyPaymentStorePage = lazy(() => import("@/pages/photography/paymentStore"));
const PhotographyPaymentStoreAddPage = lazy(() => import("@/pages/photography/paymentStore/add"));
const PhotographyPaymentStoreEditPage = lazy(() => import("@/pages/photography/paymentStore/edit/[id]"));
const PhotographyPaymentStoreViewPage = lazy(() => import("@/pages/photography/paymentStore/view/[id]"));
const PhotographyBookingAddPage = lazy(() => import("@/pages/photography-bookings/add"));

const shouldIgnoreConsoleMessage = (args: unknown[]) => {
    const firstMessage = args[0];
    if (typeof firstMessage !== "string") return false;
    if (firstMessage.includes("Unchecked runtime.lastError: Could not establish connection. Receiving end does not exist.")) return true;
    if (firstMessage.includes("Could not establish connection. Receiving end does not exist.")) return true;
    return false;
};

const originalConsoleError = console.error.bind(console);
console.error = (...args: unknown[]) => {
    if (shouldIgnoreConsoleMessage(args)) return;
    originalConsoleError(...args);
};

const originalConsoleWarn = console.warn.bind(console);
console.warn = (...args: unknown[]) => {
    if (shouldIgnoreConsoleMessage(args)) return;
    originalConsoleWarn(...args);
};

const installNumberInputWheelGuard = () => {
    const appWindow = window as Window & { __numberInputWheelGuardInstalled?: boolean };
    if (appWindow.__numberInputWheelGuardInstalled) return;

    const handleWheelOnNumberInput = (event: WheelEvent) => {
        const target = event.target;
        if (!(target instanceof HTMLInputElement)) return;
        if (target.type !== "number") return;
        if (document.activeElement !== target) return;
        event.preventDefault();
    };

    document.addEventListener("wheel", handleWheelOnNumberInput, { passive: false, capture: true });
    appWindow.__numberInputWheelGuardInstalled = true;
};

installNumberInputWheelGuard();

const clearCompanyFavicons = () => {
    document.head.querySelectorAll<HTMLLinkElement>('link[data-company-favicon="true"]').forEach((link) => link.remove());
};

const guessFaviconType = (href: string) => {
    if (href.startsWith("data:image/")) {
        const semi = href.indexOf(";");
        const comma = href.indexOf(",");
        const end = semi !== -1 ? semi : comma;
        return end !== -1 ? href.slice("data:".length, end) : undefined;
    }

    const normalized = href.split("#")[0]?.split("?")[0]?.toLowerCase() ?? "";
    if (normalized.endsWith(".svg")) return "image/svg+xml";
    if (normalized.endsWith(".png")) return "image/png";
    if (normalized.endsWith(".ico")) return "image/x-icon";
    if (normalized.endsWith(".jpg") || normalized.endsWith(".jpeg")) return "image/jpeg";
    if (normalized.endsWith(".webp")) return "image/webp";
    return undefined;
};

const setCompanyFavicons = (href: string) => {
    clearCompanyFavicons();

    const type = guessFaviconType(href);

    const icon = document.createElement("link");
    icon.rel = "icon";
    icon.href = href;
    if (type) icon.type = type;
    icon.setAttribute("data-company-favicon", "true");

    const shortcut = document.createElement("link");
    shortcut.rel = "shortcut icon";
    shortcut.href = href;
    if (type) shortcut.type = type;
    shortcut.setAttribute("data-company-favicon", "true");

    document.head.appendChild(icon);
    document.head.appendChild(shortcut);
};

const CompanyFaviconSync = () => {
    const favicon = useStoreCompany((s) => s.company?.favicon);

    useEffect(() => {
        if (!favicon) {
            clearCompanyFavicons();
            return;
        }

        setCompanyFavicons(favicon);
    }, [favicon]);

    return null;
};

const RouteFallback = () => (
    <div role="status" aria-live="polite" aria-label="Loading page" className="flex min-h-[50vh] w-full items-center justify-center">
        <div className="h-8 w-8 animate-pulse rounded-full bg-muted" aria-hidden="true" />
    </div>
);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ThemeProvider>
            <CompanyFaviconSync />
            <Snackbar />
            <BrowserRouter>
                <RouteProvider>
                    <Suspense fallback={<RouteFallback />}>
                        <Routes>
                            <Route path="/" element={<HomeScreen />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/dashboard" element={<DashboardPage />} />
                            <Route path="/itinerary/list" element={<ItineraryListPage />} />
                            <Route path="/itinerary/list/add" element={<ItineraryEditPage />} />
                            <Route path="/itinerary/list/view/:id" element={<ItineraryViewPage />} />
                            <Route path="/itinerary/list/edit/:id" element={<ItineraryEditPage />} />
                            <Route path="/routes" element={<RoutesPage />} />
                            <Route path="/docs" element={<PlaceholderPage />} />
                            <Route path="/dial/home" element={<DialHomePage />} />
                            <Route path="/dial/leads" element={<DialLeadsPage />} />
                            <Route path="/dial/leads/queue" element={<DialLeadsQueuePage />} />
                            <Route path="/dial/leads/view/:id" element={<DialLeadViewPage />} />
                            <Route path="/dial/tasks" element={<DialTasksPage />} />
                            <Route path="/dial/tasks/assign-to-me" element={<AssignToMePage />} />
                            <Route path="/dial/tasks/reported-by-me" element={<ReportedByMePage />} />
                            <Route path="/dial/reports" element={<DialReportsPage />} />
                            <Route path="/dial/call-logs" element={<DialCallLogsPage />} />
                            <Route path="/dial/campaigns" element={<DialCampaignsPage />} />
                            <Route path="/dial/walk-in-leads" element={<DialWalkInLeadsPage />} />
                            <Route path="/dial/whatsapp" element={<DialWhatsappPage />} />
                            <Route path="/bookings/assignment" element={<AssignmentPage />} />
                            <Route path="/bookings/assignment/add" element={<AssignmentAddPage />} />
                            <Route path="/bookings/assignment/view/:id" element={<AssignmentViewPage />} />
                            <Route path="/bookings/assignment/edit/:id" element={<AssignmentEditPage />} />
                            <Route path="/bookings/booking" element={<BookingPage />} />
                            <Route path="/bookings/booking/view/:id" element={<BookingViewPage />} />
                            <Route path="/bookings/bookingtype" element={<BookingTypePage />} />
                            <Route path="/bookings/bookingtype/add" element={<BookingTypeAddPage />} />
                            <Route path="/bookings/bookingtype/view/:id" element={<BookingTypeViewPage />} />
                            <Route path="/bookings/bookingtype/edit/:id" element={<BookingTypeEditPage />} />
                            <Route path="/bookings/cabbooking" element={<CabBookingPage />} />
                            <Route path="/bookings/cabbooking/view/:id" element={<PlaceholderPage />} />
                            <Route path="/bookings/packagedetail" element={<PackageDetailPage />} />
                            <Route path="/bookings/generatePayment/:id" element={<GeneratePaymentPage />} />
                            <Route path="/bookings/payment" element={<PaymentPage />} />
                            <Route path="/bookings/payment/view/:id" element={<PaymentViewPage />} />
                            <Route path="/bookings/payment/payment-link/:id" element={<PaymentLinkPage />} />
                            <Route path="/bookings/payment/payment-link/view/:id" element={<PaymentLinkViewPage />} />
                            <Route path="/bookings/payment/payment-link/edit/:id" element={<PaymentLinkEditPage />} />
                            <Route path="/bookings/paymentStore" element={<PaymentStorePage />} />
                            <Route path="/bookings/paymentStore/add" element={<PaymentStoreAddPage />} />
                            <Route path="/bookings/paymentStore/add/:id" element={<PaymentStoreEditPage />} />
                            <Route path="/bookings/paymentStore/view/:id" element={<PaymentStoreViewPage />} />
                            <Route path="/bookings/paymentStore/edit/:id" element={<PaymentStoreEditPage />} />
                            <Route path="/bookings/vendorlist" element={<VendorListPage />} />
                            <Route path="/bookings/vendorlist/add" element={<VendorListAddPage />} />
                            <Route path="/bookings/vendorlist/view/:id" element={<VendorListViewPage />} />
                            <Route path="/bookings/vendorlist/edit/:id" element={<VendorListEditPage />} />
                            <Route path="/bookings/reports/payment" element={<ReportsPaymentPage />} />
                            <Route path="/bookings/reports/mails" element={<ReportsMailsPage />} />
                            <Route path="/bookings/reports/profitReports" element={<ReportsProfitPage />} />
                            <Route path="/itinerary" element={<PlaceholderPage />} />
                            <Route path="/itinerary/site" element={<ItinerarySiteListPage />} />
                            <Route path="/itinerary/site/add" element={<ItinerarySiteAddPage />} />
                            <Route path="/itinerary/site/edit/:id" element={<ItinerarySiteEditPage />} />
                            <Route path="/itinerary/site/view/:id" element={<ItinerarySiteViewPage />} />
                            <Route path="/itinerary/area" element={<ItineraryAreaListPage />} />
                            <Route path="/itinerary/area/add" element={<ItineraryAreaAddPage />} />
                            <Route path="/itinerary/area/edit/:id" element={<ItineraryAreaEditPage />} />
                            <Route path="/itinerary/area/view/:id" element={<ItineraryAreaViewPage />} />
                            <Route path="/itinerary/hotel" element={<ItineraryHotelListPage />} />
                            <Route path="/itinerary/hotel/add" element={<ItineraryHotelAddPage />} />
                            <Route path="/itinerary/hotel/edit/:id" element={<ItineraryHotelEditPage />} />
                            <Route path="/itinerary/hotel/view/:id" element={<ItineraryHotelViewPage />} />
                            <Route path="/itinerary/hotel/category" element={<ItineraryHotelCategoryListPage />} />
                            <Route path="/itinerary/hotel/category/add" element={<ItineraryHotelCategoryAddPage />} />
                            <Route path="/itinerary/hotel/category/edit/:id" element={<ItineraryHotelCategoryEditPage />} />
                            <Route path="/itinerary/hotel/category/view/:id" element={<ItineraryHotelCategoryViewPage />} />
                            <Route path="/itinerary/clientitinerary" element={<ClientItineraryListPage />} />
                            <Route path="/itinerary/clientitinerary/add" element={<ClientItineraryAddPage />} />
                            <Route path="/itinerary/clientitinerary/view/:id" element={<ClientItineraryViewPage />} />
                            <Route path="/itinerary/clientitinerary/edit/:id" element={<ClientItineraryEditPage />} />
                            <Route path="/itinerary/reports/mails" element={<ItineraryReportMailsPage />} />
                            <Route path="/itinerary/reports/quotations" element={<ItineraryReportQuotationsPage />} />
                            <Route path="/itinerary/saved-itinerary" element={<SavedItineraryListPage />} />
                            <Route path="/itinerary/saved-itinerary/edit/:id" element={<EditSavedItineraryPage />} />
                            <Route path="/package-mail/:id" element={<PackageItineraryMailPage />} />
                            <Route path="/lead-management/dashboard" element={<LeadDashboardPage />} />
                            <Route path="/lead-management/leads" element={<LeadsIndexPage />} />
                            <Route path="/lead-management/leads/add" element={<LeadsAddPage />} />
                            <Route path="/lead-management/leads/edit/:id" element={<LeadsEditPage />} />
                            <Route path="/lead-management/leads/view/:id" element={<LeadsViewPage />} />
                            <Route path="/lead-management/enquiry" element={<EnquiryIndexPage />} />
                            <Route path="/lead-management/contacts" element={<ContactsPage />} />
                            <Route path="/lead-management/contacts/view" element={<ContactViewPage />} />
                            <Route path="/lead-management/reports" element={<LeadReportsPage />} />
                            <Route path="/lead-management/campaign" element={<CampaignIndexPage />} />
                            <Route path="/lead-management/campaign/add" element={<Navigate to="/lead-management/campaign" replace />} />
                            <Route path="/lead-management/campaign/edit/:id" element={<Navigate to="/lead-management/campaign" replace />} />
                            <Route path="/lead-management/campaign/view/:id" element={<CampaignViewPage />} />
                            <Route path="/lead-management/campaign/view/:id/engagement-form" element={<CampaignEngagementFormPage />} />
                            <Route path="/lead-management/campaign/leads/:id" element={<CampaignLeadsPage />} />
                            <Route path="/lead-management/pipeline" element={<PipelineIndexPage />} />
                            <Route path="/lead-management/pipeline/add" element={<Navigate to="/lead-management/settings?tab=pipelines" replace />} />
                            <Route path="/lead-management/pipeline/view/:id" element={<PipelineViewPage />} />
                            <Route path="/lead-management/pipeline/view/:id/lead-summary" element={<LeadSummaryReport />} />
                            <Route path="/lead-management/pipeline/edit/:id" element={<Navigate to="/lead-management/settings?tab=pipelines" replace />} />
                            <Route path="/lead-management/settings" element={<LeadSettingsPage />} />
                            <Route path="/lead-management/settings/contact-properties" element={<Navigate to="/lead-management/settings?tab=contactProperties" replace />} />
                            <Route path="/photography/client" element={<PhotographyClientPage />} />
                            <Route path="/photography/client/add" element={<PhotographyClientAddPage />} />
                            <Route path="/photography/client/edit/:id" element={<PhotographyClientEditPage />} />
                            <Route path="/photography/client/view/:id" element={<PhotographyClientViewPage />} />
                            <Route path="/photography/estimate" element={<PhotographyEstimatePage />} />
                            <Route path="/photography/estimate/add" element={<PhotographyEstimateAddPage />} />
                            <Route path="/photography/estimate/edit/:id" element={<PhotographyEstimateEditPage />} />
                            <Route path="/photography/estimate/view/:id" element={<PhotographyEstimateViewPage />} />
                            <Route path="/photography/template" element={<PhotographyTemplatePage />} />
                            <Route path="/photography/template/add" element={<PhotographyTemplateAddPage />} />
                            <Route path="/photography/template/edit/:id" element={<PhotographyTemplateEditPage />} />
                            <Route path="/photography/template/view/:id" element={<PhotographyTemplateViewPage />} />
                            <Route path="/photography/deliverable" element={<PhotographyDeliverablePage />} />
                            <Route path="/photography/booking" element={<PhotographyBookingPage />} />
                            <Route path="/photography/bookings" element={<PhotographyBookingPage />} />
                            <Route path="/photography/booking/view/:id" element={<PhotographyBookingViewPage />} />
                            <Route path="/photography/payments" element={<PhotographyPaymentPage />} />
                            <Route path="/photography/payments/view/:id" element={<PhotographyPaymentViewPage />} />
                            <Route path="/photography/payments-receipt/:id" element={<PhotographyPaymentReceiptPage />} />
                            <Route path="/photography/paymentStore" element={<PhotographyPaymentStorePage />} />
                            <Route path="/photography/paymentStore/add" element={<PhotographyPaymentStoreAddPage />} />
                            <Route path="/photography/paymentStore/add/:id" element={<PhotographyPaymentStoreEditPage />} />
                            <Route path="/photography/paymentStore/view/:id" element={<PhotographyPaymentStoreViewPage />} />
                            <Route path="/photography/paymentStore/edit/:id" element={<PhotographyPaymentStoreEditPage />} />
                            <Route path="/photography/bookings/add" element={<PhotographyBookingAddPage />} />
                            <Route path="/packages/list" element={<PackageListPage />} />
                            <Route path="/packages/list/add" element={<PackageAddPage />} />
                            <Route path="/packages/list/edit/:id" element={<PackageEditPage />} />
                            <Route path="/packages/list/view/:id" element={<PackageViewPage />} />
                            <Route path="/packages/location" element={<PackageLocationListPage />} />
                            <Route path="/packages/location/add" element={<PackageLocationAddPage />} />
                            <Route path="/packages/location/edit/:id" element={<PackageLocationEditPage />} />
                            <Route path="/packages/location/view/:id" element={<PackageLocationViewPage />} />
                            <Route path="/packages/packageType" element={<PackageTypeListPage />} />
                            <Route path="/packages/packageType/add" element={<PackageTypeAddPage />} />
                            <Route path="/packages/packageType/edit/:id" element={<PackageTypeEditPage />} />
                            <Route path="/packages/packageType/view/:id" element={<PackageTypeViewPage />} />
                            <Route path="/packages/packageTags" element={<PackageTagsListPage />} />
                            <Route path="/packages/packageTags/add" element={<PackageTagsAddPage />} />
                            <Route path="/packages/packageTags/edit/:id" element={<PackageTagsEditPage />} />
                            <Route path="/packages/packageTags/view/:id" element={<PackageTagsViewPage />} />
                            <Route path="/additional-data/settings/package-inclusions" element={<PackageInclusionsListPage />} />
                            <Route path="/additional-data/settings/package-inclusions/add" element={<PackageInclusionsAddPage />} />
                            <Route path="/additional-data/settings/package-inclusions/view/:id" element={<PackageInclusionsViewPage />} />
                            <Route path="/additional-data/settings/package-inclusions/edit/:id" element={<PackageInclusionsEditPage />} />
                            <Route path="/additional-data/settings/package-exclusions" element={<PackageExclusionsListPage />} />
                            <Route path="/additional-data/settings/package-exclusions/add" element={<PackageExclusionsAddPage />} />
                            <Route path="/additional-data/settings/package-exclusions/view/:id" element={<PackageExclusionsViewPage />} />
                            <Route path="/additional-data/settings/package-exclusions/edit/:id" element={<PackageExclusionsEditPage />} />
                            <Route path="/settings/user" element={<SettingsUserListPage />} />
                            <Route path="/settings/user/add" element={<SettingsUserAddPage />} />
                            <Route path="/settings/user/:id" element={<SettingsUserViewPage />} />
                            <Route path="/settings/user/view/:id" element={<SettingsUserViewPage />} />
                            <Route path="/settings/user/edit/:id" element={<SettingsUserEditPage />} />
                            <Route path="/settings/mailer" element={<SettingsMailerListPage />} />
                            <Route path="/settings/mailer/add" element={<SettingsMailerAddPage />} />
                            <Route path="/settings/mailer/view/:id" element={<SettingsMailerViewPage />} />
                            <Route path="/settings/mailer/edit/:id" element={<SettingsMailerEditPage />} />
                            <Route path="/settings/role" element={<SettingsRoleListPage />} />
                            <Route path="/settings/role/add" element={<SettingsRoleAddPage />} />
                            <Route path="/settings/role/view/:id" element={<SettingsRoleViewPage />} />
                            <Route path="/settings/role/edit/:id" element={<SettingsRoleEditPage />} />
                            <Route path="/settings/configuration_manager" element={<PlaceholderPage />} />
                            <Route path="/additional-data/settings/template" element={<TemplateListPage />} />
                            <Route path="/additional-data/settings/template/add" element={<TemplateAddPage />} />
                            <Route path="/additional-data/settings/template/view/:id" element={<TemplateViewPage />} />
                            <Route path="/additional-data/settings/template/edit/:id" element={<TemplateEditPage />} />
                            <Route path="/additional-data/settings/template/template-one" element={<PlaceholderPage />} />
                            <Route path="/package-mail/:id" element={<PackageItineraryMailPage />} />
                            <Route path="/package-voucher/:id" element={<PackageVoucherPage />} />
                            <Route path="/payments-receipt/:id" element={<PaymentReceiptPage />} />
                            <Route path="/hotel-images/:id" element={<HotelImagesPage />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </Suspense>
                </RouteProvider>
            </BrowserRouter>
        </ThemeProvider>
    </StrictMode>,
);
