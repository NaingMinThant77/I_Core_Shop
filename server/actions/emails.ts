"use server"
import { getBaseUrl } from "@/lib/get-base-url"
const currentBaseUrl = getBaseUrl()

import { EmailConfirmationTemplate } from '@/components/email-template';
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (email: string, token: string, userFirstname: string) => {
    const confirmLink = `${currentBaseUrl}/confirm-email?token=${token}`

    const { data, error } = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Confirm Your Account - Welcome to SnapShop',
        react: EmailConfirmationTemplate({
            userFirstname, confirmedEmailLink: confirmLink,
        }),
    });

    if (error) {
        console.log(error);
    }
}