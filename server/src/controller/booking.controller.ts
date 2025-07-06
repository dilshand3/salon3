import { Request, Response } from "express";
import { Booking } from "../model/Booking.model";
import { IauthnticatedRequest } from "../middlewares/verifyToken.middlware";
import mongoose from "mongoose";
import { User } from "../model/user.model";
import { Salon } from "../model/salon.model";

interface Iresponse {
    success: boolean;
    message: string;
    data?: object;
}

interface IbookAppointmentReq {
    service: string;
    worker?: string;
    note?: string;
    time: Date;
}

type TbookAppointment = IauthnticatedRequest & {
    body?: IbookAppointmentReq
}

export const bookAppointment = async (req: TbookAppointment, res: Response<Iresponse>): Promise<void> => {
    try {
        const userId = req.userId;
        const { salonId } = req.params;
        if (!userId || !salonId || !mongoose.isValidObjectId(userId) || !mongoose.isValidObjectId(salonId)) {
            res.status(400).json({
                success: false,
                message: "Valid id required"
            })
            return;
        }
        if (!req.body) {
            res.status(400).json({
                success: false,
                message: "All field required"
            })
            return;
        }
        const existedUser = await User.findById(userId);
        const existedSalon = await Salon.findById(salonId);
        if (!existedSalon || !existedUser) {
            res.status(404).json({
                success: false,
                message: "User or salon not found"
            })
            return;
        }
        const { service, worker, note, time } = req.body;
        if (!service || !time) {
            res.status(400).json({
                success : false,
                message : "Service and time required"
            })
            return;
        }

        const createAppointment = await Booking.create({
            user : userId,
            salon : salonId,
            service,
            worker,
            time,
            note
        });
        await User.findByIdAndUpdate(
            userId,
            {
                $push : {
                    appointments : createAppointment._id
                }
            }
        )
        if (!createAppointment) {
            res.status(404).json({
                success : false,
                message : "Booking failed"
            })
            return;
        }
        res.status(201).json({
            success : true,
            message : "Booking request sent successfully",
            data : createAppointment
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
        return;
    }
}