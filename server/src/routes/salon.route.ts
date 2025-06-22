import { Router } from "express";
import { registerSalon } from "../controller/salon.controller";
const router = Router();

router.route("/shop/registerShop").post(registerSalon);

export default router;