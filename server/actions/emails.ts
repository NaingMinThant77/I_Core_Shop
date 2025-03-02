"use server"
import { getBaseUrl } from "@/lib/get-base-url"
const currentBaseUrl = getBaseUrl()

import { EmailConfirmationTemplate } from '@/components/email-template';
import { Resend } from 'resend';
import ResetPasswordEmail from "@/components/password-reset-email";
import MagicCodeEmail from "@/components/two-factor-mail";
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

export const sendPasswordResetEmail = async (email: string, token: string) => {
    const resetLink = `${currentBaseUrl}/change-password?token=${token}`

    const { data, error } = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Reset Your Account - Alert from SnapShop',
        react: ResetPasswordEmail({
            resePasswordLink: resetLink
        })
    });

    if (error) {
        console.log(error);
    }
}

export const sendTwoFactorEmail = async (email: string, code: string) => {
    const { error } = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Two Factor Authentication Code - SnapShop',
        react: MagicCodeEmail({ code })
    });

    if (error) {
        console.log(error);
    }
}