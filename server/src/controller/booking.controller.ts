import { Request, Response } from "express";
import { Booking } from "../model/Booking.model";
import { IauthnticatedRequest } from "../middlewares/verifyToken.middlware";
import mongoose, { Types } from "mongoose";

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

    } catch (error) {
        res.status(500).json({
            success : false,
            message : "Internal Server Error"
        })
    }
}