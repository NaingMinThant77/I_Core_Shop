import AnalyticCard from '@/components/analytics/analytic-card'
import AnalyticChart from '@/components/analytics/analytic-chart'
import { analytics, weeklyAnalytics } from '@/server/actions/analytics'
import { Box, Clock, Package, User } from 'lucide-react'
import React from 'react'

const Analytics = async () => {
    const analyticsData = await analytics()
    const weeklyAnalyticsData = await weeklyAnalytics()
    console.log(weeklyAnalyticsData)

    return (
        <main >
            {analyticsData && <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4'>
                <AnalyticCard count={analyticsData.prendingOrders} title="Pending Orders" icon={<Clock size={26} />} href="/dashboard/orders" />
                <AnalyticCard count={analyticsData.completedOrders} title="Completed Orders" icon={<Package size={26} />} href="/dashboard/orders" />
                <AnalyticCard count={analyticsData.totalUsers} title="Total Users" icon={<User size={26} />} href="/" />
                <AnalyticCard count={analyticsData.productCount} title="Product Count" icon={<Box size={26} />} href="/dashboard/products" />
            </div>}
            <AnalyticChart data={weeklyAnalyticsData!} />
        </main>
    )
}

export default Analytics
