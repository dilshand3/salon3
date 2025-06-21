import { Request, Response, NextFunction } from "express";
import Jwt, { JwtPayload } from 'jsonwebtoken';

export interface IauthnticatedRequest extends Request {
    userId?: string;
}

interface TokenPayload extends JwtPayload {
    userId: string;
}

interface Iresponse {
    success : boolean;
    message : string;
    data? : object;
}

export const VerifyToken = async (req: IauthnticatedRequest, res: Response<Iresponse>, Next: NextFunction): Promise<void> => {
    const sessionId = req.cookies.sessionId;

    if (!sessionId) {
        res.status(401).json({
            success: false,
            message: "UnAuthorized- no token provided"
        })
    }

    try {
        const decoded = Jwt.verify(
            sessionId,
            process.env.JWT_SECRET as string,
        ) as TokenPayload;

        if (!decoded.userId) {
            res.status(401).json({
                success : false,
                message : "UnAuthorized - Invalid Token"
            })
        }

        req.userId = decoded.userId;
        Next()
    } catch {
        res.status(500).json({
            success : false,
            message : "Internal Server Error"
        })
    }
}