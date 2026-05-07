
import React, { useEffect, useState } from 'react'

import { useCatList } from '../hook/useCategories';
import { useSubCatByCategory } from '../hook/useSubCategories';
import { useNavigate } from 'react-router-dom';

function HomeCategoryExplore() {

    const navigate = useNavigate();
    const [activeIndex, setActiveIndex] = useState(null);

    const { data: catList, isLoading: isCatLoading, isError } = useCatList();
    const { data: subCatList, isLoading: isSubLoading } = useSubCatByCategory(activeIndex);

    const curatedTabs = catList?.filter(item =>
        ['mens-wear', 'womens-wear', 'kids-wear'].includes(item.slug)
    ) || [];

    // default tab set
    useEffect(() => {
        if (curatedTabs.length > 0 && !activeIndex) {
            const defaultTab = curatedTabs.find(c => c.slug === 'womens-wear') || curatedTabs[0];
            setActiveIndex(defaultTab._id);
        }
    }, [curatedTabs, activeIndex]);

    if (isError) return <p className="text-center py-10 text-red-500">Something went wrong!</p>;

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
                    {curatedTabs.map((cat, index) => (
                        <div
                            key={index}
                            onClick={() => setActiveIndex(cat._id)}
                            className={` w-full px-2 py-1 flex justify-center items-center border border-gray-200 cursor-pointer transition-all duration-300 shadow-sm
                                       ${activeIndex === cat._id ? "text-white bg-pink-500 font-bold" : "text-pink-500 bg-white "}
                                       ${index === 0
                                    ? "rounded-tl-lg rounded-bl-lg"
                                    : index === curatedTabs.length - 1
                                        ? "rounded-tr-lg rounded-br-lg"
                                        : "rounded-none"
                                }`}>

                            <button className="text-sm tracking-wide ">
                                {cat.catName}
                            </button>
                        </div>
                    ))}
                </div>

                <div className='flex gap-4 md:gap-8'>

                    {/* left side - tabs */}
                    <div className='hidden md:flex flex-col w-[25%] bg-pink-100 border-r border-gray-100 shadow-md'>
                        {curatedTabs.length > 0 ? (
                            curatedTabs.map((cat) => (
                                <div
                                    key={cat._id}
                                    onClick={() => setActiveIndex(cat._id)} // cat_id ki jagah cat._id
                                    className={`relative py-5 px-8 cursor-pointer transition-all duration-300
                                        ${activeIndex === cat._id
                                            ? "bg-white text-pink-600 font-bold"
                                            : "text-gray-500 hover:bg-pink-100"
                                        }`}
                                >
                                    {/* Active Indicator */}
                                    {activeIndex === cat._id && (
                                        <div className="absolute left-0 top-0 h-full w-1.5 bg-pink-500"></div>
                                    )}

                                    <span className="text-sm font-semibold tracking-wider uppercase">
                                        {cat.catName}
                                    </span>
                                </div>
                            ))
                        ) : (
                            <p className="p-4 text-xs text-gray-400 text-center">Loading Tabs...</p>
                        )}
                    </div>

                    {/* right side - catalogue*/}
                    <div className='w-full md:w-[75%]'>
                        {isSubLoading ? (
                            <div className="flex justify-center items-center py-20">
                                <p className="animate-pulse text-pink-500 font-medium">Loading Collection...</p>
                            </div>
                        ) : (
                            <div
                                className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6'>
                                {subCatList && subCatList.length > 0 ? (
                                    subCatList.map((subCat) => (
                                        <div
                                            key={subCat._id}
                                            onClick={() => navigate(`/all_products/${subCat?.catId?._id}/${subCat?.catId?.catName}?subCatId=${subCat?._id}`)}
                                            className='group flex flex-col items-center cursor-pointer'
                                        >
                                            <div className='relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden bg-gray-50 group-hover:ring-4 ring-pink-100 transition-all duration-300 shadow-md'>
                                                <img
                                                    src={subCat.subCatImage}
                                                    alt={subCat.subCatName}
                                                    className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
                                                />
                                            </div>

                                            <div className='mt-4 text-center'>
                                                <span className='text-sm md:text-base font-bold text-gray-700 group-hover:text-pink-600 transition-colors'>
                                                    {subCat.subCatName}
                                                </span>
                                                <div className='w-0 h-0.5 bg-pink-500 mx-auto group-hover:w-full transition-all duration-300 mt-1'></div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="col-span-full py-20 text-center text-gray-400">
                                        No sub-categories found in this section.
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </section>
    )
}

export default HomeCategoryExplore;