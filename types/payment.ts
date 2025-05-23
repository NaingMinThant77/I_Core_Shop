import * as z from "zod";

export const paymentSchema = z.object({
    amount: z.number(),
    currency: z.string(),
    cart: z.array(z.object({ quantity: z.number(), productId: z.number(), title: z.string(), image: z.string(), price: z.number() }))
})