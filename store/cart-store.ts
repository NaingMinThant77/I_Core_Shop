import { create } from "zustand"
import { persist } from "zustand/middleware"

export type Variant = {
    variantId: number,
    quantity: number
}

export type CartItem = {
    id: number,
    name: string,
    image: string,
    price: string,
    variant: Variant
}

export type CartType = {
    cart: CartItem[],
    addToCart: (item: CartItem) => void
    removeFromCart: (item: CartItem) => void
    cartPostion: "Order" | "Checkout" | "Success"
    setCartPostion: (position: "Order" | "Checkout" | "Success") => void
    clearCart: () => void
}

export const useCartStore = create(persist<CartType>((set) => ({
    cart: [],
    addToCart: (item) => set((state) => {
        const existingItem = state.cart.find((citem) => citem.variant.variantId === item.variant.variantId)
        if (existingItem) {
            const updateCart = state.cart.map((citem) => {
                if (citem.variant.variantId === item.variant.variantId) {
                    return { ...citem, variant: { ...citem.variant, quantity: citem.variant.quantity + item.variant.quantity } }
                }
                return citem
            })
            return { cart: updateCart }
        } else {
            return { cart: [...state.cart, { ...item, variant: { variantId: item.variant.variantId, quantity: item.variant.quantity } }] }
        }
    }),
    removeFromCart: (item) => set((state) => {
        const updateCart = state.cart.map((citem) => {
            if (citem.variant.variantId === item.variant.variantId) {
                return { ...citem, variant: { ...citem.variant, quantity: citem.variant.quantity - 1 } }
            }
            return citem
        })
        return { cart: updateCart.filter((citem) => citem.variant.quantity > 0) }
    }),
    cartPostion: "Order",
    setCartPostion: (position) => set({ cartPostion: position }),
    clearCart: () => set({ cart: [] }),

}), { name: "cart-storage" }))