export interface IMovie {
  id: number;
  title: string;
  overview: string;
  genre_ids: number[];
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  video: boolean;
  original_title: string;
  original_language: string;
  adult: boolean;
  popularity: number;
  release_date: string;
  vote_count: number;
}

export interface ISavedUserMovie {
  createdAt: string;
  id: string;
  image: string;
  movieId: string;
  profileId: string;
  title: string;
}

export interface IGenre {
  id: number;
  name: string;
}

export enum MoviePosterImageSizeEnum {
  W92 = 'w92',
  W154 = 'w154',
  W185 = 'w185',
  W342 = 'w342',
  W500 = 'w500',
  W780 = 'w780',
  ORIGINAL = 'original',
}

export enum MovieBackdropImageSizeEnum {
  W300 = 'w300',
  W780 = 'w780',
  W1280 = 'w1280',
  ORIGINAL = 'original',
}
