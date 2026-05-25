import { useQuery } from '@tanstack/react-query';

import { moviesApi } from '../moviesApi';

export const useGetMoviesGenres = () => {
  return useQuery({
    queryKey: [`moviesGenres`],
    queryFn: () => moviesApi.getMoviesGenres(),
    select: (res) => res.data.genres,
  });
};
