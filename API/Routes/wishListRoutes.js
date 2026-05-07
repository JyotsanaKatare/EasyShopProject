
import express from 'express';
import authMiddleware from '../Middlewares/authMiddleware.js';
import {
    addWishList,
    getWishList,
    clearWishList,
    checkWishlistStatus
} from '../Controllers/wishListController.js';

const router = express.Router();

router.post('/wishList-add', authMiddleware(['user']), addWishList);
router.get('/wishList-get', authMiddleware(['user']), getWishList);
router.delete('/wishList-clear', authMiddleware(['user']), clearWishList);
router.get('/wishList-check-status/:prod_id', authMiddleware(['user']), checkWishlistStatus);

export default router;