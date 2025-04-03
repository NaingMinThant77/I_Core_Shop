import * as z from "zod";

export const createOrderSchema = z.object({
    totalPrice: z.number(),
    status: z.enum(["pending", "delivered", "cancelled"]),
    paymentId: z.string(),
    products: z.array(z.object({
        productId: z.number(), quantity: z.number(), variantId: z.number()
    }))
})