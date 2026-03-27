
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: true
        },

        contact: {
            type: String,
            required: true
        },

        address: {
            type: String,
            required: true
        },

        city: {
            type: String,
            required: true
        },

        pincode: {
            type: String,
            required: true
        },

        state: {
            type: String,
            required: true
        },

        role: {
            type: String,
            default: 'user'
        },

        isActive: {
            type: Boolean,
            default: true
        },

        cart: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }],
    },

    { timestamps: true }
);

export default mongoose.model('User', userSchema);