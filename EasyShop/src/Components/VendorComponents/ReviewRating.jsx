
import React, { useState } from 'react';
import { HiOutlineSearch } from "react-icons/hi";
import { HiStar } from "react-icons/hi";
import { HiOutlineReply } from "react-icons/hi";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { HiOutlineChatAlt2 } from "react-icons/hi";
import { HiOutlineCheckCircle } from "react-icons/hi";
import { HiOutlineClock } from "react-icons/hi";

const cards = [
  { label: 'Avg. Rating', value: '4.8', detail: 'Out of 5.0', icon: HiStar, color: 'text-amber-500', bg: 'bg-amber-50', borderColor: 'border-amber-200' },
  { label: 'Total Reviews', value: '856', detail: '+24 this week', icon: HiOutlineChatAlt2, color: 'text-blue-500', bg: 'bg-blue-50', borderColor: 'border-blue-200' },
  { label: 'Response Rate', value: '92%', detail: 'Excellent', icon: HiOutlineCheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-50', borderColor: 'border-emerald-200' },
  { label: 'Pending Replies', value: '12', detail: 'Action required', icon: HiOutlineClock, color: 'text-rose-500', bg: 'bg-rose-50', borderColor: 'border-rose-200' },
];

const reviewData = [
  {
    id: "REV-101",
    productName: "Wireless Headphones",
    productImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=50&h=50&fit=crop",
    customerName: "Anjali Sharma",
    rating: 5,
    comment: "Amazing sound quality! Highly recommended.",
    date: "20 Mar, 2026",
    status: "Published"
  },
  {
    id: "REV-102",
    productName: "Smart Watch Z2",
    productImage: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=50&h=50&fit=crop",
    customerName: "Rahul Verma",
    rating: 2,
    comment: "Battery backup is not good. Disappointed.",
    date: "18 Mar, 2026",
    status: "Pending"
  },
  {
    id: "REV-103",
    productName: "Wireless Headphones",
    productImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=50&h=50&fit=crop",
    customerName: "Anjali Sharma",
    rating: 4,
    comment: "Amazing sound quality! Highly recommended.",
    date: "20 Mar, 2026",
    status: "Published"
  },
];

const statusMenu = [
  { id: 1, status: "Published" },
  { id: 2, status: "Pending" },
];

function ReviewRating() {

  const [isReplyOpen, setIsReplyOpen] = useState(null);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);

  const handlestatus = (status) => {
    setSelectedStatus(status);
    setIsStatusOpen(false);
  }

  return (
    <div className="space-y-6">

      {/* cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {cards.map((stat, idx) => (
          <div 
          key={idx}
           className={`p-5 bg-white dark:bg-slate-900 rounded-2xl border-b-2 border-l-4 border-r-0 border-t-0 dark:border-slate-800 shadow-sm hover:shadow-lg truncate
           ${stat.borderColor}`}>
            <div className={`w-10 h-10 rounded-xl ${stat.bg} dark:bg-opacity-10 ${stat.color} flex items-center justify-center mb-4`}>
              <stat.icon size={20} />
            </div>
            <h4 className="text-2xl font-black text-slate-800 dark:text-white">
              {stat.value}
            </h4>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
              {stat.label}
            </p>
            <p className="text-[10px] font-medium text-slate-500 mt-2">
              {stat.detail}
            </p>
          </div>
        ))}
      </div>

      {/* Table Container */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">

        {/* Header & Search/Filter */}
        <div className="p-4 border-b border-slate-50 dark:border-slate-800 flex flex-col lg:flex-row justify-between items-center md:text-start bg-white dark:bg-slate-800/20">

          <h3 className="text-[11px] md:text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider pb-5 lg:pb-0">
            Reviews
          </h3>

          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-5 lg:gap-3 w-full lg:w-auto">

            {/* Search Bar */}
            <div className="relative w-full lg:w-80 group">
              <HiOutlineSearch className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-pink-500 transition-colors" />
              <input
                type="text"
                placeholder="Search customer name, email..."
                className="w-full pl-8 md:pl-11 pr-4 py-2 bg-slate-50 border border-pink-50 dark:bg-slate-800 focus:border-pink-500 focus:bg-white dark:focus:bg-slate-900 rounded-xl text-sm outline-none transition-all shadow-sm placeholder:text-xs md:placeholder:text-[13px]"
              />
            </div>

            {/* dropdown */}
            <div className='relative w-full md:w-48 lg:w-auto '>

              <button
                onClick={() => setIsStatusOpen(!isStatusOpen)}
                className={`w-full dark:bg-slate-800 px-4 py-2 shadow-sm bg-slate-50 border border-pink-50 rounded-xl md:rounded-2xl flex justify-between items-center transition-all cursor-pointer
                      ${isStatusOpen ? 'border-pink-400 ring-2 ring-pink-50' : 'border-transparent hover:border-pink-200'}`}
              >
                <span className={`${selectedStatus ? 'text-slate-800 dark:text-white font-medium' : 'text-slate-400'} text-[11px] md:text-[14px] truncate mr-3`}>
                  {selectedStatus ? selectedStatus.status : 'All Status'}
                </span>

                <div className="shrink-0">
                  {isStatusOpen ? <IoIosArrowUp className='text-pink-500' /> : <IoIosArrowDown className='text-slate-400' />}
                </div>
              </button>

              {/* Dropdown Menu */}
              {isStatusOpen && (
                <div className='absolute z-50 w-full mt-2 bg-white dark:bg-slate-800 rounded-b-xl shadow-xl border border-pink-50 dark:border-slate-700 py-2 overflow-hidden animate-in fade-in zoom-in duration-200'>

                  <div className='max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700'>
                    {statusMenu.map((item, index) => (
                      <div
                        key={index}
                        onClick={() => handlestatus(item)}
                        className='px-4 py-1.5 hover:bg-pink-50 dark:hover:bg-slate-700 cursor-pointer text-slate-600 dark:text-slate-300 hover:text-pink-600 font-medium transition-colors text-[11px] md:text-[13px] border-b border-slate-50 dark:border-slate-700 last:border-none'
                      >
                        {item.status}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-50 dark:border-slate-800 text-[11px] uppercase tracking-widest text-slate-400 font-bold">

                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Rating</th>
                <th className="px-6 py-4">Comment</th>
                <th className="px-6 py-4">Feedback</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {reviewData.map((review, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group">

                  {/* 1. Index/ID */}
                  <td className="px-6 py-4 text-center">
                    <span className="text-xs font-bold text-slate-300">
                      {review.id}
                    </span>
                  </td>

                  {/* 2. Customer Profile */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={review.productImage}
                        alt={review.productName}
                        className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-700 shadow-sm"
                      />
                      <div className="min-w-0">
                        <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200 truncate">
                          {review.productName}
                        </h4>
                      </div>
                    </div>
                  </td>

                  {/* customer name */}
                  <td className="px-6 py-4 text-center sm:text-left">
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                      {review.customerName}
                    </span>
                  </td>

                  {/* rating */}
                  <td className="px-6 py-4 text-center sm:text-left">
                    <div className="flex items-center gap-0.5 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <HiStar key={i} size={14} className={i < review.rating ? "fill-current" : "text-slate-200"} />
                      ))}
                    </div>
                  </td>

                  {/* comment */}
                  <td className="px-6 py-4 max-w-50">
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                      {review.comment}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => setIsReplyOpen(review)}
                      className="text-[11px] font-bold text-pink-600 hover:bg-pink-50 dark:hover:bg-pink-500/10 px-3 py-1.5 rounded-lg border border-pink-100 dark:border-pink-500/20 transition-all flex items-center gap-1 ml-auto cursor-pointer"
                    >
                      <HiOutlineReply size={14} />
                      Reply
                    </button>
                  </td>

                  {/* Date */}
                  <td className="px-6 py-4 text-xs font-medium text-slate-500">
                    {review.date}
                  </td>

                  {/* status */}
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-lg text-[10px] font-extrabold uppercase border 
                           ${review.status === "Published" ?
                        "bg-emerald-50 text-emerald-600 border-emerald-100" :
                        "bg-slate-100 text-slate-500 border-slate-200"
                      }`}>
                      {review.status}
                    </span>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* reply popup */}
      {isReplyOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">

          <div
            onClick={() => setIsReplyOpen(null)}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" >
          </div>

          <div className="relative bg-white dark:bg-slate-900 rounded-2xl md:rounded-3xl p-4 md:p-6 w-full max-w-md shadow-2xl border border-slate-100 dark:border-slate-800 animate-in zoom-in duration-200">

            <h3 className="text-lg font-black text-slate-800 dark:text-white mb-4">
              Reply to Customer
            </h3>

            {/* review summary */}
            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl mb-4 border border-slate-100 dark:border-slate-800">

              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-200/50 dark:border-slate-700/50">
                <img
                  src={isReplyOpen.productImage}
                  alt={isReplyOpen.productName}
                  className="w-10 h-10 rounded-lg object-cover" />
                <span className="text-[11px] font-bold text-pink-600 dark:text-slate-200 truncate">
                  {isReplyOpen.productName}
                </span>
              </div>

              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">
                {isReplyOpen.customerName} said:
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-300 italic">
                "{isReplyOpen.comment}"
              </p>
            </div>

            {/* Reply Input */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Your Response</label>
              <textarea
                rows="4"
                placeholder="Type your reply here..."
                className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl text-sm outline-none focus:border-pink-500 transition-all resize-none"
              />
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setIsReplyOpen(null)}
                className="flex-1 py-3 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-50 transition-colors cursor-pointer">
                Cancel
              </button>

              <button className="flex-1 py-3 rounded-xl bg-pink-600 text-white text-xs font-bold hover:bg-pink-700 shadow-lg shadow-pink-200 dark:shadow-none transition-all cursor-pointer">
                Send Reply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ReviewRating;