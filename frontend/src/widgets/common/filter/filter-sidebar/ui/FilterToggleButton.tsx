'use client';

import { Filter, X } from 'lucide-react';
import { Button } from '@/shared/ui/shadcn/ui/button';

interface FilterToggleButtonProps {
  open: boolean;
  onToggle: () => void;
}

export function FilterToggleButton({
  open,
  onToggle,
}: FilterToggleButtonProps) {
  return (
    <Button
      size='sm'
      variant='outline'
      className='h-9 gap-1.5 bg-white px-3'
      onClick={onToggle}
    >
      {open ? (
        <>
          <X className='size-4' />
          閉じる
        </>
      ) : (
        <>
          <Filter className='size-4' />
          フィルター
        </>
      )}
    </Button>
  );
}
