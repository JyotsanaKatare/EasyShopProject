
import React, { useEffect, useState } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { useNavigate, useParams } from 'react-router-dom';

const dynamicFilters = {

    //shoes
    "1": {
        subCategories: [{ id: 101, name: "Sneakers" }, { id: 102, name: "Formal Shoes" }, { id: 103, name: "Running Shoes" }, { id: 104, name: "Loafers" }],
        brands: [{ id: 401, name: "Nike" }, { id: 402, name: "Adidas" }, { id: 403, name: "Puma" }],
        colors: [{ id: 501, name: "Black" }, { id: 502, name: "White" }],
        sizes: [{ id: 601, name: "UK 7" }, { id: 602, name: "UK 8" }, { id: 603, name: "UK 9" }],
        types: [{ id: 3001, name: "Running" }, { id: 3002, name: "Sneakers" }, { id: 3003, name: "Formal" }, { id: 3004, name: "Loafers" }],
        material: [{ id: 3101, name: "Leather" }, { id: 3102, name: "Mesh" }, { id: 3103, name: "Canvas" }],
        closure: [{ id: 3201, name: "Lace-Up" }, { id: 3202, name: "Slip-On" }]
    },

    //Tops
    "2": {
        subCategories: [{ id: 201, name: "Crop Tops" }, { id: 202, name: "Tank Tops" }, { id: 203, name: "Formal Shirts" }, { id: 204, name: "T-Shirts" }], brands: [{ id: 701, name: "Zara" }, { id: 702, name: "H&M" }, { id: 703, name: "Levi's" }],
        colors: [{ id: 801, name: "Blue" }, { id: 802, name: "White" }, { id: 803, name: "Yellow" }],
        sizes: [{ id: 901, name: "S" }, { id: 902, name: "M" }, { id: 903, name: "L" }, { id: 904, name: "XL" }],
        neckline: [{ id: 4001, name: "V-Neck" }, { id: 4002, name: "Round Neck" }, { id: 4003, name: "Off-Shoulder" }, { id: 4004, name: "Collar" }],
        sleeves: [{ id: 4101, name: "Full Sleeves" }, { id: 4102, name: "Half Sleeves" }, { id: 4103, name: "Sleeveless" }],
        patterns: [{ id: 4201, name: "Solid" }, { id: 4202, name: "Floral" }, { id: 4203, name: "Striped" }, { id: 4204, name: "Printed" }],
        fabric: [{ id: 4301, name: "Cotton" }, { id: 4302, name: "Polyester" }, { id: 4303, name: "Silk" }, { id: 4304, name: "Linen" }],
        occasion: [{ id: 4401, name: "Casual" }, { id: 4402, name: "Party" }, { id: 4403, name: "Formal" }]
    },

    //Bags
    "3": {
        subCategories: [{ id: 301, name: "Handbags" }, { id: 302, name: "Sling Bags" }, { id: 303, name: "Tote Bags" }, { id: 304, name: "Clutches" }],
        brands: [{ id: 1001, name: "Lavie" }, { id: 1002, name: "Baggit" }, { id: 1003, name: "Caprese" }, { id: 1004, name: "Lino Perros" }],
        colors: [{ id: 1101, name: "Brown" }, { id: 1102, name: "Black" }, { id: 1103, name: "Beige" }, { id: 1104, name: "Tan" }],
        types: [{ id: 1201, name: "Handbag" }, { id: 1202, name: "Backpack" }, { id: 1203, name: "Sling Bag" }, { id: 1204, name: "Tote Bag" }],
        material: [{ id: 6101, name: "Leather" }, { id: 6102, name: "Canvas" }, { id: 6103, name: "Synthetic" }, { id: 6104, name: "Vegan Leather" }],
        occasion: [{ id: 6201, name: "Casual" }, { id: 6202, name: "Work" }, { id: 6203, name: "Party" }, { id: 6204, name: "Travel" }],
        closure: [{ id: 6301, name: "Zipper" }, { id: 6302, name: "Magnetic Snap" }, { id: 6303, name: "Drawstring" }]
    },

    //Jeans
    "4": {
        subCategories: [{ id: 401, name: "Skinny Fit" }, { id: 402, name: "Slim Fit" }, { id: 403, name: "Straight Fit" }, { id: 404, name: "Boyfriend Jeans" }],
        brands: [{ id: 1301, name: "Spykar" }, { id: 1302, name: "Wrangler" }, { id: 1303, name: "Flying Machine" }, { id: 1304, name: "Levi's" }],
        colors: [{ id: 1401, name: "Dark Blue" }, { id: 1402, name: "Light Blue" }, { id: 1403, name: "Black" }, { id: 1404, name: "Grey" }],
        sizes: [{ id: 1501, name: "28" }, { id: 1502, name: "30" }, { id: 1503, name: "32" }, { id: 1504, name: "34" }, { id: 1505, name: "36" }],
        fits: [{ id: 5001, name: "Slim" }, { id: 5002, name: "Straight" }, { id: 5003, name: "Skinny" }, { id: 5004, name: "Relaxed" }],
        waistRise: [{ id: 5101, name: "High Rise" }, { id: 5102, name: "Mid Rise" }, { id: 5103, name: "Low Rise" }],
        distress: [{ id: 5201, name: "Clean" }, { id: 5202, name: "Light Fade" }, { id: 5203, name: "Heavy Distress" }],
        fabric: [{ id: 5301, name: "Stretchable" }, { id: 5302, name: "Non-Stretch" }]
    },

    //Necklace (Jewelry)
    "5": {
        subCategories: [{ id: 501, name: "Chokers" }, { id: 502, name: "Pendants" }, { id: 503, name: "Long Necklaces" }],
        brands: [{ id: 2501, name: "Tanishq" }, { id: 2502, name: "Giva" }, { id: 2503, name: "Zaveri Pearls" }, { id: 2504, name: "Swarovski" }],
        colors: [{ id: 2601, name: "Gold" }, { id: 2602, name: "Silver" }, { id: 2603, name: "Rose Gold" }, { id: 2604, name: "Antique" }],
        types: [{ id: 2701, name: "Choker" }, { id: 2702, name: "Long Necklace" }, { id: 2703, name: "Pendant" }, { id: 2704, name: "Layered" }],
        material: [{ id: 2801, name: "Diamond" }, { id: 2802, name: "Pearl" }, { id: 2803, name: "Kundan" }, { id: 2804, name: "Sterling Silver" }],
        occasion: [{ id: 7001, name: "Bridal" }, { id: 7002, name: "Party Wear" }, { id: 7003, name: "Daily Wear" }, { id: 7004, name: "Office" }],
        plating: [{ id: 7101, name: "18K Gold" }, { id: 7102, name: "Rhodium" }, { id: 7103, name: "Silver Plated" }]
    },

    //Makeup Brushes
    "6": {
        subCategories: [{ id: 601, name: "Face Brushes" }, { id: 602, name: "Eye Brushes" }, { id: 603, name: "Lip Brushes" }],
        brands: [{ id: 2201, name: "Real Techniques" }, { id: 2202, name: "PAC" }, { id: 2203, name: "Swiss Beauty" }],
        brushType: [{ id: 2401, name: "Foundation" }, { id: 2402, name: "Eye Shadow" }, { id: 2403, name: "Blush" }, { id: 2404, name: "Powder" }],
        bristleType: [{ id: 2301, name: "Synthetic" }, { id: 2302, name: "Natural" }, { id: 2303, name: "Dual-Fiber" }],
        sets: [{ id: 8001, name: "Individual" }, { id: 8002, name: "Travel Set" }, { id: 8003, name: "Professional Kit" }]
    },

    //Lipstick
    "7": {
        subCategories: [{ id: 701, name: "Bullet Lipstick" }, { id: 702, name: "Liquid Lipstick" }, { id: 703, name: "Crayon Lipstick" }],
        brands: [{ id: 101, name: "MAC" }, { id: 102, name: "Lakme" }, { id: 103, name: "Maybelline" }],
        colors: [{ id: 201, name: "Red" }, { id: 202, name: "Pink" }, { id: 203, name: "Nude" }, { id: 204, name: "Berry" }],
        finish: [{ id: 301, name: "Matte" }, { id: 302, name: "Glossy" }, { id: 303, name: "Liquid Matte" }, { id: 304, name: "Satin" }],
        stayingPower: [{ id: 8101, name: "8 Hour Stay" }, { id: 8102, name: "12 Hour Stay" }, { id: 8103, name: "Waterproof" }]
    },

    //Beauty Products (Skincare)
    "8": {
        subCategories: [{ id: 801, name: "Face Serums" }, { id: 802, name: "Moisturizers" }, { id: 803, name: "Sunscreen" }, { id: 804, name: "Face Wash" }],
        brands: [{ id: 1901, name: "The Ordinary" }, { id: 1902, name: "Mamaearth" }, { id: 1903, name: "Minimalist" }],
        skinType: [{ id: 2001, name: "Oily" }, { id: 2002, name: "Dry" }, { id: 2003, name: "Sensitive" }, { id: 2004, name: "Combination" }],
        concerns: [{ id: 2101, name: "Acne" }, { id: 2102, name: "Glow" }, { id: 2103, name: "Anti-Aging" }, { id: 2104, name: "Pigmentation" }],
        formulation: [{ id: 8201, name: "Serum" }, { id: 8202, name: "Gel" }, { id: 8203, name: "Cream" }, { id: 8204, name: "Face Oil" }]
    },

    //Accessories (Watches, Belts etc.)
    "9": {
        subCategories: [{ id: 901, name: "Watches" }, { id: 902, name: "Belts" }, { id: 903, name: "Wallets" }, { id: 904, name: "Hats" }],
        brands: [{ id: 1601, name: "Fossil" }, { id: 1602, name: "Titan" }, { id: 1603, name: "Fastrack" }],
        colors: [{ id: 1701, name: "Gold" }, { id: 1702, name: "Silver" }, { id: 1703, name: "Black" }, { id: 1704, name: "Brown" }],
        display: [{ id: 1801, name: "Analog" }, { id: 1802, name: "Digital" }, { id: 1803, name: "Smart" }],
        strapMaterial: [{ id: 8301, name: "Leather" }, { id: 8302, name: "Stainless Steel" }, { id: 8303, name: "Silicone" }]
    },

    // Furniture
    "10": {
        subCategories: [{ id: 1001, name: "Living Room" }, { id: 1002, name: "Bedroom" }, { id: 1003, name: "Office" }, { id: 1004, name: "Dining" }],
        brands: [{ id: 10001, name: "IKEA" }, { id: 10002, name: "Godrej Interio" }, { id: 10003, name: "Urban Ladder" }, { id: 10004, name: "Pepperfry" }],
        types: [{ id: 10101, name: "Sofa" }, { id: 10102, name: "Dining Table" }, { id: 10103, name: "Bed" }, { id: 10104, name: "Office Chair" }],
        material: [{ id: 10201, name: "Sheesham Wood" }, { id: 10202, name: "Engineered Wood" }, { id: 10203, name: "Metal" }, { id: 10204, name: "Fabric/Upholstery" }],
        finish: [{ id: 10301, name: "Teak" }, { id: 10302, name: "Walnut" }, { id: 10303, name: "Glossy" }, { id: 10304, name: "Matte" }],
        room: [{ id: 10401, name: "Living Room" }, { id: 10402, name: "Bedroom" }, { id: 10403, name: "Study Room" }],
        configuration: [{ id: 10501, name: "1-Seater" }, { id: 10502, name: "3-Seater" }, { id: 10503, name: "King Size" }, { id: 10504, name: "Queen Size" }]
    },

    // Heels
    "11": {
        subCategories: [{ id: 1101, name: "Pumps" }, { id: 1102, name: "Stilettos" }, { id: 1103, name: "Wedges" }, { id: 1104, name: "Block Heels" }],
        brands: [{ id: 11001, name: "ALDO" }, { id: 11002, name: "Steve Madden" }, { id: 11003, name: "Inc.5" }, { id: 11004, name: "Catwalk" }],
        colors: [{ id: 11101, name: "Gold" }, { id: 11102, name: "Silver" }, { id: 11103, name: "Nude" }, { id: 11104, name: "Red" }],
        heelHeight: [{ id: 11301, name: "1-2 Inches" }, { id: 11302, name: "3-4 Inches" }, { id: 11303, name: "5 Inches & Above" }],
        toeShape: [{ id: 11401, name: "Pointed Toe" }, { id: 11402, name: "Round Toe" }, { id: 11403, name: "Peep Toe" }],
        occasion: [{ id: 11501, name: "Party" }, { id: 11502, name: "Bridal" }, { id: 11503, name: "Office Wear" }]
    },

    //Watches
    "12": {
        subCategories: [{ id: 1201, name: "Luxury" }, { id: 1202, name: "Sports" }, { id: 1203, name: "Smartwatches" }, { id: 1204, name: "Casual" }],
        brands: [{ id: 12001, name: "Casio" }, { id: 12002, name: "Michael Kors" }, { id: 12003, name: "Daniel Wellington" }, { id: 12004, name: "Tommy Hilfiger" }],
        display: [{ id: 12101, name: "Analog" }, { id: 12102, name: "Digital" }, { id: 12103, name: "Chronograph" }, { id: 12104, name: "Smart" }],
        dialShape: [{ id: 12201, name: "Round" }, { id: 12202, name: "Square" }, { id: 12203, name: "Rectangular" }],
        strapMaterial: [{ id: 12301, name: "Stainless Steel" }, { id: 12302, name: "Genuine Leather" }, { id: 12303, name: "Ceramic" }, { id: 12304, name: "Mesh" }],
        waterResistance: [{ id: 12401, name: "30m (Splash Proof)" }, { id: 12402, name: "50m (Suitable for Swimming)" }, { id: 12403, name: "100m (Diving)" }],
        movement: [{ id: 12501, name: "Quartz" }, { id: 12502, name: "Automatic" }, { id: 12503, name: "Solar" }]
    },

    // Sunglasses
    "13": {
        subCategories: [{ id: 1301, name: "Aviators" }, { id: 1302, name: "Wayfarers" }, { id: 1303, name: "Cat-Eye" }, { id: 1304, name: "Round" }],
        brands: [{ id: 13001, name: "Ray-Ban" }, { id: 13002, name: "Oakley" }, { id: 13003, name: "Vogue" }, { id: 13004, name: "Fastrack" }],
        frameShape: [{ id: 13101, name: "Aviator" }, { id: 13102, name: "Wayfarer" }, { id: 13103, name: "Round" }, { id: 13104, name: "Cat Eye" }, { id: 13105, name: "Clubmaster" }],
        lensType: [{ id: 13201, name: "Polarized" }, { id: 13202, name: "UV Protection" }, { id: 13203, name: "Mirrored" }, { id: 13204, name: "Gradient" }],
        frameMaterial: [{ id: 13301, name: "Metal" }, { id: 13302, name: "Plastic/Acetate" }, { id: 13303, name: "Titanium" }],
        size: [{ id: 13401, name: "Small" }, { id: 13402, name: "Medium" }, { id: 13403, name: "Large" }],
        faceShape: [{ id: 13501, name: "Oval" }, { id: 13502, name: "Round" }, { id: 13503, name: "Square" }, { id: 13504, name: "Heart" }]
    },

    // Kitchen Appliances
    "14": {
        subCategories: [{ id: 1401, name: "Small Appliances" }, { id: 1402, name: "Cooking" }, { id: 1403, name: "Coffee Makers" }],
        brands: [{ id: 14001, name: "Philips" }, { id: 14002, name: "Prestige" }, { id: 14003, name: "Bajaj" }, { id: 14004, name: "Morphy Richards" }],
        types: [{ id: 14101, name: "Mixer Grinder" }, { id: 14102, name: "Air Fryer" }, { id: 14103, name: "Electric Kettle" }, { id: 14104, name: "Toaster" }, { id: 14105, name: "Microwave" }],
        capacity: [{ id: 14201, name: "Below 1L" }, { id: 14202, name: "1L - 2L" }, { id: 14203, name: "2L - 5L" }, { id: 14204, name: "Above 5L" }],
        powerConsumption: [{ id: 14301, name: "Below 500W" }, { id: 14302, name: "500W - 750W" }, { id: 14303, name: "Above 1000W" }],
        features: [{ id: 14401, name: "Digital Display" }, { id: 14402, name: "Auto Shut-off" }, { id: 14403, name: "Timer Settings" }, { id: 14404, name: "Dishwasher Safe" }],
        material: [{ id: 14501, name: "Stainless Steel" }, { id: 14502, name: "BPA-Free Plastic" }, { id: 14503, name: "Glass" }]
    }
};

