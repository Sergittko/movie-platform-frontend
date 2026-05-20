import { FC } from 'react';

import { MoviesListTypeEnum } from '@/api/movies/moviesTypes';
import { MoviesListsEnum } from '@/constants/movies-lists';

export enum AppRoutePathEnum {
  HOME = '/',
  SEARCH = '/search',
  MATCH = '/match',
  PROFILE = '/profile',
  LOGIN = '/login',
  REGISTER = '/register',
  USER_WATCHED_LIST = `/lists/${MoviesListsEnum.WATCHED_MOVIES}`,
  USER_WATCHLIST = `/lists/${MoviesListsEnum.WATCHLIST_MOVIES}`,
  NOW_PLAYING_LIST = `/lists/${MoviesListTypeEnum.NOW_PLAYING}`,
  POPULAR_LIST = `/lists/${MoviesListTypeEnum.POPULAR}`,
  TOP_RATED_LIST = `/lists/${MoviesListTypeEnum.TOP_RATED}`,
  UPCOMING_LIST = `/lists/${MoviesListTypeEnum.UPCOMING}`,
}

export interface IAppRoute {
  name: string;
  path: AppRoutePathEnum;
  icon?: FC<React.SVGProps<SVGSVGElement>>;
}
