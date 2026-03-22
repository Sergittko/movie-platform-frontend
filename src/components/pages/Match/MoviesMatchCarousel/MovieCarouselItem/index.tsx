import { Check, X } from 'lucide-react';
import { FC, useState } from 'react';

import MovieCard from '@/components/basic/MovieCard';
import { RoundedIconButton } from '@/components/basic/RoundedIconButton';
import { CarouselItem } from '@/components/ui/carousel';
import { cn } from '@/lib/utils';

interface IMovieCarouselItemProps {
  name: string;
  addCarouselMovieMatch: (name: string) => void;
}

const MovieCarouselItem: FC<IMovieCarouselItemProps> = ({ name, addCarouselMovieMatch }) => {
  const [isMovieMatch, setMovieMatch] = useState<null | boolean>(null);

  const hadnldeAcceptMovie = () => {
    addCarouselMovieMatch(name);
    setMovieMatch(true);
  };

  const hadnldeDeclineMovie = () => {
    addCarouselMovieMatch(name);
    setMovieMatch(false);
  };

  return (
    <CarouselItem className="relative flex min-h-fit basis-1/2 flex-col items-center justify-center">
      <div
        className={cn(
          'flex w-full items-center justify-center transition-all',
          typeof isMovieMatch === 'boolean' && 'grayscale-75',
        )}
      >
        <MovieCard name={name} size="xl" isDisabledAnimation />
      </div>

      <div className="mx-auto mt-2 flex items-center justify-center gap-2">
        <RoundedIconButton
          className={cn(
            'max-h-10 min-h-10 max-w-10 min-w-10 bg-green-600/40 hover:bg-green-600/60 active:bg-green-600/50',
            typeof isMovieMatch === 'boolean' && !isMovieMatch && 'bg-white/4!',
          )}
          icon={Check}
          onClick={hadnldeAcceptMovie}
        />
        <RoundedIconButton
          className={cn(
            'max-h-10 min-h-10 max-w-10 min-w-10 bg-red-600/40 hover:bg-red-600/60 active:bg-red-600/50',
            typeof isMovieMatch === 'boolean' && isMovieMatch && 'bg-white/4!',
          )}
          icon={X}
          onClick={hadnldeDeclineMovie}
        />
      </div>
    </CarouselItem>
  );
};

export default MovieCarouselItem;
