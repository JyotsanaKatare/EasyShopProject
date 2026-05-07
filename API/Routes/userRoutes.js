
import express from 'express';
import authMiddleware from '../Middlewares/authMiddleware.js';
import { upload } from '../Middlewares/imageStorage.js';
import {
    userSignUp,
    userLogin,
    forgotPassword,
    resetPassword,
    changePassword,
    countUser,
    getUser,
    updateUserDetail,
    userLogout
} from '../Controllers/userController.js';

const router = express.Router();

router.post("/user-signup", upload.single('profilePhoto'), userSignUp);
router.post("/user-login", userLogin);
router.post("/user-forgot-password", forgotPassword);
router.post("/user-reset-password/:user_id/:token", resetPassword);
router.get("/user-count", countUser);

router.put("/change-password", authMiddleware(['user']), changePassword);
router.get("/user-get/:user_id", authMiddleware(['user']), getUser);
router.put("/user-detail-update", authMiddleware(['user']), upload.single('profilePhoto'), updateUserDetail);
router.post("/user-logout", authMiddleware(['user']), userLogout);

export default router;