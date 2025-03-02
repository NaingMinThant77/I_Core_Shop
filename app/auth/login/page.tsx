"use client"
import AuthForm from '@/components/auth/auth-form'
import { loginSchema } from '@/types/login-schema';
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

import { useAction } from "next-safe-action/hooks"
import { login } from '@/server/actions/login-action';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useState } from 'react';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp';

const Login = () => {
    const [isTwoFactor, setIsTwoFactor] = useState(false);

    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
            code: ''
        }
    })

    const { execute, status, result } = useAction(login, {
        onSuccess({ data }) {
            if (data?.error) {
                toast.error(data?.error)
                form.reset();
            }
            if (data?.success) {
                toast.success(data?.success);
            }
            if (data?.twoFactor) {
                toast.success(data?.twoFactor);
                setIsTwoFactor(true);
            }
        }
    })

    const onSubmit = (values: z.infer<typeof loginSchema>) => {
        const { email, password, code } = values
        execute({ email, password, code })
    }

    return (
        <AuthForm formTitle={isTwoFactor ? "Place your code." : 'Login to your account'} footerLabel={'Don\'t have an account?'} showProvider={true} footerHerf={'/auth/register'} >
            <Form {...form} >
                <form action="" onSubmit={form.handleSubmit(onSubmit)}>
                    {
                        !isTwoFactor && (
                            <div>
                                <FormField name="email" control={form.control} render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder='snapshot@gmail.com' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>)} />
                                <FormField name="password" control={form.control} render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input placeholder='******' {...field} type='password' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>)} />
                                <Button size={"sm"} variant={"link"} className='pl-0 mb-1'><Link href={"/auth/reset"}>Forget password</Link></Button>
                            </div>
                        )
                    }
                    {
                        isTwoFactor && (
                            <div className='flex items-center justify-center text-center'>
                                <FormField name="code" control={form.control} render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>We sent a code to your email</FormLabel>
                                        <FormControl>
                                            <InputOTP maxLength={6} {...field} disabled={status === "executing"}>
                                                <InputOTPGroup>
                                                    <InputOTPSlot index={0} />
                                                    <InputOTPSlot index={1} />
                                                    <InputOTPSlot index={2} />
                                                </InputOTPGroup>
                                                <InputOTPSeparator />
                                                <InputOTPGroup>
                                                    <InputOTPSlot index={3} />
                                                    <InputOTPSlot index={4} />
                                                    <InputOTPSlot index={5} />
                                                </InputOTPGroup>
                                            </InputOTP>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>)} />
                            </div>
                        )
                    }
                    <Button type='submit' disabled={status === "executing"} className={cn("w-full mb-4", status === "executing" && "animate-pulse")}>{isTwoFactor ? "Verify Code" : "Login"}</Button>
                </form>
            </Form>
        </AuthForm>
    )
}

export default Login
