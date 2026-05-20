'use client';

import { useQuery } from '@tanstack/react-query';
import { FC, useEffect, useState } from 'react';

import { IGetMoviesListResponse, MoviesListTypeEnum } from '@/api/movies/moviesTypes';
import { IUserMoviesResponse } from '@/api/users/usersTypes';
import InfiniteScrollWrapper from '@/components/basic/InfiniteScrollWrapper';
import MovieCard from '@/components/basic/MovieCard';
import { CardTitle } from '@/components/ui/card';
import {
  MOVIES_LIST_CLIENT_API_MAP,
  MOVIES_LIST_LIMIT,
  MoviesListsEnum,
  MoviesListsPayloadType,
  moviesListTitles,
} from '@/constants/movies-lists';
import { isSavedMovie } from '@/helpers/isSavedMovie';
import { useAppSelector } from '@/redux/hooks';
import userSelectors from '@/redux/user/userSelectors';
import { IMovie, ISavedUserMovie } from '@/types/movies';

interface IListPageProps {
  listType: MoviesListsEnum | MoviesListTypeEnum;
  movies: ISavedUserMovie[];
  page: number;
  totalPages: number;
  totalResults: number;
}

const ListPage: FC<IListPageProps> = ({ listType, movies, page, totalPages, totalResults }) => {
  const userId = useAppSelector(userSelectors.getUserId);

  const listTitle = moviesListTitles[listType] || listType;
  const fetchListApi = MOVIES_LIST_CLIENT_API_MAP[listType];

  const [moviesData, setMoviesData] = useState<(ISavedUserMovie | IMovie)[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(page || 1);

  const { data: moviesListData, isLoading: isMoviesListDataLoading } = useQuery({
    queryKey: [`getListMovies-${listType}-${currentPage}`],
    queryFn: async () => {
      const response = await fetchListApi({
        userId,
        page: currentPage,
        limit: MOVIES_LIST_LIMIT,
        listType,
      } as MoviesListsPayloadType);

      return response.data;
    },
    select: (res: IUserMoviesResponse | IGetMoviesListResponse) => res.data,
    enabled: currentPage > 1,
    refetchOnWindowFocus: false,
  });

  const handleLoadNewPage = () => {
    if (!isMoviesListDataLoading && totalResults >= moviesData.length) {
      setCurrentPage((prev) => ++prev);
    }
  };

  useEffect(() => {
    if (movies.length) {
      setMoviesData(movies);
    }
  }, [movies]);

  useEffect(() => {
    const resMoviesList = moviesListData?.movies;

    if (resMoviesList?.length) {
      setMoviesData((prev) => [...prev, ...resMoviesList]);
    }
  }, [moviesListData]);

  return (
    <div>
      <CardTitle className="mt-4 mb-9 text-center">{listTitle}</CardTitle>

      <InfiniteScrollWrapper
        hasMore={currentPage < totalPages}
        onLoadMore={handleLoadNewPage}
        isLoading={isMoviesListDataLoading}
      >
        <div className="m-auto grid max-w-6xl grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-6 max-[1100px]:w-fit">
          {moviesData.length ? (
            moviesData?.map((movie, index) => {
              const isSaved = isSavedMovie(movie);

              return (
                <div
                  key={movie.title + (isSaved ? movie?.movieId : movie?.id) + index}
                  className="m-auto"
                >
                  <MovieCard
                    name={movie.title}
                    {...(isSaved ? { savedData: movie } : { data: movie })}
                  />
                </div>
              );
            })
          ) : (
            <div className="flex h-20 items-center justify-center">
              <p className="text-base text-white/70">
                {moviesData.length ? 'No movies found by name' : 'No movies found'}
              </p>
            </div>
          )}
        </div>
      </InfiniteScrollWrapper>

      <p className="mt-6 mb-1 w-full text-center text-xs font-semibold text-white/60">
        {moviesData.length} of {totalResults} movies
      </p>
    </div>
  );
};

export default ListPage;
