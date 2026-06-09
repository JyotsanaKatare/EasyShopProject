
import React, { useEffect, useState } from 'react';
import { TbEdit } from "react-icons/tb";
import { LiaTrashSolid } from "react-icons/lia";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { HiOutlineExclamation, HiOutlineTrash, HiOutlineX } from 'react-icons/hi';
import { HiChevronDown } from 'react-icons/hi';

import { useProductList, useToggleProductStatus } from '../../hook/uesProducts';
import UpdateProductDrawer from './UpdateProductDrawer';
import { useVendorUIStore } from '../../store/useAuthStore';
import { getPaginationRange } from '../../utils/getPaginationRange';
import { useTranslation } from 'react-i18next';

function AllProducts({ setCurrentPage }) {

    const { t } = useTranslation();
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    const [isOpen, setIsOpen] = useState(false);

    // Helper function to get label
    const getStatusLabel = (value) => {
        if (value === "true") return t('allProducts.filterActive');
        if (value === "false") return t('allProducts.filterInactive');
        return t('allProducts.filterAll');
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
            setPage(1);
        }, 300);
        return () => clearTimeout(timer);
    }, [search]);

    const { data, isLoading, isError } = useProductList({ search: debouncedSearch, page, isActive: statusFilter });
    const { mutate: toggleStatus, isPending, variables } = useToggleProductStatus();

    const { selectedProduct, isProductDrawerOpen, closeProductDrawer, openProductDrawer } = useVendorUIStore();

    const productList = data?.data || [];
    const totalPages = data?.totalPages || 1;
    const totalCount = data?.count || 0;

    // stock status
    const stockStyles = {
        'Out of Stock': 'bg-slate-100  text-slate-500  border-slate-200',
        'Critical': 'bg-red-50     text-red-600     border-red-200',
        'Low Stock': 'bg-orange-50  text-orange-500  border-orange-200',
        'Medium': 'bg-amber-50   text-amber-500   border-amber-200',
        'High Stock': 'bg-emerald-50 text-emerald-600 border-emerald-200',
    };

    // --------Toggle--------
    const handleToggleStatus = (product) => {
        toggleStatus(product);
    };

    if (isLoading) return <p className="p-10 text-center">{t('allProducts.loading')}</p>;
    if (isError) return <p className="p-10 text-center text-red-500">{t('allProducts.error')}</p>;

    return (
        <div className="bg-white dark:bg-slate-900 rounded-xl md:rounded-3xl border border-pink-50 dark:border-slate-800 shadow-sm overflow-hidden">

            {/* Heading with Search & Add Button */}
            <div className="min-w-0 p-4 md:p-6 border-b border-pink-50 dark:border-slate-800 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">

                {/* Title */}
                <div className="min-w-0">
                    <div className="flex flex-wrap gap-2 items-center">
                        <h2 className="min-w-0 text-base md:text-lg font-bold text-slate-800 dark:text-white wrap-break-word">
                            {t('allProducts.hubTitle')}
                        </h2>

                        <span className="hidden sm:inline-flex bg-pink-100 text-pink-600 text-xs font-bold px-2.5 py-0.5 rounded-full shrink-0">
                            {t('allProducts.totalCount', { count: totalCount || 0 })}
                        </span>
                    </div>

                    <p className="text-[11px] md:text-xs text-slate-500 mt-1 wrap-break-word">
                        {t('allProducts.hubSubtitle')}
                    </p>
                </div>

                {/* Search & Button Group */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[minmax(220px,1fr)_180px_auto] gap-3 w-full xl:w-auto xl:min-w-160">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder={t('allProducts.searchPlaceholder')}
                        className="min-w-0 w-full text-sm px-3 md:px-4 py-2.5 rounded-xl border border-pink-50 bg-slate-50 dark:bg-slate-800 focus:outline-pink-400 focus:bg-white transition-all shadow-sm placeholder:text-xs md:placeholder:text-[13px]"
                    />

                    {/* Status Filter */}
                    <div className="relative min-w-0 w-full">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="w-full flex items-center justify-between gap-2 text-sm px-3 py-2.5 rounded-xl border border-pink-50 bg-slate-50 dark:bg-slate-800 focus:outline-pink-400 transition-all shadow-sm text-slate-600 dark:text-slate-300"
                        >
                            <span className="truncate">{getStatusLabel(statusFilter)}</span>
                            <HiChevronDown className={`shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {isOpen && (
                            <div className="absolute top-full left-0 mt-2 w-full bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl shadow-xl z-50 overflow-hidden">
                                {[
                                    { label: t('allProducts.filterAll'), value: "" },
                                    { label: t('allProducts.filterActive'), value: "true" },
                                    { label: t('allProducts.filterInactive'), value: "false" }
                                ].map((option) => (
                                    <button
                                        key={option.value}
                                        onClick={() => {
                                            setStatusFilter(option.value);
                                            setPage(1);
                                            setIsOpen(false);
                                        }}
                                        className="w-full text-left px-4 py-2.5 text-sm hover:bg-pink-50 dark:hover:bg-slate-700 transition-colors"
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Add Button */}
                    <button
                        onClick={() => setCurrentPage('Add Product')}
                        className="w-full sm:col-span-2 lg:col-span-1 lg:w-auto bg-linear-to-br from-pink-500 to-pink-600 text-white px-4 md:px-5 py-2.5 rounded-xl text-sm font-bold hover:shadow-lg hover:shadow-pink-200 transition-all active:scale-95 shrink-0 cursor-pointer"
                    >
                        {t('allProducts.addNew')}
                    </button>
                </div>
            </div>

            {/* table */}
            <div className="overflow-x-auto no-scrollbar">
                <table className="w-full text-left">
                    <thead className="bg-slate-50/50 dark:bg-slate-800/50 text-slate-500 uppercase text-[11px] font-bold tracking-wider">
                        <tr>
                            <th className="px-6 py-4 whitespace-nowrap">{t('allProducts.thImage')}</th>
                            <th className="px-6 py-4 whitespace-nowrap min-w-50 lg:min-w-0">{t('allProducts.thProduct')}</th>
                            <th className="px-6 py-4 whitespace-nowrap">{t('allProducts.thCategory')}</th>
                            <th className="px-6 py-4 whitespace-nowrap">{t('allProducts.thPriceQty')}</th>
                            <th className="px-6 py-4 whitespace-nowrap text-center">{t('allProducts.thStockStatus')}</th>
                            <th className="px-6 py-4 whitespace-nowrap text-center">{t('allProducts.thApproved')}</th>
                            <th className="px-6 py-4 whitespace-nowrap text-center">{t('allProducts.thStatus')}</th>
                            <th className="px-6 py-4 whitespace-nowrap text-center">{t('allProducts.thAction')}</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-pink-50 dark:divide-slate-800">
                        {productList.length > 0 ? productList.map((product, index) => {

                            const isThisRowLoading = isPending && variables === product._id;

                            return (
                                <tr
                                    key={index}
                                    className="hover:bg-pink-50/30 dark:hover:bg-slate-800/30 transition-colors group">

                                    {/* Image Column */}
                                    <td className="px-6 py-4">
                                        <div className="relative w-12 h-12 shrink-0">
                                            <img
                                                src={product.prodImage}
                                                alt={product.prodName}
                                                className="w-12 h-12 rounded-xl object-cover border border-pink-100 shadow-sm" />
                                        </div>
                                    </td>

                                    {/* Product Name Column */}
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-slate-700 dark:text-slate-300 line-clamp-1">
                                                {product.prodName}
                                            </span>
                                            {/* Mobile par Sub-Category dikhane ke liye */}
                                            <span className="text-[10px] text-pink-500 font-medium sm:hidden">
                                                {product?.subCatId?.subCatName}
                                            </span>
                                        </div>
                                    </td>

                                    {/* Category & Sub-Category Column */}
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

                                    {/* Price & Quantity Column */}
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-pink-600">
                                                {product.price}
                                            </span>
                                            <span className="text-[10px] text-slate-400 font-medium">
                                                {t('allProducts.stockLabel', { count: product.stock })}
                                            </span>
                                        </div>
                                    </td>

                                    {/* Stock Status Badge */}
                                    <td className="px-4 py-4 text-center">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border
                                        ${stockStyles[product.stockStatus] || 'bg-slate-50 text-slate-400'}`}>
                                            {product.stockStatus === 'Out of Stock' ? t('allProducts.stockOutOfStock') :
                                                product.stockStatus === 'Critical' ? t('allProducts.stockCritical') :
                                                    product.stockStatus === 'Low Stock' ? t('allProducts.stockLow') :
                                                        product.stockStatus === 'Medium' ? t('allProducts.stockMedium') :
                                                            product.stockStatus === 'High Stock' ? t('allProducts.stockHigh') : (product.stockStatus || '---')}
                                        </span>
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
                                            {product.status === 'Approved' ? t('allProducts.appApproved') :
                                                product.status === 'Pending' ? t('allProducts.appPending') : t('allProducts.appRejected')}
                                        </span>
                                    </td>

                                    {/* Status */}
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => !isPending && handleToggleStatus(product._id)}
                                            disabled={isPending}
                                            className={`w-16 inline-flex items-center justify-center px-3 py-1 rounded-full text-[10px] font-bold uppercase border transition-all
                                               ${isThisRowLoading ? 'opacity-50' : 'cursor-pointer'}
                                                 ${product.isActive
                                                    ? 'bg-green-50 text-green-600 border-green-100 hover:bg-green-100'
                                                    : 'bg-slate-50 text-slate-400 border-slate-200 hover:bg-slate-100'
                                                }`}
                                        >
                                            {isThisRowLoading ? (
                                                <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                                            ) : (
                                                product.isActive ? t('allProducts.statusActive') : t('allProducts.statusInactive')
                                            )}
                                        </button>
                                    </td>

                                    {/* Action Buttons */}
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => openProductDrawer(product)}
                                            className="p-2 rounded-lg bg-amber-50 text-amber-500 hover:bg-amber-500 hover:text-white transition-all active:scale-90 cursor-pointer">
                                            <TbEdit className="text-lg md:text-xl" />
                                        </button>
                                    </td>
                                </tr>
                            )
                        }) : (
                            <tr>
                                <td colSpan="8" className="text-center py-10 text-slate-400 text-sm">
                                    {t('allProducts.noProductsFound')}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 py-4 px-6 border-t border-pink-50 dark:border-slate-800">
                        <button
                            onClick={() => setPage(p => Math.max(p - 1, 1))}
                            disabled={page === 1}
                            className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-pink-100 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-pink-50 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                        >
                            {t('allProducts.btnPrev')}
                        </button>

                        {getPaginationRange(page, totalPages).map((num, idx) =>
                            num === '...'
                                ? <span key={`dot-${idx}`} className="px-2 py-1.5 text-xs text-slate-400">...</span>
                                : <button
                                    key={num}
                                    onClick={() => setPage(num)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all
                                    ${page === num
                                            ? 'bg-pink-500 text-white border-pink-500'
                                            : 'border-pink-100 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-pink-50 dark:hover:bg-slate-800'
                                        }`}
                                >
                                    {num}
                                </button>
                        )}

                        <button
                            onClick={() => setPage(p => Math.min(p + 1, totalPages))}
                            disabled={page === totalPages}
                            className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-pink-100 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-pink-50 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                        >
                            {t('allProducts.btnNext')}
                        </button>
                    </div>
                )}
            </div>

            {/* edit drawer */}
            <UpdateProductDrawer
                product={selectedProduct}
                isOpen={isProductDrawerOpen}
                onClose={closeProductDrawer}
            />
        </div>
    )
}

export default AllProducts;