const allCat = [
    {
        id: 1,
        catName: "Shoes",
        pieces: 90
    },
    {
        id: 2,
        catName: "Tops",
        pieces: 66
    },
    {
        id: 3,
        catName: "Purse",
        pieces: 20
    },
    {
        id: 4,
        catName: "Jeans",
        pieces: 35
    },
    {
        id: 5,
        catName: "Necklace",
        pieces: 8
    },
    {
        id: 6,
        catName: "Makeup Brushes",
        pieces: 23
    },
    {
        id: 7,
        catName: "Lipstick",
        pieces: 18
    },
    {
        id: 8,
        catName: "Beauty Products",
        pieces: 21
    },
    {
        id: 9,
        catName: "Accessories",
        pieces: 70
    },
    {
        id: 10,
        catName: "Furniture",
        pieces: 15
    },
    {
        id: 11,
        catName: "Heels",
        pieces: 25
    },
    {
        id: 12,
        catName: "Watches",
        pieces: 30
    },
    {
        id: 13,
        catName: "Sunglasses",
        pieces: 18
    },
    {
        id: 14,
        catName: "Kitchen Appliances",
        pieces: 12
    }

];

function ProductsFilterPart({ activeCatId, catName }) {

    const { catId } = useParams(); // URL se ID nikalne ke liye
    const navigate = useNavigate();

    const currentData = dynamicFilters[activeCatId];

    const [isCatOpen, setIsCatOpen] = useState(true);
    const [selectedFilters, setSelectedFilters] = useState({}); // 1. jo id sellect ki uska pura obj store
    const [openSections, setOpenSections] = useState({});       // 2. track krna kaunsa dropdown khula hai

    const [isPriceOpen, setIsPriceOpen] = useState(false);
    const [minPrice, setMinPrice] = useState(200);
    const [maxPrice, setMaxPrice] = useState(800);

    const minLimit = 0;
    const maxLimit = 1000;
    const step = 10; // Kitne gap mein slide hoga

    const handleMinChange = (e) => {
        const value = Math.min(Number(e.target.value), maxPrice - 100);
        setMinPrice(value);
    }

    const handleMaxChange = (e) => {
        const value = Math.max(Number(e.target.value), minPrice + 100);
        setMaxPrice(value);
    }

    // generic handler function for drop down
    const handleCheckBoxChange = (categoryKey, id) => {
        setSelectedFilters(prev => {
            const current = prev[categoryKey] || [];

            if (current.includes(id)) {
                return {
                    ...prev,
                    [categoryKey]: current.filter(item => item !== id)
                };
            } else {
                return {
                    ...prev,
                    [categoryKey]: [...current, id]
                };
            }
        });
    };

    //chips
    const getFilterName = (categoryKey, id) => {
        const items = currentData?.[categoryKey] || [];
        const found = items.find(item => item.id === id);
        return found ? found.name : "";
    };

    //clear button
    const clearAllFilters = () => {
        setSelectedFilters({});
        setOpenSections({});
        // navigate('/all_products'); // Category bhi reset
    };

    //for all dynamic filter reset when cat change
    useEffect(() => {
        setSelectedFilters({});
        setOpenSections({});
    }, [activeCatId]);

    return (
        <section className="w-full px-4">

            <div className='text-pink-500 text-[25px] font-semibold'>{catName}</div>

            <div>
                {/* clear button */}
                <div className="flex items-center justify-between">
                    <h1 className="font-semibold text-[16px] pt-2">Filters :</h1>

                    {Object.values(selectedFilters).some(arr => arr.length > 0) && (
                        <button
                            onClick={clearAllFilters}
                            className="text-pink-500 text-sm font-medium hover:underline cursor-pointer"
                        >
                            Remove All
                        </button>
                    )}
                </div>

                {/* 1. Category Chip (Special Case) */}
                {catId && catId !== "all" && (
                    <div className="w-fit flex items-center justify-center gap-2 bg-pink-100 text-pink-600 px-2 py-1 my-2 rounded-full text-sm font-medium">
                        <span>Category : {catName}</span>
                        <button
                            onClick={() => navigate('/all_products')}
                            className="font-bold"
                        >
                            <RxCross2 className="cursor-pointer text-[14px]" />
                        </button>
                    </div>
                )}

                {/* 2. dynamic items chips */}
                <div className="flex flex-wrap gap-2 mt-3">
                    {Object.entries(selectedFilters).map(([key, ids]) =>

                        //Har id ke liye chip banegi.
                        ids.map(id => (
                            <div
                                key={`${key}-${id}`}
                                className="flex items-center gap-2 bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm"
                            >
                                <span>{getFilterName(key, id)}</span>

                                <button
                                    onClick={() => handleCheckBoxChange(key, id)}
                                    className="font-bold"
                                >
                                    <RxCross2 className="cursor-pointer text-[14px]" />
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* all categories  */}
            {(!catId || catId === "all") && (
                <div className='text-[18px] border-b border-[#CCCCCC] py-5'>
                    <div
                        onClick={() => setIsCatOpen(!isCatOpen)}
                        className='cursor-pointer flex justify-between items-center'>

                        <h1 className="font-semibold text-[18px]">All Categories</h1>
                        {isCatOpen ? (
                            <IoIosArrowUp className="text-xl" />
                        ) : (
                            <IoIosArrowDown className="text-xl" />
                        )}
                    </div>

                    {isCatOpen && (
                        <div className='flex flex-col items-start pt-2 mt-2 space-y-2 animate-in fade-in slide-in-from-top-2 duration-300'>
                            {allCat.map((category, index) => (
                                <label
                                    key={index}
                                    className='flex items-center gap-4 text-left w-full cursor-pointer'
                                >
                                    <input
                                        type="checkbox"
                                        checked={String(catId) === String(category.id)}
                                        onChange={() => navigate(`/all_products/${category.id}/${category.catName}`)}
                                        className='accent-pink-500 w-4 h-4 cursor-pointer'
                                    />

                                    <span className={`text-[15px] transition-colors 
                                                ${String(catId) === String(category.id) ? 'text-pink-500' : 'text-gray-600 group-hover:text-pink-500'}`}>
                                        {category.catName}
                                    </span>

                                    <span className=" text-gray-500 text-[12px] font-medium bg-pink-50 px-2 py-0.5 rounded-full">
                                        {category.pieces}
                                    </span>

                                </label>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* price  range*/}
            <div className='text-[18px] border-b border-[#CCCCCC] py-5'>
                <div
                    onClick={() => setIsPriceOpen(!isPriceOpen)}
                    className='cursor-pointer flex justify-between items-center'>

                    <h1 className="font-semibold text-[18px]">Price</h1>
                    {isPriceOpen ? (
                        <IoIosArrowUp className="text-xl" />
                    ) : (
                        <IoIosArrowDown className="text-xl" />
                    )}
                </div>

                {isPriceOpen && (
                    <div className='mt-2'>
                        <div className="relative w-full h-1.5 bg-gray-200 rounded-full">
                            {/* Dynamic Pink Track: Jo dono handle ke beech dikhegi */}
                            <div
                                className="absolute h-1.5 bg-pink-500 rounded-full"
                                style={{
                                    left: `${(minPrice / maxLimit) * 100}%`,
                                    right: `${100 - (maxPrice / maxLimit) * 100}%`
                                }}
                            ></div>

                            {/* Input sliders - Dono overlap ho rahe hain */}
                            <input
                                type="range"
                                min={minLimit}
                                max={maxLimit}
                                step={step}
                                value={minPrice}
                                onChange={handleMinChange}
                                className="absolute w-full h-1.5 bg-transparent appearance-none pointer-events-none cursor-pointer accent-pink-600"
                                style={{ zIndex: minPrice > maxLimit / 2 ? 5 : 4 }}
                            />

                            <input
                                type="range"
                                min={minLimit}
                                max={maxLimit}
                                step={step}
                                value={maxPrice}
                                onChange={handleMaxChange}
                                className="absolute w-full h-1.5 bg-transparent appearance-none pointer-events-none cursor-pointer accent-pink-600"
                                style={{ zIndex: 4 }}
                            />
                        </div>

                        {/* Labels: Niche price dikhane ke liye */}
                        <div className="flex justify-between items-center mt-8 font-medium">
                            <div className="text-gray-600 text-sm">
                                Min: <span className="text-gray-900">₹{minPrice}</span>
                            </div>
                            <div className="text-gray-600 text-sm">
                                Max: <span className="text-gray-900">₹{maxPrice}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* --- YAHAN SE DYNAMIC LOGIC START HAI --- */}
            {currentData && Object.keys(currentData).map((key) => {

                const filterItems = currentData[key];
                const isOpen = openSections[key] || false;
                const selected = selectedFilters[key] || [];

                return (
                    <div
                        key={key}
                        className='text-[18px] border-b border-[#CCCCCC] py-5'>

                        <div
                            onClick={() =>
                                setOpenSections({ ...openSections, [key]: !isOpen })
                            }
                            className='cursor-pointer flex justify-between items-center capitalize'
                        >
                            <h1 className="font-semibold text-[18px]">
                                {key.replace(/([A-Z])/g, ' $1').trim()}
                            </h1>
                            {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                        </div>

                        {isOpen && (
                            <div className='flex flex-col pt-2 mt-2 space-y-2'>
                                {filterItems.map((item) => (
                                    <label
                                        key={item.id}
                                        className='flex items-center gap-4 cursor-pointer'>
                                        <input
                                            type="checkbox"
                                            checked={selected.includes(item.id)}
                                            onChange={() =>
                                                handleCheckBoxChange(key, item.id)
                                            }
                                            className='accent-pink-500 w-4 h-4'
                                        />

                                        <span className={`text-[15px] transition-colors 
                                            ${selected.includes(item.id) ? 'text-pink-500' : 'text-gray-600'}`}>
                                            {item.name}
                                        </span>

                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                );
            })}
            {/* --- DYNAMIC LOGIC END --- */}

        </section>
    )
}

export default ProductsFilterPart;