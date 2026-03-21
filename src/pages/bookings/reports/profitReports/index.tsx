import { CustomBreadscrumbs } from "@/components/application/breadcrumbs/custom-breadcrumbs";
import { DateRangePicker } from "@/components/application/date-picker/date-range-picker";
import { LoadingIndicator } from "@/components/application/loading-indicator/loading-indicator";
import { Select } from "@/components/base/select/select";
import { SelectItem } from "@/components/base/select/select-item";
import { DefaultLayout } from "@/layouts/DefaultLayout";
import { useAvailableTableWidth } from "@/hooks/use-available-table-width";
import { finishedPackageWiseSummary, profitReports } from "@/utils/services/assignmentService";
import { getLocalTimeZone, startOfMonth, today } from "@internationalized/date";
import type { RangeValue } from "@react-types/shared";
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
import { useEffect, useMemo, useState } from "react";
import type { DateValue } from "react-aria-components";
import { Bar, Line } from "react-chartjs-2";

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

type ChartType = "bar" | "line" | "table";
type PresetKey = "month" | "today" | "yesterday" | "custom";

type ProfitReportRow = {
    user?: string;
    totalProfit?: number;
    totalCrAmount?: number;
    totalDrAmount?: number;
};

type FinishedPackageRow = {
    user?: string;
    totalAssignments?: number;
    totalFinished?: number;
    totalPending?: number;
};

