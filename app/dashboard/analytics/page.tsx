import AnalyticCard from '@/components/analytics/analytic-card'
import { analytics } from '@/server/actions/analytics'
import { Box, Clock, Package, User } from 'lucide-react'
import React from 'react'

const Analytics = async () => {
    const analyticsData = await analytics()
    // console.log(analyticsData) // Objects - { prendingOrders: 2, completedOrders: 2, totalUsers: 1, productCount: 4 }
    return (
        <main className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
            {analyticsData && <AnalyticCard count={analyticsData.prendingOrders} title="Pending Orders" icon={<Clock size={26} />} href="/dashboard/orders" />}
            {analyticsData && <AnalyticCard count={analyticsData.completedOrders} title="Completed Orders" icon={<Package size={26} />} href="/dashboard/orders" />}
            {analyticsData && <AnalyticCard count={analyticsData.totalUsers} title="Total Users" icon={<User size={26} />} href="/" />}
            {analyticsData && <AnalyticCard count={analyticsData.productCount} title="Product Count" icon={<Box size={26} />} href="/dashboard/products" />}
        </main>
    )
}

export default Analytics
