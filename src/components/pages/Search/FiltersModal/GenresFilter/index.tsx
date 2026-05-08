'use client';

import { CircleX } from 'lucide-react';
import { useEffect, useState } from 'react';

import { useGetMoviesGenres } from '@/api/movies/hooks/useGetMoviesGenres';
import { Loader } from '@/components/basic/Loader';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useSearchFilters } from '@/providers/SearchFilersProvider';

import FilterCardContainer from '../FilterCardContainer';

const GenresFilter = () => {
  const { data: genresData, isLoading } = useGetMoviesGenres();
  const {
    filters: { genres },
    setFilters,
    isResetting,
  } = useSearchFilters();

  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);

  const toggleGenre = (slug: number) => {
    setSelectedGenres((prev) =>
      prev.includes(slug) ? prev.filter((g) => g !== slug) : [...prev, slug],
    );
  };

  const clearGenres = () => {
    setSelectedGenres([]);
    setFilters((prev) => ({
      ...prev,
      genres: [],
    }));
  };

  useEffect(() => {
    if (genres?.length && !selectedGenres.length) setSelectedGenres(genres);

    if (selectedGenres) {
      setFilters((prev) => ({
        ...prev,
        genres: selectedGenres,
      }));
    }
  }, [genres, selectedGenres]);

  useEffect(() => {
    if (isResetting) {
      setSelectedGenres([]);
      setFilters((prev) => ({
        ...prev,
        genres: [],
      }));
    }
  }, [isResetting]);

  return (
    <FilterCardContainer label="Genres">
      <ScrollArea className="h-40">
        {isLoading ? (
          <div className="mt-5 w-full items-center justify-center">
            <Loader />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {genresData?.map(({ name, id }) => {
              const checked = selectedGenres.includes(id);

              return (
                <label key={id} className="group flex cursor-pointer items-center gap-2">
                  <Checkbox
                    id={id.toString()}
                    checked={checked}
                    onCheckedChange={() => toggleGenre(id)}
                  />
                  <span className="text-sm text-white/70 transition-all group-hover:text-white">
                    {name}
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </ScrollArea>

      {selectedGenres.length > 0 && (
        <button
          onClick={clearGenres}
          className="absolute top-3 right-3 flex items-center justify-center gap-1 text-xs text-white/70 transition-all hover:text-white"
        >
          Clear
          <CircleX className="size-3" />
        </button>
      )}
    </FilterCardContainer>
  );
};

export default GenresFilter;
