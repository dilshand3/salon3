import { Router } from "express";
import { completeProfile, login } from "../controller/user.controller";

const router = Router();

router.route("/user/completeProfile").put(completeProfile);
router.route("/user/login").post(login);

export default router;