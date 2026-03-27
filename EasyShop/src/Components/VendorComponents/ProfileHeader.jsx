
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

function ProfileHeader() {
    const navigate = useNavigate();

    return (
        <nav className="bg-white/80 backdrop-blur-xl border-b border-pink-50 flex items-center justify-between p-3 md:p-4 lg:px-8 lg:py-5 sticky top-0 z-50">
            <div className="flex items-center gap-2 md:gap-6">

                {/* Back Button */}
                <button
                    onClick={() => navigate('/vendor_dashboard')}
                    className="flex items-center gap-1.5 text-slate-500 hover:text-pink-500 font-bold transition-colors cursor-pointer group"
                >
                    <HiOutlineArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="hidden sm:inline text-sm">Dashboard</span>
                </button>

                <div className="h-5 w-px bg-slate-200 hidden xs:block"></div>

                {/* Brand Logo */}
                <div className="flex items-center gap-2">
                    <img
                        src="https://media.istockphoto.com/id/1404897722/photo/diamond-3d-icon-on-blue-circle-shape-3d-illustration.jpg?s=612x612&w=0&k=20&c=3Dx0WPF2udKJaFP9i6-Xz9Gnp1TV2UtKbphyY3XcFBY="
                        alt="Logo"
                        className="w-10 h-6 md:w-15 md:h-12 object-cover"
                    />
                    {/* Mobile par "EasyShop" aur Desktop par "EasyShop Settings" */}
                    <span className="text-sm md:text-lg font-bold text-slate-800 tracking-tighter truncate max-w-25 md:max-w-none">
                        EasyShop <span className="hidden md:inline">Settings</span>
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-3"> {/* Gap add kiya aur items-center */}

                {/* Vendor Mode Pill */}
                <span className="hidden md:block text-[8px] md:text-[10px] font-black bg-white/50 border border-pink-100 text-pink-500 px-3 py-1 rounded-full uppercase whitespace-nowrap shadow-sm">
                    Vendor Mode
                </span>

                {/* Vendor Image Wrapper */}
                <div className="relative group">
                    <img
                        src="https://images.unsplash.com/photo-1481214110143-ed630356e1bb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHdvbWVufGVufDB8fDB8fHww"
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