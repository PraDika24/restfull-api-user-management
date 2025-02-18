import type { User } from "@prisma/client";
import { toAddressResponse, type AddressResponse, type CreateAddressRequest } from "../model/address-model";
import { Validate } from "../validation/validation";
import { AddressValidation } from "../validation/address-validation";
import { ConatactService } from "./contact-service";
import { prismaClient } from "../application/database";

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
}