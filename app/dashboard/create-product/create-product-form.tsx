"use client"
import React, { useEffect, useState } from 'react'
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
import { getSingleProduct, updateProduct } from '@/server/actions/products'
import { toast } from 'sonner'
import { useRouter, useSearchParams } from "next/navigation";

const CreateProductForm = () => {
    const router = useRouter();

    const searchParams = useSearchParams();
    const isEditMode = searchParams.get("edit_id");
    const [editProduct, setEditProduct] = useState("");

    const isProductExist = async (id: number) => {
        if (isEditMode) {
            const response = await getSingleProduct(id)
            if (response?.error) {
                toast.error(response?.error)
                router.push("/dashboard/products");
                return;
            }
            if (response.success) {
                setEditProduct(response?.success?.title);
                form.setValue("title", response.success.title);
                form.setValue("description", response.success.description);
                form.setValue("price", response.success.price);
                form.setValue("id", response.success.id);
            }
        }
    }

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

    useEffect(() => {
        if (isEditMode) {
            isProductExist(Number(isEditMode))
        }
    }, [])

    return (
        <Card>
            <CardHeader>
                <CardTitle>{isEditMode ? "Edit" : "Create"} Product</CardTitle>
                <CardDescription>{isEditMode ? `Edit your product: ${editProduct} ` : "Create your product"}</CardDescription>
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
                        <Button type="submit" className='w-full' disabled={status === "executing"}>{isEditMode ? "Update" : "Create"} product</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default CreateProductForm

