import { z, ZodType } from 'zod'

export class AddressValidation {
    static readonly CREATE : ZodType = z.object({
        street: z
        .string()
        .min(1, { message: "harus terdiri dari minimal 1 karakter."})
        .max(100, { message: "harus terdiri dari maxsimal 100 karakter."}),
        city: z
        .string()
        .min(1, { message: "harus terdiri dari minimal 1 karakter."})
        .max(100, { message: "harus terdiri dari maxsimal 100 karakter."}),
        province: z
        .string()
        .min(1, { message: "harus terdiri dari minimal 1 karakter."})
        .max(100, { message: "harus terdiri dari maxsimal 100 karakter."}),
        country: z
        .string()
        .min(1, { message: "harus terdiri dari minimal 1 karakter."})
        .max(100, { message: "harus terdiri dari maxsimal 100 karakter."}),
        postal_code: z
        .string()
        .min(1, { message: "harus terdiri dari minimal 1 karakter."})
        .max(100, { message: "harus terdiri dari maxsimal 100 karakter."}),
        contact_id: z
        .number()
        .positive({ message: "harus bilangan positif"})
    });

    static readonly GET: ZodType = z.object({
        contactId: z
        .number()
        .positive({ message: "harus bilangan positif"}),
        addressId: z
        .number()
        .positive({ message: "harus bilangan positif"})
    })
}