const ProfitReportsGraph = () => {
    const todayValue = today(getLocalTimeZone());
    const monthStart = startOfMonth(todayValue);
    const yesterdayValue = todayValue.subtract({ days: 1 });

    const [activePreset, setActivePreset] = useState<PresetKey>("month");
    const [filters, setFilters] = useState({
        grouping: "day",
        range: { start: monthStart, end: todayValue } as DateRangeValue,
        chartType: "bar" as ChartType,
        isCustomDate: false,
        agent: "all",
    });

    const [isLoading, setIsLoading] = useState(false);
    const [availableAgents, setAvailableAgents] = useState<string[]>([]);
    const [allAgentsData, setAllAgentsData] = useState<ProfitReportRow[]>([]);
    const [graphData, setGraphData] = useState({
        labels: [] as string[],
        datasets: [] as any[],
    });

    useEffect(() => {
        const fetchGraphData = async () => {
            setIsLoading(true);
            try {
                const params: any = {
                    grouping: filters.grouping,
                    from: filters.range.start?.toString(),
                    to: filters.range.end?.toString(),
                };
                const result = await profitReports(params);
                const data: ProfitReportRow[] = Array.isArray(result) ? result : [];

                const agents = data
                    .map((item) => item.user || "Unknown")
                    .filter((value, index, self) => self.indexOf(value) === index);
                setAvailableAgents(agents);
                setAllAgentsData(data);
            } finally {
                setIsLoading(false);
            }
        };

        if (filters.range.start && filters.range.end) fetchGraphData();
    }, [filters.grouping, filters.range.end, filters.range.start]);

    useEffect(() => {
        const data = allAgentsData;
        if (!data || data.length === 0) {
            setGraphData({
                labels: ["No Data"],
                datasets: [
                    {
                        label: "Total Profit by Sales Agent",
                        data: [0],
                        backgroundColor: getColorByIndex(0).bg,
                        borderColor: getColorByIndex(0).border,
                    },
                ],
            });
            return;
        }

        const filteredData = filters.agent === "all" ? data : data.filter((item) => (item.user || "Unknown") === filters.agent);
        const labels = filteredData.map((item) => item.user || "Unknown");

        setGraphData({
            labels,
            datasets: [
                {
                    label: "Total Profit by Sales Agent",
                    data: filteredData.map((item) => item.totalProfit ?? 0),
                    backgroundColor: getColorByIndex(0).bg,
                    borderColor: getColorByIndex(0).border,
                },
                {
                    label: "Total Cr payment by Sales Agent",
                    data: filteredData.map((item) => item.totalCrAmount ?? 0),
                    backgroundColor: getColorByIndex(1).bg,
                    borderColor: getColorByIndex(1).border,
                },
                {
                    label: "Total Dr payment by Sales Agent",
                    data: filteredData.map((item) => item.totalDrAmount ?? 0),
                    backgroundColor: getColorByIndex(2).bg,
                    borderColor: getColorByIndex(2).border,
                },
            ],
        });
    }, [allAgentsData, filters.agent]);

    const graphOptions = useMemo<ChartOptions<"bar">>(
        () => ({
            responsive: true,
            plugins: {
                legend: { position: "top" },
                title: {
                    display: true,
                    text: "Profit Reports by Sales Agent",
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
            maintainAspectRatio: false,
        }),
        [],
    );

    return (
        <div className="rounded-xl border border-secondary bg-primary p-4">
            {filters.isCustomDate && (
                <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
                    <DateRangePicker
                        value={filters.range}
                        onChange={(value) =>
                            setFilters((prev) => ({
                                ...prev,
                                range: value ?? prev.range,
                            }))
                        }
                    />
                    <Select
                        placeholder="Grouping"
                        selectedKey={filters.grouping}
                        onSelectionChange={(key) => setFilters((prev) => ({ ...prev, grouping: String(key) }))}
                    >
                        <SelectItem id="day">Daily</SelectItem>
                        <SelectItem id="week">Weekly</SelectItem>
                        <SelectItem id="month">Monthly</SelectItem>
                    </Select>
                    <Select
                        placeholder="Agent"
                        selectedKey={filters.agent}
                        onSelectionChange={(key) => setFilters((prev) => ({ ...prev, agent: String(key) }))}
                    >
                        <SelectItem id="all">All Agents</SelectItem>
                        {availableAgents.map((agent) => (
                            <SelectItem key={agent} id={agent}>
                                {agent}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
            )}

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1 rounded-lg bg-secondary p-1">
                    <button
                        className={`rounded-md px-3 py-1 text-sm transition-all ${
                            !filters.isCustomDate && activePreset === "month" ? "bg-primary text-primary shadow-sm" : "text-tertiary hover:bg-secondary/70"
                        }`}
                        onClick={() => {
                            setActivePreset("month");
                            setFilters((prev) => ({
                                ...prev,
                                range: { start: monthStart, end: todayValue },
                                isCustomDate: false,
                            }));
                        }}
                    >
                        This Month
                    </button>
                    <button
                        className={`rounded-md px-3 py-1 text-sm transition-all ${
                            !filters.isCustomDate && activePreset === "today" ? "bg-primary text-primary shadow-sm" : "text-tertiary hover:bg-secondary/70"
                        }`}
                        onClick={() => {
                            setActivePreset("today");
                            setFilters((prev) => ({
                                ...prev,
                                range: { start: todayValue, end: todayValue },
                                isCustomDate: false,
                            }));
                        }}
                    >
                        Today
                    </button>
                    <button
                        className={`rounded-md px-3 py-1 text-sm transition-all ${
                            !filters.isCustomDate && activePreset === "yesterday"
                                ? "bg-primary text-primary shadow-sm"
                                : "text-tertiary hover:bg-secondary/70"
                        }`}
                        onClick={() => {
                            setActivePreset("yesterday");
                            setFilters((prev) => ({
                                ...prev,
                                range: { start: yesterdayValue, end: yesterdayValue },
                                isCustomDate: false,
                            }));
                        }}
                    >
                        Yesterday
                    </button>
                    <button
                        className={`rounded-md px-3 py-1 text-sm transition-all ${
                            filters.isCustomDate ? "bg-primary text-primary shadow-sm" : "text-tertiary hover:bg-secondary/70"
                        }`}
                        onClick={() => {
                            setActivePreset("custom");
                            setFilters((prev) => ({
                                ...prev,
                                isCustomDate: true,
                            }));
                        }}
                    >
                        Custom
                    </button>
                </div>

                <div className="flex flex-wrap gap-1 rounded-lg bg-secondary p-1">
                    <button
                        className={`rounded-md px-3 py-1 text-sm transition-all ${
                            filters.chartType === "line" ? "bg-primary text-primary shadow-sm" : "text-tertiary hover:bg-secondary/70"
                        }`}
                        onClick={() => setFilters((prev) => ({ ...prev, chartType: "line" }))}
                    >
                        Line
                    </button>
                    <button
                        className={`rounded-md px-3 py-1 text-sm transition-all ${
                            filters.chartType === "bar" ? "bg-primary text-primary shadow-sm" : "text-tertiary hover:bg-secondary/70"
                        }`}
                        onClick={() => setFilters((prev) => ({ ...prev, chartType: "bar" }))}
                    >
                        Bar
                    </button>
                    <button
                        className={`rounded-md px-3 py-1 text-sm transition-all ${
                            filters.chartType === "table" ? "bg-primary text-primary shadow-sm" : "text-tertiary hover:bg-secondary/70"
                        }`}
                        onClick={() => setFilters((prev) => ({ ...prev, chartType: "table" }))}
                    >
                        Table
                    </button>
                </div>
            </div>

            <div className="mt-4 h-[400px] w-full">
                {isLoading ? (
                    <div className="flex h-full w-full items-center justify-center">
                        <LoadingIndicator />
                    </div>
                ) : graphData.labels.length > 0 ? (
                    filters.chartType === "table" ? (
                        <div className="max-h-[400px] overflow-auto">
                            <table className="min-w-full text-sm">
                                <thead className="bg-secondary">
                                    <tr>
                                        <th className="px-4 py-2 text-left font-medium text-primary">Agent Name</th>
                                        <th className="px-4 py-2 text-left font-medium text-primary">Total Profit</th>
                                        <th className="px-4 py-2 text-left font-medium text-primary">Total Cr Amount</th>
                                        <th className="px-4 py-2 text-left font-medium text-primary">Total Dr Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {graphData.labels.map((label, index) => (
                                        <tr key={label + index} className="border-b border-secondary">
                                            <td className="px-4 py-2 text-tertiary">{label}</td>
                                            <td className="px-4 py-2 text-tertiary">{graphData.datasets[0]?.data?.[index] ?? 0}</td>
                                            <td className="px-4 py-2 text-tertiary">{graphData.datasets[1]?.data?.[index] ?? 0}</td>
                                            <td className="px-4 py-2 text-tertiary">{graphData.datasets[2]?.data?.[index] ?? 0}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : filters.chartType === "line" ? (
                        <Line options={graphOptions as any} data={graphData} />
                    ) : (
                        <Bar options={graphOptions} data={graphData} />
                    )
                ) : (
                    <p className="text-center text-tertiary">No data to display</p>
                )}
            </div>
        </div>
    );
};

const FinishedPackageWiseGraph = () => {
    const todayValue = today(getLocalTimeZone());
    const monthStart = startOfMonth(todayValue);
    const yesterdayValue = todayValue.subtract({ days: 1 });

    const [activePreset, setActivePreset] = useState<PresetKey>("month");
    const [filters, setFilters] = useState({
        grouping: "day",
        range: { start: monthStart, end: todayValue } as DateRangeValue,
        chartType: "bar" as ChartType,
        isCustomDate: false,
        agent: "all",
    });

    const [isLoading, setIsLoading] = useState(false);
    const [availableAgents, setAvailableAgents] = useState<string[]>([]);
    const [allAgentsData, setAllAgentsData] = useState<FinishedPackageRow[]>([]);
    const [graphData, setGraphData] = useState({
        labels: [] as string[],
        datasets: [] as any[],
    });

    useEffect(() => {
        const fetchGraphData = async () => {
            setIsLoading(true);
            try {
                const params: any = {
                    grouping: filters.grouping,
                    from: filters.range.start?.toString(),
                    to: filters.range.end?.toString(),
                };
                const result = await finishedPackageWiseSummary(params);
                const data: FinishedPackageRow[] = Array.isArray(result) ? result : [];

                const agents = data
                    .map((item) => item.user || "Unknown")
                    .filter((value, index, self) => self.indexOf(value) === index);
                setAvailableAgents(agents);
                setAllAgentsData(data);
            } finally {
                setIsLoading(false);
            }
        };

        if (filters.range.start && filters.range.end) fetchGraphData();
    }, [filters.grouping, filters.range.end, filters.range.start]);

    useEffect(() => {
        const data = allAgentsData;
        if (!data || data.length === 0) {
            setGraphData({
                labels: ["No Data"],
                datasets: [
                    {
                        label: "Assignments by Sales Agent",
                        data: [0],
                        backgroundColor: getColorByIndex(0).bg,
                        borderColor: getColorByIndex(0).border,
                    },
                ],
            });
            return;
        }

        const filteredData = filters.agent === "all" ? data : data.filter((item) => (item.user || "Unknown") === filters.agent);
        const labels = filteredData.map((item) => item.user || "Unknown");

        setGraphData({
            labels,
            datasets: [
                {
                    label: "Assignments by Sales Agent",
                    data: filteredData.map((item) => item.totalAssignments ?? 0),
                    backgroundColor: getColorByIndex(0).bg,
                    borderColor: getColorByIndex(0).border,
                },
                {
                    label: "Finished package by Sales Agent",
                    data: filteredData.map((item) => item.totalFinished ?? 0),
                    backgroundColor: getColorByIndex(1).bg,
                    borderColor: getColorByIndex(1).border,
                },
                {
                    label: "Pending package by Sales Agent",
                    data: filteredData.map((item) => item.totalPending ?? 0),
                    backgroundColor: getColorByIndex(2).bg,
                    borderColor: getColorByIndex(2).border,
                },
            ],
        });
    }, [allAgentsData, filters.agent]);

    const graphOptions = useMemo<ChartOptions<"bar">>(
        () => ({
            responsive: true,
            plugins: {
                legend: { position: "top" },
                title: {
                    display: true,
                    text: "Finished Package Summary by Sales Agent",
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
            maintainAspectRatio: false,
        }),
        [],
    );

    return (
        <div className="rounded-xl border border-secondary bg-primary p-4">
            {filters.isCustomDate && (
                <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
                    <DateRangePicker
                        value={filters.range}
                        onChange={(value) =>
                            setFilters((prev) => ({
                                ...prev,
                                range: value ?? prev.range,
                            }))
                        }
                    />
                    <Select
                        placeholder="Grouping"
                        selectedKey={filters.grouping}
                        onSelectionChange={(key) => setFilters((prev) => ({ ...prev, grouping: String(key) }))}
                    >
                        <SelectItem id="day">Daily</SelectItem>
                        <SelectItem id="week">Weekly</SelectItem>
                        <SelectItem id="month">Monthly</SelectItem>
                    </Select>
                    <Select
                        placeholder="Agent"
                        selectedKey={filters.agent}
                        onSelectionChange={(key) => setFilters((prev) => ({ ...prev, agent: String(key) }))}
                    >
                        <SelectItem id="all">All Agents</SelectItem>
                        {availableAgents.map((agent) => (
                            <SelectItem key={agent} id={agent}>
                                {agent}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
            )}

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1 rounded-lg bg-secondary p-1">
                    <button
                        className={`rounded-md px-3 py-1 text-sm transition-all ${
                            !filters.isCustomDate && activePreset === "month" ? "bg-primary text-primary shadow-sm" : "text-tertiary hover:bg-secondary/70"
                        }`}
                        onClick={() => {
                            setActivePreset("month");
                            setFilters((prev) => ({
                                ...prev,
                                range: { start: monthStart, end: todayValue },
                                isCustomDate: false,
                            }));
                        }}
                    >
                        This Month
                    </button>
                    <button
                        className={`rounded-md px-3 py-1 text-sm transition-all ${
                            !filters.isCustomDate && activePreset === "today" ? "bg-primary text-primary shadow-sm" : "text-tertiary hover:bg-secondary/70"
                        }`}
                        onClick={() => {
                            setActivePreset("today");
                            setFilters((prev) => ({
                                ...prev,
                                range: { start: todayValue, end: todayValue },
                                isCustomDate: false,
                            }));
                        }}
                    >
                        Today
                    </button>
                    <button
                        className={`rounded-md px-3 py-1 text-sm transition-all ${
                            !filters.isCustomDate && activePreset === "yesterday"
                                ? "bg-primary text-primary shadow-sm"
                                : "text-tertiary hover:bg-secondary/70"
                        }`}
                        onClick={() => {
                            setActivePreset("yesterday");
                            setFilters((prev) => ({
                                ...prev,
                                range: { start: yesterdayValue, end: yesterdayValue },
                                isCustomDate: false,
                            }));
                        }}
                    >
                        Yesterday
                    </button>
                    <button
                        className={`rounded-md px-3 py-1 text-sm transition-all ${
                            filters.isCustomDate ? "bg-primary text-primary shadow-sm" : "text-tertiary hover:bg-secondary/70"
                        }`}
                        onClick={() => {
                            setActivePreset("custom");
                            setFilters((prev) => ({
                                ...prev,
                                isCustomDate: true,
                            }));
                        }}
                    >
                        Custom
                    </button>
                </div>

                <div className="flex flex-wrap gap-1 rounded-lg bg-secondary p-1">
                    <button
                        className={`rounded-md px-3 py-1 text-sm transition-all ${
                            filters.chartType === "line" ? "bg-primary text-primary shadow-sm" : "text-tertiary hover:bg-secondary/70"
                        }`}
                        onClick={() => setFilters((prev) => ({ ...prev, chartType: "line" }))}
                    >
                        Line
                    </button>
                    <button
                        className={`rounded-md px-3 py-1 text-sm transition-all ${
                            filters.chartType === "bar" ? "bg-primary text-primary shadow-sm" : "text-tertiary hover:bg-secondary/70"
                        }`}
                        onClick={() => setFilters((prev) => ({ ...prev, chartType: "bar" }))}
                    >
                        Bar
                    </button>
                    <button
                        className={`rounded-md px-3 py-1 text-sm transition-all ${
                            filters.chartType === "table" ? "bg-primary text-primary shadow-sm" : "text-tertiary hover:bg-secondary/70"
                        }`}
                        onClick={() => setFilters((prev) => ({ ...prev, chartType: "table" }))}
                    >
                        Table
                    </button>
                </div>
            </div>

            <div className="mt-4 h-[400px] w-full">
                {isLoading ? (
                    <div className="flex h-full w-full items-center justify-center">
                        <LoadingIndicator />
                    </div>
                ) : graphData.labels.length > 0 ? (
                    filters.chartType === "table" ? (
                        <div className="max-h-[400px] overflow-auto">
                            <table className="min-w-full text-sm">
                                <thead className="bg-secondary">
                                    <tr>
                                        <th className="px-4 py-2 text-left font-medium text-primary">Agent Name</th>
                                        <th className="px-4 py-2 text-left font-medium text-primary">Total Itineraries</th>
                                        <th className="px-4 py-2 text-left font-medium text-primary">Finished Package</th>
                                        <th className="px-4 py-2 text-left font-medium text-primary">Pending Package</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {graphData.labels.map((label, index) => (
                                        <tr key={label + index} className="border-b border-secondary">
                                            <td className="px-4 py-2 text-tertiary">{label}</td>
                                            <td className="px-4 py-2 text-tertiary">{graphData.datasets[0]?.data?.[index] ?? 0}</td>
                                            <td className="px-4 py-2 text-tertiary">{graphData.datasets[1]?.data?.[index] ?? 0}</td>
                                            <td className="px-4 py-2 text-tertiary">{graphData.datasets[2]?.data?.[index] ?? 0}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : filters.chartType === "line" ? (
                        <Line options={graphOptions as any} data={graphData} />
                    ) : (
                        <Bar options={graphOptions} data={graphData} />
                    )
                ) : (
                    <p className="text-center text-tertiary">No data to display</p>
                )}
            </div>
        </div>
    );
};

export default function ReportsProfitPage() {
    const availableWidth = useAvailableTableWidth();

    return (
        <DefaultLayout>
            <div className="space-y-4" style={{ width: availableWidth }}>
                <CustomBreadscrumbs list={[{ label: "Bookings", link: "/bookings/reports/profitReports" }, { label: "Reports", link: "/bookings/reports/profitReports" }]} />
                <div className="space-y-4">
                    <ProfitReportsGraph />
                    <FinishedPackageWiseGraph />
                </div>
            </div>
        </DefaultLayout>
    );
}
