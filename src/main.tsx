import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { HomeScreen } from "@/pages/home-screen";
import { NotFound } from "@/pages/not-found";
import { RouteProvider } from "@/providers/router-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import "@/styles/globals.css";
import LoginPage from "@/pages/login";
import DashboardPage from "@/pages/dashboard/index";
import ItineraryListPage from "@/pages/itinerary/list/index";
import ItineraryViewPage from "@/pages/itinerary/list/view/[id]";
import ItineraryEditPage from "@/pages/itinerary/list/edit/[id]";
import ItineraryAreaListPage from "@/pages/itinerary/area";
import ItineraryAreaAddPage from "@/pages/itinerary/area/add";
import ItineraryAreaEditPage from "@/pages/itinerary/area/edit/[id]";
import ItineraryAreaViewPage from "@/pages/itinerary/area/view/[id]";
import ItinerarySiteListPage from "@/pages/itinerary/site";
import ItinerarySiteAddPage from "@/pages/itinerary/site/add";
import ItinerarySiteEditPage from "@/pages/itinerary/site/edit/[id]";
import ItinerarySiteViewPage from "@/pages/itinerary/site/view/[id]";
import ItineraryHotelListPage from "@/pages/itinerary/hotel";
import ItineraryHotelAddPage from "@/pages/itinerary/hotel/add";
import ItineraryHotelEditPage from "@/pages/itinerary/hotel/edit/[id]";
import ItineraryHotelViewPage from "@/pages/itinerary/hotel/view/[id]";
import ItineraryHotelCategoryListPage from "./pages/itinerary/hotel/category";
import ItineraryHotelCategoryAddPage from "./pages/itinerary/hotel/category/add";
import ItineraryHotelCategoryEditPage from "./pages/itinerary/hotel/category/edit/[id]";
import ItineraryHotelCategoryViewPage from "./pages/itinerary/hotel/category/view/[id]";
import BookingPage from "@/pages/bookings/booking/index";
import AssignmentPage from "@/pages/bookings/assignment/index";
import BookingTypePage from "@/pages/bookings/bookingtype/index";
import BookingTypeAddPage from "@/pages/bookings/bookingtype/add";
import BookingTypeEditPage from "@/pages/bookings/bookingtype/edit/[id]";
import BookingTypeViewPage from "@/pages/bookings/bookingtype/view/[id]";
import PaymentPage from "@/pages/bookings/payment/index";
import PaymentViewPage from "@/pages/bookings/payment/view/[id]";
import PaymentStorePage from "@/pages/bookings/paymentStore/index";
import PaymentStoreAddPage from "@/pages/bookings/paymentStore/add";
import PaymentStoreEditPage from "@/pages/bookings/paymentStore/edit/[id]";
import PaymentStoreViewPage from "@/pages/bookings/paymentStore/view/[id]";
import VendorListPage from "@/pages/bookings/vendorlist/index";
import VendorListAddPage from "@/pages/bookings/vendorlist/add";
import VendorListEditPage from "@/pages/bookings/vendorlist/edit/[id]";
import VendorListViewPage from "@/pages/bookings/vendorlist/view/[id]";
import PackageDetailPage from "@/pages/bookings/packagedetail/index";
import CabBookingPage from "@/pages/bookings/cabbooking/index";
import ReportsPaymentPage from "@/pages/bookings/reports/payment/index";
import ReportsMailsPage from "@/pages/bookings/reports/mails/index";
import ReportsProfitPage from "@/pages/bookings/reports/profitReports/index";
import ClientItineraryListPage from "@/pages/itinerary/clientitinerary/index";
import ClientItineraryAddPage from "@/pages/itinerary/clientitinerary/add/index";
import ClientItineraryViewPage from "@/pages/itinerary/clientitinerary/view/index";
import ClientItineraryEditPage from "@/pages/itinerary/clientitinerary/edit/index";
import SavedItineraryListPage from "@/pages/itinerary/saved-itinerary/index";
import EditSavedItineraryPage from "@/pages/itinerary/saved-itinerary/edit/[id]";
import ItineraryReportMailsPage from "@/pages/itinerary/reports/mails";
import ItineraryReportQuotationsPage from "@/pages/itinerary/reports/quotations";
import PackageItineraryMailPage from "@/pages/package-mail/[id]";
import HotelImagesPage from "@/pages/hotel-images/[id]";
import PlaceholderPage from "@/pages/placeholder";
import RoutesPage from "@/pages/routes";
import AssignmentViewPage from "./pages/bookings/assignment/view/[id]";
import AssignmentEditPage from "./pages/bookings/assignment/edit/[id]";
import AssignmentAddPage from "./pages/bookings/assignment/add";
import BookingViewPage from "./pages/bookings/booking/view/[id]";
import PaymentLinkPage from "@/pages/bookings/payment/payment-link/[id]";
import GeneratePaymentPage from "@/pages/bookings/generatePayment/[id]";
import PaymentLinkViewPage from "@/pages/bookings/payment/payment-link/view/[id]";
import PaymentLinkEditPage from "@/pages/bookings/payment/payment-link/edit/[id]";
import PackageVoucherPage from "@/pages/package-voucher/[id]";
import PaymentReceiptPage from "@/pages/payments-receipt/[id]";
import SettingsMailerListPage from "@/pages/settings/mailer";
import SettingsMailerAddPage from "@/pages/settings/mailer/add";
import SettingsMailerViewPage from "@/pages/settings/mailer/view/[id]";
import SettingsMailerEditPage from "@/pages/settings/mailer/edit/[id]";
import SettingsUserListPage from "@/pages/settings/user";
import SettingsUserAddPage from "@/pages/settings/user/add";
import SettingsUserEditPage from "@/pages/settings/user/edit/[id]";
import SettingsUserViewPage from "@/pages/settings/user/view/[id]";
import SettingsRoleListPage from "@/pages/settings/role";
import SettingsRoleAddPage from "@/pages/settings/role/add";
import SettingsRoleViewPage from "@/pages/settings/role/view/[id]";
import SettingsRoleEditPage from "@/pages/settings/role/edit/[id]";
import PackageListPage from "@/pages/packages/list";
import PackageAddPage from "@/pages/packages/list/add";
import PackageEditPage from "@/pages/packages/list/edit/[id]";
import PackageViewPage from "@/pages/packages/list/view/[id]";
import PackageLocationListPage from "@/pages/packages/location";
import PackageLocationAddPage from "@/pages/packages/location/add";
import PackageLocationEditPage from "@/pages/packages/location/edit/[id]";
import PackageLocationViewPage from "@/pages/packages/location/view/[id]";
import PackageTypeListPage from "@/pages/packages/packageType";
import PackageTypeAddPage from "@/pages/packages/packageType/add";
import PackageTypeEditPage from "@/pages/packages/packageType/edit/[id]";
import PackageTypeViewPage from "@/pages/packages/packageType/view/[id]";
import PackageTagsListPage from "@/pages/packages/packageTags";
import PackageTagsAddPage from "@/pages/packages/packageTags/add";
import PackageTagsEditPage from "@/pages/packages/packageTags/edit/[id]";
import PackageTagsViewPage from "@/pages/packages/packageTags/view/[id]";
import TemplateListPage from "@/pages/settings/template/index";
import TemplateAddPage from "@/pages/settings/template/add";
import TemplateEditPage from "@/pages/settings/template/edit/[id]";
import TemplateViewPage from "@/pages/settings/template/view/[id]";
import PackageInclusionsListPage from "@/pages/settings/package-inclusions";
import PackageInclusionsAddPage from "@/pages/settings/package-inclusions/add";
import PackageInclusionsEditPage from "@/pages/settings/package-inclusions/edit/[id]";
import PackageInclusionsViewPage from "@/pages/settings/package-inclusions/view/[id]";
import PackageExclusionsListPage from "@/pages/settings/package-exclusions";
import PackageExclusionsAddPage from "@/pages/settings/package-exclusions/add";
import PackageExclusionsEditPage from "@/pages/settings/package-exclusions/edit/[id]";
import PackageExclusionsViewPage from "@/pages/settings/package-exclusions/view/[id]";
import { Snackbar } from "@/components/application/snackbar/snackbar";
import LeadsIndexPage from "@/pages/lead-management/leads/index";
import LeadsAddPage from "@/pages/lead-management/leads/add";
import LeadsEditPage from "@/pages/lead-management/leads/edit/[id]";
import LeadsViewPage from "@/pages/lead-management/leads/view/[id]";
import CampaignIndexPage from "@/pages/lead-management/campaign/index";
import CampaignAddPage from "@/pages/lead-management/campaign/add";
import CampaignEditPage from "@/pages/lead-management/campaign/edit/[id]";
import CampaignViewPage from "@/pages/lead-management/campaign/view/[id]";
import PipelineIndexPage from "@/pages/lead-management/pipeline/index";
import PipelineAddPage from "@/pages/lead-management/pipeline/add";
import PipelineViewPage from "@/pages/lead-management/pipeline/view/[id]";
import PipelineEditPage from "@/pages/lead-management/pipeline/edit/[id]";
import LeadSettingsPage from "@/pages/lead-management/settings/index";
import ContactPropertiesPage from "@/pages/lead-management/settings/contact-properties/index";
import ContactPropertiesAddPage from "@/pages/lead-management/settings/contact-properties/add";
import ContactPropertiesEditPage from "@/pages/lead-management/settings/contact-properties/edit/[id]";
import PhotographyClientPage from "@/pages/photography/client";
import PhotographyClientAddPage from "@/pages/photography/client/add";
import PhotographyClientEditPage from "@/pages/photography/client/edit/[id]";
import PhotographyClientViewPage from "@/pages/photography/client/view/[id]";
import PhotographyEstimatePage from "@/pages/photography/estimate";
import PhotographyEstimateAddPage from "@/pages/photography/estimate/add";
import PhotographyEstimateEditPage from "@/pages/photography/estimate/edit/[id]";
import PhotographyEstimateViewPage from "@/pages/photography/estimate/view/[id]";
import PhotographyTemplatePage from "@/pages/photography/template";
import PhotographyTemplateAddPage from "@/pages/photography/template/add";
import PhotographyTemplateEditPage from "@/pages/photography/template/edit/[id]";
import PhotographyTemplateViewPage from "@/pages/photography/template/view/[id]";
import PhotographyDeliverablePage from "@/pages/photography/deliverable";
import PhotographyBookingPage from "@/pages/photography/booking";
import PhotographyBookingViewPage from "@/pages/photography/booking/view/[id]";
import PhotographyPaymentPage from "@/pages/photography/payment";
import PhotographyPaymentViewPage from "@/pages/photography/payment/view/[id]";
import PhotographyPaymentReceiptPage from "@/pages/photography/payments-receipt/[id]";
import PhotographyPaymentStorePage from "@/pages/photography/paymentStore";
import PhotographyPaymentStoreAddPage from "@/pages/photography/paymentStore/add";
import PhotographyPaymentStoreEditPage from "@/pages/photography/paymentStore/edit/[id]";
import PhotographyPaymentStoreViewPage from "@/pages/photography/paymentStore/view/[id]";
import PhotographyBookingAddPage from "@/pages/photography-bookings/add";

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

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ThemeProvider>
            <Snackbar />
            <BrowserRouter>
                <RouteProvider>
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
                        <Route path="/dial/home" element={<PlaceholderPage />} />
                        <Route path="/dial/leads" element={<PlaceholderPage />} />
                        <Route path="/dial/tasks" element={<PlaceholderPage />} />
                        <Route path="/dial/reports" element={<PlaceholderPage />} />
                        <Route path="/dial/call-logs" element={<PlaceholderPage />} />
                        <Route path="/dial/campaigns" element={<PlaceholderPage />} />
                        <Route path="/dial/walk-in-leads" element={<PlaceholderPage />} />
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
                        <Route path="/lead-management/leads" element={<LeadsIndexPage />} />
                        <Route path="/lead-management/leads/add" element={<LeadsAddPage />} />
                        <Route path="/lead-management/leads/edit/:id" element={<LeadsEditPage />} />
                        <Route path="/lead-management/leads/view/:id" element={<LeadsViewPage />} />
                        <Route path="/lead-management/campaign" element={<CampaignIndexPage />} />
                        <Route path="/lead-management/campaign/add" element={<CampaignAddPage />} />
                        <Route path="/lead-management/campaign/edit/:id" element={<CampaignEditPage />} />
                        <Route path="/lead-management/campaign/view/:id" element={<CampaignViewPage />} />
                        <Route path="/lead-management/pipeline" element={<PipelineIndexPage />} />
                        <Route path="/lead-management/pipeline/add" element={<PipelineAddPage />} />
                        <Route path="/lead-management/pipeline/view/:id" element={<PipelineViewPage />} />
                        <Route path="/lead-management/pipeline/edit/:id" element={<PipelineEditPage />} />
                        <Route path="/lead-management/settings" element={<LeadSettingsPage />} />
                        <Route path="/lead-management/settings/contact-properties" element={<ContactPropertiesPage />} />
                        <Route path="/lead-management/settings/contact-properties/add" element={<ContactPropertiesAddPage />} />
                        <Route path="/lead-management/settings/contact-properties/edit/:id" element={<ContactPropertiesEditPage />} />
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
                </RouteProvider>
            </BrowserRouter>
        </ThemeProvider>
    </StrictMode>,
);
