
import React, { useState } from 'react';
import { HiOutlinePencilAlt } from "react-icons/hi";
import { HiOutlineTrash } from "react-icons/hi";
import { HiOutlineSearch } from "react-icons/hi";
import { HiOutlineAdjustments } from "react-icons/hi";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

const inventoryProducts = [
    {
        id: 1,
        sku: "#PROD-7721",
        name: "Wireless Headphones",
        category: "Electronics",
        price: 2499,
        stock: 45, // Kitna stock bacha hai
        status: "In Stock",
        img: "https://images.unsplash.com/photo-1733395700970-75535f1334ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGZsb3JhbCUyMGt1cnRpfGVufDB8fDB8fHww"
    },
    {
        id: 2,
        sku: "#PROD-7722",
        name: "Cotton Kurti",
        category: "Clothing",
        price: 1200,
        stock: 8, // Low stock example
        status: "Low Stock",
        img: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=872&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        id: 3,
        sku: "#PROD-7723",
        name: "Smart Watch",
        category: "Electronics",
        price: 4500,
        stock: 0, // Out of stock example
        status: "Out of Stock",
        img: "https://images.unsplash.com/photo-1668649176554-3ad841a780d0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGVhcmJ1ZHN8ZW58MHx8MHx8fDA%3D"
    },
];

const categoryMenu = [
    {
        id: 1,
        categoryName: "Clothing & Apparel",
    },
    {
        id: 1,
        categoryName: "Electronics & Gadgets",
    },
    {
        id: 1,
        categoryName: "Footwear & Shoes",
    },
]

