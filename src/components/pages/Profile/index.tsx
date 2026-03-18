import ColContainer from '@/components/basic/layouts/ColContainer';
import RowContainer from '@/components/basic/layouts/RowContainer';
import MoviesSmallTrackCard from '@/components/basic/widgets/MoviesSmallTrackCard';
import { sciFiFantasyMoviesListData, topRatedMoviesListData } from '@/constants/movies-widget-data';

import ActivityChart from './ActivityChart';
import GenreChart from './GenreChart';
import TotalStatsChart from './TotalStatsChart';
import UserInfo from './UserInfo';

const ProfilePage = () => {
  return (
    <RowContainer className="m-auto max-w-6xl flex-1 max-[1100px]:w-full">
      <UserInfo />

      <ColContainer className="w-full min-w-0">
        <RowContainer>
          <MoviesSmallTrackCard title="My Watchlist" moviesList={topRatedMoviesListData} />
          <MoviesSmallTrackCard title="Seen Movies" moviesList={sciFiFantasyMoviesListData} />
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
