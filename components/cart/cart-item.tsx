"use client"
import { useCartStore } from '@/store/cart-store'
import Image from 'next/image'
import EmptyCartImg from "@/public/Empty_Shopping_2.jpg"
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import formatCurrency from "@/lib/formatCurrency";

const CartItem = () => {
    const cart = useCartStore((state) => state.cart);
    const addToCart = useCartStore((state) => state.addToCart);

    return (
        <main className="lg:w-1/2 mx-auto">
            {cart.length === 0 ? (
                <div className="flex items-center justify-center flex-col">
                    <Image src={EmptyCartImg} alt="empty cart" width={200} height={200} />
                    <p className="text-center mb-10 font-mono font-medium">
                        Your cart is empty.
                    </p>
                </div>
            ) : (
                <div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Product</TableHead>
                                <TableHead>Image</TableHead>
                                <TableHead>Quantity</TableHead>
                                <TableHead className="text-right">Price</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {cart.map((citem) => (
                                <TableRow key={citem.id}>
                                    <TableCell className="font-medium">{citem.name}</TableCell>
                                    <TableCell>
                                        <div><Image className="rounded-md" src={citem.image} alt={citem.name} width={50} height={50} /></div>
                                    </TableCell>
                                    <TableCell className="text-center">{citem.variant.quantity}</TableCell>
                                    <TableCell className="text-right">{formatCurrency(Number(citem.price))}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </main>
    );
};

export default CartItem;
