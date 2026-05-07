
import mongoose, { model } from 'mongoose';

const transactionSchema = new mongoose.Schema(
    {
        vendorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Vendor',
            required: true
        },

        orderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order',
            required: true
        },

        txnId: {
            type: String,
            unique: true,
            required: true
        }, // Jaise TXN-98721

        orderDisplayId: {
            type: String,
            required: true
        }, // Jaise #ORD-2026-A1

        totalAmount: {
            type: Number,
            required: true
        }, // Customer ne jo pay kiya

        platformFee: {
            type: Number,
            required: true
        }, // Aapka 10% commission

        netEarning: {
            type: Number,
            required: true
        }, // totalAmount - platformFee

        paymentMethod: {
            type: String,
            enum: ['COD', 'Online'],
            default: 'COD'
        },

        status: {
            type: String,
            enum: ['Pending', 'Completed', 'Cancelled'],
            default: 'Pending'
        }
    },
    { timestamps: true });

export default mongoose.model('Transaction', transactionSchema);