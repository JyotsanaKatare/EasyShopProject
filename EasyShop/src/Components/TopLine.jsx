
import React, { useState } from 'react'
import { IoIosArrowDown } from "react-icons/io";

function TopLine() {

    const [openDropdown, setOpenDropdown] = useState(null);
    const [selected, setSelected] = useState({
        lang: (<div className='font-bold'>ENG</div>),
        curr: (<div className='font-bold'>USD</div>)
    });

    const languages = ['ENG', 'SPA', 'ARI', 'UKR'];
    const currencies = ['USD', 'DZA', 'CAD', 'XCD'];

    const toggleDropdown = (name) => {
        setOpenDropdown(openDropdown === name ? null : name);
    };

    const handleSelect = (name, value) => {
        setSelected({ ...selected, [name]: value });
        setOpenDropdown(null);
    };

    return (
        <section className="w-full bg-gray-200 mb-3">

            <div className="max-w-6xl mx-auto py-2 flex justify-between">

                <p className='text-[15px]'>
                    World Wide Completely Free Returns and Free Shipping
                </p>
                
                {/* dropdown section */}
                <div className='flex gap-2'>
                    
                    {/* Language Dropdown */}
                    <div className="relative">
                        <div
                            onClick={() => toggleDropdown('lang')}
                            className="flex items-center gap-1 cursor-pointer text-[13px] font-medium text-gray-700"
                        >
                            <span className='font-bold'>{selected.lang}</span>
                            <IoIosArrowDown className={`transition-transform ${openDropdown === 'lang' ? 'rotate-180' : ''}`} />
                        </div>

                        {openDropdown === 'lang' && (
                            <ul className="absolute left-0 mt-2 w-20 bg-white border border-gray-200 shadow-md rounded-md z-100">
                                {languages.map((item) => (
                                    <li
                                        key={item}
                                        onClick={() => handleSelect('lang', item)}
                                        className="px-4 py-2 text-[12px] hover:bg-pink-500 hover:text-white cursor-pointer"
                                    >
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Vertical Divider */}
                    <div className="h-4 w-px bg-gray-400"></div>

                    {/* Currency Dropdown */}
                    <div className="relative">
                        <div
                            onClick={() => toggleDropdown('curr')}
                            className="flex items-center gap-1 cursor-pointer text-[13px] font-medium text-gray-700 "
                        >
                            <span className='font-bold'>{selected.curr}</span>
                            <IoIosArrowDown className={`transition-transform ${openDropdown === 'curr' ? 'rotate-180' : ''}`} />
                        </div>

                        {openDropdown === 'curr' && (
                            <ul className="absolute left-0 mt-2 w-20 bg-white border border-gray-200 shadow-md rounded-md z-100">
                                {currencies.map((item) => (
                                    <li
                                        key={item}
                                        onClick={() => handleSelect('curr', item)}
                                        className="px-4 py-2 text-[12px] hover:bg-pink-500 hover:text-white cursor-pointer"
                                    >
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                </div>
            </div>
        </section>
    )
}

export default TopLine;