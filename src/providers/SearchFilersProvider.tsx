'use client';

import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { moviesApi } from '@/api/movies/moviesApi';
import { IGetMoviesSearchData } from '@/api/movies/moviesTypes';
import {
  RATING_MAX,
  RATING_MIN,
  SELECT_MAX_YEAR,
  SELECT_MIN_YEAR,
} from '@/constants/movies-filters';
import { IMovie } from '@/types/movies';
import { SortByType } from '@/types/movies-filters';

type SearchFilters = {
  genres?: number[];
  sortBy?: SortByType | null;
  yearFrom?: number;
  yearTo?: number;
  ratingFrom?: number | null;
  ratingTo?: number | null;
};

type SearchFiltersContextType = {
  filters: SearchFilters;
  setFilters: React.Dispatch<React.SetStateAction<SearchFilters>>;
  searchResults: IMovie[];
  handleSearchByFilters: () => void;
  handleResetFilters: () => void;
  isResetting: boolean;
  isFetching: boolean;
  totalPages: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  isFiltersEmpty: boolean;
  searchByNameValue: string;
  setSearchByNameValue: React.Dispatch<React.SetStateAction<string>>;
};

const SearchFiltersContext = createContext<SearchFiltersContextType | null>(null);

const initialFilters: SearchFilters = {
  genres: [],
  sortBy: null,
  yearFrom: SELECT_MIN_YEAR,
  yearTo: SELECT_MAX_YEAR,
  ratingFrom: RATING_MIN,
  ratingTo: RATING_MAX,
};

export const SearchFiltersProvider = ({ children }: { children: ReactNode }) => {
  const searchParams = useSearchParams();
  const genreParam = searchParams.get('genre');

  const [filters, setFilters] = useState<SearchFilters>(initialFilters);
  const [isLoadGenreParam, setIsLoadGenreParam] = useState<boolean>(false);
  const [isResetting, setIsResetting] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  const [searchByNameValue, setSearchByNameValue] = useState<string>('');

  // TODO: save previous data on cancel

  const isFiltersEmpty =
    (filters.genres?.length || 0) === 0 &&
    filters.sortBy === null &&
    filters.yearFrom === SELECT_MIN_YEAR &&
    filters.yearTo === SELECT_MAX_YEAR &&
    filters.ratingFrom === RATING_MIN &&
    filters.ratingTo === RATING_MAX;

  const handleSetPayload = ({
    filters,
    page,
  }: {
    filters: SearchFilters;
    page: number;
  }): IGetMoviesSearchData => {
    const payload: IGetMoviesSearchData = {
      page,
    };
    const { genres, ratingFrom, ratingTo, sortBy, yearFrom, yearTo } = filters;

    if (genres?.length) payload['genres'] = genres.join(',');
    if (ratingFrom && ratingFrom !== RATING_MIN) payload['ratingFrom'] = ratingFrom;
    if (ratingTo && ratingTo !== RATING_MAX) payload['ratingTo'] = ratingTo;
    if (yearFrom && yearFrom !== SELECT_MIN_YEAR) payload['yearFrom'] = yearFrom;
    if (yearTo && yearTo !== SELECT_MAX_YEAR) payload['yearTo'] = yearTo;
    if (sortBy) payload['sortBy'] = sortBy;

    return payload;
  };

  const {
    data: searchData,
    refetch,
    isFetching: isFetchingSearch,
  } = useQuery({
    queryKey: ['moviesSearchFilters', `isLoadGenreParam=${isLoadGenreParam}`],
    queryFn: async () => {
      const res = await moviesApi.getMoviesSearch(handleSetPayload({ filters, page }));
      return res.data;
    },
    enabled: searchByNameValue.length === 0, // Disable this query if searching by name
  });
  const {
    data: searchDataByName,
    refetch: refetchByName,
    isFetching: isFetchingByName,
  } = useQuery({
    queryKey: ['moviesSearchByName', `searchByNameValue=${searchByNameValue}`],
    queryFn: async () => {
      const res = await moviesApi.getMoviesByNameSearch({ query: searchByNameValue, page });
      return res.data;
    },
    enabled: searchByNameValue.length > 0, // Enable this query if searching by name
  });

  const handleSearchByFilters = () => {
    refetch();
  };

  const handleResetFilters = () => {
    setFilters(initialFilters);
    setPage(1);
    setIsResetting(true);
  };

  useEffect(() => {
    if (genreParam) {
      const genreId = Number(genreParam);

      setFilters((prev) => ({
        ...prev,
        genres: [genreId],
      }));

      setIsLoadGenreParam(true);
    }
  }, [genreParam]);

  useEffect(() => {
    if (isResetting) {
      setIsResetting(false);
      refetch();
    }
  }, [isResetting]);

  useEffect(() => {
    refetch();
    refetchByName();
  }, [page]);

  const searchResults = searchByNameValue.length
    ? searchDataByName?.results || []
    : searchData?.results || [];
  const totalPages = searchByNameValue.length
    ? searchDataByName?.totalPages || 0
    : searchData?.totalPages || 0;
  const pageValue = searchByNameValue.length ? searchDataByName?.page || 1 : searchData?.page || 1;

  return (
    <SearchFiltersContext.Provider
      value={{
        filters,
        searchResults,
        totalPages,
        setFilters,
        handleSearchByFilters,
        handleResetFilters,
        isResetting,
        isFetching: isFetchingSearch || isFetchingByName,
        page: pageValue,
        setPage,
        isFiltersEmpty,
        searchByNameValue,
        setSearchByNameValue,
      }}
    >
      {children}
    </SearchFiltersContext.Provider>
  );
};

export const useSearchFilters = () => {
  const context = useContext(SearchFiltersContext);

  if (!context) {
    throw new Error('useSearchFilters must be used within SearchFiltersProvider');
  }

  return context;
};
