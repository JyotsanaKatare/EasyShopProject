
import React, { useEffect, useState } from 'react';
import { TbEdit } from "react-icons/tb";
import { LiaTrashSolid } from "react-icons/lia";
import { HiOutlineSearch } from "react-icons/hi";
import { HiOutlineAdjustments } from "react-icons/hi";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { HiOutlineExclamation, HiOutlineTrash, HiOutlineX } from 'react-icons/hi';
import { useProductList } from '../../hook/uesProducts';
import UpdateProductDrawer from './UpdateProductDrawer';
import { getPaginationRange } from '../../utils/getPaginationRange';
import { useTranslation } from 'react-i18next';

function StockInventoryTable() {
    const { t } = useTranslation();
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [isEditOpen, setIsEditOpen] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
            setPage(1);
        }, 300);
        return () => clearTimeout(timer);
    }, [search]);

    const { data, isLoading, isError } = useProductList({ search: debouncedSearch, page });
    const productList = data?.data || [];
    const totalPages = data?.totalPages || 1;

    const getStockStatusStyle = {
        'Out of Stock': 'text-slate-500  border-slate-200',
        'Critical': 'text-red-600     border-red-200',
        'Low Stock': 'text-orange-500  border-orange-200',
        'Medium': 'text-amber-500   border-amber-200',
        'High Stock': 'text-emerald-600 border-emerald-200',
    };

    const handleEditProduct = (product) => setIsEditOpen(product);

    if (isLoading) return <p className="p-10 text-center">{t('stockInventoryTable.loading')}</p>;
    if (isError) return <p className="p-10 text-center text-red-500">{t('stockInventoryTable.error')}</p>;

    return (
        <div className="w-full">

            {/* Search Container */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-4 md:p-6 bg-white dark:bg-slate-900 rounded-t-xl md:rounded-t-3xl border-b border-slate-100 dark:border-slate-800">
                <div className="relative w-full sm:w-80 group">
                    <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-pink-500 transition-colors" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder={t('stockInventoryTable.searchPlaceholder')}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-pink-50 dark:bg-slate-800 dark:border-slate-700 focus:border-pink-500 rounded-xl text-sm outline-none transition-all shadow-sm"
                    />
                </div>
            </div>

            {/* Table Container */}
            <div className="bg-white dark:bg-slate-900 rounded-b-xl md:rounded-b-3xl border border-pink-50/50 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="overflow-x-auto w-full">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50/50 dark:bg-slate-800/50 text-slate-500 uppercase text-[10px] sm:text-[11px] font-bold tracking-wider">
                            <tr>
                                <th className="px-4 sm:px-6 py-4 whitespace-nowrap min-w-50">{t('stockInventoryTable.thProduct')}</th>
                                <th className="px-4 sm:px-6 py-4 whitespace-nowrap min-w-40">{t('stockInventoryTable.thCategory')}</th>
                                <th className="px-4 sm:px-6 py-4 whitespace-nowrap min-w-40">{t('stockInventoryTable.thStock')}</th>
                                <th className="px-4 sm:px-6 py-4 whitespace-nowrap min-w-40">{t('stockInventoryTable.thApproved')}</th>
                                <th className="px-4 sm:px-6 py-4 whitespace-nowrap min-w-40">{t('stockInventoryTable.thPrice')}</th>
                                <th className="px-4 sm:px-6 py-4 whitespace-nowrap text-center min-w-20">{t('stockInventoryTable.thAction')}</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-pink-50 dark:divide-slate-800">
                            {productList.length > 0 ? productList.map((product, index) => (
                                <tr key={index} className="hover:bg-pink-50/30 dark:hover:bg-slate-800/30 transition-colors group">
                                    <td className="px-4 sm:px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <img src={product.prodImage} alt={product.prodName} className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl object-cover border border-pink-100 shadow-sm" />
                                            <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 truncate max-w-37.5">
                                                {product.prodName}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm">
                                        <div className="flex flex-col">
                                            <span className="font-medium text-slate-600 dark:text-slate-400">{product?.subCatId?.subCatName || "---"}</span>
                                            <span className="text-[10px] text-slate-400 italic">{product?.catId?.catName || '---'}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 sm:px-6 py-4">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-xs sm:text-sm font-bold">{product.stock}</span>
                                            <span className={`w-fit px-1.5 py-0.5 rounded text-[9px] font-bold uppercase border ${getStockStatusStyle[product.stockStatus]}`}>
                                                {product.stockStatus}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-4 sm:px-6 py-4 text-xs">{product.status}</td>
                                    <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm font-bold text-pink-600">₹{product.price.toLocaleString()}</td>
                                    <td className="px-4 sm:px-6 py-4 text-center">
                                        <button onClick={() => handleEditProduct(product)} className="p-2 rounded-lg bg-amber-50 text-amber-500 hover:bg-amber-500 hover:text-white transition-all active:scale-90">
                                            <TbEdit size={18} />
                                        </button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="6" className="text-center py-10 text-slate-400 text-sm">{t('stockInventoryTable.noProductsFound')}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination - Simplified for Mobile */}
                {totalPages > 1 && (
                    <div className="flex flex-wrap justify-center items-center gap-1.5 py-4 px-2 border-t border-pink-50 dark:border-slate-800">
                        <button
                            onClick={() => setPage(p => Math.max(p - 1, 1))}
                            disabled={page === 1}
                            className="px-2 py-1.5 sm:px-3 text-[10px] sm:text-xs font-semibold border rounded-lg disabled:opacity-40"
                        >
                            {t('stockInventoryTable.paginationPrev')}
                        </button>
                        {getPaginationRange(page, totalPages).map((num, idx) =>
                            num === '...'
                                ? <span key={`dot-${idx}`} className="px-2 py-1.5 text-xs text-slate-400">...</span>
                                : <button
                                    key={num}
                                    onClick={() => setPage(num)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all
                                        ${page === num ? 'bg-pink-500 text-white border-pink-500' : 'border-pink-100 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-pink-50 dark:hover:bg-slate-800'}`}
                                    style={{ contentVisibility: 'auto' }} >
                                    {num}
                                </button>
                        )}
                        <button
                            onClick={() => setPage(p => Math.min(p + 1, totalPages))}
                            disabled={page === totalPages}
                            className="px-2 py-1.5 sm:px-3 text-[10px] sm:text-xs font-semibold border rounded-lg disabled:opacity-40"
                        >
                            {t('stockInventoryTable.paginationNext')}
                        </button>
                    </div>
                )}
            </div>

            <UpdateProductDrawer
                product={isEditOpen}
                isOpen={!!isEditOpen}
                onClose={() => setIsEditOpen(null)}
            />
        </div>
    );
}

export default StockInventoryTable;