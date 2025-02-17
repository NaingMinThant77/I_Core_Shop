"use server"

import { eq } from 'drizzle-orm';
import { emailVerificationToken } from './../schema';
import { db } from '..';

const checkEmailVerificationToken = async (email: string) => {
    try {
        const token = await db.query.emailVerificationToken.findFirst({
            where: eq(emailVerificationToken.email, email)
        })
        return token;
    } catch (err) {
        return null
    }
}

export const generateEmailVerificationToken = async (email: string) => {
    const token = crypto.randomUUID()
    const expires = new Date(new Date().getTime() + 30 * 60 * 1000); // 30 min

    const existingToke = await checkEmailVerificationToken(email)
    if (existingToke) {
        await db.delete(emailVerificationToken).where(eq(emailVerificationToken.id, existingToke.id))
    }

    const verificationToken = await db.insert(emailVerificationToken).values({ email, token, expires })
    return verificationToken;
}