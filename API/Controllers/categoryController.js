
import Category from '../Models/categoryModelSchema.js';
import { deleteCloudinaryFiles } from '../utils/cloudinaryUtils.js'; // err
import { deleteOldFileFromCloudinary } from '../utils/cloudinaryUtils.js'; // update + dlt

export const addCategory = async (req, res) => {
    try {
        const { department, catName, slug, description } = req.body;
        const catImagePath = req.file ? req.file.path : "";

        if (!department || !catName || !slug || !catImagePath || !description) {
            if (req.file) await deleteCloudinaryFiles(req.file);
            return res.status(400).json({
                success: false,
                message: "All fields and category image are mandatory"
            });
        };

        const alreadyExists = await Category.findOne({
            $or: [{ catName: catName.trim() }, { slug: slug.toLowerCase().trim() }]
        });

        if (alreadyExists) {
            if (req.file) await deleteCloudinaryFiles(req.file);
            return res.status(400).json({
                success: false,
                message: "This category already exists"
            });
        };

        const newCategory = new Category({
            department,
            catName,
            slug,
            description,
            catImage: catImagePath
        });

        await newCategory.save();
        res.status(201).json({
            success: true,
            message: "Category added successfully!",
            data: newCategory
        });

    } catch (err) {
        if (req.file) await deleteCloudinaryFiles(req.file);
        return res.status(500).json({
            success: false,
            message: "Server Error Occur"
        });
    };
};

export const listCategory = async (req, res) => {
    try {
        const list = await Category.find({}).sort({ createdAt: -1 });

        if (!list || list.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No categories found"
            });
        };

        res.status(200).json({
            success: true,
            message: "Here is category list",
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

export const getCategory = async (req, res) => {
    try {
        const { cat_id } = req.params;

        const category = await Category.findById(cat_id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        };

        res.status(200).json({
            success: true,
            message: "Here is category detail",
            data: category
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server Error Occur"
        });
    };
};

export const updateCategory = async (req, res) => {
    try {
        const { cat_id } = req.params;
        const updates = {};

        const fields = ["department", "catName", "slug", "description", "isActive"];

        fields.forEach(field => {
            if (req.body[field] !== undefined) {
                updates[field] = req.body[field];
            };
        });

        const category = await Category.findById(cat_id);

        if (!category) {
            if (req.file) await deleteCloudinaryFiles(req.file);
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        if (req.file) {
            if (category.catImage) {
                await deleteOldFileFromCloudinary(category.catImage);
            }

            updates.catImage = req.file.path;
        }

        const updatedCategory = await Category.findByIdAndUpdate(
            cat_id,
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
            message: "Category updated successfully",
            data: updatedCategory
        });

    } catch (err) {
        if (req.file) await deleteCloudinaryFiles(req.file);
        // console.log(err);
        return res.status(500).json({
            success: false,
            message: "Server Error Occur"
        });
    };
};

export const deleteCategory = async (req, res) => {
    try {
        const { cat_id } = req.params;
        const category = await Category.findById(cat_id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        };

        if (category.catImage) {
            await deleteOldFileFromCloudinary(category.catImage);
        };

        await Category.findByIdAndDelete(cat_id);
        res.status(200).json({
            success: true,
            message: "Category deleted successfully",
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server Error Occur"
        });
    };
};

export const toggleCategoryStatus = async (req, res) => {
    try {
        const { cat_id } = req.params;

        const category = await Category.findById(cat_id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        };

        category.isActive = !category.isActive;
        await category.save();
        res.status(200).json({
            success: true,
            message: `Category is now ${category.isActive ? 'Active' : 'Inactive'}`,
            isActive: category.isActive // Naya status bhej dein
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server Error Occur"
        });
    };
};

// recursive - for mega menu
export const getCategoryTree = async (req, res) => {
    try {
        const tree = await Category.aggregate([

            // 1. Sirf active categories uthao
            { $match: { isActive: true } },

            // 2. SubCategories ke saath join karo
            {
                $lookup: {
                    from: "subcategories",      // Aapke MongoDB collection ka asli naam (usually plural hota hai)
                    localField: "_id",          // Category ki ID
                    foreignField: "catId",      // SubCategory mein stored Parent ID
                    as: "subcategories"         // Is naam se array banega
                }
            },

            // 3. Optional: Sirf wahi fields dikhao jo zaroori hain
            {
                $project: {
                    catName: 1,
                    slug: 1,
                    catImage: 1,
                    "subcategories.subCatName": 1,
                    "subcategories.slug": 1,
                    "subcategories._id": 1
                }
            },

            // 4. Sort by name or order
            { $sort: { catName: 1 } }
        ]);

        res.status(200).json({
            success: true,
            count: tree.length,
            data: tree
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ 
            success: false, 
            message: "Server Error Occur" 
        });
    };
};