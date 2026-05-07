
import toast from 'react-hot-toast';
import useAuthStore from '../store/useAuthStore';
import API from '../api/axiosConfig.js';
import { createContext, useState, useContext, useEffect } from "react";
import { useAddToCart, useGetCart, useRemoveFromCart, useUpdateCartQuantity } from '../hook/useCart';

const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const { user } = useAuthStore();

    // cart for login user
    const { data: serverCart = [] } = useGetCart();
    const { mutate: addToCartDB } = useAddToCart();
    const { mutate: removeFromCartDB } = useRemoveFromCart();
    const { mutate: updateQuantityDB } = useUpdateCartQuantity()

    // local state - for guest + login user 
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem("myCart");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        if (!user || !serverCart || serverCart.length === 0) return;

        const converted = serverCart.map(item => ({
            _id: item.productId?._id,
            prodName: item.productId?.prodName,
            prodImage: item.prodImage || item.productId?.prodImage,
            price: item.productId?.price,
            slug: item.productId?.slug,
            quantity: item.quantity,
            selectedColor: item.selectedColor || null, 
            selectedSize: item.selectedSize || null,   
        }));

        setCartItems(prev => {
            const prevStr = JSON.stringify(prev);
            const newStr = JSON.stringify(converted);
            if (prevStr === newStr) return prev;
            return converted;
        });
    }, [serverCart]);

    // Save to localStorage only for guests
    useEffect(() => {
        if (!user) {
            localStorage.setItem("myCart", JSON.stringify(cartItems));
        }
    }, [cartItems]);

    // Watch for user logout — clear cart instantly
    useEffect(() => {
        if (!user) {
            setCartItems([]);
        }
    }, [user]);

    // add
    const addToCart = (product) => {
        const prodId = product._id || product.id;

        if (user) {
            addToCartDB({
                productId: prodId,
                quantity: 1,
                selectedColor: product.selectedColor || null,
                selectedSize: product.selectedSize || null,
                prodImage: product.prodImage || null
            });

            setCartItems(prev => {
                // match by prodId AND color+size combination
                const isExist = prev.find(item =>
                    (item._id || item.id) === prodId &&
                    item.selectedColor === (product.selectedColor || null) &&
                    item.selectedSize === (product.selectedSize || null)
                );
                if (isExist) {
                    toast.success("Item quantity updated!");
                    return prev.map(item =>
                        (item._id || item.id) === prodId &&
                            item.selectedColor === (product.selectedColor || null) &&
                            item.selectedSize === (product.selectedSize || null)
                            ? { ...item, quantity: (item.quantity || 1) + 1 }
                            : item
                    );
                }
                toast.success(`Product added to cart!`, {
                    style: { border: '1px solid #fbcfe8', padding: '16px', color: '#be185d' },
                    iconTheme: { primary: '#ec4899', secondary: '#FFFAEE' },
                });

                return [...prev, {
                    _id: prodId,
                    prodName: product.prodName || product.name,
                    prodImage: product.prodImage || product.img,
                    price: product.price,
                    slug: product.slug,
                    quantity: 1,
                    selectedColor: product.selectedColor || null,
                    selectedSize: product.selectedSize || null,
                }];
            });
        } else {
            // guest user — same logic
            setCartItems(prev => {
                const isExist = prev.find(item =>
                    (item._id || item.id) === prodId &&
                    item.selectedColor === (product.selectedColor || null) &&
                    item.selectedSize === (product.selectedSize || null)
                );
                if (isExist) {
                    toast.success("Item quantity updated!");
                    return prev.map(item =>
                        (item._id || item.id) === prodId &&
                            item.selectedColor === (product.selectedColor || null) &&
                            item.selectedSize === (product.selectedSize || null)
                            ? { ...item, quantity: (item.quantity || 1) + 1 }
                            : item
                    );
                }
                toast.success(`Product added to cart!`);
                return [...prev, {
                    ...product,
                    _id: prodId,
                    quantity: 1,
                    selectedColor: product.selectedColor || null,
                    selectedSize: product.selectedSize || null,
                }];
            });
        }
    };

    // remove 
    const removeFromCart = (id) => {
        if (user) {
            removeFromCartDB(id);
        }
        setCartItems(prev => prev.filter(item => (item._id || item.id) !== id));
    };

    //update quantity
    const updateQuantity = (id, action) => {
        if (user) {
            const currentItem = cartItems.find(item => (item._id || item.id) === id);

            if (action === 'dec' && currentItem?.quantity <= 1) return;

            updateQuantityDB({
                productId: id,
                action: action === 'inc' ? 'increase' : 'decrease'
            });
        }

        setCartItems(prev =>
            prev.map(item => {
                if ((item._id || item.id) === id) {
                    if (action === "inc") return { ...item, quantity: (item.quantity || 1) + 1 };
                    if (action === "dec" && item.quantity > 1) return { ...item, quantity: item.quantity - 1 };
                }
                return item;
            })
        );
    };

    // merge cart
    const mergeGuestCartToDB = async () => {
        const savedCart = localStorage.getItem("myCart");
        if (!savedCart) return;

        const guestItems = JSON.parse(savedCart);
        if (!guestItems || guestItems.length === 0) return;

        // add each guest item to DB cart
        for (const item of guestItems) {
            const prodId = item._id || item.id;
            if (prodId) {
                await API.post('/cart/cart-add', {
                    productId: prodId,
                    quantity: item.quantity || 1
                });
            }
        }

        // clear localStorage after merging
        localStorage.removeItem("myCart");
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem("myCart");
    };

    // Cart items se total quantity nikalne ke liye
    const cartCount = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);

    // Cart items se total price nikalne ke liye
    const cartTotal = cartItems.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            cartCount,
            cartTotal,
            clearCart,
            mergeGuestCartToDB
        }}>
            {children}
        </CartContext.Provider>
    )

}

export const useCart = () => useContext(CartContext);