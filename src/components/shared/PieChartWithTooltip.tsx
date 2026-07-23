"use client";

import { Pie, PieChart, LabelList } from "recharts";

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

export const description = "A pie chart with a label list";
export const containerClassName =
  "[&>div]:w-full [&>div]:max-w-md flex items-center justify-center min-h-svh";

const CHART_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

type ChartProps<T> = {
  header: string;
  title?: string;
  data: { label: string; value: T }[];
};

export function PieChartWithTooltip<T>({
  chartProps,
}: {
  chartProps: ChartProps<T>;
}) {
  const dataWithFill = chartProps.data.map((item, index) => ({
    ...item,
    fill: CHART_COLORS[index % CHART_COLORS.length],
  }));

  const chartConfig = chartProps.data.reduce((config, item, index) => {
    config[item.label] = {
      label: item.label,
      color: CHART_COLORS[index % CHART_COLORS.length],
    };
    return config;
  }, {} as ChartConfig);

  return (
    <Card className="flex flex-col gap-0">
      <CardHeader className="items-center pb-0">
        <CardTitle>{chartProps.header}</CardTitle>
        {chartProps?.title && (
          <CardDescription>{chartProps.title}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-70 [&_.recharts-text]:fill-background"
        >
          <PieChart>
            <ChartTooltip
              content={
                <ChartTooltipContent
                  hideLabel
                  formatter={(value) => `${value}`}
                  className="min-w-5"
                />
              }
            />
            <Pie data={dataWithFill} dataKey="value" nameKey="label">
              <LabelList
                dataKey="label"
                className="fill-background"
                stroke="none"
                fontSize={12}
                formatter={(value) => {
                  const key =
                    typeof value === "string" ? value : String(value ?? "");
                  const configLabel = chartConfig[key]?.label;
                  return typeof configLabel === "string" ? configLabel : key;
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
