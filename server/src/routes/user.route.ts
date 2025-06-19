import { Router } from "express";
import { completeProfile } from "../controller/user.controller";

const router = Router();

router.route("/user/completeProfile").put(completeProfile);

export default router;