
import express from 'express';
import authMiddleware from '../Middlewares/authMiddleware.js';
import {
    addToCart,
    getCart,
    countCart,
    updateQuantity,
    removeFromCart,
    clearCart
} from '../Controllers/cartController.js';

const router = express.Router();

router.post('/cart-add', authMiddleware(['user']), addToCart);
router.get('/cart-get', authMiddleware(['user']), getCart);
router.put('/cart-quantity-update', authMiddleware(['user']), updateQuantity);
router.delete('/cart-remove/:prod_id', authMiddleware(['user']), removeFromCart);
router.get('/cart-count', authMiddleware(['user']), countCart);
router.delete('/cart-clear', authMiddleware(['user']), clearCart);

export default router;