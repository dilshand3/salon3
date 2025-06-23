import Router from 'express';
import { addService, deleteService } from '../controller/service.controller';
import { VerifyToken } from '../middlewares/verifyToken.middlware';
const router = Router();

router.route("/shop/addService").post(VerifyToken,addService);
router.route("/shop/deleteService/:serviceId").get(VerifyToken,deleteService)

export default router;