"use server"

import { actionClient } from "./safe-action"
import { registerSchema } from "@/types/register-schema"

import bcrypt from 'bcrypt';
import { db } from "..";
import { eq } from "drizzle-orm";
import { users } from "../schema";
import { generateEmailVerificationToken } from "./token";
import { sendEmail } from "./emails";

export const register = actionClient.schema(registerSchema).action(async ({ parsedInput: { name, email, password, role } }) => {
    const hashedPassword = await bcrypt.hash(password, 10)

    // check user exit
    const existingUser = await db.query.users.findFirst({ where: eq(users.email, email) })
    if (existingUser) {
        if (!existingUser.emailVerified) {
            // generate verification token for email expxires in 30 minutes
            const verificationToken = await generateEmailVerificationToken(email);
            // send verification email
            await sendEmail(verificationToken[0].email, verificationToken[0].token, name.slice(0, 5));

            return { success: "Email verification resent." };
        }
        return { error: "Email is already exists." };
    }

    // record user
    await db.insert(users).values({ name, email, password: hashedPassword, role })
    // generate verification email for email expires in 30 minutes
    const verificationToken = await generateEmailVerificationToken(email)

    // send verfication email
    await sendEmail(verificationToken[0].email, verificationToken[0].token, name.slice(0, 5))

    return { success: "Email verifacation sent." }
})