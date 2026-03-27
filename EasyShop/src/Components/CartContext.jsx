
import toast from 'react-hot-toast';
import { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {

    // 1. Load data from LocalStorage on Startup
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem("myCart");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // 2. Save data to LocalStorage whenever cartItems changes
    useEffect(() => {
        localStorage.setItem("myCart", JSON.stringify(cartItems));
    }, [cartItems])

    // add
    const addToCart = (product) => {
        setCartItems((prev) => {

            // Optional: Check if item already exists to avoid duplicates
            const isExist = prev.find((item) => item.id === product.id);

            if (isExist) {
                // Agar pehle se hai, toh quantity badha do
                toast.success("Item quantity updated!");
                return prev.map((item) =>
                    item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
                );
            }

            // Agar naya hai, toh quantity 1 ke saath add karo
            toast.success(`${product.name} added to cart!`, {
                style: {
                    border: '1px solid #fbcfe8', 
                    padding: '16px',
                    color: '#be185d', 
                },
                iconTheme: {
                    primary: '#ec4899', 
                    secondary: '#FFFAEE',
                },
            });

            return [...prev, { ...product, quantity: 1 }];
        });
    };

    // remove 
    const removeFromCart = (id) => {
        setCartItems((prev) => prev.filter(item => item.id !== id));
    };

    //update quantity
    const updateQuantity = (id, action) => {
        setCartItems((prev) =>
            prev.map((item) => {
                if (item.id === id) {
                    if (action === "inc") {
                        return { ...item, quantity: (item.quantity || 1) + 1 };
                    } else if (action === "dec" && item.quantity > 1) {
                        return { ...item, quantity: item.quantity - 1 };
                    }
                }
                return item;
            })
        )
    };

    // Cart items se total quantity nikalne ke liye
    const cartCount = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);

    // Cart items se total price nikalne ke liye
    const cartTotal = cartItems.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, cartCount, cartTotal }}>
            {children}
        </CartContext.Provider>
    )

}

export const useCart = () => useContext(CartContext);