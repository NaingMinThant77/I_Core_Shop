"use server"
import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { auth } from '@/server/auth'
import { redirect } from 'next/navigation'
import { db } from '@/server'
import { eq } from 'drizzle-orm'
import { orders } from '@/server/schema'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import formatCurrency from '@/lib/formatCurrency'
import Image from "next/image"

const Orders = async () => {
    const session = await auth()
    if (!session?.user) return redirect("/")

    const ordersArr = await db.query.orders.findMany({
        where: eq(orders.userID, session.user.id),
        with: {
            orderProduct: {
                with: {
                    product: true, order: true,
                    productVariants: {
                        with: { variantImage: true }
                    },
                }
            }
        }
    })

    return (
        <Card>
            <CardHeader>
                <CardTitle>Your Orders</CardTitle>
                <CardDescription>View your all orders and status</CardDescription>
            </CardHeader>
            <CardContent>
                <Table className='overflow-x-scroll'>
                    <TableCaption>A list of your orders.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">ID</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead className="text-center">Ordered on</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            ordersArr.map(order => (
                                <TableRow key={order.id}>
                                    <TableCell className="font-medium">{order.id}</TableCell>
                                    <TableCell>{formatCurrency(order.total)}</TableCell>
                                    <TableCell className="text-center">{order.created?.toString()}</TableCell>
                                    <TableCell>{order.status === "pending" && <span className='text-white bg-orange-500 text-xs py-1 px-2 rounded-md'>{order.status}</span>}</TableCell>
                                    <TableCell className="text-right">
                                        <Dialog>
                                            <DialogTrigger className='underline'>View Details</DialogTrigger>
                                            <DialogContent className='max-w-2xl'>
                                                <DialogHeader>
                                                    <DialogTitle>Details of Order #{order.id}</DialogTitle>
                                                    <DialogDescription>
                                                        Order's total price - {formatCurrency(order.total)}
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <Table>
                                                    <TableHeader>
                                                        <TableRow>
                                                            <TableHead className="w-[100px]">Image</TableHead>
                                                            <TableHead>Product</TableHead>
                                                            <TableHead>Price</TableHead>
                                                            <TableHead>Variant</TableHead>
                                                            <TableHead className="text-right">Quantity</TableHead>
                                                        </TableRow>
                                                    </TableHeader>
                                                    <TableBody>
                                                        {
                                                            order.orderProduct.map(({ product, productVariants, quantity }) => (
                                                                <TableRow>
                                                                    <TableCell className="font-medium">
                                                                        <Image width={50} height={50} src={productVariants.variantImage[0].image_url} alt={product.title} className='rounded-md' />
                                                                    </TableCell>
                                                                    <TableCell>{product.title}</TableCell>
                                                                    <TableCell>{formatCurrency(product.price)}</TableCell>
                                                                    <TableCell className="text-right">
                                                                        <div className='w-4 h-4 rounded-full' style={{ backgroundColor: productVariants.color }} />
                                                                    </TableCell>
                                                                    <TableCell>{quantity}</TableCell>
                                                                </TableRow>
                                                            ))
                                                        }
                                                    </TableBody>
                                                </Table>

                                            </DialogContent>
                                        </Dialog>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>

            </CardContent>
        </Card>
    )
}

export default Orders
