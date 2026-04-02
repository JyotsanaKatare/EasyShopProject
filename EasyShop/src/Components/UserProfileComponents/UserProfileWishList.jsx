import React from 'react';
import { HiOutlineTrash, HiOutlineShoppingCart, HiOutlineHeart } from 'react-icons/hi';

const wishlistItems = [
    { 
        id: 1, 
        name: "Wireless Noise Cancelling Headphones", 
        price: "₹12,499", 
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
        stock: "In Stock"
    },
    { 
        id: 2, 
        name: "Smart Watch Series 9 (Aesthetic Pink)", 
        price: "₹32,999", 
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
        stock: "Only 2 Left"
    },
    { 
        id: 3, 
        name: "Minimalist Leather Backpack", 
        price: "₹3,200", 
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&q=80",
        stock: "In Stock"
    }
];

function UserProfileWishList() {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* Wishlist Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistItems.map((item) => (
                    <div 
                    key={item.id} 
                    className="group bg-slate-50/50 rounded-4xl p-4 border border-transparent hover:border-pink-100 hover:bg-white hover:shadow-xl hover:shadow-pink-100/20 transition-all duration-300 relative">
                        
                        {/* Remove Button */}
                        <button className="absolute top-6 right-6 p-2 bg-white/80 backdrop-blur-sm rounded-xl text-slate-400 hover:text-red-500 shadow-sm opacity-0 group-hover:opacity-100 transition-all z-10 cursor-pointer">
                            <HiOutlineTrash size={16} />
                        </button>

                        {/* Image Container */}
                        <div className="aspect-square rounded-3xl overflow-hidden mb-4 bg-white">
                            <img 
                                src={item.image} 
                                alt={item.name} 
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                            />
                        </div>

                        {/* Product Details */}
                        <div className="space-y-1 px-1">
                            <p className="text-[10px] font-black uppercase text-pink-500 tracking-widest">{item.stock}</p>
                            <h3 className="text-sm font-bold text-slate-800 line-clamp-1 group-hover:text-pink-600 transition-colors">
                                {item.name}
                            </h3>
                            <p className="text-lg font-black text-slate-900">{item.price}</p>
                        </div>

                        {/* Add to Cart Button */}
                        <button className="w-full mt-4 py-3 bg-white text-slate-700 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 border border-slate-100 group-hover:bg-pink-500 group-hover:text-white group-hover:border-transparent transition-all active:scale-95 cursor-pointer">
                            <HiOutlineShoppingCart size={16} />
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {wishlistItems.length === 0 && (
                <div className="py-20 text-center">
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <HiOutlineHeart size={40} className="text-slate-200" />
                    </div>
                    <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">Your wishlist is empty!</p>
                </div>
            )}
        </div>
    );
};

export default UserProfileWishList;