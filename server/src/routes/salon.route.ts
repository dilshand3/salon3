import { Router } from "express";
import { AddSalonAddress, registerSalon,uploadProfileImages,uploadGalleryImgs, addContact, addSocialLinks, salonLogin, followerList } from "../controller/salon.controller";
import { VerifyToken } from "../middlewares/verifyToken.middlware";
import { upload } from "../middlewares/multer.middleware";
const router = Router();

router.route("/shop/registerShop").post(registerSalon);
router.route("/shop/login").post(salonLogin);
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
router.route("/shop/addSocialLinks").post(VerifyToken,addSocialLinks);
router.route("/shop/followerList").get(VerifyToken,followerList);

export default router;