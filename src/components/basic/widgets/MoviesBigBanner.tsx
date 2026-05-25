'use client';

import dayjs from 'dayjs';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';

import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { getTmdbImage } from '@/helpers/getTmdbImage';
import { IMovie, MovieBackdropImageSizeEnum } from '@/types/movies';
import { AppRoutePathEnum } from '@/types/routes';

import { Card } from '../../ui/card';
import SeeMoreButton from '../SeeMore';

interface MoviesBigBannerProps {
  moviesList: IMovie[];
  seeMoreLink?: string;
}

const MoviesBigBanner: FC<MoviesBigBannerProps> = ({ moviesList, seeMoreLink }) => {
  const router = useRouter();

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState<number>(0);

  const handleRedirectToMoviePage = (moiveId: string) => {
    router.push(`${AppRoutePathEnum.MOVIE_BY_ID}/${moiveId}`);
  };

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
          {moviesList.slice(0, 8).map(({ title, id, backdrop_path, release_date }, index) => (
            <CarouselItem
              key={id + title + index}
              className="p-0"
              onClick={() => id && handleRedirectToMoviePage(id.toString())}
            >
              <div className="relative h-90">
                {/* <div className="z-10 h-full w-full bg-linear-to-br from-red-900 via-pink-950 via-30% to-gray-950" /> */}
                <div className="absolute bottom-0 left-0 z-2 h-1/3 w-full bg-linear-to-b from-transparent to-black/80" />
                <div className="absolute top-0 left-0 z-2 h-1/3 w-full bg-linear-to-t from-transparent to-black/80" />
                <p className="absolute bottom-6 left-16 z-3 flex items-center text-xl font-semibold text-white/60">
                  {title}
                  <span className="px-2 text-4xl leading-2.5">·</span>
                  <span className="text-base">{dayjs(release_date).format('DD mM YYYY')}</span>
                </p>

                <Image
                  src={getTmdbImage(backdrop_path || '', MovieBackdropImageSizeEnum.W1280)}
                  alt="Backdrop"
                  width={2000}
                  height={2000}
                  loading="lazy"
                  className="absolute top-0 left-0 z-1 h-full w-full object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <p className="absolute top-7.5 left-12 flex gap-2 text-xl font-semibold text-white">
        Upcoming movies
      </p>

      {!!seeMoreLink && (
        <div className="absolute top-7.5 right-12 z-10">
          <SeeMoreButton seeMoreLink={seeMoreLink} />
        </div>
      )}

      <div className="absolute top-0 left-0 z-0 h-1/3 w-full bg-linear-to-b from-black/40 to-transparent" />

      <div className="absolute right-12 bottom-7.5 flex gap-2">
        {moviesList.slice(0, 8).map((movie, index) => (
          <button
            key={index + movie.id + '_dot'}
            onClick={() => api?.scrollTo(index)}
            className={`h-3 w-3 rounded-full transition-colors ${current === index ? 'bg-white/60' : 'bg-white/20 hover:bg-white/40'} `}
          />
        ))}
      </div>
    </Card>
  );
};

export default MoviesBigBanner;
