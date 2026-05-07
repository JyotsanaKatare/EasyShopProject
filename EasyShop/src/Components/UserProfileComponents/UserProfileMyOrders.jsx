
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineEye, HiOutlineShoppingBag } from 'react-icons/hi';
import { useUserOrderHistory } from '../../hook/useOrders';

function UserProfileMyOrders() {

    const navigate = useNavigate();
    const { data: orders = [], isLoading, isError } = useUserOrderHistory();

    const statusStyles = {
        Delivered: 'bg-green-100 text-green-600',
        Pending: 'bg-amber-100 text-amber-600',
        Cancelled: 'bg-red-100 text-red-600',
        Processing: 'bg-blue-100 text-blue-600',
        Shipped: 'bg-purple-100 text-purple-600',
    };

    if (isLoading) return <div className="py-20 text-center text-slate-400">Loading orders...</div>;
    if (isError) return <div className="py-20 text-center text-red-400">Failed to load orders</div>;

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
                            {/* <th className="pb-2 text-center">Action</th> */}
                        </tr>
                    </thead>

                    <tbody>
                        {orders.map((order, index) => (
                            <tr
                                key={index}
                                className="bg-slate-50/50 hover:bg-slate-100/50 transition-colors group">

                                {/* order id */}
                                <td className="py-5 pl-4 rounded-l-2xl">
                                    <span className="text-sm font-bold text-slate-700">
                                        #{order._id.slice(-6).toUpperCase()}
                                    </span>
                                </td>

                                {/* order date */}
                                <td className="py-5 text-xs font-semibold text-slate-500">
                                    {new Date(order.createdAt).toLocaleDateString('en-IN', {
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric'
                                    })}
                                </td>

                                {/* items */}
                                <td className="py-5 text-xs font-semibold text-slate-500">
                                    {order.items.length} {order.items.length === 1 ? 'Item' : 'Items'}
                                </td>

                                {/* order amt */}
                                <td className="py-5 text-sm font-black text-slate-800">
                                    ₹{order.totalAmount}
                                </td>

                                {/* status */}
                                <td className="py-5">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider 
                                            ${statusStyles[order.orderStatus] || 'bg-slate-100 text-slate-500'}`}>
                                        {order.orderStatus}
                                    </span>
                                </td>

                                {/* action */}
                                {/* <td className="py-5 pr-4 rounded-r-2xl text-center">
                                    <button
                                        onClick={() => navigate(`/order_detail/${order._id}`)}
                                        className="p-2 bg-white rounded-xl text-slate-400 hover:text-pink-500 hover:shadow-md transition-all cursor-pointer">
                                        <HiOutlineEye size={18} />
                                    </button>
                                </td> */}
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

export default UserProfileMyOrders;