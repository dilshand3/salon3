import { Request, Response } from "express";
import { User } from "../model/user.model";

interface IsignupRes {
    success: boolean;
    message: string;
    data?: object
}

export const signUp = async (req: Request, res: Response<IsignupRes>): Promise<any> => {
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

        res.status(200).json({
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
