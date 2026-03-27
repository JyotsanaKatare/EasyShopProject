 
//updated
import React from 'react'
import { HiOutlineUser } from "react-icons/hi";
import { HiOutlineMail } from "react-icons/hi";
import { HiOutlinePhone } from "react-icons/hi";
import { HiOutlineLockClosed } from "react-icons/hi2";

function VendorPersonalInfo({ next, setFormData }) {
    return (
        <section className="w-full">

            {/* heading */}
            <div className='mb-8 text-center md:text-left'>
                <h1 className='text-xl md:text-2xl font-bold text-gray-800 tracking-tight'>
                    Personal Information
                </h1>
                {/* Ek choti line jo active step ko highlight karti hai */}
                <div className='w-12 h-1 bg-pink-500 rounded-full mt-1 mx-auto md:ml-0'></div>

                <p className='text-gray-500 text-xs md:text-sm mt-2'>
                    Please provide your basic contact details to get started.
                </p>
            </div>

            {/* form section */}
            <div className='grid md:grid-cols-2 gap-5 md:gap-6'>

                {/* name */}
                <div className='flex flex-col gap-1.5'>
                    <label htmlFor="full name" className="text-xs md:text-sm font-semibold text-gray-600 ml-1 tracking-wide">Full Name</label>
                    <div className='relative group'>
                        <HiOutlineUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg md:text-xl group-focus-within:text-pink-500 transition-colors" />

                        <input
                            type="text"
                            placeholder='Full Name'
                            className="w-full pl-10 md:pl-12 pr-4 py-3 text-sm md:text-base placeholder:text-gray-400 bg-gray-50 border border-gray-200 rounded-lg md:rounded-2xl focus:border-pink-500 focus:bg-white outline-none transition-all"
                            required
                        />
                    </div>
                </div>

                {/* email */}
                <div className='flex flex-col gap-1.5'>
                    <label htmlFor="email" className="text-xs md:text-sm font-semibold text-gray-600 ml-1 tracking-wide">Email</label>
                    <div className='relative group'>
                        <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg md:text-xl group-focus-within:text-pink-500 transition-colors" />

                        <input
                            type="text"
                            placeholder='Email'
                            className="w-full pl-10 md:pl-12 pr-4 py-3 text-sm md:text-base placeholder:text-gray-400 bg-gray-50 border border-gray-200 rounded-lg md:rounded-2xl focus:border-pink-500 focus:bg-white outline-none transition-all"
                            required
                        />
                    </div>
                </div>

                {/* mobile num */}
                <div className='flex flex-col gap-1.5'>
                    <label htmlFor="Mobile Number" className="text-xs md:text-sm font-semibold text-gray-600 ml-1 tracking-wide">Mobile Number</label>
                    <div className='relative group'>
                        <HiOutlinePhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg md:text-xl group-focus-within:text-pink-500 transition-colors" />

                        <input
                            type="text"
                            placeholder='Mobile Number'
                            className="w-full pl-10 md:pl-12 pr-4 py-3 text-sm md:text-base placeholder:text-gray-400 bg-gray-50 border border-gray-200 rounded-lg md:rounded-2xl focus:border-pink-500 focus:bg-white outline-none transition-all"
                            required
                        />
                    </div>
                </div>

                {/* password */}
                <div className='flex flex-col gap-1.5'>
                    <label htmlFor="password" className="text-xs md:text-sm font-semibold text-gray-600 ml-1 tracking-wide">Password</label>
                    <div className='relative group'>
                        <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg md:text-xl group-focus-within:text-pink-500 transition-colors" />

                        <input
                            type="password"
                            placeholder='Password'
                            className="w-full pl-10 md:pl-12 pr-4 py-3 text-sm md:text-base placeholder:text-gray-400 bg-gray-50 border border-gray-200 rounded-lg md:rounded-2xl focus:border-pink-500 focus:bg-white outline-none transition-all"
                            required
                        />
                    </div>
                </div>

                {/* confirm password */}
                <div className='flex flex-col gap-1.5'>
                    <label htmlFor="confirm password" className="text-xs md:text-sm font-semibold text-gray-600 ml-1 tracking-wide">Confirm Password</label>
                    <div className='relative group'>
                        <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg md:text-xl group-focus-within:text-pink-500 transition-colors" />

                        <input
                            type="password"
                            placeholder='Confirm Password'
                            className="w-full pl-10 md:pl-12 pr-4 py-3 text-sm md:text-base placeholder:text-gray-400 bg-gray-50 border border-gray-200 rounded-lg md:rounded-2xl focus:border-pink-500 focus:bg-white outline-none transition-all"
                            required
                        />
                    </div>
                </div>
            </div>

            {/* button */}
            <div className="flex justify-center md:justify-end mt-8 md:mt-12">
                <button
                    onClick={next}
                    className="w-full md:w-auto bg-pink-500 text-white px-8 py-3.5 md:py-3 rounded-2xl md:rounded-xl font-bold shadow-lg shadow-pink-200 hover:bg-pink-600 hover:scale-[1.02] md:hover:scale-105 active:scale-95 transition-all cursor-pointer text-sm md:text-base"
                >
                    Continue to Business Details
                </button>
            </div>
        </section>

    )
}

export default VendorPersonalInfo;