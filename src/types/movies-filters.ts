export enum SortByEnum {
  POPULARITY = 'popularity.desc',
  RATING = 'vote_average.desc',
  NEWEST = 'primary_release_date.desc',
  OLDEST = 'primary_release_date.asc',
  TITLE_ASC = 'original_title.asc',
  TITLE_DESC = 'original_title.desc',
}

export type SortByType =
  | SortByEnum.POPULARITY
  | SortByEnum.RATING
  | SortByEnum.NEWEST
  | SortByEnum.OLDEST
  | SortByEnum.TITLE_ASC
  | SortByEnum.TITLE_DESC;

export interface ISortByOption {
  label: string;
  value: SortByType;
}
