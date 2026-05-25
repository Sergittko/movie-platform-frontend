'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { usersApi } from '@/api/users/usersApi';
import { successToast } from '@/helpers/toastActions';
import { useAppSelector, useAuth } from '@/redux/hooks';
import userSelectors from '@/redux/user/userSelectors';
import { AppRoutePathEnum } from '@/types/routes';

interface UseMovieListsProps {
  movieId: string | number;
  movieTitle?: string;
  movieImage?: string;
}

export const useMovieLists = ({ movieId, movieTitle, movieImage }: UseMovieListsProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const isAuth = useAuth();
  const userId = useAppSelector(userSelectors.getUserId);

  const [isInWatched, setInWatched] = useState(false);
  const [isInWatchlist, setInWatchlist] = useState(false);

  const movieIdString = movieId.toString();

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
    mutationFn: () =>
      usersApi.addToWatchlist({
        userId,
        movieData: {
          movieId: movieIdString,
          image: movieImage || '',
          title: movieTitle || '',
        },
      }),

    onSuccess: () => {
      setInWatchlist(true);

      successToast(`${movieTitle} added to watchlist`);

      queryClient.invalidateQueries({
        queryKey: [`getWatchlistMovieIds-${userId}`],
      });
    },
  });

  const { mutate: deleteWatchlistRequest, isPending: isDeletingFromWatchlist } = useMutation({
    mutationFn: () =>
      usersApi.deleteWatchlistMovie({
        userId,
        movieId: movieIdString,
      }),

    onSuccess: () => {
      setInWatchlist(false);

      successToast(`${movieTitle} removed from watchlist`);

      queryClient.invalidateQueries({
        queryKey: [`getWatchlist-${userId}`],
      });

      queryClient.invalidateQueries({
        queryKey: [`getWatchlistMovieIds-${userId}`],
      });
    },
  });

  const { mutate: addToWatchedRequest, isPending: isAddingToWatched } = useMutation({
    mutationFn: () =>
      usersApi.addToWatched({
        userId,
        movieData: {
          movieId: movieIdString,
          image: movieImage || '',
          title: movieTitle || '',
        },
      }),

    onSuccess: () => {
      setInWatched(true);

      successToast(`${movieTitle} added to seen movies`);

      queryClient.invalidateQueries({
        queryKey: [`getWatchedMovieIds-${userId}`],
      });
    },
  });

  const { mutate: deleteWatchedRequest, isPending: isDeletingFromWatched } = useMutation({
    mutationFn: () =>
      usersApi.deleteWatchedMovie({
        userId,
        movieId: movieIdString,
      }),

    onSuccess: () => {
      setInWatched(false);

      successToast(`${movieTitle} removed from seen movies`);

      queryClient.invalidateQueries({
        queryKey: [`getWatchedMovies-${userId}`],
      });

      queryClient.invalidateQueries({
        queryKey: [`getWatchedMovieIds-${userId}`],
      });
    },
  });

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
      setInWatchlist(watchlistMovieIds.movieIds.includes(movieIdString));
    }
  }, [watchlistMovieIds, movieIdString]);

  useEffect(() => {
    if (watchedMovieIds?.movieIds) {
      setInWatched(watchedMovieIds.movieIds.includes(movieIdString));
    }
  }, [watchedMovieIds, movieIdString]);

  return {
    isInWatchlist,
    isInWatched,

    toggleInWatchlist,
    toggleInWatched,

    isLoading:
      isWatchedMovieIdsLoading ||
      isWatchlistMovieIdsLoading ||
      isAddingToWatchlist ||
      isAddingToWatched ||
      isDeletingFromWatchlist ||
      isDeletingFromWatched,
  };
};
