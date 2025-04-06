import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger, } from "@/components/ui/drawer"
import CartItem from "./cart-item"
import CartStatus from "./cart-status"
import { useCartStore } from "@/store/cart-store"
import Payment from "./payment"
import Success from "./success"

type CartDrawerProps = {
    children: React.ReactNode,
}
const CartDrawer = ({ children }: CartDrawerProps) => {
    const cartPosition = useCartStore(state => state.cartPostion)
    return (
        <>
            <Drawer>
                <DrawerTrigger>{children}</DrawerTrigger>
                <DrawerContent >
                    <DrawerHeader>
                        <DrawerTitle className="text-2xl font-bold text-center">Your Cart</DrawerTitle>
                        <DrawerDescription className="text-center mb-4">Thank for shopping with icore</DrawerDescription>
                        <CartStatus />
                    </DrawerHeader>
                    {cartPosition === "Order" && <CartItem />}
                    {cartPosition === "Checkout" && <Payment />}
                    {cartPosition === "Success" && <Success />}
                </DrawerContent>
            </Drawer >

        </>
    )
}

export default CartDrawer
