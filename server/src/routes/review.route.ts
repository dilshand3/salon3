import { Router } from "express";
import { addReview, deleteReview } from "../controller/review.controller";
import { VerifyToken } from "../middlewares/verifyToken.middlware";
const router = Router();

router.route("/review/addReview/:shopId").post(VerifyToken, addReview);
router.route("/review/deleteReview/:reviewId").get(VerifyToken, deleteReview);

export default router;