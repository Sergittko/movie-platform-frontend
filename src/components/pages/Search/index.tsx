'use client';

import { useMemo, useState } from 'react';

import ColContainer from '@/components/basic/layouts/ColContainer';
import RowContainer from '@/components/basic/layouts/RowContainer';
import MovieCard from '@/components/basic/MovieCard';
import SearchBar from '@/components/basic/SearchBar';
import { MOVIES_PER_PAGE } from '@/constants/movies-filters';
import { allMoviesData } from '@/constants/movies-widget-data';

import FiltersModal from './FiltersModal';
import MoviesPagination from './MoviesPagination';

const SearchPage = () => {
  const [page, setPage] = useState<number>(1);

  const movies = useMemo(() => {
    const start = (page - 1) * MOVIES_PER_PAGE;
    const end = start + MOVIES_PER_PAGE;

    return allMoviesData.slice(start, end);
  }, [page]);

  return (
    <ColContainer>
      <RowContainer className="w-full justify-center gap-4">
        <SearchBar />

        <FiltersModal />
      </RowContainer>

      <div className="m-auto grid max-w-6xl grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-6 max-[1100px]:w-full">
        {movies.map((movie, index) => (
          <div key={movie + index} className="m-auto">
            <MovieCard name={movie} />
          </div>
        ))}
      </div>

      <MoviesPagination moviesPerPage={MOVIES_PER_PAGE} page={page} setPage={setPage} />
    </ColContainer>
  );
};

export default SearchPage;
