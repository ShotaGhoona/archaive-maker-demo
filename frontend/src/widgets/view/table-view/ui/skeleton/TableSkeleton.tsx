'use client';

import { Skeleton } from '@/shared/ui/shadcn/ui/skeleton';

const ROWS = 16;
const COLUMNS = 8;

export function TableSkeleton() {
  return (
    <div className='flex min-h-0 flex-1 flex-col'>
      <div className='relative min-h-0 flex-1 overflow-auto'>
        <table className='w-full min-w-max caption-bottom'>
          {/* Header Skeleton - py-4 to match TableHeader */}
          <thead className='sticky top-0 z-10 bg-white/60 backdrop-blur-sm'>
            <tr className='border-b border-slate-200/60'>
              {/* Checkbox column */}
              <th className='w-12 px-2 py-4'>
                <Skeleton className='mx-auto h-8 w-8' />
              </th>
              {/* Data columns */}
              {Array.from({ length: COLUMNS }).map((_, i) => (
                <th key={i} className='px-4 py-4'>
                  <Skeleton className='h-8 w-24' />
                </th>
              ))}
              {/* Actions column */}
              <th className='w-20 px-2 py-4'>
                <Skeleton className='mx-auto h-8 w-12' />
              </th>
            </tr>
          </thead>
          {/* Body Skeleton - py-1 to match TableCell */}
          <tbody>
            {Array.from({ length: ROWS }).map((_, rowIndex) => (
              <tr key={rowIndex} className='border-b border-slate-100'>
                {/* Checkbox column */}
                <td className='w-12 px-2 py-1'>
                  <div className='flex h-8 items-center justify-center'>
                    <Skeleton className='h-5 w-5' />
                  </div>
                </td>
                {/* Data columns */}
                {Array.from({ length: COLUMNS }).map((_, colIndex) => (
                  <td key={colIndex} className='px-4 py-1'>
                    <div className='flex h-8 items-center'>
                      <Skeleton
                        className='h-5'
                        style={{
                          width: `${60 + Math.random() * 40}%`,
                        }}
                      />
                    </div>
                  </td>
                ))}
                {/* Actions column */}
                <td className='w-20 px-2 py-1'>
                  <div className='flex h-8 items-center justify-center gap-1'>
                    <Skeleton className='h-6 w-6 rounded' />
                    <Skeleton className='h-6 w-6 rounded' />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Skeleton */}
      <div className='flex items-center justify-between py-4'>
        <Skeleton className='h-4 w-32' />
        <div className='flex items-center gap-2'>
          <Skeleton className='h-8 w-8 rounded' />
          <Skeleton className='h-8 w-8 rounded' />
          <Skeleton className='h-8 w-8 rounded' />
          <Skeleton className='h-8 w-8 rounded' />
        </div>
        <Skeleton className='h-8 w-24 rounded' />
      </div>
    </div>
  );
}
