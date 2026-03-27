
import React from 'react';
import { HiOutlineArrowNarrowRight, HiOutlineExclamationCircle } from "react-icons/hi";

 const topProducts = [
        { name: "Pink Floral Kurti", sales: 120, price: "₹1,200", img: "https://images.unsplash.com/photo-1733395700970-75535f1334ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGZsb3JhbCUyMGt1cnRpfGVufDB8fDB8fHww" },
        { name: "Smart Watch Z2", sales: 85, price: "₹4,500", img: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=872&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
        { name: "Wireless Earbuds", sales: 64, price: "₹2,999", img: "https://images.unsplash.com/photo-1668649176554-3ad841a780d0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGVhcmJ1ZHN8ZW58MHx8MHx8fDA%3D" },
    ];

    const lowStock = [
        { name: "Cotton T-Shirt", left: 3, status: "Critical" },
        { name: "Leather Wallet", left: 8, status: "Low" },
        { name: "Denim Jacket", left: 5, status: "Critical" },
    ];

const AnalyticsSplit = ({ setCurrentPage }) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-8">

            {/* Left Side: Top Selling Products (Occupies 2 columns on large screens) */}
            <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-pink-50 dark:border-slate-800 shadow-sm">
                <div className="flex justify-between items-center mb-6">

                    <h2 className="text-sm md:text-lg font-bold text-slate-800 dark:text-white">
                        Top Selling Products
                    </h2>
                    <button
                        onClick={() => setCurrentPage("All Products")}
                        className="text-pink-500 text-xs md:text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all cursor-pointer">
                        See All <HiOutlineArrowNarrowRight />
                    </button>
                </div>

                <div className="space-y-4">
                    {topProducts.map((product, i) => (
                        <div
                            key={i}
                            className="flex items-center justify-between p-3 rounded-2xl hover:bg-pink-50/50 transition-colors">
                            <div className="flex items-center gap-4">
                                <img
                                    src={product.img}
                                    alt={product.name}
                                    className="w-12 h-12 rounded-xl object-cover border border-pink-100" />
                                <div>
                                    <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200">
                                        {product.name}
                                    </h3>
                                    <p className="text-xs text-slate-400">
                                        {product.sales} Sales
                                    </p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-bold text-slate-800 dark:text-white">
                                    {product.price}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Side: Low Stock Alerts (Occupies 1 column) */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-pink-50 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-2 mb-6">
                    <HiOutlineExclamationCircle className="text-rose-500 w-6 h-6" />
                    <h2 className="text-sm md:text-lg font-bold text-slate-800 dark:text-white">
                        Stock Alerts
                    </h2>
                </div>

                <div className="space-y-4">
                    {lowStock.map((item, i) => (
                        <div key={i} className="p-4 rounded-2xl bg-rose-50/50 dark:bg-rose-900/10 border border-rose-100/50">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200">{item.name}</h3>
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.status === 'Critical' ? 'bg-rose-500 text-white' : 'bg-rose-100 text-rose-600'}`}>
                                    {item.status}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="text-xs text-rose-600 font-medium">Only {item.left} units left</p>
                                <button className="text-[10px] font-bold text-slate-500 underline uppercase tracking-tighter">Restock Now</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default AnalyticsSplit;