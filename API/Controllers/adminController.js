
import Admin from '../Models/adminModelSchema.js';
import Vendor from '../Models/vendorModelSchema.js';
import User from '../Models/userModelSchema.js';
import Order from '../Models/orderModelSchema.js';
import Product from '../Models/productModelSchema.js';
import ReviewRating from '../Models/reviewRatingModelSchema.js';
import Transaction from '../Models/transactionModelSchema.js';
import Withdraw from '../Models/withdrawModelSchema.js';

import { deleteCloudinaryFiles, deleteOldFileFromCloudinary } from '../utils/cloudinaryUtils.js';
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

        if (!email || !password) {
            return res.status(404).json({
                success: false,
                message: "Email and Password are required"
            });
        }

        const admin = await Admin.findOne({ email });

        if (!admin)
            return res.status(404).json({
                success: false,
                message: "Admin not registsred"
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

export const logoutAdmin = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });
    } catch (err) {
        console.log("Error :", err);
        res.status(500).json({
            success: false,
            message: "Server Error Occur"
        });
    }
};

export const getAdmin = async (req, res) => {
    try {
        const adminId = req.user.id;

        const admin = await Admin.findById(adminId).select("-password");

        if (!admin) {
            return res.status(404).json({
                success: false,
                message: "Admin not found"
            });
        }

        res.status(200).json({
            success: true,
            data: admin
        });

    } catch (err) {
        console.log("Error :", err);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

export const updateAdminProfile = async (req, res) => {
    try {
        const { name } = req.body;
        const adminId = req.user.id; // From your auth middleware

        const updatedAdmin = await Admin.findByIdAndUpdate(
            adminId,
            { name },
            { new: true }
        ).select("-password");

        res.status(200).json({
            success: true,
            data: updatedAdmin
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// admin dashboard stats
export const getAdminDashboardStats = async (req, res) => {
    try {
        // 1. Total Revenue nikalna (Aggregation)
        const revenueData = await Order.aggregate([
            { $match: { orderStatus: "Delivered", paymentStatus: "Completed" } },
            { $group: { _id: null, totalSales: { $sum: "$totalAmount" } } }
        ]);

        const totalRevenue = revenueData.length > 0 ? revenueData[0].totalSales : 0;

        // 2. counts nikalna
        const totalOrders = await Order.countDocuments();

        // Pending = Processing + Shipped
        const pendingOrders = await Order.countDocuments({
            orderStatus: { $in: ["Processing", "Shipped"] }
        });

        const cancelledOrders = await Order.countDocuments({ orderStatus: "Cancelled" });
        const totalUsers = await User.countDocuments({ role: "user" });
        const totalVendors = await Vendor.countDocuments({ role: "vendor" });

        res.status(200).json({
            success: true,
            message: "Admin Dashboard Statistics",
            data: {
                totalRevenue,
                totalOrders,
                pendingOrders,
                cancelledOrders,
                totalUsers,
                totalVendors
            }
        });

    } catch (err) {
        console.log("Error :", err);
        res.status(500).json({
            success: false,
            message: "Server Error Occur"
        });
    };
};

// vendors list
export const getVendorList = async (req, res) => {
    try {
        const vendor = await Vendor.find()
            .select('-password')
            .populate('profilePhoto name email storeName contact category createdAt')
            .sort({ createdAt: -1 });

        if (!vendor || vendor.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No vendors found",
                count: 0,
                data: []
            });
        }

        res.status(200).json({
            success: true,
            message: "Vendor list fetched successfully!",
            count: vendor.length,
            data: vendor
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Server Error Occur"
        });
    }
};

// vendor toggle status
export const toggleVendorStatus = async (req, res) => {
    try {
        const { vendor_id } = req.params;

        const vendor = await Vendor.findById(vendor_id);

        if (!vendor) {
            return res.status(404).json({
                success: false,
                message: "Vendor not found"
            });
        };

        vendor.isActive = !vendor.isActive;
        await vendor.save();

        // console.log("Updated Vendor in DB:", vendor.isActive); // Kya ye toggle hua?
        // console.log(typeof vendor.isActive, vendor.isActive); // before the toggle

        res.status(200).json({
            success: true,
            message: `Vendor is now ${vendor.isActive ? 'Active' : 'Inactive'}`,
            isActive: vendor.isActive
        });

    } catch (err) {
        console.log("Error:", err);
        res.status(500).json({
            success: false,
            message: "Server Error Occur"
        });
    };
};

// vendor stats
export const getVendorStats = async (req, res) => {
    try {
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        const [total, active, inactive, newThisMonth] = await Promise.all([
            Vendor.countDocuments(),
            Vendor.countDocuments({ isActive: true }),
            Vendor.countDocuments({ isActive: false }),
            Vendor.countDocuments({ createdAt: { $gte: startOfMonth } })
        ]);

        res.status(200).json({
            success: true,
            data: { total, active, inactive, newThisMonth }
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Server Error Occur"
        });
    }
};

// all prod
export const getAdminProductList = async (req, res) => {
    try {
        const { search } = req.query;

        let query = {};

        if (search) {
            query.name = { $regex: search, $options: "i" };
        }

        const products = await Product.find(query)
            .populate("catId", "catName")
            .populate("subCatId", "subCatName")
            .populate("vendorId", "storeName name")
            .sort({ createdAt: -1 });

        const totalCount = await Product.countDocuments(query);

        res.status(200).json({
            success: true,
            total: totalCount,
            data: products
        });

    } catch (err) {
        console.error("Admin Product Fetch Error:", err);
        return res.status(500).json({
            success: false,
            message: "Server Error Occur"
        });
    }
};

// toggle prod status 
export const updateProductStatus = async (req, res) => {
    try {
        const { product_id } = req.params;
        const { status } = req.body;

        const validStatuses = ['Pending', 'Approved', 'Rejected'];

        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status"
            });
        }

        const product = await Product.findByIdAndUpdate(
            product_id,
            { status },
            { new: true }
        );

        if (!product)
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });

        return res.status(200).json({
            success: true,
            message: `Product status updated to ${status} successfully`,
            data: product
        });

    } catch (err) {
        console.log("Error :", err);
        return res.status(500).json({
            success: false,
            message: "Server Error Occur"
        });
    }
};

