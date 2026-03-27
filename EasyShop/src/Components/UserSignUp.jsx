
//updated
import React, { useState } from 'react'
import { HiOutlineUser } from "react-icons/hi";
import { HiOutlineMail } from "react-icons/hi";
import { HiOutlinePhone } from "react-icons/hi";
import { HiOutlineLockClosed } from "react-icons/hi2";
import { FaCheckCircle } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaCity } from "react-icons/fa";
import { FaMapPin } from "react-icons/fa";
import { FaMapMarkedAlt } from "react-icons/fa";
import { HiOutlineBadgeCheck } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';

import { useSendOTP, useSignup, useVerifyOtp } from '../hook/useAuth';
import useAuthStore from '../store/useAuthStore';

function UserSignUp() {

    const navigate = useNavigate();
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [isSubmitOpen, setIsSubmitOpen] = useState(false);
    const [isEmailVerified, setIsEmailVerified] = useState(false);

    const { mutate: sendOTP, isLoading: isSending } = useSendOTP();
    const { mutate: signupUser, isLoading: isRegistering } = useSignup();
    const { mutate: verifyOtp, isLoading: isVerifying } = useVerifyOtp();
    const login = useAuthStore((state) => state.login); // Store ka action

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        contact: '',
        password: '',
        confirmPassword: '',
        address: '',
        city: '',
        pincode: '',
        state: '',
        otp: ''
    });

    // Input change handler
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // verify otp
    const handleVerifyOTP = () => {
        console.log("Sending data to backend:", { email: formData.email, otp: formData.otp });
        if (formData.otp.length !== 6) return alert("Please enter 6-digit OTP");

        verifyOtp({ email: formData.email, otp: formData.otp }, {
            onSuccess: (data) => {
                setIsEmailVerified(true);
                alert("Email Verified Successfully! ✅");

                setTimeout(() => {
                    setShowOtpModal(false);
                }, 1000);
            },
            onError: (err) => {
                alert(err.response?.data?.message || "Invalid OTP, please try again!");
            }
        })
    };

    // otp handle
    const handleOTP = () => {
        if (!formData.email) return alert("Please enter email firstly!");

        sendOTP({ email: formData.email, role: 'user' }, {
            onSuccess: () => {
                alert("OTP Sent!");
                setShowOtpModal(true);
            },
            onError: (err) => alert(err.response?.data?.message || "Error sending OTP")
        });
    }

    const handleCreateAccount = () => {

        console.log("HandleCreateAccount trigger hua!");

        if (formData.password !== formData.confirmPassword) {
            return alert("Passwords does not match");
        }

        console.log("Validation pass! Calling signupUser...");

        signupUser(formData, {
            onSuccess: (data) => {
                confetti({
                    particleCount: 150,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#ec4899', '#f472b6', '#db2777']
                });

                login(data.user, data.token); // Zustand store mein save
                setIsSubmitOpen(true); // Success modal/message dikhao
                setTimeout(() => navigate('/'), 2000); // 2 second baad bhej do
            },
            onError: (err) => alert(err.response?.data?.message || "Failed in signup")
        });
    };

    return (
        <section className="w-full min-h-[70vh] bg-gray-50 py-10 px-4 lg:px-6">
            <div className="max-w-4xl mx-auto ">

                <div className="bg-pink-50/30 rounded-[30px] shadow-md p-6 md:p-12 border border-gray-100 my-6 md:mt-10">

                    {/* heading */}
                    <div className='mb-8 text-center md:text-left'>
                        <h1 className='text-xl md:text-2xl font-bold text-gray-800 tracking-tight'>
                            Register as a User
                        </h1>
                        {/* Ek choti line jo active step ko highlight karti hai */}
                        <div className='w-12 h-1 bg-pink-500 rounded-full mt-1 mx-auto md:ml-0'></div>

                        <p className='text-gray-500 text-xs md:text-sm mt-2'>
                            Please provide your basic contact details to get started.
                        </p>
                    </div>

                    {/* form detail */}
                    <div className='grid md:grid-cols-2 gap-5 md:gap-6'>

                        {/* name */}
                        <div className='flex flex-col gap-1.5'>
                            <label htmlFor="full name" className="text-xs md:text-sm font-semibold text-gray-600 ml-1 tracking-wide">Full Name</label>
                            <div className='relative group'>
                                <HiOutlineUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg md:text-xl group-focus-within:text-pink-500 transition-colors" />

                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder='Full Name'
                                    className="w-full pl-10 md:pl-12 pr-4 py-3 text-sm md:text-base placeholder:text-gray-400 bg-gray-50 border border-gray-200 rounded-lg md:rounded-2xl focus:border-pink-500 focus:bg-white outline-none transition-all"
                                    required
                                />
                            </div>
                        </div>

                        {/* email */}
                        <div className='flex flex-col gap-1.5'>
                            <label htmlFor="email" className="text-xs md:text-sm font-semibold text-gray-600 ml-1 tracking-wide">Email</label>
                            <div className='relative group'>
                                <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg md:text-xl group-focus-within:text-pink-500 transition-colors" />

                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    disabled={isEmailVerified}
                                    placeholder='Email'
                                    className="w-full pl-10 md:pl-12 pr-4 py-3 text-sm md:text-base placeholder:text-gray-400 bg-gray-50 border border-gray-200 rounded-lg md:rounded-2xl focus:border-pink-500 focus:bg-white outline-none transition-all"
                                    required
                                />

                                {/* email verify button */}
                                {!isEmailVerified ? (
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation(); // Click event ko upar jaane se roko
                                            console.log("Verify Clicked!");
                                            handleOTP();
                                        }}
                                        // Agar email nahi hai ya loading hai toh disable
                                        disabled={isSending || !formData.email}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 text-xs md:text-sm font-bold text-white bg-pink-500 hover:bg-pink-600 rounded-md md:rounded-xl transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed shadow-sm active:scale-95 cursor-pointer z-20"
                                    >
                                        {isSending ? (
                                            <span className="flex items-center gap-1">
                                                <svg className="animate-spin h-3 w-3 text-white" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Wait...
                                            </span>
                                        ) : "Verify"}
                                    </button>
                                ) : (
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 font-bold text-xs flex items-center gap-1 z-20">
                                        Verified <HiOutlineBadgeCheck className="text-lg" />
                                    </span>
                                )}

                            </div>
                        </div>

                        {/* mobile num */}
                        <div className='flex flex-col gap-1.5'>
                            <label htmlFor="Mobile Number" className="text-xs md:text-sm font-semibold text-gray-600 ml-1 tracking-wide">Mobile Number</label>
                            <div className='relative group'>
                                <HiOutlinePhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg md:text-xl group-focus-within:text-pink-500 transition-colors" />

                                <input
                                    type="text"
                                    name="contact"
                                    value={formData.contact}
                                    onChange={handleChange}
                                    placeholder='Mobile Number'
                                    className="w-full pl-10 md:pl-12 pr-4 py-3 text-sm md:text-base placeholder:text-gray-400 bg-gray-50 border border-gray-200 rounded-lg md:rounded-2xl focus:border-pink-500 focus:bg-white outline-none transition-all"
                                    required
                                />
                            </div>
                        </div>

                        {/* password */}
                        <div className='flex flex-col gap-1.5'>
                            <label htmlFor="password" className="text-xs md:text-sm font-semibold text-gray-600 ml-1 tracking-wide">Password</label>
                            <div className='relative group'>
                                <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg md:text-xl group-focus-within:text-pink-500 transition-colors" />

                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder='Password'
                                    className="w-full pl-10 md:pl-12 pr-4 py-3 text-sm md:text-base placeholder:text-gray-400 bg-gray-50 border border-gray-200 rounded-lg md:rounded-2xl focus:border-pink-500 focus:bg-white outline-none transition-all"
                                    required
                                />
                            </div>
                        </div>

                        {/* confirm password */}
                        <div className='flex flex-col gap-1.5'>
                            <label htmlFor="confirm password" className="text-xs md:text-sm font-semibold text-gray-600 ml-1 tracking-wide">Confirm Password</label>
                            <div className='relative group'>
                                <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg md:text-xl group-focus-within:text-pink-500 transition-colors" />

                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder='Confirm Password'
                                    className="w-full pl-10 md:pl-12 pr-4 py-3 text-sm md:text-base placeholder:text-gray-400 bg-gray-50 border border-gray-200 rounded-lg md:rounded-2xl focus:border-pink-500 focus:bg-white outline-none transition-all"
                                    required
                                />
                            </div>
                        </div>

                        {/* address */}
                        <div className='flex flex-col gap-1.5'>
                            <label htmlFor="address" className="text-xs md:text-sm font-semibold text-gray-600 ml-1 tracking-wide">Address</label>
                            <div className='relative group'>
                                <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg md:text-xl group-focus-within:text-pink-500 transition-colors" />

                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder='Address'
                                    className="w-full pl-10 md:pl-12 pr-4 py-3 text-sm md:text-base placeholder:text-gray-400 bg-gray-50 border border-gray-200 rounded-lg md:rounded-2xl focus:border-pink-500 focus:bg-white outline-none transition-all"
                                    required
                                />
                            </div>
                        </div>

                        {/* city */}
                        <div className='flex flex-col gap-1.5'>
                            <label htmlFor="city" className="text-xs md:text-sm font-semibold text-gray-600 ml-1 tracking-wide">City</label>
                            <div className='relative group'>
                                <FaCity className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg md:text-xl group-focus-within:text-pink-500 transition-colors" />

                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    placeholder='City'
                                    className="w-full pl-10 md:pl-12 pr-4 py-3 text-sm md:text-base placeholder:text-gray-400 bg-gray-50 border border-gray-200 rounded-lg md:rounded-2xl focus:border-pink-500 focus:bg-white outline-none transition-all"
                                    required
                                />
                            </div>
                        </div>

                        {/* pincode */}
                        <div className='flex flex-col gap-1.5'>
                            <label htmlFor="pincode" className="text-xs md:text-sm font-semibold text-gray-600 ml-1 tracking-wide">Pin Code</label>
                            <div className='relative group'>
                                <FaMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg md:text-xl group-focus-within:text-pink-500 transition-colors" />

                                <input
                                    type="text"
                                    name="pincode"
                                    value={formData.pincode}
                                    onChange={handleChange}
                                    placeholder='Pin Code'
                                    className="w-full pl-10 md:pl-12 pr-4 py-3 text-sm md:text-base placeholder:text-gray-400 bg-gray-50 border border-gray-200 rounded-lg md:rounded-2xl focus:border-pink-500 focus:bg-white outline-none transition-all"
                                    required
                                />
                            </div>
                        </div>

                        {/* state */}
                        <div className='flex flex-col gap-1.5'>
                            <label htmlFor="state" className="text-xs md:text-sm font-semibold text-gray-600 ml-1 tracking-wide">State</label>
                            <div className='relative group'>
                                <FaMapMarkedAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg md:text-xl group-focus-within:text-pink-500 transition-colors" />

                                <input
                                    type="text"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    placeholder='State'
                                    className="w-full pl-10 md:pl-12 pr-4 py-3 text-sm md:text-base placeholder:text-gray-400 bg-gray-50 border border-gray-200 rounded-lg md:rounded-2xl focus:border-pink-500 focus:bg-white outline-none transition-all"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* button */}
                    <div className="flex justify-end mt-10">
                        <button
                            onClick={handleCreateAccount}
                            disabled={isRegistering || !isEmailVerified}
                            className={`w-full md:w-auto text-sm md:text-base bg-pink-500 text-white px-8 py-3 rounded-2xl md:rounded-xl font-bold shadow-lg shadow-pink-200 transition-all cursor-pointer 
                                ${(isRegistering || !isEmailVerified) ? "opacity-50 cursor-not-allowed" : "hover:bg-pink-600 hover:scale-[1.02] md:hover:scale-105 active:scale-95"}
                            `}
                        >
                            {isRegistering ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Creating Account...
                                </span>
                            ) : "Create Account"}
                        </button>
                    </div>

                </div>

                {/* otp popup section */}
                {showOtpModal && (
                    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
                        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-2xl w-full max-w-sm text-center transform transition-all scale-100">
                            <h3 className="text-xl font-bold mb-2">Check your Inbox</h3>
                            <p className="text-sm text-gray-500 mb-6">Enter OTP sent to {formData.email}</p>

                            <input
                                type="text"
                                name="otp"
                                maxLength="6"
                                value={formData.otp}
                                onChange={handleChange}
                                disabled={isVerifying}
                                placeholder="000000"
                                className="w-full text-center text-2xl font-mono tracking-widest py-3 border-2 border-pink-100 rounded-2xl focus:border-pink-500 outline-none mb-6"
                            />

                            <button
                                onClick={handleVerifyOTP}
                                disabled={isVerifying || formData.otp.length < 6} // Button lock logic
                                className="w-full py-3 bg-pink-500 text-white font-bold rounded-2xl hover:bg-pink-600 transition-all shadow-lg cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                {isVerifying ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Verifying...
                                    </span>
                                ) : "Confirm OTP"}
                            </button>
                        </div>
                    </div>
                )}

                {/* Success Popup Section */}
                <div
                    className={`fixed inset-0 flex justify-center items-center bg-black/50 backdrop-blur-sm z-100 px-4 transition-all duration-500 
                                ${isSubmitOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
                >
                    <div
                        className="absolute inset-0"
                        onClick={() => setIsSubmitOpen(false)}
                    ></div>
                    <div
                        className={`bg-white rounded-3xl p-8 md:p-10 shadow-2xl text-center max-w-sm w-full transition-all duration-500 transform 
                               ${isSubmitOpen ? "translate-y-0 scale-100" : "translate-y-10 scale-95"}`}
                    >
                        {/* Animated Check Icon */}
                        <div className="w-20 h-20 bg-pink-100 text-pink-500 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
                            <FaCheckCircle />
                        </div>

                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Success!</h2>
                        <p className="text-gray-500 mb-8">
                            Your account has been created successfully. Start exploring <span className="text-pink-500 font-semibold">Easy</span>!
                        </p>

                        <button
                            onClick={() => navigate("/")} // Ya jo bhi aapka route ho
                            className="w-full bg-pink-500 text-white py-3 rounded-xl font-bold shadow-lg shadow-pink-200 hover:bg-pink-600 transition-all active:scale-95 cursor-pointer"
                        >
                            Start Shopping
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default UserSignUp