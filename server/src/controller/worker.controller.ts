import { Request, Response } from "express";
import { Worker } from "../model/worker.model";
import { IauthnticatedRequest } from "../middlewares/verifyToken.middlware";
import { Salon } from "../model/salon.model";
import mongoose from "mongoose";
import { uploadOnCloudinary } from "../utils/cloudinary";

interface Iresponse {
    success: boolean;
    message: string;
    data?: object;
}

interface IaddWorkerReq {
    name: string;
    avatar: string;
    spcelization?: string;
}

type TaddWorker = IauthnticatedRequest & {
    body?: IaddWorkerReq
}

export const addWorker = async (req: TaddWorker, res: Response<Iresponse>): Promise<void> => {
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

        const { name, spcelization } = req.body;
        if (!name || !spcelization) {
            res.status(400).json({
                success: false,
                message: "All field required"
            })
            return;
        }

        let avatarUrl: string | undefined = undefined;
        if (req.file?.path) {
            const uploadedAvatar = await uploadOnCloudinary(req.file.path);
            if (!uploadedAvatar) {
                res.status(500).json({
                    success: false,
                    message: "Avatar upload failed"
                })
                return;
            }
            avatarUrl = uploadedAvatar.url;
        }

        const addedWorker = await Worker.create({
            name,
            spcelization,
            avatar: avatarUrl || ""
        });

        existedShop.workerList = existedShop.workerList || [];
        existedShop.workerList.push(addedWorker._id);
        await existedShop.save();

        res.status(201).json({
            success: true,
            message: "Worker added successfully",
            data: addedWorker
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}