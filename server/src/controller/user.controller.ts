import { Request, Response } from "express";
import { User } from "../model/user.model";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/cookies";
import { IauthnticatedRequest } from "../middlewares/verifyToken.middlware";
import mongoose from "mongoose";
import { Salon } from "../model/salon.model";

interface IResponse {
    success: boolean;
    message: string;
    data?: object
}

export const signUp = async (req: Request, res: Response<IResponse>): Promise<any> => {
    try {
        const googleProfile: any = req.user;
        const email = googleProfile.emails[0].value;
        let existedUser = await User.findOne({ email });

        if (existedUser) {
            return res.status(400).json({
                success: false,
                message: "User already existed"
            })
        }

        const createdUser = await User.create({
            email
        });

        res.status(201).json({
            success: true,
            message: "User created Successfully",
            data: {
                createdUser
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

interface IcompleteProfileReq {
    email: string;
    name: string;
    password: string;
    number: string;
}

export const completeProfile = async (req: Request<{}, {}, IcompleteProfileReq>, res: Response<IResponse>): Promise<any> => {
    try {
        const { email, name, password, number } = req.body;
        if (!email || !name || !password || !number) {
            return res.status(400).json({
                success: false,
                message: "All field required!"
            })
        }

        const hashedpassword = await bcrypt.hash(password, 10)

        const updatedUser = await User.findOneAndUpdate(
            { email },
            {
                name,
                password: hashedpassword,
                number,
                isVerified: true
            },
            { new: true }
        )

        if (!updatedUser) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }

        res.status(201).json({
            success: true,
            message: "Profile updated successfully",
            data: {
                updatedUser
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

interface IloginReq {
    email?: string;
    number?: string;
    password: string;
}

export const login = async (req: Request<{}, {}, IloginReq>, res: Response<IResponse>): Promise<void> => {
    try {
        const { email, number, password } = req.body;
        if ((!email && !number) || !password) {
            res.status(400).json({
                success: false,
                message: "Email or number required"
            })
            return;
        }

        const user = await User.findOne(email ? { email } : { number });

        if (!user) {
            res.status(404).json({
                success: false,
                message: "User not found"
            })
            return;
        }

        const isMatch = await bcrypt.compare(password, user?.password!);

        if (!isMatch) {
            res.status(400).json({
                success: false,
                message: "Invalid password"
            })
            return;
        }

        await generateTokenAndSetCookie(res, user?._id.toString() as string)

        res.status(200).json({
            success: true,
            message: "Login successfully",
            data: {
                user
            }
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const GetcurrentUser = async (req: IauthnticatedRequest, res: Response<IResponse>): Promise<void> => {
    try {
        const userId = req.userId;

        if (!mongoose.isValidObjectId(userId)) {
            res.status(401).json({
                success: false,
                message: "Invalid UserId"
            })
        }

        const existedUser = await User.findById(userId);
        if (!existedUser) {
            res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "User get successfully",
            data: {
                existedUser
            }
        })
    } catch {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

export const logOut = async (req: IauthnticatedRequest, res: Response<IResponse>): Promise<void> => {
    try {
        res.clearCookie("sessionId", {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: "/"
        });
        res.status(200).json({ success: true, message: "Logged out successfully" });
    } catch {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const followSalon = async (req: IauthnticatedRequest, res: Response<IResponse>): Promise<void> => {
    try {
        const userId = req.userId;
        const { salonId } = req.params;
        if (!salonId || !userId || !mongoose.isValidObjectId || !mongoose.isValidObjectId(userId)) {
            res.status(401).json({
                success: false,
                message: "Valid Id required"
            })
            return;
        }

        await User.findByIdAndUpdate(
            userId,
            { $addToSet: { following: salonId } }
        )

        await Salon.findByIdAndUpdate(
            salonId,
            { $addToSet: { follower: userId } }
        )
        res.status(200).json({
            success: true,
            message: "Salon followed successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const unFolloSalon = async (req: IauthnticatedRequest, res: Response<IResponse>): Promise<void> => {
    try {
        const userId = req.userId;
        const { salonId } = req.params;
        if (!salonId || !userId || !mongoose.isValidObjectId || !mongoose.isValidObjectId(userId)) {
            res.status(401).json({
                success: false,
                message: "Valid Id required"
            })
            return;
        }

      await User.findByIdAndUpdate(
        userId,
        {
            $pull : {
                following : salonId
            }
        }
      )
      await Salon.findByIdAndUpdate(
        salonId,
        {
            $pull : {
                follower : userId
            }
        }
      )
      res.status(200).json({
        success : true,
        message : "Salon unfollowed successfully"
      })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const getUserFollowingList = async ( req : IauthnticatedRequest,res : Response<IResponse>):Promise<void>=> {
    try {
        const userId = req.userId;
        if (!userId || !mongoose.isValidObjectId) {
            res.status(401).json({
                success :false,
                message : "Valid UserId required"
            })
            return;
        }
        const existedUser = await User.findById(userId).populate({
            path : "following",
            select : "shopName city profilePhoto"
        });
        if (!existedUser) {
            res.status(404).json({
                success : false,
                message : "Following List not found"
            })
            return;
        }
        res.status(200).json({
            success : true,
            message : "Following List fetched successfully",
            data : existedUser.following as object
        })
    } catch (error) {
         res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const getUserAppointmentsList = async (req : IauthnticatedRequest,res : Response<IResponse>):Promise<void>=> {
    try {
        const userId = req.userId;
        if (!userId || !mongoose.isValidObjectId(userId)) {
            res.status(400).json({
                success : false,
                message : "Valid UserId required"
            })
            return;
        }
        const existedUser = await User.findById(userId).populate({
            path : "Booking",
            select : "appointments"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}