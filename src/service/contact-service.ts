import type { User } from "@prisma/client";
import { toContactRespose, type ContactResponse, type CreateContactRequest } from "../model/contact-model";
import { ContactValidation } from "../validation/contact-validation";
import { Validate } from "../validation/validation";
import { prismaClient } from "../application/database";

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
}