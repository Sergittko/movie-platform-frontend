import { ChartConfig } from '@/components/ui/chart';

export const activityChartConfig = {
  watched: {
    label: 'Watched',
    color: 'var(--chart-1)',
  },
  added: {
    label: 'Added',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig;
