import { DefaultLayout } from "@/layouts/DefaultLayout";
import { Link } from "react-router";

const routes = [
    "/login",
    "/dashboard",
    "/docs",
    "/dial/home",
    "/dial/leads",
    "/dial/tasks",
    "/dial/reports",
    "/dial/call-logs",
    "/dial/campaigns",
    "/dial/walk-in-leads",
    "/bookings/assignment",
    "/bookings/assignment/view/1",
    "/bookings/booking",
    "/bookings/booking/view/1",
    "/bookings/bookingtype",
    "/bookings/bookingtype/view/1",
    "/bookings/cabbooking",
    "/bookings/cabbooking/view/1",
    "/bookings/packagedetail",
    "/bookings/payment",
    "/bookings/payment/view/1",
    "/bookings/payment/payment-link/1",
    "/bookings/paymentStore",
    "/bookings/vendorlist",
    "/bookings/vendorlist/view/1",
    "/bookings/reports/payment",
    "/bookings/reports/mails",
    "/bookings/reports/profitReports",
    "/itinerary",
    "/itinerary/list",
    "/itinerary/list/view/1",
    "/itinerary/list/edit/1",
    "/itinerary/site",
    "/itinerary/site/view/1",
    "/itinerary/area",
    "/itinerary/hotel",
    "/itinerary/hotel/category",
    "/itinerary/hotel/view/1",
    "/itinerary/clientitinerary",
    "/itinerary/clientitinerary/view/1",
    "/itinerary/reports/mails",
    "/itinerary/reports/quotations",
    "/itinerary/saved-itinerary",
    "/lead-management/leads",
    "/lead-management/leads/view/1",
    "/lead-management/pipeline",
    "/lead-management/pipeline/view/1",
    "/lead-management/campaign",
    "/lead-management/campaign/view/1",
    "/lead-management/settings",
    "/packages/list",
    "/packages/list/view/1",
    "/packages/location",
    "/packages/location/view/1",
    "/packages/packageType",
    "/packages/packageType/view/1",
    "/packages/packageTags",
    "/packages/packageTags/view/1",
    "/package-inclusions",
    "/package-exclusions",
    "/settings/user",
    "/settings/user/view/1",
    "/settings/mailer",
    "/settings/mailer/add",
    "/settings/mailer/view/1",
    "/settings/mailer/edit/1",
    "/settings/configuration_manager",
    "/template",
    "/template/template-one",
    "/package-mail/1",
    "/package-voucher/1",
    "/payments-receipt/1",
    "/hotel-images/1",
];

export default function RoutesPage() {
    return (
        <DefaultLayout>
            <div className="space-y-3">
                <div>
                    <h1 className="text-xl font-semibold">Routes</h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Quick links to verify each page renders.</p>
                </div>
                <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                    {routes.map((r) => (
                        <Link
                            key={r}
                            to={r}
                            className="rounded-lg border border-gray-200 dark:border-gray-800 px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-[#111318]"
                        >
                            {r}
                        </Link>
                    ))}
                </div>
            </div>
        </DefaultLayout>
    );
}
