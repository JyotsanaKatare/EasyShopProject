
//updated
import React from 'react'
import { useNavigate } from 'react-router-dom';

function Blog() {

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

    return (
        <section className="bg-white">

            {/* Top Section */}
            <div className="bg-linear-to-b from-pink-50 to-pink-50 py-12 md:py-24 lg:py-28 px-6 text-center overflow-hidden">

                <div className="max-w-4xl mx-auto">
                    
                    {/* Small Badge */}
                    <span className="inline-block px-2 py-1 md:px-4 md:py-1.5 mb-6 text-[10px] md:text-xs font-bold tracking-widest text-pink-600 uppercase bg-white rounded-full shadow-sm border border-pink-100">
                        Fresh Perspectives
                    </span>

                    {/* Main Heading */}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-6 tracking-tighter leading-tight">
                        Our Latest <span className="text-transparent bg-clip-text bg-linear-to-r from-pink-500 to-rose-400">Blogs</span>
                    </h1>

                    {/* Subtext */}
                    <p className="text-gray-500 max-w-xl mx-auto text-sm md:text-lg lg:text-xl leading-relaxed font-light">
                        Stay ahead of the curve with our curated <span className="text-gray-800">fashion tips</span> and <span className="text-gray-800">seasonal trends</span>.
                    </p>

                    {/* Floating Line (Optional) */}
                    <div className="mt-8 hidden sm:flex justify-center">
                        <div className="w-16 h-1.5 bg-pink-500 rounded-full"></div>
                        <div className="w-4 h-1.5 bg-pink-300 rounded-full ml-2"></div>
                    </div>
                </div>
            </div>
            
            {/* below section */}
            <div className="max-w-6xl mx-auto px-4 lg:px-6 py-10 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogData.map((blog, index) => (
                        <div
                            key={index}
                            onClick={() => navigate(`/blog_detail/${blog.id}`)}
                            className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">

                            {/* Image Section */}
                            <div className="relative overflow-hidden">
                                <img
                                    src={blog.image}
                                    alt={blog.title}
                                    loading="lazy"
                                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-4 left-4 bg-pink-500 text-white text-xs px-3 py-1 rounded-full">
                                    {blog.date}
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="p-6">
                                <p className="text-pink-500 text-sm font-medium mb-2">By {blog.author}</p>
                                <h2 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-pink-500 transition-colors">
                                    {blog.title}
                                </h2>
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                    {blog.desc}
                                </p>

                                <button
                                    className="text-pink-600 font-semibold border-b-2 border-pink-600 hover:text-pink-400 hover:border-pink-400 transition-all cursor-pointer">
                                    Read More
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Blog;