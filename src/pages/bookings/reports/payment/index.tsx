import { DefaultLayout } from "@/layouts/DefaultLayout";
import { PaginationButtonGroup } from "@/components/application/pagination/pagination";
import { StickyTable, Table, TableCard } from "@/components/application/table/table";
import { Badge, BadgeWithIcon } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Input } from "@/components/base/input/input";
import { Label } from "@/components/base/input/label";
import { Select } from "@/components/base/select/select";
import { SelectItem } from "@/components/base/select/select-item";
import { Tabs } from "@/components/application/tabs/tabs";
import { CustomBreadscrumbs } from "@/components/application/breadcrumbs/custom-breadcrumbs";
import { DatePicker } from "@/components/application/date-picker/date-picker";
import { DateRangePicker } from "@/components/application/date-picker/date-range-picker";
import { SlideoutMenu } from "@/components/application/slideout-menus/slideout-menu";
import { getAgentwisePaymentSummary, getpayment, getSummary } from "@/utils/services/paymentService";
import { useStoreSnackbar } from "@/store/snackbar";
import { RefreshCw01, FilterLines, X } from "@untitledui/icons";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { parseDate, getLocalTimeZone, startOfMonth, today } from "@internationalized/date";
import { useAvailableTableWidth } from "@/hooks/use-available-table-width";
import type { DateValue } from "react-aria-components";
import type { RangeValue } from "@react-types/shared";
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
import Tmodal from "@/components/utils/Tmodal";

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

const columns = [
    { id: "index", name: "S. No.", isRowHeader: true, widthRatio: 6, minWidth: 64 },
    { id: "packageId", name: "Package ID", widthRatio: 14, minWidth: 140 },
    { id: "clientDetails", name: "CustomerName/Email/Phone", widthRatio: 30, minWidth: 220 },
    { id: "paymentDate", name: "PaymentDate", widthRatio: 18, minWidth: 160 },
    { id: "amount", name: "Amount", widthRatio: 12, minWidth: 120 },
    { id: "paymentType", name: "Payment Type", widthRatio: 10, minWidth: 120 },
];

const formatPaymentDate = (dateStr?: string) => {
    if (!dateStr) return { date: "-", time: "" };
    const date = new Date(dateStr);
    if (Number.isNaN(date.getTime())) return { date: "-", time: "" };
    const formatted = new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "short",
        year: "2-digit",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    }).format(date);
    const [datePart, timePart] = formatted.split(", ");
    return { date: datePart.replace(/ /g, "-"), time: timePart || "" };
};

const formatModalDate = (dateStr?: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    if (Number.isNaN(date.getTime())) return "";
    return new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "short",
        year: "2-digit",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    }).format(date);
};

