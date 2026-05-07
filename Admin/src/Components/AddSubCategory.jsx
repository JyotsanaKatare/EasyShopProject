
import React, { useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { HiOutlineX, HiOutlinePhotograph } from "react-icons/hi";

import toast from 'react-hot-toast';

import { useCatList } from '../hooks/useCategories';
import { useAddSubCategory } from '../hooks/useSubCategories';

function AddSubCategory({ setCurrentPage }) {

  const { data: catList, isLoading, isError } = useCatList();
  const { mutate: addSubCategory, isPending: isAdding } = useAddSubCategory();

  const [selectedCatImage, setSelectedCatImage] = useState(null);
  const [catImagePreview, setCatImagePreview] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [formData, setFormData] = useState({
    subCatName: "",
    description: "",
    allowedAttributes: ""
  });

  const handleCategory = (cat) => {
    setSelectedCategory(cat);
    setIsOpen(false);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {

    if (!selectedCategory) {
      return toast.error("Please select a Category");
    }

    if (!formData.subCatName || !formData.description || !formData.allowedAttributes) {
      return toast.error("All fields are required");
    }

    const data = new FormData();
    data.append("catId", selectedCategory._id);
    data.append("subCatName", formData.subCatName);
    data.append("description", formData.description);

    const attributesArray = formData.allowedAttributes
      .split(",")
      .map((attr) => ({ name: attr.trim() }))
      .filter((attr) => attr !== ""); // Empty values remove karne ke liye

    data.append("allowedAttributes", JSON.stringify(attributesArray));

    if (selectedCatImage) {
      data.append("subCatImage", selectedCatImage);
    }

    addSubCategory({ catId: selectedCategory._id, formData: data }, {
      onSuccess: (res) => {
        toast.success(res.message || "Sub Category added successfully");
        setSelectedCategory(null);
        setFormData({
          subCatName: "",
          description: "",
          allowedAttributes: "",
        });
        removeCatImage();
        setCurrentPage("sub-categories");
      },
      onError: (err) => {
        toast.error(err.response?.data?.message || "Failed to add Sub Category");
      }
    })
  };

  // --- Main Image Handler ---
  const handleCatImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedCatImage(file);
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
    setSelectedCatImage(null);
    setCatImagePreview("");
  };

  return (
    <div className='bg-slate-50/50 p-4 md:p-8'>

      {/* Header */}
      <div className='max-w-4xl mx-auto p-4 md:p-8 bg-linear-to-br from-pink-500 to-pink-600 rounded-t-xl md:rounded-t-3xl relative overflow-hidden'>
        <div className='absolute -top-10 -right-10 h-32 w-32 bg-white/10 rounded-full blur-2xl'></div>
        <div className='absolute -bottom-10 -left-10 h-24 w-24 bg-white/10 rounded-full blur-xl'></div>

        <div className='relative z-10 text-center md:text-start'>
          <h1 className='text-xl md:text-2xl font-bold text-white mb-1'>
            New Sub-Category Portal
          </h1>
          <p className='text-pink-50 text-xs font-medium opacity-90'>
            Setup detailed layers for your product catalog.
          </p>
        </div>
      </div>

      {/* Form Container */}
      <div className='max-w-4xl mx-auto bg-white dark:bg-slate-900 p-5 md:p-8 rounded-b-xl md:rounded-b-3xl shadow-sm border border-pink-50 dark:border-slate-800'>

        {/* Category Selector */}
        <div className=' mb-6 md:mb-8'>
          <label
            htmlFor='category'
            className='text-[12px] md:text-sm font-semibold text-slate-600 dark:text-slate-400 mb-1.5 md:mb-2 block'>
            Select Category
          </label>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`w-full bg-slate-50 dark:bg-slate-800 px-4 md:px-5 py-3 md:py-3.5 rounded-xl md:rounded-2xl flex justify-between items-center transition-all border cursor-pointer
             ${isOpen ? 'border-pink-400 ring-2 ring-pink-50' : 'border-transparent hover:border-pink-200'}`}
          >
            <span className={`${selectedCategory ? 'text-slate-800 dark:text-white font-medium' : 'text-slate-400'} text-[11px] md:text-[14px] truncate mr-2`}>
              {selectedCategory ? selectedCategory.catName : 'Choose your category...'}
            </span>

            <div className="shrink-0">
              {isOpen ? <IoIosArrowUp className='text-pink-500' /> : <IoIosArrowDown className='text-slate-400' />}
            </div>
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className='w-full mt-2 bg-white dark:bg-slate-800 rounded-b-xl md:rounded-b-2xl shadow-xl border border-pink-50 dark:border-slate-700 py-2 overflow-hidden animate-in fade-in zoom-in duration-200 cursor-pointer'>
              {/* Max height aur scroll add kiya hai taaki mobile par lambi list screen se bahar na jaye */}
              <div className='max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700'>
                {catList?.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleCategory(item)}
                    className='px-4 md:px-5 py-3 hover:bg-pink-50 dark:hover:bg-slate-700 cursor-pointer text-slate-700 dark:text-slate-300 hover:text-pink-600 font-medium transition-colors text-[11px] md:text-[14px] border-b border-slate-50 dark:border-slate-700 last:border-none'
                  >
                    {item.catName}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* form */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 '>

          {/* Category Name */}
          <div className='flex flex-col gap-1.5 md:gap-2'>
            <label
              htmlFor='subCatName'
              className='text-[13px] md:text-sm font-semibold text-slate-600 dark:text-slate-400 ml-1'>
              Sub-Category Name
            </label>

            <input
              type="text"
              name='subCatName'
              value={formData.subCatName}
              onChange={handleInputChange}
              placeholder="e.g. Watch"
              className="p-2.5 md:p-3.5 rounded-lg md:rounded-2xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:text-white text-sm transition-all placeholder:text-[11px] md:placeholder:text-[14px]"
            />
          </div>

          {/* Allowed Attributes (Naya Field) */}
          <div className='flex flex-col gap-1.5 md:gap-2'>
            <label
              htmlFor='allowedAttributes'
              className='text-[13px] md:text-sm font-semibold text-slate-600 dark:text-slate-400 ml-1'>
              Allowed Attributes <span className="text-[10px] font-normal opacity-70">(Comma separated)</span>
            </label>

            <input
              type="text"
              name='allowedAttributes'
              value={formData.allowedAttributes}
              onChange={handleInputChange}
              placeholder="e.g. Color, Size, RAM, Storage"
              className="p-2.5 md:p-3.5 rounded-lg md:rounded-2xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:text-white text-sm transition-all"
            />
          </div>

          {/* Image Section - col-span-full isse ye poori width lega */}
          <div className="flex flex-col gap-3 col-span-full mt-2">
            <label
              htmlFor='subCatImage'
              className="text-xs md:text-sm font-semibold text-slate-600 dark:text-slate-400 ml-1">
              Sub-Category Image <span className="text-pink-500">(Required)</span>
            </label>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-start">

              {/* Upload Box */}
              <div className="relative h-35 md:h-44 border-2 border-dashed border-pink-100 dark:border-slate-700 rounded-2xl flex flex-col items-center justify-center bg-pink-50/10 hover:bg-pink-50/30 transition-all cursor-pointer group">

                <input
                  type="file"
                  name='subCatImage'
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
            <label
              htmlFor='description'
              className='text-[13px] md:text-sm font-semibold text-slate-600 dark:text-slate-400 ml-1'>
              Description
            </label>

            <textarea
              rows="4"
              name='description'
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe this sub-category..."
              className="p-3 md:p-4 rounded-lg md:rounded-2xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:text-white text-sm transition-all resize-none placeholder:text-[11px] md:placeholder:text-[14px]" />
          </div>

          {/* Action Buttons */}
          <div className='col-span-full flex flex-col sm:flex-row items-center justify-end gap-3 mt-4 md:mt-6 pt-6 border-t border-slate-50 dark:border-slate-800'>
            <button
              type="button"
              onClick={() => setCurrentPage('sub-categories')}
              className='w-full sm:w-auto px-6 py-2.5 rounded-xl text-sm font-bold text-slate-500 hover:text-pink-500 hover:bg-pink-100 transition-all active:scale-95 cursor-pointer'
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleAdd}
              className='w-full sm:w-auto md:px-10 py-2.5 rounded-xl text-sm font-bold text-white bg-linear-to-br from-pink-500 to-pink-600 shadow-lg shadow-pink-100 hover:shadow-pink-200 transition-all active:scale-95 cursor-pointer'
            >
              {isAdding ? "Adding.." : "Add Sub Category"}
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default AddSubCategory;