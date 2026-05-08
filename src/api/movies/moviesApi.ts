import axios from 'axios';

import environment from '@/config';

import {
  IGetMoviesByNameSearchData,
  IGetMoviesByNameSearchResponse,
  IGetMoviesGenresResponse,
  IGetMoviesListData,
  IGetMoviesListResponse,
  IGetMoviesSearchData,
  IGetMoviesSearchResponse,
} from './moviesTypes';

const instance = axios.create({
  baseURL: `${environment.BASE_URL}/movies/`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const moviesApi = {
  getMoviesGenres() {
    return instance.get<IGetMoviesGenresResponse>(`genres`);
  },

  getMoviesList(params: IGetMoviesListData) {
    return instance.get<IGetMoviesListResponse>(`list`, {
      params,
    });
  },

  getMoviesSearch(params: IGetMoviesSearchData) {
    return instance.get<IGetMoviesSearchResponse>(`search`, {
      params,
    });
  },

  getMoviesByNameSearch(params: IGetMoviesByNameSearchData) {
    return instance.get<IGetMoviesByNameSearchResponse>(`search-by-name`, {
      params,
    });
  },
};
