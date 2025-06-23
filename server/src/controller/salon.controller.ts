import { Request, Response } from "express";
import { Salon } from "../model/salon.model";
import { generateShopId } from "../utils/shopId";
import bcrypt from 'bcryptjs';
import { generateTokenAndSetCookie } from "../utils/cookies";
import { IauthnticatedRequest } from "../middlewares/verifyToken.middlware";
import mongoose from "mongoose";
import { getLatLongFromMap } from "../utils/getLocationOnMap";

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
            });
            return
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
            });
            return
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

interface IAddSalonAddressReq {
    address: string;
    city: string;
    state?: string;
    pinCode?: string;
}

type TaddSalonAddressReq = IauthnticatedRequest & {
    body?: IAddSalonAddressReq
};

export const AddSalonAddress = async (req: TaddSalonAddressReq, res: Response<IResponse>): Promise<void> => {
    try {
        const salonId = req.userId;
        if (!salonId || !mongoose.isValidObjectId(salonId)) {
            res.status(401).json({
                success: false,
                message: "Please provide Valid SalonId"
            })
            return;
        }
        let existedShop = await Salon.findById(salonId);
        if (!existedShop) {
            res.status(404).json({
                success: false,
                message: "Salon not found"
            })
            return;
        }
        if (!req.body) {
            res.status(400).json({
                success: false,
                message: "Body is required"
            })
            return;
        }
        const { address, city, state, pinCode } = req.body;
        if (!address || !city || !state || !pinCode) {
            res.status(400).json({
                success: false,
                message: "All field required"
            })
            return;
        }

        const fullAddress = `${address}, ${city}, ${state}, ${pinCode}`;
        const coordinates = await getLatLongFromMap(fullAddress);
        const updateSalon = await Salon.findByIdAndUpdate(
            salonId,
            {
                address,
                city,
                state,
                pinCode,
                latitude: coordinates?.latitude,
                longitude: coordinates?.longitude
            }, { new: true });
        if (!updateSalon) {
            res.status(404).json({
                success: false,
                message: "Updated Salon not found"
            })
            return;
        }
        res.status(201).json({
            success: true,
            message: "Salon location added succesfully",
            data: updateSalon
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

