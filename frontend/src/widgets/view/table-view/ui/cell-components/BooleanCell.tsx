'use client';

import { Switch } from '@/shared/ui/shadcn/ui/switch';

interface BooleanCellProps {
  value: boolean;
}

export function BooleanCell({ value }: BooleanCellProps) {
  return (
    <div className='flex justify-center px-2'>
      <Switch checked={value} disabled onClick={(e) => e.stopPropagation()} />
    </div>
  );
}
