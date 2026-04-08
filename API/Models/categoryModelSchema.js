
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
    {
        department: {
            type: String,
            required: true,
            trim: true
        },

        catName: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        description: {
            type: String,
            required: true
        },

        catImage: {
            type: String,
            required: true
        },

        isActive: {
            type: Boolean,
            required: true,
            default: true,
        }
    },
    { timestamps: true }
);

export default mongoose.model('Category', categorySchema);