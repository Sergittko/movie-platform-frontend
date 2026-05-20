import { useRouter } from 'next/navigation';
import { FC } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { ISavedUserMovie } from '@/types/movies';

import { Loader } from '../Loader';
import MovieCard from '../MovieCard';

interface IMoviesSmallTrackCardProps {
  title: string;
  moviesList: ISavedUserMovie[];
  isShowAll?: boolean;
  showAllLink?: string;
  isLoading?: boolean;
}

const MoviesSmallTrackCard: FC<IMoviesSmallTrackCardProps> = ({
  title,
  moviesList,
  isShowAll,
  showAllLink,
  isLoading = false,
}) => {
  const router = useRouter();

  return (
    <Card className="w-full gap-0 overflow-hidden pt-3 pb-2">
      <CardHeader>
        <CardTitle className="flex items-center justify-center text-base">{title}</CardTitle>
      </CardHeader>

      <div className="flex flex-1 items-center gap-4 overflow-x-auto px-6 pt-2 pb-1">
        {isLoading ? (
          <div className="mx-auto flex h-45 items-center justify-center">
            <Loader />
          </div>
        ) : !moviesList.length ? (
          <div className="mx-auto flex h-45 items-center justify-center">
            <p className="text-xs font-semibold text-white/60">No movies in this list</p>
          </div>
        ) : (
          moviesList.map((item, index) => (
            <MovieCard
              key={item.id + item.title + index}
              name={item.title}
              size="sm"
              savedData={item}
            />
          ))
        )}
      </div>

      {!!moviesList.length &&
        !isLoading &&
        (isShowAll ? (
          <Button
            className="mx-2 mt-1.5 rounded-4xl"
            variant="outline"
            onClick={() => showAllLink && router.push(showAllLink)}
          >
            Show all
          </Button>
        ) : (
          <p className="mx-auto text-xs font-semibold text-white/60">All movies shown in list</p>
        ))}
    </Card>
  );
};

export default MoviesSmallTrackCard;
