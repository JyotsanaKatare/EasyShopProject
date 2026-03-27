
//updated 
import React, { useState } from 'react';
import Logo from '../assets/Images/Logo.png';
import { IoIosSearch, IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FiUser } from "react-icons/fi";
import { GoHeart } from "react-icons/go";
import { PiShoppingCartSimple } from "react-icons/pi";
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from './CartContext';
import { allFaqs } from './Data';
import { allProducts } from './Data';

function SearchBar() {

    const { cartItems } = useCart();
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    const [isAccountOpen, setIsAccountOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    //quantity update
    const totalQuantity = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);

    // Filter products based on name or description
    const searchProducts = allProducts.filter(p =>
        p.categoryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.desc.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 3); // Top 3 results

    // Filter FAQs based on question
    const searchFaqs = allFaqs.filter(f =>
        f.question.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 2); // Top 2 results

    // Ye function click handle karega
    const handleRedirect = (item, type) => {
        setSearchTerm("");
        if (type === 'product') {
            navigate(`/product_detail/${item.id}`);
        } else if (type === 'faq') {
            navigate(`/faqs?query=${item.question}`);
        }
    };

    return (
        <section className="w-full bg-white sticky top-0 z-50 shadow-sm px-4 lg:px-6">
            <div className="max-w-6xl mx-auto flex flex-wrap md:flex-nowrap items-center py-4">

                {/* Logo Section */}
                <div className="flex items-center order-1 w-1/2 md:w-auto">
                    <img
                        src={Logo}
                        alt="Logo"
                        className="h-10 object-cover" />
                </div>

                {/* Icons */}
                <div className="flex items-center justify-end gap-6 order-2 w-1/2 md:w-auto md:order-3">

                    <div className="flex gap-4 text-2xl text-gray-600">

                        {/* whishlist Icon */}
                        <GoHeart
                            onClick={() => navigate("/wishlist")}
                            className="cursor-pointer hover:text-pink-500 transition-colors" />

                        {/* cart Icon with Badge */}
                        <div
                            onClick={() => navigate("/cart")}
                            className="relative cursor-pointer group">
                            <PiShoppingCartSimple
                                className="hover:text-pink-500 transition-colors" />

                            {totalQuantity > 0 ? (
                                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                                    {totalQuantity}
                                </span>
                            ) : (
                                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                                    0
                                </span>
                            )}

                        </div>

                        {/* Account Section */}
                        <div className="relative">
                            <div
                                onClick={() => setIsAccountOpen(!isAccountOpen)}
                                className="flex items-center gap-2 md:bg-gray-100 md:px-4 md:py-1.5 rounded-full cursor-pointer hover:bg-pink-50 transition-all group"
                            >
                                <FiUser className={`text-xl ${isAccountOpen ? 'text-pink-500' : 'text-gray-600'} group-hover:text-pink-500`} />
                                <span className="hidden md:flex text-sm font-semibold text-gray-700 group-hover:text-pink-500">Account</span>
                            </div>

                            {/* Account Dropdown Menu */}
                            {isAccountOpen && (
                                <>
                                    {/* when we click outside then drop down will close */}
                                    <div
                                        onClick={() => setIsAccountOpen(false)}
                                        className="fixed inset-0 z-10" >
                                    </div>

                                    <div className="absolute right-0 mt-3 w-38 md:w-48 bg-white shadow-2xl rounded-xl border border-gray-100 md:py-2 z-20 animate-in fade-in slide-in-from-top-2">

                                        <div className="p-2 md:space-y-1">

                                            <button
                                                onClick={() => {
                                                    navigate("/login");
                                                    setIsAccountOpen(false);
                                                }}
                                                className="w-full text-left px-3 py-2 text-sm font-bold bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors cursor-pointer">
                                                Login
                                            </button>

                                            <button
                                                onClick={() => {
                                                    navigate("/account_type");
                                                    setIsAccountOpen(false);
                                                }}
                                                className="w-full text-left px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                                                Create Account
                                            </button>
                                        </div>

                                        <div className="border-t border-gray-50 mt-1 pt-1">

                                            <p
                                                onClick={() => { navigate("/my_orders"); setIsAccountOpen(false); }}
                                                className="px-5 py-2 text-[13px] text-gray-600 hover:bg-gray-50 cursor-pointer transition-colors">
                                                My Orders
                                            </p>

                                            <p
                                                onClick={() => { navigate("/wishlist"); setIsAccountOpen(false); }}
                                                className="px-5 py-2 text-[13px] text-gray-600 hover:bg-gray-50 cursor-pointer transition-colors">
                                                Wishlist
                                            </p>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>


                {/* Search Bar */}
                <div className="w-full md:flex-1 md:mx-10 order-3 md:order-2 mt-4 md:mt-0">
                    <div className="relative flex items-center bg-gray-50 rounded-2xl border border-transparent focus-within:border-pink-500 focus-within:bg-white focus-within:shadow-lg transition-all duration-300 group">

                        {/* Category Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="flex items-center gap-4 md:gap-2 px-5 py-1 md:py-3 text-gray-600 font-medium text-sm border-r border-gray-200 transition-colors cursor-pointer"
                            >
                                <span className='md:hidden'>All </span>
                                <span className='hidden md:flex'>All Categories</span>
                                {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                            </button>

                            {isOpen && (
                                <>
                                    {/* when we click outside then drop down will close */}
                                    <div
                                        className="fixed inset-0 z-10"
                                        onClick={() => setIsOpen(false)}>
                                    </div>

                                    <div className="absolute top-full left-0 mt-2 w-40 md:w-50 bg-white shadow-2xl rounded-xl border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                                        {[
                                            "Women's Clothing",
                                            "Men's Clothing",
                                            "Luggage & Bags"
                                        ].map((cat) => (
                                            <p
                                                key={cat}
                                                className="px-5 py-3 hover:bg-pink-50 hover:text-pink-600 cursor-pointer text-sm transition-colors border-b border-gray-50 last:border-none">
                                                {cat}
                                            </p>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Input */}
                        <input
                            type="text"
                            placeholder="Search for products..."
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-transparent px-4 md:px-6 py-3 text-sm text-gray-700 outline-none placeholder:text-gray-400"
                        />

                        {searchTerm && (
                            <div className="absolute top-full w-full bg-white shadow-2xl rounded-xl mt-2 p-4 z-50 border border-gray-100">
                                {/* Product Section */}
                                {searchProducts.length > 0 && (
                                    <div className="mb-4">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Products</p>
                                        {searchProducts.map(p => (
                                            <div
                                                key={p.id}
                                                onClick={() => handleRedirect(p, 'product')}
                                                className="flex items-center gap-3 py-2 hover:bg-gray-50 cursor-pointer rounded-lg px-2">
                                                <img
                                                    src={p.img}
                                                    alt={p.name}
                                                    className="w-10 h-10 rounded object-cover" />
                                                <div>
                                                    <h5 className="text-sm font-semibold text-gray-800">{p.name}</h5>
                                                    <p className="text-xs text-pink-500">₹{p.price}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* FAQ Section */}
                                {searchFaqs.length > 0 && (
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Help & Support</p>
                                        {searchFaqs.map((f, i) => (
                                            <div
                                                key={i}
                                                onClick={() => handleRedirect(f, 'faq')}
                                                className="py-2 px-2 hover:bg-gray-50 cursor-pointer rounded-lg text-sm text-gray-600 flex items-center gap-2">
                                                <span className="text-pink-400 text-xs font-bold italic">Q:</span> {f.question}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* No results state */}
                                {searchProducts.length === 0 && searchFaqs.length === 0 && (
                                    <p className="text-center text-gray-400 py-4 text-sm">No match found. Try another keyword!</p>
                                )}
                            </div>
                        )}

                        {/* Search Icon */}
                        <button className="mr-1 md:mr-2 bg-pink-500 hover:bg-pink-600 text-white p-2 md:p-2.5 rounded-xl transition-all shadow-md active:scale-95 group-hover:rotate-6">
                            <IoIosSearch className="text-xl" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SearchBar;