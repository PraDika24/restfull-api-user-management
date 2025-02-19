import type { Response, NextFunction } from "express";
import type { UserRequest } from "../type/user-request";
import type { CreateAddressRequest, GetAddress, RemoveAddress, UpdateAddressRequest } from "../model/address-model";
import { AddressService } from "../service/address-service";

export class AddressController {
    static async create(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request : CreateAddressRequest = req.body as CreateAddressRequest;
            request.contact_id = Number(req.params.contactId);
            const response = await AddressService.create(req.user!, request);
            res.status(200).json({
                data: response
            });

        } catch(e) {
            next(e)
        }
    }

    static async get(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request : GetAddress = {
                contactId: Number(req.params.contactId),
                addressId: Number(req.params.addressId),
            }

            const response = await AddressService.get(req.user!, request);
            res.status(200).json({
                data: response
            });

        } catch(e) {
            next(e)
        }
    }


    static async update(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request : UpdateAddressRequest = req.body as UpdateAddressRequest
            request.id = Number(req.params.addressId);
            request.contact_id = Number(req.params.contactId)

            const response = await AddressService.update(req.user!, request);
            res.status(200).json({
                data: response
            });

        } catch(e) {
            next(e)
        }
    }


    static async remove(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request : RemoveAddress = {
                contactId: Number(req.params.contactId),
                addressId: Number(req.params.addressId),
            }

            await AddressService.remove(req.user!, request);
            res.status(200).json({
                data: 'OK'
            });

        } catch(e) {
            next(e)
        }
    }

    static async list(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request = Number(req.params.contactId)

            const response = await AddressService.list(req.user!, request);
            res.status(200).json({
                data: response
            });

        } catch(e) {
            next(e)
        }
    }
}