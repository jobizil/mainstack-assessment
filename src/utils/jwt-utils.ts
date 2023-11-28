import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_EXPIRY, JWT_SECRET } from "./config";

import { TokenExpiredError, SignOptions } from 'jsonwebtoken';

// Generate token
export const generateToken = (payload: any) => {
    const options: SignOptions = {
        expiresIn: JWT_EXPIRY,
        algorithm: "HS256"

    };
    return jwt.sign(payload, JWT_SECRET as string, options);
}

// Verify token
export const verifyToken = (token: string) => {
    try {
        let decoded: any;
        decoded = jwt.verify(token, JWT_SECRET as string)
        return decoded;
    }
    catch (error) {
        if (error instanceof TokenExpiredError) {
            throw new Error("Token expired");
        }
        throw new Error("Invalid token");


    }
}

// Authenticate token
export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorization = req.headers["authorization"] as string;

        if (!authorization) {
            return res.status(401).json({
                message: "Missing authorization header"
            });

        }
        const bearer: string[] = authorization.split(" ");

        if (!bearer || bearer.length < 2) {

            return res.status(401).json({
                message: "Invalid or expired token"
            });
        }

        const token: string = bearer[1];

        const decoded = await verifyToken(token);

        if (decoded) {
            res.locals.user = decoded;
        }

        return next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
}