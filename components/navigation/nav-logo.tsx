import { Apple } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const NavLogo = () => {
    return (
        <Link href='/' className='text-2xl font-bold text-primary font-mono flex gap-1'>
            <Apple size={42} className='fill-primary' />
            <span className='text-4xl'> iCore</span>
        </Link>
    )
}

export default NavLogo
