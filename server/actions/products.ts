import { productSchema } from "@/types/product-schema";
import { actionClient } from "./safe-action";
import { db } from "..";
import { products } from "../schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const updateProduct = actionClient.schema(productSchema).action(async ({ parsedInput: { id, title, description, price } }) => {
    try {
        if (id) {
            const existingProduct = await db.query.products.findFirst({ where: eq(products.id, id) })
            if (!existingProduct) return { error: "Product not found" }

            await db.update(products).set({ title, description, price }).where(eq(products.id, id))
            return { success: `${title} updated successfully` }
        } else {
            const product = await db.insert(products).values({ title, description, price }).returning()
            return { success: `${product[0].title} created successfully` }
        }
    } catch (error) {
        console.error("Database Error:", error);
        return { error: "Something went wrong!" }
    }
})

export const getSingleProduct = async (id: number) => {
    try {
        const product = await db.query.products.findFirst({ where: eq(products.id, id) })
        if (!product) return { error: "Product not found" }

        return { success: product }
    } catch (error) {
        return { error: "Something went wrong!" }
    }
}

const deleteProductSchema = z.object({ id: z.number() })

export const deleteProduct = actionClient.schema(deleteProductSchema).action(async ({ parsedInput: { id } }) => {
    try {
        await db.delete(products).where(eq(products.id, id))
        return { success: "Product deleted successfully" }
    } catch (error) {
        return { error: "Something went wrong!" }
    }
})