// toggle new arrival
export const toggleProductNewArrival = async (req, res) => {
    try {
        const { product_id } = req.params;

        const product = await Product.findById(product_id);

        if (!product) {
            return res.status(404).json({
                status: false,
                message: "Product not found"
            });
        };

        product.isNewArrival = !product.isNewArrival;
        await product.save();

        res.status(200).json({
            status: true,
            message: `Product is ${product.isNewArrival ? "marked as New Arrival" : "removed from New Arrivals"}`,
            isNewArrival: product.isNewArrival
        });

    } catch (err) {
        console.log("Error : ", err);
        res.status(500).json({
            status: false,
            message: "Server Error Occur"
        });
    };
};

// toggle best seller
export const toggleBestSeller = async (req, res) => {
    try {
        const { product_id } = req.params;

        const product = await Product.findById(product_id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        // flip whatever current value is
        product.isBestSeller = !product.isBestSeller;
        await product.save();

        return res.status(200).json({
            success: true,
            message: `Product ${product.isBestSeller ? "marked as" : "removed from"} Best Seller`,
            data: {
                _id: product._id,
                prodName: product.prodName,
                isBestSeller: product.isBestSeller
            }
        });

    } catch (err) {
        console.error("Toggle Best Seller Error:", err);
        return res.status(500).json({
            success: false,
            message: "Server Error Occur"
        });
    }
};

// all orders
export const getAllOrders = async (req, res) => {
    try {
        const { vendorId, status } = req.query; // Status filter bhi add kar sakte ho

        let query = {};

        // 1. Agar specific Vendor ke orders dekhne hain
        if (vendorId) {
            // Un products ki IDs nikalo jo is vendor ki hain
            const vendorProducts = await Product.find({ vendorId }).distinct('_id');
            query["items.productId"] = { $in: vendorProducts };
        }

        // 2. Agar specific status filter karna ho (optional)
        if (status) {
            query.status = status;
        }

        const orders = await Order.find(query)
            .populate('userId', 'name email profilePhoto')
            .populate({
                path: 'items.productId',
                select: 'prodName price prodImage vendorId catId', // Sirf zaroori details
                populate: { path: 'vendorId', select: 'storeName' },
                populate: { path: 'catId', select: 'catName' }
            })
            .sort({ createdAt: -1 });

        // Optional: Data transformation
        // Agar aap chahte ho ki response mein sirf wahi items dikhein jo us vendor ke hain (filter ke waqt)
        let finalOrders = orders;
        if (vendorId) {
            finalOrders = orders.map(order => {
                const filteredItems = order.items.filter(item =>
                    item.productId.vendorId._id.toString() === vendorId
                );
                return { ...order._doc, items: filteredItems };
            });
        }

        res.status(200).json({
            success: true,
            count: finalOrders.length,
            data: finalOrders
        });

    } catch (err) {
        console.error("Admin Orders Error: ", err);
        res.status(500).json({
            success: false,
            message: "Failed to fetch orders"
        });
    }
};

// all users
export const getUserList = async (req, res) => {
    try {
        const users = await User.aggregate([
            {
                $lookup: {
                    from: "orders",
                    localField: "_id",
                    foreignField: "userId",
                    as: "userOrders"
                }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    email: 1,
                    profilePhoto: 1,
                    isActive: 1,
                    createdAt: 1,
                    role: 1,
                    orderCount: { $size: "$userOrders" }
                }
            },
            { $sort: { createdAt: -1 } }
        ]);

        res.status(200).json({
            success: true,
            message: "User List fetched successfully",
            count: users.length,
            data: users
        });

    } catch (err) {
        console.log("Error :", err);
        res.status(500).json({
            success: false,
            message: "Server Error Occur"
        });
    }
};

