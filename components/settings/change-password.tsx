import React from 'react'
import SettingCard from './setting-card'
import { KeyRound } from 'lucide-react'

const ChangePasswrod = () => {
    return (
        <SettingCard>
            <div className='flex justify-between items-center'>
                <p className='text-sm font-medium'>Change Password</p>
                <KeyRound className='w-5 h-5' />
            </div>
        </SettingCard>
    )
}

export default ChangePasswrod
