'use client';

import { useState } from 'react';

import { Carousel, CarouselContent, CarouselNext } from '@/components/ui/carousel';
import { allMoviesData } from '@/constants/movies-widget-data';

import MovieCarouselItem from './MovieCarouselItem';

const MoviesMatchCarousel = () => {
  const [currentMoviesSelected, setCurrentMoviesSelected] = useState<string[]>([]);

  const handleSetCarouselMoviesMatch = (name: string) => {
    setCurrentMoviesSelected((prev) => [...prev, name]);
  };

  return (
    <Carousel
      opts={{
        slidesToScroll: 2,
        watchDrag: false,
      }}
      className="relative w-xl max-w-[calc(100%-10%)] pb-14"
    >
      <CarouselContent className="h-full! px-5">
        {allMoviesData.map((name, index) => (
          <MovieCarouselItem
            key={name + index}
            name={name}
            addCarouselMovieMatch={handleSetCarouselMoviesMatch}
          />
        ))}
      </CarouselContent>

      <CarouselNext
        disabled={currentMoviesSelected?.length !== 2}
        className="absolute top-[unset]! right-0! bottom-0! left-0! mx-auto h-10 w-[calc(100%-100px)] translate-y-0!"
        buttonText="Show next movies"
        onPress={() => setCurrentMoviesSelected([])}
      />
    </Carousel>
  );
};

export default MoviesMatchCarousel;
