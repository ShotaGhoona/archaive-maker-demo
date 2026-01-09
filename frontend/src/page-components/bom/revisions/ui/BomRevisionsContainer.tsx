'use client';

import { GitBranch } from 'lucide-react';

export function BomRevisionsContainer() {
  return (
    <div className='flex h-full flex-col items-center justify-center text-muted-foreground'>
      <GitBranch className='mb-4 size-12 opacity-50' />
      <p className='text-lg font-medium'>リビジョンページ</p>
      <p className='mt-1 text-sm'>実装予定</p>
    </div>
  );
}
