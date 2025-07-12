import { Router } from "express";
import { completeProfile, followSalon, GetcurrentUser, getUserFollowingList, login,logOut, TotalVisitedShopList, unFolloSalon } from "../controller/user.controller";
import { VerifyToken } from "../middlewares/verifyToken.middlware";

const router = Router();

router.route("/user/completeProfile").put(completeProfile);
router.route("/user/login").post(login);
router.route("/user/GetCurrentUser").get(VerifyToken, GetcurrentUser);
router.route("/user/logout").get(VerifyToken,logOut);
router.route("/user/follow/:salonId").get(VerifyToken,followSalon);
router.route("/user/unfollow/:salonId").get(VerifyToken,unFolloSalon);
router.route("/user/followingList").get(VerifyToken,getUserFollowingList);
router.route("/user/TotalVisitedShopList").get(VerifyToken,TotalVisitedShopList);

export default router;