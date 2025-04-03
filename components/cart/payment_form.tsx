"use client"
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { Button } from "../ui/button"
import { useState } from "react"
import { processPayment } from "@/server/actions/payment"
import { useCartStore } from "@/store/cart-store"
import { createOrder } from "@/server/actions/order"
import { useAction } from "next-safe-action/hooks"

type PaymentFormProps = {
    totalPrice: number
}
const PaymentForm = ({ totalPrice }: PaymentFormProps) => {
    const cart = useCartStore(state => state.cart)
    const setCartPostion = useCartStore(state => state.setCartPostion)
    const clearCart = useCartStore(state => state.clearCart)
    const [loading, setLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")
    const stripe = useStripe()
    const elements = useElements()

    const { execute } = useAction(createOrder, {
        onSuccess: ({ data }) => {
            if (data?.error) {

            }
            if (data?.success) {
                clearCart()
                setCartPostion("Success")
            }
        }
    })

    const onSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        if (!stripe || !elements) {
            setLoading(false)
            return;
        }

        const { error: submitError } = await elements.submit()
        if (submitError) {
            setLoading(false)
            setErrorMsg(submitError.message || "Something went wrong!")
            return
        }

        const response = await processPayment({
            amount: totalPrice * 100,
            currency: "usd",
            cart: cart.map(ci => ({
                quantity: ci.variant.quantity,
                productId: ci.id,
                title: ci.name,
                image: ci.image,
                price: Number(ci.price),
            }))
        })

        if (response?.data?.error) {
            setErrorMsg(response?.data?.error)
            setLoading(false)
            return
        }

        if (response?.data?.success) {
            const paymentResponse = await stripe.confirmPayment({
                elements,
                clientSecret: response?.data?.success?.clientSecretId!,
                redirect: "if_required",
                confirmParams: {
                    return_url: "http://localhost:3000/success",
                    receipt_email: response.data.success.user_email!
                }
            })

            if (paymentResponse.error) {
                setErrorMsg(paymentResponse.error.message!);
                setLoading(false)
                return
            } else {
                setLoading(false)
                execute({
                    paymentId: response.data.success.paymentIntentId,
                    totalPrice, status: "pending",
                    products: cart.map(ci => ({
                        productId: ci.id,
                        quantity: ci.variant.quantity,
                        variantId: ci.variant.variantId
                    }))
                })
            }
        }
    }

    return (
        <main className="max-w-4xl mx-auto">
            <form onSubmit={onSubmitHandler}>
                <PaymentElement />
                <Button disabled={loading || !stripe || !elements} className="w-full my-4">Pay</Button>
            </form>
        </main>
    )
}

export default PaymentForm

