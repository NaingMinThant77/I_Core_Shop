"use client"
import { Session } from 'next-auth'
import React, { useState } from 'react'
import SettingCard from './setting-card'
import { UserRoundPen } from 'lucide-react'

// npx shadcn@latest add dialog
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'

// npx shadcn@latest add drawer
import useMediaQuery from '@/hooks/useMediaQuery'
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '../ui/drawer'
import ProfileForm from './profile-form'
import AvatarUploadForm from './avatar-upload-form'

type profileCardProps = {
    session: Session
}
const ProfileCard = ({ session }: profileCardProps) => {
    const isDesktop = useMediaQuery('(min-width: 768px)');
    const [isOpen, setIsOpen] = useState(false);
    const handleIsOpen = () => setIsOpen(false);

    return (
        <SettingCard >
            <div className='flex items-start gap-2 justify-between'>
                <div className='flex items-start gap-2'>
                    <AvatarUploadForm name={session.user?.name ?? ""} image={session.user?.image} email={session.user?.email ?? ""} />
                    <div>
                        <p className='text-sm font-medium text-muted-foreground'>Display Name : </p>
                        <h2 className='font-medium text-lg'> @{session.user?.name}</h2>
                        <p className='text-sm font-medium text-muted-foreground mt-2'>Email : </p>
                        <p className='text-base font-medium'>{session.user?.email}</p>
                    </div>
                </div>
                {
                    isDesktop ? <Dialog open={isOpen} onOpenChange={setIsOpen}>
                        <DialogTrigger asChild>
                            <UserRoundPen className='w-5 h-5 text-muted-foreground hover:text-black cursor-pointer' />
                        </DialogTrigger>
                        <DialogContent className='mx-4 lg:mx-0'>
                            <DialogHeader>
                                <DialogTitle>Edit Profile</DialogTitle>
                                <DialogDescription>This will be public display name.</DialogDescription>
                            </DialogHeader>
                            <ProfileForm name={session.user?.name!} email={session.user?.email!} setIsOpen={handleIsOpen} />
                            <DialogClose asChild>
                                <Button variant="outline" className='w-full'>Cancel</Button>
                            </DialogClose>

                        </DialogContent>
                    </Dialog> : <Drawer open={isOpen} onOpenChange={setIsOpen}>
                        <DrawerTrigger asChild><UserRoundPen className='w-5 h-5 text-muted-foreground hover:text-black cursor-pointer' /></DrawerTrigger>
                        <DrawerContent>
                            <DrawerHeader>
                                <DrawerTitle>Edit Profile</DrawerTitle>
                                <DrawerDescription>This will be public display name.</DrawerDescription>
                            </DrawerHeader>
                            <ProfileForm name={session.user?.name!} email={session.user?.email!} setIsOpen={handleIsOpen} />
                            <DrawerFooter>
                                <DrawerClose asChild>
                                    <Button variant="outline" className='w-full'>Cancel</Button>
                                </DrawerClose>
                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>
                }

            </div>
        </SettingCard>
    )
}

export default ProfileCard
