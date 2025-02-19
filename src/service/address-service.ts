import type { User } from "@prisma/client";
import { toAddressResponse, type AddressResponse, type CreateAddressRequest, type GetAddress } from "../model/address-model";
import { Validate } from "../validation/validation";
import { AddressValidation } from "../validation/address-validation";
import { ConatactService } from "./contact-service";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";

export class AddressService {
    static async create(user:  User, request: CreateAddressRequest): Promise<AddressResponse> {
        // validasi
        const createRequest = Validate.validate(AddressValidation.CREATE, request);

        //check jika ada id request param ada di database tabel contact
        await ConatactService.checkContactMustExist(request.contact_id, user.username);

        //jika ada id contact
        const response = await prismaClient.address.create({
            data: createRequest
        });

        return toAddressResponse(response);
    }


    static async get(user: User, request: GetAddress): Promise<AddressResponse> {
        // validasi
        const getRequest = Validate.validate(AddressValidation.GET, request);

        console.log(`Mencari address dengan id: ${getRequest.addressId} dan contactId: ${getRequest.contactId}`);


         //check jika ada id request param ada di database tabel contact
         await ConatactService.checkContactMustExist(request.contactId, user.username);

         //mencari data address id
         const recordAddress = await prismaClient.address.findFirst({
            where:{
                id: getRequest.addressId,
                contact_id: getRequest.contactId
            }
         });

         if (!recordAddress) {
            throw new ResponseError(404,"Address Not Found")
         }

         return toAddressResponse(recordAddress);
    }
}