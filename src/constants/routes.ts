import { AppRoutePathEnum, IAppRoute } from '@/types/routes';

export const topBarRoutes: IAppRoute[] = [
  {
    name: 'Home',
    path: AppRoutePathEnum.HOME,
  },
  {
    name: 'Search',
    path: AppRoutePathEnum.SEARCH,
  },
  {
    name: 'Match',
    path: AppRoutePathEnum.MATCH,
  },
];
