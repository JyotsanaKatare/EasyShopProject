
import OTP from '../Models/otpModel.js';
import User from '../Models/userModelSchema.js';
import Vendor from '../Models/vendorModelSchema.js';
import sendEmail from '../utils/sendEmail.js';

export const sendOTP = async (req, res) => {
    try {
        const { email, role } = req.body; // role: 'user' ya 'vendor'

        if (!email || !role) {
            return res.status(400).json({
                success: false,
                message: "Email and Role are required"
            });
        }

        // 1. Role ke basis par sahi Model select karein
        const Model = role === 'vendor' ? Vendor : User;

        // 2. Check - email pehle se register toh nahi hai
        const existingAccount = await Model.findOne({ email });
        if (existingAccount) {
            return res.status(400).json({
                success: false,
                message: `${role.charAt(0).toUpperCase() + role.slice(1)} already registered. Please login.`
            });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // 3. OTP save karein (Yahan 'role' bhi save karein taaki verification secure ho)
        await OTP.deleteOne({ email, role });
        await OTP.create({ email, otp, role });

        // 4. Send Email
        const subject = "Email Verification OTP";
        const html = `
            <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee;">
                <h2>${role.toUpperCase()} Verification</h2>
                <p>Your verification code is:</p>
                <h1 style="color: #e91e63;">${otp}</h1>
                <p>This code will expire in 5 minutes.</p>
            </div>
        `;

        await sendEmail(email, subject, html);

        res.status(200).json({
            success: true,
            message: "OTP sent successfully"
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to send OTP"
        });
    }
};

export const verifyOTP = async (req, res) => {
    try {
        const { email, otp, role } = req.body; // role bhi mangiye security ke liye

        // Check karein ki us email aur role ka OTP exist karta hai
        const storedOtpDetails = await OTP.findOne({ email, role }).sort({ createdAt: -1 });

        if (!storedOtpDetails) {
            return res.status(400).json({
                success: false,
                message: "OTP expired or not found!"
            });
        }

        if (String(storedOtpDetails.otp).trim() !== String(otp).trim()) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP!"
            });
        }

        // Match hone par delete karein
        await OTP.deleteOne({ _id: storedOtpDetails._id });

        res.status(200).json({
            success: true,
            message: "Email verified successfully!"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

export const verifyUpdateEmailOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const account_id = req.user.id; // Token se ID nikaali
        const role = req.user.role;    // Token se Role nikaala ('user' ya 'vendor')

        // 1. Role ke basis par sahi OTP aur sahi Model select karein
        const storedOtpDetails = await OTP.findOne({ email, otp, role: role });

        if (!storedOtpDetails) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired OTP"
            });
        }

        // 2. Dynamic Model Selection
        const Model = role === 'vendor' ? Vendor : User;

        // 3. Email update karein (Sahi collection mein)
        const updatedAccount = await Model.findByIdAndUpdate(
            account_id,
            {
                email: email,
                isEmailVerified: true
            },
            { new: true }
        );

        if (!updatedAccount) {
            return res.status(404).json({
                success: false,
                message: `${role} not found`
            });
        }

        // 4. OTP delete karein taaki reuse na ho sake
        await OTP.deleteOne({ _id: storedOtpDetails._id });

        res.status(200).json({
            success: true,
            message: "Email updated and verified successfully!",
            data: { email: updatedAccount.email }
        });

    } catch (error) {
        console.error("Verification Error:", error);
        res.status(500).json({
            success: false,
            message: "Verification failed"
        });
    }
};