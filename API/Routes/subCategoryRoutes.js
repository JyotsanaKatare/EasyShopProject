
import express from 'express';
import { upload } from '../Middlewares/imageStorage.js';
import authMiddleware from '../Middlewares/authMiddleware.js';
import { addSubCategory, listSubCategory, listSubCatByCategory, getSubCategory, updateSubCategory, deleteSubCategory, toggleSubCategoryStatus, searchCategoryAndSubCategory } from '../Controllers/subCategoryController.js';

const router = express.Router();

router.get('/sub-category-list-update', listSubCategory);
router.get('/sub-category-list-by-category/:cat_id', listSubCatByCategory);
router.get('/sub-category-get/:subCat_id', getSubCategory);
router.get('/cat-subCat-search', searchCategoryAndSubCategory);

router.post('/sub-category-add/:cat_id', authMiddleware(['admin']), upload.single('subCatImage'), addSubCategory);
router.put('/sub-category-update/:subCat_id', authMiddleware(['admin']), upload.single('subCatImage'), updateSubCategory);
router.delete('/sub-category-delete/:subCat_id', authMiddleware(['admin']), deleteSubCategory);
router.patch('/sub-category-toggle-status/:subCat_id', authMiddleware(['admin']), toggleSubCategoryStatus);

export default router;