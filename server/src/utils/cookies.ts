import jwt from 'jsonwebtoken';
import { Response } from 'express';

export const generateTokenAndSetCookie = async (res: Response, userId: string): Promise<string> => {
    const sessionId = jwt.sign(
        { userId },
        process.env.JWT_SECERET as string,
        {
            expiresIn: "7d"
        }
    );

    res.cookie("sessionId", sessionId, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: "/"
    });
    return sessionId
}