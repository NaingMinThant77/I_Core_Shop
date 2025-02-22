import React from 'react'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'

type SettingCardProps = {
    children: React.ReactNode,
    title?: string,  // ? - optional
    description?: string
}
const SettingCard = ({ children, title, description }: SettingCardProps) => {
    return (
        <Card>
            <CardHeader>
                {title && description && (<>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </>)}
                {children}
            </CardHeader>
        </Card >
    )
}

export default SettingCard
