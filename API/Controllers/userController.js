
import User from '../Models/userModelSchema.js';
import OTP from '../Models/otpModel.js';
import sendEmail from '../utils/sendEmail.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const sendOTP = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        // 1. Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // 2. Save/Update in DB
        await OTP.findOneAndUpdate(
            { email },
            { otp },
            { upsert: true, new: true }
        );

        // 3. Send Email using your helper
        const subject = "Email Verification OTP";
        const html = `
            <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee;">
                <h2>Email Verification</h2>
                <p>Your verification code is given below:</p>
                <h1 style="color: #4CAF50;">${otp}</h1>
                <p>This code will be expire in 5 minutes.</p>
            </div>
        `;

        await sendEmail(email, subject, html);

        res.status(200).json({
            success: true,
            message: "OTP sent to your email"
        });

    } catch (err) {
        console.error("OTP Error:", err.message);
        res.status(500).json({
            success: false,
            message: "Failed to send OTP"
        });
    }
};

export const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        // 1. Database se us email ka latest OTP nikalo
        const storedOtpDetails = await OTP.findOne({ email }).sort({ createdAt: -1 });

        if (!storedOtpDetails) {
            return res.status(400).json({
                success: false,
                message: "OTP expired or not found!"
            });
        }

        // 2. OTP Match karo
        if (String(storedOtpDetails.otp).trim() !== String(otp).trim()) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP!"
            });
        }

        // 3. Agar match ho gaya
        res.status(200).json({
            success: true,
            message: "Email verified successfully!"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error Occur"
        });
    }
};

export const userSignUp = async (req, res) => {
    try {
        const { name, email, otp, password, contact, address, city, pincode, state } = req.body;

        if (!name || !email || !otp || !password || !contact || !address || !city || !pincode || !state) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the mandatory fields"
            })
        }

        // 1. Database se OTP check karein
        const otpCheck = await OTP.findOne({ email, otp });

        if (!otpCheck) {
            return res.status(400).json({
                success: false,
                message: "Invalid or Expired OTP"
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            name,
            email,
            password: hashedPassword,
            contact,
            address,
            city,
            pincode,
            state
        });
        await user.save();
        await OTP.deleteOne({ email });

        res.status(201).json({
            success: true,
            message: "User registered successfully"
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server Error Occur"
        });
    }
};

export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and Password are required"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid Email or Password"
            });
        }

        if (!user.isActive) {
            return res.status(403).json({
                success: false,
                message: "Your account is deactivated by Admin. Please contact support."
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid Email or Password"
            });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });
        res.status(200).json({
            success: true,
            message: `Welcome back, ${user.name}`,
            token,
            vendor: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Email does not exist"
            });
        }

        const secret = process.env.JWT_SECRET_KEY;
        const token = jwt.sign({ id: user._id, role: user.role }, secret, { expiresIn: '15m' });

        const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
        const link = `${frontendUrl}/forgot_password/${user._id}/${token}`;

        try {
            await sendEmail(
                email,
                "Password Reset Request",
                `<h2>EasyShop Password Reset</h2>
                 <p>Click the button below to reset your password. This link expires in 15 minutes.</p>
                 <a href="${link}" style="background: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
                 <p>If you didn't request this, please ignore this email.</p>`
            );

            return res.status(200).json({
                success: true,
                message: "Password reset link sent to your email.",
                link
            });

        } catch (mailErr) {
            return res.status(500).json({
                success: false,
                message: "Error sending email"
            });
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server Error Occur"
        });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { user_id, token } = req.params;
        const { password, confirmPassword } = req.body;

        if (!password || !confirmPassword) {
            return res.status(404).json({
                success: false,
                message: "New Password and Confirm Password are required"
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match"
            });
        }

        const user = await User.findById(user_id);

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }

        const secret = process.env.JWT_SECRET_KEY;
        try {
            jwt.verify(token, secret);
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: "Link expired or invalid"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user.password = hashedPassword;
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Password reset successfully. You can login now."
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server Error Occur"
        });
    }
};

export const countUser = async (req, res) => {
    try {
        const count = await User.countDocuments();

        res.status(200).json({
            success: true,
            message: "User's Count",
            totalCount: count
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server Error Occur"
        });
    }
};

export const getUser = async (req, res) => {
    try {
        const { user_id } = req.params;

        const user = await User.findById(user_id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User detail not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "User Detail",
            data: user
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server Error Occur"
        });
    }
};

export const updateUserDetail = async (req, res) => {
    try {
        const user_id = req.user.id; // Ye ID humein authMiddleware ke token se milegi
        const { name, contact, address, city, pincode, state } = req.body;

        const userExists = await User.findById(user_id);

        if (!userExists) {

            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const updatedUser = await User.findByIdAndUpdate(
            user_id,
            {
                $set: {
                    name,
                    contact,
                    address,
                    city,
                    pincode,
                    state
                }
            },
            {
                returnDocument: 'after',
                runValidators: true
            }
        ).select("-password"); // Password ko response mein nahi bhejenge

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: updatedUser
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server Error Occur"
        });
    }
};

export const userLogout = async (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Logged out successfully"
    });
};