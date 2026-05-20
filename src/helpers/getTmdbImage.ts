import environment from '@/config';
import { MovieBackdropImageSizeEnum, MoviePosterImageSizeEnum } from '@/types/movies';

export const getTmdbImage = (
  path: string,
  size: MoviePosterImageSizeEnum | MovieBackdropImageSizeEnum = MoviePosterImageSizeEnum.W500,
) => {
  if (!path) return '';

  return `${environment.TMDB_IMAGE_URL}/${size}${path}`;
};
