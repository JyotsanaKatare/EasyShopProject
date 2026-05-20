
import React, { useEffect, useState } from 'react';
import { HiOutlineCamera } from "react-icons/hi2";
import { HiOutlineShieldCheck } from "react-icons/hi";

function ProfilePersonalForm({ vendorData, onSubmit, isPending }) {

    const [formData, setformData] = useState({
        name: vendorData?.name || "",
        email: vendorData?.email || "",
        phone: vendorData?.contact || "",
    });

    const [profileFile, setProfileFile] = useState(null);
    const [isEditIndex, setIsEditIndex] = useState({});

    const [profileImage, setProfileImage] = useState(vendorData?.profilePhoto || null);

    useEffect(() => {
        if (vendorData) {
            setformData({
                name: vendorData.name || "",
                email: vendorData.email || "",
                phone: vendorData.contact || "",
            });
            setProfileImage(vendorData.profilePhoto || null);
        }
    }, [vendorData]);

    // profile change
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    //real time data state me update krna
    const handleInputChange = (e, fieldId) => {
        setformData({ ...formData, [fieldId]: e.target.value });
    };

    // Sirf us specific ID ko toggle karega
    const toggleEdit = (fieldId) => {
        setIsEditIndex(prev => ({
            ...prev, [fieldId]: !prev[fieldId]
        }));
    };

    // after clicking save, naye data ko finalize karna
    const handleSave = (fieldId) => {
        toggleEdit(fieldId);

        const fd = new FormData();
        fd.append("name", formData.name);
        fd.append("email", formData.email);
        fd.append("contact", formData.phone);
        if (profileFile) {
            fd.append("profilePhoto", profileFile);
        }

        onSubmit(fd);
    };

    // Reusable Component for Each Field
    const RenderField = (label, fieldId, type = "text") => {
        const isEditing = isEditIndex[fieldId];

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
                            placeholder="Sohan Sharma"
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
                                disabled={isPending}
                                className='px-6 py-2.5 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-xl text-sm transition-all active:scale-95 shadow-lg shadow-pink-100'>
                                {isPending ? "Saving..." : "Save"}
                            </button>
                        )}

                    </div>
                </div>
            </>
        );
    };

    return (
        <>
            <div className='max-w-100 bg-white dark:bg-slate-900 space-y-6'>

                {/* image fields */}
                <div className="flex flex-col items-center md:items-start gap-6 mb-10 border-b border-slate-50 md:pb-8">
                    <div className="relative group">
                        {/* Profile Image Preview */}
                        {profileImage ? (
                            <img
                                src={profileImage}
                                alt="Profile"
                                className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-xl group-hover:opacity-90 transition-all"
                            />
                        ) : (
                            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-slate-200 flex items-center justify-center border-4 border-white shadow-xl">
                                <HiOutlineCamera size={28} className="text-slate-400" />
                            </div>
                        )}

                        {/* Hidden File Input */}
                        <input
                            type="file"
                            id="profilePhoto"
                            hidden
                            accept="image/*"
                            onChange={handleFileChange}
                        />

                        {/* Upload Button (Camera Icon) */}
                        <label
                            htmlFor="profilePhoto"
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

                        {profileFile && (
                            <button
                                onClick={() => {
                                    const fd = new FormData();
                                    fd.append("profilePhoto", profileFile);
                                    onSubmit(fd);
                                    setProfileFile(null); 
                                }}
                                disabled={isPending}
                                className="mt-3 px-5 py-2 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-xl text-xs transition-all active:scale-95 shadow-lg shadow-pink-100 disabled:opacity-50">
                                {isPending ? "Saving..." : "Save Photo"}
                            </button>
                        )}
                    </div>
                </div>

                {/* input fields */}
                {RenderField("Full Name", "name")}
                {RenderField("Email Address", "email", "email")}
                {RenderField("Phone Number", "phone")}
            </div>

            {/* bottom section */}
            <div className="mt-12 flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <div className="p-2 bg-white rounded-full text-slate-400">
                    <HiOutlineShieldCheck size={20} />
                </div>
                <p className="text-[10px] lg:text-xs text-slate-500 font-medium">
                    Your personal information is encrypted. Read our <span className="text-pink-500 cursor-pointer hover:underline">Privacy Policy</span>.
                </p>
            </div>
        </>

    )
}

export default ProfilePersonalForm;