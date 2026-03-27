
import React, { useState } from 'react';
import { HiOutlineClock } from "react-icons/hi";
import { HiOutlineRefresh } from "react-icons/hi";
import { HiOutlineTruck } from "react-icons/hi";
import { HiOutlineBadgeCheck } from "react-icons/hi";
import { HiOutlineXCircle } from "react-icons/hi";
import { HiOutlineEye } from "react-icons/hi";
import { HiOutlineDownload } from "react-icons/hi";
import { HiOutlineSearch } from "react-icons/hi";

const stats = [
    { label: "Pending", count: 12, color: "text-yellow-600", bg: "bg-yellow-50", borderColor: "border-yellow-400", icon: <HiOutlineClock /> },
    { label: "Processing", count: 5, color: "text-blue-600", bg: "bg-blue-50", borderColor: "border-blue-400", icon: <HiOutlineRefresh /> },
    { label: "Shipped", count: 8, color: "text-purple-600", bg: "bg-purple-50", borderColor: "border-purple-400", icon: <HiOutlineTruck /> },
    { label: "Delivered", count: 45, color: "text-green-600", bg: "bg-green-50", borderColor: "border-green-400", icon: <HiOutlineBadgeCheck /> },
    { label: "Cancelled", count: 2, color: "text-red-600", bg: "bg-red-50", borderColor: "border-red-400", icon: <HiOutlineXCircle /> },
];

const orders = [

    {

        id: "2026-A1",

        date: "20 Mar, 02:30 PM",

        customer: "Siya Verma",
        email: "siya@example.com",

        productName: "Wireless Headphones",

        category: "Electronics",

        amount: 2499,
        paymentStatus: "Paid",

        paymentMethod: "Prepaid (UPI)",

        status: "Pending",

        itemCount: 1,

        img: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=872&auto=format&fit=crop"

    },

    {

        id: "2026-B4",

        date: "19 Mar, 11:15 AM",

        customer: "Rahul Sharma",

        email: "rahul.s@gmail.com",

        productName: "Cotton Kurti",

        category: "Clothing",

        amount: 1200,
        paymentStatus: "Pending",
        paymentMethod: "COD",

        status: "Delivered",

        itemCount: 2,
        img: "https://images.unsplash.com/photo-1668649176554-3ad841a780d0?w=500&auto=format&fit=crop&q=60"

    },

    {

        id: "2026-C9",

        date: "18 Mar, 09:45 PM",

        customer: "Anjali Singh",

        email: "anjali_99@yahoo.com",

        productName: "Smart Watch",

        category: "Electronics",

        amount: 4500,
        paymentStatus: "Pending",
        paymentMethod: "Prepaid (UPI)",
        paymentType: "Prepaid (Card)",

        itemCount: 1,

        status: "Cancelled",
        img: "https://images.unsplash.com/photo-1733395700970-75535f1334ff?w=500&auto=format&fit=crop&q=60"

    }

];

