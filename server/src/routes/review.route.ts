import { Router } from "express";
import { addReview } from "../controller/review.controller";
import { VerifyToken } from "../middlewares/verifyToken.middlware";
const router = Router();

router.route("/review/addReview/:shopId").post(VerifyToken,addReview)

export default router;