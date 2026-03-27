
import React, { useState } from 'react';
import { HiOutlineTicket } from "react-icons/hi";
import { HiOutlineUserGroup } from "react-icons/hi";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { HiOutlineClock } from "react-icons/hi";
import { HiOutlineSearch } from 'react-icons/hi';
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { HiOutlinePlus } from "react-icons/hi";
import { TbEdit } from "react-icons/tb";
import { LiaTrashSolid } from "react-icons/lia";

const cards = [
  {
    label: 'Active Coupons',
    value: '12',
    detail: 'Live on store',
    icon: HiOutlineTicket,
    text: 'text-purple-500',
    bg: 'bg-purple-50',
    borderColor: 'border-purple-300',
    badge: "text-purple-700 bg-purple-50"
  },
  {
    label: 'Total Redemptions',
    value: '1,450',
    detail: '+12% from last month',
    icon: HiOutlineUserGroup,
    text: 'text-blue-500',
    bg: 'bg-blue-50',
    borderColor: 'border-blue-300',
    badge: "text-blue-700 bg-blue-50"
  },
  {
    label: 'Revenue Generated',
    value: '₹85,200',
    detail: 'Via promo codes',
    icon: HiOutlineCurrencyRupee,
    text: 'text-emerald-500',
    bg: 'bg-emerald-50',
    borderColor: 'border-emerald-300',
    badge: "text-green-700 bg-green-50"
  },
  {
    label: 'Expired Offers',
    value: '08',
    detail: 'In last 30 days',
    icon: HiOutlineClock,
    text: 'text-rose-500',
    bg: 'bg-rose-50',
    borderColor: 'border-rose-300',
    badge: "text-red-700 bg-red-50"
  },
];

const offersData = [
  {
    id: "#OFF-001",
    code: "SUMMER20",
    type: "Percentage",
    value: "20%",
    usage: 45, // Numbers mein rakhein taaki % calculate ho sake
    totalLimit: 100,
    minPurchase: "₹2,000",
    expiry: "15 Mar, 2026",
    status: "Active"
  },
  {
    id: "#OFF-002",
    code: "FIRST500",
    type: "Fixed Amount",
    value: "₹500",
    usage: 22,
    totalLimit: 200,
    minPurchase: "₹5,000",
    expiry: "10 May, 2026",
    status: "Inactive"
  }
];

const statusMenu = [
  { id: 1, status: "All Status" },
  { id: 2, status: "Active" },
  { id: 3, status: "Inactive" },
  { id: 4, status: "Expired" },
];

