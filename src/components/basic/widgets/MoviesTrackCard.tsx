import { FC } from 'react';

import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { IMovie } from '@/types/movies';

import MovieCard from '../MovieCard';
import SeeMoreButton from '../SeeMore';

interface IMoviesTrackCardProps {
  title: string;
  moviesList: string[] | IMovie[];
  seeMoreLink?: string;
}

const MoviesTrackCard: FC<IMoviesTrackCardProps> = ({ title, moviesList, seeMoreLink }) => {
  return (
    <Card className="gap-1.5 overflow-hidden pb-3">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <p>{title}</p>

          {!!seeMoreLink && <SeeMoreButton seeMoreLink={seeMoreLink} />}
        </CardTitle>
      </CardHeader>

      <div className="no-scroll-arrows scrollbar-hide flex items-center gap-4 overflow-auto px-6 pt-2 pb-3">
        {moviesList.map((item, index) => {
          const isMovie = typeof item === 'object' && item !== null && 'title' in item;
          const name = isMovie ? item.title : item;
          return <MovieCard key={name + index} name={name} data={isMovie ? item : undefined} />;
        })}
      </div>
    </Card>
  );
};

export default MoviesTrackCard;
