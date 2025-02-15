import { ShoppingBasket } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const NavLogo = () => {
    return (
        <Link href='/' className='text-2xl font-bold text-primary flex items-center space-x-2'>
            <ShoppingBasket size={42} /> <span> SnapShop</span>
        </Link>
    )
}

export default NavLogo
