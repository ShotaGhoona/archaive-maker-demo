import * as React from 'react';

import { cn } from '../lib/utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot='input'
      className={cn(
        'h-11 w-full min-w-0 px-4 py-2 text-base',
        'bg-white rounded border-2 border-input',
        'text-foreground placeholder:text-muted-foreground',
        'outline-none transition-colors',
        'selection:bg-primary selection:text-primary-foreground',
        'file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground',
        'disabled:bg-muted disabled:cursor-not-allowed disabled:opacity-50',
        'focus:border-primary focus:ring-2 focus:ring-primary/20',
        'aria-invalid:ring-destructive/20 aria-invalid:border-destructive',
        className,
      )}
      {...props}
    />
  );
}

export { Input };
