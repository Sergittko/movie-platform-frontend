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
    <Card className="relative -left-6 rounded-none border-l-0 border-r-0 p-0 w-[calc(100%+48px)]">
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
              <div className="h-90 relative">
                <div className="h-full w-full bg-linear-to-br from-red-900 via-30% via-pink-950 to-gray-950" />
                <div className="absolute bottom-0 left-0 h-1/3 bg-linear-to-b from-transparent to-black/40 w-full z-0" />
                <p className="absolute left-16 bottom-6 font-semibold text-white/60 text-xl ">
                  {movie}
                </p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <p className="absolute top-7.5 left-12 flex gap-2 font-semibold text-white text-xl">
        Upcoming movies
      </p>
      <div className="absolute top-0 left-0 h-1/3 bg-linear-to-b from-black/40 to-transparent w-full z-0" />

      <div className="absolute bottom-7.5 right-12 flex gap-2">
        {moviesList.map((movie, index) => (
          <button
            key={movie + '_dot'}
            onClick={() => api?.scrollTo(index)}
            className={`
              w-3 h-3 rounded-full transition-colors
              ${current === index ? 'bg-white/60' : 'bg-white/20 hover:bg-white/40'}
            `}
          />
        ))}
      </div>
    </Card>
  );
};

export default MoviesBigBanner;
