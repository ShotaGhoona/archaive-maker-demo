import * as React from 'react';

import { cn } from '../lib/utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot='input'
      className={cn(
        'h-10 w-full min-w-0 rounded-xl px-4 py-2 text-sm outline-none transition-all duration-200',
        'border border-white/60 bg-white/40 backdrop-blur-xl',
        'text-slate-900 placeholder:text-slate-400',
        'shadow-[0_4px_16px_rgba(0,0,0,0.06)]',
        'focus:bg-white/60 focus:shadow-[0_4px_20px_rgba(0,0,0,0.1)] focus:ring-2 focus:ring-slate-300',
        'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
        'file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-slate-700',
        'selection:bg-slate-200 selection:text-slate-900',
        className,
      )}
      {...props}
    />
  );
}

export { Input };
