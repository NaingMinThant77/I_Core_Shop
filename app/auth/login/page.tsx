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


const Login = () => {
    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const { execute, status, result } = useAction(login)

    const onSubmit = (values: z.infer<typeof loginSchema>) => {
        const { email, password } = values
        execute({ email, password })
    }

    return (
        <AuthForm formTitle={'Login to your account'} footerLabel={'Don\'t have an account?'} showProvider={true} footerHerf={'/auth/register'} >
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
                        <FormField name="password" control={form.control} render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input placeholder='******' {...field} type='password' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>)} />
                        <Button size={"sm"} variant={"link"} className='pl-0 mb-1'><Link href={"/auth/reset"}>Forget password</Link></Button>
                        <Button type='submit' disabled={status === "executing"} className={cn("w-full mb-4", status === "executing" && "animate-pulse")}>Login</Button>
                    </div>
                </form>
            </Form>
        </AuthForm>
    )
}

export default Login
