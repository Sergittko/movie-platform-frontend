import { MovieBackdropImageSizeEnum, MoviePosterImageSizeEnum } from '@/types/movies';

export const getTmdbImage = (
  path: string,
  size: MoviePosterImageSizeEnum | MovieBackdropImageSizeEnum = MoviePosterImageSizeEnum.W500,
) => {
  if (!path) return '';

  return `${process.env.NEXT_PUBLIC_TMDB_IMAGE_URL}/${size}${path}`;
};
