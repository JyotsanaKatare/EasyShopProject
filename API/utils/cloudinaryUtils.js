
import cloudinary from '../config/cloudinary.js';

//delete files from cloudinary - when err occur
export const deleteCloudinaryFiles = async (files) => {
    if (!files) return;

    // Sabhi uploaded files ko ek flat array mein convert karna
    const allFiles = Object.values(files).flat();

    for (const file of allFiles) {
        try {
            if (file.filename) {
                await cloudinary.uploader.destroy(file.filename);
                console.log(`Deleted from Cloudinary: ${file.filename}`);
            }
        } catch (error) {
            console.error(`Error deleting file ${file.filename}:`, error);
        }
    }
};

// for update api - dlt old files
export const deleteOldFileFromCloudinary = async (fileUrl) => {
    try {
        if (fileUrl) {
            // Yeh Regex URL se 'upload/' ke baad wala aur extension se pehle wala saara part nikal lega
            // Example: .../upload/v12345/vendor_docs/my_image.jpg -> vendor_docs/my_image
            const regex = /\/upload\/(?:v\d+\/)?(.+)\.[a-z]+$/;
            const match = fileUrl.match(regex);

            if (match && match[1]) {
                const publicId = match[1];
                await cloudinary.uploader.destroy(publicId);
                console.log(`Old file deleted: ${publicId}`);
            }
        }
    } catch (error) {
        console.error("Error deleting old file:", error);
    }
};