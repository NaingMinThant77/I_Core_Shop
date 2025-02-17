"use server"

import { actionClient } from "./safe-action"
import { registerSchema } from "@/types/register-schema"

import bcrypt from 'bcrypt';
import { db } from "..";
import { eq } from "drizzle-orm";
import { users } from "../schema";
import { generateEmailVerificationToken } from "./token";

export const register = actionClient.schema(registerSchema).action(async ({ parsedInput: { name, email, password } }) => {
    const hashedPassword = await bcrypt.hash(password, 10)

    // check user exit
    const existingUser = await db.query.users.findFirst({ where: eq(users.email, email) })
    if (existingUser) {
        if (!existingUser.emailVerified) {
            const verificationToken = await generateEmailVerificationToken(email)
            // send verfication email

            return { success: "Email verification resent." }
        }
        return { error: "Email is already exists." }
    }

    // record user
    await db.insert(users).values({ name, email, password: hashedPassword })
    // generate verification email for email expires in 30 minutes
    const verificationToken = await generateEmailVerificationToken(email)

    // send verfication email

    return { success: "Email verifacation sent." }
})