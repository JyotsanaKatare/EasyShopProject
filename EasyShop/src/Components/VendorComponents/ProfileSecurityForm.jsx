
import React, { useState } from 'react';
import { HiOutlineShieldCheck } from "react-icons/hi";
import { useChangePassword } from '../../hook/useAuth';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

function ProfileSecurityForm({ vendorData }) {

    const { t } = useTranslation();

    const [formData, setformData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [isEditing, setIsEditing] = useState(false);

    const { mutate: changePassword, isPending } = useChangePassword();

    const handleInputChange = (e, fieldId) => {
        setformData({ ...formData, [fieldId]: e.target.value });
    };

    const handleSave = () => {
        if (!formData.oldPassword || !formData.newPassword || !formData.confirmPassword) {
            toast.error("All fields are required");
            return;
        }

        if (formData.newPassword !== formData.confirmPassword) {
            toast.error("New password and confirm password do not match");
            return;
        }

        changePassword({
            oldPassword: formData.oldPassword,
            newPassword: formData.newPassword,
            confirmPassword: formData.confirmPassword,
        }, {
            onSuccess: () => {
                setformData({ oldPassword: "", newPassword: "", confirmPassword: "" });
                setIsEditing(false);
            }
        });
    };

    const RenderField = (label, fieldId) => {
        return (
            <div className='flex flex-col gap-1.5 md:gap-2'>

                <label className='text-[13px] md:text-sm font-semibold text-slate-600 dark:text-slate-400 ml-1'>
                    {label}
                </label>

                <input
                    type="password"
                    value={formData[fieldId]}
                    onChange={(e) => handleInputChange(e, fieldId)}
                    disabled={!isEditing}
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
                    {!isEditing ? t('vendorProfile.editLabel') : t('vendorProfile.cancelLabel')}
                </button>
            </div>

            {/*Login Email (Hamesha Locked) */}
            <div className="mb-10">
                <label className='text-[13px] md:text-sm font-semibold text-slate-600 dark:text-slate-400 ml-1'>
                    {t('vendorProfile.fieldLoginEmail')}
                </label>

                <div className="mt-2 p-4 bg-slate-100 border border-slate-100 rounded-2xl flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-500">
                        {vendorData?.email || "—"}
                    </span>
                    <span className="text-[9px] bg-pink-50 px-2 py-1 rounded-lg text-pink-500 font-bold uppercase">
                        {t('vendorProfile.primaryBadge')}
                    </span>
                </div>
            </div>

            {/* input fields */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6">

                {RenderField(t('vendorProfile.fieldCurrentPassword'), "oldPassword")}
                {RenderField(t('vendorProfile.fieldNewPassword'), "newPassword")}
                {RenderField(t('vendorProfile.fieldConfirmPassword'), "confirmPassword")}

            </div>

            {/* Save Button */}
            {isEditing && (
                <div className='mt-10 flex justify-center lg:justify-end'>
                    <button
                        onClick={handleSave}
                        disabled={isPending}
                        className='px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white font-black rounded-2xl text-xs transition-all active:scale-95 shadow-xl shadow-pink-100 uppercase tracking-widest cursor-pointer'>
                        {isPending ? t('vendorProfile.savingLabel') : t('vendorProfile.savePassword')}
                    </button>
                </div>
            )}

            {/* Trust Footer */}
            <div className="mt-8 flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <div className="p-2 bg-white rounded-full text-slate-400">
                    <HiOutlineShieldCheck size={20} />
                </div>
                <p className="text-[10px] lg:text-xs text-slate-500 font-medium leading-relaxed">
                    {t('vendorProfile.securityNote')} <span className="text-pink-500 cursor-pointer hover:underline">{t('vendorProfile.securityProtocol')}</span>.
                </p>
            </div>
        </div>
    )
}

export default ProfileSecurityForm;