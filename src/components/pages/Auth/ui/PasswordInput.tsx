import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { Control, FieldValues, Path } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface IPasswordInputProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  control: Control<T>;
}

const PasswordInput = <T extends FieldValues>({ name, control, label }: IPasswordInputProps<T>) => {
  const [isShowPassword, setShowPassword] = useState<boolean>(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="relative w-full">
          <FormLabel className="text-white/80">{label}</FormLabel>

          <FormControl>
            <div className="relative">
              <Input
                type={isShowPassword ? 'text' : 'password'}
                placeholder="••••••••"
                {...field}
              />

              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-white/60 hover:text-white"
              >
                {isShowPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </FormControl>

          <FormMessage className="absolute top-16 left-0" />
        </FormItem>
      )}
    />
  );
};

export default PasswordInput;
