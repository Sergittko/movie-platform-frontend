'use client';

import { Pie, PieChart } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { genreChartData } from '@/constants/profile-charts';
import PremiumProvider from '@/providers/PremiumProvider';

import { genreChartConfig } from './chart-constants';

const GenreChart = () => {
  return (
    <Card className="relative w-full overflow-hidden py-4">
      <PremiumProvider text="Discover your cinematic taste. See the genres you gravitate toward the most based on your watching habits.">
        <CardHeader className="items-center gap-0! border-b border-white/10 px-5 pb-4!">
          <CardTitle className="text-lg">Favorite Genres</CardTitle>

          <CardDescription>Your most watched movie genres</CardDescription>
        </CardHeader>

        <CardContent className="flex flex-1 flex-col justify-center pt-0">
          <ChartContainer
            config={genreChartConfig}
            className="mx-auto aspect-square w-full max-w-70"
          >
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent nameKey="genre" />} />

              <Pie
                data={genreChartData}
                dataKey="movies"
                nameKey="genre"
                innerRadius={45}
                stroke="rgba(255,255,255,0.08)"
                strokeWidth={1}
              />

              <ChartLegend
                content={({ payload }) => (
                  <div className="mt-auto flex flex-wrap justify-center gap-3 text-white/70">
                    {payload?.map((item) => (
                      <div
                        key={item.value}
                        className="flex basis-1/3 items-center justify-center gap-2"
                      >
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="capitalize">{item.value}</span>
                        <span className="text-white/40">
                          {(item?.payload as { movies?: number })?.movies || 0}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </PremiumProvider>
    </Card>
  );
};

export default GenreChart;
