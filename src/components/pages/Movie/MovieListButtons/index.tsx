'use client';

import { Bookmark, BookmarkCheck, Check, Plus } from 'lucide-react';
import { FC } from 'react';

import RowContainer from '@/components/basic/layouts/RowContainer';
import { RoundedIconButton } from '@/components/basic/RoundedIconButton';
import { useMovieLists } from '@/hooks/useMovieLists';
import { cn } from '@/lib/utils';

interface IMovieListButtonsProps {
  movieId: string | number;
  movieTitle: string;
  movieImage: string;
}

const MovieListButtons: FC<IMovieListButtonsProps> = ({ movieId, movieTitle, movieImage }) => {
  const { isInWatchlist, isInWatched, toggleInWatchlist, toggleInWatched, isLoading } =
    useMovieLists({
      movieId,
      movieTitle,
      movieImage,
    });

  return (
    <RowContainer className="gap-2">
      <RoundedIconButton
        icon={isInWatchlist ? BookmarkCheck : Bookmark}
        onClick={(e) => {
          e?.stopPropagation();
          toggleInWatchlist();
        }}
        className={cn(
          'max-h-9 min-h-9 max-w-fit min-w-fit items-center gap-2 p-2',
          isInWatched && 'hidden',
        )}
        iconClassName="size-4 text-white/80"
        disabled={isLoading}
      >
        <p className="relative top-px text-center text-xs text-white/80">
          {isInWatchlist ? 'Is in Watchlist' : 'Add to Watchlist'}
        </p>
      </RoundedIconButton>

      <RoundedIconButton
        icon={isInWatched ? Check : Plus}
        onClick={(e) => {
          e?.stopPropagation();
          toggleInWatched();
        }}
        className={cn(
          'max-h-9 min-h-9 max-w-fit min-w-fit items-center gap-2 p-2',
          isInWatchlist && 'hidden',
        )}
        iconClassName="size-4.5 text-white/80"
        disabled={isLoading}
      >
        <p className="relative top-px text-center text-xs text-white/80">
          {isInWatched ? 'Is in Seen Movies' : 'Add to Seen Movies'}
        </p>
      </RoundedIconButton>
    </RowContainer>
  );
};

export default MovieListButtons;
