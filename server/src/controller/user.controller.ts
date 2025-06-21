import { Request, Response } from "express";
import { User } from "../model/user.model";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/cookies";
import { IauthnticatedRequest } from "../middlewares/verifyToken.middlware";
import mongoose from "mongoose";

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
        }

        const user = await User.findOne(email ? { email } : { number });

        if (!user) {
            res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        const isMatch = await bcrypt.compare(password, user?.password!);

        if (!isMatch) {
            res.status(400).json({
                success: false,
                message: "Invalid password"
            });
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