
import React, { useState } from 'react';
import { TbEdit } from "react-icons/tb";
import { LiaTrashSolid } from "react-icons/lia";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { HiOutlineExclamation, HiOutlineTrash, HiOutlineX } from 'react-icons/hi';

const allProducts = [
    {
        productName: "Floral Cotton Kurti",
        category: "Women Wear",        // Level 2 (Category)
        subCategory: "Cotton Kurti",   // Level 3 (Sub-Category)
        price: "₹2,499",
        quantity: 45,                  // Stock count
        stockStatus: "In Stock",
        status: "Active",
        img: "https://images.unsplash.com/photo-1733395700970-75535f1334ff?w=500&auto=format&fit=crop&q=60"
    },
    {
        productName: "Smart Watch Series 9",
        category: "Watch",
        subCategory: "Smart Watches",
        price: "₹1,200",
        quantity: 5,
        stockStatus: "Low",
        status: "Inactive",
        img: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=872&auto=format&fit=crop"
    },
    {
        productName: "Wireless Bluetooth Earbuds",
        category: "Gadgets",
        subCategory: "Bluetooth Earbuds",
        price: "₹4,500",
        quantity: 0,
        stockStatus: "Out",
        status: "Inactive",
        img: "https://images.unsplash.com/photo-1668649176554-3ad841a780d0?w=500&auto=format&fit=crop&q=60"
    },
];

const stockOptions = [
    { label: 'In Stock', style: 'bg-green-50 text-green-600 border-green-100' },
    { label: 'Low', style: 'bg-amber-50 text-amber-600 border-amber-100' },
    { label: 'Out', style: 'bg-red-50 text-red-600 border-red-100' }
];

const statusOptions = [
    { label: 'Active', style: 'bg-green-50 text-green-600 border-green-100' },
    { label: 'Inactive', style: 'bg-red-50 text-red-600 border-red-100' }
];

