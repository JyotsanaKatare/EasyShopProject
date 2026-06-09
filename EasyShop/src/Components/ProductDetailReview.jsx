
import React, { useState } from 'react'
import { IoIosStar } from "react-icons/io";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

import { useProductReviews } from '../hook/useReview';
import { useTranslation } from 'react-i18next';

function ProductDetailReview({ prodId, averageRating, totalReviews }) {

    const { t } = useTranslation();
    const { data: productReviews = [], isLoading, isError } = useProductReviews(prodId);
    const [reviewOpen, setReviewOpen] = useState(false);

    if (isLoading) return <div className="p-20 text-center">{t('reviews.loading')}</div>;
    if (isError) return <div className="p-20 text-center">{t('reviews.notFound')}</div>;

    return (
        <div>
            <div className="max-w-6xl mx-auto p-4 mt-5 md:mt-10">
                <h2 className="text-xl md:text-2xl font-bold mb-8">
                    {t('reviews.customerReviews')}
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                    {/* Left Side: rating */}
                    <div className="lg:col-span-1 h-fit lg:sticky lg:top-10">
                        <div className="flex flex-col items-center sm:flex-row sm:items-start gap-4 sm:gap-6 mb-6">
                            <h1 className="text-5xl font-black text-gray-900 leading-none">
                                {averageRating}
                            </h1>

                            <div className="text-center sm:text-left">
                                <div className="flex text-xl md:text-2xl mb-1 justify-center sm:justify-start">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <IoIosStar key={star} className={star <= averageRating ? "text-yellow-400" : "text-gray-200"} />
                                    ))}
                                </div>
                                <p className="text-gray-500 text-xs md:text-sm font-semibold tracking-wide">
                                    {t('reviews.basedOn', { count: totalReviews })}
                                </p>
                            </div>
                        </div>

                        {/* Progress Bars */}
                        <div className="bg-gray-50/50 p-4 md:p-6 rounded-2xl border border-gray-100">
                            {totalReviews > 0 ? (
                                [5, 4, 3, 2, 1].map((num) => (
                                    <div key={num} className="flex items-center gap-3 mb-2 last:mb-0">
                                        <span className="text-xs font-bold w-3 text-gray-600">{num}</span>
                                        <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-pink-500 rounded-full transition-all duration-1000"
                                                style={{ width: `${num === 5 ? '80%' : '5%'}` }}
                                            ></div>
                                        </div>
                                        <span className="text-[10px] md:text-xs font-medium text-gray-400 w-8 text-right">
                                            {num === 5 ? '80%' : '5%'}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-2">
                                    <p className="text-gray-400 text-xs italic">{t('reviews.noReviews')}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Side: Reviews List */}
                    <div className="lg:col-span-2 space-y-8">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                            {t('reviews.customerStories')}
                        </h3>

                        {totalReviews > 0 ? (
                            <div className="space-y-6">
                                {productReviews.slice(0, reviewOpen ? undefined : 2).map((review) => (
                                    <div
                                        key={review._id}
                                        className="border-b border-gray-100 pb-6 last:border-0 p-2 rounded-xl">
                                        <div className="flex flex-col sm:flex-row justify-between items-start mb-3 gap-2">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 md:w-12 md:h-12 bg-pink-100 text-pink-500 rounded-full flex items-center justify-center font-bold text-sm md:text-lg shrink-0">
                                                    {review.userId?.name?.charAt(0) || 'U'}
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-gray-900 text-sm md:text-base">
                                                        {review.userId?.name}
                                                    </h4>
                                                    <div className="flex text-yellow-400 text-xs md:text-sm">
                                                        {[...Array(5)].map((_, i) => (
                                                            <IoIosStar key={i} className={i < review.rating ? "text-yellow-400" : "text-gray-200"} />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Date */}
                                            <span className="text-[10px] md:text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded">
                                                {new Date(review.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                                            </span>
                                        </div>
                                        <p className="text-gray-600 leading-relaxed italic text-sm md:text-base pl-0 md:pl-15">
                                            "{review.review}"
                                        </p>
                                    </div>
                                ))}
                                {/* View More button */}
                            </div>
                        ) : (
                            <div className="p-8 border border-dashed border-gray-200 rounded-2xl bg-gray-50/30">
                                <p className="text-gray-400 text-center text-sm">{t('reviews.beFirst')}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetailReview;