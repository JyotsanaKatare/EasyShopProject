
import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import NewProd1 from '../assets/Images/NewProd1.png';
import NewProd2 from '../assets/Images/NewProd2.png';
import NewProd3 from '../assets/Images/NewProd3.png';
import NewProd4 from '../assets/Images/NewProd4.png';
import NewProd5 from '../assets/Images/NewProd5.png';
import NewProd6 from '../assets/Images/NewProd6.png';
import NewProd7 from '../assets/Images/NewProd7.png';
import NewProd8 from '../assets/Images/NewProd8.png';
import NewProd9 from '../assets/Images/NewProd9.jpg';
import NewProd10 from '../assets/Images/NewProd10.jpg';
import NewProd11 from '../assets/Images/NewProd11.jpg';
import NewProd12 from '../assets/Images/NewProd12.jpg';
import NewProd13 from '../assets/Images/NewProd13.jpg';
import NewProd14 from '../assets/Images/NewProd14.jpg';
import WomenImg1 from '../assets/Images/WomenImg1.jpg';
import WomenImg2 from '../assets/Images/WomenImg2.jpg';
import WomenImg3 from '../assets/Images/WomenImg3.jpg';
import MenImg1 from '../assets/Images/MenImg1.jpg';
import MenImg2 from '../assets/Images/MenImg2.jpg';
import MenImg3 from '../assets/Images/MenImg3.jpg';
import KidImg1 from '../assets/Images/KidImg1.jpg';
import KidImg2 from '../assets/Images/KidImg2.jpg';
import KidImg3 from '../assets/Images/KidImg3.jpeg';
import KidImg4 from '../assets/Images/KidImg4.jpeg';

import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import { IoMdStar } from "react-icons/io";
import { IoMdStarOutline } from "react-icons/io";
import ProductsFilterPart from './ProductsFilterPart';
import Breadcrumbs from './Breadcrumbs';
import { useCart } from './CartContext';
import { useWishList } from './WishListContext';

