
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineUser, HiOutlineLockClosed, HiOutlineChevronRight } from "react-icons/hi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { HiOutlineHeart } from "react-icons/hi";
import { RiLogoutCircleRLine } from "react-icons/ri";
import UserProfilePersonal from './UserProfilePersonal';
import UserProfileSecurity from './UserProfileSecurity';
import UserProfileMyOrders from './UserProfileMyOrders';
import UserProfileWishList from './UserProfileWishList';

// Sidebar Menu Items
const menuItems = [
    { id: 'Profile', label: 'Profile Settings', icon: <HiOutlineUser size={20} /> },
    { id: 'Orders', label: 'My Orders', icon: <HiOutlineShoppingBag size={20} /> },
    { id: 'Wishlist', label: 'My Wishlist', icon: <HiOutlineHeart size={20} /> },
    { id: 'Security', label: 'Security Settings', icon: <HiOutlineLockClosed size={20} /> },
    { id: 'Logout', label: 'Logout', icon: <RiLogoutCircleRLine size={20} className='rotate-270' /> },
];

function UserProfileLayout() {

    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('Profile');
    const [isLogoutOpen, setIsLogoutOpen] = useState(false);

    const handleMenuClick = (id) => {
        if (id === 'Logout') {
            setIsLogoutOpen(true);
        } else {
            setActiveTab(id);
        }
    };

    return (
        <div className='py-10 bg-slate-50/50 min-h-screen'>

            <div className='max-w-6xl mx-auto flex flex-col md:flex-row gap-8'>

                {/* --- LEFT SIDE: Internal Sidebar --- */}
                <div className='w-full md:w-80 shrink-0'>
                    <div className='bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-4 space-y-2'>

                        {/* heading */}
                        <h3 className='px-4 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest'>
                            Account Menu
                        </h3>

                        {/* menus */}
                        {menuItems.map((item, index) => (
                            <button
                                key={index}
                                onClick={() => handleMenuClick(item.id)}
                                className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all group cursor-pointer
                                        ${activeTab === item.id
                                        ? 'bg-pink-500 text-white shadow-lg shadow-pink-100'
                                        : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                            >

                                <div className={`flex items-center gap-3 ${item.id === "Logout" ? "text-red-500 " : ""}`}>
                                    {item.icon}
                                    <span className={`text-sm font-bold ${item.id === "Logout" ? "text-red-500" : ""}`}>
                                        {item.label}
                                    </span>
                                </div>
                                <HiOutlineChevronRight
                                    className={`transition-transform duration-300 
                                    ${activeTab === item.id ? 'translate-x-1' : 'opacity-0 group-hover:opacity-100'}`}
                                />

                            </button>
                        ))}

                    </div>
                </div>

                {/* --- RIGHT SIDE: Dynamic Form Content --- */}
                <div className='flex-1'>
                    <div className='bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden animate-in fade-in slide-in-from-right-4 duration-500 '>

                        {/* Form Header */}
                        <div className='p-6 border-b border-slate-50 dark:border-slate-800 bg-linear-to-r from-slate-50 to-transparent dark:from-slate-800/50'>
                            <h1 className='text-lg md:text-xl font-black text-pink-500 dark:text-white uppercase tracking-tight'>
                                {menuItems.find(i => i.id === activeTab)?.label}
                            </h1>

                            <p className='text-[10px] md:text-[11px] text-slate-400 font-medium uppercase mt-1'>
                                {activeTab === 'Orders' ? "Track and manage your recent purchases" :
                                    activeTab === 'Wishlist' ? "Your curated collection of favorites" :
                                        "Update your account information and preferences below"}
                            </p>
                        </div>

                        {/* Render Content Based on Active Tab */}
                        <div className='p-6 md:p-8'>
                            {activeTab === 'Profile' && <UserProfilePersonal />}
                            {activeTab === 'Orders' && <UserProfileMyOrders />}
                            {activeTab === 'Wishlist' && <UserProfileWishList />}
                            {activeTab === 'Security' && <UserProfileSecurity />}
                        </div>
                    </div>
                </div>
            </div>

            {/* logout popup */}
            {isLogoutOpen && (
                <div className="fixed inset-0 z-999 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 w-[90%] max-w-sm text-center transform animate-in zoom-in-95 duration-300">

                        {/* Logout Icon */}
                        <div className="w-16 h-16 bg-pink-50 dark:bg-pink-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <RiLogoutCircleRLine size={30} className="text-pink-500 rotate-270" />
                        </div>

                        <h2 className="text-xl font-black text-slate-800 dark:text-white uppercase tracking-tight">
                            Ready to Go?
                        </h2>
                        <p className="text-slate-400 text-xs font-medium uppercase mt-2 leading-relaxed">
                            Are you sure you want to logout from your <span className="text-pink-500">EasyShop</span> account?
                        </p>

                        <div className="flex gap-4 mt-10">

                            <button
                                onClick={() => setIsLogoutOpen(false)}
                                className="flex-1 py-4 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-100 transition-all active:scale-95 cursor-pointer">
                                Stay Here
                            </button>

                            {/* Confirm Logout Button */}
                            <button
                                onClick={() => {
                                    navigate('/login');
                                }}
                                className="flex-1 py-4 bg-pink-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-pink-200 dark:shadow-none hover:bg-pink-600 transition-all active:scale-95 cursor-pointer">
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default UserProfileLayout;