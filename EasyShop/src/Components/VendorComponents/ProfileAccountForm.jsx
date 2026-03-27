
import React, { useState } from 'react';
import { HiOutlineShieldCheck } from "react-icons/hi";

function ProfileAccountForm() {

  const [formData, setformData] = useState({
    accHolderName: "Sohan Sharma",
    bankName: "State Bank of India",
    accNumber: "349812345678",
    ifsc: "SBIN0001234",
  });

  // Poore form ke liye ek hi switch
  const [isEditing, setIsEditing] = useState(false);

  //real time data state me update krna
  const handleInputChange = (e, fieldId) => {
    setformData({ ...formData, [fieldId]: e.target.value });
  };

  // after clicking save, naye data ko finalize karna
  const handleSave = (fieldId) => {
    setIsEditing(false);
  };

  const RenderField = (label, fieldId) => {
    return (
      <div className='flex flex-col gap-1.5 md:gap-2'>

        <label className='text-[13px] md:text-sm font-semibold text-slate-600 dark:text-slate-400 ml-1'>
          {label}
        </label>

        <input
          type="text"
          value={formData[fieldId]}
          onChange={(e) => handleInputChange(e, fieldId)}
          disabled={!isEditing} // Agar isEditing false hai toh disabled rahega
          className={`flex-1 p-2.5 md:p-3.5 rounded-lg md:rounded-2xl border transition-all text-sm outline-none
                  ${!isEditing
              ? 'bg-slate-100 border-transparent text-slate-500 cursor-not-allowed'
              : 'bg-white border-slate-200 focus:ring-1 focus:ring-pink-500 text-slate-800 shadow-sm'
            }`}
        />
      </div>
    );
  };

  return (
    <div className='w-full bg-white dark:bg-slate-900'>
      
      {/* edit buttn */}
      <div className='flex justify-end mb-8'>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`text-pink-500 hover:text-pink-600 font-medium text-[13px] md:text-[16px] cursor-pointer`}>
          {!isEditing ? "Edit" : "Cancel"}
        </button>
      </div>
      
      {/* input fields */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6">

        {RenderField("Account Holder Name", "accHolderName")}
        {RenderField("Bank Name", "bankName")}
        {RenderField("Account Number", "accNumber")}
        {RenderField("IFSC Code", "ifsc")}

        {/* Bank Document Upload */}
        {isEditing && (
          <div className="lg:col-span-2 p-5 bg-pink-50/30 border-2 border-dashed border-pink-100 rounded-3xl mt-4 animate-in fade-in zoom-in duration-300">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <p className="text-xs font-black text-slate-800 uppercase">Verification Document</p>
                <p className="text-[10px] text-slate-500 mt-1 font-bold italic">Upload Cancelled Cheque or Passbook Front Page</p>
              </div>
              <label className="cursor-pointer bg-white px-6 py-2 rounded-xl border border-pink-200 text-pink-500 font-bold text-xs hover:bg-pink-100 transition-all uppercase">
                Select File
                <input type="file" hidden accept="image/*,.pdf" />
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Save Button */}
      {isEditing && (
        <div className='mt-10 flex justify-end'>
          <button
            onClick={handleSave}
            className='px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white font-black rounded-2xl text-xs transition-all active:scale-95 shadow-xl shadow-pink-100 uppercase tracking-widest cursor-pointer'>
           Save Changes
          </button>
        </div>
      )}

      {/* Trust Footer */}
      <div className="mt-8 flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
        <div className="p-2 bg-white rounded-full text-slate-400">
          <HiOutlineShieldCheck size={20} />
        </div>
        <p className="text-[10px] md:text-xs text-slate-500 font-medium leading-relaxed">
          Your banking data is stored in a PCI-DSS compliant vault. Read our <span className="text-pink-500 cursor-pointer hover:underline">Security Protocol</span>.
        </p>
      </div>
    </div>
  )
}

export default ProfileAccountForm;