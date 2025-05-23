import React from 'react'
import { Card, CardHeader } from '../ui/card'
import { cn } from '@/lib/utils'
import Link from 'next/link'

type AnalyticsProps = {
    count: number,
    title: string,
    icon: React.ReactNode,
    href: string
}

const AnalyticCard = ({ count, title, icon, href }: AnalyticsProps) => {
    const isPendingCard = title === "Pending Orders"
    return (
        <Link href={href}>
            <Card className={cn(isPendingCard && "bg-primary text-white")}>
                < CardHeader >
                    <div className='flex items-center justify-between'>
                        {icon}
                        <h2 className='text-xl font-bold'>{count} +</h2>
                    </div>
                    <p className='text-normal font-medium'>{title}</p>
                </ CardHeader>
            </Card >
        </Link>
    )
}

export default AnalyticCard
