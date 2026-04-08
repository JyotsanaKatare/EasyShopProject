
import Vendor from "../Models/vendorModelSchema.js";
import OTP from '../Models/otpModel.js';
import sendEmail from "../utils/sendEmail.js";
import { deleteCloudinaryFiles } from '../utils/cloudinaryUtils.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const licenseRequiredCategories = [
    'Footwear & Shoes',
    'Electronics & Gadgets',
    'Beauty & Personal Care',
    'Jewelry & Accessories',
    'Handicrafts & Arts',
    'Toys & Baby Products'
];

export const vendorSignUp = async (req, res) => {
    try {
        // Files ka path nikalna
        const profilePhoto = req.files['profilePhoto']?.[0]?.path;
        const storeLogo = req.files['storeLogo']?.[0]?.path;
        const categoryLicenseUpload = req.files['categoryLicenseUpload']?.[0]?.path || "";
        const panCardUpload = req.files['panCardUpload']?.[0]?.path;
        const gstDocumentUpload = req.files['gstDocumentUpload']?.[0]?.path || "";
        const bankDocumentUpload = req.files['bankDocumentUpload']?.[0]?.path;

        // console.log("PATHS:", {
        //     profile: profilePhoto,
        //     logo: storeLogo,
        //     pan: panCardUpload,
        //     license: categoryLicenseUpload,
        //     gst: gstDocumentUpload,
        //     bank: bankDocumentUpload
        // });

        const {
            name, email, contact, password, storeName, businessEmail, businessContact, businessType,
            category, address, city, state, pincode, businessPAN,
            gstNumber, accHolder, bank, accNumber, ifsc
        } = req.body;

        // Conditional License Check
        const needsLicense = licenseRequiredCategories.includes(category);

        // Agar category ko license chahiye PAR image nahi aayi
        if (needsLicense && !categoryLicenseUpload) {
            await deleteCloudinaryFiles(req.files);
            return res.status(400).json({
                success: false,
                message: `Category License is mandatory for the ${category} category.`
            });
        }

        // Conditiona GST Check 
        if (gstNumber && !gstDocumentUpload) {
            await deleteCloudinaryFiles(req.files);
            return res.status(400).json({
                success: false,
                message: `GST certificate is mandatory.`
            });
        }

        if (!profilePhoto || !name || !email || !contact || !password || !storeLogo || !storeName || !businessEmail || !businessContact || !businessType || !category || !address || !city || !state || !pincode || !businessPAN || !panCardUpload || !accHolder || !bank || !accNumber || !ifsc || !bankDocumentUpload) {

            // ERROR: Fields missing hain, toh upload hui images delete karo
            if (req.files) await deleteCloudinaryFiles(req.files);

            return res.status(400).json({
                success: false,
                message: "Please fill all the mandatory fields"
            })
        }

        // const isEmailExist = await Vendor.findOne({ email });
        const isEmailExist = await Vendor.findOne({
            $or: [{ email: email }, { businessEmail: businessEmail }]
        });

        if (isEmailExist) {

            // ERROR: Email exist karta hai, toh upload hui images delete karo
            if (req.files) await deleteCloudinaryFiles(req.files);

            return res.status(400).json({
                success: false,
                message: "This email is already registered"
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const vendor = await Vendor.create({
            profilePhoto,
            name,
            email,
            contact,
            password: hashedPassword,
            storeLogo,
            storeName,
            businessEmail,
            businessContact,
            businessType,
            category,
            categoryLicenseUpload,
            address,
            city,
            state,
            pincode,
            businessPAN,
            panCardUpload,
            gstNumber,
            gstDocumentUpload,
            accHolder,
            bank,
            accNumber,
            ifsc,
            bankDocumentUpload
        });

        await OTP.deleteMany({ email, role: 'vendor' });

        return res.status(201).json({
            success: true,
            message: "Registered successfully",
            data: {
                id: vendor._id,
                name: vendor.name,
                store: vendor.storeName
            }
        })

    } catch (err) {
        if (req.files) {
            await deleteCloudinaryFiles(req.files);
        }

        console.error("Signup Error:", err);
        return res.status(500).json({
            success: false,
            message: "Server Error Occur"
        });
    }
};

export const vendorLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and Password are required"
            });
        }

        const vendor = await Vendor.findOne({ email });
        if (!vendor) {
            return res.status(400).json({
                success: false,
                message: "Invalid Email or Password"
            });
        }

        if (!vendor.isActive) {
            return res.status(403).json({
                success: false,
                message: "Your account is deactivated by Admin. Please contact support."
            });
        }

        const isMatch = await bcrypt.compare(password, vendor.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid Email or Password"
            });
        }

        const token = jwt.sign({ id: vendor._id, role: vendor.role }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });
        res.status(200).json({
            success: true,
            message: `Welcome back, ${vendor.name}`,
            token,
            vendor: {
                id: vendor._id,
                name: vendor.name,
                email: vendor.email,
                role: vendor.role,
                store: vendor.storeName
            }
        });
    } catch (err) {
        console.error("Login Error:", err);
        return res.status(500).json({
            success: false,
            message: "Server Error Occur"
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

        const vendor = await Vendor.findOne({ email });

        if (!vendor) {
            return res.status(404).json({
                success: false,
                message: "Email does not exist"
            });
        }

        const secret = process.env.JWT_SECRET_KEY;
        const token = jwt.sign({ id: vendor._id, role: vendor.role }, secret, { expiresIn: '15m' });

        const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
        const link = `${frontendUrl}/reset_password/${vendor._id}/${token}?role=vendor`;

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
        const { vendor_id, token } = req.params;
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

        const vendor = await Vendor.findById(vendor_id);

        if (!vendor) {
            return res.status(400).json({
                success: false,
                message: "Vendor not found"
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

        vendor.password = hashedPassword;
        await vendor.save();

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

export const countVendor = async (req, res) => {
    try {
        const count = await Vendor.countDocuments();

        res.status(200).json({
            success: true,
            message: "Vendors Count",
            totalCount: count
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server Error Occur"
        });
    }
};

export const getVendor = async (req, res) => {
    try {
        const { vendor_id } = req.params;

        const vendor = await Vendor.findById(vendor_id);

        if (!vendor) {
            return res.status(404).json({
                success: false,
                message: "Vendor detail not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Vendor Detail",
            data: vendor
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server Error Occur"
        });
    }
};

export const updateVendorDetail = async (req, res) => {
    try {
        const vendor_id = req.user.id;
        const currentVendor = await Vendor.findById(vendor_id);

        let updateData = { ...req.body };   //name, contact etc.

        // --- Image Update & Delete Logic ---
        if (req.files) {
            const fileFields = [
                'storeLogo',
                'categoryLicenseUpload',
                'panCardUpload',
                'gstDocumentUpload',
                'bankDocumentUpload'
            ];

            for (const field of fileFields) {
                if (req.files[field]) {
                    // 1. Purani image delete karo (agar database mein pehle se thi)
                    if (currentVendor[field]) {
                        await deleteOldFileFromCloudinary(currentVendor[field]);
                    }
                    // 2. Nayi image ka path set karo
                    updateData[field] = req.files[field][0].path;
                }
            }
        }

        const updatedVendor = await Vendor.findByIdAndUpdate(
            vendor_id,
            { $set: updateData },
            { returnDocument: 'after' }
        ).select("-password");

        res.status(200).json({
            success: true,
            message: "Updated & Old files cleaned!",
            data: updatedVendor
        });

    } catch (err) {
        // Error aane par naye upload huye files delete karein (jo cleanup hum pehle kar rahe the)
        await deleteCloudinaryFiles(req.files);
        res.status(500).json({ success: false, message: "Error" });
    }
};

export const vendorLogout = async (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Logged out successfully"
    });
};