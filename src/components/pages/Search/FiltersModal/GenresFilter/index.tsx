'use client';

import { CircleX } from 'lucide-react';
import { useState } from 'react';

import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { genresData } from '@/constants/genres';

import FilterCardContainer from '../FilterCardContainer';

const GenresFilter = () => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const toggleGenre = (slug: string) => {
    setSelectedGenres((prev) =>
      prev.includes(slug) ? prev.filter((g) => g !== slug) : [...prev, slug],
    );
  };

  const clearGenres = () => {
    setSelectedGenres([]);
  };

  return (
    <FilterCardContainer label="Genres">
      <ScrollArea className="h-40">
        <div className="grid grid-cols-2 gap-3">
          {genresData.map(({ name, slug }) => {
            const checked = selectedGenres.includes(slug);

            return (
              <label key={slug} className="group flex cursor-pointer items-center gap-2">
                <Checkbox id={slug} checked={checked} onCheckedChange={() => toggleGenre(slug)} />
                <span className="text-sm text-white/70 transition-all group-hover:text-white">
                  {name}
                </span>
              </label>
            );
          })}
        </div>
      </ScrollArea>

      {selectedGenres.length > 0 && (
        <button
          onClick={clearGenres}
          className="absolute top-3 right-3 flex items-center justify-center gap-1 text-xs text-white/70 transition-all hover:text-white"
        >
          Clear
          <CircleX className="relative bottom-[0.5px] size-3" />
        </button>
      )}
    </FilterCardContainer>
  );
};

export default GenresFilter;
