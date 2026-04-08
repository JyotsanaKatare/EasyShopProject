
import Category from '../Models/categoryModelSchema.js';
import SubCategory from '../Models/subCategoryModelSchema.js';
import { deleteCloudinaryFiles, deleteOldFileFromCloudinary } from '../utils/cloudinaryUtils.js';

export const addSubCategory = async (req, res) => {
    try {
        const { cat_id } = req.params;
        const { subCatName, slug, description } = req.body;
        const subCatImagePath = req.file ? req.file.path : "";

        if (!subCatName || !slug || !description || !subCatImagePath) {
            if (req.file) await deleteCloudinaryFiles(req.file);
            return res.status(400).json({
                success: false,
                message: "All fields and sub category image are mandatory"
            });
        };

        // check parent cat exists or not
        const categoryExists = await Category.findById(cat_id);
        if (!categoryExists) {
            if (req.file) await deleteCloudinaryFiles(req.file);
            return res.status(404).json({
                success: false,
                message: "Parent Category not found"
            });
        }

        // Duplicate check (Specific to THIS category)
        const alreadyExists = await SubCategory.findOne({
            catId: cat_id,
            $or: [
                { subCatName: subCatName.trim() },
                { slug: slug.toLowerCase().trim() }
            ]
        });

        if (alreadyExists) {
            if (req.file) await deleteCloudinaryFiles(req.file);
            return res.status(400).json({
                success: false,
                message: "Sub-Category name or slug already exists in this category"
            });
        };

        const newSubCategory = new SubCategory({
            catId: cat_id,
            subCatName,
            slug,
            description,
            subCatImage: subCatImagePath
        });

        await newSubCategory.save();
        res.status(201).json({
            success: true,
            message: "Sub-Category added successfully!",
            data: newSubCategory
        });

    } catch (err) {
        if (req.file) await deleteCloudinaryFiles(req.file);
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Server Error Occur"
        });
    };
};

export const listSubCategory = async (req, res) => {
    try {
        const list = await SubCategory.find({}).sort({ createdAt: -1 }).populate('catId', 'catName');

        if (!list || list.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No sub-categories found"
            });
        };

        res.status(200).json({
            success: true,
            message: "Here is sub category list",
            count: list.length,
            data: list
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server Error Occur"
        });
    };
};

export const listSubCatByCategory = async (req, res) => {
    try {
        const { cat_id } = req.params;

        const list = await SubCategory.find({ catId: cat_id }).populate('catId', 'catName');

        if (!list || list.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No sub-categories found for this category"
            });
        };

        res.status(200).json({
            success: true,
            message: "Here is sub category list by category",
            count: list.length,
            data: list
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server Error Occur"
        });
    };
};

export const getSubCategory = async (req, res) => {
    try {
        const { subCat_id } = req.params;

        const subCategory = await SubCategory.findById(subCat_id);

        if (!subCategory) {
            return res.status(404).json({
                success: false,
                message: "Sub-Category not found"
            });
        };

        res.status(200).json({
            success: true,
            message: "Here is sub-category detail",
            data: subCategory
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server Error Occur"
        });
    };
};

export const updateSubCategory = async (req, res) => {
    try {
        const { subCat_id } = req.params;
        const updates = {};

        const fields = ["subCatName", "slug", "description", "isActive"];

        fields.forEach(field => {
            if (req.body[field] !== undefined) {
                updates[field] = req.body[field];
            };
        });

        const subCategory = await SubCategory.findById(subCat_id);

        if (!subCategory) {
            if (req.file) await deleteCloudinaryFiles(req.file);
            return res.status(404).json({
                success: false,
                message: "Sub Category not found"
            });
        };

        if (req.file) {
            if (subCategory.subCatImage) {
                await deleteOldFileFromCloudinary(subCategory.subCatImage);
            }

            updates.subCatImage = req.file.path;
        }

        const updatedSubCategory = await SubCategory.findByIdAndUpdate(
            subCat_id,
            {
                $set: updates
            },
            {
                new: true,
                runValidators: true
            }
        );

        res.status(200).json({
            success: true,
            message: "Sub-Category updated successfully",
            data: updatedSubCategory
        });

    } catch (err) {
        if (req.file) await deleteCloudinaryFiles(req.file);
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Server Error Occur"
        });
    }
};

export const deleteSubCategory = async (req, res) => {
    try {
        const { subCat_id } = req.params;
        const subCategory = await SubCategory.findById(subCat_id);

        if (!subCategory) {
            return res.status(404).json({
                success: false,
                message: "Sub-Category not found"
            });
        };

        if (subCategory.subCatImage) {
            await deleteOldFileFromCloudinary(subCategory.subCatImage);
        };

        await SubCategory.findByIdAndDelete(subCat_id);
        res.status(200).json({
            success: true,
            message: "Sub-Category deleted successfully",
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server Error Occur"
        });
    };
};

export const toggleSubCategoryStatus = async (req, res) => {
    try {
        const { subCat_id } = req.params;

        const subCategory = await SubCategory.findById(subCat_id);

        if (!subCategory) {
            return res.status(404).json({
                success: false,
                message: "Sub-Category not found"
            });
        };

        subCategory.isActive = !subCategory.isActive;
        await subCategory.save();
        res.status(200).json({
            success: true,
            message: `Sub-Category is now ${subCategory.isActive ? 'Active' : 'Inactive'}`,
            isActive: subCategory.isActive
        });

    } catch (err) {
        // console.log(err);
        res.status(500).json({
            success: false,
            message: "Server Error Occur"
        });
    };
};

export const searchCategoryAndSubCategory = async (req, res) => {
    try {
        const { query } = req.query;

        if (!query) {
            return res.status(404).json({
                success: false,
                message: "Query is required"
            });
        };

        const searchRegex = new RegExp(query, 'i');

        // search in cat
        const categories = await Category.find({
            catName: { $regex: searchRegex },
            isActive: true
        }).select('catName slug catImage').limit(5);

        // search in sub-cat
        const subCategories = await SubCategory.find({
            subCatName: { $regex: searchRegex },
            isActive: true
        }).select('subCatName slug subCatImage catId').populate('catId', 'catName').limit(5);

        res.status(200).json({
            success: true,
            message: "Founded",
            results: {
                categories,
                subCategories
            }
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server Error Occur"
        });
    }
};