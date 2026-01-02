import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-slate-300",
  {
    variants: {
      variant: {
        default:
          'bg-slate-900 text-white shadow-[0_4px_16px_rgba(0,0,0,0.12)] hover:bg-slate-800 hover:shadow-[0_4px_20px_rgba(0,0,0,0.16)]',
        destructive:
          'bg-rose-500 text-white shadow-[0_4px_16px_rgba(0,0,0,0.12)] hover:bg-rose-600',
        outline:
          'border border-white/60 bg-white/40 backdrop-blur-xl text-slate-600 shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:bg-white/60 hover:text-slate-900',
        secondary:
          'border border-slate-200/60 bg-slate-100/50 text-slate-700 hover:bg-slate-100 hover:text-slate-900',
        ghost:
          'text-slate-600 hover:bg-white/50 hover:text-slate-900',
        link:
          'text-slate-700 underline-offset-4 hover:underline hover:text-slate-900',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 px-6 has-[>svg]:px-4',
        xl: 'h-12 px-8 text-base has-[>svg]:px-6',
        icon: 'size-9',
        'icon-sm': 'size-8',
        'icon-lg': 'size-10',
        'icon-xl': 'size-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot='button'
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
