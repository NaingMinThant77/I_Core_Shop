"use client"
import React from 'react'
import SettingCard from './setting-card'
import { Button } from '../ui/button'
import { LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'

const LogOutButton = () => {
    return (
        <SettingCard>
            <h2 className='text-sm font-semibold mb-4 text-red-600'>Danger Zone</h2>
            <Button variant='destructive' onClick={() => signOut()}><LogOut className='me-2' />Logout</Button>
        </SettingCard>
    )
}

export default LogOutButton
