import { z, type ZodType } from "zod";

export class ContactValidation {
    static readonly CREATE : ZodType = z.object({
        firstname: z
        .string()
        .min(1, { message: " firstname harus terdiri dari minimal 1 karakter."})
        .max(100, { message: " firstname harus terdiri dari maxsimal 100 karakter."}),
        lastname: z
        .string()
        .min(1, { message: " lastname harus terdiri dari minimal 1 karakter."})
        .max(100, { message: "lastname harus terdiri dari maxsimal 100 karakter."})
        .optional(),
        email: z
        .string()
        .min(1, { message: " email harus terdiri dari minimal 1 karakter."})
        .max(100, { message: "email harus terdiri dari maxsimal 100 karakter."})
        .email( { message: "Email harus sesuai dengan strukturnya."} )
        .optional(),
        phone: z
        .string()
        .min(1, { message: " phone harus terdiri dari minimal 1 karakter."})
        .max(20, { message: "phone harus terdiri dari maxsimal 20 karakter."})
        .optional()
    });

    static readonly UPDATE : ZodType = z.object({
        firstname: z
        .string()
        .min(1, { message: " firstname harus terdiri dari minimal 1 karakter."})
        .max(100, { message: " firstname harus terdiri dari maxsimal 100 karakter."}),
        lastname: z
        .string()
        .min(1, { message: " lastname harus terdiri dari minimal 1 karakter."})
        .max(100, { message: "lastname harus terdiri dari maxsimal 100 karakter."})
        .optional(),
        email: z
        .string()
        .min(1, { message: " email harus terdiri dari minimal 1 karakter."})
        .max(100, { message: "email harus terdiri dari maxsimal 100 karakter."})
        .email( { message: "Email harus sesuai dengan strukturnya."} )
        .optional(),
        phone: z
        .string()
        .min(1, { message: " phone harus terdiri dari minimal 1 karakter."})
        .max(20, { message: "phone harus terdiri dari maxsimal 20 karakter."})
        .optional()
    });
}