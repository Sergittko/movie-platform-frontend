import dayjs from 'dayjs';

import { ISortByOption, SortByEnum } from '@/types/movies-filters';

// SORT BY OPTIONS TOGGLE GROUP
export const sortByOptions: ISortByOption[] = [
  {
    label: 'Popularity',
    value: SortByEnum.POPULARITY,
  },
  {
    label: 'Highest rating',
    value: SortByEnum.RATING,
  },
  {
    label: 'Newest',
    value: SortByEnum.NEWEST,
  },
  {
    label: 'Oldest',
    value: SortByEnum.OLDEST,
  },
  {
    label: 'Title A-Z',
    value: SortByEnum.TITLE_ASC,
  },
  {
    label: 'Title Z-A',
    value: SortByEnum.TITLE_DESC,
  },
];

// RELEASE YEAR SELECT
export const SELECT_MIN_YEAR = 1950;
export const SELECT_MAX_YEAR = dayjs().year();
export const SELECT_DEFAULT_FROM = SELECT_MIN_YEAR;
export const SELECT_DEFAULT_TO = SELECT_MAX_YEAR;
export const selectYarsOptions = Array.from(
  { length: SELECT_MAX_YEAR - SELECT_MIN_YEAR + 1 },
  (_, i) => SELECT_MIN_YEAR + i,
);

// RATING SLIDER MARKS
export const ratingMarks = Array.from({ length: 10 }, (_, i) => i + 1);
export const RATING_MIN = 1;
export const RATING_MAX = 10;

// SHOW PAGINATED ITEMS
export const MOVIES_PER_PAGE = 15;
