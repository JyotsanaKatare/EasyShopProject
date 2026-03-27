
//updated
import React from 'react'
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { SiInstagram } from "react-icons/si";
import { FaSquareFacebook } from "react-icons/fa6";
import { BsWhatsapp } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa6";
import { FaQuoteRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

function HomeReviewSlider() {

    const reviews = [
        {
            img: <FaRegUser />,
            iconTag: <SiInstagram />,
            para: "Installation process was very smooth. Team explained everything clearly and completed the work.",
            name: "Sameer",
        },

        {
            img: <FaRegUser />,
            iconTag: <SiInstagram />,
            name: "Shree",
            para: "Installation process was very smooth. Team explained everything clearly and completed the work.",
        },

        {
            img: <FaRegUser />,
            iconTag: <FaSquareFacebook />,
            name: "Bruce",
            para: "Very professional service. The solar system is working perfectly and electricity bill has reduced a lot.",
        },

        {
            img: <FaRegUser />,
            iconTag: <BsWhatsapp />,
            name: "Ritche",
            para: "Excellent support from enquiry to installation. Highly recommended for residential solar solutions.",
        },

        {
            img: <FaRegUser />,
            iconTag: <SiInstagram />,
            name: "Lucie",
            para: "Quality work and knowledgeable staff. They guided us properly about subsidy and maintenance.",
        },
        {
            img: <FaRegUser />,
            iconTag: <FaSquareFacebook />,
            name: "Sophia",
            para: "Very satisfied with the service. Clean installation and great after-sales support and maintenance.",
        },

        {
            img: <FaRegUser />,
            iconTag: <BsWhatsapp />,
            name: "Amelia",
            para: "Trustworthy company. Everything was transparent and completed within the promised timeline.",
        },

        {
            img: <FaRegUser />,
            iconTag: <SiInstagram />,
            para: "Very professional service. Highly satisfied with the solar installation. Very good explaination...",
            name: "Denny",
        },

        {
            img: <FaRegUser />,
            iconTag: <SiInstagram />,
            name: "Nova",
            para: "Team was very cooperative and professional. Installation was done neatly without any issues.",
        },

        {
            img: <FaRegUser />,
            iconTag: <FaSquareFacebook />,
            name: "Emily",
            para: "Good experience overall. Proper guidance was given about system usage and maintenance.",
        },

        {
            img: <FaRegUser />,
            iconTag: <BsWhatsapp />,
            name: "Daniel",
            para: "Solar panel quality is excellent and the performance is as promised. Very happy with the service.",
        },
        {
            img: <FaRegUser />,
            iconTag: <SiInstagram />,
            name: "Henry",
            para: "Installation completed on time and the team was very polite. Would definitely recommend them.",
        },

        {
            img: <FaRegUser />,
            iconTag: <SiInstagram />,
            para: "Installation process was smooth and the team explained everything clearly and complete process.",
            name: "Alexander",
        },

        {
            img: <FaRegUser />,
            iconTag: <SiInstagram />,
            para: "Very professional service. Highly satisfied with the solar installation. Very good explaination...",
            name: "Ava",
        },
    ];

    return (
        <section className="w-full bg-pink-100/30 py-8 md:py-16 px-4 lg:px-6">
            <div className="max-w-6xl mx-auto">

                {/* heading */}
                <div className="flex flex-col items-center mb-8 md:mb-12">
                    <h2 className="text-2xl md:text-4xl text-center font-bold text-gray-800 tracking-tight">
                        What Our Happy Customers Say
                    </h2>

                    <div className="w-20 h-1 md:h-1.5 bg-pink-500 rounded-full mt-2 md:mt-3"></div>

                    <p className="text-gray-500 mt-4 text-[12px] text-center md:text-sm uppercase tracking-widest">
                        Real stories from people who found their perfect style with us
                    </p>
                </div>

                {/* Slider */}
                <Swiper
                    modules={[Autoplay]}
                    slidesPerView={4}
                    spaceBetween={30} // Thoda gap badhaya
                    loop={true}
                    autoplay={{ delay: 3000 }}
                    breakpoints={{
                        0: { slidesPerView: 1 },
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 }, // 3 slides better lagti hain for readability
                        1280: { slidesPerView: 4 },
                    }}
                    className="py-10 px-5"
                >
                    {reviews.map((item, index) => (
                        <SwiperSlide
                            key={index}
                            className="bg-white border border-gray-100 rounded-[2.5rem] p-8 flex flex-col items-center shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-300 group"
                        >
                            {/* Customer Image Circle */}
                            <div className="relative">
                                <div className='w-24 h-24 bg-pink-50 rounded-full overflow-hidden flex justify-center items-center border-2 border-white ring-4 ring-pink-50/50'>

                                    <span
                                        className='text-4xl group-hover:scale-110 transition-transform duration-300'>
                                        {item.img}
                                    </span>
                                </div>
                                {/* quote icon */}
                                <div className="absolute -bottom-2 -right-2 bg-pink-500 text-white p-2 rounded-full shadow-lg">
                                    <FaQuoteRight size={12} />
                                </div>
                            </div>

                            {/* Name */}
                            <h3 className="mt-6 text-gray-900 font-bold text-xl tracking-tight">
                                {item.name}
                            </h3>

                            {/* Rating Stars */}
                            <div className="flex justify-center gap-1 my-3">
                                <FaStar className="text-pink-500 text-[16px]" />
                                <FaStar className="text-pink-500 text-[16px]" />
                                <FaStar className="text-pink-500 text-[16px]" />
                                <FaStar className="text-pink-500 text-[16px]" />
                                <FaStarHalfAlt className="text-pink-500 text-[16px]" />
                            </div>

                            {/* Review */}
                            <p className="text-[14px] text-gray-500 text-center leading-relaxed italic px-2">
                                "{item.para}"
                            </p>

                            {/* Bottom Icon/Badge */}
                            <div className="mt-6 pt-6 border-t border-gray-50 w-full flex justify-center">
                                <div className="flex items-center gap-2 text-pink-400 opacity-70 group-hover:opacity-100 transition-opacity">
                                    <span className="text-[18px]">{item.iconTag}</span>
                                    <span className="text-[10px] uppercase tracking-widest font-bold">Verified Review</span>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    )
}

export default HomeReviewSlider;