
import React, { useState } from 'react';
import { TbEdit } from "react-icons/tb";
import { LiaTrashSolid } from "react-icons/lia";
import { HiOutlineSearch } from "react-icons/hi";
import { HiOutlineAdjustments } from "react-icons/hi";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { HiOutlineExclamation, HiOutlineTrash, HiOutlineX } from 'react-icons/hi';
import { useProductList } from '../../hook/uesProducts';
import UpdateProductDrawer from './UpdateProductDrawer';

function StockInventoryTable() {

    const { data: productList, isLoading, isError } = useProductList();

    const [isOpen, setIsOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const [isEditOpen, setIsEditOpen] = useState(false);

    // stock status
    const getStockStatusStyle = {
        'Out of Stock': 'text-slate-500  border-slate-200',
        'Critical': 'text-red-600     border-red-200',
        'Low Stock': 'text-orange-500  border-orange-200',
        'Medium': 'text-amber-500   border-amber-200',
        'High Stock': 'text-emerald-600 border-emerald-200',
    };

    // --------Edit--------
    const handleEditProduct = (product) => {
        setIsEditOpen(product)
    };

    if (isLoading) return <p className="p-10 text-center">Loading products...</p>;
    if (isError) return <p className="p-10 text-center text-red-500">Error fetching products!</p>;

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
                                <th className="px-6 py-4 whitespace-nowrap">Category</th>
                                <th className="px-6 py-4 whitespace-nowrap">Stock</th>
                                <th className="px-6 py-4 whitespace-nowrap">Approved?</th>
                                <th className="px-6 py-4 whitespace-nowrap">Price</th>
                                <th className="px-6 py-4 whitespace-nowrap text-center">Action</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-pink-50 dark:divide-slate-800">
                            {productList.map((product, index) => (
                                <tr
                                    key={index}
                                    className="hover:bg-pink-50/30 dark:hover:bg-slate-800/30 transition-colors group"
                                >
                                    {/* Product Image & Name */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={product.prodImage}
                                                alt={product.prodName}
                                                className="w-12 h-12 rounded-xl object-cover border border-pink-100 shadow-sm"
                                            />
                                            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 group-hover:text-pink-600 transition-colors">
                                                {product.prodName}
                                            </span>
                                        </div>
                                    </td>

                                    {/* Category and sub cat*/}
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                                                {product?.subCatId?.subCatName || "---"}
                                            </span>
                                            <span className="text-[10px] text-slate-400 italic">
                                                {product?.catId?.catName || '---'}
                                            </span>
                                        </div>
                                    </td>

                                    {/* Stock Count */}

                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex flex-col gap-1.5">
                                            {/* Stock Count */}
                                            <div className="flex items-center gap-1">
                                                <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                                                    {product.stock}
                                                </span>
                                                <span className="text-[10px] text-slate-400 font-medium">units</span>
                                            </div>

                                            {/* Status Badge */}
                                            <span className={`w-fit px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider border transition-all
                                                ${getStockStatusStyle[product.stockStatus] || 'bg-slate-50 text-slate-400 border-slate-100'}`}>
                                                {product.stockStatus}
                                            </span>
                                        </div>
                                    </td>

                                    {/* approved */}
                                    <td className="px-4 py-4 text-center">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium
                                         ${product.status === 'Approved'
                                                ? " text-green-700 "
                                                : product.status === 'Pending'
                                                    ? " text-amber-700 "
                                                    : " text-red-700 "
                                            }`}>

                                            {product.status}
                                        </span>
                                    </td>

                                    {/* Price */}
                                    <td className="px-6 py-4 text-sm font-bold text-pink-600 dark:text-white">
                                        ₹{product.price.toLocaleString()}
                                    </td>

                                    {/* Action Buttons */}
                                    <td className="px-6 py-4">
                                        <div className="flex justify-center items-center gap-2">
                                            <button
                                                onClick={() => handleEditProduct(product)}
                                                className="p-2 rounded-lg bg-amber-50 text-amber-500 hover:bg-amber-500 hover:text-white transition-all active:scale-90 cursor-pointer">
                                                <TbEdit className="text-lg md:text-xl" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* edit drawer */}
            <UpdateProductDrawer
                product={isEditOpen}
                isOpen={!!isEditOpen}
                onClose={() => setIsEditOpen(null)}
            />

        </div>
    )
}

export default StockInventoryTable;