function DiscountOffer({ setCurrentPage }) {

  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [discountList, setDiscountList] = useState(offersData)

  const handlestatus = (status) => {
    setSelectedStatus(status);
    setIsStatusOpen(false);
  };

  // table
  const handleToggleStatus = (discountId, newStatus) => {
    const updateDiscount = discountList.map(discount => {
      if (discount.id === discountId) {
        return { ...discount, status: newStatus }
      }
      return discount;
    })
    setDiscountList(updateDiscount);
  }

  return (
    <div className='space-y-6'>

      {/* cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {cards.map((stat, i) => (
          <div
            key={i}
            className={`px-4 py-3 md:p-5 bg-white dark:bg-slate-900 rounded-2xl border-b-2 border-l-4 border-r-0 border-t-0 dark:border-slate-800 shadow-sm hover:shadow-lg truncate
           ${stat.borderColor}`}>

            <div className='flex justify-between items-start'>
              <div className={`w-10 h-10 rounded-xl ${stat.bg} dark:bg-opacity-10 ${stat.text} flex items-center justify-center mb-4`}>
                <stat.icon size={20} />
              </div>

              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${stat.badge}`}>
                {stat.detail}
              </span>
            </div>

            <div className="min-w-0">

              <h4 className="text-xl font-black text-slate-800 dark:text-white">
                {stat.value}
              </h4>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                {stat.label}
              </p>

            </div>
          </div>
        ))}
      </div>

      {/* table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">

        {/* Header & Search/Filter */}
        <div className="p-4 border-b border-slate-50 dark:border-slate-800 flex flex-col lg:flex-row justify-between items-center md:text-start bg-white dark:bg-slate-800/20">

          <h3 className="text-[11px] md:text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider pb-5 lg:pb-0">
            Discounts and Offer
          </h3>

          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-5 lg:gap-3 w-full lg:w-auto">

            {/* Search Bar */}
            <div className="relative w-full lg:w-80 group">
              <HiOutlineSearch className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-pink-500 transition-colors" />
              <input
                type="text"
                placeholder="Search Coupon Code, Offer ID..."
                className="w-full pl-8 md:pl-11 pr-4 py-2 bg-slate-50 border border-pink-50 dark:bg-slate-800 focus:border-pink-500 focus:bg-white dark:focus:bg-slate-900 rounded-xl text-sm outline-none transition-all shadow-sm placeholder:text-xs md:placeholder:text-[13px]"
              />
            </div>

            {/* dropdown */}
            <div className='relative w-full md:w-48 lg:w-auto'>

              <button
                onClick={() => setIsStatusOpen(!isStatusOpen)}
                className={`w-full bg-slate-50 dark:bg-slate-800 px-4 py-2 rounded-xl flex justify-between items-center transition-all border cursor-pointer shadow-md
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
                        className='px-4 py-1.5 hover:bg-pink-50 dark:hover:bg-slate-700 cursor-pointer text-slate-700 dark:text-slate-300 hover:text-pink-600 font-medium transition-colors text-[11px] md:text-[13px] border-b border-slate-50 dark:border-slate-700 last:border-none'
                      >
                        {item.status}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* add btn */}
            <button
              onClick={() => setCurrentPage("Add Coupon")}
              className="w-full lg:w-auto lg:px-4 py-2.5 bg-pink-500 hover:bg-pink-600 text-white text-xs font-bold rounded-xl shadow-lg shadow-pink-200 dark:shadow-none flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-90"
            >
              <HiOutlinePlus size={16} />
              Create New Offer
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-50 dark:border-slate-800 text-[11px] uppercase tracking-widest text-slate-400 font-bold">
                <th className="px-6 py-4 text-center">ID</th>
                <th className="px-6 py-4">Coupon Code</th>
                <th className="px-6 py-4">Discount</th>
                <th className="px-6 py-4">Usage Status</th>
                <th className="px-6 py-4">Min. Purchase</th>
                <th className="px-6 py-4">Expiry</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {discountList.map((offer, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-pink-50/30 dark:hover:bg-slate-800/50 transition-colors group">

                  <td className="px-6 py-4 text-center text-xs font-bold text-slate-400">
                    {offer.id}
                  </td>

                  {/* 2. Coupon Code (Highlighted) */}
                  <td className="px-6 py-4">
                    <span className="px-3 py-1.5 bg-pink-50 dark:bg-indigo-500/10 text-pink-600 dark:text-pink-400 rounded-lg text-xs font-black border border-indigo-100 dark:border-indigo-500/20 uppercase tracking-wider">
                      {offer.code}
                    </span>
                  </td>
                  {/* 3. Discount Value */}
                  <td className="px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-200">
                    {offer.value} <span className="text-[10px] text-slate-400 font-medium ml-1">({offer.type})</span>
                  </td>

                  {/* 4. Usage Progress Bar */}
                  <td className="px-6 py-4 min-w-38">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex justify-between text-[10px] font-bold text-slate-500">
                        <span>{offer.usage} Used</span>
                        <span>{offer.totalLimit} Limit</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                          style={{ width: `${Math.min((offer.usage / offer.totalLimit) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>

                  {/* 5. Min Purchase */}
                  <td className="px-6 py-4 text-xs font-bold text-slate-600 dark:text-slate-300">
                    {offer.minPurchase}
                  </td>

                  {/* 6. Expiry Date */}
                  <td className="px-6 py-4 text-xs font-medium text-slate-500">
                    {offer.expiry}
                  </td>

                  {/* 7. Status */}
                  <td className="px-6 py-4">
                    {new Date(offer.expiry) < new Date() ? (
                      <span className="px-2 py-1 rounded-lg text-[10px] font-extrabold uppercase border bg-rose-50 text-rose-600 border-rose-200">
                        Expired
                      </span>
                    ) : (
                      <select
                        value={offer.status}
                        onChange={(e) => handleToggleStatus(offer.id, e.target.value)}
                        className={`px-2 py-1 rounded-lg text-[10px] font-extrabold uppercase border cursor-pointer focus:outline-none transition-all
                                    ${offer.status === 'Active' ?
                            'bg-emerald-50 text-emerald-600 border-emerald-200' :
                            'bg-amber-50 text-amber-600 border-amber-200'}`}
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>

                      </select>
                    )}

                  </td>

                  {/* 8. Action Buttons */}
                  <td className="px-6 py-4">
                    <div className="flex justify-center items-center gap-2">
                      <button
                        // onClick={() => setIsEditOpen(true)}
                        className="p-2 rounded-lg bg-amber-50 text-amber-500 hover:bg-amber-500 hover:text-white transition-all active:scale-90 cursor-pointer">
                        <TbEdit className="text-lg md:text-xl" />
                      </button>

                      <button
                        // onClick={() => setIsDeletedOpen(true)}
                        className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all active:scale-90 cursor-pointer">
                        <LiaTrashSolid className="text-lg md:text-xl" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div >
  )
}

export default DiscountOffer;