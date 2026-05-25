'use client';

import { useQuery } from '@tanstack/react-query';

import { usersApi } from '@/api/users/usersApi';
import ColContainer from '@/components/basic/layouts/ColContainer';
import RowContainer from '@/components/basic/layouts/RowContainer';
import MoviesSmallTrackCard from '@/components/basic/widgets/MoviesSmallTrackCard';
import { useAppSelector } from '@/redux/hooks';
import userSelectors from '@/redux/user/userSelectors';
import { AppRoutePathEnum } from '@/types/routes';

import ActivityChart from './ActivityChart';
import GenreChart from './GenreChart';
import TotalStatsChart from './TotalStatsChart';
import UserInfo from './UserInfo';

const ProfilePage = () => {
  const userId = useAppSelector(userSelectors.getUserId);

  const { data: watchlistData, isLoading: isWatchlistDataLoading } = useQuery({
    queryKey: [`getWatchlist-${userId}`],
    queryFn: () => usersApi.getWatchlist({ userId }),
    select: (res) => res.data,
    enabled: !!userId,
    retry: 3,
  });

  const { data: watchedMoviesData, isLoading: isWatchedMoviesDataLoading } = useQuery({
    queryKey: [`getWatchedMovies-${userId}`],
    queryFn: () => usersApi.getWatchedMovies({ userId }),
    select: (res) => res.data,
    enabled: !!userId,
    retry: 3,
  });

  return (
    <RowContainer className="m-auto max-w-6xl flex-1 max-[1100px]:w-full">
      <UserInfo />

      <ColContainer className="w-full min-w-0">
        <RowContainer>
          <MoviesSmallTrackCard
            title="My Watchlist"
            showAllLink={AppRoutePathEnum.USER_WATCHLIST}
            moviesList={watchlistData?.data.movies || []}
            isShowAll={(watchlistData?.totalPages || 1) > 1}
            isLoading={isWatchlistDataLoading}
          />
          <MoviesSmallTrackCard
            title="Seen Movies"
            showAllLink={AppRoutePathEnum.USER_WATCHED_LIST}
            moviesList={watchedMoviesData?.data.movies || []}
            isShowAll={(watchedMoviesData?.totalPages || 1) > 1}
            isLoading={isWatchedMoviesDataLoading}
          />
        </RowContainer>

        <ActivityChart />

        <RowContainer>
          <GenreChart />
          <TotalStatsChart />
        </RowContainer>
      </ColContainer>
    </RowContainer>
  );
};

export default ProfilePage;
