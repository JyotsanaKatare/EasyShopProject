
import React from 'react';
import { HiOutlineEye, HiOutlineShoppingBag } from 'react-icons/hi';

const orders = [
    { id: '#ES-9872', date: 'March 25, 2026', total: '₹4,599', status: 'Delivered', items: 2 },
    { id: '#ES-9875', date: 'March 28, 2026', total: '₹1,200', status: 'Pending', items: 1 },
    { id: '#ES-9880', date: 'March 29, 2026', total: '₹8,999', status: 'Shipped', items: 3 },
];

function UserProfileMyOrders() {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* Orders Table */}
            <div className="overflow-x-auto mt-2">
                <table className="w-full text-left border-separate border-spacing-y-3">
                    <thead>
                        <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">
                            <th className="pb-2 pl-4">Order ID</th>
                            <th className="pb-2">Date</th>
                            <th className="pb-2">Items</th>
                            <th className="pb-2">Amount</th>
                            <th className="pb-2">Status</th>
                            <th className="pb-2 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr key={index} className="bg-slate-50/50 hover:bg-slate-100/50 transition-colors group">
                                <td className="py-5 pl-4 rounded-l-2xl">
                                    <span className="text-sm font-bold text-slate-700">{order.id}</span>
                                </td>
                                <td className="py-5 text-xs font-semibold text-slate-500">{order.date}</td>
                                <td className="py-5 text-xs font-semibold text-slate-500">{order.items} Items</td>
                                <td className="py-5 text-sm font-black text-slate-800">{order.total}</td>
                                <td className="py-5">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                        order.status === 'Delivered' ? 'bg-green-100 text-green-600' :
                                        order.status === 'Pending' ? 'bg-amber-100 text-amber-600' :
                                        'bg-blue-100 text-blue-600'
                                    }`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="py-5 pr-4 rounded-r-2xl text-center">
                                    <button className="p-2 bg-white rounded-xl text-slate-400 hover:text-pink-500 hover:shadow-md transition-all cursor-pointer">
                                        <HiOutlineEye size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Empty State (If no orders) */}
            {orders.length === 0 && (
                <div className="py-20 text-center">
                    <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">No orders yet!</p>
                    <button className="mt-4 text-pink-500 font-black text-xs uppercase hover:underline">Start Shopping</button>
                </div>
            )}
        </div>
    );
};

export default  UserProfileMyOrders;