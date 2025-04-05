"use server"
import { eq } from 'drizzle-orm';
import { db } from ".."
import { orders, users } from "../schema"

export const analytics = async () => {
    try {
        const prendingOrders = await db.select().from(orders).where(eq(orders.status, "pending"))
        const completedOrders = await db.select().from(orders).where(eq(orders.status, "completed"))
        const totalUsers = await db.select().from(users)
        const productCount = await db.select().from(orders)

        return {
            prendingOrders: prendingOrders.length, completedOrders: completedOrders.length,
            totalUsers: totalUsers.length, productCount: productCount.length
        }

    } catch (error) {
        console.log(error)
    }
}
