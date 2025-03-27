"use client"
import { ShoppingCart } from "lucide-react"
import CartDrawer from "../cart/cart-drawer"
import { useCartStore } from "@/store/cart-store"

const CartBtn = () => {
    const cartLength = useCartStore(state => state.cart.length)
    return (
        <CartDrawer>
            <div className="relative">
                <ShoppingCart size={24} strokeWidth="3" />
                <div className="absolute top-[-9px] right-[-8px] w-h h-5 font-bold bg-primary rounded-full text-white inline-flex items-center justify-center p-1 text-center">
                    {cartLength}
                </div>
            </div>
        </CartDrawer>
    )
}

export default CartBtn
