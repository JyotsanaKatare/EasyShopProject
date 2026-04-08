
import Admin from '../Models/adminModelSchema.js';
import { deleteCloudinaryFiles } from '../utils/cloudinaryUtils.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signupAdmin = async (req, res) => {
    try {
        const { name, email, password, adminSecret } = req.body;
        const profileAdminPath = req.file ? req.file.path : "";

        if (adminSecret !== process.env.ADMIN_SECRET_KEY) {
            if (req.file) await deleteCloudinaryFiles(req.file);
            return res.status(403).json({
                success: false,
                message: "Unauthorized! Invalid Secret Key"
            });
        }

        if (!name || !email || !password) {
            if (req.file) await deleteCloudinaryFiles(req.file);
            return res.status(400).json({
                success: false,
                message: "All fields are mandatory"
            });
        }

        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            if (req.file) await deleteCloudinaryFiles(req.file);
            return res.status(400).json({
                success: false,
                message: "Admin email already registered"
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = await Admin({
            name,
            email,
            password: hashedPassword,
            profileAdmin: profileAdminPath
        });

        await newAdmin.save();
        res.status(201).json({
            success: true,
            message: "Admin account created!",
            data: { name, email }
        });

    } catch (err) {
        if (req.file) await deleteCloudinaryFiles(req.file);
        return res.status(500).json({
            success: false,
            message: "Server Error Occur"
        });
    };
}

export const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if(!email || !password){
             return res.status(404).json({
                success: false,
                message: "Email and Password are required"
            });
        }

        const admin = await Admin.findOne({ email });

        if (!admin)
            return res.status(404).json({
                success: false,
                message: "Admin not found"
            });

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch)
            return res.status(401).json({
                success: false,
                message: "Invalid Email or Password"
            });

        // Token mein ID aur Role dono bhejein
        const token = jwt.sign({ id: admin._id, role: "admin" }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

        res.status(200).json({
            success: true,
            message: "Admin login success",
            token,
            admin: { name: admin.name, email: admin.email }
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Login failed"
        });
    }
};