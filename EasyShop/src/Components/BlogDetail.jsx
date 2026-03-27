
//updated
import React from 'react'
import Logo from '../assets/Images/Logo.png';
import { FaFacebook } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { useNavigate, useParams } from 'react-router-dom';
import { useMemo } from 'react';

function BlogDetail() {

    const { blogId } = useParams();
    const navigate = useNavigate();

    const blogData = [
        {
            id: 1,
            title: "5 Summer Fashion Trends to Watch in 2026",
            desc: "Discover the coolest fabrics and styles to stay trendy this summer...",
            image: "https://images.unsplash.com/photo-1632194978058-4f2f48bc68c2?q=80&w=774&auto=format&fit=crop",
            date: "March 1, 2026",
            author: "Admin",
            quote: "Fashion is the armor to survive the reality of everyday life.",
            summary: "2026 is all about breezy comfort and bold pastels. We are seeing a huge comeback of linen co-ord sets and crochet handbags. If you want to stay cool and stylish, opt for light-weighted fabrics like organic cotton and colors like lavender and mint green.",
            points: ["Linen Co-ords", "Pastel Palettes", "Crochet Accessories"]
        },
        {
            id: 2,
            title: "How to Style Your Red Sneakers",
            desc: "Red sneakers are a statement. Here is how you can pair them with any outfit...",
            image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=464&auto=format&fit=crop",
            date: "Feb 28, 2026",
            author: "Style Guide",
            quote: "Be bold, be brave, and let your shoes do the talking.",
            summary: "Red sneakers are the ultimate statement piece. The secret to styling them is keeping the rest of your outfit neutral. Try pairing them with classic blue denim and a crisp white t-shirt for that effortless streetwear vibe.",
            points: ["Neutral Tones", "Denim Pairing", "Confidence is Key"]
        },
        {
            id: 3,
            title: "Skincare Routine for Glowing Skin",
            desc: "Using the right serum can change your life. Learn the basics of hydration...",
            image: "https://images.unsplash.com/photo-1601049413574-214d105b26e4?q=80&w=873&auto=format&fit=crop",
            date: "Feb 25, 2026",
            author: "Beauty Expert",
            quote: "Your skin is an investment, not an expense.",
            summary: "Glowing skin starts with hydration. A perfect routine for 2026 involves a gentle cleanser, followed by a Vitamin C serum for brightening. Never skip your moisturizer and, most importantly, apply sunscreen even if you are indoors.",
            points: ["Gentle Cleansing", "Vitamin C Boost", "Daily Sun Protection"]
        },
        {
            id: 4,
            title: "Accessory Essentials: Level Up Your Look",
            desc: "From statement necklaces to elegant purses, find out which accessories are a must-have this season...",
            image: "https://images.unsplash.com/photo-1511556820780-d912e42b4980?auto=format&fit=crop&w=600&q=80",
            date: "Feb 20, 2026",
            author: "Trend Setter",
            quote: "Accessories are the exclamation point of a woman's outfit.",
            summary: "Accessories are the soul of an outfit. This year, layered gold chains and chunky '90s-style hoops are winning hearts. A simple dress can be transformed into a party look just by adding a statement belt or a silk scarf.",
            points: ["Layered Gold Chains", "Statement Belts", "Chunky Hoops"]
        },
        {
            id: 5,
            title: "The Ultimate Guide to Matte Lipsticks",
            desc: "Long-lasting, smudge-proof, and bold. Here's everything you need to know about choosing the right shade...",
            image: "https://images.unsplash.com/photo-1570088727237-68500d217455?q=80&w=451&auto=format&fit=crop",
            date: "Feb 15, 2026",
            author: "Beauty Guru",
            quote: "Put on some lipstick and pull yourself together.",
            summary: "The perfect matte lip requires preparation. Always exfoliate your lips before application to avoid cracks. This season, deep berry and nude terracotta shades are trending for that long-lasting smudge-proof finish.",
            points: ["Lip Exfoliation", "Nude Terracotta", "Matching Liners"]
        },
        {
            id: 6,
            title: "Sustainable Fashion: Chic and Conscious",
            desc: "Learn how to build a wardrobe that looks good and feels good for the planet. Style meets ethics...",
            image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=600&q=80",
            date: "Feb 10, 2026",
            author: "Eco Stylist",
            quote: "There is no beauty in the finest cloth if it makes hunger and unhappiness.",
            summary: "Choosing sustainable fashion means choosing a better future. Look for brands that use recycled materials and fair-trade practices. Building a 'Capsule Wardrobe' with high-quality basics that last for years is the new trend.",
            points: ["Recycled Materials", "Fair-Trade Fabrics", "Capsule Wardrobes"]
        }
    ];

    const shareLinks = [
        { name: 'Facebook', icon: <FaFacebook />, color: 'hover:bg-blue-600' },
        { name: 'Twitter', icon: <FaTwitter />, color: 'hover:bg-sky-500' },
        { name: 'LinkedIn', icon: <FaLinkedinIn />, color: 'hover:bg-blue-700' },
        { name: 'WhatsApp', icon: <IoLogoWhatsapp />, color: 'hover:bg-green-500' },
    ];

    // particular prod detail
    const blogDetail = blogData.find((item) => item.id === parseInt(blogId));

    // exclude current blog
    const excludeCurrentBlog = blogData.filter((item) => item.id !== blogDetail.id);

    // Baki bache blogs ko shuffle (random) karke pehle 3 utha lein
    const randomBlog = React.useMemo(() => {
        return [...excludeCurrentBlog].sort(() => 0.5 - Math.random()).slice(0, 3);
    }, [blogDetail.id]);

    if (!blogDetail) return <div>Blog not found!</div>;

    return (
        <section className="bg-white">

            {/* Top Section */}
            <div className="relative bg-linear-to-b from-pink-50 to-pink-50 py-12 md:py-24 lg:py-28 px-6 overflow-hidden">

                {/* Subtle Decorative Elements (Optional) */}
                <div className="hidden md:block absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-pink-200 rounded-full blur-3xl opacity-30"></div>
                <div className="hidden md:block absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-pink-300 rounded-full blur-3xl opacity-20"></div>

                <div className="max-w-4xl mx-auto relative z-10">

                    {/* badge */}
                    <div className="flex justify-center md:mb-6">
                        <span className="inline-block px-2 py-1 md:px-4 md:py-1.5 mb-6 text-[10px] md:text-xs font-bold tracking-widest text-pink-600 uppercase bg-white rounded-full shadow-sm border border-pink-100">
                            Lifestyle & Fashion
                        </span>
                    </div>

                    {/* Blog Title */}
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-8 text-center leading-tight tracking-tight px-2">
                        {blogDetail.title}
                    </h1>

                    {/* Author & Meta Info */}
                    <div className='flex items-center justify-center gap-3 md:gap-6'>
                        <div className="relative">
                            <img
                                src={Logo}
                                alt="Author"
                                className='w-14 h-14 md:w-18 md:h-18 object-contain rounded-full bg-white p-2 border border-pink-200 shadow-md'
                            />
                        </div>

                        <div className='h-10 w-px bg-pink-200 hidden md:block'></div> {/* Vertical Divider */}

                        <div className='flex flex-col'>
                            <h4 className='text-gray-900 font-bold text-md md:text-lg leading-none'>{blogDetail.author}</h4>
                            <div className="flex items-center gap-2 text-gray-500 text-xs md:text-sm mt-2">
                                <span>{blogDetail.date}</span>
                                <span className="w-1 h-1 bg-pink-300 rounded-full"></span>
                                <span>5 min read</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 lg:px-6 py-6 md:pt-16">

                <div className='shadow-xl md:shadow-2xl rounded-2xl md:rounded-3xl overflow-hidden'>
                    <img
                        src={blogDetail.image}
                        alt='Blog Image'
                        className='h-64 sm:h-96 md:h-125 w-full object-cover shadow-inner'
                    />
                </div>
            </div>

            {/* Content Area */}
            <div className="max-w-3xl mx-auto px-4 py-5 md:py-10">

                {/* content */}
                <article className="prose prose-lg max-w-none">

                    <p className="text-gray-700 text-lg md:text-xl leading-relaxed first-letter:text-5xl md:first-letter:text-7xl first-letter:font-bold first-letter:text-pink-500 first-letter:mr-3 first-letter:float-left">
                        {blogDetail.summary}
                    </p>

                    <div className="my-10 border-l-4 border-pink-500 bg-pink-50 p-8 rounded-r-2xl italic">
                        <p className="text-md md:text-2xl text-gray-800 font-medium">
                            "{blogDetail.quote}"
                        </p>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 md:mt-12 mb-6">Why this matters in 2026?</h2>
                    <p className="text-gray-600 leading-8 mb-6">
                        {blogDetail.desc}
                    </p>

                    <ul className="space-y-4 text-gray-700 list-disc pl-5 mb-10 text-md md:text-lg">
                        {blogDetail.points.map((point, i) => (
                            <li key={i}>
                                <span className="font-bold text-pink-600">Trend {i + 1}:</span> {point}
                            </li>
                        ))}
                    </ul>

                </article>

                {/* Share Section */}
                <div className="flex flex-col md:flex-row items-center justify-between border-y border-gray-100 py-6 my-5 md:my-12 gap-4">
                    <h5 className="text-gray-900 font-bold uppercase tracking-widest text-xs">Share this story</h5>
                    <div className="flex gap-4">
                        {shareLinks.map((links, index) => (
                            <button
                                key={index}
                                className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-500 hover:bg-pink-500 hover:text-white transition-all duration-300 cursor-pointer text-md shadow-sm"
                                title={`Share on ${links}`}
                            >
                                {links.icon}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Related Posts */}
            <div className="max-w-6xl mx-auto px-4 lg:px-6 bg-gray-50/50 rounded-3xl mb-20">
                <div className="flex justify-between items-end md:mb-10">

                    <div>
                        <span className="text-pink-500 font-bold text-xs uppercase tracking-[0.2em]">Up Next</span>
                        <h3 className="text-2xl md:text-3xl font-black text-gray-900 mt-2">Related Stories</h3>
                    </div>

                    {/* vew all of desktop */}
                    <button
                        onClick={() => navigate('/blog')}
                        className="hidden md:flex text-pink-600 font-bold text-sm hover:underline cursor-pointer">
                        View All →
                    </button>
                </div>

                {/* vew all of mob */}
                <button
                    onClick={() => navigate('/blog')}
                    className="md:hidden w-full my-3 text-pink-600 font-bold text-sm text-end hover:underline cursor-pointer">
                    View All →
                </button>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {randomBlog.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => {
                                navigate(`/blog_detail/${item.id}`);
                                window.scrollTo({ top: 0, behavior: 'smooth' }); // Naye blog par upar scroll karne ke liye
                            }}
                            className="group cursor-pointer"
                        >
                            <div className="relative overflow-hidden rounded-xl md:rounded-2xl aspect-video mb-4">
                                <img
                                    src={item.image}
                                    alt="Blog Image"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            <h4 className="font-bold text-gray-900 group-hover:text-pink-500 transition-colors line-clamp-2 leading-snug">
                                {item.title}
                            </h4>
                            <p className="text-gray-500 text-xs mt-2 uppercase tracking-tighter font-semibold">{item.date}</p>
                        </div>
                    ))}
                </div>

            </div>

            {/* comment post */}
            <div className="max-w-3xl mx-auto my-16 md:my-18 px-4">
                <h4 className="text-xl font-bold mb-6 text-gray-900">Leave a Reply</h4>
                <textarea
                    className="w-full p-6 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-pink-200 outline-none text-gray-600 transition-all"
                    placeholder="What are your thoughts on this trend?"
                    rows="4"
                ></textarea>
                <button className="mt-4 bg-gray-900 text-white px-6 py-2 md:px-8 md:py-3 rounded-full font-bold hover:bg-pink-600 transition-all active:scale-95 cursor-pointer">
                    Post Comment
                </button>
            </div>

        </section>
    )
}

export default BlogDetail