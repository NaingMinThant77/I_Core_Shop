"use client"
import React, { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { UploadButton } from '@/app/api/uploadthing/uploadthing'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { avatarSchema } from '@/types/settings-schema'
import { profileAvatarUpdate } from '@/server/actions/settings'
import { useAction } from 'next-safe-action/hooks'
import { z } from 'zod'
import { toast } from 'sonner'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'

type AvatarUploadFormProps = {
    image?: string,
    name: string,
    email: string
}
const AvatarUploadForm = ({ image, name, email }: AvatarUploadFormProps) => {
    const [isUploading, setIsUploading] = useState(false)

    const form = useForm({
        resolver: zodResolver(avatarSchema),
        defaultValues: {
            image: image || "", email
        }
    })

    const { execute, status, result } = useAction(profileAvatarUpdate, {
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
    const onSubmit = (values: z.infer<typeof avatarSchema>) => {
        const { image, email } = values
        execute({ image, email })
    }

    useEffect(() => {
        form.setValue("image", image!);
    }, [image, form])
    return (
        <>
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 ">
                    <FormField name="image" control={form.control} render={({ field }) => (
                        <FormItem className='flex items-center flex-col justify-center'>
                            <Avatar className='w-12 h-12'>
                                {form.getValues("image") && <AvatarImage src={form.getValues("image")! || image} alt="profile" />}
                                {!form.getValues("image") && <AvatarFallback className="bg-primary text-white font-bold">{name?.slice(0, 2).toUpperCase()}</AvatarFallback>}
                            </Avatar>
                            <UploadButton className="scale-75 ut-button:bg-primary ut-label:text-red-500 hover:ut-button:ring-primary ut-button:ring-primary"
                                endpoint="imageUploader"
                                onUploadBegin={() => { setIsUploading(true) }}
                                onUploadError={(error) => {
                                    form.setError("image", {
                                        type: "validate",
                                        message: error.message
                                    })
                                    setIsUploading(false)
                                    return
                                }}
                                content={{
                                    button({ ready }) {
                                        if (ready) return <div>Upload Avatar</div>
                                        return <div>Uploading...</div>
                                    }
                                }}
                                onClientUploadComplete={(res) => {
                                    form.setValue("image", res[0].ufsUrl!)
                                    form.handleSubmit(onSubmit)();
                                    setIsUploading(false)
                                    return
                                }} />
                            <FormControl>
                                <Input type="hidden" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>)} />
                </form>
            </Form>
        </>
    )
}

export default AvatarUploadForm
