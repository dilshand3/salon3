import { Response } from "express";
import { Review } from "../model/review.model";
import { User } from "../model/user.model";
import { Salon } from "../model/salon.model";
import { IauthnticatedRequest } from "../middlewares/verifyToken.middlware";
import mongoose from "mongoose";

interface Iresponse {
    success: boolean;
    message: string;
    data?: object;
}

interface IaddReviewReq {
    starRating: Number;
    message: string;
}

type TaddReviewReq = IauthnticatedRequest & {
    body?: IaddReviewReq
}

export const addReview = async (req: TaddReviewReq, res: Response<Iresponse>): Promise<void> => {
    try {
        const userId = req.userId;
        const { shopId } = req.params;
        if (!shopId || !userId || !mongoose.isValidObjectId(userId) || !mongoose.isValidObjectId(shopId)) {
            res.status(400).json({
                success: false,
                message: "Valid Id required"
            })
            return;
        }
        const existedUser = await User.findById(userId);
        const existedSalon = await Salon.findById(shopId);
        if (!existedSalon || !existedUser) {
            res.status(404).json({
                success: false,
                message: "User or Salon not found"
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

        const { starRating, message } = req.body;
        if (!starRating || !message) {
            res.status(400).json({
                success: false,
                message: "All field required"
            })
            return;
        }

        const createReview = await Review.create({
            starRating,
            message,
            user: userId,
            salon: shopId
        });
        existedSalon.review?.push(createReview._id);
        existedUser.review?.push(createReview._id);
        await existedSalon.save();
        await existedUser.save();
        if (!createReview) {
            res.status(404).json({
                success: false,
                message: "Review not found or not created"
            })
            return;
        }
        res.status(201).json({
            success: true,
            message: "Review Created Successfull",
            data : createReview
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const deleteReview = async (req : IauthnticatedRequest,res : Response<Iresponse>):Promise<void> =>{
    try {
        const userId = req.userId;
        if (!userId || !mongoose.isValidObjectId(userId)) {
            res.status(400).json({
                success : false,
                message : "valid Id required"
            })
        }
    } catch (error) {
        res.status(500).json({
            success : false,
            message : "Internal Server Error"
        })
    }
}