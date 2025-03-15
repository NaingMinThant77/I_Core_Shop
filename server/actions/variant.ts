import { VariantSchema } from "@/types/variant-schema";
import { actionClient } from "./safe-action";
import { products, productVariants, variantImages, variantTags } from "../schema";
import { db } from "..";
import { eq } from "drizzle-orm";

export const createVariant = actionClient.schema(VariantSchema).action(async ({ parsedInput: { color, tags, id, variantImages: vImgs, editMode, productID, productType } }) => {
    try {
        if (editMode && id) {
            const editVariant = await db.update(productVariants).set({
                color, productType, updated: new Date(),
            }).where(eq(productVariants.id, id)).returning();

            await db.delete(variantTags).where(eq(variantTags.variantID, editVariant[0].id));
            await db.insert(variantTags).values(tags.map((tag) => {
                return { tag, variantID: editVariant[0].id, };
            }));

            await db.delete(variantImages).where(eq(variantImages.variantID, editVariant[0].id));

            await db.insert(variantImages).values(vImgs.map((img, index) => {
                return {
                    image_url: img.url,
                    size: img.size.toString(),
                    name: img.name,
                    variantID: editVariant[0].id,
                    order: index,
                };
            })
            );
            return { success: `Variants updated.` };
        }

        if (!editMode) {
            const variant = await db.insert(productVariants).values({ color, productID, productType }).returning()
            const product = await db.query.products.findFirst({ where: eq(products.id, productID) })
            await db.insert(variantTags).values(tags.map((tag) => {
                return {
                    tag, variantID: variant[0].id
                }
            }))
            await db.insert(variantImages).values(vImgs.map((img, index) => {
                return {
                    image_url: img.url, size: img.size.toString(),
                    name: img.name, variantID: variant[0].id, order: index,
                };
            })
            );
            return { success: `${product?.title}'s variants added.` }
        }
    } catch (error) {
        console.error("Database Error:", error);
        return { error: "Something went wrong!" }
    }
})