import { Request, Response } from "express";
import { Salon } from "../model/salon.model";
import { generateShopId } from "../utils/shopId";
import bcrypt from 'bcryptjs';
import { generateTokenAndSetCookie } from "../utils/cookies";

interface IResponse {
    success: boolean;
    message: string;
    data?: object
}

interface IregsiterSalonReq {
    shopName: string;
    number: string;
    password: string
}

export const registerSalon = async (req: Request<{}, {}, IregsiterSalonReq>, res: Response<IResponse>): Promise<void> => {
    try {
        const { shopName, number, password } = req.body;
        if (!shopName || !number || !password) {
            res.status(400).json({
                success: false,
                message: "All field required"
            })
        }
        const shopId = generateShopId(shopName);
        const hashedpassword = await bcrypt.hash(password, 10);

        const registedShop = await Salon.create({
            shopId,
            shopName,
            number,
            password: hashedpassword
        });
        if (!registedShop) {
            res.status(404).json({
                success: false,
                message: "Shop didn't register"
            })
        }
        generateTokenAndSetCookie(res, registedShop?._id.toString() as string);
        res.status(201).json({
            success: true,
            message: "shop registeration success",
            data: registedShop
        })
    } catch {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}
