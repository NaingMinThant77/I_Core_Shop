import * as z from "zod";

export const productSchema = z.object({
    id: z.number().optional(),
    title: z.string().min(4, { message: "Title must be at least 4 characters long" }),
    description: z.string().min(40, { message: "Description must be at least 40 characters long" }),
    price: z.coerce.number({ invalid_type_error: "Please enter a number." }).positive({ message: "Price must be a positive number" }),
})