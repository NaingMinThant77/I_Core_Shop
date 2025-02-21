"use client"
import AuthForm from '@/components/auth/auth-form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { useAction } from "next-safe-action/hooks"
import { register } from '@/server/actions/register-action';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { resetPasswordSchema } from '@/types/resetpassword-schema';
import { resetPassword } from '@/server/actions/reset-password';

const ResetPassword = () => {
    const form = useForm({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            email: '',
        }
    })

    const { execute, status, result } = useAction(resetPassword, {
        onSuccess({ data }) {
            form.reset();
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
        <AuthForm formTitle={'Reset your Password'} footerLabel={'Already have an account?'} showProvider={false} footerHerf={'/auth/login'} >
            <Form {...form} >
                <form action="" onSubmit={form.handleSubmit(onSubmit)}>
                    <div>
                        <FormField name="email" control={form.control} render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder='snapshot@gmail.com' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>)} />
                        <Button type='submit' disabled={status === "executing"} className={cn("w-full my-4", status === "executing" && "animate-pulse")}>Reset Password</Button>
                    </div>
                </form>
            </Form>
        </AuthForm>
    )
}

export default ResetPassword
