"use client"
import { VariantsWithProduct } from '@/lib/infer-type'
import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { Search } from 'lucide-react'
import Image from 'next/image'
import formatCurrency from '@/lib/formatCurrency'
import Link from 'next/link'

type SearchBoxProps = {
    productWithVariants: VariantsWithProduct[]
}
const SearchBox = ({ productWithVariants }: SearchBoxProps) => {
    const [searchKey, setSearchKey] = useState('')
    const [searchResult, setSearchResult] = useState<VariantsWithProduct[]>([])

    useEffect(() => {
        if (searchKey !== "") {
            const filteredProducts = productWithVariants.filter((item) => {
                const searchTerm = searchKey.toLowerCase();
                const itemName = item.product.title.toLowerCase();
                return itemName.includes(searchTerm);
            })
            setSearchResult(filteredProducts)
        }
        if (searchKey === "") { setSearchResult([]) }
    }, [searchKey])

    return (
        <main className='my-6 relative'>
            <div className='relative'>
                <Input type='text' placeholder='Search products ...' className='ps-8'
                    value={searchKey} onChange={(e) => setSearchKey(e.target.value)} />
                <Search size={20} className='absolute top-2 left-2' />
            </div>
            {searchResult.length > 0 && (
                <div className='absolute bg-white shadow-md rounded-md p-2 w-full max-h-80 overflow-y-scroll mt-1'>
                    <p className='font-medium my-2 text-sm ps-4'><span className='font-bold'>{searchResult.length}</span> results found.</p>
                    {searchResult.map((item) => (
                        <ul key={item.id}>
                            <li>
                                <Link href={`/products/${item.id}?vid=${item.id}&productId=${item.productID}&type=${item.productType}&image=${item.variantImage[0]?.image_url}&title=${item.product.title}&price=${item.product.price}`}
                                    className='flex items-center justify-between py-2 border-b'>
                                    <Image src={item.variantImage[0].image_url} alt={item.product.title} width={60} height={60} className='rounded-md' />
                                    <h2>{item.product.title}</h2>
                                    <p>{formatCurrency(item.product.price)} USD</p>
                                </Link>
                            </li>
                        </ul>
                    ))}
                </div>)
            }
            {searchResult.length === 0 && searchKey !== "" && (
                <p className='mt-4 text-red-600 bg-white rounded-md shadow-sm absolute w-full p-2'>No product found with this name.</p>
            )}
        </main>
    )
}

export default SearchBox


