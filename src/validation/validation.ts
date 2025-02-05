import type { ZodType } from "zod";

export class Validate {
    static validate<T>(schema: ZodType, data: T) : T {
        return schema.parse(data);
    }
}