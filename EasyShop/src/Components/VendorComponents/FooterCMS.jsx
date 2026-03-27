
import React from 'react'

function FooterCMS() {
  return (
    <div className='bg-slate-50/50 p-4 md:p-8'>

      {/* Header - Purple/Indigo theme for Footer section */}
      <div className='max-w-4xl mx-auto p-4 md:p-8 bg-linear-to-br from-pink-500 to-pink-600 rounded-t-xl md:rounded-t-3xl relative overflow-hidden'>
        <div className='absolute -top-10 -right-10 h-32 w-32 bg-white/10 rounded-full blur-2xl'></div>
        <div className='absolute -bottom-10 -left-10 h-24 w-24 bg-white/10 rounded-full blur-xl'></div>

        <div className='relative z-10 text-center md:text-start'>
          <h1 className='text-xl md:text-2xl font-bold text-white mb-1'>
            Footer Information
          </h1>
          <p className='text-indigo-50 text-xs font-medium opacity-90'>
            Manage your shop's contact details and social media links.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className='max-w-4xl mx-auto bg-white dark:bg-slate-900 p-5 md:p-8 rounded-b-xl md:rounded-b-3xl shadow-sm border border-indigo-50 dark:border-slate-800'>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>

          {/* Email Address */}
          <div className='flex flex-col gap-1.5 md:gap-2'>
            <label className='text-[13px] md:text-sm font-semibold text-slate-600 dark:text-slate-400 ml-1'>
              Support Email
            </label>
            <input
              type="email"
              placeholder="e.g. support@store.com"
              className="p-2.5 md:p-3.5 rounded-lg md:rounded-2xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:text-white text-sm transition-all placeholder:text-[11px] md:placeholder:text-[14px]"
            />
          </div>

          {/* Phone Number */}
          <div className='flex flex-col gap-1.5 md:gap-2'>
            <label className='text-[13px] md:text-sm font-semibold text-slate-600 dark:text-slate-400 ml-1'>
              Contact Number
            </label>
            <input
              type="text"
              placeholder="e.g. +91 9990543210"
              className="p-2.5 md:p-3.5 rounded-lg md:rounded-2xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:text-white text-sm transition-all placeholder:text-[11px] md:placeholder:text-[14px]"
            />
          </div>

          {/* Phone Number */}
          <div className='flex flex-col gap-1.5 md:gap-2'>
            <label className='text-[13px] md:text-sm font-semibold text-slate-600 dark:text-slate-400 ml-1'>
              Copyright Text
            </label>
            <input
              type="text"
              placeholder="e.g. © 2026 Your Shop. All Rights Reserved."
              className="p-2.5 md:p-3.5 rounded-lg md:rounded-2xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:text-white text-sm transition-all placeholder:text-[11px] md:placeholder:text-[14px] truncate"
            />
          </div>

          {/* about shop */}
          <div className='flex flex-col gap-1.5 md:gap-2 col-span-full'>
            <label className='text-[13px] md:text-sm font-semibold text-slate-600 dark:text-slate-400 ml-1'>
              About Shop
            </label>
            <textarea
              rows="3"
              placeholder="Enter about your shop..."
              className="p-3 md:p-4 rounded-lg md:rounded-2xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:text-white text-sm transition-all resize-none placeholder:text-[11px] md:placeholder:text-[14px]" />
          </div>

          {/* Office Address */}
          <div className='flex flex-col gap-1.5 md:gap-2 col-span-full'>
            <label className='text-[13px] md:text-sm font-semibold text-slate-600 dark:text-slate-400 ml-1'>
              Office Address
            </label>
            <textarea
              rows="3"
              placeholder="Enter your complete business address..."
              className="p-3 md:p-4 rounded-lg md:rounded-2xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:text-white text-sm transition-all resize-none placeholder:text-[11px] md:placeholder:text-[14px]" />
          </div>

          {/* Social Links Divider */}
          <div className='col-span-full mt-4'>
            <h3 className='text-sm font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2'>Social Media Links</h3>
          </div>

          {/* Facebook Link */}
          <div className='flex flex-col gap-1.5 md:gap-2'>
            <label className='text-[13px] md:text-sm font-semibold text-slate-600 dark:text-slate-400 ml-1'>
              Facebook URL
            </label>
            <input
              type="text"
              placeholder="https://facebook.com/yourshop"
             className="p-2.5 md:p-3.5 rounded-lg md:rounded-2xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:text-white text-sm transition-all placeholder:text-[11px] md:placeholder:text-[14px]"
            />
          </div>

          {/* Instagram Link */}
          <div className='flex flex-col gap-1.5 md:gap-2'>
            <label className='text-[13px] md:text-sm font-semibold text-slate-600 dark:text-slate-400 ml-1'>
              Instagram URL
            </label>
            <input
              type="text"
              placeholder="https://instagram.com/yourshop"
              className="p-2.5 md:p-3.5 rounded-lg md:rounded-2xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:text-white text-sm transition-all placeholder:text-[11px] md:placeholder:text-[14px]"
            />
          </div>

          {/* whatsapp */}
          <div className='flex flex-col gap-1.5 md:gap-2'>
            <label className='text-[13px] md:text-sm font-semibold text-slate-600 dark:text-slate-400 ml-1'>
              WhatsApp Number
            </label>
            <input
              type="text"
              placeholder="e.g. +91 987654328890"
              className="p-2.5 md:p-3.5 rounded-lg md:rounded-2xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:text-white text-sm transition-all placeholder:text-[11px] md:placeholder:text-[14px]"
            />
          </div>

          {/* Action Buttons */}
          <div className='col-span-full flex flex-col sm:flex-row items-center justify-end mt-4 md:mt-6 pt-6 border-t border-slate-50 dark:border-slate-800'>
            <button
              type="button"
              className='w-full sm:w-auto md:px-10 py-2.5 rounded-xl text-sm font-bold text-white bg-linear-to-br from-pink-500 to-pink-600 shadow-lg shadow-pink-100 hover:shadow-pink-200 transition-all active:scale-95 cursor-pointer'
            >
              Save Footer Detail
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default FooterCMS;