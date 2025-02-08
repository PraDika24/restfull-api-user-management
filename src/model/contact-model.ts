import type { Contact } from "@prisma/client";

export type ContactResponse = {
    id: number;
    first_name: string;
    last_name?: string | null; //kalo ga mau null disini, tinggal set | undifined pada lastname difunction toContactResponse
    email?: string | null; //ini mengikuti prisma model di Contact
    phone?: string | null;

}

export type CreateContactResquest = {
    first_name: string;
    last_name?: string;
    email?: string;
    phone?: string;

}

export function toContactRespose(contact : Contact): ContactResponse {
    return {
        id: contact.id,
        first_name: contact.firstname,
        last_name: contact.lastname,
        email: contact.email,
        phone: contact.phone,
    
    }
}