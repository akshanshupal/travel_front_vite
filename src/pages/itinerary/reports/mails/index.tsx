import { Badge } from "@/components/base/badges/badges";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Input } from "@/components/base/input/input";
import { Select } from "@/components/base/select/select";
import { SelectItem } from "@/components/base/select/select-item";
import { StickyTable, Table, TableCard } from "@/components/application/table/table";
import { PaginationButtonGroup } from "@/components/application/pagination/pagination";
import { DatePicker } from "@/components/application/date-picker/date-picker";
import { DateRangePicker } from "@/components/application/date-picker/date-range-picker";
import { DefaultLayout } from "@/layouts/DefaultLayout";
import { useAvailableTableWidth } from "@/hooks/use-available-table-width";
import { useStoreSnackbar } from "@/store/snackbar";
import { useStoreLogin } from "@/store/login";
import { getSalesEx } from "@/utils/services/salesService";
import { agentDurationWiseSendMails, agentWiseSendMails, getSentMailById } from "@/utils/services/mailService";
import { RefreshCw01, SearchLg } from "@untitledui/icons";
import { getUser } from "@/utils/services/userService";
import { useEffect, useMemo, useState } from "react";
import type { DateValue } from "react-aria-components";
import type { RangeValue } from "@react-types/shared";
import { getLocalTimeZone, startOfMonth, today } from "@internationalized/date";
import { Bar, Line } from "react-chartjs-2";
import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    type ChartOptions,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    Title,
    Tooltip as ChartTooltip,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, ChartTooltip, Legend);

type DateRangeValue = RangeValue<DateValue>;

const statusColorMap: Record<string, "success" | "error"> = {
    true: "success",
    false: "error",
};

const emailFunctionTitleMap: Record<string, string> = {
    sendItineraryMail: "Quotation Mail",
};


const chartPalette = [
    { bg: "rgba(75, 192, 192, 0.5)", border: "rgb(75, 192, 192)" },
    { bg: "rgba(255, 99, 132, 0.5)", border: "rgb(255, 99, 132)" },
    { bg: "rgba(255, 206, 86, 0.5)", border: "rgb(255, 206, 86)" },
    { bg: "rgba(54, 162, 235, 0.5)", border: "rgb(54, 162, 235)" },
    { bg: "rgba(153, 102, 255, 0.5)", border: "rgb(153, 102, 255)" },
    { bg: "rgba(255, 159, 64, 0.5)", border: "rgb(255, 159, 64)" },
    { bg: "rgba(76, 175, 80, 0.5)", border: "rgb(76, 175, 80)" },
    { bg: "rgba(233, 30, 99, 0.5)", border: "rgb(233, 30, 99)" },
    { bg: "rgba(3, 169, 244, 0.5)", border: "rgb(3, 169, 244)" },
    { bg: "rgba(121, 85, 72, 0.5)", border: "rgb(121, 85, 72)" },
];

const getColorByIndex = (index: number) => chartPalette[index % chartPalette.length];

const formatRangeLabel = (dateStr: string, item: any) => {
    if (!dateStr) return "N/A";

    if (dateStr.includes("Week")) {
        const fromDate = item.fromDate
            ? new Date(item.fromDate).toLocaleDateString("en-GB", { day: "2-digit", month: "short" })
            : "";
        const toDate = item.toDate
            ? new Date(item.toDate).toLocaleDateString("en-GB", { day: "2-digit", month: "short" })
            : "";
        return fromDate && toDate ? `${dateStr} (${fromDate} - ${toDate})` : dateStr;
    }

    if (dateStr.includes("-") && dateStr.split("-").length === 2) {
        const [month, year] = dateStr.split("-");
        return new Date(Number(year), Number(month) - 1).toLocaleDateString("en-GB", { month: "short", year: "2-digit" });
    }

    const parsed = new Date(dateStr);
    if (Number.isNaN(parsed.getTime())) return dateStr;
    return parsed.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "2-digit" });
};

