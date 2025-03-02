"use server"

import { loginSchema } from "@/types/login-schema"
import { actionClient } from "./safe-action"
import { eq } from "drizzle-orm"
import { twoFactorToken, users } from "../schema"
import { db } from ".."
import { generateEmailVerificationToken, generateTwoFactorToken, getTwoFactorCodeByEmail } from "./token"
import { sendEmail, sendTwoFactorEmail } from "./emails"
import { signIn } from "../auth"
import { AuthError } from "next-auth"

export const login = actionClient.schema(loginSchema).action(async ({ parsedInput: { email, password, code } }) => {
    try {
        // check email
        const existingUser = await db.query.users.findFirst({ where: eq(users.email, email) })
        if (existingUser?.email !== email) {
            return { error: "Please provide valid credentials." }
        }
        console.log("Email verification is " + existingUser.emailVerified)
        if (!existingUser.emailVerified) {
            const verificaitionToken = await generateEmailVerificationToken(existingUser.email);
            await sendEmail(verificaitionToken[0].email, verificaitionToken[0].token, existingUser.name!.slice(0, 5))

            return { success: "Email verification resent." }
        }

        if (existingUser.isTwoFactorEnabled) {
            if (code) {
                const twoFactorCode = await getTwoFactorCodeByEmail(existingUser.email)
                if (!twoFactorCode) return { error: "Invalid code!" }
                if (code !== twoFactorCode.token) return { error: "Invalid code!" }

                const isExpired = new Date() > new Date(twoFactorCode.expires);
                if (isExpired) return { error: "Expired code!" }

                await db.delete(twoFactorToken).where(eq(twoFactorToken.id, twoFactorCode.id))
            } else {
                const twoFactorCode = await generateTwoFactorToken(email);
                if (!twoFactorCode) return { error: "Failed to generate 2FA code!" }

                await sendTwoFactorEmail(twoFactorCode[0].email, twoFactorCode[0].token)
                return { twoFactor: "Two Factor code sent." }
            }
        }

        await signIn('credentials', { email, password, redirectTo: "/" })
        return { success: "Login successful." }
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin": return { error: "Please provide valid credentials." }
                case "OAuthSignInError": return { error: error.message }
            }
        }
        throw error
    }
})