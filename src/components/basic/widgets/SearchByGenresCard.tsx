import { useGetMoviesGenres } from '@/api/movies/hooks/useGetMoviesGenres';
import { Card, CardTitle } from '@/components/ui/card';

import { Loader } from '../Loader';
import GenreButton from './GenreButton';

const SearchByGenresCard = () => {
  const { data: genres, isLoading } = useGetMoviesGenres();
  return (
    <Card className="gap-0 border-white/10 bg-linear-to-b from-white/3 to-transparent pt-4 pb-3">
      <CardTitle className="text-center text-lg font-semibold tracking-tight text-white/90">
        Search by genres
      </CardTitle>

      <div className="flex w-full flex-wrap items-center justify-center gap-2 px-2 pt-4 pb-2">
        {isLoading ? (
          <Loader />
        ) : (
          genres?.map((genre) => <GenreButton key={genre.id} genre={genre} />)
        )}
      </div>
    </Card>
  );
};

export default SearchByGenresCard;
