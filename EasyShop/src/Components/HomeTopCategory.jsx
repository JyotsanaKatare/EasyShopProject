
//updated
import React from 'react'
import NewProd1 from '../assets/Images/NewProd1.png';
import NewProd2 from '../assets/Images/NewProd2.png';
import NewProd3 from '../assets/Images/NewProd3.png';
import NewProd4 from '../assets/Images/NewProd4.png';
import NewProd5 from '../assets/Images/NewProd5.png';
import NewProd6 from '../assets/Images/NewProd6.png';
import NewProd7 from '../assets/Images/NewProd7.png';
import NewProd8 from '../assets/Images/NewProd8.png';
import NewProd9 from '../assets/Images/NewProd9.jpg';
import NewProd10 from '../assets/Images/NewProd10.jpg';
import NewProd11 from '../assets/Images/NewProd11.jpg';
import NewProd12 from '../assets/Images/NewProd12.jpg';
import NewProd13 from '../assets/Images/NewProd13.jpg';
import NewProd14 from '../assets/Images/NewProd14.jpg';

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from "swiper/modules";
import { useNavigate } from 'react-router-dom';

function HomeTopCategory() {

    const navigate = useNavigate();

    const categorySection = [
        {
            id: 1,
            img: NewProd1,
            category: "Men",               // Main Category
            subCategory: "Shoes",          // Sub-Category
            productName: "Red Sneakers",   // Specific Product Name
        },
        {
            id: 2,
            img: NewProd2,
            category: "Women",
            subCategory: "Tops",
            productName: "Unique Summer Top",
        },
        {
            id: 3,
            img: NewProd3,
            category: "Women",
            subCategory: "Purse",
            productName: "Designer Leather Purse",
        },
        {
            id: 4,
            img: NewProd4,
            category: "Men",
            subCategory: "Jeans",
            productName: "Stretchy Denim",
        },
        {
            id: 5,
            img: NewProd5,
            category: "Women",
            subCategory: "Necklace",
            productName: "Platinum Choker",
        },
        {
            id: 6,
            img: NewProd6,
            category: "Beauty",            
            subCategory: "Makeup Brushes",
            productName: "Pro Brush Set",
        },
        {
            id: 7,
            img: NewProd7,
            category: "Beauty",
            subCategory: "Lipstick",
            productName: "Matte Red Lipstick",
        },
        {
            id: 8,
            img: NewProd8,
            category: "Beauty",
            subCategory: "Skin Care",
            productName: "Hydrating Serum",
        },
        {
            id: 9,
            img: NewProd9,
            category: "Men",
            subCategory: "Accessories",
            productName: "Leather Tan Belt",
        },
        {
            id: 10,
            img: NewProd10,
            category: "Home",
            subCategory: "Furniture",
            productName: "Velvet Sofa",
        },
        {
            id: 11,
            img: NewProd11,
            category: "Women",
            subCategory: "Heels",
            productName: "Stiletto Pumps",
        },
        {
            id: 12,
            img: NewProd12,
            category: "Unisex",            
            subCategory: "Watches",
            productName: "Silver Watch",
        },
        {
            id: 13,
            img: NewProd13,
            category: "Unisex",
            subCategory: "Sunglasses",
            productName: "Aviator Sunglasses",
        },
        {
            id: 14,
            img: NewProd14,
            category: "Kitchen",
            subCategory: "Kitchen Appliances",
            productName: "Digital Air Fryer",
        },
    ];

    const categoryLimit = categorySection.slice(0, 8);

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

                        {categoryLimit.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div
                                    onClick={() => navigate(`/all_products/${item.id}/${item.subCategory}`)}
                                    className="group flex flex-col items-center cursor-pointer">

                                    {/* Circle Container with Animation */}
                                    <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-y-3 border-gray-50 shadow-md group-hover:border-pink-500 transition-all duration-500">

                                        {/* Image */}
                                        <img
                                            src={item.img}
                                            alt={item.subCategory}
                                            className='w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-500'
                                        />
                                    </div>

                                    {/* Name Section */}
                                    <div className="mt-6 text-center">
                                        <p className="text-gray-800 font-bold text-md md:text-lg group-hover:text-pink-600 transition-colors uppercase tracking-wide">
                                            {item.subCategory}
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