
import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema({
    
    // step-1
    profilePhoto: {
        type: String,
        default: ""
    },

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

    contact: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    // step-2
    storeLogo: {
        type: String,
        required: true,
    },

    storeName: {
        type: String,
        required: true,
        trim: true
    },

    businessEmail: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    businessContact: {
        type: String,
        required: true
    },

    businessType: {
        type: String,
        required: true,
    },

    category: {
        type: String,
        required: true,
    },

    categoryLicenseUpload: {
        type: String,
    },

    address: {
        type: String,
        required: true,
    },

    city: {
        type: String,
        required: true,
    },

    state: {
        type: String,
        required: true,
    },

    pincode: {
        type: String,
        required: true,
    },

    businessPAN: {
        type: String,
        required: true,
    },

    panCardUpload: {
        type: String,
        required: true,
    },

    gstNumber: {
        type: String,
    },

    gstDocumentUpload: {
        type: String,
    },
    
    // step-3
    accHolder: {
        type: String,
        required: true,
    },

    bank: {
        type: String,
        required: true,
    },

    accNumber: {
        type: String,
        required: true,
    },

    ifsc: {
        type: String,
        required: true,
    },

    bankDocumentUpload: {
        type: String,
        required: true,
    },

    role: {
        type: String,
        default: 'vendor',
    },

    isActive: {
        type: Boolean,
        required: true,
        default: true,
    },
},

    { timestamps: true }
);

export default mongoose.model('Vendor', vendorSchema);