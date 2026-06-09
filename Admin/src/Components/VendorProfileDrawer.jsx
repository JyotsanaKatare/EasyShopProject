
import React from 'react';

import {
    HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker,
    HiOutlineCalendar, HiOutlineShoppingBag, HiOutlineSparkles,
    HiOutlineXCircle, HiOutlineUserCircle,
    HiOutlineShieldCheck
} from "react-icons/hi";
import { HiOutlineCheckBadge } from "react-icons/hi2";
import { useGetVendor } from '../hooks/useVendors';
import { useTranslation } from 'react-i18next';

function VendorProfileDrawer({ vendor, isOpen, onClose }) {

    const { t } = useTranslation();
    const { data: getVendor, isLoading, isError } = useGetVendor(vendor?._id);

    const displayVendor = getVendor || vendor;

    if (!vendor) return null;

    return (
        <>
            {/* 1. Backdrop Overlay */}
            <div
                className={`fixed inset-0 z-60 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 
                ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            />

            {/* 2. Slide-over Panel */}
            <div className={`fixed inset-y-0 right-0 z-70 w-full max-w-lg bg-white dark:bg-slate-950 shadow-2xl transform transition-transform duration-500 ease-in-out 
                ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>

                <div className="flex flex-col h-full overflow-hidden">

                    {/* --- Header Section --- */}
                    <div className="relative h-32 bg-linear-to-br from-pink-500 to-pink-600 shrink-0">
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/40 text-white rounded-full transition-all"
                        >
                            <HiOutlineXCircle size={24} />
                        </button>
                    </div>

                    {/* Compact Profile Summary Card */}
                    <div className="px-3 -mt-12 relative shrink-0">
                        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-lg border border-slate-100 dark:border-slate-800">
                            <div className="flex items-center gap-3">
                                {/* Smaller Logo */}
                                <div className="relative shrink-0">
                                    <img
                                        src={displayVendor.storeLogo}
                                        alt={displayVendor.storeName}
                                        className="w-16 h-16 rounded-xl object-cover border-2 border-white dark:border-slate-900 shadow-sm"
                                    />
                                    <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-slate-900 ${displayVendor.isActive ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                                </div>

                                {/* Minimized text spacing */}
                                <div className="min-w-0 flex-1">
                                    <h3 className="text-base font-black text-slate-800 dark:text-white truncate flex items-center gap-1.5">
                                        {displayVendor.storeName || displayVendor.name}
                                        {displayVendor.isVerified && <HiOutlineShieldCheck className="text-blue-500 shrink-0 text-sm" />}
                                    </h3>

                                    <p className="text-[10px] text-slate-400 font-mono truncate">
                                        ID: {displayVendor._id?.slice(-8).toUpperCase()}
                                    </p>

                                    {/* Compact Badges */}
                                    <div className="mt-1.5 flex gap-1.5">
                                        <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider border ${displayVendor.isActive
                                            ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                                            : 'bg-rose-50 text-rose-600 border-rose-100'
                                            }`}>
                                            {displayVendor.isActive ? t('vendorProfile.statusActive') : t('vendorProfile.statusInactive')}
                                        </span>
                                        <span className="px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider border bg-indigo-50 text-indigo-600 border-indigo-100">
                                            {displayVendor.category || t('vendorProfile.categoryDefault')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- Body (Scrollable Content) --- */}
                    <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 sm:space-y-7 custom-scrollbar">

                        {/* Section 1: Contact Details */}
                        <div className="space-y-3">
                            <h4 className="text-[10px] sm:text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-pink-500" /> {t('vendorProfile.contactInfo')}
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {[
                                    { icon: HiOutlineMail, label: t('vendorProfile.labelEmail'), value: displayVendor.email, color: 'text-blue-500' },
                                    { icon: HiOutlinePhone, label: t('vendorProfile.labelPhone'), value: displayVendor.contact || displayVendor.phone || t('vendorProfile.notSpecified'), color: 'text-emerald-500' },
                                    { icon: HiOutlineLocationMarker, label: t('vendorProfile.labelAddress'), value: displayVendor.location || displayVendor.address || t('vendorProfile.notSpecified'), color: 'text-rose-500' },
                                    { icon: HiOutlineCalendar, label: t('vendorProfile.labelJoined'), value: new Date(displayVendor.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }), color: 'text-amber-500' },
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-3 sm:gap-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                                        <item.icon size={20} className={`${item.color} shrink-0`} />
                                        <div className="min-w-0 flex-1">
                                            <p className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase">{item.label}</p>
                                            <p className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 truncate">{item.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Section 2: Financial Stats */}
                        <div className="space-y-3">
                            <h4 className="text-[10px] sm:text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" /> {t('vendorProfile.metricsTitle')}
                            </h4>
                            {/* Changed grid-cols-3 to 1 on mobile, 3 on desktop for better readability */}
                            <div className="grid grid-cols-3 gap-2 sm:gap-3">
                                {[
                                    { icon: HiOutlineShoppingBag, label: t('vendorProfile.sales'), value: displayVendor.totalOrders || '0', bg: 'bg-blue-50', text: 'text-blue-600' },
                                    { icon: HiOutlineSparkles, label: t('vendorProfile.rating'), value: displayVendor.rating || '4.5', bg: 'bg-amber-50', text: 'text-amber-600' },
                                    { icon: HiOutlineCheckBadge, label: t('vendorProfile.revenue'), value: `₹${displayVendor.revenue || '0'}`, bg: 'bg-pink-50', text: 'text-pink-600' },
                                ].map((stat, idx) => (
                                    <div key={idx} className={`${stat.bg} p-2.5 sm:p-3 rounded-2xl border border-white dark:border-slate-800 text-center shadow-sm`}>
                                        <stat.icon size={18} className={`mx-auto mb-1 ${stat.text}`} />
                                        <p className="text-xs sm:text-sm font-black text-slate-800 dark:text-white truncate">{stat.value}</p>
                                        <p className="text-[8px] sm:text-[9px] font-bold text-slate-500 uppercase mt-0.5 leading-tight truncate">{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Section 3: Admin Notes/Bio */}
                        <div className="p-4 rounded-xl bg-indigo-50/50 border border-indigo-100 dark:bg-indigo-950/20 dark:border-indigo-900/30">
                            <h5 className="text-[9px] sm:text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase mb-1 flex items-center gap-1">
                                <HiOutlineUserCircle /> {t('vendorProfile.aboutStore')}
                            </h5>
                            <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 leading-relaxed italic">
                                {displayVendor.description || t('vendorProfile.noDescription')}
                            </p>
                        </div>
                    </div>

                    {/* --- Footer Action Area --- */}
                    <div className="p-4 sm:p-6 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex flex-row gap-3 shrink-0">
                        <button className="flex-1 py-2.5 sm:py-3 px-3 sm:px-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-[11px] sm:text-xs font-bold hover:bg-slate-100 transition-all flex items-center justify-center gap-2 shadow-sm">
                            <HiOutlineMail className="text-pink-500 shrink-0" size={16} />
                            {t('vendorProfile.btnContact')}
                        </button>

                        <button className={`flex-1 py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl text-[11px] sm:text-xs font-black transition-all shadow-md ${displayVendor.isActive
                                ? 'bg-rose-500 text-white hover:bg-rose-600 shadow-rose-200 dark:shadow-none'
                                : 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-emerald-200 dark:shadow-none'
                            }`}>
                            {displayVendor.isActive ? t('vendorProfile.btnBlock') : t('vendorProfile.btnUnblock')}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default VendorProfileDrawer;