import { ChartConfig } from '@/components/ui/chart';

export const genreChartConfig = {
  movies: {
    label: 'Movies',
  },
  action: {
    label: 'Action',
    color: 'var(--chart-1)',
  },
  drama: {
    label: 'Drama',
    color: 'var(--chart-2)',
  },
  comedy: {
    label: 'Comedy',
    color: 'var(--chart-3)',
  },
  scifi: {
    label: 'Sci-Fi',
    color: 'var(--chart-4)',
  },
  thriller: {
    label: 'Thriller',
    color: 'var(--chart-5)',
  },
  animation: {
    label: 'Animation',
    color: 'var(--chart-6)',
  },
} satisfies ChartConfig;
