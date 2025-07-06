import { Router } from "express";
import { bookAppointment } from "../controller/booking.controller";
import { VerifyToken } from "../middlewares/verifyToken.middlware";
const router = Router();

router.route("/booking/createAppointment/:salonId").post(VerifyToken,bookAppointment);

export default router;