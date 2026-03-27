
import React from 'react';
import { Link } from 'react-router-dom';
import { IoChevronForward } from 'react-icons/io5';

const Breadcrumbs = ({ items }) => {
    return (
        <section className="w-full bg-white px-4 lg:px-6">
            <div className="max-w-6xl mx-auto flex items-center gap-1 text-sm py-4 capitalize">
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;

                    return (
                        <div
                            key={index}
                            className="flex items-center overflow-x-auto whitespace-nowrap scrollbar-hide text-[12px] md:text-sm gap-1">
                            {/* Agar link hai aur last item nahi hai, toh Link dikhao */}
                            {!isLast && item.path ? (
                                <Link
                                    to={item.path}
                                    className="text-gray-500 hover:text-pink-500 transition-colors"
                                >
                                    {item.label}
                                </Link>
                            ) : (
                                /* Last item ya bina path wala item sirf text hoga */
                                <span className={`${isLast ? "text-gray-800 font-semibold" : "text-gray-500"}`}>
                                    {item.label}
                                </span>
                            )}

                            {/* Jab tak aakhri item na ho, arrow dikhao */}
                            {!isLast && <IoChevronForward className="text-gray-400 text-[10px]" />}
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default Breadcrumbs;