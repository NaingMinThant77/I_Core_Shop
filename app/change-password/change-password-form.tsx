"use client";

import AuthForm from '@/components/auth/auth-form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from "zod";
import {
    Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { useAction } from "next-safe-action/hooks"
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { changePasswordSchema } from '@/types/chagepassword-schema';
import { changePassword } from '@/server/actions/change-password';
import { useSearchParams } from 'next/navigation';
import { signOut } from "next-auth/react"

const ChangePasswordForm = () => {
    const form = useForm({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {
            password: ''
        }
    });

    const searchParams = useSearchParams();
    const token = searchParams.get("token") ?? undefined;

    const { execute, status } = useAction(changePassword, {
        onSuccess({ data }) {
            form.reset();
            if (data?.error) {
                toast.error(data?.error);
            }
            if (data?.success) {
                signOut({ callbackUrl: "/auth/login" });
                toast.success(data?.success);
            }
        }
    });

    const onSubmit = (values: z.infer<typeof changePasswordSchema>) => {
        execute({ password: values.password, token });
    };

    return (
        <AuthForm formTitle={'Change your Password'} footerLabel={'Already have an account?'} showProvider={false} footerHerf={'/auth/login'} >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField name="password" control={form.control} render={({ field }) => (
                        <FormItem>
                            <FormLabel>New Password</FormLabel>
                            <FormControl>
                                <Input type='password' placeholder='....'  {...field} disabled={status === "executing"} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                    <Button type='submit' disabled={status === "executing"}
                        className={cn("w-full my-4", status === "executing" && "animate-pulse")}                     >
                        Change new Password
                    </Button>
                </form>
            </Form>
        </AuthForm>
    );
};

export default ChangePasswordForm;
