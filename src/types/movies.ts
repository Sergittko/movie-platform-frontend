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

export interface IMovieById extends IMovie {
  tagline: string;
  status: string;
  budget: number;
  revenue: number;
  runtime: number;
  imdb_id: string;
  genres: IGenre[];
  production_companies: IProductionCompanies[];
  production_countries: IProductionCountries[];
  videos: { results: { key: string }[] };
  credits: {
    cast: ICast[];
  };
  recommendations: {
    results: IRecommendations[];
  };
  images: {
    backdrops: { file_path: string }[];
    posters: { file_path: string }[];
    logos: { file_path: string }[];
  };
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

export interface IProductionCompanies {
  logo_path: string;
  name: string;
}

export interface IProductionCountries {
  name: string;
}

export interface ICast {
  profile_path: string;
  character: string;
  name: string;
}

export interface IRecommendations {
  poster_path: string;
  title: string;
  id: string;
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
