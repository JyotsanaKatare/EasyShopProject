
import mongoose from 'mongoose';
import Cart from '../Models/cartModelSchema.js';
import Product from '../Models/productModelSchema.js';

export const addToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId, quantity, selectedColor, selectedSize, prodImage } = req.body;

        if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ success: false, message: "Invalid Product ID" });
        }

        const productExists = await Product.findById(productId);
        if (!productExists) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({
                userId,
                items: [{
                    productId,
                    quantity: quantity || 1,
                    selectedColor: selectedColor || null,
                    selectedSize: selectedSize || null,
                    prodImage: prodImage || null
                }]
            });
        } else {
            // match by productId AND color AND size
            // same product different color = different cart item
            const itemIndex = cart.items.findIndex(item =>
                item.productId.toString() === productId &&
                item.selectedColor === (selectedColor || null) &&
                item.selectedSize === (selectedSize || null)
            );

            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += (quantity || 1);
            } else {
                cart.items.push({
                    productId,
                    quantity: quantity || 1,
                    selectedColor: selectedColor || null,
                    selectedSize: selectedSize || null,
                    prodImage: prodImage || null
                });
            }
        }

        await cart.save();

        const populatedCart = await cart.populate('items.productId', 'prodName price prodImage stock');

        res.status(200).json({
            success: true,
            message: "Item added to cart successfully",
            data: populatedCart
        });

    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const getCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const cart = await Cart.findOne({ userId }).populate({
            path: 'items.productId',
            select: 'prodName price prodImage stock slug'
        });

        if (!cart || cart.items.length === 0) {
            return res.status(200).json({
                success: true,
                message: "Cart is empty",
                data: {
                    items: []
                }
            });
        }

        return res.status(200).json({
            success: true,
            message: "Here is cart list",
            data: cart
        });

    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({
            success: false,
            message: "Server Error Occur"
        });
    }
};

export const updateQuantity = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId, action } = req.body;

        if (!productId || !action) {
            return res.status(400).json({
                success: false,
                message: "ProductId and action is require"
            });
        }

        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }

        const index = cart.items.findIndex(item => item.productId.toString() === productId);

        if (index === -1) {
            return res.status(404).json({
                success: false,
                message: "Product not in cart"
            });
        }

        // Action Logic
        if (action === "increase") {
            cart.items[index].quantity += 1;
        } else if (action === "decrease") {
            if (cart.items[index].quantity > 1) {
                cart.items[index].quantity -= 1;
            } else {
                return res.status(400).json({
                    success: false,
                    message: "Minimum quantity reached. Use remove instead."
                });
            }
        } else {
            return res.status(400).json({
                success: false,
                message: "Invalid action"
            });
        }

        const populatedCart = await cart.populate('items.productId', 'prodName price prodImage stock');

        await cart.save();
        return res.status(200).json({
            success: true,
            message: "Quantity updated",
            data: populatedCart
        });

    } catch (err) {
        console.log("Error :", err);
        res.status(500).json({
            success: false,
            message: "Server Error Occur"
        });
    }
};

export const removeFromCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { prod_id } = req.params;

        const updatedCart = await Cart.findOneAndUpdate(
            { userId },
            { $pull: { items: { productId: prod_id } } },
            { new: true }
        ).populate('items.productId', 'prodName price prodImage');

        res.status(200).json({
            success: true,
            message: "Item removed from cart",
            data: updatedCart
        });

    } catch (err) {
        console.log("Error :", err);
        res.status(500).json({
            success: false,
            message: "Server Error Occur"
        });
    }
};

export const clearCart = async (req, res) => {
    try {
        const userId = req.user.id;

        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart already empty or not found"
            });
        }

        cart.items = [];

        await cart.save();

        return res.status(200).json({
            success: true,
            message: "Oops... Cart Empty Now!",
            data: cart
        });

    } catch (err) {
        console.log("Error : ", err);
        return res.status(500).json({
            success: false,
            message: "Server Error Occur"
        });
    }
};

export const countCart = async (req, res) => {
    try {
        const userId = req.user.id;

        const cart = await Cart.findOne({ userId });

        const count = cart ? cart.items.reduce((sum, item) => sum + item.quantity, 0) : 0;

        const uniqueProductsCount = cart ? cart.items.length : 0;

        res.status(200).json({
            success: true,
            uniqueProducts: uniqueProductsCount,
            message: `Total cart items are ${count}`
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server Error Occur"
        });
    }
};