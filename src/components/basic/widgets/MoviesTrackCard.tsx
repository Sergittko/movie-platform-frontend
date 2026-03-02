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
    <Card className="pb-5 gap-1.5 overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <p>{title}</p>

          <button className="cursor-pointer group transition-colors py-1 px-2.5 border border-white/10 hover:bg-white/10 rounded-full flex items-center gap-1">
            <p className="relative -top-px text-white/60 group-hover:text-white text-sm">
              See more
            </p>
            <ArrowRightIcon className="w-4 h-auto text-white/60 group-hover:text-white" />
          </button>
        </CardTitle>
      </CardHeader>

      <div className="flex items-center gap-4 overflow-auto px-6 pb-1 pt-2">
        {moviesList.map((item, index) => (
          <MovieCard key={item + index} name={item} />
        ))}
      </div>
    </Card>
  );
};

export default MoviesTrackCard;
