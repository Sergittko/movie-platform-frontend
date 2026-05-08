import { IPaginationData } from '@/types/http';
import { IGenre, IMovie } from '@/types/movies';
import { SortByEnum } from '@/types/movies-filters';

export interface IGetMoviesGenresResponse {
  genres: IGenre[];
}

export interface IGetMoviesListData extends IPaginationData {
  listType: MoviesListTypeEnum;
}

export enum MoviesListTypeEnum {
  TOP_RATED = 'top_rated',
  POPULAR = 'popular',
  NOW_PLAYING = 'now_playing',
  UPCOMING = 'upcoming',
}

export interface IGetMoviesListResponse {
  results: IMovie[];
  page: number;
  totalPages: number;
  totalResults: number;
}

export interface IGetMoviesSearchData extends IPaginationData {
  sortBy?: SortByEnum;
  genres?: string;
  page?: number;
  yearFrom?: number;
  yearTo?: number;
  ratingFrom?: number;
  ratingTo?: number;
}

export interface IGetMoviesSearchResponse {
  results: IMovie[];
  page: number;
  totalPages: number;
  totalResults: number;
}

export interface IGetMoviesByNameSearchData {
  query?: string;
  page?: number;
}

export interface IGetMoviesByNameSearchResponse {
  results: IMovie[];
  page: number;
  totalPages: number;
  totalResults: number;
}
