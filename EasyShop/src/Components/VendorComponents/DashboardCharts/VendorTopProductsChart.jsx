
import { useState, useRef, useEffect } from "react";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, Cell
} from "recharts";
import { useVendorTopProducts } from "../../../hook/useVendor";
import { useTranslation } from "react-i18next";

const LIMITS = [5, 10];

const truncate = (str = "", n = 16) =>
    str.length > n ? str.slice(0, n) + "..." : str;

const CustomTooltip = ({ active, payload }) => {
    const { t } = useTranslation();

    if (!active || !payload?.length) return null;

    const d = payload[0].payload;

    return (
        <div className="bg-white dark:bg-slate-800 border border-pink-100 rounded-xl shadow-lg p-3 text-xs max-w-45">
            <p className="font-semibold text-slate-700 dark:text-slate-200 mb-1 wrap-break-words">
                {d.name}
            </p>
            <p className="text-pink-500">
                {d.unitsSold} {t('vendorTopProducts.tooltipUnitsSold')}
            </p>
            <p className="text-purple-500">
                ₹{d.revenue?.toLocaleString()} {t('vendorTopProducts.tooltipRevenue')}
            </p>
        </div>
    );
};

const BAR_COLORS = [
    "#ec4899",
    "#d946ef",
    "#a855f7",
    "#8b5cf6",
    "#6366f1",
    "#ec4899",
    "#d946ef",
    "#a855f7",
    "#8b5cf6",
    "#6366f1",
];

function VendorTopProductsChart() {
    const { t } = useTranslation();
    const [limit, setLimit] = useState(5);
    const { data, isLoading, isError } = useVendorTopProducts(limit);

    const chartRef = useRef(null);
    const [chartWidth, setChartWidth] = useState(0);

    useEffect(() => {
        if (!chartRef.current) return;

        const observer = new ResizeObserver(([entry]) => {
            setChartWidth(entry.contentRect.width);
        });

        observer.observe(chartRef.current);

        return () => observer.disconnect();
    }, []);

    const isCompact = chartWidth > 0 && chartWidth < 340;
    const isNarrow = chartWidth > 0 && chartWidth < 460;

    const chartHeight = isCompact ? 300 : 260;
    const yAxisWidth = isCompact ? 74 : isNarrow ? 92 : 115;
    const labelLength = isCompact ? 11 : isNarrow ? 14 : 16;
    const rightMargin = isCompact ? 4 : 16;
    const barSize = isCompact ? 22 : 28;

    return (
        <div className="min-w-0 p-4 sm:p-6 bg-white dark:bg-slate-800 rounded-2xl border border-pink-50 shadow-sm hover:shadow-md transition-all">
            <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
                <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                        {t('vendorTopProducts.chartTitle')}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                        {t('vendorTopProducts.chartSubTitle')}
                    </p>
                </div>

                <div className="flex shrink-0 gap-1">
                    {LIMITS.map((n) => (
                        <button
                            key={n}
                            onClick={() => setLimit(n)}
                            className={`min-w-10 px-2.5 sm:px-3 py-1 text-xs rounded-lg font-medium transition-all 
                                ${limit === n
                                    ? "bg-pink-500 text-white shadow-sm"
                                    : "bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 hover:bg-pink-50"
                                }`}
                        >
                            {t('vendorTopProducts.limitButtonLabel', { count: n })}
                        </button>
                    ))}
                </div>
            </div>

            {isLoading && (
                <div className="h-64 flex items-center justify-center text-sm text-slate-400">
                    {t('vendorTopProducts.loading')}
                </div>
            )}

            {isError && (
                <div className="h-64 flex items-center justify-center text-sm text-red-400">
                    {t('vendorTopProducts.error')}
                </div>
            )}

            {data && data.length === 0 && (
                <div className="h-64 flex items-center justify-center text-sm text-slate-400">
                    {t('vendorTopProducts.noData')}
                </div>
            )}

            {data && data.length > 0 && (
                <div ref={chartRef} className="min-w-0 w-full">
                    <ResponsiveContainer width="100%" height={chartHeight}>
                        <BarChart
                            data={data}
                            layout="vertical"
                            margin={{
                                top: 4,
                                right: rightMargin,
                                left: 0,
                                bottom: 0,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />

                            <XAxis
                                type="number"
                                tick={{ fontSize: 10, fill: "#94a3b8" }}
                                axisLine={false}
                                tickLine={false}
                            />

                            <YAxis
                                type="category"
                                dataKey="name"
                                width={yAxisWidth}
                                tick={{ fontSize: 10, fill: "#64748b" }}
                                axisLine={false}
                                tickLine={false}
                                tickFormatter={(v) => truncate(v, labelLength)}
                            />

                            <Tooltip content={<CustomTooltip />} cursor={{ fill: "#fdf2f8" }} />

                            <Bar dataKey="unitsSold" radius={[0, 6, 6, 0]} maxBarSize={barSize}>
                                {data.map((_, i) => (
                                    <Cell key={i} fill={BAR_COLORS[i % BAR_COLORS.length]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
}

export default VendorTopProductsChart;