import { Router } from "express";
import { completeProfile, GetcurrentUser, login,logOut } from "../controller/user.controller";
import { VerifyToken } from "../middlewares/verifyToken.middlware";

const router = Router();

router.route("/user/completeProfile").put(completeProfile);
router.route("/user/login").post(login);
router.route("/user/GetCurrentUser").get(VerifyToken, GetcurrentUser);
router.route("/user/logout").get(VerifyToken,logOut);

export default router;