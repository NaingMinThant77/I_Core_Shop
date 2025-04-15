import AddToCart from '@/components/cart/add-to-cart'
import ImageSlider from '@/components/products/image-slider'
import VariantPicker from '@/components/products/variant-picker'
import formatCurrency from '@/lib/formatCurrency'
import { db } from '@/server'
import { productVariants } from '@/server/schema'
import { eq } from 'drizzle-orm'
import React from 'react'

export async function generateStaticParams() {
    const data = await db.query.productVariants.findMany({
        with: { variantImage: true, variantTags: true, product: true }
    })
    if (data) {
        const idArr = data.map((d) => ({ id: d.id.toString() }))
        return idArr
    }
    return []
}

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params
    const productWithVariants = await db.query.productVariants.findFirst({
        where: eq(productVariants.id, Number(id)),
        with: {
            product: {
                with: {
                    productVariants: {
                        with: { variantTags: true, variantImage: true }
                    }
                }
            }
        }
    })

    return (
        <>{productWithVariants && <main className='flex flex-col lg:flex-row gap-4 mt-6 pb=6'>
            <div className='lg:flex-1'>
                <ImageSlider variants={productWithVariants.product.productVariants} />
            </div>
            <div className='lg:flex-1'>
                <h2 className='font-bold text-2xl'>{productWithVariants.product.title}</h2>
                <p className='text-xs bg-gray-200 font-medium w-fit p-1 rounded-md my-2'>
                    {productWithVariants.productType} Variant
                </p>
                <hr className='mb-4 mt-3' />
                <div className='leading-8' dangerouslySetInnerHTML={{ __html: productWithVariants.product.description }} />
                <p className='text-xl font-bold my-2'>{formatCurrency(Number(productWithVariants.product.price))} USD</p>
                <div className='flex gap-2 items-center'>
                    <p className='font-medium'>Colors:</p>
                    {productWithVariants.product.productVariants.map((v) => (
                        <VariantPicker key={v.id} {...v} title={productWithVariants.product.title} price={productWithVariants.product.price}
                            image={v.variantImage[0]?.image_url} productId={v.productID} />
                    ))}
                </div>
                <AddToCart />
            </div>
        </main>}</>
    )
}

export default Page
