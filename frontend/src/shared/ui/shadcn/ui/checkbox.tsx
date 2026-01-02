'use client';

import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { CheckIcon } from 'lucide-react';

import { cn } from '../lib/utils';

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot='checkbox'
      className={cn(
        'peer size-4 shrink-0 rounded-md outline-none transition-all duration-200',
        'border border-slate-300/60 bg-white/40 backdrop-blur-sm',
        'shadow-[0_2px_8px_rgba(0,0,0,0.04)]',
        'hover:bg-white/60',
        'focus-visible:ring-2 focus-visible:ring-slate-300',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'data-[state=checked]:border-slate-900 data-[state=checked]:bg-slate-900 data-[state=checked]:text-white',
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot='checkbox-indicator'
        className='grid place-content-center text-current transition-none'
      >
        <CheckIcon className='size-3.5' />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
