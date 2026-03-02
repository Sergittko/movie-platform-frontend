export enum AppRoutePathEnum {
  HOME = '/',
  SEARCH = '/search',
  MATCH = '/charts',
  PROFILE = '/profile',
}

export interface IAppRoute {
  name: string;
  path: AppRoutePathEnum;
}
