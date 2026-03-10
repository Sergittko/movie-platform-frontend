'use client';

import { useState } from 'react';

import CustomSelect from '@/components/basic/form-controls/CustomSelect';
import RowContainer from '@/components/basic/layouts/RowContainer';
import {
  SELECT_DEFAULT_FROM,
  SELECT_DEFAULT_TO,
  selectYarsOptions,
} from '@/constants/movies-filters';

import FilterCardContainer from '../FilterCardContainer';

const ReleaseYearFilter = () => {
  const [fromYear, setFromYear] = useState<number>(SELECT_DEFAULT_FROM);
  const [toYear, setToYear] = useState<number>(SELECT_DEFAULT_TO);

  const fromOptions = selectYarsOptions.filter((year) => year <= toYear);
  const toOptions = selectYarsOptions.filter((year) => year >= fromYear);

  return (
    <FilterCardContainer label="Release year">
      <RowContainer className="gap-4!">
        {/* FROM */}
        <CustomSelect
          label="From"
          value={fromYear}
          onValueChange={(value) => setFromYear(Number(value))}
          options={fromOptions}
        />

        {/* TO */}
        <CustomSelect
          label="To"
          value={toYear}
          onValueChange={(value) => setToYear(Number(value))}
          options={toOptions}
        />
      </RowContainer>
    </FilterCardContainer>
  );
};

export default ReleaseYearFilter;
