"use client"
import { useCartStore } from '@/store/cart-store'
import Image from 'next/image'
import EmptyCartImg from "@/public/Empty_Shopping_2.jpg"
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import formatCurrency from "@/lib/formatCurrency";
import { Button } from '../ui/button';
import { totalPriceCalc } from '@/lib/total-price';

const CartItem = () => {
    const cart = useCartStore((state) => state.cart);
    const addToCart = useCartStore((state) => state.addToCart);
    const removeFromCart = useCartStore((state) => state.removeFromCart);
    const setCartPostion = useCartStore((state) => state.setCartPostion);

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
                                <TableHead>No</TableHead>
                                <TableHead>Product</TableHead>
                                <TableHead>Image</TableHead>
                                <TableHead>Quantity</TableHead>
                                <TableHead className="text-right">Price</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {cart.map((citem, index) => (
                                <TableRow key={citem.id}>
                                    <TableCell className="font-medium">{index + 1}</TableCell>
                                    <TableCell className="font-medium">{citem.name}</TableCell>
                                    <TableCell>
                                        <div><Image className="rounded-md" src={citem.image} alt={citem.name} width={50} height={50} /></div>
                                    </TableCell>
                                    <TableCell className="text-center"><div className='flex gap-2 items-center'>
                                        <Button size={"sm"} onClick={() => removeFromCart({ ...citem, variant: { variantId: citem.variant.variantId, quantity: 1 } })}>-</Button>
                                        <p className='text-sm font-medium'>{citem.variant.quantity}</p>
                                        <Button size={"sm"} onClick={() => addToCart({ ...citem, variant: { variantId: citem.variant.variantId, quantity: 1 } })}>+</Button>
                                    </div></TableCell>
                                    <TableCell className="text-right">{formatCurrency(Number(citem.price))}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={4}>Total</TableCell>
                                <TableCell className="text-right">
                                    {formatCurrency(totalPriceCalc(cart))}
                                </TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                    <Button size={"lg"} className='w-full mt-2 mb-6' onClick={() => setCartPostion("Checkout")}>
                        Place Order
                    </Button>
                </div>
            )}
        </main>
    );
};

export default CartItem;
