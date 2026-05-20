'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Bookmark, BookmarkCheck, Check, Plus } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';

import { usersApi } from '@/api/users/usersApi';
import { getTmdbImage } from '@/helpers/getTmdbImage';
import { successToast } from '@/helpers/toastActions';
import { cn } from '@/lib/utils';
import { useAppSelector, useAuth } from '@/redux/hooks';
import userSelectors from '@/redux/user/userSelectors';
import { IMovie, ISavedUserMovie } from '@/types/movies';
import { AppRoutePathEnum } from '@/types/routes';

import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { RoundedIconButton } from './RoundedIconButton';

interface IMovieCardProps {
  name: string;
  size?: 'sm' | 'basic' | 'xl';
  isDisabledAnimation?: boolean;
  data?: IMovie;
  savedData?: ISavedUserMovie;
}

type SizeStylesObjType = {
  container: string;
  nameChar: string;
  nameText: string;
  imgW: number;
  imgH: number;
};

const smSizeStyle: SizeStylesObjType = {
  container: 'h-42 max-w-28 min-w-28 rounded-[8px]',
  nameChar: 'text-5xl',
  nameText: 'text-[11px] bottom-2 left-2 leading-[12px]',
  imgW: 120,
  imgH: 180,
};

const basicSizeStyle: SizeStylesObjType = {
  container: 'h-62 max-w-42 min-w-42 rounded-[10px]',
  nameChar: 'text-7xl',
  nameText: 'text-sm bottom-3 left-3',
  imgW: 180,
  imgH: 250,
};

const xlSizeStyle: SizeStylesObjType = {
  container: 'h-80 max-w-60 min-w-42 rounded-[12px] w-full',
  nameChar: 'text-9xl',
  nameText: 'text-md bottom-4 left-4',
  imgW: 250,
  imgH: 330,
};

