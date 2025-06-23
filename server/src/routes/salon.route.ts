import { Router } from "express";
import { AddSalonAddress, registerSalon,uploadProfileImages,uploadGalleryImgs, addContact } from "../controller/salon.controller";
import { VerifyToken } from "../middlewares/verifyToken.middlware";
import { upload } from "../middlewares/multer.middleware";
const router = Router();

router.route("/shop/registerShop").post(registerSalon);
router.route("/shop/Addaddress").put(VerifyToken,AddSalonAddress);
router.route("/shop/uploadProfileImg").post(
    VerifyToken,
    upload.single("profileImg"),
    uploadProfileImages
);
router.route("/shop/uploadGalleryImg").post(
    VerifyToken,
    upload.array('galleryImgs', 6),
    uploadGalleryImgs
)
router.route("/shop/contact").post(VerifyToken,addContact);

export default router;