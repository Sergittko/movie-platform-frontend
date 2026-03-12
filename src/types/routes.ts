export enum AppRoutePathEnum {
  HOME = '/',
  SEARCH = '/search',
  MATCH = '/charts',
  PROFILE = '/profile',
  LOGIN = '/login',
  REGISTER = '/register',
}

export interface IAppRoute {
  name: string;
  path: AppRoutePathEnum;
}
