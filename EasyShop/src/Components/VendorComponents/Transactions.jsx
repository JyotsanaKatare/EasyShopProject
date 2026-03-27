
import React, { useState } from 'react';
import { HiOutlineDownload, HiOutlineSearch, HiOutlineCurrencyRupee, HiOutlineReceiptTax, HiOutlineCreditCard } from 'react-icons/hi';
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

const transactions = [
    {
        id: "TXN-98721",
        orderId: "ORD-2026-A1", // Kis order ka paisa hai
        date: "21 Mar, 2026",
        amount: 2499,
        platformFee: 250, // Dashboard/App ka commission (e.g., 10%)
        vendorEarning: 2249, // Vendor ke haath mein kitna aaya (Amount - Fee)
        type: "Credit", // Paisa aaya (ya Refund ke liye Debit)
        status: "Completed", // Completed, Pending, ya Failed
        paymentGateway: "Razorpay (UPI)"
    },
    {
        id: "TXN-98725",
        orderId: "ORD-2026-B4",
        date: "20 Mar, 2026",
        amount: 1200,
        platformFee: 120,
        vendorEarning: 1080,
        type: "Credit",
        status: "Pending", // Maan lo abhi bank mein nahi aaya
        paymentGateway: "Cash on Delivery"
    },
    {
        id: "TXN-98721",
        orderId: "ORD-2026-A1", // Kis order ka paisa hai
        date: "21 Mar, 2026",
        amount: 2499,
        platformFee: 250, // Dashboard/App ka commission (e.g., 10%)
        vendorEarning: 2249, // Vendor ke haath mein kitna aaya (Amount - Fee)
        type: "Credit", // Paisa aaya (ya Refund ke liye Debit)
        status: "Completed", // Completed, Pending, ya Failed
        paymentGateway: "Razorpay (UPI)"
    },
];

