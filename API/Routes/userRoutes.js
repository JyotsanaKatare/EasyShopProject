
import express from 'express';
import { sendOTP, verifyOTP, userSignUp, userLogin, forgotPassword, resetPassword, countUser, getUser, updateUserDetail, userLogout } from '../Controllers/userController.js';
import authMiddleware from '../Middlewares/authMiddleware.js';

const router = express.Router();

router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);
router.post("/user-signup", userSignUp);
router.post("/user-login", userLogin);
router.post("/user-forgot-password", forgotPassword);
router.post("/user-reset-password/:user_id/:token", resetPassword);
router.get("/user-count", countUser);

router.get("/user-get/:user_id",authMiddleware(['user']), getUser);
router.put("/user-detail-update",authMiddleware(['user']), updateUserDetail);
router.post("/user-logout", authMiddleware(['user']), userLogout);

export default router;