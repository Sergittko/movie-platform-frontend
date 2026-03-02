import { LucideIcon } from 'lucide-react';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

export interface IMovieTopicData {
  title: string;
  image: StaticImport;
  link: string;
}

export type Genre = {
  name: string;
  slug: string;
  icon: LucideIcon;
};
