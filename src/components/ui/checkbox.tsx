'use client';

import { CheckIcon } from 'lucide-react';
import { Checkbox as CheckboxPrimitive } from 'radix-ui';
import * as React from 'react';

import { cn } from '@/lib/utils';

function Checkbox({ className, ...props }: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        'peer focus-visible:border-ring aria-invalid:border-destructive aria-invalid:ring-destructive/20 size-4 shrink-0 rounded-[5px] border border-white/20 bg-white/5 text-black/50 shadow-xs transition-all duration-200 outline-none hover:border-white/30 hover:bg-white/10 focus-visible:ring-[3px] focus-visible:ring-white/20 disabled:cursor-not-allowed disabled:opacity-40 data-[state=checked]:border-white/90 data-[state=checked]:bg-white/60 data-[state=checked]:text-black/50',
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-none"
      >
        <CheckIcon className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