function Products() {

    const { catId, catName } = useParams();
    const { addToCart } = useCart();
    const { wishListItems, addToWishList } = useWishList();
    const navigate = useNavigate();

    const allProducts = [
        {
            id: 1,
            img: NewProd1,
            category: "Men",
            subCategory: "Shoes",
            name: "Red Sneakers",
            desc: "Comfortable Shoes",
            color: "gray",
            size: "8",
            price: 1800,
            originalPrice: 2400,
        },
        {
            id: 2,
            img: NewProd2,
            category: "Women",
            subCategory: "Tops",
            name: "Women's Unique Top",
            desc: "Elegant Summer Wear",
            color: "pink",
            size: "M",
            price: 850,
            originalPrice: 1200,
        },
        {
            id: 3,
            img: NewProd3,
            category: "Women",
            subCategory: "Purse",
            name: "Designer Purse",
            desc: "Leather Handbag",
            color: "violet",
            size: "Free Size",
            price: 2200,
            originalPrice: 3500,
        },
        {
            id: 4,
            img: NewProd4,
            category: "Men",
            subCategory: "Jeans",
            name: "Stretchy Blends",
            desc: "Distinct back pocket stitching",
            color: "navy blue",
            size: "28",
            price: 1400,
            originalPrice: 1900,
        },
        {
            id: 5,
            img: NewProd5,
            category: "Women",
            subCategory: "Necklace",
            name: "Platinum Necklace",
            desc: "Luxury Jewelry Item",
            color: "silver",
            size: "Adjustable",
            price: 5500,
            originalPrice: 7000,
        },
        {
            id: 6,
            img: NewProd6,
            category: "Beauty",
            subCategory: "Makeup Brushes",
            name: "Makeup Brush Set",
            desc: "Professional Brush Kit",
            color: "pink",
            size: "Set of 12",
            price: 650,
            originalPrice: 999,
        },
        {
            id: 7,
            img: NewProd7,
            category: "Beauty",
            subCategory: "Lipstick",
            name: "Matte Lipstick",
            desc: "Long-lasting Lip Color",
            color: "red",
            size: "3.5g",
            price: 450,
            originalPrice: 600,
        },
        {
            id: 8,
            img: NewProd8,
            category: "Beauty",
            subCategory: "Beauty Products",
            name: "Hydrating Serum",
            desc: "Pure Beauty Product",
            color: "skinny",
            size: "30ml",
            price: 1200,
            originalPrice: 1600,
        },
        {
            id: 9,
            img: NewProd9,
            category: "Men",
            subCategory: "Accessories",
            name: "Leather Belt",
            desc: "Classic Tan Leather Belt",
            color: "brown",
            size: "32",
            price: 899,
            originalPrice: 1299,
        },
        {
            id: 10,
            img: NewProd10,
            category: "Home",
            subCategory: "Furniture",
            name: "Velvet Sofa",
            desc: "3-Seater Luxury Living Room Sofa",
            color: "emerald green",
            size: "Large",
            price: 25000,
            originalPrice: 35000,
        },
        {
            id: 11,
            img: NewProd11,
            category: "Women",
            subCategory: "Heels",
            name: "Stiletto Pumps",
            desc: "Elegant Party Wear Heels",
            color: "gold",
            size: "UK 6",
            price: 3200,
            originalPrice: 4500,
        },
        {
            id: 12,
            img: NewProd12,
            category: "Unisex",
            subCategory: "Watches",
            name: "Automatic Silver Watch",
            desc: "Luxury Stainless Steel Watch",
            color: "silver",
            size: "Adjustable",
            price: 8500,
            originalPrice: 12000,
        },
        {
            id: 13,
            img: NewProd13,
            category: "Unisex",
            subCategory: "Sunglasses",
            name: "Polarized Aviators",
            desc: "Classic UV Protection Sunglasses",
            color: "black",
            size: "Medium",
            price: 1500,
            originalPrice: 2200,
        },
        {
            id: 14,
            img: NewProd14,
            category: "Kitchen",
            subCategory: "Kitchen Appliances",
            name: "Digital Air Fryer",
            desc: "Oil-free Healthy Cooking Appliance",
            color: "matte black",
            size: "4.5L",
            price: 4800,
            originalPrice: 6500,
        },
        {
        id: 15,
        img: WomenImg1, // Home page wala image use kar sakte hain
        category: "Women",
        subCategory: "Ethnic Wear", // Exact match with Home Page
        name: "Embroidered Kurta Set",
        desc: "Beautiful silk kurta with dupatta",
        color: "maroon",
        size: "L",
        price: 2500,
        originalPrice: 4500,
    },
    {
        id: 16,
        img: WomenImg3,
        category: "Women",
        subCategory: "Party Wear", // Exact match with Home Page
        name: "Evening Sequin Gown",
        desc: "Perfect for wedding parties",
        color: "black",
        size: "M",
        price: 4200,
        originalPrice: 6000,
    },
    {
        id: 17,
        img: MenImg1,
        category: "Men",
        subCategory: "Formal Suits", // Exact match with Home Page
        name: "Classic Slim Fit Suit",
        desc: "Premium wool blend formal suit",
        color: "navy blue",
        size: "40",
        price: 8900,
        originalPrice: 12000,
    }
    ];

    // Product Detail Page ke andar
    const breadcrumbItems = [
        {
            label: "Home",
            path: "/"
        },
        {
            label: catName,
            path: `/all_products/${catId}/${catName}`
        },
    ];
    
    // add to cart
    const handleAddToCart = (e, product) => {
        e.stopPropagation();
        addToCart(product);
    };
    
    // wishlist
    const handleWishList = (e, product) => {
        e.stopPropagation();
        addToWishList(product);
    };

    return (
        <section className="w-full py-10">
            <div className="max-w-6xl mx-auto flex flex-wrap md:flex-nowrap gap-6">

                {/* filters part */}
                <div className='w-[30%] bg-gray-50 rounded-lg'>
                    <ProductsFilterPart activeCatId={catId} catName={catName} />
                </div>

                {/* products part */}
                <div className='w-[70%]'>

                    {/* breadcrumps */}
                    <Breadcrumbs items={breadcrumbItems} />

                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

                        {allProducts
                            .filter((item) => {
                                if (!catId || catId === "undefined") return true; // Agar URL mein koi ID nahi hai, toh sab dikhao
                                // Product ke andar ek categoryId honi chahiye jo URL wali catId se match kare
                                return String(item.id) === String(catId);
                            })
                            .map((item, index) => {

                                const isFavorite = wishListItems.some((wishItems) => wishItems.id === item.id);

                                return (
                                    <div
                                        key={index}
                                        onClick={() => navigate(`/product_detail/${item.id || index}/${catName}/${item.name}`)}
                                        className="cursor-pointer bg-white rounded-lg shrink-0 shadow-md">

                                        <div className="relative w-full aspect-square">
                                            <img
                                                src={item.img}
                                                alt="ProductsImage"
                                                className="h-full w-full rounded-t-lg object-cover transition-transform duration-700 hover:scale-102"
                                            />

                                            <div
                                                onClick={(e) =>handleWishList(e, item)}
                                                className={`absolute right-3 top-3 p-2 rounded-full shadow-md cursor-pointer transition-all duration-300 z-10 
                                                            ${isFavorite ? 'bg-pink-500 text-white' : 'bg-white/90 text-gray-600'}`}
                                            >
                                                {isFavorite ? <GoHeartFill className='text-xl' /> : <GoHeart className='text-xl' />}
                                            </div>
                                        </div>

                                        {/* Content Section */}
                                        <div
                                            className='flex flex-col items-center justify-center  text-center flex-1 p-4 bg-white'>

                                            <p className='text-gray-900 font-bold text-sm uppercase tracking-widest mb-1'>
                                                {item.name}
                                            </p>

                                            <h3 className='text-gray-800 text-[15px] hover:text-pink-500 cursor-pointer transition-colors'>
                                                {item.desc}
                                            </h3>

                                            {/* Price Tag */}
                                            <div className="flex items-center gap-2 mt-2">
                                                <span
                                                    className="text-pink-500 text-lg font-bold">
                                                    ₹{item.price}
                                                </span>

                                                <span
                                                    className="text-gray-400 line-through text-xs">
                                                    ₹{item.originalPrice}
                                                </span>

                                            </div>

                                            {/* Rating Stars */}
                                            <div className='flex gap-0.5 mt-2 text-lg text-yellow-400'>
                                                <IoMdStar />
                                                <IoMdStar />
                                                <IoMdStar />
                                                <IoMdStar />
                                                <IoMdStarOutline />
                                            </div>
                                        </div>

                                        {/* Add to Cart Button */}
                                        <div className="text-center w-full mb-2">
                                            <button
                                                onClick={(e) => handleAddToCart(e, item)}
                                                className="w-[80%] py-2 bg-pink-500 text-white text-[16px] rounded-lg mt-2 cursor-pointer">
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                )
                            })}
                    </div>


                </div>

            </div>
        </section>
    )
}

export default Products;