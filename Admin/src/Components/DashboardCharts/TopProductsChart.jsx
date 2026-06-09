
import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, Cell
} from 'recharts';

import { useTopProducts } from '../../hooks/useAdminStats';
import { useTranslation } from 'react-i18next';

const BAR_COLORS = ['#ec4899', '#f43f5e', '#fb7185', '#fda4af', '#fecdd3'];

function TopProductsChart() {

    const { t } = useTranslation();
    const { data, isLoading } = useTopProducts();
    const chartData = data || [];

    return (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-4 sm:p-6 shadow-sm border border-pink-50/50 dark:border-slate-700/50 w-full overflow-hidden">
            <div className="mb-6">
                <h3 className="text-base font-black text-slate-800 dark:text-white">
                    {t('topProducts.title')}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                    {t('topProducts.desc')}
                </p>
            </div>

            {isLoading ? (
                <div className="h-64 flex items-center justify-center text-slate-400 text-sm">
                    <span className="animate-pulse">{t('topProducts.loading')}</span>
                </div>
            ) : chartData.length === 0 ? (
                <div className="h-64 flex items-center justify-center text-slate-400 text-sm">
                    {t('topProducts.noData')}
                </div>
            ) : (
                <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={chartData}
                            layout="vertical"
                            margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-slate-100 dark:text-slate-700/50" horizontal={false} />
                            <XAxis type="number" hide />
                            <YAxis
                                dataKey="name"
                                type="category"
                                tick={{ fontSize: 10, fill: '#64748b' }}
                                tickLine={false}
                                axisLine={false}
                                width={80} // Reduced width to save space for bars on mobile
                                tickFormatter={(val) => val.length > 10 ? `${val.substring(0, 8)}...` : val}
                            />
                            <Tooltip
                                cursor={{ fill: 'transparent' }}
                                contentStyle={{
                                    borderRadius: '12px',
                                    border: 'none',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                    fontSize: '11px'
                                }}
                                formatter={(value, name, props) => {
                                    const { sales, revenue } = props.payload;
                                    if (name === 'sales') {
                                        return [
                                            <>
                                                <span className="block font-bold text-slate-700">
                                                    {t('topProducts.unitsSold')}: {sales}
                                                </span>
                                                <span className="block font-bold text-pink-500 mt-0.5">
                                                    {t('topProducts.revenue')}: ₹{revenue?.toLocaleString('en-IN')}
                                                </span>
                                            </>
                                        ];
                                    }
                                    return [value, name];
                                }}
                            />
                            <Bar dataKey="sales" name="sales" radius={[0, 8, 8, 0]} barSize={20}>
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={BAR_COLORS[index % BAR_COLORS.length]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
}

export default TopProductsChart;