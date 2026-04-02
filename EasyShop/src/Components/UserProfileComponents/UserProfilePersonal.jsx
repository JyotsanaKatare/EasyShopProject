
import React, { useState } from 'react';
import { HiOutlineCamera } from "react-icons/hi2";
import { HiOutlineShieldCheck } from "react-icons/hi";

function UserProfilePersonal() {

    const [formData, setFormdata] = useState({
        name: "Ritika Jain",
        email: "ritika@gmail.com",
        number: "0987654321",
        address: "345, ABC Building Nagar",
        city: "Indore",
        pincode: 676789,
        state: "M.P."
    });

    const [isEditIndex, setIsEditIndex] = useState({});
    const [profileImage, setProfileImage] = useState("https://images.unsplash.com/photo-1631947430066-48c30d57b943?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z2lybHxlbnwwfHwwfHx8MA%3D%3D");

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (e, fieldId) => {
        setFormdata({ ...formData, [fieldId]: e.target.value })
    };

    const toggleEdit = (fieldId) => {
        setIsEditIndex(prev => ({
            ...prev, [fieldId]: !prev[fieldId]
        }));
    };

    const handleSave = (fieldId) => {
        toggleEdit(fieldId);
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
                            type="text"
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
                                className='px-6 py-2.5 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-xl text-sm transition-all active:scale-95 shadow-lg shadow-pink-100'>
                                Save
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
                    {RenderField("Phone Number", "number")}
                    {RenderField("Address", "address")}
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
        </>
    )
}

export default UserProfilePersonal;