// toggle user status
export const toggleUserStatus = async (req, res) => {
    try {
        const { user_id } = req.params;
        const user = await User.findById(user_id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        user.isActive = !user.isActive;
        await user.save();

        res.status(200).json({
            success: true,
            message: `User is now ${user.isActive ? 'Active' : 'Inactive'}`,
            data: user
        });

    } catch (err) {
        console.log("Error :", err);
        res.status(500).json({
            success: false,
            message: "Server Error Occur"
        });
    }
};

// delete user
export const deleteUser = async (req, res) => {
    try {
        const { user_id } = req.params;

        const user = await User.findById(user_id);

        if (!user) {
            res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (user.profilePhoto) {
            await deleteOldFileFromCloudinary(user.profilePhoto);
        }

        await User.findByIdAndDelete(user_id);

        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });

    } catch (err) {
        console.log("Error :", err);
        res.status(500).json({
            success: false,
            message: "Server Error Occur"
        });
    }
};

// review list
export const adminReviewList = async (req, res) => {
    try {
        const { status, vendorId } = req.query;

        let query = {};

        if (status) query.status = status;

        // find out vendor prods for filter
        if (vendorId) {
            const vendorProducts = await Product.find({ vendorId }).select('_id');

            const productIds = vendorProducts.map(p => p._id);

            if (productIds.length === 0) {
                return res.status(200).json({
                    success: true,
                    message: "No products found for this vendor",
                    data: []
                });
            }
            // Filter reviews by those product IDs
            query.productId = { $in: productIds };
        }

        const reviews = await ReviewRating.find(query)
            .populate('userId', 'name email profilePhoto')
            .populate({
                path: 'productId',
                select: 'prodName vendorId',
                populate: { path: 'vendorId', select: 'name email profilePhoto' } // Vendor ka naam bhi dikhega
            })
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            message: reviews.length > 0 ? "Review List fetched successfully" : "No reviews found",
            count: reviews.length,
            data: reviews
        });

    } catch (err) {
        console.log("Error :", err);
        res.status(500).json({
            success: false,
            message: "Server Error Occur"
        });
    }
};

// update review status
export const updateReviewStatus = async (req, res) => {
    try {
        const { review_id } = req.params;
        const { status } = req.body;

        const validStatuses = ['Pending', 'Approved', 'Rejected'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status. Use pending, approved, or rejected."
            });
        }

        const updatedReview = await ReviewRating.findByIdAndUpdate(
            review_id,
            { status },
            { new: true, runValidators: true }
        );

        if (!updatedReview) {
            return res.status(404).json({
                success: false,
                message: "Review not found"
            });
        }

        if (ReviewRating.calculateAvgRating) {
            await ReviewRating.calculateAvgRating(updatedReview.productId);
        }

        res.status(200).json({
            success: true,
            message: `Review status updated to ${status} successfully`,
            data: updatedReview
        });

    } catch (err) {
        console.log("Error :", err);
        res.status(500).json({
            success: false,
            message: "Error updating status"
        });
    }
};

