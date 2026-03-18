import { ChartConfig } from '@/components/ui/chart';

export const totalStatsChartConfig = {
  total: { label: 'Total' },
  watched: { label: 'Movies watched', color: 'var(--chart-1)' },
  added: { label: 'Movies added', color: 'var(--chart-2)' },
  favorites: { label: 'Favorites', color: 'var(--chart-3)' },
} satisfies ChartConfig;
