
import Logo from '../assets/Images/Logo.png';
import { useEffect } from 'react';

function EasyShopLoader() {

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        // Jab loader unmount ho (khatam ho), tab wapas scroll enable kar do
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [])

    return (
        <div className="fixed inset-0 z-9999 bg-white/80 backdrop-blur-xl flex flex-col items-center justify-center w-full h-screen overflow-hidden">
            {/* Inline Style for Custom Animation */}
            <style>
                {`
                    @keyframes customLoading {
                        0% { transform: translateX(-100%); }
                        100% { transform: translateX(100%); }
                    }
                    .animate-custom-loading {
                        animation: customLoading 1.5s ease-in-out infinite;
                    }
                `}
            </style>

            <div className="relative flex flex-col items-center">
                {/* Logo Bag Part - Animated */}
                <div className="animate-bounce duration-1000">
                    <img src={Logo} alt="Easy Logo" className="w-28 md:w-36 h-auto" />
                </div>

                {/* Dynamic Shadow */}
                <div className="w-12 h-1.5 bg-gray-900/10 rounded-[100%] blur-sm animate-pulse -mt-2"></div>
            </div>

            {/* Branded Text & Progress Bar */}
            <div className="mt-6 md:mt-10 text-center">
                <p className="text-gray-600 font-medium text-[10px] md:text-xs tracking-[0.3em] animate-pulse uppercase">
                    Preparing Your <span className="text-pink-500 font-bold">Easy</span> Shopping
                </p>

                <div className="w-32 h-1 bg-pink-100 mx-auto mt-4 rounded-full overflow-hidden relative">
                    {/* Progress Bar with Custom Animation Class */}
                    <div className="absolute inset-0 bg-pink-500 animate-custom-loading origin-left"></div>
                </div>
            </div>
        </div>
    );
};

export default EasyShopLoader;