import type { Contact } from "@prisma/client";

export type ContactResponse = {
    id: number;
    firstname: string;
    lastname?: string | null; //kalo ga mau null disini, tinggal set | undifined pada lastname difunction toContactResponse
    email?: string | null; //ini mengikuti prisma model di Contact
    phone?: string | null;

}

export type CreateContactRequest = {
    firstname: string;
    lastname?: string;
    email?: string;
    phone?: string;

}

export function toContactRespose(contact : Contact): ContactResponse {
    return {
        id: contact.id,
        firstname: contact.firstname,
        lastname: contact.lastname,
        email: contact.email,
        phone: contact.phone,
    
    }
}