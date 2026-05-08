import { useQuery } from '@tanstack/react-query';

import { moviesApi } from '../moviesApi';
import { MoviesListTypeEnum } from '../moviesTypes';

type IGetMoviesListProps = {
  listType: MoviesListTypeEnum;
  page?: number;
};

export const useGetMoviesList = ({ listType, page = 1 }: IGetMoviesListProps) => {
  return useQuery({
    queryKey: [`moviesList-${listType}`, page],
    queryFn: () =>
      moviesApi.getMoviesList({
        listType,
        page,
      }),
    select: (res) => res.data.results,
  });
};
