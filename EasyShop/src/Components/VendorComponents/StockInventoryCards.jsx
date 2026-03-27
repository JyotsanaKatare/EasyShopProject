
import React from 'react';
import { HiOutlineCube, HiOutlineExclamation, HiOutlineXCircle, HiOutlineTrendingUp } from 'react-icons/hi';
import CountUp from 'react-countup';

const cardItems = [
  {
    id: 1,
    title: "Total Inventory",
    para: "Total stock on hand.",
    icon: <HiOutlineCube />,
    value: "4250",
    growth: "Items",
    color: "bg-blue-500" // Neutral color for total
  },
  {
    id: 2,
    title: "Low Stock Alert",
    para: "Needs immediate restock.",
    icon: <HiOutlineExclamation />,
    value: "12",
    growth: "Immediate Action",
    color: "bg-amber-500" // Warning color (Orange/Yellow)
  },
  {
    id: 3,
    title: "Out of Stock",
    para: "Currently zero units.",
    icon: <HiOutlineXCircle />,
    value: "05",
    growth: "Restock Now",
    color: "bg-red-500" // Critical error color
  },
  {
    id: 4,
    title: "Inventory Value",
    para: "Total market worth.",
    icon: <HiOutlineTrendingUp />,
    value: "85400",
    growth: "Net Worth",
    color: "bg-pink-500" // Your brand theme color
  },
];

function StockInventoryCards({ setCurrentPage }) {
  return (
    <div>
      {/* Heading Section */}
       <div className="md:bg-white/80 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between text-center md:text-start gap-4 mb-3 md:mb-8">

        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white tracking-tight">
            Inventory Overview
          </h1>

          <p className="text-[11px] md:text-xs font-medium text-slate-500 dark:text-slate-400 mt-1 flex items-center justify-center md:justify-start gap-1 md:gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
            <span className="opacity-30">|</span>
            Real-time updates
          </p>
        </div>

        {/* Add Button */}
        <button
          onClick={() => setCurrentPage('Add Product')}
          className="w-full sm:w-auto bg-linear-to-br from-pink-500 to-pink-600 text-white px-2 md:px-5 py-2 md:py-2.5 rounded-xl text-sm font-bold hover:shadow-lg hover:shadow-pink-200 transition-all active:scale-95 shrink-0 cursor-pointer">
          + Add New
        </button>
      </div>

      {/* cards section */}
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-4 `}>
        {cardItems.map((card, index) => (
          <div
            key={index}
            className="p-5 md:p-6 bg-white dark:bg-slate-900 rounded-4xl border border-pink-50/50 dark:border-slate-800 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
          >
            {/* icons and status badge */}
            <div className="flex justify-between items-start">
              <div className={`p-3 rounded-2xl text-white shadow-md ${card.color} group-hover:scale-110 transition-transform`}>
                <div className='text-xl md:text-2xl'>
                  {card.icon}
                </div>
              </div>

              {/* Dynamic Badge Color: Red for warnings, Green for total */}
              <span className={`text-[10px] md:text-xs font-bold px-2 py-1 rounded-lg 
            ${card.id === 2 || card.id === 3
                  ? 'text-red-500 bg-red-50 dark:bg-red-500/10'
                  : 'text-green-500 bg-green-50 dark:bg-green-500/10'
                }`}>
                {card.growth}
              </span>
            </div>

            {/* title, value, para */}
            <div className="mt-5">
              <h3 className="text-slate-500 dark:text-slate-400 text-xs md:text-sm font-semibold tracking-wide">
                {card.title}
              </h3>

              <h2 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white mt-1">
                {/* Extracting number from string if it contains currency symbol or commas */}
                <CountUp
                  start={0}
                  end={typeof card.value === 'string' ? parseFloat(card.value.replace(/[^\d.]/g, '')) : card.value}
                  duration={2}
                  separator=","
                  prefix={card.id === 4 ? "₹" : ""}
                />
              </h2>

              <p className="text-[10px] md:text-xs text-slate-400 mt-2 leading-relaxed line-clamp-2">
                {card.para}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StockInventoryCards;