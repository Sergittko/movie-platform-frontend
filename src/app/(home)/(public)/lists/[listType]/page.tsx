import { MoviesListTypeEnum } from '@/api/movies/moviesTypes';
import { fetchMoviesListServer } from '@/api/server/moviesList';
import ListPage from '@/components/pages/List';
import { MoviesListsEnum } from '@/constants/movies-lists';

interface PageProps {
  params: Promise<{
    listType: MoviesListsEnum | MoviesListTypeEnum;
  }>;
}

export default async function List({ params }: PageProps) {
  const { listType } = await params;

  const data = await fetchMoviesListServer(listType);

  return (
    <ListPage
      listType={listType}
      movies={data.data.movies}
      page={data.page}
      totalPages={data.totalPages}
      totalResults={data.totalResults}
    />
  );
}