const MovieCard: FC<IMovieCardProps> = ({
  name,
  size = 'basic',
  isDisabledAnimation,
  data,
  savedData,
}) => {
  const router = useRouter();
  const isAuth = useAuth();
  const queryClient = useQueryClient();
  const userId = useAppSelector(userSelectors.getUserId);

  const moiveId = savedData?.movieId || data?.id || '';
  const moiveTitle = savedData?.title || data?.title;
  const moiveImg = savedData?.image || data?.poster_path;

  const [isInWatched, setInWatched] = useState<boolean>(false);
  const [isInWatchlist, setInWatchlist] = useState<boolean>(false);

  const { container, nameChar, nameText, imgW, imgH } =
    size === 'sm' ? smSizeStyle : size === 'xl' ? xlSizeStyle : basicSizeStyle;

  const { data: watchedMovieIds, isLoading: isWatchedMovieIdsLoading } = useQuery({
    queryKey: [`getWatchedMovieIds-${userId}`],
    queryFn: () => usersApi.getWatchedMovieIds(userId),
    select: (res) => res.data.data,
    enabled: !!userId,
    retry: 3,
  });

  const { data: watchlistMovieIds, isLoading: isWatchlistMovieIdsLoading } = useQuery({
    queryKey: [`getWatchlistMovieIds-${userId}`],
    queryFn: () => usersApi.getWatchlistMovieIds(userId),
    select: (res) => res.data.data,
    enabled: !!userId,
    retry: 3,
  });

  const { mutate: addToWatchlistRequest, isPending: isAddingToWatchlist } = useMutation({
    mutationKey: ['addToWatchlist' + moiveId],
    mutationFn: () =>
      usersApi.addToWatchlist({
        userId,
        movieData: {
          movieId: moiveId.toString(),
          image: moiveImg || '',
          title: moiveTitle || '',
        },
      }),
    onSuccess: () => {
      setInWatchlist(true);
      successToast(moiveTitle + ' added to watchlist');
    },
  });

  const { mutate: deleteWatchlistRequest, isPending: isDeletingFromWatchlist } = useMutation({
    mutationKey: ['deleteWatchlistMovie' + moiveId],
    mutationFn: () =>
      usersApi.deleteWatchlistMovie({
        userId,
        movieId: moiveId.toString(),
      }),
    onSuccess: () => {
      setInWatchlist(false);
      successToast(moiveTitle + ' removed from watchlist');
      queryClient.invalidateQueries({
        queryKey: [`getWatchlist-${userId}`],
      });
    },
  });

  const { mutate: addToWatchedRequest, isPending: isAddingToWatched } = useMutation({
    mutationKey: ['addToWatched' + moiveId],
    mutationFn: () =>
      usersApi.addToWatched({
        userId,
        movieData: {
          movieId: moiveId.toString(),
          image: moiveImg || '',
          title: moiveTitle || '',
        },
      }),
    onSuccess: () => {
      setInWatched(true);
      successToast(moiveTitle + ' added to seen movies');
    },
  });

  const { mutate: deleteWatchedRequest, isPending: isDeletingFromWatched } = useMutation({
    mutationKey: ['deleteWatchedMovie' + moiveId],
    mutationFn: () =>
      usersApi.deleteWatchedMovie({
        userId,
        movieId: moiveId.toString(),
      }),
    onSuccess: () => {
      setInWatched(false);
      successToast(moiveTitle + ' removed from seen movies');
      queryClient.invalidateQueries({
        queryKey: [`getWatchedMovies-${userId}`],
      });
    },
  });

  const isLoading =
    isWatchedMovieIdsLoading ||
    isWatchlistMovieIdsLoading ||
    isAddingToWatchlist ||
    isAddingToWatched ||
    isDeletingFromWatchlist ||
    isDeletingFromWatched;

  const toggleInWatchlist = () => {
    if (!isAuth) {
      router.push(AppRoutePathEnum.LOGIN);
      return;
    }

    if (isInWatchlist) {
      deleteWatchlistRequest();
    } else {
      addToWatchlistRequest();
    }
  };

  const toggleInWatched = () => {
    if (!isAuth) {
      router.push(AppRoutePathEnum.LOGIN);
      return;
    }

    if (isInWatched) {
      deleteWatchedRequest();
    } else {
      addToWatchedRequest();
    }
  };

  useEffect(() => {
    if (watchlistMovieIds?.movieIds) {
      const isIncludesWatchlist = watchlistMovieIds?.movieIds.includes(moiveId.toString() || '');
      setInWatchlist(!!isIncludesWatchlist);
    }
  }, [watchlistMovieIds]);

  useEffect(() => {
    if (watchedMovieIds?.movieIds) {
      const isIncludesWatched = watchedMovieIds?.movieIds.includes(moiveId.toString() || '');
      setInWatched(!!isIncludesWatched);
    }
  }, [watchedMovieIds]);

  return (
    <div
      className={cn(
        'group relative flex cursor-pointer flex-col gap-1 overflow-hidden border border-white/10 bg-gray-950 p-0 shadow-sm backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:shadow-lg',
        !isDisabledAnimation && 'hover:-translate-y-2',
        container,
      )}
    >
      <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-red-900 via-pink-950 via-30% to-gray-950">
        {!!moiveImg ? (
          <Image
            src={getTmdbImage(moiveImg || '')}
            alt="Poster"
            width={imgW}
            height={imgH}
            loading="lazy"
            className="h-full w-full"
          />
        ) : (
          <span className={cn('font-bold text-white/10 select-none', nameChar)}>
            {name.charAt(0)}
          </span>
        )}
      </div>

      <div className="absolute bottom-0 left-0 z-0 h-1/3 w-full bg-linear-to-b from-transparent from-0% to-black/90 to-70%" />

      <p className={cn('absolute z-10 line-clamp-2 max-h-11 min-h-fit pr-1 text-white', nameText)}>
        {name}
      </p>

      <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <Tooltip>
          <TooltipTrigger asChild>
            <RoundedIconButton
              icon={isInWatchlist ? BookmarkCheck : Bookmark}
              onClick={toggleInWatchlist}
              className={cn(
                'max-h-8 min-h-8 max-w-8 min-w-8 bg-black/80 hover:bg-black/60',
                isInWatched && 'hidden',
              )}
              iconClassName="size-4 text-white/80"
              disabled={isLoading}
            />
          </TooltipTrigger>
          <TooltipContent side="left">
            <p className="text-center text-white/80">
              {isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
            </p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <RoundedIconButton
              icon={isInWatched ? Check : Plus}
              onClick={toggleInWatched}
              className={cn(
                'max-h-8 min-h-8 max-w-8 min-w-8 bg-black/80 hover:bg-black/60',
                isInWatchlist && 'hidden',
              )}
              iconClassName="size-4.5 text-white/80"
              disabled={isLoading}
            />
          </TooltipTrigger>
          <TooltipContent side="left">
            <p className="text-center text-white/80">
              {isInWatched ? 'Remove from Seen Movies' : 'Add to Seen Movies'}
            </p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};

export default MovieCard;
