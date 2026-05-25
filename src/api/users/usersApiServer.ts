import { fetchMoviesList } from '@/helpers/fetchMoviesList';

import { GetMoviesListDataType } from './usersTypes';

export const usersApiServer = {
  getWatchedMovies(data: GetMoviesListDataType, token: string) {
    return fetchMoviesList({
      endpoint: `users/${data.userId}/watched`,
      token,
    });
  },

  getWatchlist(data: GetMoviesListDataType, token: string) {
    return fetchMoviesList({
      endpoint: `users/${data.userId}/watchlist`,
      token,
    });
  },
};
