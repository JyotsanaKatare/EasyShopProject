
import express from 'express';
import { sendOTP, verifyOTP, verifyUpdateEmailOTP } from '../Controllers/otpController.js';
import authMiddleware from '../Middlewares/authMiddleware.js';

const router = express.Router();

router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);
router.post("/updated-email-verify-otp",authMiddleware(['user', 'vendor']), verifyUpdateEmailOTP);

export default router;