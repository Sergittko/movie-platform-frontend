import { IMovie, ISavedUserMovie } from '@/types/movies';

export const isSavedMovie = (movie: IMovie | ISavedUserMovie): movie is ISavedUserMovie => {
  return 'movieId' in movie;
};
