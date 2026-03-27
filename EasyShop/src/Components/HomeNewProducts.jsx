
//updated
import React, { useEffect } from 'react'
import NewProd1 from '../assets/Images/NewProd1.png';
import NewProd2 from '../assets/Images/NewProd2.png';
import NewProd3 from '../assets/Images/NewProd3.png';
import NewProd4 from '../assets/Images/NewProd4.png';
import NewProd5 from '../assets/Images/NewProd5.png';
import NewProd6 from '../assets/Images/NewProd6.png';
import NewProd7 from '../assets/Images/NewProd7.png';
import NewProd8 from '../assets/Images/NewProd8.png';

import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import { IoMdStar } from "react-icons/io";
import { IoMdStarOutline } from "react-icons/io";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from "swiper/modules";
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import { useWishList } from './WishListContext';

function HomeNewProducts() {

    const { addToCart } = useCart();  //from context api
    const { wishListItems, addToWishList } = useWishList();
    const navigate = useNavigate();

    const newProducts = [
        {
            id: 1,
            img: NewProd1,
            category: "Men",                // Main Category
            subCategory: "Shoes",          // Sub-Category
            name: "Red Sneakers",
            desc: "Comfortable Shoes",
            color: "gray",
            size: "8",
            price: 1800,
            originalPrice: 2400,
        },
        {
            id: 2,
            img: NewProd2,
            category: "Women",
            subCategory: "Tops",
            name: "Women's Unique Top",
            desc: "Elegant Summer Wear",
            color: "pink",
            size: "M",
            price: 850,
            originalPrice: 1200,
        },
        {
            id: 3,
            img: NewProd3,
            category: "Women",
            subCategory: "Purse",
            name: "Designer Purse",
            desc: "Leather Handbag",
            color: "violet",
            size: "Free Size",
            price: 2200,
            originalPrice: 3500,
        },
        {
            id: 4,
            img: NewProd4,
            category: "Men",
            subCategory: "Jeans",
            name: "Stretchy Blends",
            desc: "Distinct back pocket stitching",
            color: "navy blue",
            size: "28",
            price: 1400,
            originalPrice: 1900,
        },
        {
            id: 5,
            img: NewProd5,
            category: "Women",
            subCategory: "Necklace",
            name: "Platinum Necklace",
            desc: "Luxury Jewelry Item",
            color: "silver",
            size: "Adjustable",
            price: 5500,
            originalPrice: 7000,
        },
        {
            id: 6,
            img: NewProd6,
            category: "Beauty",            // Ya "Women" bhi rakh sakte hain
            subCategory: "Makeup Brushes",
            name: "Makeup Brush Set",
            desc: "Professional Brush Kit",
            color: "pink",
            size: "Set of 12",
            price: 650,
            originalPrice: 999,
        },
        {
            id: 7,
            img: NewProd7,
            category: "Beauty",
            subCategory: "Lipstick",
            name: "Matte Lipstick",
            desc: "Long-lasting Lip Color",
            color: "red",
            size: "3.5g",
            price: 450,
            originalPrice: 600,
        },
        {
            id: 8,
            img: NewProd8,
            category: "Beauty",
            subCategory: "Beauty Products",
            name: "Hydrating Serum",
            desc: "Pure Beauty Product",
            color: "skinny",
            size: "30ml",
            price: 1200,
            originalPrice: 1600,
        },
    ];

    return (
        <section className="w-full bg-pink-100/30 py-10 md:py-16 px-4 lg:px-6">
            <div className="max-w-6xl mx-auto">

                {/* heading */}
                <div className="flex flex-col items-center mb-8 md:mb-12">
                    <h2 className="text-2xl md:text-4xl font-bold text-gray-800 tracking-tight">
                        New Products
                    </h2>

                    <div className="w-20 h-1 md:h-1.5 bg-pink-500 rounded-full mt-2 md:mt-3"></div>

                    <p className="text-gray-500 mt-4 text-[12px] md:text-sm uppercase tracking-widest">
                        Our newest favorites, ready for yours
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
                            0: { slidesPerView: 1 },
                            640: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 }, // 3 slides better lagti hain for readability
                            1280: { slidesPerView: 4 },
                        }}
                        className="pb-14"
                    >
                        {newProducts.map((item, index) => {

                            const isFavorite = wishListItems.some((wishItems) => wishItems.id === item.id);

                            return (
                                <SwiperSlide key={index}>
                                    <div
                                        className="group relative bg-white flex flex-col shadow-md rounded-xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-gray-100 cursor-pointer">

                                        {/* Image Section */}
                                        <div className='relative h-55 md:h-60 overflow-hidden'>
                                            <img
                                                src={item.img}
                                                alt={item.name}
                                                onClick={() => navigate(`/product_detail/${item.id}/${item.subCategory}/${item.name}`)}
                                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />

                                            {/* Badges */}
                                            <div className='absolute top-3 left-3 text-white px-3 py-1 bg-pink-500 text-[10px] font-bold rounded-full shadow-lg uppercase tracking-wider z-10'>
                                                New
                                            </div>

                                            <div
                                                onClick={() => addToWishList(item)}
                                                className={`absolute right-3 top-3 p-2 rounded-full shadow-md cursor-pointer transition-all duration-300 z-10 
                                                           ${isFavorite ? 'bg-pink-500 text-white' : 'bg-white/90 text-gray-600'}`}
                                            >
                                                {isFavorite ? <GoHeartFill className='text-xl' /> : <GoHeart className='text-xl' />}
                                            </div>

                                            {/* Add to Cart Button - Image ke upar slide hokar aayega */}
                                            <div className="absolute bottom-0 left-0 w-full p-3 transform translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out z-20">

                                                <button
                                                    onClick={() => addToCart(item)}
                                                    className="w-full bg-pink-500 text-white text-xs font-bold py-3 rounded-lg shadow-xl hover:bg-pink-600 active:scale-95 transition-all cursor-pointer">
                                                    ADD TO CART
                                                </button>
                                            </div>
                                        </div>

                                        {/* Content Section */}
                                        <div
                                            onClick={() => navigate(`/product_detail/${item.id}/${item.subCategory}/${item.name}`)}
                                            className='flex flex-col items-center justify-center md:flex-1 p-4'>

                                            <p className='text-gray-900 font-bold text-sm uppercase tracking-widest mb-1'>{item.name}
                                            </p>

                                            <h3 className='text-gray-800  text-[15px] hover:text-pink-500 cursor-pointer transition-colors'>
                                                {item.desc}
                                            </h3>

                                            {/* Price Tag */}
                                            <div className="flex items-center gap-2 mt-2">
                                                <span
                                                    className="text-pink-500 text-lg font-bold">
                                                    ₹{item.price}
                                                </span>

                                                <span
                                                    className="text-gray-400 line-through text-xs">
                                                    ₹{item.originalPrice}
                                                </span>

                                            </div>

                                            {/* Rating Stars */}
                                            <div className='flex gap-0.5 mt-2 text-md text-yellow-400'>
                                                <IoMdStar />
                                                <IoMdStar />
                                                <IoMdStar />
                                                <IoMdStar />
                                                <IoMdStarOutline />
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            )

                        })}
                    </Swiper>
                </div>

            </div>
        </section>
    )
}

export default HomeNewProducts;