function Orders() {

    const [orderList, setOrderList] = useState(orders);

    const handleStatusChange = (orderId, newStatus) => {
        const updatedOrders = orderList.map(order => {
            if (order.id === orderId) {
                // Yahan hum status ke sath-sath colors bhi update kar sakte hain
                return { ...order, status: newStatus };
            }
            return order;
        });
        setOrderList(updatedOrders);
        console.log(`Order ${orderId} status changed to: ${newStatus}`);
    };

    return (
        <div>
            {/* Heading Section */}
            <div className="md:bg-white/80 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between text-center md:text-start gap-4 mb-3 md:mb-8">
                <div>
                    <h1 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white tracking-tight">
                        Live Orders Hub
                    </h1>

                    <p className="text-[11px] md:text-xs font-medium text-slate-500 dark:text-slate-400 mt-1 flex items-center justify-center md:justify-start gap-1 md:gap-2">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                        {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                        <span className="opacity-30">|</span>
                        Real-time updates
                    </p>
                </div>

                {/* Optional: Add a 'Refresh' button here */}
                <button className="hidden md:flex text-xs font-bold text-pink-500 bg-pink-50 px-4 py-2 rounded-xl hover:bg-pink-500 hover:text-white transition-all">
                    Refresh Data
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10 md:my-15">
                {stats.map((item, index) => (
                    <div
                        key={index}
                        className={`flex justify-between items-start bg-white dark:bg-slate-900 p-5 lg:py-5 lg:px-3 xl:p-5 rounded-xl  dark:border-slate-800 border-l-4 
                            ${item.borderColor || 'border-pink-400'} 
                            shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer group`}
                    >
                        <div className="flex flex-col gap-1">
                            <p className="text-[10px] md:text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                                {item.label}
                            </p>

                            <h3 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-white">
                                {item.count}
                            </h3>
                        </div>

                        <div className={`w-10 h-10 flex items-center justify-center rounded-2xl ${item.bg} ${item.color} text-xl shadow-inner`}>
                            {item.icon}
                        </div>
                    </div>
                ))}
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">

                {/* Header and Search */}
                <div className="p-4 border-b border-slate-50 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center bg-white dark:bg-slate-800/20">

                    <h3 className="text-[11px] md:text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider pb-4 md:pb-0">
                        Recent Orders
                    </h3>

                    {/* Search Bar (Left Side) */}
                    <div className="relative w-full md:w-80 group">
                        <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-pink-500 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search product, SKU..."
                            className="w-full pl-11 pr-4 py-2 md:py-2.5 bg-slate-50 border border-pink-50 dark:bg-slate-800 focus:border-pink-500 focus:bg-white dark:focus:bg-slate-900 rounded-xl text-sm outline-none transition-all shadow-sm placeholder:text-xs md:placeholder:text-[13px]"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50/50 dark:bg-slate-800/50 text-slate-500 uppercase text-[11px] font-bold tracking-wider">
                            <tr>
                                <th className="px-6 py-4">Order ID</th>
                                <th className="px-6 py-4">Customer</th>
                                <th className="px-6 py-4">Product</th>
                                <th className="px-6 py-4">Quantity</th>
                                <th className="px-6 py-4">Amount</th>
                                <th className="px-6 py-4">Order Status</th>
                                <th className="px-6 py-4">Payment Status</th>
                                <th className="px-6 py-4">Pay Method</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                            {orderList.map((order, index) => (
                                <tr
                                    key={index}
                                    className="hover:bg-pink-50/30 dark:hover:bg-slate-800/50 transition-colors group">

                                    {/* 1. Order ID & Date */}
                                    <td className="px-6 py-4">
                                        <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                                            #ORD-{order.id}
                                        </span>

                                        <p className="text-[10px] text-slate-400 mt-0.5">
                                            {order.date}
                                        </p>
                                    </td>

                                    {/* 2. Customer */}
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-sm text-slate-600 dark:text-slate-400 font-medium truncate max-w-25">
                                                {order.customer}
                                            </span>

                                            <span className="text-[10px] text-slate-400 leading-none">
                                                {order.email}
                                            </span>
                                        </div>
                                    </td>

                                    {/* 3. Product Thumbnail & Name */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">

                                            <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 overflow-hidden shrink-0 border border-slate-200 dark:border-slate-700">
                                                <img
                                                    src={order.img}
                                                    alt=""
                                                    className="w-full h-full object-cover" />
                                            </div>

                                            <div className="max-w-35">
                                                <p className="text-xs font-bold text-slate-700 dark:text-slate-300 truncate">
                                                    {order.productName}
                                                </p>

                                                <p className="text-[10px] text-slate-400 uppercase font-bold">
                                                    {order.category}
                                                </p>

                                            </div>
                                        </div>
                                    </td>

                                    {/* 4. Quantity */}
                                    <td className="px-6 py-4 text-center">
                                        <span className="text-xs font-bold text-slate-600 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">
                                            {order.itemCount}
                                        </span>
                                    </td>

                                    {/* 5. Total Amount */}
                                    <td className="px-6 py-4">
                                        <span className="text-sm font-black text-slate-800 dark:text-white">
                                            ₹{order.amount}
                                        </span>
                                    </td>

                                    {/* 6. Order Status (Vendor Dropdown) */}
                                    <td className="px-6 py-4">
                                        <select
                                            value={order.status}
                                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                            className={`px-2 py-1 rounded-lg text-[10px] font-extrabold uppercase border cursor-pointer focus:outline-none transition-all
                                                ${order.status === 'Pending' ? 'bg-yellow-50 text-yellow-600 border-yellow-200' :
                                                    order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' :
                                                        order.status === 'Cancelled' ? 'bg-red-50 text-red-600 border-red-200' :
                                                            'bg-slate-50 text-slate-600 border-slate-200'}`}
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>
                                    </td>

                                    {/* 7. Payment Status */}
                                    <td className="px-6 py-4">
                                        <span className={`text-[10px] font-bold px-2 py-1 rounded-full 
                                            ${order.paymentStatus === 'Paid' ? 'bg-emerald-100 text-emerald-600' : 'bg-orange-100 text-orange-600'}`}>
                                            {order.paymentStatus}
                                        </span>
                                    </td>

                                    {/* 8. Payment Method */}
                                    <td className="px-6 py-4">
                                        <span className="text-[10px] font-bold text-slate-500  dark:bg-slate-800 rounded-md dark:border-slate-700">
                                            {order.paymentMethod}
                                        </span>
                                    </td>

                                    {/* 9. Actions */}
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button className="p-1.5 bg-white dark:hover:bg-slate-700 rounded-lg text-slate-400 hover:text-pink-500 shadow-sm border border-transparent hover:border-slate-100 transition-all">
                                                <HiOutlineEye size={18} />
                                            </button>
                                            <button className="p-1.5 hover:bg-white dark:hover:bg-slate-700 rounded-lg text-slate-400 hover:text-blue-500 shadow-sm border border-transparent hover:border-slate-100 transition-all">
                                                <HiOutlineDownload size={18} />
                                            </button>
                                        </div>
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

export default Orders;