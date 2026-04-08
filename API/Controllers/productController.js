
import Product from '../Models/productModelSchema.js';
import SubCategory from '../Models/subCategoryModelSchema.js';
import Category from '../Models/categoryModelSchema.js';
import { deleteCloudinaryFiles } from '../utils/cloudinaryUtils.js';

// Helper function for cleaning Cloudinary files if validation fails
const cleanupUploadedFiles = async (files) => {
    if (!files) return;
    const allFiles = [];
    if (files['prodImage']) allFiles.push(files['prodImage'][0]);
    if (files['prodImages']) allFiles.push(...files['prodImages']);

    for (const file of allFiles) {
        await deleteCloudinaryFiles(file); // Apne utility function ko call karein
    }
};

export const addProduct = async (req, res) => {
    try {
        const { subCat_id } = req.params;
        const vendorId = req.user._id;

        const { prodName, description, price, originalPrice, stock, attributes, isNewArrival } = req.body;
        const slug = prodName.toLowerCase().trim().replace(/ /g, '-');

        const prodAlreadyExists = await Product.findOne({ slug, vendorId });

        if (prodAlreadyExists) {
            if (req.files) await cleanupUploadedFiles(req.files);
            return res.status(409).json({
                success: false,
                message: "You have already added a product with this name."
            });
        }

        const prodImage = req.files['prodImage'] ? req.files['prodImage'][0].path : "";
        const prodImages = req.files['prodImages'] ? req.files['prodImages'].map(file => file.path) : [];

        if (!prodName || !description || !price || !originalPrice || !stock || !attributes) {
            if (req.files) await cleanupUploadedFiles(req.files);
            return res.status(400).json({
                success: false,
                message: "All required fields are mandotary"
            });
        };

        // Frontend se string aayegi, use object mein parse karna
        const paresdAttributs = attributes ? JSON.parse(attributes) : {};

        const subCategoryExists = await SubCategory.findById(subCat_id);
        if (!subCategoryExists) {
            if (req.files) await cleanupUploadedFiles(req.files);
            return res.status(404).json({
                success: false,
                message: "Sub-Category not found"
            });
        };

        const newProduct = new Product({
            vendorId,
            catId: subCategoryExists.catId,
            subCatId: subCat_id,
            prodName,
            slug: `${slug}-${vendorId}`,
            description,
            prodImage,
            prodImages,
            price,
            originalPrice,
            stock,
            attributes: paresdAttributs,
            isNewArrival: isNewArrival || false
        });

        await newProduct.save();
        res.status(201).json({
            success: true,
            message: "Product added successfully",
            data: newProduct
        });

    } catch (err) {
        console.log(err);
        if (req.files) await cleanupUploadedFiles(req.files);
        return res.status(500).json({
            success: false,
            message: "Server Error Occur"
        })
    };
};