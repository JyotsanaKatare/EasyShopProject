
//updated
import React from 'react'

function PolicyTerms() {
  return (
    <div className="bg-white min-h-[70vh] px-4 lg:px-6 py-10 md:py-12">
      <div className="max-w-6xl mx-auto"> 
        
        {/* Header Section */}
        <div className="mb-10 md:mb-12 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">Terms of Use</h1>
            <p className="text-slate-400 text-sm italic">Last Updated: March 2026</p>
        </div>

        <div className="space-y-10 md:space-y-12 text-slate-700 leading-relaxed">
          {/* Section 1 */}
          <section className="group">
            <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
              <span className="text-pink-500">01.</span>
              <span className="underline decoration-pink-500/30 group-hover:decoration-pink-500 transition-all">Acceptance of Terms</span>
            </h2>
            <p className="text-sm md:text-base pl-0 md:pl-10">
              By accessing and using <span className="font-semibold text-slate-900">Easy Shop</span>, you accept and agree to be bound by the terms and provision of this agreement.
            </p>
          </section>

          {/* Section 2 */}
          <section className="group">
            <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
              <span className="text-pink-500">02.</span>
              <span className="underline decoration-pink-500/30 group-hover:decoration-pink-500 transition-all">User Accounts</span>
            </h2>
            <p className="text-sm md:text-base pl-0 md:pl-10">
              To use certain features, you must register for an account. You are responsible for maintaining the <span className="italic">confidentiality</span> of your account credentials and all activities under your account.
            </p>
          </section>

          {/* Section 3 */}
          <section className="group">
            <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
              <span className="text-pink-500">03.</span>
              <span className="underline decoration-pink-500/30 group-hover:decoration-pink-500 transition-all">Intellectual Property</span>
            </h2>
            <p className="text-sm md:text-base pl-0 md:pl-10">
              All content, including logos, images, and text, are the intellectual property of <span className="text-pink-500 font-medium">Easy Shop</span>. Unauthorized use, reproduction, or distribution is strictly prohibited.
            </p>
          </section>
        </div>

        {/* Bottom Footer Note */}
        <div className="mt-16 pt-8 border-t border-slate-100 text-center md:text-left">
            <p className="text-xs text-slate-400">
                If you have any questions regarding these terms, please contact our legal team at support@easyshop.com
            </p>
        </div>
      </div>
    </div>
  )
}

export default PolicyTerms;