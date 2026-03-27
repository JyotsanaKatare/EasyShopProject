
import React from 'react';
import { HiOutlineXCircle, HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker, HiOutlineCalendar, HiOutlineClipboardCheck, HiOutlineShoppingBag, HiOutlineSparkles } from "react-icons/hi";
import { HiOutlineCheckBadge } from "react-icons/hi2";

function CustomerProfileDrawer({ customer, isOpen, onClose }) {
    if (!customer) return null; // Safety check

    return (
        <>
            {/* 1. Backdrop Overlay */}
            <div className={`fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 
        ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={onClose} />

            {/* 2. Slide-over Panel */}
            <div className={`fixed inset-y-0 right-0 z-50 w-full max-w-xl bg-white dark:bg-slate-950 shadow-2xl transform transition-transform duration-500 ease-in-out 
                ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>

                {/* content */}
                <div className="flex flex-col h-full overflow-hidden">

                    {/* Header */}
                    <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-start bg-pink-50/30 dark:bg-pink-900/10">
                        <div className="flex items-center gap-5">
                            <img
                                src={customer.image}
                                alt={customer.name}
                                className="w-16 h-16 rounded-full border-4 border-white dark:border-slate-800 shadow-lg" />
                            <div>

                                <div className="flex items-center gap-2">
                                    <h3 className="text-xl font-black text-slate-800 dark:text-white truncate">
                                        {customer.name}
                                    </h3>
                                    {customer.status === 'VIP' && <HiOutlineSparkles className="text-amber-400 text-lg" />}
                                </div>

                                <p className="text-[11px] text-slate-400 uppercase font-bold tracking-widest">
                                    {customer.id}
                                </p>

                                <div className="mt-2.5">
                                    <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black uppercase border 
                                        ${customer.status === 'VIP' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                                            customer.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                                'bg-blue-50 text-blue-600 border-blue-100' // New
                                        }`}>
                                        {customer.status}
                                    </span>
                                </div>

                            </div>
                        </div>

                        {/* cross icon */}
                        <button
                            onClick={onClose}
                            className="p-1 text-slate-400 hover:text-pink-500 transition-colors">
                            <HiOutlineXCircle size={24} />
                        </button>
                    </div>

                    {/* Body - Scrollable Content */}
                    <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">

                        {/* 1. Contact Info Section */}
                        <div className="space-y-4">
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                Contact Details
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    { icon: HiOutlineMail, label: 'Email Address', value: customer.email },
                                    { icon: HiOutlinePhone, label: 'Phone Number', value: customer.contact }, // Placeholder
                                    { icon: HiOutlineLocationMarker, label: 'Primary Location', value: customer.location },
                                    { icon: HiOutlineCalendar, label: 'Customer Since', value: customer.date }, // Placeholder
                                ].map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center gap-3.5 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">

                                        <div className="w-9 h-9 shrink-0 bg-pink-50 dark:bg-pink-500/10 text-pink-500 rounded-lg flex items-center justify-center border border-pink-100/50 dark:border-pink-500/20">
                                            <item.icon size={18} />
                                        </div>

                                        <div className="min-w-0">
                                            <p className="text-[10px] font-bold text-slate-400 uppercase truncate">
                                                {item.label}
                                            </p>
                                            <p className="text-sm font-bold text-slate-700 dark:text-slate-200 truncate">
                                                {item.value}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 2. Key Metrics Cards */}
                        <div className="space-y-4 pt-2">
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                Financial Summary
                            </h4>
                            <div className="grid grid-cols-3 gap-4">
                                {[
                                    { icon: HiOutlineShoppingBag, label: 'Total Orders', value: customer.totalOrders, color: 'text-emerald-500' },
                                    { icon: HiOutlineSparkles, label: 'AOV (Avg Value)', value: customer.date, color: 'text-amber-500' }, // Calculation
                                    { icon: HiOutlineCheckBadge, label: 'Lifetime Value', value: customer.totalSpend, color: 'text-pink-500' },
                                ].map((metric, idx) => (
                                    <div
                                        key={idx}
                                        className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm text-center">
                                        <metric.icon size={18} className={`mx-auto mb-1.5 ${metric.color}`} />
                                        <p className="text-xs md:text-sm font-black text-slate-800 dark:text-white truncate">
                                            {metric.value}
                                        </p>

                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight mt-1 truncate">
                                            {metric.label}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 3. Recent Orders Timeline */}
                        <div className="space-y-4 pt-2 relative">
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                Recent Activity
                            </h4>
                            <div className="absolute left-4.5 top-11 bottom-2 w-0.5 bg-slate-100 dark:bg-slate-800"></div> {/* Line */}

                            {[
                                { type: 'order', id: '#ORD-1192', date: '22 Mar, 2026', amount: '₹2,500', status: 'Delivered' },
                                { type: 'note', id: 'Admin Note', date: '18 Mar, 2026', content: 'Preferred category: Handmades.' },
                                { type: 'order', id: '#ORD-1150', date: '15 Mar, 2026', amount: '₹1,100', status: 'Processing' },
                            ].map((activity, idx) => (
                                <div
                                    key={idx}
                                    className="flex gap-4 items-start pl-3 relative z-10">
                                        
                                    {/* Dot */}
                                    <div className={`w-3.5 h-3.5 mt-1 rounded-full border-2 
                                        ${activity.type === 'order' ? 'border-emerald-500 bg-white dark:bg-slate-950' : 'border-slate-300 bg-slate-100'}`}>
                                    </div>

                                    <div className="flex-1 -mt-0.5">
                                        <div className="flex justify-between items-center">
                                            <p className={`text-xs md:text-sm font-black 
                                                ${activity.type === 'order' ? 'text-slate-800 dark:text-white' : 'text-slate-500'}`}>
                                                {activity.id}
                                            </p>

                                            <p className="text-[10px] text-slate-400 italic font-medium">
                                                {activity.date}
                                            </p>
                                        </div>

                                        {activity.type === 'order' &&
                                            <p className="text-[10px] md:text-xs text-slate-500 mt-1">
                                                Amount: {activity.amount} • <span className="text-emerald-500 font-bold">{activity.status}</span>
                                            </p>}

                                        {activity.type === 'note' &&
                                            <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400 mt-1 italic">
                                                "{activity.content}"
                                            </p>}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* 4. Action Area */}
                        <div className="border-t border-dashed border-slate-100 dark:border-slate-800 pt-8 flex gap-3">
                            <button className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold hover:shadow-sm hover:border-pink-100/50 hover:bg-pink-50/50 transition-colors">
                                <HiOutlineMail size={16} className="text-pink-500" />
                                Email Customer
                            </button>

                            <button className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-red-50 hover:bg-red-100 text-red-600 border border-red-100 rounded-xl text-xs font-black transition-colors">
                                Block from Ordering
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CustomerProfileDrawer;