const cards = [
    { label: "Total Revenue", value: "₹50,000", icon: <HiOutlineCurrencyRupee />, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Platform Fees", value: "₹5,000", icon: <HiOutlineReceiptTax />, color: "text-pink-600", bg: "bg-pink-50" },
    { label: "Settled Amount", value: "₹45,000", icon: <HiOutlineCreditCard />, color: "text-emerald-600", bg: "bg-emerald-50" },
];

const statusMenu = [
    { id: 1, status: "Completed" },
    { id: 2, status: "Pending" },
    { id: 3, status: "Failed" }
];

function Transactions() {

    const [isStatusOpen, setIsStatusOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(null);

    const handlestatus = (status) => {
        setSelectedStatus(status);
        setIsStatusOpen(false);
    };

    return (
        <div className="space-y-6">

            {/* top Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {cards.map((stat, i) => (
                    <div
                        key={i}
                        className="bg-white dark:bg-slate-900 p-4 md:p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow truncate"
                    >
                        {/* Icon - Mobile pe thoda chota kiya hai */}
                        <div className={`w-11 h-11 md:w-12 md:h-12 shrink-0 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center text-lg md:text-2xl`}>
                            {stat.icon}
                        </div>

                        <div className="min-w-0"> {/* min-w-0 truncation handle karne ke liye */}
                            <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-tight truncate">
                                {stat.label}
                            </p>
                            <h4 className="text-lg md:text-xl font-black text-slate-700 dark:text-white truncate">
                                {stat.value}
                            </h4>
                        </div>
                    </div>
                ))}
            </div>

            {/* Table Container */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">

                {/* Header & Search/Filter */}
                <div className="p-4 border-b border-slate-50 dark:border-slate-800 flex flex-col lg:flex-row justify-between items-center md:text-start bg-white dark:bg-slate-800/20">

                    <h3 className="text-[11px] md:text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider pb-5 lg:pb-0">
                        Transaction History
                    </h3>

                    <div className="flex flex-col md:flex-row items-center gap-3 md:gap-5 lg:gap-3 w-full lg:w-auto">

                        {/* Search Bar */}
                        <div className="relative w-full lg:w-80 group">
                            <HiOutlineSearch className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-pink-500 transition-colors" />
                            <input
                                type="text"
                                placeholder="Search Txn ID, Order ID..."
                                className="w-full pl-8 md:pl-11 pr-4 py-2 bg-slate-50 border border-pink-50 dark:bg-slate-800 focus:border-pink-500 focus:bg-white dark:focus:bg-slate-900 rounded-xl text-sm outline-none transition-all shadow-sm placeholder:text-xs md:placeholder:text-[13px]"
                            />
                        </div>

                        {/* dropdown */}
                        <div className='relative w-full md:w-48 lg:w-auto'>

                            <button
                                onClick={() => setIsStatusOpen(!isStatusOpen)}
                                className={`w-full bg-slate-50 dark:bg-slate-800 px-4 py-2 rounded-xl md:rounded-2xl flex justify-between items-center transition-all border cursor-pointer
                                       ${isStatusOpen ? 'border-pink-400 ring-2 ring-pink-50' : 'border-transparent hover:border-pink-200'}`}
                            >
                                <span className={`${selectedStatus ? 'text-slate-800 dark:text-white font-medium' : 'text-slate-400'} text-[11px] md:text-[14px] truncate mr-3`}>
                                    {selectedStatus ? selectedStatus.status : 'All Status'}
                                </span>

                                <div className="shrink-0">
                                    {isStatusOpen ? <IoIosArrowUp className='text-pink-500' /> : <IoIosArrowDown className='text-slate-400' />}
                                </div>
                            </button>

                            {/* Dropdown Menu */}
                            {isStatusOpen && (
                                <div className='absolute z-50 w-full mt-2 bg-white dark:bg-slate-800 rounded-b-xl shadow-xl border border-pink-50 dark:border-slate-700 py-2 overflow-hidden animate-in fade-in zoom-in duration-200'>

                                    <div className='max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700'>
                                        {statusMenu.map((item, index) => (
                                            <div
                                                key={index}
                                                onClick={() => handlestatus(item)}
                                                className='px-4 py-1.5 hover:bg-pink-50 dark:hover:bg-slate-700 cursor-pointer text-slate-700 dark:text-slate-300 hover:text-pink-600 font-medium transition-colors text-[11px] md:text-[13px] border-b border-slate-50 dark:border-slate-700 last:border-none'
                                            >
                                                {item.status}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-50 dark:border-slate-800 text-[11px] uppercase tracking-widest text-slate-400 font-bold">
                                <th className="px-6 py-4">Txn Details</th>
                                <th className="px-6 py-4">Related Order</th>
                                <th className="px-6 py-4">Total Amount</th>
                                <th className="px-6 py-4">Platform Fee (10%)</th>
                                <th className="px-6 py-4">Net Earning</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Invoice</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                            {transactions.map((txn, idx) => (
                                <tr key={idx} className="hover:bg-pink-50/30 dark:hover:bg-slate-800/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{txn.id}</span>
                                        <p className="text-[10px] text-slate-400">{txn.date}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-xs font-bold text-pink-500">#ORD-{txn.orderId}</span>
                                        <p className="text-[10px] text-slate-400 uppercase font-bold">{txn.method}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm font-medium text-slate-400 line-through">₹{txn.amount}</span>
                                    </td>
                                    <td className="px-6 py-4 text-red-400 text-xs font-bold">
                                        - ₹{txn.platformFee}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm font-black text-slate-800 dark:text-white">₹{txn.vendorEarning}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-lg text-[10px] font-extrabold uppercase ${txn.status === 'Completed' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-orange-50 text-orange-600 border border-orange-100'
                                            }`}>
                                            {txn.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-2 hover:bg-white dark:hover:bg-slate-700 rounded-lg text-slate-400 hover:text-pink-500 shadow-sm border border-transparent hover:border-slate-100 transition-all">
                                            <HiOutlineDownload size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Transactions;