"use client";

import { Bar, BarChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const chartConfig = {
  value: {
    label: "Value",
    color: "var(--color-primary)",
  },
} satisfies ChartConfig;

type ChartProps<T> = {
  header: string;
  title?: string;
  data: { label: string; value: T }[];
};

export function LineChartWithTooltip<T>({
  chartProps,
}: {
  chartProps: ChartProps<T>;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{chartProps.header}</CardTitle>
        {chartProps?.title && (
          <CardDescription>{chartProps.title}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        {/* fixed-height plain div, same pattern as your working AreaChart */}
        <div className="h-60 w-full min-w-0">
          <ChartContainer config={chartConfig} className="h-full w-full min-w-0 aspect-auto">
            <BarChart accessibilityLayer data={chartProps.data}>
              <XAxis
                dataKey="label"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <Bar
                dataKey="value"
                fill="var(--color-value)"
                radius={[5, 5, 0, 0]}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    hideLabel
                    hideIndicator
                    formatter={(value) => `${value}`}
                    className="min-w-5"
                  />
                }
                cursor={false}
                defaultIndex={1}
              />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}