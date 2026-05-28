import { Control, FieldValues, Path } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface IDefaultInputProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  control: Control<T>;
  placeholder?: string;
  containerClassName?: string;
  isDisabled?: boolean;
}

const DefaultInput = <T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  containerClassName,
  isDisabled = false,
}: IDefaultInputProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={`relative ${containerClassName || ''}`}>
          <FormLabel className="text-white/80">{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} {...field} disabled={isDisabled} />
          </FormControl>
          <FormMessage className="absolute top-16 left-0" />
        </FormItem>
      )}
    />
  );
};

export default DefaultInput;
