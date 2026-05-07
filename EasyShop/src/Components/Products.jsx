
import React from 'react'
import { useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';

import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import { IoMdStar } from "react-icons/io";
import { IoMdStarOutline } from "react-icons/io";
import ProductsFilterPart from './ProductsFilterPart';
import Breadcrumbs from './Breadcrumbs';
import { useCart } from './CartContext';
import { useWishList } from './WishListContext';
import EasyShopLoader from './EasyShopLoader';

import { useProductsByCategory } from '../hook/uesProducts';
import { useEffect } from 'react';

function Products() {

    const { catId, catName } = useParams();
    const { addToCart } = useCart();
    const { wishListItems, addToWishList } = useWishList();

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const preSelectedSubCat = searchParams.get('subCatId');

    const [activeFilters, setActiveFilters] = useState(
        preSelectedSubCat ? { subCatId: preSelectedSubCat } : {}
    );

    const { data: allProducts, isLoading, isError } = useProductsByCategory(catId, activeFilters);

    // Product Detail Page ke andar
    const breadcrumbItems = [
        { label: "Home", path: "/" },
        {
            label: catName || "All Products",
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

    if (isLoading && !allProducts) return <EasyShopLoader />;
    if (isError) return <div className="p-20 text-center text-red-500">Error loading products</div>;

    if (!isLoading && (!allProducts || allProducts.length === 0)) {
        return <div className="p-20 text-center">No products found</div>;
    }

    return (
        <section className="w-full py-10">
            <div className="max-w-6xl mx-auto flex flex-wrap md:flex-nowrap gap-6">

                {/* filters part */}
                <div className='w-[30%] bg-gray-50 rounded-lg'>
                    <ProductsFilterPart
                        activeCatId={catId}
                        catName={catName}
                        onFilterChange={setActiveFilters}
                        defaultSubCat={preSelectedSubCat}
                    />
                </div>

                {/* products part */}
                <div className='w-[70%]'>

                    {/* breadcrumps */}
                    <Breadcrumbs items={breadcrumbItems} />

                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

                        {allProducts.map((product, index) => {

                            const isFavorite = wishListItems.some((wishItem) => {
                                const wishId = wishItem.productId?._id || wishItem._id || wishItem.id;
                                return wishId === product._id;
                            });

                            return (
                                <div
                                    key={product._id || index}
                                    onClick={() => navigate(`/product_detail/${product._id}/${product.prodName}`)}
                                    className="cursor-pointer bg-white rounded-lg shrink-0 shadow-md">

                                    <div className="relative w-full aspect-square">
                                        <img
                                            src={product.prodImage}
                                            alt={product.prodName}
                                            className="h-full w-full rounded-t-lg object-cover transition-transform duration-700 hover:scale-102"
                                        />

                                        {/* Wishlist Button */}
                                        <div
                                            onClick={(e) => handleWishList(e, product)}
                                            className={`absolute right-3 top-3 p-2 rounded-full shadow-md cursor-pointer transition-all duration-300 z-10 
                        ${isFavorite ? 'bg-pink-500 text-white' : 'bg-white/90 text-gray-600 hover:bg-white'}`}
                                        >
                                            {isFavorite ? <GoHeartFill className='text-xl' /> : <GoHeart className='text-xl' />}
                                        </div>
                                    </div>

                                    {/* Content Section */}
                                    <div
                                        className='flex flex-col items-center justify-center  text-center flex-1 p-4 bg-white'>

                                        <p className='text-gray-900 font-bold text-sm uppercase tracking-widest mb-1'>
                                            {product.prodName}
                                        </p>

                                        <h3 className='line-clamp-2 text-gray-800 text-[15px] hover:text-pink-500 cursor-pointer transition-colors'>
                                            {product.description}
                                        </h3>

                                        {/* Price Tag */}
                                        <div className="flex items-center gap-2 mt-2">
                                            <span
                                                className="text-pink-500 text-lg font-bold">
                                                ₹{product.price}
                                            </span>

                                            <span
                                                className="text-gray-400 line-through text-xs">
                                                ₹{product.originalPrice}
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
                                            onClick={(e) => handleAddToCart(e, product)}
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