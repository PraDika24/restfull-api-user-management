import type { Response, NextFunction } from "express";
import type { UserRequest } from "../type/user-request";
import type { CreateContactRequest } from "../model/contact-model";
import { ConatactService } from "../service/contact-service";

export class ContactController {

    static async create(req: UserRequest, res: Response, next: NextFunction){
        try {
            const request: CreateContactRequest = req.body as CreateContactRequest;
            const response = await ConatactService.create(req.user!, request);
            res.status(200).json({
                data: response
            })

        } catch (e) {
            next(e);
        }
    }
}