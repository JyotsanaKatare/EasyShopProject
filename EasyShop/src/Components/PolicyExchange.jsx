
//updated
import React from 'react'
import { useNavigate } from 'react-router-dom';

function PolicyExchange() {

    const navigate = useNavigate();

    return (
        <div className="bg-white min-h-[70vh] px-4 lg:px-6 py-10 md:py-16">
            <div className="max-w-6xl mx-auto">

                {/* Heading: Responsive font and alignment */}
                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-10 text-center md:text-left">
                    Exchange & <span className="text-pink-500">Return</span>
                </h1>

                <div className="space-y-8 md:space-y-10">
                    {/* Step 1 */}
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center sm:items-start text-center sm:text-left group">
                        <div className="bg-pink-100 text-pink-600 w-12 h-12 rounded-2xl flex items-center justify-center font-bold shrink-0 shadow-sm group-hover:bg-pink-500 group-hover:text-white transition-all duration-300">
                            1
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-800 mb-1">7-Day Window</h3>
                            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                                You must initiate a return request within <span className="font-semibold text-slate-900">7 days</span> of receiving the item.
                            </p>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center sm:items-start text-center sm:text-left group">
                        <div className="bg-pink-100 text-pink-600 w-12 h-12 rounded-2xl flex items-center justify-center font-bold shrink-0 shadow-sm group-hover:bg-pink-500 group-hover:text-white transition-all duration-300">
                            2
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-800 mb-1">Condition Check</h3>
                            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                                Items must be <span className="font-semibold text-slate-900">unwashed, unused</span>, and have all original tags attached.
                            </p>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center sm:items-start text-center sm:text-left group">
                        <div className="bg-pink-100 text-pink-600 w-12 h-12 rounded-2xl flex items-center justify-center font-bold shrink-0 shadow-sm group-hover:bg-pink-500 group-hover:text-white transition-all duration-300">
                            3
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-800 mb-1">Refund Processing</h3>
                            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                                Refunds are processed within <span className="font-semibold text-slate-900">5-7 business days</span> to your original bank account.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Optional: Return Button or Contact Info */}
                <div className="mt-16 p-6 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                    <p className="text-slate-500 text-sm mb-4">Have more questions about returns?</p>
                    <button
                        onClick={() => navigate("/contact_us")}
                        className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-pink-500 transition-all cursor-pointer">
                        Contact Support
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PolicyExchange;