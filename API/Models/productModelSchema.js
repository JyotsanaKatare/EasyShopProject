
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        vendorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Vendor', 
            required: true,
            index: true
        },

        catId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: true,
            index: true
        },

        subCatId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SubCategory',
            required: true,
            index: true
        },

        prodName: {
            type: String,
            required: true,
            trim: true
        },

        slug: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            index: true
        },

        description: {
            type: String,
            required: true
        },

        prodImage: {
            type: String,
            required: true
        },

        prodImages: {
            type: [String],
            default: []
        },

        price: {
            type: Number,
            required: true
        },

        originalPrice: {
            type: Number,
            required: true
        },

        stock: {
            type: Number,
            required: true
        },

        attributes: {
            type: Map,
            of: mongoose.Schema.Types.Mixed // Mixed matlab String, Number, ya Array kuch bhi aa sakta hai
        },

        isNewArrival: {
            type: Boolean,
            default: false
        },

        isActive: {
            type: Boolean,
            required: true,
            default: true
        }

    },
    { timestamps: true }
);

// Search performance ke liye compound index
productSchema.index({ catId: 1, subCatId: 1, price: 1 });

export default mongoose.model('Product', productSchema);