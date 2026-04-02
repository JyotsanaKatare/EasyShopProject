
import React, { useState } from 'react';
import { TbEdit } from "react-icons/tb";
import { LiaTrashSolid } from "react-icons/lia";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { HiOutlineExclamation, HiOutlineTrash, HiOutlineX } from 'react-icons/hi';

const allCategories = [
    {
        categoryName: "Women Wear",
        department: "Fashion",
        productCount: 124,
        status: "Active",
        img: "https://images.unsplash.com/photo-1733395700970-75535f1334ff?w=500&auto=format&fit=crop&q=60"
    },
    {
        categoryName: "Watch",
        department: "Accessories",
        productCount: 45,
        status: "Active",
        img: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=872&auto=format&fit=crop"
    },
    {
        categoryName: "Gadgets",
        department: "Electronics",
        productCount: 8,
        status: "Inactive",
        img: "https://images.unsplash.com/photo-1668649176554-3ad841a780d0?w=500&auto=format&fit=crop&q=60"
    },
];

function Categories({ setCurrentPage }) {

    const [statusChange, setStatusChange] = useState(allCategories);

    // edit popup
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [file, setFile] = useState(null);
    const [isStatusOpen, setIsStatusOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState("Select Status");

    // delete popup
    const [isDeletedOpen, setIsDeletedOpen] = useState(false);

    const toggleStatus = (index) => {
        const updatedProducts = [...statusChange];
        updatedProducts[index].status = updatedProducts[index].status === "Active" ? "Inactive" : "Active";
        setStatusChange(updatedProducts);
    };

    const handleStatus = (status) => {
        setSelectedStatus(status);
        setIsStatusOpen(false);
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-xl md:rounded-3xl border border-pink-50 dark:border-slate-800 shadow-sm overflow-hidden">

            {/* Heading with Search & Add Button */}
            <div className="p-4 md:p-6 border-b border-pink-50 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">

                {/* Title */}
                <div>
                    <h2 className="text-md md:text-lg font-bold text-slate-800 dark:text-white shrink-0">
                        Categories
                    </h2>

                    <p className="text-[11px] md:text-xs text-slate-500 mt-1">Manage and organize your product categories</p>
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
                        onClick={() => setCurrentPage('Add Category')}
                        className="w-full sm:w-auto bg-linear-to-br from-pink-500 to-pink-600 text-white px-2 md:px-5 py-2 md:py-2.5 rounded-xl text-sm font-bold hover:shadow-lg hover:shadow-pink-200 transition-all active:scale-95 shrink-0 cursor-pointer">
                        + Add New
                    </button>
                </div>
            </div>

            {/* Your Table Section */}
            <div className="overflow-x-auto no-scrollbar">
                <table className="w-full text-left">
                    <thead className="bg-slate-50/50 dark:bg-slate-800/50 text-slate-500 uppercase text-[11px] font-bold tracking-wider">
                        <tr>
                            <th className="px-6 py-4 whitespace-nowrap">Category</th>
                            <th className="px-6 py-4 whitespace-nowrap">Department</th>
                            <th className="px-6 py-4 whitespace-nowrap">Items Count</th>
                            <th className="px-6 py-4 whitespace-nowrap">Status</th>
                            <th className="px-6 py-4 whitespace-nowrap text-center">Action</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-pink-50 dark:divide-slate-800">
                        {statusChange.map((item, index) => (
                            <tr
                                key={index}
                                className="hover:bg-pink-50/30 dark:hover:bg-slate-800/30 transition-colors group">

                                {/* Category Image & Name */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <img src={item.img} alt={item.categoryName} className="w-10 h-10 rounded-lg object-cover border border-pink-100 shadow-sm" />
                                        <span className="text-[13px] md:text-sm font-semibold text-slate-700 dark:text-slate-200">{item.categoryName}</span>
                                    </div>
                                </td>

                                {/* Parent Category */}
                                <td className="px-6 py-4 text-sm text-slate-500 italic">
                                    {item.department || "---"}
                                </td>

                                {/* Product Count */}
                                <td className="px-6 py-4 text-sm font-bold text-slate-600 dark:text-slate-300">
                                    {item.productCount} <span className="text-[10px] font-normal text-slate-400 ml-1">items</span>
                                </td>

                                {/* Status Badge */}
                                <td className="px-6 py-4">
                                    <span
                                        onClick={() => toggleStatus(index)}
                                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border cursor-pointer
                                    ${item.status === 'Active'
                                                ? 'bg-green-50 text-green-600 border-green-100'
                                                : 'bg-slate-50 text-slate-500 border-slate-100'
                                            }`}>
                                        {item.status}
                                    </span>
                                </td>

                                {/* Action Buttons */}
                                <td className="px-6 py-4">
                                    <div className="flex justify-center items-center gap-2">

                                        <button
                                            onClick={() => setIsEditOpen(true)}
                                            className="p-2 rounded-lg bg-amber-50 text-amber-500 hover:bg-amber-500 hover:text-white transition-all active:scale-90">
                                            <TbEdit className="text-lg md:text-xl" />
                                        </button>

                                        <button
                                            onClick={() => setIsDeletedOpen(true)}
                                            className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all active:scale-90">
                                            <LiaTrashSolid className="text-lg md:text-xl" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* edit popup */}
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

                    <button
                        onClick={() => setIsEditOpen(false)}
                        className="absolute top-6 right-6 text-slate-400 hover:text-pink-500 transition-colors"
                    >
                        <HiOutlineX size={20} />
                    </button>

                    {/* heading */}
                    <div className="text-center">
                        <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                            Update Category
                        </h3>
                        <p className="text-xs text-slate-400 mt-1">Manage stock levels and pricing</p>
                    </div>

                    <div className='mt-5 space-y-4'>

                        {/* category Image */}
                        <div className='relative flex flex-col gap-1.5 md:gap-2'>
                            <label className='text-[13px] md:text-sm font-semibold text-slate-600 dark:text-slate-400 ml-1'>
                                Category Image
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
                        
                        {/* items in category  (read-only) */}
                        <div className='flex flex-col gap-1.5 md:gap-2'>
                            <label className='text-[13px] md:text-sm font-semibold text-slate-600 dark:text-slate-400 ml-1'>
                                Total Products in Category
                            </label>
                            <div className="p-2.5 rounded-lg md:rounded-2xl border border-slate-100 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-sm flex items-center justify-between">
                                <span>Current Items</span>
                                <span className="font-bold text-pink-500">24</span> {/* Ye backend se aayega */}
                            </div>
                        </div>

                        {/* category name */}
                        <div className='flex flex-col gap-1.5 md:gap-2'>
                            <label className='text-[13px] md:text-sm font-semibold text-slate-600 dark:text-slate-400 ml-1'>
                                Cateory Name
                            </label>
                            <input
                                type="text"
                                placeholder="Product Name"
                                className="p-2.5 rounded-lg md:rounded-2xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:text-white text-sm transition-all"
                            />
                        </div>

                        {/* description */}
                        <div className='flex flex-col gap-1.5 md:gap-2'>
                            <label className='text-[13px] md:text-sm font-semibold text-slate-600 dark:text-slate-400 ml-1'>
                                Description
                            </label>
                            <textarea
                                type="text"
                                rows={3}
                                placeholder="Type Description..."
                                className="p-2.5 rounded-lg md:rounded-2xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:text-white text-sm transition-all resize-none"
                            />
                        </div>


                        {/* Stock Status Dropdown */}
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
                                    {selectedStatus || "Select Status"}
                                </span>

                                <div className="shrink-0">
                                    {isStatusOpen ? <IoIosArrowUp className='text-pink-500' /> : <IoIosArrowDown className='text-slate-400' />}
                                </div>
                            </button>

                            {isStatusOpen && (
                                <div className='w-full mt-2 bg-white dark:bg-slate-800 rounded-b-xl shadow-xl border border-pink-50 dark:border-slate-700 py-2 overflow-hidden animate-in fade-in zoom-in duration-200'>
                                    <div className='max-h-60 overflow-y-auto'>
                                        {["Active", "Inactive"].map((label, index) => (
                                            <div
                                                key={index}
                                                onClick={() => handleStatus(label)}
                                                className='px-4 py-1.5 hover:bg-pink-50 dark:hover:bg-slate-700 cursor-pointer text-slate-700 dark:text-slate-300 hover:text-pink-600 font-medium transition-colors text-[11px] md:text-[13px]'
                                            >
                                                {label}
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
                            Discard
                        </button>

                        <button
                            type="button"
                            className="inline-flex w-full justify-center rounded-2xl bg-linear-to-br from-pink-500 to-pink-600 px-3 py-3.5 text-sm font-bold text-white shadow-lg shadow-pink-100 hover:from-pink-600 hover:to-pink-700 transition-all sm:w-1/2 items-center gap-2 active:scale-95 cursor-pointer"
                        >
                            Save Inventory
                        </button>
                    </div>
                </div>
            </div>

            {/* delete popup */}
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
                            Remove Category?
                        </h3>

                        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 leading-relaxed px-2">
                            Are you sure you want to delete <span className="font-bold text-slate-700 dark:text-white">"This Category"</span>?
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

export default Categories;