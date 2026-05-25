'use client';

import { useEffect, useState } from 'react';

import CustomSelect from '@/components/basic/form-controls/CustomSelect';
import RowContainer from '@/components/basic/layouts/RowContainer';
import {
  SELECT_DEFAULT_FROM,
  SELECT_DEFAULT_TO,
  selectYarsOptions,
} from '@/constants/movies-filters';
import { useSearchFilters } from '@/providers/SearchFilersProvider';

import FilterCardContainer from '../FilterCardContainer';

const ReleaseYearFilter = () => {
  const {
    filters: { yearFrom, yearTo },
    setFilters,
  } = useSearchFilters();

  const [fromYear, setFromYear] = useState<number>(yearFrom ?? SELECT_DEFAULT_FROM);
  const [toYear, setToYear] = useState<number>(yearTo ?? SELECT_DEFAULT_TO);

  const fromOptions = selectYarsOptions.filter((year) => year <= toYear);
  const toOptions = selectYarsOptions.filter((year) => year >= fromYear);

  const handleFromChange = (value: number) => {
    setFromYear(value);

    setFilters((prev) => {
      if (prev.yearFrom === value && prev.yearTo === toYear) return prev;

      return {
        ...prev,
        yearFrom: value,
        yearTo: toYear,
      };
    });
  };

  const handleToChange = (value: number) => {
    setToYear(value);

    setFilters((prev) => {
      if (prev.yearFrom === fromYear && prev.yearTo === value) return prev;

      return {
        ...prev,
        yearFrom: fromYear,
        yearTo: value,
      };
    });
  };

  useEffect(() => {
    if (yearFrom !== undefined && yearTo !== undefined) {
      setFromYear(yearFrom);
      setToYear(yearTo);
    }
  }, []);

  return (
    <FilterCardContainer label="Release year">
      <RowContainer className="gap-4!">
        {/* FROM */}
        <CustomSelect
          label="From"
          value={fromYear}
          onValueChange={(value) => handleFromChange(Number(value))}
          options={fromOptions}
        />

        {/* TO */}
        <CustomSelect
          label="To"
          value={toYear}
          onValueChange={(value) => handleToChange(Number(value))}
          options={toOptions}
        />
      </RowContainer>
    </FilterCardContainer>
  );
};

export default ReleaseYearFilter;
