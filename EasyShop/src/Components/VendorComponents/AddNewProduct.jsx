
import React from 'react';
import { useEffect, useState } from 'react'
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { HiOutlineCloudUpload, HiOutlineX, HiOutlinePhotograph } from "react-icons/hi";

const commonFields = [
    { id: "productName", label: "Product Title", type: "text", placeholder: "Name" },
    { id: "price", label: "Selling Price (₹)", type: "text", placeholder: "0.00" },
    { id: "mrp", label: "MRP (₹)", type: "text", placeholder: "0.00" },
    { id: "quantity", label: "Quantity", type: "text", placeholder: "e.g. 40" },
    { id: "sku", label: "SKU (Stock Keeping Unit)", type: "text", placeholder: "e.g., SKU-1029 " },
    { id: "description", label: "Description", type: "textarea", placeholder: "Product Description" },
];

const categoryMenu = [
    {
        id: 1,
        categoryName: "Clothing & Apparel",
        subCategories: ["Men's Wear", "Women's Wear", "Kids Wear", "Winter Collection", "Ethnic Wear"],
        extraFields: [
            { id: "size", label: "Available Sizes", type: "multi-select", options: ["S", "M", "L", "XL", "XXL"] },
            { id: "fabric", label: "Fabric Material", type: "text", placeholder: "e.g. Cotton, Silk" },
            { id: "color", label: "Product Color", type: "text", placeholder: "e.g. Black, Blue" },
        ]
    },
    {
        id: 2,
        categoryName: "Electronics & Gadgets",
        subCategories: ["Smartphones", "Laptops", "Audio & Headphones", "Smart Watches", "Accessories"],
        extraFields: [
            { id: "brand", label: "Brand Name", type: "text", placeholder: "e.g. Sony, Apple" },
            { id: "warranty", label: "Warranty (Months)", type: "number", placeholder: "e.g. 12" },
            { id: "model", label: "Model Number", type: "text", placeholder: "e.g. WH-1000XM4" }
        ]
    },
    {
        id: 3,
        categoryName: "Footwear & Shoes",
        subCategories: ["Running Shoes", "Formal Shoes", "Casual Sneakers", "Sandals & Floaters", "Sports Wear"],
        extraFields: [
            { id: "shoeSize", label: "Shoe Size (UK/US)", type: "multi-select", options: ["7", "8", "9", "10", "11"] },
            { id: "material", label: "Sole Material", type: "text", placeholder: "e.g. Rubber, Leather" }
        ]
    }
];

const stockStatus = [
    { id: 1, status: "In Stock" },
    { id: 2, status: "Out of Stock" },
    { id: 1, status: "Low Stock" },
];

