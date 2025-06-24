import Router from 'express';
import { addService, deleteService } from '../controller/service.controller';
import { VerifyToken } from '../middlewares/verifyToken.middlware';
import { getSalonDetail } from '../controller/salon.controller';
const router = Router();

router.route("/shop/addService").post(VerifyToken,addService);
router.route("/shop/deleteService/:serviceId").get(VerifyToken,deleteService);
router.route("/shop/getSalonDetail").get(VerifyToken,getSalonDetail);

export default router;