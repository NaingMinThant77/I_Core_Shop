import Link from 'next/link'
import React from 'react'

type AuthFooterProps = {
    footerLabel: string,
    footerHerf: string
}

const AuthFooter = ({ footerLabel, footerHerf }: AuthFooterProps) => {
    return (
        <div className='mx-auto'><Link href={footerHerf} className='text-primary hover:underline text-md'>{footerLabel}</Link></div>
    )
}

export default AuthFooter
