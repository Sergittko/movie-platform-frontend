'use client';

import { TrendingDown, TrendingUp } from 'lucide-react';
import { Bar, BarChart, XAxis, YAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { totalStatsChartData } from '@/constants/profile-charts';

import { totalStatsChartConfig } from './chart-constants';

const TotalStatsChart = () => {
  return (
    <Card className="w-full py-4">
      <CardHeader className="items-center gap-0! border-b border-white/10 px-5 pb-4!">
        <CardTitle className="text-lg">Total Stats</CardTitle>
        <CardDescription>Overview of your movies activity</CardDescription>
      </CardHeader>

      <CardContent className="pt-3">
        <ChartContainer
          config={totalStatsChartConfig}
          className="mx-auto aspect-square max-h-48 w-full"
        >
          <BarChart
            layout="vertical"
            data={totalStatsChartData}
            margin={{ top: 0, right: 12, bottom: 0, left: 12 }}
          >
            <YAxis
              type="category"
              dataKey="category"
              tickLine={false}
              axisLine={false}
              tickMargin={12}
              tick={{ fill: 'white', fontSize: 13, fontWeight: 500 }}
            />
            <XAxis type="number" hide />
            <Bar
              dataKey="total"
              radius={12}
              fill="var(--chart-1)"
              className="transition-all duration-200 hover:opacity-80"
              label={({ x, y, width, height, value }) => (
                <text
                  x={x + width + 8}
                  y={y + height / 2}
                  fill="white"
                  fontSize={12}
                  fontWeight={500}
                  textAnchor="start"
                  dominantBaseline="middle"
                >
                  {value}
                </text>
              )}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="mt-auto flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none text-white/60">
          Saved 5 movies more this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="flex gap-2 leading-none text-white/60">
          Watched 3 movies less this week <TrendingDown className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  );
};

export default TotalStatsChart;