const PaymentSummaryGraph = () => {
    const { showSnackbar } = useStoreSnackbar();
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

                const result: any = await getSummary(params);
                const summary = result?.summary || {};
                const values = [
                    summary?.AllProfit ?? 0,
                    summary?.AllCrPayment ?? 0,
                    summary?.AllDrPayment ?? 0,
                ];

                setGraphData({
                    labels: ["Profit", "Total Credit Payments", "Total Debit Payments"],
                    datasets: [
                        {
                            label: "Payment Summary",
                            data: values,
                            backgroundColor: values.map((_, index) => getColorByIndex(index).bg),
                            borderColor: values.map((_, index) => getColorByIndex(index).border),
                        },
                    ],
                });
            } catch (error: any) {
                showSnackbar({
                    title: "Error",
                    description: error?.message || "Failed to load payment summary.",
                    color: "danger",
                });
            } finally {
                setIsLoading(false);
            }
        };

        fetchGraphData();
    }, [graphFilters, showSnackbar]);

    const graphOptions = useMemo<ChartOptions<"bar">>(
        () => ({
            responsive: true,
            plugins: {
                legend: { position: "top" },
                title: {
                    display: true,
                    text: "Payment Data by Store",
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
                    <h2 className="text-md font-semibold text-primary">Payment Summary</h2>
                    <p className="text-sm text-tertiary">Totals grouped by date range</p>
                </div>

                {graphFilters.isCustomDate && (
                    <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                        <DateRangePicker
                            value={graphFilters.range}
                            onChange={(value) =>
                                setGraphFilters((prev) => ({
                                    ...prev,
                                    range: value ?? prev.range,
                                }))
                            }
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
                        {["line", "bar"].map((type) => (
                            <button
                                key={type}
                                className={`rounded-md px-3 py-1 text-sm transition-all ${
                                    graphFilters.chartType === type ? "bg-primary text-primary shadow-sm" : "text-tertiary hover:bg-secondary/70"
                                }`}
                                onClick={() => setGraphFilters((prev) => ({ ...prev, chartType: type }))}
                            >
                                {type === "line" ? "Line" : "Bar"}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="h-80">
                    {isLoading ? (
                        <div className="flex h-full items-center justify-center text-sm text-tertiary">Loading...</div>
                    ) : graphData.labels.length ? (
                        graphFilters.chartType === "line" ? (
                            <Line options={graphOptions as ChartOptions<"line">} data={graphData} />
                        ) : (
                            <Bar options={graphOptions} data={graphData} />
                        )
                    ) : (
                        <div className="flex h-full items-center justify-center text-sm text-tertiary">No data to display</div>
                    )}
                </div>
            </div>
        </div>
    );
};

const StorePaymentGraph = () => {
    const { showSnackbar } = useStoreSnackbar();
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

                const result: any = await getSummary(params);
                const data = Array.isArray(result?.data) ? result.data : [];
                const summary = result?.summary || {};

                if (!data.length) {
                    setGraphData({
                        labels: ["No Data"],
                        datasets: [
                            {
                                label: "Profit Report",
                                data: [0],
                                backgroundColor: getColorByIndex(0).bg,
                                borderColor: getColorByIndex(0).border,
                            },
                        ],
                    });
                    return;
                }

                const labels = ["All", ...data.map((item: any) => item.store || item?.paymentStore?.title || "Unknown")];
                setGraphData({
                    labels,
                    datasets: [
                        {
                            label: "Total Profit",
                            data: [summary?.AllProfit ?? 0, ...data.map((item: any) => item.totalProfit || 0)],
                            backgroundColor: "#8fccfaa6",
                            borderColor: "#8fccfaa6",
                        },
                        {
                            label: "Credit Payments",
                            data: [summary?.AllCrPayment ?? 0, ...data.map((item: any) => item.totalCrAmount || 0)],
                            backgroundColor: "#46a7586b",
                            borderColor: "#46a7586b",
                        },
                        {
                            label: "Debit Payments",
                            data: [summary?.AllDrPayment ?? 0, ...data.map((item: any) => item.totalDrAmount || 0)],
                            backgroundColor: "#ff638461",
                            borderColor: "#ff638461",
                        },
                    ],
                });
            } catch (error: any) {
                showSnackbar({
                    title: "Error",
                    description: error?.message || "Failed to load store summary.",
                    color: "danger",
                });
            } finally {
                setIsLoading(false);
            }
        };

        fetchGraphData();
    }, [graphFilters, showSnackbar]);

    const graphOptions = useMemo<ChartOptions<"bar">>(
        () => ({
            responsive: true,
            plugins: {
                legend: { position: "top" },
                title: {
                    display: true,
                    text: "Profit Report",
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
                    <h2 className="text-md font-semibold text-primary">Total Payment Summary</h2>
                    <p className="text-sm text-tertiary">Payment performance by store</p>
                </div>

                {graphFilters.isCustomDate && (
                    <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                        <DateRangePicker
                            value={graphFilters.range}
                            onChange={(value) =>
                                setGraphFilters((prev) => ({
                                    ...prev,
                                    range: value ?? prev.range,
                                }))
                            }
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
                        {["line", "bar"].map((type) => (
                            <button
                                key={type}
                                className={`rounded-md px-3 py-1 text-sm transition-all ${
                                    graphFilters.chartType === type ? "bg-primary text-primary shadow-sm" : "text-tertiary hover:bg-secondary/70"
                                }`}
                                onClick={() => setGraphFilters((prev) => ({ ...prev, chartType: type }))}
                            >
                                {type === "line" ? "Line" : "Bar"}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="h-80">
                    {isLoading ? (
                        <div className="flex h-full items-center justify-center text-sm text-tertiary">Loading...</div>
                    ) : graphData.labels.length ? (
                        graphFilters.chartType === "line" ? (
                            <Line options={graphOptions as ChartOptions<"line">} data={graphData} />
                        ) : (
                            <Bar options={graphOptions} data={graphData} />
                        )
                    ) : (
                        <div className="flex h-full items-center justify-center text-sm text-tertiary">No data to display</div>
                    )}
                </div>
            </div>
        </div>
    );
};

const AgentPaymentGraph = () => {
    const { showSnackbar } = useStoreSnackbar();
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

                const result: any = await getAgentwisePaymentSummary(params);
                const data = Array.isArray(result) ? result : result?.data || [];

                if (!data.length) {
                    setGraphData({
                        labels: ["No Data"],
                        datasets: [
                            {
                                label: "Agent Payment Report",
                                data: [0],
                                backgroundColor: getColorByIndex(0).bg,
                                borderColor: getColorByIndex(0).border,
                            },
                        ],
                    });
                    return;
                }

                const labels = data.map((item: any) => item.agentName || "Unknown");
                setGraphData({
                    labels,
                    datasets: [
                        {
                            label: "Total Profit",
                            data: data.map((item: any) => item.totalProfit || 0),
                            backgroundColor: "#8fccfaa6",
                            borderColor: "#8fccfaa6",
                        },
                        {
                            label: "Credit Payments",
                            data: data.map((item: any) => item.crAmount || 0),
                            backgroundColor: "#46a7586b",
                            borderColor: "#46a7586b",
                        },
                        {
                            label: "Debit Payments",
                            data: data.map((item: any) => item.drAmount || 0),
                            backgroundColor: "#ff638461",
                            borderColor: "#ff638461",
                        },
                    ],
                });
            } catch (error: any) {
                showSnackbar({
                    title: "Error",
                    description: error?.message || "Failed to load agent summary.",
                    color: "danger",
                });
            } finally {
                setIsLoading(false);
            }
        };

        fetchGraphData();
    }, [graphFilters, showSnackbar]);

    const graphOptions = useMemo<ChartOptions<"bar">>(
        () => ({
            responsive: true,
            plugins: {
                legend: { position: "top" },
                title: {
                    display: true,
                    text: "Agent Profit Report",
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
                    <h2 className="text-md font-semibold text-primary">Agent Payment Summary</h2>
                    <p className="text-sm text-tertiary">Profit by agent</p>
                </div>

                {graphFilters.isCustomDate && (
                    <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                        <DateRangePicker
                            value={graphFilters.range}
                            onChange={(value) =>
                                setGraphFilters((prev) => ({
                                    ...prev,
                                    range: value ?? prev.range,
                                }))
                            }
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
                        {["line", "bar"].map((type) => (
                            <button
                                key={type}
                                className={`rounded-md px-3 py-1 text-sm transition-all ${
                                    graphFilters.chartType === type ? "bg-primary text-primary shadow-sm" : "text-tertiary hover:bg-secondary/70"
                                }`}
                                onClick={() => setGraphFilters((prev) => ({ ...prev, chartType: type }))}
                            >
                                {type === "line" ? "Line" : "Bar"}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="h-80">
                    {isLoading ? (
                        <div className="flex h-full items-center justify-center text-sm text-tertiary">Loading...</div>
                    ) : graphData.labels.length ? (
                        graphFilters.chartType === "line" ? (
                            <Line options={graphOptions as ChartOptions<"line">} data={graphData} />
                        ) : (
                            <Bar options={graphOptions} data={graphData} />
                        )
                    ) : (
                        <div className="flex h-full items-center justify-center text-sm text-tertiary">No data to display</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default function ReportsPaymentPage() {
    const availableWidth = useAvailableTableWidth();
    const [searchParams, setSearchParams] = useSearchParams();
    const { showSnackbar } = useStoreSnackbar();
    const [activeTab, setActiveTab] = useState("dashboard");

    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState<any[]>([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [selectedReportData, setSelectedReportData] = useState<any | null>(null);
    const [reportModalOpen, setReportModalOpen] = useState(false);

    const page = Number(searchParams.get("page") || "1");
    const limit = Number(searchParams.get("limit") || "10");
    const [filters, setFilters] = useState({
        packageId: searchParams.get("packageId") || "",
        clientDetails: searchParams.get("clientDetails") || "",
        amount: searchParams.get("amount") || "",
        paymentType: searchParams.get("paymentType") || "",
        from: searchParams.get("from") || "",
        to: searchParams.get("to") || "",
    });

    const [debouncedFilters, setDebouncedFilters] = useState(filters);
    const [tempFilters, setTempFilters] = useState(filters);

    const handleOpenFilters = () => {
        setTempFilters(filters);
    };

    const handleApplyFilters = (close: () => void) => {
        setFilters(tempFilters);
        close();
    };

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedFilters(filters);
        }, 500);
        return () => clearTimeout(handler);
    }, [filters]);

    useEffect(() => {
        const params: Record<string, string> = {
            page: String(page),
            limit: String(limit),
            ...debouncedFilters,
        };
        Object.keys(params).forEach(key => {
            if (params[key] === "") delete params[key];
        });
        setSearchParams(params);
    }, [page, limit, debouncedFilters, setSearchParams]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const params: Record<string, any> = {
                    totalCount: true,
                    page,
                    limit,
                    populate: "assignment,paymentStore",
                    select_assignment: "clientName,email,mobile,travelLocation,packageId,agentName",
                    select_paymentStore: "title",
                    ...debouncedFilters,
                };
                Object.keys(params).forEach(key => {
                    if (params[key] === "" || params[key] === undefined || params[key] === null) delete params[key];
                });
                const response = await getpayment(params);
                if (response.error) {
                    throw new Error(response.error);
                }
                setItems(response.data || []);
                setTotalRecords(response.totalCount || 0);
            } catch (error: any) {
                showSnackbar({
                    title: "Error",
                    description: error.message || "Failed to fetch payment reports",
                    color: "danger",
                });
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [page, limit, debouncedFilters]);

    const handleResetTempFilters = (close?: () => void) => {
        const resetState = {
            packageId: "",
            clientDetails: "",
            amount: "",
            paymentType: "",
            from: "",
            to: "",
            status: "",
        };
        setTempFilters(resetState);
        setFilters(resetState);
        setDebouncedFilters(resetState);
        if (close) close();
    };

    const handleRemoveFilter = (key: string) => {
        const resetState = { ...filters, [key]: "" };
        setFilters(resetState);
        setTempFilters(resetState);
        setDebouncedFilters(resetState);
    };


    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", String(newPage));
        setSearchParams(params);
    };

    const handleLimitChange = (newLimit: string) => {
        const params = new URLSearchParams(searchParams);
        params.set("limit", newLimit);
        params.set("page", "1");
        setSearchParams(params);
    };

    return (
        <DefaultLayout>
            <div className="space-y-4" style={{ width: availableWidth }}>
                <CustomBreadscrumbs
                    list={[
                        { label: "Bookings", link: "/bookings/reports/payment" },
                        { label: "Reports", link: "/bookings/reports/payment" },
                    ]}
                />

                <Tabs selectedKey={activeTab} onSelectionChange={(key) => setActiveTab(String(key))}>
                    <Tabs.List
                        type="underline"
                        orientation="horizontal"
                        items={[
                            { id: "dashboard", label: "Dashboard" },
                            { id: "paymentReportList", label: "Payment Report List" },
                        ]}
                    >
                        {(item) => (
                            <Tabs.Item id={item.id} label={item.label}>
                                {item.label}
                            </Tabs.Item>
                        )}
                    </Tabs.List>

                    <Tabs.Panel id="dashboard" className="mt-4 space-y-4">
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                            <PaymentSummaryGraph />
                            <StorePaymentGraph />
                        </div>
                        <AgentPaymentGraph />
                    </Tabs.Panel>

                    <Tabs.Panel id="paymentReportList" className="mt-4">
                        <TableCard.Root>
                            <TableCard.Header
                                title="Payment Reports"
                                badge={loading ? "..." : totalRecords}
                                contentTrailing={
                                    <div className="flex flex-col gap-2 md:flex-row md:items-center">
                                        <Select
                                            aria-label="Rows per page"
                                            className="w-full md:w-32"
                                            selectedKey={String(limit)}
                                            onSelectionChange={(key) => handleLimitChange(String(key))}
                                            items={[
                                                { id: "10", label: "10 / page" },
                                                { id: "25", label: "25 / page" },
                                                { id: "50", label: "50 / page" },
                                            ]}
                                        >
                                            {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                        </Select>
                                    </div>
                                }
                            />

                            <div className="border-b border-secondary bg-primary px-4 py-4 md:px-6">
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center justify-between">
                                        <SlideoutMenu.Trigger>
                                            <Button color="secondary" iconLeading={FilterLines} onClick={handleOpenFilters}>
                                                More filters
                                            </Button>
                                            <SlideoutMenu isDismissable>
                                                {({ close }) => (
                                                    <>
                                                        <SlideoutMenu.Header onClose={close}>Filters</SlideoutMenu.Header>
                                                        <SlideoutMenu.Content>
                                                            <div className="flex flex-col gap-4">
                                                                <Input
                                                                    label="Package ID"
                                                                    placeholder="Search by Package ID"
                                                                    value={tempFilters.packageId}
                                                                    onChange={(value) => setTempFilters((prev) => ({ ...prev, packageId: value }))}
                                                                />
                                                                <Input
                                                                    label="Client Details"
                                                                    placeholder="Search by Client Details"
                                                                    value={tempFilters.clientDetails}
                                                                    onChange={(value) => setTempFilters((prev) => ({ ...prev, clientDetails: value }))}
                                                                />
                                                                <Input
                                                                    label="Payment Type"
                                                                    placeholder="Search by Payment Type"
                                                                    value={tempFilters.paymentType}
                                                                    onChange={(value) => setTempFilters((prev) => ({ ...prev, paymentType: value }))}
                                                                />
                                                                <div className="flex flex-col gap-1.5">
                                                                    <Label>Date Range</Label>
                                                                    <div className="flex gap-2">
                                                                        <div className="flex-1">
                                                                            <DatePicker
                                                                                aria-label="From"
                                                                                value={tempFilters.from ? parseDate(tempFilters.from) : null}
                                                                                onChange={(date) =>
                                                                                    setTempFilters((prev) => ({ ...prev, from: date ? date.toString() : "" }))
                                                                                }
                                                                            />
                                                                        </div>
                                                                        <div className="flex-1">
                                                                            <DatePicker
                                                                                aria-label="To"
                                                                                value={tempFilters.to ? parseDate(tempFilters.to) : null}
                                                                                onChange={(date) =>
                                                                                    setTempFilters((prev) => ({ ...prev, to: date ? date.toString() : "" }))
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </SlideoutMenu.Content>
                                                        <SlideoutMenu.Footer>
                                                            <div className="flex gap-3 w-full">
                                                                <Button color="secondary" className="flex-1 justify-center" onClick={() => handleResetTempFilters(close)}>
                                                                    Reset
                                                                </Button>
                                                                <Button color="primary" className="flex-1 justify-center" onClick={() => handleApplyFilters(close)}>
                                                                    Apply Filters
                                                                </Button>
                                                            </div>
                                                        </SlideoutMenu.Footer>
                                                    </>
                                                )}
                                            </SlideoutMenu>
                                        </SlideoutMenu.Trigger>
                                        <ButtonUtility
                                            icon={RefreshCw01}
                                            onClick={() => handleResetTempFilters()}
                                            color="secondary"
                                            size="sm"
                                            tooltip="Reset Filters"
                                        />
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {Object.entries(filters).map(([key, value]) => {
                                            if (!value) return null;
                                            let label = key;

                                            if (key === "packageId") label = "Package ID";
                                            if (key === "clientDetails") label = "Client";
                                            if (key === "paymentType") label = "Type";
                                            if (key === "from") label = "From";
                                            if (key === "to") label = "To";
                                            if (key === "amount") label = "Amount";

                                            return (
                                                <div key={key} onClick={() => handleRemoveFilter(key)} className="cursor-pointer">
                                                    <BadgeWithIcon iconTrailing={X} color="brand">
                                                        <span className="font-medium text-gray-500 mr-1">{label}:</span>
                                                        <span className="font-semibold text-brand-700">{value}</span>
                                                    </BadgeWithIcon>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            <StickyTable
                                ariaLabel="Payment Reports list"
                                columns={columns}
                                items={items}
                                availableWidth={availableWidth}
                                loading={loading}
                            >
                                {(item) => {
                                    const paymentTime = formatPaymentDate(item.paymentDate);
                                    return (
                                        <Table.Row id={item.id || item._id}>
                                            <Table.Cell className="whitespace-nowrap px-4 py-3">
                                                {(page - 1) * limit + items.indexOf(item) + 1}
                                            </Table.Cell>
                                            <Table.Cell className="whitespace-nowrap px-4 py-3">{item.assignment?.packageId || "-"}</Table.Cell>
                                            <Table.Cell className="whitespace-normal px-4 py-3 min-w-[200px]">
                                                <div
                                                    className="flex cursor-pointer flex-col hover:underline"
                                                    onClick={() => {
                                                        setSelectedReportData(item);
                                                        setReportModalOpen(true);
                                                    }}
                                                >
                                                    <span className="font-medium">{item.assignment?.clientName}</span>
                                                    <span className="text-xs text-tertiary">{item.assignment?.email}</span>
                                                    <span className="text-xs text-tertiary">{item.assignment?.mobile}</span>
                                                </div>
                                            </Table.Cell>
                                            <Table.Cell className="whitespace-nowrap px-4 py-3">
                                                <div className="flex flex-col">
                                                    <span>{paymentTime.date}</span>
                                                    {paymentTime.time && <span className="text-xs text-tertiary">{paymentTime.time}</span>}
                                                </div>
                                            </Table.Cell>
                                            <Table.Cell className="whitespace-nowrap px-4 py-3">{item.amount}</Table.Cell>
                                            <Table.Cell className="whitespace-nowrap px-4 py-3">
                                                <Badge
                                                    size="sm"
                                                    color={item.paymentType === "Cr" ? "success" : item.paymentType === "Dr" ? "warning" : "gray"}
                                                >
                                                    {item.paymentType}
                                                </Badge>
                                            </Table.Cell>
                                        </Table.Row>
                                    );
                                }}
                            </StickyTable>

                            <PaginationButtonGroup
                                page={page}
                                total={Math.ceil(totalRecords / limit)}
                                onPageChange={handlePageChange}
                                align="center"
                                className="py-4"
                            />
                        </TableCard.Root>
                    </Tabs.Panel>
                </Tabs>

                <Tmodal
                    isOpen={reportModalOpen}
                    onClose={() => setReportModalOpen(false)}
                    header="Report View"
                    hideCancelButton
                    content={
                        <div className="pb-4">
                            <div className="grid grid-cols-1 gap-4 pt-4 md:grid-cols-2">
                                <Input label="Package ID" placeholder="Package ID" value={selectedReportData?.assignment?.packageId || ""} isDisabled />
                                <Input label="Customer Name" placeholder="Customer Name" value={selectedReportData?.assignment?.clientName || ""} isDisabled />
                            </div>
                            <div className="grid grid-cols-1 gap-4 pt-4 md:grid-cols-2">
                                <Input label="Email" placeholder="Email" value={selectedReportData?.assignment?.email || ""} isDisabled />
                                <Input label="Mobile" placeholder="Mobile" value={selectedReportData?.assignment?.mobile || ""} isDisabled />
                            </div>
                            <div className="grid grid-cols-1 gap-4 pt-4 md:grid-cols-2">
                                <Input label="Payment Date" placeholder="Payment Date" value={formatModalDate(selectedReportData?.paymentDate)} isDisabled />
                                <Input label="Payment Amount" placeholder="Payment Amount" value={selectedReportData?.amount || ""} isDisabled />
                            </div>
                            <div className="grid grid-cols-1 gap-4 pt-4 md:grid-cols-2">
                                <Input label="Payment Mode" placeholder="Payment Mode" value={selectedReportData?.paymentStore?.title || ""} isDisabled />
                                <Input label="Payment To" placeholder="Payment To" value={selectedReportData?.paymentTo || ""} isDisabled />
                            </div>
                        </div>
                    }
                />
            </div>
        </DefaultLayout>
    );
}