const ItinerarySentMails = () => {
    const { showSnackbar } = useStoreSnackbar();
    const [users, setUsers] = useState<any[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response: any = await getUser({ limit: "all", status: true });
                if (response && Array.isArray(response)) {
                    setUsers(response);
                }
            } catch (error: any) {
                showSnackbar({
                    title: "Error",
                    description: error?.message || "Failed to fetch users.",
                    color: "danger",
                });
            }
        };
        fetchUsers();
    }, [showSnackbar]);

    return (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <DurationWiseGraph users={users} />
            <ExecutiveWiseGraph />
        </div>
    );
};

const DurationWiseGraph = ({ users }: { users: any[] }) => {
    const { showSnackbar } = useStoreSnackbar();
    const user = useStoreLogin((state) => state.user);
    const isAgent = String(user?.type || "").toUpperCase() === "AGENT";
    const agentId = (user as any)?.id || (user as any)?._id || "";
    const todayValue = today(getLocalTimeZone());
    const monthStart = startOfMonth(todayValue);
    const yesterdayValue = todayValue.subtract({ days: 1 });

    const [isLoading, setIsLoading] = useState(false);
    const [graphFilters, setGraphFilters] = useState({
        sendBy: isAgent && agentId ? String(agentId) : "",
        grouping: "day",
        range: { start: monthStart, end: todayValue } as DateRangeValue,
        chartType: "bar",
        isCustomDate: false,
    });
    const [graphData, setGraphData] = useState({
        labels: [] as string[],
        datasets: [] as any[],
    });



    useEffect(() => {
        const fetchGraphData = async () => {
            setIsLoading(true);
            try {
                const params: any = {
                    grouping: graphFilters.grouping,
                };
                if (graphFilters.range.start) params.from = graphFilters.range.start.toString();
                if (graphFilters.range.end) params.to = graphFilters.range.end.toString();
                if (isAgent && agentId) params.sendBy = agentId;
                else if (graphFilters.sendBy) params.sendBy = graphFilters.sendBy;

                const result: any = await agentDurationWiseSendMails(params);
                const data = Array.isArray(result) ? result : result?.data || [];
                if (!data || data.length === 0) {
                    setGraphData({
                        labels: ["No Data"],
                        datasets: [
                            {
                                label: "Total Mails Sent",
                                data: [0],
                                borderColor: "rgb(75, 192, 192)",
                                backgroundColor: "rgba(75, 192, 192, 0.5)",
                                tension: 0.1,
                            },
                        ],
                    });
                    return;
                }

                const labels = data.map((item: any) => formatRangeLabel(item.field, item));
                const totals = data.map((item: any) => item.totalMails ?? 0);
                setGraphData({
                    labels,
                    datasets: [
                        {
                            label: "Total Mails Sent",
                            data: totals,
                            borderColor: "rgb(75, 192, 192)",
                            backgroundColor: "rgba(75, 192, 192, 0.5)",
                            tension: 0.1,
                            fill: false,
                        },
                    ],
                });
            } catch (error: any) {
                showSnackbar({
                    title: "Error",
                    description: error?.message || "Failed to load duration graph.",
                    color: "danger",
                });
            } finally {
                setIsLoading(false);
            }
        };

        if (graphFilters.range.start && graphFilters.range.end) {
            fetchGraphData();
        }
    }, [graphFilters, showSnackbar]);

    const handleResetTempFilters = (close?: () => void) => {
        setGraphFilters({
            sendBy: isAgent && agentId ? String(agentId) : "",
            grouping: "day",
            range: { start: monthStart, end: todayValue } as DateRangeValue,
            chartType: "bar",
            isCustomDate: false,
        });
        if (close) close();
    };

    const graphOptions = useMemo<ChartOptions<"line">>(
        () => ({
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: "top" },
                title: {
                    display: true,
                    text: "Mail Sending Trends",
                },
            },
            scales: {
                x: {
                    ticks: {
                        maxRotation: 45,
                        minRotation: 45,
                        padding: 15,
                    },
                },
                y: { beginAtZero: true },
            },
        }),
        [],
    );

    return (
        <div className="rounded-xl border border-secondary bg-primary p-4">
            <div className="space-y-4">
                <div>
                    <h2 className="text-md font-semibold text-primary">Duration Wise Mails</h2>
                    <p className="text-sm text-tertiary">Track send volume over time</p>
                </div>

                {graphFilters.isCustomDate && (
                    <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
                        <Select
                            placeholder="Sales Executive"
                            selectedKey={graphFilters.sendBy}
                            isDisabled={isAgent}
                            onSelectionChange={(key) =>
                                setGraphFilters((prev) => ({
                                    ...prev,
                                    sendBy: String(key),
                                }))
                            }
                        >
                            {isAgent ? (
                                <SelectItem id={String(agentId)}>{(user as any)?.name || "You"}</SelectItem>
                            ) : (
                                <>
                                    <SelectItem id="">All Executives</SelectItem>
                                    {users.map((u) => (
                                        <SelectItem key={u.id || u._id} id={u.id || u._id}>
                                            {u.name || "Unknown"}
                                        </SelectItem>
                                    ))}
                                </>
                            )}
                        </Select>
                        <DateRangePicker
                            value={graphFilters.range}
                            onChange={(value) => {
                                setGraphFilters((prev) => ({
                                    ...prev,
                                    range: value ?? prev.range,
                                }));
                            }}
                        />
                        <Select
                            placeholder="Grouping"
                            selectedKey={graphFilters.grouping}
                            onSelectionChange={(key) =>
                                setGraphFilters((prev) => ({
                                    ...prev,
                                    grouping: String(key),
                                }))
                            }
                        >
                            <SelectItem id="day">Daily</SelectItem>
                            <SelectItem id="week">Weekly</SelectItem>
                            <SelectItem id="month">Monthly</SelectItem>
                        </Select>
                    </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-1 rounded-lg bg-secondary p-1">
                        <button
                            className={`rounded-md px-3 py-1 text-sm transition-all ${
                                !graphFilters.isCustomDate &&
                                graphFilters.range.start?.toString() === monthStart.toString() &&
                                graphFilters.range.end?.toString() === todayValue.toString()
                                    ? "bg-primary text-primary shadow-sm"
                                    : "text-tertiary hover:bg-secondary/70"
                            }`}
                            onClick={() =>
                                setGraphFilters((prev) => ({
                                    ...prev,
                                    range: { start: monthStart, end: todayValue },
                                    isCustomDate: false,
                                }))
                            }
                        >
                            This Month
                        </button>
                        <button
                            className={`rounded-md px-3 py-1 text-sm transition-all ${
                                !graphFilters.isCustomDate &&
                                graphFilters.range.start?.toString() === todayValue.toString() &&
                                graphFilters.range.end?.toString() === todayValue.toString()
                                    ? "bg-primary text-primary shadow-sm"
                                    : "text-tertiary hover:bg-secondary/70"
                            }`}
                            onClick={() =>
                                setGraphFilters((prev) => ({
                                    ...prev,
                                    range: { start: todayValue, end: todayValue },
                                    isCustomDate: false,
                                }))
                            }
                        >
                            Today
                        </button>
                        <button
                            className={`rounded-md px-3 py-1 text-sm transition-all ${
                                !graphFilters.isCustomDate &&
                                graphFilters.range.start?.toString() === yesterdayValue.toString() &&
                                graphFilters.range.end?.toString() === yesterdayValue.toString()
                                    ? "bg-primary text-primary shadow-sm"
                                    : "text-tertiary hover:bg-secondary/70"
                            }`}
                            onClick={() =>
                                setGraphFilters((prev) => ({
                                    ...prev,
                                    range: { start: yesterdayValue, end: yesterdayValue },
                                    isCustomDate: false,
                                }))
                            }
                        >
                            Yesterday
                        </button>
                        <button
                            className={`rounded-md px-3 py-1 text-sm transition-all ${
                                graphFilters.isCustomDate ? "bg-primary text-primary shadow-sm" : "text-tertiary hover:bg-secondary/70"
                            }`}
                            onClick={() =>
                                setGraphFilters((prev) => ({
                                    ...prev,
                                    isCustomDate: true,
                                }))
                            }
                        >
                            Custom
                        </button>
                    </div>

                    <div className="flex gap-1 rounded-lg bg-secondary p-1">
                        {["line", "bar", "table"].map((type) => (
                            <button
                                key={type}
                                className={`rounded-md px-3 py-1 text-sm transition-all ${
                                    graphFilters.chartType === type ? "bg-primary text-primary shadow-sm" : "text-tertiary hover:bg-secondary/70"
                                }`}
                                onClick={() => setGraphFilters((prev) => ({ ...prev, chartType: type }))}
                            >
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                            </button>
                        ))}
                    </div>
                    <ButtonUtility
                        onClick={() => handleResetTempFilters()}
                        icon={<RefreshCw01 className="text-tertiary" />}
                    />
                </div>

                <div className="h-[360px]">
                    {isLoading ? (
                        <div className="flex h-full items-center justify-center text-sm text-tertiary">Loading chart…</div>
                    ) : graphData.labels.length > 0 ? (
                        graphFilters.chartType === "table" ? (
                            <div className="h-full overflow-auto rounded-lg border border-secondary">
                                <table className="w-full text-sm">
                                    <thead className="bg-secondary/30 text-left">
                                        <tr>
                                            <th className="px-3 py-2">Date</th>
                                            <th className="px-3 py-2">Total Mails</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {graphData.labels.map((label, index) => (
                                            <tr key={`${label}-${index}`} className="border-t border-secondary">
                                                <td className="px-3 py-2">{label}</td>
                                                <td className="px-3 py-2">{graphData.datasets[0].data[index]}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : graphFilters.chartType === "line" ? (
                            <Line options={graphOptions} data={graphData} />
                        ) : (
                            <Bar options={graphOptions as ChartOptions<"bar">} data={graphData} />
                        )
                    ) : (
                        <div className="flex h-full items-center justify-center text-sm text-tertiary">No data to display</div>
                    )}
                </div>
            </div>
        </div>
    );
};

const ExecutiveWiseGraph = () => {
    const { showSnackbar } = useStoreSnackbar();
    const user = useStoreLogin((state) => state.user);
    const isAgent = String(user?.type || "").toUpperCase() === "AGENT";
    const agentId = (user as any)?.id || (user as any)?._id || "";
    const todayValue = today(getLocalTimeZone());
    const monthStart = startOfMonth(todayValue);
    const yesterdayValue = todayValue.subtract({ days: 1 });

    const [isLoading, setIsLoading] = useState(false);
    const [graphFilters, setGraphFilters] = useState({
        grouping: "day",
        range: { start: monthStart, end: todayValue } as DateRangeValue,
        chartType: "bar",
        isCustomDate: false,
    });
    const [graphData, setGraphData] = useState({
        labels: [] as string[],
        datasets: [] as any[],
    });

    useEffect(() => {
        const fetchGraphData = async () => {
            setIsLoading(true);
            try {
                const params: any = {
                    grouping: graphFilters.grouping,
                };
                if (graphFilters.range.start) params.from = graphFilters.range.start.toString();
                if (graphFilters.range.end) params.to = graphFilters.range.end.toString();
                if (isAgent && agentId) params.sendBy = agentId;

                const result: any = await agentWiseSendMails(params);
                const data = Array.isArray(result) ? result : result?.data || [];
                if (!data || data.length === 0) {
                    setGraphData({
                        labels: ["No Data"],
                        datasets: [
                            {
                                label: "Mails by Executive",
                                data: [0],
                                backgroundColor: getColorByIndex(0).bg,
                                borderColor: getColorByIndex(0).border,
                            },
                        ],
                    });
                    return;
                }

                setGraphData({
                    labels: data.map((item: any) => item.user || "Unknown"),
                    datasets: [
                        {
                            label: "Mails by Executive",
                            data: data.map((item: any) => item.totalMails ?? 0),
                            backgroundColor: data.map((_: any, index: number) => getColorByIndex(index).bg),
                            borderColor: data.map((_: any, index: number) => getColorByIndex(index).border),
                        },
                    ],
                });
            } catch (error: any) {
                showSnackbar({
                    title: "Error",
                    description: error?.message || "Failed to load executive graph.",
                    color: "danger",
                });
            } finally {
                setIsLoading(false);
            }
        };

        if (graphFilters.range.start && graphFilters.range.end) {
            fetchGraphData();
        }
    }, [graphFilters, showSnackbar]);

    const graphOptions = useMemo<ChartOptions<"line">>(
        () => ({
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: "top" },
                title: {
                    display: true,
                    text: "Mails Sent by Sales Executive",
                },
            },
            scales: {
                x: {
                    ticks: {
                        maxRotation: 45,
                        minRotation: 45,
                        padding: 15,
                    },
                },
                y: { beginAtZero: true },
            },
        }),
        [],
    );

    return (
        <div className="rounded-xl border border-secondary bg-primary p-4">
            <div className="space-y-4">
                <div>
                    <h2 className="text-md font-semibold text-primary">Executive Wise Mails</h2>
                    <p className="text-sm text-tertiary">Compare sending volume by executive</p>
                </div>

                {graphFilters.isCustomDate && (
                    <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                        <DateRangePicker
                            value={graphFilters.range}
                            onChange={(value) => {
                                setGraphFilters((prev) => ({
                                    ...prev,
                                    range: value ?? prev.range,
                                }));
                            }}
                        />
                        <Select
                            placeholder="Grouping"
                            selectedKey={graphFilters.grouping}
                            onSelectionChange={(key) =>
                                setGraphFilters((prev) => ({
                                    ...prev,
                                    grouping: String(key),
                                }))
                            }
                        >
                            <SelectItem id="day">Daily</SelectItem>
                            <SelectItem id="week">Weekly</SelectItem>
                            <SelectItem id="month">Monthly</SelectItem>
                        </Select>
                    </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-1 rounded-lg bg-secondary p-1">
                        <button
                            className={`rounded-md px-3 py-1 text-sm transition-all ${
                                !graphFilters.isCustomDate &&
                                graphFilters.range.start?.toString() === monthStart.toString() &&
                                graphFilters.range.end?.toString() === todayValue.toString()
                                    ? "bg-primary text-primary shadow-sm"
                                    : "text-tertiary hover:bg-secondary/70"
                            }`}
                            onClick={() =>
                                setGraphFilters((prev) => ({
                                    ...prev,
                                    range: { start: monthStart, end: todayValue },
                                    isCustomDate: false,
                                }))
                            }
                        >
                            This Month
                        </button>
                        <button
                            className={`rounded-md px-3 py-1 text-sm transition-all ${
                                !graphFilters.isCustomDate &&
                                graphFilters.range.start?.toString() === todayValue.toString() &&
                                graphFilters.range.end?.toString() === todayValue.toString()
                                    ? "bg-primary text-primary shadow-sm"
                                    : "text-tertiary hover:bg-secondary/70"
                            }`}
                            onClick={() =>
                                setGraphFilters((prev) => ({
                                    ...prev,
                                    range: { start: todayValue, end: todayValue },
                                    isCustomDate: false,
                                }))
                            }
                        >
                            Today
                        </button>
                        <button
                            className={`rounded-md px-3 py-1 text-sm transition-all ${
                                !graphFilters.isCustomDate &&
                                graphFilters.range.start?.toString() === yesterdayValue.toString() &&
                                graphFilters.range.end?.toString() === yesterdayValue.toString()
                                    ? "bg-primary text-primary shadow-sm"
                                    : "text-tertiary hover:bg-secondary/70"
                            }`}
                            onClick={() =>
                                setGraphFilters((prev) => ({
                                    ...prev,
                                    range: { start: yesterdayValue, end: yesterdayValue },
                                    isCustomDate: false,
                                }))
                            }
                        >
                            Yesterday
                        </button>
                        <button
                            className={`rounded-md px-3 py-1 text-sm transition-all ${
                                graphFilters.isCustomDate ? "bg-primary text-primary shadow-sm" : "text-tertiary hover:bg-secondary/70"
                            }`}
                            onClick={() =>
                                setGraphFilters((prev) => ({
                                    ...prev,
                                    isCustomDate: true,
                                }))
                            }
                        >
                            Custom
                        </button>
                    </div>

                    <div className="flex gap-1 rounded-lg bg-secondary p-1">
                        {["line", "bar", "table"].map((type) => (
                            <button
                                key={type}
                                className={`rounded-md px-3 py-1 text-sm transition-all ${
                                    graphFilters.chartType === type ? "bg-primary text-primary shadow-sm" : "text-tertiary hover:bg-secondary/70"
                                }`}
                                onClick={() => setGraphFilters((prev) => ({ ...prev, chartType: type }))}
                            >
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="h-[360px]">
                    {isLoading ? (
                        <div className="flex h-full items-center justify-center text-sm text-tertiary">Loading chart…</div>
                    ) : graphData.labels.length > 0 ? (
                        graphFilters.chartType === "table" ? (
                            <div className="h-full overflow-auto rounded-lg border border-secondary">
                                <table className="w-full text-sm">
                                    <thead className="bg-secondary/30 text-left">
                                        <tr>
                                            <th className="px-3 py-2">Executive Name</th>
                                            <th className="px-3 py-2">Total Mails</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {graphData.labels.map((label, index) => (
                                            <tr key={`${label}-${index}`} className="border-t border-secondary">
                                                <td className="px-3 py-2">{label}</td>
                                                <td className="px-3 py-2">{graphData.datasets[0].data[index]}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : graphFilters.chartType === "line" ? (
                            <Line options={graphOptions} data={graphData} />
                        ) : (
                            <Bar options={graphOptions as ChartOptions<"bar">} data={graphData} />
                        )
                    ) : (
                        <div className="flex h-full items-center justify-center text-sm text-tertiary">No data to display</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default function ItineraryReportMailsPage() {
    const { showSnackbar } = useStoreSnackbar();
    const availableWidth = useAvailableTableWidth();
    const user = useStoreLogin((state) => state.user);
    const isAgent = String(user?.type || "").toUpperCase() === "AGENT";
    const agentId = (user as any)?.id || (user as any)?._id || "";

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalRecords, setTotalRecords] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<any[]>([]);

    const [emailFunction, setEmailFunction] = useState<string>("sendItineraryMail");
    const [email, setEmail] = useState("");
    const [sendBy, setSendBy] = useState<string>(user?.id || "");
    const [status, setStatus] = useState<string>("");
    const [fromDate, setFromDate] = useState<DateValue | null>(null);
    const [toDate, setToDate] = useState<DateValue | null>(null);

    const [salesExecutives, setSalesExecutives] = useState<any[]>([]);

    useEffect(() => {
        const fetchSalesExecutives = async () => {
            try {
                const response: any = await getSalesEx({ limit: "all" });
                if (response && Array.isArray(response)) {
                    setSalesExecutives(response);
                }
            } catch (error) {
                showSnackbar({
                    title: "Error",
                    description: "Failed to load sales executives.",
                    color: "danger",
                });
            }
        };
        fetchSalesExecutives();
    }, [showSnackbar]);

    useEffect(() => {
        if (!isAgent || !agentId) return;
        setSendBy(String(agentId));
        setPage(1);
    }, [isAgent, agentId]);

    useEffect(() => {
        const handler = setTimeout(() => {
            fetchData();
        }, 500);
        return () => clearTimeout(handler);
    }, [page, limit, emailFunction, email, sendBy, status, fromDate, toDate]);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const params: any = {
                totalCount: true,
                page,
                limit,
                populate: "sendBy",
                select_sendBy: "name",
            };

            if (emailFunction) params.emailFunction = emailFunction;
            if (email) params.email = email;
            if (isAgent && agentId) params.sendBy = agentId;
            else if (sendBy) params.sendBy = sendBy;
            if (status) params.status = status;
            if (fromDate) params.from = fromDate.toString();
            if (toDate) params.to = toDate.toString();

            const response: any = await getSentMailById(params);
            setTotalRecords(response?.totalCount || 0);
            setData(response?.data || []);
        } catch (error: any) {
            showSnackbar({
                title: "Error",
                description: error?.message || "Failed to load mails.",
                color: "danger",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const totalPages = useMemo(() => Math.ceil(totalRecords / limit), [totalRecords, limit]);
    const itemsWithIndex = useMemo(() => data.map((item, index) => ({ ...item, __rowIndex: index })), [data]);
    const columns = [
        { id: "index", name: "#", widthRatio: 6, minWidth: 64 },
        { id: "function", name: "Email Function", widthRatio: 20, minWidth: 160 },
        { id: "email", name: "Email List", widthRatio: 26, minWidth: 220 },
        { id: "sendBy", name: "Send By", widthRatio: 18, minWidth: 160 },
        { id: "date", name: "Date", widthRatio: 16, minWidth: 180 },
        { id: "status", name: "Status", widthRatio: 14, minWidth: 120 },
    ] as { id: string; name: string; widthRatio?: number; minWidth?: number }[];

    return (
        <DefaultLayout>
            <div style={{ width: availableWidth }} className="space-y-4">
                <ItinerarySentMails />

                <TableCard.Root>
                    <TableCard.Header
                        title="Mails List"
                        badge={isLoading ? "…" : totalRecords}
                        contentTrailing={
                            <Select
                                aria-label="Rows per page"
                                className="w-40"
                                selectedKey={String(limit)}
                                onSelectionChange={(key) => {
                                    const next = Number(key);
                                    setLimit(Number.isFinite(next) && next > 0 ? next : 10);
                                    setPage(1);
                                }}
                            >
                                <SelectItem id="10">10 / page</SelectItem>
                                <SelectItem id="25">25 / page</SelectItem>
                                <SelectItem id="50">50 / page</SelectItem>
                            </Select>
                        }
                    />

                    <div className="grid grid-cols-1 gap-3 border-b border-secondary bg-primary px-4 py-4 md:grid-cols-2 md:px-6 lg:grid-cols-4 xl:grid-cols-5">
                        {/* <Select
                            placeholder="Email Function"
                            selectedKey={emailFunction}
                            onSelectionChange={(key) => {
                                setEmailFunction(String(key));
                                setPage(1);
                            }}
                        >
                            <SelectItem id="">All Functions</SelectItem>
                            {emailFunctionOptions.map((item) => (
                                <SelectItem key={item.id} id={item.id}>
                                    {item.label}
                                </SelectItem>
                            ))}
                        </Select> */}
                        <Input
                            icon={SearchLg}
                            placeholder="Search by Email"
                            value={email}
                            onChange={(value) => {
                                setEmail(value);
                                setPage(1);
                            }}
                        />
                        <Select
                            placeholder="Sales Executive"
                            selectedKey={sendBy}
                            isDisabled={isAgent}
                            onSelectionChange={(key) => {
                                setSendBy(String(key));
                                setPage(1);
                            }}
                        >
                            {isAgent ? (
                                <SelectItem id={String(agentId)}>{(user as any)?.name || "You"}</SelectItem>
                            ) : (
                                <>
                                    <SelectItem id="">All Executives</SelectItem>
                                    {salesExecutives.map((exec) => (
                                        <SelectItem key={exec.id || exec._id} id={exec.id || exec._id}>
                                            {exec.name}
                                        </SelectItem>
                                    ))}
                                </>
                            )}
                        </Select>
                        <Select
                            placeholder="Status"
                            selectedKey={status}
                            onSelectionChange={(key) => {
                                setStatus(String(key));
                                setPage(1);
                            }}
                        >
                            <SelectItem id="">All Status</SelectItem>
                            <SelectItem id="true">Active</SelectItem>
                            <SelectItem id="false">Inactive</SelectItem>
                        </Select>
                        <div className="flex gap-2">
                            <DatePicker
                                value={fromDate}
                                onChange={(date) => {
                                    setFromDate(date);
                                    setPage(1);
                                }}
                                placeholder="From date"
                                className="flex-1"
                            />
                            <DatePicker
                                value={toDate}
                                onChange={(date) => {
                                    setToDate(date);
                                    setPage(1);
                                }}
                                placeholder="To date"
                                className="flex-1"
                            />
                            <ButtonUtility
                                icon={RefreshCw01}
                                onClick={() => {
                                    setEmailFunction("sendItineraryMail");
                                    setEmail("");
                                    setSendBy(user?.id || "");
                                    setStatus("");
                                    setFromDate(null);
                                    setToDate(null);
                                    setPage(1);
                                }}
                                color="secondary"
                                className="px-3"
                                tooltip="Reset Filters"
                            />
                        </div>
                    </div>

                    <div className="w-full">
                        {isLoading ? (
                            <StickyTable
                                ariaLabel="Mails list"
                                columns={columns}
                                items={Array.from({ length: 10 }).map((_, i) => ({ id: `skeleton-${i}` }))}
                                availableWidth={availableWidth}
                                loading={isLoading}
                            >
                                {(item) => (
                                    <Table.Row id={item.id} columns={columns}>
                                        {(_column) => (
                                            <Table.Cell className="whitespace-normal break-words">
                                                <div className="animate-pulse">
                                                    <div className="h-4 w-full rounded bg-secondary" />
                                                </div>
                                            </Table.Cell>
                                        )}
                                    </Table.Row>
                                )}
                            </StickyTable>
                        ) : data.length === 0 ? (
                            <StickyTable
                                ariaLabel="Mails list"
                                columns={columns}
                                items={[{ id: "empty" }]}
                                availableWidth={availableWidth}
                                loading={isLoading}
                            >
                                {() => (
                                    <Table.Row id="empty" columns={columns}>
                                        <Table.Cell colSpan={columns.length} className="text-center py-8 text-gray-500">
                                            No records found
                                        </Table.Cell>
                                    </Table.Row>
                                )}
                            </StickyTable>
                        ) : (
                            <StickyTable
                                ariaLabel="Mails list"
                                columns={columns}
                                items={itemsWithIndex}
                                availableWidth={availableWidth}
                                loading={isLoading}
                            >
                                {(item) => {
                                    const index = (item as any).__rowIndex ?? 0;
                                    const createdAt = item?.createdAt ? new Date(item.createdAt) : null;
                                    const formattedDate = createdAt
                                        ? createdAt.toLocaleDateString("en-GB", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                        })
                                        : "-";
                                    const formattedTime = createdAt ? createdAt.toLocaleTimeString() : "";

                                    return (
                                        <Table.Row id={item.id || item._id || index} columns={columns}>
                                            {(column) => (
                                                <Table.Cell className="whitespace-normal break-words">
                                                    {column.id === "index" ? (
                                                        (page - 1) * limit + index + 1
                                                    ) : column.id === "function" ? (
                                                        emailFunctionTitleMap[item.emailFunction] || "N/A"
                                                    ) : column.id === "email" ? (
                                                        item.email || "-"
                                                    ) : column.id === "sendBy" ? (
                                                        item.sendBy?.name || "-"
                                                    ) : column.id === "date" ? (
                                                        <>
                                                            {formattedDate}
                                                            <div className="text-xs text-gray-400">{formattedTime}</div>
                                                        </>
                                                    ) : (
                                                        <Badge color={statusColorMap[String(item.status)] || "gray"} size="sm">
                                                            {item.status ? "Active" : "Inactive"}
                                                        </Badge>
                                                    )}
                                                </Table.Cell>
                                            )}
                                        </Table.Row>
                                    );
                                }}
                            </StickyTable>
                        )}
                        <PaginationButtonGroup
                            page={page}
                            total={totalPages}
                            onPageChange={setPage}
                            align="center"
                        />
                    </div>
                </TableCard.Root>
            </div>
        </DefaultLayout>
    );
}
