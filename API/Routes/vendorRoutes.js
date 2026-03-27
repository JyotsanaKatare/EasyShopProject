
import express from 'express';
import { vendorSignUp, vendorLogin, forgotPassword, resetPassword, countVendor, getVendor, updateVendorDetail, vendorLogout } from '../Controllers/vendorController.js';
import { upload } from '../Middlewares/imageStorage.js';
import authMiddleware from '../Middlewares/authMiddleware.js';

const router = express.Router();

const vendorUploads = upload.fields([
    { name: 'storeLogo', maxCount: 1 },
    { name: 'categoryLicenseUpload', maxCount: 1 },
    { name: 'panCardUpload', maxCount: 1 },
    { name: 'gstDocumentUpload', maxCount: 1 },
    { name: 'bankDocumentUpload', maxCount: 1 }
]);

//public
router.post("/vendor-signup",vendorUploads, vendorSignUp);
router.post("/vendor-login", vendorLogin);
router.post("/vendor-forgot-password", forgotPassword);
router.post("/vendor-reset-password/:vendor_id/:token", resetPassword);
router.get("/vendor-count", countVendor);

//protected
router.get("/vendor-get/:vendor_id", authMiddleware(['vendor']), getVendor);
router.put("/vendor-detail-update",authMiddleware(['vendor']), updateVendorDetail);
router.post("/vendor-logout", authMiddleware(['vendor']), vendorLogout);

export default router;