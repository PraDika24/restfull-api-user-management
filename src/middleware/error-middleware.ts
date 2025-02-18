import type { Response, Request, NextFunction } from "express";
import { ZodError } from "zod";
import { ResponseError } from "../error/response-error";

export const errorMiddleware = async (error: Error, req: Request, res: Response, next: NextFunction) => {
    // jika error nya dalam validasi
    if (error instanceof ZodError){
        res.status(400).json({
            error: "Validate Error",
            message: error.message 
        });
    }

    // Response Error, seperti database
    else if(error instanceof ResponseError) {
        res.status(error.status).json({
            error: error.message
        });
    }
    else {
        res.status(500).json({
            error: error.message
        });
    }
}