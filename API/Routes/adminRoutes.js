
import express from 'express';
import { upload } from '../Middlewares/imageStorage.js';
import { signupAdmin, loginAdmin } from '../Controllers/adminController.js';

const router = express.Router();

router.post('/admin-signup',upload.single('profileAdmin'), signupAdmin);
router.post('/admin-login', loginAdmin);

export default router;