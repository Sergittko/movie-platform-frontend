import Link from 'next/link';
import { FC } from 'react';

import { genresIcons } from '@/constants/genres';
import { cn } from '@/lib/utils';
import { IGenre } from '@/types/movies';

interface IGenreButtonProps {
  genre: IGenre;
  size?: 'basic' | 'small';
}

type SizeStylesObjType = {
  containerStyle: string;
  iconStyle: string;
  textStyle: string;
};

const basicSizeStyles: SizeStylesObjType = {
  containerStyle: 'min-w-22 gap-2 px-8 py-1.5',
  iconStyle: 'h-5 min-h-5 w-5 min-w-5',
  textStyle: 'text-base',
};

const smallSizeStyles: SizeStylesObjType = {
  containerStyle: 'min-w-10 gap-1.5 px-4 py-0.5',
  iconStyle: 'h-3.5 min-h-3.5 w-3.5 min-w-3.5',
  textStyle: 'text-sm',
};

const GenreButton: FC<IGenreButtonProps> = ({ genre: { id, name }, size = 'basic' }) => {
  const Icon = genresIcons[id] || genresIcons[0];

  const { containerStyle, iconStyle, textStyle } =
    size === 'small' ? smallSizeStyles : basicSizeStyles;

  return (
    <Link key={id} href={`/search?genre=${id}`} className="group">
      <div
        className={cn(
          'flex w-fit items-center justify-center rounded-2xl border border-white/10 bg-white/2 backdrop-blur-sm transition-all duration-300 ease-out hover:scale-[1.03] hover:border-white/20 hover:bg-white/6 hover:shadow-[0_0_10px_rgba(255,255,255,0.06)] active:scale-[0.98]',
          containerStyle,
        )}
      >
        <Icon
          className={cn(
            'text-white/60 transition-all group-hover:scale-103 group-hover:text-white',
            iconStyle,
          )}
        />
        <span
          className={cn(
            'min-w-fit font-medium text-white/60 transition-colors group-hover:text-white',
            textStyle,
          )}
        >
          {name}
        </span>
      </div>
    </Link>
  );
};

export default GenreButton;
