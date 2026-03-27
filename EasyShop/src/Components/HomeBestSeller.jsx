
//updated
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import NewProd1 from '../assets/Images/NewProd1.png';
import NewProd2 from '../assets/Images/NewProd2.png';
import NewProd3 from '../assets/Images/NewProd3.png';
import NewProd4 from '../assets/Images/NewProd4.png';
import NewProd5 from '../assets/Images/NewProd5.png';
import NewProd6 from '../assets/Images/NewProd6.png';
import NewProd7 from '../assets/Images/NewProd7.png';
import NewProd8 from '../assets/Images/NewProd8.png';

function HomeBestSeller() {

    const navigate = useNavigate();

    const bestSellers = [
        {
            id: 1,
            img: NewProd1,
            category: "Men",           // Main Category
            subCategory: "Shoes",      // categoryName ki jagah subCategory
            name: "Red Sneakers",
            price: "2000",
            originalPrice: "2500"
        },
        {
            id: 2,
            img: NewProd2,
            category: "Women",
            subCategory: "Tops",
            name: "Women's Unique Top",
            price: "2000",
            originalPrice: "2500"
        },
        {
            id: 3,
            img: NewProd3,
            category: "Women",
            subCategory: "Purse",
            name: "Designer Purse",
            price: "2000",
            originalPrice: "2500"
        },
        {
            id: 4,
            img: NewProd4,
            category: "Men",
            subCategory: "Jeans",
            name: "Stretchy Blends",
            price: "2000",
            originalPrice: "2500"
        },
        {
            id: 5,
            img: NewProd5,
            category: "Women",
            subCategory: "Necklace",
            name: "Platinum Necklace",
            price: "2000",
            originalPrice: "2500"
        },
        {
            id: 6,
            img: NewProd6,
            category: "Beauty",
            subCategory: "Makeup Brushes",
            name: "Makeup Brush Set",
            price: "2000",
            originalPrice: "2500"
        },
        {
            id: 7,
            img: NewProd7,
            category: "Beauty",
            subCategory: "Lipstick",
            name: "Matte Lipstick",
            price: "2000",
            originalPrice: "2500"
        },
        {
            id: 8,
            img: NewProd8,
            category: "Beauty",
            subCategory: "Beauty Products",
            name: "Hydrating Serum",
            price: "2000",
            originalPrice: "2500"
        },
    ];

    return (
        <section className="w-full py-8 md:py-16 px-4 lg:px-6">
            <div className="max-w-6xl mx-auto">

                {/* heading */}
                <div className="flex flex-col items-center mb-8 md:mb-12">
                    <h2 className="text-2xl md:text-4xl font-bold text-gray-800 tracking-tight">
                        Best Seller
                    </h2>

                    <div className="w-20 h-1 md:h-1.5 bg-pink-500 rounded-full mt-2 md:mt-3"></div>

                    <p className="text-gray-500 mt-4 text-[12px] text-center md:text-sm uppercase tracking-widest">
                        Most loved by our community • Shop the hits
                    </p>
                </div>


                {/* Section Heading */}
                {/* <div className="flex justify-end mb-10">
                    <button className="hidden md:flex text-gray-500 hover:text-pink-500 font-semibold transition-colors gap-2">
                        View All Collection <span className="text-xl">→</span>
                    </button>
                </div>

                <div className="lex justify-end mb-5">
                    <button className="md:hidden text-sm text-gray-500 hover:text-pink-500 font-semibold transition-colors gap-2">
                        View More<span className="text-xl">→</span>
                    </button>
                </div> */}

                {/* Product Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">

                    {bestSellers.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => navigate(`/product_detail/${item.id}`)}
                            className="group cursor-pointer">
                            <div className="relative aspect-squsre bg-gray-100 rounded-3xl overflow-hidden mb-4">

                                {/* Hot Badge */}
                                <span className="absolute top-4 left-4 bg-orange-500 text-white text-[8px] md:text-[10px] font-bold px-2 md:px-3 py-1 rounded-full z-10 shadow-lg">
                                    HOT SELLING
                                </span>

                                <img
                                    src={item.img}
                                    alt="BestSellerProds"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />

                                {/* Quick Add Button on Hover */}
                                <div className="absolute inset-x-0 bottom-4 px-4 translate-y-12 group-hover:translate-y-0 transition-transform duration-300">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigate('/all_products');
                                        }}
                                        className="flex items-center justify-center w-full bg-white/90 backdrop-blur-md text-gray-900 py-3 rounded-xl font-bold shadow-xl cursor-pointer hover:bg-pink-500 hover:text-white transition-all">
                                        View Shop <span className="text-2xl px-2">→</span>
                                    </button>
                                </div>
                            </div>

                            {/* Product Info */}
                            <div className="space-y-1 px-2">
                                <p className="text-gray-500 text-sm font-serif">{item.subCategory}</p>

                                <span className="text-lg font-black text-pink-500 group-hover:text-gray-900 transition-colors">
                                    <span className='text-gray-500 font-medium text-sm mr-1'>Under</span>
                                    <span className="text-sm font-bold mr-0.5">₹</span>{item.price}
                                </span>

                            </div>
                        </div>
                    ))}
                </div>


            </div>

        </section>
    )
}

export default HomeBestSeller;