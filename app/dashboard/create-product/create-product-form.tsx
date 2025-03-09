"use client"
import React, { useEffect } from 'react'
import * as z from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from "react-hook-form"
import { productSchema } from '@/types/product-schema'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { DollarSign } from 'lucide-react'
import { Button } from '@/components/ui/button'
import TipTap from './tip-tap'
import { useAction } from 'next-safe-action/hooks'
import { updateProduct } from '@/server/actions/products'
import { toast } from 'sonner'
import { useRouter } from "next/navigation";

const CreateProductForm = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof productSchema>>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            title: "",
            description: "",
            price: 0
        }
    })

    const { execute, status, result } = useAction(updateProduct, {
        onSuccess({ data }) {
            if (data?.error) {
                toast.error(data?.error)
            }
            if (data?.success) {
                toast.success(data?.success);
                form.reset()
                router.push("/dashboard/products");
            }
        }
    })

    const onSubmit = (values: z.infer<typeof productSchema>) => {
        const { title, id, description, price } = values;
        execute({ title, id, description, price });
    };

    useEffect(() => {
        form.setValue("description", "");
    }, [form])

    return (
        <Card>
            <CardHeader>
                <CardTitle>Create Product</CardTitle>
                <CardDescription>Create a new product</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                        <FormField control={form.control} name="title" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Product Title</FormLabel>
                                <FormControl >
                                    <Input placeholder='T-shirt' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="description" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Product Description</FormLabel>
                                <FormControl >
                                    <TipTap val={field.value} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="price" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Product Price</FormLabel>
                                <FormControl >
                                    <div className='flex items-center gap-2'>
                                        <DollarSign size={30} className='p-2 bg-muted rounded-md' />
                                        <Input type='number' step={100} min={0} placeholder='Price must show in MMK' {...field} />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <Button type="submit" className='w-full' disabled={status === "executing"}>Submit</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default CreateProductForm

