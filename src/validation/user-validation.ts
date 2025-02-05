import { password } from "bun";
import { z, type ZodType } from "zod";

export class UserValidation {
    static readonly REGISTER : ZodType = z.object({
        username: z.string().min(5,{ message: "Must be 5 or more characters long"})
        .max(100, { message :"Must be 100 or fewer characters long"})
        .regex(/\S/, { message :"Must be no spaces or whitespace allowed"}),
        password: z.string().min(5,{ message: "Must be 5 or more characters long"})
        .max(100, { message :"Must be 100 or fewer characters long"})
        .regex(/(?=.*[A-Z])/, { message :"Must be contain Capital Word"})
        .regex(/(?=.*\d)/, { message :"Must be contain Number"}),
        name: z.string().min(1, { message: "Must be 1 or more characters long"})
        .max(100, { message :"Must be 100 or fewer characters long"})
    });

    
}