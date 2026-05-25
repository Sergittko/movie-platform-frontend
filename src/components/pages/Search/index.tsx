'use client';

import ColContainer from '@/components/basic/layouts/ColContainer';
import RowContainer from '@/components/basic/layouts/RowContainer';
import MovieCard from '@/components/basic/MovieCard';
import SearchBar from '@/components/basic/SearchBar';
import { useSearchFilters } from '@/providers/SearchFilersProvider';

import FiltersModal from './FiltersModal';
import MoviesPagination from './MoviesPagination';

const SearchPage = () => {
  const { searchResults, page, setPage, totalPages, isFetching, searchByNameValue } =
    useSearchFilters();

  return (
    <ColContainer>
      <RowContainer className="w-full justify-center gap-4">
        <SearchBar />

        {!searchByNameValue.length && <FiltersModal />}
      </RowContainer>

      <div className="m-auto grid max-w-6xl grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-6 max-[1100px]:w-full">
        {searchResults.length ? (
          searchResults?.map((movie, index) => (
            <div key={movie.id + index} className="m-auto">
              <MovieCard name={movie.title} data={movie} />
            </div>
          ))
        ) : (
          <div className="flex h-20 items-center justify-center">
            <p className="text-xl text-white/70">
              {searchByNameValue.length ? 'No movies found by name' : 'No movies found by filters'}
            </p>
          </div>
        )}
      </div>

      <MoviesPagination
        page={page}
        setPage={setPage}
        totalPages={totalPages}
        isDisabled={isFetching}
      />
    </ColContainer>
  );
};

export default SearchPage;
