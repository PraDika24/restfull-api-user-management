import type { Contact, User } from "@prisma/client";
import { toContactRespose, type ContactResponse, type CreateContactRequest, type UpdateContactRequest } from "../model/contact-model";
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

    // refactor code agar lebih sedikit
    static async checkContactMustExist(contactId: number, username: string): Promise<Contact> {
         // search contact
         const contact = await prismaClient.contact.findFirst({
            where: {
                id: contactId,
                username: username
            }
        });

        if (!contact) {
            throw new ResponseError(404, "Contact not Found");
        }

        return contact;
    }

    static async get(user: User, id: number): Promise<ContactResponse> {

        // check jika ada contact
        const contact = await this.checkContactMustExist(id, user.username);
        return toContactRespose(contact);
    }

    static async update(user : User, id: number, request: UpdateContactRequest): Promise<ContactResponse> {
        
        // Validation request
        const updateContact = Validate.validate(ContactValidation.UPDATE, request);
        
        await this.checkContactMustExist(id, user.username);
       
        const updateRequest = await prismaClient.contact.update({
            where: {
                id: id,
                username: user.username
            },
            data: updateContact
        });

        return toContactRespose(updateRequest);
        
    }

    static async delete(user: User, id: number): Promise<ContactResponse> {
        await this.checkContactMustExist(id, user.username)
        
        const deleteContact = await prismaClient.contact.delete({
            where: {
                id: id,
                username: user.username
            }
        });

        return toContactRespose(deleteContact);
    }
}