function StockInventoryTable() {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const getStockStatusStyle = (status) => {
        switch (status) {
            case 'In Stock':
                return 'bg-green-50 text-green-600 border-green-100 dark:bg-green-500/10 dark:text-green-400';

            case 'Low Stock':
                return 'bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-500/10 dark:text-amber-400';

            case 'Out of Stock':
                return 'bg-red-50 text-red-600 border-red-100 dark:bg-red-500/10 dark:text-red-400';

            default:
                return 'bg-slate-50 text-slate-600 border-slate-100 dark:bg-slate-800 dark:text-slate-400';
        }
    };

    const handleCategory = (cat) => {
        setSelectedCategory(cat);
        setIsOpen(false);
    };

    return (
        <div>
            {/* search Container */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4 px-4 py-6 md:p-6 bg-white dark:bg-slate-900 rounded-t-xl md:rounded-t-3xl">

                {/* Search Bar (Left Side) */}
                <div className="relative w-full lg:w-80 group">
                    <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-pink-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search product, SKU..."
                        className="w-full pl-11 pr-4 py-2 md:py-2.5 bg-slate-50 border border-pink-50 dark:bg-slate-800 focus:border-pink-500 focus:bg-white dark:focus:bg-slate-900 rounded-xl text-sm outline-none transition-all shadow-sm placeholder:text-xs md:placeholder:text-[13px]"
                    />
                </div>

                {/* Filter Options */}
                <div className="flex items-center gap-3 w-full lg:w-auto justify-end">

                    {/* Dropdown Container */}
                    <div className='relative w-full lg:w-64'>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`w-full bg-slate-50 dark:bg-slate-800 px-4 py-2.5 rounded-xl flex justify-between items-center transition-all border text-sm shadow-sm
                            ${isOpen ? 'border-pink-400 ring-2 ring-pink-50' : 'border-transparent hover:border-pink-200'}`}
                        >
                            <span className={`${selectedCategory ? 'text-slate-700 dark:text-white font-medium' : 'text-slate-500'} truncate mr-2 text-xs md:text-[13px]`}>
                                {selectedCategory ? selectedCategory.categoryName : 'Choose category...'}
                            </span>
                            <div className="shrink-0">
                                {isOpen ? <IoIosArrowUp className='text-pink-500' /> : <IoIosArrowDown className='text-slate-400' />}
                            </div>
                        </button>

                        {isOpen && (
                            <div className='absolute z-30 w-full mt-2 bg-white dark:bg-slate-800 rounded-b-xl shadow-xl border border-pink-50 dark:border-slate-700 py-2 overflow-hidden animate-in fade-in zoom-in duration-200'>
                                {/* Max height aur scroll add kiya hai taaki mobile par lambi list screen se bahar na jaye */}
                                <div className='max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700'>
                                    {categoryMenu.map((item, index) => (
                                        <div
                                            key={index}
                                            onClick={() => handleCategory(item)}
                                            className='px-4 py-2 md:px-5 md:py-2.5 hover:bg-pink-50 dark:hover:bg-slate-700 cursor-pointer text-slate-700 dark:text-slate-300 hover:text-pink-600 font-medium transition-colors text-sm md:text-[15px] border-b border-slate-50 dark:border-slate-700 last:border-none'
                                        >
                                            {item.categoryName}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Adjustments Button */}
                    <button className="hidden md:flex p-2.5 bg-slate-50 dark:bg-slate-800 text-slate-500 rounded-xl hover:bg-pink-50 hover:text-pink-500 transition-all shrink-0 shadow-sm">
                        <HiOutlineAdjustments className="text-xl" />
                    </button>
                </div>
            </div>

            {/* table */}
            <div className=" bg-white dark:bg-slate-900 rounded-b-xl md:rounded-b-3xl border border-pink-50/50 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50/50 dark:bg-slate-800/50 text-slate-500 uppercase text-[11px] font-bold tracking-wider">
                            <tr>
                                <th className="px-6 py-4 whitespace-nowrap min-w-50 lg:min-w-0">Product</th>
                                <th className="px-6 py-4 whitespace-nowrap">SKU</th>
                                <th className="px-6 py-4 whitespace-nowrap">Category</th>
                                <th className="px-6 py-4 whitespace-nowrap">Stock</th>
                                <th className="px-6 py-4 whitespace-nowrap">Status</th>
                                <th className="px-6 py-4 whitespace-nowrap">Price</th>
                                <th className="px-6 py-4 whitespace-nowrap text-center">Action</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-pink-50 dark:divide-slate-800">
                            {inventoryProducts.map((item, index) => (
                                <tr
                                    key={index}
                                    className="hover:bg-pink-50/30 dark:hover:bg-slate-800/30 transition-colors group"
                                >
                                    {/* Product Image & Name */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={item.img}
                                                alt={item.name}
                                                className="w-12 h-12 rounded-xl object-cover border border-pink-100 shadow-sm"
                                            />
                                            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 group-hover:text-pink-600 transition-colors">
                                                {item.name}
                                            </span>
                                        </div>
                                    </td>

                                    {/* SKU */}
                                    <td className="px-6 py-4 text-sm font-mono text-slate-400">
                                        {item.sku}
                                    </td>

                                    {/* Category */}
                                    <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                                        {item.category}
                                    </td>

                                    {/* Stock Count */}
                                    <td className={`px-6 py-4 text-sm font-bold ${item.stock < 10 ? 'text-red-500' : 'text-slate-600 dark:text-slate-300'}`}>
                                        {item.stock} <span className="text-[10px] font-normal text-slate-400 ml-1">units</span>
                                    </td>

                                    {/* Status Badge */}
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide inline-block whitespace-nowrap 
                                            ${getStockStatusStyle(item.status)}`}>
                                            {item.status}
                                        </span>
                                    </td>

                                    {/* Price */}
                                    <td className="px-6 py-4 text-sm font-bold text-pink-600 dark:text-white">
                                        ₹{item.price.toLocaleString()}
                                    </td>

                                    {/* Action Buttons */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center gap-3">
                                            <button title="Edit Product" className="group/btn relative text-slate-400 hover:text-pink-500 transition-all p-1">
                                                <HiOutlinePencilAlt className="text-xl group-hover/btn:scale-110 transition-transform" />
                                            </button>
                                            <button title="Delete Product" className="group/btn relative text-slate-400 hover:text-red-500 transition-all p-1">
                                                <HiOutlineTrash className="text-xl group-hover/btn:scale-110 transition-transform" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default StockInventoryTable;