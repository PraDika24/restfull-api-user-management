import type { Address, User } from "@prisma/client";
import { toAddressResponse, type AddressResponse, type CreateAddressRequest, type GetAddress, type RemoveAddress, type UpdateAddressRequest } from "../model/address-model";
import { Validate } from "../validation/validation";
import { AddressValidation } from "../validation/address-validation";
import { ConatactService } from "./contact-service";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { add } from "winston";

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

    //refactor code

    static async checkAddressMustExist(contactId: number, addressId: number): Promise<Address> {

     //mencari data address id
     const address = await prismaClient.address.findFirst({
        where:{
            id: addressId,
            contact_id: contactId
        }
     });

     if (!address) {
        throw new ResponseError(404,"Address Not Found")
     }

     return address; // dalam bentuk tipe Address Prisma Client 

    }


    static async get(user: User, request: GetAddress): Promise<AddressResponse> {
        // validasi
        const getRequest = Validate.validate(AddressValidation.GET, request);

         //check jika ada id request param ada di database tabel contact
         await ConatactService.checkContactMustExist(getRequest.contactId, user.username);
         // check jika ada address
         const address = await this.checkAddressMustExist(getRequest.contactId, getRequest.addressId);

         return toAddressResponse(address);
    }

    static async update(user: User, request: UpdateAddressRequest): Promise<AddressResponse> {
        // validasi
        const updateRequest = Validate.validate(AddressValidation.UPDATE, request);

        //check jika ada id request param ada di database tabel contact
        await ConatactService.checkContactMustExist(updateRequest.contact_id, user.username);

        const address = await prismaClient.address.update({
            where:{
                id: updateRequest.id,
                contact_id: updateRequest.contact_id
            },
            data: updateRequest
        });
        return toAddressResponse(address);

    }

    static async remove(user: User, request: RemoveAddress): Promise<AddressResponse> {
        // validasi
        const removeRequest = Validate.validate(AddressValidation.REMOVE, request);

         //check jika ada id request param ada di database tabel contact
        await ConatactService.checkContactMustExist(removeRequest.contactId, user.username);
         // check jika ada address
        await this.checkAddressMustExist(removeRequest.contactId, removeRequest.addressId);

        const address = await prismaClient.address.delete({
            where:{
                id: removeRequest.addressId,
                contact_id: removeRequest.contactId
            }
        });

        return toAddressResponse(address);
    }


}