import React from 'react'
import SettingCard from './setting-card'
import { Button } from '../ui/button'
import { Check, X } from 'lucide-react'
import { auth } from '@/server/auth'

const TwoFactor = async () => {
    const session = await auth()
    return (
        <SettingCard>
            <div className='flex justify-between items-center'>
                <p className='text-sm font-medium'>Two Factor Authentication</p>
                {
                    session?.user.isTwoFactorEnabled ? <Button size={"sm"} className='bg-blue-600 text-white hover:bg-blue-700'><Check className='w-4 h-4' /> On</Button>
                        : <Button size={"sm"} className='bg-red-600 text-white hover:bg-red-700'><X className='w-4 h-4' /> Off</Button>
                }
            </div>
        </SettingCard>
    )
}

export default TwoFactor
