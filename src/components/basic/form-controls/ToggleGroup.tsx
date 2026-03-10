import { FC } from 'react';

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { ISortByOption } from '@/types/movies-filters';

interface IToggleGroupProps {
  options: ISortByOption[];
}

const ToggleOptions: FC<IToggleGroupProps> = ({ options }) => {
  return (
    <ToggleGroup type="single" defaultValue="top" variant="outline" className="bg-white/4!">
      {options.map(({ label, slug }) => (
        <ToggleGroupItem key={slug} value={slug} aria-label={label}>
          {label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
};

export default ToggleOptions;
