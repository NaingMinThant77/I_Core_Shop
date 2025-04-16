"use client"
import AuthForm from '@/components/auth/auth-form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { registerSchema } from '@/types/register-schema';

import { useAction } from "next-safe-action/hooks"
import { register } from '@/server/actions/register-action';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const Register = () => {
    const router = useRouter()
    type RegisterFormType = z.infer<typeof registerSchema>;
    const form = useForm<RegisterFormType>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            role: 'user'
        }
    })

    const { execute, status, result } = useAction(register, {
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
            router.push("/auth/login")
        }
    })

    const onSubmit = (values: z.infer<typeof registerSchema>) => {
        const { name, email, password, role } = values
        execute({ name, email, password, role })
    }

    return (
        <AuthForm formTitle={'Register new Account'} footerLabel={'Already have an account?'} showProvider={true} footerHerf={'/auth/login'} >
            <Form {...form} >
                <form action="" onSubmit={form.handleSubmit(onSubmit)}>
                    <div>
                        <FormField name="name" control={form.control} render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder='snapshop' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>)} />
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
                        <FormField name="role" control={form.control} render={({ field }) => (
                            <FormItem>
                                <FormLabel>Role</FormLabel>
                                <FormControl>
                                    <select {...field} className="w-full border rounded p-2 bg-white">
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <Button type='submit' disabled={status === "executing"} className={cn("w-full my-4", status === "executing" && "animate-pulse")}>Register</Button>
                    </div>
                </form>
            </Form>
        </AuthForm>
    )
}

export default Register
