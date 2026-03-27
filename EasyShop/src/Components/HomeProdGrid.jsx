
//updated
import NewProd1 from '../assets/Images/NewProd1.png';
import NewProd3 from '../assets/Images/NewProd3.png';
import NewProd8 from '../assets/Images/NewProd8.png';
import NewProd9 from '../assets/Images/NewProd9.jpg';
import NewProd10 from '../assets/Images/NewProd10.jpg';
import NewProd11 from '../assets/Images/NewProd11.jpg';
import NewProd12 from '../assets/Images/NewProd12.jpg';
import { useNavigate } from 'react-router-dom';

function HomeProdGrid() {

    const navigate = useNavigate();

    const categorySection = [
        {
            id: 1,
            img: NewProd1,
            category: "Men",           
            subCategory: "Shoes",      
        },
        {
            id: 3,
            img: NewProd3,
            category: "Women",
            subCategory: "Purse",
        },
        {
            id: 8,
            img: NewProd8,
            category: "Beauty",
            subCategory: "Beauty Products",
        },
        {
            id: 9,
            img: NewProd9,
            category: "Men",
            subCategory: "Modern Accents",
        },
        {
            id: 10,
            img: NewProd10,
            category: "Home",
            subCategory: "Modern Furniture",
        },
        {
            id: 11,
            img: NewProd11,
            category: "Women",
            subCategory: "Heels",
        },
        {
            id: 12,
            img: NewProd12,
            category: "Unisex",
            subCategory: "Watches",
        },
    ];

    const furniture = categorySection.find(cat => cat.id === 10);
    const shoes = categorySection.find(cat => cat.id === 1);
    const purse = categorySection.find(cat => cat.id === 3);
    const beauty = categorySection.find(cat => cat.id === 8);
    const accents = categorySection.find(cat => cat.id === 9);
    const heels = categorySection.find(cat => cat.id === 11);
    const watches = categorySection.find(cat => cat.id === 12);

    return (
        <section className="w-full py-8 md:py-16 px-4 lg:px-6">
            <div className="max-w-6xl mx-auto">

                {/* heading */}
                <div className="flex flex-col items-center mb-8 md:mb-12">
                    <h2 className="text-2xl md:text-4xl font-bold text-gray-800 tracking-tight">
                        Shop By Category
                    </h2>

                    <div className="w-20 h-1 md:h-1.5 bg-pink-500 rounded-full mt-2 md:mt-3"></div>

                    <p className="text-gray-500 mt-4 text-[12px] text-center md:text-sm uppercase tracking-widest">
                        Explore our diverse collections curated just for you
                    </p>
                </div>

                {/* The Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-4 grid-flow-row-dense gap-4 h-auto md:h-180">

                    {/* 1. Big Vertical Box (Furniture) - Occupies 2 rows */}
                    <div
                        onClick={() => navigate(`/all_products/${furniture?.id}/${furniture?.subCategory}`)}
                        className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-3xl bg-gray-100 cursor-pointer">
                        <img
                            src={NewProd10}
                            alt="Furniture"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />

                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300"></div>
                        <div className="absolute bottom-8 left-8 text-white">
                            <h3 className="text-3xl text-[(#FFFFFF)] font-bold">{furniture?.subCategory}</h3>
                            <p className="text-sm opacity-90 mb-4 font-medium">Design your dream home</p>
                            <button className="bg-white text-black px-6 py-2 rounded-full font-bold text-sm hover:bg-pink-500 hover:text-white transition-colors">Explore</button>
                        </div>
                    </div>

                    {/* 2. Horizontal Wide Box (Essential Accessories) */}
                    <div
                        onClick={() => navigate(`/all_products/${accents?.id}/${accents?.subCategory}`)}
                        className="md:col-span-2 relative group overflow-hidden rounded-3xl bg-gray-100 h-64 md:h-auto cursor-pointer">
                        <img
                            src={NewProd9}
                            alt="Essential Accessories"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300"></div>
                        <div className="absolute top-1/2 -translate-y-1/2 left-8 text-white">
                            <h3 className="text-2xl font-bold">{accents?.subCategory}</h3>
                            <p className="text-sm opacity-90 mb-2 font-medium">Upgrade Your Style</p>
                            <span className="text-pink-400 font-bold border-b-2 border-pink-400 cursor-pointer">Shop Now</span>
                        </div>
                    </div>

                    {/* 3. Small Box (Shoes) */}
                    <div
                        onClick={() => navigate(`/all_products/${shoes?.id}/${shoes?.subCategory}`)}
                        className="relative group overflow-hidden rounded-3xl bg-gray-100 h-64 md:h-auto cursor-pointer">
                        <img src={NewProd1}
                            alt="Shoes"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-all duration-300"></div>
                        <div className="absolute bottom-6 left-6 text-white">
                            <h3 className="text-xl text-white font-bold">{shoes?.subCategory}</h3>
                            <p className="text-xs font-bold text-pink-400">Up to 40% Off</p>
                        </div>
                    </div>

                    {/* 4. Small Box (Bags) */}
                    <div
                        onClick={() => navigate(`/all_products/${purse?.id}/${purse?.subCategory}`)}
                        className="relative group overflow-hidden rounded-3xl bg-gray-100 h-64 md:h-auto cursor-pointer">
                        <img
                            src={NewProd3}
                            alt="Bags"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-all duration-300"></div>
                        <div className="absolute bottom-6 left-6 text-white">
                            <h3 className="text-xl font-bold">{purse?.subCategory}</h3>
                            <p className="text-xs font-bold text-pink-400">Exclusive Styles</p>
                        </div>
                    </div>

                    {/* 6. Small Box (beauty prod) */}
                    <div
                        onClick={() => navigate(`/all_products/${beauty?.id}/${beauty?.subCategory}`)}
                        className="relative group overflow-hidden rounded-3xl bg-gray-100 h-64 md:h-50 cursor-pointer">
                        <img
                            src={NewProd8}
                            alt="BeautyProducts"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-all duration-300"></div>
                        <div className="absolute bottom-6 left-6 text-white">
                            <h3 className="text-xl font-bold">{beauty?.subCategory}</h3>
                            <p className="text-xs font-bold text-pink-400">Exclusive Styles</p>
                        </div>
                    </div>

                    {/* 6. Small Box (heels) */}
                    <div
                        onClick={() => navigate(`/all_products/${heels?.id}/${heels?.subCategory}`)}
                        className="relative group overflow-hidden rounded-3xl bg-gray-100 h-64 md:h-50 cursor-pointer">
                        <img
                            src={NewProd11}
                            alt="Heels"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-all duration-300"></div>
                        <div className="absolute bottom-6 left-6 text-white">
                            <h3 className="text-xl font-bold text-pink-100">{heels?.subCategory}</h3>
                            <p className="text-xs font-bold text-pink-400">Exclusive Styles</p>
                        </div>
                    </div>

                    {/* 5. Small Box (watch) */}
                    <div
                        onClick={() => navigate(`/all_products/${watches?.id}/${watches?.subCategory}`)}
                        className="md:col-span-2 relative group overflow-hidden rounded-3xl bg-gray-100 h-64 md:h-50 cursor-pointer">
                        <img
                            src={NewProd12}
                            alt="watches"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-all duration-300"></div>
                        <div className="absolute bottom-6 left-6 text-white">
                            <h3 className="text-xl font-bold text-gray-600">{watches?.subCategory}</h3>
                            <p className="text-xs font-bold text-pink-400">Exclusive Styles</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HomeProdGrid;