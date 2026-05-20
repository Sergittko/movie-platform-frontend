import { moviesApi } from '@/api/movies/moviesApi';
import { moviesApiServer } from '@/api/movies/moviesApiServer';
import { IGetMoviesListData, MoviesListTypeEnum } from '@/api/movies/moviesTypes';
import { usersApi } from '@/api/users/usersApi';
import { usersApiServer } from '@/api/users/usersApiServer';
import { GetMoviesListDataType } from '@/api/users/usersTypes';

export const MOVIES_LIST_LIMIT = 15;

export enum MoviesListsEnum {
  WATCHED_MOVIES = 'watchedMovies',
  WATCHLIST_MOVIES = 'watchlistMovies',
}

export const moviesListTitles = {
  [MoviesListsEnum.WATCHED_MOVIES]: 'Watched movies',
  [MoviesListsEnum.WATCHLIST_MOVIES]: 'Movies in your watchlist',
  [MoviesListTypeEnum.NOW_PLAYING]: 'Now playing movies in theaters',
  [MoviesListTypeEnum.POPULAR]: 'Popular movies',
  [MoviesListTypeEnum.TOP_RATED]: 'Top rated movies',
  [MoviesListTypeEnum.UPCOMING]: 'Upcoming movies vue cinema',
};

export const defaultEmptyListResponse = {
  data: {
    movies: [],
  },
  page: 1,
  totalPages: 1,
  totalResults: 0,
};

export type MoviesListsPayloadType = GetMoviesListDataType & IGetMoviesListData;

export const MOVIES_LIST_SERVER_API_MAP = {
  [MoviesListsEnum.WATCHED_MOVIES]: (data: MoviesListsPayloadType, token: string) => {
    const { userId, limit, page } = data;
    return usersApiServer.getWatchedMovies({ userId, limit, page }, token);
  },

  [MoviesListsEnum.WATCHLIST_MOVIES]: (data: MoviesListsPayloadType, token: string) => {
    const { userId, limit, page } = data;
    return usersApiServer.getWatchlist({ userId, limit, page }, token);
  },

  [MoviesListTypeEnum.NOW_PLAYING]: (data: MoviesListsPayloadType) => {
    const { listType, page } = data;
    return moviesApiServer.getMoviesList({ listType, page });
  },

  [MoviesListTypeEnum.POPULAR]: (data: MoviesListsPayloadType) => {
    const { listType, page } = data;
    return moviesApiServer.getMoviesList({ listType, page });
  },

  [MoviesListTypeEnum.TOP_RATED]: (data: MoviesListsPayloadType) => {
    const { listType, page } = data;
    return moviesApiServer.getMoviesList({ listType, page });
  },

  [MoviesListTypeEnum.UPCOMING]: (data: MoviesListsPayloadType) => {
    const { listType, page } = data;
    return moviesApiServer.getMoviesList({ listType, page });
  },
};

export const MOVIES_LIST_CLIENT_API_MAP = {
  [MoviesListsEnum.WATCHED_MOVIES]: (data: MoviesListsPayloadType) => {
    const { userId, limit, page } = data;
    return usersApi.getWatchedMovies({ userId, limit, page });
  },

  [MoviesListsEnum.WATCHLIST_MOVIES]: (data: MoviesListsPayloadType) => {
    const { userId, limit, page } = data;
    return usersApi.getWatchlist({ userId, limit, page });
  },

  [MoviesListTypeEnum.NOW_PLAYING]: (data: MoviesListsPayloadType) => {
    const { listType, page } = data;
    return moviesApi.getMoviesList({ listType, page });
  },

  [MoviesListTypeEnum.POPULAR]: (data: MoviesListsPayloadType) => {
    const { listType, page } = data;
    return moviesApi.getMoviesList({ listType, page });
  },

  [MoviesListTypeEnum.TOP_RATED]: (data: MoviesListsPayloadType) => {
    const { listType, page } = data;
    return moviesApi.getMoviesList({ listType, page });
  },

  [MoviesListTypeEnum.UPCOMING]: (data: MoviesListsPayloadType) => {
    const { listType, page } = data;
    return moviesApi.getMoviesList({ listType, page });
  },
};

export const PROTECTED_LISTS: (MoviesListsEnum | MoviesListTypeEnum)[] = [
  MoviesListsEnum.WATCHED_MOVIES,
  MoviesListsEnum.WATCHLIST_MOVIES,
];
