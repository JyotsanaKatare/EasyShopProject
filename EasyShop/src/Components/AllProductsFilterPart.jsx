
import React, { useEffect, useState } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

function AllProductsFilterPart({ activeCatId }) {

    const [isCatOpen, setIsCatOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState([]);

    const [isBrandOpen, setBrandOpen] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState([]);

    const [isPriceOpen, setIsPriceOpen] = useState(false);
    const [minPrice, setMinPrice] = useState(200);
    const [maxPrice, setMaxPrice] = useState(800);

    const [isColorOpen, setColorOpen] = useState(false);
    const [selectedColor, setSelectedColor] = useState([]);

    const [isSizeOpen, setSizeOpen] = useState(false);
    const [selectedSize, setSelectedSize] = useState([]);

    const minLimit = 0;
    const maxLimit = 1000;
    const step = 10; // Kitne gap mein slide hoga

    useEffect(() => {
        if (activeCatId && activeCatId !== "undefined") {
            const id = Number(activeCatId);
            // Sirf tabhi set karein agar id ek valid number ho
            if (!isNaN(id)) {
                setSelectedCategory([id]);
            }
        } else {
            setSelectedCategory([]); // Clear if no ID
        }
    }, [activeCatId]);

    const allCat = [
        {
            id: 1,
            catName: "Tops",
            pieces: 20
        },
        {
            id: 2,
            catName: "Bags",
            pieces: 20
        },
        {
            id: 3,
            catName: "Shoes",
            pieces: 20
        },
        {
            id: 4,
            catName: "Jeans",
            pieces: 20
        },
        {
            id: 5,
            catName: "Accessories",
            pieces: 20
        }
    ];

    const allBrands = [
        {
            id: 1,
            brandName: "Tops",
            pieces: 20
        },
        {
            id: 2,
            brandName: "Bags",
            pieces: 20
        },
        {
            id: 3,
            brandName: "Shoes",
            pieces: 20
        },
        {
            id: 4,
            brandName: "Jeans",
            pieces: 20
        },
        {
            id: 5,
            brandName: "Accessories",
            pieces: 20
        }
    ];

    const allColors = [
        {
            id: 1,
            colorName: "Yellow",
            pieces: 20
        },
        {
            id: 2,
            colorName: "Green",
            pieces: 20
        },
        {
            id: 3,
            colorName: "Blue",
            pieces: 20
        },
        {
            id: 4,
            colorName: "White",
            pieces: 20
        },
        {
            id: 5,
            colorName: "Gray",
            pieces: 20
        }
    ];

    const allSizes = [
        {
            id: 1,
            sizeName: "All",
            pieces: 24
        },
        {
            id: 2,
            sizeName: "Small",
            pieces: 10
        },
        {
            id: 3,
            sizeName: "Medium",
            pieces: 10
        },
        {
            id: 2,
            sizeName: "Large",
            pieces: 10
        },
    ];

    // generic handler function for drop down
    const handleCheckBoxChange = (item, selected, setSelected) => {
        if (selected.includes(item)) {
            setSelected(selected.filter((i) => i !== item));
        } else {
            setSelected([...selected, item]);
        }
    };

    const handleMinChange = (e) => {
        const value = Math.min(Number(e.target.value), maxPrice - 100);
        setMinPrice(value);
    }

    const handleMaxChange = (e) => {
        const value = Math.max(Number(e.target.value), minPrice + 100);
        setMaxPrice(value);
    }

    const clearAllFilters = () => {
        setSelectedCategory([]);
        setSelectedBrand([]);
        setSelectedColor([]);
        setSelectedSize([]);

        setIsCatOpen(false);
        setBrandOpen(false);
        setColorOpen(false);
        setSizeOpen(false);
        setIsPriceOpen(false);
    };

    return (
        <section className="w-full px-4">

            <div className='text-pink-500 text-[25px] font-semibold'>All Products</div>

            {/* clear all btn */}
            <div>
                <div className="flex items-center justify-between">
                    <h1 className="font-semibold text-[16px] pt-2">Filters :</h1>

                    {(selectedCategory.length > 0 ||
                        selectedBrand.length > 0 ||
                        selectedColor.length > 0 ||
                        selectedSize.length > 0) && (
                            <button
                                onClick={clearAllFilters}
                                className="text-pink-500 text-sm font-medium hover:underline cursor-pointer"
                            >
                                Remove All
                            </button>
                        )}
                </div>

                <div className="flex flex-wrap gap-2 mt-3">

                    {/* Category Chips */}
                    {selectedCategory.map((id) => {
                        // Find logic mein Number() ka use karein taaki data type match ho jaye
                        const cat = allCat.find((c) => Number(c.id) === Number(id));

                        return (
                            <div key={id}
                                className="flex items-center gap-2 bg-gray-100 border border-gray-200 px-3 py-1 rounded-md text-[13px] text-gray-700 font-medium animate-in fade-in zoom-in duration-200">
                                {/* Agar cat mil jaye toh name dikhao, varna ID dikhao (for debugging) */}
                                <span>{cat ? cat.catName : `${id}`}</span>

                                <button
                                    onClick={() => handleCheckBoxChange(id, selectedCategory, setSelectedCategory)}
                                    className="hover:text-pink-500 transition-colors p-0.5 rounded-full hover:bg-gray-200"
                                >
                                    <RxCross2 className="cursor-pointer text-[14px]" />
                                </button>
                            </div>
                        );
                    })}

                    {/*Brand Chips */}
                    {selectedBrand.map((id) => {
                        const brand = allBrands.find((b) => Number(b.id) === Number(id));

                        return (
                            <div key={id}
                                className="flex items-center gap-2 bg-gray-100 border border-gray-200 px-3 py-1 rounded-md text-[13px] text-gray-700 font-medium animate-in fade-in zoom-in duration-200">

                                <span>{brand ? brand.brandName : `${id}`}</span>

                                <button
                                    onClick={() => handleCheckBoxChange(id, selectedBrand, setSelectedBrand)}
                                    className="hover:text-pink-500 transition-colors p-0.5 rounded-full hover:bg-gray-200"
                                >
                                    <RxCross2 className="cursor-pointer text-[14px]" />
                                </button>
                            </div>
                        );
                    })}

                    {/*Color Chips */}
                    {selectedColor.map((id) => {
                        const color = allColors.find((clr) => Number(clr.id) === Number(id));
                        return (
                            <div
                                key={id}
                                className='flex items-center gap-2 bg-gray-100 border border-gray-200 px-3 py-1 rounded-md text-[13px] text-gray-700 font-medium animate-in fade-in zoom-in duration-200'
                            >
                                <span>{color ? color.colorName : `${id}`}</span>

                                <button
                                    onClick={() => handleCheckBoxChange(id, selectedColor, setSelectedColor)}
                                    className="hover:text-pink-500 transition-colors p-0.5 rounded-full hover:bg-gray-200"
                                >
                                    <RxCross2 className='cursor-pointer text-[14px]' />
                                </button>
                            </div>
                        )
                    })}

                    {/*size Chips */}
                    {selectedSize.map((id) => {
                        const size = allSizes.find((s) => Number(s.id) === Number(id));
                        return (
                            <div
                                key={id}
                                className='flex items-center gap-2 bg-gray-100 border border-gray-200 px-3 py-1 rounded-md text-[13px] text-gray-700 font-medium animate-in fade-in zoom-in duration-200'
                            >
                                <span>{size ? size.sizeName : `${id}`}</span>

                                <button
                                    onClick={() => handleCheckBoxChange(id, selectedSize, setSelectedSize)}
                                    className="hover:text-pink-500 transition-colors p-0.5 rounded-full hover:bg-gray-200"
                                >
                                    <RxCross2 className='cursor-pointer text-[14px]' />
                                </button>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* all categories  */}
            <div className='text-[18px] border-b border-[#CCCCCC] py-5'>
                <div
                    onClick={() => setIsCatOpen(!isCatOpen)}
                    className='cursor-pointer flex justify-between items-center'>

                    <h1 className="font-semibold text-[18px]">All Categories</h1>
                    {isCatOpen ? (
                        <IoIosArrowUp className="text-xl" />
                    ) : (
                        <IoIosArrowDown className="text-xl" />
                    )}
                </div>

                {isCatOpen && (
                    <div className='flex flex-col items-start pt-2 mt-2 space-y-2 animate-in fade-in slide-in-from-top-2 duration-300'>
                        {allCat.map((category, index) => (
                            <label
                                key={index}
                                className='flex items-center gap-4 text-left w-full cursor-pointer'
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedCategory.includes(category.catName)}
                                    onChange={() => handleCheckBoxChange(category.catName, selectedCategory, setSelectedCategory)}
                                    className='accent-pink-500 w-4 h-4 cursor-pointer'
                                />

                                <span className={`text-[15px] transition-colors 
                                    ${selectedCategory.includes(category.catName) ? 'text-pink-500' : 'text-gray-600 group-hover:text-pink-500'}`}>
                                    {category.catName}
                                </span>

                                <span className=" text-gray-500 text-[12px] font-medium bg-pink-50 px-2 py-0.5 rounded-full">
                                    {category.pieces}
                                </span>

                            </label>
                        ))}
                    </div>
                )}
            </div>

            {/* all brands  */}
            <div className='text-[18px] border-b border-[#CCCCCC] py-5'>
                <div
                    onClick={() => setBrandOpen(!isBrandOpen)}
                    className='cursor-pointer flex justify-between items-center'>

                    <h1 className="font-semibold text-[18px]">Brand</h1>
                    {isBrandOpen ? (
                        <IoIosArrowUp className="text-xl" />
                    ) : (
                        <IoIosArrowDown className="text-xl" />
                    )}
                </div>

                {isBrandOpen && (
                    <div className='flex flex-col items-start pt-2 mt-2 space-y-2 animate-in fade-in slide-in-from-top-2 duration-300'>
                        {allBrands.map((brand, index) => (
                            <label
                                key={index}
                                className='flex items-center gap-4 text-left w-full cursor-pointer'
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedBrand.includes(brand.brandName)}
                                    onChange={() => handleCheckBoxChange(brand.brandName, selectedBrand, setSelectedBrand)}
                                    className='accent-pink-500 w-4 h-4 cursor-pointer'
                                />

                                <span className={`text-[15px] transition-colors 
                                    ${selectedBrand.includes(brand.brandName) ? 'text-pink-500' : 'text-gray-600 group-hover:text-pink-500'}`}>
                                    {brand.brandName}
                                </span>

                                <span className=" text-gray-500 text-[12px] font-medium bg-pink-50 px-2 py-0.5 rounded-full">
                                    {brand.pieces}
                                </span>

                            </label>
                        ))}
                    </div>
                )}
            </div>

            {/* price  */}
            <div className='text-[18px] border-b border-[#CCCCCC] py-5'>
                <div
                    onClick={() => setIsPriceOpen(!isPriceOpen)}
                    className='cursor-pointer flex justify-between items-center'>

                    <h1 className="font-semibold text-[18px]">Price</h1>
                    {isPriceOpen ? (
                        <IoIosArrowUp className="text-xl" />
                    ) : (
                        <IoIosArrowDown className="text-xl" />
                    )}
                </div>

                {isPriceOpen && (
                    <div>
                        <div className="relative w-full h-1.5 bg-gray-200 rounded-full">
                            {/* Dynamic Pink Track: Jo dono handle ke beech dikhegi */}
                            <div
                                className="absolute h-1.5 bg-pink-500 rounded-full"
                                style={{
                                    left: `${(minPrice / maxLimit) * 100}%`,
                                    right: `${100 - (maxPrice / maxLimit) * 100}%`
                                }}
                            ></div>

                            {/* Input sliders - Dono overlap ho rahe hain */}
                            <input
                                type="range"
                                min={minLimit}
                                max={maxLimit}
                                step={step}
                                value={minPrice}
                                onChange={handleMinChange}
                                className="absolute w-full h-1.5 bg-transparent appearance-none pointer-events-none cursor-pointer accent-pink-600"
                                style={{ zIndex: minPrice > maxLimit / 2 ? 5 : 4 }}
                            />

                            <input
                                type="range"
                                min={minLimit}
                                max={maxLimit}
                                step={step}
                                value={maxPrice}
                                onChange={handleMaxChange}
                                className="absolute w-full h-1.5 bg-transparent appearance-none pointer-events-none cursor-pointer accent-pink-600"
                                style={{ zIndex: 4 }}
                            />
                        </div>

                        {/* Labels: Niche price dikhane ke liye */}
                        <div className="flex justify-between items-center mt-8 font-medium">
                            <div className="text-gray-600 text-sm">
                                Min: <span className="text-gray-900">₹{minPrice}</span>
                            </div>
                            <div className="text-gray-600 text-sm">
                                Max: <span className="text-gray-900">₹{maxPrice}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* all colors  */}
            <div className='text-[18px] border-b border-[#CCCCCC] py-5'>
                <div
                    onClick={() => setColorOpen(!isColorOpen)}
                    className='cursor-pointer flex justify-between items-center'>

                    <h1 className="font-semibold text-[18px]">Color</h1>
                    {isColorOpen ? (
                        <IoIosArrowUp className="text-xl" />
                    ) : (
                        <IoIosArrowDown className="text-xl" />
                    )}
                </div>

                {isColorOpen && (
                    <div className='flex flex-col items-start pt-2 mt-2 space-y-2 animate-in fade-in slide-in-from-top-2 duration-300'>
                        {allColors.map((color, index) => (
                            <label
                                key={index}
                                className='flex items-center gap-4 text-left w-full cursor-pointer'
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedColor.includes(color.colorName)}
                                    onChange={() => handleCheckBoxChange(color.colorName, selectedColor, setSelectedColor)}
                                    className='accent-pink-500 w-4 h-4 cursor-pointer'
                                />

                                <span className={`text-[15px] transition-colors 
                                    ${selectedColor.includes(color.colorName) ? 'text-pink-500' : 'text-gray-600 group-hover:text-pink-500'}`}>
                                    {color.colorName}
                                </span>

                                <span className=" text-gray-500 text-[12px] font-medium bg-pink-50 px-2 py-0.5 rounded-full">
                                    {color.pieces}
                                </span>

                            </label>
                        ))}
                    </div>
                )}
            </div>

            {/* all sizes  */}
            <div className='text-[18px] border-b border-[#CCCCCC] py-5'>
                <div
                    onClick={() => setSizeOpen(!isSizeOpen)}
                    className='cursor-pointer flex justify-between items-center'>

                    <h1 className="font-semibold text-[18px]">Size</h1>
                    {isSizeOpen ? (
                        <IoIosArrowUp className="text-xl" />
                    ) : (
                        <IoIosArrowDown className="text-xl" />
                    )}
                </div>

                {isSizeOpen && (
                    <div className='flex flex-col items-start pt-2 mt-2 space-y-2 animate-in fade-in slide-in-from-top-2 duration-300'>
                        {allSizes.map((size, index) => (
                            <label
                                key={index}
                                className='flex items-center gap-4 text-left w-full cursor-pointer'
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedSize.includes(size.sizeName)}
                                    onChange={() => handleCheckBoxChange(size.sizeName, selectedSize, setSelectedSize)}
                                    className='accent-pink-500 w-4 h-4 cursor-pointer'
                                />

                                <span className={`text-[15px] transition-colors 
                                    ${selectedSize.includes(size.sizeName) ? 'text-pink-500' : 'text-gray-600 group-hover:text-pink-500'}`}>
                                    {size.sizeName}
                                </span>

                                <span className=" text-gray-500 text-[12px] font-medium bg-pink-50 px-2 py-0.5 rounded-full">
                                    {size.pieces}
                                </span>

                            </label>
                        ))}
                    </div>
                )}
            </div>

        </section>
    )
}

export default AllProductsFilterPart;