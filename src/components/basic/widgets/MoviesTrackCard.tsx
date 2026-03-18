import { ArrowRightIcon } from 'lucide-react';
import { FC } from 'react';

import { Card, CardHeader, CardTitle } from '@/components/ui/card';

import MovieCard from '../MovieCard';

interface IMoviesTrackCardProps {
  title: string;
  moviesList: string[];
}

const MoviesTrackCard: FC<IMoviesTrackCardProps> = ({ title, moviesList }) => {
  return (
    <Card className="gap-1.5 overflow-hidden pb-5">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <p>{title}</p>

          <button className="group flex cursor-pointer items-center gap-1 rounded-full border border-white/10 px-2.5 py-1 transition-colors hover:bg-white/10">
            <p className="relative -top-px text-sm text-white/60 group-hover:text-white">
              See more
            </p>
            <ArrowRightIcon className="h-auto w-4 text-white/60 group-hover:text-white" />
          </button>
        </CardTitle>
      </CardHeader>

      <div className="flex items-center gap-4 overflow-auto px-6 pt-2 pb-1">
        {moviesList.map((item, index) => (
          <MovieCard key={item + index} name={item} />
        ))}
      </div>
    </Card>
  );
};

export default MoviesTrackCard;
