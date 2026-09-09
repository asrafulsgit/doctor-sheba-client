"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];

const chartConfig = {
  value: {
    label: "value",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

type ChartProps<T> = {
  header: string;
  title?: string;
  data: { label: string; value: T }[];
};

function AreaChartLinear<T>({ chartProps }: { chartProps: ChartProps<T> }) {
  return (
    <Card>
  <CardHeader>
    <CardTitle>{chartProps.header}</CardTitle>
    {chartProps.title && (
      <CardDescription>{chartProps.title}</CardDescription>
    )}
  </CardHeader>
  <CardContent>
    {/* fixed-height plain div, same pattern as your working AreaChart */}
    <div className="h-80 w-full min-w-0">
      <ChartContainer config={chartConfig} className="h-full w-full min-w-0 aspect-auto">
        <AreaChart
          accessibilityLayer
          data={chartProps.data}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dot" hideLabel />}
          />
          <Area
            dataKey="value"
            type="linear"
            fill="var(--color-value)"
            fillOpacity={0.4}
            stroke="var(--color-value)"
          />
        </AreaChart>
      </ChartContainer>
    </div>
  </CardContent>
    </Card>
  );
}

export default AreaChartLinear;
