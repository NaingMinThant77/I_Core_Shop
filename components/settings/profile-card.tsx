import { Session } from 'next-auth'
import React from 'react'
import SettingCard from './setting-card'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { UserRoundPen } from 'lucide-react'

// npx shadcn@latest add dialog
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'

type profileCardProps = {
    session: Session
}
const ProfileCard = ({ session }: profileCardProps) => {
    console.log(session)
    return (
        <SettingCard >
            <div className='flex items-start gap-2 justify-between'>
                <div className='flex items-center gap-2'>
                    <Avatar className='w-12 h-12'>
                        <AvatarImage src={session.user?.image!} alt="profile" />
                        <AvatarFallback className="bg-primary text-white font-bold">{session.user?.name?.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h2 className='font-semibold text-lg'>{session.user?.name}</h2>
                        <p className='text-sm font-medium text-muted-foreground'>{session.user?.email}</p>
                    </div>
                </div>
                <Dialog>
                    <DialogTrigger>
                        <UserRoundPen className='w-5 h-5 text-muted-foreground hover:text-black cursor-pointer' />
                    </DialogTrigger>
                    <DialogContent className='mx-4 lg:mx-0'>
                        <DialogHeader>
                            <DialogTitle>Wanna update your profile?</DialogTitle>
                            <input type="text" className='w-full my-6' />
                            <Button>Save Changes</Button>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>

            </div>
        </SettingCard>
    )
}

export default ProfileCard

