import Image from 'next/image';
import { FC, useState } from 'react';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { getTmdbImage } from '@/helpers/getTmdbImage';
import { cn } from '@/lib/utils';

interface IMoviePosterProps {
  movieTitle: string;
  posterPath?: string;
  moviePostersPath?: string[];
}

const MoviePoster: FC<IMoviePosterProps> = ({ posterPath, movieTitle, moviePostersPath }) => {
  const [activePoster, setActivePoster] = useState<string | null>(null);
  const [isChangingPoster, setIsChangingPoster] = useState(false);

  const handleChangePoster = (path: string) => {
    if (path === activePoster) return;

    setIsChangingPoster(true);

    setTimeout(() => {
      setActivePoster(path);

      requestAnimationFrame(() => {
        setIsChangingPoster(false);
      });
    }, 150);
  };

  return (
    <div>
      <div>
        {posterPath ? (
          <Image
            src={getTmdbImage(activePoster || posterPath)}
            alt={movieTitle + '_main_poster'}
            width={350}
            height={430}
            loading="lazy"
            className={cn(
              'h-full max-h-85 min-h-85 max-w-62.5 min-w-62.5 rounded-2xl object-cover transition-opacity duration-200',
              isChangingPoster ? 'opacity-0' : 'opacity-100',
            )}
          />
        ) : (
          <div className="flex max-h-85 min-h-85 max-w-62.5 min-w-62.5 items-center justify-center rounded-2xl bg-linear-to-br from-red-900 via-pink-950 via-30% to-gray-950">
            <span className={cn('text-9xl font-bold text-white/10 select-none')}>
              {movieTitle.charAt(0)}
            </span>
          </div>
        )}
      </div>

      {!!moviePostersPath?.length && (
        <Carousel className="mx-auto mt-4 w-full max-w-54 rounded-xl bg-black/20 p-2">
          <CarouselContent>
            {moviePostersPath.map((path, index) => (
              <CarouselItem key={path + index} className="flex basis-1/3 justify-center">
                <Image
                  src={getTmdbImage(path)}
                  alt={'poster_' + (index + 1)}
                  width={100}
                  height={100}
                  loading="lazy"
                  onClick={() => handleChangePoster(path)}
                  className={cn(
                    'max-h-14 min-h-14 max-w-14 min-w-14 cursor-pointer rounded-md object-cover transition hover:opacity-70',
                    (activePoster === path || (activePoster === null && index === 0)) &&
                      'opacity-40!',
                  )}
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="-left-5 min-h-14 w-4 rounded-md border-none! bg-black/40! p-0 text-white/80 hover:bg-black/50!" />

          <CarouselNext className="-right-5 min-h-14 w-4 rounded-md border-none! bg-black/40! p-0 text-white/80 hover:bg-black/50!" />
        </Carousel>
      )}
    </div>
  );
};

export default MoviePoster;
