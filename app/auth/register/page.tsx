"use client"
import AuthForm from '@/components/auth/auth-form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { registerSchema } from '@/types/register-schema';

const Register = () => {
    const form = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })

    const onSubmit = (values: z.infer<typeof registerSchema>) => {
        console.log(values)
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
                                    <Input placeholder='******' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>)} />
                        <Button type='submit' className='w-full my-4'>Register</Button>
                    </div>
                </form>
            </Form>
        </AuthForm>
    )
}

export default Register
