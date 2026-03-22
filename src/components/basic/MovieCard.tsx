'use client';

import { FC } from 'react';

import { cn } from '@/lib/utils';

interface IMovieCardProps {
  name: string;
  size?: 'sm' | 'basic' | 'xl';
  isDisabledAnimation?: boolean;
}

type SizeStylesObjType = {
  container: string;
  nameChar: string;
  nameText: string;
};

const MovieCard: FC<IMovieCardProps> = ({ name, size = 'basic', isDisabledAnimation }) => {
  const smSizeStyle: SizeStylesObjType = {
    container: 'h-42 max-w-28 min-w-28 rounded-[8px]',
    nameChar: 'text-5xl',
    nameText: 'text-[11px] bottom-2 left-2 leading-[12px]',
  };
  const basicSizeStyle: SizeStylesObjType = {
    container: 'h-62 max-w-42 min-w-42 rounded-[10px]',
    nameChar: 'text-7xl',
    nameText: 'text-sm bottom-3 left-3',
  };
  const xlSizeStyle: SizeStylesObjType = {
    container: 'h-80 max-w-60 min-w-42 rounded-[12px] w-full',
    nameChar: 'text-9xl',
    nameText: 'text-md bottom-4 left-4',
  };

  const { container, nameChar, nameText } =
    size === 'sm' ? smSizeStyle : size === 'xl' ? xlSizeStyle : basicSizeStyle;

  return (
    <div
      className={cn(
        'relative flex cursor-pointer flex-col gap-1 overflow-hidden border border-white/10 bg-gray-950 p-0 shadow-sm backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:shadow-lg',
        !isDisabledAnimation && 'hover:-translate-y-2',
        container,
      )}
    >
      <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-red-900 via-pink-950 via-30% to-gray-950">
        <span className={cn('font-bold text-white/10 select-none', nameChar)}>
          {name.charAt(0)}
        </span>
      </div>

      <div className="absolute bottom-0 left-0 z-0 h-1/3 w-full bg-linear-to-b from-transparent to-black/40" />

      <p className={cn('absolute z-10 line-clamp-2 max-h-11 min-h-fit pr-1 text-white', nameText)}>
        {name}
      </p>
    </div>
  );
};

export default MovieCard;
