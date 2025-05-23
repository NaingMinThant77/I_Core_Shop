import ChangePassword from '@/components/settings/change-password'
import LogOutButton from '@/components/settings/log-out'
import ProfileCard from '@/components/settings/profile-card'
import SettingCard from '@/components/settings/setting-card'
import TwoFactor from '@/components/settings/two-factor'
import { auth } from '@/server/auth'
import { redirect } from 'next/navigation'

const Setting = async () => {
    const session = await auth()
    if (!session?.user) return redirect("/") // no login(no user), go to homePage

    return (
        <>
            <h2 className='text-2xl font-bold mb-4'>Account Settings</h2>
            <SettingCard title='Settings' description='Manage your account settings'>
                {/* grid grid-flow-col lg:grid-cols-2 lg:grid-flow-row gap-4 pt-6 */}
                <main className='flex flex-col gap-4'>
                    <ProfileCard session={session} />
                    {!session.user.isOauth && <>
                        <ChangePassword email={session.user.email ?? ""} />
                        <TwoFactor isTwoFactorEnabled={session.user.isTwoFactorEnabled} email={session.user.email ?? ""} />
                    </>}
                    <LogOutButton />
                </main>
            </SettingCard>
        </>
    )
}

export default Setting
