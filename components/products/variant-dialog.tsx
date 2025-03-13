"use client"

import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { VariantsWithImagesTags } from '@/lib/infer-type'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { VariantSchema } from '@/types/variant-schema'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import TagsInput from '@/app/dashboard/products/tags-input'

type VariantDialogProps = {
    children: React.ReactNode,
    editMode: boolean,
    productID?: number,
    variant?: VariantsWithImagesTags
}

const VariantDialog = ({ children, editMode, productID, variant }: VariantDialogProps) => {
    const form = useForm<z.infer<typeof VariantSchema>>({
        resolver: zodResolver(VariantSchema),
        defaultValues: {
            tags: [],
            variantImages: [],
            color: "#000",
            productID,
            id: undefined,
            productType: "Black",
            editMode
        },
    })

    function onSubmit(values: z.infer<typeof VariantSchema>) {
        console.log(values)
    }

    return (
        <Dialog>
            <DialogTrigger>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{editMode ? "Update an existing" : "Create new"} product's variant                </DialogTitle>
                    <DialogDescription>Manage your products variants</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField control={form.control} name="productType" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Variant title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your variant title" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="color" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Variant color</FormLabel>
                                <FormControl>
                                    <Input type='color' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="tags" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Variant tags</FormLabel>
                                <FormControl>
                                    <TagsInput {...field} handleOnChange={e => field.onChange(e)} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <Button type="submit" className='w-full'>{editMode ? "Update" : "Create"} product's variant</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default VariantDialog
