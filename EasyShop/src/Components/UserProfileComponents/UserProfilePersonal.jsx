
import React, { useEffect, useState } from 'react';
import { HiOutlineCamera } from "react-icons/hi2";
import { HiOutlineShieldCheck } from "react-icons/hi";
import { useGetUser, useUpdatedEmailVerifyOtp, useUpdateUser } from '../../hook/useAuth';
import useAuthStore from '../../store/useAuthStore';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

function UserProfilePersonal() {

    const { user } = useAuthStore();
    const queryClient = useQueryClient();
    const userId = user?._id || user?.id; //id get from store

    const { data: getUser, isLoading, isError } = useGetUser(userId);
    const { mutate: updateUser, isPending: isUpdateing } = useUpdateUser();
    const { mutate: verifyOtp, isPending: isVerifying } = useUpdatedEmailVerifyOtp();

    const [isEditIndex, setIsEditIndex] = useState({});
    const [profileImage, setProfileImage] = useState("https://i.pinimg.com/736x/f9/1f/ba/f91fba046dd5208787a3ffa5c1f299e7.jpg");
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [tempEmail, setTempEmail] = useState("");
    const [otp, setOtp] = useState("");

    const [formData, setFormdata] = useState({
        name: "",
        email: "",
        contact: "",
        address: "",
        city: "",
        pincode: "",
        state: ""
    });

    // get data
    useEffect(() => {
        if (getUser) {

            // console.log("Data fetched after update:", getUser.data);
            setFormdata({
                name: getUser.data.name || "",   // data key = backend data key 
                email: getUser.data.email || "",
                contact: getUser.data.contact || "",
                address: getUser.data.address || "",
                city: getUser.data.city || "",
                pincode: getUser.data.pincode || "",
                state: getUser.data.state || ""
            });

            if (getUser.data.profilePhoto) {
                setProfileImage(getUser.data.profilePhoto);
            }

        }
    }, [getUser]);

    // Loading state handle karein
    if (isLoading) return <p>Loading Profile...</p>;
    if (isError) return <p>Error loading profile!</p>;

    // input handler
    const handleInputChange = (e, fieldId) => {
        setFormdata({ ...formData, [fieldId]: e.target.value })
    };

    // toggle
    const toggleEdit = (fieldId) => {
        setIsEditIndex(prev => ({
            ...prev, [fieldId]: !prev[fieldId]
        }));
    };

    const handleVerifyOtp = () => {
        if (!otp || otp.length !== 6) return toast.error("Please enter 6-digit OTP");

        verifyOtp({ email: tempEmail, otp: otp }, {
            onSuccess: (res) => {
                toast.success("Email updated and verified!");
                setShowOtpModal(false);
                setOtp("");
                toggleEdit("email");

                // Sabse important: Zustand store ko naye email se update karein
                // Agar aapke pas updateUser action hai toh:
                // useAuthStore.getState().setUser({ ...user, email: tempEmail });

                // Best way: Refetch user data (React Query automatically karega invalidateQueries se)
                queryClient.invalidateQueries(["user", userId]);
            },
            onError: (err) => toast.error(err.response?.data?.message || "Invalid OTP")
        });
    };

    // update
    const handleUpdate = ({ file = null, fieldId = null }) => {

        const data = new FormData();

        if (file) {
            data.append("profilePhoto", file);
        };

        if (fieldId) {
            console.log("Updating Field:", fieldId, "Value:", formData[fieldId]);
            data.append(fieldId, formData[fieldId]);
        };

        // DEBUGGING: Ye loop aapko batayega ki actually me kya ja raha hai
        for (let pair of data.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }

        updateUser(data, {
            onSuccess: (res) => {

                if (res.isEmailUpdatePending) {
                    setTempEmail(res.newEmail);
                    setShowOtpModal(true);
                    toast.success("Please verify OTP sent to your new email");
                } else {
                    if (fieldId) toggleEdit(fieldId);

                    // refresh hue bina user ki updation dikhe
                    updateUser(res.data);

                    toast.success("Update Successfully");
                }

            },

            onError: (err) => toast.error(err.response?.data?.message || "Updation Failed")
        })
    };

    // save
    const handleSave = (fieldId) => {
        handleUpdate({ fieldId }); // Object ki tarah bhejein
    };

    // image upload
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
            };
            reader.readAsDataURL(file);

            handleUpdate({ file: file });
        };
    };

    // Reusable Component for Each Field
    const RenderField = (label, fieldId, type = "text") => {
        const isEditing = isEditIndex[fieldId]; // Check if THIS specific field is being edited

        return (
            <>
                {/* input fields */}
                <div className='flex flex-col gap-1.5 md:gap-2'>

                    <div className='flex flex-row gap-5 items-center'>
                        <label className='text-[13px] md:text-sm font-semibold text-slate-600 dark:text-slate-400 ml-1'>
                            {label}
                        </label>

                        <span
                            onClick={() => toggleEdit(fieldId)}
                            className={`text-pink-500 hover:text-pink-600 font-medium text-[13px] md:text-sm cursor-pointer`}>
                            {!isEditing ? "Edit" : "Cancel"}
                        </span>
                    </div>

                    <div className='flex flex-row gap-5 items-center'>
                        <input
                            type={type}
                            value={formData[fieldId]}
                            onChange={(e) => handleInputChange(e, fieldId)}
                            disabled={!isEditing}
                            className={`flex-1 p-2.5 md:p-3.5 rounded-lg md:rounded-2xl border transition-all text-sm outline-none
                                ${!isEditing
                                    ? 'bg-slate-100 border-transparent text-slate-500 cursor-not-allowed'
                                    : 'bg-white border-slate-200 focus:ring-1 focus:ring-pink-500 text-slate-800 shadow-sm'
                                }`}
                        />

                        {isEditing && (
                            <button
                                onClick={() => handleSave(fieldId)}
                                disabled={isUpdateing || isVerifying}
                                className='px-6 py-2.5 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-xl text-sm transition-all active:scale-95 shadow-lg shadow-pink-100'>
                                {isUpdateing || isVerifying ? "Saving" : "Save"}
                            </button>
                        )}

                    </div>
                </div>
            </>
        )
    };

    return (
        <>
            <div className='w-full bg-white dark:bg-slate-900 space-y-6'>

                {/* image fields */}
                <div className="flex flex-col items-center md:items-start gap-6 mb-10 md:pb-2 border-b border-slate-50 ">
                    <div className="relative group">
                        {/* Profile Image Preview */}
                        <img
                            src={profileImage}
                            alt="Profile"
                            className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-xl group-hover:opacity-90 transition-all"
                        />

                        {/* Hidden File Input */}
                        <input
                            type="file"
                            id="profilePic"
                            hidden
                            accept="image/*"
                            onChange={handleFileChange}
                        />

                        {/* Upload Button (Camera Icon) */}
                        <label
                            htmlFor="profilePic"
                            className="absolute bottom-1 right-1 bg-pink-500 p-2.5 rounded-full text-white cursor-pointer shadow-lg hover:bg-pink-600 hover:scale-110 transition-all border-2 border-white"
                        >
                            <HiOutlineCamera size={18} />
                        </label>
                    </div>

                    <div className="text-center md:text-left">
                        <h4 className="text-[13px] md:text-sm font-black text-slate-800 uppercase tracking-tight">
                            Profile Photo
                        </h4>
                        <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">
                            JPG, GIF or PNG. Max size of 2MB
                        </p>
                    </div>
                </div>

                {/* input fields */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6">
                    {RenderField("Full Name", "name")}
                    {RenderField("Email", "email", "email")}
                    {RenderField("Phone Number", "contact")}
                    <div className="lg:col-span-2">
                        {RenderField("Address", "address")}
                    </div>
                    {RenderField("City", "city")}
                    {RenderField("Pin Code", "pincode")}
                    {RenderField("State", "state")}
                </div>

                {/* bottom section */}
                <div className="mt-12 flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                    <div className="p-2 bg-white rounded-full text-slate-400">
                        <HiOutlineShieldCheck size={20} />
                    </div>
                    <p className="text-[10px] lg:text-xs text-slate-500 font-medium">
                        "We value your privacy as much as you do. See how we protect it in our <span className="text-pink-500 cursor-pointer hover:underline">Privacy Policy</span>."
                    </p>
                </div>
            </div>

            {/* otp popup section */}
            {showOtpModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl shadow-2xl max-w-md w-full flex flex-col items-center gap-6">
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Verify Email</h2>
                            <p className="text-sm text-slate-500 mt-2">Enter the 6-digit code sent to <br /> <b>{tempEmail}</b></p>
                        </div>

                        <input
                            type="text"
                            maxLength="6"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="000000"
                            className="w-full text-center text-3xl tracking-[15px] font-bold p-3 border-2 border-slate-200 rounded-2xl focus:border-pink-500 outline-none transition-all"
                        />

                        <div className="flex gap-4 w-full">
                            <button
                                onClick={() => setShowOtpModal(false)}
                                className="flex-1 py-3 font-semibold text-slate-500 hover:bg-slate-100 rounded-xl transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleVerifyOtp}
                                disabled={isVerifying}
                                className="flex-1 py-3 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-xl shadow-lg shadow-pink-200 disabled:opacity-50"
                            >
                                {isVerifying ? "Verifying..." : "Verify OTP"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default UserProfilePersonal;