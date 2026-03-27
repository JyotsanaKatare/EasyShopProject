
// updated
import React, { useState } from 'react';
import NewProd3 from '../assets/Images/NewProd3.png';
import { FaRegFileAlt } from "react-icons/fa";
import { MdOutlineFileDownload } from "react-icons/md";
import { RiQuestionLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';

function OrderTracker() {

    const navigate = useNavigate();
    const [step, setStep] = useState(1);

    const stepsLabels = [
        { key: "Placed", status: "Order placed" },
        { key: "Confirmed", status: "Order confirmed" },
        { key: "Shipped", status: "Arrived at courier warehouse" },
        { key: "Delivered", status: "Delivered" },
        { key: "Cancelled", status: "Cancelled" }
    ];

    return (
        <div className="min-h-[70vh] bg-white py-8 md:py-16 px-4 lg:px-6">
            <div className="max-w-6xl mx-auto">

                {/* heading */}
                <div className="flex flex-col items-center pt-2 pb-2">
                    <h1 className='text-2xl md:text-3xl text-pink-500 font-bold tracking-tight'>
                        Order Tracking
                    </h1>
                    <div className="h-1 w-15 md:w-20 bg-pink-500 rounded-full mt-2 opacity-30"></div>
                </div>

                {/* Order ID and Estimated Delivery */}
                <div className="my-8 p-3 md:p-4 bg-gray-50/50 rounded-2xl border border-gray-100 grid grid-cols-2 md:flex md:justify-between items-center gap-4">
                    <div className="border-r border-gray-200 md:border-none pr-2 md:pr-0">
                        <p className="text-[10px] md:text-xs text-gray-400 uppercase font-black tracking-wider">Order ID</p>
                        <p className="text-[11px] md:text-sm font-mono font-bold text-gray-800 truncate">#EZ-2026-9920</p>
                    </div>

                    <div className="pl-2 md:pl-0 md:text-right">
                        <p className="text-[10px] md:text-xs text-gray-400 uppercase font-black tracking-wider">Estimated Delivery</p>
                        <p className="text-[11px] md:text-sm font-bold text-pink-500">March 12, 2026</p>
                    </div>
                </div>

                {/* Progress bar */}
                <div className="mb-10 md:mb-24 mt-12 relative flex flex-col md:flex-row justify-between w-full px-4 md:px-10">

                    {/* Background Line */}
                    <div className="absolute 
        left-9 top-0 w-1 h-full bg-gray-100                 /* Mobile: Vertical */
        md:top-6 md:left-12.5 md:right-12.5 md:w-auto md:h-1  /* Desktop: Fixed edges */
        -translate-x-1/2 md:translate-x-0 md:-translate-y-1/2 z-0">
                    </div>

                    {/* Active Pink Line (Dynamic) */}
                    <div
                        className="absolute transition-all duration-700 ease-in-out bg-pink-500 z-0
            left-9 top-0 w-1                                /* Mobile */
            md:top-6 md:left-12.5 md:h-1                  /* Desktop: Start at first circle center */
            -translate-x-1/2 md:translate-x-0 md:-translate-y-1/2"
                        style={{
                            height: window.innerWidth < 768 ? `${((step - 1) / (stepsLabels.length - 1)) * 100}%` : '4px',
                            /* Desktop Width calculation: 100% minus the padding we gave to the container */
                            width: window.innerWidth >= 768 ? `calc(${((step - 1) / (stepsLabels.length - 1)) * 100}% - ${step === 1 ? '0px' : '40px'})` : '4px'
                        }}
                    ></div>

                    {/* Steps Loop */}
                    {stepsLabels.map((label, index) => {
                        const stepNumber = index + 1;
                        const isCompleted = step > stepNumber;
                        const isActive = step >= stepNumber;

                        return (
                            <div key={index} className="relative z-10 flex flex-row md:flex-col items-center mb-10 md:mb-0 last:mb-0">
                                {/* Circle Indicator */}
                                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold transition-all duration-500 border-4 border-white shrink-0
                    ${isActive ? 'bg-pink-500 text-white shadow-lg' : 'bg-gray-100 text-gray-400'}`}>
                                    {isCompleted ? '✓' : stepNumber}
                                </div>

                                {/* Labels Section */}
                                <div className="ml-5 md:ml-0 md:absolute md:top-14 text-left md:text-center w-full md:w-30 md:translate-x-0">
                                    <p className={`text-[12px] md:text-[11px] font-black uppercase tracking-tight
                         ${isActive ? 'text-pink-500' : 'text-gray-400'}`}>
                                        {label.status}
                                    </p>
                                    {label.date && (
                                        <p className="text-[10px] text-gray-400 font-medium">{label.date}</p>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Parent div Order Content */}
                <div className="mt-10 p-4 md:p-8 border rounded-3xl border-gray-100 shadow-sm flex flex-col lg:flex-row gap-8 md:gap-10 bg-white">

                    {/* Left Side: Product Details */}
                    <div className='w-full lg:w-1/2'>
                        <div className="pb-3 border-b border-gray-100 mb-6">
                            <h2 className='text-xl md:text-2xl text-pink-500 font-bold flex items-center gap-2'>
                                <span className="w-2 h-8 bg-pink-500 rounded-full"></span>
                                Product Items
                            </h2>
                        </div>

                        <div className="group p-3 md:p-4 rounded-2xl border border-transparent hover:border-pink-50 hover:bg-pink-50/30 transition-all duration-300 flex flex-row justify-between items-center gap-2">
                            <div className="flex gap-3 md:gap-4 items-center">
                                <div className="relative shrink-0 overflow-hidden rounded-xl border border-gray-100">
                                    <img
                                        src={NewProd3}
                                        alt="Product"
                                        className='w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 object-cover group-hover:scale-105 transition-transform duration-500'
                                    />
                                </div>

                                <div className="flex flex-col justify-center">
                                    <h3 className="text-gray-800 font-bold text-sm md:text-md leading-tight uppercase tracking-tight truncate max-w-30 sm:max-w-none">
                                        Designer Purse
                                    </h3>
                                    <p className="text-[11px] md:text-sm text-gray-400 font-medium">
                                        Color: <span className="text-gray-600 italic">Mat-Blue</span>
                                    </p>
                                    <p className="text-[10px] md:text-sm text-pink-500 font-bold mt-1 bg-pink-50 w-fit px-2 py-0.5 rounded-md">
                                        Qty: 02
                                    </p>
                                </div>
                            </div>

                            <div className="text-right shrink-0">
                                <p className="text-md md:text-xl font-black text-gray-800 tracking-tighter">
                                    ₹20,000
                                </p>
                                <p className="hidden sm:block text-[10px] text-gray-400 uppercase font-bold tracking-widest">
                                    Price per unit
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Delivery & Billing */}
                    <div className="w-full lg:w-1/2 space-y-8">

                        {/* Delivery Info Section */}
                        <div className="bg-white">
                            <div className="pb-3 border-b border-gray-100 mb-5">
                                <h2 className='text-lg md:text-xl font-bold text-gray-800 uppercase tracking-tight'>
                                    Delivery Information
                                </h2>
                            </div>

                            <div className="grid grid-cols-2 lg:grid-cols-2 gap-y-6 gap-x-2">
                                <div className="space-y-1">
                                    <p className="text-[10px] md:text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                                        Customer
                                    </p>
                                    <p className="text-gray-700 font-semibold text-sm md:text-base truncate">
                                        Sana Sheikh
                                    </p>
                                </div>

                                <div className="space-y-1">
                                    <p className="text-[10px] md:text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                                        Method
                                    </p>
                                    <p className="text-gray-700 font-semibold text-sm md:text-base flex items-center gap-1.5">
                                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                        Express
                                    </p>
                                </div>

                                <div className="col-span-2 space-y-1 pt-2 border-t border-gray-50 md:border-none">
                                    <p className="text-[10px] md:text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                                        Address
                                    </p>
                                    <p className="text-gray-600 text-[12px] md:text-sm leading-relaxed">
                                        278 Jawahar Marg, <br />
                                        Indore, MP - 452003
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Billing Details Card */}
                        <div className="bg-gray-50/80 p-5 md:p-6 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-pink-100/30 rounded-full -mr-12 -mt-12 blur-2xl"></div>

                            <h2 className='text-md md:text-lg font-bold text-gray-800 mb-4 flex items-center justify-between'>
                                Billing
                                <span className="text-[9px] md:text-[10px] bg-white px-2 py-1 rounded-full text-gray-400 shadow-sm border border-gray-100">
                                    Paid via UPI
                                </span>
                            </h2>

                            <div className="space-y-3 border-b border-gray-200 pb-4">
                                <div className="flex justify-between text-[13px] md:text-sm">
                                    <span className="text-gray-500">Subtotal</span>
                                    <span className="font-bold text-gray-700">₹20,000</span>
                                </div>
                                <div className="flex justify-between text-[13px] md:text-sm">
                                    <span className="text-gray-500">Shipping</span>
                                    <span className="font-bold text-green-600">₹4.00</span>
                                </div>
                                <div className="flex justify-between text-[13px] md:text-sm">
                                    <span className="text-gray-500">Tax</span>
                                    <span className="font-bold text-gray-700">₹45.33</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center pt-4">
                                <p className="text-md md:text-lg font-bold text-gray-800">Total</p>
                                <div className="text-right">
                                    <p className="text-xl md:text-2xl font-black text-pink-500 tracking-tighter">
                                        ₹25,000
                                    </p>
                                    <p className="text-[9px] md:text-[10px] text-gray-400 font-bold uppercase tracking-widest italic">
                                        All Taxes Inc.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Actions: Invoice & Support */}
                <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-6 rounded-3xl border border-dashed border-gray-200">

                    {/* Left: Invoice Side */}
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-pink-50 rounded-2xl flex items-center justify-center text-pink-500">
                            <FaRegFileAlt className='text-xl' />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-gray-800">Need a copy of your bill?</h4>
                            <p className="text-xs text-gray-400">Download your official tax invoice (PDF)</p>
                        </div>
                    </div>

                    {/* Right: Action Buttons */}
                    <div className="flex flex-wrap justify-center gap-3 w-full md:w-auto">
                        <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white border-2 border-pink-500 text-pink-500 px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-pink-50 transition-all active:scale-95 cursor-pointer">
                            <MdOutlineFileDownload className='text-xl' />
                            <p>Download Invoice</p>
                        </button>

                        <button
                            onClick={() => navigate("/contact_us")}
                            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-pink-500 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-pink-200 hover:bg-pink-600 transition-all active:scale-95 cursor-pointer">
                            <RiQuestionLine className='text-xl' />
                            <p>Need Help?</p>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default OrderTracker;