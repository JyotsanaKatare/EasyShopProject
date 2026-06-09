
import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip, Legend, ResponsiveContainer
} from 'recharts';

import { useRevenueByPaymentMethod } from '../../hooks/useAdminStats';
import { useTranslation } from 'react-i18next';

function RevenueByPaymentChart() {

    const { t } = useTranslation();
    const { data, isLoading } = useRevenueByPaymentMethod();
    const chartData = data?.data || [];

    return (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-4 sm:p-6 shadow-sm border border-pink-50/50 dark:border-slate-700/50 w-full overflow-hidden">
            <div className="mb-6">
                <h3 className="text-base font-black text-slate-800 dark:text-white">
                    {t('revenueByPayment.title')}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                    {t('revenueByPayment.desc')}
                </p>
            </div>

            {isLoading ? (
                <div className="h-64 flex items-center justify-center text-slate-400 text-sm">
                    <span className="animate-pulse">{t('revenueByPayment.loading')}</span>
                </div>
            ) : chartData.length === 0 ? (
                <div className="h-64 flex items-center justify-center text-slate-400 text-sm">
                    {t('revenueByPayment.noData')}
                </div>
            ) : (
                <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={chartData}
                            margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-slate-100 dark:text-slate-700/50" vertical={false} />
                            <XAxis
                                dataKey="name"
                                tick={{ fontSize: 10, fill: '#94a3b8' }}
                                tickLine={false}
                                axisLine={false}
                                interval={0} 
                            />
                            <YAxis
                                tick={{ fontSize: 10, fill: '#94a3b8' }}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(v) => v >= 1000 ? `₹${(v / 1000).toFixed(1)}k` : `₹${v}`}
                            />
                            <Tooltip
                                contentStyle={{
                                    borderRadius: '12px',
                                    border: 'none',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                    fontSize: '11px'
                                }}
                                formatter={(value, name) => name === 'revenue' ? [`₹${value}`, t('revenueByPayment.revenue')] : [value, t('orders')]}
                            />
                            <Legend wrapperStyle={{ fontSize: '10px' }} iconSize={8} />
                            <Bar dataKey="revenue" name={t('revenueByPayment.revenue')} fill="#ec4899" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="orders" name={t('revenueByPayment.orders')} fill="#fda4af" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
}

export default RevenueByPaymentChart;