
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import cloudinary from '../config/cloudinary.js'; // Import config file

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        let folderName = 'EasyShop/Others'; // Default folder

        // Agar vendor registration se request aa rahi hai
        if (req.baseUrl.includes('vendor')) {
            folderName = 'EasyShop/Vendor_Docs';
        }
        // Agar product add karne ki request hai
        else if (req.baseUrl.includes('product')) {
            folderName = 'EasyShop/Products';
        }

        return {
            folder: folderName,
            allowed_formats: ['jpg', 'png', 'jpeg'],
            public_id: `${Date.now()}-${file.originalname.split('.')[0]}`
        };
    },
});

const upload = multer({ storage: storage });

export { upload };