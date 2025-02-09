import type { Response, NextFunction } from "express";
import type { UserRequest } from "../type/user-request";
import type { CreateContactRequest, UpdateContactRequest } from "../model/contact-model";
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

    static async get(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request = Number(req.params.contactId);
            const response = await ConatactService.get(req.user!, request);
            res.status(200).json({
                data: response
            })


        } catch(e) {
            next(e);
        }
    }

    static async update(req: UserRequest, res: Response, next: NextFunction){
        try {
            const reqParams = Number(req.params.contactId)
            const request: UpdateContactRequest = req.body as UpdateContactRequest;
            const response = await ConatactService.update(req.user!, reqParams, request);
            res.status(200).json({
                data: response
            });

        } catch (e) {
            next(e);
        }
    }
}