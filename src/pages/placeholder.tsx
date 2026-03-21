import { DefaultLayout } from "@/layouts/DefaultLayout";
import { useLocation, useParams } from "react-router";

export default function PlaceholderPage() {
    const location = useLocation();
    const params = useParams();
    return (
        <DefaultLayout>
            <div className="space-y-2">
                <h1 className="text-xl font-semibold">Page scaffolded</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Path: {location.pathname}</p>
                <pre className="rounded-lg border border-gray-200 dark:border-gray-800 p-4">
                    {JSON.stringify(params, null, 2)}
                </pre>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    UI migration to Untitled UI in progress. Data wiring preserved via services.
                </p>
            </div>
        </DefaultLayout>
    );
}
