"use client"
import { cn } from '@/lib/utils'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/components/ui/tooltip"

type VariantPickerProps = {
    id: number, color: string, productType: string,
    title: string, price: number, productId: number, image: string
}
const VariantPicker = ({ id, color, productType, title, price, productId, image }: VariantPickerProps) => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const selectedVariantColor = searchParams.get("type")
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <div style={{ backgroundColor: color }} className={cn('w-5 h-5 rounded-full cursor-pointer',
                        selectedVariantColor === productType ? "opacity-100" : "opacity-35")}
                        onClick={() => router.push(`/products/${id}?vid=${id}&productId=${productId}&type=${productType}&image=${image}&title=${title}&price=${price}`, { scroll: false })}>
                    </div>
                </TooltipTrigger>
                <TooltipContent>{productType}</TooltipContent>
            </Tooltip>
        </TooltipProvider>

    )
}

export default VariantPicker