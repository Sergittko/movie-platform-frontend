'use client';

import Autoplay from 'embla-carousel-autoplay';
import { FC, useEffect, useState } from 'react';

import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel';

import { Card } from '../../ui/card';

interface MoviesBigBannerProps {
  moviesList: string[];
}

const MoviesBigBanner: FC<MoviesBigBannerProps> = ({ moviesList }) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <Card className="relative w-full overflow-hidden p-0">
      <Carousel
        setApi={setApi}
        plugins={[
          Autoplay({
            delay: 15000,
          }),
        ]}
        opts={{
          align: 'start',
          loop: true,
        }}
      >
        <CarouselContent>
          {moviesList.map((movie) => (
            <CarouselItem key={movie} className="p-0">
              <div className="relative h-90">
                <div className="h-full w-full bg-linear-to-br from-red-900 via-pink-950 via-30% to-gray-950" />
                <div className="absolute bottom-0 left-0 z-0 h-1/3 w-full bg-linear-to-b from-transparent to-black/40" />
                <p className="absolute bottom-6 left-16 text-xl font-semibold text-white/60">
                  {movie}
                </p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <p className="absolute top-7.5 left-12 flex gap-2 text-xl font-semibold text-white">
        Upcoming movies
      </p>
      <div className="absolute top-0 left-0 z-0 h-1/3 w-full bg-linear-to-b from-black/40 to-transparent" />

      <div className="absolute right-12 bottom-7.5 flex gap-2">
        {moviesList.map((movie, index) => (
          <button
            key={movie + '_dot'}
            onClick={() => api?.scrollTo(index)}
            className={`h-3 w-3 rounded-full transition-colors ${current === index ? 'bg-white/60' : 'bg-white/20 hover:bg-white/40'} `}
          />
        ))}
      </div>
    </Card>
  );
};

export default MoviesBigBanner;
