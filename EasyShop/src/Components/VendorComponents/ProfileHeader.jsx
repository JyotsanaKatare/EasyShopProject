
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";
import { useVendorProfile } from "../../hook/useAuth";
import VendorLangSwitcher from "./VendorLangSwitcher";
import EasyShopLoader from '../EasyShopLoader';
import { useTranslation } from "react-i18next";

function ProfileHeader() {

    const { t } = useTranslation();
    const navigate = useNavigate();
    const { user } = useAuthStore();
    const vendorId = user?._id || user?.id;
    const { data: vendorData, isLoading, isError } = useVendorProfile(vendorId);

    if (isLoading) return <EasyShopLoader />

    return (
        <nav className="max-w-6xl mx-auto bg-white/70 backdrop-blur-2xl border-b border-pink-100/50 flex items-center justify-between px-4 sm:px-5 lg:px-6 py-3 lg:py-4 sticky top-0 z-50">

            {/* Left: Navigation & Branding */}
            <div className="flex items-center gap-4 md:gap-6">
                <button
                    onClick={() => navigate('/vendor_dashboard')}
                    className="flex items-center gap-2 text-slate-500 hover:text-pink-600 font-semibold transition-all group"
                >
                    <div className="p-1.5 rounded-full bg-slate-100 group-hover:bg-pink-100 transition-colors">
                        <HiOutlineArrowLeft
                            size={16}
                            className="group-hover:-translate-x-0.5 transition-transform" />
                    </div>
                    <span className="hidden sm:inline text-sm">
                        {t('vendorProfile.backToDashboard')}
                    </span>
                </button>

                <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>

                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-50 border border-slate-100 shadow-sm flex items-center justify-center">
                        <img
                            src={vendorData.storeLogo}
                            alt="Logo"
                            className="w-full h-full object-contain p-1" />
                    </div>

                    <div className="hidden md:flex flex-col">
                        <span className="text-sm font-bold text-slate-800 leading-tight">
                            {vendorData?.storeName || "Store Name"}
                        </span>

                        <span className="pt-0.5 text-[10px] text-pink-500 font-bold uppercase tracking-wider">
                            {t('vendorProfile.storeOwner')}
                        </span>
                    </div>
                </div>
            </div>

            {/* Right: Actions & Profile */}
            <div className="flex items-center gap-3 md:gap-5">
                <VendorLangSwitcher />

                <div className="flex items-center gap-3 pl-3 border-l border-slate-100">
                    <div className="hidden md:flex flex-col items-end">
                        <span className="text-xs font-bold text-slate-700">
                            {vendorData.name}
                        </span>

                        <span className="text-[10px] text-slate-400 font-medium">
                            {t('vendorProfile.vendorRole')}
                        </span>
                    </div>

                    <div className="relative group cursor-pointer">
                        <div className="w-10 h-10 rounded-full ring-2 ring-transparent group-hover:ring-pink-200 transition-all p-0.5">
                            <img
                                src={vendorData.profilePhoto}
                                alt="Profile"
                                className="w-full h-full object-cover rounded-full shadow-sm"
                            />
                        </div>
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full ring-1 ring-slate-100"></span>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default ProfileHeader;