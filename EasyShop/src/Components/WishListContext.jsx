
import toast from 'react-hot-toast';
import { createContext, useContext, useEffect, useState } from "react";

const wishListContext = createContext();

export const WishListProvider = ({ children }) => {

    // localStorage se data lena
    const [wishListItems, setWishListItems] = useState(() => {

        const savedWishList = localStorage.getItem("myWishList");
        return savedWishList ? JSON.parse(savedWishList) : [];
    });

    // localStorage me data insert
    useEffect(() => {
        localStorage.setItem("myWishList", JSON.stringify(wishListItems));
    }, [wishListItems]);

    // add
    const addToWishList = (product) => {
        const prodId = product.id || product._id;

        setWishListItems((prev) => {
            const isExist = prev.find((item) => (item.id || item._id) === prodId);

            if (isExist) {
                toast.success("Removed from wishlist");
                return prev.filter((item) => (item.id || item._id) !== prodId);
            } else {
                toast.success(`${product.name} added to wishlist!`, {
                    style: {
                        border: '1px solid #fbcfe8', // Halka pink border
                        padding: '16px',
                        color: '#be185d', // Dark pink text
                    },
                    iconTheme: {
                        primary: '#ec4899', // Pink icon
                        secondary: '#FFFAEE',
                    },
                });
                return [...prev, { ...product, id: prodId }];
            }
        });
    };


    const removeFromWishList = (id) => {
        setWishListItems((prev) => prev.filter(item => item.id !== id));
    };

    return (
        <wishListContext.Provider value={{ wishListItems, addToWishList, removeFromWishList }}>
            {children}
        </wishListContext.Provider>
    )
}

export const useWishList = () => useContext(wishListContext); 