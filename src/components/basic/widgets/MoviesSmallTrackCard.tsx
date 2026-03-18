import { FC } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';

import MovieCard from '../MovieCard';

interface IMoviesSmallTrackCardProps {
  title: string;
  moviesList: string[];
}

const MoviesSmallTrackCard: FC<IMoviesSmallTrackCardProps> = ({ title, moviesList }) => {
  return (
    <Card className="gap-0 overflow-hidden pt-3 pb-2">
      <CardHeader>
        <CardTitle className="flex items-center justify-center text-base">{title}</CardTitle>
      </CardHeader>

      <div className="flex items-center gap-4 overflow-x-auto px-6 pt-2 pb-1">
        {moviesList.map((item, index) => (
          <MovieCard key={item + index} name={item} size="sm" />
        ))}
      </div>

      <Button className="mx-2 mt-1.5 rounded-4xl" variant="outline">
        Show all
      </Button>
    </Card>
  );
};

export default MoviesSmallTrackCard;