function AddNewProduct({ setCurrentPage }) {

    const [isOpen, setIsOpen] = useState(false);
    const [isSubCatOpen, setIsSubCatOpen] = useState(false);
    const [isStockOpen, setIsStockOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const [selectedStock, setSelectedStock] = useState(null);
    const [mainImage, setMainImage] = useState(null);
    const [mainImagePreview, setMainImagePreview] = useState("");
    const [galleryImages, setGalleryImages] = useState([]);
    const MAX_GALLERY_IMAGES = 4;

    const handleCategory = (cat) => {
        setSelectedCategory(cat);
        setSelectedSubCategory(null);
        setIsOpen(false);
    };

    const handleSubCategory = (subCat) => {
        setSelectedSubCategory(subCat);
        setIsSubCatOpen(false);
    };

    const handleStockStatus = (stock) => {
        setSelectedStock(stock);
        setIsStockOpen(false);
    }

    // --- Main Image Handler ---
    const handleMainImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setMainImage(file);
            // Preview create karein
            const reader = new FileReader();
            reader.onloadend = () => {
                setMainImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // --- Gallery Images Handler ---
    const handleGalleryImageChange = (e) => {
        const files = Array.from(e.target.files);

        // Check max images limit
        if (galleryImages.length + files.length > MAX_GALLERY_IMAGES) {
            alert(`You can only upload up to ${MAX_GALLERY_IMAGES} gallery images.`);
            return;
        }

        files.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                // Previews aur files ko single array of objects mein store karein smooth deletion ke liye
                setGalleryImages(prev => [...prev, { file, preview: reader.result }]);
            };
            reader.readAsDataURL(file);
        });
    };

    // --- Remove Images ---
    const removeMainImage = () => {
        setMainImage(null);
        setMainImagePreview("");
    };

    const removeGalleryImage = (index) => {
        setGalleryImages(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <div className='min-h-screen bg-slate-50/50 p-4 md:p-8'>

            {/* Header */}
            <div className='max-w-4xl mx-auto p-4 md:p-8 bg-linear-to-br from-pink-500 to-pink-600 rounded-t-xl md:rounded-t-3xl relative overflow-hidden'>
                {/* Decorative Circles */}
                <div className='absolute -top-10 -right-10 h-32 w-32 bg-white/10 rounded-full blur-2xl'></div>
                <div className='absolute -bottom-10 -left-10 h-24 w-24 bg-white/10 rounded-full blur-xl'></div>

                <div className='relative z-10 text-center md:text-start'>
                    <h1 className='text-xl md:text-2xl font-bold text-white mb-1'>Product Inventory Portal</h1>
                    <p className='text-pink-50 text-xs font-medium opacity-90'>
                        Complete the form below to showcase your product to millions.
                    </p>
                </div>
            </div>

            {/* Form Container */}
            <div className='max-w-4xl mx-auto bg-white dark:bg-slate-900 p-5 md:p-8 rounded-b-xl md:rounded-b-3xl shadow-sm border border-pink-50 dark:border-slate-800'>

                {/* Category Selector */}
                <div className='mb-6 md:mb-8'>
                    <label className='ml-1 text-[12px] md:text-sm font-semibold text-slate-600 dark:text-slate-400 mb-1.5 md:mb-2 block'>
                        Select Category
                    </label>

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={`w-full bg-slate-50 dark:bg-slate-800 px-4 md:px-5 py-3 md:py-3.5 rounded-xl md:rounded-2xl flex justify-between items-center transition-all border text-sm md:text-base
                         ${isOpen ? 'border-pink-400 ring-2 ring-pink-50' : 'border-transparent hover:border-pink-200'}`}
                    >
                        <span className={`${selectedCategory ? 'text-slate-800 dark:text-white font-medium' : 'text-slate-400'} text-[11px] md:text-[14px]  truncate mr-2`}>
                            {selectedCategory ? selectedCategory.categoryName : 'Choose your category...'}
                        </span>

                        <div className="shrink-0">
                            {isOpen ? <IoIosArrowUp className='text-pink-500' /> : <IoIosArrowDown className='text-slate-400' />}
                        </div>
                    </button>

                    {/* Dropdown Menu */}
                    {isOpen && (
                        <div className='w-full mt-2 bg-white dark:bg-slate-800 rounded-b-xl md:rounded-b-2xl shadow-lg border border-pink-50 dark:border-slate-700 py-2 overflow-hidden animate-in fade-in zoom-in duration-200'>
                            {/* Max height aur scroll add kiya hai taaki mobile par lambi list screen se bahar na jaye */}
                            <div className='max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700'>
                                {categoryMenu.map((item) => (
                                    <div
                                        key={item.id}
                                        onClick={() => handleCategory(item)}
                                        className='px-4 md:px-5 py-3 hover:bg-pink-50 dark:hover:bg-slate-700 cursor-pointer text-slate-700 dark:text-slate-300 hover:text-pink-600 font-medium transition-colors text-[11px] md:text-[14px] border-b border-slate-50 dark:border-slate-700 last:border-none'
                                    >
                                        {item.categoryName}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Sub-Category Selector */}
                <div className='mb-6 md:mb-8'>
                    <label className='ml-1 text-[12px] md:text-sm font-semibold text-slate-600 dark:text-slate-400 mb-1.5 md:mb-2 block'>
                        Select Sub-Category
                    </label>

                    <button
                        onClick={() => setIsSubCatOpen(!isSubCatOpen)}
                        className={`w-full bg-slate-50 dark:bg-slate-800 px-4 md:px-5 py-3 md:py-3.5 rounded-xl md:rounded-2xl flex justify-between items-center transition-all border text-sm md:text-base
                         ${isSubCatOpen ? 'border-pink-400 ring-2 ring-pink-50' : 'border-transparent hover:border-pink-200 '}`}
                    >
                        <span className={`${selectedSubCategory ? 'text-slate-800 dark:text-white font-medium' : 'text-slate-400'} text-[11px] md:text-[14px]  truncate mr-2`}>
                            {selectedSubCategory ? selectedSubCategory : 'Choose your category...'}
                        </span>

                        <div className="shrink-0">
                            {isSubCatOpen ? <IoIosArrowUp className='text-pink-500' /> : <IoIosArrowDown className='text-slate-400' />}
                        </div>
                    </button>

                    {/* Dropdown Menu */}
                    {isSubCatOpen && selectedCategory && (
                        <div className='w-full mt-2 dark:bg-slate-800 rounded-b-xl md:rounded-b-2xl shadow-lg border border-pink-50 dark:border-slate-700 py-2 overflow-hidden animate-in fade-in zoom-in duration-200'>
                            {/* Max height aur scroll add kiya hai taaki mobile par lambi list screen se bahar na jaye */}
                            <div className='max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700'>
                                {selectedCategory?.subCategories.map((item, index) => (
                                    <div
                                        key={index}
                                        onClick={() => handleSubCategory(item)}
                                        className='px-4 md:px-5 py-3 hover:bg-pink-50 dark:hover:bg-slate-700 cursor-pointer text-slate-700 dark:text-slate-300 hover:text-pink-600 font-medium transition-colors text-[11px] md:text-[14px] border-b border-slate-50 dark:border-slate-700 last:border-none'
                                    >
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* common categories */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-6">

                    {/*Header */}
                    <div className='md:col-span-2 border-b border-pink-50 dark:border-slate-800 pb-3 mb-4 mt-2'>
                        <div className='flex items-center gap-2'>
                            {/* indicator dot on mobile */}
                            <span className='h-1.5 w-1.5 rounded-full bg-pink-500 md:hidden'></span>

                            <h3 className='text-pink-500 font-bold text-[10px] md:text-xs uppercase tracking-[0.15em] md:tracking-widest truncate'>
                                {selectedCategory?.categoryName} Specifications
                            </h3>
                        </div>

                        {/* Optional: Mobile par ek choti helper line */}
                        <p className='text-[10px] text-slate-400 mt-1 md:hidden'>
                            Please fill the required details below
                        </p>
                    </div>

                    {commonFields.map((field, index) => (
                        <div
                            key={index}
                            className={`${field.type === 'textarea' ? 'md:col-span-2' : ''} flex flex-col gap-1.5 md:gap-2`}>

                            <label className="text-[12px] md:text-sm ml-1 font-semibold text-slate-600 dark:text-slate-400">
                                {field.label}
                            </label>

                            {field.type === 'textarea' ? (
                                <textarea
                                    rows="4"
                                    placeholder={field.placeholder}
                                    className="p-2.5 md:p-4 rounded-lg md:rounded-2xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:text-white text-sm transition-all resize-none placeholder:text-[11px] md:placeholder:text-[14px]" />
                            ) : (
                                <input
                                    type={field.type}
                                    placeholder={field.placeholder}
                                    className="p-2.5 md:p-3.5 rounded-lg md:rounded-2xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:text-white text-sm transition-all placeholder:text-[11px] md:placeholder:text-[14px]" />
                            )}
                        </div>
                    ))}

                    {/* stock Selector */}
                    <div className=''>
                        <label className='ml-1 text-[12px] md:text-sm font-semibold text-slate-600 dark:text-slate-400 mb-1.5 md:mb-2 block'>
                            Stock Status
                        </label>

                        <button
                            onClick={() => setIsStockOpen(!isStockOpen)}
                            className={`w-full bg-slate-50 dark:bg-slate-800 px-4 md:px-5 py-3 md:py-3.5 rounded-xl md:rounded-2xl flex justify-between items-center transition-all border text-sm md:text-base
                         ${isStockOpen ? 'border-pink-400 ring-2 ring-pink-50' : 'border-transparent hover:border-pink-200 '}`}
                        >
                            <span className={`${selectedStock ? 'text-slate-900 dark:text-white font-normal' : 'text-slate-500'} text-[11px] md:text-[14px]  truncate mr-2`}>
                                {selectedStock ? selectedStock.status : 'Stock'}
                            </span>

                            <div className="shrink-0">
                                {isStockOpen ? <IoIosArrowUp className='text-pink-500' /> : <IoIosArrowDown className='text-slate-400' />}
                            </div>
                        </button>

                        {/* Dropdown Menu */}
                        {isStockOpen && (
                            <div className='w-full mt-2 dark:bg-slate-800 rounded-b-xl md:rounded-b-2xl shadow-lg border border-pink-50 dark:border-slate-700 py-2 overflow-hidden animate-in fade-in zoom-in duration-200'>
                                {/* Max height aur scroll add kiya hai taaki mobile par lambi list screen se bahar na jaye */}
                                <div className='max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700'>
                                    {stockStatus.map((item, index) => (
                                        <div
                                            key={index}
                                            onClick={() => handleStockStatus(item)}
                                            className='px-4 md:px-5 py-3 hover:bg-pink-50 dark:hover:bg-slate-700 cursor-pointer text-slate-700 dark:text-slate-300 hover:text-pink-600 font-medium transition-colors text-[11px] md:text-[14px] border-b border-slate-50 dark:border-slate-700 last:border-none'
                                        >
                                            {item.status}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Dynamic category's Section */}
                {selectedCategory && (
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-10 animate-in slide-in-from-top-4 duration-500'>

                        {selectedCategory.extraFields.map((field, index) => (
                            <div
                                key={index}
                                className='flex flex-col gap-1.5 md:gap-2'>

                                <label className='text-[13px] md:text-sm ml-1 font-semibold text-slate-600 dark:text-slate-400'>
                                    {field.label}
                                </label>

                                {field.type === "text" || field.type === "number" ? (
                                    <input
                                        type={field.type}
                                        placeholder={field.placeholder}
                                        className="p-2.5 md:p-3.5 rounded-lg md:rounded-2xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:text-white text-sm transition-all placeholder:text-[11px] md:placeholder:text-[14px]"
                                    />
                                ) : field.type === "multi-select" ? (
                                    <div className="flex flex-wrap gap-2 mt-1">
                                        {field.options.map(opt => (
                                            <button
                                                key={opt}
                                                type="button"
                                                className="px-3 md:px-4 py-2 rounded-lg md:rounded-xl border border-pink-100 dark:border-slate-700 text-[11px] md:text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-pink-500 hover:text-white transition-all active:scale-95 shadow-sm"
                                            >
                                                {opt}
                                            </button>
                                        ))}
                                    </div>

                                ) : null}
                            </div>
                        ))}
                    </div>
                )}

                {/*upload image section */}
                <div className="bg-white dark:bg-slate-900">

                    <h2 className="text-lg md:text-xl font-bold text-slate-800 dark:text-white mb-4 md:mb-6">
                        Product Media
                    </h2>

                    <div className="space-y-6 md:space-y-8">

                        {/* --- Main Product Image --- */}
                        <div className="flex flex-col gap-3">

                            <label className="text-xs md:text-sm font-semibold text-slate-600 dark:text-slate-400">
                                Main Product Image <span className="text-pink-500">(Required)</span>
                            </label>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-start">

                                {/* Upload image */}
                                <div className="relative h-45 md:h-52 border-2 border-dashed border-pink-100 dark:border-slate-700 rounded-2xl md:rounded-4xl flex flex-col items-center justify-center bg-pink-50/10 hover:bg-pink-50/30 transition-all cursor-pointer group">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleMainImageChange}
                                        className="absolute inset-0 opacity-0 z-10 cursor-pointer" />

                                    <div className="flex flex-col items-center group-hover:scale-105 transition-transform">
                                        <HiOutlinePhotograph className="text-4xl text-pink-400 mb-2" />
                                        <p className="text-xs text-pink-500 font-bold">Upload Main Image</p>
                                        <p className="text-[10px] text-slate-400 mt-1 italic text-center px-4">Best size: 1080x1080px</p>
                                    </div>
                                </div>

                                {/* Preview Box */}
                                {mainImagePreview && (
                                    <div className="relative h-45 md:h-52 rounded-2xl md:rounded-4xl overflow-hidden border border-pink-100 dark:border-slate-800 shadow-sm group animate-in fade-in zoom-in duration-300">

                                        <img
                                            src={mainImagePreview}
                                            alt="Main Preview"
                                            className="w-full h-full object-cover" />

                                        <button
                                            type="button"
                                            onClick={removeMainImage}
                                            className="absolute top-3 right-3 bg-white/90 dark:bg-slate-800/90 p-1.5 rounded-full text-pink-500 shadow-md md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                                            <HiOutlineX size={16} />
                                        </button>
                                        <span className="absolute bottom-3 left-3 bg-pink-500 text-white text-[8px] px-2 py-0.5 rounded-full font-bold shadow-lg">Primary</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Gallery Images */}
                        <div className="flex flex-col gap-3">

                            {/* heading */}
                            <div className="flex justify-between items-center mb-1">

                                <label className="text-xs md:text-sm font-semibold text-slate-600 dark:text-slate-400">
                                    Additional Gallery Images
                                </label>

                                <span className="text-[10px] md:text-xs text-center font-medium text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">
                                    {galleryImages.length} / {MAX_GALLERY_IMAGES} slots
                                </span>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3 md:gap-4">

                                {/* Gallery Upload Box */}
                                <div className={`aspect-square border-2 border-dashed border-pink-100 dark:border-slate-700 rounded-2xl flex flex-col items-center justify-center bg-pink-50/10 hover:bg-pink-50/30 transition-all relative 
                                    ${galleryImages.length >= MAX_GALLERY_IMAGES ? 'hidden' : 'flex'}`}>

                                    <input
                                        type="file"
                                        multiple accept="image/*"
                                        onChange={handleGalleryImageChange}
                                        disabled={galleryImages.length >= MAX_GALLERY_IMAGES}
                                        className="absolute inset-0 opacity-0 cursor-pointer z-10" />

                                    <HiOutlineCloudUpload className="text-3xl text-pink-400 mb-1" />
                                    <p className="text-[10px] text-pink-500 font-bold">Add Images</p>
                                </div>

                                {/* Gallery Previews */}
                                {galleryImages.map((img, i) => (
                                    <div
                                        key={i}
                                        className="relative aspect-square rounded-2xl overflow-hidden border border-pink-50 dark:border-slate-800 shadow-sm group animate-in fade-in duration-300">
                                        <img
                                            src={img.preview}
                                            alt={`Gallery Preview ${i + 1}`}
                                            className="w-full h-full object-cover" />

                                        <button
                                            type="button"
                                            onClick={() => removeGalleryImage(i)}
                                            className="absolute top-1.5 right-1.5 bg-white/90 dark:bg-slate-800/90 p-1 rounded-full text-red-500 shadow-sm md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                                            <HiOutlineX size={12} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>

                {/* Action Buttons */}
                <div className='col-span-full flex flex-col sm:flex-row items-center justify-end gap-3 mt-4 md:mt-6 pt-6 border-t border-slate-50 dark:border-slate-800'>
                    <button
                        type="button"
                        onClick={() => setCurrentPage('All Products')}
                        className='w-full sm:w-auto px-6 py-2.5 rounded-xl text-sm font-bold text-slate-500 hover:text-pink-500 hover:bg-pink-100 transition-all active:scale-95 cursor-pointer'
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        className='w-full sm:w-auto md:px-10 py-2.5 rounded-xl text-sm font-bold text-white bg-linear-to-br from-pink-500 to-pink-600 shadow-lg shadow-pink-100 hover:shadow-pink-200 transition-all active:scale-95 cursor-pointer'
                    >
                        Publish Product
                    </button>
                </div>
            </div>

        </div>
    );
}

export default AddNewProduct;