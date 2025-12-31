'use client';

import { Filter, X } from 'lucide-react';
import { Button } from '@/shared/ui/shadcn/ui/button';

interface ProductFilterButtonProps {
  open: boolean;
  onToggle: () => void;
}

export function ProductFilterButton({
  open,
  onToggle,
}: ProductFilterButtonProps) {
  return (
    <Button
      size='icon'
      variant='outline'
      className='shrink-0'
      onClick={onToggle}
    >
      {open ? <X className='h-4 w-4' /> : <Filter className='h-4 w-4' />}
    </Button>
  );
}
