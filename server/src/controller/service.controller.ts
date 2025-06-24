import { Request, Response } from "express";
import { Service } from "../model/service.model";
import { Salon } from "../model/salon.model";
import mongoose from "mongoose";
import { IauthnticatedRequest } from "../middlewares/verifyToken.middlware";

interface Iresponse {
    success: boolean;
    message: string;
    data?: object
}

interface IaddServiceReq {
    serviceName: string;
    price: string;
    duration: string;
    description: string;
}

type TaddService = IauthnticatedRequest & {
    body: IaddServiceReq
}

export const addService = async (req: TaddService, res: Response<Iresponse>): Promise<void> => {
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
                message: "atleast one field required"
            })
            return;
        }

        const { serviceName, price, duration, description } = req.body;

        if (!serviceName || !price || !duration || !description) {
            res.status(400).json({
                success: false,
                message: "all field required"
            })
            return;
        }

        const createdService = await Service.create({
            serviceName,
            price,
            duration,
            description
        });

        if (!createdService) {
            res.status(404).json({
                success: false,
                message: "Something went wrong"
            })
            return;
        }
        existedShop?.ServiceList?.push(createdService._id);
        await existedShop.save();

        res.status(201).json({
            success: true,
            message: "Service created and added to salon",
            data: createdService
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const deleteService = async (req: IauthnticatedRequest, res: Response<Iresponse>): Promise<void> => {
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
        const { serviceId } = req.params;
        if (!serviceId || !mongoose.isValidObjectId) {
            res.status(403).json({
                success: false,
                message: "Please provide a valid Id"
            })
        }
        await Service.findByIdAndDelete(serviceId);

        if (existedShop.ServiceList) {
            existedShop.ServiceList = existedShop.ServiceList.filter(
                (id) => id.toString() !== serviceId
            );
            await existedShop.save();
        }

        res.status(200).json({
            success : true,
            message : "Service deleted Successfully"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}