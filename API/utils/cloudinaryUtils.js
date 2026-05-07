
import cloudinary from '../config/cloudinary.js';

//delete file or files - when err occur
export const deleteCloudinaryFiles = async (fileData) => {
    try {
        if (!fileData) return;

        let publicIds = [];

        // Case 1: Agar req.file (Single Upload) pass kiya gaya ho
        if (fileData.filename) {
            publicIds.push(fileData.filename);
        }
        // Case 2: Agar req.files (Multiple Fields/Array) pass kiya gaya ho
        else {
            const allFiles = Object.values(fileData).flat();
            publicIds = allFiles.map(f => f.filename).filter(id => id);
        }

        // Sabhi IDs ko delete karein
        for (const id of publicIds) {
            await cloudinary.uploader.destroy(id);
            console.log(`Cleanup Done: Deleted ${id} from Cloudinary`);
        }
    } catch (error) {
        console.error("Cloudinary Cleanup Error:", error);
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

// cleaning Cloudinary files if validation fails
// export const cleanupUploadedFiles = async (files) => {
//     if (!files) return;
//     const allFiles = [];
//     if (files['prodImage']) allFiles.push(files['prodImage'][0]);
//     if (files['prodImages']) allFiles.push(...files['prodImages']);

//     for (const file of allFiles) {
//         await deleteCloudinaryFiles(file);
//     }
// };

// cleaning Cloudinary files if validation fails
export const cleanupUploadedFiles = async (files) => {
    if (!files) return;
    // Direct poora files object bhej do, logic deleteCloudinaryFiles sambhaal lega
    await deleteCloudinaryFiles(files);
};

// multiple image deletions from Cloudinary - update api
export const deleteGalleryImages = async (imageArray) => {
    try {
        if (imageArray && Array.isArray(imageArray) && imageArray.length > 0) {
            // Saari images ko parallel delete karne ke liye Promise.all use karein (Fast)
            await Promise.all(
                imageArray.map(imgUrl => deleteOldFileFromCloudinary(imgUrl))
            );
            console.log(`Successfully deleted ${imageArray.length} gallery images.`);
        }
    } catch (error) {
        console.error("Error in deleteGalleryImages helper:", error);
    }
};