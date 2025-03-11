import { timestamp, pgTable, text, primaryKey, integer, boolean, pgEnum, serial, real } from "drizzle-orm/pg-core"
import type { AdapterAccountType } from "next-auth/adapters"
export const RoleEnum = pgEnum("roles", ["user", "admin"])
import { createId } from '@paralleldrive/cuid2'
import { relations } from "drizzle-orm"

export const users = pgTable("user", {
    id: text("id").primaryKey()
        .$defaultFn(() => createId()),
    name: text("name"),
    email: text("email").unique(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    password: text("password"),
    image: text("image"),
    isTwoFactorEnabled: boolean("isTwoFactorEnabled").default(false),
    role: RoleEnum("roles").default("user")
})

export const twoFactorToken = pgTable("two_factor_token",
    {
        id: text("id").notNull().$defaultFn(() => createId()),
        token: text("token").notNull(),
        expires: timestamp("expires", { mode: "date" }).notNull(),
        email: text("email").notNull(),
        userId: text("userId").references(() => users.id, { onDelete: "cascade" })
    }, (token) => [
        {
            compoundKey: primaryKey({
                columns: [token.id, token.token],
            }),
        },
    ]
)

export const accounts = pgTable("account",
    {
        userId: text("userId").notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        type: text("type").$type<AdapterAccountType>().notNull(),
        provider: text("provider").notNull(),
        providerAccountId: text("providerAccountId").notNull(),
        refresh_token: text("refresh_token"),
        access_token: text("access_token"),
        expires_at: integer("expires_at"),
        token_type: text("token_type"),
        scope: text("scope"),
        id_token: text("id_token"),
        session_state: text("session_state"),
    },
    (account) => [
        {
            compoundKey: primaryKey({
                columns: [account.provider, account.providerAccountId],
            }),
        },
    ]
)

export const emailVerificationToken = pgTable(
    "email_verification_token",
    {
        id: text("id").notNull()
            .$defaultFn(() => createId()),
        token: text("token").notNull(),
        expires: timestamp("expires", { mode: "date" }).notNull(),
        email: text("email").notNull(),
    },
    (vt) => ({
        compoundKey: primaryKey({ columns: [vt.id, vt.token] }),
    })
);

export const resetPasswordToken = pgTable(
    "reset_password_token",
    {
        id: text("id").notNull()
            .$defaultFn(() => createId()),
        token: text("token").notNull(),
        expires: timestamp("expires", { mode: "date" }).notNull(),
        email: text("email").notNull(),
    },
    (vt) => ({
        compoundKey: primaryKey({ columns: [vt.id, vt.token] }),
    })
);

export const products = pgTable("products", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    price: real("price").notNull(),
    createAt: timestamp("createAt", { mode: "date" }).defaultNow()
})

// variants tables

export const productVariants = pgTable("productVariants", {
    id: serial("id").primaryKey(),
    color: text("color").notNull(),
    productType: text("productType").notNull(),
    updated: timestamp("updated").defaultNow(),
    productID: serial("productID").notNull().references(() => products.id, { onDelete: "cascade" })
})

export const variantImages = pgTable("variantImages", {
    id: serial("id").primaryKey(),
    image_url: text("image_url").notNull(),
    name: text("name").notNull(),
    size: text("size").notNull(),
    order: real("order").notNull(),
    variantID: serial("variantID").notNull().references(() => productVariants.id, { onDelete: "cascade" })
})

export const variantTags = pgTable("variantTags", {
    id: serial("id").primaryKey(),
    tag: text("tag").notNull(),
    variantID: serial("variantID").notNull().references(() => productVariants.id, { onDelete: "cascade" })
})

// their relations

export const productRelations = relations(products, ({ many, one }) => ({
    productVariants: many(productVariants, {
        relationName: "productVariants"
    }),
}))

export const productVariantRelations = relations(productVariants, ({ many, one }) => ({
    product: one(products, {
        relationName: "productVariants",
        fields: [productVariants.productID],
        references: [products.id]
    }),
    variantImage: many(variantImages, { relationName: "variantImages" }),
    variantTags: many(variantTags, { relationName: "variantTags" })
}))

export const variantImagesRelations = relations(variantImages, ({ many, one }) => ({
    productVariants: one(productVariants, {
        relationName: "variantImages",
        fields: [variantImages.variantID],
        references: [productVariants.id]
    })
}))

export const variantTagsRelations = relations(variantTags, ({ many, one }) => ({
    productVariants: one(productVariants, {
        relationName: "variantTags",
        fields: [variantTags.variantID],
        references: [productVariants.id]
    })
}))
