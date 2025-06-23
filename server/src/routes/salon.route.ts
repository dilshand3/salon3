import { Router } from "express";
import { AddSalonAddress, registerSalon } from "../controller/salon.controller";
import { VerifyToken } from "../middlewares/verifyToken.middlware";
const router = Router();

router.route("/shop/registerShop").post(registerSalon);
router.route("/shop/Addaddress").put(VerifyToken,AddSalonAddress);

export default router;