import * as z from "zod";

export const SendFormSchema = z.object({
    email: z.string().email({
        message: "Email is required",
    }),
    name: z.string().min(2, {
        message: "Minimum 2 char required",
    }),
    description: z.string().min(1, {
        message: "Description is required",
    })
})