'use client';

import { useGetMoviesList } from '@/api/movies/hooks/useGetMoviesList';
import { MoviesListTypeEnum } from '@/api/movies/moviesTypes';
import ColContainer from '@/components/basic/layouts/ColContainer';
import RowContainer from '@/components/basic/layouts/RowContainer';
import MoviesBigBanner from '@/components/basic/widgets/MoviesBigBanner';
import MoviesTrackCard from '@/components/basic/widgets/MoviesTrackCard';
import MovieTopicCard from '@/components/basic/widgets/MovieTopicCard';
import SearchByGenresCard from '@/components/basic/widgets/SearchByGenresCard';
import { movieTopicsData } from '@/constants/movie-topic';

const HomePage = () => {
  const { data: topRatedList = [] } = useGetMoviesList({
    listType: MoviesListTypeEnum.TOP_RATED,
  });

  const { data: popilarList = [] } = useGetMoviesList({
    listType: MoviesListTypeEnum.POPULAR,
  });

  const { data: upcomingList = [] } = useGetMoviesList({
    listType: MoviesListTypeEnum.UPCOMING,
  });

  return (
    <ColContainer>
      <MoviesBigBanner moviesList={upcomingList} />
      <SearchByGenresCard />

      <RowContainer>
        <MoviesTrackCard title="Top rated" moviesList={topRatedList} />
        <MoviesTrackCard title="Watching now" moviesList={popilarList} />
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
