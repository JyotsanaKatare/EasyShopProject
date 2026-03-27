
import React from 'react';
import { HiOutlineExternalLink } from "react-icons/hi";

const orders = [
    { id: "#ORD-7721", customer: "Rahul Sharma", product: "Wireless Headphones", amount: "₹2,499", status: "Delivered", date: "12 March 2026" },
    { id: "#ORD-7722", customer: "Sneha Kapoor", product: "Cotton Kurti", amount: "₹1,200", status: "Pending", date: "14 March 2026" },
    { id: "#ORD-7723", customer: "Amit Verma", product: "Smart Watch", amount: "₹4,500", status: "Shipped", date: "15 March 2026" },
    { id: "#ORD-7724", customer: "Priya Das", product: "Skincare Kit", amount: "₹3,150", status: "Cancelled", date: "16 March 2026" },
];

function RecentOrderTable({ setCurrentPage }) {

    // Status colors logic
    const getStatusStyle = (status) => {
        switch (status) {
            case 'Delivered': return 'bg-green-100 text-green-600';
            case 'Pending': return 'bg-amber-100 text-amber-600';
            case 'Shipped': return 'bg-blue-100 text-blue-600';
            case 'Cancelled': return 'bg-red-100 text-red-600';
            default: return 'bg-slate-100 text-slate-600';
        }
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-pink-50 dark:border-slate-800 shadow-sm overflow-hidden">

            {/* heading */}
            <div className="p-6 border-b border-pink-50 dark:border-slate-800 flex justify-between items-center">
                <h2 className="text-sm md:text-lg font-bold text-slate-800 dark:text-white">
                    Recent Orders
                </h2>
                <button
                    onClick={() => setCurrentPage("Orders")}
                    className="text-xs md:text-sm font-semibold text-pink-500 hover:text-pink-600 transition-colors cursor-pointer">
                    View All Orders
                </button>
            </div>

            {/* table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-slate-50/50 dark:bg-slate-800/50 text-slate-500 uppercase text-[11px] font-bold tracking-wider">
                        <tr>
                            <th className="px-6 py-4">Order ID</th>
                            <th className="px-6 py-4">Customer</th>
                            <th className="px-6 py-4">Product</th>
                            <th className="px-6 py-4">Amount</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Action</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-pink-50 dark:divide-slate-800">
                        {orders.map((order, index) => (
                            <tr
                                key={index}
                                className="hover:bg-pink-50/30 dark:hover:bg-slate-800/30 transition-colors group">

                                <td className="px-6 py-4 text-sm font-bold text-pink-600">
                                    {order.id}
                                </td>

                                <td className="px-6 py-4 text-sm font-medium text-slate-700 dark:text-slate-300">
                                    {order.customer}
                                </td>

                                <td className="px-6 py-4 text-sm text-slate-500">
                                    {order.product}
                                </td>

                                <td className="px-6 py-4 text-sm font-bold text-slate-800 dark:text-white">
                                    {order.amount}
                                </td>

                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide 
                                        ${getStatusStyle(order.status)}`}>
                                        {order.status}
                                    </span>
                                </td>

                                <td className="px-6 py-4">
                                    <button className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 group-hover:bg-pink-500 group-hover:text-white transition-all">
                                        <HiOutlineExternalLink className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default RecentOrderTable;