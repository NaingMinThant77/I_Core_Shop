"use client"
import formatCurrency from '@/lib/formatCurrency'
import { VariantsWithProduct } from '@/lib/infer-type'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

type ProductsProps = {
    productWithVariants: VariantsWithProduct[]
}

const Products = ({ productWithVariants }: ProductsProps) => {
    const params = useSearchParams()
    const tagParams = params.get("tag") || "iphone"
    const [filterProducts, setFilterProducts] = useState<VariantsWithProduct[]>([])

    useEffect(() => {
        const filteredItems = productWithVariants.filter((item) => item.variantTags[0].tag.toLowerCase() === tagParams)
        setFilterProducts(filteredItems)
    }, [tagParams])

    return (
        <main className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {filterProducts.map((p) => (
                console.log(p.variantTags),
                <Link href={`/products/${p.id}?vid=${p.id}&productId=${p.productID}&type=${p.productType}&image=${p.variantImage[0]?.image_url}&title=${p.product.title}&price=${p.product.price}`}
                    key={p.id} className='bg-white p-2 rounded-md overflow-hidden'>
                    <Image src={p.variantImage[0]?.image_url!} alt={p.product.title} width={400} height={400} className='w-60 h-40 object-cover' />
                    <hr className='my-2' />
                    <h3 className='font-semibold'>{p.product.title.substring(0, 26) + "..."}</h3>
                    <p className='font-medium text-sm mt-1'> {formatCurrency(Number(p.product.price))} USD</p>
                </Link>
            ))}
        </main>
    )
}

export default Products
