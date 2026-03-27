
//updated
import React from 'react'

function PolicyPrivacy() {
    return (
        <div className="bg-white min-h-[70vh] px-4 lg:px-6 py-10 md:py-12">
            {/* Main Card: Mobile par p-6 aur desktop par p-12 */}
            <div className="max-w-6xl mx-auto bg-white p-6 md:p-12 shadow-sm rounded-3xl md:rounded-2xl border border-slate-100">

                {/* Header Section */}
                <div className="text-center mb-8 md:mb-12">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">Privacy Policy</h1>
                    <div className="w-16 md:w-20 h-1.5 bg-pink-500 mx-auto rounded-full"></div>
                </div>

                <div className="space-y-8 md:space-y-10 text-slate-600">
                    {/* Highlighted Note */}
                    <div className="bg-slate-50 p-5 md:p-6 rounded-2xl border-l-4 border-pink-500 shadow-sm">
                        <h2 className="text-lg font-bold text-slate-800 mb-2">Data We Collect</h2>
                        <p className="text-sm md:text-base leading-relaxed">
                            We collect your name, shipping address, and phone number solely for order fulfillment and customer support.
                        </p>
                    </div>

                    {/* Info Sections */}
                    <section className="px-1 md:px-2">
                        <h2 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
                            <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                            How We Protect You
                        </h2>
                        <p className="text-sm md:text-base leading-relaxed pl-4">
                            We use <span className="text-slate-900 font-medium">SSL encryption</span> to ensure your personal data is safe. We never sell your data to third-party advertisers.
                        </p>
                    </section>

                    <section className="px-1 md:px-2">
                        <h2 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
                            <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                            Cookies
                        </h2>
                        <p className="text-sm md:text-base leading-relaxed pl-4">
                            We use cookies to remember your login and cart items. You can disable cookies in your browser settings if you prefer.
                        </p>
                    </section>

                    {/* Additional Note for Trust */}
                    <div className="mt-10 pt-8 border-t border-slate-100 text-center">
                        <p className="text-xs text-slate-400">
                            Last Updated: March 2026. For any queries, contact our legal team.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PolicyPrivacy;