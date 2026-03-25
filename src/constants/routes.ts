import { Heart, Home, Search, User } from 'lucide-react';

import { AppRoutePathEnum, IAppRoute } from '@/types/routes';

export const topBarRoutes: IAppRoute[] = [
  {
    name: 'Home',
    path: AppRoutePathEnum.HOME,
    icon: Home,
  },
  {
    name: 'Search',
    path: AppRoutePathEnum.SEARCH,
    icon: Search,
  },
  {
    name: 'Match',
    path: AppRoutePathEnum.MATCH,
    icon: Heart,
  },
];

export const mobileMenuRoutes: IAppRoute[] = [
  ...topBarRoutes,
  {
    name: 'Profile',
    path: AppRoutePathEnum.PROFILE,
    icon: User,
  },
];
