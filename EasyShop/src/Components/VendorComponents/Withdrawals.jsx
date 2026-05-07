
import React, { useState } from 'react';
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { HiOutlineClock } from "react-icons/hi";
import { HiOutlineExternalLink } from "react-icons/hi";
import { HiOutlineDownload, HiOutlineSearch } from 'react-icons/hi';
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { HiOutlineDocumentDownload } from "react-icons/hi";
import { HiOutlinePrinter } from "react-icons/hi";
import { HiOutlineLibrary } from "react-icons/hi";
import { HiOutlineRefresh } from "react-icons/hi";

import WithdrawModal from './WithdrawModal';
import { useGetVendor } from '../../hook/useVendor';
import { useWithdrawList, useWithdrawStats } from '../../hook/useWithdraws';

const withdrawalData = [
  {
    id: "WDR-1021",
    date: "24 Mar, 2026",
    amount: 10500,
    method: "Bank Transfer",
    account: "SBI (....8890)",
    status: "Processing",
    utr: "N/A"
  },
  {
    id: "WDR-0982",
    date: "18 Mar, 2026",
    amount: 5000,
    method: "UPI",
    account: "jyotsana@okaxis",
    status: "Success",
    utr: "987251423101"
  }
];

const statusMenu = [
  { id: 1, status: "Completed" },
  { id: 2, status: "Pending" },
  { id: 3, status: "Rejected" }
];

