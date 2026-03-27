
//updated
import React, { useState } from 'react'
import { IoIosStar } from "react-icons/io";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

function ProductDetailReview() {

    const [reviewOpen, setReviewOpen] = useState(false);

    return (
        <div>
            {/* Product Review Section */}
            <div className="max-w-6xl mx-auto p-4 mt-5 md:mt-10">

                <h2 className="text-xl md:text-2xl font-bold mb-8">
                    Customer Reviews
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 ">

                    {/* Left Side: Rating Summary - Mobile/Tablet par full, Desktop par side bar */}
                    <div className="md:w-100 md:mx-auto lg:w-auto lg:mx-0 lg:col-span-1 h-fit lg:sticky lg:top-10">
                        <div className="flex items-center lg:items-start gap-6 mb-6">

                            <h1 className="text-5xl md:text-6xl font-black text-gray-900 leading-none">
                                4.8
                            </h1>

                            <div>
                                <div className="flex text-yellow-400 text-xl md:text-2xl mb-1">
                                    <IoIosStar /><IoIosStar /><IoIosStar /><IoIosStar /><IoIosStar />
                                </div>
                                <p className="text-gray-500 text-sm font-semibold tracking-wide">
                                    Based on 128 reviews
                                </p>
                            </div>
                        </div>

                        {/* Progress Bars Container */}
                        <div className="bg-gray-50/50 p-6 rounded-3xl border border-gray-100">
                            {[5, 4, 3, 2, 1].map((num) => (
                                <div
                                    key={num}
                                    className="flex items-center gap-4 mb-3 last:mb-0">

                                    <span className="text-sm font-bold w-4 text-gray-600">
                                        {num}
                                    </span>

                                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-pink-500 rounded-full transition-all duration-1000"
                                            style={{ width: `${num === 5 ? '80%' : num === 4 ? '15%' : '5%'}` }}
                                        ></div>
                                    </div>
                                    <span className="text-[12px] font-medium text-gray-400 w-8">
                                        {num === 5 ? '80%' : num === 4 ? '15%' : '5%'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side: Individual Reviews List */}
                    <div className="lg:col-span-2 space-y-8">

                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                            Customer Stories
                        </h3>

                        {/* Reviews Container */}
                        <div className="space-y-6">
                            {/* Logic: Agar reviewOpen false hai to sirf pehle 3 dikhao (slice(0,3)), 
       warna saare dikhao. Maan lijiye aapke paas 6 reviews hain.*/}
                            {[1, 2, 3, 4, 5, 6].slice(0, reviewOpen ? undefined : 2).map((review) => (
                                <div
                                    key={review}
                                    className="border-b border-gray-100 pb-8 last:border-0 transition-all hover:bg-gray-50/30 p-2 rounded-xl">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 bg-pink-100 text-pink-500 rounded-full flex items-center justify-center font-bold text-lg shadow-sm">
                                                S
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900 text-base">Sneha Kapoor</h4>
                                                <div className="flex text-yellow-400 text-[14px]">
                                                    <IoIosStar /><IoIosStar /><IoIosStar /><IoIosStar /><IoIosStar />
                                                </div>
                                            </div>
                                        </div>
                                        <span className="text-[11px] md:text-xs text-gray-400 font-medium bg-gray-100 px-2 py-1 rounded">
                                            2 days ago
                                        </span>
                                    </div>

                                    <p className="text-gray-600 text-[15px] md:text-[16px] leading-relaxed italic pl-1 md:pl-15">
                                        "The quality of these brushes is amazing! The bristles are so soft and they blend the makeup perfectly."
                                    </p>

                                    {/* Verified Badge */}
                                    <div className="mt-4 md:ml-15 flex items-center gap-1.5 text-[10px] font-bold text-green-600 bg-green-50 w-fit px-3 py-1 rounded-full uppercase tracking-wider border border-green-100">
                                        <IoMdCheckmarkCircleOutline className="text-sm" /> Verified Purchase
                                    </div>
                                </div>
                            ))}

                            {/* Toggle Button */}
                            <div className="flex justify-center my-6">
                                <button
                                    onClick={() => setReviewOpen(!reviewOpen)}
                                    className="px-4 py-1 md:py-2 text-xs md:text-sm border border-pink-500 text-pink-500 font-bold rounded-full hover:bg-pink-500 hover:text-white transition-all duration-300 cursor-pointer uppercase tracking-wide"
                                >
                                    {reviewOpen ? "View Less" : "View More"}
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetailReview;