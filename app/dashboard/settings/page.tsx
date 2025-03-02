import ChangePassword from '@/components/settings/change-password'
import ProfileCard from '@/components/settings/profile-card'
import SettingCard from '@/components/settings/setting-card'
import TwoFactor from '@/components/settings/two-factor'
import { auth } from '@/server/auth'
import { redirect } from 'next/navigation'

const Setting = async () => {
    const session = await auth()
    if (!session?.user) return redirect("/") // no login(no user), go to homePage

    return (
        <SettingCard title='Settings' description='Manage your account settings'>
            {/* grid grid-flow-col lg:grid-cols-2 lg:grid-flow-row gap-4 pt-6 */}
            <main className='flex flex-1 flex-col lg:flex-row gap-4'>
                <div className='flex-1'>
                    <ProfileCard session={session} />
                </div>
                <div className='space-y-4 flex-1'>
                    {!session.user.isOauth && <>
                        <ChangePassword email={session.user.email ?? ""} />
                        <TwoFactor isTwoFactorEnabled={session.user.isTwoFactorEnabled} email={session.user.email ?? ""} />
                    </>}
                </div>
            </main>
        </SettingCard>
    )
}

export default Setting
