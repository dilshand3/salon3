import { Router } from "express";
import { addWorker, updateAvatar, deleteWorker } from "../controller/worker.controller";
import { VerifyToken } from "../middlewares/verifyToken.middlware";
import { upload } from "../middlewares/multer.middleware";
const router = Router();

router.route("/worker/addWorker").post(VerifyToken, upload.single("avatar"), addWorker);
router.route("/worker/updateAvatar/:workerId").put(
    upload.single("avatar"),
    updateAvatar
);
router.route("/worker/deleteWorker/:workerId").get(VerifyToken, deleteWorker);

export default router;