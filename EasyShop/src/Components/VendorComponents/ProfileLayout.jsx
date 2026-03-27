
import React, { useState } from 'react';
import ProfileHeader from './ProfileHeader';
import { HiOutlineUser, HiOutlineOfficeBuilding, HiOutlineIdentification, HiOutlineLockClosed, HiOutlineChevronRight } from "react-icons/hi";
import { RiLogoutCircleRLine } from "react-icons/ri";
import ProfilePersonalForm from './ProfilePersonalForm';
import ProfileBusinessForm from './ProfileBusinessForm';
import ProfileAccountForm from './ProfileAccountForm';
import ProfileSecurityForm from './ProfileSecurityForm';

function ProfileLayout() {

    const [activeTab, setActiveTab] = useState('Profile');

    // Sidebar Menu Items
    const menuItems = [
        { id: 'Profile', label: 'Profile Settings', icon: <HiOutlineUser size={20} /> },
        { id: 'Business', label: 'Business Detail Settings', icon: <HiOutlineOfficeBuilding size={20} /> },
        { id: 'Account', label: 'Bank Detail Settings', icon: <HiOutlineIdentification size={20} /> },
        { id: 'Security', label: 'Security Settings', icon: <HiOutlineLockClosed size={20} /> },
        { id: 'Logout', label: 'Logout', icon: <RiLogoutCircleRLine size={20} className='rotate-270'/> },
    ];

    return (
        <>
            {/* vendor profile header */}
            <ProfileHeader />

            {/* other components */}
            <div className='p-4 md:p-10 bg-slate-50/50 min-h-screen'>

                <div className='max-w-6xl mx-auto flex flex-col md:flex-row gap-8'>

                    {/* --- LEFT SIDE: Internal Sidebar --- */}
                    <div className='w-full md:w-80 shrink-0'>
                        <div className='bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-4 space-y-2 sticky top-30 z-50'>

                            <h3 className='px-4 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest'>
                                Account Menu
                            </h3>

                            {menuItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id)}
                                    className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all group cursor-pointer
                                        ${activeTab === item.id
                                            ? 'bg-pink-500 text-white shadow-lg shadow-pink-100'
                                            : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                >
                                    <div className='flex items-center gap-3'>
                                        {item.icon}
                                        <span className='text-sm font-bold'>
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
                                <h2 className='text-lg md:text-xl font-black text-pink-500 dark:text-white uppercase tracking-tight'>
                                    {menuItems.find(i => i.id === activeTab)?.label}
                                </h2>
                                <p className='text-[10px] md:text-[11px] text-slate-400 font-medium uppercase mt-1'>
                                    Update your account information and preferences below
                                </p>
                            </div>

                            {/* Render Content Based on Active Tab */}
                            <div className='p-6 md:p-8'>
                                {activeTab === 'Profile' && <ProfilePersonalForm />}
                                {activeTab === 'Business' && <ProfileBusinessForm />}
                                {activeTab === 'Account' && <ProfileAccountForm />}
                                {activeTab === 'Security' && <ProfileSecurityForm/>}
                                {activeTab === 'Billing' && (
                                    <div className='text-center py-20 text-slate-300 font-medium italic'>
                                        Billing Details Component coming soon...
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default ProfileLayout;