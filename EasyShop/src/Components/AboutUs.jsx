
//updated
import React from 'react'
import { useNavigate } from 'react-router-dom';

function AboutUs() {

    const navigate = useNavigate();

    return (
        <section className="bg-white">

            {/* Top Section */}
            <div className="bg-linear-to-b from-pink-50 to-pink-50 py-12 md:py-24 lg:py-32 px-4 lg:px-6 text-center">
                <div className="max-w-3xl mx-auto">

                    {/* Simple Text Badge */}
                    <p className="inline-block px-2 py-1 text-pink-600 font-bold tracking-widest uppercase text-[10px] md:text-xs mb-4 bg-white rounded-full shadow-sm border border-pink-100">
                        Our Journey
                    </p>

                    {/* Clean Heading */}
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-6 tracking-tight leading-tight">
                        We are building the future of <br />
                        <span className="font-serif italic text-pink-600">Value Commerce</span>
                    </h1>

                    {/* Subtext */}
                    <p className="text-gray-500 text-sm md:text-xl leading-relaxed max-w-xl mx-auto font-light px-2">
                        Easy Shop was founded in 2010 with a simple mission: to make high-quality fashion accessible to everyone in India.
                    </p>

                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 lg:px-6 py-10 md:py-20">

                {/* Who We Are Section */}
                <div className="grid md:grid-cols-2 gap-10 lg:gap-16 text-center md:text-start items-center md:mb-20">

                    <div className="space-y-6">

                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                            Who We Are
                        </h2>

                        <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                            <span className="text-pink-500 font-bold">Easy Shop</span> is India's leading pure-play value Ecommerce platform.
                            Founded in 2010 by Aman Verma and Sanya Malhotra, we focus on the value commerce market
                            and have served more than 10 Crore online shoppers.
                        </p>
                        <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                            With over 20 Crore app installations, we are one of India’s most popular shopping destinations,
                            providing stylish, budget-friendly options that cater to diverse customer needs.
                        </p>
                    </div>

                    {/* Stats Box */}
                    <div className="grid grid-cols-2 gap-3 md:gap-4">

                        <div className="bg-pink-500 p-6 md:p-8 rounded-2xl text-white text-center shadow-lg">
                            <h4 className="text-xl md:text-3xl font-bold">10Cr+</h4>
                            <p className="text-[10px] md:text-sm uppercase tracking-wide">Happy Shoppers</p>
                        </div>

                        <div className="bg-gray-900 p-6 md:p-8 rounded-2xl text-white text-center shadow-lg">
                            <h4 className="text-xl md:text-3xl font-bold">14+</h4>
                            <p className="text-[10px] md:text-sm uppercase tracking-wide">Years of Trust</p>
                        </div>

                        <div className="bg-gray-100 p-6 md:p-8 rounded-2xl text-gray-800 text-center shadow-lg">
                            <h4 className="text-xl md:text-3xl font-bold">20Cr+</h4>
                            <p className="text-[10px] md:text-sm uppercase tracking-wide">App Installs</p>
                        </div>

                        <div className="bg-pink-100 p-6 md:p-8 rounded-2xl text-pink-600 text-center shadow-lg">
                            <h4 className="text-xl md:text-3xl font-bold">Pan-India</h4>
                            <p className="text-[10px] md:text-sm uppercase tracking-wide">Footprint</p>
                        </div>
                    </div>
                </div>
                
                {/* our journey */}
                <div className="py-20 bg-white overflow-hidden">
                    <div className="max-w-5xl mx-auto px-6">
                        
                        <h3 className="text-2xl md:text-3xl font-bold text-center mb-12 md:mb-20 italic text-gray-800 underline decoration-pink-200 underline-offset-8">
                            Our Journey Through the Years
                        </h3>

                        <div className="space-y-12 md:space-y-15">
                            
                            {/* 2010 - Right Aligned Content */}
                            <div className="flex flex-col md:flex-row items-center">
                                <div className="md:w-1/2 md:pr-16 text-center md:text-right">
                                    <span className="text-pink-600 font-black text-4xl md:text-5xl tracking-tighter opacity-40 block md:inline-block">2010</span>
                                    <h4 className="text-xl md:text-2xl font-bold text-gray-800 mt-2">The Humble Beginning</h4>
                                    <p className="text-gray-500 text-sm md:text-md mt-4 leading-relaxed max-w-md ml-auto">
                                        Easy Shop was born in a small room with a big dream: making fashion affordable for every Indian household.
                                    </p>
                                </div>
                                <div className="hidden md:block md:w-1/2"></div>
                            </div>

                            {/* 2015 - Left Aligned Content */}
                            <div className="flex flex-col md:flex-row items-center">
                                <div className="hidden md:block md:w-1/2"></div>
                                <div className="md:w-1/2 md:pl-16 text-center md:text-left">
                                    <span className="text-gray-900 font-black text-4xl md:text-5xl tracking-tighter opacity-40 block md:inline-block">2015</span>
                                    <h4 className="text-xl md:text-2xl font-bold text-gray-800 mt-2">1 Crore Happy Hearts</h4>
                                    <p className="text-gray-500 text-sm md:text-md mt-4 leading-relaxed max-w-md mr-auto md:mr-0">
                                        We hit our first major milestone of serving 1 crore customers across Tier 2 and Tier 3 cities.
                                    </p>
                                </div>
                            </div>

                            {/* 2020 - Right Aligned Content */}
                            <div className="flex flex-col md:flex-row items-center">
                                <div className="md:w-1/2 md:pr-16 text-center md:text-right">
                                    <span className="text-pink-600 font-black text-4xl md:text-5xl tracking-tighter opacity-40 block md:inline-block">2020</span>
                                    <h4 className="text-xl md:text-2xl font-bold text-gray-800 mt-2">The App Revolution</h4>
                                    <p className="text-gray-500 text-sm md:text-md mt-4 leading-relaxed max-w-md ml-auto">
                                        Launched the Easy Shop App, reaching 20 Crore+ installations and becoming a household name in India.
                                    </p>
                                </div>
                                <div className="hidden md:block md:w-1/2"></div>
                            </div>

                            {/* Today - Left Aligned Content */}
                            <div className="flex flex-col md:flex-row items-center">
                                <div className="hidden md:block md:w-1/2"></div>
                                <div className="md:w-1/2 md:pl-16 text-center md:text-left">
                                    <span className="text-gray-900 font-black text-4xl md:text-5xl tracking-tighter opacity-40 block md:inline-block">Today</span>
                                    <h4 className="text-xl md:text-2xl font-bold text-gray-800 mt-2">Leading Value Commerce</h4>
                                    <p className="text-gray-500 text-sm md:text-md mt-4 leading-relaxed max-w-md mr-auto md:mr-0">
                                        Continuing to innovate and provide stylish, budget-friendly fashion to every corner of India.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* founders */}
                <div className="max-w-4xl mx-auto md:py-16 bg-white">

                    <h3 className="text-2xl md:text-3xl font-bold text-center mb-12 md:mb-15 text-gray-800 italic underline decoration-pink-200 underline-offset-8">
                        Meet Our Founders
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-6 justify-items-center">

                        {/* Founder 1 */}
                        <div className="text-center w-full group">
                            <div className="w-48 h-48 mx-auto mb-4 overflow-hidden rounded-2xl bg-pink-50 shadow-inner group-hover:shadow-pink-100 transition-all">
                                <img
                                    src="https://plus.unsplash.com/premium_photo-1664540415069-bc45ce3e711e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmVzc2lvbmFsJTIwbWFufGVufDB8fDB8fHww"
                                    alt="Aman Verma"
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                            </div>
                            <h4 className="text-xl font-bold text-gray-800">Aman Verma</h4>
                            <p className="text-pink-500 font-medium">Co-Founder & CEO</p>
                        </div>

                        {/* Founder 2 */}
                        <div className="text-center w-full group">
                            <div className="w-48 h-48 mx-auto mb-4 overflow-hidden rounded-2xl bg-pink-50 shadow-inner group-hover:shadow-pink-100 transition-all">
                                <img
                                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmVzc2lvbmFsJTIwd29tYW58ZW58MHx8MHx8fDA%3D"
                                    alt="Sanya Malhotra"
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                            </div>
                            <h4 className="text-xl font-bold text-gray-800">Sanya Malhotra</h4>
                            <p className="text-pink-500 font-medium">Co-Founder & COO</p>
                        </div>
                    </div>
                </div>

                {/* commitment */}
                <div className="border-t border-gray-100 pt-16">

                    <h3 className="text-2xl md:text-3xl font-bold text-center mb-12 italic text-gray-800 underline decoration-pink-200 underline-offset-8">
                        Our Commitment
                    </h3>

                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">

                        <div className="p-6 border border-gray-100 rounded-xl hover:shadow-lg transition-shadow">
                            <div className="w-12 h-12 bg-pink-100 text-pink-500 flex items-center justify-center rounded-lg mb-4 text-2xl">🛍️</div>
                            <h4 className="font-bold text-xl mb-3 text-gray-800">Budget Friendly</h4>
                            <p className="text-gray-500 text-sm leading-relaxed">Latest trends at sharp prices for value-savvy buyers across India.</p>
                        </div>

                        <div className="p-6 border border-gray-100 rounded-xl hover:shadow-lg transition-shadow">
                            <div className="w-12 h-12 bg-pink-100 text-pink-500 flex items-center justify-center rounded-lg mb-4 text-2xl">📱</div>
                            <h4 className="font-bold text-xl mb-3 text-gray-800">Seamless App</h4>
                            <p className="text-gray-500 text-sm leading-relaxed">A convenient and accessible shopping experience for millions every day.</p>
                        </div>

                        <div className="p-6 border border-gray-100 rounded-xl hover:shadow-lg transition-shadow">
                            <div className="w-12 h-12 bg-pink-100 text-pink-500 flex items-center justify-center rounded-lg mb-4 text-2xl">🚛</div>
                            <h4 className="font-bold text-xl mb-3 text-gray-800">Fast Reach</h4>
                            <p className="text-gray-500 text-sm leading-relaxed">Deep understanding of consumer needs with a wide pan-India footprint.</p>
                        </div>

                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className="bg-pink-50 py-12 md:py-20 text-center px-4">
                <h3 className="text-xl md:text-2xl font-bold mb-6 text-gray-800">
                    Ready to experience the <span className="text-pink-500">Easy Shop</span> way?
                </h3>
                <button
                    onClick={() => navigate("/")}
                    className="bg-pink-500 text-white hover:bg-pink-600 px-5 md:px-8 py-3 rounded-full font-bold transition-all active:scale-95 cursor-pointer shadow-lg">
                    Start Shopping
                </button>
            </div>
        </section>
    )
}

export default AboutUs;