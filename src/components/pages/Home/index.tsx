import ColContainer from '@/components/basic/layouts/ColContainer';
import RowContainer from '@/components/basic/layouts/RowContainer';
import MoviesBigBanner from '@/components/basic/widgets/MoviesBigBanner';
import MoviesTrackCard from '@/components/basic/widgets/MoviesTrackCard';
import MovieTopicCard from '@/components/basic/widgets/MovieTopicCard';
import SearchByGenresCard from '@/components/basic/widgets/SearchByGenresCard';
import { movieTopicsData } from '@/constants/movie-topic';
import {
  moviesBigBannerData,
  sciFiFantasyMoviesListData,
  topRatedMoviesListData,
} from '@/constants/movies-widget-data';

const HomePage = () => {
  return (
    <ColContainer>
      <MoviesBigBanner moviesList={moviesBigBannerData} />
      <SearchByGenresCard />

      <RowContainer>
        <MoviesTrackCard title="Top rated" moviesList={topRatedMoviesListData} />
        <MoviesTrackCard title="Sci-Fi & Fantasy" moviesList={sciFiFantasyMoviesListData} />
      </RowContainer>

      <RowContainer>
        {movieTopicsData.map((topic) => (
          <MovieTopicCard key={topic.title} data={topic} />
        ))}
      </RowContainer>
    </ColContainer>
  );
};

export default HomePage;
