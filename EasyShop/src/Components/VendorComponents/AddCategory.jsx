
import React, { useState } from 'react';
import { HiOutlineX, HiOutlinePhotograph } from "react-icons/hi";

function AddCategory({ setCurrentPage }) {

  const [catImage, setCatImage] = useState(null);
  const [catImagePreview, setCatImagePreview] = useState("");

  // --- Main Image Handler ---
  const handleCatImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCatImage(file);
      // Preview create karein
      const reader = new FileReader();
      reader.onloadend = () => {
        setCatImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // --- Remove Images ---
  const removeCatImage = () => {
    setCatImage(null);
    setCatImagePreview("");
  };

  return (
    <div className='bg-slate-50/50 p-4 md:p-8'>

      {/* Header */}
      <div className='max-w-4xl mx-auto p-4 md:p-8 bg-linear-to-br from-pink-500 to-pink-600 rounded-t-xl md:rounded-t-3xl relative overflow-hidden'>
        <div className='absolute -top-10 -right-10 h-32 w-32 bg-white/10 rounded-full blur-2xl'></div>
        <div className='absolute -bottom-10 -left-10 h-24 w-24 bg-white/10 rounded-full blur-xl'></div>

        <div className='relative z-10 text-center md:text-start'>
          <h1 className='text-xl md:text-2xl font-bold text-white mb-1'>New Category Portal</h1>
          <p className='text-pink-50 text-xs font-medium opacity-90'>
            Quickly set up a new category for your inventory.
          </p>
        </div>
      </div>

      {/* Form Container */}
      <div className='max-w-4xl mx-auto bg-white dark:bg-slate-900 p-5 md:p-8 rounded-b-xl md:rounded-b-3xl shadow-sm border border-pink-50 dark:border-slate-800'>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 '>

          {/* Category Name */}
          <div className='flex flex-col gap-1.5 md:gap-2'>
            <label className='text-[13px] md:text-sm font-semibold text-slate-600 dark:text-slate-400 ml-1'>
              Category Name
            </label>
            <input
              type="text"
              placeholder="e.g. Watch"
              className="p-2.5 md:p-3.5 rounded-lg md:rounded-2xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:text-white text-sm transition-all placeholder:text-[11px] md:placeholder:text-[14px]"
            />
          </div>

          {/* Department */}
          <div className='flex flex-col gap-1.5 md:gap-2'>
            <label className='text-[13px] md:text-sm font-semibold text-slate-600 dark:text-slate-400 ml-1'>
              Department
            </label>
            <input
              type="text"
              placeholder="e.g. Accessories"
              className="p-2.5 md:p-3.5 rounded-lg md:rounded-2xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:text-white text-sm transition-all placeholder:text-[11px] md:placeholder:text-[14px]"
            />
          </div>

          {/* Image Section - col-span-full isse ye poori width lega */}
          <div className="flex flex-col gap-3 col-span-full mt-2">
            <label className="text-xs md:text-sm font-semibold text-slate-600 dark:text-slate-400 ml-1">
              Category Image <span className="text-pink-500">(Required)</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-start">

              {/* Upload Box */}
              <div className="relative h-35 md:h-44 border-2 border-dashed border-pink-100 dark:border-slate-700 rounded-2xl flex flex-col items-center justify-center bg-pink-50/10 hover:bg-pink-50/30 transition-all cursor-pointer group">

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCatImageChange}
                  className="absolute inset-0 opacity-0 z-10 cursor-pointer" />

                <HiOutlinePhotograph className="text-3xl text-pink-400 mb-2" />
                <p className="text-xs text-pink-500 font-bold">Upload Image</p>
              </div>

              {/* Preview Box */}
              {catImagePreview && (
                <div className="relative h-35 md:h-44 rounded-2xl overflow-hidden border border-pink-100 shadow-sm animate-in zoom-in duration-300">
                  <img
                    src={catImagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover" />

                  <button
                    onClick={removeCatImage}
                    className="absolute top-2 right-2 bg-white p-1.5 rounded-full text-pink-500 shadow-md">
                    <HiOutlineX size={14} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* description */}
          <div className='flex flex-col gap-1.5 md:gap-2 col-span-full mt-2'>
            <label className='text-[13px] md:text-sm font-semibold text-slate-600 dark:text-slate-400 ml-1'>
              Description
            </label>
            <textarea
              rows="4"
              placeholder="Briefly describe this category..."
              className="p-3 md:p-4 rounded-lg md:rounded-2xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:text-white text-sm transition-all resize-none placeholder:text-[11px] md:placeholder:text-[14px]" />
          </div>

          {/* Action Buttons */}
          <div className='col-span-full flex flex-col sm:flex-row items-center justify-end gap-3 mt-4 md:mt-6 pt-6 border-t border-slate-50 dark:border-slate-800'>
            <button
              type="button"
              onClick={() => setCurrentPage('Categories')}
              className='w-full sm:w-auto px-6 py-2.5 rounded-xl text-sm font-bold text-slate-500 hover:text-pink-500 hover:bg-pink-100 transition-all active:scale-95 cursor-pointer'
            >
              Cancel
            </button>
            <button
              type="button"
              className='w-full sm:w-auto md:px-10 py-2.5 rounded-xl text-sm font-bold text-white bg-linear-to-br from-pink-500 to-pink-600 shadow-lg shadow-pink-100 hover:shadow-pink-200 transition-all active:scale-95 cursor-pointer'
            >
              Save Category
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default AddCategory;