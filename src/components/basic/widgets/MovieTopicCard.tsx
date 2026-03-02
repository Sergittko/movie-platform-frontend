'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

import { IMovieTopicData } from '@/types/base-movie-cards';

import { Card, CardTitle } from '../../ui/card';

interface IMovieTopicCardProps {
  data: IMovieTopicData;
}

const MovieTopicCard: FC<IMovieTopicCardProps> = ({ data: { title, image, link } }) => {
  const router = useRouter();

  return (
    <Card
      className="group relative overflow-hidden p-0 cursor-pointer rounded-2xl w-full h-52"
      onClick={() => router.push(link)}
    >
      <Image
        src={image}
        alt={title + '_movie_topic'}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-black/70 transition-colors duration-300 group-hover:bg-black/80" />

      <CardTitle className="absolute inset-0 z-10 flex items-center justify-center text-center text-3xl md:text-4xl font-semibold tracking-tight text-white/80 transition-colors duration-300 group-hover:text-white drop-shadow-lg px-6">
        {title}
      </CardTitle>
    </Card>
  );
};

export default MovieTopicCard;
