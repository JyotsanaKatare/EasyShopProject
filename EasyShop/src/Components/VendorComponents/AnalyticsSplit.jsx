
import React, { useState } from 'react';
import { HiOutlineArrowNarrowRight, HiOutlineExclamationCircle } from "react-icons/hi";

import { useStockAlert, useTopSellingProducts } from '../../hook/uesProducts';
import UpdateProductDrawer from './UpdateProductDrawer';
import { useTranslation } from 'react-i18next';

const AnalyticsSplit = ({ setCurrentPage }) => {

    const { t } = useTranslation();
    const { data: topSellingProducts, isLoading, isError } = useTopSellingProducts();
    const { data: stockAlert } = useStockAlert();

    const [isEditOpen, setIsEditOpen] = useState(false);

    // --------Edit--------
    const handleEditProduct = (product) => {
        setIsEditOpen(product)
    };

    if (isLoading) return <p className="p-10 text-center animate-pulse">{t('analyticsSplit.fetching')}</p>;
    if (isError) return <p className="p-10 text-center text-red-500">{t('analyticsSplit.error')}</p>;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-8">

            {/* Left Side: Top Selling Products (Occupies 2 columns on large screens) */}
            <div className="col-span-1 lg:col-span-2 bg-white dark:bg-slate-900 p-4 md:p-6 rounded-3xl border border-pink-50 dark:border-slate-800 shadow-sm">

                {/* Header Section */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-sm md:text-lg font-bold text-slate-800 dark:text-white">
                        {t('analyticsSplit.topSellingTitle')}
                    </h2>
                    <button
                        onClick={() => setCurrentPage("All Products")}
                        className="text-pink-500 text-[11px] md:text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all cursor-pointer"
                    >
                        {t('analyticsSplit.seeAll')} <HiOutlineArrowNarrowRight />
                    </button>
                </div>

                {/* Products List */}
                <div className="space-y-2 md:space-y-4">
                    {topSellingProducts.map((product) => (
                        <div
                            key={product._id}
                            className="flex items-center justify-between p-2 md:p-3 rounded-2xl hover:bg-pink-50/50 transition-colors"
                        >
                            <div className="flex items-center gap-3 md:gap-4">
                                <img
                                    src={product.prodImage}
                                    alt={product.prodName}
                                    className="w-10 h-10 md:w-12 md:h-12 rounded-xl object-cover border border-pink-100 shrink-0"
                                />
                                <div>
                                    <h3 className="text-xs md:text-sm font-bold text-slate-700 dark:text-slate-200 line-clamp-1">
                                        {product.prodName}
                                    </h3>
                                    <p className="text-[10px] md:text-xs text-slate-400">
                                        {t('analyticsSplit.salesCount', { count: product.totalSold })}
                                    </p>
                                </div>
                            </div>

                            {/* Price Section */}
                            <div className="text-right ml-2">
                                <p className="text-xs md:text-sm font-bold text-slate-800 dark:text-white">
                                    ₹{product.price.toLocaleString('en-IN')}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Side: Low Stock Alerts (Occupies 1 column) */}
            <div className="bg-white dark:bg-slate-900 p-4 md:p-6 rounded-3xl border border-pink-50 dark:border-slate-800 shadow-sm w-full">

                {/* Header */}
                <div className="flex items-center gap-2 mb-4 md:mb-6">
                    <HiOutlineExclamationCircle className="text-rose-500 w-5 h-5 md:w-6 md:h-6" />
                    <h2 className="text-sm md:text-lg font-bold text-slate-800 dark:text-white">
                        {t('analyticsSplit.stockAlertsTitle')}
                    </h2>
                </div>

                {/* Alerts List */}
                <div className="space-y-3 md:space-y-4">
                    {stockAlert?.map((product) => (
                        <div
                            key={product._id}
                            className="p-3 rounded-2xl bg-rose-50/50 dark:bg-rose-900/10 border border-rose-100/50"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-xs md:text-sm font-bold text-slate-700 dark:text-slate-200 line-clamp-1 mr-2">
                                    {product.prodName}
                                </h3>

                                {/* Badge scaling */}
                                <span className={`text-[9px] md:text-[10px] font-bold px-2 py-0.5 rounded-full text-center shrink-0
                        ${product.stockStatus === 'Critical'
                                        ? 'bg-rose-100 text-rose-600'
                                        : 'bg-orange-100 text-orange-600'}`}>
                                    {product.stockStatus === 'Critical'
                                        ? t('analyticsSplit.statusCritical')
                                        : t('analyticsSplit.statusLow')}
                                </span>
                            </div>

                            <div className="flex items-center justify-between gap-2 mt-2">
                                <p className="text-[10px] md:text-xs text-rose-600 font-medium">
                                    {t('analyticsSplit.unitsLeft', { count: product.stock })}
                                </p>

                                <button
                                    onClick={() => handleEditProduct(product)}
                                    className="text-[9px] md:text-[10px] font-bold text-slate-500 underline uppercase tracking-tighter hover:text-pink-600 transition-colors"
                                >
                                    {t('analyticsSplit.restockNow')}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* edit drawer */}
            <UpdateProductDrawer
                product={isEditOpen}
                isOpen={!!isEditOpen}
                onClose={() => setIsEditOpen(null)}
            />

        </div>
    );
};

export default AnalyticsSplit;