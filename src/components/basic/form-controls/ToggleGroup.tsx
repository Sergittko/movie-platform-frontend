import { FC } from 'react';

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { ISortByOption } from '@/types/movies-filters';

interface IToggleGroupProps {
  options: ISortByOption[];
  value?: string | null;
  onChange?: (value: string) => void;
}

const ToggleOptions: FC<IToggleGroupProps> = ({ options, value, onChange }) => {
  return (
    <ToggleGroup
      type="single"
      defaultValue="top"
      variant="outline"
      className="bg-white/4!"
      value={value || undefined}
      onValueChange={onChange}
    >
      {options.map(({ label, value }) => (
        <ToggleGroupItem key={value} value={value} aria-label={label}>
          {label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
};

export default ToggleOptions;
