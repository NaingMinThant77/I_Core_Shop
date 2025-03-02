"use client"
import React, { useEffect } from 'react'
import SettingCard from './setting-card'
import { Button } from '../ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '../ui/form'
import { useForm } from 'react-hook-form'
import { twoFactorSchema } from '@/types/settings-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAction } from 'next-safe-action/hooks'
import { z } from 'zod'
import { twoFactorTogglar } from '@/server/actions/settings'
import { toast } from 'sonner'
import { Switch } from '../ui/switch'
import { cn } from '@/lib/utils'

type TwoFactorProps = {
    isTwoFactorEnabled: boolean;
    email: string
}

const TwoFactor = ({ isTwoFactorEnabled, email }: TwoFactorProps) => {
    const form = useForm({
        resolver: zodResolver(twoFactorSchema),
        defaultValues: {
            isTwoFactorEnabled, email
        }
    })

    const { execute, status, result } = useAction(twoFactorTogglar, {
        onSuccess({ data }) {
            form.reset();
            if (data?.error) {
                toast.error(data?.error)
            }
            if (data?.success) {
                toast.success(data?.success);
            }
        }
    })

    const onSubmit = (values: z.infer<typeof twoFactorSchema>) => {
        const { isTwoFactorEnabled, email } = values
        execute({ isTwoFactorEnabled, email })
    }

    useEffect(() => {
        form.setValue("isTwoFactorEnabled", isTwoFactorEnabled);
    }, [isTwoFactorEnabled, form])

    return (
        <SettingCard>
            <Form {...form} >
                <form action="" onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField name="isTwoFactorEnabled" control={form.control} render={({ field }) => (
                        <FormItem>
                            <div className='flex items-center justify-between'>
                                <FormLabel>Two Factor Authentication</FormLabel>
                                <FormControl>
                                    <Switch disabled={status === "executing"} checked={field.value} onCheckedChange={field.onChange} />
                                </FormControl>
                            </div>
                            <FormDescription>{isTwoFactorEnabled ? "Disable" : "Enable"} two factor authentication for your account</FormDescription>
                        </FormItem>)} />
                    <Button type='submit' disabled={status === "executing"} className={cn("w-full mb-4 mt-2", status === "executing" && "animate-pulse", isTwoFactorEnabled ? "bg-red-500 hover:bg-red-600" : "bg-primary")}>
                        {isTwoFactorEnabled ? "Disable" : "Enable"}
                    </Button>
                </form>
            </Form>
        </SettingCard >
    )
}

export default TwoFactor