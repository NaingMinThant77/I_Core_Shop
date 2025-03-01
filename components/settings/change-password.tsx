"use client"
import React from 'react'
import SettingCard from './setting-card'
import { KeyRound } from 'lucide-react'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from "zod";
import { useAction } from "next-safe-action/hooks"
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { resetPasswordSchema } from '@/types/resetpassword-schema';
import { resetPassword } from '@/server/actions/reset-password';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';

type changePasswordProps = {
    email: string
}
const ChangePasswrod = ({ email }: changePasswordProps) => {
    const form = useForm({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            email: email || "",
        }
    })

    const { execute, status, result } = useAction(resetPassword, {
        onSuccess({ data }) {
            if (data?.error) {
                toast.error(data?.error)
            }
            if (data?.success) {
                toast.success(data?.success, {
                    action: {
                        label: "Open Gmail",
                        onClick: () => {
                            window.open("https://mail.google.com", "_blank")
                        }
                    }
                });
            }
        }
    })

    const onSubmit = (values: z.infer<typeof resetPasswordSchema>) => {
        const { email } = values
        execute({ email })
    }

    return (
        <SettingCard >
            <div className='flex items-center justify-between'>
                <p className='text-sm font-medium'>Change Password</p>
                <div className='flex justify-between items-center'>
                    <Form {...form} >
                        <form action="" onSubmit={form.handleSubmit(onSubmit)}>
                            <Button type='submit' disabled={status === "executing"} className={cn("w-full my-4", status === "executing" && "animate-pulse")}>
                                <KeyRound className='w-5 h-5' />
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </SettingCard>
    )
}

export default ChangePasswrod
