import { FC } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import ColContainer from '../layouts/ColContainer';

interface ICustomSelectProps {
  label?: string;
  value: string | number;
  onValueChange: (param: string) => void;
  options: Array<string | number>;
}

const CustomSelect: FC<ICustomSelectProps> = ({ label, value, onValueChange, options }) => {
  return (
    <ColContainer className="w-full gap-1">
      {!!label && <span className="text-muted-foreground text-xs">{label}</span>}

      <Select value={String(value)} onValueChange={onValueChange}>
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>

        <SelectContent position="popper" className="max-h-60">
          {options.map((option, index) => (
            <SelectItem key={option + '_' + index} value={String(option)}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </ColContainer>
  );
};

export default CustomSelect;