// delete review
export const deleteReview = async (req, res) => {
    try {
        const { review_id } = req.params;

        const review = await ReviewRating.findByIdAndDelete(review_id);

        if (!review) {
            return res.status(404).json({
                success: false,
                message: "Review not found"
            });
        }

        // Rating recalculate karo (Kyuki review hat gaya hai)
        if (ReviewRating.calculateAvgRating) {
            await ReviewRating.calculateAvgRating(review.productId);
        }

        res.status(200).json({
            success: true,
            message: "Review deleted successfully and product rating updated"
        });

    } catch (err) {
        console.error("Error deleting review:", err);
        res.status(500).json({
            success: false,
            message: "Server Error Occur"
        });
    }
};

// all transactions
export const getAllTransactions = async (req, res) => {
    try {
        // Hum 'populate' use karenge taaki humein Vendor ka naam aur Order ki details mil sakein
        const transactions = await Transaction.find()
            .populate('vendorId', 'name email') // Vendor ka sirf name aur email chahiye
            .populate('orderId', 'orderStatus paymentStatus') // Order ka status dekhne ke liye
            .sort({ createdAt: -1 }); // Latest transactions sabse upar

        res.status(200).json({
            success: true,
            message: "Here is transaction list",
            count: transactions.length,
            data: transactions
        });
    } catch (err) {
        console.log("Error :", err);
        res.status(500).json({
            success: false,
            message: "Server Error Occur",
        });
    }
};

// toggle transaction status
export const toggleTransactionStatus = async (req, res) => {
    try {
        const { transaction_id } = req.params;
        const { status } = req.body;

        const validStatuses = ['Pending', 'Completed', 'Cancelled'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Status"
            });
        }

        const transaction = await Transaction.findById(transaction_id);
        if (!transaction)
            return res.status(404).json({
                success: false,
                message: "Not found"
            });

        // Condition: Agar already Processed hai toh block kar do
        if (transaction.status === 'Completed') {
            return res.status(400).json({
                success: false,
                message: "Already settled!"
            });
        }

        // ====================================================
        // NEW LOGIC: Agar Admin 'Completed' select kare, 
        // toh vendor ka balance update karo
        // ====================================================
        if (status === 'Completed') {
            await Vendor.findByIdAndUpdate(transaction.vendorId, {
                $inc: { availableBalance: transaction.netEarning }
            });
        }
        // ====================================================

        transaction.status = status;
        await transaction.save();

        res.status(200).json({
            success: true,
            message: `Transaction marked as ${status}`,
            data: transaction
        });

    } catch (err) {
        console.log("Error :", err)
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// all withdrwal req
export const getAllWithdrawRequests = async (req, res) => {
    try {
        const requests = await Withdraw.find()
            .populate('vendorId', 'name email storeName availableBalance')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            message: "Here is all payout requests of vendor",
            data: requests
        });

    } catch (err) {
        console.log("Error :", err);
        res.status(500).json({
            success: false,
            message: "Server Error Occur"
        });
    }
};

// toggle withdraw req status
export const toggleWithdrawStatus = async (req, res) => {
    try {
        const { withdraw_id } = req.params;
        const { status, utrNumber, adminNote } = req.body;

        const validStatuses = ['Processing', 'Approved', 'Rejected'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Status"
            });
        }

        const withdraw = await Withdraw.findById(withdraw_id);
        if (!withdraw)
            return res.status(404).json({
                success: false,
                message: "Request Not found"
            });

        // Condition: Agar already Processed hai toh block kar do
        if (withdraw.status === 'Approved' || withdraw.status === 'Rejected') {
            return res.status(400).json({
                success: false,
                message: "Status already finalized!"
            });
        }

        // ====================================================
        // NEW LOGIC: Agar Admin 'Reject' select kare, 
        // toh vendor ka balance plus me update karo
        // ====================================================
        if (status === 'Rejected') {
            const refundAmount = Number(withdraw.amount);
            await Vendor.findByIdAndUpdate(withdraw.vendorId, {
                $inc: { availableBalance: refundAmount }
            });
        }
        // ====================================================

        // Status aur Admin fields update karein
        withdraw.status = status;
        if (utrNumber) withdraw.utrNumber = utrNumber; // Withdraw History ke liye
        if (adminNote) withdraw.adminNote = adminNote;

        await withdraw.save();

        res.status(200).json({
            success: true,
            message: `Withdrawal request marked as ${status}`,
            data: withdraw
        });

    } catch (err) {
        console.log("Error :", err)
        res.status(500).json({
            success: false,
            message: "Server Error Occur"
        });
    }
};