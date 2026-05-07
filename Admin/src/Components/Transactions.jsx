
import React from 'react';

import { useToggleTransactionStatus, useTransactionList } from '../hooks/useTransactions';

function Transactions() {

    const { data: transactionList, isLoading, isError } = useTransactionList();
    const { mutate: toggleStatus, isPending: isUpdating } = useToggleTransactionStatus();

    if (isLoading) return <p className="p-10 text-center animate-pulse">Fetching orders...</p>;
    if (isError) return <p className="p-10 text-center text-red-500">Error loading orders.</p>;

    const transactionStatusStyles = {
        Completed: "bg-emerald-50 text-emerald-600 border-emerald-100",
        Pending: "bg-amber-50 text-amber-600 border-amber-100",
        Cancelled: "bg-rose-50 text-rose-600 border-rose-100",
    };

    const handleStatusChange = (transactionId, newStatus) => {
        const isConfirmed = window.confirm(`Are you sure you want to mark this as ${newStatus}?`);

        if (isConfirmed) {
            toggleStatus({ transaction_id: transactionId, status: newStatus });
        }
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">

            {/* heading */}
            <div className="p-4 md:p-6 border-b border-pink-50 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-md md:text-lg font-bold text-slate-800 dark:text-white shrink-0">
                        Global Payouts
                    </h2>

                    <p className="text-[11px] md:text-xs text-slate-500 mt-1">
                        Manage vendor earnings and platform commissions
                    </p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl font-semibold text-sm shadow-sm hover:bg-slate-50">
                        Filter by City
                    </button>
                    <button className="px-4 py-2 bg-pink-600 text-white rounded-xl font-semibold text-sm shadow-md shadow-pink-100 hover:bg-pink-700">
                        Export CSV
                    </button>
                </div>
            </div>

            {/* Table Container */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50/50 dark:bg-slate-800/50">
                        <tr className="text-[11px] font-black text-slate-400 uppercase tracking-wider">
                            <th className="px-6 py-4 ">Transaction / Order</th>
                            <th className="px-6 py-4 ">Vendor</th>
                            <th className="px-6 py-4 ">Payment Info</th>
                            <th className="px-6 py-4 text-center">Platform Fee (10%)</th>
                            <th className="px-6 py-4 ">Net Payout</th>
                            <th className="px-6 py-4 ">Status</th>
                            <th className="px-6 py-4 ">Action</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                        {transactionList.map((txn) => (
                            <tr
                                key={txn._id}
                                className="hover:bg-pink-50/20 transition-all group">
                                
                                {/* txn id + orderId */}
                                <td className="px-6 py-5">
                                    <div className="text-[12px] font-bold text-slate-700">
                                        {txn.txnId}
                                    </div>
                                    <div className="text-[11px] font-medium text-pink-500">
                                        {txn.orderDisplayId}
                                    </div>
                                </td>
                                
                                {/* vendor name */}
                                <td className="px-6 py-5">
                                    <div className="text-sm font-bold text-slate-800">
                                        {txn.vendorId?.name || "---"}
                                    </div>
                                    <div className="text-[10px] text-slate-400 font-medium">
                                        Verified Seller
                                    </div>
                                </td>
                                
                                {/* total amt + pay method */}
                                <td className="px-6 py-5">
                                    <div className="text-sm font-bold text-slate-700">
                                        ₹{txn.totalAmount.toLocaleString() || '---'}
                                    </div>

                                    <div className="flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                                        <span className="text-[10px] text-slate-400 font-bold uppercase">
                                            {txn.paymentMethod || '---'}
                                        </span>
                                    </div>
                                </td>
                                
                                {/* platform fee */}
                                <td className="px-6 py-5 text-center">
                                    <span className="text-sm font-bold text-rose-500 px-2 py-1 rounded-lg">
                                        -₹{txn.platformFee || '---'}
                                    </span>
                                </td>
                                
                                {/* net earning */}
                                <td className="px-6 py-5">
                                    <div className="text-md font-black text-slate-800">
                                        ₹{txn.netEarning.toLocaleString()}
                                    </div>
                                </td>
                                
                                {/* status */}
                                <td className="px-6 py-5">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold border 
                                        ${transactionStatusStyles[txn.status]}`}>
                                        {txn.status}
                                    </span>
                                </td>
                                 
                                {/* action */}
                                <td className="px-6 py-5">
                                    {txn.status === 'Pending' ? (
                                        <div className="flex gap-2">
                                            {/* 1. Settle Button (Main Action) */}
                                            <button
                                                onClick={() => handleStatusChange(txn._id, 'Completed')}
                                                className="px-3 py-1.5 bg-slate-900 text-white rounded-lg text-[10px] font-bold uppercase hover:bg-emerald-600 transition-colors"
                                            >
                                                Settle Now
                                            </button>

                                            {/* 2. Cancel Button (Secondary Action) */}
                                            <button
                                                onClick={() => handleStatusChange(txn._id, 'Cancelled')}
                                                className="px-3 py-1.5 border border-slate-200 text-slate-400 rounded-lg text-[10px] font-bold uppercase hover:bg-rose-50 hover:text-rose-500 transition-all"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    ) : (
                                        // Agar status 'Completed' ya 'Cancelled' hai toh sirf text dikhega
                                        <div className={`flex items-center gap-1 font-bold text-[10px] uppercase ${txn.status === 'Completed' ? 'text-emerald-500' : 'text-slate-400'}`}>
                                            {txn.status === 'Completed' ? (
                                                <><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" /></svg> Processed</>
                                            ) : (
                                                "Void / Cancelled"
                                            )}
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


        </div>
    );
};

export default Transactions;