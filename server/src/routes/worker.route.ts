import { Router } from "express";
import { addWorker } from "../controller/worker.controller";
import { VerifyToken } from "../middlewares/verifyToken.middlware";
import { upload } from "../middlewares/multer.middleware";
const router = Router();

router.route("/shop/addWorker").post(VerifyToken, upload.single("avatar"), addWorker);

export default router;