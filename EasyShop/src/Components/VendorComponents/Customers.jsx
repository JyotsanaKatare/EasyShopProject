
import React, { useState } from 'react';
import { HiDotsVertical } from "react-icons/hi";
import { HiOutlineSearch } from "react-icons/hi";
import CustomerProfileDrawer from './CustomerProfileDrawer';
import { HiOutlineUser } from "react-icons/hi";
import { HiOutlineBan } from "react-icons/hi";
import { HiOutlineUserGroup } from "react-icons/hi";
import { HiOutlineStatusOnline } from "react-icons/hi";
import { HiOutlineSparkles } from "react-icons/hi";
import { HiOutlineCurrencyRupee } from "react-icons/hi";

const cards = [
    { label: 'Total Customers', value: '1,284', growth: '+12.5%', icon: HiOutlineUserGroup, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Active Now', value: '42', growth: 'Live', icon: HiOutlineStatusOnline, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { label: 'VIP Members', value: '156', growth: '+5%', icon: HiOutlineSparkles, color: 'text-amber-500', bg: 'bg-amber-50' },
    { label: 'Avg. Spend', value: '₹2,450', growth: '-2.4%', icon: HiOutlineCurrencyRupee, color: 'text-pink-500', bg: 'bg-pink-50' },
];

const customerData = [
    {
        id: "CUST-8821",
        name: "Anjali Sharma",
        email: "anjali.s@email.com",
        contact: "0987654321",
        date: "15 Oct, 2024",
        image: "https://ui-avatars.com/api/?name=Anjali+Sharma&background=FDF2F8&color=DB2777", // Pink theme avatar
        totalOrders: 12,
        average: "₹1,540",
        totalSpend: "₹18,500",
        lastOrder: "22 Mar, 2026",
        status: "Active",
        location: "Indore, MP"
    },
    {
        id: "CUST-7742",
        name: "Rahul Verma",
        email: "rahul.v@email.com",
        contact: "0987654321",
        date: "15 Oct, 2024",
        image: "https://ui-avatars.com/api/?name=Rahul+Verma&background=F0F9FF&color=0284C7", // Blue theme avatar
        totalOrders: 5,
        average: "₹1,540",
        totalSpend: "₹7,200",
        lastOrder: "15 Mar, 2026",
        status: "New",
        location: "Pune, MH"
    },
    {
        id: "CUST-9901",
        name: "Sneha Kapoor",
        email: "sneha.k@email.com",
        contact: "0987654321",
        date: "15 Oct, 2024",
        image: "https://ui-avatars.com/api/?name=Sneha+Kapoor&background=ECFDF5&color=059669", // Emerald theme avatar
        totalOrders: 28,
        average: "₹1,540",
        totalSpend: "₹42,000",
        lastOrder: "24 Mar, 2026",
        status: "VIP",
        location: "Mumbai, MH"
    },
    {
        id: "CUST-5510",
        name: "Amit Patel",
        email: "amit.p@email.com",
        contact: "0987654321",
        date: "15 Oct, 2024",
        image: "https://ui-avatars.com/api/?name=Amit+Patel&background=FFF7ED&color=EA580C", // Orange theme avatar
        totalOrders: 2,
        average: "₹1,540",
        totalSpend: "₹1,150",
        lastOrder: "02 Feb, 2026",
        status: "Inactive",
        location: "Bhopal, MP"
    },
    {
        id: "CUST-5510",
        name: "Jyotsana katare",
        email: "jyotsana@email.com",
        contact: "0987654321",
        date: "15 Oct, 2024",
        image: "https://ui-avatars.com/api/?name=Jyotsana+Katare&background=FDF2F8&color=DB2777", // Orange theme avatar
        totalOrders: 2,
        average: "₹1,540",
        totalSpend: "₹1,150",
        lastOrder: "02 Feb, 2026",
        status: "Inactive",
        location: "Bhopal, MP"
    }
];

function Customers() {

    const [isActionOpen, setIsActionOpen] = useState(null);
    const [isProfileOpen, setIsProfileOpen] = useState(null);
    const [isBlockOpen, setIsBlockOpen] = useState(null);

    const handleActionMenus = (index) => {
        setIsActionOpen(isActionOpen === index ? null : index);
    };

    const handleViewProfile = (customer) => {
        setIsProfileOpen(customer);
        setIsActionOpen(null);
    };

    const handleUserBlock = (customer) => {
        setIsBlockOpen(customer);
        setIsActionOpen(null);
    };

    return (
        <div className="space-y-6">

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {cards.map((stat, idx) => (
                    <div
                        key={idx}
                        className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">

                        <div className="flex justify-between items-start truncate">
                            <div className={`p-2.5 rounded-xl ${stat.bg} dark:bg-opacity-10 ${stat.color}`}>
                                <stat.icon size={22} />
                            </div>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${stat.growth.includes('+') ? 'bg-emerald-50 text-emerald-600' :
                                stat.growth === 'Live' ? 'bg-blue-50 text-blue-600 animate-pulse' :
                                    'bg-red-50 text-red-600'
                                }`}>
                                {stat.growth}
                            </span>
                        </div>

                        <div className="mt-4">
                            <h4 className="text-2xl font-black text-slate-800 dark:text-white truncate">
                                {stat.value}
                            </h4>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mt-1 truncate">
                                {stat.label}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* table */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">

                {/* Header and Search */}
                <div className="p-4 border-b border-slate-50 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center bg-white dark:bg-slate-800/20">

                    <h3 className="text-[11px] md:text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider pb-4 md:pb-0 md:pr-5">
                        Customers
                    </h3>

                    {/* Search Bar (Left Side) */}
                    <div className="relative w-full md:w-80 group">
                        <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-pink-500 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search customer name, email..."
                            className="w-full pl-11 pr-4 py-2 md:py-2.5 bg-slate-50 border border-pink-50 dark:bg-slate-800 focus:border-pink-500 focus:bg-white dark:focus:bg-slate-900 rounded-xl text-sm outline-none transition-all shadow-sm placeholder:text-xs md:placeholder:text-[13px]"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-50 dark:border-slate-800 text-[11px] uppercase tracking-widest text-slate-400 font-bold">
                                <th className="px-6 py-4 text-center w-16">#</th>
                                <th className="px-6 py-4">Customer</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Orders</th>
                                <th className="px-6 py-4">Total Spend</th>
                                <th className="px-6 py-4">Last Order</th>
                                <th className="px-6 py-4 text-right">Action</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                            {customerData.map((customer, idx) => (
                                <tr
                                    key={idx}
                                    className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group">

                                    {/* 1. Index/ID */}
                                    <td className="px-6 py-4 text-center">
                                        <span className="text-xs font-bold text-slate-300">
                                            {(idx + 1).toString().padStart(2, '0')}
                                        </span>
                                    </td>

                                    {/* 2. Customer Profile */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={customer.image}
                                                alt={customer.name}
                                                className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-700 shadow-sm"
                                            />
                                            <div className="min-w-0">
                                                <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200 truncate">
                                                    {customer.name}
                                                </h4>
                                                <p className="text-[10px] text-slate-400 truncate">
                                                    {customer.email}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    {/* 3. Status Badge */}
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-lg text-[10px] font-extrabold uppercase border 
                                        ${customer.status === 'VIP' ? 'bg-amber-50 text-amber-600 border-amber-100 ring-4 ring-amber-50/30' :
                                                customer.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                                    customer.status === 'New' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                                        'bg-slate-100 text-slate-500 border-slate-200' // Inactive
                                            }`}>
                                            {customer.status}
                                        </span>
                                    </td>

                                    {/* 4. Total Orders */}
                                    <td className="px-6 py-4 text-center sm:text-left">
                                        <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                                            {customer.totalOrders}
                                        </span>
                                    </td>

                                    {/* 5. Total Spend */}
                                    <td className="px-6 py-4">
                                        <span className="text-sm font-black text-slate-800 dark:text-white">
                                            {customer.totalSpend}
                                        </span>
                                        <p className="text-[9px] text-slate-400 uppercase font-bold tracking-tighter">
                                            {customer.location}
                                        </p>
                                    </td>

                                    {/* 6. Last Order Date */}
                                    <td className="px-6 py-4 text-xs font-medium text-slate-500">
                                        {customer.lastOrder}
                                    </td>

                                    {/* 7. Action Button */}
                                    <td className="relative px-6 py-4 text-right">
                                        <div className="flex justify-end">
                                            <button
                                                onClick={() => handleActionMenus(idx)}
                                                className="p-2 hover:bg-pink-50 dark:hover:bg-slate-700 rounded-lg text-slate-500 hover:text-pink-500 transition-all border border-transparent hover:border-pink-100">
                                                <HiDotsVertical size={18} />
                                            </button>
                                        </div>

                                        {isActionOpen === idx && (
                                            <>
                                                <div className="fixed inset-0 z-10" onClick={() => setIsActionOpen(null)}></div>

                                                {/* Dropdown Menu - Fixed with origin and better width */}
                                                <div className="absolute right-12 top-8 origin-top-right bg-white dark:bg-slate-800 shadow-xl rounded-xl w-36 py-2 z-20 border border-slate-100 dark:border-slate-700 animate-in fade-in zoom-in duration-200">
                                                    <button
                                                        onClick={() => handleViewProfile(customer)}
                                                        className="w-full text-left px-4 py-2 text-[11px] font-bold text-slate-600 dark:text-slate-300 hover:bg-pink-50 dark:hover:bg-slate-700 hover:text-pink-600 transition-colors flex items-center gap-2">
                                                        <HiOutlineUser size={14} />
                                                        View Profile
                                                    </button>

                                                    <button
                                                        onClick={() => handleUserBlock(customer)}
                                                        className="w-full text-left px-4 py-2 text-[11px] font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors border-t border-slate-50 dark:border-slate-700 flex items-center gap-2">
                                                        <HiOutlineBan size={14} />
                                                        Block User
                                                    </button>
                                                </div>
                                            </>
                                        )}

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* view profile */}
            <CustomerProfileDrawer
                customer={isProfileOpen}
                isOpen={!!isProfileOpen} // Agar selectedCustomer hai toh khul jayega
                onClose={() => setIsProfileOpen(null)} // Close karne ke liye null kar do
            />

            {/* block user */}
            {isBlockOpen && (
                <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div
                        onClick={() => setIsBlockOpen(null)}
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                    ></div>

                    {/* Modal Card */}
                    <div className="relative bg-white dark:bg-slate-900 rounded-2xl p-6 w-full max-w-sm shadow-2xl border border-slate-100 dark:border-slate-800 animate-in zoom-in duration-200">

                        <div className="flex flex-col items-center text-center">
                            <div className="w-12 h-12 rounded-full bg-red-50 dark:bg-red-500/10 text-red-500 flex items-center justify-center mb-4">
                                <HiOutlineBan size={24} />
                            </div>

                            <h3 className="text-lg font-black text-slate-800 dark:text-white">
                                Block Customer?
                            </h3>

                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                                Are you sure, you want to block <span className="font-bold text-slate-700 dark:text-slate-200">{isBlockOpen.name}</span> ? This user will not be able to order again.
                            </p>

                            <div className="flex gap-3 mt-6 w-full">
                                <button
                                    onClick={() => setIsBlockOpen(null)}
                                    className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold hover:bg-slate-50 transition-colors">
                                    Cancel
                                </button>

                                <button
                                    onClick={() => setIsBlockOpen(null)}
                                    className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 text-white text-xs font-bold hover:bg-red-600 transition-colors shadow-lg shadow-red-200 dark:shadow-none">
                                    Yes, Block
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Customers;