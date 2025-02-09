import type { User } from "@prisma/client";
import { toContactRespose, type ContactResponse, type CreateContactRequest } from "../model/contact-model";
import { ContactValidation } from "../validation/contact-validation";
import { Validate } from "../validation/validation";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";

export class ConatactService {

    static async create(user: User, request: CreateContactRequest): Promise<ContactResponse> {
        
        //validasi request
        const contactRequest = Validate.validate(ContactValidation.CREATE, request);

        
        const record = {
            ...contactRequest,
            ...{username: user.username} //agar bisa data username karena username harus ada untuk bisa insert data di tabel contact
        }

        const contact = await prismaClient.contact.create({
           data: record
        });


        return toContactRespose(contact)

    }


    static async get(user: User, id: number): Promise<ContactResponse> {

        const contact = await prismaClient.contact.findFirst({
            where: {
                id: id,
                username: user.username 
            }
        });

        if (!contact) {
            throw new ResponseError(404,"Contact not alredy exist");
        }

        return toContactRespose(contact);
    }
}