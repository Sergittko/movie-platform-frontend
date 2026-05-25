import environment from '@/config';
import { fetchMoviesList } from '@/helpers/fetchMoviesList';

import { IGetMoviesListData } from './moviesTypes';

export const moviesApiServer = {
  getMoviesList(payload: IGetMoviesListData) {
    const params = Object.fromEntries(
      Object.entries(payload).filter(
        ([key, value]) => value !== undefined && value !== null && value !== '' && key !== 'limit',
      ),
    );

    return fetchMoviesList({
      endpoint: `movies/list`,
      params,
    });
  },

  async getMovieById(id: number) {
    const res = await fetch(`${environment.BASE_URL}/movies/${id}`, {
      cache: 'no-store',
    });

    return res.json();
  },
};
