"use client"

import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAction } from "next-safe-action/hooks"
import { updateDisplayName } from "@/server/actions/settings"
import { settingsSchema } from "@/types/settings-schema"
import { z } from "zod"
import { toast } from "sonner"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { cn } from "@/lib/utils"

type ProfileFormProps = {
    name: string,
    email: string,
    setIsOpen: () => void
}

const ProfileForm = ({ name, email, setIsOpen }: ProfileFormProps) => {
    const form = useForm({
        resolver: zodResolver(settingsSchema),
        defaultValues: {
            name, email // will get with props,
        }
    })

    const { execute, status, result } = useAction(updateDisplayName, {
        onSuccess({ data }) {
            form.reset();
            if (data?.error) {
                toast.error(data?.error)
            }
            if (data?.success) {
                setIsOpen();
                toast.success(data?.success);
            }
        }
    })

    const onSubmit = (values: z.infer<typeof settingsSchema>) => {
        const { name, email } = values
        execute({ name, email })
    }
    return (
        <main>
            <Form {...form} >
                <form action="" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-4 lg:px-0">
                    <FormField name="name" control={form.control} render={({ field }) => (
                        <FormItem>
                            <FormLabel>Display Name</FormLabel>
                            <FormControl>
                                <Input placeholder='snapshot@admin' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>)} />
                    <Button type='submit' disabled={status === "executing"} className={cn("w-full mb-4", status === "executing" && "animate-pulse")}>Save</Button>
                </form>
            </Form>
        </main>
    )
}

export default ProfileForm
