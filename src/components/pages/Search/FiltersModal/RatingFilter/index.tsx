'use client';

import { useState } from 'react';

import { Slider } from '@/components/ui/slider';
import { ratingMarks } from '@/constants/movies-filters';
import { cn } from '@/lib/utils';

import FilterCardContainer from '../FilterCardContainer';

const RatingFilter = () => {
  const [ratingRange, setRatingRange] = useState<[number, number]>([3, 8]);

  return (
    <FilterCardContainer label="IMDB rating" containerClassName="gap-1.5">
      <div className="flex justify-between text-xs text-white/70">
        {ratingMarks.map((mark) => (
          <div
            key={mark}
            className={cn(
              'relative flex flex-col items-center pl-1.5',
              1 < mark && mark < 10 && 'left-px',
              mark === 10 && '-left-0.5',
              mark === 1 && '-left-px',
            )}
          >
            <span>{mark}</span>
          </div>
        ))}
      </div>

      <Slider
        value={ratingRange}
        onValueChange={(value) => setRatingRange(value as [number, number])}
        max={10}
        min={1}
        step={1}
        className="cursor-pointer"
      />

      <div className="text-muted-foreground flex w-full items-center justify-between text-center text-xs">
        <p>From: {ratingRange[0]}</p>
        <p>To: {ratingRange[1]}</p>
      </div>
    </FilterCardContainer>
  );
};

export default RatingFilter;