function Withdrawals() {

  const { data: vendorData } = useGetVendor();
  const { data: stats, isLoading, isError } = useWithdrawStats();
  const { data: withdrawList } = useWithdrawList();

  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [isActionOpen, setIsActionOpen] = useState(false);

  const cards = [
    {
      label: "Available Balance",
      value: `₹${stats?.availableBalance?.toLocaleString() || '0'}`,
      icon: <HiOutlineCurrencyRupee />,
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      label: "Pending Settlement",
      value: `₹${stats?.pendingSettlement?.toLocaleString() || '0'}`,
      icon: <HiOutlineClock />,
      color: "text-orange-600",
      bg: "bg-orange-50"
    },
    {
      label: "Withdrawal In-Process", // Naya 4th Card
      value: `₹${stats?.inProcess?.toLocaleString() || '0'}`,
      icon: <HiOutlineRefresh />,
      color: "text-indigo-600",
      bg: "bg-indigo-50"
    },
    {
      label: "Total Withdrawn",
      value: `₹${stats?.totalWithdrawn?.toLocaleString() || '0'}`,
      icon: <HiOutlineExternalLink />,
      color: "text-emerald-600",
      bg: "bg-emerald-50"
    },
  ];

  if (isLoading) return <p>Loading details....</p>
  if (isError) return <p>Error in fetching details....</p>

  const handlestatus = (status) => {
    setSelectedStatus(status);
    setIsStatusOpen(false);
  };

  return (
    <div className="space-y-6">

      {/* top Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {cards.map((stat, i) => (
          <div
            key={i}
            className={`bg-white dark:bg-slate-900 p-4 md:p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-4 hover:shadow-md transition-all truncate
            ${stat.label === "Available Balance" ? 'ring-1 ring-transparent hover:ring-blue-100 dark:hover:ring-blue-900 cursor-pointer' : ''}`}
          >
            <div className={`w-11 h-11 md:w-12 md:h-12 shrink-0 rounded-xl 
              ${stat.bg} ${stat.color} flex items-center justify-center text-lg md:text-2xl`}>
              {stat.icon}
            </div>

            <div className="min-w-0">
              <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-tight truncate">
                {stat.label}
              </p>

              <h4 className="text-lg md:text-xl font-black text-slate-700 dark:text-white truncate">
                {stat.value}
              </h4>
            </div>
          </div>
        ))}
      </div>

      {/* Action Area */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-2 py-4">

        {/* Left Side: Main Action */}
        <button
          onClick={() => setIsActionOpen(true)}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-lg shadow-pink-200 dark:shadow-none transition-all active:scale-95 cursor-pointer">
          <HiOutlinePlusCircle size={20} />
          Request New Payout
        </button>

        {/* Right Side: Secondary Actions (Export) */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all shadow-sm">
            <HiOutlineDocumentDownload size={18} className="text-pink-500" />
            Export CSV
          </button>

          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all shadow-sm">
            <HiOutlinePrinter size={18} className="text-slate-400" />
            Print
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">

        {/* Header & Search/Filter */}
        <div className="p-4 border-b border-slate-50 dark:border-slate-800 flex flex-col lg:flex-row justify-between items-center md:text-start bg-white dark:bg-slate-800/20">

          <h3 className="text-[11px] md:text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider pb-5 lg:pb-0">
            Withdrawal History
          </h3>

          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-5 lg:gap-3 w-full lg:w-auto">

            {/* Search Bar */}
            <div className="relative w-full lg:w-80 group">
              <HiOutlineSearch className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-pink-500 transition-colors" />
              <input
                type="text"
                placeholder="Search Request ID..."
                className="w-full pl-8 md:pl-11 pr-4 py-2 bg-slate-50 border border-pink-50 dark:bg-slate-800 focus:border-pink-500 focus:bg-white dark:focus:bg-slate-900 rounded-xl text-sm outline-none transition-all shadow-sm placeholder:text-xs md:placeholder:text-[13px]"
              />
            </div>

            {/* status dropdown */}
            <div className='relative w-full md:w-48 lg:w-auto '>

              <button
                onClick={() => setIsStatusOpen(!isStatusOpen)}
                className={`w-full bg-slate-50 dark:bg-slate-800 px-4 py-2 rounded-xl flex justify-between items-center transition-all border border-pink-50 dark:bg-slate-800cursor-pointer shadow-sm cursor-pointer
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
                <div className='absolute z-50 w-full mt-2 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-pink-50 dark:border-slate-700 py-2 overflow-hidden animate-in fade-in zoom-in duration-200'>

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

          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-50 dark:border-slate-800 text-[11px] uppercase tracking-widest text-slate-400 font-bold">
                <th className="px-6 py-4">Request Id</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Payout Method</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">UTR / Ref No.</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {withdrawList.map((txn, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-pink-50/30 dark:hover:bg-slate-800/50 transition-colors group">

                  {/* 1. Request ID & Date */}
                  <td className="px-6 py-4">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                      {txn.requestId}
                    </span>
                    <p className="text-[10px] text-slate-400">
                      {new Date(txn.createdAt).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </p>
                  </td>

                  {/* 2. Amount - Isko bold aur clean rakha hai */}
                  <td className="px-6 py-4">
                    <span className="text-sm font-black text-slate-800 dark:text-white">
                      ₹{txn.amount.toLocaleString()}
                    </span>
                  </td>

                  {/* 3. Payout Method - Bank details dikhane ke liye */}
                  <td className="px-6 py-4">
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                      {txn.method}
                    </span>
                    <p className="text-[10px] text-pink-500 font-medium">
                      {txn.accountDetails?.bankName}
                    </p>
                  </td>

                  {/* 4. Status Badge - Alag-alag states ke liye colors */}
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-lg text-[10px] font-extrabold uppercase border 
                    ${txn.status === 'Approved' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                        txn.status === 'Processing' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                          txn.status === 'Rejected' ? 'bg-red-50 text-red-600 border-red-100' :
                            'bg-blue-50 text-blue-600 border-blue-100' // For Processing
                      }`}>
                      {txn.status}
                    </span>
                  </td>

                  {/* 5. UTR Number - Agar success hai toh number, warna N/A */}
                  <td className="px-6 py-4">
                    <span className={`text-xs font-mono 
                      ${txn.utr !== 'N/A' ? 'text-slate-600 dark:text-slate-300' : 'text-slate-300'}`}>
                      {txn.utr}
                    </span>
                  </td>

                  {/* 6. Action Button */}
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-white dark:hover:bg-slate-700 rounded-lg text-slate-400 hover:text-pink-500 shadow-sm border border-transparent hover:border-slate-100 transition-all">
                      <HiOutlineDownload size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Request Payout Modal */}
      <WithdrawModal
        isOpen={isActionOpen}
        onClose={() => setIsActionOpen(false)}
        vendorData={vendorData}
      />

    </div>
  )
}

export default Withdrawals;