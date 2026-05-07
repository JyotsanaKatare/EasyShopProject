
import React, { useState } from 'react';
import { HiOutlineMail, HiOutlineDotsVertical, HiOutlineShieldCheck, HiOutlineTrash, HiOutlineX, HiOutlineExclamation } from "react-icons/hi";

import { useDeleteUser, useToggleUserStatus, useUserList } from '../hooks/useUsers';

function UserList() {

    const { data: userList, isLoading, isError } = useUserList();
    const { mutate: toggleStatus, isPending, variables } = useToggleUserStatus();
    const { mutate: deleteUser } = useDeleteUser();

    const [isDeletedOpen, setIsDeletedOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState("");

    if (isLoading) return <p className="p-10 text-center">Loading user list...</p>;
    if (isError) return <p className="p-10 text-center text-red-500">Error fetching user list!</p>;

    // toggle status
    const handleToggleStatus = (id) => {
        toggleStatus({ user_id: id });
    };

    // delete 
    const handleDeleteClick = (user) => {
        setSelectedUser(user);
        setIsDeletedOpen(true);
    };

    const handleDelete = () => {
        deleteUser({ user_id: selectedUser._id }, {
            onSuccess: (res) => {
                setIsDeletedOpen(false);
            }
        });
    };

    return (
        <div className="w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">

            {/* Header */}
            <div className="p-6 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
                <div>
                    <h3 className="text-lg font-black text-slate-800 dark:text-white uppercase tracking-tight">
                        User Base
                    </h3>
                    <p className="text-xs text-slate-400 font-medium">
                        Manage permissions and account status
                    </p>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-slate-50/50 dark:bg-slate-800/50">
                        <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            <th className="px-6 py-4">User Details</th>
                            <th className="px-6 py-4 text-center">Engagement</th>
                            <th className="px-6 py-4">Joined Date</th>
                            <th className="px-6 py-4 text-center">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                        {userList.map((user, index) => {

                            const isThisRowLoading = isPending && variables === user._id;

                            return (
                                <tr
                                    key={index}
                                    className="hover:bg-slate-50/30 dark:hover:bg-slate-800/30 transition-colors group">

                                    {/* User Info */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={user.profilePhoto || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb0-KZXsKBUV4QuGFEV-fLnM2o6Qz27qdSdw&s'}
                                                alt={user.name}
                                                className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-700 shadow-sm" />

                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                                                    {user.name}
                                                </span>
                                                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                                                    <HiOutlineMail size={12} /> {user.email}
                                                </span>
                                            </div>
                                        </div>
                                    </td>

                                    {/* orders */}
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex flex-col items-center">
                                            <span className="text-sm font-black text-pink-500 dark:text-pink-200">
                                                {user.orderCount || 0}
                                            </span>
                                            <span className="text-[10px] text-pink-400 uppercase font-bold tracking-tighter">
                                                Orders
                                            </span>
                                        </div>
                                    </td>

                                    {/* Joined Date */}
                                    <td className="px-6 py-4 text-xs font-medium text-slate-500">
                                        {new Date(user.createdAt).toLocaleDateString('en-IN', {
                                            day: '2-digit', month: 'short', year: 'numeric'
                                        })}
                                    </td>

                                    {/* Status */}
                                    <td className="px-6 py-4 text-center">
                                        <button
                                            onClick={() => !isPending && handleToggleStatus(user._id)}
                                            disabled={isPending}
                                            className={`w-16 inline-flex items-center justify-center px-3 py-1 rounded-full text-[10px] font-bold uppercase border transition-all
                                                ${isThisRowLoading ? 'opacity-50' : 'cursor-pointer'}
                                                 ${user.isActive
                                                    ? 'bg-green-50 text-green-600 border-green-100 hover:bg-green-100'
                                                    : 'bg-red-50 text-red-400 border-red-200 hover:bg-red-100'
                                                }`}
                                        >

                                            {isThisRowLoading ? (
                                                <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                                            ) : (
                                                user.isActive ? "Active" : "Inactive"
                                            )}
                                        </button>
                                    </td>

                                    {/* Actions */}
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => handleDeleteClick(user)}
                                            className="p-2 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-lg transition-colors active:scale-95 cursor-pointer"
                                            title="Delete User"
                                        >
                                            <HiOutlineTrash size={18} />
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            {/* delete popup */}
            <div
                className={`fixed inset-0 flex justify-center items-center bg-black/50 backdrop-blur-sm z-100 px-4 transition-all duration-500 
                ${isDeletedOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
            >
                <div
                    onClick={() => setIsDeletedOpen(false)}
                    className="absolute inset-0"
                ></div>

                {/* Modal Content */}
                <div className="relative bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 p-6 overflow-hidden">
                    <button
                        onClick={() => setIsDeletedOpen(false)}
                        className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                        <HiOutlineX size={20} />
                    </button>

                    <div className="flex flex-col items-center text-center">

                        <div className="w-16 h-16 bg-rose-50 dark:bg-rose-900/20 rounded-full flex items-center justify-center text-rose-500 mb-4">
                            <HiOutlineExclamation size={32} />
                        </div>

                        <h3 className="text-xl font-black text-slate-800 dark:text-white uppercase tracking-tight">
                            Confirm Deletion
                        </h3>

                        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 px-4">
                            Are you sure you want to delete <span className="font-bold text-slate-700 dark:text-slate-200">
                                {selectedUser?.name}</span>?
                            This action cannot be undone and all associated data will be lost.
                        </p>

                        <div className="mt-8 flex gap-3 w-full">
                            <button
                                onClick={() => setIsDeletedOpen(false)}
                                className="flex-1 px-4 py-3 rounded-2xl text-sm font-bold text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleDelete}
                                disabled={isLoading}
                                className="flex-1 px-4 py-3 rounded-2xl text-sm font-bold bg-rose-500 hover:bg-rose-600 text-white shadow-lg shadow-rose-200 dark:shadow-none transition-all disabled:opacity-50 flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
                            >
                                {isLoading ? "Deleting..." : "Yes, Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserList;