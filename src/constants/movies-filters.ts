import dayjs from 'dayjs';

import { ISortByOption } from '@/types/movies-filters';

// SORT BY OPTIONS TOGGLE GROUP
export const sortByOptions: ISortByOption[] = [
  {
    label: 'Popularity',
    slug: 'popularity',
  },
  {
    label: 'Highest rating',
    slug: 'rating',
  },
  {
    label: 'Newest',
    slug: 'year_new',
  },
  {
    label: 'Oldest',
    slug: 'year_old',
  },
  {
    label: 'Title A-Z',
    slug: 'title_asc',
  },
  {
    label: 'Title Z-A',
    slug: 'title_dsc',
  },
];

// RELEASE YEAR SELECT
export const SELECT_MIN_YEAR = 1950;
export const SELECT_MAX_YEAR = dayjs().year();
export const SELECT_DEFAULT_FROM = SELECT_MAX_YEAR - 40;
export const SELECT_DEFAULT_TO = SELECT_MAX_YEAR;
export const selectYarsOptions = Array.from(
  { length: SELECT_MAX_YEAR - SELECT_MIN_YEAR + 1 },
  (_, i) => SELECT_MIN_YEAR + i,
);

// RATING SLIDER MARKS
export const ratingMarks = Array.from({ length: 10 }, (_, i) => i + 1);

// SHOW PAGINATED ITEMS
export const MOVIES_PER_PAGE = 15;
