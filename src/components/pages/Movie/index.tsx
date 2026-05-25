'use client';

import dayjs from 'dayjs';
import { SquareArrowOutUpRight } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';

import ColContainer from '@/components/basic/layouts/ColContainer';
import RowContainer from '@/components/basic/layouts/RowContainer';
import GenreButton from '@/components/basic/widgets/GenreButton';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { formatMoney } from '@/helpers/formatMoney';
import { formatMovieRuntime } from '@/helpers/formatMovieRuntime';
import { IMovieById } from '@/types/movies';
import { AppRoutePathEnum } from '@/types/routes';

import MovieInfo from './MovieInfoBar';
import MovieInfoList, { MovieInfoItem } from './MovieInfoList';
import MovieListButtons from './MovieListButtons';
import MoviePoster from './MoviePoster';
import ProductionCompaniesList from './ProductionCompaniesList';

interface IMoviePageProps {
  movie: IMovieById;
}

const MoviePage: FC<IMoviePageProps> = ({ movie }) => {
  const productionCountries = movie.production_countries.map((c) => c.name).join(',');

  const castListData: MovieInfoItem[] = movie.credits.cast.slice(0, 12).map((item) => ({
    image: item.profile_path,
    title: item.character,
    subTitle: item.name,
  }));

  const recomendationsListData: MovieInfoItem[] = movie.recommendations.results.map((item) => ({
    image: item.poster_path,
    title: item.title,
    redirectLink: `${AppRoutePathEnum.MOVIE_BY_ID}/${item.id}`,
  }));

  const moviePostersPath = [
    movie.poster_path,
    ...movie.images.posters.slice(1, 12).map((item) => item.file_path),
  ];

  const formattedDate = dayjs(movie.release_date).format('DD MMM YYYY');

  return (
    <ColContainer>
      <Card>
        <CardContent>
          <RowContainer className="flex-wrap-reverse sm:flex-nowrap">
            <MoviePoster
              movieTitle={movie.title}
              posterPath={movie.poster_path}
              moviePostersPath={moviePostersPath}
            />

            <ColContainer className="w-full gap-px">
              <CardTitle className="mb-4 flex flex-wrap items-center justify-between gap-2 text-4xl">
                <p>{movie.title}</p>

                <MovieListButtons
                  movieId={movie.id}
                  movieTitle={movie.title}
                  movieImage={movie.poster_path}
                />
              </CardTitle>

              {!movie.status.includes('Released') && (
                <MovieInfo label={'Status'} value={movie.status} />
              )}
              {!!movie.tagline && <MovieInfo label={'Tagline'} value={movie.tagline} />}
              <MovieInfo label={'Release date'} value={formattedDate} />
              <MovieInfo label={'Runtime'} value={formatMovieRuntime(movie.runtime)} />
              <MovieInfo label={'Rating'} value={movie.vote_average.toFixed(1)} />
              {movie.production_countries && (
                <MovieInfo label={'Production:'} value={productionCountries} />
              )}
              <MovieInfo
                label={'Budget'}
                value={movie.budget ? formatMoney(movie.budget) : 'N/A'}
              />
              <MovieInfo
                label={'Revenue'}
                value={movie.revenue ? formatMoney(movie.revenue) : 'N/A'}
              />

              <Link
                className="mt-3 flex w-fit items-center justify-center gap-1 text-[13px] text-blue-300/70 transition-all hover:text-blue-300 hover:underline"
                href={`https://www.imdb.com/title/${movie.imdb_id}/`}
                target="_blank"
              >
                <span>Movie page on IMDB</span>
                <SquareArrowOutUpRight className="relative -top-px size-2.5" />
              </Link>

              <RowContainer className="mt-4 flex-wrap gap-2">
                {movie.genres?.map((genre) => (
                  <GenreButton key={genre.id} genre={genre} size="small" />
                ))}
              </RowContainer>

              <ProductionCompaniesList productionCompanies={movie.production_companies} />

              <p className="mt-4 text-sm text-white/60">Overview:</p>
              <p className="text-sm text-white/80">{movie.overview}</p>
            </ColContainer>
          </RowContainer>
        </CardContent>
      </Card>

      <MovieInfoList listTitle="Cast" data={castListData} />
      <MovieInfoList listTitle="Recomendations" data={recomendationsListData} />
    </ColContainer>
  );
};

export default MoviePage;
