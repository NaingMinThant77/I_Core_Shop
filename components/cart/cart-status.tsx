import { cn } from '@/lib/utils'
import { useCartStore } from '@/store/cart-store'
import { Box, Minus, ShoppingCart, Ticket } from 'lucide-react'
import React from 'react'

const CartStatus = () => {
    const cartPosition = useCartStore(state => state.cartPostion)
    const setCartPostion = useCartStore(state => state.setCartPostion)

    return (
        <div className='flex items-center justify-center gap-4'>
            <ShoppingCart size={22} className={cn("cursor-pointer", cartPosition === "Order" ? "text-primary" : "text-blue-300",
                cartPosition == "Checkout" && "text-primary", cartPosition === "Success" && "text-primary"
            )} onClick={() => setCartPostion("Order")} />
            <Minus className={cn(cartPosition === "Checkout" ? "text-primary" : "text-blue-300",
                cartPosition === "Success" && "text-primary"
            )} />
            <Ticket size={25} className={cn("cursor-pointer", cartPosition === "Checkout" ? "text-primary" : "text-blue-300",
                cartPosition === "Success" && "text-primary"
            )} onClick={() => setCartPostion("Checkout")} />
            <Minus className={cn(cartPosition === "Success" ? "text-primary" : "text-blue-300")} />
            <Box size={25} className={cn("cursor-pointer", cartPosition === "Success" ? "text-primary" : "text-blue-300")}
                onClick={() => setCartPostion("Success")} />
        </div>
    )
}

export default CartStatus
