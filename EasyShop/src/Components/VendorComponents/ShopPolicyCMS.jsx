
import React from 'react'

function ShopPolicyCMS() {
  return (
    <div className='bg-slate-50/50 p-4 md:p-8'>

      {/* Header - Purple/Indigo theme style matching FooterCMS */}
      <div className='max-w-4xl mx-auto p-4 md:p-8 bg-linear-to-br from-pink-500 to-pink-600 rounded-t-xl md:rounded-t-3xl relative overflow-hidden'>
        <div className='absolute -top-10 -right-10 h-32 w-32 bg-white/10 rounded-full blur-2xl'></div>
        <div className='absolute -bottom-10 -left-10 h-24 w-24 bg-white/10 rounded-full blur-xl'></div>

        <div className='relative z-10 text-center md:text-start'>
          <h1 className='text-xl md:text-2xl font-bold text-white mb-1'>
            Shop Policy Configuration
          </h1>
          <p className='text-pink-50 text-xs font-medium opacity-90'>
            Define your warranty, installation terms, and refund policies.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className='max-w-4xl mx-auto bg-white dark:bg-slate-900 p-5 md:p-8 rounded-b-xl md:rounded-b-3xl shadow-sm border border-pink-50 dark:border-slate-800'>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>

          {/* Warranty Policy */}
          <div className='flex flex-col gap-1.5 md:gap-2 col-span-full'>
            <label className='text-[13px] md:text-sm font-semibold text-slate-600 dark:text-slate-400 ml-1'>
              Warranty & Service Policy
            </label>
            <textarea
              rows="4"
              placeholder="e.g. 25 years warranty on solar panels and 5 years on inverter..."
              className="p-3 md:p-4 rounded-lg md:rounded-2xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:text-white text-sm transition-all resize-none placeholder:text-[11px] md:placeholder:text-[14px]" />
          </div>

          {/* Installation Terms */}
          <div className='flex flex-col gap-1.5 md:gap-2 col-span-full'>
            <label className='text-[13px] md:text-sm font-semibold text-slate-600 dark:text-slate-400 ml-1'>
              Installation & Delivery Terms
            </label>
            <textarea
              rows="4"
              placeholder="e.g. Installation will be completed within 7-10 working days..."
              className="p-3 md:p-4 rounded-lg md:rounded-2xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:text-white text-sm transition-all resize-none placeholder:text-[11px] md:placeholder:text-[14px]" />
          </div>

          {/* Refund Policy */}
          <div className='flex flex-col gap-1.5 md:gap-2 col-span-full'>
            <label className='text-[13px] md:text-sm font-semibold text-slate-600 dark:text-slate-400 ml-1'>
              Refund & Cancellation Policy
            </label>
            <textarea
              rows="3"
              placeholder="Enter your refund conditions..."
              className="p-3 md:p-4 rounded-lg md:rounded-2xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:text-white text-sm transition-all resize-none placeholder:text-[11px] md:placeholder:text-[14px]" />
          </div>

          {/* Privacy Policy Link - Optional but good for CMS */}
          <div className='flex flex-col gap-1.5 md:gap-2'>
            <label className='text-[13px] md:text-sm font-semibold text-slate-600 dark:text-slate-400 ml-1'>
              Privacy Policy URL
            </label>
            <input
              type="text"
              placeholder="https://yourshop.com/privacy-policy"
              className="p-2.5 md:p-3.5 rounded-lg md:rounded-2xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:text-white text-sm transition-all placeholder:text-[11px] md:placeholder:text-[14px]"
            />
          </div>

          {/* Shipping Policy Link */}
          <div className='flex flex-col gap-1.5 md:gap-2'>
            <label className='text-[13px] md:text-sm font-semibold text-slate-600 dark:text-slate-400 ml-1'>
              Shipping Policy URL
            </label>
            <input
              type="text"
              placeholder="https://yourshop.com/shipping-policy"
              className="p-2.5 md:p-3.5 rounded-lg md:rounded-2xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:text-white text-sm transition-all placeholder:text-[11px] md:placeholder:text-[14px]"
            />
          </div>

          {/* Action Buttons */}
          <div className='col-span-full flex flex-col sm:flex-row items-center justify-end mt-4 md:mt-6 pt-6 border-t border-slate-50 dark:border-slate-800'>
            <button
              type="button"
              className='w-full sm:w-auto md:px-10 py-2.5 rounded-xl text-sm font-bold text-white bg-linear-to-br from-pink-500 to-pink-600 shadow-lg shadow-pink-100 hover:shadow-pink-200 transition-all active:scale-95 cursor-pointer'
            >
              Save Policy Details
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ShopPolicyCMS;