function AllProducts({ setCurrentPage }) {
    
    const [statusChange, setStatusChange] = useState(allProducts); //for table

    // edit popup
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [file, setFile] = useState(null);
    const [galleryFiles, setGalleryFiles] = useState([]);
    const [isStockOpen, setIsStockOpen] = useState(false);
    const [selectedStock, setSelectedStock] = useState("Select Stock");
    const [isStatusOpen, setIsStatusOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState("Select Status");
    
    // delete popup
    const [isDeletedOpen, setIsDeletedOpen] = useState(false);

    const toggleStatus = (index) => {
        const updatedProducts = [...statusChange];
        updatedProducts[index].status = updatedProducts[index].status === "Active" ? "Inactive" : "Active";
        setStatusChange(updatedProducts);
    };

    // edit popup
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    // multiple images
    const handleGalleryChange = (e) => {
        const files = Array.from(e.target.files);  //convert FileList to array
        if (files.length > 5) {
            alert("Max 5 files");
            return;
        }
        setGalleryFiles(files);
    };

    const handleStock = (stock) => {
        setSelectedStock(stock);
        setIsStockOpen(false);
    };

    const handleStatus = (status) => {
        setSelectedStatus(status);
        setIsStatusOpen(false);
    }

    return (
        <div className="bg-white dark:bg-slate-900 rounded-xl md:rounded-3xl border border-pink-50 dark:border-slate-800 shadow-sm overflow-hidden">

            {/* Heading with Search & Add Button */}
            <div className="p-4 md:p-6 border-b border-pink-50 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">

                {/* Title */}
                <div>
                    <div className='flex gap-2 items-center'>
                        <h2 className="text-md md:text-lg font-bold text-slate-800 dark:text-white shrink-0">
                            Products Hub
                        </h2>
                        <span className="hidden lg:flex bg-pink-100 text-pink-600 text-xs font-bold px-2.5 py-0.5 rounded-full">
                            24 Total
                        </span>
                    </div>

                    <p className="text-[11px] md:text-xs text-slate-500 mt-1">Manage and organize your products</p>
                </div>

                {/* Search & Button Group */}
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full sm:w-64 text-sm px-2 md:px-4 py-2 md:py-2.5 rounded-xl border border-pink-50 bg-slate-50 dark:bg-slate-800 focus:outline-pink-400 focus:bg-white transition-all shadow-sm placeholder:text-xs md:placeholder:text-[13px]"
                    />

                    {/* Add Button */}
                    <button
                        onClick={() => setCurrentPage('Add Product')}
                        className="w-full sm:w-auto bg-linear-to-br from-pink-500 to-pink-600 text-white px-2 md:px-5 py-2 md:py-2.5 rounded-xl text-sm font-bold hover:shadow-lg hover:shadow-pink-200 transition-all active:scale-95 shrink-0 cursor-pointer">
                        + Add New
                    </button>
                </div>
            </div>

            {/* table */}
            <div className="overflow-x-auto no-scrollbar">
                <table className="w-full text-left">
                    <thead className="bg-slate-50/50 dark:bg-slate-800/50 text-slate-500 uppercase text-[11px] font-bold tracking-wider">
                        <tr>
                            <th className="px-6 py-4 whitespace-nowrap">Image</th>
                            <th className="px-6 py-4 whitespace-nowrap min-w-50 lg:min-w-0">Product</th>
                            <th className="px-6 py-4 whitespace-nowrap">Category</th>
                            <th className="px-6 py-4 whitespace-nowrap">Price & Qty</th>
                            <th className="px-6 py-4 whitespace-nowrap text-center">Stock Status</th>
                            <th className="px-6 py-4 whitespace-nowrap text-center">Status</th>
                            <th className="px-6 py-4 whitespace-nowrap text-center">Action</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-pink-50 dark:divide-slate-800">
                        {statusChange.map((product, index) => (
                            <tr
                                key={index}
                                className="hover:bg-pink-50/30 dark:hover:bg-slate-800/30 transition-colors group">

                                {/* Image Column */}
                                <td className="px-6 py-4">
                                    <div className="relative w-12 h-12 shrink-0">
                                        <img
                                            src={product.img}
                                            alt={product.productName}
                                            className="w-12 h-12 rounded-xl object-cover border border-pink-100 shadow-sm" />
                                    </div>
                                </td>

                                {/* Product Name Column */}
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-slate-700 dark:text-slate-300 line-clamp-1">
                                            {product.productName}
                                        </span>
                                        {/* Mobile par Sub-Category dikhane ke liye */}
                                        <span className="text-[10px] text-pink-500 font-medium sm:hidden">
                                            {product.subCategory}
                                        </span>
                                    </div>
                                </td>

                                {/* Category & Sub-Category Column */}
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                                            {product.subCategory}
                                        </span>
                                        <span className="text-[10px] text-slate-400 italic">
                                            {product.category}
                                        </span>
                                    </div>
                                </td>

                                {/* Price & Quantity Column */}
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-pink-600">
                                            {product.price}
                                        </span>
                                        <span className="text-[10px] text-slate-400 font-medium">
                                            Qty: {product.quantity}
                                        </span>
                                    </div>
                                </td>

                                {/* Stock Status Badge */}
                                <td className="px-6 py-4 text-center">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide 
                                        ${stockOptions.find(opt => opt.label === product.stockStatus)?.style || 'bg-slate-100 text-slate-500'}`}>
                                        {product.stockStatus}
                                    </span>
                                </td>

                                {/* status */}
                                <td className="px-6 py-4 text-center">
                                    <span
                                        onClick={() => toggleStatus(index)}
                                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide cursor-pointer
                                        ${product.status === "Active" ? "bg-green-50 text-green-600 border-green-100" : "bg-slate-50 text-slate-500 border-slate-100"}`}>
                                        {product.status}
                                    </span>
                                </td>

                                {/* Action Buttons */}
                                <td className="px-6 py-4">
                                    <div className="flex justify-center items-center gap-2">
                                        <button
                                            onClick={() => setIsEditOpen(true)}
                                            className="p-2 rounded-lg bg-amber-50 text-amber-500 hover:bg-amber-500 hover:text-white transition-all active:scale-90 cursor-pointer">
                                            <TbEdit className="text-lg md:text-xl" />
                                        </button>

                                        <button
                                            onClick={() => setIsDeletedOpen(true)}
                                            className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all active:scale-90 cursor-pointer">
                                            <LiaTrashSolid className="text-lg md:text-xl" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* popup section for edit */}
            <div
                className={`fixed inset-0 flex justify-center items-center bg-black/50 backdrop-blur-sm z-100 px-4 transition-all duration-500 
                    ${isEditOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
            >
                <div
                    onClick={() => setIsEditOpen(false)}
                    className="absolute inset-0"
                ></div>

                {/* Content */}
                <div className="relative transform max-h-[90vh] overflow-y-auto rounded-md bg-white dark:bg-slate-900 p-8 text-left shadow-2xl transition-all w-full max-w-md border border-pink-50 dark:border-slate-800">

                    {/* cross icon */}
                    <button
                        onClick={() => setIsEditOpen(false)}
                        className="absolute top-6 right-6 text-slate-400 hover:text-pink-500 transition-colors"
                    >
                        <HiOutlineX size={20} />
                    </button>

                    <div className="text-center">
                        <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                            Edit Product Details
                        </h3>
                    </div>

                    <div className='mt-5 space-y-4'>

                        {/*product Image */}
                        <div className='relative flex flex-col gap-1.5 md:gap-2'>
                            <label className='text-[13px] md:text-sm font-semibold text-slate-600 dark:text-slate-400 ml-1'>
                                Product Image
                            </label>

                            <div className="p-2.5 rounded-lg md:rounded-2xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800  dark:text-white text-sm transition-all placeholder:text-[11px] md:placeholder:text-[14px]">
                                <input
                                    type="file"
                                    id="image"
                                    name="ProductImage"
                                    accept=".jpg,.png"
                                    onChange={handleFileChange}
                                    className="absolute opacity-0 cursor-pointer"
                                />

                                <div className="flex gap-2 items-center">
                                    <button className="border border-pink-100 rounded-sm px-2 text-pink-500 bg-pink-50/30">
                                        Choose File
                                    </button>
                                    <span className={`text-gray-600`}>
                                        {file ? file.name : "No file chosen"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* product gallery Image */}
                        <div className='relative flex flex-col gap-1.5 md:gap-2'>
                            <label className='text-[13px] md:text-sm font-semibold text-slate-600 dark:text-slate-400 ml-1'>
                                Product Gallery Image
                            </label>

                            <div className="p-2.5 rounded-lg md:rounded-2xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800  dark:text-white text-sm transition-all placeholder:text-[11px] md:placeholder:text-[14px]">

                                <input
                                    type="file"
                                    id="images"
                                    name="prodImages"
                                    accept=".jpg,.png,.jpeg"
                                    multiple
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    onChange={handleGalleryChange} />

                                <div className="flex gap-2 items-center">
                                    <button className="border border-pink-100 rounded-sm px-2 text-pink-500 bg-pink-50/30">
                                        Choose File
                                    </button>
                                    <span className="text-gray-600 text-sm">
                                        {galleryFiles?.length > 0
                                            ? `${galleryFiles.length} files selected`
                                            : "No files chosen"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/*product name */}
                        <div className='flex flex-col gap-1.5 md:gap-2'>
                            <label className='text-[13px] md:text-sm font-semibold text-slate-600 dark:text-slate-400 ml-1'>
                                Product Name
                            </label>
                            <input
                                type="text"
                                placeholder="e.g. Watch"
                                className="p-2.5 rounded-lg md:rounded-2xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:text-white text-sm transition-all placeholder:text-[11px] md:placeholder:text-[14px]"
                            />
                        </div>

                        {/* price */}
                        <div className='flex flex-col gap-1.5 md:gap-2'>
                            <label className='text-[13px] md:text-sm font-semibold text-slate-600 dark:text-slate-400 ml-1'>
                                Price
                            </label>
                            <input
                                type="text"
                                placeholder="e.g. 3000"
                                className="p-2.5 rounded-lg md:rounded-2xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:text-white text-sm transition-all placeholder:text-[11px] md:placeholder:text-[14px]"
                            />
                        </div>

                        {/* qty */}
                        <div className='flex flex-col gap-1.5 md:gap-2'>
                            <label className='text-[13px] md:text-sm font-semibold text-slate-600 dark:text-slate-400 ml-1'>
                                Quantity
                            </label>
                            <input
                                type="text"
                                placeholder="e.g. 40"
                                className="p-2.5 rounded-lg md:rounded-2xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:text-white text-sm transition-all placeholder:text-[11px] md:placeholder:text-[14px]"
                            />
                        </div>

                        {/* stock dropdown */}
                        <div className='flex flex-col gap-1.5 md:gap-2'>
                            <label className='text-[13px] md:text-sm font-semibold text-slate-600 dark:text-slate-400 ml-1'>
                                Stock
                            </label>

                            <button
                                onClick={() => setIsStockOpen(!isStockOpen)}
                                className={`w-full bg-slate-50 dark:bg-slate-800 p-2.5 rounded-xl md:rounded-2xl flex justify-between items-center transition-all border cursor-pointer
                                    ${isStockOpen ? 'border-pink-500 ring-2 ring-pink-50' : 'border-transparent'}`}
                            >
                                <span className={`${selectedStock ? 'text-slate-800 dark:text-white font-medium' : 'text-slate-400'} text-[11px] md:text-[14px] truncate mr-3`}>
                                    {selectedStock || "Select Stock"}
                                </span>

                                <div className="shrink-0">
                                    {isStockOpen ? <IoIosArrowUp className='text-pink-500' /> : <IoIosArrowDown className='text-slate-400' />}
                                </div>
                            </button>

                            {isStockOpen && (
                                <div className='w-full mt-2 bg-white dark:bg-slate-800 rounded-b-xl shadow-xl border border-pink-50 dark:border-slate-700 py-2 overflow-hidden animate-in fade-in zoom-in duration-200'>

                                    <div className='max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700'>
                                        {stockOptions.map((item, index) => (
                                            <div
                                                key={index}
                                                onClick={() => handleStock(item.label)}
                                                className='px-4 py-1.5 hover:bg-pink-50 dark:hover:bg-slate-700 cursor-pointer text-slate-700 dark:text-slate-300 hover:text-pink-600 font-medium transition-colors text-[11px] md:text-[13px] border-b border-slate-50 dark:border-slate-700 last:border-none'
                                            >
                                                {item.label}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* status */}
                        <div className='flex flex-col gap-1.5 md:gap-2'>
                            <label className='text-[13px] md:text-sm font-semibold text-slate-600 dark:text-slate-400 ml-1'>
                                Status
                            </label>

                            <button
                                onClick={() => setIsStatusOpen(!isStatusOpen)}
                                className={`w-full bg-slate-50 dark:bg-slate-800 p-2.5 rounded-xl md:rounded-2xl flex justify-between items-center transition-all border cursor-pointer
                                    ${isStatusOpen ? 'border-pink-500 ring-2 ring-pink-50' : 'border-transparent'}`}
                            >
                                <span className={`${selectedStatus ? 'text-slate-800 dark:text-white font-medium' : 'text-slate-400'} text-[11px] md:text-[14px] truncate mr-3`}>
                                    {selectedStatus || "Select Stock"}
                                </span>

                                <div className="shrink-0">
                                    {isStatusOpen ? <IoIosArrowUp className='text-pink-500' /> : <IoIosArrowDown className='text-slate-400' />}
                                </div>
                            </button>

                            {isStatusOpen && (
                                <div className='w-full mt-2 bg-white dark:bg-slate-800 rounded-b-xl shadow-xl border border-pink-50 dark:border-slate-700 py-2 overflow-hidden animate-in fade-in zoom-in duration-200'>

                                    <div className='max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700'>
                                        {statusOptions.map((item, index) => (
                                            <div
                                                key={index}
                                                onClick={() => handleStatus(item.label)}
                                                className='px-4 py-1.5 hover:bg-pink-50 dark:hover:bg-slate-700 cursor-pointer text-slate-700 dark:text-slate-300 hover:text-pink-600 font-medium transition-colors text-[11px] md:text-[13px] border-b border-slate-50 dark:border-slate-700 last:border-none'
                                            >
                                                {item.label}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-8 flex flex-col sm:flex-row gap-3">
                        <button
                            type="button"
                            onClick={() => setIsEditOpen(false)}
                            className="inline-flex w-full justify-center rounded-2xl bg-white px-3 py-3.5 text-sm font-bold text-slate-600 border border-slate-100 hover:bg-slate-50 transition-all sm:w-1/2 active:scale-95 cursor-pointer"
                        >
                            No, Keep it
                        </button>

                        <button
                            type="button"
                            // onClick={onConfirm}
                            className="inline-flex w-full justify-center rounded-2xl bg-linear-to-br from-pink-500 to-pink-600 px-3 py-3.5 text-sm font-bold text-white shadow-lg shadow-green-100 hover:from-pink-600 hover:to-pink-700 transition-all sm:w-1/2 items-center gap-2 active:scale-95 cursor-pointer"
                        >
                            Update
                        </button>
                    </div>
                </div>

            </div>

            {/* popup section for delete */}
            <div
                className={`fixed inset-0 flex justify-center items-center bg-black/50 backdrop-blur-sm z-100 px-4 transition-all duration-500 
                    ${isDeletedOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
            >
                <div
                    onClick={() => setIsDeletedOpen(false)}
                    className="absolute inset-0"
                ></div>

                {/* Content */}
                <div className="relative transform overflow-hidden rounded-[2.5rem] bg-white dark:bg-slate-900 p-8 text-left shadow-2xl transition-all w-full max-w-md border border-pink-50 dark:border-slate-800">

                    {/* cross icon */}
                    <button
                        onClick={() => setIsDeletedOpen(false)}
                        className="absolute top-6 right-6 text-slate-400 hover:text-pink-500 transition-colors"
                    >
                        <HiOutlineX size={20} />
                    </button>

                    {/* Warning Icon */}
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 dark:bg-red-900/20 mb-6">
                        <HiOutlineExclamation className="h-8 w-8 text-red-500" />
                    </div>

                    {/* Text Content */}
                    <div className="text-center">
                        <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                            Remove Product?
                        </h3>

                        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 leading-relaxed px-2">
                            Are you sure you want to delete <span className="font-bold text-slate-700 dark:text-white">"This Product"</span>?
                            This will remove it from your store permanently.
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-8 flex flex-col sm:flex-row gap-3">
                        <button
                            type="button"
                            onClick={() => setIsDeletedOpen(false)}
                            className="inline-flex w-full justify-center rounded-2xl bg-white px-3 py-3.5 text-sm font-bold text-slate-600 border border-slate-100 hover:bg-slate-50 transition-all sm:w-1/2 active:scale-95 cursor-pointer"
                        >
                            No, Keep it
                        </button>

                        <button
                            type="button"
                            // onClick={onConfirm}
                            className="inline-flex w-full justify-center rounded-2xl bg-linear-to-br from-red-500 to-red-600 px-3 py-3.5 text-sm font-bold text-white shadow-lg shadow-red-100 hover:from-red-600 hover:to-red-700 transition-all sm:w-1/2 items-center gap-2 active:scale-95 cursor-pointer"
                        >
                            <HiOutlineTrash />
                            Yes, Delete
                        </button>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default AllProducts;