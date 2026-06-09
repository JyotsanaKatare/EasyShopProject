
import React from 'react';
import { HiOutlineXCircle, HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker, HiOutlineCalendar, HiOutlineClipboardCheck, HiOutlineShoppingBag, HiOutlineSparkles } from "react-icons/hi";
import { HiOutlineCheckBadge } from "react-icons/hi2";

import { useVendorCustomerDetail } from '../../hook/useUser';
import { useTranslation } from 'react-i18next';

function CustomerProfileDrawer({ customerId, isOpen, onClose }) {

    const { t } = useTranslation();
    const { data: customer, isLoading, isError } = useVendorCustomerDetail(customerId);

    if (!isOpen) return null;

    if (isLoading) return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm">
            <div className="bg-white p-5 rounded-lg shadow-lg font-bold">Loading Customer Data...</div>
        </div>
    );

    if (isError || !customer) return null;

    const { profile, metrics, orders } = customer;

    // Metrics Section Mapping
    const financialMetrics = [
        {
            icon: HiOutlineShoppingBag,
            label: 'Total Orders',
            value: metrics?.totalOrders || 0,
            color: 'text-emerald-500'
        },
        {
            icon: HiOutlineSparkles,
            label: 'AOV (Avg Value)',
            value: `₹${metrics?.avgOrderValue || 0}`,
            color: 'text-amber-500'
        },
        {
            icon: HiOutlineCheckBadge,
            label: 'Lifetime Value',
            value: `₹${metrics?.totalSpend || 0}`,
            color: 'text-pink-500'
        },
    ];

    return (
        <>
            <div className="fixed inset-0 z-60 overflow-hidden">
                <div
                    className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300"
                    onClick={onClose}
                />
                <div className={`absolute inset-y-0 right-0 w-full max-w-xl bg-white dark:bg-slate-950 shadow-2xl transform transition-transform duration-500 ease-in-out flex flex-col h-full ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}>

                    {/* content */}
                    <div className="flex flex-col h-full overflow-hidden">

                        {/* --------- Header --------- */}
                        <div className="p-5 md:p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-start gap-4 bg-pink-50/30 dark:bg-pink-900/10">
                            <div className="flex items-center gap-3 md:gap-5 min-w-0">
                                <img
                                    src={profile?.profilePhoto || 'https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png'}
                                    alt={profile?.name}
                                    className="w-14 h-14 md:w-16 md:h-16 rounded-full border-4 border-white dark:border-slate-800 shadow-lg shrink-0"
                                />

                                <div className="min-w-0">
                                    <h3 className="text-lg md:text-xl font-black text-slate-800 dark:text-white truncate">
                                        {profile.name}
                                    </h3>

                                    <p className="text-[10px] md:text-[11px] text-slate-400 uppercase font-bold tracking-widest truncate">
                                        {t('customerDrawer.idLabel', { id: profile?._id?.slice(-8) })}
                                    </p>

                                    <div className="mt-2">
                                        <span className={`px-2 py-0.5 rounded-lg text-[9px] md:text-[10px] font-extrabold uppercase border 
                    ${profile?.isActive
                                                ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                                                : 'bg-blue-50 text-blue-600 border-blue-100'
                                            }`}>
                                            {profile?.isActive ? t('customerDrawer.statusActive') : t('customerDrawer.statusInactive')}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={onClose}
                                className="p-1 text-slate-400 hover:text-pink-500 transition-colors shrink-0">
                                <HiOutlineXCircle size={24} />
                            </button>
                        </div>

                        {/* ----------Body-Scrollable Content---------- */}
                        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">

                            {/* 1. Contact Info Section */}
                            <div className="space-y-4">
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                    {t('customerDrawer.contactDetails')}
                                </h4>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                                    {[
                                        { icon: HiOutlineMail, label: t('customerDrawer.emailAddress'), value: profile?.email },
                                        { icon: HiOutlinePhone, label: t('customerDrawer.phoneNumber'), value: profile?.contact || 'Not Provided' },
                                        { icon: HiOutlineLocationMarker, label: t('customerDrawer.primaryLocation'), value: profile?.city },
                                        { icon: HiOutlineCalendar, label: t('customerDrawer.customerSince'), value: new Date(profile?.createdAt).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }) },
                                    ].map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 transition-colors"
                                        >
                                            <div className="w-9 h-9 shrink-0 bg-pink-50 dark:bg-pink-500/10 text-pink-500 rounded-lg flex items-center justify-center border border-pink-100/50 dark:border-pink-500/20">
                                                <item.icon size={18} />
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <p className="text-[10px] font-bold text-slate-400 uppercase truncate">
                                                    {item.label}
                                                </p>
                                                <p className="text-xs md:text-sm font-bold text-slate-700 dark:text-slate-200 truncate">
                                                    {item.value}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* 2. Key Metrics Cards */}
                            {/* 2. Key Metrics Cards */}
                            <div className="space-y-4 pt-2">
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                    {t('customerDrawer.financialSummary')}
                                </h4>

                                {/* Grid: 2 columns on mobile (to keep text readable), 3 columns on sm screens and up */}
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
                                    {financialMetrics.map((metric, idx) => (
                                        <div
                                            key={idx}
                                            className="p-3 md:p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm text-center flex flex-col items-center justify-center"
                                        >
                                            <metric.icon size={18} className={`mb-1.5 ${metric.color}`} />

                                            {/* Added min-w-0 and truncate to handle long currency/metric values */}
                                            <p className="w-full text-xs md:text-sm font-black text-slate-800 dark:text-white truncate">
                                                {metric.value}
                                            </p>

                                            <p className="w-full text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-tight mt-0.5 truncate">
                                                {metric.label}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* 3. Recent Orders Timeline */}
                            <div className="space-y-4 pt-2 relative">
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                    {t('customerDrawer.recentActivity')}
                                </h4>

                                <div className="absolute left-4.5 top-11 bottom-2 w-0.5 bg-slate-100 dark:bg-slate-800"></div>

                                {/* Activity Timeline Mapping (Recent Orders) */}
                                {orders && orders.length > 0 ? orders.map((order, idx) => (
                                    <div key={order._id} className="flex gap-4 items-start pl-3 relative z-10">
                                        <div className="w-3.5 h-3.5 mt-1 rounded-full border-2 border-emerald-500 bg-white dark:bg-slate-950"></div>
                                        <div className="flex-1 -mt-0.5">
                                            <div className="flex justify-between items-center">
                                                <p className="text-xs md:text-sm font-black text-slate-800 dark:text-white">#{order._id.slice(-6)}</p>
                                                <p className="text-[10px] text-slate-400 italic font-medium">
                                                    {new Date(order.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <p className="text-[10px] md:text-xs text-slate-500 mt-1">
                                                {t('customerDrawer.orderAmount', { amount: order.totalAmount })} • <span className="text-emerald-500 font-bold">{order.orderStatus}</span>
                                            </p>
                                        </div>
                                    </div>
                                )) : (
                                    <p className="text-xs text-slate-400 italic pl-10">
                                        {t('customerDrawer.noRecentOrders')}
                                    </p>
                                )}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CustomerProfileDrawer;