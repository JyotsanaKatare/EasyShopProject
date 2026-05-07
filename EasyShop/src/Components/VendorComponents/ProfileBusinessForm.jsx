
import React from 'react';
import { useState } from 'react';
import { HiOutlineCamera } from "react-icons/hi2";
import { HiOutlineShieldCheck } from "react-icons/hi";
import { useEffect } from 'react';

function ProfileBusinessForm({ vendorData, onSubmit, isPending }) {

  const [formData, setformData] = useState({
    storeName: "",
    aboutShop: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    businessType: "",
    businessEmail: "",
    businessPhone: "",
    panNumber: "",
    gstNumber: "",
    category: "",
  });

  const [isEditIndex, setIsEditIndex] = useState({});
  const [logoImage, setLogoImage] = useState(null); // ✅ null not hardcoded URL
  const [logoFile, setLogoFile] = useState(null);   // ✅ actual file for upload
  const [gstFile, setGstFile] = useState(null);


  // ✅ Prefill when vendorData arrives
  useEffect(() => {
    if (vendorData) {
      setformData({
        storeName: vendorData.storeName || "",
        aboutShop: vendorData.aboutShop || "",
        address: vendorData.address || "",
        city: vendorData.city || "",
        state: vendorData.state || "",
        pincode: vendorData.pincode || "",
        businessType: vendorData.businessType || "",
        businessEmail: vendorData.businessEmail || "",
        businessPhone: vendorData.businessContact || "", // ✅ schema field
        panNumber: vendorData.businessPAN || "",          // ✅ schema field
        gstNumber: vendorData.gstNumber || "",
        category: vendorData.category || "",
      });
      setLogoImage(vendorData.storeLogo || null); // ✅ schema field
    }
  }, [vendorData]);

  // logo change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e, fieldId) => {
    setformData({ ...formData, [fieldId]: e.target.value });
  };

  const toggleEdit = (fieldId) => {
    setIsEditIndex(prev => ({
      ...prev, [fieldId]: !prev[fieldId]
    }));
  };


  // ✅ handleSave now builds FormData and calls onSubmit
  const handleSave = (fieldId) => {
    toggleEdit(fieldId);

    const fd = new FormData();
    fd.append("storeName", formData.storeName);
    fd.append("aboutShop", formData.aboutShop);
    fd.append("address", formData.address);
    fd.append("city", formData.city);
    fd.append("state", formData.state);
    fd.append("pincode", formData.pincode);
    fd.append("businessEmail", formData.businessEmail);
    fd.append("businessContact", formData.businessPhone); // ✅ schema name
    fd.append("gstNumber", formData.gstNumber);
    fd.append("category", formData.category);
    if (logoFile) fd.append("storeLogo", logoFile);
    if (gstFile) fd.append("gstDocumentUpload", gstFile);

    onSubmit(fd);
  };

  const RenderField = (label, fieldId, type = "text", isReadOnly = false) => {
    const isEditing = isEditIndex[fieldId];

    return (
      <>
        {/* input fields */}
        <div className='flex flex-col gap-1.5 md:gap-2'>

          <div className='flex flex-row gap-5 items-center'>
            <label className='text-[13px] md:text-sm font-semibold text-slate-600 dark:text-slate-400 ml-1'>
              {label}
            </label>

            {/* Sirf tab dikhega agar field ReadOnly NAHI hai */}
            {!isReadOnly && (
              <span
                onClick={() => toggleEdit(fieldId)}
                className={`text-pink-500 hover:text-pink-600 font-medium text-[13px] md:text-sm cursor-pointer`}>
                {!isEditing ? "Edit" : "Cancel"}
              </span>
            )}
          </div>

          <div className='flex flex-row gap-5 items-center'>
            
              <input
                type={type}
                value={formData[fieldId]}
                onChange={(e) => handleInputChange(e, fieldId)}
                // placeholder="Sohan Sharma"
                disabled={!isEditing || isReadOnly}
                className={`flex-1 p-2.5 md:p-3.5 rounded-lg md:rounded-2xl border transition-all text-sm outline-none
                  ${!isEditing || isReadOnly
                    ? 'bg-slate-100 border-transparent text-slate-500 cursor-not-allowed'
                    : 'bg-white border-slate-200 focus:ring-1 focus:ring-pink-500 text-slate-800 shadow-sm'
                  }`}
              />

            {isEditing && !isReadOnly && (
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
    <div className='w-full bg-white dark:bg-slate-900'>

      {/* 1. Logo Section */}
      <div className="flex flex-col lg:flex-row items-center gap-6 mb-10 border-b border-slate-50 md:pb-4 lg:pb-8">
        <div className="relative">
          <img
            src={logoImage}
            alt="Store Logo"
            className="w-20 h-20 md:w-28 md:h-28 rounded-3xl object-cover border-4 border-white shadow-lg"
          />

          <input
            type="file"
            id="profilePic"
            hidden
            accept="image/*"
            onChange={handleFileChange} />

          <label
            htmlFor="profilePic"
            className="absolute -bottom-2 -right-2 bg-pink-500 p-2 rounded-xl text-white cursor-pointer shadow-lg border-2 border-white hover:scale-110 transition-all">
            <HiOutlineCamera size={16} />
          </label>
        </div>

        <div className="text-center lg:text-left">
          <h4 className="text-[13px] md:text-sm font-black text-slate-800 uppercase">
            Store Identity
          </h4>
          <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">
            Logo must be 500x500px for better quality
          </p>
        </div>
      </div>

      {/* 2. Fields */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6">

        {RenderField("Store Name", "storeName")}

        <div className="lg:col-span-2">
          {RenderField("About Shop", "aboutShop")}
        </div>

        {RenderField("Business Type", "businessType", "text", true)}
        {RenderField("Business Category", "category", "text", true)}

        {RenderField("Business Email", "businessEmail")}
        {RenderField("Business Phone", "businessPhone", "tel")}

        <div className="lg:col-span-2">
          {RenderField("Address", "address")}
        </div>

        {RenderField("City", "city")}
        {RenderField("State", "state")}
        {RenderField("Pin Code", "pincode")}


        {RenderField("Business PAN", "panNumber", "text", true)}
        {RenderField("GST Number", "gstNumber",)}

        {/* for gst upload - conditionally */}
        {formData.gstNumber && (
          <div className="lg:col-span-2 p-5 bg-pink-50/50 border-2 border-dashed border-pink-100 rounded-3xl my-2">
            <div className="flex flex-col lg:flex-row justify-between text-center lg:text-start gap-4">

              <div>
                <p className="text-xs font-black text-slate-800 uppercase tracking-tight">
                  GST Certificate
                </p>
                <p className="text-[10px] text-slate-500 mt-1 font-bold italic">
                  {vendorData?.gstDocumentUpload
                    ? `Current: ${vendorData.gstDocumentUpload.split('/').pop()}`
                    : "No document uploaded yet"}
                </p>
              </div>

              <label className="cursor-pointer bg-white px-6 py-2 rounded-xl border border-pink-200 text-pink-500 font-bold text-xs hover:bg-pink-50 transition-all uppercase">
                Replace Document
                <input
                  type="file"
                  hidden
                  accept=".pdf,.jpg,.png"
                  onChange={(e) => setGstFile(e.target.files[0])}
                />
              </label>

            </div>
          </div>
        )}

      </div>

      {/* 3. Footer Trust Section */}
      <div className="mt-8 flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
        <div className="p-2 bg-white rounded-full text-slate-400">
          <HiOutlineShieldCheck size={20} />
        </div>
        <p className="text-[10px] lg:text-xs text-slate-500 font-medium">
          Contact admin to update legal info. Read our <span className="text-pink-500 cursor-pointer hover:underline">Privacy Policy</span>.
        </p>
      </div>
    </div>
  )
}

export default ProfileBusinessForm;