import React, { useEffect } from 'react'
import { Button } from '../ui/button'
import { PartyPopper } from 'lucide-react'
import { useCartStore } from '@/store/cart-store'
import Link from 'next/link'

const Success = () => {
    const cart = useCartStore((state) => state.cart)
    const cartPosition = useCartStore((state) => state.cartPostion)
    const setCartPosition = useCartStore((state) => state.setCartPostion)
    const clearCart = useCartStore(state => state.clearCart)

    useEffect(() => {
        setTimeout(() => {
            setCartPosition("Order")
            clearCart()
        }, 3000)

        if (cartPosition === "Checkout" && cart.length > 0) {
            setCartPosition("Order")
        }
        if (cartPosition === "Success" && cart.length === 0) {
            setCartPosition("Order")
        }
        if (cartPosition !== "Checkout" && cart.length === 0) {
            setCartPosition("Order")
        }
    }, [])

    return (
        <div className='max-w-4xl mx-auto my-10 text-center'>
            <PartyPopper size={40} className='mx-auto text-primary animate-bounce' />
            <h2 className='text-2xl font-bold my-4'>Your payment was successful</h2>
            <p className='text-sm font-medium text-muted-foreground mb-4'>Thanks for your purchase</p>
            <Button className='mx-auto' asChild><Link href="/dashboard/orders">View Orders</Link></Button>
        </div>
    )
}

export default Success
