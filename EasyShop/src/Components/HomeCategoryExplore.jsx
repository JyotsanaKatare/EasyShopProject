
//updated
import React, { useState } from 'react'
import WomenImg1 from '../assets/Images/WomenImg1.jpg';
import WomenImg2 from '../assets/Images/WomenImg2.jpg';
import WomenImg3 from '../assets/Images/WomenImg3.jpg';
import MenImg1 from '../assets/Images/MenImg1.jpg';
import MenImg2 from '../assets/Images/MenImg2.jpg';
import MenImg3 from '../assets/Images/MenImg3.jpg';
import KidImg1 from '../assets/Images/KidImg1.jpg';
import KidImg2 from '../assets/Images/KidImg2.jpg';
import KidImg3 from '../assets/Images/KidImg3.jpeg';
import KidImg4 from '../assets/Images/KidImg4.jpeg';

function HomeCategoryExplore() {

    const [activeIndex, setActiveIndex] = useState(0);

    const tabs = [
        { id: 1, category: "Women", label: "Women Wear" },
        { id: 2, category: "Men", label: "Men Wear" },
        { id: 3, category: "Kids", label: "Kids Wear" },
    ];

    const womenProd = [
        {
            img: WomenImg1,
            category: "Women",
            subCategory: "Ethnic Wear"
        },
        {
            img: WomenImg2,
            category: "Women",
            subCategory: "Western Wear"
        },
        {
            img: WomenImg3,
            category: "Women",
            subCategory: "Party Wear"
        },
        {
            img: WomenImg1,
            category: "Women",
            subCategory: "Casual Wear"
        },
        {
            img: WomenImg2,
            category: "Women",
            subCategory: "Formal Wear"
        },
    ];

    const menProd = [
        {
            img: MenImg1,
            category: "Men",
            subCategory: "Formal Suits"
        },
        {
            img: MenImg2,
            category: "Men",
            subCategory: "Casual Shirts"
        },
        {
            img: MenImg3,
            category: "Men",
            subCategory: "Activewear"
        },
        {
            img: MenImg2,
            category: "Men",
            subCategory: "Denim"
        },
        {
            img: MenImg3,
            category: "Men",
            subCategory: "Jackets"
        },
    ];

    const kidProd = [
        {
            img: KidImg1,
            category: "Kids",
            subCategory: "Infant Wear"
        },
        {
            img: KidImg2,
            category: "Kids",
            subCategory: "Toddler Outfits"
        },
        {
            img: KidImg3,
            category: "Kids",
            subCategory: "School Uniforms"
        },
        {
            img: KidImg4,
            category: "Kids",
            subCategory: "Nightwear"
        },
    ];

    const getAllProd = () => {
        if (activeIndex === 0) return womenProd;
        else if (activeIndex === 1) return menProd;
        else return kidProd;
    };

    const allCategories = getAllProd();

    return (
        <section className="w-full py-8 md:py-16 px-4 lg:px-6">
            <div className="max-w-6xl mx-auto">

                {/* heading */}
                <div className="flex flex-col items-center mb-8 md:mb-12">
                    <h2 className="text-2xl md:text-4xl font-bold text-gray-800 tracking-tight">
                        Curated Collections
                    </h2>

                    <div className="w-20 h-1 md:h-1.5 bg-pink-500 rounded-full mt-2 md:mt-3"></div>

                    <p className="text-gray-500 mt-4 text-[12px] text-center md:text-sm uppercase tracking-widest">
                        Handpicked fashion for your unique personality
                    </p>
                </div>

                {/* for mobile tab */}
                <div className='md:hidden w-full flex justify-between mb-8 '>
                    {tabs.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            className={` w-full px-2 py-1 flex justify-center items-center border border-gray-200 cursor-pointer transition-all duration-300 shadow-sm
                                       ${activeIndex === index ? "text-white bg-pink-500 font-bold" : "text-pink-500 bg-white "}
                                       ${index === 0
                                    ? "rounded-tl-lg rounded-bl-lg"
                                    : index === tabs.length - 1
                                        ? "rounded-tr-lg rounded-br-lg"
                                        : "rounded-none"
                                }`}>

                            <button className="text-sm tracking-wide ">
                                {item.label}
                            </button>
                        </div>
                    ))}
                </div>

                <div className='flex gap-4 md:gap-8'>

                    {/* left side - tabs */}
                    <div className='hidden md:flex flex-col w-[25%] bg-pink-100 border-r border-gray-100 shadow-md'>
                        {tabs.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => setActiveIndex(index)}
                                className={`relative py-4 px-6 cursor-pointer transition-all duration-300
                                        ${activeIndex === index
                                        ? "bg-white text-pink-600 font-bold"
                                        : "text-gray-700 hover:bg-pink-200"
                                    }`}
                            >
                                {/* Active Indicator (Vertical Line) */}
                                {activeIndex === index && (
                                    <div className="absolute left-0 top-0 h-full w-1 bg-pink-500 shadow-[2px_0_10px_rgba(236,72,153,0.3)]"></div>
                                )}

                                <span className="text-sm md:text-base tracking-wide uppercase">
                                    {item.label}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* right side - catalogue*/}
                    <div className='w-full md:w-[75%]'>
                        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-10 p-2 md:px-4 md:py-6'>
                            {allCategories.map((item, index) => (
                                <div
                                    key={index}
                                    className='group flex flex-col items-center cursor-pointer'
                                >
                                    <div className='relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden bg-gray-50 ring-0 group-hover:ring-4 ring-pink-100 transition-all duration-300'>
                                        <img
                                            src={item.img}
                                            alt={item.subCategory}
                                            className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
                                        />
                                    </div>

                                    {/* Text: Image ke niche center mein */}
                                    <div className='mt-2 md:mt-4 text-center'>
                                        <span className='text-sm md:text-base font-bold text-gray-700 group-hover:text-pink-500 transition-colors duration-300'>
                                            {item.subCategory}
                                        </span>
                                        {/* Chota sa active indicator ya "Shop" text (Optional) */}
                                        <div className='w-0 h-0.5 bg-pink-500 mx-auto group-hover:w-full transition-all duration-300 mt-1'></div>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default HomeCategoryExplore;