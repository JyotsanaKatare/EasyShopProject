
//updated
import React from 'react'
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from "swiper/modules";
import { useNavigate } from 'react-router-dom';

import { useCatList } from '../hook/useCategories';

function HomeTopCategory() {

    const navigate = useNavigate();

    const { data: categories, isLoading, isError } = useCatList();

    if (isLoading) return <p className="text-center py-10">Loading Collections...</p>;
    if (isError) return <p className="text-center py-10 text-red-500">Something went wrong!</p>;

    // Sirf active categories filter karein
    const activeCats = categories?.filter(cat => cat.isActive) || [];

    return (
        <section className="w-full bg-white py-10 md:py-16 px-4 lg:px-6">
            <div className="max-w-6xl mx-auto">

                {/* heading */}
                <div className="flex flex-col items-center mb-8 md:mb-12">
                    <h2 className="text-2xl md:text-4xl font-bold text-gray-800 tracking-tight">
                        Top New Categories
                    </h2>

                    <div className="w-20 h-1 md:h-1.5 bg-pink-500 rounded-full mt-2 md:mt-3"></div>

                    <p className="text-gray-500 mt-4 text-[12px] md:text-sm uppercase tracking-widest">
                        Discover our latest collection
                    </p>
                </div>

                {/* Slider Container */}
                <div className="category-slider">
                    <Swiper
                        modules={[Autoplay, Pagination]}
                        pagination={{
                            clickable: true,
                            dynamicBullets: true,
                        }}
                        slidesPerView={2}
                        spaceBetween={20}
                        loop={true}
                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                        breakpoints={{
                            640: { slidesPerView: 3 },
                            1024: { slidesPerView: 5 },
                            1280: { slidesPerView: 6 },
                        }}
                        className="pb-14">

                        {activeCats.slice(0,8).map((category, index) => (
                            <SwiperSlide 
                            key={index}>
                                <div
                                    onClick={() => navigate(`/all_products/${category._id}/${category.catName}`)}
                                    className="group flex flex-col items-center cursor-pointer">

                                    {/* Circle Container with Animation */}
                                    <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-y-3 border-gray-50 shadow-md group-hover:border-pink-500 transition-all duration-500">

                                        {/* Image */}
                                        <img
                                            src={category.catImage}
                                            alt={category.catName}
                                            className='w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-500'
                                        />
                                    </div>

                                    {/* Name Section */}
                                    <div className="mt-6 text-center">
                                        <p className="text-gray-800 font-bold text-md group-hover:text-pink-600 transition-colors uppercase tracking-wide">
                                            {category.catName}
                                        </p>
                                        <span className="text-[11px] text-gray-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            SHOP NOW &rarr;
                                        </span>
                                    </div>

                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

            </div>
        </section>
    )
}

export default HomeTopCategory;