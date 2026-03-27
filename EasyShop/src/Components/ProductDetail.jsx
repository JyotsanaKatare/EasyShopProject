
//updated
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
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

import { IoMdStar } from "react-icons/io";
import { IoBagHandleOutline } from "react-icons/io5";
import { BiPurchaseTagAlt } from "react-icons/bi";
import { CiDeliveryTruck } from "react-icons/ci";
import { PiMoneyWavyLight } from "react-icons/pi";
import { TbRefresh } from "react-icons/tb";
import { IoIosArrowForward } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import { IoChatbubblesOutline } from "react-icons/io5";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import Breadcrumbs from './Breadcrumbs';
import { useCart } from './CartContext';
import ProductDetailSimilarProd from './ProductDetailSimilarProd';
import ProductDetailReview from './ProductDetailReview';
import { useWishList } from './WishListContext';
import EasyShopLoader from './EasyShopLoader';

function ProductDetail() {

    const newProducts = [
        {
            id: 1,
            category: "Men",
            subCategory: "Shoes",
            name: "Red Sneakers",
            desc: "Comfortable Shoes",
            price: 1800,
            originalPrice: 2400,
            img: NewProd1,
            images: [NewProd1, NewProd1, NewProd1, NewProd1],
            size: "8",
            sizes: ["6", "7", "8", "9", "10"],
            color: "gray",
            colors: ["#FFB2B2", "#C7EABB", "#6B7280"],
            details: "A pair of round toe red sneakers, has regular styling, Lace-ups detail Synthetic upper Cushioned footbed.",
            material: ["Synthetic", "Wipe With Clean And Dry Cloth"],
            specifications: [
                { label: "Type", value: "Sneakers" },
                { label: "Toe Shape", value: "Round Toe" },
                { label: "Sole Material", value: "Rubber" },
                { label: "Fastening", value: "Lace-Ups" }
            ],
            rating: 4.2,
            reviews: 150
        },
        {
            id: 2,
            category: "Women",
            subCategory: "Top",
            name: "Women's Unique Top",
            desc: "Elegant Summer Wear",
            price: 850,
            originalPrice: 1200,
            img: NewProd2,
            images: [NewProd2, NewProd2, NewProd2, NewProd2],
            size: "M",
            sizes: ["S", "M", "L", "XL"],
            color: "pink",
            colors: ["#EF7722", "#9CA3AF", "#4B5563"],
            details: "Stylish cotton top with ruffled sleeves and a comfortable fit for casual outings.",
            material: ["100% Cotton", "Machine Wash"],
            specifications: [
                { label: "Sleeve Length", value: "Short Sleeves" },
                { label: "Neck", value: "Round Neck" },
                { label: "Pattern", value: "Solid" },
                { label: "Length", value: "Regular" }
            ],
            rating: 4.5,
            reviews: 80
        },
        {
            id: 3,
            category: "Women",
            subCategory: "Purse",
            name: "Designer Purse",
            desc: "Leather Handbag",
            price: 2200,
            originalPrice: 3500,
            img: NewProd3,
            images: [NewProd3, NewProd3, NewProd3],
            size: "Free Size",
            sizes: ["Free Size"],
            color: "violet",
            colors: ["#000000", "#A52A2A"],
            details: "Premium faux leather purse with metallic chain link and multiple compartments.",
            material: ["Faux Leather", "Wipe with a damp cloth"],
            specifications: [
                { label: "Compartments", value: "3 Main" },
                { label: "Occasion", value: "Party/Casual" },
                { label: "Closure", value: "Zip" },
                { label: "Strap", value: "Detachable" }
            ],
            rating: 4.0,
            reviews: 45
        },
        {
            id: 4,
            category: "Men",
            subCategory: "Jeans",
            name: "Stretchy Blends",
            desc: "Distinct back pocket stitching",
            price: 1400,
            originalPrice: 1900,
            img: NewProd4,
            images: [NewProd4, NewProd4, NewProd4],
            size: "28",
            sizes: ["28", "30", "32", "34"],
            color: "navy blue",
            colors: ["#3B82F6", "#1D4ED8"],
            details: "High-waist distressed denim jeans with a slight stretch for all-day comfort.",
            material: ["98% Denim, 2% Elastane", "Wash inside out"],
            specifications: [
                { label: "Fit", value: "Slim Fit" },
                { label: "Waist Rise", value: "High-Rise" },
                { label: "Fade", value: "Heavy Fade" },
                { label: "Distress", value: "Mildly Distressed" }
            ],
            rating: 3.8,
            reviews: 200
        },
        {
            id: 5,
            category: "Women",
            subCategory: "Necklace",
            name: "Platinum Necklace",
            desc: "Luxury Jewelry Item",
            price: 5500,
            originalPrice: 7000,
            img: NewProd5,
            images: [NewProd5, NewProd5, NewProd5],
            size: "Adjustable",
            sizes: ["Adjustable"],
            color: "silver",
            colors: ["#E5E7EB"],
            details: "Exquisite platinum-plated necklace featuring a minimal teardrop pendant.",
            material: ["Platinum Plated Brass", "Store in a separate pouch"],
            specifications: [
                { label: "Gemstone", value: "Cubic Zirconia" },
                { label: "Chain Type", value: "Cable" },
                { label: "Adjustable", value: "Yes" },
                { label: "Weight", value: "15g" }
            ],
            rating: 4.9,
            reviews: 12
        },
        {
            id: 6,
            category: "Beauty",
            subCategory: "Makeup Brush",
            name: "Makeup Brush Set",
            desc: "Professional Brush Kit",
            price: 650,
            originalPrice: 999,
            img: NewProd6,
            images: [NewProd6, NewProd6, NewProd6],
            size: "Set of 12",
            sizes: ["Set of 12"],
            color: "pink",
            colors: ["#000000", "#FFC0CB"],
            details: "Soft synthetic bristles for flawless makeup application. Suitable for beginners and pros.",
            material: ["Synthetic Bristles, Wooden Handle"],
            specifications: [
                { label: "Number of Brushes", value: "12" },
                { label: "Suitability", value: "All skin types" },
                { label: "Brush Type", value: "Face & Eye" }
            ],
            rating: 4.3,
            reviews: 95
        },
        {
            id: 7,
            category: "Beauty",
            subCategory: "Lipstick",
            name: "Matte Lipstick",
            desc: "Long-lasting Lip Color",
            price: 450,
            originalPrice: 600,
            img: NewProd7,
            images: [NewProd7, NewProd7, NewProd7],
            size: "3.5g",
            sizes: ["3.5g"],
            color: "red",
            colors: ["#B91C1C", "#991B1B", "#DC2626"],
            details: "Intense matte finish lipstick that stays for up to 12 hours without drying.",
            material: ["Vegan, Paraben-Free"],
            specifications: [
                { label: "Finish", value: "Matte" },
                { label: "Duration", value: "12 Hours" },
                { label: "Form", value: "Stick" }
            ],
            rating: 4.6,
            reviews: 310
        },
        {
            id: 8,
            category: "Beauty",
            subCategory: "Beauty Product",
            name: "Hydrating Serum",
            desc: "Pure Beauty Product",
            price: 1200,
            originalPrice: 1600,
            img: NewProd8,
            images: [NewProd8, NewProd8, NewProd8],
            size: "30ml",
            sizes: ["30ml"],
            color: "skinny",
            colors: ["#FFFFFF"],
            details: "Glow-enhancing facial serum enriched with Hyaluronic Acid and Vitamin C.",
            material: ["Natural extracts, Fragrance-free"],
            specifications: [
                { label: "Skin Type", value: "All Types" },
                { label: "Concern", value: "Dullness/Hydration" },
                { label: "Usage", value: "Day/Night" }
            ],
            rating: 4.1,
            reviews: 55
        },
        {
            id: 9,
            category: "Men",
            subCategory: "Accessories",
            name: "Classic Leather Belt",
            desc: "Essential Accessories",
            price: 899,
            originalPrice: 1299,
            img: NewProd9,
            images: [NewProd9, NewProd9, NewProd9],
            size: "32",
            sizes: ["30", "32", "34", "36"],
            color: "brown",
            colors: ["#5D4037", "#000000"],
            details: "Genuine handcrafted leather belt with a premium metallic buckle finish.",
            material: ["100% Genuine Leather", "Wipe with a dry cloth"],
            specifications: [
                { label: "Material", value: "Leather" },
                { label: "Reversible", value: "No" },
                { label: "Buckle Type", value: "Pin Buckle" },
                { label: "Width", value: "35 mm" }
            ],
            rating: 4.4,
            reviews: 120
        },
        {
            id: 10,
            category: "Home",
            subCategory: "Furniture",
            name: "Modern Velvet Sofa",
            desc: "Modern Furniture",
            price: 25000,
            originalPrice: 35000,
            img: NewProd10,
            images: [NewProd10, NewProd10, NewProd10],
            size: "3 Seater",
            sizes: ["1 Seater", "2 Seater", "3 Seater"],
            color: "emerald green",
            colors: ["#004D40", "#1A237E"],
            details: "Luxurious velvet upholstered sofa with high-density foam for maximum comfort.",
            material: ["Velvet Fabric, Solid Wood Frame", "Professional cleaning recommended"],
            specifications: [
                { label: "Upholstery", value: "Velvet" },
                { label: "Seating Capacity", value: "3 Persons" },
                { label: "Style", value: "Contemporary" },
                { label: "Assembly", value: "Self Assembly" }
            ],
            rating: 4.8,
            reviews: 35
        },
        {
            id: 11,
            category: "Women",
            subCategory: "Heels",
            name: "Glitter Stiletto Pumps",
            desc: "Elegant Heels",
            price: 3200,
            originalPrice: 4500,
            img: NewProd11,
            images: [NewProd11, NewProd11, NewProd11],
            size: "UK 6",
            sizes: ["UK 4", "UK 5", "UK 6", "UK 7"],
            color: "gold",
            colors: ["#D4AF37", "#C0C0C0", "#000000"],
            details: "Sparkling stiletto heels with a cushioned insole, perfect for parties and weddings.",
            material: ["Synthetic Glitter Upper", "Avoid contact with water"],
            specifications: [
                { label: "Heel Type", value: "Stiletto" },
                { label: "Heel Height", value: "4 inches" },
                { label: "Toe Type", value: "Pointed Toe" },
                { label: "Pattern", value: "Shimmer" }
            ],
            rating: 4.7,
            reviews: 88
        },
        {
            id: 12,
            category: "Unisex",
            subCategory: "Watch",
            name: "Minimalist Silver Watch",
            desc: "Premium Timepiece",
            price: 8500,
            originalPrice: 12000,
            img: NewProd12,
            images: [NewProd12, NewProd12, NewProd12],
            size: "Adjustable",
            sizes: ["One Size"],
            color: "silver",
            colors: ["#E5E7EB", "#111827"],
            details: "Sleek stainless steel analog watch with scratch-resistant sapphire glass.",
            material: ["Stainless Steel", "3 ATM Water Resistant"],
            specifications: [
                { label: "Movement", value: "Quartz" },
                { label: "Dial Shape", value: "Round" },
                { label: "Display", value: "Analog" },
                { label: "Glass Material", value: "Sapphire" }
            ],
            rating: 4.9,
            reviews: 210
        },
        {
            id: 13,
            category: "Unisex",
            subCategory: "Sunglass",
            name: "Classic Aviators",
            desc: "Polarized Sunglasses",
            price: 1500,
            originalPrice: 2200,
            img: NewProd13,
            images: [NewProd13, NewProd13],
            size: "Medium",
            sizes: ["Small", "Medium", "Large"],
            color: "black",
            colors: ["#000000", "#4B5563"],
            details: "UV400 protected polarized lenses with a lightweight metal frame.",
            material: ["Metal Alloy, Polycarbonate Lens"],
            specifications: [
                { label: "Lens Type", value: "Polarized" },
                { label: "Frame Style", value: "Aviator" },
                { label: "UV Protection", value: "Yes" },
                { label: "Case Included", value: "Hard Case" }
            ],
            rating: 4.5,
            reviews: 320
        },
        {
            id: 14,
            category: "Kitchen",
            subCategory: "Kitchen Appliance",
            name: "Digital Air Fryer",
            desc: "Smart Kitchen Appliance",
            price: 4800,
            originalPrice: 6500,
            img: NewProd14,
            images: [NewProd14, NewProd14],
            size: "4.5L",
            sizes: ["4.5L", "6L"],
            color: "matte black",
            colors: ["#121212"],
            details: "Rapid air technology for healthy oil-free cooking with touch control panel.",
            material: ["BPA-Free Plastic, Non-stick Coating"],
            specifications: [
                { label: "Capacity", value: "4.5 Liters" },
                { label: "Power", value: "1500 Watts" },
                { label: "Preset Menus", value: "8 Modes" },
                { label: "Timer", value: "Up to 60 mins" }
            ],
            rating: 4.6,
            reviews: 540
        }
    ];

    const { prodId, catName, prodName } = useParams();
    const { addToCart } = useCart();
    const { wishListItems, addToWishList } = useWishList();
    const navigate = useNavigate();

    const [mainImage, setMainImage] = useState(null);  // main image badalne ke liye (Thumbnail click par)
    const [selectedSize, setSelectedSize] = useState(0);
    const [selectedColor, setSelectedColor] = useState(0);
    const [isSellerInfoOpen, setIsSellerInfoOpen] = useState(false);
    const [isSpecificationOpen, setIsSpecificationOpen] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [pincode, setPincode] = useState("");
    const [estimatedDate, setEstimatedDate] = useState("");
    const [qty, setQty] = useState(1);
    const [loading, setLoading] = useState(true);

    const product = newProducts.find((p) => String(p.id) === String(prodId) || p.name === prodName);

    // Jab bhi product badle (ID change ho), mainImage ko update karein
    useEffect(() => {
        if (product) {
            setMainImage(product.img);
        }
    }, [prodId]);

    const breadcrumbItems = [
        { label: "Home", path: "/" },
        {
            // Agar product mil gaya toh uski category dikhao, warna "Shop"
            label: product?.subCategory || "Shop",
            path: `/all_products/${product?.id}/${product?.name}`
        },
        { label: product?.name || "Loading..." }
    ];

    // check pin code function
    const handleCheck = () => {
        const pinRegex = /^[1-9][0-9]{5}$/;

        if (!pinRegex.test(pincode)) {
            alert("Please enter a valid 6-digit pincode");
            setShowDetails(false);
            return;
        }

        if (pincode.length === 6) {
            let days = 5;
            if (pincode.startsWith('11')) days = 2;
            if (pincode.startsWith('40') || pincode.startsWith('45')) days = 3;

            const deliveryDateObj = new Date();
            deliveryDateObj.setDate(deliveryDateObj.getDate() + days);

            const formattedDate = deliveryDateObj.toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short'
            });

            setEstimatedDate(formattedDate); // State mein save karein
            setShowDetails(true);
        }
    };

    //handle qty
    const handleInc = () => {
        if (qty >= 1) {
            setQty(qty + 1);
        }
    };

    const handleDec = () => {
        if (qty > 1) {
            setQty(qty - 1);
        }
    };

    const isFavorite = wishListItems.some((wishItems) => wishItems.id === product.id);

    // Apne current product ko chhod kar baki 4 products nikal lo
    const similarProducts = newProducts.filter(p => String(p.id) !== String(prodId)).slice(0, 5);

    // handle buy now (transfer data to checkout)
    const handleBuyNow = () => {
        const checkOutData = {
            items: [{
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: qty,
                img: product.img
            }],
            total: product.price * qty, // Yeh sirf subtotal hai
            isDirectBuy: true
        };
        navigate('/place_order', { state: checkOutData });
    }
    
    // loader
    useEffect(() => {
        // Fake timer or real API call
        setTimeout(() => setLoading(false), 2000);
    }, []);

    if (loading) return <EasyShopLoader />; 

    // Safety Check
    if (!product) return <div className="p-20 text-center">Product Not Found!</div>;

    return (
        <section className="w-full pb-5 pt-2 px-4 lg:px-6">

            {/* home cat name and product name */}
            <Breadcrumbs items={breadcrumbItems} />

            {/* main section */}
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-10 ">

                {/* left side - image section*/}
                <div className='w-full md:w-[60%] flex flex-col-reverse lg:flex-row gap-4 h-fit md:sticky md:top-24'>

                    {/* Thumbnails List: Mobile/Tablet par Horizontal, Desktop (lg) par Vertical */}
                    <div className='flex flex-row lg:flex-col gap-3 w-full lg:w-20 overflow-x-auto lg:overflow-y-auto no-scrollbar py-2 lg:py-0'>
                        {product?.images?.map((img, index) => (
                            <div
                                key={index}
                                onMouseEnter={() => setMainImage(img)}
                                onClick={() => setMainImage(img)}
                                className={`w-20 h-20 lg:w-full lg:h-24 border-2 cursor-pointer rounded-sm lg:rounded-md overflow-hidden transition-all shrink-0
                                        ${mainImage === img ? 'border-pink-500' : 'border-transparent'} `}
                            >
                                <img
                                    src={img}
                                    alt="thumb"
                                    className='w-full h-full object-cover' />
                            </div>
                        ))}
                    </div>

                    {/* Main Big Image */}
                    <div className='flex-1 bg-gray-50 rounded-xl lg:rounded-2xl border border-gray-100 overflow-hidden relative group cursor-zoom-in'>

                        <div className='w-full h-full aspect-square lg:aspect-4/3 '>
                            <img
                                key={mainImage}
                                src={mainImage}
                                alt={product?.name}
                                className='w-full h-full  object-cover transition-transform duration-700 lg:group-hover:scale-110'
                            />
                        </div>

                        {/* Wishlist Button */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation(); // Image click event ko rokne ke liye
                                addToWishList({ ...product, id: product._id || product.id });
                            }}
                            className={`absolute top-3 right-3 md:top-5 md:right-5 z-20 w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full shadow-lg transition-all duration-300 active:scale-90 border cursor-pointer
                                    ${isFavorite
                                    ? 'bg-pink-500 text-white border-pink-500'
                                    : 'bg-white/70 backdrop-blur-md text-gray-600 border-white hover:bg-white hover:text-pink-500'}`}
                        >
                            <div className="transition-transform duration-300 ">
                                {isFavorite ? <GoHeartFill className='text-xl ' /> : <GoHeart className='text-xl ' />}
                            </div>
                        </button>

                        {/* Mobile Badge: Sirf desktop se niche dikhega */}
                        <div className="lg:hidden absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-xs">
                            {product?.images?.indexOf(mainImage) + 1} / {product?.images?.length}
                        </div>
                    </div>
                </div>

                {/* right side - detail section*/}
                <div className='w-full md:w-[40%] flex flex-col gap-2 md:gap-4'>

                    {/* heading and desc */}
                    <div className='flex flex-col gap-1'>
                        <h1 className='text-[20px] md:text-3xl text-gray-800 font-semibold leading-tight'>
                            {product?.name}
                        </h1>
                        <p className='text-sm md:text-[18px] text-gray-500 font-normal leading-relaxed'>
                            {product?.desc}
                        </p>
                    </div>

                    {/* Rating Badge */}
                    <div className='flex items-center gap-2 w-fit px-2 py-1 mt-2 cursor-pointer transition-all duration-300'>
                        <div className='flex items-center font-bold bg-pink-100 text-pink-500 rounded-full px-2'>

                            <span className='text-xs md:text-[16px]'>{product?.rating}</span>
                            <IoMdStar className='text-pink-500 text-[18px]' />

                        </div>
                        <p className='text-xs md:text-[14px] text-gray-500 font-medium'>22 Ratings</p>
                    </div>

                    <hr className='my-1 md:my-2 border-gray-300' />

                    {/* Price Tag */}
                    <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-black text-[20px] md:text-2xl font-semibold">
                            ₹{product?.price}
                        </span>

                        <div className='flex items-center gap-1 text-gray-500'>
                            <span className='text-sm md:text-lg font-normal'>MRP</span>
                            <span className="text-sm md:text-lg line-through">₹{product?.originalPrice}</span>
                        </div>

                        <span className="text-green-600 text-lg md:text-xl font-bold">
                            (10% OFF)
                        </span>
                    </div>

                    <p className='text-sm md:text-[15px] text-gray-500'>inclusive of all taxes</p>

                    <hr className='my-1 md:my-2 border-gray-300' />

                    {/* quantity section */}
                    <div className='mt-1 md:mt-0 flex flex-row items-start md:flex-col gap-2 md:gap-0'>
                        <span className="text-[16px] md:text-xl text-black font-semibold">
                            Quantity
                        </span>

                        <div className="flex items-center justify-between w-28 md:w-32 text-gray-700 border-2 border-gray-200 rounded-lg py-1 px-1 md:py-2 md:px-2 md:my-4">

                            <button
                                onClick={handleDec}
                                className="p-1 text-pink-500 font-bold hover:bg-pink-50 rounded-md transition-colors cursor-pointer">
                                <FaMinus className="text-xs md:text-sm" />
                            </button>

                            <span className="px-2 font-bold text-sm md:text-base">
                                {qty}
                            </span>

                            <button
                                onClick={handleInc}
                                className="p-1 text-pink-500 font-bold hover:bg-pink-50 rounded-md transition-colors cursor-pointer">
                                <FaPlus className="text-xs md:text-sm" />
                            </button>
                        </div>
                    </div>

                    {/* size button */}
                    <div className='mt-1 md:mt-0 flex flex-col items-start gap-2'>

                        <span className="text-[16px] md:text-xl text-black font-semibold">
                            Select Size
                        </span>

                        {/* Sizes Container - flex-wrap is important here */}
                        <div className="flex flex-wrap gap-2 md:gap-3 mt-2">
                            {product?.sizes?.map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`w-10 h-10 md:w-auto md:h-auto md:p-2 flex items-center justify-center rounded-full border-2 text-xs md:text-sm font-bold transition-all duration-200 cursor-pointer
                                            ${selectedSize === size
                                            ? 'border-pink-500 text-pink-500 bg-pink-50'
                                            : 'border-gray-200 text-gray-700 hover:border-pink-300'}
                `}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* color button */}
                    <div className='mt-1 md:mt-3 flex flex-col items-start gap-2'>
                        <span className="text-[16px] md:text-xl text-black font-semibold">
                            Select Color
                        </span>

                        <div className="flex flex-wrap gap-2 md:gap-3 mt-2">
                            {product?.colors?.map((color, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedColor(color)}
                                    className={`w-8 h-8 rounded-full border flex items-center justify-center font-bold transition-all duration-200 cursor-pointer
                                        ${selectedColor === color
                                            ? 'border-pink-500'
                                            : 'border-gray-300 hover:border-gray-800'
                                        } `}
                                    style={{ backgroundColor: color }}
                                >
                                </button>
                            ))}
                        </div>
                    </div>

                    <hr className='my-1 md:my-2 border-gray-300' />

                    {/* cart and buy buttons */}
                    <div className='my-3 flex flex-col sm:flex-row items-stretch gap-3 md:gap-4'>

                        <div className="hidden sm:flex flex-1 items-center gap-3">
                            <button
                                onClick={() => addToCart({ ...product, id: product._id || product.id })}
                                className='flex-1 py-3.5 flex items-center justify-center gap-2 bg-pink-500 hover:bg-pink-600 text-white rounded-md active:scale-95 transition-all font-bold uppercase text-sm'
                            >
                                <IoBagHandleOutline className='text-xl' />
                                <span>Add to Bag</span>
                            </button>

                            <button
                                onClick={handleBuyNow}
                                className='flex-1 py-3.5 flex items-center justify-center gap-2 border border-pink-500 text-pink-500 rounded-md hover:bg-pink-50 active:scale-95 transition-all font-bold uppercase text-sm'
                            >
                                <BiPurchaseTagAlt className='text-xl' />
                                <span>Buy Now</span>
                            </button>
                        </div>

                        {/* Mobile View (Stacked for better reach) */}
                        <div className="flex sm:hidden flex-col gap-3">
                            <button
                                onClick={() => addToCart({ ...product, id: product._id || product.id })}
                                className='w-full py-3.5 flex items-center justify-center gap-2 bg-pink-500 text-white rounded-md active:scale-95 transition-all font-bold uppercase text-sm shadow-sm'
                            >
                                <IoBagHandleOutline className='text-lg' />
                                Add to Bag
                            </button>

                            <button
                                onClick={handleBuyNow}
                                className='w-full py-3.5 flex items-center justify-center gap-2 border border-pink-500 text-pink-500 rounded-md active:scale-95 transition-all font-bold uppercase text-sm'
                            >
                                <BiPurchaseTagAlt className='text-lg' />
                                Buy Now
                            </button>
                        </div>
                    </div>

                    {/* chat with seller button */}
                    <button className="w-full mt-4 flex items-center justify-center gap-2 py-3 px-6 border-2 border-pink-500 text-pink-500 font-bold rounded-lg transition-all duration-300 hover:bg-pink-500 hover:text-white hover:shadow-lg hover:shadow-pink-200 active:scale-[0.98] group cursor-pointer">
                        <IoChatbubblesOutline className="text-lg md:text-xl group-hover:scale-110 transition-transform" />
                        <span className="tracking-wide uppercase text-xs md:text-sm">Chat with Seller</span>
                    </button>

                    {/* delivery info */}
                    <div className='my-4 md:my-2'>
                        <span className="text-[16px] md:text-xl text-black font-semibold">
                            Ship To
                        </span>

                        <div className='flex overflow-hidden pt-3 md:pt-4'>
                            <input
                                type="text"
                                placeholder='Enter a pin code'
                                value={pincode}
                                onChange={(e) => setPincode(e.target.value)}
                                className='px-3 py-2.5 md:py-2 border border-gray-400 outline-none w-full text-sm placeholder:text-gray-400 rounded-l-md focus:border-pink-500 transition-colors'
                            />
                            <button
                                onClick={handleCheck}
                                className='bg-pink-500 hover:bg-pink-600 px-5 py-2.5 md:py-2 text-white text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer rounded-r-md shrink-0'>
                                Check
                            </button>
                        </div>
                    </div>

                    {/* support section */}
                    {showDetails && (
                        <div className='my-2 space-y-2 p-3 md:p-0'>

                            <div className='flex items-start md:items-center gap-3'>
                                <CiDeliveryTruck className='text-2xl md:text-3xl text-gray-600 shrink-0' />
                                <h1 className='text-sm md:text-md text-gray-700 leading-tight'>
                                    Delivery by <strong>{estimatedDate}</strong>
                                </h1>
                            </div>

                            <div className='flex items-start md:items-center gap-3'>
                                <PiMoneyWavyLight className='text-2xl md:text-3xl text-gray-600 shrink-0' />
                                <h1 className='text-sm md:text-md text-gray-700 leading-tight'>
                                    Cash on Delivery | <span className='text-green-600 font-semibold'>Available</span>
                                </h1>
                            </div>

                            <div className='flex items-start md:items-center gap-3'>
                                <TbRefresh className='text-2xl md:text-3xl text-gray-600 shrink-0' />
                                <h1 className='text-sm md:text-md text-gray-700 leading-tight'>
                                    7 Days Return and Replacement available
                                </h1>
                            </div>
                        </div>
                    )}

                    <hr className='my-1 md:my-2 border-gray-300' />

                    {/* seller info */}
                    <div className='my-2'>
                        <span className="text-[16px] md:text-xl text-black font-semibold">
                            Sold By
                        </span>

                        <div
                            onClick={() => setIsSellerInfoOpen(!isSellerInfoOpen)}
                            className='w-full flex justify-between items-center border border-gray-400 hover:border-pink-300 px-2 py-3 md:py-2 mt-4 rounded-lg cursor-pointer'>
                            <h1 className='text-[12px] md:text-[14px] font-bold text-pink-500 hover:text-pink-600'>
                                VERO MODA RETAIL PVT LTD
                            </h1>
                            <IoIosArrowForward className='text-lg hover:text-pink-500 transition-transform' />
                        </div>
                    </div>

                    {/* product detail */}
                    <div className='my-3'>
                        <div>
                            <span className="text-[16px] md:text-xl text-black font-semibold">
                                Product Details
                            </span>

                            <p className='text-sm md:text-base text-gray-600 font-normal leading-relaxed'>
                                {product?.details}
                            </p>
                        </div>

                        {/* material */}
                        <div className='my-3'>
                            <span className="text-[16px] md:text-xl text-black font-semibold">
                                Material
                            </span>

                            {product?.material?.map((mat, index) => (
                                <ul
                                    key={index}
                                    className='list-disc list-inside text-sm md:text-base text-gray-600 space-y-1'>
                                    <li className='font-normal'>{mat}</li>
                                </ul>
                            ))}

                        </div>

                        {/* Specification drop-down */}
                        <div className='cursor-pointer pt-2'>

                            <div
                                onClick={() => setIsSpecificationOpen(!isSpecificationOpen)}
                                className='flex justify-between items-center cursor-pointer group'
                            >
                                <span className="text-[16px] md:text-xl text-black font-semibold">
                                    Specification
                                </span>

                                {isSpecificationOpen ?
                                    <IoIosArrowDown className='text-gray-500 group-hover:text-black' /> :
                                    <IoIosArrowUp className='text-gray-500 group-hover:text-black' />}
                            </div>

                            {isSpecificationOpen && (
                                <>
                                    <div
                                        className="fixed inset-0 z-10"
                                        onClick={() => setIsSpecificationOpen(false)}>
                                    </div>

                                    <div className='mt-4 divide-y divide-gray-100 animate-in fade-in slide-in-from-top-2 duration-300'>
                                        {product?.specifications?.map((spec, index) => (
                                            <div
                                                key={index}
                                                className='flex py-2 md:py-3 gap-4'>
                                                <div className='w-[50%]'>
                                                    <h1 className='text-xs md:text-sm w-full bg-pink-100/60 text-pink-500 font-semibold px-2 py-1'>
                                                        {spec.label}
                                                    </h1>
                                                </div>

                                                <div className='w-[50%] space-y-4'>
                                                    <h1 className='text-xs md:text-sm text-gray-800 font-medium px-2 py-1'>
                                                        {spec.value}
                                                    </h1>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}


                        </div>

                    </div>

                    <hr className='my-1 md:my-2 border-gray-300' />

                    {/* visit shop */}
                    <div className='my-4 flex flex-col w-full space-y-3 border-2 border-pink-100 bg-pink-50/30 p-5 rounded-2xl'>
                        {/* Brand Name */}
                        <h1 className='text-md md:text-lg font-bold text-gray-800 uppercase tracking-tight'>
                            VERO MODA RETAIL PVT LTD
                        </h1>

                        {/* Description */}
                        <p className='text-xs md:text-sm text-gray-600 leading-relaxed'>
                            A renowned global clothing brand, Vero Moda is a name which most women swear by.
                            Check out its wide assortment available on Easy Shop.
                        </p>

                        {/* Visit Shop Button */}
                        <button
                            onClick={() => navigate(`/all_products`)}
                            className='mt-2 py-2.5 text-sm md:text-md border-2 border-pink-500 rounded-xl text-pink-500 font-bold hover:bg-pink-500 hover:text-white transition-all duration-300 cursor-pointer uppercase'>
                            Visit Shop
                        </button>
                    </div>

                </div>
            </div>

            {/* review products */}
            <ProductDetailReview />

            {/* similar products */}
            <ProductDetailSimilarProd similarProducts={similarProducts} catName={catName} />

            {/* popup section */}
            <div
                className={`fixed inset-0 flex justify-center items-center bg-[#00000080] backdrop-blur-sm z-50 px-4 transition-all duration-500 
                ${isSellerInfoOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>

                <div
                    className={`bg-white p-6 rounded-xl shadow-2xl h-auto w-[60%] 
                    transition-all duration-500 transform 
                    ${isSellerInfoOpen ? "translate-y-0 scale-100" : "-translate-y-100 scale-90"}`}>

                    <div className="w-full">

                        {/* icon and heading */}
                        <div className='flex justify-between'>
                            <h1 className='text-[23px] font-semibold'>Seller Information</h1>
                            <IoCloseSharp
                                onClick={() => setIsSellerInfoOpen(false)}
                                className="text-[20px] text-gray-600 cursor-pointer" />
                        </div>

                        <hr className='my-2 border-gray-300' />

                        {/* about seller */}
                        <div className='pt-4'>
                            <h1 className='text-md font-semibold py-2'>VERO MODA RETAIL PVT LTD</h1>
                            <p className='text-gray-500'>
                                A renowned global clothing brand, Vero Moda is a name which most women swear by. Check out its wide assortment available on Easy Shop and sync yourself to the latest trends in fashion.
                            </p>
                        </div>

                        <div className='pt-6'>
                            <p className='text-md font-semibold'>Seller Code : </p>
                            <p className='text-gray-500'>0123456</p>
                        </div>

                        <div className='pt-6'>
                            <p className='text-md font-semibold'>To contact seller please write to:</p>
                            <p className='text-gray-500'>
                                Empire Plaza IT Park, B Wing, 4th Floor, North Side, CTS No. 9, Village Hariyali, LBS Marg, Vikhroli (W), Mumbai - 400 083
                            </p>
                        </div>

                        <div className='pt-6 text-[18px]'>
                            <p className='text-pink-600 font-semibold'>support@easyshop.com</p>
                            <p className='text-pink-600 font-semibold'>0123456789</p>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    )
}

export default ProductDetail;