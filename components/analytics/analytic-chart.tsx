"use client"
import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, } from "@/components/ui/chart"

type Data = {
    day: string,
    count: number
}
type AnalyticChartProps = { data: Data[] }

const chartConfig = {
    order: {
        label: "Order",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig

const AnalyticChart = ({ data }: AnalyticChartProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Orders Chart</CardTitle>
                <CardDescription>Days from {data[0].day} to {data[data.length - 1].day}</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="max-h-96 w-full">
                    <LineChart accessibilityLayer data={data} margin={{
                        left: 12, right: 12, top: 40, bottom: 20
                    }}>
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                        <Line dataKey="count" type="natural" stroke="black" strokeWidth={2} dot={false} />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

export default AnalyticChart
