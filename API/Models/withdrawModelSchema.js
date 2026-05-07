
import mongoose from 'mongoose';

const withdrawSchema = new mongoose.Schema(
    {
        vendorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Vendor'
        },

        requestId: {
            type: String,
            unique: true
        }, // e.g., WDR-1021

        amount: {
            type: Number,
            required: true
        },

        method: {
            type: String,
            enum: ['Bank Transfer', 'UPI']
        },

        accountDetails: {
            bankName: String,
            accountNo: String,
            ifsc: String,
            upiId: String
        },

        status: {
            type: String,
            default: 'Processing',
            enum: ['Processing', 'Approved', 'Rejected']
        },

        utrNumber: {
            type: String
        }, 

        adminNote: {
            type: String
        },

    },
    { timestamps: true }
);

export default mongoose.model('Withdraw', withdrawSchema);