
//updated
import React, { useEffect, useState } from 'react'
import { HiOutlineMail } from "react-icons/hi";
import { HiOutlineLockClosed } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom';

function Login() {

    const navigate = useNavigate();

    const [loginType, setLoginType] = useState('user');

    const handleLogin = () => {
        if (loginType === 'user') {
            navigate("/");
        } else {
            navigate("/vendor_dashboard")
        }
    };

    const handleAccount = () => {
        if (loginType === 'user') {
            navigate("/user_signup");
        } else {
            navigate("/vendor_signup")
        }
    };

    return (
        <section className="min-h-[70vh] bg-gray-50 py-10 px-4 lg;px-6">

            {/* tabs */}
            <div className="max-w-md mx-auto bg-white rounded-full md:rounded-3xl p-1.5 mb-8 shadow-sm border border-gray-50">
                <div className="flex bg-gray-100 rounded-full md:rounded-2xl p-1">
                    <button
                        onClick={() => setLoginType("user")}
                        className={`flex-1 py-2.5 md:py-3 rounded-full md:rounded-xl text-[13px] md:text-sm font-bold transition-all cursor-pointer
                        ${loginType === 'user' ? 'bg-white text-pink-500 shadow-sm scale-[1.02]' : 'text-gray-500 hover:text-pink-400'}`}
                    >
                        User Login
                    </button>

                    <button
                        onClick={() => setLoginType("vendor")}
                        className={`flex-1 py-2.5 md:py-3 rounded-full md:rounded-xl text-[13px] md:text-sm font-bold transition-all cursor-pointer
                        ${loginType === 'vendor' ? 'bg-white text-pink-500 shadow-sm scale-[1.02]' : 'text-gray-500 hover:text-pink-400'}`}
                    >
                        Vendor Login
                    </button>
                </div>
            </div>

            {/* Form Container */}
            <div className='max-w-xl mx-auto bg-pink-50/30 rounded-xl md:rounded-[30px] shadow-md p-6 md:p-12 border border-gray-100 mt-10'>
                <div className='space-y-6'>

                    {/* Email Field */}
                    <div className='flex flex-col gap-1.5'>
                        <label className="text-xs md:text-sm font-semibold text-gray-600 ml-1 tracking-wide">Email Address </label>
                        <div className='relative group'>
                            <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg md:text-xl group-focus-within:text-pink-500 transition-colors" />
                            <input
                                type="email"
                                placeholder='Email'
                                className="w-full pl-10 md:pl-12 pr-4 py-3 text-sm md:text-base placeholder:text-gray-400 bg-gray-50 border border-gray-200 rounded-lg md:rounded-2xl focus:border-pink-500 focus:bg-white outline-none transition-all"
                                required
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div className='flex flex-col gap-1.5'>
                        <div className="flex justify-between items-center px-1">
                            <label className="text-xs md:text-sm font-semibold text-gray-600 ml-1 tracking-wide">Password</label>

                            {/* forgot button */}
                            <button
                                onClick={() => navigate(`/forgot_password?role=${loginType}`)}
                                className="text-xs font-bold text-pink-500 hover:text-pink-600 cursor-pointer">
                                Forgot?
                            </button>

                        </div>
                        <div className='relative group'>
                            <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg md:text-xl group-focus-within:text-pink-500 transition-colors" />
                            <input
                                type="password"
                                placeholder='Password'
                                className="w-full pl-10 md:pl-12 pr-4 py-3 text-sm md:text-base placeholder:text-gray-400 bg-gray-50 border border-gray-200 rounded-lg md:rounded-2xl focus:border-pink-500 focus:bg-white outline-none transition-all"
                                required
                            />
                        </div>
                    </div>

                    {/* Login Button */}
                    <button
                        onClick={handleLogin}
                        className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 md:py-4 rounded-2xl mt-4 shadow-lg shadow-pink-100 transition-all active:scale-[0.98] cursor-pointer"
                    >
                        {loginType === 'user' ? 'Start Shopping' : 'Access Dashboard'}
                    </button>

                    {/* Signup Link */}
                    <p
                        onClick={handleAccount}
                        className="text-center text-sm text-gray-500 mt-3 md:mt-6">
                        Don't have an account?
                        <button className="ml-1 font-bold text-pink-500 hover:underline cursor-pointer">
                            {loginType === 'user' ? 'Sign up' : 'Register as Vendor'}
                        </button>
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Login;