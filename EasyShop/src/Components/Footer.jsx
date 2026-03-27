
//updated
import React from 'react'
import Logo from '../assets/Images/Logo.png';
import { HiOutlineRefresh } from "react-icons/hi";
import { PiCurrencyDollarBold } from "react-icons/pi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { GoVerified } from "react-icons/go";
import MasterCardiconImg from '../assets/Images/MasterCardiconImg.png';
import RupayiconImg from '../assets/Images/RupayiconImg.png';
import UPIiconImg from '../assets/Images/UPIiconImg.png';
import VISAiconImg from '../assets/Images/VISAiconImg.png';
import { IoLogoInstagram } from "react-icons/io";
import { CiFacebook } from "react-icons/ci";
import { AiOutlineYoutube } from "react-icons/ai";
import { FaWhatsapp } from "react-icons/fa6";
import { CiLinkedin } from "react-icons/ci";
import { NavLink, useNavigate } from 'react-router-dom';

function Footer() {

    return (
        <section className="w-full bg-[#18181B] px-4 lg:px-6">

            <div className="max-w-6xl mx-auto">

                {/* 1st section */}
                <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 border-b border-gray-700/50 py-6'>

                    {/* Feature 1 */}
                    <div className='flex flex-col lg:flex-row items-center gap-3 text-center lg:text-left'>
                        <HiOutlineRefresh className='text-4xl text-pink-500 shrink-0' />
                        <div>
                            <p className='text-gray-200 font-bold text-sm uppercase tracking-tight'>Easy Returns</p>
                            <p className='text-gray-300 text-xs'>7-day return policy</p>
                        </div>
                    </div>

                    {/* Feature 2 */}
                    <div className='flex flex-col lg:flex-row items-center gap-3 text-center lg:text-left'>
                        <PiCurrencyDollarBold className='text-4xl text-pink-500 shrink-0' />
                        <div>
                            <p className='text-gray-200 font-bold text-sm uppercase tracking-tight'>Secure Payment</p>
                            <p className='text-gray-300 text-xs'>100% protected payments</p>
                        </div>
                    </div>

                    {/* Feature 3 */}
                    <div className='flex flex-col lg:flex-row items-center gap-3 text-center lg:text-left'>
                        <HiOutlineLocationMarker className='text-4xl text-pink-500 shrink-0' />
                        <div>
                            <p className='text-gray-200 font-bold text-sm uppercase tracking-tight'>Express Pickup</p>
                            <p className='text-gray-300 text-xs'>From your nearest store</p>
                        </div>
                    </div>

                    {/* Feature 4 */}
                    <div className='flex flex-col lg:flex-row items-center gap-3 text-center lg:text-left'>
                        <GoVerified className='text-4xl text-pink-500 shrink-0' />
                        <div>
                            <p className='text-gray-200 font-bold text-sm uppercase tracking-tight'>Authentic products</p>
                            <p className='text-gray-300 text-xs'>100% Genuine Guarantee</p>
                        </div>
                    </div>

                </div>

                {/* 2nd section */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 my-10 border-b border-gray-700/50 py-6'>

                    {/* logo */}
                    <div className='space-y-4'>
                        <img
                            src={Logo}
                            alt="Logo"
                            className='h-12 w-auto object-contain'
                        />
                        <p className='text-gray-300 text-sm max-w-xs md:max-w-45'>
                            Your favorite destination for trendy fashion and lifestyle.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className='space-y-4'>
                        <h1 className='text-xl font-bold text-gray-200'>Quick Links</h1>
                        <div className='flex flex-col gap-2 text-gray-300'>
                            <NavLink to="/" className={({ isActive }) => `cursor-pointer transition-all duration-300 ${isActive ? 'text-pink-500' : 'hover:text-pink-500'}`}>Home</NavLink>
                            <NavLink to="/about_us" className={({ isActive }) => `cursor-pointer transition-all duration-300 ${isActive ? 'text-pink-500' : 'hover:text-pink-500'}`}>About Us</NavLink>
                            <NavLink to="/blog" className={({ isActive }) => `cursor-pointer transition-all duration-300 ${isActive ? 'text-pink-500' : 'hover:text-pink-500'}`}>Blog</NavLink>
                            <NavLink to="/contact_us" className={({ isActive }) => `cursor-pointer transition-all duration-300 ${isActive ? 'text-pink-500' : 'hover:text-pink-500'}`}>Contact</NavLink>
                        </div>
                    </div>

                    {/* Policies */}
                    <div className='space-y-4'>
                        <h1 className='text-xl font-bold text-gray-200'>Policies</h1>
                        <div className='flex flex-col gap-2 text-gray-300'>
                            <NavLink to="/faqs" className={({ isActive }) => `cursor-pointer transition-all duration-300 ${isActive ? 'text-pink-500' : 'hover:text-pink-500'}`}>FAQ's</NavLink>
                            <NavLink to="/terms_policy" className={({ isActive }) => `cursor-pointer transition-all duration-300 ${isActive ? 'text-pink-500' : 'hover:text-pink-500'}`}>Terms Of Use</NavLink>
                            <NavLink to="/privacy_policy" className={({ isActive }) => `cursor-pointer transition-all duration-300 ${isActive ? 'text-pink-500' : 'hover:text-pink-500'}`}>Privacy Policy</NavLink>
                            <NavLink to="/delivery_policy" className={({ isActive }) => `cursor-pointer transition-all duration-300 ${isActive ? 'text-pink-500' : 'hover:text-pink-500'}`}>Delivery Policy</NavLink>
                            <NavLink to="/exchange_policy" className={({ isActive }) => `cursor-pointer transition-all duration-300 ${isActive ? 'text-pink-500' : 'hover:text-pink-500'}`}>Exchange & Return</NavLink>
                        </div>
                    </div>

                    {/* Customer / Contact */}
                    <div className='space-y-4'>
                        <h1 className='text-xl font-bold text-gray-200'>Contact Us</h1>
                        <div className='flex flex-col gap-2 text-gray-300 leading-4.5'>
                            <p className='text-[14px]'>If you have any question. please contact us</p>
                            <p className='hover:text-pink-500 cursor-pointer transition-all duration-300'>demo@example.com</p>
                            <p className='hover:text-pink-500 cursor-pointer transition-all duration-300'>+1252558858</p>
                        </div>
                        <div className='flex flex-col gap-2 text-gray-300 pt-3 leading-4.5'>
                            <p className='text-[14px]'>Your address goes here.</p>
                            <p className='hover:text-pink-500 cursor-pointer transition-all duration-300'>123, Address.</p>
                        </div>
                    </div>
                </div>

                {/* 3rd section */}
                <div className='flex flex-col lg:flex-row justify-between items-start gap-10 lg:gap-6 pb-10'>

                    {/* payment section */}
                    <div className='order-2 lg:order-1'>
                        <h1 className='text-gray-200 font-bold text-sm uppercase tracking-tight mb-2'>payment</h1>
                        <div className='flex flex-wrap gap-2 bg-gray-100 px-2 rounded-xl py-1'>
                            <img
                                src={MasterCardiconImg}
                                alt="MasterCard"
                                className='w-10 h-10 object-contain'
                            />
                            <img
                                src={RupayiconImg}
                                alt="Rupay"
                                className='w-10 h-10 object-contain'
                            />
                            <img
                                src={VISAiconImg}
                                alt="VISA"
                                className='w-10 h-10 object-contain'
                            />
                            <img
                                src={UPIiconImg}
                                alt="UPI"
                                className='w-10 h-10 object-contain'
                            />
                        </div>
                    </div>

                    {/* social icons */}
                    <div className='order-3 lg:order-2'>
                        <h1 className='text-gray-200 font-bold text-sm uppercase tracking-tight mb-2'>connect with us</h1>
                        <div className='flex flex-wrap gap-3'>
                            <div className='w-9 h-9 flex items-center justify-center bg-pink-500 rounded-2xl shadow-md cursor-pointer hover:scale-110 transition-transform'>
                                <IoLogoInstagram className='text-2xl text-white' />
                            </div>
                            <div className='w-9 h-9 flex items-center justify-center bg-pink-500 rounded-2xl shadow-md cursor-pointer hover:scale-110 transition-transform'>
                                <CiFacebook className='text-2xl text-white' />
                            </div>
                            <div className='w-9 h-9 flex items-center justify-center bg-pink-500 rounded-2xl shadow-md cursor-pointer hover:scale-110 transition-transform'>
                                <AiOutlineYoutube className='text-2xl text-white' />
                            </div>
                            <div className='w-9 h-9 flex items-center justify-center bg-pink-500 rounded-2xl shadow-md cursor-pointer hover:scale-110 transition-transform'>
                                <FaWhatsapp className='text-2xl text-white' />
                            </div>
                            <div className='w-9 h-9 flex items-center justify-center bg-pink-500 rounded-2xl shadow-md cursor-pointer hover:scale-110 transition-transform'>
                                <CiLinkedin className='text-3xl text-white' />
                            </div>
                        </div>
                    </div>

                    {/* newsletter */}
                    <div className='flex flex-col w-full md:max-w-sm order-1 lg:order-3'>
                        <h1 className='text-gray-200 font-bold text-sm uppercase tracking-tight mb-3'>Join our newsletter</h1>
                        <div className='flex overflow-hidden rounded-md w-full'>
                            <input
                                type="email"
                                placeholder='Enter your email'
                                className='px-3 py-2 border-y border-l border-gray-400 outline-none w-full text-sm placeholder:text-gray-400 text-white bg-transparent'
                            />
                            <button className='bg-pink-500 hover:bg-pink-600 px-4 py-2 text-white text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer shrink-0'>
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

            </div>

            <hr className='border-t border-gray-400 md:mt-10' />

            {/* Copyright Section */}
            <div className='py-4 text-center border-t border-gray-800/50 mt-'>
                <p className='text-gray-400 text-[12px] md:text-sm tracking-wide px-4'>
                    © 2026 <span className='text-pink-500 font-semibold'>Easy Shop</span>.
                    <span className="block md:inline mt-1 md:mt-0 md:ml-1">All Rights Reserved.</span>
                </p>
            </div>
        </section>
    )
}

export default Footer;