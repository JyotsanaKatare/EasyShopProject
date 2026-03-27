
//updated
import React, { useState } from 'react'
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

function VendorBusinessInfo({ prev, next, setFormData }) {

    const [file, setFile] = useState({
        logo: null,
        license: null,
        pan: null,
        gst: null
    });

    const [isBusinessOpen, setIsBusinessOpen] = useState(false);
    const [isBusinessSelected, setIsBusinessSelected] = useState("");
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [isCategorySelected, setIsCategorySelected] = useState("");

    const [gstNumber, setGstNumber] = useState("");

    //common for all uploadations
    const handleFileChange = (e) => {
        const { name, files } = e.target;

        setFile(prev => ({
            ...prev, [name]: files[0]
        }));
    };

    const businessMenu = [
        { id: 1, businessName: "Individual / Sole Proprietorship" },
        { id: 2, businessName: "Private Limited Company" },
        { id: 3, businessName: "Partnership Firm" },
        { id: 4, businessName: "Limited Liability Partnership (LLP)" },
        { id: 5, businessName: "Manufacturer" },
        { id: 6, businessName: "Wholesaler / Distributor" }
    ];

    const categoryMenu = [
        { id: 1, categoryName: "Clothing & Apparel" },
        { id: 2, categoryName: "Footwear & Shoes" },
        { id: 3, categoryName: "Electronics & Gadgets" },
        { id: 4, categoryName: "Beauty & Personal Care" },
        { id: 5, categoryName: "Home & Kitchen Decor" },
        { id: 6, categoryName: "Furniture & Living" },
        { id: 7, categoryName: "Jewelry & Accessories" },
        { id: 8, categoryName: "Handicrafts & Arts" },
        { id: 9, categoryName: "Toys & Baby Products" }
    ];

    const licenseLabels = {
        "Footwear & Shoes": "BIS Certification",
        "Electronics & Gadgets": "BIS/WPC License",
        "Beauty & Personal Care": "CDSCO License",
        "Jewelry & Accessories": "BIS Hallmarking License",
        "Handicrafts & Arts": "Artisan Card",
        "Toys & Baby Products": "BIS Certification (ISI Mark)"
    }

    const handleBusiness = (business) => {
        setIsBusinessSelected(business.businessName);
        setIsBusinessOpen(false);
    }

    const handleCategory = (category) => {
        setIsCategorySelected(category.categoryName);
        setIsCategoryOpen(false);
    }

    return (
        <section className="w-full">

            {/* heading */}
            <div className='mb-8 text-center md:text-left'>
                <h1 className='text-xl md:text-2xl font-bold text-gray-800 tracking-tight'>
                    Business Information
                </h1>

                <div className='w-12 h-1 bg-pink-500 rounded-full mt-1 mx-auto md:ml-0'></div>

                <p className='text-gray-500 text-xs md:text-sm mt-2'>
                    Tell us about your company or brand details.
                </p>
            </div>

            {/* form section */}
            {/* <div className='space-y-6'> */}

            {/* Store Logo Section */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-8 p-5 sm:p-6 bg-pink-50/50 rounded-2xl border border-dashed border-pink-200 transition-all">

                {/* Hidden File Input */}
                <input
                    type="file"
                    id='logo'
                    name='logo'
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                />

                <label
                    htmlFor="logo"
                    className="w-20 h-20 bg-white border-2 border-gray-100 rounded-full flex flex-col items-center justify-center text-gray-400 text-[10px] sm:text-xs text-center p-3 cursor-pointer hover:border-pink-500 hover:text-pink-500 transition-all shadow-sm shrink-0 active:scale-95"
                >
                    <span className="font-bold">Upload Logo</span>
                </label>

                <div className="text-center sm:text-left overflow-hidden w-full">
                    <span className="block font-bold text-gray-700 text-sm md:text-base truncate">
                        {file.logo ? file.logo.name : "Store Logo"}
                    </span>
                    <p className="text-[10px] sm:text-xs text-gray-500 mt-1 leading-tight">
                        Recommended: 500x500px <br className="sm:hidden" /> (PNG/JPG)
                    </p>
                </div>
            </div>

            <div className='grid md:grid-cols-2 gap-5 md:gap-6'>

                {/* Store Name */}
                <div className='flex flex-col gap-1.5'>
                    <label className="text-xs md:text-sm font-semibold text-gray-600 ml-1 tracking-wide">Store Name</label>
                    <input
                        type="text"
                        placeholder="e.g. Trendify Fashion"
                        className="w-full p-3 text-sm md:text-base placeholder:text-gray-400 bg-gray-50 border border-gray-200 rounded-lg md:rounded-2xl focus:border-pink-500 focus:bg-white outline-none transition-all" />
                </div>

                {/* Business type dropdown */}
                <div className='flex flex-col gap-1.5'>
                    <label className="text-xs md:text-sm font-semibold text-gray-600 ml-1 tracking-wide">Buisness Type</label>

                    <div className='cursor-pointer'>
                        <div
                            onClick={() => setIsBusinessOpen(!isBusinessOpen)}
                            className={`w-full flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg md:rounded-2xl focus:border-pink-500 focus:bg-white transition-all outline-none
                                        ${isBusinessOpen ? "border-pink-500 ring-pink-500 bg-white" : "border-gray-200"}`}
                        >
                            <span className={`text-sm md:text-base truncate 
                                ${isBusinessSelected ? "text-gray-900 font-medium" : "text-gray-400"}`}>
                                {isBusinessSelected || "Select Business"}
                            </span>

                            <div className="text-gray-400 group-hover:text-pink-500">
                                {isBusinessOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                            </div>
                        </div>
                    </div>

                    {/* dropdown */}
                    <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out cursor-pointer
                            ${isBusinessOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
                    >
                        <div className='bg-white my-2 rounded-2xl'>
                            {businessMenu.map((item, index) => (
                                <div
                                    key={index}
                                    onClick={() => handleBusiness(item)}
                                    className='hover:text-pink-600 flex justify-start items-center py-2 px-2 hover:bg-pink-100'
                                >
                                    <p>{item.businessName}</p>
                                </div>
                            ))}
                        </div>

                    </div>

                </div>

                {/* Category dropdown */}
                <div className='flex flex-col gap-1.5'>
                    <label className="text-xs md:text-sm font-semibold text-gray-600 ml-1 tracking-wide">Category</label>

                    <div className='cursor-pointer'>
                        <div
                            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                            className={`w-full flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg md:rounded-2xl focus:border-pink-500 focus:bg-white transition-all outline-none
                                        ${isCategoryOpen ? "border-pink-500 ring-pink-500 bg-white" : "border-gray-200"}`}
                        >

                            <span className={`text-sm md:text-base truncate 
                                ${isCategorySelected ? "text-gray-900 font-medium" : "text-gray-400"}`}>
                                {isCategorySelected || "Select Category"}
                            </span>

                            <div className="text-gray-400 group-hover:text-pink-500">
                                {isCategoryOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                            </div>
                        </div>
                    </div>

                    {/* dropdown */}
                    <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out cursor-pointer
                            ${isCategoryOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
                    >
                        <div className='bg-white my-2 rounded-2xl'>
                            {categoryMenu.map((item, index) => (
                                <div
                                    key={index}
                                    onClick={() => handleCategory(item)}
                                    className='hover:text-pink-600 flex justify-start items-center py-2 px-2 hover:bg-pink-100'
                                >
                                    <p>{item.categoryName}</p>
                                </div>
                            ))}
                        </div>

                    </div>

                </div>

                {/* license upload*/}
                {licenseLabels[isCategorySelected] && (
                    <div className='relative flex flex-col gap-1.5'>
                        <label className="text-xs md:text-sm font-semibold text-gray-600 ml-1 tracking-wide">{licenseLabels[isCategorySelected]}</label>

                        <div className="relative">
                            {/* Input ko 'peer' banaya aur z-index diya taaki click pakde */}
                            <input
                                type="file"
                                name='license'
                                accept='image/*'
                                onChange={handleFileChange}
                                className='absolute inset-0 opacity-0 cursor-pointer z-10 peer'
                            />

                            <div className="w-full p-3 text-sm md:text-base bg-gray-50 border border-gray-200 rounded-lg md:rounded-2xl flex gap-2 items-center outline-none transition-all peer-focus:border-pink-500">
                                <button className="text-sm md:text-base border border-pink-100 rounded-sm px-2 text-pink-600 bg-pink-50 pointer-events-none">
                                    Upload
                                </button>
                                <span className='text-sm md:text-base text-gray-500 truncate'>
                                    {file.license ? file.license.name : "No file chosen"}
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                {/* business address */}
                <div className='flex flex-col gap-1.5'>
                    <label className="text-xs md:text-sm font-semibold text-gray-600 ml-1 tracking-wide">Business Address</label>
                    <input
                        type="text"
                        placeholder="Address"
                        className="w-full p-3 text-sm md:text-base placeholder:text-gray-400 bg-gray-50 border border-gray-200 rounded-lg md:rounded-2xl focus:border-pink-500 focus:bg-white outline-none transition-all" />
                </div>

                {/* city */}
                <div className='flex flex-col gap-1.5'>
                    <label className="text-xs md:text-sm font-semibold text-gray-600 ml-1 tracking-wide">City</label>
                    <input
                        type="text"
                        placeholder="e.g. Indore"
                        className="w-full p-3 text-sm md:text-base placeholder:text-gray-400 bg-gray-50 border border-gray-200 rounded-lg md:rounded-2xl focus:border-pink-500 focus:bg-white outline-none transition-all" />
                </div>

                {/* state */}
                <div className='flex flex-col gap-1.5'>
                    <label className="text-xs md:text-sm font-semibold text-gray-600 ml-1 tracking-wide">State</label>
                    <input
                        type="text"
                        placeholder="e.g. Madhya Pradesh..."
                        className="w-full p-3 text-sm md:text-base placeholder:text-gray-400 bg-gray-50 border border-gray-200 rounded-lg md:rounded-2xl focus:border-pink-500 focus:bg-white outline-none transition-all" />
                </div>

                {/* pincode */}
                <div className='flex flex-col gap-1.5'>
                    <label className="text-xs md:text-sm font-semibold text-gray-600 ml-1 tracking-wide">Pin Code</label>
                    <input
                        type="text"
                        placeholder="123456"
                        className="w-full p-3 text-sm md:text-base placeholder:text-gray-400 bg-gray-50 border border-gray-200 rounded-lg md:rounded-2xl focus:border-pink-500 focus:bg-white outline-none transition-all" />
                </div>

                {/* pan num */}
                <div className='flex flex-col gap-1.5'>
                    <label className="text-xs md:text-sm font-semibold text-gray-600 ml-1 tracking-wide">Business PAN Number</label>
                    <input
                        type="text"
                        placeholder="ABCDE1234F"
                        className="w-full p-3 text-sm md:text-base placeholder:text-gray-400 bg-gray-50 border border-gray-200 rounded-lg md:rounded-2xl focus:border-pink-500 focus:bg-white outline-none transition-all" />
                </div>

                {/* pan upload */}
                <div className='relative flex flex-col gap-1.5'>
                    <label className="text-xs md:text-sm font-semibold text-gray-600 ml-1 tracking-wide">Business PAN Upload</label>

                    <div className="relative">
                        <input
                            type="file"
                            name='pan'
                            accept='image/*'
                            onChange={handleFileChange}
                            className='absolute inset-0 opacity-0 cursor-pointer z-10 peer'
                        />

                        <div className="w-full p-3 text-sm md:text-base bg-gray-50 border border-gray-200 rounded-lg md:rounded-2xl flex gap-2 items-center outline-none transition-all peer-focus:border-pink-500">
                            <button className="text-sm md:text-base border border-pink-100 rounded-sm px-2 text-pink-600 bg-pink-50 pointer-events-none">
                                Upload
                            </button>
                            <span className='text-sm md:text-base text-gray-500 truncate'>
                                {file.pan ? file.pan.name : "No file chosen"}
                            </span>
                        </div>
                    </div>
                </div>

                {/* gst */}
                <div className='flex flex-col gap-1.5'>
                    <label className="text-xs md:text-sm font-semibold text-gray-600 ml-1 tracking-wide">GST Number (if available)</label>
                    <input
                        type="text"
                        value={gstNumber}
                        onChange={(e) => setGstNumber(e.target.value.toUpperCase())}
                        maxLength={15}
                        placeholder="22AAAAA0000A1Z5"
                        className="w-full p-3 text-sm md:text-base placeholder:text-gray-400 bg-gray-50 border border-gray-200 rounded-lg md:rounded-2xl focus:border-pink-500 focus:bg-white outline-none transition-all" />
                </div>

                {/* gst upload */}
                {gstNumber.length === 15 && (
                    <div className='relative flex flex-col gap-1.5'>
                        <label className="text-xs md:text-sm font-semibold text-gray-600 ml-1 tracking-wide">GST Certificate Upload</label>

                        <div className="relative">
                            <input
                                type="file"
                                name='gst'
                                accept='image/*'
                                onChange={handleFileChange}
                                className='absolute inset-0 opacity-0 cursor-pointer z-10 peer'
                            />

                            <div className="w-full p-3 text-sm md:text-base bg-gray-50 border border-gray-200 rounded-lg md:rounded-2xl flex gap-2 items-center outline-none transition-all peer-focus:border-pink-500">
                                <button className="text-sm md:text-base border border-pink-100 rounded-sm px-2 text-pink-600 bg-pink-50 pointer-events-none">
                                    Upload
                                </button>
                                <span className='text-sm md:text-base text-gray-500 truncate'>
                                    {file.gst ? file.gst.name : "No file chosen"}
                                </span>
                            </div>
                        </div>
                    </div>
                )}

            </div>

            {/* button */}
            <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-4 mt-10">

                <button
                    onClick={prev}
                    className="w-full text-start sm:w-auto text-gray-500 hover:text-pink-500 px-6 py-3 hover:bg-pink-50 rounded-xl font-bold transition-all cursor-pointer text-sm md:text-base"
                >
                    ← Back
                </button>

                <button
                    onClick={next}
                    className="w-full sm:w-auto bg-pink-500 text-white px-8 py-3.5 md:py-3 rounded-xl font-bold shadow-lg shadow-pink-200 hover:bg-pink-600 md:hover:scale-105 active:scale-95 transition-all cursor-pointer text-sm md:text-base"
                >
                    Continue to Account Details
                </button>
            </div>
            {/* </div> */}

        </section>
    )
}

export default VendorBusinessInfo;