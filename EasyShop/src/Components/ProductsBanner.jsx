
import React from 'react'
import AllProdBanner from '../assets/Images/AllProdBanner.jpg';

function ProductsBanner() {
    return (
        <section className='w-full'>
            <div className='w-full h-80 md:h-110 relative overflow-hidden'>
                <img
                    src={AllProdBanner}
                    alt="All Products Banner"
                    className='w-full h-full object-cover'
                />

                <div className="absolute inset-0 bg-black/30"></div>

                <div className='absolute inset-0 flex flex-col items-center justify-center px-4'>
                    <h2 className='font-extrabold text-3xl md:text-[52px] text-center text-white tracking-tight leading-tight'>
                        Elevate Your <span className="text-pink-500">Everyday</span> Style
                    </h2>
                </div>
            </div>
        </section>
    )
}

export default ProductsBanner;