import { moviesApiServer } from '@/api/movies/moviesApiServer';
import { IGetMovieByIdResponse } from '@/api/movies/moviesTypes';
import MoviePage from '@/components/pages/Movie';

interface IMoviePageProps {
  params: Promise<{
    movieId: string;
  }>;
}

export async function generateMetadata({ params }: IMoviePageProps) {
  const { movieId } = await params;

  const { movie } = await moviesApiServer.getMovieById(Number(movieId));

  return {
    title: movie.title || 'Movie page',
  };
}

export default async function Movie({ params }: IMoviePageProps) {
  const { movieId } = await params;

  const { movie } = (await moviesApiServer.getMovieById(Number(movieId))) as IGetMovieByIdResponse;

  if (!movie) {
    return (
      <p className="my-30 w-full text-center text-xl font-semibold text-white/80">
        This movie page is currently unavailable
        <span className="block text-sm text-white/50">Please try again later</span>
      </p>
    );
  }

  return <MoviePage movie={movie || null} />;
}
