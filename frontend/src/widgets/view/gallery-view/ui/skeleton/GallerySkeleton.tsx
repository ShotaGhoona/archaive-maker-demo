'use client';

import { Skeleton } from '@/shared/ui/shadcn/ui/skeleton';

interface GallerySkeletonProps {
  columns?: number;
  count?: number;
}

export function GallerySkeleton({
  columns = 4,
  count = 8,
}: GallerySkeletonProps) {
  const gridColsClass =
    {
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-4',
      5: 'grid-cols-5',
      6: 'grid-cols-6',
    }[columns] || 'grid-cols-4';

  return (
    <div className={`grid ${gridColsClass} gap-4`}>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className='flex flex-col gap-2 rounded-2xl border border-white/60 bg-white/40 p-3 backdrop-blur-xl'
        >
          <Skeleton className='aspect-[4/3] w-full rounded-xl' />
          <Skeleton className='h-5 w-3/4' />
          <Skeleton className='h-4 w-1/2' />
        </div>
      ))}
    </div>
  );
}
