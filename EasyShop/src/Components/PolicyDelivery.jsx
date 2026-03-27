
//updated
import React from 'react'

function PolicyDelivery() {
    return (
    <div className="bg-white min-h-[70vh] px-4 lg:px-6 py-10 md:py-16">
        <div className="max-w-6xl mx-auto">
            
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-8 md:text-left text-center">
                Shipping & Delivery
            </h1>

            {/* Grid: Mobile par 1 column, Tablet/Desktop par 2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8 mb-10 md:mb-12">
                <div className="border border-slate-200 p-5 md:p-6 rounded-2xl hover:border-pink-200 transition-colors">
                    <h3 className="font-bold text-pink-600 mb-2 text-sm uppercase tracking-wide">Metro Cities</h3>
                    <p className="text-xl md:text-2xl font-bold text-slate-800">3 - 5 Days</p>
                    <p className="text-slate-500 text-xs md:text-sm mt-2">Delhi, Mumbai, Bangalore, etc.</p>
                </div>
                
                <div className="border border-slate-200 p-5 md:p-6 rounded-2xl hover:border-pink-200 transition-colors">
                    <h3 className="font-bold text-pink-600 mb-2 text-sm uppercase tracking-wide">Rest of India</h3>
                    <p className="text-xl md:text-2xl font-bold text-slate-800">5 - 7 Days</p>
                    <p className="text-slate-500 text-xs md:text-sm mt-2">Other towns and rural areas.</p>
                </div>
            </div>

            {/* Info Box: Padding responsive ki hai */}
            <div className="bg-pink-50 p-6 md:p-8 rounded-2xl border border-pink-100">
                <h2 className="text-lg md:text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-pink-500 rounded-full"></span>
                    Shipping Charges
                </h2>
                <ul className="list-none space-y-4 text-slate-700 text-sm md:text-base">
                    <li className="flex items-start gap-3">
                        <span className="text-pink-500 mt-1">●</span>
                        <p><span className="font-bold text-slate-900">FREE Shipping:</span> On all orders above ₹999.</p>
                    </li>
                    <li className="flex items-start gap-3">
                        <span className="text-pink-500 mt-1">●</span>
                        <p><span className="font-bold text-slate-900">Standard Fee:</span> ₹99 applicable on orders below ₹999.</p>
                    </li>
                    <li className="flex items-start gap-3">
                        <span className="text-pink-500 mt-1">●</span>
                        <p>Tracking link will be sent via SMS once dispatched.</p>
                    </li>
                </ul>
            </div>
            
        </div>
    </div>
)
}

export default PolicyDelivery;