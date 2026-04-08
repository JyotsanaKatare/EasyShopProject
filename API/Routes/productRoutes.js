
import express from 'express';
import authMiddleware from '../Middlewares/authMiddleware.js';
import { addProduct } from '../Controllers/productController.js';
import { upload } from '../Middlewares/imageStorage.js';
const router = express.Router();

router.post(
    '/product-add/:subCat_id',
    authMiddleware(['vendor', 'admin']),
    upload.fields([
        { name: "prodImage", maxCount: 1 },
        { name: "prodImages", maxCount: 5 }
    ]),
    addProduct);

export default router;