
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";
import { useVendorProfile } from "../../hook/useAuth";

function ProfileHeader() {

    const navigate = useNavigate();
    const { user } = useAuthStore();

    const vendorId = user?._id || user?.id; //id get from store

    const { data: vendorData, isLoading, isError } = useVendorProfile(vendorId);

    return (
        <nav className="bg-white/80 backdrop-blur-xl border-b border-pink-50 flex items-center justify-between p-3 md:p-4 lg:px-8 lg:py-5 sticky top-0 z-50">
            <div className="flex items-center gap-2 md:gap-6">

                {/* Back Button */}
                <button
                    onClick={() => navigate('/vendor_dashboard')}
                    className="flex items-center gap-1.5 text-slate-500 hover:text-pink-500 font-bold transition-colors cursor-pointer group"
                >
                    <HiOutlineArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="hidden sm:inline text-sm">
                        Dashboard
                    </span>
                </button>

                <div className="h-5 w-px bg-slate-200 hidden xs:block"></div>

                {/* Brand Logo */}
                <div className="flex items-center gap-2">
                    <img
                        src={vendorData.storeLogo}
                        alt="Logo"
                        className="w-10 h-6 md:w-15 md:h-12 object-cover"
                    />
                    {/* Mobile par "EasyShop" aur Desktop par "EasyShop Settings" */}
                    <span className="text-sm md:text-lg font-bold text-slate-800 tracking-tighter truncate max-w-25 md:max-w-none">
                        {/* EasyShop <span className="hidden md:inline">Settings</span> */}
                        {vendorData.storeName}
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-3"> {/* Gap add kiya aur items-center */}

                {/* Vendor Mode Pill */}
                <span className="hidden md:block text-[8px] md:text-[10px] font-black bg-white/50 border border-pink-100 text-pink-500 px-3 py-1 rounded-full uppercase whitespace-nowrap shadow-sm">
                    {vendorData.name}
                </span>

                {/* Vendor Image Wrapper */}
                <div className="relative group">
                    <img
                        src={vendorData.profilePhoto}
                        alt="Vendor Profile"
                        className="w-10 h-10 md:w-12 md:h-12 object-cover rounded-full border-2 border-white shadow-md group-hover:border-pink-200 transition-all"
                    />
                    {/* Online Status Dot (Optional) */}
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                </div>

            </div>
        </nav>
    );
}

export default ProfileHeader;