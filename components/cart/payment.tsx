"use client"
import stripeInit from '@/lib/stripe-init'
import { totalPriceCalc } from '@/lib/total-price'
import { useCartStore } from '@/store/cart-store'
import { Elements } from '@stripe/react-stripe-js'
import PaymentForm from './payment_form'
import { useEffect } from 'react'

const stripe = stripeInit()
const Payment = () => {
    const cart = useCartStore((state) => state.cart)
    const setCartPosition = useCartStore((state) => state.setCartPostion)

    useEffect(() => {
        if (cart.length == 0) setCartPosition("Order")
    }, [])

    return (
        <div>
            <Elements stripe={stripe} options={{
                mode: "payment", currency: "usd", amount: totalPriceCalc(cart)
            }} >
                <PaymentForm totalPrice={totalPriceCalc(cart)} />
            </Elements>
        </div>
    )
}

export default Payment

