export enum AppRoutePathEnum {
  HOME = '/',
  SEARCH = '/search',
  MATCH = '/match',
  PROFILE = '/profile',
  LOGIN = '/login',
  REGISTER = '/register',
}

export interface IAppRoute {
  name: string;
  path: AppRoutePathEnum;
}
