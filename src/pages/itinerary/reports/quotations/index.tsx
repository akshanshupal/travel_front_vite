import { DateRangePicker } from "@/components/application/date-picker/date-range-picker";
import { Select } from "@/components/base/select/select";
import { SelectItem } from "@/components/base/select/select-item";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { RefreshCw01 } from "@untitledui/icons";
import { DefaultLayout } from "@/layouts/DefaultLayout";
import { useAvailableTableWidth } from "@/hooks/use-available-table-width";
import { useStoreSnackbar } from "@/store/snackbar";
import { useStoreLogin } from "@/store/login";
import { agentDurationWiseSavedItineraries, agentWiseSavedItineraries } from "@/utils/services/savedItineraryService";
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
        const toDate = item.toDate ? new Date(item.toDate).toLocaleDateString("en-GB", { day: "2-digit", month: "short" }) : "";
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

const AgentWiseGraph = () => {
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

    const handleResetTempFilters = () => {
        setGraphFilters({
            grouping: "day",
            range: { start: monthStart, end: todayValue },
            chartType: "bar",
            isCustomDate: false,
        });
    };

    useEffect(() => {
        const fetchGraphData = async () => {
            setIsLoading(true);
            try {
                const params: any = {
                    grouping: graphFilters.grouping,
                };
                if (graphFilters.range.start) params.from = graphFilters.range.start.toString();
                if (graphFilters.range.end) params.to = graphFilters.range.end.toString();
                if (isAgent && agentId) params.salesExecutive = agentId;

                const result: any = await agentWiseSavedItineraries(params);
                const data = Array.isArray(result) ? result : result?.data || [];
                if (!data || data.length === 0) {
                    setGraphData({
                        labels: ["No Data"],
                        datasets: [
                            {
                                label: "Quotations by Agent",
                                data: [0],
                                backgroundColor: getColorByIndex(0).bg,
                                borderColor: getColorByIndex(0).border,
                            },
                        ],
                    });
                    return;
                }

                setGraphData({
                    labels: data.map((item: any) => item.user || item.name || "Unknown"),
                    datasets: [
                        {
                            label: "Quotations by Agent",
                            data: data.map((item: any) => item.totalItineraries ?? 0),
                            backgroundColor: data.map((_: any, index: number) => getColorByIndex(index).bg),
                            borderColor: data.map((_: any, index: number) => getColorByIndex(index).border),
                        },
                    ],
                });
            } catch (error: any) {
                showSnackbar({
                    title: "Error",
                    description: error?.message || "Failed to load agent graph.",
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
                    text: "Quotations by Sales Executive",
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
                    <h2 className="text-md font-semibold text-primary">Agent Wise Quotations</h2>
                    <p className="text-sm text-tertiary">Summary by sales agent</p>
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
                    <ButtonUtility
                        onClick={() => handleResetTempFilters()}
                        icon={RefreshCw01}
                        className="text-tertiary"
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
                                            <th className="px-3 py-2">Agent</th>
                                            <th className="px-3 py-2">Total Quotations</th>
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

const DurationWiseGraph = () => {
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

    const handleResetTempFilters = () => {
        setGraphFilters({
            grouping: "day",
            range: { start: monthStart, end: todayValue },
            chartType: "bar",
            isCustomDate: false,
        });
    };

    useEffect(() => {
        const fetchGraphData = async () => {
            setIsLoading(true);
            try {
                const params: any = {
                    grouping: graphFilters.grouping,
                };
                if (graphFilters.range.start) params.from = graphFilters.range.start.toString();
                if (graphFilters.range.end) params.to = graphFilters.range.end.toString();
                if (isAgent && agentId) params.salesExecutive = agentId;

                const result: any = await agentDurationWiseSavedItineraries(params);
                const data = Array.isArray(result) ? result : result?.data || [];
                if (!data || data.length === 0) {
                    setGraphData({
                        labels: ["No Data"],
                        datasets: [
                            {
                                label: "Quotations by Duration",
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
                const totals = data.map((item: any) => item.totalItineraries ?? 0);
                setGraphData({
                    labels,
                    datasets: [
                        {
                            label: "Quotations by Duration",
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

    const graphOptions = useMemo<ChartOptions<"line">>(
        () => ({
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: "top" },
                title: {
                    display: true,
                    text: "Quotation Trends",
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
                    <h2 className="text-md font-semibold text-primary">Duration Wise Quotations</h2>
                    <p className="text-sm text-tertiary">Summary by duration</p>
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
                    <ButtonUtility
                        onClick={() => handleResetTempFilters()}
                        icon={RefreshCw01}
                        className="text-tertiary"
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
                                            <th className="px-3 py-2">Duration</th>
                                            <th className="px-3 py-2">Total Quotations</th>
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

export default function ItineraryReportQuotationsPage() {
    const availableWidth = useAvailableTableWidth();

    return (
        <DefaultLayout>
            <div style={{ width: availableWidth }} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    <AgentWiseGraph />
                    <DurationWiseGraph />
                </div>
            </div>
        </DefaultLayout>
    );
}
