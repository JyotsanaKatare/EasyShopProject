
import React, { useState } from 'react';
import { TbEdit } from "react-icons/tb";
import { LiaTrashSolid } from "react-icons/lia";

const allSubCategories = [
    {   
        department: "Fashion", //level 1
        subCategoryName: "Cotton Kurti", // Level 3
        categoryName: "Women Wear",    // Level 2 (Aapki purani Category)
        productCount: 45,
        status: "Active",
        img: "https://images.unsplash.com/photo-1733395700970-75535f1334ff?w=500&auto=format&fit=crop&q=60"
    },
    {   
        department: "Accessories",
        subCategoryName: "Smart Watches",
        categoryName: "Watch",
        productCount: 20,
        status: "Active",
        img: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=872&auto=format&fit=crop"
    },
    {   
        department: "Electronics",
        categoryName: "Gadgets",
        subCategoryName: "Bluetooth Earbuds",
        productCount: 12,
        status: "Inactive",
        img: "https://images.unsplash.com/photo-1668649176554-3ad841a780d0?w=500&auto=format&fit=crop&q=60"
    },
];

function SubCategories({setCurrentPage}) {

     const [statusChange, setStatusChange] = useState(allSubCategories);
    
        const toggleStatus = (index) => {
            const updatedProducts = [...statusChange];
            updatedProducts[index].status = updatedProducts[index].status === "Active" ? "Inactive" : "Active";
            setStatusChange(updatedProducts);
        };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-xl md:rounded-3xl border border-pink-50 dark:border-slate-800 shadow-sm overflow-hidden">

             {/* Heading with Search & Add Button */}
            <div className="p-4 md:p-6 border-b border-pink-50 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">

                {/* Title */}
                <div>
                    <h2 className="text-md md:text-lg font-bold text-slate-800 dark:text-white shrink-0">
                        Sub-Categories
                    </h2>

                    <p className="text-[11px] md:text-xs text-slate-500 mt-1">Manage and organize your sub categories</p>
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
                        onClick={() => setCurrentPage('Add Sub Category')}
                        className="w-full sm:w-auto bg-linear-to-br from-pink-500 to-pink-600 text-white px-2 md:px-5 py-2 md:py-2.5 rounded-xl text-sm font-bold hover:shadow-lg hover:shadow-pink-200 transition-all active:scale-95 shrink-0 cursor-pointer">
                        + Add New
                    </button>
                </div>
            </div>

            {/* Table Section */}
            <div className="overflow-x-auto no-scrollbar">
                <table className="w-full text-left">
                    <thead className="bg-slate-50/50 dark:bg-slate-800/50 text-slate-500 uppercase text-[11px] font-bold tracking-wider">
                        <tr>
                            <th className="px-6 py-4 whitespace-nowrap">Sub-Category</th>
                            <th className="px-6 py-4 whitespace-nowrap">Category</th>
                            <th className="px-6 py-4 whitespace-nowrap">Department</th>
                            <th className="px-6 py-4 whitespace-nowrap">Items Count</th>
                            <th className="px-6 py-4 whitespace-nowrap">Status</th>
                            <th className="px-6 py-4 whitespace-nowrap text-center">Action</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-pink-50 dark:divide-slate-800">
                        {statusChange.map((item, index) => (
                            <tr key={index} className="hover:bg-pink-50/30 dark:hover:bg-slate-800/30 transition-colors group">

                                {/* Sub-Category Image & Name (Mapped to subCategoryName) */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <img src={item.img} alt={item.subCategoryName} className="w-10 h-10 rounded-lg object-cover border border-pink-100 shadow-sm" />
                                        <span className="text-[13px] md:text-sm font-semibold text-slate-700 dark:text-slate-200">{item.subCategoryName}</span>
                                    </div>
                                </td>

                                {/* Category Name (Mapped to categoryName) */}
                                <td className="px-6 py-4 text-sm text-slate-500 italic">
                                    {item.categoryName || "---"}
                                </td>

                                {/* department */}
                                <td className="px-6 py-4 text-sm text-slate-500 ">
                                    {item.department || "---"}
                                </td>

                                {/* Product Count */}
                                <td className="px-6 py-4 text-sm font-bold text-slate-600 dark:text-slate-300">
                                    {item.productCount} <span className="text-[10px] font-normal text-slate-400 ml-1">items</span>
                                </td>

                                {/* Status */}
                                <td className="px-6 py-4">
                                    <span
                                        onClick={() => toggleStatus(index)}
                                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide cursor-pointer
                                        ${item.status === "Active" ? "bg-green-50 text-green-600 border-green-100" : "bg-slate-50 text-slate-500 border-slate-100"}`}>
                                        {item.status}
                                    </span>
                                </td>

                                {/* Action Buttons */}
                                <td className="px-6 py-4">
                                    <div className="flex justify-center items-center gap-2">
                                        <button className="p-2 rounded-lg bg-amber-50 text-amber-500 hover:bg-amber-500 hover:text-white transition-all active:scale-90">
                                            <TbEdit className="text-lg md:text-xl" />
                                        </button>
                                        <button className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all active:scale-90">
                                            <LiaTrashSolid className="text-lg md:text-xl" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default SubCategories;