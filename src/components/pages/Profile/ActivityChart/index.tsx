'use client';

import * as React from 'react';
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { activityChartData } from '@/constants/profile-charts';
import PremiumProvider from '@/providers/PremiumProvider';

import { activityChartConfig } from './chart-constants';

const ActivityChart = () => {
  const mostWatched = React.useMemo(() => {
    return activityChartData.reduce((prev, curr) => (curr.watched > prev.watched ? curr : prev));
  }, []);

  const mostAdded = React.useMemo(() => {
    return activityChartData.reduce((prev, curr) => (curr.added > prev.added ? curr : prev));
  }, []);

  return (
    <Card className="relative w-full overflow-hidden py-4 sm:py-0">
      <PremiumProvider text="Track your monthly progress. Visualize how many movies you’ve watched and added over time.">
        <CardHeader className="flex flex-col items-stretch border-b border-white/10 p-0! sm:flex-row">
          <div className="flex flex-1 flex-col justify-center gap-0 px-5 pb-3 sm:pb-0">
            <CardTitle className="text-lg">Your Activity</CardTitle>

            <CardDescription>Monthly overview of movies you watched and added</CardDescription>
          </div>

          <div className="flex">
            <div className="flex flex-1 flex-col justify-center gap-1 border-t border-white/10 px-4 py-5 text-left sm:border-t-0 sm:border-l">
              <p className="min-w-max text-xs text-white/50">
                Most watched month:{' '}
                <span className="font-semibold text-white/70">{mostWatched.month}</span>
              </p>

              <p className="text-xs text-white/50">
                Movies number:{' '}
                <span className="font-semibold text-white/70">{mostWatched.watched}</span>
              </p>
            </div>

            <div className="flex flex-1 flex-col justify-center gap-1 border-t border-l border-white/10 px-4 py-5 text-left sm:border-t-0">
              <p className="min-w-max text-xs text-white/50">
                Most added month:{' '}
                <span className="font-semibold text-white/70">{mostAdded.month}</span>
              </p>

              <p className="text-xs text-white/50">
                Movies number:{' '}
                <span className="font-semibold text-white/70">{mostAdded.added}</span>
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="px-4 pb-3">
          <ChartContainer config={activityChartConfig} className="aspect-auto h-65 w-full">
            <LineChart
              accessibilityLayer
              data={activityChartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />

              <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />

              <ChartTooltip content={<ChartTooltipContent className="w-37.5" />} />

              <Line
                dataKey="watched"
                type="monotone"
                stroke="var(--color-watched)"
                strokeWidth={2}
                dot={false}
              />

              <Line
                dataKey="added"
                type="monotone"
                stroke="var(--color-added)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </PremiumProvider>
    </Card>
  );
};

export default ActivityChart;
