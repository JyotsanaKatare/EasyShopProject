
//updated
import React from 'react';
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { HiOutlineBuildingStorefront } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom';

function AccountType() {

    const navigate = useNavigate();

    return (
        <section className="w-full bg-pink-50/30 py-8 md:py-16 px-4 lg:px-6">
            <div className="max-w-4xl mx-auto">

                {/* heading */}
                <div className="flex flex-col text-center mb-8 md:mb-12">
                    <h2 className="text-2xl md:text-4xl font-bold text-gray-800 tracking-tight">
                        Join <span className="text-pink-500 text-4xl md:text-5xl">Easy</span> Shop
                    </h2>

                    <p className="max-w-xl mx-auto mt-4 text-gray-500 text-sm md:text-lg lg:text-xl leading-relaxed font-light italic">
                        Choose how you want to use the platform
                    </p>
                </div>

                <div className="max-w-4xl w-full grid md:grid-cols-2 gap-6 md:gap-8">

                    {/* User Card */}
                    <div
                        onClick={() => navigate("/user_signup")}
                        className="bg-white p-8 md:p-10 rounded-[30px] border-2 border-gray-200 hover:border-pink-500 shadow-xl shadow-pink-100/50 cursor-pointer transition-all duration-300 hover:-translate-y-2 group"
                    >
                        <div className="bg-pink-100 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-pink-500 transition-colors">
                            <HiOutlineShoppingBag className="text-4xl text-pink-500 group-hover:text-white" />
                        </div>

                        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">
                            Customer
                        </h2>

                        <p className="text-sm md:text-[16px] text-gray-500 leading-relaxed">
                            I want to discover unique products and shop for my favorite trends.
                        </p>

                        <div className="mt-5 md:mt-8 flex items-center text-pink-500 font-bold group-hover:gap-2 transition-all">
                            Get Started <span className="ml-2">→</span>
                        </div>
                    </div>

                    {/* Vendor Card */}
                    <div
                        onClick={() => navigate("/vendor_signup")}
                        className="bg-white p-8 md:p-10 rounded-[30px] border-2 border-gray-200 hover:border-pink-500 shadow-xl shadow-pink-100/50 cursor-pointer transition-all duration-300 hover:-translate-y-2 group"
                    >
                        <div className="bg-pink-100 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-pink-500 transition-colors">
                            <HiOutlineBuildingStorefront className="text-4xl text-pink-500 group-hover:text-white" />
                        </div>

                        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">
                            Vendor
                            </h2>

                        <p className="text-sm md:text-[16px] text-gray-500 leading-relaxed">
                            I want to grow my business and sell my products to millions of customers.
                        </p>

                        <div className="mt-5 md:mt-8 flex items-center text-pink-500 font-bold group-hover:gap-2 transition-all">
                            Open Shop <span className="ml-2">→</span>
                        </div>
                    </div>

                </div>

                {/* Bottom Login */}
                <p
                    onClick={() => navigate("/login")}
                    className="mt-8 md:mt-12 ml-2 text-gray-400 text-sm">
                    Already have an account? <span className="text-pink-500 font-bold cursor-pointer hover:underline">Log in directly</span>
                </p>
            </div>
        </section>
    )
}

export default AccountType;