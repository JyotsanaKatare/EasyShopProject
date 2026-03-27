
//updated
import React from 'react'

function ContactUs() {
    return (
        <section className="bg-white min-h-[70vh]">

            {/* Top Section */}
            <div className="bg-linear-to-b from-pink-50 to-pink-50 py-12 md:py-24 lg:py-28 px-6 text-center overflow-hidden">

                <div className="max-w-3xl mx-auto">

                    {/* badge */}
                    <span className="inline-block px-2 py-1 md:px-4 md:py-1.5 mb-6 text-[10px] md:text-xs font-bold tracking-widest text-pink-600 uppercase bg-white rounded-full shadow-sm border border-pink-100">
                        Get In Touch
                    </span>

                    {/* Heading with better tracking */}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-6 tracking-tighter leading-tight">
                        Contact <span className="text-pink-500">Easy Shop</span>
                    </h1>

                    {/* Subtext */}
                    <p className="text-gray-500 max-w-xl mx-auto text-sm md:text-lg lg:text-xl leading-relaxed font-light italic">
                        "We would love to hear from you. Our team is always here to chat."
                    </p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 lg:px-6 py-6 md:py-16 flex flex-col md:flex-row gap-8">

                {/* left section */}
                <div className='w-full md:w-[60%] '>

                    <h1 className='text-md md:text-2xl font-bold text-start uppercase mb-4 md:mb-8 text-gray-800 tracking-tight'>
                        Submit your query
                    </h1>

                    <div className='space-y-4 md:space-y-5'>

                        {/* first nd last name */}
                        <div className='flex flex-col md:flex-row gap-4'>
                            <div className='flex-1'>
                                <input
                                    type="text"
                                    placeholder='First Name *'
                                    className='w-full border border-gray-400 py-3 px-2 md:px-4 rounded-md md:rounded-xl outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-100 transition-all'
                                />
                            </div>

                            <div className='flex-1'>
                                <input
                                    type="text"
                                    placeholder='Last Name *'
                                    className='w-full border border-gray-400 py-3 px-2 md:px-4 rounded-md md:rounded-xl outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-100 transition-all'
                                />
                            </div>
                        </div>

                        {/* email mob */}
                        <div className='flex flex-col md:flex-row gap-4'>
                            <div className='flex-1'>
                                <input
                                    type="email"
                                    placeholder='Email *'
                                    className='w-full border border-gray-400 py-3 px-2 md:px-4 rounded-md md:rounded-xl outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-100 transition-all'
                                />
                            </div>

                            <div className='flex-1'>
                                <input
                                    type="text"
                                    placeholder='Mobile Number *'
                                    className='w-full border border-gray-400 py-3 px-2 md:px-4 rounded-md md:rounded-xl outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-100 transition-all'
                                />
                            </div>
                        </div>

                        {/* title */}
                        <div className='flex-1'>
                            <textarea
                                type="text"
                                placeholder="Title *"
                                className='w-full h-30 md:h-40 border border-gray-400 py-3 px-2 md:px-4 rounded-md md:rounded-xl outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-100 transition-all'>
                            </textarea>
                        </div>

                        {/* category nd sub category */}
                        <div className='flex flex-col md:flex-row gap-4'>
                            <div className='flex-1'>
                                <input
                                    type="text"
                                    placeholder='Category *'
                                    className='w-full border border-gray-400 py-3 px-2 md:px-4 rounded-md md:rounded-xl outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-100 transition-all'
                                />
                            </div>

                            <div className='flex-1'>
                                <input
                                    type="text"
                                    placeholder='Sub Category *'
                                    className='w-full border border-gray-400 py-3 px-2 md:px-4 rounded-md md:rounded-xl outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-100 transition-all'
                                />
                            </div>
                        </div>

                        {/* Order Number */}
                        <div className=''>
                            <input
                                type="text"
                                placeholder='Order Number *'
                                className='w-full border border-gray-400 py-3 px-2 md:px-4 rounded-md md:rounded-xl outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-100 transition-all'
                            />
                        </div>

                        {/* comments */}
                        <div className='flex-1'>
                            <textarea
                                type="text"
                                placeholder="Write comments here *"
                                className='w-full h-30 md:h-40 border border-gray-400 py-3 px-2 md:px-4 rounded-md md:rounded-xl outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-100 transition-all'>
                            </textarea>
                        </div>

                        {/* button */}
                        <button className="w-full md:w-auto bg-pink-500 text-white hover:bg-pink-600 px-10 py-3 rounded-md md:rounded-full font-bold transition-all active:scale-95 cursor-pointer shadow-lg">
                            Submit Query
                        </button>
                    </div>

                </div>

                {/* right section */}
                <div className='w-full md:w-[40%] bg-white self-start sticky top-24 p-5 md:p-8 border border-pink-100 rounded-3xl my-4 shadow-md'>

                    {/* Office Section */}
                    <div className='mb-6'>
                        <h1 className='text-md font-bold text-pink-500 tracking-widest mb-2 uppercase'>Our Office</h1>
                        <div className='space-y-0.5'>
                            <p className='text-[16px] font-semibold text-gray-800'>Easy Shop</p>
                            <p className='text-md text-gray-600 leading-relaxed'>
                                Umang Tower, 5th Floor, Mindspace,<br />
                                Off. Link Road, Mumbai, MH.
                            </p>
                        </div>
                    </div>

                    {/* Contact Section */}
                    <div className='mb-6'>
                        <h1 className='text-md font-bold text-pink-500 tracking-widest mb-2 uppercase'>Connect With Us</h1>
                        <div className='space-y-2'>
                            <p className='text-md text-gray-700 flex items-center gap-2'>
                                <span className='font-bold text-gray-900'>Call :</span> 0987654321
                            </p>
                            <p className='text-md text-gray-700'>
                                <span className='font-bold text-gray-900'>Email :</span> customercare@easyshop.com
                            </p>
                            <p className='text-sm text-gray-500 italic'>(Operational: 08:00 AM to 10:00 PM)</p>

                            {/* WhatsApp Button */}
                            <button className='mt-2 flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-green-600 transition-all cursor-pointer'>
                                <span>WhatsApp Chat With Us</span>
                            </button>
                        </div>
                    </div>

                    {/* Grievance Section - Slightly different background to separate it */}
                    <div className='bg-pink-50 p-5 rounded-2xl border border-pink-100'>
                        <h1 className='text-[17px] font-bold text-gray-800 mb-2'>Grievance Redressal:</h1>
                        <p className='text-[15px] text-gray-500 leading-snug mb-4'>
                            In case of unsatisfactory resolution, you may contact our Grievance Officer:
                        </p>
                        <div className='space-y-1 text-md'>
                            <p className='text-gray-700'><span className='font-semibold'>Officer:</span> Sanya Malhotra</p>
                            <p className='text-gray-700'><span className='font-semibold'>Email:</span> Grievance@easyshop.com</p>
                            <p className='text-gray-700'><span className='font-semibold'>Timing:</span> Mon - Fri (10am - 5pm)</p>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default ContactUs;