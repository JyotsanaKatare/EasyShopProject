
import { useState, useRef } from 'react';
import { Menu, Search, Sun, Bell, ChevronDown, User, LogOut, UserRoundCog } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const VendorHeader = ({ onToggleSideBar }) => {

    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    return (
        <div className='bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-pink-50 dark:border-slate-800 p-4 lg:px-8 sticky top-0 z-40'>
            <div className='flex items-center justify-between gap-2 lg:gap-4'>

                {/* Left: Branding/Toggle */}
                <div className='flex items-center space-x-4'>
                    <button
                        onClick={onToggleSideBar}
                        className='p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-pink-50 dark:hover:bg-slate-800 transition-all cursor-pointer active:scale-90'
                    >
                        <Menu className='w-6 h-6 text-pink-500' />
                    </button>

                    <div className='hidden lg:block'>
                        <h1 className='text-lg md:text-xl font-bold bg-linear-to-r from-pink-600 to-pink-400 bg-clip-text text-transparent'>
                            Vendor
                        </h1>
                        <p className='text-[11px] md:text-xs text-slate-400 font-medium tracking-wide uppercase'>
                            EasyShop Seller Central
                        </p>
                    </div>
                </div>

                {/* Center: Search Bar */}
                <div className='flex-1 max-w-md hidden sm:block'>
                    <div className='relative group'>
                        <Search className='w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-pink-500 transition-colors' />
                        <input
                            type='text'
                            placeholder='Search orders, products...'
                            className='w-full pl-11 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 rounded-2xl text-sm focus:outline-none focus:ring-1 focus:ring-pink-500/20 focus:border-pink-500 transition-all placeholder:text-slate-400'
                        />
                    </div>
                </div>

                {/* Right: Actions & Profile */}
                <div className='flex items-center space-x-2 lg:space-x-4'>

                    {/* Theme Toggle */}
                    <button className='md:ml-0 p-2.5 rounded-xl text-slate-500 hover:bg-pink-50 dark:hover:bg-slate-800 transition-all'>
                        <Sun className='w-5 h-5 hover:rotate-45 transition-transform' />
                    </button>

                    {/* Notification */}
                    <div className='relative'>
                        <button className='p-2.5 rounded-xl text-slate-500 hover:bg-pink-50 dark:hover:bg-slate-800 transition-all'>
                            <Bell className='w-5 h-5' />
                            <span className='absolute top-2 right-2 w-2 h-2 bg-pink-500 rounded-full border-2 border-white shadow-sm'></span>
                        </button>
                    </div>

                    {/* User Profile */}
                    <div className='relative' ref={dropdownRef}>
                        <div
                            onClick={() => setOpen(!open)}
                            className='flex items-center space-x-3 p-1 pr-3 rounded-2xl border border-transparent hover:border-pink-100 hover:bg-pink-50/50 transition-all cursor-pointer'
                        >

                            <div className='w-9 h-9 bg-linear-to-br from-pink-500 to-rose-400 rounded-xl flex justify-center items-center shadow-md shadow-pink-200'>
                                <User className='w-5 h-5 text-white' />
                            </div>

                            <div className='hidden md:block text-left'>
                                <h4 className='text-xs font-bold text-slate-800 dark:text-white leading-tight'>EasyShop</h4>
                                <span className='text-[10px] font-semibold text-pink-500 bg-pink-50 px-1.5 py-0.5 rounded-md'>VERIFIED</span>
                            </div>
                            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
                        </div>

                        {/* Enhanced Dropdown */}
                        {open && (
                            <div className="absolute right-0 mt-3 w-48 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl shadow-xl shadow-slate-200/50 z-50 py-2 overflow-hidden animate-in fade-in zoom-in duration-200">
                                <button
                                    onClick={() => {navigate("/vendor_profile"); setOpen(false);}}
                                    className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:bg-pink-50 dark:hover:bg-slate-700/50 hover:text-pink-600 transition-colors cursor-pointer">
                                    <UserRoundCog className="w-4 h-4" />
                                    <span>Profile</span>
                                </button>

                                <div className='h-px bg-slate-100 dark:bg-slate-700 mx-2 my-1'></div>

                                <button className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors cursor-pointer">
                                    <LogOut className="w-4 h-4" />
                                    <span className='font-semibold'>Logout</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VendorHeader;