
import { z, type ZodType } from "zod";

export class UserValidation {
    static readonly REGISTER : ZodType = z.object({
        username: z
        .string()
        .min(5, { message: "Username harus terdiri dari minimal 5 karakter." })
        .max(100, { message: "Username tidak boleh lebih dari 100 karakter." }),
        password: z
        .string()
        .min(8, { message: "Password harus terdiri dari minimal 8 karakter." }) // Menambahkan panjang minimal
        .max(100, { message: "Password tidak boleh lebih dari 100 karakter." })
        .regex(/(?=.*[A-Z])/, { message: "Password harus mengandung setidaknya satu huruf kapital." })
        .regex(/(?=.*\d)/, { message: "Password harus mengandung setidaknya satu angka." }),
        name: z
        .string()
        .min(1, { message: "Nama tidak boleh kosong." })
        .max(100, { message: "Nama tidak boleh lebih dari 100 karakter." })
    });


    
}