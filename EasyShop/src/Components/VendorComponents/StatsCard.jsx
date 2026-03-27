
import React from 'react';
import { HiOutlineCurrencyRupee, HiOutlineShoppingBag, HiOutlineCube, HiOutlineStar } from "react-icons/hi";
import CountUp from 'react-countup';

const cardItems = [
    {
        id: 1,
        title: "Total Revenue",
        para: "Overall earnings from successful sales.",
        icon: <HiOutlineCurrencyRupee />,
        value: "124500",
        growth: "+12.5%", 
        color: "bg-pink-500"
    },
    {
        id: 2,
        title: "Total Orders",
        para: "Total number of orders received so far.",
        icon: <HiOutlineShoppingBag />,
        value: "1250",
        growth: "+8.2%",
        color: "bg-blue-500"
    },
    {
        id: 3,
        title: "Active Products",
        para: "Products currently live in your store.",
        icon: <HiOutlineCube />,
        value: "45",
        growth: "Live",
        color: "bg-purple-500"
    },
    {
        id: 4,
        title: "Average Rating",
        para: "Overall customer satisfaction score.",
        icon: <HiOutlineStar />,
        value: "4.8",
        growth: "Top Rated",
        color: "bg-amber-500"
    },
];

function StatsCard() {
    return (
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-4 `}>
            {cardItems.map((card, index) => (
                <div
                    key={index}
                    className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-pink-50 shadow-sm hover:shadow-md transition-all">

                    {/* icons and growth */}
                    <div className="flex justify-between items-start">

                        <div className={`p-3 rounded-xl text-white shadow-md ${card.color}`}>
                            {/* {React.cloneElement(card.icon, { className: 'w-6 h-6' })} */}
                            <p className='w-6 h-6 text-2xl'>{card.icon}</p>
                        </div>

                        <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-lg">
                            {card.growth}
                        </span>
                    </div>

                    {/* title, para, value */}
                    <div className="mt-4">
                        <h3 className="text-slate-500 text-sm font-medium">
                            {card.title}
                        </h3>

                        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
                            {card.value >= 0 && (
                                <>
                                    {/* Agar pehla card (Revenue) hai toh ₹ dikhao */}
                                    {card.id === 1 ? "₹" : ""}

                                    <CountUp
                                        start={0}
                                        end={card.value}
                                        duration={1.5}
                                    // separator="," // Numbers ke beech mein comma ke liye
                                    />
                                </>
                            )}
                        </h2>

                        <p className="text-xs text-slate-400 mt-1">
                            {card.para}
                        </p>
                    </div>
                </div>
            ))}

        </div>
    )
}

export default StatsCard