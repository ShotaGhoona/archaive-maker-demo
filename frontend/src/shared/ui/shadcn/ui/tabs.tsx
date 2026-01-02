'use client';

import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';

import { cn } from '../lib/utils';

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot='tabs'
      className={cn('flex flex-col gap-2', className)}
      {...props}
    />
  );
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot='tabs-list'
      className={cn(
        'inline-flex h-10 w-fit items-center justify-center rounded-xl p-1',
        'border border-white/60 bg-white/40 backdrop-blur-xl',
        'text-slate-500',
        className,
      )}
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot='tabs-trigger'
      className={cn(
        'inline-flex h-full flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-200',
        'text-slate-500 hover:text-slate-700',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300',
        'disabled:pointer-events-none disabled:opacity-50',
        'data-[state=active]:bg-white/70 data-[state=active]:text-slate-900 data-[state=active]:shadow-sm',
        "[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className,
      )}
      {...props}
    />
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot='tabs-content'
      className={cn('flex-1 outline-none', className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
