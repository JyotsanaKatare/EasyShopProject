
import React, { useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

const discountType = [
    { id: 1, type: "Percentage (%)" },
    { id: 2, type: "Fixed Amount" },
];

function AddCoupon({ setCurrentPage }) {

    const [isDiscountOpen, setIsDiscountOpen] = useState(false);
    const [selectedDiscount, setSelectedDiscount] = useState(null);

    const handleDiscount = (discount) => {
        setSelectedDiscount(discount);
        setIsDiscountOpen(false);
    };

    return (
        <div className='bg-slate-50/50 p-4 md:p-8'>

            {/* Header */}
            <div className='max-w-4xl mx-auto p-4 md:p-8 bg-linear-to-br from-pink-500 to-pink-600 rounded-t-xl md:rounded-t-3xl relative overflow-hidden'>
                <div className='absolute -top-10 -right-10 h-32 w-32 bg-white/10 rounded-full blur-2xl'></div>
                <div className='absolute -bottom-10 -left-10 h-24 w-24 bg-white/10 rounded-full blur-xl'></div>

                <div className='relative z-10 text-center md:text-start'>
                    <h1 className='text-xl md:text-2xl font-bold text-white mb-1'>
                        Add New Coupon
                    </h1>

                    <p className='text-pink-50 text-xs font-medium opacity-90'>
                        Quickly set up a new category for your inventory.
                    </p>
                </div>
            </div>

            {/* Form Container */}
            <div className='max-w-4xl mx-auto bg-white dark:bg-slate-900 p-5 md:p-8 rounded-b-xl md:rounded-b-3xl shadow-sm border border-pink-50 dark:border-slate-800'>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 '>

                    {/* coupon code */}
                    <div className='flex flex-col gap-1.5 md:gap-2'>
                        <label className='text-[13px] md:text-sm font-semibold text-slate-600 dark:text-slate-400 ml-1'>
                            Coupon Code
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. SUMMER50"
                            className="p-2.5 md:p-3.5 rounded-lg md:rounded-2xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:text-white text-sm transition-all placeholder:text-[11px] md:placeholder:text-[14px]"
                        />
                    </div>

                    {/* dicount select dropdown */}
                    <div className=''>
                        <label className='text-[12px] md:text-sm font-semibold text-slate-600 dark:text-slate-400 mb-1.5 md:mb-2 block'>
                            Discount Type
                        </label>

                        <button
                            onClick={() => setIsDiscountOpen(!isDiscountOpen)}
                            className={`w-full bg-slate-50 dark:bg-slate-800 px-4 md:px-5 py-3 md:py-3.5 rounded-xl md:rounded-2xl flex justify-between items-center transition-all border-2 cursor-pointer
                                    ${isDiscountOpen ? 'border-pink-400' : 'border-transparent'}`}
                        >
                            <span className={`${selectedDiscount ? 'text-slate-800 dark:text-white font-medium' : 'text-slate-400'} text-[11px] md:text-[14px] truncate mr-2`}>
                                {selectedDiscount ? selectedDiscount.type : 'Select Discount Type'}
                            </span>

                            <div className="shrink-0">
                                {isDiscountOpen ? <IoIosArrowUp className='text-pink-500' /> : <IoIosArrowDown className='text-slate-400' />}
                            </div>
                        </button>

                        {/* Dropdown Menu */}
                        {isDiscountOpen && (
                            <div className='w-full mt-2 bg-white dark:bg-slate-800 rounded-b-xl md:rounded-b-2xl shadow-xl border border-pink-50 dark:border-slate-700 py-2 overflow-hidden animate-in fade-in zoom-in duration-200'>
                                {/* Max height aur scroll add kiya hai taaki mobile par lambi list screen se bahar na jaye */}
                                <div className='max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700'>
                                    {discountType.map((item, index) => (
                                        <div
                                            key={index}
                                            onClick={() => handleDiscount(item)}
                                            className='px-4 md:px-5 py-3 hover:bg-pink-50 dark:hover:bg-slate-700 cursor-pointer text-slate-700 dark:text-slate-300 hover:text-pink-600 font-medium transition-colors text-[11px] md:text-[14px] border-b border-slate-50 dark:border-slate-700 last:border-none'
                                        >
                                            {item.type}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* value */}
                    <div className='flex flex-col gap-1.5 md:gap-2'>
                        <label className='text-[13px] md:text-sm font-semibold text-slate-600 dark:text-slate-400 ml-1'>
                            Discount Value
                        </label>
                        <input
                            type="number"
                            placeholder="Enter value"
                            className="p-2.5 md:p-3.5 rounded-lg md:rounded-2xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:text-white text-sm transition-all placeholder:text-[11px] md:placeholder:text-[14px]"
                        />
                    </div>

                    {/* Min Purchase */}
                    <div className='flex flex-col gap-1.5 md:gap-2'>
                        <label className='text-[13px] md:text-sm font-semibold text-slate-600 dark:text-slate-400 ml-1'>
                            Min. Purchase Amount
                        </label>
                        <input
                            type="number"
                            placeholder="₹0.00"
                            className="p-2.5 md:p-3.5 rounded-lg md:rounded-2xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:text-white text-sm transition-all placeholder:text-[11px] md:placeholder:text-[14px]"
                        />
                    </div>

                    {/* usage limit */}
                    <div className='flex flex-col gap-1.5 md:gap-2'>
                        <label className='text-[13px] md:text-sm font-semibold text-slate-600 dark:text-slate-400 ml-1'>
                            Total Usage Limit
                        </label>
                        <input
                            type="number"
                            placeholder="No. of customers"
                            className="p-2.5 md:p-3.5 rounded-lg md:rounded-2xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:text-white text-sm transition-all placeholder:text-[11px] md:placeholder:text-[14px]"
                        />
                    </div>

                    {/* Expiry Date */}
                    <div className='flex flex-col gap-1.5 md:gap-2'>
                        <label className='text-[13px] md:text-sm font-semibold text-slate-600 dark:text-slate-400 ml-1'>
                            Expiry Date
                        </label>
                        <input
                            type="date"
                            // placeholder="No. of customers"
                            className="p-2.5 md:p-3.5 rounded-lg md:rounded-2xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:text-white text-sm transition-all placeholder:text-[11px] md:placeholder:text-[14px] text-gray-500"
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className='col-span-full flex flex-col sm:flex-row items-center justify-end gap-3 mt-4 md:mt-6 pt-6 border-t border-slate-50 dark:border-slate-800'>
                        <button
                            type="button"
                            onClick={() => setCurrentPage('Promotions')}
                            className='w-full sm:w-auto px-6 py-2.5 rounded-xl text-sm font-bold text-slate-500 hover:text-pink-500 hover:bg-pink-100 transition-all active:scale-95 cursor-pointer'
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className='w-full sm:w-auto md:px-10 py-2.5 rounded-xl text-sm font-bold text-white bg-linear-to-br from-pink-500 to-pink-600 shadow-lg shadow-pink-100 hover:shadow-pink-200 transition-all active:scale-95 cursor-pointer'
                        >
                            Create Offer
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AddCoupon;