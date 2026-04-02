
import cloudinary from '../config/cloudinary.js';

//delete file or files from cloudinary - when err occur
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