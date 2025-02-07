import type { Request, Response, NextFunction } from "express";
import { prismaClient } from "../application/database";
import type { UserRequest } from "../type/user-request";

export const  authMiddleware = async (req : UserRequest, res: Response, next: NextFunction) => {
    const token = req.get("X-Auth-Token");

    if (token) {
        const user = await prismaClient.user.findFirst({
            where: {
                token: token
            }
        });

        if (user) {
            req.user = user;
            next();
            return;
        }

    }

    res.status(401).json({
        error: "Unauthorized"
    }).end();

}